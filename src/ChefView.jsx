import { useEffect, useState } from "react";
import './UserDash.css';

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
    <div className="chef-page">
      <div className="chef-table-wrapper">
        <h1 className="chef-title">👨‍🍳 Chef Dashboard</h1>
        <table className="chef-table">
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
                  <td className="order-id">{order._id}</td>
                  <td className="order-items">
                    {order.items.map((item, idx) => (
                      <span key={idx}>
                        {item.name} ({item.qty})
                        {idx < order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </td>
                  <td>₹{order.total}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        order.status === "Completed" ? "status-completed" : "status-pending"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="order-action">
                    <button
                      type="button"
                      className="chef-action-btn"
                      disabled={order.status !== "Pending"}
                      onClick={() => updateStatus(order._id, "Completed")}
                    >
                      {order.status === "Pending" ? "Mark Completed" : "Completed"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-orders">
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChefView;
