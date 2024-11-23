import { API_URL } from "../utils/constants";

export async function createChatContext() {
  try {
    const response = await fetch(`${API_URL}/new_chat`);

    const data = await response.json();

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

export async function fetchAIEndExerciseAnswers(prompt) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(prompt),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${API_URL}/evaluate`, options);

    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchAIEndQuestion(body) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(options);

    const response = await fetch(`${API_URL}/final`, options);

    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
