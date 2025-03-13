import noImage from "../assets/no-image-placeholder.webp";

/**
 * Amplify version of the image-url utility
 * Returns a cropped image URL or a placeholder if the URL is empty
 */
const getCroppedImageUrlAmplify = (url: string): string => {
  if (!url) return noImage;

  const target = "media/";
  const index = url.indexOf(target) + target.length;

  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrlAmplify;
