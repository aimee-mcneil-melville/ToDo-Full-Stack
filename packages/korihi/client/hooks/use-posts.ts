import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useCredentials from './use-auth.ts'
import request from 'superagent'
import { PagedPosts, Post } from '../../models/Post'
import { API_HOST } from '../api-host.ts'

function isUnauthorized(error: unknown) {
  return (
    error != undefined &&
    typeof error === 'object' &&
    'status' in error &&
    error.status === 401
  )
}

export function useReplies(id: number, beforeId?: number) {
  const { username, password } = useCredentials()

  return useQuery({
    queryKey: ['posts', 'replies', id, { username, password }],
    queryFn: async () => {
      if (!username || !password) {
        throw new Error()
      }

      const qs = beforeId ? { beforeId } : {}

      const res = await request
        .get(`${API_HOST}/api/v1/posts/${id}/replies`)
        .query(qs)
        .auth(username, password, { type: 'basic' })

      return res.body as PagedPosts
    },
    enabled: !!(username && password),
  })
}

export function usePost(id: number) {
  const { username, password, authFailed } = useCredentials()

  return useQuery({
    queryKey: ['post', id, { username, password }],
    queryFn: async () => {
      if (!username || !password) {
        throw new Error('Not logged in')
      }
      try {
        const res = await request
          .get(`${API_HOST}/api/v1/posts/${id}`)
          .auth(username, password, { type: 'basic' })
        return res.body as Post
      } catch (err) {
        if (isUnauthorized(err)) {
          authFailed(String(err))
        }

        throw err
      }
    },
    enabled: !!(username && password),
  })
}

export function usePosts() {
  // TODO: replace this with a real implementation
  return { isLoading: true, isError: false, data: null }
}

export function usePostsBy(author: string, beforeId?: number) {
  const { username, password } = useCredentials()

  return useQuery({
    queryKey: ['posts', beforeId, { username, password }],
    queryFn: async () => {
      if (!username || !password) {
        throw new Error()
      }
      const qs = beforeId ? { beforeId } : {}

      const res = await request
        .get(`${API_HOST}/api/v1/posts/by/${author}`)
        .query(qs)
        .auth(username, password, { type: 'basic' })

      return res.body as PagedPosts
    },
    enabled: !!(username && password),
  })
}

export function useCreatePost() {
  return {
    mutate: (args: { text: string }) => {},
    isPending: true,
    isError: false,
    error: null
  }
}

export function useReplyTo() {
  const qc = useQueryClient()
  const { username, password } = useCredentials()

  return useMutation({
    mutationFn: async (values: { id: number; text: string }) => {
      if (!username || !password) {
        throw new Error('Missing credentials')
      }
      const { text, id } = values
      const res = await request
        .post(`${API_HOST}/api/v1/posts/${id}/replies`)
        .auth(username, password, { type: 'basic' })
        .send({ text })

      return res.body
    },

    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
