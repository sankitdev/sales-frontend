import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { DialogContext } from "@/app/context/DialogReducer";
import { ProductData } from "@/types/types";
import { fetchProductById } from "@/api/ProductApi";
import ProductInput from "./ProductInput";

interface ProductActionsDropdownProps {
  product: ProductData;
}

const ProductActionButton = ({ product }: ProductActionsDropdownProps) => {
  const { remove } = useProducts();
  const { isDialogOpen, toggleDialog, setAction } = useContext(DialogContext);
  const [ProductData, setProductData] = useState<ProductData | null>(null);
  const handleUpdate = async () => {
    if (!product._id) return;
    setAction("update");
    toggleDialog();
    try {
      const data = await fetchProductById(product._id);
      setProductData(data);
    } catch (error) {
      console.error("Failed to fetch student data", error);
    }
  };
  const handleDelete = () => {
    console.log(product._id);
    if (product._id) remove(product._id);
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
        </DropdownMenuContent>
        {ProductData && (
          <ProductInput
            isOpen={isDialogOpen}
            onClose={toggleDialog}
            product={ProductData}
          />
        )}
      </DropdownMenu>
    </>
  );
};

export default React.memo(ProductActionButton);
