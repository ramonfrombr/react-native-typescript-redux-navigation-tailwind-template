import { useTailwind } from "tailwind-rn";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  const tw = useTailwind();
  return (
    <View style={tw("flex-1 items-center justify-center")}>
      <Text style={tw("font-bold text-xl")}>Tab Two</Text>
      <View
        style={tw("h-[1] w-4/5 my-8")}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}
