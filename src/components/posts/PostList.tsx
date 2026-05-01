import { useState, useMemo } from 'react'
import { usePosts } from '../../hooks/usePosts'
import { useAuthStore } from '../../store/authStore'
import { CATEGORIES } from '../../types'
import type { Post, CategoryKey } from '../../types'

const WRITABLE_CATS = CATEGORIES.filter((c) => c.key !== 'all')

interface PostListProps {
  onPostClick: (id: string) => void
  onWriteClick: () => void
}

function catLabel(key: string) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key
}

function PostRow({ post, onClick }: { post: Post; onClick: () => void }) {
  const label = catLabel(post.category)
  return (
    <button className="post-row" onClick={onClick}>
      <span className="post-cat mono" data-cat={label}>{label}</span>
      <span className="post-title serif">{post.title}</span>
      <span className="post-author mono">{post.author_name}</span>
      <span className="post-date mono">{post.created_at.slice(0, 10)}</span>
    </button>
  )
}

export function PostList({ onPostClick, onWriteClick }: PostListProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryKey>('all')
  const { data: posts, isLoading } = usePosts('all')
  const user = useAuthStore((s) => s.user)

  const filtered = useMemo(() => {
    if (!posts) return []
    if (activeFilter === 'all') return posts
    return posts.filter((p) => p.category === activeFilter)
  }, [posts, activeFilter])

  return (
    <>
      <section className="community-head">
        <div className="wrap">
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--accent)' }}>§ </span> Community · Reading Notes &amp; Replications
          </div>
          <h1 className="community-h1">
            Community.<br />
            <span style={{ color: 'var(--ink-3)', fontStyle: 'italic' }}>리서치 노트 · 백테스트 · 논의</span>
          </h1>
          <p className="community-sub">
            멤버들이 매주 작성하는 리서치 노트, 백테스트 결과, 발제 자료, 그리고 자유로운 토론이 이곳에 누적됩니다.
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="filters">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`filter mono${activeFilter === c.key ? ' active' : ''}`}
              onClick={() => setActiveFilter(c.key as CategoryKey)}
            >
              {c.label}
            </button>
          ))}
          <span className="posts-count mono">{filtered.length} entries</span>
          {user && (
            <button
              onClick={onWriteClick}
              style={{
                padding: '6px 16px',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                fontSize: 11,
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              + 새 글
            </button>
          )}
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="posts-list">
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
          ) : filtered.length === 0 ? (
            <div
              style={{ padding: '64px 0', textAlign: 'center', color: 'var(--ink-3)', fontStyle: 'italic' }}
              className="serif"
            >
              해당 카테고리의 글이 아직 없습니다.
            </div>
          ) : (
            filtered.map((post) => (
              <PostRow key={post.id} post={post} onClick={() => onPostClick(post.id)} />
            ))
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="wrap">
          <div className="rule" style={{ marginBottom: 32 }} />
          <div className="footer-grid">
            <div>
              <div className="footer-mark">Quant Lab — DX School 6</div>
              <div style={{ marginTop: 6 }} className="mono">© 2026 · LG전자 DX SCHOOL 6기</div>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              <span className="mono">v 1.0</span>
              <span className="mono">퀀트 투자 동호회</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
