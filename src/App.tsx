import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FinancialManagement from "./pages/FinancialManagement";
import { ThemeProvider } from "./theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/financial" element={<FinancialManagement />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
