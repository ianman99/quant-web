import { usePosts } from '../../hooks/usePosts'
import type { CategoryKey, Post } from '../../types'
import { CATEGORIES } from '../../types'

interface PostListProps {
  category: CategoryKey
  onPostClick: (id: string) => void
}

function categoryLabel(key: string) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return '방금 전'
  if (m < 60) return `${m}분 전`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}시간 전`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}일 전`
  return new Date(dateStr).toLocaleDateString('ko-KR')
}

function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="border border-gray-800 rounded-lg p-4 hover:border-gray-600 hover:bg-gray-900/50 cursor-pointer transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2 className="text-gray-100 font-medium text-base leading-snug line-clamp-2">
          {post.title}
        </h2>
        <span className="shrink-0 text-xs text-emerald-400 border border-emerald-400/30 rounded px-2 py-0.5 bg-emerald-400/5">
          {categoryLabel(post.category)}
        </span>
      </div>
      <p className="text-gray-400 text-sm line-clamp-2 mb-3">
        {post.body.replace(/[#*`>_~\[\]]/g, '').slice(0, 120)}
      </p>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {post.author_avatar && (
          <img src={post.author_avatar} alt="" className="w-4 h-4 rounded-full" />
        )}
        <span>{post.author_name}</span>
        <span>·</span>
        <span>{timeAgo(post.created_at)}</span>
      </div>
    </article>
  )
}

export function PostList({ category, onPostClick }: PostListProps) {
  const { data: posts, isLoading, error } = usePosts(category)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border border-gray-800 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-800 rounded w-full mb-1" />
            <div className="h-3 bg-gray-800 rounded w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        글을 불러오는 중 오류가 발생했습니다.
      </div>
    )
  }

  if (!posts?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 text-gray-500">
        <span className="text-4xl">📭</span>
        <p>아직 글이 없습니다. 첫 글을 작성해보세요!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 p-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />
      ))}
    </div>
  )
}
