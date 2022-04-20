// global variables

// variables for getDate
const date = new Date();
let currentTime;
const option = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

// variable for time slots
const timeSlots = [
  {
    written: "9AM",
    numeric: 9,
  },
  {
    written: "10AM",
    numeric: 10,
  },
  {
    written: "11AM",
    numeric: 11,
  },
  {
    written: "12PM",
    numeric: 12,
  },
  {
    written: "1PM",
    numeric: 13,
  },
  {
    written: "2PM",
    numeric: 14,
  },
  {
    written: "3PM",
    numeric: 15,
  },
  {
    written: "4PM",
    numeric: 16,
  },
  {
    written: "5PM",
    numeric: 17,
  },
];

let dateEl = document.getElementById("today");
let containerEl = document.getElementById("container");
let eventInfo = [];

// functions

function getDate() {
  let currentDate = date.toLocaleDateString(undefined, options);
  currentTime = date.toLocaleTimeString([], { hour: "2-digit", hour12: false });
  dateEl.textContent = currentDate;
}
