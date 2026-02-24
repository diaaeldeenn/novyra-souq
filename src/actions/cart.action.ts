"use server";
import authToken from "@/lib/nextAuth/authToken";


const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function addToCart(productId: string) {
  const token = await authToken();

  if (!token) {
    throw new Error("You Must Be Logged In To Do This Action");
  }
  try {
    const response = await fetch(`${API_URL}/cart`, {
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

export async function getUserCart() {
  const token = await authToken();
  try {
    const response = await fetch(`${API_URL}/cart`, {
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

export async function deleteUserItem(prodId: string) {
  const token = await authToken();
  try {
    const response = await fetch(`${API_URL}/cart/${prodId}`, {
      method: "DELETE",
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

export async function clearUserItem() {
  const token = await authToken();
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: "DELETE",
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

export async function updateUserItem(prodId: string, newCount: number) {
  const token = await authToken();
  try {
    const response = await fetch(`${API_URL}/cart/${prodId}`, {
      method: "PUT",
      body: JSON.stringify({ count: newCount }),
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

