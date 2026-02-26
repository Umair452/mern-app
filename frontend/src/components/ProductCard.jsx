import React, { useState } from 'react'
import { useProductStore } from '../store/product.js'
import { toast } from 'react-toastify';

function ProductCard({ product }) {
  const { deleteProduct, updateProduct } = useProductStore();
  const [showModal, setShowModal] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) toast.success(message);
    else toast.error(message);
  }

  const handleUpdateProduct = async (pid) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (success) {
      toast.success(message);
      setShowModal(false);
    } else {
      toast.error(message);
    }
  }

  return (
    <>
      <div
        className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-[#0f3460] rounded-xl overflow-hidden flex flex-col transition-all duration-200 ease-in-out w-full box-border hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,212,255,0.15)]"
      >
        <div className="relative overflow-hidden h-[200px] flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out block hover:scale-105"
          />
          <div className="absolute top-2.5 right-2.5 bg-cyan-400/15 border border-cyan-400 rounded-md px-2.5 py-0.5 text-cyan-400 text-[11px] font-bold tracking-widest">
            IN STOCK
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-gray-200 text-[17px] font-bold mb-2 tracking-wide">
            {product.name}
          </h2>
          <p className="text-cyan-400 text-[22px] font-bold mb-5 flex-grow">
            ${product.price}
          </p>
          <div className="flex gap-2.5">
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="flex-1 py-2.5 rounded-lg border border-red-500 bg-transparent text-red-500 font-semibold text-[13px] tracking-widest transition-all duration-200 hover:bg-red-500 hover:text-white"
            >
              DELETE
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 py-2.5 rounded-lg border border-cyan-400 bg-transparent text-cyan-400 font-semibold text-[13px] tracking-widest transition-all duration-200 hover:bg-cyan-400 hover:text-[#0a0a1a]"
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[1000] backdrop-blur-md p-5 box-border">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-[#0f3460] rounded-2xl p-8 w-full max-w-[460px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] box-border">
            <h2 className="text-cyan-400 text-xl font-bold mb-6 tracking-widest">
              ⚡ UPDATE PRODUCT
            </h2>

            {['name', 'price', 'image'].map((field) => (
              <div key={field} className="mb-4">
                <label className="text-gray-500 text-[11px] tracking-widest block mb-1.5">
                  {field.toUpperCase()}
                </label>
                <input
                  type={field === 'price' ? 'number' : 'text'}
                  placeholder={`Product ${field}`}
                  value={updatedProduct[field]}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, [field]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a1a] border border-[#0f3460] text-gray-200 text-[15px] outline-none focus:border-cyan-400 box-border"
                />
              </div>
            ))}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-lg border border-gray-600 bg-transparent text-gray-400 font-semibold text-sm tracking-widest"
              >
                CANCEL
              </button>
              <button
                onClick={() => handleUpdateProduct(product._id)}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600 text-[#0a0a1a] font-bold text-sm tracking-widest"
              >
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard