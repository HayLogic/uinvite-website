/* =========================================================
   DATA
========================================================= */

var WEDDING_ISO = "2027-07-07T11:00:00+04:00";
var WEDDING_DATE = new Date(WEDDING_ISO);

var SCHEDULE = [
  { time: "11:00", title: "Հարսի տուն" },
  { time: "12:30", title: "Փեսայի տուն" },
  { time: "15:00", title: "Սուրբ Գևորգ եկեղեցի" },
  { time: "17:30", title: "Ռեստորան «Ադանա»" }
];

var VENUES = [
  {
    label: "Պսակադրություն",
    name: "Սուրբ Գևորգ եկեղեցի",
    time: "15:00"
  },
  {
    label: "Հանդիսություն",
    name: "Ռեստորան «Ադանա»",
    time: "17:30"
  }
];

var DRESS_COLORS = [
  { name: "Շոկոլադե", hex: "#4A382C" },
  { name: "Էմերալդ", hex: "#2F4A3C" },
  { name: "Խակի", hex: "#6E6A52" },
  { name: "Փոշոտ վարդագույն", hex: "#C4A79A" },
  { name: "Բեժ", hex: "#C9B8A2" },
  { name: "Կրեմ", hex: "#EDE4D6" }
];


/* =========================================================
   TOAST
========================================================= */

var toastEl = document.getElementById("toast");

function toast(t) {

  if (!toastEl) return;

  toastEl.textContent = t;
  toastEl.classList.add("show");

  clearTimeout(toast._t);

  toast._t = setTimeout(function () {
    toastEl.classList.remove("show");
  }, 2600);
}





/* =========================================================
   CALENDAR
========================================================= */

(function () {

  var labels = [
    "ԵՐԿ",
    "ԵՐՔ",
    "ՉՐՔ",
    "ՀՆԳ",
    "ՈՒՐ",
    "ՇԲԹ",
    "ԿԻՐ"
  ];

  var week = [5, 6, 7, 8, 9, 10, 11];

  var WD = 7;

  var html = "";


  labels.forEach(function (d) {

    html +=
      '<span class="dl">' +
      d +
      "</span>";

  });


  week.forEach(function (day) {

    if (day === WD) {

      html +=
        '<span class="cell">' +
          '<span class="day">' +

            '<svg viewBox="0 0 24 24" fill="currentColor">' +
              '<path d="M12 21S3.5 15 2.2 9.7C1.2 5.6 4 3 7 3c2.2 0 4 1.6 5 3.4C13 4.6 14.8 3 17 3c3 0 5.8 2.6 4.8 6.7C20.5 15 12 21 12 21z"/>' +
            '</svg>' +

            "<span>" +
              day +
            "</span>" +

          "</span>" +
        "</span>";

    } else {

      html +=
        '<span class="cell">' +
        day +
        "</span>";

    }

  });


  var calendarEl =
    document.getElementById("calgrid");

  if (calendarEl) {
    calendarEl.innerHTML = html;
  }

})();


/* =========================================================
   TIMELINE LABELS
========================================================= */

(function () {

  var W = 320;
  var H = 520;
  var gap = 14;

  var nodes = [
    {
      x: 200,
      y: 95,
      side: "left"
    },
    {
      x: 120,
      y: 205,
      side: "right"
    },
    {
      x: 230,
      y: 315,
      side: "left"
    },
    {
      x: 130,
      y: 425,
      side: "right"
    }
  ];

  var html = "";


  SCHEDULE.forEach(function (item, i) {

    var n =
      nodes[i] ||
      nodes[0];

    var left =
      n.side === "left"
        ? n.x - gap
        : n.x + gap;


    html +=
      '<div class="tl-item" ' +

        'style="' +

          'left:' +
          (left / W * 100) +
          '%;' +

          'top:' +
          (n.y / H * 100) +
          '%;' +

          'transform:translate(' +
          (n.side === "left"
            ? "-100%"
            : "0") +
          ',-50%);' +

          'text-align:' +
          (n.side === "left"
            ? "right"
            : "left") +

        '">' +

        '<p class="t script" style="margin:0">' +
          item.time +
        "</p>" +

        '<p class="n" style="margin:0">' +
          item.title +
        "</p>" +

      "</div>";

  });


  var timelineItems =
    document.getElementById("tlItems");

  if (timelineItems) {
    timelineItems.innerHTML = html;
  }

})();


/* =========================================================
   ICS
========================================================= */

function buildIcs() {

  function dt(d) {

    return d
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";

  }


  var end =
    new Date(
      WEDDING_DATE.getTime() +
      12 * 3600 * 1000
    );


  return [

    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ani & Armen//Wedding//HY",
    "BEGIN:VEVENT",

    "UID:" +
      Date.now() +
      "@ani-armen-wedding",

    "DTSTAMP:" +
      dt(new Date()),

    "DTSTART:" +
      dt(WEDDING_DATE),

    "DTEND:" +
      dt(end),

    "SUMMARY:Անի և Արմեն — Հարսանիք",

    "DESCRIPTION:11:00 Հարսի տուն / 12:30 Փեսայի տուն / 15:00 Սուրբ Գևորգ եկեղեցի / 17:30 Ռեստորան Ադանա",

    "LOCATION:Սուրբ Գևորգ եկեղեցի",

    "END:VEVENT",
    "END:VCALENDAR"

  ].join("\r\n");
}


var icsBtn =
  document.getElementById("icsBtn");

if (icsBtn) {

  icsBtn.addEventListener(
    "click",
    function () {

      var blob =
        new Blob(
          [buildIcs()],
          {
            type:
              "text/calendar;charset=utf-8"
          }
        );


      var url =
        URL.createObjectURL(blob);

      var a =
        document.createElement("a");

      a.href = url;

      a.download =
        "ani-armen-wedding.ics";

      a.click();

      URL.revokeObjectURL(url);

    }
  );

}


/* =========================================================
   COUNTDOWN
========================================================= */

(function () {

  var el =
    document.getElementById("cd");

  if (!el) return;


  function unit(v, l) {

    return (
      '<div class="u">' +

        '<div class="circle">' +

          "<b>" +
            String(v).padStart(2, "0") +
          "</b>" +

        "</div>" +

        '<span class="lb">' +
          l +
        "</span>" +

      "</div>"
    );

  }


  function tick() {

    var ms =
      WEDDING_DATE.getTime() -
      Date.now();


    if (ms <= 0) {

      el.innerHTML =
        '<p style="font-family:var(--serif);font-size:1.5rem">' +
          "Այսօր է մեր օրը" +
        "</p>";

      return;

    }


    var s =
      Math.floor(ms / 1000);


    el.innerHTML =

      unit(
        Math.floor(s / 86400),
        "օր"
      ) +

      unit(
        Math.floor(
          s % 86400 / 3600
        ),
        "ժամ"
      ) +

      unit(
        Math.floor(
          s % 3600 / 60
        ),
        "րոպե"
      ) +

      unit(
        s % 60,
        "վրկ"
      );

  }


  tick();

  setInterval(
    tick,
    1000
  );

})();


/* =========================================================
   VENUES
========================================================= */

var venuesEl =
  document.getElementById("venues");

if (venuesEl) {

  venuesEl.innerHTML =
    VENUES.map(function (v) {

      return (

        '<div class="venue">' +

          '<p class="lab" style="margin:0">' +
            v.label +
            " · " +
            v.time +
          "</p>" +

          '<p class="nm" style="margin:0">' +
            v.name +
          "</p>" +

          '<a target="_blank" rel="noreferrer" href="' +

            "https://www.google.com/maps/search/?api=1&query=" +

            encodeURIComponent(v.name) +

          '">' +

            "Բացել քարտեզում" +

          "</a>" +

        "</div>"

      );

    }).join("");

}


/* =========================================================
   PALETTE
========================================================= */

var paletteEl =
  document.getElementById("palette");

if (paletteEl) {

  paletteEl.innerHTML =
    DRESS_COLORS.map(function (c) {

      return (

        '<div class="c">' +

          '<span class="sw" style="background:' +
            c.hex +
          '"></span>' +

          '<span class="nm">' +
            c.name +
          "</span>" +

        "</div>"

      );

    }).join("");

}


/* =========================================================
   RSVP
========================================================= */

(function () {

  var attending = true;
  var guests = 1;

  var guestBlock =
    document.getElementById("guestBlock");

  var guestsEl =
    document.getElementById("guests");


  document
    .querySelectorAll(".choices button")
    .forEach(function (b) {

      b.addEventListener(
        "click",
        function () {

          attending =
            b.dataset.att === "1";


          document
            .querySelectorAll(
              ".choices button"
            )
            .forEach(function (x) {

              x.classList.remove(
                "active"
              );

            });


          b.classList.add(
            "active"
          );


          if (guestBlock) {

            guestBlock.style.display =
              attending
                ? "flex"
                : "none";

          }

        }
      );

    });


  var minus =
    document.getElementById("minus");

  var plus =
    document.getElementById("plus");


  if (minus) {

    minus.addEventListener(
      "click",
      function () {

        guests =
          Math.max(
            1,
            guests - 1
          );

        if (guestsEl) {
          guestsEl.textContent =
            guests;
        }

      }
    );

  }


  if (plus) {

    plus.addEventListener(
      "click",
      function () {

        guests =
          Math.min(
            10,
            guests + 1
          );

        if (guestsEl) {
          guestsEl.textContent =
            guests;
        }

      }
    );

  }


  var rsvpForm =
    document.getElementById(
      "rsvpForm"
    );


  if (!rsvpForm) return;


  rsvpForm.addEventListener(
    "submit",
    function (e) {

      e.preventDefault();


      var nameEl =
        document.getElementById("nm");


      var name =
        nameEl
          ? nameEl.value.trim()
          : "";


      if (!name) {

        toast(
          "Խնդրում ենք նշել Ձեր անունը"
        );

        return;

      }


      var transport =
        document.getElementById(
          "transport"
        );


      var msgEl =
        document.getElementById("msg");


      var data = {

        full_name:
          name,

        guest_count:
          attending
            ? guests
            : 0,

        attending:
          attending,

        needs_transport:
          transport
            ? transport.checked
            : false,

        message:
          msgEl
            ? msgEl.value.trim() || null
            : null

      };


      try {

        var all =
          JSON.parse(
            localStorage.getItem(
              "rsvps"
            ) || "[]"
          );


        all.push(data);


        localStorage.setItem(
          "rsvps",
          JSON.stringify(all)
        );

      } catch (err) {}


      var rsvpWrap =
        document.getElementById(
          "rsvpWrap"
        );


      if (rsvpWrap) {

        rsvpWrap.innerHTML =
          '<p style="margin:2rem auto 0;max-width:24rem;text-align:center;font-family:var(--serif);font-size:1.125rem">' +

            "Շնորհակալություն։ Մենք ստացանք Ձեր պատասխանը ♥" +

          "</p>";

      }


      toast(
        "Շնորհակալություն Ձեր պատասխանի համար"
      );

    }
  );

})();


/* =========================================================
   TIMELINE
   DAY 7 ALIGNMENT + MOVING HEART
========================================================= */
/* =========================================================
   WEDDING TIMELINE
========================================================= */

var timelineSvg =
  document.getElementById("timelineSvg");

var timelinePath =
  document.getElementById("timelinePath");

var timelineHeart =
  document.getElementById("movingHeart");

var calendar =
  document.getElementById("calgrid");

var timelineLength = 0;


/* =========================================================
   EVENTS
========================================================= */

var timelineEvents = [

  {
    dot: document.getElementById("dot1"),
    item: document.getElementById("event1"),
    progress: 0.20
  },

  {
    dot: document.getElementById("dot2"),
    item: document.getElementById("event2"),
    progress: 0.405
  },

  {
    dot: document.getElementById("dot3"),
    item: document.getElementById("event3"),
    progress: 0.615
  },

  {
    dot: document.getElementById("dot4"),
    item: document.getElementById("event4"),
    progress: 0.825
  }

];


/* =========================================================
   FIND DAY 7
========================================================= */

function getDay7() {

  if (!calendar) {
    return null;
  }

  var cells =
    calendar.querySelectorAll(".cell");

  for (
    var i = 0;
    i < cells.length;
    i++
  ) {

    if (
      cells[i].textContent.trim() === "7"
    ) {
      return cells[i];
    }

  }

  return null;
}


/* =========================================================
   ALIGN LINE WITH DAY 7
========================================================= */

function alignTimelineToDay7() {

  if (
    !timelineSvg ||
    !timelinePath ||
    !calendar
  ) {
    return;
  }


  var day7 =
    getDay7();

  if (!day7) {
    return;
  }


  var dayRect =
    day7.getBoundingClientRect();


  var day7CenterX =
    dayRect.left +
    dayRect.width / 2;


  var svgRect =
    timelineSvg.getBoundingClientRect();


  /*
   * Convert actual screen position
   * of 7 into SVG coordinate.
   */

  var startX =
    (
      day7CenterX -
      svgRect.left
    ) /
    svgRect.width *
    320;


  startX =
    Math.max(
      10,
      Math.min(
        310,
        startX
      )
    );


  /*
   * Wide S-shaped timeline
   */

  var pathD =

    "M " + startX + " 0 " +

    "C " +
      startX + " 65, " +
      "300 75, " +
      "300 145 " +

    "C " +
      "300 225, " +
      "15 240, " +
      "15 315 " +

    "C " +
      "15 395, " +
      "305 400, " +
      "305 475 " +

    "C " +
      "305 500, " +
      "285 510, " +
      "265 520";


  timelinePath.setAttribute(
    "d",
    pathD
  );


  timelineLength =
    timelinePath.getTotalLength();


  positionTimelineDots();

  updateTimelineHeart();

}


/* =========================================================
   DOTS FOLLOW THE LINE
========================================================= */

function positionTimelineDots() {

  if (
    !timelinePath ||
    !timelineLength
  ) {
    return;
  }


  timelineEvents.forEach(
    function(event) {

      if (!event.dot) {
        return;
      }


      var point =
        timelinePath.getPointAtLength(
          timelineLength *
          event.progress
        );


      event.dot.setAttribute(
        "cx",
        point.x
      );


      event.dot.setAttribute(
        "cy",
        point.y
      );

    }
  );

}


/* =========================================================
   MOVING HEART
========================================================= */

function updateTimelineHeart() {

  if (
    !timelineSvg ||
    !timelinePath ||
    !timelineHeart
  ) {
    return;
  }


  if (!timelineLength) {

    timelineLength =
      timelinePath.getTotalLength();

  }


  var rect =
    timelineSvg.getBoundingClientRect();


  var viewportHeight =
    window.innerHeight;


  /*
   * Heart starts moving
   * when timeline enters viewport.
   */

  var start =
    viewportHeight * 0.82;


  /*
   * Finish near top.
   */

  var end =
    viewportHeight * 0.12;


  var progress =
    (
      start -
      rect.top
    ) /
    (
      rect.height +
      start -
      end
    );


  progress =
    Math.max(
      0,
      Math.min(
        1,
        progress
      )
    );


  /*
   * Get exact point on line.
   */

  var point =
    timelinePath.getPointAtLength(
      progress *
      timelineLength
    );


  /*
   * IMPORTANT:
   * Small heart.
   */

timelineHeart.setAttribute(
  "transform",
  "translate(" +
    (point.x - 10) +
    "," +
    (point.y - 10) +
  ")"
);

  /*
   * Activate event text.
   */

  timelineEvents.forEach(
    function(event) {

      if (!event.item) {
        return;
      }


      /*
       * Heart reaches event.
       */

      if (
        progress >=
        event.progress - 0.025
      ) {

        event.item.classList.add(
          "active"
        );

      } else {

        event.item.classList.remove(
          "active"
        );

      }

    }
  );

}


/* =========================================================
   SCROLL
========================================================= */

var timelineTicking = false;


window.addEventListener(
  "scroll",
  function() {

    if (timelineTicking) {
      return;
    }


    timelineTicking = true;


    requestAnimationFrame(
      function() {

        updateTimelineHeart();

        timelineTicking = false;

      }
    );

  },
  {
    passive: true
  }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
  "resize",
  function() {

    alignTimelineToDay7();

  }
);


/* =========================================================
   INITIALIZE
========================================================= */

function initializeTimeline() {

  setTimeout(
    function() {

      alignTimelineToDay7();

    },
    200
  );

}


if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeTimeline
  );

} else {

  initializeTimeline();

}

const eventDate = new Date("2027-07-07T15:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* =========================================================
   GALLERY SLIDER
========================================================= */

const galleryTrack = document.getElementById("galleryTrack");
const gallerySlider = document.querySelector(".gallery-slider");
const galleryDots = document.querySelectorAll("#galleryDots span");

let galleryIndex = 0;
let galleryTimer;

function getVisibleSlides() {
  return window.innerWidth <= 600 ? 2 : 3;
}

function getSlideWidth() {
  const slides = document.querySelectorAll(".gallery-slide");

  if (!slides.length) return 0;

  const gap =
    parseFloat(
      getComputedStyle(galleryTrack).gap
    ) || 0;

  return slides[0].getBoundingClientRect().width + gap;
}

function moveGallery(index) {

  const slides =
    document.querySelectorAll(".gallery-slide");

  const visible =
    getVisibleSlides();

  const maxIndex =
    Math.max(0, slides.length - visible);

  galleryIndex = index;

  if (galleryIndex > maxIndex) {
    galleryIndex = 0;
  }

  if (galleryIndex < 0) {
    galleryIndex = maxIndex;
  }

  const distance =
    galleryIndex * getSlideWidth();

  galleryTrack.style.transform =
    `translateX(-${distance}px)`;

  galleryDots.forEach((dot, i) => {
    dot.classList.toggle(
      "active",
      i === galleryIndex
    );
  });
}


/* Automatic sliding */

function startGallery() {

  clearInterval(galleryTimer);

  galleryTimer = setInterval(() => {

    moveGallery(galleryIndex + 1);

  }, 3500);
}

startGallery();


/* Recalculate on resize */

window.addEventListener("resize", () => {
  moveGallery(galleryIndex);
});


/* =========================================================
   TOUCH / SWIPE
========================================================= */

let touchStartX = 0;
let touchEndX = 0;

gallerySlider.addEventListener(
  "touchstart",
  (e) => {

    touchStartX =
      e.changedTouches[0].screenX;

    clearInterval(galleryTimer);
  },
  { passive: true }
);


gallerySlider.addEventListener(
  "touchend",
  (e) => {

    touchEndX =
      e.changedTouches[0].screenX;

    const difference =
      touchStartX - touchEndX;

    if (Math.abs(difference) > 45) {

      if (difference > 0) {
        moveGallery(galleryIndex + 1);
      } else {
        moveGallery(galleryIndex - 1);
      }

    }

    startGallery();
  },
  { passive: true }
);

/* =====================================================
   OPEN INVITATION
===================================================== */
/* =========================================================
   OPEN INVITATION + MUSIC
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const openingScreen =
        document.getElementById("openingScreen");

    const music =
        document.getElementById("backgroundMusic");

    const musicToggle =
        document.getElementById("musicToggle");


    if (!openingScreen) return;


    /* =========================================
       OPEN INVITATION
    ========================================= */

    openingScreen.addEventListener(
        "click",
        function () {

            if (
                openingScreen.classList.contains(
                    "opening"
                )
            ) {
                return;
            }


            /* =====================================
               START MUSIC
            ===================================== */

            if (music) {

                music.volume = 0.7;

                music.play()
                    .then(function () {

                        if (musicToggle) {

                            musicToggle.innerHTML =
                                "Ⅱ";

                            musicToggle.classList.add(
                                "playing"
                            );

                        }

                    })
                    .catch(function (error) {

                        console.log(
                            "Music playback blocked:",
                            error
                        );

                    });

            }


            /* =====================================
               OPEN SCREEN
            ===================================== */

            openingScreen.classList.add(
                "opening"
            );


            /* =====================================
               REMOVE OPENING SCREEN
            ===================================== */

            setTimeout(function () {

                openingScreen.remove();

                document.body.classList.add(
                    "opened"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });

            }, 0);

        }
    );


    /* =========================================
       MUSIC TOGGLE
    ========================================= */

    if (musicToggle && music) {

        musicToggle.addEventListener(
            "click",
            function (e) {

                e.stopPropagation();


                if (music.paused) {

                    music.play()
                        .then(function () {

                            musicToggle.innerHTML =
                                "Ⅱ";

                            musicToggle.classList.add(
                                "playing"
                            );

                        })
                        .catch(function () {});


                } else {

                    music.pause();

                    musicToggle.innerHTML =
                        "♫";

                    musicToggle.classList.remove(
                        "playing"
                    );

                }

            }
        );

    }

});