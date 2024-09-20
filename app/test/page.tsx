import React, { Suspense } from "react";
import ServerCompo from "./components/Section/ServerCompo";

type Props = {};

export default async function Page({}: Props) {
  const todos = await getTodos();
  return (
    <div>
      {/* {todos.map((todo) => (
        <li>{todo.name}</li>
      ))} */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ServerCompo />
      </Suspense> */}
    </div>
  );
}

const getTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data;
};
