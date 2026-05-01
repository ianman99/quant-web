import { useState } from 'react'
import { usePosts, PAGE_SIZE } from '../../hooks/usePosts'
import { useAuthStore } from '../../store/authStore'
import type { Post } from '../../types'

interface PostListProps {
  onPostClick: (id: string) => void
  onWriteClick: () => void
}

function PostRow({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <button className="post-row" onClick={onClick} style={{ gridTemplateColumns: '1fr 120px 100px' }}>
      <span className="post-title serif">{post.title}</span>
      <span className="post-author mono">{post.author_name}</span>
      <span className="post-date mono" style={{ textAlign: 'right' }}>{post.created_at.slice(0, 10)}</span>
    </button>
  )
}

function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const totalPages = Math.ceil(total / PAGE_SIZE)
  if (totalPages <= 1) return null

  const windowStart = Math.floor(page / 10) * 10
  const windowEnd = Math.min(windowStart + 10, totalPages)
  const pages = Array.from({ length: windowEnd - windowStart }, (_, i) => windowStart + i)

  const btnBase: React.CSSProperties = {
    minWidth: 28,
    height: 28,
    padding: '0 6px',
    fontSize: 12,
    background: 'none',
    border: '1px solid var(--rule)',
    cursor: 'pointer',
    letterSpacing: '0.04em',
  }

  return (
    <div className="mono" style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 0}
        style={{ ...btnBase, color: page === 0 ? 'var(--ink-3)' : 'var(--ink)', cursor: page === 0 ? 'default' : 'pointer' }}
      >
        ←
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          style={{
            ...btnBase,
            background: p === page ? 'var(--ink)' : 'none',
            color: p === page ? 'var(--paper)' : 'var(--ink-3)',
            borderColor: p === page ? 'var(--ink)' : 'var(--rule)',
          }}
        >
          {p + 1}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages - 1}
        style={{ ...btnBase, color: page >= totalPages - 1 ? 'var(--ink-3)' : 'var(--ink)', cursor: page >= totalPages - 1 ? 'default' : 'pointer' }}
      >
        →
      </button>
    </div>
  )
}

export function PostList({ onPostClick, onWriteClick }: PostListProps) {
  const [page, setPage] = useState(0)
  const { data, isLoading } = usePosts('all', page)
  const user = useAuthStore((s) => s.user)

  const posts = data?.posts
  const total = data?.total ?? 0

  const handlePageChange = (p: number) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fade-in">
      <section className="community-head">
        <div className="wrap">
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--accent)' }}>§ </span> Community · Studies &amp; Strategies
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 className="community-h1">Community</h1>
          </div>
          <p className="community-sub">
            멤버들이 작성하는 리서치 노트, 백테스트 결과, 스터디 자료, 그리고 자유로운 토론이 이곳에 작성됩니다. 모든 글은 동호회 내부 공유용이며, 외부 인용 시 작성자에게 문의해주세요.
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="filters" style={{ borderBottom: '1px solid var(--ink)', paddingBottom: '12px' }}>
          <span className="posts-count mono" style={{ marginLeft: 0 }}>{total} posts</span>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 0 }}>
        <div className="posts-list" style={{ borderTop: 'none' }}>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 57,
                  borderBottom: '1px solid var(--rule)',
                  background: 'var(--paper-2)',
                  opacity: 1 - i * 0.12,
                }}
              />
            ))
          ) : !posts || posts.length === 0 ? (
            <div
              style={{ padding: '64px 0', textAlign: 'center', color: 'var(--ink-3)', fontStyle: 'italic' }}
              className="serif"
            >
              게시글이 아직 없습니다.
            </div>
          ) : (
            posts.map((post) => (
              <PostRow key={post.id} post={post} onClick={() => onPostClick(post.id)} />
            ))
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '32px 0 64px' }}>
          <Pagination page={page} total={total} onChange={handlePageChange} />
          <button
            onClick={() => user ? onWriteClick() : alert('로그인이 필요합니다.')}
            className="filter active mono"
            style={{ position: 'absolute', right: 0, background: 'var(--accent)', borderColor: 'var(--accent)' }}
          >
            + NEW POST
          </button>
        </div>
      </div>
    </div>
  )
}
