/* =====================================================
   ELEMENTS
===================================================== */

const envelope = document.getElementById("envelope");

const seal = document.getElementById("seal");

const intro = document.getElementById("envelopeIntro");

const mainPage = document.getElementById("mainPage");

const scene = document.getElementById("scene");

const envelopeWrapper =
    document.getElementById("envelopeWrapper");

const clickHint =
    document.getElementById("clickHint");


/* =====================================================
   MUSIC ELEMENTS
===================================================== */

const music =
    document.getElementById("backgroundMusic");

const musicToggle =
    document.getElementById("musicToggle");


/* =====================================================
   MUSIC FUNCTIONS
===================================================== */

function startMusic() {

    if (!music) {
        return;
    }

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
}


/* =====================================================
   UPDATE MUSIC BUTTON
===================================================== */

function updateMusicButton() {

    if (!music || !musicToggle) {
        return;
    }


    if (music.paused) {

        musicToggle.textContent = "♫";

        musicToggle.classList.remove(
            "playing"
        );

    } else {

        musicToggle.textContent = "Ⅱ";

        musicToggle.classList.add(
            "playing"
        );

    }

}


/* =====================================================
   OPEN INVITATION
===================================================== */

let isOpening = false;


if (seal) {

    seal.addEventListener(
        "click",
        function () {

            /* Prevent double click */

            if (isOpening) {
                return;
            }


            isOpening = true;


            /* =========================================
               START MUSIC
            ========================================= */

            startMusic();


            /* =========================================
               OPEN ENVELOPE
            ========================================= */

            if (envelope) {

                envelope.classList.add(
                    "open"
                );

            }


            if (intro) {

                intro.classList.add(
                    "opened"
                );

            }


            /* =========================================
               HIDE HINT
            ========================================= */

            if (clickHint) {

                clickHint.style.opacity =
                    "0";

            }


            /* =========================================
               SHOW MAIN PAGE
            ========================================= */

            setTimeout(
                function () {

                    if (intro) {

                        intro.classList.add(
                            "hide"
                        );

                    }


                    document.body.classList.add(
                        "show-main"
                    );


                    document.body.style.overflow =
                        "auto";

                },
                1250
            );

        }
    );

}


/* =====================================================
   MUSIC TOGGLE
===================================================== */

if (musicToggle && music) {

    musicToggle.addEventListener(
        "click",
        function (event) {

            /*
             * Prevent this click from
             * triggering the envelope.
             */

            event.stopPropagation();


            /* =====================================
               PAUSE
            ===================================== */

            if (!music.paused) {

                music.pause();

                updateMusicButton();

                return;

            }


            /* =====================================
               PLAY
            ===================================== */

            music.play()
                .then(function () {

                    updateMusicButton();

                })
                .catch(function (error) {

                    console.log(
                        "Music could not play:",
                        error
                    );

                });

        }
    );


    /* Keep button synced with audio */

    music.addEventListener(
        "play",
        updateMusicButton
    );


    music.addEventListener(
        "pause",
        updateMusicButton
    );

}


/* =====================================================
   DESKTOP 3D MOUSE EFFECT
===================================================== */

if (scene && envelopeWrapper) {

    scene.addEventListener(
        "mousemove",
        function (event) {

            /*
               Do not move while opening
            */

            if (isOpening) {
                return;
            }


            const mouseX =
                event.clientX /
                window.innerWidth -
                0.5;


            const mouseY =
                event.clientY /
                window.innerHeight -
                0.5;


            const rotateY =
                mouseX * 22;


            const rotateX =
                (-mouseY * 17) + 12;


            const rotateZ =
                -4 + mouseX * 3;


            const translateZ =
                40;


            envelopeWrapper.style.transform = `

                rotateX(${rotateX}deg)

                rotateY(${rotateY - 16}deg)

                rotateZ(${rotateZ}deg)

                translateZ(${translateZ}px)

            `;

        }
    );


    /* =================================================
       MOUSE LEAVE
    ================================================= */

    scene.addEventListener(
        "mouseleave",
        function () {

            if (isOpening) {
                return;
            }


            envelopeWrapper.style.transform = `

                rotateX(12deg)

                rotateY(-16deg)

                rotateZ(-4deg)

                translateZ(40px)

            `;

        }
    );


    /* =================================================
       MOBILE TOUCH 3D
    ================================================= */

    scene.addEventListener(
        "touchmove",
        function (event) {

            if (isOpening) {
                return;
            }


            if (!event.touches.length) {
                return;
            }


            const touch =
                event.touches[0];


            const x =
                touch.clientX /
                window.innerWidth -
                0.5;


            const y =
                touch.clientY /
                window.innerHeight -
                0.5;


            const rotateX =
                (-y * 12) + 8;


            const rotateY =
                (x * 15) - 8;


            envelopeWrapper.style.transform = `

                rotateX(${rotateX}deg)

                rotateY(${rotateY}deg)

                rotateZ(-3deg)

                translateZ(30px)

            `;

        },
        {
            passive: true
        }
    );


    /* =================================================
       RESET AFTER TOUCH
    ================================================= */

    scene.addEventListener(
        "touchend",
        function () {

            if (isOpening) {
                return;
            }


            envelopeWrapper.style.transform = `

                rotateX(8deg)

                rotateY(-8deg)

                rotateZ(-3deg)

                translateZ(30px)

            `;

        }
    );

}