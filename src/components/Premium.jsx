import React, { useState } from "react";
import styles from "../styles/Premium.module.css"; // Import the CSS
import Razorpay from "razorpay";

const Premium = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePayment = async () => {
    const options = {
      key: "YOUR_RAZORPAY_TEST_KEY", // Replace with your Razorpay key
      amount: 10000, // 100 INR (in paisa)
      currency: "INR",
      name: "Premium Plan",
      description: "Unlimited Downloads for 1 Month",
      handler: function (response) {
        alert("Payment Successful! You can now download unlimited videos.");
        localStorage.setItem("isPremiumUser", "true");
        setShowModal(false); // Close the modal on successful payment
      },
      prefill: {
        name: "Ethan Carter",
        email: "ethancarter@gmail.com",
        contact: "0000000000",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={openModal}>Buy Premium</button>

      {showModal && (
        <div className={styles["modal-overlay"]} onClick={closeModal}>
          <div
            className={styles["modal-container"]}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button className={styles["close-btn"]} onClick={closeModal}>
              &times;
            </button>
            <h2>Upgrade to Premium</h2>
            <p>Get unlimited downloads for just ₹100/month</p>
            <button onClick={handlePayment}>Buy Premium</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;