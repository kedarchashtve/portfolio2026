import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "@/pages/Portfolio";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.title = "Kedar Chashtve | KedarFlix — The Series";
  }, []);

  return (
    <div className="App min-h-screen bg-[#07070a] text-[#F5F3EF] antialiased">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
