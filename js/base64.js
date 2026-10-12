
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const encodeBtn = document.getElementById("encodeBtn");
const decodeBtn = document.getElementById("decodeBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const statusMessage = document.getElementById("statusMessage");

function showStatus(message, type = "") {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
}

// Encode Unicode text safely into Base64.
encodeBtn.addEventListener("click", () => {
    const text = inputText.value;

    if (!text.trim()) {
        outputText.value = "";
        showStatus("Please enter some text to encode.", "error");
        return;
    }

    try {
        const bytes = new TextEncoder().encode(text);
        let binary = "";

        bytes.forEach((byte) => {
            binary += String.fromCharCode(byte);
        });

        outputText.value = btoa(binary);
        showStatus("Text encoded successfully.", "success");
    } catch {
        outputText.value = "";
        showStatus("Could not encode this text.", "error");
    }
});

// Decode Base64 into UTF-8 text.
decodeBtn.addEventListener("click", () => {
    const text = inputText.value.trim();

    if (!text) {
        outputText.value = "";
        showStatus("Please enter a Base64 string to decode.", "error");
        return;
    }

    try {
        const binary = atob(text);
        const bytes = Uint8Array.from(
            binary,
            (character) => character.charCodeAt(0)
        );

        const decodedText = new TextDecoder("utf-8", {
            fatal: true
        }).decode(bytes);

        outputText.value = decodedText;
        showStatus("Base64 decoded successfully.", "success");
    } catch {
        outputText.value = "";
        showStatus(
            "Invalid Base64 input or the decoded data is not valid UTF-8 text.",
            "error"
        );
    }
});

// Clear both fields.
clearBtn.addEventListener("click", () => {
    inputText.value = "";
    outputText.value = "";
    showStatus("");
    inputText.focus();
});

// Copy the result.
copyBtn.addEventListener("click", async () => {
    if (!outputText.value) {
        showStatus("There is no result to copy.", "error");
        return;
    }

    try {
        await navigator.clipboard.writeText(outputText.value);
        showStatus("Result copied to clipboard.", "success");
    } catch {
        showStatus(
            "Clipboard access failed. Please select and copy the result manually.",
            "error"
        );
    }
});
