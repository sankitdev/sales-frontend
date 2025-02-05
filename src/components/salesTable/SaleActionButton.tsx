import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { DialogContext } from "@/app/context/DialogReducer";
import { SalesData, SalesPDF } from "@/types/types";
import SalesInput from "../sales/SalesInput";
import { fetchSalesById } from "@/api/SalesApi";
import { useSales } from "@/hooks/useSales";
import { ExportPdf } from "../ExportPdf";

interface SalesActionsDropdownProps {
  sales: SalesData;
}

const ProductActionButton = ({ sales }: SalesActionsDropdownProps) => {
  const { remove } = useSales();
  const { isDialogOpen, toggleDialog, setAction } = useContext(DialogContext);
  const [SalesData, setSalesData] = useState<SalesData | null>(null);
  const [pdfData, setPdfData] = useState<SalesPDF | null>(null);

  const handleUpdate = async () => {
    if (!sales._id) return;
    console.log(sales._id);
    setAction("update");
    toggleDialog();
    try {
      const data = await fetchSalesById(sales._id);
      setSalesData(data);
    } catch (error) {
      console.error("Failed to fetch sales data", error);
    }
  };

  const handleDelete = () => {
    if (sales._id) remove(sales._id);
  };

  const handleExport = async () => {
    if (!sales._id) return;

    try {
      console.log("Fetching sales data for PDF:", sales._id);
      const data = await fetchSalesById(sales._id);
      console.log(data);
      setPdfData(data); // Store fetched data
    } catch (error) {
      console.error("Failed to fetch sales data for export", error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          <DropdownMenuItem onClick={handleExport}>Export</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export PDF outside to prevent multiple renders */}
      {pdfData && <ExportPdf saleData={pdfData} />}

      {SalesInput && (
        <SalesInput
          isOpen={isDialogOpen}
          onClose={toggleDialog}
          sales={SalesData}
        />
      )}
    </>
  );
};

export default React.memo(ProductActionButton);
