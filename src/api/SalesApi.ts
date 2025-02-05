import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { SalesData } from "@/types/types";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function fetchSales(): Promise<SalesData[]> {
  try {
    const response = await axios.get(`${URL}/sales`, {
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
export async function addSale(values: SalesData) {
  const response = await axios.post(`${URL}/sale`, values, {
    withCredentials: true,
  });
  if (response.status === 201) {
    toast({
      title: "Data Saved",
      description: "Sales Data Saved in DataBase",
    });
  }
}
export async function fetchSalesById(salesId: number): Promise<SalesData> {
  try {
    const response = await axios.get(`${URL}/sale/${salesId}`, {
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

export async function updateSales(salesId: number, values: SalesData) {
  try {
    const { name, image, email, selectedProducts } = values;
    const response = await axios.patch(
      `${URL}/sale/${salesId}`,
      { name, image, email, selectedProducts },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      toast({
        title: "Data Updated",
        description: "Sales Data Updated Successfully",
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
export async function deleteSale(salesId: number) {
  try {
    const response = await axios.delete(`${URL}/sale/${salesId}`, {
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
