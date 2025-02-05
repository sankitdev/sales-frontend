"use client";

import React, { useRef } from "react";
import { Button } from "./ui/button";
import { SalesData } from "@/types/types";

interface ExportPdfProps {
  saleData: SalesData;
}

export function ExportPdf({ saleData }: ExportPdfProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    try {
      const html2PDF = (await import("jspdf-html2canvas")).default;

      if (contentRef.current) {
        const pdf = await html2PDF(contentRef.current, {
          jsPDF: {
            format: "a4",
            orientation: "portrait",
            unit: "px",
            hotfixes: ["px_scaling"],
          },
          imageType: "image/jpeg",
        });

        pdf.save(`${saleData._id || "invoice"}.pdf`);
      } else {
        console.error("Content reference is null");
      }
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div
        ref={contentRef}
        className="w-full max-w-3xl shadow-md rounded-lg p-6 bg-white text-black"
      >
        <header className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold">Invoice</h1>
          <p className="text-sm">Invoice #{saleData._id || "N/A"}</p>
          <p className="text-sm">Date: {new Date().toDateString()}</p>
        </header>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Billing Details</h2>
          <p className="text-sm">{saleData.name}</p>
          <p className="text-sm">Phone: {saleData.phone}</p>
          {saleData.email && <p className="text-sm">Email: {saleData.email}</p>}
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Items</h2>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Item</th>
                <th className="py-2 px-3">Quantity</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {saleData.selectedProducts.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-3">{product.name}</td>
                  <td className="py-2 px-3">{product.quantity}</td>
                  <td className="py-2 px-3">${product.price}</td>
                  <td className="py-2 px-3">
                    ${product.quantity * product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="text-right">
          <div className="border-t pt-4">
            <p className="text-sm">Subtotal: ${saleData.totalPrice}</p>
            <p className="text-lg font-bold">Total: ${saleData.totalPrice}</p>
          </div>
        </section>

        <footer className="mt-6 text-center text-sm">
          <p>Thank you for your business!</p>
        </footer>
      </div>

      <Button
        onClick={handleExport}
        className="mt-6 py-2 px-4 rounded-lg shadow"
      >
        Generate PDF
      </Button>
    </div>
  );
}
