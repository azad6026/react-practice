import { APIresponse } from "../types/movie";

const endpoint =
  "https://0pvcrm0hc4.execute-api.ap-southeast-2.amazonaws.com/staging";
const fetchMovies = async (): Promise<APIresponse> => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data;
    console.log(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
export default fetchMovies;
