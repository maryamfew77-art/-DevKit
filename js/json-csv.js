
const jsonInput = document.getElementById("json-input");
const csvOutput = document.getElementById("csv-output");
const message = document.getElementById("message");

function escapeCSV(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const text = typeof value === "object"
    ? JSON.stringify(value)
    : String(value);

  return `"${text.replace(/"/g, '""')}"`;
}

function convertJSONToCSV() {
  try {
    const data = JSON.parse(jsonInput.value);

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Enter a non-empty JSON array of objects.");
    }

    if (data.some(item =>
      item === null || typeof item !== "object" || Array.isArray(item)
    )) {
      throw new Error("Every array item must be a JSON object.");
    }

    const headers = [...new Set(data.flatMap(item => Object.keys(item)))];

    if (headers.length === 0) {
      throw new Error("The JSON objects contain no fields.");
    }

    const rows = [
      headers.map(escapeCSV).join(","),
      ...data.map(item =>
        headers.map(header => escapeCSV(item[header])).join(",")
      )
    ];

    csvOutput.value = rows.join("\n");
    message.textContent = "JSON converted to CSV successfully.";
  } catch (error) {
    csvOutput.value = "";
    message.textContent = error instanceof SyntaxError
      ? "Invalid JSON. Please check your input."
      : error.message;
  }
}

document.getElementById("convert-btn").addEventListener("click", convertJSONToCSV);

document.getElementById("copy-btn").addEventListener("click", async () => {
  if (!csvOutput.value) {
    message.textContent = "Convert JSON first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(csvOutput.value);
    message.textContent = "CSV copied successfully!";
  } catch {
    csvOutput.select();
    const copied = document.execCommand("copy");
    message.textContent = copied
      ? "CSV copied successfully!"
      : "Copy failed. Please copy the selected text manually.";
  }
});

document.getElementById("download-btn").addEventListener("click", () => {
  if (!csvOutput.value) {
    message.textContent = "Convert JSON first.";
    return;
  }

  const blob = new Blob(["\uFEFF" + csvOutput.value], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "converted-data.csv";
  link.click();

  URL.revokeObjectURL(url);
  message.textContent = "CSV download started.";
});

document.getElementById("clear-btn").addEventListener("click", () => {
  jsonInput.value = "";
  csvOutput.value = "";
  message.textContent = "Fields cleared.";
});
