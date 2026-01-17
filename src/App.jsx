import { useState, useEffect, useRef } from 'react';

// 数字递增动画Hook
const useCountUp = (end, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    if (!startOnView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  return { count, ref };
};

// 滚动显示动画Hook
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

function ANSHomepage() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('ja');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Logo URL - 从环境变量或 Supabase 获取
  const logoUrl = import.meta.env.VITE_LOGO_URL || null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 多语言内容
  const content = {
    ja: {
      nav: {
        home: 'ホーム',
        about: '会社概要',
        warehouse: '双倉連動システム',
        services: 'サービス',
        contact: 'お問い合わせ',
      },
      hero: {
        title: '共筑双倉、航通中日',
        subtitle: '青島・横浜双倉で、あなたのビジネスを加速',
        cta1: '無料相談',
        cta2: 'サービス詳細',
      },
      stats: {
        revenue: '月間売上高',
        area: '総倉庫面積',
        inspection: '通関検査率',
        delivery: '定時配送率',
        clearance: '通関所要時間',
        shipping: '海運リードタイム',
        turnover: '在庫回転期間',
        shipments: '月間出荷数',
      },
      warehouse: {
        title: '双倉連動システムの強み',
        subtitle: 'The Advantages of Dual Warehouse System',
        qingdao: {
          name: '青島倉庫',
          subtitle: '中国の成本与規模優勢',
          area: '20,000',
          features: ['コスト優勢', '区位優勢', '規模優勢'],
          descriptions: ['倉庫費用は日本の1/3', '青島港まで2.5km', '大面積倉储']
        },
        yokohama: {
          name: '横浜倉庫',
          subtitle: '日本のハードウェア&サービス優勢',
          area: '8,000',
          features: ['硬件優勢', '位置優勢', '配送優勢'],
          descriptions: ['Landport智能倉庫', '本牧埠頭まで10分', 'ヤマトまで400m']
        },
        connection: '周六普船 / 石島快船',
        connectionSub: '3日主港直達'
      },
      services: {
        title: 'サービス内容',
        subtitle: 'Our Services',
        items: [
          { icon: '🚢', title: '海運サービス', desc: '青島⇔横浜 定期航線で確実な輸送を実現', features: ['週土普船 + 石島快船', 'FCL/LCL対応', '最短3日到着'] },
          { icon: '📋', title: '通関代理サービス', desc: '迅速・確実な通関で、スムーズな物流を実現', features: ['検査率5%以下', 'ACP申請対応', '保税拆箱'] },
          { icon: '📦', title: '倉庫管理サービス', desc: '青島20,000㎡ + 横浜8,000㎡ 双倉連動', features: ['システム化在庫管理', '入出庫・貼標', '温湿度管理'] },
          { icon: '🚚', title: 'B2C代発サービス', desc: '保税代発で最短翌日配達を実現', features: ['ヤマト連携', '当日出荷対応', 'Amazon FBA転送'] },
          { icon: '📍', title: '物流追跡システム', desc: 'リアルタイムで貨物状況を可視化', features: ['24時間追跡', '自動通知', '一単到底'] },
          { icon: '💼', title: '総合コンサルティング', desc: '日本市場進出を全面サポート', features: ['物流方案設計', 'ACP/JCT登録', '日本法人設立'] },
        ]
      },
      timeline: {
        title: '会社の歩み',
        subtitle: 'Company Timeline',
        milestones: [
          { 
            date: '2024年6月',
            dateEn: 'June 2024',
            title: '会社設立',
            titleEn: 'Company Established',
            desc: 'アンササプライチェーン株式会社設立'
          },
          { 
            date: '2025年4月1日',
            dateEn: 'April 1, 2025',
            title: '杉田倉庫開始',
            titleEn: 'Sugita Warehouse Opened',
            desc: '横浜杉田倉庫（8,000㎡）営業開始'
          }
        ]
      },
      process: {
        title: 'ご利用の流れ',
        subtitle: 'Service Process',
        steps: [
          { num: '01', title: 'お問い合わせ', titleEn: 'Inquiry', desc: 'まずはお気軽にお問い合わせください', time: '即時対応' },
          { num: '02', title: '見積もり・契約', titleEn: 'Quotation', desc: '最適なプランをご提案します', time: '1-2営業日' },
          { num: '03', title: '貨物受入れ', titleEn: 'Receiving', desc: '青島倉庫で貨物をお預かり', time: '随時' },
          { num: '04', title: '配送完了', titleEn: 'Delivery', desc: '日本国内へ確実にお届け', time: '最短3日' },
        ]
      },
      cta: {
        title: '共筑双倉、航通中日',
        subtitle: '青島・横浜双倉で、あなたのビジネスを加速',
        features: ['初期費用0円', '柔軟な契約期間', '中日専門サポート', '即日対応可能'],
        btn1: '無料資料をダウンロード',
        btn2: 'お問い合わせ',
      },
      footer: {
        company: 'アンササプライチェーン株式会社',
        address: '〒236-0001 神奈川県横浜市金沢区昭和町3174 ランドポート横浜杉田1F',
        tel: 'TEL: 045-349-3730',
        email: 'Email: l.li@ans-scm.com',
        copyright: '© 2024 Answer Supply Chain Co., Ltd. All rights reserved.',
      }
    },
    zh: {
      nav: {
        home: '首页',
        about: '公司概要',
        warehouse: '双仓联动系统',
        services: '服务内容',
        contact: '联系我们',
      },
      hero: {
        title: '共筑双仓，航通中日',
        subtitle: '青岛・横滨双仓，为您的业务加速',
        cta1: '免费咨询',
        cta2: '服务详情',
      },
      stats: {
        revenue: '月营业额',
        area: '总仓储面积',
        inspection: '通关检查率',
        delivery: '准时交付率',
        clearance: '清关时间',
        shipping: '海运时效',
        turnover: '在库周转',
        shipments: '月出货量',
      },
      warehouse: {
        title: '双仓联动系统的优势',
        subtitle: 'The Advantages of Dual Warehouse System',
        qingdao: {
          name: '青岛仓库',
          subtitle: '中国的成本与规模优势',
          area: '20,000',
          features: ['成本优势', '区位优势', '规模优势'],
          descriptions: ['仓储费用仅为日本的1/3', '距离青岛港2.5km', '2万㎡大面积仓储']
        },
        yokohama: {
          name: '横滨仓库',
          subtitle: '日本的硬件与服务优势',
          area: '8,000',
          features: ['硬件优势', '位置优势', '配送优势'],
          descriptions: ['Landport智能仓库', '距本牧码头10分钟', '距黑猫宅急便400m']
        },
        connection: '周六普船 / 石岛快船',
        connectionSub: '3日主港直达'
      },
      services: {
        title: '服务内容',
        subtitle: 'Our Services',
        items: [
          { icon: '🚢', title: '海运服务', desc: '青岛⇔横滨 定期航线确保稳定运输', features: ['周六普船 + 石岛快船', 'FCL/LCL对应', '最快3天到达'] },
          { icon: '📋', title: '清关代理服务', desc: '快速・准确的清关，实现顺畅物流', features: ['查验率5%以下', 'ACP申请对应', '保税拆箱'] },
          { icon: '📦', title: '仓储管理服务', desc: '青岛20,000㎡ + 横滨8,000㎡ 双仓联动', features: ['系统化库存管理', '入出库・贴标', '温湿度管理'] },
          { icon: '🚚', title: 'B2C代发服务', desc: '保税代发实现最快次日达', features: ['黑猫宅急便合作', '当日出货对应', 'Amazon FBA转运'] },
          { icon: '📍', title: '物流追踪系统', desc: '实时可视化货物状态', features: ['24小时追踪', '自动通知', '一单到底'] },
          { icon: '💼', title: '综合咨询服务', desc: '全面支持日本市场进出', features: ['物流方案设计', 'ACP/JCT登录', '日本法人设立'] },
        ]
      },
      timeline: {
        title: '公司历程',
        subtitle: 'Company Timeline',
        milestones: [
          { 
            date: '2024年6月',
            dateEn: 'June 2024',
            title: '公司成立',
            titleEn: 'Company Established',
            desc: '安尔速供应链株式会社成立'
          },
          { 
            date: '2025年4月1日',
            dateEn: 'April 1, 2025',
            title: '杉田仓库启动',
            titleEn: 'Sugita Warehouse Opened',
            desc: '横滨杉田仓库（8,000㎡）正式运营'
          }
        ]
      },
      process: {
        title: '服务流程',
        subtitle: 'Service Process',
        steps: [
          { num: '01', title: '咨询', titleEn: 'Inquiry', desc: '请随时与我们联系', time: '即时对应' },
          { num: '02', title: '报价・签约', titleEn: 'Quotation', desc: '为您提供最优方案', time: '1-2工作日' },
          { num: '03', title: '货物接收', titleEn: 'Receiving', desc: '青岛仓库接收货物', time: '随时' },
          { num: '04', title: '配送完成', titleEn: 'Delivery', desc: '准确送达日本国内', time: '最快3天' },
        ]
      },
      cta: {
        title: '共筑双仓，航通中日',
        subtitle: '青岛・横滨双仓，为您的业务加速',
        features: ['初期费用0元', '灵活合同期限', '中日专业支持', '即日对应可能'],
        btn1: '下载免费资料',
        btn2: '联系我们',
      },
      footer: {
        company: 'Answer Supply Chain Co., Ltd.',
        address: '〒236-0001 神奈川県横浜市金沢区昭和町3174 Landport横浜杉田1F',
        tel: 'TEL: 045-349-3730',
        email: 'Email: l.li@ans-scm.com',
        copyright: '© 2024 Answer Supply Chain Co., Ltd. 版权所有',
      }
    }
  };

  const t = content[lang];

  // 统计数据动画
  const revenue = useCountUp(6000, 2000);
  const area = useCountUp(28000, 2000);
  const delivery = useCountUp(99.8, 2000);
  const shipments = useCountUp(38000, 2000);

  const warehouseSection = useScrollReveal();
  const servicesSection = useScrollReveal();
  const timelineSection = useScrollReveal();
  const processSection = useScrollReveal();

  return (
    <div style={{
      fontFamily: "'Noto Sans JP', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#2C3E50',
      lineHeight: 1.6,
      overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        
        @keyframes shipMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @media (max-width: 768px) {
          .timeline-line {
            display: none !important;
          }
          .timeline-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .timeline-content-left {
            width: 100% !important;
            text-align: left !important;
          }
          .timeline-content-right {
            width: 100% !important;
            text-align: left !important;
          }
          .timeline-spacer {
            display: none !important;
          }
          .timeline-dot {
            position: absolute !important;
            left: 30px !important;
            top: 20px !important;
          }
        }
        
        .fade-in { animation: fadeInUp 0.8s ease forwards; }
        .fade-in-delay-1 { animation: fadeInUp 0.8s ease 0.1s forwards; opacity: 0; }
        .fade-in-delay-2 { animation: fadeInUp 0.8s ease 0.2s forwards; opacity: 0; }
        .fade-in-delay-3 { animation: fadeInUp 0.8s ease 0.3s forwards; opacity: 0; }
        .fade-in-delay-4 { animation: fadeInUp 0.8s ease 0.4s forwards; opacity: 0; }
        .fade-in-delay-5 { animation: fadeInUp 0.8s ease 0.5s forwards; opacity: 0; }
        
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .nav-link:hover {
          color: #D32F2F !important;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #D32F2F;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(211, 47, 47, 0.4);
        }
        
        .btn-secondary:hover {
          background: white;
          color: #1A3A52;
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.2);
        }
        
        .warehouse-card:hover {
          transform: scale(1.02);
        }
        
        .process-step:hover .step-number {
          transform: scale(1.1);
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 24px',
          height: scrolled ? '64px' : '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'height 0.3s ease',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="ANS Logo" 
                style={{
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
                onError={(e) => {
                  // 如果图片加载失败，显示文字 logo
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)',
              borderRadius: '8px',
              display: logoUrl ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '18px',
            }}>
              ANS
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#1A3A52' }}>
                ANSWER SUPPLY CHAIN
              </div>
              <div style={{ fontSize: '11px', color: '#7F8C9A', letterSpacing: '0.5px' }}>
                共筑双倉、航通中日
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}>
            {Object.entries(t.nav).map(([key, value]) => (
              <a
                key={key}
                href={`#${key}`}
                className="nav-link"
                style={{
                  position: 'relative',
                  color: '#2C3E50',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  transition: 'color 0.3s ease',
                }}
              >
                {value}
              </a>
            ))}
            
            {/* Language Switcher */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginLeft: '16px',
              padding: '6px 12px',
              background: '#F5F7FA',
              borderRadius: '20px',
            }}>
              <button
                onClick={() => setLang('ja')}
                style={{
                  padding: '4px 10px',
                  border: 'none',
                  borderRadius: '12px',
                  background: lang === 'ja' ? '#1A3A52' : 'transparent',
                  color: lang === 'ja' ? 'white' : '#7F8C9A',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                🇯🇵 日本語
              </button>
              <button
                onClick={() => setLang('zh')}
                style={{
                  padding: '4px 10px',
                  border: 'none',
                  borderRadius: '12px',
                  background: lang === 'zh' ? '#D32F2F' : 'transparent',
                  color: lang === 'zh' ? 'white' : '#7F8C9A',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                🇨🇳 中文
              </button>
            </div>

            {/* CTA Button */}
            <button
              className="btn-primary"
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A3A52 0%, #0D1F2D 50%, #1A3A52 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 15s ease infinite',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          opacity: 0.1,
        }}>
          {/* Wave Pattern */}
          <svg style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '200px',
            animation: 'wave 20s linear infinite',
          }}>
            <path
              fill="white"
              d="M0,100 C150,150 350,50 500,100 C650,150 850,50 1000,100 C1150,150 1350,50 1500,100 C1650,150 1850,50 2000,100 V200 H0 Z"
            />
          </svg>
          
          {/* Grid Pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </div>

        {/* Floating Ship Animation */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: 0,
          right: 0,
          height: '60px',
          overflow: 'hidden',
          opacity: 0.15,
        }}>
          <div style={{
            fontSize: '40px',
            animation: 'shipMove 25s linear infinite',
          }}>
            🚢
          </div>
        </div>

        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '120px 24px 80px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            maxWidth: '800px',
          }}>
            {/* Main Title */}
            <h1 className="fade-in" style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '24px',
              textShadow: '0 4px 30px rgba(0,0,0,0.3)',
            }}>
              {t.hero.title}
            </h1>
            
            <p className="fade-in-delay-1" style={{
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '16px',
              fontWeight: 300,
            }}>
              {t.hero.subtitle}
            </p>

            {/* Features */}
            <div className="fade-in-delay-2" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '40px',
            }}>
              {t.cta.features.map((feature, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '15px',
                }}>
                  <span style={{ color: '#4CAF50' }}>✓</span>
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="fade-in-delay-3" style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              <button className="btn-primary" style={{
                padding: '18px 40px',
                background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                📥 {t.cta.btn1}
              </button>
              <button className="btn-secondary" style={{
                padding: '18px 40px',
                background: 'transparent',
                border: '2px solid rgba(255,255,255,0.5)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                💬 {t.cta.btn2}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="fade-in-delay-4" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginTop: '60px',
          }}>
            <div ref={revenue.ref} className="stat-card" style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: 'white' }}>
                {revenue.count.toLocaleString()}
                <span style={{ fontSize: '20px', marginLeft: '4px' }}>万円</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>
                {t.stats.revenue}
              </div>
            </div>

            <div ref={area.ref} className="stat-card" style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: 'white' }}>
                {area.count.toLocaleString()}
                <span style={{ fontSize: '20px', marginLeft: '4px' }}>㎡</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>
                {t.stats.area}
              </div>
            </div>

            <div className="stat-card" style={{
              background: 'rgba(211, 47, 47, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(211, 47, 47, 0.3)',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#FF6B6B' }}>
                5%
                <span style={{ fontSize: '20px', marginLeft: '4px' }}>以下</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>
                {t.stats.inspection}
              </div>
            </div>

            <div ref={delivery.ref} className="stat-card" style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: 'white' }}>
                {delivery.count.toFixed(1)}
                <span style={{ fontSize: '20px', marginLeft: '4px' }}>%</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>
                {t.stats.delivery}
              </div>
            </div>

            <div ref={shipments.ref} className="stat-card" style={{
              background: 'rgba(255,140,0,0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,140,0,0.3)',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#FFB84D' }}>
                {shipments.count.toLocaleString()}
                <span style={{ fontSize: '20px', marginLeft: '4px' }}>件</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>
                {t.stats.shipments}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
        }}>
          <svg viewBox="0 0 1440 100" fill="none" style={{ display: 'block', width: '100%' }}>
            <path
              fill="#F5F7FA"
              d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,70 1440,50 L1440,100 L0,100 Z"
            />
          </svg>
        </div>
      </section>

      {/* Dual Warehouse Section */}
      <section 
        ref={warehouseSection.ref}
        id="warehouse"
        style={{
          background: '#F5F7FA',
          padding: '100px 24px',
          position: 'relative',
        }}
      >
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            opacity: warehouseSection.isVisible ? 1 : 0,
            transform: warehouseSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: '#1A3A52',
              marginBottom: '8px',
            }}>
              {t.warehouse.title}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#7F8C9A',
            }}>
              {t.warehouse.subtitle}
            </p>
          </div>

          {/* Warehouse Comparison */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px',
            alignItems: 'stretch',
          }}>
            {/* Qingdao Warehouse */}
            <div 
              className="warehouse-card"
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                border: '3px solid #D32F2F',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                opacity: warehouseSection.isVisible ? 1 : 0,
                transform: warehouseSection.isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transitionDelay: '0.2s',
              }}
            >
              {/* Flag Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '32px',
              }}>
                🇨🇳
              </div>

              <h3 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#D32F2F',
                marginBottom: '8px',
              }}>
                {t.warehouse.qingdao.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#7F8C9A',
                marginBottom: '24px',
              }}>
                {t.warehouse.qingdao.subtitle}
              </p>

              {/* Area */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                marginBottom: '32px',
              }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#D32F2F',
                }}>
                  {t.warehouse.qingdao.area}
                </span>
                <span style={{
                  fontSize: '20px',
                  color: '#7F8C9A',
                  marginLeft: '8px',
                }}>
                  ㎡
                </span>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {t.warehouse.qingdao.features.map((feature, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ color: 'white', fontSize: '14px' }}>✓</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#2C3E50', fontSize: '16px' }}>
                        {feature}
                      </div>
                      <div style={{ color: '#7F8C9A', fontSize: '14px' }}>
                        {t.warehouse.qingdao.descriptions[i]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection Animation */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              opacity: warehouseSection.isVisible ? 1 : 0,
              transition: 'all 0.8s ease 0.4s',
            }}>
              <div style={{
                width: '100%',
                maxWidth: '200px',
                height: '4px',
                background: 'linear-gradient(90deg, #D32F2F, #FF8C00, #1A3A52)',
                borderRadius: '2px',
                position: 'relative',
                marginBottom: '24px',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '32px',
                  animation: 'float 3s ease-in-out infinite',
                }}>
                  🚢
                </div>
              </div>
              <div style={{
                textAlign: 'center',
                background: 'white',
                padding: '16px 24px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}>
                <div style={{
                  fontWeight: 700,
                  color: '#1A3A52',
                  fontSize: '16px',
                  marginBottom: '4px',
                }}>
                  {t.warehouse.connection}
                </div>
                <div style={{
                  color: '#FF8C00',
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  {t.warehouse.connectionSub}
                </div>
              </div>
            </div>

            {/* Yokohama Warehouse */}
            <div 
              className="warehouse-card"
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                border: '3px solid #1A3A52',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                opacity: warehouseSection.isVisible ? 1 : 0,
                transform: warehouseSection.isVisible ? 'translateX(0)' : 'translateX(50px)',
                transitionDelay: '0.3s',
              }}
            >
              {/* Flag Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '32px',
              }}>
                🇯🇵
              </div>

              <h3 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1A3A52',
                marginBottom: '8px',
              }}>
                {t.warehouse.yokohama.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#7F8C9A',
                marginBottom: '24px',
              }}>
                {t.warehouse.yokohama.subtitle}
              </p>

              {/* Area */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                marginBottom: '32px',
              }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#1A3A52',
                }}>
                  {t.warehouse.yokohama.area}
                </span>
                <span style={{
                  fontSize: '20px',
                  color: '#7F8C9A',
                  marginLeft: '8px',
                }}>
                  ㎡
                </span>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {t.warehouse.yokohama.features.map((feature, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      background: 'linear-gradient(135deg, #1A3A52 0%, #0D1F2D 100%)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ color: 'white', fontSize: '14px' }}>✓</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#2C3E50', fontSize: '16px' }}>
                        {feature}
                      </div>
                      <div style={{ color: '#7F8C9A', fontSize: '14px' }}>
                        {t.warehouse.yokohama.descriptions[i]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesSection.ref}
        id="services"
        style={{
          background: 'white',
          padding: '100px 24px',
        }}
      >
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            opacity: servicesSection.isVisible ? 1 : 0,
            transform: servicesSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: '#1A3A52',
              marginBottom: '8px',
            }}>
              {t.services.title}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#7F8C9A',
            }}>
              {t.services.subtitle}
            </p>
          </div>

          {/* Service Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {t.services.items.map((service, i) => (
              <div 
                key={i}
                className="service-card"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  border: '1px solid #E8ECF0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  opacity: servicesSection.isVisible ? 1 : 0,
                  transform: servicesSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: i % 2 === 0 
                    ? 'linear-gradient(135deg, rgba(211,47,47,0.1) 0%, rgba(211,47,47,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(26,58,82,0.1) 0%, rgba(26,58,82,0.05) 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '20px',
                }}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#2C3E50',
                  marginBottom: '8px',
                }}>
                  {service.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: '#7F8C9A',
                  fontSize: '14px',
                  marginBottom: '20px',
                  lineHeight: 1.6,
                }}>
                  {service.desc}
                </p>

                {/* Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {service.features.map((feature, j) => (
                    <div key={j} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#4B5563',
                    }}>
                      <span style={{ color: '#FF8C00' }}>•</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <div style={{
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: '1px solid #E8ECF0',
                }}>
                  <a href="#" style={{
                    color: '#D32F2F',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    詳細を見る →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section 
        ref={timelineSection.ref}
        style={{
          background: 'white',
          padding: '100px 24px',
          position: 'relative',
        }}
      >
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            opacity: timelineSection.isVisible ? 1 : 0,
            transform: timelineSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: '#1A3A52',
              marginBottom: '8px',
            }}>
              {t.timeline.title}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#7F8C9A',
            }}>
              {t.timeline.subtitle}
            </p>
          </div>

          {/* Timeline */}
          <div style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {/* Timeline Line */}
            <div className="timeline-line" style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              background: 'linear-gradient(180deg, #FF8C00 0%, #1A3A52 100%)',
              transform: 'translateX(-50%)',
              borderRadius: '2px',
              opacity: timelineSection.isVisible ? 1 : 0,
              transition: 'all 1s ease 0.3s',
            }} />

            {/* Timeline Items */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '60px',
              position: 'relative',
            }}>
              {t.timeline.milestones.map((milestone, i) => (
                <div
                  key={i}
                  className="timeline-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px',
                    position: 'relative',
                    opacity: timelineSection.isVisible ? 1 : 0,
                    transform: timelineSection.isVisible ? 'translateX(0)' : (i % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)'),
                    transition: 'all 0.8s ease',
                    transitionDelay: `${i * 0.2}s`,
                  }}
                >
                  {/* Left Content (Even) */}
                  {i % 2 === 0 && (
                    <>
                      <div className="timeline-content-left" style={{
                        flex: 1,
                        textAlign: 'right',
                      }}>
                        <div style={{
                          background: 'white',
                          borderRadius: '16px',
                          padding: '32px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          border: '2px solid #E8ECF0',
                        }}>
                          <div style={{
                            fontSize: '14px',
                            color: '#FF8C00',
                            fontWeight: 600,
                            marginBottom: '8px',
                          }}>
                            {milestone.date}
                          </div>
                          <h3 style={{
                            fontSize: '24px',
                            fontWeight: 700,
                            color: '#1A3A52',
                            marginBottom: '8px',
                          }}>
                            {milestone.title}
                          </h3>
                          <p style={{
                            fontSize: '14px',
                            color: '#7F8C9A',
                            marginBottom: '4px',
                          }}>
                            {milestone.titleEn}
                          </p>
                          <p style={{
                            fontSize: '14px',
                            color: '#4B5563',
                            lineHeight: 1.6,
                          }}>
                            {milestone.desc}
                          </p>
                        </div>
                      </div>

                      {/* Timeline Dot */}
                      <div className="timeline-dot" style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: i === 0 ? '#FF8C00' : '#1A3A52',
                        border: '4px solid white',
                        boxShadow: '0 0 0 4px rgba(26,58,82,0.1)',
                        flexShrink: 0,
                        zIndex: 1,
                      }} />

                      {/* Right Spacer (Even) */}
                      <div className="timeline-spacer" style={{ flex: 1 }} />
                    </>
                  )}

                  {/* Right Content (Odd) */}
                  {i % 2 === 1 && (
                    <>
                      {/* Left Spacer (Odd) */}
                      <div className="timeline-spacer" style={{ flex: 1 }} />

                      {/* Timeline Dot */}
                      <div className="timeline-dot" style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: i === 1 ? '#1A3A52' : '#FF8C00',
                        border: '4px solid white',
                        boxShadow: '0 0 0 4px rgba(26,58,82,0.1)',
                        flexShrink: 0,
                        zIndex: 1,
                      }} />

                      <div className="timeline-content-right" style={{
                        flex: 1,
                        textAlign: 'left',
                      }}>
                        <div style={{
                          background: 'white',
                          borderRadius: '16px',
                          padding: '32px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          border: '2px solid #E8ECF0',
                        }}>
                          <div style={{
                            fontSize: '14px',
                            color: '#1A3A52',
                            fontWeight: 600,
                            marginBottom: '8px',
                          }}>
                            {milestone.date}
                          </div>
                          <h3 style={{
                            fontSize: '24px',
                            fontWeight: 700,
                            color: '#1A3A52',
                            marginBottom: '8px',
                          }}>
                            {milestone.title}
                          </h3>
                          <p style={{
                            fontSize: '14px',
                            color: '#7F8C9A',
                            marginBottom: '4px',
                          }}>
                            {milestone.titleEn}
                          </p>
                          <p style={{
                            fontSize: '14px',
                            color: '#4B5563',
                            lineHeight: 1.6,
                          }}>
                            {milestone.desc}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section 
        ref={processSection.ref}
        style={{
          background: '#F5F7FA',
          padding: '100px 24px',
        }}
      >
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            opacity: processSection.isVisible ? 1 : 0,
            transform: processSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: '#1A3A52',
              marginBottom: '8px',
            }}>
              {t.process.title}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#7F8C9A',
            }}>
              {t.process.subtitle}
            </p>
          </div>

          {/* Process Steps */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            position: 'relative',
          }}>
            {t.process.steps.map((step, i) => (
              <div 
                key={i}
                className="process-step"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  textAlign: 'center',
                  position: 'relative',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  opacity: processSection.isVisible ? 1 : 0,
                  transform: processSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.6s ease',
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                {/* Step Number */}
                <div 
                  className="step-number"
                  style={{
                    width: '72px',
                    height: '72px',
                    background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 8px 24px rgba(255,140,0,0.3)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <span style={{
                    color: 'white',
                    fontSize: '28px',
                    fontWeight: 700,
                  }}>
                    {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#1A3A52',
                  marginBottom: '4px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#7F8C9A',
                  marginBottom: '16px',
                }}>
                  {step.titleEn}
                </p>

                {/* Description */}
                <p style={{
                  color: '#4B5563',
                  fontSize: '14px',
                  marginBottom: '16px',
                  lineHeight: 1.6,
                }}>
                  {step.desc}
                </p>

                {/* Time Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255,140,0,0.1)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: '#FF8C00',
                  fontWeight: 600,
                }}>
                  ⏱ {step.time}
                </div>

                {/* Arrow (except last) */}
                {i < t.process.steps.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-24px',
                    transform: 'translateY(-50%)',
                    color: '#FF8C00',
                    fontSize: '24px',
                    fontWeight: 700,
                    zIndex: 1,
                    display: 'none', // Hide on mobile, show on desktop via media query
                  }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1A3A52 0%, #0D1F2D 100%)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #D32F2F 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, #FF8C00 0%, transparent 50%)
          `,
        }} />

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '16px',
          }}>
            {t.cta.title}
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '40px',
          }}>
            {t.cta.subtitle}
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <button className="btn-primary" style={{
              padding: '18px 40px',
              background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              📥 {t.cta.btn1}
            </button>
            <button className="btn-secondary" style={{
              padding: '18px 40px',
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.5)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              💬 {t.cta.btn2}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1A1A1A',
        padding: '60px 24px 30px',
        borderTop: '3px solid #D32F2F',
      }}>
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}>
            {/* Company Info */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}>
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="ANS Logo" 
                    style={{
                      height: '40px',
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)',
                  borderRadius: '8px',
                  display: logoUrl ? 'none' : 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                }}>
                  ANS
                </div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>
                  ANSWER SUPPLY CHAIN
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.8 }}>
                {t.footer.company}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '12px', lineHeight: 1.8 }}>
                {t.footer.address}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>
                Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.entries(t.nav).map(([key, value]) => (
                  <a key={key} href={`#${key}`} style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s ease',
                  }}>
                    {value}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>
                Contact
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                  📞 {t.footer.tel}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                  ✉️ {t.footer.email}
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>
                Follow Us
              </h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['WeChat', 'LINE', 'LinkedIn'].map((social) => (
                  <div key={social} style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}>
                    {social.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '24px',
            textAlign: 'center',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ANSHomepage;
