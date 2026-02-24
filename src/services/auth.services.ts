import {
  loginTypeSchema,
  registerTypeSchema,
  resetPasswordTypeSchema,
  resetTypeSchema,
} from "@/lib/schema/authSchema";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function register(formData: registerTypeSchema) {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function login(formData: loginTypeSchema) {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


export async function resetPassword(formData: resetTypeSchema) {
  try {
    const response = await fetch(`${API_URL}/auth/forgotPasswords`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}





export async function verifyResetCode(resetCode: string) {
  try {
    const response = await fetch(`${API_URL}/auth/verifyResetCode`, {
      method: "POST",
      body: JSON.stringify({ resetCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}






export async function enterResetPassword(formData: resetPasswordTypeSchema) {
  try {
    const response = await fetch(`${API_URL}/auth/resetPassword`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
