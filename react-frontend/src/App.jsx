import { useState } from "react";
import CustomerForm from "./CustomerForm";
import ProductForm from "./ProductForm";
import CustomerList from "./CustomerList";
import ProductList from "./ProductList";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("customers");

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-brand">Store Manager</h1>
          <div className="nav-links">
            <button 
              className={activeTab === "customers" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab("customers")}
            >
              Customers
            </button>
            <button 
              className={activeTab === "products" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === "customers" ? (
          <div className="content-wrapper">
            <div className="sidebar">
              <CustomerForm />
            </div>
            <div className="main-panel">
              <CustomerList />
            </div>
          </div>
        ) : (
          <div className="content-wrapper">
            <div className="sidebar">
              <ProductForm />
            </div>
            <div className="main-panel">
              <ProductList />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;