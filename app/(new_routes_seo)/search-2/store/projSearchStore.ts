import { observable } from "@legendapp/state";

// Type your Store interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Store {
  todos: Todo[];
  total: () => number;
  numCompleted: () => number;
  addTodo: (params: { text: string; completed: boolean }) => void;
}

// Create a global observable for the Todos
let nextId = 0;
export const store$ = observable<Store>({
  todos: [
    { id: 0, text: "Search for properties", completed: false },
    { id: 1, text: "Filter by price range", completed: false },
    { id: 2, text: "Check available locations", completed: false },
    { id: 3, text: "Compare different properties", completed: false },
  ],
  // Computeds
  total: (): number => {
    return store$.todos.length;
  },
  numCompleted: (): number => {
    return store$.todos.get().filter((todo) => todo.completed).length;
  },
  addTodo: ({
    completed,
    text,
  }: {
    text: string;
    completed: boolean;
  }): void => {
    const todo: Todo = {
      id: nextId++,
      text,
      completed,
    };
    store$.todos.push(todo);
  },
});
