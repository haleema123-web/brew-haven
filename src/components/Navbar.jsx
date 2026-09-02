import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <Link
        to="/"
        className="navbar-brand"
        onClick={closeMenu}
      >
        <img
          src="/logo.png"
          alt="Brew Haven Logo"
          width="45"
          height="45"
        />

        <h1>Brew Haven</h1>
      </Link>


      {/* MOBILE MENU BUTTON */}

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>


      {/* NAVIGATION */}

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>

        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/menu" onClick={closeMenu}>
            Menu
          </Link>
        </li>

        <li>
          <Link
            to="/cart"
            className="cart-link"
            onClick={closeMenu}
          >
            Cart

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </Link>
        </li>

        <li>
          <Link to="/orders" onClick={closeMenu}>
            Orders
          </Link>
        </li>

        <li>
          <Link to="/reviews" onClick={closeMenu}>
            Reviews
          </Link>
        </li>

        <li>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </li>

      </ul>

    </nav>
  );
}
<a href="https://www.google.com" target="_blank">Test External Link</a>

export default Navbar;