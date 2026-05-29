@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

@layer utilities {
  /* Dynamic gradient styling */
  .bg-gradient-mesh {
    background-color: #0c0a09;
    background-image: 
      radial-gradient(at 0% 0%, hsla(199,89%,48%,0.15) 0, transparent 50%),
      radial-gradient(at 50% 0%, hsla(187,92%,43%,0.15) 0, transparent 50%),
      radial-gradient(at 100% 0%, hsla(263,90%,70%,0.15) 0, transparent 50%);
  }

  /* Glassmorphism custom styling utilities */
  .glass-panel {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .glass-panel-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .glass-panel-hover:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    transform: translateY(-2px);
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .glass-input {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease-in-out;
  }

  .glass-input:focus {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(14, 165, 233, 0.5);
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.15);
  }
}
