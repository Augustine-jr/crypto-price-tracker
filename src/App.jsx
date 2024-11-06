import React from 'react';
import './index.css'; 
import CryptoTable from './components/CryptoTable';

function App() {
  return (
    <div className=" bg-[#dcdcdc] flex justify-center min-h-screen ">
      <div className="sm:w-[910px]">
        <CryptoTable />
      </div>
    </div>
  );
}

export default App;
