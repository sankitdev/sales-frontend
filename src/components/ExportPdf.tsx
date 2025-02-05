"use client";

import React from "react";
import { Button } from "./ui/button";
import { SalesPDF } from "@/types/types";
import jsPDF from "jspdf";

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

    let y = 10; // Start position for text

    // Title: Invoice
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("Invoice", 105, y, { align: "center" });
    y += 15;

    // Invoice Information
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Invoice #${saleData._id}`, 10, y);
    y += 6;
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 10, y);
    y += 6;
    pdf.text(`Billing Address:`, 10, y);
    y += 6;
    pdf.text(`Name: ${saleData.name || "N/A"}`, 10, y);
    y += 6;
    pdf.text(`Phone: ${saleData.phone || "N/A"}`, 10, y);
    y += 6;
    if (saleData.email) {
      pdf.text(`Email: ${saleData.email}`, 10, y);
      y += 8;
    }

    // Line Break
    pdf.setDrawColor(0);
    pdf.line(10, y, 200, y);
    y += 4;

    // Table Header
    pdf.setFont("helvetica", "bold");
    pdf.text("Item", 10, y);
    pdf.text("Qty", 120, y);
    pdf.text("Price", 150, y);
    pdf.text("Total", 180, y);
    y += 6;
    pdf.setDrawColor(0);
    pdf.line(10, y, 200, y);
    y += 4;

    // Items List
    pdf.setFont("helvetica", "normal");
    saleData.selectedProducts.forEach((product) => {
      const productName = product.productId.name || "Unknown Product";
      const productPrice = product.productId.price || 0;

      pdf.text(productName, 10, y);
      pdf.text(String(product.quantity), 120, y);
      pdf.text(`$${productPrice}`, 150, y);
      pdf.text(`$${saleData.totalPrice}`, 180, y);
      y += 6;
    });

    // Line Break
    pdf.setDrawColor(0);
    pdf.line(10, y, 200, y);
    y += 4;

    // Total Price Section
    y += 6;
    pdf.setFont("helvetica", "bold");
    pdf.text(`Subtotal: $${saleData.totalPrice}`, 10, y);
    y += 6;
    pdf.text(`Total Price: $${saleData.totalPrice}`, 10, y);

    // Footer
    y += 10;
    pdf.setFont("helvetica", "italic");
    pdf.text("Thank you for your business!", 105, y, { align: "center" });

    // Save the PDF
    pdf.save(`${saleData._id || "invoice"}.pdf`);
  };

  return (
    <Button onClick={handleExport} className="mt-6 py-2 px-4 rounded-lg shadow">
      Generate PDF
    </Button>
  );
}
