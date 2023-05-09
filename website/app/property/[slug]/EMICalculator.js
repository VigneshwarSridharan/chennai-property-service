"use client";
import { useState } from "react";

const EMICalculator = () => {
  const [amount, setAmount] = useState(1000000);
  const [interest, setInterest] = useState(10.5);
  const [tenure, setTenure] = useState(120);

  const r = interest / 12 / 100;
  console.log(r);
  const emi =
    (amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);

  const totalPayment = emi * tenure;

  return (
    <div className="get-started">
      <form className="php-email-form">
        <h3>EMI Calculator</h3>
        <p>Get EMI details instantly</p>

        <div className="mb-3">
          <label>Loan Amount</label>
          <input
            className="form-control"
            value={amount}
            onChange={({ target }) => setAmount(target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Interest Rate</label>
          <input
            className="form-control"
            value={interest}
            onChange={({ target }) => setInterest(target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Loan Tenure (Months)</label>
          <input
            className="form-control"
            value={tenure}
            onChange={({ target }) => setTenure(target.value)}
          />
        </div>
        <div className="d-flex text-center">
          <div className="w-100">
            <h6>EMI</h6>
            <div>{Math.round(emi)}</div>
          </div>
          <div className="w-100">
            <h6>Total Interest</h6>
            <div>{Math.round(totalPayment - amount)}</div>
          </div>
          <div className="w-100">
            <h6>Total Payment</h6>
            <div>{Math.round(totalPayment)}</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EMICalculator;
