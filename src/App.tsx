import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowserExtension from "./pages/BrowserExtension";
import "./index.css";
import Pokemon from "./pages/Pokemon";

function App() {
  return (
    <div className="min-h-screen flex item-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browser-extension" element={<BrowserExtension />} />
          <Route path="/pokemon" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
