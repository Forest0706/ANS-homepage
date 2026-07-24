"use client";

import { useEffect, useState } from "react";
import InfinityFlow from "./InfinityFlow";
import InquiryModal, { type InquiryType } from "./InquiryModal";
import ThsLoginModal from "./ThsLoginModal";
import "./styles.css";

type Language = "en" | "zh" | "ja";

const copy = {
  en: {
    nav: ["Why ANS", "Twin Hub", "Solutions", "Stories", "About", "Recruit"],
    contact: "Start a conversation",
    ths: "THS",
    eyebrow: "China × Japan · Connected supply chains",
    heroLead: "We Create the Answer",
    heroMid: "for Your Supply Chain.",
    heroEnd: "Together.",
    positioning: "Your Supply Chain Partner",
    heroBody:
      "We connect China and Japan to build supply chains that are more efficient, resilient, and ready to evolve with your business.",
    explore: "Explore Twin Hub",
    talk: "Talk to ANS",
    flowLabels: ["INVENTORY", "INFORMATION", "LOGISTICS", "VISIBILITY"],
    whyKicker: "Why ANS",
    whyTitleA: "Every business is different.",
    whyTitleB: "Its supply chain should be, too.",
    whyBody:
      "Growth changes the answer. ANS works alongside your team to understand, design, and continuously improve the supply chain that fits your business now—and where it is going next.",
    steps: [
      ["01", "Understand", "Your model, market, product, and priorities."],
      ["02", "Design", "A practical answer built around your reality."],
      ["03", "Optimize", "Every handoff, flow, and decision improves."],
      ["04", "Grow", "A supply chain that evolves with the business."],
    ],
    twinKicker: "Our core approach",
    twinTitle: "Two hubs. One connected supply chain.",
    twinBody:
      "Twin Hub connects operations across China and Japan—not as two separate warehouses, but as one coordinated system for inventory, information, logistics, and service.",
    china: "China Hub",
    japan: "Japan Hub",
    chinaDetail: ["Qingdao", "20,000㎡", "Origin · Processing"],
    japanDetail: ["Yokohama", "8,000㎡", "Market · Fulfillment"],
    twinPoints: [
      ["Inventory", "Position stock with greater clarity across both markets."],
      ["Information", "Keep orders, status, and decisions moving together."],
      ["Logistics", "Coordinate freight, customs, warehousing, and delivery."],
      ["Visibility", "See the whole journey, not disconnected handoffs."],
    ],
    solKicker: "What we do",
    solTitle: "From first-mile decisions to last-mile delivery.",
    solutions: [
      ["01", "Supply Planning", "Design the right operating model for every growth stage."],
      ["02", "Global Freight", "Coordinate China–Japan ocean and air freight as one flow."],
      ["03", "Warehousing", "Optimize storage, inventory, and fulfillment with flexibility."],
      ["04", "Customs Support", "Support fast, compliant, and predictable customs movement."],
      ["05", "Order Fulfillment", "Connect every step from order receipt to final delivery."],
      ["06", "Data Integration", "Connect operations and data for clearer daily decisions."],
    ],
    storyKicker: "Success stories",
    storyTitle: "A practical Twin Hub scenario for a growing cross-border brand.",
    storyBody: "This reference scenario illustrates how ANS can redesign a China–Japan fulfillment flow. It is a model case, not a published customer result.",
    storyTag: "REFERENCE SCENARIO",
    storyIndustry: "Cross-border consumer goods",
    storySteps: [
      ["Challenge", "Excess stock in Japan, slow relabeling, and fragmented order visibility."],
      ["Design", "Hold flexible stock in Qingdao and maintain a focused buffer in Yokohama."],
      ["Operate", "Connect inspection, labeling, replenishment, customs, and fulfillment."],
      ["Outcome", "Lower exposure, faster response, and one view of inventory and orders."],
    ],
    storyResults: ["Lean Japan stock", "Flexible replenishment", "One operating view"],
    storyCta: "Discuss your challenge",
    aboutKicker: "About ANS",
    aboutTitle: "A long-term partner for a supply chain that never stands still.",
    aboutBody:
      "Answer Supply Chain supports China–Japan trade through international freight, warehousing, customs, fulfillment, and continuous supply chain improvement. We believe the best answer is not delivered once. It is created together, then made better over time.",
    companyFacts: [
      ["Company name", "Answer Supply Chain Co., Ltd."],
      ["Established", "June 2024"],
      ["Capital", "JPY 50 million"],
      ["Japan Hub", "Yokohama · 8,000㎡"],
      ["China Hub", "Qingdao · 20,000㎡"],
      ["Head office", "Landport Yokohama Sugita 1F"],
      ["Business", "China–Japan international logistics"],
    ],
    recruitKicker: "Recruit",
    recruitTitle: "We're looking for teammates to grow China–Japan supply chains with us.",
    recruitBody: "ANS is building a practical, connected supply chain across China and Japan. We welcome people who want to learn, take ownership, and improve operations together.",
    recruitRoles: [
      ["Import / Export Operations", "Trade documents, customs coordination, and customer support."],
      ["Warehouse Operations", "Receiving, inspection, labeling, shipping, and inventory control."],
      ["Accounting", "Billing, payments, bookkeeping, and monthly closing support."],
    ],
    recruitButton: "Apply now",
    finalKicker: "Build what fits",
    finalTitleA: "Ready to create the answer",
    finalTitleB: "for your supply chain?",
    finalButton: "Contact ANS",
    footerLine: "Answer Supply Chain · Your Supply Chain Partner",
  },
  zh: {
    nav: ["为什么选择 ANS", "Twin Hub", "解决方案", "客户案例", "关于我们", "人才招聘"],
    contact: "开始沟通",
    ths: "THS",
    eyebrow: "连接中国与日本 · 协同供应链",
    heroLead: "与您共同创造",
    heroMid: "最适合企业发展的",
    heroEnd: "供应链答案。",
    positioning: "您的供应链合作伙伴",
    heroBody: "我们连接中国与日本，与企业共同打造更高效、更稳定、更具韧性，并能持续进化的供应链体系。",
    explore: "了解 Twin Hub",
    talk: "联系 ANS",
    flowLabels: ["库存", "信息", "物流", "可视化"],
    whyKicker: "为什么选择 ANS",
    whyTitleA: "每一家企业都不同。",
    whyTitleB: "供应链也不应只有一种答案。",
    whyBody: "企业成长，答案也在改变。ANS 深入理解您的业务，与团队共同设计并持续优化适合企业当下、也能支持未来发展的供应链。",
    steps: [
      ["01", "理解", "理解商业模式、市场、产品与优先事项。"],
      ["02", "设计", "围绕真实业务，共同创造可执行的答案。"],
      ["03", "优化", "持续改善每一次衔接、流动与决策。"],
      ["04", "成长", "让供应链与企业共同持续进化。"],
    ],
    twinKicker: "我们的核心方法",
    twinTitle: "两个 Hub，一条协同供应链。",
    twinBody: "Twin Hub 将中国与日本的运营连接起来——不是两个彼此独立的仓库，而是一套让库存、信息、物流与服务共同协同的体系。",
    china: "中国 Hub",
    japan: "日本 Hub",
    chinaDetail: ["青岛", "20,000㎡", "起运 · 加工"],
    japanDetail: ["横滨", "8,000㎡", "市场 · 履约"],
    twinPoints: [
      ["库存", "更清晰地配置与管理中日两地库存。"],
      ["信息", "让订单、状态与决策始终同步流动。"],
      ["物流", "协同运输、通关、仓储与末端配送。"],
      ["可视化", "看见完整链路，而不是割裂的环节。"],
    ],
    solKicker: "我们的能力",
    solTitle: "从第一步决策，到最后一公里交付。",
    solutions: [
      ["01", "供应链规划", "围绕企业发展阶段设计合适的运营模式。"],
      ["02", "国际运输", "统一协同中日之间的海运与航空运输。"],
      ["03", "仓储运营", "灵活优化仓储、库存管理与履约运营。"],
      ["04", "通关支持", "支持合规、高效且可预期的跨境通关。"],
      ["05", "跨境履约", "从订单接收到最终配送实现全程连接。"],
      ["06", "数据协同", "连接运营与数据，让日常决策更清晰。"],
    ],
    storyKicker: "成功案例",
    storyTitle: "一个面向成长型跨境品牌的 Twin Hub 典型场景。",
    storyBody: "该场景用于说明 ANS 如何重新设计中日履约流程，属于方案示例，并非对外发布的真实客户成果。",
    storyTag: "典型场景 · 方案示例",
    storyIndustry: "跨境消费品",
    storySteps: [
      ["客户挑战", "日本库存偏高，换标加工缓慢，订单状态分散。"],
      ["共同设计", "青岛保留弹性库存，横滨维持精简周转库存。"],
      ["协同运营", "连接检品、换标、补货、通关与末端履约。"],
      ["预期价值", "降低库存压力，加快响应，并统一库存与订单视图。"],
    ],
    storyResults: ["精简日本库存", "灵活动态补货", "统一运营视图"],
    storyCta: "聊聊您的挑战",
    aboutKicker: "关于 ANS",
    aboutTitle: "与不断变化的供应链长期同行。",
    aboutBody: "Answer Supply Chain 通过国际运输、仓储、通关、履约及持续优化，支持中日供应链协同。我们相信，最好的答案不是一次性交付，而是与客户共同创造，并在实践中持续改善。",
    companyFacts: [
      ["公司正式名称", "Answer Supply Chain Co., Ltd.（アンササプライチェーン株式会社）"],
      ["成立时间", "2024 年 6 月"],
      ["注册资本", "5,000 万日元"],
      ["日本 Hub", "横滨 · 8,000㎡"],
      ["中国 Hub", "青岛 · 20,000㎡"],
      ["公司地址", "Landport 横滨杉田 1F"],
      ["主营业务", "中日国际供应链服务"],
    ],
    recruitKicker: "人才招聘",
    recruitTitle: "正在招募共同培育中日供应链的伙伴。",
    recruitBody: "ANS 正在建设连接中国与日本的供应链体系。我们期待愿意学习、主动担当，并与团队持续改善运营的伙伴加入。",
    recruitRoles: [
      ["进出口业务担当", "负责贸易文件、通关协调及客户沟通。"],
      ["仓库运营担当", "负责入出库、检品、贴标、发货及库存管理。"],
      ["财务会计担当", "负责账务处理、开票付款及月度结算支持。"],
    ],
    recruitButton: "立即申请",
    finalKicker: "创造最适合的答案",
    finalTitleA: "准备好共同创造",
    finalTitleB: "您的供应链答案了吗？",
    finalButton: "联系 ANS",
    footerLine: "Answer Supply Chain · 您的供应链合作伙伴",
  },
  ja: {
    nav: ["ANSを選ぶ理由", "Twin Hub", "ソリューション", "導入事例", "私たちについて", "採用情報"],
    contact: "相談する",
    ths: "THS",
    eyebrow: "中国 × 日本 · つながるサプライチェーン",
    heroLead: "お客様とともに、",
    heroMid: "企業の成長に最適な",
    heroEnd: "サプライチェーンの答えを創ります。",
    positioning: "お客様のサプライチェーンパートナー",
    heroBody: "中国と日本をつなぎ、より効率的で、安定性と強靭性を備え、企業とともに進化するサプライチェーンを構築します。",
    explore: "Twin Hubを見る",
    talk: "ANSに相談する",
    flowLabels: ["在庫", "情報", "物流", "可視化"],
    whyKicker: "ANSを選ぶ理由",
    whyTitleA: "企業は、一社一社違う。",
    whyTitleB: "サプライチェーンも同じです。",
    whyBody: "企業の成長とともに、最適な答えも変わります。ANSは事業を深く理解し、今と未来に合うサプライチェーンをお客様とともに設計し、継続的に改善します。",
    steps: [
      ["01", "理解する", "事業、マーケット、製品、優先課題を理解します。"],
      ["02", "設計する", "現場に即した実行可能な答えを共創します。"],
      ["03", "改善する", "連携、流れ、意思決定を継続的に磨きます。"],
      ["04", "成長する", "企業とともに進化する仕組みを育てます。"],
    ],
    twinKicker: "私たちのコアアプローチ",
    twinTitle: "二つのHub。\u200B一つにつながる\u200Bサプライチェーン。",
    twinBody: "Twin Hubは、中国と日本のオペレーションを結びます。二つの独立した倉庫ではなく、在庫・情報・物流・サービスが一体となって動く仕組みです。",
    china: "中国 Hub",
    japan: "日本 Hub",
    chinaDetail: ["青島", "20,000㎡", "起点 · 流通加工"],
    japanDetail: ["横浜", "8,000㎡", "市場 · フルフィルメント"],
    twinPoints: [
      ["在庫", "両市場の在庫を、より明確に配置・管理。"],
      ["情報", "受注、進捗、判断を同じ流れで共有。"],
      ["物流", "輸送、通関、倉庫、配送を一体的に連携。"],
      ["可視化", "分断された工程ではなく、全体を把握。"],
    ],
    solKicker: "私たちにできること",
    solTitle: "最初の判断から、ラストマイルまで。",
    solutions: [
      ["01", "物流設計", "成長段階に合う運営モデルを設計。"],
      ["02", "国際輸送", "日中間の海上・航空輸送を一体運営。"],
      ["03", "倉庫運営", "保管・在庫・出荷を柔軟に最適化。"],
      ["04", "通関支援", "通関手続きを確実かつ迅速に支援。"],
      ["05", "越境出荷", "受注から最終配送まで一貫して連携。"],
      ["06", "情報連携", "データと現場をつなぎ判断を可視化。"],
    ],
    storyKicker: "導入事例",
    storyTitle: "成長する越境ブランドを想定した、Twin Hubの典型シナリオ。",
    storyBody: "ANSによる日中フルフィルメント再設計の考え方を示す参考シナリオです。公開済みのお客様実績ではありません。",
    storyTag: "参考シナリオ · モデルケース",
    storyIndustry: "越境消費財ブランド",
    storySteps: [
      ["課題", "日本在庫の過多、ラベル作業の遅れ、受注情報の分断。"],
      ["設計", "青島に柔軟在庫を置き、横浜は必要量に絞って運用。"],
      ["実行", "検品・ラベル・補充・通関・出荷を一つの流れに。"],
      ["期待価値", "在庫負担を抑え、対応を速め、情報を一元化。"],
    ],
    storyResults: ["日本在庫を適正化", "需要連動で柔軟補充", "受注・在庫を一元管理"],
    storyCta: "課題を相談する",
    aboutKicker: "ANSについて",
    aboutTitle: "変化し続けるサプライチェーンの、長期的なパートナー。",
    aboutBody: "Answer Supply Chainは、国際輸送、倉庫、通関、フルフィルメント、継続改善を通じて日中間のサプライチェーンを支援します。最適な答えは一度で完成するのではなく、お客様とともに創り、磨き続けるものだと考えています。",
    companyFacts: [
      ["正式名称", "アンササプライチェーン株式会社"],
      ["設立", "2024年6月"],
      ["資本金", "5,000万円"],
      ["日本 Hub", "横浜 · 8,000㎡"],
      ["中国 Hub", "青島 · 20,000㎡"],
      ["所在地", "横浜市金沢区 · Landport横浜杉田1F"],
      ["事業内容", "日中間の国際物流サービス全般"],
    ],
    recruitKicker: "採用情報",
    recruitTitle: "日中サプライチェーンを、ともに育てる仲間を募集しています。",
    recruitBody: "ANSは、中国と日本をつなぐ新しいサプライチェーンを構築しています。学び、責任を持ち、チームとともに現場を改善できる仲間を募集しています。",
    recruitRoles: [
      ["輸出入業務担当", "輸出入書類、通関手続き、顧客対応を担当。"],
      ["倉庫作業員", "入出庫、検品、ラベル貼り、在庫管理を担当。"],
      ["経理担当者", "帳簿処理、請求・支払管理、月次業務を担当。"],
    ],
    recruitButton: "応募する",
    finalKicker: "最適な答えを創る",
    finalTitleA: "サプライチェーンの答えを、",
    finalTitleB: "私たちとともに創りませんか。",
    finalButton: "ANSに相談する",
    footerLine: "Answer Supply Chain · お客様のサプライチェーンパートナー",
  },
} as const;

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? "compact" : ""}`} aria-label="ANS — Answer Supply Chain">
      <img src="/ans-logo-transparent-v2.png" alt="ANS — Answer Supply Chain" />
    </span>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("ja");
  const [menu, setMenu] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>("consultation");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const t = copy[lang];

  const openLoginModal = () => {
    setMenu(false);
    setLoginOpen(true);
  };

  const openInquiryModal = (type: InquiryType = "consultation", message = "") => {
    setMenu(false);
    setInquiryType(type);
    setInquiryMessage(message);
    setInquiryOpen(true);
  };

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang === "ja" ? "ja" : "en";
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    return () => reveal.disconnect();
  }, [lang]);

  const ids = ["why", "twin-hub", "solutions", "stories", "about", "recruit"];

  return (
    <main className={`site lang-${lang}`}>
      <header className="nav-wrap">
        <a href="#top" className="logo-link"><BrandMark /></a>
        <nav className={`desktop-nav ${menu ? "nav-open" : ""}`} aria-label="Primary navigation">
          {t.nav.map((item, i) => <a key={item} href={`#${ids[i]}`} onClick={() => setMenu(false)}>{item}</a>)}
          <button type="button" className="nav-inquiry-mobile" onClick={() => openInquiryModal("consultation")}>
            {t.contact}
          </button>
        </nav>
        <div className="nav-actions">
          <button type="button" className="nav-ths" onClick={openLoginModal}>{t.ths}</button>
          <div className="lang-switch" aria-label="Language selector">
            {(["en", "zh", "ja"] as Language[]).map((item) => (
              <button key={item} className={lang === item ? "active" : ""} onClick={() => setLang(item)}>{item.toUpperCase()}</button>
            ))}
          </div>
          <button type="button" className="nav-contact" onClick={() => openInquiryModal("consultation")}>
            {t.contact}<span>↗</span>
          </button>
          <button className="menu-button" aria-label="Toggle menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
            <i /><i />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" />
        <div className="energy-line energy-one" /><div className="energy-line energy-two" />
        <div className="hero-copy reveal is-visible">
          <p className="eyebrow"><span />{t.eyebrow}</p>
          <h1><span>{t.heroLead}</span><span>{t.heroMid}</span><em>{t.heroEnd}</em></h1>
          <div className="hero-lower">
            <p className="positioning">{t.positioning}</p>
            <p className="hero-body">{t.heroBody}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#twin-hub">{t.explore}<span>↓</span></a>
              <button type="button" className="text-link" onClick={() => openInquiryModal("consultation")}>
                {t.talk}<span>↗</span>
              </button>
            </div>
          </div>
        </div>
        <div className="hero-visual reveal is-visible">
          <InfinityFlow />
          <div className="flow-labels">
            {t.flowLabels.map((label, i) => <span key={label} style={{ "--i": i } as React.CSSProperties}>{label}</span>)}
          </div>
        </div>
        <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section className="why section-light" id="why">
        <div className="section-index reveal"><span>01</span><p>{t.whyKicker}</p></div>
        <div className="why-heading reveal">
          <h2>{t.whyTitleA}<br /><em>{t.whyTitleB}</em></h2>
          <p>{t.whyBody}</p>
        </div>
        <div className="process-grid">
          {t.steps.map(([num, title, body], i) => (
            <article className="process-card reveal" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties} key={num}>
              <div className="process-top"><span>{num}</span><i>{i === 3 ? "↗" : "→"}</i></div>
              <div className="process-motif" aria-hidden="true"><span>{num}</span><i /></div>
              <h3>{title}</h3><p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="twin-section" id="twin-hub">
        <div className="twin-glow" />
        <div className="section-index on-dark reveal"><span>02</span><p>{t.twinKicker}</p></div>
        <div className="twin-intro reveal"><h2>{t.twinTitle}</h2><p>{t.twinBody}</p></div>
        <div className="twin-stage reveal">
          <div className="hub-card china-card">
            <div className="hub-card-top"><span className="hub-code">CN</span><span className="hub-pulse" /></div>
            <div className="hub-name"><small>{t.chinaDetail[0]}</small><strong>{t.china}</strong></div>
            <div className="hub-meta"><span>{t.chinaDetail[1]}</span><span>{t.chinaDetail[2]}</span></div>
          </div>
          <div className="twin-center">
            <img className="twin-brand-icon" src="/ans-twin-icon.png" alt="" />
            <span className="center-caption">TWIN HUB</span>
          </div>
          <div className="hub-card japan-card">
            <div className="hub-card-top"><span className="hub-code">JP</span><span className="hub-pulse" /></div>
            <div className="hub-name"><small>{t.japanDetail[0]}</small><strong>{t.japan}</strong></div>
            <div className="hub-meta"><span>{t.japanDetail[1]}</span><span>{t.japanDetail[2]}</span></div>
          </div>
          <div className="connection-line"><i /><i /><i /><i /></div>
        </div>
        <div className="twin-points">
          {t.twinPoints.map(([title, body], i) => (
            <article className="twin-point reveal" style={{ "--delay": `${i * 80}ms` } as React.CSSProperties} key={title}>
              <span>0{i + 1}</span><h3>{title}</h3><p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="solutions section-light" id="solutions">
        <div className="section-index reveal"><span>03</span><p>{t.solKicker}</p></div>
        <div className="solutions-head reveal"><h2>{t.solTitle}</h2><p>DESIGN · BUILD · IMPROVE</p></div>
        <div className="solutions-list">
          {t.solutions.map(([num, title, body]) => (
            <article className="solution-row reveal" key={num}>
              <span className="solution-num">{num}</span><h3>{title}</h3><p>{body}</p><i>↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="stories" id="stories">
        <div className="stories-noise" />
        <div className="section-index on-dark reveal"><span>04</span><p>{t.storyKicker}</p></div>
        <div className="stories-grid">
          <div className="stories-copy reveal">
            <h2>{t.storyTitle}</h2>
            <p>{t.storyBody}</p>
            <button type="button" className="button button-outline" onClick={() => openInquiryModal("consultation")}>
              {t.storyCta}<span>↗</span>
            </button>
          </div>
          <div className="case-card reveal">
            <div className="case-top"><span>{t.storyTag}</span><strong>{t.storyIndustry}</strong></div>
            <div className="case-flow">
              {t.storySteps.map(([title, body], i) => <div key={title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p>{i < 3 && <i>→</i>}</div>)}
            </div>
            <div className="case-results">{t.storyResults.map((result) => <span key={result}>{result}</span>)}</div>
            <div className="case-watermark">MODEL</div>
          </div>
        </div>
      </section>

      <section className="about section-light" id="about">
        <div className="section-index reveal"><span>05</span><p>{t.aboutKicker}</p></div>
        <div className="about-grid">
          <div className="about-title reveal"><h2>{t.aboutTitle}</h2><div className="about-mark"><img className="about-logo-image" src="/ans-about-logo.png" alt="ANS — Answer Supply Chain" /></div></div>
          <div className="about-content reveal"><p>{t.aboutBody}</p>
            <div className="company-facts">
              {t.companyFacts.map(([title, body], i) => <div className={i === 0 ? "fact-wide" : ""} key={title}><span>{title}</span><strong>{body}</strong></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="recruit" id="recruit">
        <div className="section-index on-dark reveal"><span>06</span><p>{t.recruitKicker}</p></div>
        <div className="recruit-head reveal">
          <h2>{t.recruitTitle}</h2>
          <div>
            <p>{t.recruitBody}</p>
            <button type="button" className="button button-outline recruit-button" onClick={() => openInquiryModal("recruit")}>
              {t.recruitButton}<span>↗</span>
            </button>
          </div>
        </div>
        <div className="recruit-grid">
          {t.recruitRoles.map(([title, body], i) => (
            <article
              className="recruit-card reveal"
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
              key={title}
              role="button"
              tabIndex={0}
              onClick={() => openInquiryModal("recruit", title)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openInquiryModal("recruit", title);
                }
              }}
            >
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <i>↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-flow"><InfinityFlow small /></div>
        <div className="contact-copy reveal">
          <p className="eyebrow light"><span />{t.finalKicker}</p>
          <h2>{t.finalTitleA}<br /><em>{t.finalTitleB}</em></h2>
          <button type="button" className="button button-contact" onClick={() => openInquiryModal("consultation")}>
            {t.finalButton}<span>↗</span>
          </button>
        </div>
        <footer><BrandMark /><p>{t.footerLine}</p><span>© {new Date().getFullYear()} ANS</span></footer>
      </section>

      {loginOpen && <ThsLoginModal lang={lang} onClose={() => setLoginOpen(false)} />}
      {inquiryOpen && (
        <InquiryModal
          lang={lang}
          type={inquiryType}
          initialMessage={inquiryMessage}
          onClose={() => setInquiryOpen(false)}
        />
      )}
    </main>
  );
}
