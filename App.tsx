import { NavigationContainer } from "@react-navigation/native";

import { StartupStackNavigator } from "./navigation/Stacks/StartupStack";

import { enableScreens } from "react-native-screens";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "react-native-gesture-handler";

enableScreens();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StartupStackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
