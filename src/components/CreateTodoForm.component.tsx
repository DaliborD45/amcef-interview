"use client"
import React from "react"
import * as Yup from "yup"
import { Formik, Field, Form } from "formik"
import Input from "@/components/Input.component"
import { TodoT } from "@/types/todo.type"
import { addTodo } from "@/api/todo.api"
import Button from "@/components/Button.component"
import { useRouter } from "next/navigation"

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  date: Yup.date().required("Date is required"),
  todoListId: Yup.string(),
})

export default function CreateTodoForm({ todoListId }: { todoListId: string }) {
  const router = useRouter()
  const handleCreateTodo = async (values: TodoT) => {
    await addTodo(values.todolistId, values)
    router.push("/")
  }
  return (
    <div className="flex flex-col md:max-w-4xl mx-auto w-full bg-slate-100 rounded-lg p-5">
      <h1 className="font-semibold text-xl mb-5">Create Todo</h1>
      <Formik
        initialValues={{
          id: "",
          title: "",
          description: "",
          date: "",
          completed: false,
          todolistId: todoListId,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleCreateTodo(values)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col gap-5 mb-8">
              <Field
                label="Title"
                type="text"
                name="title"
                errors={errors.title}
                touched={touched.title}
                component={Input}
                required
              />
              <Field
                label="Description"
                type="text"
                name="description"
                errors={errors.description}
                touched={touched.description}
                component={Input}
              />
              <Field
                label="Date"
                type="date"
                name="date"
                errors={errors.date}
                touched={touched.date}
                component={Input}
              />
            </div>

            <Button type="submit" variant="primary" size="md">
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
