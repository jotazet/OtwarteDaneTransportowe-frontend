fetch("https://api.odt.org.pl/publictransport/feed-status/")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    if (data.length > 0) {
      let temp = "";

      data.forEach((item, index) => {
        // Initialize the status for each data type
        const dataStatus = {
          GTFS: "❌",
          "GTFS-RT": "❌",
          NeTEx: "❌",
          SIRI: "❌",
          Other: "❌",
        };

        // Update the status to "ok" if the data type exists in data_feeds
        item.data_feeds.forEach((feed) => {
          if (dataStatus.hasOwnProperty(feed.data_foramt)) {
            dataStatus[feed.data_foramt] = "✅";
          }
        });

        // Add a row for the current region and transport organization
        temp += `
          <tr data-id="${item.id}">
            <td>${item.region}</td>
            <td>${item.transport_organization}</td>
            <td>${dataStatus.GTFS}</td>
            <td>${dataStatus["GTFS-RT"]}</td>
            <td>${dataStatus.NeTEx}</td>
            <td>${dataStatus.SIRI}</td>
            <td>${dataStatus.Other}</td>
          </tr>
        `;
      });

      // Append the rows to the existing table body
      const tableBody = document.querySelector("#status-table tbody");
      tableBody.innerHTML = temp;

      // Add click event listeners to rows
      tableBody.querySelectorAll("tr").forEach((row) => {
        row.addEventListener("click", (event) => {
          const id = event.currentTarget.getAttribute("data-id");
          showPopup(id);
        });
      });
    } else {
      document.querySelector("#status-table tbody").innerHTML = "<tr><td colspan='7'>Brak danych</td></tr>";
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    document.querySelector("#status-table tbody").innerHTML = "<tr><td colspan='7'>Błąd ładowania</td></tr>";
  });

// Function to show popup
function showPopup(id) {
  // Show the popup
  const popup = document.getElementById("popup");
  popup.style.display = "block";

  // Fetch provision and table data using fetchPublicTransportDataByRegionId
  fetchPublicTransportDataByRegionId(id);

  // Add event listener to close the popup
  document.getElementById("close-popup").addEventListener("click", () => {
    popup.style.display = "none";

    // Clear the provision-info and table content when closing the popup
    document.querySelector("#provision-info").innerHTML = "<i>Brak</i>";
    document.querySelector("#public-transport-data-table tbody").innerHTML = "";
  });
}