
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Plant from './pages/Plant';
import Education from './pages/Education';
import Shop from './pages/Shop';
import ScanManual from './pages/ScanManual';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Admin Pages
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import Batches from './admin/Batches';
import BatchQRCodes from './admin/BatchQRCodes';
import Species from './admin/Species';
import Schedules from './admin/Schedules';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/scan" element={<><Navbar /><Scan /><Footer /></>} />
          <Route path="/scan-manual" element={<><Navbar /><ScanManual /><Footer /></>} />
          <Route path="/plant/:qrCode" element={<><Navbar /><Plant /><Footer /></>} />
          <Route path="/education" element={<><Navbar /><Education /><Footer /></>} />
          <Route path="/shop" element={<><Navbar /><Shop /><Footer /></>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="batches" element={<Batches />} />
            <Route path="batches/:id/qrcodes" element={<BatchQRCodes />} />
            <Route path="species" element={<Species />} />
            <Route path="schedules" element={<Schedules />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
