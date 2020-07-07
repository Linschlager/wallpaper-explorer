import React from "react";

const ImageContainer = ({ post }) => {
  return (
    <div
      className="image-post"
      style={{ backgroundImage: `url(${post.url})` }}
      title={post.title}
    />
  );
};

export default ImageContainer;
