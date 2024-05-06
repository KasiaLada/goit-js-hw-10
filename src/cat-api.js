


import axios from "axios";

export const fetchBreeds = async () => {
  try {
    const response = await axios.get("/breeds");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`/images/search?breed_ids=${breedId}`);
    return response.data[0];
  } catch (error) {
    throw error;
  }
};
