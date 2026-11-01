document.addEventListener("DOMContentLoaded", () => {

    const API_BASE_URL = "https://api.uinvite.am";

    const TEMPLATE_CODE = "AGAPI";

    const rsvpForm =
        document.getElementById("template-rsvp-form");

    if (!rsvpForm) return;


    // ==========================================
    // RSVP SUBMIT
    // ==========================================

    rsvpForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton =
            rsvpForm.querySelector(".rsvp-submit");

        const attendance =
            rsvpForm.querySelector(
                'input[name="attendance"]:checked'
            )?.value || "";

        const nameInput =
            rsvpForm.querySelector(
                'input[name="guest_name"]'
            );

        const guestCountInput =
            rsvpForm.querySelector(
                'input[name="guest_count"]'
            );

        const name =
            nameInput?.value.trim() || "";

        const guestCount =
            guestCountInput?.value.trim() || "";


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!name) {
            alert("Խնդրում ենք լրացնել Ձեր անունը և ազգանունը։");
            return;
        }

        if (!attendance) {
            alert("Խնդրում ենք նշել՝ կկարողանա՞ք ներկա գտնվել։");
            return;
        }

        if (attendance === "yes" && !guestCount) {
            alert("Խնդրում ենք նշել հյուրերի թիվը։");
            return;
        }


        // ==========================================
        // BUTTON
        // ==========================================

        const originalText =
            submitButton?.textContent || "Ուղարկել";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Ուղարկվում է...";
        }


        // ==========================================
        // API DATA
        // IMPORTANT:
        // API expects "name", NOT "guest_name"
        // ==========================================

        const formData = new URLSearchParams();

        formData.append(
            "template_code",
            TEMPLATE_CODE
        );

        formData.append(
            "name",
            name
        );

        formData.append(
            "attendance",
            attendance
        );

        formData.append(
            "guest_count",
            attendance === "yes"
                ? guestCount
                : ""
        );


        console.log("Sending RSVP:", {
            template_code: TEMPLATE_CODE,
            name: name,
            attendance: attendance,
            guest_count: guestCount
        });


        // ==========================================
        // SEND TO API
        // ==========================================

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/rsvp`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8"
                    },

                    body: formData.toString()
                }
            );


            const responseText =
                await response.text();


            console.log(
                "API status:",
                response.status
            );

            console.log(
                "API response:",
                responseText
            );


            if (!response.ok) {

                throw new Error(
                    responseText ||
                    "RSVP submission failed"
                );

            }


            // ==========================================
            // SUCCESS
            // ==========================================

            let result;

            try {
                result = JSON.parse(responseText);
            } catch {
                result = responseText;
            }

            console.log(
                "RSVP successful:",
                result
            );


            alert(
                "Շնորհակալություն։ Ձեր պատասխանը հաջողությամբ ուղարկվեց։"
            );


            // Clear form
            rsvpForm.reset();


            // Select "Այո" again
            const yesRadio =
                rsvpForm.querySelector(
                    'input[name="attendance"][value="yes"]'
                );

            if (yesRadio) {
                yesRadio.checked = true;
            }


            updateGuestCount();


        } catch (error) {

            console.error(
                "RSVP ERROR:",
                error
            );

            alert(
                "Չհաջողվեց ուղարկել պատասխանը։\n\n" +
                "Խնդրում ենք կրկին փորձել։"
            );

        } finally {

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    originalText;

            }

        }

    });


    // ==========================================
    // GUEST COUNT SHOW / HIDE
    // ==========================================

    const attendanceRadios =
        rsvpForm.querySelectorAll(
            'input[name="attendance"]'
        );

    const guestCountInput =
        rsvpForm.querySelector(
            'input[name="guest_count"]'
        );


    function updateGuestCount() {

        if (!guestCountInput) return;

        const selected =
            rsvpForm.querySelector(
                'input[name="attendance"]:checked'
            );

        if (!selected) return;


        if (selected.value === "no") {

            guestCountInput.value = "";

            guestCountInput.style.display = "none";

            guestCountInput.required = false;

        } else {

            guestCountInput.style.display = "";

            guestCountInput.required = true;

        }

    }


    attendanceRadios.forEach((radio) => {

        radio.addEventListener(
            "change",
            updateGuestCount
        );

    });


    updateGuestCount();

});