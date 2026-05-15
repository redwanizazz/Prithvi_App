
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function BatchQRCodes() {
  const { id } = useParams();
  const [qrs, setQrs] = useState([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    axios.get(`/api/admin/batches/${id}/qrcodes`, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }})
      .then(res => setQrs(res.data));
  }, [id]);

  const downloadSingleQR = async (qrId, code) => {
    try {
      const res = await axios.get(`/api/admin/qrcodes/${qrId}/download`, { 
        responseType: 'blob',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      saveAs(res.data, `${code}.png`);
    } catch (err) {
      alert('Download failed');
    }
  };

  const downloadAllZIP = async () => {
    setDownloading(true);
    const zip = new JSZip();
    try {
      for (const qr of qrs) {
        const res = await axios.get(`/api/admin/qrcodes/${qr.id}/download`, { 
          responseType: 'arraybuffer',
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        zip.file(`${qr.code}.png`, res.data);
      }
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `Batch_${id}_QRCodes.zip`);
    } catch (err) {
      alert('ZIP generation failed');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center text-sm text-gray-500 font-medium">
        <Link to="/admin/batches" className="hover:text-prithvi-green">&larr; Back to Batches</Link>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Batch QR Codes</h1>
          <p className="text-gray-500 mt-1">{qrs.length} codes generated</p>
        </div>
        <button onClick={downloadAllZIP} disabled={downloading || qrs.length===0} className="bg-prithvi-brown text-white px-5 py-2.5 rounded-lg font-bold shadow hover:bg-opacity-90 disabled:opacity-50 flex items-center gap-2">
          {downloading ? 'Zipping...' : 'Download All (.zip)'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Code ID</th>
              <th className="px-6 py-4">Species</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Scan Date</th>
              <th className="px-6 py-4">Season Context</th>
              <th className="px-6 py-4 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {qrs.map(q => (
              <tr key={q.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono font-bold text-gray-700">{q.code}</td>
                <td className="px-6 py-4">{q.species_name}</td>
                <td className="px-6 py-4">
                  {q.scanned_at ? 
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">Active</span> : 
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-bold">Unscanned</span>}
                </td>
                <td className="px-6 py-4 text-gray-500">{q.scanned_at ? new Date(q.scanned_at).toLocaleString() : '-'}</td>
                <td className="px-6 py-4 text-gray-500 capitalize">{q.season_detected || '-'}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => downloadSingleQR(q.id, q.code)} className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg font-medium transition-colors">
                    PNG
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
