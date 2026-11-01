'use strict';
// Match the page host: public domain after publication, LAN address in local tests.
const invitationURL=location.protocol==='file:'?'https://uinvite.am/templates/068/index.html':new URL('index.html',location.href).href;
const status=document.getElementById('qr-status');
document.querySelector('.qr-address').textContent=invitationURL;
if(['localhost','127.0.0.1','[::1]'].includes(location.hostname)){
 const note=document.getElementById('qr-local-note');note.hidden=false;note.textContent='Այլ սարքով սկանավորելու համար բացեք այս էջը համակարգչի ցանցային հասցեով՝ նույն Wi-Fi ցանցից։';
}
const copyButton=document.getElementById('copy-link');
if(navigator.clipboard?.writeText){copyButton.hidden=false;copyButton.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(invitationURL);status.textContent='Հղումը պատճենված է։';}catch{status.textContent='Չհաջողվեց պատճենել։ Կարող եք օգտվել ներբեռնման կոճակից։';}});}
function generateQR(){
 const qr=qrcode(0,'M');qr.addData(invitationURL);qr.make();
 const count=qr.getModuleCount(),cell=10,border=4,canvas=document.createElement('canvas');canvas.width=canvas.height=(count+border*2)*cell;
 const context=canvas.getContext('2d');context.fillStyle='#fff8e8';context.fillRect(0,0,canvas.width,canvas.height);context.fillStyle='#310c18';
 for(let row=0;row<count;row++)for(let col=0;col<count;col++)if(qr.isDark(row,col))context.fillRect((col+border)*cell,(row+border)*cell,cell,cell);
 const png=canvas.toDataURL('image/png');document.getElementById('qr-image').src=png;document.getElementById('download-qr').href=png;
 return new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
}
// Generate offline, then keep native sharing inside the visitor's click.
generateQR().then(blob=>{
 const shareButton=document.getElementById('share-qr');
 if(!blob||!navigator.share||!navigator.canShare)return;
 const file=new File([blob],'uinvite-068-qr.png',{type:'image/png'});
 if(!navigator.canShare({files:[file]}))return;
 shareButton.hidden=false;
 shareButton.addEventListener('click',async()=>{try{await navigator.share({files:[file],title:'Ամանորյա հրավիրատոմս · 068',text:invitationURL});status.textContent='QR կոդը փոխանցված է ուղարկման պատուհանին։';}catch(error){if(error.name!=='AbortError')status.textContent='Կարող եք ներբեռնել QR-ը և ուղարկել որպես նկար։';}});
}).catch(()=>{status.textContent='Կարող եք ներբեռնել պահպանված QR-ը՝ կայքի հիմնական հասցեով։';});
