import { TbInnerShadowBottom } from "react-icons/tb";
import EnhancedFooter from "./components/Section/Footer";

export default async function Page() {
  class Node<T> {
    public head: T;
    public next: Node<T> | null;
    constructor(value: T) {
      this.head = value;
      this.next = null;
    }
  }
  class LinkedList<T> {
    public head: Node<T>;
    private tail: Node<T>;
    private length: number;
    constructor(value: T) {
      this.head = new Node(value);
      this.tail = this.head;
      this.length = 1;
    }
    push(value: T) {
      let newNode = new Node(value);
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }
    pop() {
      if (this.length === 0) return;
      let temp = this.head;
      let prev = this.head
      while (temp.next) {
        prev = temp;
        temp = temp.next;
      }
      this.tail = prev;
      this.tail.next = null;
      this.length--;
      return temp
    }
  }
  const list = new LinkedList("APPLE");
  list.push("ORANGE");
  list.push("MANGO");
  list.pop()
  
 
  console.log(list);
  return (
    <div>
      <EnhancedFooter />
    </div>
  );
}
