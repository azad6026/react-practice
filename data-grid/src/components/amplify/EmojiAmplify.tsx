import bullsEye from "../../assets/bulls-eye.webp";
import thumbsUp from "../../assets/thumbs-up.webp";
import meh from "../../assets/meh.webp";
import { Image } from "@chakra-ui/react";

interface Props {
  rating: number;
}

/**
 * Amplify version of Emoji component
 * This is a copy of the original component with minimal changes to avoid dependencies
 */
const EmojiAmplify = ({ rating }: Props) => {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: { src: string; alt: string } } = {
    3: { src: meh, alt: "meh" },
    4: { src: thumbsUp, alt: "recommended" },
    5: { src: bullsEye, alt: "exceptional" },
  };

  return <Image {...emojiMap[rating]} boxSize="25px" marginTop={1} />;
};

export default EmojiAmplify;
