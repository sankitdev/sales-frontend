import { SalesData } from "@/types/types";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceProps {
  invoiceData: SalesData;
}

const InvoiceGenerator: React.FC<InvoiceProps> = ({ invoiceData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo
    // doc.addImage("images.jpeg", "JPEG", 160, 10, 40, 20);

    // Header
    doc.setFontSize(22);
    doc.text("INVOICE", 20, 20);

    // Seller details
    doc.setFontSize(10);
    doc.text("PatoliyaInfo Tech", 200, 20, { align: "right" });

    // Customer details
    doc.setFontSize(14);
    doc.text(`Dear ${invoiceData.name}`, 20, 50);
    doc.setFontSize(10);
    doc.text(
      "Here are your order details. We thank you for your purchase.",
      20,
      60
    );

    // Order details
    doc.text(`Order ID: #${invoiceData.productName}`, 20, 80);
    doc.text(`Email: ${invoiceData.email}`, 20, 87);
    doc.text(`Phone: ${invoiceData.phone}`, 20, 94);
    // doc.text(`Shipment ID: #${invoiceData.shipmentId}`, 20, 101);

    // Addresses
    // doc.setFontSize(12);
    // doc.text("Billing Address:", 20, 120);
    // doc.setFontSize(10);
    // doc.text(invoiceData.billingAddress.split(","), 20, 130);

    // doc.setFontSize(12);
    // doc.text("Shipping Address:", 110, 120);
    // doc.setFontSize(10);
    // doc.text(invoiceData.shippingAddress.split(","), 110, 130);

    // Products table
    const tableColumn = ["Products", "SKU", "QTY", "Total"];
    const tableRows = [
      [
        invoiceData.productName,
        invoiceData.sku || "N/A", // Add a fallback for SKU if missing
        invoiceData.quantity,
        `$${invoiceData.totalPrice?.toFixed(2) || "0.00"}`, // Add fallback for totalPrice
      ],
    ];

    autoTable(doc, {
      startY: 110, // Adjusted Y-position for table
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [0, 0, 0] },
    });

    // Totals
    const finalY = doc.lastAutoTable.finalY || 120; // Ensure we get the Y-position after the table
    doc.setFontSize(12);
    doc.text(
      `Subtotal: $${invoiceData.totalPrice?.toFixed(2) || "0.00"}`,
      150,
      finalY + 10
    );
    doc.text(
      `Total: $${invoiceData.totalPrice?.toFixed(2) || "0.00"}`,
      150,
      finalY + 20
    );

    doc.save("invoice.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      Download Invoice
    </button>
  );
};

export default InvoiceGenerator;
