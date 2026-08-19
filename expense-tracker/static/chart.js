// chart.js
// Draws a simple bar chart of spending by category.
// This uses plain HTML canvas instead of a charting library,
// just to keep things simple.

const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

// Ask the Flask server for the category totals
fetch("/summary")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    drawChart(data);
  });

function drawChart(data) {
  // If there's no data yet, don't try to draw anything
  if (data.length === 0) {
    return;
  }

  // Find the highest total so we can scale the bars to fit
  let maxTotal = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].total > maxTotal) {
      maxTotal = data[i].total;
    }
  }

  const barWidth = canvas.width / data.length;
  const chartHeight = canvas.height - 30; // leave room for labels

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    // Scale this bar's height based on its share of the max total
    const barHeight = (item.total / maxTotal) * chartHeight;

    const x = i * barWidth;
    const y = canvas.height - barHeight - 20;

    // Draw the bar
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(x + 10, y, barWidth - 20, barHeight);

    // Draw the category label under the bar
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText(item.category, x + 10, canvas.height - 5);

    // Draw the dollar amount above the bar
    ctx.fillText("$" + item.total.toFixed(2), x + 10, y - 5);
  }
}
