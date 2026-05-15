
import React, { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Prithvi Pocket', price: 299, desc: 'Starter seed kit with 3 local varieties.', img: 'https://placehold.co/400x400/1B4332/F5F0E8?text=Pocket' },
  { id: 2, name: 'Prithvi Pot', price: 599, desc: 'Complete grow kit: soil, pot, and seeds.', img: 'https://placehold.co/400x400/1B4332/F5F0E8?text=Pot' },
  { id: 3, name: 'Prithvi Bundle', price: 1299, desc: '5-pack gift set perfect for balconies.', img: 'https://placehold.co/400x400/1B4332/F5F0E8?text=Bundle' },
];

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: cart, 1: form, 2: success

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
    setCheckoutStep(0);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-prithvi-cream min-h-screen py-12 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-prithvi-green">Shop</h1>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 bg-white rounded-full shadow-sm">
            <svg className="w-6 h-6 text-prithvi-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-prithvi-brown text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map(p => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
              <img src={p.img} alt={p.name} className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-prithvi-green mb-2">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-4 h-10">{p.desc}</p>
                <p className="text-2xl font-bold text-prithvi-brown mb-6">BDT {p.price}</p>
                <button onClick={() => addToCart(p)} className="w-full bg-prithvi-green text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="text-2xl font-bold text-prithvi-green">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === 0 && (
                <>
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b pb-4">
                          <div>
                            <p className="font-bold text-prithvi-green">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: 1</p>
                          </div>
                          <p className="font-bold">BDT {item.price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 1 && (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setCheckoutStep(2); setCart([]); }}>
                  <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
                  <input required type="text" placeholder="Full Name" className="w-full border p-3 rounded-lg focus:outline-none focus:border-prithvi-green" />
                  <input required type="tel" placeholder="Phone Number" className="w-full border p-3 rounded-lg focus:outline-none focus:border-prithvi-green" />
                  <textarea required placeholder="Full Address" className="w-full border p-3 rounded-lg focus:outline-none focus:border-prithvi-green h-24"></textarea>
                  
                  <h3 className="font-bold text-lg mt-6 mb-2">Payment</h3>
                  <select className="w-full border p-3 rounded-lg focus:outline-none focus:border-prithvi-green">
                    <option>Cash on Delivery</option>
                    <option>bKash</option>
                    <option>Card Payment</option>
                  </select>
                  
                  <button type="submit" className="w-full bg-prithvi-green text-white font-bold py-4 rounded-xl mt-6 hover:bg-opacity-90">
                    Confirm Order (BDT {total})
                  </button>
                </form>
              )}

              {checkoutStep === 2 && (
                <div className="text-center mt-20">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-prithvi-green mb-2">Order Confirmed!</h2>
                  <p className="text-gray-600">Your Prithvi kit is on its way. Get ready to grow.</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-8 text-prithvi-brown font-bold underline">Close</button>
                </div>
              )}
            </div>

            {cart.length > 0 && checkoutStep === 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-6 text-xl">
                  <span className="font-bold text-gray-600">Total</span>
                  <span className="font-bold text-prithvi-green">BDT {total}</span>
                </div>
                <button onClick={() => setCheckoutStep(1)} className="w-full bg-prithvi-green text-white font-bold py-4 rounded-xl hover:bg-opacity-90 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
