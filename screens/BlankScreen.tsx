import { useTailwind } from "tailwind-rn";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { Text, View } from "../components/Themed";

export default function BlankScreen() {
  const tw = useTailwind();

  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={tw("w-full")}>
      <Text>Blank Screen</Text>
    </View>
  );
}
