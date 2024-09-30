import EnhancedFooter from "./components/Section/Footer";

export default async function Page() {
// disable autocomplete for this file only
class Stack<T> {
  private queue: T[];
  constructor() {
    this.queue = []
  }
  enque(ele:T){
    this.queue.push(ele)
  }
  deque() {
    if(this.isEmpty()){
      return 'UNDER FLOW'
    }
    this.queue.shift()
  }
  isEmpty(){
 return this.queue.length <= 0
  }
  front(){
    if(this.isEmpty()){
      return 'Que is Empty'
    }
    return this.queue[0]
  }
  size(){
    return this.queue.length
  }
  printStack(){
    if(this.isEmpty()){
      console.log('emtpy queue')
      return
    }
      console.log("My Queue Items: " + this.queue.join(", "))
  }
}
 const queue = new Stack()
 queue.enque(8)
 queue.enque(2)
 queue.enque(1)
 queue.enque(5)
 queue.deque()
 queue.deque()
 queue.deque()
 queue.deque()
 
queue.printStack()
  return (
    <div>
      <EnhancedFooter />
    </div>
  );
}

