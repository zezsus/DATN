/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getAllOrderDetail,
  getDetailOrder,
} from "../services/order.service";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ newOrder, accessToken }) => {
      createOrder(newOrder, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useGetDetailOrder = (orderId) => {
  return useQuery({
    queryKey: ["detailOrder", orderId],
    queryFn: getDetailOrder,
  });
};

export const useGetAllDetailOrder = ({ userId, accessToken }) => {
  return useQuery({
    queryKey: ["detailAllOrder", { userId, accessToken }],
    queryFn: getAllOrderDetail,
  });
};

export const useGetAllOrder = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrder,
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, accessToken }) => {
      deleteOrder(orderId, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};
