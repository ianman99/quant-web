import { SITE_DATA } from '../../data/siteData';

export function LandingPage() {
  const data = SITE_DATA;

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-meta mono">
            <span><span className="hero-meta-dot"></span>EST. {data.club.founded}</span>
            <span>{data.club.members} MEMBERS</span>
            <span style={{ marginLeft: 'auto' }}>VOL.01 / 2026</span>
          </div>

          <h1 className="hero-title serif">
            Read the market<br />
            with <em>data</em>,<br />
            excute with <em>logic</em>.
          </h1>

          <div className="hero-foot mono">
            <div className="hero-foot-l">
              <span>
                <em style={{ fontStyle: 'normal', color: 'var(--ink-3)' }}>Program</em>
                <b className="serif">LG전자 DX SCHOOL 6기</b>
              </span>
              <span>
                <em style={{ fontStyle: 'normal', color: 'var(--ink-3)' }}>Organization</em>
                <b className="serif">{data.club.subname}</b>
              </span>
              <span>
                <em style={{ fontStyle: 'normal', color: 'var(--ink-3)' }}>Discipline</em>
                <b className="serif">Quantitative Investment</b>
              </span>
            </div>
            <div>
              scroll <span style={{ marginLeft: 8 }}>↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: About the Organization */}
      <section className="section" id="about">
        <div className="wrap">
          <div className="section-eyebrow mono">
            <span className="section-eyebrow-num">§ 01</span>
            <span>About the Organization</span>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <span className="about-card-num mono">01</span>
              <div className="about-card-en mono">Definition</div>
              <h3 className="about-card-title">퀀트 투자가 무엇인가요?</h3>
              <p className="about-card-body">
                한 마디로 <b>'데이터와 규칙'</b>에 의한 투자입니다. 수학적 공식이나 복잡한 통계 모델부터 나만의 로직을 코딩으로 실행하는 것까지 모두 포함합니다. 사람의 감정을 배제하고 객관적인 근거에 따라 기계적으로 매매하는 모든 방식이 퀀트의 영역입니다.
              </p>
            </div>
            <div className="about-card">
              <span className="about-card-num mono">02</span>
              <div className="about-card-en mono">Requirement</div>
              <h3 className="about-card-title">수학을 잘해야 하나요?</h3>
              <p className="about-card-body">
                아니요, <b>'논리'와 '데이터'</b>를 좋아하신다면 충분합니다. 넓은 의미의 퀀트는 "가설 설정 → 데이터 검증 → 자동 실행"의 과정을 즐기는 것입니다. 고도의 수학보다는 현상을 수치로 해석하려는 시도와 이를 코드로 구현하려는 의지가 더 중요합니다.
              </p>
            </div>
            <div className="about-card">
              <span className="about-card-num mono">03</span>
              <div className="about-card-en mono">Mindset</div>
              <h3 className="about-card-title">우리가 지향하는 가치</h3>
              <p className="about-card-body">
                차트 패턴이나 뉴스에 휘둘리지 않고, 통계적으로 의미 있는 <b>신호(Signal)와 노이즈(Noise)</b>를 구분하는 사고방식을 동료들과 함께 길러냅니다. DX SCHOOL에서 배운 데이터 역량을 자본시장이라는 실험실에서 검증합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: What We Do (Steps) */}
      <section className="section" style={{ borderBottom: 'none' }}>
        <div className="wrap">
          <div className="section-eyebrow mono">
            <span className="section-eyebrow-num">§ 02</span>
            <span>What We Do · 3-Step Process</span>
          </div>

          <div className="split">
            <div>
              <h2 className="split-h serif">
                데이터로 세우고,<br />
                코드로 검증합니다.
              </h2>
              <p className="split-p">
                우리는 직관이 아닌 데이터 기반의 의사결정을 지향합니다.
                매주 투자 가설을 세우고, 과거 데이터를 통해 백테스팅하며,
                실제 시장에서 전략을 실행합니다.
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
            <div className="curr-row">
              <span className="curr-q">STEP 1 ─</span>
              <span className="curr-title">아이디어 빌딩</span>
              <span className="curr-topics">"이런 주식을 사면 돈이 되지 않을까?" 멤버들과 함께 투자 가설을 세웁니다.</span>
            </div>
            <div className="curr-row">
              <span className="curr-q">STEP 2 ─</span>
              <span className="curr-title">백테스팅 검증</span>
              <span className="curr-topics">"과거에도 진짜 돈이 됐는지 코드로 확인해봅시다." 시뮬레이션을 통해 로직을 다듬습니다.</span>
            </div>
            <div className="curr-row">
              <span className="curr-q">STEP 3 ─</span>
              <span className="curr-title">코드 구현 및 평가</span>
              <span className="curr-topics">"실제로 매매해보고 포트폴리오를 평가합니다." 수익률 리뷰와 피드백을 진행합니다.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

