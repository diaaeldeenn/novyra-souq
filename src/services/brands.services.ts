const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getBrands() {
  try {
    const response = await fetch(`${API_URL}/brands`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { data: [] };
  }
}
