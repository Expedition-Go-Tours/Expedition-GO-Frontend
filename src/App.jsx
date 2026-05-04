import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import HomePage from "@/pages/HomePage";
import AllToursPage from "@/pages/AllToursPage";
import WishlistPage from "@/pages/WishlistPage";
import TourDetailPage from "@/pages/TourDetailPage";
import RegisterPage from "@/pages/RegisterPage";
import SignInPage from "@/pages/SignInPage";
import SignOutPage from "@/pages/SignOutPage";
import SupportPage from "@/pages/SupportPage";
import SettingsPage from "@/pages/SettingsPage";

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 1400,
              style: {
                background: "var(--brand-mist)",
                color: "var(--brand-green)",
                border: "1px solid rgba(9, 106, 79, 0.18)",
              },
            }}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tours" element={<AllToursPage />} />
            <Route path="/tour/:id" element={<TourDetailPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signout" element={<SignOutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </WishlistProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
