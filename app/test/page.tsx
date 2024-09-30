import EnhancedFooter from "./components/Section/Footer";

export default async function Page() {
// disable autocomplete for this file only
class CircularQueStack<T> {
  private items:T[];
  private size:number
  constructor(k:number){
    this.items = []
    this.size = k
  }
  isFull() {
    return this.items.length === this.size
  }
  enque(item:T){
    if(this.isFull()){
      return 'que is full now'
    }
    this.items.push(item)
    return item
  }
}

const circularStack = new CircularQueStack(2)
console.log(circularStack.enque(3))
console.log(circularStack.enque(3))
console.log(circularStack.enque(3))
console.log(circularStack.isFull())
  return (
    <div>
      <EnhancedFooter />
    </div>
  );
}

