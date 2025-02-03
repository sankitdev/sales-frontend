import { toast } from "@/hooks/use-toast";
import { FormValues } from "@/types/types";
import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function signUsers(values: FormValues) {
  try {
    const response = await axios.post(`${URL}/signup`, values);
    if (response.status === 201) {
      toast({
        title: `Account created!`,
        description: response.data.message,
      });
    }
  } catch (error) {
    console.error("Error creating account", error);
    toast({
      title: "Error",
      description: "Failed to create account. Please try again",
      variant: "destructive",
    });
  }
}
export const loginUser = async (user: FormValues) => {
  try {
    const response = await axios.post(`${URL}/login`, user, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const fetchUser = async () => {
  try {
    const response = await axios.get(`${URL}/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching account", error);
    toast({
      title: "Error",
      description: "Failed to fetch Users. Please try again",
      variant: "destructive",
    });
  }
};
export const updateUser = async (userData: FormValues) => {
  try {
    const response = await axios.post(`${URL}/user`, userData, {
      withCredentials: true,
    });
    if (response.status === 201) {
      toast({
        title: `Profile Updated!`,
        description: response.data.message,
      });
    }
    return response;
  } catch (error) {
    console.error("Error updating Users", error);
    toast({
      title: "Error",
      description: "Failed to update account. Please try again",
      variant: "destructive",
    });
  }
};
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${URL}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      toast({
        title: `Logout Successfull!`,
        description: response.data.message,
      });
    }
  } catch (error) {
    console.error("Error", error);
    toast({
      title: "Error",
      description: "Failed to logout. Please try again",
      variant: "destructive",
    });
  }
};
