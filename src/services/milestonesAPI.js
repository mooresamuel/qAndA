import { API_URL } from "../utils/constants";

export async function getMilestones() {
  try {
    const response = await fetch(`${API_URL}/get_homepage_data`);

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
