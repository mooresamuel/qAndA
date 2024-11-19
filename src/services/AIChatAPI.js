import { API_URL } from "../utils/constants";

export async function fetchAIChatAnswer(prompt) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(prompt),
    };

    const response = await fetch(`${API_URL}/helper_repeat_words`, options);

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
