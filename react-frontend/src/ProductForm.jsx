import axios from "axios";
import { useState, useEffect } from "react";

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!productName.trim()) {
      newErrors.productName = "Product name is required";
    } else if (productName.trim().length < 2) {
      newErrors.productName = "Product name must be at least 2 characters";
    }

    if (!price) {
      newErrors.price = "Price is required";
    } else if (parseFloat(price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!customerId) {
      newErrors.customerId = "Please select a customer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    setMessage({ type: "", text: "" });
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/products", {
        productName: productName.trim(),
        price: parseFloat(price),
        customer: { id: parseInt(customerId) }
      });
      setMessage({ type: "success", text: "Product added successfully!" });
      setProductName("");
      setPrice("");
      setCustomerId("");
      setErrors({});
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Failed to add product. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h3>Add Product</h3>
      
      {message.text && (
        <div className={message.type === "success" ? "success-message" : "error-message-alert"}>
          {message.text}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="product-name">Product Name *</label>
        <input
          id="product-name"
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={e => {
            setProductName(e.target.value);
            if (errors.productName) setErrors({ ...errors, productName: "" });
          }}
          className={errors.productName ? "error" : ""}
        />
        {errors.productName && <span className="error-message">{errors.productName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="product-price">Price *</label>
        <input
          id="product-price"
          type="number"
          step="0.01"
          min="0"
          placeholder="Enter product price"
          value={price}
          onChange={e => {
            setPrice(e.target.value);
            if (errors.price) setErrors({ ...errors, price: "" });
          }}
          className={errors.price ? "error" : ""}
        />
        {errors.price && <span className="error-message">{errors.price}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="customer-select">Customer *</label>
        <select
          id="customer-select"
          value={customerId}
          onChange={e => {
            setCustomerId(e.target.value);
            if (errors.customerId) setErrors({ ...errors, customerId: "" });
          }}
          className={errors.customerId ? "error" : ""}
        >
          <option value="">Select a customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.name} ({customer.email})
            </option>
          ))}
        </select>
        {errors.customerId && <span className="error-message">{errors.customerId}</span>}
      </div>

      <button 
        onClick={submit} 
        className="submit-btn"
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Product"}
      </button>
    </div>
  );
}

export default ProductForm;