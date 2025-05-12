"use client";
import React, { useRef, useState } from 'react';

// Dummy data
const initialPosts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' },
  { id: 6, title: 'Post 6' },
];

// Card component
const Card = React.memo(function Card({ post, liked, version }) {
  console.log('Render:', post.title); // Only logs when this card updates
  return (
    <div className="card border p-4 mb-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
      <button
        data-id={post.id}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {liked ? 'Unlike' : 'Like'}
      </button>
    </div>
  );
});

function PostList() {
  // Like states stored in a ref — won't trigger re-renders
  const likeStates = useRef(new Map(initialPosts.map(p => [p.id, false])));

  // "Version" to force specific cards to re-render
  const [versions, setVersions] = useState(
    Object.fromEntries(initialPosts.map(p => [p.id, 0]))
  );

  const handleClick = (e) => {
    const id = Number(e.target.getAttribute('data-id'));
    if (!id) return;

    const current = likeStates.current.get(id);
    likeStates.current.set(id, !current);

    // Bump version only for that card
    setVersions(prev => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  return (
    <div
      onClick={handleClick}
      className="min-h-[100vh] p-8 pt-24 bg-gray-50"
    >
      {initialPosts.map(post => (
        <Card
          key={post.id}
          post={post}
          liked={likeStates.current.get(post.id)}
          version={versions[post.id]} // triggers re-render only for updated card
        />
      ))}
    </div>
  );
}

export default PostList;
