import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from '../apis/apiClient.ts'

export function useTodos() {
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
  return {
    ...query,
    addTodo: useAddTodo(),
    updateTodo: useUpdateTodo(),
    deleteTodo: useDeleteTodo(),
  }
}

function useTodoMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()
  const mutation = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return mutation
}

function useAddTodo() {
  return useTodoMutation(createTodo)
}

function useUpdateTodo() {
  return useTodoMutation(updateTodo)
}

function useDeleteTodo() {
  return useTodoMutation(deleteTodo)
}
