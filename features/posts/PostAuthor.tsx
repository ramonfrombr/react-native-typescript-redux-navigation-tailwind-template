import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "../../store/hooks";

interface PostAuthorProps {
  userId: string;
}

const PostAuthor = ({ userId }: PostAuthorProps) => {
  const users = useAppSelector((state) => state.users.users);
  const author = users.find((user) => user.id === userId);
  return <Text>by {author ? author.name : "Unknown author"}</Text>;
};

export default PostAuthor;
