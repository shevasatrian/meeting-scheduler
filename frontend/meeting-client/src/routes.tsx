import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingPage from "./pages/Booking/BookingPage";
import BookingsPage from "./pages/Dashboard/DashboardPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import SidebarLayout from "./components/Layout/SidebarLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<BookingPage />} />
          <Route path="/dashboard" element={<BookingsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </SidebarLayout>
    </BrowserRouter>
  );
}