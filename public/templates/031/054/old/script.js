  var TARGET = new Date("2027-07-07T15:00:00+04:00").getTime();
  function pad(n){ return String(n).padStart(2,"0"); }
  function tick(){
    var left = Math.max(0, TARGET - Date.now());
    var s = Math.floor(left/1000);
    document.getElementById("d").textContent = pad(Math.floor(s/86400));
    document.getElementById("h").textContent = pad(Math.floor((s%86400)/3600));
    document.getElementById("m").textContent = pad(Math.floor((s%3600)/60));
    document.getElementById("s").textContent = pad(s%60);
  }
  tick();
  setInterval(tick, 1000);