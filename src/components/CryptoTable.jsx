import React, { useMemo, useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// table headers with icons and labels for desktop view
const headers = [
  { icon: '💰', label: 'Coin' },
  { icon: '📄', label: 'Code' },
  { icon: '🤑', label: 'Price' },
  { icon: '📈', label: 'Total Supply' },
];

const CryptoTable = () => {
  // State for storing coin data, loading status, and current page
  const [coins, setCoins] = useState([]); // Stores the list of coins fetched from the API
  const [loading, setLoading] = useState(true); // Tracks if data is still loading
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page for pagination
  const itemsPerPage = 10; // Defines the number of items to display per page

  // useEffect to fetch data from the CoinLore API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
           setLoading(true);
          setError(null);
        const response = await axios.get('https://api.coinlore.net/api/tickers/');
        setCoins(response.data.data); // Store fetched data in the coins state
      } catch (error) {
        console.error('Error fetching data: ', error); // Logs any errors in fetching data
        setError('Failed to fetch data, please try again later.'); // Sets error message in case of failure
      } finally {
        setLoading(false); // Set loading to false once data fetching is complete
      }
    };
    fetchData(); // Trigger the fetch function
  }, []);

  // Calculating indices for slicing the coin list for the current page
  const indexOfLastItem = currentPage * itemsPerPage; // Last item index for the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // First item index for the current page

  // Memoize the list of items to display on the current page to avoid unnecessary recalculations
  const currentItems = useMemo(() => coins.slice(indexOfFirstItem, indexOfLastItem), [coins, currentPage]);

  // Callback to navigate to the next page, only if there are more pages
  const nextPage = useCallback(() => {
    if (currentPage < Math.ceil(coins.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1); // Increment currentPage
    }
  }, [currentPage, coins.length]);

  // Callback to navigate to the previous page, only if the current page is greater than 1
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1); // Decrement currentPage
    }
  }, [currentPage]);

  // If data is still loading, display a loading indicator or error message
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-gray-600">{error || 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto sm:max-w-none p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        {currentItems.map((coin, index) => (
          // Mobile card view for each coin
          <div 
            key={coin.id} 
            className={`sm:hidden p-4 border-b last:border-b-0 ${index % 2 === 0 ? "bg-[#dcdcdc]" : "bg-white"}`}
          >
            <div className="space-y-2">
              {[
                { icon: '💰', label: 'Coin Name', value: coin.name },
                { icon: '📄', label: 'Code', value: coin.symbol },
                { icon: '🤑', label: 'Price', value: `$${parseFloat(coin.price_usd).toFixed(2)}` },
                { icon: '📈', label: 'Total Supply', value: `${parseFloat(coin.tsupply).toLocaleString()} ${coin.symbol}` },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className="font-bold">{item.label}</span>
                  <span className="ml-2 text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Desktop table view */}
        <table className="hidden sm:table min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="py-3 px-4 text-left text-black font-extrabold">
                  {header.icon} {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((coin, index) => (
              <tr key={coin.id} className={index % 2 === 0 ? "bg-[#dcdcdc]" : "bg-white"}>
                <td className="py-3 px-4 border-b text-gray-800">{coin.name}</td>
                <td className="py-3 px-4 border-b text-gray-800">{coin.symbol}</td>
                <td className="py-3 px-4 border-b text-gray-800">${parseFloat(coin.price_usd).toFixed(2)}</td>
                <td className="py-3 px-4 border-b text-gray-800">
                  {parseFloat(coin.tsupply).toLocaleString()} {coin.symbol}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="py-4">
                <div className="flex justify-between">
                  {/* Display previous button if current page is greater than 1 */}
                  {currentPage > 1 ? (
                    <button
                      onClick={prevPage}
                      className="px-4 py-2 border border-transparent text-black hover:border-[#fcfe58] active:border-[#fcfe58] transition-colors duration-200 flex items-center gap-2"
                    >
                      <FaArrowLeft className="text-black" /> Previous
                    </button>
                  ) : (
                    <div></div>  // Keeps the space when "Previous" is not shown
                  )}
                  {/* Display next button if current page is not the last */}
                  <button
                    onClick={nextPage} 
                    disabled={currentPage === Math.ceil(coins.length / itemsPerPage)}
                    className="px-4 py-2 border border-transparent text-black hover:border-yellow-400 active:border-yellow-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 flex items-center gap-2"
                  >
                    Next <FaArrowRight className="text-black" />
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Mobile Pagination */}
        <div className="sm:hidden p-4 border-t">
          <div className="flex justify-between">
            {/* Display previous button for mobile view */}
            {currentPage > 1 ? (
              <button
                onClick={prevPage}
                className="px-4 py-2 border border-transparent text-black hover:border-[#fcfe58] active:border-[#fcfe58] transition-colors duration-200 flex items-center gap-2"
              >
                <FaArrowLeft className="text-black" /> Previous
              </button>
            ) : (
              <div></div> // Keeps the space when "Previous" is not shown
            )}
            {/* Display next button for mobile view */}
            <button
              onClick={nextPage} 
              disabled={currentPage === Math.ceil(coins.length / itemsPerPage)}
              className="px-4 py-2 border border-transparent text-black hover:border-yellow-400 active:border-yellow-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 flex items-center gap-2"
            >
              Next <FaArrowRight className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;