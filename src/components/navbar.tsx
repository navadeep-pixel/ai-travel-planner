import { Compass, Globe, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Branding */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 via-cyan-500 to-violet-500 text-white shadow-lg">
            <Compass className="h-5 w-5 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold">
              AI
            </div>
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-white md:text-xl">
              Roam<span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
            </h1>
            <p className="hidden text-[10px] text-zinc-400 sm:block font-mono">
              Intelligent Concierge & Travel Planner
            </p>
          </div>
        </div>

        {/* Info badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/5 px-3 py-1 text-xs text-zinc-200">
            <Globe className="h-3.5 w-3.5 text-sky-400" />
            <span className="font-mono text-[11px]">Global Coverage</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-xs text-violet-300">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span className="font-mono text-[11px] font-medium">Gemini Pro-Powered</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
