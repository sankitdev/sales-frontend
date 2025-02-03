import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { SalesData } from "@/types/types";
import { addSale, deleteSale, fetchSales, updateSales } from "@/api/SalesApi";

export function useSales() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.sales,
    queryFn: fetchSales,
  });

  const addMutation = useMutation({
    mutationFn: addSale,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.sales }),
    onError: (error) => {
      console.error("Failed to add sales:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: SalesData }) =>
      updateSales(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.sales }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSale,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.sales }),
  });
  return {
    data: query.data,
    isLoading: query.isLoading,
    add: addMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
  };
}
