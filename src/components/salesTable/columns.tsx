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
      return <DataTableColumnHeader column={column} title="phone" />;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "productName.name",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sale = row.original;
      return <ProductActionButton sales={sale} />;
    },
  },
];
