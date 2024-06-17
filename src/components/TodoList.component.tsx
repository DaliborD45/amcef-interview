"use client"
import { TodoT } from "@/types/todo.type"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Todo from "@/components/Todo.component"
import { FiPlusCircle } from "react-icons/fi"
import Button from "@/components/Button.component"
import { TodoListT } from "@/types/todoList.type"
import { getTodo, getTodos } from "@/api/todo.api"
interface TodoListI {
  id: TodoListT["id"]
  heading: string
  todos: TodoT[]
}

export default function TodoList({ id, todos, heading }: TodoListI) {
  const router = useRouter()
  const [openFilter, setOpenFilter] = useState(false)
  //this is here because new todo list returns Not found instead of expected empty array
  const [filteredTodos, setFilteredTodos] = useState(
    Array.isArray(todos) ? todos : []
  )
  const [filter, setFilter] = useState({
    done: false,
    created: false,
  })
  const handleCreateTodo = () => {
    router.push(`/todolist/${id}/todo/create`)
  }
  const handleOpenFilter = () => {
    setOpenFilter((prev) => !prev)
  }
  const handleFilterList = () => {
    if ((!filter.done && !filter.created) || (filter.done && filter.created)) {
      setFilteredTodos(todos)
    } else if (filter.done) {
      setFilteredTodos(todos.filter((todo) => todo.completed))
    } else {
      setFilteredTodos(todos.filter((todo) => !todo.completed))
    }
    setOpenFilter(false)
  }

  const handleFindTodo = (value: string) => {
    if (value === "") {
      setFilteredTodos(todos)
    } else {
      setFilteredTodos(
        todos.filter((todo) =>
          todo.title.toLowerCase().includes(value.toLowerCase())
        )
      )
    }
  }

  return (
    <div className="bg-slate-200 rounded-lg  pt-4 pb-2 w-full sm:min-w-[25rem] sm:mx-auto ">
      <div className="flex w-full justify-between px-4 items-center">
        <h2 className="text-md text-slate-800  font-semibold">{heading}</h2>
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={handleOpenFilter}
          >
            Filter
          </Button>
          {openFilter && (
            <div className="absolute top-10 right-0 rounded-lg z-50 p-2 border-2 border-pink-500 w-[12rem] bg-white ">
              <div className="flex gap-2">
                <input
                  className="accent-pink-500"
                  type="checkbox"
                  checked={filter.created}
                  onChange={() =>
                    setFilter((prevState) => ({
                      ...prevState,
                      created: !prevState.created,
                    }))
                  }
                />
                <p>Created</p>
              </div>
              <div className="flex gap-2">
                <input
                  className="accent-pink-500"
                  type="checkbox"
                  checked={filter.done}
                  onChange={() =>
                    setFilter((prevState) => ({
                      ...prevState,
                      done: !prevState.done,
                    }))
                  }
                />
                <p>Done</p>
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={handleFilterList}
                >
                  Filter
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setOpenFilter(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mx-4 my-2">
        <input
          className="rounded-md w-full py-1 px-3 text-sm focus:outline-pink-500"
          onChange={(e) => handleFindTodo(e.target.value)}
          placeholder="Search for a todo"
        />
      </div>
      <div className="mt-4 flex flex-col gap-3 px-2 max-h-[22rem] overflow-scroll">
        {filteredTodos &&
          filteredTodos.map((todo, index) => <Todo data={todo} key={index} />)}
      </div>
      <div
        className="flex mx-2 mt-2 pt-2 pb-2 pl-2 mb-4  gap-3 hover:bg-slate-300 rounded-lg hover:cursor-pointer"
        onClick={handleCreateTodo}
      >
        <FiPlusCircle className="text-slate-800 text-2xl " />
        <p>Add a todo</p>
      </div>
    </div>
  )
}
