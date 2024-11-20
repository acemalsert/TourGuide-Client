import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Stripe Public Key
const stripePromise = loadStripe("");

function StripeCheckoutButton({ product }) {
    debugger
  const handleCheckout = async () => {
    const response = await fetch("http://localhost:5008/api/Payments/CreateCheckoutSession", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const { sessionId } = await response.json();

    console.log(sessionId)

    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId });
  };

  return <button onClick={handleCheckout} className="btn btn-primary">Buy Now</button>;
}

export default StripeCheckoutButton;