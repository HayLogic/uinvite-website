'use strict';
// Անունները, օրը և վայրերի ժամերը տրամադրված են․ պատմությունը օրինակային է։
const CONFIG=Object.freeze({
 invitationNumber:'077',brideName:'Մելինե',groomName:'Լևոն',monogram:'LM',
 eventDate:'2027-08-07T14:00:00+04:00',city:'',
 venueName:'Ադան Կոմպլեքս',address:'',mapsUrl:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Ադան Կոմպլեքս'),rsvpEndpoint:'',
 story:'Մի պատահական հանդիպում դարձավ մեր ամենասիրելի պատմությունը։ Այսօր մենք ընտրում ենք միասին անցնել կյանքի նոր ճանապարհը և ուզում ենք, որ դուք լինեք մեր կողքին։ Ձեր ներկայությունը մեր օրը կդարձնի ավելի ջերմ ու անմոռանալի։',
 program:[{time:'10:00',title:'Փեսայի տուն',description:''},{time:'12:00',title:'Հարսի տուն',description:''},{time:'14:00',title:'Պսակադրություն',description:'Սուրբ Գայանե եկեղեցի'},{time:'17:30',title:'Հարսանյաց հանդես',description:'Ադան Կոմպլեքս'}]
});
const $=selector=>document.querySelector(selector);
document.querySelectorAll('[data-bride]').forEach(e=>e.textContent=CONFIG.brideName);
document.querySelectorAll('[data-groom]').forEach(e=>e.textContent=CONFIG.groomName);
document.querySelectorAll('[data-monogram]').forEach(e=>e.textContent=CONFIG.monogram);
document.querySelectorAll('[data-venue]').forEach(e=>e.textContent=CONFIG.venueName);
document.title=`${CONFIG.groomName} և ${CONFIG.brideName} · Մեր հարսանիքը · 077`;
$('#story-text').textContent=CONFIG.story;$('#hero-city').textContent=CONFIG.city;
$('#detail-address').textContent=CONFIG.address;$('#detail-address').hidden=!CONFIG.address;
function safeURL(value,relative=false){if(!value)return '';try{const url=relative?new URL(value,location.href):new URL(value);return ['http:','https:'].includes(url.protocol)?url.href:'';}catch{return '';}}
const map=safeURL(CONFIG.mapsUrl);if(map){$('#maps-link').href=map;$('#maps-link').hidden=false;}
const date=new Date(CONFIG.eventDate),valid=Number.isFinite(date.getTime())&&/\+04:00$/.test(CONFIG.eventDate);
if(valid){
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'Asia/Yerevan'}).formatToParts(date).map(p=>[p.type,p.value]));
const allMonths=['հունվարի','փետրվարի','մարտի','ապրիլի','մայիսի','հունիսի','հուլիսի','օգոստոսի','սեպտեմբերի','հոկտեմբերի','նոյեմբերի','դեկտեմբերի'];
 const numeric=`${parts.day}.${parts.month}.${parts.year}`;
 const civil=new Date(Date.UTC(Number(parts.year),Number(parts.month)-1,Number(parts.day)));
 const monday=new Date(civil);monday.setUTCDate(civil.getUTCDate()-((civil.getUTCDay()+6)%7));
 $('#calendar-month').textContent=['Հունվար','Փետրվար','Մարտ','Ապրիլ','Մայիս','Հունիս','Հուլիս','Օգոստոս','Սեպտեմբեր','Հոկտեմբեր','Նոյեմբեր','Դեկտեմբեր'][Number(parts.month)-1];
 $('#calendar-year').textContent=parts.year;
 for(let i=0;i<7;i++){
  const day=new Date(monday);day.setUTCDate(monday.getUTCDate()+i);
  const item=document.createElement('time');item.className='wedding-calendar-day';item.dateTime=day.toISOString().slice(0,10);
  const label=`${day.getUTCDate()} ${allMonths[day.getUTCMonth()]} ${day.getUTCFullYear()}`;
  const selected=day.getTime()===civil.getTime();item.setAttribute('aria-label',selected?`Հարսանիքի օրը՝ ${label}`:label);
  if(selected){item.classList.add('is-wedding');item.innerHTML='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 41C17 34 4 25 5 15C6 5 19 5 24 14C29 4 43 6 43 16C43 26 29 37 24 41Z"/></svg>';}
  const number=document.createElement('strong');number.textContent=String(day.getUTCDate()).padStart(2,'0');item.append(number);$('#wedding-week-days').append(item);
 }
 $('#hero-date').textContent=numeric;$('#footer-date').textContent=numeric;
 $('#detail-date').textContent=`${Number(parts.day)} ${allMonths[Number(parts.month)-1]} ${parts.year}`;
 $('#detail-time').textContent='14։00՝ Պսակադրություն · 17։30՝ Հարսանյաց հանդես';
}else{$('#detail-date').textContent='Օրը կհստակեցվի';$('#detail-time').textContent='Ժամը կհստակեցվի';}
CONFIG.program.forEach(item=>{const li=document.createElement('li');li.className='reveal';const time=document.createElement('time');time.dateTime=item.time;time.textContent=item.time;const block=document.createElement('div');const title=document.createElement('h3');title.textContent=item.title;const description=document.createElement('p');description.textContent=item.description;block.append(title,description);li.append(time,block);$('#program-items').append(li);});
// Native navigation with Escape/outside-close support.
function closeMenu(){ $('#site-nav').hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','Բացել ցանկը');}
$('#menu-toggle').addEventListener('click',()=>{const open=$('#site-nav').hidden;$('#site-nav').hidden=!open;$('#menu-toggle').setAttribute('aria-expanded',String(open));$('#menu-toggle').setAttribute('aria-label',open?'Փակել ցանկը':'Բացել ցանկը');});
$('#site-nav').querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('#site-nav').hidden){closeMenu();$('#menu-toggle').focus();}});
document.addEventListener('click',event=>{if(!$('#site-nav').hidden&&!event.target.closest('.site-header'))closeMenu();});
const targets=Array.from(document.querySelectorAll('.reveal')),motion=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver'in window){document.body.classList.add('js-reveal');const observer=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target);}}),{threshold:0,rootMargin:'0px 0px 20px 0px'});const revealAll=()=>{targets.forEach(t=>t.classList.add('is-visible'));observer.disconnect();};if(motion.matches)revealAll();else targets.forEach(t=>observer.observe(t));motion.addEventListener('change',e=>{if(e.matches)revealAll();});}
const form=$('#rsvp-form'),isPreview=!CONFIG.rsvpEndpoint;
$('#preview-note').hidden=!isPreview;
let submitting=false;
async function sendRSVP(payload){
  const endpoint=safeURL(CONFIG.rsvpEndpoint,true);if(!endpoint)throw new Error('Invalid endpoint');
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
  try{const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});if(!response.ok)throw new Error('Request failed');}finally{clearTimeout(timeout);}
}
form.addEventListener('submit',async event=>{
  event.preventDefault();if(submitting)return;
  const name=$('#full-name');name.setCustomValidity(name.value.trim().split(/\s+/).length<2 ? 'Խնդրում ենք նշել անունը և ազգանունը։' : '');if(!form.reportValidity())return;
  const status=$('#form-status');status.classList.remove('error');
  if(isPreview){status.textContent='Դաշտերը ճիշտ են լրացված։ Սա ցուցադրական ձև է․ պատասխանը չի ուղարկվել և չի պահպանվել։';status.focus();return;}
  const payload={fullName:name.value.trim(),attendance:form.elements.attendance.value,comment:''};
  submitting=true;$('#submit-rsvp').disabled=true;form.setAttribute('aria-busy','true');status.textContent='Ուղարկվում է…';
  try{await sendRSVP(payload);status.textContent='Շնորհակալություն։ Ձեր պատասխանն ընդունված է։';form.reset();}
  catch{status.classList.add('error');status.textContent='Չհաջողվեց հաստատել պատասխանի ընդունումը։ Փորձեք ավելի ուշ կամ կապվեք կազմակերպչի հետ։';}
  finally{submitting=false;$('#submit-rsvp').disabled=false;form.removeAttribute('aria-busy');status.focus();}
});
$('#full-name').addEventListener('input',event=>event.target.setCustomValidity(''));
document.dispatchEvent(new Event('invitation:opened'));

const weddingMusic=$('#wedding-music'),musicButton=$('#music-toggle');
weddingMusic.volume=.35;
function syncMusic(){const playing=!weddingMusic.paused;musicButton.classList.toggle('is-playing',playing);musicButton.setAttribute('aria-pressed',String(playing));musicButton.setAttribute('aria-label',playing?'Դադարեցնել երաժշտությունը':'Միացնել երաժշտությունը');}
function playMusic(){const request=weddingMusic.play();if(request&&request.catch)request.catch(syncMusic);}
weddingMusic.addEventListener('play',syncMusic);weddingMusic.addEventListener('pause',syncMusic);weddingMusic.addEventListener('error',syncMusic);
musicButton.addEventListener('click',()=>{if(weddingMusic.paused)playMusic();else weddingMusic.pause();});
let opened=false;
$('#open-envelope').addEventListener('click',()=>{
 if(opened)return;opened=true;$('#open-envelope').disabled=true;$('#open-envelope').setAttribute('aria-expanded','true');$('#entry-cover').classList.add('opening');
 playMusic();
 const reduced=motion.matches;
 setTimeout(()=>{$('#invitation').hidden=false;$('#entry-cover').classList.add('leaving');document.body.classList.remove('cover-active');},reduced?0:3800);
 setTimeout(()=>{$('#entry-cover').hidden=true;window.scrollTo({top:0,behavior:'instant'});$('h1').tabIndex=-1;$('h1').focus({preventScroll:true});},reduced?0:5300);
});
