document.addEventListener("DOMContentLoaded", () => {
    const payPalBtn = document.getElementById("paypal-checkout-btn");
    const gPayBtn = document.getElementById("gpay-checkout-btn");
    const giftNoteTextarea = document.getElementById("gift-note");
    const confirmationMsg = document.getElementById("confirmation-msg");

    function handleCheckout(paymentMethod) {
        const userNote = giftNoteTextarea.value.trim();

        if (userNote === "") {
            confirmationMsg.style.backgroundColor = "#fff5f5";
            confirmationMsg.style.color = "#c53030";
            confirmationMsg.style.border = "1px solid #fed7d7";
            confirmationMsg.textContent = "Please add a handwritten note message, or write 'None' if it's a gift to yourself! ✨";
            confirmationMsg.classList.remove("hidden-msg");
            return;
        }

        confirmationMsg.style.backgroundColor = "#e6fffa";
        confirmationMsg.style.color = "#234e52";
        confirmationMsg.style.border = "1px solid #b2f5ea";
        confirmationMsg.textContent = `Checkout Intent Logged! Connecting to ${paymentMethod}. Note attached: "${userNote}" 🧶`;
        confirmationMsg.classList.remove("hidden-msg");

        // Safe URL execution
        setTimeout(() => {
            try {
                if (paymentMethod === "PayPal") {
                    window.open(`https://paypal.com{encodeURIComponent(userNote)}`, '_blank');
                } else if (paymentMethod === "Google Pay / UPI") {
                    // Mobile UPI string redirection hook
                    window.location.href = `upi://pay?pa=yourname@upi&pn=CozyStitchStudio&tn=${encodeURIComponent("Gift Note Attached")}&am=2900&cu=INR`;
                }
            } catch (error) {
                console.log("External portal application redirect limited inside internal offline preview window.");
            }
        }, 1000);
    }

    payPalBtn.addEventListener("click", () => handleCheckout("PayPal"));
    gPayBtn.addEventListener("click", () => handleCheckout("Google Pay / UPI"));
});
