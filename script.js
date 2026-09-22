const form = document.querySelector("#deadline-form");
const nameInput = document.querySelector("#assignment-name");
const deadlineInput = document.querySelector("#deadline");
const errorMessage = document.querySelector("#deadline-error");
const result = document.querySelector("#result");
const statusLabel = document.querySelector("#status-label");
const resultTitle = document.querySelector("#result-title");
const deadlineSummary = document.querySelector("#deadline-summary");

const units = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

let activeDeadline = null;
let timerId = null;

function setDefaultDeadline() {
  const defaultDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  defaultDate.setMinutes(0, 0, 0);
  const localTime = new Date(defaultDate.getTime() - defaultDate.getTimezoneOffset() * 60000);
  deadlineInput.value = localTime.toISOString().slice(0, 16);
}

function formatNumber(value) {
  return String(value).padStart(2, "0");
}

function getTimeParts(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function getUrgency(milliseconds) {
  const oneDay = 24 * 60 * 60 * 1000;

  if (milliseconds <= 0) {
    return { key: "expired", label: "PAST DUE" };
  }

  if (milliseconds <= oneDay) {
    return { key: "urgent", label: "LESS THAN 24 HOURS" };
  }

  if (milliseconds <= 7 * oneDay) {
    return { key: "soon", label: "DUE THIS WEEK" };
  }

  return { key: "comfortable", label: "PLENTY OF TIME" };
}

function updateCountdown() {
  if (!activeDeadline) return;

  const remaining = activeDeadline.getTime() - Date.now();
  const timeParts = getTimeParts(remaining);
  const urgency = getUrgency(remaining);
  const assignmentName = nameInput.value.trim();

  Object.entries(timeParts).forEach(([unit, value]) => {
    units[unit].textContent = formatNumber(value);
  });

  result.dataset.urgency = urgency.key;
  statusLabel.textContent = urgency.label;
  resultTitle.textContent =
    urgency.key === "expired"
      ? `${assignmentName || "This assignment"} is past due`
      : assignmentName
        ? `${assignmentName} is due in`
        : "Time remaining";

  deadlineSummary.textContent = `Due ${new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(activeDeadline)}`;

  if (remaining <= 0 && timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function showEmptyResult() {
  activeDeadline = null;
  result.dataset.state = "empty";

  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!deadlineInput.value) {
    showEmptyResult();
    deadlineInput.setAttribute("aria-invalid", "true");
    errorMessage.textContent = "Choose a deadline date and time.";
    deadlineInput.focus();
    return;
  }

  const selectedDeadline = new Date(deadlineInput.value);

  if (Number.isNaN(selectedDeadline.getTime())) {
    showEmptyResult();
    deadlineInput.setAttribute("aria-invalid", "true");
    errorMessage.textContent = "That date could not be read. Choose another one.";
    deadlineInput.focus();
    return;
  }

  deadlineInput.removeAttribute("aria-invalid");
  errorMessage.textContent = "";
  activeDeadline = selectedDeadline;
  result.dataset.state = "active";

  if (timerId) window.clearInterval(timerId);
  updateCountdown();
  timerId = window.setInterval(updateCountdown, 1000);
});

setDefaultDeadline();
