export interface TripOverview {
  title: string;
  description: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
}

export interface EstimatedDailyBudget {
  accommodation: string;
  food: string;
  activities: string;
  transport: string;
  total: string;
}

export interface RecommendedFood {
  name: string;
  description: string;
}

export interface BestPlace {
  name: string;
  description: string;
}

export interface Itinerary {
  tripOverview: TripOverview;
  dayByDayPlan: DayPlan[];
  estimatedDailyBudget: EstimatedDailyBudget;
  recommendedFoods: RecommendedFood[];
  travelTips: string[];
  bestPlacesToVisit: BestPlace[];
}

export interface TravelQueryParams {
  destination: string;
  duration: number;
  budget: "Budget" | "Moderate" | "Luxury" | "";
  interests: string[];
}
