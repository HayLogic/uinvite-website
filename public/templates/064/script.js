// ============================================================
// Arpi's 1st Birthday — Invitation scripts
// Countdown, RSVP form, share button
// ============================================================

(function () {
  "use strict";

  // ---------- Countdown ----------
  var EVENT_TARGET = new Date("2026-10-19T18:00:00+04:00").getTime();

  var cdDays = document.getElementById("cd-days");
  var cdHours = document.getElementById("cd-hours");
  var cdMins = document.getElementById("cd-mins");
  var cdSecs = document.getElementById("cd-secs");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateCountdown() {
    var diff = Math.max(0, EVENT_TARGET - Date.now());
    if (cdDays) cdDays.textContent = String(Math.floor(diff / 86400000));
    if (cdHours) cdHours.textContent = pad(Math.floor(diff / 3600000) % 24);
    if (cdMins) cdMins.textContent = pad(Math.floor(diff / 60000) % 60);
    if (cdSecs) cdSecs.textContent = pad(Math.floor(diff / 1000) % 60);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---------- RSVP form ----------
  var form = document.getElementById("rsvp-form");
  var nameInput = document.getElementById("rsvp-name");
  var guestsSelect = document.getElementById("rsvp-guests");
  var yesMsg = document.getElementById("rsvp-yes");
  var noMsg = document.getElementById("rsvp-no");
  var noBtn = document.getElementById("rsvp-no-btn");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = nameInput.value.trim();
      var guests = guestsSelect.value;
      yesMsg.textContent =
        "Շնորհակալություն" + (name ? ", " + name : "") +
        "։ Արփին սիրով սպասում է ձեզ" +
        (Number(guests) > 1 ? "՝ " + guests + " հոգով" : "") +
        "։";
      form.classList.add("hidden");
      noBtn.classList.add("hidden");
      yesMsg.classList.remove("hidden");
    });
  }

  if (noBtn) {
    noBtn.addEventListener("click", function () {
      form.classList.add("hidden");
      noBtn.classList.add("hidden");
      noMsg.classList.remove("hidden");
    });
  }

  // ---------- Share button ----------
  var shareBtn = document.getElementById("share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(
          function () {
            shareBtn.textContent = "Պատճենված է ✓";
            setTimeout(function () {
              shareBtn.textContent = "Կիսվել հղումով";
            }, 2000);
          },
          function () {
            /* clipboard unavailable — ignore */
          }
        );
      }
    });
  }

  
  // ---------- Opening cover + background music ----------
  var cover = document.getElementById("invitation-cover");
  var openButton = document.getElementById("open-invitation");
  var music = document.getElementById("invitation-music");

  if (cover && openButton) {
    openButton.addEventListener("click", function () {
      // Start music after the guest's click
      if (music) {
        music.volume = 0.5;

        var playPromise = music.play();

        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(function (error) {
            console.warn("Music could not start:", error);
          });
        }
      }

      // Reveal the main invitation
      cover.classList.add("cover-hidden");

      // Remove the cover after its fade-out animation
      window.setTimeout(function () {
        cover.style.display = "none";
      }, 950);
    });
  }

})();
