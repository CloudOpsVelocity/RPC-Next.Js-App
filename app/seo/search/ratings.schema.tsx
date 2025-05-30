// import { Review, WithContext } from "schema-dts";

// const generateReviewJsonLd = (data: any) => {
//   const jsonLd: WithContext<Review> = {
//     "@context": "https://schema.org",
//     "@type": "Review",
//     reviewRating: {
//       "@type": "Rating",
//       bestRating: "5",
//       worstRating: "1",
//       ratingValue: 5,
//     },
//     author: {
//       "@type": "Person",
//       name: data.builderName,
//     },
//     reviewBody: ``,
//     itemReviewed: {
//       "@type": "Product",
//       name: "",
//     },
//     datePublished: "",
//   };

//   return jsonLd;
// };

const generateReviewJson = (data: any) => {
    const { avgRating, userRating, userName, totalRating, countTotalReview } = data;

    const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        // "@type": "Product",
        // name: cardTitle,
        // description,

        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: userRating,
            bestRating: totalRating,
          },
          author: {
            "@type": "Person",
            name: userName,
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: avgRating,
          reviewCount: countTotalReview,
          bestRating: totalRating,
          worstRating: "1",
        },
      },
    ],
  };

  return schemas;
}

const ReviewJsonScript = ({ data }: any) => {
  const jsonLd = generateReviewJson(data);
  return (
    <script
        id="reviewScript1"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ReviewJsonScript;
