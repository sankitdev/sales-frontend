"use client";
import { Navbar } from "@/components/NavBar";
import { columns } from "@/components/salesTable/columns";
import { DataTable } from "@/components/salesTable/data-table";
import { SkeletonCard } from "@/components/ShimmerUI";
import { useSales } from "@/hooks/useSales";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DataTableComponent() {
  const { data, isLoading } = useSales();
  if (isLoading) return <SkeletonCard />;
  const salesData = data ?? [];
  return (
    <div>
      <Navbar />
      <div className="px-5 mt-10">
        <h1 className="text-4xl text-center font-bold">Sales Data</h1>
        <DataTable columns={columns} data={salesData} />
        <div className="text-center">
          <Link href={"/dashboard"}>
            <Button className="">Go To Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
