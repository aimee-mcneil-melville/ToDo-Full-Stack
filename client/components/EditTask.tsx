// eslint-disable-next-line no-unused-vars
import { useState } from 'react'
import { updateTodo } from '../apis/apiClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task, TaskData } from '../../models/models'

interface Props extends Task {
  id: number
  task: string
  onCancel: () => void
}

export function EditTask({ id, task, onCancel }: Props) {
  const queryClient = useQueryClient()
  const updateTodoMutation = useMutation({
    mutationFn: (task: TaskData) => updateTodo(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
      onCancel()
    },
  })

  const [form, setForm] = useState({
    task: task,
    completed: false,
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  // console.log(
  //   'Text changed:',
  //   event.target.value,
  //   'on input:',
  //   event.target.name,
  // )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateTodoMutation.mutate(form)
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="task">New Todo: </label>
        <input
          onChange={(e) => handleChange(e)}
          id="task"
          name="task"
          className="new-todo"
          value={form.task}
          // autoFocus={true}
        />
        <button>Update</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </>
  )
}
