import React, { useEffect } from 'react'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard.jsx';
import { Link } from 'react-router-dom';

function HomePage() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen w-full bg-gray-950 font-sans box-border">
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Orbitron:wght@700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div className="text-center px-6 pt-12 pb-8">
        <p className="text-cyan-400 text-xs tracking-widest mb-3">
          ◆ ELECTRONICS STORE ◆
        </p>
        <h1 className="text-5xl font-black text-white mb-4 leading-tight">
          OUR PRODUCTS
        </h1>
        <div className="w-16 h-1 bg-cyan-400 mx-auto" />
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-6xl mb-6">📦</div>
          <h2 className="text-gray-200 text-2xl font-bold mb-3">No Products Found</h2>
          <p className="text-gray-500 mb-8">Start building your inventory</p>

          <Link
            to="/create"
            className="px-8 py-3 bg-cyan-400 text-gray-950 font-bold rounded-lg text-sm tracking-widest hover:bg-cyan-300 transition-colors"
          >
            + ADD FIRST PRODUCT
          </Link>
        </div>
      ) : (
        <div className="px-6 pb-12 box-border">

          {/* Count + Add Button */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm tracking-widest">
              {products.length} PRODUCT{products.length !== 1 ? 'S' : ''} AVAILABLE
            </p>

            <Link
              to="/create"
              className="px-6 py-2 border border-cyan-400 text-cyan-400 font-bold rounded-lg text-sm tracking-widest hover:bg-cyan-400 hover:text-gray-950 transition-colors"
            >
              + ADD PRODUCT
            </Link>
          </div>

          {/* Products */}
          <div className="flex flex-wrap gap-6 justify-center">
            {products.map((product) => (
              <div key={product._id} className="flex-1 min-w-64 max-w-sm">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  )
}

export default HomePage