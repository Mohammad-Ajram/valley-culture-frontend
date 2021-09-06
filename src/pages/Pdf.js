import React, { forwardRef, useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { convertNumberToWords } from "../utils/numberstowords";
import { stateCodes, placeOfSupply } from "../utils/States";
import { useParams } from "react-router-dom";
import { getInvoice } from "../functions";
import Logo from "../assets/logo.png";
import Sign from "../assets/sign.jpeg";
import "../_style.scss";

const Pdf = forwardRef((props, ref) => {
  const [invoice, setInvoice] = useState("");
  const [sub, setSub] = useState("");
  const [tax, setTax] = useState("");
  const componentRef = useRef();

  const { id } = useParams();

  useEffect(() => {
    getInvoice(props.token, id)
      .then((res) => {
        if (res.data.success) setInvoice(res.data.invoice);
      })
      .catch((err) => console.log(err));
  }, []);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const calcSub = () => {
    let ctax = 0;
    let csub = 0;
    if (invoice !== "") {
      invoice.products.forEach((product) => {
        csub += product.price * product.quantity;
        ctax += (product.gst / 100) * product.quantity * product.price;
      });
      if (tax === "") setTax(ctax);
      if (sub === "") setSub(csub);
    }
  };
  calcSub();

  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="btn btn-outline-primary" onClick={handlePrint}>
          Download Pdf
        </div>
      </div>
      {invoice !== "" && (
        <div ref={componentRef}>
          <table className="head container">
            <tbody>
              <tr>
                <td className="header">
                  <img src={Logo} alt="logo" />
                </td>
                <td className="shop-info">
                  <div className="shop-name">
                    <span style={{ fontWeight: "bold" }}>
                    Valley Culture Exports LLP
                    </span>
                  </div>
                  <div className="shop-name">
                    <span style={{ fontWeight: "bold" }}>
                      GSTIN : 05AARFV8909L1ZB
                    </span>
                  </div>

                  <div className="shop-address">
                  Lane C-15, Turner Road, Clement Town, Dehradun- 248001, Uttarakhand
                  </div>

                  <div className="shop-address">
                    <span style={{ fontWeight: "bold" }}>State Code</span> - 05
                  </div>
                  <div className="shop-address">
                    <span style={{ fontWeight: "bold" }}>State</span> - UK
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <h1 className="document-type-label">INVOICE</h1>

          <table className="order-data-addresses">
            <tbody>
              <tr>
                <td className="address billing-address">
                  <h6 style={{ fontWeight: "bold" }}>Bill to</h6>

                  <div>{invoice.address.line1}</div>
                  <div>{invoice.address.line2}</div>
                  <div>{invoice.address.city}</div>
                  <div>{invoice.address.state}</div>
                  <div>{invoice.address.pincode}</div>
                  <div className="billing-email">{invoice.email}</div>

                  <div className="billing-phone">{invoice.contact}</div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>State Code</span> -{" "}
                    {stateCodes[placeOfSupply[invoice.address.state]]}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Place of Supply</span>-{" "}
                    {placeOfSupply[invoice.address.state]}
                  </div>
                </td>
                <td className="address shipping-address">
                  <h6 style={{ fontWeight: "bold" }}>Ship to</h6>

                  <div>{invoice.address.line1}</div>
                  <div>{invoice.address.line2}</div>
                  <div>{invoice.address.city}</div>
                  <div>{invoice.address.state}</div>
                  <div>{invoice.address.pincode}</div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>State Code</span> -{" "}
                    {stateCodes[placeOfSupply[invoice.address.state]]}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Place of Supply</span>-{" "}
                    {placeOfSupply[invoice.address.state]}
                  </div>
                </td>
                <td className="order-data">
                  <table>
                    <tr className="invoice-number">
                      <th>Invoice Number</th>
                      <td>{invoice.invoiceNo}</td>
                    </tr>

                    <tr className="invoice-date">
                      <th>Invoice Date</th>
                      <td>{invoice.createdAt.substr(0, 10)}</td>
                    </tr>
                    <tr className="payment-method">
                      <th>Payment Method</th>
                      <td>{invoice.payMethod}</td>
                    </tr>
                    <tr className="payment-method">
                      <th>Payment Status</th>
                      <td>{invoice.payStatus}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="order-details">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>S.No.</th>
                <th>Product</th>
                <th>HSN Code</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>GST Rate</th>
                <th>Tax Value</th>
                <th>Total Invoice Value</th>
              </tr>
            </thead>
            <tbody>
              {invoice.products.length > 0 &&
                invoice.products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>3004</td>
                    <td>{product.quantity}</td>
                    <td>Rs.{product.price}</td>
                    <td>Rs.{product.quantity * product.price}</td>
                    <td>{product.gst}%</td>
                    <td>
                      Rs.
                      {(
                        (product.gst / 100) *
                        product.quantity *
                        product.price
                      ).toFixed(2)}
                    </td>
                    <td>
                      Rs.
                      {(
                        (product.gst / 100) * product.quantity * product.price +
                        product.quantity * product.price
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>

            <tfoot>
              <tr className="no-borders">
                <td className="no-borders" colSpan="6">
                  <div
                    style={{
                      paddingTop: "40px",
                      paddingRight: "20px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                      Amount in Words
                    </span>
                    :{" "}
                    {convertNumberToWords(
                      invoice.invoiceValue -
                        (invoice.discount / 100) * invoice.invoiceValue
                    )}
                  </div>
                </td>

                <td className="no-borders" colSpan="3">
                  <table className="totals">
                    <tfoot>
                      <tr className="">
                        <th className="description">Subtotal</th>
                        <td className="price">
                          <span className="totals-price">Rs.{sub}</span>
                        </td>
                      </tr>

                      {invoice.discount !== 0 && (
                        <tr className="">
                          <th className="description">
                            Discount ({invoice.discount}%)
                          </th>
                          <td className="price">
                            <span className="totals-price">
                              Rs.
                              {(
                                (invoice.discount / 100) *
                                invoice.invoiceValue
                              ).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      )}
                      <tr className="">
                        <th className="description">CGST</th>
                        <td className="price">
                          <span className="totals-price">Rs.{tax / 2}</span>
                        </td>
                      </tr>
                      <tr className="">
                        <th className="description">
                          {invoice.address.state === "Uttarakhand"
                            ? "SGST"
                            : "IGST"}
                        </th>
                        <td className="price">
                          <span className="totals-price">Rs.{tax / 2}</span>
                        </td>
                      </tr>
                      <tr style={{ borderTop: "1px solid red" }}>
                        <th className="description">Total</th>
                        <td className="price">
                          <span className="totals-price font-weight-bold">
                            Rs.
                            {(
                              invoice.invoiceValue -
                              (invoice.discount / 100) * invoice.invoiceValue
                            ).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </td>
              </tr>
            </tfoot>
          </table>
          <div>
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>
              Tax payable on reverse charge basis
            </span>
            - No
          </div>
          <div
            style={{
              border: "2px solid black",
              display: "inline-block",
              padding: "12px",
              marginTop: "50px",
            }}
          >
            <div>For Bharat Bhaishajya Shala Pvt. Ltd.</div>
            <img src={Sign} alt="Sign" height="100" width="100" />
            <div>Authorised Signature</div>
          </div>

          <div className="bottom-spacer"></div>

          <div id="footer">Thank you for making a purchase</div>
        </div>
      )}
    </>
  );
});
export default Pdf;
