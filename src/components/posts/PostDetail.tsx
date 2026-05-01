import MDEditor from '@uiw/react-md-editor'
import { usePost, useDeletePost } from '../../hooks/usePosts'
import { useAuthStore } from '../../store/authStore'
import { CATEGORIES } from '../../types'

interface PostDetailProps {
  id: string
  onBack: () => void
}

function categoryLabel(key: string) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key
}

export function PostDetail({ id, onBack }: PostDetailProps) {
  const { data: post, isLoading, error } = usePost(id)
  const user = useAuthStore((s) => s.user)
  const { mutate: deletePost, isPending } = useDeletePost()

  const handleDelete = () => {
    if (!confirm('이 글을 삭제하시겠습니까?')) return
    deletePost(id, { onSuccess: onBack })
  }

  if (isLoading) {
    return (
      <div className="p-6 animate-pulse">
        <div className="h-6 bg-gray-800 rounded w-1/2 mb-4" />
        <div className="h-4 bg-gray-800 rounded w-full mb-2" />
        <div className="h-4 bg-gray-800 rounded w-5/6" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        글을 불러올 수 없습니다.
      </div>
    )
  }

  return (
    <article className="p-6 max-w-4xl">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 mb-6 transition-colors"
      >
        ← 목록으로
      </button>

      <header className="mb-6 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-emerald-400 border border-emerald-400/30 rounded px-2 py-0.5 bg-emerald-400/5">
            {categoryLabel(post.category)}
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-100 mb-3">{post.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {post.author_avatar && (
              <img src={post.author_avatar} alt="" className="w-5 h-5 rounded-full" />
            )}
            <span>{post.author_name}</span>
            <span>·</span>
            <span>{new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {user?.id === post.author_id && (
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="text-xs text-red-400 hover:text-red-300 border border-red-400/30 rounded px-3 py-1 transition-colors disabled:opacity-50"
            >
              삭제
            </button>
          )}
        </div>
      </header>

      <div data-color-mode="dark">
        <MDEditor.Markdown
          source={post.body}
          style={{ backgroundColor: 'transparent', color: '#f3f4f6' }}
        />
      </div>
    </article>
  )
}
