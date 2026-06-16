import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "@/pages/Portfolio";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.title = "Kedar Chashtve — Growth Marketing Strategist";
  }, []);

  return (
    <div className="App min-h-screen bg-[#050816] text-[#F8FAFC] antialiased selection:bg-[#7C3AED]/30 selection:text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
