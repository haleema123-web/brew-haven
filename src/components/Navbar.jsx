import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h1>Brew Haven ☕</h1>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/orders">Orders</Link></li>
           <li><Link to="/reviews">Reviews</Link></li>
           <li><Link to="/contact">Contact</Link></li>
      </ul>

    </nav>
  );
}

export default Navbar;