"use client"
import { TodoT } from "@/types/todo.type"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Todo from "./Todo.component"
import { FiPlusCircle } from "react-icons/fi"
import { FaArrowAltCircleDown } from "react-icons/fa"
interface TodoListI {
  todos: TodoT[]
  heading: string
}

export default function TodoList({ todos, heading }: TodoListI) {
  const router = useRouter()
  const [isListSmaller, setIsListSmaller] = useState({
    created: false,
    inProgress: false,
    done: false,
  })
  const handleCreateTodo = () => {
    router.push(`/todo/create`)
  }
  return (
    <div className="bg-slate-200 rounded-lg  pt-4 w-[18rem]">
      <div className="flex w-full justify-between px-4">
        <h2 className="text-md text-slate-800  font-semibold">{heading}</h2>
        <FaArrowAltCircleDown
          onClick={() =>
            setIsListSmaller((prev) => ({
              ...prev,
              [heading]: !prev[heading as keyof typeof prev],
            }))
          }
          className={`text-slate-800 text-2xl hover:text-pink-500 ease-linear duration-100 ${
            isListSmaller[heading as keyof typeof isListSmaller]
              ? "rotate-180"
              : ""
          }`}
        />
      </div>

      <div
        className={`mt-4 flex flex-col gap-3 px-2 ${
          isListSmaller[heading as keyof typeof isListSmaller] && "hidden"
        }`}
      >
        {todos.map((todo, index) => (
          <Todo
            data={todo}
            key={index}
            isListSmaller={isListSmaller[heading as keyof typeof isListSmaller]}
          />
        ))}
      </div>
      <div
        className="flex mx-2 mt-2 pt-2 pb-2 pl-2 mb-4  gap-3 hover:bg-slate-300 rounded-lg hover:cursor-pointer"
        onClick={handleCreateTodo}
      >
        <FiPlusCircle className="text-slate-800 text-2xl " />
        <p>Add a card</p>
      </div>
    </div>
  )
}
