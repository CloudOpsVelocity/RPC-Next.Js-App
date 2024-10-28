"use client";
// import { indexOf, set } from "lodash";
// import { useEffect, useReducer, useState } from "react";
// import ColorfulProjectBrochures from "./components/Section/ProjectBrochers";
import dynamic from "next/dynamic";
import { getAuthorityNames } from "../utils/api/project";
import Tooltip from "../components/atoms/Tooltip";
import { useRef, useState } from "react";
import Carousel from "../(dashboard)/new/components/Atoms/OptimizedCarousel";
export default function Page() {
  type INPUT_OUTPUT = number[];
  // function bhkSort<T extends number[]>(arr: T): T {
  //          for (let i = 1; i < arr.length; i++) {
  //           let curEle = arr[i]
  //             let j = i - 1
  //             while(j > 0 && arr[j] > curEle){
  //                  arr[j+ 1] = arr[j]
  //                  j--
  //             }
  //             arr[j+1] = curEle
  //          }
  //   return arr
  // }
  // console.log(bhkSort([3,5,3,1,3,2,7,5,4,2]))

  // Example
  function lengthOfLongestSubstring(s: string): number {
    let values:number[] = []
    // sample input abcbbxyxs
    // 0 => 3 
    // 1 => 5
    let curIndex = 0
    for (let i = 0; i < s.length; i++) {
        if(s[i] != s[i+1]){
          if(!values[curIndex]){
            values.push(1)
          }
          else{
            values[curIndex] += 1
          }
        }
        else{
          i = i+1
          curIndex++
        }

        
    }
return Math.max(...values)
    }
    console.log(lengthOfLongestSubstring('abceqtbbxyxshgfvf'))
  return (
    <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8]">
      <CarouselExample />
      {/* <Header />
    <HomeSearch
      count={shortIds?.total}
      cityData={{
        cityId: cityData?.data.cityId,
        cityName: cityData?.data.city,
      }}
    />
    <HomeFeatures />
    <NewAddedProjects
      data={data.featured}
      shortIds={shortIds}
      cityId={cityData.data.cityId}
    />
    <DynamicListing
      title="Ready to Move Sell Listings"
      content="Move In Today: Your Dream Home Awaits – Explore Our Ready-to-Move Listings Now!"
      data={listingData["r_Sale"]}
      shortIds={shortIds}
    />
    <TopLocalities />
    <DynamicListing
      title="Ready to Move Rent Listings"
      content="Find Your Perfect Home, Ready to Move In - Rent Today!"
      data={listingData["r_Rent"]}
      shortIds={shortIds}
    />
    <DynamicListing
      title="Featured Plot Listings"
      content="Browse Top Listings and Find Your Perfect Plot Today!"
      data={listingData["p"]}
      shortIds={shortIds}
    />
    <DynamicListing
      title="Under Construction Sell Listings"
      content="Explore Our Under Construction Listings Today!"
      data={listingData["u_Sale"]}
      shortIds={shortIds}
    />
    <HandPickedProjects
      data={data}
      shortIds={shortIds}
      // cityId={cityData.data.city}
    />
    <DynamicListing
      title="Under Construction Rent Listings"
      content="Discover New Developments and Under Construction Rent Listings!"
      data={listingData["u_Rent"]}
      shortIds={shortIds}
    />
    <DynamicListing
      title="Independent Sell Listings"
      content="Your Gateway to Independent Living - Browse and Buy with Confidence"
      data={listingData["i_Sale"]}
      shortIds={shortIds}
    />{" "}
    <ListbySection />
    <DynamicListing
      title="Independent Rent Listings"
      content="Discover Your Ideal Rental: Independent Listings, Endless Options."
      data={listingData["i_Rent"]}
      shortIds={shortIds}
    />
    <PostYourListing />
    <BlogsSection />
    <Footer />
    <LoginPopup />
    <SharePopup />
    <Req /> */}
    </div>
  );
}

// const CommentSection = () => {
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState<string[]>([]);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if(!comment) return alert("please add something")
//     setComments([...comments, comment]);
//     setComment('');
//   };

//   return (
//     <div className="bg-blue-500 p-4 rounded-lg shadow-md">
//       <form onSubmit={handleSubmit} className="mb-4">
//         <input
//           type="text"
//           placeholder="Enter your comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//         <button
//           type="submit"
//           className="mt-2 w-full p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
//         >
//           Add Project Comment.
//         </button>
//       </form>
//       <div className="comments">
//         {comments.map((comment, index) => (
//           <div key={index} className="comment mb-2 p-2 border border-gray-300 rounded-md">
//             <p>{comment}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const VisualRepresentationOfArrayWhileLooping = ({ sortAlgorithm }: { sortAlgorithm: (arr: number[]) => number[][] }) => {
//   // Box component representing each number in the array
//   const Box = ({ height, number }: { height: number; number: number }) => {
//     return (
//       <div
//         style={{
//           width: '40px',
//           height: `${height * 10}px`, // scale the height for better visual representation
//           backgroundColor: 'lightblue',
//           margin: '5px',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'flex-end',
//           fontSize: '18px', // Larger font size
//           fontWeight: 'bold', // Bold text
//           color: '#333',
//           border: '2px solid #333', // Thicker border for better visibility
//         }}
//       >
//         {number}
//       </div>
//     );
//   };

//   // Sorting animation logic
//   const MySortAlgo = ({ input }: { input: number[] }) => {
//     const [array, setArray] = useState(input);
//     const [animationRunning, setAnimationRunning] = useState(false);
//     const [animationSteps, setAnimationSteps] = useState<number[][]>([]); // Store the steps of the sorting algorithm
//     const [currentStep, setCurrentStep] = useState(0); // Step index for the animation
//     const [sorted, setSorted] = useState(false); // Flag to indicate if sorting is complete

//     // When animation starts, calculate the steps for the sorting algorithm
//     useEffect(() => {
//       if (animationRunning && animationSteps.length === 0) {
//         const steps = sortAlgorithm(array); // Generate steps using the passed sorting function
//         setAnimationSteps(steps);
//       }
//     }, [animationRunning, array, sortAlgorithm, animationSteps]);

//     // Control the animation steps
//     useEffect(() => {
//       if (!animationRunning || sorted || currentStep >= animationSteps.length) return;

//       const timeout = setTimeout(() => {
//         setArray(animationSteps[currentStep]);
//         setCurrentStep(currentStep + 1);

//         if (currentStep >= animationSteps.length - 1) {
//           setSorted(true); // Sorting is complete
//           setAnimationRunning(false);
//         }
//       }, 1000); // 1 second delay for each step

//       return () => clearTimeout(timeout);
//     }, [animationRunning, currentStep, sorted, animationSteps]);

//     const startSorting = () => {
//       setAnimationRunning(true);
//       setSorted(false);
//       setCurrentStep(0);
//       setAnimationSteps([]); // Reset the steps when starting a new animation
//     };

//     return (
//       <div>
//         {/* Display the array as visual boxes */}
//         <div style={{ display: 'flex', flexDirection: 'row' }}>
//           {array.map((number, index) => (
//             <Box key={index} height={number} number={number} />
//           ))}
//         </div>

//         {/* Button to start animation */}
//         <button
//           onClick={startSorting}
//           disabled={animationRunning || sorted}
//           style={{
//             marginTop: '20px',
//             padding: '10px 20px',
//             fontSize: '18px',
//             fontWeight: 'bold',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: animationRunning || sorted ? 'not-allowed' : 'pointer'
//           }}
//         >
//           {sorted ? 'Sorted!' : animationRunning ? 'Sorting...' : 'Start Animation'}
//         </button>
//       </div>
//     );
//   };

//   // Example input array to be sorted
//   return (
//     <div>
//       <MySortAlgo input={[5, 3, 8, 1, 6, 9, 2]} />
//     </div>
//   );
// };

const items = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
  color: `hsl(${(i * 360) / 20}, 70%, 60%)`,
}));

function CarouselExample() {
  return (
    <div className="py-12 bg-gradient-to-r from-purple-50 to-pink-50">
      <h1 className="text-3xl font-bold text-center mb-8">
        Test Home Page Carousel
      </h1>
      <Carousel
        items={items}
        itemWidth={250}
        gap={24}
        visibleItems={3}
        renderItem={(item) => (
          <div className="w-full h-full overflow-hidden bg-white rounded-lg shadow-md">
            <div className="p-0">
              <div
                className="w-full h-full flex items-center justify-center text-white font-bold text-2xl"
                style={{ backgroundColor: item.color }}
              >
                {item.title}
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
