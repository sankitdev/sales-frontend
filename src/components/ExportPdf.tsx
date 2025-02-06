"use client";
import React from "react";
import { Button } from "./ui/button";
import { SalesPDF } from "@/types/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportPdfProps {
  saleData: SalesPDF;
}

export function ExportPdf({ saleData }: ExportPdfProps) {
  const handleExport = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let y = 10;

    // Load External Logo
    const logoUrl =
      "https://images-platform.99static.com/OTwRVhH8dr3fC4eyzFsA5aRF6u4=/199x199:1799x1799/500x500/top/smart/99designs-contests-attachments/146/146370/attachment_146370174";
    pdf.addImage(logoUrl, "PNG", 160, y, 40, 15);
    y += 20;

    // Title: INVOICE
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("INVOICE", 10, y);
    y += 10;

    // Invoice Details
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Invoice ID: #${saleData._id}`, 10, y);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 150, y);
    y += 6;
    pdf.text(`Shipment ID: #SHP-0025410`, 10, y);
    y += 10;

    // Customer Details Section
    pdf.setFont("helvetica", "bold");
    pdf.text("Billing Address", 10, y);
    pdf.text("Shipping Address", 110, y);
    y += 6;

    pdf.setFont("helvetica", "normal");
    pdf.text(`Name: ${saleData.name || "N/A"}`, 10, y);
    pdf.text(`Unit 1/23 Hastings Road, Melbourne 3000`, 110, y);
    y += 6;
    pdf.text(`Phone: ${saleData.phone || "N/A"}`, 10, y);
    y += 6;
    pdf.text(`Email: ${saleData.email || "N/A"}`, 10, y);
    y += 10;

    // Draw a Line
    pdf.setDrawColor(0);
    pdf.line(10, y, 200, y);
    y += 6;

    // Product Table
    autoTable(pdf, {
      startY: y,
      head: [["Name", "Quantity", "Price", "Total"]],
      body: saleData.selectedProducts.map((product) => [
        product.productId.name || "Unknown Product",
        product.quantity,
        `INR ${product.productId.price}`,
        `INR ${product.quantity * product.productId.price}`,
      ]),
      theme: "grid",
      styles: { fontSize: 10 },
    });

    // Total Price
    const { lastAutoTable } = pdf as any;
    y = lastAutoTable ? lastAutoTable.finalY + 10 : y + 10;
    pdf.text(`Total Price:  INR ${saleData.totalPrice}`, 10, y);

    // Footer
    y += 10;
    pdf.setFont("helvetica", "italic");
    pdf.text("Thank you for your purchase!", 10, y);

    // Save the PDF
    pdf.save(`${saleData._id || "invoice"}.pdf`);
  };

  return (
    <Button onClick={handleExport} className="mt-6 py-2 px-4 rounded-lg shadow">
      Generate PDF
    </Button>
  );
}
