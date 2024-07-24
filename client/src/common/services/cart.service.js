/** @format */

import axios from "axios";
import { cartRouter } from "../apis/api";

export const createCart = async (data, accessToken) => {
  const res = await axios.post(`${cartRouter}/create`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const getCart = async (userId) => {
  const res = await axios.get(`${cartRouter}/get-cart/${userId}`);
  return res.data.data;
};

export const deleteCart = async (cartId, accessToken) => {
  const res = await axios.delete(`${cartRouter}/delete/${cartId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};
