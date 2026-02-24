const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Get all products error:", error);
    return { data: [] };
  }
}

export async function getSpecificProduct(productId: string) {
  try {
    console.log("Fetching product from:", `${API_URL}/products/${productId}`);
    const response = await fetch(`${API_URL}/products/${productId}`, {
      cache: "no-store",
    });

    const data = await response.json();
    console.log("Product response:", data);

    if (!response.ok || !data?.data) {
      console.log("Response not ok or no data:", response.status, data);
      return null;
    }

    return data;
  } catch (error) {
    console.log("Product fetch error:", error);
    return null;
  }
}
