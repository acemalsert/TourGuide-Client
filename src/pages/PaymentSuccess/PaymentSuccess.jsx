import React from "react";
import "./paymentSucess.css"; 

const Success = () => {
  return (
    <div className="success-page">
      <div className="success-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="green"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7.755 11.435a.75.75 0 0 0 1.06.06l4.5-4.25a.75.75 0 1 0-1.02-1.1L8.25 9.927 6.205 8.035a.75.75 0 1 0-.91 1.18l2.46 2.22z"
          />
        </svg>
      </div>
      <h1 className="success-message">Payment Successful!</h1>
      <p className="success-description">
        Thank you for your purchase. You will receive a confirmation email shortly.
      </p>
      <a href="/" className="btn btn-success mt-3">Go Back to Home</a>
    </div>
  );
};

export default Success;
