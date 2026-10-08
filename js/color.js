// =========================
// GET HTML ELEMENTS
// =========================

const colorPicker = document.getElementById("colorPicker");
const hexInput = document.getElementById("hexInput");
const convertBtn = document.getElementById("convertBtn");

const colorPreview = document.getElementById("colorPreview");

const hexResult = document.getElementById("hexResult");
const rgbResult = document.getElementById("rgbResult");
const hslResult = document.getElementById("hslResult");

const resetBtn = document.getElementById("resetBtn");

const copyButtons =
    document.querySelectorAll(".copy-color-btn");


// =========================
// HEX TO RGB
// =========================

function hexToRgb(hex) {

    hex = hex.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return {
        r: r,
        g: g,
        b: b
    };
}


// =========================
// RGB TO HSL
// =========================

function rgbToHsl(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h;
    let s;

    const l = (max + min) / 2;

    if (max === min) {

        h = 0;
        s = 0;

    } else {

        const difference = max - min;

        s = l > 0.5
            ? difference / (2 - max - min)
            : difference / (max + min);

        switch (max) {

            case r:
                h =
                    (g - b) / difference +
                    (g < b ? 6 : 0);
                break;

            case g:
                h =
                    (b - r) / difference + 2;
                break;

            case b:
                h =
                    (r - g) / difference + 4;
                break;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}


// =========================
// CONVERT COLOR
// =========================

function convertColor() {

    let hex = hexInput.value.trim();

    // Add # if user didn't write it
    if (!hex.startsWith("#")) {
        hex = "#" + hex;
    }

    // Check HEX format
    const hexPattern = /^#[0-9A-Fa-f]{6}$/;

    if (!hexPattern.test(hex)) {

        alert("Please enter a valid HEX color. Example: #7567F8");

        return;
    }

    const rgb = hexToRgb(hex);

    const hsl = rgbToHsl(
        rgb.r,
        rgb.g,
        rgb.b
    );


    // Update preview
    colorPreview.style.background = hex;

    // Update picker
    colorPicker.value = hex;


    // Update results
    hexResult.textContent = hex.toUpperCase();

    rgbResult.textContent =
        `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    hslResult.textContent =
        `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}


// =========================
// COLOR PICKER
// =========================

colorPicker.addEventListener("input", () => {

    hexInput.value =
        colorPicker.value.toUpperCase();

    convertColor();
});


// =========================
// CONVERT BUTTON
// =========================

convertBtn.addEventListener(
    "click",
    convertColor
);


// =========================
// ENTER KEY
// =========================

hexInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        convertColor();
    }
});


// =========================
// COPY RESULTS
// =========================

copyButtons.forEach(button => {

    button.addEventListener("click", async () => {

        const targetId =
            button.dataset.target;

        const target =
            document.getElementById(targetId);

        await navigator.clipboard.writeText(
            target.textContent
        );

        button.textContent = "Copied!";

        setTimeout(() => {
            button.textContent = "Copy";
        }, 1500);
    });

});


// =========================
// RESET
// =========================

resetBtn.addEventListener("click", () => {

    const defaultColor = "#7567F8";

    colorPicker.value = defaultColor;

    hexInput.value = defaultColor;

    convertColor();
});


// =========================
// INITIAL COLOR
// =========================

convertColor();