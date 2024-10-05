import React from 'react';

const Paymentgateway = ({ amount, doctorName }) => {
  const handleRazorpayPayment = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay Key
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      name: "EasyCare Clinic",
      description: `Consultation with ${doctorName}`,
      handler: function (response) {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Md Tauqueer Manzar", // You can use dynamic patient name here
        email: "your_email@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button className="btn btn-primary" onClick={handleRazorpayPayment}>
      Pay ₹{amount} and Book Appointment
    </button>
  );
};

export default Paymentgateway ;

