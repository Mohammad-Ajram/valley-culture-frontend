import React, { useState, useEffect } from "react";
import { getProducts } from "../functions";

const Products = ({ token, history }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts(token)
      .then((res) => {
        if (res.data.success) setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h2>View products</h2>
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>SNo</th>
            <th>Product</th>
            <th>Price</th>
            <th>Tax(Gst in %)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>Rs{item.price}</td>
                <td>{item.gst}%</td>
                <td>
                  <div className="d-flex flex-grow-1">
                    <div
                      className="btn action-btn text-primary"
                      onClick={() =>
                        history.push(`/update-product/${item._id}`)
                      }
                    >
                      Edit
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
export default Products;
