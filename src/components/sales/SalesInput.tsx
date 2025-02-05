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
import { ScrollArea } from "@/components/ui/scroll-area";
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
import QuantityInput from "./Quantity";

const SalesInput = ({ isOpen, onClose, sales }: SalesInputProps) => {
  const { action } = useContext(DialogContext);
  const form = useForm<SalesData>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      image: "",
      email: "",
      phone: "",
      totalPrice: 0,
      selectedProducts: [],
    },
  });
  const { add, update } = useSales();
  const { toast } = useToast();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [invalidProducts, setInvalidProducts] = useState<number[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    if (action === "update" && sales) {
      const { name, image, email, phone, selectedProducts, totalPrice } = sales;
      form.reset({ name, image, email, phone, selectedProducts, totalPrice });
    } else if (action === "add") {
      console.log("Resetting form to initial values");
      form.reset({
        name: "",
        image: "",
        email: "",
        phone: "",
        selectedProducts: [],
        totalPrice: 0,
      });
    }
  }, [action, form, sales]);
  useEffect(() => {
    console.log("Sales Data:", sales);
  }, [sales]);

  const handleAddProduct = () => {
    const currentProducts = form.getValues("selectedProducts") || [];
    form.setValue("selectedProducts", [
      ...currentProducts,
      { productId: "", name: "", quantity: 1, price: 0 },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    const currentProducts = form.getValues("selectedProducts") || [];
    const updatedProducts = [...currentProducts];
    updatedProducts.splice(index, 1);
    form.setValue("selectedProducts", updatedProducts);

    // Remove from invalid products if present
    setInvalidProducts((prev) => prev.filter((i) => i !== index));
  };

  const handleProductChange = (
    index: number,
    productId: string,
    productName: string,
    price: number
  ) => {
    const currentProducts = form.getValues("selectedProducts") || [];
    const updatedProducts = [...currentProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productId,
      name: productName,
      price,
    };
    form.setValue("selectedProducts", updatedProducts);

    if (productId) {
      setInvalidProducts((prev) => prev.filter((i) => i !== index));
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const currentProducts = form.getValues("selectedProducts") || [];
    const updatedProducts = [...currentProducts];
    updatedProducts[index] = { ...updatedProducts[index], quantity };
    form.setValue("selectedProducts", updatedProducts);
  };

  const calculateTotal = () => {
    const selectedProducts = form.getValues("selectedProducts") || [];
    return selectedProducts.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };

  const validateProducts = () => {
    const selectedProducts = form.getValues("selectedProducts") || [];
    const invalid: number[] = [];

    selectedProducts.forEach((product, index) => {
      if (!product.productId) {
        invalid.push(index);
      }
    });

    setInvalidProducts(invalid);
    return invalid.length === 0;
  };

  const calculateProductTotal = (quantity: number, price: number) => {
    return quantity * price;
  };

  const onSubmit: SubmitHandler<SalesData> = async (values) => {
    try {
      if (!validateProducts()) {
        toast({
          title: "Error",
          description: "Please select products for all entries",
          variant: "destructive",
        });
        return;
      }

      const { email, name, image, phone, selectedProducts } = values;
      if (!selectedProducts || selectedProducts.length === 0) {
        toast({
          title: "Error",
          description: "Please select at least one product.",
          variant: "destructive",
        });
        return;
      }
      const formatedData = {
        email,
        name,
        image,
        phone,
        selectedProducts,
        totalPrice: calculateTotal(),
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
        description: "Error Saving Sales Data",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">
            {action === "add" ? "Add Product" : "Update Product"}
          </DialogTitle>
          <DialogDescription>Enter each field properly</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] px-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Customer Name"
                        {...field}
                        required
                      />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Email"
                        {...field}
                        required
                      />
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
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Image URL"
                        {...field}
                        required
                      />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Phone"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="button" onClick={handleAddProduct}>
                  Add Product
                </Button>
                {form.watch("selectedProducts")?.map((product, index) => (
                  <div key={index} className="space-y-2 mt-4">
                    <div className="flex items-center space-x-4">
                      <Select
                        onValueChange={(value) => {
                          const selectedProduct = products.find(
                            (p) => p._id === value
                          );
                          if (selectedProduct) {
                            handleProductChange(
                              index,
                              value,
                              selectedProduct.name,
                              selectedProduct.price
                            );
                          }
                        }}
                        value={product.productId}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={
                              invalidProducts.includes(index)
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product._id} value={product._id!}>
                              {product.name} - ₹{product.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <QuantityInput
                        index={index}
                        product={product}
                        handleQuantityChange={handleQuantityChange}
                      />
                      <div className="flex items-center space-x-2">
                        <span className="whitespace-nowrap">
                          ₹{product.price}
                        </span>
                        <span>×</span>
                        <span>{product.quantity}</span>
                        <span>=</span>
                        <span className="font-semibold">
                          ₹
                          {calculateProductTotal(
                            product.quantity,
                            product.price
                          )}
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveProduct(index)}
                        type="button"
                      >
                        Remove
                      </Button>
                    </div>
                    {invalidProducts.includes(index) && (
                      <p className="text-sm text-red-500">
                        Please select a product
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </form>
          </Form>
        </ScrollArea>

        <div className="flex items-center justify-between p-6 pt-0">
          <div className="text-lg font-bold">
            Total: ₹{calculateTotal().toFixed(2)}
          </div>
          <Button onClick={form.handleSubmit(onSubmit)}>
            {action === "add" ? "Add" : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(SalesInput);
