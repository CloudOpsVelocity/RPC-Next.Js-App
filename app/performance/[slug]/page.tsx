import React from "react";

export default function page({ params }: any) {
  return <div></div>;
}
export async function generateStaticParams() {
  const adjectives = ["happy", "colorful", "giant", "playful", "sunny", "cozy"];
  const nouns = ["unicorn", "penguin", "robot", "dragon", "rocket", "pizza"];

  const generateRandomSlug = () => {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 10000);

    return `${adjective}-${noun}-${number}`;
  };

  const generateSlugs = (count: number) => {
    const slugs = [];
    for (let i = 0; i < count; i++) {
      slugs.push(generateRandomSlug());
    }
    return slugs;
  };
  const slugs = generateSlugs(10);

  return slugs.map((slug) => ({
    slug,
  }));
}
export const revalidate = 30;
