document.addEventListener("DOMContentLoaded", () => {

    const API_BASE_URL = "https://api.uinvite.am";
    const TEMPLATE_CODE = "AGAPI";

    const resultsBody = document.getElementById("resultsBody");

    const totalResponses =
        document.getElementById("totalResponses");

    const yesResponses =
        document.getElementById("yesResponses");

    const noResponses =
        document.getElementById("noResponses");

    const totalGuests =
        document.getElementById("totalGuests");

    const refreshBtn =
        document.getElementById("refreshBtn");

    const downloadExcel =
        document.getElementById("downloadExcel");


    let rsvpData = [];


    // ==========================================
    // LOAD RESULTS
    // ==========================================

    async function loadResults() {

        resultsBody.innerHTML = `
            <tr>
                <td colspan="5" class="loading">
                    Բեռնվում է...
                </td>
            </tr>
        `;

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/rsvp?template_code=${encodeURIComponent(TEMPLATE_CODE)}`
            );

            const responseText =
                await response.text();


            if (!response.ok) {
                throw new Error(responseText);
            }


            const result =
                JSON.parse(responseText);


            console.log(
                "RSVP API:",
                result
            );


            // ==========================================
            // API RETURNS:
            //
            // {
            //   success: true,
            //   total: 5,
            //   total_no: 1,
            //   data: [...]
            // }
            // ==========================================

            if (
                result &&
                Array.isArray(result.data)
            ) {

                rsvpData =
                    result.data;

            } else {

                rsvpData = [];

            }


            renderResults();


        } catch (error) {

            console.error(
                "RSVP RESULT ERROR:",
                error
            );


            resultsBody.innerHTML = `
                <tr>
                    <td colspan="5" class="error">
                        Չհաջողվեց բեռնել RSVP արդյունքները։
                    </td>
                </tr>
            `;


            resetStats();
        }
    }


    // ==========================================
    // ATTENDANCE
    // ==========================================

    function getAttendance(guest) {

        if (
            guest.data &&
            guest.data.attendance !== undefined
        ) {

            return String(
                guest.data.attendance
            )
                .trim()
                .toLowerCase();

        }


        return "";
    }


    // ==========================================
    // GUEST COUNT
    // ==========================================

    function getGuestCount(guest) {

        if (
            guest.data &&
            guest.data.guest_count !== undefined
        ) {

            const count =
                parseInt(
                    guest.data.guest_count,
                    10
                );


            return isNaN(count)
                ? 0
                : count;
        }


        return 0;
    }


    // ==========================================
    // NAME
    // ==========================================

    function getName(guest) {

        return guest.name || "—";

    }


    // ==========================================
    // DATE
    // ==========================================

    function getDate(guest) {

        return guest.created_at || "";

    }


    // ==========================================
    // RENDER RESULTS
    // ==========================================

    function renderResults() {

        calculateStats();


        if (!rsvpData.length) {

            resultsBody.innerHTML = `
                <tr>
                    <td colspan="5" class="empty">
                        Դեռևս RSVP պատասխաններ չկան։
                    </td>
                </tr>
            `;

            return;
        }


        resultsBody.innerHTML = "";


        rsvpData.forEach(
            (guest, index) => {

                const name =
                    getName(guest);


                const attendance =
                    getAttendance(guest);


                const guestCount =
                    getGuestCount(guest);


                const date =
                    formatDate(
                        getDate(guest)
                    );


                let statusHTML;


                // ==================================
                // YES
                // ==================================

                if (
                    attendance === "yes"
                ) {

                    statusHTML = `
                        <span class="status status-yes">
                            Այո, ներկա կլինի
                        </span>
                    `;

                }


                // ==================================
                // NO
                // ==================================

                else if (
                    attendance === "no"
                ) {

                    statusHTML = `
                        <span class="status status-no">
                            Ցավոք, ոչ
                        </span>
                    `;

                }


                // ==================================
                // UNKNOWN
                // ==================================

                else {

                    statusHTML = `
                        <span class="status">
                            Անհայտ
                        </span>
                    `;

                }


                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${escapeHTML(name)}
                    </td>

                    <td>
                        ${statusHTML}
                    </td>

                    <td>
                        ${
                            attendance === "yes"
                                ? guestCount
                                : "—"
                        }
                    </td>

                    <td>
                        ${escapeHTML(date)}
                    </td>

                `;


                resultsBody.appendChild(row);

            }
        );

    }


    // ==========================================
    // STATISTICS
    // ==========================================

    function calculateStats() {

        let yes = 0;
        let no = 0;
        let guests = 0;


        rsvpData.forEach(
            (guest) => {

                const attendance =
                    getAttendance(guest);


                if (
                    attendance === "yes"
                ) {

                    yes++;

                    guests +=
                        getGuestCount(guest);

                }


                if (
                    attendance === "no"
                ) {

                    no++;

                }

            }
        );


        totalResponses.textContent =
            rsvpData.length;

        yesResponses.textContent =
            yes;

        noResponses.textContent =
            no;

        totalGuests.textContent =
            guests;

    }


    // ==========================================
    // EXCEL EXPORT
    // ==========================================

    downloadExcel.addEventListener(
        "click",
        () => {

            if (!rsvpData.length) {

                alert(
                    "Տվյալներ չկան Excel ֆայլ ներբեռնելու համար։"
                );

                return;
            }


            const excelData =
                rsvpData.map(
                    (guest, index) => {

                        const attendance =
                            getAttendance(guest);


                        return {

                            "№":
                                index + 1,

                            "Անուն Ազգանուն":
                                getName(guest),

                            "Մասնակցություն":
                                attendance === "yes"
                                    ? "Այո"
                                    : attendance === "no"
                                        ? "Ոչ"
                                        : "Անհայտ",

                            "Հյուրերի թիվ":
                                attendance === "yes"
                                    ? getGuestCount(guest)
                                    : "",

                            "Ամսաթիվ":
                                formatDate(
                                    getDate(guest)
                                )

                        };

                    }
                );


            const worksheet =
                XLSX.utils.json_to_sheet(
                    excelData
                );


            const workbook =
                XLSX.utils.book_new();


            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "RSVP"
            );


            worksheet["!cols"] = [
                { wch: 6 },
                { wch: 30 },
                { wch: 22 },
                { wch: 15 },
                { wch: 22 }
            ];


            XLSX.writeFile(
                workbook,
                `Agapi_RSVP_${getTodayDate()}.xlsx`
            );

        }
    );


    // ==========================================
    // REFRESH
    // ==========================================

    refreshBtn.addEventListener(
        "click",
        loadResults
    );


    // ==========================================
    // DATE FORMAT
    // ==========================================

    function formatDate(value) {

        if (!value) {
            return "—";
        }


        const date =
            new Date(value);


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return value;

        }


        return date.toLocaleString(
            "hy-AM",
            {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    // ==========================================
    // TODAY
    // ==========================================

    function getTodayDate() {

        const date =
            new Date();


        const year =
            date.getFullYear();


        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                date.getDate()
            ).padStart(2, "0");


        return `${year}-${month}-${day}`;

    }


    // ==========================================
    // HTML SECURITY
    // ==========================================

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    // ==========================================
    // RESET
    // ==========================================

    function resetStats() {

        totalResponses.textContent = "0";
        yesResponses.textContent = "0";
        noResponses.textContent = "0";
        totalGuests.textContent = "0";

    }


    // ==========================================
    // START
    // ==========================================

    loadResults();

});