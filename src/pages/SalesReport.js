import React, { useEffect, useState } from "react";
import LineChartDashed from "../components/charts/LineChartDashed";
import AreaChartSpline from "../components/charts/AreaChartSpline";
import DistributedColumnChart from "../components/charts/DistributedColumnChart";
import { getInvoicesForMonth } from "../functions";

const SalesReport = ({ token }) => {
  const [invoices, setInvoices] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [soldQty, setSoldQty] = useState([]);
  const [areaData, setAreaData] = useState([]);

  useEffect(() => {
    getInvoicesForMonth(
      token,
      new Date().getMonth() + 1,
      new Date().getFullYear()
    )
      .then((res) => {
        let cdate = 1;
        let arr = [];
        let products = [];
        let sold = [];
        console.log(res.data);
        if (res.data.success) {
          const { invoices } = res.data;
          setInvoices(invoices);

          for (let i = 0; i < invoices.length; i++) {
            const date = new Date(invoices[i].createdAt).getDate();
            if (i === 0) {
              if (date === 1) {
                arr.push(Number(invoices[i].invoiceValue));
              } else {
                for (let j = 0; j < date; j++) {
                  if (j !== date - 1) arr.push(0);
                  else arr.push(Number(invoices[i].invoiceValue));
                }
                cdate = date;
              }
            } else {
              if (cdate === date) {
                arr[arr.length - 1] += Number(invoices[i].invoiceValue);
              } else {
                if (date - cdate === 1) {
                  arr.push(Number(invoices[i].invoiceValue));
                  cdate = date;
                } else {
                  for (let j = 0; j < date - cdate; j++) {
                    if (j !== date - cdate - 1) arr.push(0);
                    else arr.push(Number(invoices[i].invoiceValue));
                  }
                  cdate = date;
                }
              }
            }
            for (let j = 0; j < invoices[i].products.length; j++) {
              if (i === 0) {
                products.push(invoices[i].products[j].title);
                sold.push(invoices[i].products[j].quantity);
              } else {
                let index = products.indexOf(invoices[i].products[j].title);
                if (index === -1) {
                  products.push(invoices[i].products[j].title);
                  sold.push(invoices[i].products[j].quantity);
                } else {
                  sold[index] =
                    Number(sold[index]) +
                    Number(invoices[i].products[j].quantity);
                }
              }
            }
          }
          setAreaData(arr);
          setSoldProducts(products);
          setSoldQty(sold);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const getTotalSold = (sold) => {
    let sum = 0;
    for (let i = 0; i < sold.length; i++) {
      sum += Number(sold[i]);
    }
    return sum;
  };
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-between align-items-baseline">
        <h1 className="mb-5">Sales Report</h1>

        {/* <div className="d-flex">
          <select className="form-control mr-2">
            <option>--Month--</option>
          </select>
          <select className="form-control mr-2">
            <option>--Year--</option>
          </select>
          <button className="btn btn-primary">Apply</button>
        </div> */}
      </div>

      <div className="col-12 mb-5">
        <h2>Total Sales this month : Rs {getTotalSold(areaData)}</h2>
        {areaData.length > 0 && <AreaChartSpline areaData={areaData} />}
      </div>
      <div className="col-12 mt-5">
        <h2>Total Products sold this month : {getTotalSold(soldQty)}</h2>
        {soldProducts.length > 0 && soldQty.length > 0 && (
          <DistributedColumnChart products={soldProducts} sold={soldQty} />
        )}
      </div>
    </div>
  );
};

export default SalesReport;
