const fs = require("fs");

// Define parameters
const propertyTypes = [
  "Apartment",
  "Row House",
  "Villa",
  "Villament",
  "Plot",
  "Independent House",
];

const localities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Surat",
  "Jaipur",
];

const transactions = ["buy", "sell"];

const bhkTypes = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];

// Function to create slug
function createSlug(
  transaction: string,
  bhk: string,
  property: string,
  locality: string
) {
  return `${transaction}-${bhk.toLowerCase().replace(/\s+/g, "")}-${property
    .toLowerCase()
    .replace(/\s+/g, "-")}-in-${locality.toLowerCase()}`;
}

// Function to generate permutations and save to JSON file
function generatePermutations(
  fileName = "permutations.json",
  targetCount = 5000
) {
  // Generate permutations
  let permutations = [];
  for (let property of propertyTypes) {
    for (let locality of localities) {
      for (let transaction of transactions) {
        for (let bhk of bhkTypes) {
          permutations.push({
            type: property,
            locality: locality,
            transaction: transaction,
            bhk: bhk,
            slug: createSlug(transaction, bhk, property, locality),
          });
        }
      }
    }
  }

  // Ensure at least targetCount unique combinations by repeating and shuffling
  while (permutations.length < targetCount) {
    permutations = permutations.concat(permutations);
  }

  permutations = permutations.slice(0, targetCount);

  // Shuffle array
  for (let i = permutations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [permutations[i], permutations[j]] = [permutations[j], permutations[i]];
  }

  // Save to JSON file
  fs.writeFile(fileName, JSON.stringify(permutations, null, 2), (err: any) => {
    if (err) throw err;
    console.log(`Data saved to ${fileName}`);
  });
}

// Export the function
export default generatePermutations;
