
/* =========================================================
   50TH BIRTHDAY INVITATION
   NEW SCRIPT
========================================================= */


/* =========================================================
   50TH BIRTHDAY DATA
========================================================= */

const BIRTHDAY_DATE =
    new Date("2027-07-07T19:00:00+04:00");


const BIRTHDAY_DATA = {

    name: "ԱՆՈՒՆ ԱԶԳԱՆՈՒՆ",

    date: "07 ՀՈՒԼԻՍ 2027",

    time: "19:00",

    restaurant: "«ՌԵՍՏՈՐԱՆԻ ԱՆՈՒՆ»"

};


/* =========================================================
   TOAST
========================================================= */

const toastEl =
    document.getElementById("toast");


function toast(message) {

    if (!toastEl) return;

    toastEl.textContent = message;

    toastEl.classList.add("show");

    clearTimeout(toastEl._timer);

    toastEl._timer =
        setTimeout(() => {

            toastEl.classList.remove("show");

        }, 2500);
}


/* =========================================================
   ENVELOPE OPEN
========================================================= */

const openBtn =
    document.getElementById("openBtn");

const envelope =
    document.getElementById("envelope");


if (openBtn && envelope) {

    openBtn.addEventListener("click", openInvitation);

}


function openInvitation() {

    /* Prevent double click */

    if (
        document.body.classList.contains("opening") ||
        document.body.classList.contains("opened")
    ) {
        return;
    }


    /*
     * Start opening animation.
     *
     * The CSS controls the animation:
     *
     * 1. Seal disappears
     * 2. Top flap opens
     * 3. Envelope folds move away
     * 4. Invitation card rises FROM THE TOP
     */

    document.body.classList.add("opening");


    /*
     * Keep the large invitation visible
     * before removing the envelope screen.
     */

    // setTimeout(() => {

    //     document.body.classList.add("opened");

    // }, 5000);

}


/* =========================================================
   PREVENT BUTTON FORM SUBMISSION
========================================================= */

if (openBtn) {

    openBtn.setAttribute(
        "type",
        "button"
    );

}


/* =========================================================
   COUNTDOWN
========================================================= */

(function () {

    const daysEl =
        document.getElementById("days");

    const hoursEl =
        document.getElementById("hours");

    const minutesEl =
        document.getElementById("minutes");

    const secondsEl =
        document.getElementById("seconds");


    /*
     * If countdown elements don't exist,
     * simply stop.
     */

    if (
        !daysEl ||
        !hoursEl ||
        !minutesEl ||
        !secondsEl
    ) {
        return;
    }


    function updateCountdown() {

        const now =
            Date.now();


        const distance =
            BIRTHDAY_DATE.getTime() -
            now;


        if (distance <= 0) {

            daysEl.textContent = "00";

            hoursEl.textContent = "00";

            minutesEl.textContent = "00";

            secondsEl.textContent = "00";

            return;

        }


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (
                    distance %
                    (1000 * 60)
                ) /
                1000
            );


        daysEl.textContent =
            String(days).padStart(2, "0");


        hoursEl.textContent =
            String(hours).padStart(2, "0");


        minutesEl.textContent =
            String(minutes).padStart(2, "0");


        secondsEl.textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );

})();


/* =========================================================
   ICS CALENDAR
========================================================= */

(function () {

    const icsBtn =
        document.getElementById("icsBtn");


    if (!icsBtn) return;


    function formatICSDate(date) {

        return date
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}/, "");

    }


    icsBtn.addEventListener(
        "click",
        function () {

            const start =
                BIRTHDAY_DATE;


            const end =
                new Date(
                    start.getTime() +
                    4 * 60 * 60 * 1000
                );


            const ics = [

                "BEGIN:VCALENDAR",

                "VERSION:2.0",

                "PRODID:-//Uinvite//50th Birthday//HY",

                "BEGIN:VEVENT",

                "UID:" +
                    Date.now() +
                    "@uinvite",

                "DTSTAMP:" +
                    formatICSDate(
                        new Date()
                    ),

                "DTSTART:" +
                    formatICSDate(
                        start
                    ),

                "DTEND:" +
                    formatICSDate(
                        end
                    ),

                "SUMMARY:50-ամյակ — " +
                    BIRTHDAY_DATA.name,

                "LOCATION:" +
                    BIRTHDAY_DATA.restaurant,

                "DESCRIPTION:50-ամյակի տոնակատարություն",

                "END:VEVENT",

                "END:VCALENDAR"

            ].join("\r\n");


            const blob =
                new Blob(
                    [ics],
                    {
                        type:
                            "text/calendar;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement("a");


            link.href = url;


            link.download =
                "50th-birthday.ics";


            document.body.appendChild(link);


            link.click();


            link.remove();


            setTimeout(() => {

                URL.revokeObjectURL(url);

            }, 1000);

        }
    );

})();


/* =========================================================
   RSVP
========================================================= */

(function () {

    const form =
        document.getElementById(
            "rsvpForm"
        );


    if (!form) return;


    let attending = true;

    let guests = 1;


    const guestBlock =
        document.getElementById(
            "guestBlock"
        );


    const guestsEl =
        document.getElementById(
            "guests"
        );


    /* -----------------------------------------
       ATTENDING BUTTONS
    ----------------------------------------- */

    const choiceButtons =
        document.querySelectorAll(
            ".choices button"
        );


    choiceButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    attending =
                        button.dataset.att === "1";


                    choiceButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
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

        }
    );


    /* -----------------------------------------
       MINUS
    ----------------------------------------- */

    const minus =
        document.getElementById(
            "minus"
        );


    if (minus) {

        minus.addEventListener(
            "click",
            () => {

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


    /* -----------------------------------------
       PLUS
    ----------------------------------------- */

    const plus =
        document.getElementById(
            "plus"
        );


    if (plus) {

        plus.addEventListener(
            "click",
            () => {

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


    /* -----------------------------------------
       FORM
    ----------------------------------------- */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const nameEl =
                document.getElementById(
                    "nm"
                );


            const messageEl =
                document.getElementById(
                    "msg"
                );


            const name =
                nameEl
                    ? nameEl.value.trim()
                    : "";


            if (!name) {

                toast(
                    "Խնդրում ենք նշել Ձեր անունը"
                );

                return;

            }


            const response = {

                name: name,

                attending:
                    attending,

                guests:
                    attending
                        ? guests
                        : 0,

                message:
                    messageEl
                        ? messageEl.value.trim()
                        : "",

                createdAt:
                    new Date().toISOString()

            };


            /*
             * Save locally.
             */

            try {

                const saved =
                    JSON.parse(
                        localStorage.getItem(
                            "birthday_rsvps"
                        ) || "[]"
                    );


                saved.push(response);


                localStorage.setItem(
                    "birthday_rsvps",
                    JSON.stringify(saved)
                );

            } catch (error) {

                console.warn(
                    "RSVP save failed",
                    error
                );

            }


            toast(
                "Շնորհակալություն Ձեր պատասխանի համար ♥"
            );


            form.reset();


            guests = 1;


            if (guestsEl) {

                guestsEl.textContent =
                    "1";

            }

        }
    );

})();


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            }
        );

    });


/* =========================================================
   PAGE READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * Make sure envelope starts closed.
         */

        document.body.classList.remove(
            "opening"
        );

        document.body.classList.remove(
            "opened"
        );


        /*
         * Make sure invitation
         * is initially hidden.
         */

        const card =
            document.querySelector(
                ".card-out"
            );


        if (card) {

            card.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }
);
/* =====================================================
   MUSIC
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const openBtn =
        document.getElementById("openBtn");

    const music =
        document.getElementById("backgroundMusic");

    const musicToggle =
        document.getElementById("musicToggle");


    if (!openBtn || !music) return;


    /* =====================================
       START MUSIC WHEN ENVELOPE IS CLICKED
    ===================================== */

    openBtn.addEventListener("click", function () {

        music.volume = 0.7;

        music.play()
            .then(function () {

                if (musicToggle) {

                    musicToggle.textContent = "Ⅱ";

                    musicToggle.classList.add(
                        "playing"
                    );

                }

            })
            .catch(function (error) {

                console.log(
                    "Music could not start:",
                    error
                );

            });

    });


    /* =====================================
       MUSIC TOGGLE
    ===================================== */

    if (musicToggle) {

        musicToggle.addEventListener(
            "click",
            function (event) {

                /*
                 * Important:
                 * Don't let this click open
                 * the invitation again.
                 */

                event.stopPropagation();


                /* PAUSE */

                if (!music.paused) {

                    music.pause();

                    musicToggle.textContent = "♫";

                    musicToggle.classList.remove(
                        "playing"
                    );

                }


                /* PLAY */

                else {

                    music.play()
                        .then(function () {

                            musicToggle.textContent = "Ⅱ";

                            musicToggle.classList.add(
                                "playing"
                            );

                        })
                        .catch(function () {});

                }

            }
        );

    }

});
