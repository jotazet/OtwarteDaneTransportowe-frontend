function fetchPublicTransportDataByRegionId(id) {
  fetch(`https://api.odt.org.pl/publictransport/data/region/${id}/`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.length > 0) {
        // Update provision-info
        const provision = data[0].transport_organization.provision || "Brak";
        const formattedProvision = provision.replace(/\r\n|\n/g, "<br>");
        document.querySelector("#provision-info").innerHTML = formattedProvision;

        // Update the table content
        let temp = "";
        data.forEach((item) => {
          temp += `
            <tr>
              <td>${item.transport_organization.region || "Brak danych"}</td>
              <td>${item.transport_organization.transport_organization || "Brak danych"}</td>
              <td>${item.data_foramt || "Brak danych"}</td>
              <td>${item.url_to_data ? `<a href="${item.url_to_data}" target="_blank">Link</a>` : "Brak danych"}</td>
              <td>${item.file ? `<a href="${item.file}" target="_blank">Pobierz plik</a>` : "Brak pliku"}</td>
              <td>${item.uploaded_at ? `${String(new Date(item.uploaded_at).getDate()).padStart(2, '0')}.${String(new Date(item.uploaded_at).getMonth() + 1).padStart(2, '0')}.${new Date(item.uploaded_at).getFullYear()}` : "Brak danych"}</td>
            </tr>
          `;
        });

        document.querySelector("#public-transport-data-table tbody").innerHTML = temp;
      } else {
        // Handle case when no data is available
        document.querySelector("#provision-info").innerHTML = "Brak danych";
        document.querySelector("#public-transport-data-table tbody").innerHTML = "<tr><td colspan='6'>Brak dostępnych danych</td></tr>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.querySelector("#provision-info").innerHTML = "Błąd ładowania danych";
      document.querySelector("#public-transport-data-table tbody").innerHTML = "<tr><td colspan='6'>Błąd ładowania danych</td></tr>";
    });
}