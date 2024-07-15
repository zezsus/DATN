/** @format */
import axios from "axios";
import { productRouter } from "../apis/api";

export const getAllProduct = async ({ queryKey }) => {
  try {
    const [_, params] = queryKey;
    const res = await axios.get(`${productRouter}/get-product`, {
      params: params,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTypeProcut = async () => {
  try {
    const res = await axios.get(`${productRouter}/get-type-product`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getBrandProcut = async () => {
  try {
    const res = await axios.get(`${productRouter}/get-brand-product`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
