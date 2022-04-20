// global variables

// variables for getDate function
var date = new Date();
var currentTime;
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

// variable for time slots
var timeSlots = [
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
    written: "12AM",
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

var dateEl = document.getElementById("currentDay");
var containerEl = document.getElementById("container");
var eventInfo = [];

//functions

var getDate = function () {
  var currentDate = date.toLocaleDateString(undefined, options);
  currentTime = date.toLocaleTimeString([], { hour: "2-digit", hour12: false });
  dateEl.textContent = currentDate;
  currentTime = parseInt(currentTime);
  console.log(currentTime);
  return currentTime;
};

var printTimeBlocks = function () {
  for (var i = 0; i < timeSlots.length; i++) {
    //run to check current time during loop
    getDate();

    //create sections
    var containerSections = document.createElement("div");
    containerSections.classList = "row d-flex flex-row";
    containerSections.id = "containerSections";
    containerEl.appendChild(containerSections);

    var blockEl = document.createElement("div");
    blockEl.classList = "time col-1";
    containerSections.appendChild(blockEl);

    var timeInSlot = document.createElement("p");
    timeInSlot.id = "timeInSlot" + i;
    timeInSlot.classList = "hour";
    timeInSlot.textContent = timeSlots[i].written;
    blockEl.appendChild(timeInSlot);

    var eventWritingSection = document.createElement("p");
    eventWritingSection.id = "eventWritingSection" + i;
    eventWritingSection.textContent = " ";
    eventWritingSection.classList = "past col-9";
    containerSections.appendChild(eventWritingSection);

    var eventWritingForm = document.createElement("input");
    eventWritingForm.id = "eventWritingForm";
    eventWritingForm.value = "";
    eventWritingForm.classList = "event-writing-form";
    eventWritingSection.appendChild(eventWritingForm);

    var saveButtonSlot = document.createElement("p");
    saveButtonSlot.id = "saveButtonSlot" + i;
    saveButtonSlot.classList = "saveBtn col-1";
    containerSections.appendChild(saveButtonSlot);

    var saveButton = document.createElement("button");
    saveButton.id = "saveButton" + i;
    saveButton.classList = "saveBtnKiddo";
    saveButton.innerHTML =
      "<span class='glyphicon glyphicon-floppy-save'></span>";
    saveButtonSlot.appendChild(saveButton);
    saveButton.addEventListener("click", saveData);

    //check current time vs time of slot and add class
    if (currentTime === timeSlots[i].numeric) {
      eventWritingSection.classList = "present col-9";
    } else if (currentTime < timeSlots[i].numeric) {
      eventWritingSection.classList = "future col-9";
    } else if (currentTime > timeSlots[i].numeric) {
      eventWritingSection.classList = "past form col-9";
    }
  }
};

var saveData = function () {
  for (var i = 0; i < timeSlots.length; i++) {
    eventInfo[i] = eventWritingForm[i].value;
    console.log(eventInfo[i]);
  }
  localStorage.setItem("schedule", JSON.stringify(eventInfo));
};

var loadSchedule = function () {
  var savedInfo = localStorage.getItem("schedule");

  if (!savedInfo) {
    return false;
  }

  console.log("Found Saved Schedule!");

  savedInfo = JSON.parse(savedInfo);
  console.log(savedInfo);

  //take the values of savedInfo and set the values of each eventWritingForm
  for (var i = 0; i < savedInfo.length; i++) {
    if ((savedInfo[i].value = "")) {
      eventWritingForm[i].value = " ";
    } else {
      eventWritingForm[i].value = savedInfo[i];
    }
    console.log(eventWritingForm[i].value);
  }
};

printTimeBlocks();
loadSchedule();
