import axios from "axios";
import { useState, useEffect } from "react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-card">
      <div className="list-header">
        <h3>All Customers</h3>
        <button onClick={fetchCustomers} className="refresh-btn">
          <span>↻</span> Refresh
        </button>
      </div>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : customers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>No customers yet. Add your first customer to get started.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>#{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomerList;