
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Scan() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', { 
      qrbox: { width: 250, height: 250 }, 
      fps: 10 
    }, false);

    scanner.render((text) => {
      scanner.clear();
      // Expecting URL like https://prithvi.app/scan/PRV-123-0001
      // Or just raw code PRV-123-0001
      const code = text.split('/').pop();
      navigate(`/plant/${code}`);
    }, (err) => {
      // Ignore normal scanning errors
    });

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-prithvi-cream py-12 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-prithvi-green mb-2">Scan Seed Packet</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Point your camera at the QR code on your Prithvi seed packet to start your growing journey.
      </p>

      <div className="bg-white p-4 rounded-2xl shadow-xl w-full max-w-md">
        <div id="reader" className="w-full rounded-xl overflow-hidden"></div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 mb-2">Camera not working?</p>
        <Link to="/scan-manual" className="text-prithvi-brown font-semibold underline">
          Enter code manually
        </Link>
      </div>
    </div>
  );
}
