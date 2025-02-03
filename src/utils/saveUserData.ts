import { fetchUser } from "@/api/UserApi";

export const saveUserData = async () => {
  const response = await fetchUser();
  const { email, fullName, image } = response.user;
  localStorage.setItem("email", email);
  localStorage.setItem("fullName", fullName);
  localStorage.setItem("imageUrl", image);
};
