
const qrInput = document.getElementById("qrInput");
const qrSize = document.getElementById("qrSize");
const qrColor = document.getElementById("qrColor");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");
const qrOutput = document.getElementById("qrOutput");
const qrPlaceholder = document.getElementById("qrPlaceholder");
const statusMessage = document.getElementById("statusMessage");

let qrCode = null;

function showStatus(message, type = "") {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
}

function generateQRCode() {
    const text = qrInput.value.trim();

    if (!text) {
        showStatus("Please enter text or a URL first.", "error");
        return;
    }

    if (typeof QRCode === "undefined") {
        showStatus(
            "The QR library could not load. Check your internet connection and refresh the page.",
            "error"
        );
        return;
    }

    qrOutput.innerHTML = "";

    const size = Number(qrSize.value);
    const color = qrColor.value;

    try {
        qrCode = new QRCode(qrOutput, {
            text: text,
            width: size,
            height: size,
            colorDark: color,
            colorLight: "#FFFFFF",
            correctLevel: QRCode.CorrectLevel.H
        });

        qrOutput.style.display = "block";
        qrPlaceholder.style.display = "none";
        downloadBtn.disabled = false;

        showStatus("QR code generated successfully.", "success");
    } catch {
        qrCode = null;
        qrOutput.innerHTML = "";
        qrOutput.style.display = "none";
        qrPlaceholder.style.display = "flex";
        downloadBtn.disabled = true;

        showStatus("Could not generate the QR code. Try shorter text.", "error");
    }
}

function downloadQRCode() {
    if (!qrCode || !qrOutput.firstChild) {
        showStatus("Generate a QR code before downloading.", "error");
        return;
    }

    const canvas = qrOutput.querySelector("canvas");
    const image = qrOutput.querySelector("img");

    let imageURL;

    if (canvas) {
        imageURL = canvas.toDataURL("image/png");
    } else if (image && image.src) {
        imageURL = image.src;
    } else {
        showStatus("The QR code image is not ready yet. Please try again.", "error");
        return;
    }

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "devkit-qrcode.png";

    document.body.appendChild(link);
    link.click();
    link.remove();

    showStatus("QR code downloaded successfully.", "success");
}

generateBtn.addEventListener("click", generateQRCode);

downloadBtn.addEventListener("click", downloadQRCode);

clearBtn.addEventListener("click", () => {
    qrInput.value = "";
    qrOutput.innerHTML = "";
    qrOutput.style.display = "none";
    qrPlaceholder.style.display = "flex";
    downloadBtn.disabled = true;
    qrCode = null;

    showStatus("");
    qrInput.focus();
});

// Generate a fresh code when the size or color changes,
// if a code is already displayed.
qrSize.addEventListener("change", () => {
    if (qrInput.value.trim() && qrOutput.style.display === "block") {
        generateQRCode();
    }
});

qrColor.addEventListener("input", () => {
    if (qrInput.value.trim() && qrOutput.style.display === "block") {
        generateQRCode();
    }
});
