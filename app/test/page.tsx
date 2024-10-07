import { TbInnerShadowBottom } from "react-icons/tb";
import EnhancedFooter from "./components/Section/Footer";

export default async function Page() {
  // class Node<T> {
  //   public head: T;
  //   public next: Node<T> | null;
  //   constructor(value: T) {
  //     this.head = value;
  //     this.next = null;
  //   }
  // }
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
  // }
  // const list = new LinkedList("1BHK");
  // list.push("2BHK");
  // list.push("3BHK");
  // list.push("4BHK");
  // // list.pop()

  // function isEqual(obj1: any, obj2: any): boolean {
  //   console.log(JSON.stringify(obj1), JSON.stringify(obj2));
  //   return JSON.stringify(obj1) === JSON.stringify(obj2);
  // }

  // function test(record: any) {
  //   if (isEqual(record, { age: 28 })) {
  //     console.log("you are an adult");
  //   } else if (isEqual(record, { age: 18 })) {
  //     console.log("you are a minor");
  //   } else {
  //     console.log("no record found.");
  //   }
  // }

  // test({ age: 18 });

  // console.log(list.getByIndex(100));

  return (
    <div>
      <EnhancedFooter />
    </div>
  );
}
