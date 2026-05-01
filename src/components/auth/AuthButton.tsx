import { useAuth } from '../../hooks/useAuth'

export function AuthButton() {
  const { user, signIn, signOut } = useAuth()

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {user.user_metadata?.avatar_url && (
          <img
            src={user.user_metadata.avatar_url}
            alt="avatar"
            className="w-8 h-8 rounded-full"
            style={{ border: '1px solid var(--rule)' }}
          />
        )}
        <span className="mono sm:block" style={{ fontSize: '13px', color: 'var(--ink-2)', display: 'none' }}>
          {user.user_metadata?.user_name ?? user.email}
        </span>
        <button
          onClick={signOut}
          className="mono"
          style={{ 
            fontSize: '11px', 
            color: 'var(--ink-3)', 
            border: '1px solid var(--rule)', 
            background: 'none',
            padding: '4px 12px',
            cursor: 'pointer',
            letterSpacing: '0.04em'
          }}
        >
          LOGOUT
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={signIn}
      className="nav-link mono"
      style={{
        background: 'none',
        border: 'none',
        fontSize: '13px',
        padding: '4px 0',
        cursor: 'pointer',
        letterSpacing: '0.02em',
        textTransform: 'none'
      }}
    >
      Login
    </button>
  )
}

