import React from "react";
import { useTailwind } from "tailwind-rn";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { reactionAdded } from "./postsSlice";
import { PostState } from "./postsSlice";

const reactionEmoji = {
  like: "👍",
  love: "❤️",
};

interface ReactionButtonsProps {
  post: PostState;
}

const ReactionButtons = ({ post }: ReactionButtonsProps) => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <TouchableOpacity
        key={name}
        style={tw("rounded bg-slate-400 p-1 mr-1")}
        onPress={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        <Text style={tw("text-white")}>
          {emoji} {post.reactions[name as keyof typeof post.reactions]}
        </Text>
      </TouchableOpacity>
    );
  });
  return <View style={tw("flex flex-row")}>{reactionButtons}</View>;
};

export default ReactionButtons;
