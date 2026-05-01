import MDEditor from '@uiw/react-md-editor'
import { usePost, useDeletePost } from '../../hooks/usePosts'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'

interface PostDetailProps {
  id: string
  onBack: () => void
}

export function PostDetail({ id, onBack }: PostDetailProps) {
  const { data: post, isLoading, error } = usePost(id)
  const user = useAuthStore((s) => s.user)
  const theme = useThemeStore((s) => s.theme)
  const { mutate: deletePost, isPending } = useDeletePost()

  const handleDelete = () => {
    if (!confirm('이 글을 삭제하시겠습니까?')) return
    deletePost(id, { onSuccess: onBack })
  }

  if (isLoading) {
    return (
      <div className="wrap" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div style={{ height: 20, background: 'var(--paper-2)', borderRadius: 2, width: '40%', marginBottom: 48 }} />
        <div style={{ height: 36, background: 'var(--paper-2)', borderRadius: 2, width: '70%', marginBottom: 16 }} />
        <div style={{ height: 16, background: 'var(--paper-2)', borderRadius: 2, width: '100%', marginBottom: 8 }} />
        <div style={{ height: 16, background: 'var(--paper-2)', borderRadius: 2, width: '83%' }} />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="wrap serif" style={{ paddingTop: 64, textAlign: 'center', color: 'var(--ink-3)', fontStyle: 'italic' }}>
        글을 불러올 수 없습니다.
      </div>
    )
  }

  return (
    <article style={{ paddingBottom: 80 }}>
      <div className="wrap" style={{ paddingTop: 48 }}>
        <button
          onClick={onBack}
          className="mono"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: 'var(--ink-3)',
            fontSize: 12,
            letterSpacing: '0.06em',
            marginBottom: 48,
          }}
        >
          ← Community
        </button>

        <header style={{ marginBottom: 48, paddingBottom: 32, borderBottom: '1px solid var(--rule)' }}>
          <h1
            style={{
              fontFamily: 'Newsreader, serif',
              fontSize: 'clamp(24px, 4vw, 42px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              margin: '0 0 24px',
              fontWeight: 400,
              color: 'var(--ink)',
            }}
          >
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div
              className="mono"
              style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--ink-3)' }}
            >
              {post.author_avatar && (
                <img src={post.author_avatar} alt="" style={{ width: 22, height: 22, borderRadius: '50%' }} />
              )}
              <span>{post.author_name}</span>
              <span>·</span>
              <span>
                {new Date(post.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            {user?.id === post.author_id && (
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => window.location.hash = `edit/${id}`}
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'var(--ink-2)',
                    background: 'none',
                    border: '1px solid var(--rule)',
                    padding: '4px 12px',
                    cursor: 'pointer',
                    letterSpacing: '0.06em',
                  }}
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'var(--accent)',
                    background: 'none',
                    border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                    padding: '4px 12px',
                    cursor: 'pointer',
                    opacity: isPending ? 0.5 : 1,
                    letterSpacing: '0.06em',
                  }}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </header>

        <div data-color-mode={theme}>
          <MDEditor.Markdown
            source={post.body}
            style={{ backgroundColor: 'transparent', color: 'var(--ink)', fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>
    </article>
  )
}
