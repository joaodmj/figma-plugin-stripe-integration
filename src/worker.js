import {dispatch, handleEvent} from "./ui-handler-message";
window.onload = function() {
	const iframe = document.createElement('iframe');
    iframe.id = "makers-iframe";
    iframe.src = "https://makers.test/plugin";
    document.body.appendChild(iframe);
	iframe.onload = () => postMessageToIFrame("xixoca", "From worker to .Vue");

	window.addEventListener('message', (event) => {
		const message = event.data.pluginMessage;
		// Send data to TS or Vue:
		if (message.action.includes("figma")) {
			console.log('Worker received response from .TS:  ', message);
			dispatch(message.action, message.data);
		} else if (message.action.includes("vue")) {
			console.log('Worker received response from .Vue:  ', message);
			dispatch(message.action, message.data);
		}
    });

	// Listen to events from code.ts
	handleEvent("testing", (value) => console.log("value", value));
};

function postMessageToIFrame(action, data) {
    const iframe = document.getElementById('makers-iframe');
	iframe.contentWindow.postMessage({ pluginMessage: { action, data  } }, '*');
}

// function addStripeCard(stripe) {
//     const elements = stripe.elements({
//         fonts: [{cssSrc: "https://rsms.me/inter/inter.css"}],
//         locale: 'auto'
//     });
//     const card = elements.create("card", {style: getStripeElementStyles()});
//     card.mount("#card-element");
//     return card;
// }

// import {loadStripe} from '@stripe/stripe-js';

// export async function main() {
//     // const response = await axios.get('/intents'); // Read https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements
//     // const intent = response.data.intent;
//     const intent = {client_secret: "seti_1JzOBO2eZvKYlo2CorE4f5Ym_secret_KehaykPwPPSdRZkRWPFhXn6174mLuSs"}; // Dummy data
//     const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Random code
//     return {intent, stripe}
// }


// main().then((data) => {
//     console.log(data);
//     const card = addStripeCard(data.stripe);
//     const displayError = document.getElementById('card-errors');

//     card.on('change', (event) => {
//         if (event.complete) {
//             // enable payment button
//             document.getElementById("create").removeAttribute("disabled");
//         } else if (event.error) {
//             // show validation to customer
//             displayError.textContent = event.error.message;
//             document.getElementById("create").setAttribute("disabled", "");
//         } else {
//             displayError.textContent = "";
//             document.getElementById("create").setAttribute("disabled", "");
//         }
//     });

//     document.getElementById("create").addEventListener("click", (e) => {
//         processPayment(data, card, displayError);
//     });
// })



// function getStripeElementStyles() {
//     return {
//         base: {
//             color: "#32325D",
//             fontWeight: 500,
//             fontFamily: "Inter, Open Sans, Segoe UI, sans-serif",
//             fontSize: "16px",
//             fontSmoothing: "antialiased",
//             "::placeholder": {
//                 color: "#CFD7DF"
//             }
//         },
//         invalid: {
//             color: "#E25950"
//         }
//     };
// }

// async function processPayment(data, card, displayError) {
//     document.getElementById("create").setAttribute("disabled", "");
//     const { setupIntent, error } = await data.stripe.confirmCardSetup(
//         data.intent.client_secret, {
//             payment_method: {card} 
//         }
//     );

//     if (error) {
//         displayError.textContent = error.message;
//         document.getElementById("create").removeAttribute("disabled");
//     } else {
//         const card = document.getElementById("card-element");
//         const create = document.getElementById("create");
//         card.classList.add("hide");
//         create.removeAttribute("disabled");
//         create.classList.add("success");
//         create.innerHTML = "Thank you";

//         // The card has been verified successfully, 
//         // send token
//         const token = setupIntent.payment_method;
//         // Add you server communication here
//     }
// }
