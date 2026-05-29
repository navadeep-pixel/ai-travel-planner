import { useEffect, useState } from "react";
import { Compass, Sparkles } from "lucide-react";

const LOADER_PHASES = [
  "Analyzing destination highlights...",
  "Sourcing authentic culinary suggestions...",
  "Formatting day-by-day morning itinerary...",
  "Structuring custom afternoon sights...",
  "Plotting perfect evening viewpoints and dining...",
  "Ensuring budget fits recommendations...",
  "Polishing final itinerary details...",
];

export default function Loader() {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % LOADER_PHASES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 md:py-24">
      {/* Dynamic Animated Spinner */}
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500 via-cyan-400 to-violet-500 opacity-20 blur-xl animate-pulse"></div>
        {/* Border rotation outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-cyan-400 border-r-sky-500 animate-[spin_1.5s_linear_infinite]"></div>
        {/* Secondary inner ring counter-rotation */}
        <div className="absolute inset-2 rounded-full border-2 border-white/5 border-b-violet-500 border-l-cyan-400 opacity-80 animate-[spin_3s_linear_infinite_reverse]"></div>
        {/* Core Compass */}
        <Compass className="h-8 w-8 text-cyan-400 animate-[spin_8s_ease-in-out_infinite]" />
      </div>

      <div className="text-center max-w-sm">
        <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-400 animate-pulse" />
          Creating your personalized itinerary...
        </h3>
        <p className="text-sm text-zinc-400 font-mono min-h-[20px] transition-all duration-300">
          {LOADER_PHASES[phaseIndex]}
        </p>
      </div>
    </div>
  );
}
