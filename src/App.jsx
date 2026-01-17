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
        twinHub: 'ツインハブ',
        services: 'サービス',
        cases: '導入事例',
        contact: 'お問い合わせ',
      },
      hero: {
        title: 'Twin Hub ― 中日をつなぐ物流ソリューション',
        subtitle: '青島・横浜の二拠点体制で、あなたのビジネスを加速',
        features: [
          '✓ 中国コスト × 日本品質',
          '✓ 最短3日で横浜着',
          '✓ 2週間在庫で効率化',
          '✓ 中日専門スタッフ対応'
        ],
        cta1: '無料相談を申し込む',
        cta2: 'サービスを見る',
      },
      stats: {
        revenue: { value: '6,000', unit: '万円', label: '月間売上高', icon: '💰' },
        area: { value: '28,000', unit: '㎡', label: '総倉庫面積', icon: '📦' },
        delivery: { value: '99.8', unit: '%', label: '定時配送率', icon: '⏱' },
        shipping: { value: '3', unit: '日', label: '海上輸送日数', icon: '🚢' },
        turnover: { value: '2', unit: '週間', label: '推奨在庫回転', icon: '🔄' },
        shipments: { value: '38,000', unit: '+', label: '月間出荷件数', icon: '📊' },
      },
      twinHub: {
        title: 'ツインハブの強み',
        subtitle: 'Twin Hub的优势',
        subtitleEn: 'The Power of Twin Hub',
        qingdao: {
          name: '青島ハブ',
          subtitle: 'コストと規模の優位性',
          subtitleEn: 'Cost & Scale Advantage',
          area: '20,000',
          features: [
            '一期工程20,000㎡の大型倉庫',
            '倉庫費用は日本の約1/3',
            '青島港まで2.5km、鉄道配送対応',
            '集荷・検品・梱包・出荷の一貫対応'
          ]
        },
        yokohama: {
          name: '横浜ハブ',
          subtitle: 'スピードとサービスの優位性',
          subtitleEn: 'Speed & Service Advantage',
          area: '8,000',
          features: [
            'ランドポート横浜杉田 8,000㎡',
            '本牧港まで8km、車で約10分',
            'Amazonと同一倉庫エリア、FBA入庫便利',
            'ヤマト主力店まで400m、当日出荷対応'
          ]
        },
        connection: '週末通常便 / 最短3日',
        connectionSub: '週末通常便 / 最短3日'
      },
      services: {
        title: 'サービス内容',
        subtitle: '服务内容',
        subtitleEn: 'Our Services',
        items: [
          { 
            icon: '🚢', 
            title: '海上輸送サービス', 
            subtitle: 'Ocean Freight Service',
            desc: '青島⇔横浜 定期航路で安定輸送', 
            features: [
              '週末通常便 + 石島快速便の2ルート',
              'FCL（コンテナ）/ LCL（混載）対応',
              '主要港まで最短3日',
              '船会社一級代理の安定価格'
            ] 
          },
          { 
            icon: '📋', 
            title: '通関代理サービス', 
            subtitle: 'Customs Clearance Service',
            desc: '迅速・確実な通関で、スムーズな物流を実現', 
            features: [
              '自社通関士による専門対応',
              'ACP申請・登録代行',
              '保税貨物の分割申告対応',
              '経験豊富な専門チーム'
            ] 
          },
          { 
            icon: '📦', 
            title: '倉庫管理サービス', 
            subtitle: 'Warehouse Management',
            desc: '青島20,000㎡ + 横浜8,000㎡ ツインハブ体制', 
            features: [
              'WMSによる在庫一元管理',
              '入出庫・ラベル貼り・検品',
              '短期・長期保管対応',
              'セキュリティ完備'
            ] 
          },
          { 
            icon: '🚚', 
            title: 'B2C発送代行サービス', 
            subtitle: 'B2C Fulfillment',
            desc: '保税倉庫から最短翌日配達', 
            features: [
              'ヤマト運輸との連携',
              '当日出荷、関東翌日着',
              'Amazon FBA転送対応',
              '楽天RSL入庫対応'
            ] 
          },
          { 
            icon: '📍', 
            title: '貨物追跡システム', 
            subtitle: 'Cargo Tracking System',
            desc: 'リアルタイムで貨物状況を可視化', 
            features: [
              '24時間システム追跡',
              'B/L番号・コンテナ番号検索',
              'メール・SMS自動通知',
              '一気通貫の全行程可視化'
            ] 
          },
          { 
            icon: '💼', 
            title: '総合コンサルティング', 
            subtitle: 'Comprehensive Consulting',
            desc: '日本市場進出を全面サポート', 
            features: [
              '物流スキーム設計',
              'コスト構造の最適化',
              'ACP・JCT登録サポート',
              '日本法人設立相談'
            ] 
          },
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
        subtitle: '服务流程',
        subtitleEn: 'Service Process',
        steps: [
          { num: '1', title: 'お問い合わせ', titleEn: 'Inquiry', titleZh: '咨询', desc: 'お電話またはフォームでお気軽にご連絡ください', descZh: '电话或表单咨询' },
          { num: '2', title: 'お見積り・ご契約', titleEn: 'Quote', titleZh: '报价', desc: '貨物情報をもとに最適なプランをご提案', descZh: '根据货物提供最优方案' },
          { num: '3', title: '貨物受入れ', titleEn: 'Receiving', titleZh: '收货', desc: '青島または横浜倉庫で貨物をお預かり', descZh: '青岛或横滨仓库收货' },
          { num: '4', title: '配送完了', titleEn: 'Delivery', titleZh: '配送', desc: 'ご指定の届け先まで確実にお届け', descZh: '准确送达指定地点' },
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
        about: '公司概况',
        twinHub: '双仓联动',
        services: '服务内容',
        cases: '案例展示',
        contact: '联系我们',
      },
      hero: {
        title: 'Twin Hub — 连接中日的物流解决方案',
        subtitle: '青岛・横滨双据点，助力您的业务腾飞',
        features: [
          '✓ 中国成本 × 日本品质',
          '✓ 最快3天抵达横滨',
          '✓ 2周库存高效周转',
          '✓ 中日专业团队服务'
        ],
        cta1: '申请免费咨询',
        cta2: '查看服务',
      },
      stats: {
        revenue: { value: '6,000', unit: '万円', label: '月营业额', icon: '💰' },
        area: { value: '28,000', unit: '㎡', label: '总仓储面积', icon: '📦' },
        delivery: { value: '99.8', unit: '%', label: '准时交付率', icon: '⏱' },
        shipping: { value: '3', unit: '日', label: '海运时效', icon: '🚢' },
        turnover: { value: '2', unit: '周', label: '推荐库存周转', icon: '🔄' },
        shipments: { value: '38,000', unit: '+', label: '月出货量', icon: '📊' },
      },
      twinHub: {
        title: 'Twin Hub的优势',
        subtitle: 'Twin Hub的优势',
        subtitleEn: 'The Power of Twin Hub',
        qingdao: {
          name: '青岛Hub',
          subtitle: '成本与规模优势',
          subtitleEn: 'Cost & Scale Advantage',
          area: '20,000',
          features: [
            '一期工程20,000㎡大型仓库',
            '仓储费用约为日本的1/3',
            '距青岛港2.5km，铁路配套完善',
            '集货・检品・包装・出运一站式服务'
          ]
        },
        yokohama: {
          name: '横滨Hub',
          subtitle: '速度与服务优势',
          subtitleEn: 'Speed & Service Advantage',
          area: '8,000',
          features: [
            'Landport横滨杉田 8,000㎡',
            '距本牧港8km，车程约10分钟',
            '与Amazon同一库区，FBA入库便利',
            '距黑猫主力店400m，当日出货'
          ]
        },
        connection: '周末普船 / 最短3日',
        connectionSub: '周末普船 / 最短3日'
      },
      services: {
        title: '服务内容',
        subtitle: '服务内容',
        subtitleEn: 'Our Services',
        items: [
          { 
            icon: '🚢', 
            title: '海上輸送サービス', 
            subtitle: 'Ocean Freight Service',
            desc: '青島⇔横浜 定期航路で安定輸送', 
            features: [
              '週末通常便 + 石島快速便の2ルート',
              'FCL（コンテナ）/ LCL（混載）対応',
              '主要港まで最短3日',
              '船会社一級代理の安定価格'
            ] 
          },
          { 
            icon: '📋', 
            title: '通関代理サービス', 
            subtitle: 'Customs Clearance Service',
            desc: '迅速・確実な通関で、スムーズな物流を実現', 
            features: [
              '自社通関士による専門対応',
              'ACP申請・登録代行',
              '保税貨物の分割申告対応',
              '経験豊富な専門チーム'
            ] 
          },
          { 
            icon: '📦', 
            title: '倉庫管理サービス', 
            subtitle: 'Warehouse Management',
            desc: '青島20,000㎡ + 横浜8,000㎡ ツインハブ体制', 
            features: [
              'WMSによる在庫一元管理',
              '入出庫・ラベル貼り・検品',
              '短期・長期保管対応',
              'セキュリティ完備'
            ] 
          },
          { 
            icon: '🚚', 
            title: 'B2C発送代行サービス', 
            subtitle: 'B2C Fulfillment',
            desc: '保税倉庫から最短翌日配達', 
            features: [
              'ヤマト運輸との連携',
              '当日出荷、関東翌日着',
              'Amazon FBA転送対応',
              '楽天RSL入庫対応'
            ] 
          },
          { 
            icon: '📍', 
            title: '貨物追跡システム', 
            subtitle: 'Cargo Tracking System',
            desc: 'リアルタイムで貨物状況を可視化', 
            features: [
              '24時間システム追跡',
              'B/L番号・コンテナ番号検索',
              'メール・SMS自動通知',
              '一気通貫の全行程可視化'
            ] 
          },
          { 
            icon: '💼', 
            title: '総合コンサルティング', 
            subtitle: 'Comprehensive Consulting',
            desc: '日本市場進出を全面サポート', 
            features: [
              '物流スキーム設計',
              'コスト構造の最適化',
              'ACP・JCT登録サポート',
              '日本法人設立相談'
            ] 
          },
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
  const shipping = useCountUp(3, 2000);
  const turnover = useCountUp(2, 2000);
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
          
          /* Footer responsive */
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          
          /* Process steps responsive */
          .process-steps {
            flex-direction: column !important;
          }
          
          /* Stats grid responsive */
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 1199px) and (min-width: 769px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr) !important;
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
            gap: '24px',
          }}>
            <a href="#home" className="nav-link" style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease' }}>
              {t.nav.home}
            </a>
            <a href="#about" className="nav-link" style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease' }}>
              {t.nav.about}
            </a>
            <a href="#twin-hub" className="nav-link" style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease' }}>
              {t.nav.twinHub}
            </a>
            <a href="#services" className="nav-link" style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease' }}>
              {t.nav.services}
            </a>
            <a href="#cases" className="nav-link" style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease' }}>
              {t.nav.cases}
            </a>
            
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
              fontSize: 'clamp(36px, 5vw, 56px)',
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
              marginBottom: '32px',
              fontWeight: 300,
            }}>
              {t.hero.subtitle}
            </p>

            {/* Features - 2列×2行 */}
            <div className="fade-in-delay-2" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '40px',
              maxWidth: '600px',
            }}>
              {t.hero.features.map((feature, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '16px',
                }}>
                  <span style={{ color: '#FF8C00', fontSize: '18px' }}>✓</span>
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
                background: '#D32F2F',
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
                {t.hero.cta1}
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
                {t.hero.cta2}
              </button>
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

      {/* Stats Section - 数据展示区块 */}
      <section style={{
        background: 'linear-gradient(135deg, #1A3A52 0%, #2C3E50 100%)',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative Elements - 半透明集装箱图案 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='none'/%3E%3Crect x='10' y='10' width='80' height='80' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
        
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Stats Cards - 6项数据，3列×2行 */}
          <div className="fade-in-delay-4 stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {[
              { key: 'revenue', ref: revenue, count: revenue.count, isNumber: true },
              { key: 'area', ref: area, count: area.count, isNumber: true },
              { key: 'delivery', ref: delivery, count: delivery.count, isNumber: true },
              { key: 'shipping', ref: shipping, count: shipping.count, isNumber: true },
              { key: 'turnover', ref: turnover, count: turnover.count, isNumber: true },
              { key: 'shipments', ref: shipments, count: shipments.count, isNumber: true },
            ].map((stat, i) => {
              const statData = t.stats[stat.key];
              return (
                <div key={stat.key} ref={stat.ref} className="stat-card" style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>
                    {statData.icon}
                  </div>
                  <div style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 700, color: 'white', lineHeight: 1 }}>
                    {stat.isNumber ? stat.count.toLocaleString() : statData.value}
                    <span style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', marginLeft: '4px' }}>
                      {statData.unit}
                    </span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginTop: '12px' }}>
                    {statData.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Twin Hub Section */}
      <section 
        ref={warehouseSection.ref}
        id="twin-hub"
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
              {t.twinHub.title}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#7F8C9A',
            }}>
              {lang === 'ja' ? t.twinHub.subtitle : t.twinHub.subtitleEn}
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
                {t.twinHub.qingdao.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#7F8C9A',
                marginBottom: '24px',
              }}>
                {t.twinHub.qingdao.subtitle}
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
                  {t.twinHub.qingdao.area}
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
                {t.twinHub.qingdao.features.map((feature, i) => (
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
                      <div style={{ fontWeight: 500, color: '#2C3E50', fontSize: '15px', lineHeight: 1.6 }}>
                        {feature}
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
                  {t.twinHub.connection}
                </div>
                <div style={{
                  color: '#FF8C00',
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  {t.twinHub.connectionSub}
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
                {t.twinHub.yokohama.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#7F8C9A',
                marginBottom: '24px',
              }}>
                {t.twinHub.yokohama.subtitle}
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
                  {t.twinHub.yokohama.area}
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
                {t.twinHub.yokohama.features.map((feature, i) => (
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
                      <div style={{ fontWeight: 500, color: '#2C3E50', fontSize: '15px', lineHeight: 1.6 }}>
                        {feature}
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
              {lang === 'ja' ? t.services.subtitle : t.services.subtitleEn}
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
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#2C3E50',
                  marginBottom: '4px',
                }}>
                  {service.title}
                </h3>
                {service.subtitle && (
                  <p style={{
                    color: '#7F8C9A',
                    fontSize: '14px',
                    marginBottom: '12px',
                    fontWeight: 500,
                  }}>
                    {service.subtitle}
                  </p>
                )}

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
              {lang === 'ja' ? t.process.subtitle : t.process.subtitleEn}
            </p>
          </div>

          {/* Process Steps - 4步横向流程 */}
          <div className="process-steps" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '20px',
            position: 'relative',
            flexWrap: 'wrap',
          }}>
            {t.process.steps.map((step, i) => (
              <div 
                key={i}
                className="process-step"
                style={{
                  flex: '1',
                  minWidth: '200px',
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
                {/* Step Number - 80px圆形，物流橙背景 */}
                <div 
                  className="step-number"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: '#FF8C00',
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
                    fontSize: '36px',
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
                  marginBottom: '12px',
                }}>
                  {lang === 'ja' ? step.titleEn : (step.titleZh || step.titleEn)}
                </p>

                {/* Description */}
                <p style={{
                  color: '#4B5563',
                  fontSize: '14px',
                  lineHeight: 1.6,
                }}>
                  {lang === 'ja' ? step.desc : (step.descZh || step.desc)}
                </p>

                {/* Arrow (except last) - 4px实线，物流橙，带箭头 */}
                {i < t.process.steps.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '40px',
                    right: '-20px',
                    width: '40px',
                    height: '4px',
                    background: '#FF8C00',
                    zIndex: 1,
                    display: 'none', // Hide on mobile
                  }}>
                    <div style={{
                      position: 'absolute',
                      right: '-4px',
                      top: '-4px',
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid #FF8C00',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                    }} />
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
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '40px',
            marginBottom: '40px',
          }}>
            {/* Column 1: Logo + 公司简介 */}
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
                      height: '48px',
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
                  width: '48px',
                  height: '48px',
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
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.8, marginBottom: '12px' }}>
                {t.footer.company}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.6 }}>
                {lang === 'ja' ? 'ツインハブで中日をつなぐ物流ソリューション' : 'Twin Hub连接中日的物流解决方案'}
              </p>
            </div>

            {/* Column 2: 服务链接 */}
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>
                {lang === 'ja' ? 'サービス' : '服务'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { key: 'ocean', label: lang === 'ja' ? '海上輸送' : '海运' },
                  { key: 'customs', label: lang === 'ja' ? '通関' : '通关' },
                  { key: 'warehouse', label: lang === 'ja' ? '倉庫' : '仓储' },
                  { key: 'b2c', label: lang === 'ja' ? 'B2C' : 'B2C' },
                  { key: 'tracking', label: lang === 'ja' ? '追跡' : '追踪' },
                  { key: 'consulting', label: lang === 'ja' ? 'コンサル' : '咨询' },
                ].map((item) => (
                  <a key={item.key} href="#services" style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s ease',
                  }}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: 公司链接 */}
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>
                {lang === 'ja' ? '会社情報' : '公司信息'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>
                  {t.nav.about}
                </a>
                <a href="#twin-hub" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>
                  {t.nav.twinHub}
                </a>
                <a href="#cases" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>
                  {t.nav.cases}
                </a>
              </div>
            </div>

            {/* Column 4: 联系信息 */}
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>
                {lang === 'ja' ? 'お問い合わせ' : '联系方式'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6 }}>
                  {t.footer.address}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                  📞 {t.footer.tel}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                  ✉️ {t.footer.email}
                </div>
              </div>
            </div>

            {/* Column 5: 二维码 + SNS */}
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>
                {lang === 'ja' ? 'SNS' : '社交媒体'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                  {lang === 'ja' ? 'QRコード準備中' : '二维码准备中'}
                </div>
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
              © 2024 Answer Supply Chain Co., Ltd. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ANSHomepage;
