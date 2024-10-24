
// import { indexOf, set } from "lodash";
// import { useEffect, useReducer, useState } from "react";
// import ColorfulProjectBrochures from "./components/Section/ProjectBrochers";
import dynamic from "next/dynamic"
import { getAuthorityNames } from "../utils/api/project";
import Tooltip from "../components/atoms/Tooltip";
import { useRef, useState } from "react";
export default  function Page() {
  class Node<T> {
    public head: T;
    public next: Node<T> | null;
    constructor(value: T) {
      this.head = value;
      this.next = null;
    }
  }
  class Queue<T> {
    public first: Node<T> | null;
    public last: Node<T> | null;
    public length: number;
    constructor(value?: T) {
      this.first = null;
      this.last = null;
      this.length = 0;
      if (value) {
        const newNode = new Node(value);
        this.first = newNode;
        this.last = newNode;
        this.length = 1;
      }
    }
    enque(value: T) {
      const newNode = new Node(value);
      if (this.length == 0) {
        (this.first = newNode), (this.last = newNode);
        this.length = 1;
      } else {
        this.last = newNode;
        this.last.next = newNode;
        this.length++;
      }
    }
  }
  // class LinkedList<T> {
  //   public head: Node<T>;
  //   private tail: Node<T>;
  //   private length: number;
  //   constructor(value: T) {
  //     this.head = new Node(value);
  //     this.tail = this.head;
  //     this.length = 1;
  //   }
  //   push(value: T) {
  //     let newNode = new Node(value);
  //     this.tail.next = newNode;
  //     this.tail = newNode;
  //     this.length++;
  //   }
  //   pop() {
  //     if (this.length === 0) return;
  //     let temp = this.head;
  //     let prev = this.head;
  //     while (temp.next) {
  //       prev = temp;
  //       temp = temp.next;
  //     }
  //     this.tail = prev;
  //     this.tail.next = null;
  //     this.length--;
  //     return temp;
  //   }
  //   unshift(value: T) {
  //     const newNode = new Node(value);
  //     newNode.next = this.head;
  //     this.head = newNode;
  //     this.length++;
  //     return newNode;
  //   }
  //   shift() {
  //     if (this.head.next) {
  //       this.head = this.head.next;
  //       this.length--;
  //     } else {
  //       ("0");
  //     }
  //   }
  //   getFirst() {
  //     return this.head;
  //   }
  //   getLast() {
  //     let temp = this.head;
  //     while (temp) {
  //       if (!temp.next) {
  //         return temp;
  //       }
  //       temp = temp.next;
  //     }
  //   }
  //   getByIndex(index: number) {
  //     let currentIndex = 0;
  //     let temp = this.head;
  //     if (!temp.next) return -1;
  //     while (temp.next) {
  //       if (currentIndex === index) {
  //         return temp;
  //       }
  //       currentIndex++;
  //       temp = temp.next;
  //     }

  //   }
  //   reverse(){
  //   let prevHead = this.head;
  //   this.head === this.tail
  //   this.tail === prevHead
  //   return {
  //     header:this.head,
  //     end:this.tail
  //   }
  //   }
  // }

  // console.log(list.getByIndex(0));
  class Stack<T> {
    items: T[];
    constructor() {
      this.items = [];
    }
    push(item: T) {
      this.items.push(item);
    }
  }
  const stack = new Stack();
  stack.push("a");
  stack.push("b");

  // class HashTable<T extends [string, T]> {
  //   public hashTable: Array<T[]>;
  //   public size:number;
  //   public count:number;
  //   constructor(size = 6) {
  //     this.hashTable = new Array(size);
  //     this.size = size;
  //     this.count = 0
  //   }
  //   _hash(key: string) {
  //     let hash = 0;
  //     for (let i = 0; i < key.length; i++) {
  //       hash = (hash + key.charCodeAt(i) * 31) % this.hashTable.length;
  //     }
  //     return hash;
  //   }
  //   set(key: string, value: T["value"]) {
  //     const index = this._hash(key);
  //     if (!this.hashTable[index]) {
  //       this.hashTable[index] = [];
  //     }
  //     this.hashTable[index].push([key, value]);
  //     this.count++
  //   }
  //   get(key: string) {
  //     const index = this._hash(key);
  //     if (this.hashTable[index]) {
  //       for (let i = 0; i < this.hashTable[index].length; i++) {
  //         if (this.hashTable[index][i][0] === key) {
  //           return this.hashTable[index][i][1];
  //         }
  //       }
  //     }
  //     return -1;
  //   }
  //   keys(){
  //     let keys = []
  //     for (let i = 0; i < this.hashTable.length; i++) {
  //         let item = this.hashTable[i]
  //         if(item){
  //           for (let j = 0; j < this.hashTable[i].length; j++) {
  //      keys.push(this.hashTable[i][j][0])     
  //           }
  //         }
  //     }
  //     return keys
  //   }
  //   _reSize(){

  //   }
  // }

  // const myHash = new HashTable(10);
  // myHash.set("a", {
  //   age: 1,
  // });
  // myHash.set("b", {
  //   age: 2,
  // });
  // myHash.set("c", {
  //   age: 3,
  // });
  // myHash.set("d", {
  //   age: 4,
  // });
  // myHash.set("e", {
  //   age: 5,
  // });
  // console.log(myHash.count)
//  class BFS <T> {
//  public queue: T[];
//  public result: T[];
//   constructor() {
//     this.currentNode = null;
//     this.queue = [];
//     this.result = []
//   }
//  }
//  let factorialOFF = (n: number) => {
//     if(n === 0 || n === 1){
// return 1
//     }
//     return n * factorialOFF(n-1)
//  }
//  console.log(factorialOFF(4))
// const bubbleSort = (arr: number[]): number[][] => {
//   const steps: number[][] = [];
//   let sortedArray = [...arr];
//   for (let i = 0; i < sortedArray.length; i++) {
//     for (let j = 0; j < sortedArray.length - i - 1; j++) {
//       if (sortedArray[j] > sortedArray[j + 1]) {
//         // Swap elements
//         [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
//       }
//       // Capture the current state of the array
//       steps.push([...sortedArray]);
//     }
//   }
//   return steps;
// };

  return (
    <div className="mt-10 ml-10">THE TEST PAGE <Tooltip text="test tooltip"><div>test tooltip</div> 
    
     <input type="text" placeholder="Search..." defaultValue="Search..." />
    </Tooltip></div>
  
    // <VisualRepresentationOfArrayWhileLooping sortAlgorithm={bubbleSort} />
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
