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
import { SalesData } from "@/types/types";
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
  const [pdf, setPdf] = useState<SalesData | null>(null);
  const handleUpdate = async () => {
    if (!sales._id) return;
    console.log(sales._id);
    setAction("update");
    toggleDialog();
    try {
      const data = await fetchSalesById(sales._id);
      setSalesData(data);
    } catch (error) {
      console.error("Failed to fetch student data", error);
    }
  };
  const handleDelete = () => {
    if (sales._id) remove(sales._id);
  };
  const handleExport = async () => {
    console.log(sales._id);
    const data = await fetchSalesById(sales._id!);
    console.log(pdf);
    setPdf(data);
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
          <DropdownMenuItem onClick={handleExport}>
            {/* {pdf && <ExportPdf saleData={pdf} />} */}
            Export
          </DropdownMenuItem>
        </DropdownMenuContent>
        {SalesInput && (
          <SalesInput
            isOpen={isDialogOpen}
            onClose={toggleDialog}
            sales={SalesData}
          />
        )}
      </DropdownMenu>
    </>
  );
};

export default React.memo(ProductActionButton);
