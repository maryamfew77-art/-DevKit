
const countSelect = document.getElementById("uuid-count");
const output = document.getElementById("uuid-output");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");
const message = document.getElementById("message");

function generateUUIDs() {
  const count = Number(countSelect.value);
  const uuids = [];

  for (let i = 0; i < count; i++) {
    uuids.push(crypto.randomUUID());
  }

  output.value = uuids.join("\n");
  message.textContent = `${count} UUID(s) generated successfully.`;
}

generateBtn.addEventListener("click", generateUUIDs);

copyBtn.addEventListener("click", async () => {
  if (!output.value.trim()) {
    message.textContent = "Generate UUIDs first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(output.value);
    message.textContent = "UUIDs copied successfully!";
  } catch {
    output.select();
    const copied = document.execCommand("copy");
    message.textContent = copied
      ? "UUIDs copied successfully!"
      : "Copy failed. Please select and copy the text manually.";
  }
});

clearBtn.addEventListener("click", () => {
  output.value = "";
  message.textContent = "Output cleared.";
});
