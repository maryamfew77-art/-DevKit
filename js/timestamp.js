
const timestampInput = document.getElementById("timestamp-input");
const timestampUnit = document.getElementById("timestamp-unit");
const dateOutput = document.getElementById("date-output");

const dateInput = document.getElementById("date-input");
const dateUnit = document.getElementById("date-unit");
const timestampOutput = document.getElementById("timestamp-output");

const message = document.getElementById("message");

document.getElementById("convert-date-btn").addEventListener("click", () => {
  const value = timestampInput.value.trim();

  if (!value) {
    message.textContent = "Please enter a Unix timestamp.";
    return;
  }

  const timestamp = Number(value) *
    (timestampUnit.value === "seconds" ? 1000 : 1);

  const date = new Date(timestamp);

  if (!Number.isFinite(timestamp) || Number.isNaN(date.getTime())) {
    message.textContent = "Please enter a valid timestamp.";
    return;
  }

  dateOutput.value = date.toLocaleString();
  message.textContent = "Date converted successfully.";
});

document.getElementById("convert-timestamp-btn").addEventListener("click", () => {
  if (!dateInput.value) {
    message.textContent = "Please choose a date and time.";
    return;
  }

  const timestamp = new Date(dateInput.value).getTime();

  if (!Number.isFinite(timestamp)) {
    message.textContent = "Please choose a valid date and time.";
    return;
  }

  timestampOutput.value = dateUnit.value === "seconds"
    ? Math.floor(timestamp / 1000)
    : timestamp;

  message.textContent = "Timestamp converted successfully.";
});

async function copyValue(input, label) {
  if (!input.value) {
    message.textContent = "Convert a value first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(input.value);
    message.textContent = `${label} copied successfully!`;
  } catch {
    input.select();
    const copied = document.execCommand("copy");
    message.textContent = copied
      ? `${label} copied successfully!`
      : "Copy failed. Please copy the selected text manually.";
  }
}

document.getElementById("copy-date-btn").addEventListener("click", () => {
  copyValue(dateOutput, "Date");
});

document.getElementById("copy-timestamp-btn").addEventListener("click", () => {
  copyValue(timestampOutput, "Timestamp");
});
