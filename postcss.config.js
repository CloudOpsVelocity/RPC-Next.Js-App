module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: { removeAll: true }, // Removes all comments
          normalizeWhitespace: true, // Minifies whitespace
          mergeRules: true, // Merges duplicate rules
          convertValues: true, // Optimizes values (e.g., px → 0)
          reduceInitial: true, // Compress `initial` values
          svgo: true, // Optimizes SVGs (if any in CSS)
        },
      ],
    }),
  ],
};
