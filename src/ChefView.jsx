import { useEffect, useState } from "react";

function ChefView() {
  const [orders, setOrders] = useState([]);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchOrders(); // refresh after update
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }} className="chef-page">
      <h1>👨‍🍳 Chef Dashboard</h1>
      <table border="1" cellPadding="10" style={{ width: "90%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Items (with Qty)</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} ({item.qty})
                      {idx < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </td>
                <td>₹{order.total}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === "Pending" && (
                    <button onClick={() => updateStatus(order._id, "Completed")}>
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ChefView;
