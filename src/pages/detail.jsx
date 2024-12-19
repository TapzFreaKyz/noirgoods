import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { decrementStock } from "../productSlice";
import { addToCart } from "../cartSlice";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (quantity > 0 && quantity <= product.quantity) {
      dispatch(addToCart({ 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        image: product.image, 
        quantity 
      }));
  
      dispatch(decrementStock({ id: product.id, amount: quantity }));
      alert(`Added ${quantity} of "${product.title}" to your cart.`);
    } else {
      alert("Invalid quantity or not enough stock available.");
    }
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <p className="text-6xl p-10 text-center"></p>
      <div className="flex justify-center">
        <div className="w-96 border border-gray-300 rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 w-full object-contain bg-white"
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
            <div className="flex justify-center items-center mt-4">
              <label htmlFor="quantity" className="mr-2">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 text-center border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="px-3 py-2 flex justify-between">
            {product.quantity > 0 ? (
              <button
                className="bg-black text-white outline outline-2 py-2 px-4 rounded hover:bg-gray-700"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <button
                className="py-2 px-4 rounded bg-gray-400 text-gray-700 cursor-not-allowed"
                disabled
              >
                Out of Stock
              </button>
            )}
            <button
              className="bg-white text-black outline outline-2 py-2 px-4 rounded hover:bg-gray-300"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;