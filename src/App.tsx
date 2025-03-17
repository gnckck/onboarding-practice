import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home";
import BrowserExtension from "./pages/BrowserExtension";
import "./index.css";
import PokemonPage from "./pages/PokemonPage";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex item-center justify-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browser-extension" element={<BrowserExtension />} />
            <Route path="/pokemon" element={<PokemonPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      {/* 개발 환경에서만 DevTools 표시 */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
