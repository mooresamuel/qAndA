import { API_URL } from "../utils/constants";

export async function wordScoresAPI(body) {
  try {
    const response = await fetch(`${API_URL}/get_sentence`, {
      method: "POST",
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
