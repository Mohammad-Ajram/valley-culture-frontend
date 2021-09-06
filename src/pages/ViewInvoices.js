import React, { useEffect, useState } from "react";
import { getInvoices } from "../functions";
import axios from "axios";
import { toast } from "react-toastify";

const ViewInvoices = ({ token, history }) => {
  const [invoices, setInvoices] = useState([]);
  const [senderEmail, setSenderEmail] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    getInvoices(token)
      .then((res) => {
        if (res.data.success) setInvoices(res.data.invoices);
      })
      .catch((err) => console.log(err));
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("file", file);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API}/api/send-email/${senderEmail}`,
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": token,
      },
    })
      .then((res) => {
        if (res.data.success) {
          toast.success("Email sent successfully");
          setFile("");

          setSenderEmail("");
        } else {
          toast.error("Error sending email");
          setFile("");

          setSenderEmail("");
        }
      })
      .catch((err) => {
        toast.error("Error sending email");
        setFile("");

        setSenderEmail("");
      });
  };

  return (
    <>
      <h2>View Invoices</h2>
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Invoice Date</th>
            <th>Invoice Number</th>
            <th>Invoice Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 &&
            invoices.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.createdAt.substr(0, 10)}</td>
                <td>{item.invoiceNo}</td>
                <td>Rs.{item.invoiceValue}</td>
                <td>
                  <div className="d-flex flex-grow-1">
                    <div
                      className="btn action-btn text-primary"
                      onClick={() =>
                        history.push(`/update-invoice/${item._id}`)
                      }
                    >
                      Edit
                    </div>
                    <div
                      className="btn action-btn text-primary"
                      onClick={() => history.push(`/view-invoices/${item._id}`)}
                    >
                      Download
                    </div>
                    <div
                      className="btn action-btn text-primary"
                      type="button"
                      data-toggle="modal"
                      data-target="#myModal"
                      onClick={() => setSenderEmail(item.email)}
                    >
                      Email
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Send Email</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={sendEmail}>
                <div className="form-group">
                  <label>Send to</label>
                  <input
                    type="email"
                    className="form-control"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                  />
                </div>

                <input
                  type="file"
                  className="form-control"
                  encType="multipart/form-data"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <button
                  className="btn btn-primary mt-5"
                  type="submit"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Send Email
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewInvoices;
