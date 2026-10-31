document.addEventListener('DOMContentLoaded',function(){
  function sendH(){var h=document.documentElement.offsetHeight;if(window.parent!==window)window.parent.postMessage({type:'SET_HEIGHT',height:h},'*');}
  sendH();window.addEventListener('resize',sendH);
  document.querySelectorAll('img').forEach(function(im){if(!im.complete)im.addEventListener('load',sendH);});
  [400,1000,2000].forEach(function(t){setTimeout(sendH,t);});

  var f=document.getElementById('rsvp-form');var th=document.getElementById('thanks');
  if(f) f.addEventListener('submit',function(e){e.preventDefault();f.style.display='none';th.classList.add('show');setTimeout(sendH,50);});
});
