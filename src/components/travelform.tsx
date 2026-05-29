import React, { useState } from "react";
import { 
  Building2, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Compass, 
  Utensils, 
  Trees, 
  Landmark, 
  ShoppingBag, 
  Palmtree, 
  Drama, 
  Moon, 
  PlaneTakeoff, 
  RotateCcw
} from "lucide-react";
import { TravelQueryParams } from "../types";

// Configure interest list with custom tailored icons and colors
const INTERESTS_OPTIONS = [
  { id: "Adventure", label: "Adventure", icon: Compass, color: "text-amber-400 border-amber-500/30" },
  { id: "Food", label: "Food", icon: Utensils, color: "text-emerald-400 border-emerald-500/30" },
  { id: "Nature", label: "Nature", icon: Trees, color: "text-green-400 border-green-500/30" },
  { id: "History", label: "History", icon: Landmark, color: "text-blue-400 border-blue-500/30" },
  { id: "Shopping", label: "Shopping", icon: ShoppingBag, color: "text-pink-400 border-pink-500/30" },
  { id: "Beaches", label: "Beaches", icon: Palmtree, color: "text-cyan-400 border-cyan-500/30" },
  { id: "Culture", label: "Culture", icon: Drama, color: "text-violet-400 border-violet-500/30" },
  { id: "Nightlife", label: "Nightlife", icon: Moon, color: "text-purple-400 border-purple-500/30" },
];

interface TravelFormProps {
  onSubmit: (params: TravelQueryParams) => void;
  isLoading: boolean;
  onReset: () => void;
}

export default function TravelForm({ onSubmit, isLoading, onReset }: TravelFormProps) {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState<number>(5);
  const [budget, setBudget] = useState<"Budget" | "Moderate" | "Luxury" | "">("Moderate");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Adventure", "Food"]);
  const [validationError, setValidationError] = useState("");

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!destination.trim()) {
      setValidationError("Destination is required. Please enter a city or country.");
      return;
    }

    if (!duration || duration <= 0) {
      setValidationError("Please enter a valid trip duration of at least 1 day.");
      return;
    }

    if (duration > 14) {
      setValidationError("To generate the most detailed day-by-day itineraries with premium quality, duration is limited to 14 days.");
      return;
    }

    if (!budget) {
      setValidationError("Please choose a budget criteria level.");
      return;
    }

    onSubmit({
      destination: destination.trim(),
      duration: Number(duration),
      budget,
      interests: selectedInterests,
    });
  };

  const handleResetForm = () => {
    setDestination("");
    setDuration(5);
    setBudget("Moderate");
    setSelectedInterests([]);
    setValidationError("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 md:p-8 flex flex-col gap-6" id="travel-planner-form">
      {/* Validation alert */}
      {validationError && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-xs text-rose-300 font-mono">
          {validationError}
        </div>
      )}

      {/* Field 1: Destination */}
      <div>
        <label htmlFor="destination" className="block text-sm font-semibold text-zinc-200 mb-2.5 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-sky-400" />
          Where do you want to go?
        </label>
        <div className="relative">
          <input
            id="destination"
            type="text"
            required
            placeholder="e.g. Paris, France or Kyoto, Japan"
            value={destination}
            disabled={isLoading}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full glass-input rounded-2xl px-4 py-3.5 pl-11 text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        </div>
      </div>

      {/* Grid: Duration + Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Field 2: Duration */}
        <div>
          <label htmlFor="duration" className="block text-sm font-semibold text-zinc-200 mb-2.5 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-cyan-400" />
            Duration (Days)
          </label>
          <div className="relative">
            <input
              id="duration"
              type="number"
              min="1"
              max="14"
              required
              value={duration}
              disabled={isLoading}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              className="w-full glass-input rounded-2xl px-4 py-3.5 pl-11 text-sm text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          </div>
          <span className="text-[11px] text-zinc-500 mt-1 block font-mono">Min: 1 day, Max: 14 days</span>
        </div>

        {/* Field 3: Budget */}
        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-zinc-200 mb-2.5 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-violet-400" />
            Trip Budget
          </label>
          <div className="relative">
            <select
              id="budget"
              required
              value={budget}
              disabled={isLoading}
              onChange={(e) => setBudget(e.target.value as any)}
              className="w-full glass-input rounded-2xl px-4 py-3.5 pl-11 text-sm text-white focus:outline-none appearance-none"
            >
              <option value="Budget" className="bg-zinc-900 text-white">💰 Budget (Local cafes, hostels, self-tours)</option>
              <option value="Moderate" className="bg-zinc-900 text-white">✨ Moderate (Standard dining, 3-star stays, top sights)</option>
              <option value="Luxury" className="bg-zinc-900 text-white">💎 Luxury (Fine dining, 5-star boutique stays, private guides)</option>
            </select>
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-zinc-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Field 4: Interests Multi-select */}
      <div>
        <span className="block text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
          <Compass className="h-4 w-4 text-sky-400" />
          Choose your Interests
        </span>
        
        {/* Responsive Flex Chips Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {INTERESTS_OPTIONS.map((interest) => {
            const Icon = interest.icon;
            const IsSelected = selectedInterests.includes(interest.id);
            return (
              <button
                key={interest.id}
                type="button"
                disabled={isLoading}
                onClick={() => handleInterestToggle(interest.id)}
                className={`relative flex items-center justify-start gap-2.5 rounded-2xl px-4 py-3 border text-xs font-medium cursor-pointer transition-all duration-300 group ${
                  IsSelected 
                    ? "bg-white/10 border-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.15)]" 
                    : "bg-white/0 border-white/5 text-zinc-400 hover:bg-white/5 hover:border-white/10 hover:text-zinc-200"
                }`}
                id={`interest-${interest.id.toLowerCase()}`}
              >
                <div className={`p-1.5 rounded-lg transition-colors duration-300 ${
                  IsSelected ? "bg-white/10" : "bg-white/5 text-zinc-500 group-hover:text-zinc-400"
                }`}>
                  <Icon className={`h-4 w-4 ${IsSelected ? interest.color : "text-zinc-400"}`} />
                </div>
                <span>{interest.label}</span>
                {IsSelected && (
                  <div className="absolute top-1 right-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-sky-400"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Interaction Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:flex-1 relative inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 hover:from-sky-400 hover:to-violet-500 text-white font-semibold py-3.5 px-6 shadow-[0_4px_20px_rgba(14,165,233,0.30)] hover:shadow-[0_4px_25px_rgba(14,165,233,0.45)] cursor-pointer select-none transition-all duration-300 active:scale-[0.98]"
          id="btn-generate-itinerary"
        >
          <PlaneTakeoff className="h-5 w-5" />
          <span>{isLoading ? "Generating with Gemini..." : "Generate Custom Itinerary"}</span>
        </button>

        <button
          type="button"
          onClick={handleResetForm}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-zinc-300 hover:text-white transition-all font-medium py-3.5 px-5 cursor-pointer"
          id="btn-reset-form"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="sm:hidden lg:inline">Reset Preferences</span>
        </button>
      </div>
    </form>
  );
}
