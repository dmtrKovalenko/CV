import * as React from "react";

interface ImageProps {
  src: string;
}

export const Image: React.FC<ImageProps> = ({
  src
}) => {
  return (
    <picture>
      <source
        srcSet={require(src + "?webp")}
        type="image/webp"
      />
      <source srcSet={require(src)} type="image/jpeg" />
      <img src={require(src)} />
    </picture>
  );
};
