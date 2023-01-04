import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import SelectDropdown from "react-native-select-dropdown";
import { createPost } from "./postsSlice";
import { FontAwesome } from "@expo/vector-icons";

const AddPostForm = () => {
  const tw = useTailwind();
  const users = useAppSelector((state) => state.users.users);

  const dispatch = useAppDispatch();

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostUserId, setNewPostUserId] = useState("");

  const onCreateNewPostClicked = () => {
    console.log("before dispatch");
    if (newPostTitle && newPostContent) {
      dispatch(createPost(newPostTitle, newPostContent, newPostUserId));

      setNewPostTitle("");
      setNewPostContent("");
    }
    console.log("after dispatch");
  };

  const canSave =
    Boolean(newPostTitle) && Boolean(newPostContent) && Boolean(newPostUserId);

  return (
    <View style={tw("border border-gray-400 p-3 bg-slate-200 m-2")}>
      <Text style={tw("font-bold")}>Post Title</Text>
      <TextInput
        style={tw("bg-white rounded my-1 p-1")}
        onChangeText={setNewPostTitle}
        value={newPostTitle}
      />

      <Text style={tw("font-bold")}>Post Content</Text>
      <TextInput
        style={[tw("bg-white rounded my-1 p-1"), { textAlignVertical: "top" }]}
        onChangeText={setNewPostContent}
        value={newPostContent}
        multiline
        numberOfLines={3}
      />

      <Text style={tw("font-bold")}>Post Author</Text>
      <SelectDropdown
        data={users}
        defaultButtonText={"Select an author"}
        buttonStyle={tw("w-full")}
        onSelect={(selectedItem, index) => {
          setNewPostUserId(selectedItem.id);
          console.log(selectedItem.name, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name;
        }}
        onChangeSearchInputText={(searchText) =>
          console.log("searchText >>> ", searchText)
        }
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#444"}
              size={18}
            />
          );
        }}
      />
      <View style={tw("mt-3")}>
        <Button
          disabled={!canSave}
          onPress={onCreateNewPostClicked}
          title="Create New Post"
        />
      </View>
    </View>
  );
};

export default AddPostForm;
