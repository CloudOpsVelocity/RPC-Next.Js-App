"use client";
import { useForm } from "@mantine/form";
import { addRating } from "../utils/api/actions/server";
import { TextInput } from "@mantine/core";

export default function TodoList() {
  const form = useForm({
    initialValues: {
      rating: "",
    },
  });
  return (
    <>
      <h2>Server Actions </h2>
      <div>
        <form action={addRating} method="POST">
          <div>
            <label htmlFor="todo">Rating</label>
            <div>
              <TextInput
                id="rating"
                name="rating"
                type="text"
                placeholder="What needs to be done?"
                {...form.getInputProps("rating")}
              />
            </div>
          </div>
          <div>
            <button type="submit"> Add rating</button>
          </div>
        </form>
      </div>
    </>
  );
}
