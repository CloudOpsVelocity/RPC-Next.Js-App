"use client";

import { indexOf, set } from "lodash";
import { useEffect, useState } from "react";

export default function Page() {
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
  //   constructor(size = 6) {
  //     this.hashTable = new Array(size);
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
  // }

  // const myHash = new HashTable(2);
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
  // console.log(myHash.hashTable);
  // console.log(myHash.get("b"));
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col space-y-2">
      sdfd
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
