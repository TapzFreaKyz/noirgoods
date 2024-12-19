import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { fetchProducts } from "./productSlice";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Detail from "./pages/detail";
import CartPage from "./pages/cart";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <p className="max-w-7xl mx-auto pt-10 text-center"><span className="font-bold">Noir Goods</span> — is a modern e-commerce destination that celebrates the timeless elegance of black and white. With its sleek monochrome design, the store offers a curated selection of products that embody sophistication and simplicity. Every detail of Noir Goods is crafted to reflect a minimalist aesthetic, from its clean, user-friendly interface to its carefully chosen items that exude style and functionality. Noir Goods delivers a seamless shopping experience rooted in contrast, balance, and timeless allure. Explore the beauty of simplicity where every shade tells a story.</p>
              <p className="text-6xl p-10 text-center">Our Selling</p>
              <div className="grid grid-cols-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-300 rounded-lg shadow-md ml-12 mr-12 mb-12"
                  >
                    <div>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-72 w-full object-contain bg-white"
                      />
                      <div className="px-3 pt-2">
                        <h3 className="font-bold text-2xl truncate text-center m-1">
                          {product.title}
                        </h3>
                        <p className="text-center m-1">$ {product.price}</p>
                        <p className="mb-1 bg-black text-white rounded-md text-center">
                          {product.category}
                        </p>
                        <p className="h-20 overflow-hidden font-thin text-sm text-center">
                          {product.description}
                        </p>
                        <span className="my-2 flex justify-center">
                          &#9733; {product.rating.rate}
                        </span>
                        <p className="text-lg font-semibold text-center mb-2">
                          Available Stock: {product.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-2 flex justify-between">
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-white text-black outline outline-2 py-2 px-3 rounded hover:bg-gray-300"
                      >
                        Details
                      </Link>
                      {product.quantity > 0 ? (
                        <button
                          className="bg-black text-white outline outline-2 py-2 px-4 rounded"
                          onClick={() =>
                            console.log("", product.id)
                          }
                        >
                          Available
                        </button>
                      ) : (
                        <button
                          className="py-2 px-4 rounded bg-gray-400 text-gray-700 cursor-not-allowed"
                          disabled
                        >
                          Out of Stock
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;