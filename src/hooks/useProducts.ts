import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/api/ProductApi";
import { queryKeys } from "./queryKeys";
import { ProductData } from "@/types/types";

export function useProducts() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.products,
    queryFn: fetchProducts,
  });

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.products }),
    onError: (error) => {
      console.error("Failed to add product:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductData }) =>
      updateProduct(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.products }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.products }),
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    add: addMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
  };
}
