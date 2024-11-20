import React from "react";
import "./paymentCancel.css"; // CSS dosyasını ekle

const Cancel = () => {
  return (
    <div className="cancel-page">
      <div className="cancel-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="red"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <h1 className="cancel-message">Payment Canceled</h1>
      <p className="cancel-description">
        Your payment was not completed. Please try again.
      </p>
      <a href="/" className="btn btn-danger mt-3">Go Back to Home</a>
    </div>
  );
};

export default Cancel;
