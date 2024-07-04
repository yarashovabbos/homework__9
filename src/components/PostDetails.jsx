import React from 'react';

const PostDetails = ({ post }) => {
  if (!post) return <div>Select a post to see the details.</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetails;
