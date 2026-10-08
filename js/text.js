// =========================
// GET HTML ELEMENTS
// =========================

const textInput = document.getElementById("textInput");

const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const charNoSpace = document.getElementById("charNoSpace");
const sentenceCount = document.getElementById("sentenceCount");

const upperBtn = document.getElementById("upperBtn");
const lowerBtn = document.getElementById("lowerBtn");
const titleBtn = document.getElementById("titleBtn");
const cleanBtn = document.getElementById("cleanBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");


// =========================
// UPDATE COUNTS
// =========================

function updateCounts() {

    const text = textInput.value;

    // Character count
    charCount.textContent = text.length;

    // Character count without spaces
    charNoSpace.textContent =
        text.replace(/\s/g, "").length;

    // Word count
    const words = text.trim();

    wordCount.textContent =
        words === ""
            ? 0
            : words.split(/\s+/).length;

    // Sentence count
    const sentences = text
        .trim()
        .split(/[.!?]+/)
        .filter(sentence => sentence.trim() !== "");

    sentenceCount.textContent =
        text.trim() === "" ? 0 : sentences.length;
}


// =========================
// LIVE COUNTS
// =========================

textInput.addEventListener(
    "input",
    updateCounts
);


// =========================
// UPPERCASE
// =========================

upperBtn.addEventListener("click", () => {

    textInput.value =
        textInput.value.toUpperCase();

    updateCounts();
});


// =========================
// LOWERCASE
// =========================

lowerBtn.addEventListener("click", () => {

    textInput.value =
        textInput.value.toLowerCase();

    updateCounts();
});


// =========================
// TITLE CASE
// =========================

titleBtn.addEventListener("click", () => {

    textInput.value =
        textInput.value
            .toLowerCase()
            .replace(/\b\w/g, letter =>
                letter.toUpperCase()
            );

    updateCounts();
});


// =========================
// REMOVE EXTRA SPACES
// =========================

cleanBtn.addEventListener("click", () => {

    textInput.value =
        textInput.value
            .replace(/\s+/g, " ")
            .trim();

    updateCounts();
});


// =========================
// COPY
// =========================

copyBtn.addEventListener("click", async () => {

    if (!textInput.value) {
        return;
    }

    await navigator.clipboard.writeText(
        textInput.value
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 1500);
});


// =========================
// CLEAR
// =========================

clearBtn.addEventListener("click", () => {

    textInput.value = "";

    updateCounts();

    textInput.focus();
});