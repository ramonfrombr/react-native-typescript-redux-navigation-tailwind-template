import {
  Image,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import {
  signOut,
  updateEmail,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  const tw = useTailwind();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };

  const [newEmail, setNewEmail] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const onUpdateProfile = () => {
    if (newEmail !== "" && newEmail !== auth.currentUser?.email) {
      updateEmail(auth.currentUser!, newEmail)
        .then()
        .catch((error) => {
          console.log("Error: ", error.message);
        })
        .finally(() => {
          setNewEmail("");
        });
    }

    if (newDisplayName) {
      updateProfile(auth.currentUser!, {
        displayName: newDisplayName,
      })
        .then()
        .catch((error) => {
          console.log("Error: ", error.message);
        })
        .finally(() => {
          setNewDisplayName("");
        });
    }

    if (newPhotoURL) {
      updateProfile(auth.currentUser!, {
        photoURL: newPhotoURL,
      })
        .then()
        .catch((error) => {
          console.log("Error: ", error.message);
        })
        .finally(() => {
          setNewPhotoURL("");
        });
    }

    if (newPassword && newPassword === confirmNewPassword) {
      updatePassword(auth.currentUser!, newPassword)
        .then(() => {
          setNewPassword("");
          setConfirmNewPassword("");
        })
        .catch((error) => {
          console.log("Error: ", error.message);
        });
    } else if (newPassword) {
      alert("The passwords must match.");
    }

    auth.currentUser?.reload();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        contentContainerStyle={tw("items-center bg-white justify-center ")}
        style={tw("flex flex-[1] p-2")}
      >
        <View
          style={tw(
            "border border-slate-300 p-2 bg-gray-200 w-full rounded mb-2"
          )}
        >
          <Image
            style={tw("w-12 h-12 rounded-full")}
            source={require("../assets/images/anonymous-user.png")}
          />
          <Text style={tw("font-bold text-xl")}>
            email: {auth.currentUser?.email}
          </Text>
          <Text style={tw("font-bold text-xl")}>
            displayName: {auth.currentUser?.displayName}
          </Text>
          <Text style={tw("font-bold text-xl")}>
            photoURL: {auth.currentUser?.photoURL}
          </Text>
        </View>

        <View
          style={tw("border  border-slate-300 p-2 bg-gray-300 w-full rounded")}
        >
          <Text>New Email</Text>
          <TextInput
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
            style={tw("bg-white p-1 rounded mb-2")}
          />
          <Text>New Display Name</Text>
          <TextInput
            value={newDisplayName}
            onChangeText={(text) => setNewDisplayName(text)}
            style={tw("bg-white p-1 rounded mb-2")}
          />

          <Text>New Photo URL</Text>
          <TextInput
            value={newPhotoURL}
            onChangeText={(text) => setNewPhotoURL(text)}
            style={tw("bg-white p-1 rounded mb-2")}
          />

          <Text>New Password</Text>
          <TextInput
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            style={tw("bg-white p-1 rounded mb-2")}
          />

          <Text>Confirm New Password</Text>
          <TextInput
            value={confirmNewPassword}
            onChangeText={(text) => setConfirmNewPassword(text)}
            style={tw("bg-white p-1 rounded mb-2")}
          />

          <TouchableOpacity
            onPress={onUpdateProfile}
            style={tw("p-1 bg-red-300 self-start bg-blue-500 rounded")}
          >
            <Text style={tw("font-bold text-white")}>Update Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={tw("mt-2 flex flex-row items-center")}>
          {auth.currentUser?.emailVerified ? (
            <>
              <FontAwesome
                style={tw("mr-1 text-green-600")}
                size={16}
                name="check-circle"
              />
              <Text style={tw("text-green-600 font-bold")}>
                Account Verified
              </Text>
            </>
          ) : (
            <>
              <FontAwesome
                style={tw("mr-1 text-red-600")}
                size={16}
                name="times-circle"
              />
              <Text style={tw("text-red-600 font-bold")}>
                Account Not Verified
              </Text>
            </>
          )}
        </View>

        <View
          style={tw("w-4/5 h-[1] my-8")}
          lightColor="#a0a0a0"
          darkColor="#2b2b2b"
        />

        <TouchableOpacity
          style={tw("bg-red-500 rounded p-4")}
          onPress={handleSignOut}
        >
          <Text style={tw("font-bold text-white")}>Logout</Text>
        </TouchableOpacity>

        <View style={tw("mb-32")}></View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
