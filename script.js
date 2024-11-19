// Code from HEAD (current branch, fitness-graphs):
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

// Code from the cherry-picked commit:
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/api/activity-data?user_id=1");
    if (!response.ok) throw new Error("Failed to fetch activity data");
    const { labels, data } = await response.json();

    const ctx = document.getElementById("activityChart").getContext("2d");

    new Chart(ctx, {
      type: 'line',
      data: {
        labels, 
        datasets: [{
          label: "Distance Covered",
          data,
          borderColor: "#50a0e0",
          backgroundColor: "rgba(80, 160, 224, 0.2)",
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
              color: "#e0e0e0",
            }
          },
          x: {
            ticks: {
              color: "#e0e0e0",
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

