"use client";
import React, { useState, useCallback, memo } from "react";

// Memoized LikeButton
const LikeButton = memo(
  ({ isLiked, onLike }: { isLiked: boolean; onLike: () => void }) => {
    console.log("LikeButton rendered"); // Should appear only when props change

    return (
      <button
        onClick={onLike}
        style={{
          padding: "8px 12px",
          fontSize: "16px",
          background: isLiked ? "red" : "lightgray",
          color: isLiked ? "white" : "black",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isLiked ? "❤️ Liked" : "🤍 Like"}
      </button>
    );
  }
);

// Card component with its own like state
const Card = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "300px",
        margin: "10px auto",
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <LikeButton isLiked={isLiked} onLike={handleLike} />
    </div>
  );
};

// App component rendering multiple cards
export default function App() {
  const cards = [
    { id: 1, title: "Card 1", description: "Description for card 1" },
    { id: 2, title: "Card 2", description: "Description for card 2" },
    { id: 3, title: "Card 3", description: "Description for card 3" },
  ];

  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} title={card.title} description={card.description} />
      ))}
    </div>
  );
}
