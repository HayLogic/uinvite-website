'use strict';
const guests=window.SEATING_GUESTS;
const floor=document.getElementById('floor'),popup=document.getElementById('popup'),search=document.getElementById('search'),status=document.getElementById('search-status');
let selectedTable=null,lastFocus=null;
const query=()=>search.value.trim().toLocaleLowerCase('hy');
function matches(name){return Boolean(query())&&name.toLocaleLowerCase('hy').includes(query());}
for(const [table,names] of Object.entries(guests)){
 const wrap=document.createElement('div');wrap.className='table-wrap';
 const round=document.createElement('div');round.className='round';
 const button=document.createElement('button');button.type='button';button.className='table';button.dataset.table=table;button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','popup');button.setAttribute('aria-label',`Բացել սեղան ${table}, ${names.length} հյուր`);
 button.append('Սեղան',document.createElement('br'),table);button.addEventListener('click',()=>showTable(table));round.append(button);
 names.forEach((name,i)=>{const seat=document.createElement('span');seat.className='seat';seat.textContent=i+1;seat.setAttribute('aria-hidden','true');const angle=(i*360/names.length-90)*Math.PI/180;seat.style.left=(130+105*Math.cos(angle)-17)+'px';seat.style.top=(130+105*Math.sin(angle)-17)+'px';round.append(seat);});
 wrap.append(round);floor.append(wrap);
}
function renderPopup(){
 const table=document.getElementById('ptable');table.replaceChildren();
 const size=Math.max(220,Math.min(520,document.querySelector('.popup-card').clientWidth-32));table.style.width=size+'px';table.style.height=size+'px';
 const center=document.createElement('div');center.className='center';center.style.width=center.style.height=size*.28+'px';center.style.fontSize=Math.max(16,size*.045)+'px';center.append('Սեղան',document.createElement('br'),selectedTable);table.append(center);
 const names=guests[selectedTable];names.forEach((name,i)=>{const seat=document.createElement('div');seat.className='pseat';seat.classList.toggle('is-match',matches(name));seat.textContent=name;const width=size*.18,height=size*.075,angle=(i*360/names.length-90)*Math.PI/180;Object.assign(seat.style,{width:width+'px',height:height+'px',fontSize:Math.max(9,size*.022)+'px',left:(size/2+size*.36*Math.cos(angle)-width/2)+'px',top:(size/2+size*.36*Math.sin(angle)-height/2)+'px'});table.append(seat);});
 document.getElementById('popup-title').textContent=`Սեղան ${selectedTable}`;
}
function showTable(n){selectedTable=n;lastFocus=document.activeElement;if(!popup.open)popup.showModal();document.body.classList.add('modal-open');renderPopup();document.getElementById('close').focus();}
function closePopup(){popup.close();}
document.getElementById('close').addEventListener('click',closePopup);
popup.addEventListener('click',event=>{if(event.target===popup)closePopup();});
popup.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastFocus?.focus();});
window.addEventListener('resize',()=>{if(popup.open)renderPopup();});
search.addEventListener('input',()=>{
 let matchingTables=0,matchingGuests=0;
 for(const [table,names]of Object.entries(guests)){const count=names.filter(matches).length;document.querySelector(`[data-table="${table}"]`).classList.toggle('is-match',count>0);if(count){matchingTables++;matchingGuests+=count;}}
 status.textContent=!query()?'':matchingTables?`Գտնվել է ${matchingGuests} հյուր՝ ${matchingTables} սեղանի մոտ։`:'Այս անունով հյուր չի գտնվել։';
 if(popup.open)renderPopup();
});
