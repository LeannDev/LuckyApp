// Select elements
const paymentLinkInput = document.getElementById("payment-link");
const copyButton = document.getElementById("copy-link");
const payButton = document.getElementById("pay");

// Function to copy the link to the clipboard
copyButton.addEventListener("click", () => {
    const link = paymentLinkInput.value;
    if (!link) {
        console.log("No link to copy.");
        return;
    }

    navigator.clipboard.writeText(link)
        .then(() => {
            console.log("Link copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy link: ", err);
            console.log("Failed to copy the link. Please try again.");
        });
});

// Function to open the link in a new tab with SEO attributes
payButton.addEventListener("click", () => {
    const link = paymentLinkInput.value;
    if (!link) {
        console.log("No link to open.");
        return;
    }

    const newWindow = window.open(link, "_blank");
    if (newWindow) {
        newWindow.opener = null; // Prevent the new page from accessing the original page
        newWindow.rel = "noopener noreferrer nofollow";
    } else {
        console.log("Failed to open the link. Please check your browser settings.");
    }
});