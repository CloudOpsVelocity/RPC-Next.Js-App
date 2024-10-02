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
    let newNode = new Node(value)
    this.tail.next = newNode
    this.tail = newNode
    this.length++
  }
  pop(){
    if(this.length === 0) return 
    
  }
 }
 const list = new LinkedList('APPLE')
 list.push('ORANGE')
 list.push('MANGO')
 console.log({list})
  return (
    <div>
      <EnhancedFooter />
    </div>
  );
}

