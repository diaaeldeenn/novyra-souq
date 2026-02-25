const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getSpecificProduct(productId: string) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok || !data?.data) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
}
