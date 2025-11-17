export async function getSuggestedTask() {
  const API_URL = "http://localhost:3001/api/suggest";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      let errorDetails = await response.text();
      try {
        const errorJson = JSON.parse(errorDetails);
        errorDetails = errorJson.error || errorDetails;
      } catch {
        throw Error(`Error connecting to the server(HTTP ${response.status}): ${errorDetails}`);
      }
    }

    const data = await response.json();

    if (data && data.suggestion) {
      return data.suggestion;
    } else {
      throw new Error("Incomplete or unexpected API response.");
    }

  } catch (error) {
    console.error("Error in getSuggestedTask:", error.message);
    throw error;
  }
}