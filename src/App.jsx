import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";

import OrderModal from "./components/OrderModal";
import { ToastContainer } from "./components/Toast";

function App() {

  // CART STATE
  const [cart, setCart] = useState([]);

  // TOAST STATE
  const [toasts, setToasts] = useState([]);

  // ORDER MODAL STATE
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalItems, setOrderModalItems] = useState([]);
  const [isFromCart, setIsFromCart] = useState(false);

  // ADD TO CART
  const addToCart = (item) => {
    setCart([...cart, item]);
    
    const newToast = {
      id: Date.now() + Math.random(),
      message: "Item added to cart successfully!"
    };
    setToasts((prev) => [...prev, newToast]);
  };

  // REMOVE TOAST
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // REMOVE FROM CART
  const removeFromCart = (indexToRemove) => {
    setCart(
      cart.filter((item, index) => index !== indexToRemove)
    );
  };

  // ✅ FINAL FIX: OPEN ORDER MODAL - DIRECT CART USE
  const openOrderModal = (items, fromCart = false) => {
    if (fromCart) {
      setOrderModalItems(cart);
    } else {
      const itemsArray = Array.isArray(items) ? items : [items];
      setOrderModalItems(itemsArray);
    }
    
    setIsFromCart(fromCart);
    setIsOrderModalOpen(true);
  };

  // HANDLE ORDER SUCCESS
  const handleOrderSuccess = () => {
    if (isFromCart) {
      setCart([]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} openOrderModal={openOrderModal} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} placeOrder={(items) => openOrderModal(items, true)} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        items={orderModalItems}
        onOrderSuccess={handleOrderSuccess}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </BrowserRouter>
  );
}

export default App;