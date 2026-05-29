import { TravelQueryParams, Itinerary } from "../types";

/**
 * Fetches the personalized travel itinerary by making a secure request
 * to the server-side API route. This protects the Gemini API credentials.
 * 
 * @param params User travel options (destination, duration, budget, interests)
 * @returns Promise<Itinerary> The fully organized parsed itinerary
 */
export async function generateItinerary(params: TravelQueryParams): Promise<Itinerary> {
  const response = await fetch("/api/generate-itinerary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    let errorMsg = "Failed to communicate with AI planner.";
    try {
      const errData = await response.json();
      errorMsg = errData.error || errData.details || errorMsg;
    } catch {
      // Ignored if response is not JSON
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  return data as Itinerary;
}
