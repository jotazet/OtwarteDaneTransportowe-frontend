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

        // Update only the tbody of the table
        document.querySelector("#public-transport-data-table tbody").innerHTML = temp;
      } else {
        document.querySelector("#public-transport-data-table tbody").innerHTML = "<tr><td colspan='6'>Brak dostępnych danych</td></tr>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.querySelector("#public-transport-data-table tbody").innerHTML = "<tr><td colspan='6'>Brak danych</td></tr>";
    });
}