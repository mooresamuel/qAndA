import { API_URL } from "../utils/constants";

export async function getQuestionsAPI(moduleId, exerciseId) {

  try {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // credentials: "include"
    };
  
    const response = await fetch(`${API_URL}/get_questions?module_number=${moduleId}&exercise_number=${exerciseId}`, options);
  
    if (response.ok) {
      const questions = await response.json();
      return questions;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return [];
  }

}
