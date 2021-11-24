require("./bootstrap");
import './ui.css';
import {loadStripe} from '@stripe/stripe-js';

async function main() {
    // const response = await axios.get('/intent');
    // const intent = response.data.intent.client_secret;
    const intent = {client_secret: "Testing"};
    const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    return {intent, stripe}
}

main().then((data) => {
    console.log(data);
    const card = addStripeCard(data.stripe);
    const displayError = document.getElementById('card-errors');

    card.on('change', (event) => {
        if (event.complete) {
            // enable payment button
            document.getElementById("create").removeAttribute("disabled");
        } else if (event.error) {
            // show validation to customer
            displayError.textContent = event.error.message;
            document.getElementById("create").setAttribute("disabled", "");
        } else {
            displayError.textContent = "";
            document.getElementById("create").setAttribute("disabled", "");
        }
    });

    document.getElementById("create").addEventListener("click", (e) => {
        processPayment(data, card, displayError);
    });
})

function addStripeCard(stripe) {
    const elements = stripe.elements({
        fonts: [{cssSrc: "https://rsms.me/inter/inter.css"}],
        locale: 'auto'
    });
    const card = elements.create("card", {style: getStripeElementStyles()});
    card.mount("#card-element");
    return card;
}

function getStripeElementStyles() {
    return {
        base: {
            color: "#32325D",
            fontWeight: 500,
            fontFamily: "Inter, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            "::placeholder": {
                color: "#CFD7DF"
            }
        },
        invalid: {
            color: "#E25950"
        }
    };
}

async function processPayment(data, card, displayError) {
    document.getElementById("create").setAttribute("disabled", "");
    const { setupIntent, error } = await data.stripe.confirmCardSetup(
        data.intent.client_secret, {
            payment_method: {card} 
        }
    );

    if (error) {
        displayError.textContent = error.message;
        document.getElementById("create").removeAttribute("disabled");
    } else {
        // The card has been verified successfully, 
        // send token
        const token = setupIntent.payment_method;
        // Add you server communication here
    }
}

