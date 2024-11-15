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
  
    const response = await fetch(`${API_URL}/get_questions?module_id=${moduleId}&exercise_id=${exerciseId}`, options);
  
    if (response.ok) {
      const questions = await response.json();
      return questions;
    }
  } catch (error) {
    console.log("Fetch messed up");
    console.error("Request failed:", error);
  }

}
