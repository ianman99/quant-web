import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { useCreatePost } from '../../hooks/usePosts'
import { useThemeStore } from '../../store/themeStore'

interface PostEditorProps {
  onCancel: () => void
  onSuccess: (id: string) => void
}

export function PostEditor({ onCancel, onSuccess }: PostEditorProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const theme = useThemeStore((s) => s.theme)

  const { mutate: createPost, isPending, error } = useCreatePost()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    createPost(
      { title: title.trim(), body, category: 'research' },
      { onSuccess: (post) => onSuccess(post.id) }
    )
  }

  return (
    <div className="wrap fade-in" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <header style={{ marginBottom: 48 }}>
        <div className="section-eyebrow mono">
          <span className="section-eyebrow-num">§ NEW</span>
          <span>Draft Research Note</span>
        </div>
        <h1 className="serif" style={{ fontSize: 38, margin: '16px 0 0', fontWeight: 400 }}>
          새 글 작성.
        </h1>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
            className="serif"
            style={{
              flex: 1,
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              padding: '14px 18px',
              fontSize: 20,
              color: 'var(--ink)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--rule)')}
          />
        </div>

        <div data-color-mode={theme}>
          <MDEditor
            value={body}
            onChange={(val) => setBody(val ?? '')}
            height={480}
            preview="live"
            style={{ border: '1px solid var(--rule)' }}
          />
        </div>

        {error && (
          <p className="mono" style={{ color: 'var(--accent)', fontSize: 12 }}>{(error as Error).message}</p>
        )}

        <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            className="mono"
            style={{
              padding: '12px 24px',
              fontSize: 12,
              background: 'none',
              border: '1px solid var(--rule)',
              color: 'var(--ink-3)',
              cursor: 'pointer',
              letterSpacing: '0.06em',
            }}
          >
            CANCEL
          </button>
          <button
            type="submit"
            disabled={isPending || !title.trim() || !body.trim()}
            className="mono"
            style={{
              padding: '12px 32px',
              fontSize: 12,
              background: 'var(--ink)',
              color: 'var(--paper)',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.06em',
              opacity: isPending ? 0.5 : 1,
            }}
          >
            {isPending ? 'PUBLISHING...' : 'PUBLISH NOTE'}
          </button>
        </div>
      </form>
    </div>
  )
}
