"use client";
import { ColumnDef } from "@tanstack/react-table";
import { SalesData } from "@/types/types";
import ProductActionButton from "./SaleActionButton";
import { DataTableColumnHeader } from "../ColumnHide";

export const columns: ColumnDef<SalesData>[] = [
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Phone" />;
    },
  },
  {
    id: "productNames",
    header: "Product(s)",
    cell: ({ row }) => {
      const products = row.original.selectedProducts;
      return (
        <div>
          {products.map((product, index) => (
            <div key={index}>
              {product.productId.name} (Quantity: {product.quantity}, Price: ₹
              {product.productId.price})
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "totalQuantity",
    header: "Total Quantity",
    cell: ({ row }) => {
      const products = row.original.selectedProducts;
      const totalQuantity = products.reduce(
        (sum, product) => sum + product.quantity,
        0
      );
      return <span>{totalQuantity}</span>;
    },
  },
  {
    id: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const totalPrice = row.original.totalPrice;
      return <span>₹{totalPrice}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sale = row.original;
      return <ProductActionButton sales={sale} />;
    },
  },
];
