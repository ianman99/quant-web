export interface Post {
  id: string
  title: string
  body: string
  category: string
  author_id: string
  author_name: string
  author_avatar: string | null
  created_at: string
  updated_at: string
}

export type PostInsert = Pick<Post, 'title' | 'body' | 'category'>

export const CATEGORIES = [
  { key: 'all', label: '전체 글' },
  { key: 'strategy', label: '전략 공유' },
  { key: 'data', label: '데이터 분석' },
  { key: 'discussion', label: '질문 · 토론' },
  { key: 'news', label: '시장 뉴스' },
] as const

export type CategoryKey = (typeof CATEGORIES)[number]['key']
