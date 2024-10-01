import EnhancedFooter from "./components/Section/Footer";

export default async function Page() {
 class Node<T> {
  public head:T;
  public next:Node<T>|null;
  constructor(value:T){
   this.head = value;
   this.next = null;
  }
 }
 class LinkedList<T> {
  public head:Node<T>;
  private tail:Node<T>;
  private length:number
  constructor(value:T){
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1
  }
  push(value:T){
    this.tail = new Node(value)
    this.head.next = this.tail
    this.length++
  }
 }
 const list = new LinkedList(1)
 list.push(2)
 list.push(3)
 console.log({list})
  return (
    <div>
      <EnhancedFooter />
    </div>
  );
}

