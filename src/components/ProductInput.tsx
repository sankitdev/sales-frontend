"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductData } from "@/types/types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import React, { useContext, useEffect } from "react";
import { DialogContext } from "@/app/context/DialogReducer";

type ProductInputProps = {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductData;
};

const ProductInput = ({ isOpen, onClose, product }: ProductInputProps) => {
  const { action } = useContext(DialogContext);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ProductData>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      image: "",
      description: "",
      price: 5,
      quantity: 1,
    },
  });
  const { add, update } = useProducts();
  const { toast } = useToast();

  useEffect(() => {
    if (action === "update" && product) {
      const { name, image, price, quantity, description } = product;
      reset({ name, image, price, quantity, description });
    } else if (action === "add") {
      reset({
        name: "",
        image: "",
        description: "",
        price: 5,
        quantity: 1,
      });
    }
  }, [action, product, reset]);
  const onSubmit: SubmitHandler<ProductData> = async (values) => {
    try {
      const { name, image, description, price, quantity } = values;
      const formatedData = {
        name,
        image,
        description,
        price,
        quantity,
      };
      if (action === "add") {
        add(formatedData);
      } else if (action === "update" && product && product._id !== undefined) {
        const id = product._id;
        update({ id, data: formatedData });
      }
      onClose();
    } catch (error) {
      console.error("Error saving", error);
      toast({
        title: "Error",
        description: "Error Saving Student Data",
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">
            {action === "add" ? "Add Product" : "Update Product"}
          </DialogTitle>
          <DialogDescription>Enter each fields properly</DialogDescription>
        </DialogHeader>
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label>Product Name</Label>
              <Input
                type="text"
                placeholder="Enter Product Name"
                className="mt-2"
                {...register("name", {
                  required: "Product Name is required",
                })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm py-2 ">
                {errors.name.message}
              </p>
            )}
            <div>
              <Label>Add Image</Label>
              <Input
                type="text"
                placeholder="Enter Image URL"
                className="my-2"
                {...register("image", {
                  required: "Please add Image",
                })}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                placeholder="Enter description"
                className="my-2"
                {...register("description", {
                  required: "Please enter details of product",
                })}
              />
            </div>

            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                placeholder="Enter Science Score"
                className="my-2"
                {...register("quantity", {
                  required: "Please enter Quantity",
                  setValueAs: (value) => Number(value),
                })}
              />
            </div>

            <div>
              <Label>Price</Label>
              <Input
                type="number"
                className="my-2"
                placeholder="Enter History Score"
                {...register("price", {
                  required: "Please enter Price",
                  setValueAs: (value) => Number(value),
                })}
              />
            </div>
            <Button>{action === "add" ? "Add" : "Update"}</Button>
          </form>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ProductInput);
