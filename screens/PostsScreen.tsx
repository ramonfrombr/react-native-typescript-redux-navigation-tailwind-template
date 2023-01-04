import { useTailwind } from "tailwind-rn";

import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import PostsList from "../features/posts/PostsList";
import AddPostForm from "../features/posts/AddPostForm";

interface ScrollViewProps {
  children?: JSX.Element | JSX.Element[];
}

function TypedScrollView({ children }: ScrollViewProps) {
  return <ScrollView>{children}</ScrollView>;
}

export default function PostsScreen() {
  const tw = useTailwind();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <TypedScrollView>
        <Text style={tw("text-xl mx-2 mb-3")}>New Post</Text>
        <AddPostForm />

        <Text style={tw("text-xl mx-2 mb-3")}>Posts</Text>
        <PostsList />
      </TypedScrollView>
    </TouchableWithoutFeedback>
  );
}
