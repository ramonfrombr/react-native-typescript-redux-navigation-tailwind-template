import { useTailwind } from "tailwind-rn";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { Keyboard, TouchableOpacity } from "react-native";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../features/counter/counterSlice";

import { Text, View } from "../components/Themed";
import { TextInput, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";

export default function CounterScreen() {
  const tw = useTailwind();

  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [counterInput, setCounterInput] = useState<number>(0);

  const onInputChanged = (text: string) => {
    setCounterInput(Number(text.replace(/[^0-9]/g, "")));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw("flex-1 items-center justify-center")}>
        <Text style={tw("font-bold text-xl")}>Tab Counter</Text>
        <View style={tw("my-3 text-xl")}>
          <Text style={tw("my-3 text-xl")}>Count: {count}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => dispatch(increment())}
            style={tw("bg-green-300 p-2 flex items-center justify-center my-3")}
          >
            <Text>Increment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(decrement())}
            style={tw("bg-red-300 p-2 flex items-center justify-center my-3")}
          >
            <Text>Decrement</Text>
          </TouchableOpacity>
          <View
            style={tw(
              "bg-blue-300 p-2 flex flex-row items-center justify-center my-3"
            )}
          >
            <Text>Increse by:</Text>
            <TextInput
              style={tw("bg-white w-10 mx-1")}
              onChangeText={onInputChanged}
              value={String(counterInput)}
            />
            <TouchableOpacity
              onPress={() => dispatch(incrementByAmount(counterInput))}
              style={tw("bg-white p-1 rounded")}
            >
              <Text>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={tw("h-[1] w-4/5 my-8")}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
