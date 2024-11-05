import React from 'react';
import './index.css'; // Import your global CSS file for Tailwind
import CryptoTable from './components/CryptoTable';

function App() {
  return (
    <div className=" bg-[#dcdcdc] flex items-center justify-center">
      <div className="sm:w-[910px]  p-4">
        <CryptoTable />
      </div>
    </div>
  );
}

export default App;
