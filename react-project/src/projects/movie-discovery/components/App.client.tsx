"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./Search";
import FavoritesGrid from "./FavoritesGrid";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="inner-container">
        {/* Search & Results */}
        <Search />

        {/* Persistent Favorites */}
        <FavoritesGrid />
      </div>
    </QueryClientProvider>
  );
}
