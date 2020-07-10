import React from "react";

const ImageContainer = ({ post }) => {
  return (
    <div
      className="image-post"
      style={{
        backgroundImage: `url(${
          post.url
        }), url(https://images8.alphacoders.com/904/904400.jpg)`
      }}
      title={post.title}
    />
  );
};

export default ImageContainer;
