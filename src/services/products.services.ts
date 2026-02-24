const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
}

export async function getSpecificProduct(productId: string) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
}
