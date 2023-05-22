"use client";
import { useState } from "react";

const formatCurrency = (n) => {
  if (!n) return "";
  if (typeof n === "string") {
    n = Number(n);
  }
  return n.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });
};

const EMICalculator = () => {
  const [amount, setAmount] = useState(5000000);
  const [interest, setInterest] = useState(8);
  const [tenure, setTenure] = useState(240);

  const r = interest / 12 / 100;
  const emi =
    (amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);

  const totalPayment = emi * tenure;

  return (
    <div className="get-started emi-calculator">
      <form className="php-email-form">
        <h3>EMI Calculator</h3>
        <p>Get EMI details instantly</p>

        <div className="mb-3">
          <label>Loan Amount</label>
          <input
            className="form-control"
            value={formatCurrency(amount)}
            onChange={({ target }) =>
              setAmount(target.value.replace(/[,₹]/g, ""))
            }
          />
        </div>
        <div className="mb-3">
          <label>Interest Rate: {interest}%</label>
          <input
            type="range"
            className="w-100 px-0"
            min="5"
            max="20"
            step=".1"
            value={interest}
            onChange={({ target }) => setInterest(target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Loan Tenure: {tenure / 12}Years</label>
          <input
            type="range"
            className="w-100 px-0"
            min="6"
            max={30 * 12}
            step="6"
            value={tenure}
            onChange={({ target }) => setTenure(target.value)}
          />
        </div>
        <div className="d-flex text-center py-3 text-white emi ">
          <div className="w-100">
            <h5>Your EMI is</h5>
            <h2>{formatCurrency(Math.round(emi)) || 0}</h2>
            <h6>per month</h6>
          </div>
        </div>
        <div className="w-100 d-flex py-4 info">
          <div className="w-100 text-center ">
            <h6>Total Interest</h6>
            <h5>{formatCurrency(Math.round(totalPayment) - amount) || 0}</h5>
          </div>
          <div className="w-100 text-center">
            <h6>Total Payment</h6>
            <h5>{formatCurrency(Math.round(totalPayment)) || 0}</h5>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EMICalculator;
