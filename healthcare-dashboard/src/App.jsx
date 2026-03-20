import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PredictionForm from "./pages/PredictionForm";
import SidebarLayout from "./layouts/SidebarLayout";

export default function App() {
  return (
    <SidebarLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/predict" element={<PredictionForm />} />
      </Routes>
    </SidebarLayout>
  );
}