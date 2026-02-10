import axios from "axios";
import { useState } from "react";

function CustomerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
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
      await axios.post("http://localhost:8080/api/customers", {
        name: name.trim(),
        email: email.trim()
      });
      setMessage({ type: "success", text: "Customer added successfully!" });
      setName("");
      setEmail("");
      setErrors({});
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Failed to add customer. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h3>Add Customer</h3>
      
      {message.text && (
        <div className={message.type === "success" ? "success-message" : "error-message-alert"}>
          {message.text}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="customer-name">Name *</label>
        <input
          id="customer-name"
          type="text"
          placeholder="Enter customer name"
          value={name}
          onChange={e => {
            setName(e.target.value);
            if (errors.name) setErrors({ ...errors, name: "" });
          }}
          className={errors.name ? "error" : ""}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="customer-email">Email *</label>
        <input
          id="customer-email"
          type="email"
          placeholder="Enter customer email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <button 
        onClick={submit} 
        className="submit-btn"
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Customer"}
      </button>
    </div>
  );
}

export default CustomerForm;