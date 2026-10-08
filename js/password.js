// =========================
// GET HTML ELEMENTS
// =========================

const passwordOutput =
    document.getElementById("passwordOutput");

const copyBtn =
    document.getElementById("copyBtn");

const generateBtn =
    document.getElementById("generateBtn");

const length =
    document.getElementById("length");

const lengthValue =
    document.getElementById("lengthValue");

const uppercase =
    document.getElementById("uppercase");

const lowercase =
    document.getElementById("lowercase");

const numbers =
    document.getElementById("numbers");

const symbols =
    document.getElementById("symbols");

const strengthText =
    document.getElementById("strengthText");

const strengthFill =
    document.getElementById("strengthFill");


// =========================
// CHARACTER SETS
// =========================

const upperChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowerChars =
    "abcdefghijklmnopqrstuvwxyz";

const numberChars =
    "0123456789";

const symbolChars =
    "!@#$%^&*()_+-=[]{}|;:,.<>?";


// =========================
// GENERATE PASSWORD
// =========================

function generatePassword() {

    let characters = "";

    // Add selected character types
    if (uppercase.checked) {
        characters += upperChars;
    }

    if (lowercase.checked) {
        characters += lowerChars;
    }

    if (numbers.checked) {
        characters += numberChars;
    }

    if (symbols.checked) {
        characters += symbolChars;
    }


    // Check if nothing is selected
    if (characters === "") {

        alert("Please select at least one option.");

        return;
    }


    let password = "";

    const passwordLength =
        Number(length.value);


    // Create password
    for (let i = 0; i < passwordLength; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        password += characters[randomIndex];
    }


    // Show password
    passwordOutput.value = password;

    // Update strength
    updateStrength(password);
}


// =========================
// PASSWORD STRENGTH
// =========================

function updateStrength(password) {

    let score = 0;

    // Length
    if (password.length >= 12) {
        score++;
    }

    if (password.length >= 16) {
        score++;
    }

    // Character types
    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    if (score <= 2) {

        strengthText.textContent = "Weak";

        strengthFill.style.width = "30%";

    } else if (score <= 4) {

        strengthText.textContent = "Medium";

        strengthFill.style.width = "65%";

    } else {

        strengthText.textContent = "Strong";

        strengthFill.style.width = "100%";
    }
}


// =========================
// LENGTH SLIDER
// =========================

length.addEventListener("input", () => {

    lengthValue.textContent =
        length.value;

    generatePassword();
});


// =========================
// OPTIONS
// =========================

uppercase.addEventListener(
    "change",
    generatePassword
);

lowercase.addEventListener(
    "change",
    generatePassword
);

numbers.addEventListener(
    "change",
    generatePassword
);

symbols.addEventListener(
    "change",
    generatePassword
);


// =========================
// GENERATE BUTTON
// =========================

generateBtn.addEventListener(
    "click",
    generatePassword
);


// =========================
// COPY PASSWORD
// =========================

copyBtn.addEventListener("click", async () => {

    if (!passwordOutput.value) {
        return;
    }

    await navigator.clipboard.writeText(
        passwordOutput.value
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {

        copyBtn.textContent = "Copy";

    }, 1500);
});


// =========================
// INITIAL PASSWORD
// =========================

generatePassword();