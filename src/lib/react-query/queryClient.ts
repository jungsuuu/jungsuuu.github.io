import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 60 seconds - data stays fresh for this duration
      gcTime: 1000 * 60 * 5, // 5 minutes - garbage collect unused queries after this time
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});
