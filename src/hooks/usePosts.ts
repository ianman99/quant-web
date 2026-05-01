import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import type { PostInsert } from '../types'

export const PAGE_SIZE = 10

export function usePosts(category: string, page = 0) {
  return useQuery({
    queryKey: ['posts', category, page],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

      if (category !== 'all') {
        query = query.eq('category', category)
      }

      const { data, error, count } = await query
      if (error) throw error
      return { posts: data ?? [], total: count ?? 0 }
    },
  })
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!id,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  const user = useAuthStore((s) => s.user)

  return useMutation({
    mutationFn: async (post: PostInsert) => {
      if (!user) throw new Error('로그인이 필요합니다.')
      const { data, error } = await supabase.from('posts').insert({
        ...post,
        author_id: user.id,
        author_name: user.user_metadata?.user_name ?? user.email ?? '익명',
        author_avatar: user.user_metadata?.avatar_url ?? null,
      }).select().single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('posts').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
