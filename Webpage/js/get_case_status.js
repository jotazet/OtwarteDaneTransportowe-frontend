fetch("https://api.odt.org.pl/publictransport/status/")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    if (data.length > 0) {
      let temp = "";
      const STATUS_TRANSLATIONS = {
        '0': '❔ Brak',
        '1': '📨 Dane zażądane',
        '2': '❌ Odmowa danych',
        '3': '🧑‍⚖️ Skierowanie do sąd',
        '4': '🛂 Skarga do ministerstwa',
        '5': '⁉️ Dane niedostępne',
        '6': '✅ Dane otrzymane',
        '7': '🤨 Brak umowy o dane z dostawcą',
        '8': '🤔 Inny',
      };

      data.forEach((item, index) => {
        temp += `
          <tr class="main-row" data-index="${index}">
            <td>${item.region || "Brak danych"}</td>
            <td>${item.transport_organization || "Brak danych"}</td>
            <td>${STATUS_TRANSLATIONS[item.case_status[item.case_status.length - 1]?.status] || "Brak danych"}</td>
            <td><a href="${item.website || "#"}" target="_blank">${item.website || "Brak danych"}</a></td>
            <td>${item.contact_email || "Brak danych"}</td>
            <td>${item.data_providers?.map(provider => provider.name).join(", ") || "Brak danych"}</td>
          </tr>
          <tr class="details-row" data-index="${index}" style="display: none;">
            <td colspan="6">
              <div class="timeline">
                ${item.case_status
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map(status => `
                    <div class="timeline-event">
                      <div class="event-date">${`${String(new Date(status.date).getDate()).padStart(2, '0')}.${String(new Date(status.date).getMonth() + 1).padStart(2, '0')}.${new Date(status.date).getFullYear()}`}</div>
                      <div class="event-description">${STATUS_TRANSLATIONS[status.status] || "Brak danych"}</div>
                    </div>
                  `)
                  .join("")}
              </div>
            </td>
          </tr>
        `;
      });

      document.querySelector("tbody").innerHTML = temp;
      document.addEventListener("click", (event) => {
        const clickedRow = event.target.closest(".main-row");
        if (clickedRow) {
          const index = clickedRow.dataset.index;
          const detailsRow = document.querySelector(`.details-row[data-index="${index}"]`);
          const allDetailsRows = document.querySelectorAll(".details-row");

          allDetailsRows.forEach(row => {
            if (row !== detailsRow) {
              row.style.display = "none";
            }
          });

          if (detailsRow) {
            detailsRow.style.display = detailsRow.style.display === "none" ? "table-row" : "none";
          }
        }
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });