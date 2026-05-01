import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LandingPage } from './components/design/LandingPage'
import { Nav } from './components/design/Nav'
import { Footer } from './components/design/Footer'
import { PostList } from './components/posts/PostList'
import { PostDetail } from './components/posts/PostDetail'
import { PostEditor } from './components/posts/PostEditor'
import { useAuth } from './hooks/useAuth'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 } },
})

type View =
  | { type: 'home' }
  | { type: 'community' }
  | { type: 'detail'; id: string }
  | { type: 'write' }

function parseHash(): View {
  const hash = window.location.hash.slice(1)
  if (hash.includes('access_token')) return { type: 'community' }
  if (hash === 'community') return { type: 'community' }
  if (hash.startsWith('post/')) {
    const id = hash.slice(5)
    if (/^[0-9a-f-]{36}$/.test(id)) return { type: 'detail', id }
  }
  if (hash === 'write') return { type: 'write' }
  return { type: 'home' }
}

function App() {
  useAuth()

  const [view, setView] = useState<View>(parseHash)

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
      <Nav 
        active={view.type === 'home' ? 'home' : 'community'} 
        onNavigate={navigate} 
      />
      <main className="flex-1">
        {view.type === 'home' && (
          <LandingPage 
            onNavigate={navigate} 
            onPostClick={(id) => navigate(`post/${id}`)}
          />
        )}
        {view.type === 'community' && (
          <PostList
            onPostClick={(id) => navigate(`post/${id}`)}
            onWriteClick={() => navigate('write')}
          />
        )}
        {view.type === 'detail' && (
          <PostDetail
            id={view.id}
            onBack={() => navigate('community')}
          />
        )}
        {view.type === 'write' && (
          <PostEditor
            onCancel={() => navigate('community')}
            onSuccess={(id) => navigate(`post/${id}`)}
          />
        )}
      </main>
      <Footer />
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
