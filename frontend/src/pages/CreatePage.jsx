import React, { useState } from 'react'
import { useProductStore } from '../store/product.js';
import { toast } from 'react-toastify';

function CreatePage() {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const { createProduct } = useProductStore();

  const handleCreateProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast.success(message);
      setNewProduct({ name: '', price: '', image: '' });
    } else {
      toast.error(message);
    }
  }

  const fields = [
    { key: 'name', label: 'PRODUCT NAME', type: 'text', placeholder: 'e.g. Sony WH-1000XM5' },
    { key: 'price', label: 'PRICE (USD)', type: 'number', placeholder: 'e.g. 299' },
    { key: 'image', label: 'IMAGE URL', type: 'text', placeholder: 'https://...' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a1a] via-[#0d1b2a] to-[#0a0a1a] flex items-center justify-center px-6 py-10 box-border">
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Orbitron:wght@700;900&display=swap" rel="stylesheet" />

      <div className="w-full max-w-[500px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-[#0f3460] rounded-2xl p-[clamp(24px,5vw,40px)] shadow-[0_25px_60px_rgba(0,0,0,0.5)] box-border">

        <div className="mb-8">
          <p className="text-cyan-400 text-[11px] tracking-[3px] mb-2">
            ◆ INVENTORY MANAGEMENT
          </p>
          <h1 className="font-['Orbitron',sans-serif] text-[clamp(20px,4vw,28px)] font-black bg-gradient-to-br from-white to-cyan-400 bg-clip-text text-transparent">
            ADD PRODUCT
          </h1>
        </div>

        {fields.map(({ key, label, type, placeholder }) => (
          <div key={key} className="mb-5">
            <label className="text-gray-500 text-[11px] tracking-widest block mb-2">
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              value={newProduct[key]}
              onChange={(e) => setNewProduct({ ...newProduct, [key]: e.target.value })}
              className="w-full px-4 py-[13px] rounded-lg bg-[#0a0a1a] border border-[#0f3460] text-gray-200 text-[15px] outline-none transition-colors duration-200 focus:border-cyan-400 box-border"
            />
          </div>
        ))}

        {newProduct.image && (
          <div className="mb-5">
            <label className="text-gray-500 text-[11px] tracking-widest block mb-2">
              IMAGE PREVIEW
            </label>
            <img
              src={newProduct.image}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg border border-[#0f3460] block"
              onError={e => e.target.style.display = 'none'}
            />
          </div>
        )}

        <div className="flex gap-3 mt-2">
          <a
            href='/'
            className="flex-1 py-[13px] rounded-lg border border-gray-600 bg-transparent text-gray-400 font-semibold text-sm tracking-widest text-center no-underline box-border"
          >
            ← BACK
          </a>
          <button
            onClick={handleCreateProduct}
            className="flex-[2] py-[13px] rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0a0a1a] font-bold text-[15px] tracking-widest"
          >
            + ADD PRODUCT
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePage