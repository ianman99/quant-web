export interface Post {
  id: number | string;
  cat: string;
  title: string;
  author: string;
  date: string;
  views: number;
  excerpt?: string;
  pinned?: boolean;
}

export const SITE_DATA = {
  club: {
    name: "LG전자 DX SCHOOL 6기",
    subname: "퀀트 투자 동호회",
    nameEn: "Quantitative Investment Society",
    tagline: "데이터로 시장을 읽고, 코드로 가설을 검증한다.",
    taglineEn: "Read the market with data, verify hypotheses with code.",
    founded: "2025",
    cohort: "6th Cohort",
    members: 18,
  },

  about: [
    {
      n: "01",
      title: "우리는 무엇을 하는가",
      titleEn: "What we do",
      body: "매주 한 편의 퀀트 리서치를 함께 읽고, 가설을 코드로 옮겨 직접 백테스트(Backtest)합니다. 팩터 투자(Factor Investing), 시계열 모델, 대안 데이터(Alternative Data)까지 — DX SCHOOL에서 배운 데이터 역량을 자본시장이라는 실험실에서 검증합니다.",
    },
    {
      n: "02",
      title: "왜 모였는가",
      titleEn: "Why we gather",
      body: "직관이 아닌 증거(evidence) 기반의 의사결정을 훈련합니다. 차트 패턴이나 뉴스에 휘둘리지 않고, 통계적으로 의미 있는 신호(Signal)와 노이즈(Noise)를 구분하는 사고방식을 동료들과 함께 길러냅니다.",
    },
    {
      n: "03",
      title: "어떻게 운영되는가",
      titleEn: "How we operate",
      body: "격주 정기 세미나에서 페이퍼 한 편을 발제하고, 다음 회차까지 구현 결과를 공유합니다. 모든 코드와 노트는 내부 저장소에 누적되며, 매 분기 통합 리뷰(Quarterly Review)를 통해 동호회의 가상 포트폴리오 성과를 점검합니다.",
    },
  ],

  stats: [
    { k: "Members", v: "18", note: "DX School 6기" },
    { k: "Sessions", v: "24", note: "since 2025.03" },
    { k: "Papers", v: "31", note: "reviewed & replicated" },
    { k: "Strategies", v: "12", note: "backtested" },
  ],

  curriculum: [
    { q: "Q1", title: "Foundations", topics: "Time Series · Returns · Risk Metrics" },
    { q: "Q2", title: "Factor Models", topics: "Fama-French · Carhart · Q-Factor" },
    { q: "Q3", title: "Backtesting", topics: "Vectorbt · Survivorship Bias · Slippage" },
    { q: "Q4", title: "Alternative Data", topics: "NLP on Filings · Sentiment · Macro" },
  ],

  posts: [
    {
      id: 1,
      cat: "Research",
      title: "모멘텀 팩터의 한국 시장 적용 — 12-1 vs 6-1 리밸런싱 비교",
      author: "김도윤",
      date: "2026-04-28",
      views: 142,
      excerpt: "Jegadeesh & Titman (1993)의 모멘텀 전략을 KOSPI 200 유니버스에 적용하고, 룩백 윈도우 변화에 따른 샤프 지수의 민감도를 측정했다.",
      pinned: true,
    },
    {
      id: 2,
      cat: "Backtest",
      title: "Low-Volatility Anomaly: 변동성 역가중 포트폴리오 9년 백테스트",
      author: "박서연",
      date: "2026-04-25",
      views: 98,
    },
    {
      id: 3,
      cat: "Paper",
      title: "[발제] Lopez de Prado, 'The 7 Reasons Most ML Funds Fail' (2018)",
      author: "이준호",
      date: "2026-04-22",
      views: 87,
    },
    {
      id: 4,
      cat: "Research",
      title: "FnGuide 컨센서스 리비전을 활용한 어닝 서프라이즈 예측",
      author: "최지원",
      date: "2026-04-19",
      views: 73,
    },
    {
      id: 5,
      cat: "Note",
      title: "vectorbt에서 거래비용 모델링할 때 자주 하는 실수 3가지",
      author: "정현우",
      date: "2026-04-15",
      views: 211,
    },
    {
      id: 6,
      cat: "Backtest",
      title: "Cross-Sectional Mean Reversion — 1주 보유 기준 t-stat 분포",
      author: "한예린",
      date: "2026-04-12",
      views: 64,
    },
    {
      id: 7,
      cat: "Paper",
      title: "[발제] Asness et al., 'Quality Minus Junk' (2019) 리뷰 노트",
      author: "김도윤",
      date: "2026-04-08",
      views: 119,
    },
    {
      id: 8,
      cat: "Research",
      title: "거래량 가중 VWAP 이탈을 신호로 사용할 수 있을까",
      author: "오민석",
      date: "2026-04-05",
      views: 56,
    },
    {
      id: 9,
      cat: "Note",
      title: "Survivorship Bias 보정 — 상장폐지 종목 데이터 수집 파이프라인",
      author: "박서연",
      date: "2026-04-01",
      views: 134,
    },
    {
      id: 10,
      cat: "Discussion",
      title: "한국 시장에서 Size 팩터가 사라진 이유에 대한 논의",
      author: "이준호",
      date: "2026-03-28",
      views: 92,
    },
    {
      id: 11,
      cat: "Backtest",
      title: "Dual Momentum (Antonacci) 한국·미국 듀얼 적용기",
      author: "정현우",
      date: "2026-03-24",
      views: 178,
    },
    {
      id: 12,
      cat: "Research",
      title: "FOMC 의사록 텍스트의 hawkish/dovish 점수화 — KoBERT 활용",
      author: "최지원",
      date: "2026-03-20",
      views: 145,
    },
  ],
};
