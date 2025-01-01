// Constants and variables for HTML elements
const qrCodeContainer = document.getElementById("qrcode");
const tryLuckButton = document.getElementById("try-luck");
const messageElement = document.getElementById("message");

// Function to extract parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const np = params.get('np') ? atob(params.get('np')) : null;
    const pl = params.get('pl') ? atob(params.get('pl')) : null;
    return { players: np ? parseInt(np, 10) : null, paymentLink: pl };
}

// Retrieve parameters from URL
const { players, paymentLink } = getQueryParams();

// Function to generate a random number between 1 and the number of players
function getRandomPlayer(players) {
    if (!players || players < 1) {
        console.error("Invalid number of players.");
        return null;
    }
    const randomPlayer = Math.floor(Math.random() * players) + 1;
    console.log(`Randomly selected player: ${randomPlayer}`);
    return randomPlayer;
}

// Function to generate a QR code for a given URL
function generateQRCode(url) {
    if (!url) {
        console.error("Invalid URL provided for QR code generation.");
        return;
    }
    qrCodeContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}" alt="QR Code" />`;
}

// Function to generate a random 10-digit number
function generateRandomNumber() {
    return Math.floor(Math.random() * 9000000000) + 1000000000; // Ensures a 4-digit number
}

// Function to encode parameters in Base64
function encodeBase64(params) {
    const jsonString = JSON.stringify(params);
    return btoa(jsonString);
}

// Initialize variables for attempt tracking
let attemptNumber = 1;
const targetAttempt = getRandomPlayer(players);

// Event listener for the button
console.log(`Attempt number: ${attemptNumber}`);
if (attemptNumber === targetAttempt) {
    console.log("You pay");
    generateQRCode(`http://192.168.2.214:8000/lucky?url=${encodeBase64(paymentLink)}&pay=true`);
    tryLuckButton.addEventListener("click", () => {
        window.location.href = `/lucky?url=${encodeBase64(paymentLink)}&pay=true`
    })
} else {
    attemptNumber++;
    generateQRCode(`http://192.168.2.214:8000/lucky?url=${encodeBase64(generateRandomNumber())}&pay=false`);
    tryLuckButton.addEventListener("click", () => {
        console.log(`Attempt number: ${attemptNumber}`);
        if (attemptNumber === targetAttempt) {
            console.log("You pay");
            generateQRCode(`http://192.168.2.214:8000/lucky?url=${encodeBase64(paymentLink)}&pay=true`);
            tryLuckButton.addEventListener("click", () => {
                window.location.href = `/lucky?url=${encodeBase64(paymentLink)}&pay=true`
            })
        } else {
            attemptNumber++;
            generateQRCode(`http://192.168.2.214:8000/lucky?url=${encodeBase64(generateRandomNumber())}&pay=false`);
        }
    });
    
}
