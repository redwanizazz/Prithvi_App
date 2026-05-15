
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-prithvi-cream min-h-screen">
      {/* Hero */}
      <section className="bg-prithvi-green text-prithvi-cream py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Grow with precision.</h1>
        <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
          Prithvi combines smart QR technology with localized climate data to give you perfect care schedules for every seed you plant in Bangladesh.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/scan" className="bg-prithvi-cream text-prithvi-green font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white transition-colors">
            Scan Seed Packet
          </Link>
          <Link to="/shop" className="border-2 border-prithvi-cream text-prithvi-cream font-semibold py-3 px-8 rounded-full hover:bg-prithvi-cream hover:text-prithvi-green transition-colors">
            Shop Kits
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-prithvi-brown/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-prithvi-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-prithvi-green mb-3">Education Hub</h3>
            <p className="text-gray-700">Learn local farming techniques tailored for Bangladesh's unique four micro-seasons.</p>
          </div>
          <div className="text-center">
            <div className="bg-prithvi-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-prithvi-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-prithvi-green mb-3">Smart Care</h3>
            <p className="text-gray-700">Receive precise watering, weeding, and fertilizing alerts right to your phone.</p>
          </div>
          <div className="text-center">
            <div className="bg-prithvi-brown/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-prithvi-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-prithvi-green mb-3">Shop</h3>
            <p className="text-gray-700">High-quality starter kits and premium seeds delivered straight to your door.</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <svg className="w-12 h-12 text-prithvi-green/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-2xl font-medium text-prithvi-green mb-6 leading-relaxed">
            "Prithvi completely changed how I garden on my balcony in Dhaka. The seasonal advice is spot on, and my chillies have never looked better."
          </p>
          <p className="text-gray-600 font-semibold">— Nusrat J., Dhaka</p>
        </div>
      </section>
    </div>
  );
}
