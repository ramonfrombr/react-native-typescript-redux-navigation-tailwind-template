import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useAppDispatch } from "../../store/hooks";
import { createPost } from "./postsSlice";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddPostForm = () => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const onCreateNewPostClicked = async () => {
    try {
      const postDate = new Date().toISOString();
      const docRef = await addDoc(collection(db, "posts"), {
        title: newPostTitle,
        content: newPostContent,
        userId: auth.currentUser?.uid!,
        date: postDate,
      });

      if (newPostTitle && newPostContent) {
        dispatch(
          createPost(
            docRef.id,
            newPostTitle,
            newPostContent,
            postDate,
            auth.currentUser?.uid!
          )
        );

        setNewPostTitle("");
        setNewPostContent("");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const canSave = Boolean(newPostTitle) && Boolean(newPostContent);

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
