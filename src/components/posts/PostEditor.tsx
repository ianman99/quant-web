import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { useCreatePost } from '../../hooks/usePosts'
import { CATEGORIES, type CategoryKey } from '../../types'

interface PostEditorProps {
  onCancel: () => void
  onSuccess: (id: string) => void
}

const WRITABLE_CATEGORIES = CATEGORIES.filter((c) => c.key !== 'all')

export function PostEditor({ onCancel, onSuccess }: PostEditorProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState<CategoryKey>('strategy')

  const { mutate: createPost, isPending, error } = useCreatePost()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    createPost(
      { title: title.trim(), body, category },
      { onSuccess: (post) => onSuccess(post.id) }
    )
  }

  return (
    <div className="p-6 max-w-4xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-100">새 글 작성</h2>
        <button
          onClick={onCancel}
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          취소
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
            className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500 text-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryKey)}
            className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2.5 text-gray-100 focus:outline-none focus:border-emerald-500 text-sm"
          >
            {WRITABLE_CATEGORIES.map(({ key, label }) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div data-color-mode="dark">
          <MDEditor
            value={body}
            onChange={(val) => setBody(val ?? '')}
            height={420}
            preview="live"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm">{(error as Error).message}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200 border border-gray-700 rounded-md transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isPending || !title.trim() || !body.trim()}
            className="px-5 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-gray-950 rounded-md transition-colors"
          >
            {isPending ? '게시 중...' : '게시하기'}
          </button>
        </div>
      </form>
    </div>
  )
}
