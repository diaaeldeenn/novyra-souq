"use server";
import authToken from "@/lib/nextAuth/authToken";


const API_URL = process.env.NEXT_PUBLIC_BASE_URL;



export async function getUserWishlist() {
  const token = await authToken();
  try {
    const response = await fetch(`${API_URL}/wishlist`, {
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}






export async function addToWhishList(productId: string) {
  const token = await authToken();
  if (!token) {
    throw new Error("You Must Be Logged In To Do This Action");
  }
  try {
    const response = await fetch(`${API_URL}/wishlist`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function removeFromWhishList(productId: string) {
  const token = await authToken();
  if (!token) {
    throw new Error("You Must Be Logged In To Do This Action");
  }
  try {
    const response = await fetch(`${API_URL}/wishlist/${productId}`, {
      method: "DELETE",
      body: JSON.stringify({ productId }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}