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
  { key: 'all', label: 'All' },
  { key: 'research', label: 'Research' },
  { key: 'backtest', label: 'Backtest' },
  { key: 'paper', label: 'Paper' },
  { key: 'note', label: 'Note' },
  { key: 'discussion', label: 'Discussion' },
] as const

export type CategoryKey = (typeof CATEGORIES)[number]['key']
