import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LibraryPage } from "./pages/LibraryPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SearchPage } from "./pages/SearchPage";
import { SignInPage } from "./pages/SignInPage";
import { SupportPage } from "./pages/SupportPage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { TourDetailPage } from "./pages/TourDetailPage";
import { RestaurantDetailPage } from "./pages/RestaurantDetailPage";
import { DestinationDetailPage } from "./pages/DestinationDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/my-tours"
        element={
          <LibraryPage
            description="Your booked and upcoming Expedition-Go experiences will appear here."
            title="My tours"
          />
        }
      />
      <Route
        path="/saved-tours"
        element={
          <LibraryPage
            description="Keep track of destinations and experiences you want to revisit later."
            title="Saved tours"
          />
        }
      />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/tour/:tourName" element={<TourDetailPage />} />
      <Route path="/restaurant/:restaurantSlug" element={<RestaurantDetailPage />} />
      <Route path="/destination/:destinationName" element={<DestinationDetailPage />} />
    </Routes>
  );
}
