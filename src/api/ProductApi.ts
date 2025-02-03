import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ProductData } from "@/types/types";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function fetchProducts(): Promise<ProductData[]> {
  try {
    const response = await axios.get(`${URL}/products`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error", error);
    toast({
      title: "Error",
      description: "Error fetching Data",
    });
    return [];
  }
}

export async function fetchProductById(
  productId: number
): Promise<ProductData> {
  try {
    const response = await axios.get(`${URL}/product/${productId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error", error);
    toast({
      title: "Error",
      description: "Error fetching Data",
    });
    throw error;
  }
}

export async function updateProduct(productId: number, values: ProductData) {
  try {
    const { name, image, quantity, price, description } = values;
    const response = await axios.patch(
      `${URL}/products/${productId}`,
      { name, image, quantity, price, description },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      toast({
        title: "Data Updated",
        description: "Prduct Data Updated Successfully",
      });
    }
  } catch (error) {
    console.error("Error Updating", error);
    toast({
      title: "Error",
      description: "Error Updating",
      variant: "destructive",
    });
  }
}
export async function deleteProduct(productId: number) {
  try {
    const response = await axios.delete(`${URL}/products/${productId}`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      toast({
        title: "Data Deleted",
        description: " Data Deleted Successfully",
      });
    }
  } catch (error) {
    console.error("Error Deleting", error);
    toast({
      title: "Error",
      description: "Error Deleting ",
      variant: "destructive",
    });
  }
}

export async function addProduct(values: ProductData) {
  const response = await axios.post(`${URL}/products`, values, {
    withCredentials: true,
  });
  if (response.status === 201) {
    toast({
      title: "Data Saved",
      description: "Product Data Saved in DataBase",
    });
  }
}
