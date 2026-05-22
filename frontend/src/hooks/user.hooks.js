import { useQuery } from "@tanstack/react-query";
import { getUserProfileApi } from "../api/user.api";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"], // Unique caching key identifier array
    queryFn: getUserProfileApi, // The API execution promise function
    // staleTime: 5 * 60 * 1000,   // Caches data for 5 minutes before considering it stale
    retry: 1,                   // Retries failed network requests once before displaying an error
    refetchOnWindowFocus: false // Prevents automatic data re-fetching when clicking back onto the browser window
  });
};