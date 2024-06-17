"use server"

import { TodoListT } from "@/types/todoList.type"
import { revalidatePath } from "next/cache"

export const getTodoLists = async () => {
  try {
    const response = await fetch(
      "https://666c14cc49dbc5d7145c8307.mockapi.io/api/todolist",{ cache: "no-cache" }
    )
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const addTodoList = async (todoList: TodoListT) => {
  try {
    const response = await fetch(
      "https://666c14cc49dbc5d7145c8307.mockapi.io/api/todolist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoList),
      }
    )
    revalidatePath("/")
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
