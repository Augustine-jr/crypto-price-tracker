import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBitcoin, FaCoins, FaDollarSign, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaSackDollar } from "react-icons/fa6";

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data from the API
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.coinlore.net/api/tickers/');
      setCoins(response.data.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
  }, []);

  // Pagination handlers
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coins.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(coins.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Display loading message if data is still being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
   <div className='mx-auto p-4'>
  <table className='min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden'>
    <thead className='bg-gray-100'>
      <tr>
        <th className='py-3 px-4 text-left text-black font-extrabold'>
          <FaSackDollar className='inline text-[#d1ba76]' /> Coin Name
        </th>
        <th className='py-3 px-4 text-left text-black font-extrabold'>
          <FaBitcoin className='inline mr-2 text-yellow-500' /> Code
        </th>
        <th className='py-3 px-4 text-left text-black font-extrabold'>
          <FaDollarSign className='inline mr-2 text-yellow-500' /> Price
        </th>
        <th className="py-3 px-4 text-left text-black font-extrabold">
          📈 Total Supply
        </th>
      </tr>
    </thead>
    <tbody>
      {currentItems.map((coin, index) => (
        <tr key={coin.id} className={index % 2 === 0 ? "bg-[#dcdcdc]" : "bg-white"}>
          <td className='py-3 px-4 border-b text-gray-800'>
            {coin.name}
          </td>
          <td className='py-3 px-4 border-b text-gray-800'>
            {coin.symbol}
          </td>
          <td className='py-3 px-4 border-b text-gray-800'>
            ${parseFloat(coin.price_usd).toFixed(2)}
          </td>
          <td className='py-3 px-4 border-b text-gray-800'>
            {parseFloat(coin.tsupply).toLocaleString()} {coin.symbol}
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="4" className='py-4'>
          <div className='flex justify-between'>
            {currentPage > 1 ? (
              <button
                onClick={prevPage}
                className='px-4 py-2 border border-transparent text-black hover:border-[#fcfe58] active:border-[#fcfe58] transition-colors duration-200 flex items-center gap-2'
              >
                <FaArrowLeft className="text-black" /> Previous
              </button>
            ) : (
              <div></div>  // Keeps the space when "Previous" is not shown
            )}
            <button
              onClick={nextPage} 
              disabled={currentPage === Math.ceil(coins.length / itemsPerPage)}
              className='px-4 py-2 border border-transparent text-black hover:border-yellow-400 active:border-yellow-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 flex items-center gap-2'
            >
              Next <FaArrowRight className='text-black' />
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</div>


  )
}

export default CryptoTable;