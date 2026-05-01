import { CATEGORIES, type CategoryKey } from '../../types'
import { useAuthStore } from '../../store/authStore'

interface SidebarProps {
  activeCategory: CategoryKey
  onCategoryChange: (key: CategoryKey) => void
  onWriteClick: () => void
}

export function Sidebar({ activeCategory, onCategoryChange, onWriteClick }: SidebarProps) {
  const user = useAuthStore((s) => s.user)

  return (
    <aside className="w-56 shrink-0 border-r border-gray-800 flex flex-col py-4 gap-1">
      {CATEGORIES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key as CategoryKey)}
          className={`text-left px-4 py-2 rounded-md mx-2 text-sm transition-colors ${
            activeCategory === key
              ? 'bg-emerald-500/10 text-emerald-400 font-medium'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
          }`}
        >
          {label}
        </button>
      ))}

      <div className="mt-auto px-2">
        <button
          onClick={onWriteClick}
          disabled={!user}
          title={!user ? 'GitHub로 로그인해야 글을 쓸 수 있습니다.' : undefined}
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-gray-950 font-medium text-sm rounded-md py-2 transition-colors"
        >
          <span className="text-lg leading-none">+</span>
          글쓰기
        </button>
      </div>
    </aside>
  )
}
