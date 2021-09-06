import React from "react";
import { Link, useHistory } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const activeClassName = "btn btn-primary btn-block mb-2";
  const inactiveClassName = "btn btn-outline-primary btn-block mb-2";
  const history = useHistory();
  return (
    <div className="mt-5 d-flex flex-column">
      <h4 className="text-center mb-4 text-primary">DASHBOARD</h4>
      <button
        className={
          activeTab === "create-invoice" ? activeClassName : inactiveClassName
        }
        onClick={() => {
          setActiveTab("create-invoice");
          history.push("/");
        }}
      >
        Create Invoice
      </button>
      <button
        className={
          activeTab === "view-invoices" ? activeClassName : inactiveClassName
        }
        onClick={() => {
          setActiveTab("view-invoices");
          history.push("/view-invoices");
        }}
      >
        View Invoices
      </button>
      <button
        className={
          activeTab === "create-product" ? activeClassName : inactiveClassName
        }
        onClick={() => {
          setActiveTab("create-product");
          history.push("/create-product");
        }}
      >
        Create Product
      </button>
      <button
        className={
          activeTab === "view-products" ? activeClassName : inactiveClassName
        }
        onClick={() => {
          setActiveTab("view-products");
          history.push("/view-products");
        }}
      >
        View Products
      </button>
      <button
        className={
          activeTab === "sales-report" ? activeClassName : inactiveClassName
        }
        onClick={() => {
          setActiveTab("sales-report");
          history.push("/sales-report");
        }}
      >
        Sales Report
      </button>
    </div>
  );
};

export default Sidebar;
