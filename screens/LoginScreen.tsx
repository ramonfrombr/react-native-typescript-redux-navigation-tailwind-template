import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";

import { APP_ENV_FIREBASE_API_KEY } from "@env";
import config from "../config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
  const tw = useTailwind();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Root");
      }
    });

    return unsubscribed;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("user >>> ", user);
        console.log("user.email >>> ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with >>> ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior="height"
        style={tw("flex-[1] justify-center items-center")}
      >
        <View style={tw("w-4/5")}>
          <TextInput
            placeholder="Email"
            style={tw("bg-white px-4 py-3 rounded mt-1")}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            placeholder="Password"
            style={tw("bg-white px-4 py-3 rounded mt-1")}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        <View style={tw("w-3/5 justify-center items-center mt-10")}>
          <TouchableOpacity
            onPress={handleLogin}
            style={tw("bg-blue-600 w-full p-4 rounded-xl items-center")}
          >
            <Text style={tw("text-white font-bold text-base")}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignUp}
            style={tw(
              "bg-white mt-1 border-blue-400 border-2 w-full p-4 rounded-xl items-center"
            )}
          >
            <Text style={tw("text-blue-600 font-bold text-base")}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
