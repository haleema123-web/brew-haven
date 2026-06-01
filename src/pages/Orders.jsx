import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((res) => res.json())
      .then((data) => {
        console.log("ORDERS:", data);
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ORDER ERROR:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="orders-page main">
      <h1>Your Orders 📦</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              margin: "10px",
              borderRadius: "10px",
              background: "#fff",
            }}
          >
            <h2>Name: {item.name}</h2>

            <p>Items: {item.items}</p>
            <p>Payment: {item.payment_method}</p>
            <p>Address: {item.address}</p>

            <p>
              Status:{" "}
              <span
                style={{
                  color:
                    item.status === "pending"
                      ? "red"
                      : item.status === "completed"
                      ? "green"
                      : "orange",
                }}
              >
                {item.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;