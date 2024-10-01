import EnhancedFooter from "./components/Section/Footer";

export default async function Page() {
class NewArray<T> {
  private length: number;
  public data: { [key: number]: T };
  constructor() {
    this.length = 0;
    this.data = {};
  }
  push(item: T) {
    const indexOfItem = this.length
    this.data[indexOfItem] = item;
    this.length++;
   return  indexOfItem
  }
  get(index:number){
    const item = this.data[index]
    if(!item) return -1;
    return item
  }
  pop(){
    if(this.length === 0 ) return "empty data"
    delete this.data[this.length - 1]
    this.length --
  }
}
const array = new NewArray<any>();
console.log(array.push(1))
console.log(array.push(2))
console.log(array.push(2))
console.log(array.push(2))
console.log(array.pop())
console.log(array.pop())
console.log(array.pop())
console.log(array.pop())




console.log(array.data)
  return (
    <div>
      <EnhancedFooter />
    </div>
  );
}

