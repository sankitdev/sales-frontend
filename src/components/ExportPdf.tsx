import { SalesData } from "@/types/types";
import { OutputType } from "jspdf-invoice-template";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import React from "react";
const generateInvoicePDF = (saleData: SalesData) => {
  console.log(saleData);
  const props = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice",
    orientationLandscape: false,
    compress: true,
    logo: {
      src: "",
      type: "PNG",
      width: 53.33,
      height: 26.66,
      margin: {
        top: 0,
        left: 0,
      },
    },
    stamp: {
      inAllPages: true,
      src: "",
      width: 20,
      height: 20,
      margin: {
        top: 0,
        left: 0,
      },
    },
    business: {
      name: "Patoliya",
      address: "Utran",
      phone: "(+1) 123 456 789",
      email: "patoliya@gmail.com",
      website: "patoliya.com",
    },
    contact: {
      label: "Invoice issued for:",
      name: saleData.name?.toString(),
      phone: saleData.phone?.toString(),
      email: saleData.email?.toString(),
    },
    invoice: {
      label: "Invoice #: ",
      num: saleData._id,
      invGenDate: "Generated Date: " + new Date().toLocaleDateString(),
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        { title: "Name", style: { width: 10 } },
        { title: "Email", style: { width: 30 } },
        { title: "Price", style: { width: 80 } },
        { title: "Quantity", style: { width: 30 } },
        { title: "Total", style: { width: 30 } },
      ],
      table: [
        saleData.name?.toString(),
        saleData.email?.toString(),
        saleData.price?.toString(),
        saleData.quantity?.toString(),
        saleData.productName.toString(),
      ],
      additionalRows: [
        {
          col1: "Total:",
          col2: saleData.totalPrice?.toString(),
          style: { fontSize: 14 },
        },
      ],
      invDescLabel: "Invoice Note",
      invDesc: "Thank you for your business.",
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and seal.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

  jsPDFInvoiceTemplate(props);
};

interface ExportPdfProps {
  saleData: SalesData;
}

const ExportPdf: React.FC<ExportPdfProps> = ({ saleData }) => {
  return (
    <div>
      <button onClick={() => generateInvoicePDF(saleData)}>Generate PDF</button>
    </div>
  );
};

export default ExportPdf;
