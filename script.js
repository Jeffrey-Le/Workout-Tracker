// Check if Chart.js library is loaded
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("activityChart").getContext("2d");

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // X-axis labels
      datasets: [{
        label: "Distance Covered",
        data: [5, 6, 5.5, 7, 6.5, 4.5, 6], // Example data for distance per day
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
});
