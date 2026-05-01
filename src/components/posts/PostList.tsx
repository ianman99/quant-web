import { usePosts } from '../../hooks/usePosts'
import { useAuthStore } from '../../store/authStore'
import type { Post } from '../../types'

interface PostListProps {
  onPostClick: (id: string) => void
  onWriteClick: () => void
}

function PostRow({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <button className="post-row" onClick={onClick} style={{ gridTemplateColumns: '1fr 120px 80px 80px' }}>
      <span className="post-title serif">{post.title}</span>
      <span className="post-author mono">{post.author_name}</span>
      <span className="post-date mono">{post.created_at.slice(0, 10)}</span>
      <span className="post-views mono" style={{ textAlign: 'right' }}>0</span>
    </button>
  )
}

export function PostList({ onPostClick, onWriteClick }: PostListProps) {
  const { data: posts, isLoading } = usePosts('all')
  const user = useAuthStore((s) => s.user)

  return (
    <div className="fade-in">
      <section className="community-head">
        <div className="wrap">
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--accent)' }}>§ </span> Community · Studies &amp; Strategies
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 className="community-h1">Community</h1>
            {user && (
              <button
                onClick={onWriteClick}
                className="filter active mono"
                style={{ marginBottom: '8px', background: 'var(--accent)', borderColor: 'var(--accent)' }}
              >
                + NEW POST
              </button>
            )}
          </div>
          <p className="community-sub">
            멤버들이 작성하는 리서치 노트, 백테스트 결과, 스터디 자료, 그리고 자유로운 토론이 이곳에 작성됩니다. 모든 글은 동호회 내부 공유용이며, 외부 인용 시 작성자에게 문의해주세요.
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="filters" style={{ borderBottom: '1px solid var(--ink)', paddingBottom: '12px' }}>
          <span className="posts-count mono" style={{ marginLeft: 0 }}>{posts?.length ?? 0} entries</span>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 0, paddingBottom: 80 }}>
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
      </div>
    </div>
  )
}
