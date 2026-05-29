import { useState, useEffect } from "react";
import { Compass, Sparkles, MapPin, AlertCircle, Plane } from "lucide-react";
import TravelForm from "../components/TravelForm";
import ItineraryCard from "../components/ItineraryCard";
import Loader from "../components/Loader";
import { generateItinerary } from "../services/gemini";
import { Itinerary, TravelQueryParams } from "../types";

export default function Home() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Load last saved itinerary from localStorage on init for a smoother UX
  useEffect(() => {
    try {
      const saved = localStorage.getItem("roamai_last_itinerary");
      if (saved) {
        setItinerary(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not retrieve saved travel plan from offline cache:", e);
    }
  }, []);

  const handleFormSubmit = async (params: TravelQueryParams) => {
    setLoading(true);
    setErrorMsg("");
    setItinerary(null);

    try {
      const result = await generateItinerary(params);
      setItinerary(result);
      
      // Save offline context
      localStorage.setItem("roamai_last_itinerary", JSON.stringify(result));
    } catch (err: any) {
      console.error("Generator error caught:", err);
      setErrorMsg(err.message || "An unexpected error occurred while communicating with the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearItinerary = () => {
    setItinerary(null);
    setErrorMsg("");
    localStorage.removeItem("roamai_last_itinerary");
  };

  return (
    <main className="w-full min-h-[calc(100vh-65px)] bg-gradient-mesh pb-20 pt-10 px-4 md:px-8 relative overflow-hidden" id="main-content">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-sky-500/5 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl -z-10 animate-pulse [animation-delay:2s]"></div>

      <div className="mx-auto max-w-7xl flex flex-col gap-12">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center animate-fade-in" id="hero-banner">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs text-sky-400 font-mono mb-6 shadow-sm">
            <Plane className="h-3.5 w-3.5 animate-[bounce_2s_infinite]" />
            <span>AI-Driven Trip Crafting</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-5.5xl font-extrabold text-white tracking-tight leading-none">
            AI Travel <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Itinerary Planner</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl font-sans font-normal leading-relaxed">
            Generate personalized travel plans in seconds using AI. Select details customized with your budget, duration, and local interests.
          </p>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="w-full flex flex-col gap-8">
          
          {/* If there is no itinerary generated yet AND we aren't loading, show the Form */}
          {!itinerary && !loading && (
            <div className="max-w-4xl mx-auto w-full transition-all duration-300">
              <TravelForm 
                onSubmit={handleFormSubmit} 
                isLoading={loading} 
                onReset={handleClearItinerary}
              />
            </div>
          )}

          {/* Loader status */}
          {loading && (
            <div className="glass-card rounded-3xl p-6 md:p-8 max-w-3xl mx-auto w-full border border-white/5 shadow-xl">
              <Loader />
            </div>
          )}

          {/* Error reporting board */}
          {errorMsg && !loading && (
            <div className="max-w-2xl mx-auto w-full rounded-2xl bg-rose-500/10 border border-rose-500/20 p-6 flex items-start gap-4 shadow-lg animate-shake">
              <div className="p-2 bg-rose-500/15 rounded-xl text-rose-400 shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-white mb-1">Could Not Build Travel Plan</h4>
                <p className="text-sm text-rose-200/80 leading-relaxed font-mono">
                  {errorMsg}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setErrorMsg("")}
                    className="inline-flex items-center text-xs font-semibold text-rose-300 hover:text-white underline cursor-pointer"
                  >
                    Dismiss error
                  </button>
                  <span className="text-zinc-600">|</span>
                  <button 
                    onClick={handleClearItinerary}
                    className="inline-flex items-center text-xs font-semibold text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
                  >
                    Clear forms
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Final Itinerary display results */}
          {itinerary && !loading && (
            <div className="w-full">
              <ItineraryCard 
                data={itinerary} 
                onReset={handleClearItinerary} 
              />
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
