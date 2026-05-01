import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { PostList } from './components/posts/PostList'
import { PostDetail } from './components/posts/PostDetail'
import { PostEditor } from './components/posts/PostEditor'
import { useAuth } from './hooks/useAuth'
import type { CategoryKey } from './types'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 } },
})

type View =
  | { type: 'list' }
  | { type: 'detail'; id: string }
  | { type: 'write' }

function parseHash(): View {
  const hash = window.location.hash.slice(1)
  // Supabase OAuth 콜백 토큰이 hash에 포함된 경우 무시
  if (hash.includes('access_token')) return { type: 'list' }
  if (hash.startsWith('post/')) {
    const id = hash.slice(5)
    // UUID 형식만 허용 (토큰이 섞이는 경우 방지)
    if (/^[0-9a-f-]{36}$/.test(id)) return { type: 'detail', id }
  }
  if (hash === 'write') return { type: 'write' }
  return { type: 'list' }
}

function App() {
  useAuth() // 세션 구독 초기화

  const [view, setView] = useState<View>(parseHash)
  const [category, setCategory] = useState<CategoryKey>('all')

  useEffect(() => {
    const handler = () => setView(parseHash())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = (hash: string) => {
    window.location.hash = hash
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLogoClick={() => navigate('')} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeCategory={category}
          onCategoryChange={(key) => {
            setCategory(key)
            navigate('')
          }}
          onWriteClick={() => navigate('write')}
        />
        <main className="flex-1 overflow-y-auto">
          {view.type === 'list' && (
            <PostList
              category={category}
              onPostClick={(id) => navigate(`post/${id}`)}
            />
          )}
          {view.type === 'detail' && (
            <PostDetail
              id={view.id}
              onBack={() => navigate('')}
            />
          )}
          {view.type === 'write' && (
            <PostEditor
              onCancel={() => navigate('')}
              onSuccess={(id) => navigate(`post/${id}`)}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}
