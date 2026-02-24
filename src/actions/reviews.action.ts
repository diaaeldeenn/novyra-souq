"use server";
import authToken from "@/lib/nextAuth/authToken";
import { reviewsTypeSchema } from "@/lib/schema/reviewsSchema";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProductReviews(productId: string) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/reviews`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createReview(productId: string, formData: reviewsTypeSchema) {
  const token = await authToken();
  try {
    const response = await fetch(`${API_URL}/products/${productId}/reviews`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateReview(reviewId: string, formData: reviewsTypeSchema) {
  const token = await authToken();
  try {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteReview(reviewId: string) {
  const token = await authToken();

  const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Delete failed");

  return true;
}