import { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { useCreatePost, usePost, useUpdatePost } from '../../hooks/usePosts'
import { useThemeStore } from '../../store/themeStore'

interface PostEditorProps {
  id?: string
  onCancel: () => void
  onSuccess: (id: string) => void
}

export function PostEditor({ id, onCancel, onSuccess }: PostEditorProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const theme = useThemeStore((s) => s.theme)

  const { data: existingPost, isLoading: isFetching } = usePost(id ?? '')
  const { mutate: createPost, isPending: isCreating } = useCreatePost()
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost()

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title)
      setBody(existingPost.body)
    }
  }, [existingPost])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return

    const postData = { title: title.trim(), body, category: 'research' }

    if (id) {
      updatePost(
        { id, post: postData },
        { onSuccess: (post) => onSuccess(post.id) }
      )
    } else {
      createPost(
        postData,
        { onSuccess: (post) => onSuccess(post.id) }
      )
    }
  }

  const isPending = isCreating || isUpdating

  if (id && isFetching) {
    return (
      <div className="wrap" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div style={{ height: 48, background: 'var(--paper-2)', marginBottom: 48 }} />
        <div style={{ height: 400, background: 'var(--paper-2)' }} />
      </div>
    )
  }

  return (
    <div className="wrap fade-in" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <header style={{ marginBottom: 48 }}>
        <div className="section-eyebrow mono">
          <span className="section-eyebrow-num">§ {id ? 'EDIT' : 'NEW'}</span>
          <span>{id ? 'Update Research Note' : 'Draft Research Note'}</span>
        </div>
        <h1 className="serif" style={{ fontSize: 38, margin: '16px 0 0', fontWeight: 400 }}>
          {id ? '글 수정하기.' : '새 글 작성.'}
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
            previewOptions={{ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }}
            style={{ border: '1px solid var(--rule)' }}
          />
        </div>

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
            {isPending ? 'SAVING...' : id ? 'UPDATE NOTE' : 'PUBLISH NOTE'}
          </button>
        </div>
      </form>
    </div>
  )
}
