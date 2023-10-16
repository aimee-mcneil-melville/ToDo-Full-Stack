import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Location } from '../../models/Location.js'

export default function useEditLocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Location) => {
      const { id, name, description } = data
      await request.patch(`/api/v1/locations/${id}`).send({ name, description })
    },
    onSuccess: (_, { id }: Location) => {
      queryClient.invalidateQueries(['location', id])
    },
  })
}
