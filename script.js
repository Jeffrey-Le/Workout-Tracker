// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Fetch data from the backend
    const response = await fetch("/api/activity-data?user_id=1"); // Replace `1` with a dynamic user_id if needed
    if (!response.ok) throw new Error("Failed to fetch activity data");

    const { labels, data } = await response.json(); // Get labels and data from the API response

    const ctx = document.getElementById("activityChart").getContext("2d");

    // Create the chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels, // X-axis labels dynamically loaded from API
        datasets: [{
          label: "Distance Covered",
          data, // Data dynamically loaded from API
          borderColor: "#50a0e0", // Line color
          backgroundColor: "rgba(80, 160, 224, 0.2)", // Area under the line color
          borderWidth: 2,
          pointBackgroundColor: "#ffffff",
          pointRadius: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#e0e0e0", // Y-axis tick color
            }
          },
          x: {
            ticks: {
              color: "#e0e0e0", // X-axis tick color
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        },
        elements: {
          point: {
            radius: 5,
            backgroundColor: "#ffffff",
          }
        }
      }
    });
  } catch (error) {
    console.error("Error loading chart data:", error);
  }
});
