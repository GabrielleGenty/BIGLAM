const API_BASE_URL = "http://localhost:9000/api/v1";

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchProducts = () => fetchData('products');
export const fetchCategories = () => fetchData('categories');
export const fetchOrders = () => fetchData('orders');
