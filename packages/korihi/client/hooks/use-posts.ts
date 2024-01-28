import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { PagedPosts, Post } from '../../models/Post'
import { API_HOST, USERNAME, PASSWORD } from '../env.ts'

export function useReplies(id: number, beforeId?: number) {
  return useQuery({
    queryKey: ['posts', 'replies', id],
    queryFn: async () => {
      const qs = beforeId ? { beforeId } : {}

      const res = await request
        .get(`${API_HOST}/api/v1/posts/${id}/replies`)
        .query(qs)
        .auth(USERNAME, PASSWORD, { type: 'basic' })

      return res.body as PagedPosts
    },
  })
}

export function usePost(id: number) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await request
        .get(`${API_HOST}/api/v1/posts/${id}`)
        .auth(USERNAME, PASSWORD, { type: 'basic' })

      return res.body as Post
    },
  })
}

export function usePosts() {
  // TODO: replace this with a real implementation
  return {
    isLoading: true,
    isError: false,
    data: null as null | { items: [] },
    error: null,
  }
}

export function usePostsBy(author: string) {
  return useQuery({
    queryKey: ['posts', 'by', author],
    queryFn: async () => {
      const res = await request
        .get(`${API_HOST}/api/v1/posts/by/${author}`)
        .query(qs)
        .auth(USERNAME, PASSWORD, { type: 'basic' })

      return res.body as PagedPosts
    },
  })
}

export function useCreatePost() {
  // TODO: complete this function to create new posts
  return {
    mutate: (_: { text: string }) => {},
    isPending: true,
    isError: false,
    error: null,
  }
}

export function useReplyTo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (values: { id: number; text: string }) => {
      const { text, id } = values
      const res = await request
        .post(`${API_HOST}/api/v1/posts/${id}/replies`)
        .auth(USERNAME, PASSWORD, { type: 'basic' })
        .send({ text })

      return res.body
    },

    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
