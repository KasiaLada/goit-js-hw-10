
import axios from 'axios';

const API_KEY = "live_eKJE5wTLcXqUkxgAhvAuZ6vMhL2U3lJFPgsbeq4UJQjZrPx6eQ6D3cQz1IOPA5v5";
axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.baseURL = "https://api.thecatapi.com/v1";

export const fetchBreeds = async () => {
  try {
    const response = await axios.get("/breeds");
    return response.data;
  } catch (error) {
    console.error("Error fetching breeds: ", error);
    throw error;
  }
};

export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`/images/search?breed_ids=${breedId}`);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching cat by breed: ", error);
    throw error;
  }
};
