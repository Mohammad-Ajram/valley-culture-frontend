import axios from "axios";

export const adminLogin = async (username, password) =>
  await axios.post(`${process.env.REACT_APP_API}/api/login`, {
    username,
    password,
  });

export const createProduct = (token, title, price, gst, category) =>
  axios.post(
    `${process.env.REACT_APP_API}/api/add-product`,
    { title, price, gst, category },
    {
      headers: {
        "auth-token": token,
      },
    }
  );

export const updateProduct = (token, id, title, price, gst, category) =>
  axios.put(
    `${process.env.REACT_APP_API}/api/update-product`,
    { id, title, price, gst, category },
    {
      headers: {
        "auth-token": token,
      },
    }
  );

export const getProduct = (token, id) =>
  axios.get(`${process.env.REACT_APP_API}/api/get-product/${id}`, {
    headers: {
      "auth-token": token,
    },
  });

export const getProducts = (token) =>
  axios.get(`${process.env.REACT_APP_API}/api/get-products`, {
    headers: {
      "auth-token": token,
    },
  });

export const createInvoice = (
  token,
  invoiceNo,
  name,
  email,
  contact,
  address,
  products,
  invoiceValue,
  discount,
  payMethod,
  payStatus
) =>
  axios.post(
    `${process.env.REACT_APP_API}/api/create-invoice`,
    {
      invoiceNo,
      name,
      email,
      contact,
      address,
      products,
      invoiceValue,
      discount,
      payMethod,
      payStatus,
    },
    {
      headers: {
        "auth-token": token,
      },
    }
  );

export const getInvoices = (token) =>
  axios.get(`${process.env.REACT_APP_API}/api/get-invoices`, {
    headers: {
      "auth-token": token,
    },
  });

export const getInvoicesForMonth = (token, month, year) =>
  axios.get(
    `${process.env.REACT_APP_API}/api/get-invoices-for-month/${month}/${year}`,
    {
      headers: {
        "auth-token": token,
      },
    }
  );

export const getInvoice = (token, id) =>
  axios.get(`${process.env.REACT_APP_API}/api/get-invoice/${id}`, {
    headers: {
      "auth-token": token,
    },
  });
export const updateInvoice = (
  token,
  id,
  invoiceNo,
  name,
  email,
  contact,
  address,
  products,
  invoiceValue,
  discount,
  payMethod,
  payStatus
) =>
  axios.put(
    `${process.env.REACT_APP_API}/api/update-invoice`,
    {
      invoiceNo,
      id,
      name,
      email,
      contact,
      address,
      products,
      invoiceValue,
      discount,
      payMethod,
      payStatus,
    },
    {
      headers: {
        "auth-token": token,
      },
    }
  );
export const getInvoiceNo = (token) =>
  axios.get(`${process.env.REACT_APP_API}/api/get-invoice-no`, {
    headers: {
      "auth-token": token,
    },
  });
