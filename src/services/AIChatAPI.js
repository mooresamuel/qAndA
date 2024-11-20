import { API_URL } from "../utils/constants";

export async function createChatContext() {
  try {
    const response = await fetch(`${API_URL}/new_chat`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchAIChatAnswer(prompt) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(prompt),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${API_URL}/chatbot`, options);

    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
