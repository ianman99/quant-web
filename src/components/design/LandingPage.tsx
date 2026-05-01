import { SITE_DATA } from '../../data/siteData';
import { PostRow } from './PostRow';

interface LandingPageProps {
  onNavigate: (hash: string) => void;
  onPostClick: (id: string | number) => void;
}

export function LandingPage({ onNavigate, onPostClick }: LandingPageProps) {
  const data = SITE_DATA;
  const recent = data.posts.slice(0, 5);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-meta mono">
            <span><span className="hero-meta-dot"></span>EST. {data.club.founded}</span>
            <span>{data.club.cohort}</span>
            <span>{data.club.members} MEMBERS</span>
            <span style={{marginLeft:'auto'}}>VOL.01 / 2026</span>
          </div>

          <h1 className="hero-title serif">
            Read the market<br/>
            with <em>data</em>,<br/>
            verify with <em>code</em>.
          </h1>

          <p className="hero-tagline serif" style={{fontStyle:'italic', fontSize: 22}}>
            데이터로 시장을 읽고, 코드로 가설을 검증한다.
            <span style={{display:'block'}} className="hero-tagline-en mono">
              — {data.club.name} {data.club.subname}
            </span>
          </p>

          <div className="hero-foot mono">
            <div className="hero-foot-l">
              <span>
                <em style={{fontStyle:'normal', color:'var(--ink-3)'}}>Society</em>
                <b className="serif">{data.club.subname}</b>
              </span>
              <span>
                <em style={{fontStyle:'normal', color:'var(--ink-3)'}}>Cohort</em>
                <b className="serif">DX School 6th</b>
              </span>
              <span>
                <em style={{fontStyle:'normal', color:'var(--ink-3)'}}>Discipline</em>
                <b className="serif">Quantitative Finance</b>
              </span>
            </div>
            <div>
              scroll <span style={{marginLeft:8}}>↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <div className="wrap">
          <div className="section-eyebrow mono">
            <span className="section-eyebrow-num">§ 01</span>
            <span>About the Society</span>
          </div>

          <div className="about-grid">
            {data.about.map(item => (
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

      {/* Stats and Curriculum */}
      <section className="section">
        <div className="wrap">
          <div className="section-eyebrow mono">
            <span className="section-eyebrow-num">§ 02</span>
            <span>By the Numbers · Curriculum</span>
          </div>

          <div className="split">
            <div>
              <h2 className="split-h serif">
                한 학기 동안<br/>
                우리가 다룬 것들.
              </h2>
              <p className="split-p">
                매 분기 다른 주제를 깊게 파고듭니다. 이론을 페이퍼로 읽고,
                구현을 코드로 옮긴 뒤, 실제 시장 데이터에서 재현 가능한지를
                백테스트로 검증합니다.<span className="fn">†</span>
              </p>
              <p style={{fontSize:11, color:'var(--ink-3)', marginTop: 24, fontStyle:'italic'}}>
                <span className="fn">†</span> 동호회 운영은 학습 목적이며,
                실제 자금 운용은 포함하지 않습니다.
              </p>
            </div>

            <div className="stats">
              {data.stats.map(s => (
                <div className="stat" key={s.k}>
                  <div className="stat-k mono">{s.k}</div>
                  <div className="stat-v serif">{s.v}</div>
                  <div className="stat-note">{s.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="curriculum">
            {data.curriculum.map(c => (
              <div className="curr-row" key={c.q}>
                <span className="curr-q">{c.q} ─</span>
                <span className="curr-title">{c.title}</span>
                <span className="curr-topics">{c.topics}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="section" style={{borderBottom:'none'}}>
        <div className="wrap">
          <div className="section-eyebrow mono">
            <span className="section-eyebrow-num">§ 03</span>
            <span>From the Community</span>
          </div>

          <div className="posts-head">
            <h2 className="posts-head-h">최근 리서치 노트.</h2>
            <button onClick={() => onNavigate('community')} className="posts-head-link">
              View all {data.posts.length} entries →
            </button>
          </div>

          <div className="posts-list">
            {recent.map(post => (
              <PostRow 
                key={post.id} 
                post={post} 
                showPinBadge={true}
                onClick={onPostClick}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
