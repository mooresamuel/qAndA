import { API_URL } from "../utils/constants";

export const wordHelperFetch = async (word) => {
  try {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: word,
      }),
    };

    const response = await fetch(`${API_URL}/word_helper`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
