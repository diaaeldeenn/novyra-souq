"use server";
import authToken, { authUserId } from "@/lib/nextAuth/authToken";
import { AddressCheckoutTypeSchema } from "@/lib/schema/addressSchema";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;



export async function createCashOrder(cartId: string,formData: AddressCheckoutTypeSchema,) {
  const token = await authToken();
  const body = {
    shippingAddress: formData,
  };
  try {
    const response = await fetch(`${API_URL}/orders/${cartId}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function createOnlineOrder(cartId: string,formData: AddressCheckoutTypeSchema,) {
  const token = await authToken();
  const body = {
    shippingAddress: formData,
  };
  try {
    const response = await fetch(`${API_URL}/orders/checkout-session/${cartId}?url=https://novyra-souq.vercel.app/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}






export async function getUserOrders() {
  const userId = await authUserId();
  
  try {
    const response = await fetch(`${API_URL}/orders/user/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
