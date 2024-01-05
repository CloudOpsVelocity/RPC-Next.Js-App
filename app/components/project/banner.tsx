import React from "react";

export default function Banner() {
  return (
    <>
      <div className="bg-[#f0f9ff] px-8 py-12">
        <div className="max-w-[1920px] mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-2">
              PROJECT RATING FOR <span className="text-green-600">SARANG</span>
            </h2>
            <p className="text-lg text-[#003366] mb-4">
              Your headline should show readers how your review can help them
              solve a problem or make a decision, offer something different or
              unexpected, and be clear and specific about what your review is
              about
            </p>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#007ace] text-white font-semibold">
              ADD RATINGS
            </button>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/placeholder.svg"
              alt="Project Rating Illustration"
              className="h-[200px] w-[400px]"
              width={400}
              height={200}
              style={{ aspectRatio: "400 / 200", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
