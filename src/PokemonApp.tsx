
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StackNavigator } from "./presentation/navigator/StackNavigator";
import { ThemeContextProvider } from "./presentation/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const PokedexApp = () => {

  /*
  
    return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <ThemeContextProvider>
            <StackNavigator />
          </ThemeContextProvider>
        </QueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
  
  
  */

  return (

    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>

  )
}