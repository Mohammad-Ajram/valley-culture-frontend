import React, { useState } from "react";
import { createProduct } from "../functions";
import { toast } from "react-toastify";

const CreateProduct = ({ history, token }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [gst, setGst] = useState("");
  const [category, setCategory] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    if (category) {
      createProduct(token, title, price, gst, category)
        .then((res) => {
          if (res.data.success) {
            toast.success("Product created successfully!");
            history.push("/view-products");
          } else toast.error("Some error occured");
        })
        .catch((err) => toast.error("Some error occured"));
    } else toast.error("Please select category!");
  };
  return (
    <>
      <h2>Create Product</h2>
      <br />
      <form onSubmit={formHandler}>
        <div className="form-group">
          <label className="font-weight-bold">Product Name</label>
          <input
            value={title}
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="font-weight-bold">Price (in Rs.)</label>
          <input
            value={price}
            type="number"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="font-weight-bold">Tax (GST in %)</label>
          <input
            value={gst}
            type="number"
            className="form-control"
            onChange={(e) => setGst(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="font-weight-bold">Select Category</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">--Select Category--</option>
            <option value="patent">Patent and proprietary medicines</option>
            <option value="classical">Classical Medicines</option>
          </select>
        </div>
        <button className="btn btn-primary">Create Product</button>
      </form>
    </>
  );
};
export default CreateProduct;
