import { AuthButton } from '../auth/AuthButton'

interface HeaderProps {
  onLogoClick: () => void
}

export function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950 sticky top-0 z-10">
      <button
        onClick={onLogoClick}
        className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-gray-950 text-sm">
          Q
        </div>
        <div>
          <div className="font-semibold text-gray-100 leading-tight">퀀트 동호회</div>
          <div className="text-xs text-gray-500 leading-tight">Quant Investment Club</div>
        </div>
      </button>
      <AuthButton />
    </header>
  )
}
