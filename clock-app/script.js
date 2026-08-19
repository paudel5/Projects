// Grab the elements we need from the page
const clockEl = document.getElementById("clock");
const dateEl = document.getElementById("date");
const formatBtn = document.getElementById("formatBtn");
const themeBtn = document.getElementById("themeBtn");

// Keep track of whether we're showing 24-hour time or not
let use24Hour = false;

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Add a leading zero if the number is less than 10 (e.g. 9 -> 09)
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  let amPm = "";

  // If we're not using 24-hour time, convert to 12-hour format
  if (!use24Hour) {
    if (hours >= 12) {
      amPm = " PM";
    } else {
      amPm = " AM";
    }

    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }
  }

  if (hours < 10) {
    hours = "0" + hours;
  }

  clockEl.textContent = hours + ":" + minutes + ":" + seconds + amPm;

  // Show today's date underneath the clock
  dateEl.textContent = now.toDateString();
}

// Update the clock every second
setInterval(updateClock, 1000);
updateClock(); // run once right away so it doesn't start blank

// Switch between 12-hour and 24-hour format when the button is clicked
formatBtn.addEventListener("click", function () {
  use24Hour = !use24Hour;

  if (use24Hour) {
    formatBtn.textContent = "Switch to 12-hour";
  } else {
    formatBtn.textContent = "Switch to 24-hour";
  }

  updateClock();
});

// Toggle light/dark mode when the button is clicked
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("light");

  // Update the button text to say the opposite of what we're currently in
  if (document.body.classList.contains("light")) {
    themeBtn.textContent = "Switch to Dark Mode";
  } else {
    themeBtn.textContent = "Switch to Light Mode";
  }
});
