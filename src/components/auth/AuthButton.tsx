import { useAuth } from '../../hooks/useAuth'

export function AuthButton() {
  const { user, signIn, signOut } = useAuth()

  if (user) {
    const nickname = user.user_metadata?.full_name || user.user_metadata?.user_name || user.email;
    return (
      <>
        {user.user_metadata?.avatar_url && (
          <img
            src={user.user_metadata.avatar_url}
            alt="avatar"
            className="w-8 h-8 rounded-full"
            style={{ border: '1px solid var(--rule)', display: 'block' }}
          />
        )}
        <span className="mono" style={{ 
          fontSize: '13px', 
          color: 'var(--ink-2)', 
          display: 'block',
          whiteSpace: 'nowrap',
          minWidth: 'max-content'
        }}>
          {nickname}
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
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap'
          }}
        >
          LOGOUT
        </button>
      </>
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

