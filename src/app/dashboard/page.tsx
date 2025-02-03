"use client";
import { Navbar } from "@/components/NavBar";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useProducts } from "@/hooks/useProducts";
import { SkeletonCard } from "@/components/ShimmerUI";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DataTableComponent() {
  const { data, isLoading } = useProducts();
  if (isLoading) return <SkeletonCard />;
  const productData = data ?? [];
  return (
    <div>
      <Navbar />
      <div className="px-5 mt-10">
        <h1 className="text-4xl text-center font-bold">Products</h1>
        <DataTable columns={columns} data={productData} />
        <div className="text-center">
          <Link href={"/dashboard/sales"}>
            <Button className="">Go To Sales</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
