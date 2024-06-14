"use client"
import { TodoT } from "@/types/todo.type"
import React from "react"
import { useRouter } from "next/navigation"
import { IoCreateOutline } from "react-icons/io5"
interface TodoI {
  data: TodoT
  isListSmaller: boolean
}

export default function Todo({ data, isListSmaller }: TodoI) {
  const router = useRouter()
  const handleRedirectToTodo = () => {
    router.push(`/todo/${data.id}`)
  }
  return (
    <div
      className={`${
        isListSmaller && ""
      } relative group w-full bg-slate-100 border-2 border-slate-300 shadow-sm rounded-lg p-2 hover:border-pink-500 hover:cursor-pointer ease-linear duration-100`}
      onClick={handleRedirectToTodo}
    >
      <IoCreateOutline className="absolute top-1 right-2  group-hover:block hidden  text-pink-500 " />
      <h3>{data.title}</h3>
    </div>
  )
}
