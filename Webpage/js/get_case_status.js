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

      data.forEach((item) => {
        temp += `
          <tr>
            <td>${item.region || "Brak danych"}</td>
            <td>${item.transport_organization || "Brak danych"}</td>
            <td>${STATUS_TRANSLATIONS[item.case_status[item.case_status.length - 1]?.status] || "Brak danych"}</td>
            <td><a href="${item.website || "#"}" target="_blank">${item.website || "Brak danych"}</a></td>
            <td>${item.contact_email || "Brak danych"}</td>
            <td>${item.data_providers[0]?.name || "Brak danych"}</td>
          </tr>
        `;
      });

      document.getElementById("status-table").innerHTML = temp;
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });