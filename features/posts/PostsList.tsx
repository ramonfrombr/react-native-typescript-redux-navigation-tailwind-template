import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { useAppSelector } from "../../store/hooks";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
  const tw = useTailwind();
  const colorScheme = useColorScheme();

  // The `state` arg is correctly typed as `RootState` already
  const posts = useAppSelector((state) => state.posts.posts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <View
      key={post.id}
      style={tw("bg-slate-200 rounded p-2 mb-2 border border-gray-400 mx-2")}
    >
      <Text style={tw("font-bold text-lg mb-1")}>{post.title}</Text>

      <View style={tw("flex flex-row items-center")}>
        <PostAuthor userId={post.userId} />
        <FontAwesome
          name="clock-o"
          size={15}
          style={tw("ml-2 mr-1")}
          color={Colors[colorScheme].text}
        />
        <TimeAgo timestamp={post.date} />
      </View>

      <Text>
        {post.content.substring(0, 100)}
        {post.content.length > 100 && "..."}
      </Text>

      <View style={tw("flex flex-row justify-end mt-3")}>
        <ReactionButtons post={post} />
      </View>
    </View>
  ));

  return <>{renderedPosts}</>;
};

export default PostsList;
