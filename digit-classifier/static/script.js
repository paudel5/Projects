// script.js
// Builds an 8x8 clickable grid, lets the user "draw" a digit by clicking
// squares on/off, then sends the grid to the Flask backend for a prediction.

const grid = document.getElementById("grid");
const predictBtn = document.getElementById("predictBtn");
const clearBtn = document.getElementById("clearBtn");
const resultEl = document.getElementById("result");

// This array will hold 64 numbers - one for each square in the grid.
// 0 means blank, 16 means fully "inked in" (matches how the training data was scaled).
let pixels = new Array(64).fill(0);

// Build the 64 clickable squares and add them to the page
for (let i = 0; i < 64; i++) {
  const square = document.createElement("div");
  square.classList.add("pixel");

  square.addEventListener("click", function () {
    // Toggle this square between blank and filled
    if (pixels[i] === 0) {
      pixels[i] = 16;
      square.classList.add("filled");
    } else {
      pixels[i] = 0;
      square.classList.remove("filled");
    }
  });

  grid.appendChild(square);
}

// Clear button resets every square back to blank
clearBtn.addEventListener("click", function () {
  pixels = new Array(64).fill(0);
  document.querySelectorAll(".pixel").forEach(function (square) {
    square.classList.remove("filled");
  });
  resultEl.textContent = "";
});

// Predict button sends the current grid to the backend and shows the result
predictBtn.addEventListener("click", function () {
  fetch("/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pixels: pixels })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.error) {
        resultEl.textContent = "Error: " + data.error;
      } else {
        resultEl.textContent = "Prediction: " + data.digit + " (" + data.confidence + "% confident)";
      }
    });
});
