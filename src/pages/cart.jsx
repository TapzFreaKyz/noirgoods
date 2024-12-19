import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantity, removeFromCart, clearCart } from "../cartSlice";
import { adjustStock } from "../productSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity, currentQuantity) => {
    const stockChange = currentQuantity - newQuantity;
    if (newQuantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }
    dispatch(adjustStock({ id, stockChange }));
    dispatch(updateCartQuantity({ id, newQuantity }));
  };

  const handleRemove = (id, quantity) => {
    dispatch(adjustStock({ id, stockChange: quantity }));
    dispatch(removeFromCart({ id }));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Thank you for your purchase!");
    dispatch(clearCart());
    navigate("/");
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + parseFloat((item.price * item.quantity).toFixed(2)),
    0
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center mt-6">Your cart is empty!</p>
      ) : (
        <div className="mt-6 px-4">
          <div className="grid grid-cols-5 gap-4 font-bold border-b border-gray-300 pb-2 text-center">
            <p>Image</p>
            <p>Product Name</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 gap-4 items-center border-b border-gray-300 py-4"
            >
              <div className="flex justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <p className="truncate max-w-xs">{item.title}</p>
              <div className="flex items-center justify-center">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.id,
                      parseInt(e.target.value),
                      item.quantity
                    )
                  }
                  className="w-16 border rounded px-2 py-1 text-center"
                  max="20"
                />
                <button
                  onClick={() => handleRemove(item.id, item.quantity)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
              <p className="text-center">$ {item.price.toFixed(2)}</p>
              <p className="text-center">
                $ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total Amount: $ {totalAmount.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="bg-black text-white py-2 px-4 rounded mt-4 hover:bg-gray-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;