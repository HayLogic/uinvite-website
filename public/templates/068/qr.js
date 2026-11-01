'use strict';
const invitationURL='https://uinvite.am/templates/068/index.html';
const status=document.getElementById('qr-status');
const copyButton=document.getElementById('copy-link');
if(navigator.clipboard?.writeText){
 copyButton.hidden=false;
 copyButton.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(invitationURL);status.textContent='Հղումը պատճենված է։';}catch{status.textContent='Չհաջողվեց պատճենել։ Կարող եք օգտվել ներբեռնման կոճակից։';}});
}
const shareButton=document.getElementById('share-qr');
// Prepare the local PNG once; keep navigator.share inside the user's click.
if(navigator.share&&navigator.canShare){
 fetch('assets/invitation-qr.png').then(response=>{if(!response.ok)throw Error('QR unavailable');return response.blob();}).then(blob=>{
  const file=new File([blob],'uinvite-068-qr.png',{type:'image/png'});
  if(!navigator.canShare({files:[file]}))return;
  shareButton.hidden=false;
  shareButton.addEventListener('click',async()=>{try{await navigator.share({files:[file],title:'Ամանորյա հրավիրատոմս · 068',text:invitationURL});status.textContent='QR կոդը փոխանցված է ուղարկման պատուհանին։';}catch(error){if(error.name!=='AbortError')status.textContent='Կարող եք ներբեռնել QR-ը և ուղարկել որպես նկար։';}});
 }).catch(()=>{status.textContent='Չհաջողվեց պատրաստել QR-ը ուղարկման համար։ Փորձեք ներբեռնել այն։';});
}
