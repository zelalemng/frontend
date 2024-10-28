import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplaySummaries = () => {
  const [partialSum, setPartialSum] = useState(0);
  const [fullSum, setFullSum] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentSummaries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
        const orders = response.data;

        // Calculate partial and full payments sums
        const partialSumCalc = orders
          .filter(order => order.paymentType === 'partial')
          .reduce((sum, order) => sum + order.order_price, 0);

        const fullSumCalc = orders
          .filter(order => order.paymentType === 'full')
          .reduce((sum, order) => sum + order.order_price, 0);

        setPartialSum(partialSumCalc);
        setFullSum(fullSumCalc);
        setTotalSum(partialSumCalc + fullSumCalc);
      } catch (error) {
        setError('Error fetching payment summaries');
      }
    };

    fetchPaymentSummaries();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6  rounded-lg shadow-lg  bg-gray-800 text-white  max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Payment Summaries</h2>
      
      <div className="flex justify-between items-center border-t border-gray-600 pt-4">
        <div>
          <h3 className="text-xl font-semibold">Partial Payments</h3>
          <p className="text-green-300">Total: birr {partialSum.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Full Payments</h3>
          <p className="text-green-300">Total: birr {fullSum.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mt-6 border-t border-gray-600 pt-4">
        <h3 className="text-xl font-semibold text-center">Overall Total</h3>
        <p className="text-green-400 text-center text-2xl font-bold">birr {totalSum.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DisplaySummaries;
