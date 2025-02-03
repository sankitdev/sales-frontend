"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ProductData } from "@/types/types";
import ProductActionButton from "./ProductActionButton";
import { DataTableColumnHeader } from "./ColumnHide";

export const columns: ColumnDef<ProductData>[] = [
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
    accessorKey: "description",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="description" />;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="price" />;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return <ProductActionButton product={product} />;
    },
  },
];
