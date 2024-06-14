import { getTodos } from "@/api/todo.api"
import TodoList from "@/components/TodoList.component"
import { TodoT } from "@/types/todo.type"
import { get } from "http"
import Image from "next/image"

export default async function Home() {
  const todos: TodoT[] = await getTodos()
  const data = ["Created", "In Progress", "Done"]
  return (
    <div className="flex gap-24 ">
      {data.map((item, index) => (
        <TodoList todos={todos} heading={item} key={index} />
      ))}
    </div>
  )
}
