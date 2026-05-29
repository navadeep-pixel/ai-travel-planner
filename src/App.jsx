/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 font-sans tracking-tight text-white selection:bg-sky-500/30 selection:text-white antialiased">
      <Navbar />
      <Home />
    </div>
  );
}

