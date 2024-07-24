/** @format */

import axios from "axios";
import { orderRouter } from "../apis/api";

export const createOrder = async (newOrder, accessToken) => {
  const res = await axios.post(`${orderRouter}/create`, newOrder, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const getDetailOrder = async (orderId) => {
  const res = await axios.get(`${orderRouter}/get-order-detail/${orderId}`);
  return res.data;
};

export const getAllOrderDetail = async (userId, accessToken) => {
  const res = await axios.get(`${orderRouter}/get-all-order-detail/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const getAllOrder = async () => {
  const res = await axios.get(`${orderRouter}/get-order`);
  return res.data;
};

export const deleteOrder = async (orderId, accessToken) => {
  const res = await axios.delete(`${orderRouter}/cancel-order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
