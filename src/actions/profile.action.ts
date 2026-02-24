"use server";
import authToken from "@/lib/nextAuth/authToken";
import { addressTypeSchema } from "@/lib/schema/addressSchema";
import { updateProfilePasswordTypeSchema, updateProfileTypeSchema } from "@/lib/schema/authSchema";


const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function updateProfile(formData: updateProfileTypeSchema) {
  const token = await authToken();

  if (!token) {
    throw new Error("You Must Be Logged In To Do This Action");
  }
  try {
    const response = await fetch(`${API_URL}/users/updateMe/`, {
      method: "PUT",
      body: JSON.stringify( formData ),
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



export async function updateProfilePassword(formData: updateProfilePasswordTypeSchema) {
  const token = await authToken();
  if (!token) {
    throw new Error("You Must Be Logged In To Do This Action");
  }
  try {
    const response = await fetch(`${API_URL}/users/changeMyPassword/`, {
      method: "PUT",
      body: JSON.stringify( formData ),
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



export async function addAddress(formData: addressTypeSchema) {
  const token = await authToken();
  if (!token) {
    throw new Error("You Must Be Logged In To Do This Action");
  }
  try {
    const response = await fetch(`${API_URL}/addresses/`, {
      method: "POST",
      body: JSON.stringify( formData ),
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


export async function getAddress() {
  const token = await authToken();
  if (!token) {
    throw new Error("You Must Be Logged In To Do This Action");
  }
  try {
    const response = await fetch(`${API_URL}/addresses/`, {
      method: "GET",
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


export async function removeAddress(addressId:String) {
  const token = await authToken();
  if (!token) {
    throw new Error("You Must Be Logged In To Do This Action");
  }
  try {
    const response = await fetch(`${API_URL}/addresses/${addressId}`, {
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