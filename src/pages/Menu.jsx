import { useState, useEffect } from "react";

function Menu({ addToCart }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/menu/")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setLoading(false);
        console.log("MENU DATA:", data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main">
      <section className="menu-section">

        {/* HEADING */}
        <div className="menu-heading">
          <p className="small-title">BREW HAVEN SPECIAL</p>
          <h1 className="page-title">Our Menu ☕</h1>
          <p className="menu-subtitle">
            Fresh coffee, desserts & cozy café favorites
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <h2 style={{ textAlign: "center" }}>Loading Menu...</h2>
        ) : (

          <div className="menu-grid">

            {menu.map((item) => (

              <div className="menu-card" key={item.id}>

                <img src={item.image} alt={item.name} />

                <div className="menu-content">

                  <h3>{item.name}</h3>

                  <p>{item.description}</p>

                  <div className="menu-bottom">

                    <span>Rs. {item.price}</span>

                    <div className="btns">

                      <button onClick={() => addToCart(item)}>
                        Add to Cart
                      </button>

                      <button className="order">
                        Place Order
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>
    </div>
  );
}

export default Menu;