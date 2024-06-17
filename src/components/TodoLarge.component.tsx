"use client"
import { TodoT } from "@/types/todo.type"
import React, { useMemo, useState } from "react"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import Button from "@/components/Button.component"
import { VscRequestChanges } from "react-icons/vsc"
import { useRouter } from "next/navigation"
import { MdOutlineDone, MdDeleteForever } from "react-icons/md"
import { IconType } from "react-icons"
import { deleteTodo, updateTodo } from "@/api/todo.api"
interface TodoLargeI {
  data: TodoT
}

interface TodoSettingI {
  Icon: IconType
  title: string
  onClick: () => void
}

function TodoSetting({ Icon, title, onClick }: TodoSettingI) {
  return (
    <div
      className="flex bg-slate-200 rounded-sm p-2 items-center gap-2 hover:bg-slate-300 hover:cursor-pointer ease-linear duration-200"
      onClick={onClick}
    >
      <Icon className="text-md text-pink-500" />
      <p className="text-sm">{title}</p>
    </div>
  )
}

export default function TodoLarge({ data }: TodoLargeI) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleMarkAsDone = async () => {
    await updateTodo(data.todolistId, { ...data, completed: true })
    router.push("/")
  }
  
  const handleDeleteTodo = async () => {
    await deleteTodo(data.todolistId, data.id)
    router.push("/")
  }
  const TODO_SETTINGS = [
    {
      Icon: VscRequestChanges,
      title: "Update",
      onClick: () => {},
    },
    {
      Icon: MdOutlineDone,
      title: "Mark as done",
      onClick: handleMarkAsDone,
    },
    {
      Icon: MdDeleteForever,
      title: "Delete",
      onClick: handleDeleteTodo,
    },
  ]
  const dateTime = useMemo(() => {
    return new Date(data.date).toDateString()
  }, [data.date])

  return (
    <div className="w-full md:max-w-4xl bg-slate-100 rounded-lg p-5 mx-auto">
      <h1 className="text-xl font-semibold">{data.title}</h1>

      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="flex flex-col  break-words">
          <p className="text-sm font-semibold  mt-1">{dateTime}</p>

          <div className="flex gap-2 items-center mt-4">
            <HiOutlineMenuAlt3 className="text-md text-tertiary-500" />
            <p className="text-md">Description</p>
          </div>
          <p className="text-sm mt-1 pl-6">{data.description}</p>
        </div>
        <div className="md:min-w-[10rem]">
          <h3 className="text-sm mb-2">Settings</h3>
          <div className="flex flex-col gap-2">
            {TODO_SETTINGS.map((setting, index) => (
              <TodoSetting key={index} {...setting} />
            ))}
          </div>
        </div>
      </div>

      {isUpdating && (
        <div className="flex gap-3 justify-start mt-10">
          <Button size="md" variant="primary" type="button">
            Update
          </Button>
          <Button size="md" variant="secondary" type="button">
            Close
          </Button>
        </div>
      )}
    </div>
  )
}
