import React, { useState } from "react";
import "./_App.scss";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ViewInvoices from "./pages/ViewInvoices";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import UpdateInvoice from "./pages/UpdateInvoice";
import Sidebar from "./components/sidebar";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Pdf from "./pages/Pdf";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import SalesReport from "./pages/SalesReport";

function App() {
  const [token, setToken] = useState("");

  const [activeTab, setActiveTab] = useState("create-invoice");

  const history = useHistory();

  if (!token && sessionStorage.getItem("token"))
    setToken(sessionStorage.getItem("token"));
  else if (!token) history.push("/admin-login");
  return (
    <div className="App">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-2 col-lg-3 border-right">
            {token && (
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
          </div>
          <div className="col-xl-10 col-lg-9 pt-5 pl-5">
            <Switch>
              <Route
                exact
                path="/admin-login"
                render={(props) => (
                  <AdminLogin {...props} setToken={setToken} token={token} />
                )}
              />
              <Route
                exact
                path="/"
                render={(props) => <Home {...props} token={token} />}
              />
              <Route
                exact
                path="/create-product"
                render={(props) => <CreateProduct {...props} token={token} />}
              />
              <Route
                exact
                path="/view-invoices"
                render={(props) => <ViewInvoices {...props} token={token} />}
              />
              <Route
                exact
                path="/view-invoices/:id"
                render={(props) => <Pdf {...props} token={token} />}
              />
              <Route
                exact
                path="/view-products"
                render={(props) => <Products {...props} token={token} />}
              />
              <Route
                exact
                path="/update-product/:id"
                render={(props) => <UpdateProduct {...props} token={token} />}
              />
              <Route
                exact
                path="/update-invoice/:id"
                render={(props) => <UpdateInvoice {...props} token={token} />}
              />
              <Route
                exact
                path="/sales-report"
                render={(props) => <SalesReport {...props} token={token} />}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
