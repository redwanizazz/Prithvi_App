
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ScanManual() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      navigate(`/plant/${code.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-prithvi-cream py-20 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-prithvi-green mb-2">Enter Code Manually</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Type the unique ID printed below the QR code on your seed packet.
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="e.g. PRV-TMT1-0042"
          className="w-full border-2 border-gray-200 rounded-lg p-4 text-center text-xl font-bold text-prithvi-green focus:border-prithvi-green focus:outline-none mb-6"
        />
        <button type="submit" className="w-full bg-prithvi-green text-prithvi-cream font-bold py-4 rounded-lg hover:bg-opacity-90 transition-all">
          Start Journey
        </button>
      </form>
    </div>
  );
}
