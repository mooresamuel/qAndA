import { API_URL } from "../utils/constants";

export async function textToSpeechAPI(message) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
    }),
  };

  const response = await fetch(`${API_URL}/speak_text`, options);

  const data = await response.json();

  return data.audio;
}
