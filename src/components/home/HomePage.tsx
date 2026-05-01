import { usePosts } from '../../hooks/usePosts'
import { CATEGORIES } from '../../types'
import type { Post } from '../../types'

const ABOUT = [
  {
    n: '01',
    titleEn: 'What we do',
    title: '우리는 무엇을 하는가',
    body: '매주 한 편의 퀀트 리서치를 함께 읽고, 가설을 코드로 옮겨 직접 백테스트(Backtest)합니다. 팩터 투자(Factor Investing), 시계열 모델, 대안 데이터(Alternative Data)까지 — DX SCHOOL에서 배운 데이터 역량을 자본시장이라는 실험실에서 검증합니다.',
  },
  {
    n: '02',
    titleEn: 'Why we gather',
    title: '왜 모였는가',
    body: '직관이 아닌 증거(evidence) 기반의 의사결정을 훈련합니다. 차트 패턴이나 뉴스에 휘둘리지 않고, 통계적으로 의미 있는 신호(Signal)와 노이즈(Noise)를 구분하는 사고방식을 동료들과 함께 길러냅니다.',
  },
  {
    n: '03',
    titleEn: 'How we operate',
    title: '어떻게 운영되는가',
    body: '격주 정기 세미나에서 페이퍼 한 편을 발제하고, 다음 회차까지 구현 결과를 공유합니다. 모든 코드와 노트는 내부 저장소에 누적되며, 매 분기 통합 리뷰(Quarterly Review)를 통해 동호회의 가상 포트폴리오 성과를 점검합니다.',
  },
]

const STATS = [
  { k: 'Members', v: '18', note: 'DX School 6기' },
  { k: 'Sessions', v: '24', note: 'since 2025.03' },
  { k: 'Papers', v: '31', note: 'reviewed & replicated' },
  { k: 'Strategies', v: '12', note: 'backtested' },
]

const CURRICULUM = [
  { q: 'Q1', title: 'Foundations', topics: 'Time Series · Returns · Risk Metrics' },
  { q: 'Q2', title: 'Factor Models', topics: 'Fama-French · Carhart · Q-Factor' },
  { q: 'Q3', title: 'Backtesting', topics: 'Vectorbt · Survivorship Bias · Slippage' },
  { q: 'Q4', title: 'Alternative Data', topics: 'NLP on Filings · Sentiment · Macro' },
]

function catLabel(key: string) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key
}

interface HomePageProps {
  onPostClick: (id: string) => void
  onCommunityClick: () => void
}

function PostRow({ post, onClick }: { post: Post; onClick: () => void }) {
  const label = catLabel(post.category)
  return (
    <button className="post-row" onClick={onClick}>
      <span className="post-cat mono" data-cat={label}>{label}</span>
      <span className="post-title serif">{post.title}</span>
      <span className="post-author mono">{post.author_name}</span>
      <span className="post-date mono">{post.created_at.slice(0, 10)}</span>
    </button>
  )
}

export function HomePage({ onPostClick, onCommunityClick }: HomePageProps) {
  const { data: allPosts } = usePosts('all')
  const recent = allPosts?.slice(0, 5) ?? []

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-meta mono">
            <span><span className="hero-meta-dot" />EST. 2025</span>
            <span>6th Cohort</span>
            <span>18 MEMBERS</span>
            <span style={{ marginLeft: 'auto' }}>VOL.01 / 2026</span>
          </div>
          <h1 className="hero-title">
            Read the market<br/>
            with <em>data</em>,<br/>
            verify with <em>code</em>.
          </h1>
          <p className="hero-tagline" style={{ fontStyle: 'italic' }}>
            데이터로 시장을 읽고, 코드로 가설을 검증한다.
            <span className="hero-tagline-en" style={{ display: 'block' }}>
              — LG전자 DX SCHOOL 6기 퀀트 투자 동호회
            </span>
          </p>
          <div className="hero-foot mono">
            <div className="hero-foot-l">
              <span>
                <em style={{ fontStyle: 'normal', color: 'var(--ink-3)' }}>Society</em>
                <b>퀀트 투자 동호회</b>
              </span>
              <span>
                <em style={{ fontStyle: 'normal', color: 'var(--ink-3)' }}>Cohort</em>
                <b>DX School 6th</b>
              </span>
              <span>
                <em style={{ fontStyle: 'normal', color: 'var(--ink-3)' }}>Discipline</em>
                <b>Quantitative Finance</b>
              </span>
            </div>
            <div>scroll <span style={{ marginLeft: 8 }}>↓</span></div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="wrap">
          <div className="section-eyebrow mono">
            <span className="section-eyebrow-num">§ 01</span>
            <span>About the Society</span>
          </div>
          <div className="about-grid">
            {ABOUT.map((item) => (
              <div className="about-card" key={item.n}>
                <span className="about-card-num mono">{item.n}</span>
                <div className="about-card-en mono">{item.titleEn}</div>
                <h3 className="about-card-title">{item.title}</h3>
                <p className="about-card-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Curriculum */}
      <section className="section">
        <div className="wrap">
          <div className="section-eyebrow mono">
            <span className="section-eyebrow-num">§ 02</span>
            <span>By the Numbers · Curriculum</span>
          </div>
          <div className="split">
            <div>
              <h2 className="split-h">
                한 학기 동안<br/>
                우리가 다룬 것들.
              </h2>
              <p className="split-p">
                매 분기 다른 주제를 깊게 파고듭니다. 이론을 페이퍼로 읽고,
                구현을 코드로 옮긴 뒤, 실제 시장 데이터에서 재현 가능한지를
                백테스트로 검증합니다.<span className="fn">†</span>
              </p>
              <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 24, fontStyle: 'italic' }}>
                <span className="fn">†</span> 동호회 운영은 학습 목적이며,
                실제 자금 운용은 포함하지 않습니다.
              </p>
            </div>
            <div className="stats">
              {STATS.map((s) => (
                <div className="stat" key={s.k}>
                  <div className="stat-k mono">{s.k}</div>
                  <div className="stat-v">{s.v}</div>
                  <div className="stat-note">{s.note}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="curriculum">
            {CURRICULUM.map((c) => (
              <div className="curr-row" key={c.q}>
                <span className="curr-q mono">{c.q} ─</span>
                <span className="curr-title">{c.title}</span>
                <span className="curr-topics mono">{c.topics}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="section" style={{ borderBottom: 'none' }}>
        <div className="wrap">
          <div className="section-eyebrow mono">
            <span className="section-eyebrow-num">§ 03</span>
            <span>From the Community</span>
          </div>
          <div className="posts-head">
            <h2 className="posts-head-h">최근 리서치 노트.</h2>
            <button className="posts-head-link mono" onClick={onCommunityClick}>
              View all entries →
            </button>
          </div>
          <div className="posts-list">
            {recent.length > 0 ? (
              recent.map((post) => (
                <PostRow key={post.id} post={post} onClick={() => onPostClick(post.id)} />
              ))
            ) : (
              <div
                style={{ padding: '48px 0', textAlign: 'center', color: 'var(--ink-3)', fontStyle: 'italic' }}
                className="serif"
              >
                아직 게시글이 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap">
          <div className="rule" style={{ marginBottom: 32 }} />
          <div className="footer-grid">
            <div>
              <div className="footer-mark">Quant Lab — DX School 6</div>
              <div style={{ marginTop: 6 }} className="mono">© 2026 · LG전자 DX SCHOOL 6기</div>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              <span className="mono">v 1.0</span>
              <span className="mono">퀀트 투자 동호회</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
