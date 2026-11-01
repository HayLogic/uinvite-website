// 080 · ծնունդ. Օգտագործվում է տրամադրված hero-bg.png նկարը։
'use strict';
const CONFIG=Object.freeze({invitationNumber:'080',childName:'Լիա',eventDate:'2027-05-24T15:00:00+04:00',backgroundImage:'hero-bg.png',rsvpEndpoint:''});

if(CONFIG.backgroundImage){const image=new Image();image.addEventListener('load',()=>document.documentElement.style.setProperty('--event-photo',`url("${image.src}")`));image.src=CONFIG.backgroundImage;}
const eventDate=new Date(CONFIG.eventDate);
function updateCountdown(now=Date.now()){const difference=Math.max(0,eventDate.getTime()-now)||0;const seconds=Math.floor(difference/1000);const values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];['days','hours','minutes','seconds'].forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(2,'0'));}
updateCountdown();setInterval(updateCountdown,1000);
const form=document.getElementById('rsvpForm'),nameInput=document.getElementById('name'),guest=document.getElementById('guest_count'),status=document.getElementById('rsvpThanks'),submit=form.querySelector('[type=submit]');
function syncGuests(){const declined=form.elements.attendance.value==='Ցավոք չեմ կարողանա';document.getElementById('guest-field').hidden=declined;guest.disabled=declined;guest.required=!declined;}
form.querySelectorAll('[name=attendance]').forEach(e=>e.addEventListener('change',syncGuests));syncGuests();nameInput.addEventListener('input',()=>nameInput.setCustomValidity(''));
document.getElementById('preview-note').hidden=Boolean(CONFIG.rsvpEndpoint);
let sending=false;
form.addEventListener('submit',async event=>{event.preventDefault();if(sending)return;nameInput.setCustomValidity(nameInput.value.trim().split(/\s+/).length<2?'Խնդրում ենք նշել անունը և ազգանունը։':'');if(!form.reportValidity())return;
if(!CONFIG.rsvpEndpoint){status.textContent='Դաշտերը ճիշտ են լրացված։ Սա ցուցադրական ձև է․ պատասխանը չի ուղարկվել և չի պահպանվել։';status.focus();return;}
sending=true;submit.disabled=true;form.setAttribute('aria-busy','true');status.textContent='Ուղարկվում է…';const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
try{const endpoint=new URL(CONFIG.rsvpEndpoint,location.href);if(!['http:','https:'].includes(endpoint.protocol))throw Error('endpoint');const result=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName:nameInput.value.trim(),attendance:form.elements.attendance.value,guestCount:guest.disabled?0:Number(guest.value)}),signal:controller.signal});if(!result.ok)throw Error('request');status.textContent='Շնորհակալություն։ Ձեր պատասխանն ընդունված է։';form.reset();syncGuests();}catch{status.textContent='Չհաջողվեց ուղարկել։ Խնդրում ենք կրկին փորձել։';}finally{clearTimeout(timer);sending=false;submit.disabled=false;form.removeAttribute('aria-busy');status.focus();}});
