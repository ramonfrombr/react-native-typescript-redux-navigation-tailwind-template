import { View, Text } from "react-native";
import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

interface TimeAgoProps {
  timestamp: string;
}

const TimeAgo = ({ timestamp }: TimeAgoProps) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return <Text>{timeAgo}</Text>;
};

export default TimeAgo;
