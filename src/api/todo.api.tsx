"use server"
import { TodoT } from "@/types/todo.type"
import { TodoListT } from "@/types/todoList.type"
import { revalidatePath } from "next/cache"

export const getTodos = async (todolistId: TodoListT["id"]) => {
  try {
    const response = await fetch(
      `https://666c14cc49dbc5d7145c8307.mockapi.io/api/todolist/${todolistId}/todos`,{ cache: "no-cache" }
    )
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const addTodo = async (todolistId: TodoListT["id"], todo: TodoT) => {
  try {
    const response = await fetch(
      `https://666c14cc49dbc5d7145c8307.mockapi.io/api/todolist/${todolistId}/todos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }
    )
    revalidatePath("/")
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const updateTodo = async (todolistId: TodoListT["id"], todo: TodoT) => {
  try {
    const response = await fetch(
      `https://666c14cc49dbc5d7145c8307.mockapi.io/api/todolist/${todolistId}/todos/${todo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }
    )

    revalidatePath("/")
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const deleteTodo = async (
  todolistId: TodoListT["id"],
  todoId: TodoT["id"]
) => {
  try {
    const response = await fetch(
      `https://666c14cc49dbc5d7145c8307.mockapi.io/api/todolist/${todolistId}/todos/${todoId}`,
      {
        method: "DELETE",
      }
    )
    revalidatePath("/")
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const getTodo = async (
  todolistId: TodoListT["id"],
  todoId: TodoT["id"]
) => {
  try {
    const response = await fetch(
      `https://666c14cc49dbc5d7145c8307.mockapi.io/api/todolist/${todolistId}/todos/${todoId}`,
      { cache: "no-cache" }
    )
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
