import { TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useNavigation } from "@react-navigation/core";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const tw = useTailwind();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };
  return (
    <View style={tw("items-center justify-center flex-[1]")}>
      <Text style={tw("font-bold text-xl")}>{auth.currentUser?.email}</Text>
      <View
        style={tw("w-4/5 h-[1] my-8")}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <TouchableOpacity
        style={tw("bg-red-500 rounded p-4")}
        onPress={handleSignOut}
      >
        <Text style={tw("font-bold text-white")}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
