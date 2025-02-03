"use client";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductData, SalesData, SalesInputProps } from "@/types/types";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import React, { useContext, useEffect, useState } from "react";
import { DialogContext } from "@/app/context/DialogReducer";
import { useSales } from "@/hooks/useSales";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { fetchProducts } from "@/api/ProductApi";

const SalesInput = ({ isOpen, onClose, sales }: SalesInputProps) => {
  const { action } = useContext(DialogContext);
  const form = useForm<SalesData>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      image: "",
      email: "",
      phone: "",
      productName: "",
      quantity: 1,
      price: 0,
      totalPrice: 0,
    },
  });
  const { add, update } = useSales();
  const { toast } = useToast();
  const [product, setProduct] = useState<ProductData[]>([]);
  useEffect(() => {
    let isMounted = true;

    const fetchTeacher = async () => {
      try {
        const response = await fetchProducts();
        if (isMounted) setProduct(response);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeacher();

    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    if (action === "update" && sales) {
      const { name, image, email, quantity, phone, productName } = sales;
      form.reset({ name, image, email, quantity, phone, productName });
    } else if (action === "add") {
      form.reset({
        name: "",
        image: "",
        email: "",
        phone: "",
        productName: "",
        quantity: 1,
        price: 0,
        totalPrice: 0,
      });
    }
  }, [action, form, sales]);
  const onSubmit: SubmitHandler<SalesData> = async (values) => {
    try {
      const { email, name, image, quantity, phone, productName } = values;
      const formatedData = {
        email,
        name,
        image,
        quantity,
        phone,
        productName,
      };
      if (action === "add") {
        add(formatedData);
      } else if (action === "update" && sales && sales._id !== undefined) {
        const id = sales._id;
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
          <DialogDescription>Enter each field properly</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Customer Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Phone Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {product.map((product) => (
                        <SelectItem key={product._id} value={product._id!}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Quantity"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{action === "add" ? "Add" : "Update"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(SalesInput);
