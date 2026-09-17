import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import LoadingSpinner from "./components/ui/LoadingSpinner";

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPendingComponent: LoadingSpinner,
  defaultPendingMs: 200,
  defaultPendingMinMs: 300,
});
