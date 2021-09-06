import React, { useState, useEffect } from "react";
import { createInvoice, getProducts, getInvoiceNo } from "../functions";
import { toast } from "react-toastify";
import { states, stateCodes, placeOfSupply } from "../utils/States";

const Home = ({ token, history }) => {
  const [products, setProducts] = useState([]);
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [invoiceValue, setInvoiceValue] = useState(0);
  const [payMethod, setPayMethod] = useState("");
  const [payStatus, setPayStatus] = useState("");

  useEffect(() => {
    getProducts(token)
      .then((res) => {
        if (res.data.products) setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateInvoiceValue = (invoiceProducts) => {
    let invoiceValue = 0;
    if (invoiceProducts) {
      for (let i = 0; i < invoiceProducts.length; i++) {
        invoiceValue +=
          (invoiceProducts[i].gst / 100) *
            (invoiceProducts[i].price * invoiceProducts[i].quantity) +
          invoiceProducts[i].price * invoiceProducts[i].quantity;
      }
    }
    return invoiceValue;
  };

  const formHandler = (e) => {
    e.preventDefault();
    let invoiceValue = 0;
    let invoiceNum;
    for (let i = 0; i < invoiceProducts.length; i++) {
      invoiceValue +=
        (invoiceProducts[i].gst / 100) *
          (invoiceProducts[i].price * invoiceProducts[i].quantity) +
        invoiceProducts[i].price * invoiceProducts[i].quantity;
    }

    getInvoiceNo(token)
      .then((res) => {
        if (res.data.success) {
          invoiceNum = Number(res.data.invoiceNo) + 1;
        } else if (
          !res.data.success &&
          res.data.message === "No invoice found"
        ) {
          invoiceNum = 1;
        }
        createInvoice(
          token,
          invoiceNum,
          name,
          email,
          contact,
          { line1, line2, city, state, pincode },
          invoiceProducts,
          invoiceValue,
          discount,
          payMethod,
          payStatus
        )
          .then((res) => {
            if (res.data.success) {
              toast.success("Invoice created successfully!");
              history.push("/view-invoices");
            } else toast.error("Some error occured");
          })
          .catch((err) => toast.error("Some error occured"));
      })
      .catch((err) => console.log(err));
  };

  const isProductAdded = (id) => {
    for (let i = 0; i < invoiceProducts.length; i++) {
      if (invoiceProducts[i]._id === id) return true;
    }
    return false;
  };
  const removeProduct = (id) => {
    let arr = [];
    for (let i = 0; i < invoiceProducts.length; i++) {
      if (invoiceProducts[i]._id !== id) arr.push(invoiceProducts[i]);
    }
    setInvoiceProducts(arr);
    if (arr.length === 0) setInvoiceValue(0);
    else calculateDiscount(arr);
  };

  const incQty = (id) => {
    let arr = [];
    for (let i = 0; i < invoiceProducts.length; i++) {
      if (invoiceProducts[i]._id !== id) arr.push(invoiceProducts[i]);
      else
        arr.push({
          ...invoiceProducts[i],
          quantity: invoiceProducts[i].quantity + 1,
        });
    }
    setInvoiceProducts(arr);
    calculateDiscount(arr);
  };
  const decQty = (id) => {
    let arr = [];
    for (let i = 0; i < invoiceProducts.length; i++) {
      if (invoiceProducts[i]._id !== id) arr.push(invoiceProducts[i]);
      else
        arr.push({
          ...invoiceProducts[i],
          quantity:
            invoiceProducts[i].quantity === 1
              ? 1
              : invoiceProducts[i].quantity - 1,
        });
    }
    setInvoiceProducts(arr);
    calculateDiscount(arr);
  };

  const calculateDiscount = (invoiceProducts) => {
    if (invoiceProducts) {
      let patentCount = 0;
      let classicalCount = 0;
      for (let i = 0; i < invoiceProducts.length; i++) {
        if (invoiceProducts[i].category === "patent") {
          patentCount += Number(invoiceProducts[i].quantity);
        } else if (invoiceProducts[i].category === "classical")
          classicalCount += Number(invoiceProducts[i].quantity);
      }
      if (patentCount >= 16) setDiscount(42);
      else if (classicalCount >= 16) setDiscount(35);
      else if (patentCount >= 4 || classicalCount >= 4) setDiscount(20);
      else setDiscount(0);
      let tmp = calculateInvoiceValue(invoiceProducts);
      if (tmp !== 0) setInvoiceValue(tmp);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between pr-5 pb-5">
        <h1 className="">Generate Invoice</h1>
        <button
          type="button"
          className="btn btn-outline-primary"
          data-toggle="modal"
          data-target="#myModal"
        >
          + Add Products
        </button>
      </div>

      <h4>Order Details:</h4>
      <table id="add-product-table" className="table table-striped">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Product</th>
            <th>HSN Code</th>
            <th style={{ width: "150px" }}>Quantity</th>
            <th>Unit Price</th>
            <th>Amount</th>
            <th>GST Rate</th>
            <th>Tax Value</th>
            <th>Total Invoice Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoiceProducts.length > 0 &&
            invoiceProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>4003</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => decQty(product._id)}
                  >
                    -
                  </button>
                  &nbsp;
                  {product.quantity}&nbsp;
                  <button
                    className="btn btn-secondary"
                    onClick={() => incQty(product._id)}
                  >
                    +
                  </button>
                </td>
                <td>Rs.{product.price}</td>
                <td>Rs.{product.price * product.quantity}</td>
                <td>{product.gst}%</td>
                <td>
                  Rs.{(product.gst / 100) * (product.price * product.quantity)}
                </td>
                <td>
                  Rs.
                  {(product.gst / 100) * (product.price * product.quantity) +
                    product.price * product.quantity}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      removeProduct(product._id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <hr />
      <div className="d-flex justify-content-end">
        <div>
          {discount !== 0 && (
            <h5>
              Discount Applied :{" "}
              <span className="font-weight-bold">
                Rs.{((discount / 100) * invoiceValue).toFixed(2)}
              </span>
            </h5>
          )}
          <h5>
            Total Amount {discount !== 0 && "After Discount"} :{" "}
            <span className="font-weight-bold">
              Rs.{(invoiceValue - (discount / 100) * invoiceValue).toFixed(2)}
            </span>
          </h5>
        </div>
      </div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Products</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <table id="modal-table" className="table table-striped">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Add</th>
                  </tr>
                </thead>

                <tbody>
                  {products.length > 0 &&
                    products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>
                          {isProductAdded(product._id) ? (
                            <div className="text-white bg-success">Added</div>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setInvoiceProducts([
                                  ...invoiceProducts,
                                  { ...product, quantity: 1 },
                                ]);
                                calculateDiscount([
                                  ...invoiceProducts,
                                  { ...product, quantity: 1 },
                                ]);
                              }}
                            >
                              +
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>

                <p></p>
              </table>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={formHandler} className="mb-5">
        <h4>Enter Customer Details:</h4>
        <hr />
        <div className="row">
          <div className="col-6">
            <h5>Personal Details</h5>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact</label>
              <input
                className="form-control"
                type="number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <h5>Payment Details</h5>
            <div className="form-group">
              <label>Payment Method</label>
              <input
                className="form-control"
                type="text"
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Payment Status</label>
              <select
                className="form-control"
                value={payStatus}
                onChange={(e) => setPayStatus(e.target.value)}
                required
              >
                <option value="">--Select Payment Status--</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="col-6 pr-5">
            <h5>Address</h5>
            <div className="form-group">
              <label>Line 1</label>
              <input
                className="form-control"
                type="text"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Line 2</label>
              <input
                className="form-control"
                type="text"
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                className="form-control"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <select
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">--Select State--</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            {state.length > 0 && (
              <>
                <div className="form-group">
                  <label>State Code</label>
                  <input
                    className="form-control"
                    type="text"
                    value={state ? stateCodes[placeOfSupply[state]] : ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    className="form-control"
                    type="text"
                    value={state ? placeOfSupply[state] : ""}
                    disabled
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <label>Pincode</label>
              <input
                className="form-control"
                type="number"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <button className="btn btn-large btn-primary w-25">
          Create Invoice
        </button>
      </form>
    </>
  );
};

export default Home;
