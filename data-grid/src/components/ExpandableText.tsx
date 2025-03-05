import { Button, Text } from "@chakra-ui/react";
import React from "react";

interface ExpandableTextProps {
  children: string;
  maxChars: number;
}

const ExpandableText = ({ children, maxChars }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  if (!children) {
    return null;
  }
  if (children.length <= maxChars) {
    return <Text>{children}</Text>;
  }
  const summary = isExpanded
    ? children
    : children.substring(0, maxChars) + "...";
  return (
    <Text>
      {summary}
      <Button
        size="xs"
        fontWeight="bold"
        colorScheme="yellow"
        margin={2}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
