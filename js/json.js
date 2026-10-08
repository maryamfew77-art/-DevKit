// =========================
// GET HTML ELEMENTS
// =========================

const jsonInput = document.getElementById("jsonInput");

const jsonOutput = document.getElementById("jsonOutput");

const formatBtn = document.getElementById("formatBtn");

const minifyBtn = document.getElementById("minifyBtn");

const validateBtn = document.getElementById("validateBtn");

const clearBtn = document.getElementById("clearBtn");

const copyBtn = document.getElementById("copyBtn");

const message = document.getElementById("message");

const status = document.getElementById("status");


// =========================
// FORMAT JSON
// =========================

formatBtn.addEventListener("click", () => {

    try {

        const json = JSON.parse(jsonInput.value);

        const formatted = JSON.stringify(json, null, 4);

        jsonOutput.value = formatted;

        message.textContent = "JSON formatted successfully.";

        status.textContent = "Valid";

        status.style.color = "#5ee6a8";

    } catch (error) {

        jsonOutput.value = "";

        message.textContent = "Invalid JSON. Please check your input.";

        status.textContent = "Invalid";

        status.style.color = "#ff8fab";

    }

});


// =========================
// MINIFY JSON
// =========================

minifyBtn.addEventListener("click", () => {

    try {

        const json = JSON.parse(jsonInput.value);

        const minified = JSON.stringify(json);

        jsonOutput.value = minified;

        message.textContent = "JSON minified successfully.";

        status.textContent = "Valid";

        status.style.color = "#5ee6a8";

    } catch (error) {

        jsonOutput.value = "";

        message.textContent = "Invalid JSON. Please check your input.";

        status.textContent = "Invalid";

        status.style.color = "#ff8fab";

    }

});


// =========================
// VALIDATE JSON
// =========================

validateBtn.addEventListener("click", () => {

    try {

        JSON.parse(jsonInput.value);

        message.textContent = "✓ Your JSON is valid.";

        status.textContent = "Valid";

        status.style.color = "#5ee6a8";

    } catch (error) {

        message.textContent = "✕ Your JSON is invalid.";

        status.textContent = "Invalid";

        status.style.color = "#ff8fab";

    }

});


// =========================
// CLEAR
// =========================

clearBtn.addEventListener("click", () => {

    jsonInput.value = "";

    jsonOutput.value = "";

    message.textContent =
        "Your formatted JSON will appear here.";

    status.textContent = "Ready";

    status.style.color = "#35d6e8";

});


// =========================
// COPY RESULT
// =========================

copyBtn.addEventListener("click", async () => {

    if (!jsonOutput.value) {

        message.textContent = "There is nothing to copy.";

        return;
    }

    await navigator.clipboard.writeText(jsonOutput.value);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {

        copyBtn.textContent = "Copy";

    }, 1500);

});