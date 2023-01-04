import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { store } from "./store";
import { Provider } from "react-redux";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // @ts-ignore - Tailwind Provider is missing type definition
      <TailwindProvider utilities={utilities}>
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </Provider>
      </TailwindProvider>
    );
  }
}
