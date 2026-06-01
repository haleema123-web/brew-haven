import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";

function App() {

  // CART STATE
  const [cart, setCart] = useState([]);

  // ORDERS STATE
  const [orders, setOrders] = useState([]);

  // ADD TO CART
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // REMOVE FROM CART
  const removeFromCart = (indexToRemove) => {
    setCart(
      cart.filter((item, index) => index !== indexToRemove)
    );
  };

  // PLACE ORDER (CART → ORDERS)
  const placeOrder = () => {
    setOrders([...orders, ...cart]);
    setCart([]);
  };

  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/menu"
          element={<Menu addToCart={addToCart} />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
            />
          }
        />

        {/* ORDERS PAGE */}
        <Route
          path="/orders"
          element={<Orders orders={orders} />}
        />

        <Route path="/reviews" element={<Reviews />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;