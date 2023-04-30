import axios from "axios";

export const fetchImages = async () => {
  const response = await axios.get("https://picsum.photos/v2/list?limit=10");
  return response.data;
};
