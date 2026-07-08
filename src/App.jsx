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
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [modalType, setModalType] = useState('consultation'); // 'consultation' or 'recruit'
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userType, setUserType] = useState('user'); // 'user' or 'employee'
  const [loginData, setLoginData] = useState({
    id: '',
    password: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Logo URL - 从环境变量或 Supabase 获取
  const logoUrl = import.meta.env.VITE_LOGO_URL || null;
  
  // 域名配置 - 从环境变量获取，如果没有则使用默认值
  const domain = import.meta.env.VITE_DOMAIN || 'ans-scm.com';
  // 台账管理（认证在 thsadmin 域完成；VITE_WMS_URL 仅替换域名）
  const wmsUrl = (import.meta.env.VITE_WMS_URL || 'https://thsadmin.ans-scm.com').replace(/\/$/, '');
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzdHFvcmplc3lqYXN4dXJranZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3Mzg4MTksImV4cCI6MjA3NTMxNDgxOX0.mxbC_D6W_SoJKCZUlWiuOzzuG835spbVW_VWW_fK-gE';
  const emailDomain = domain;

  // 页面刷新后滚动到顶部
  useEffect(() => {
    // 使用多种方法确保滚动到顶部
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // 延迟执行一次，确保在DOM完全加载后执行
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

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
        recruit: 'リクルート',
        ths: 'THS',
        contact: 'お問い合わせ',
      },
      hero: {
        title: 'Twin Hub ― 日中をつなぐ物流ソリューション',
        subtitle: '青島・横浜の二拠点体制で、あなたのビジネスを加速',
        features: [
          '✓ 中国コスト × 日本品質',
          '✓ 最短3日で横浜着',
          '✓ 2週間在庫で効率化',
          '✓ 日中専門スタッフ対応'
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
        title: 'ツインハブの連携力',
        subtitle: 'The Power of Twin Hub',
        subtitleEn: 'The Power of Twin Hub',
        qingdao: {
          name: '青島ハブ',
          subtitle: 'コストと流通機能の優位性',
          subtitleEn: 'Cost & Distribution Advantage',
          area: '20,000',
          features: [
            '一期工程20,000㎡の大型倉庫',
            '倉庫費用は日本の約1/3',
            '青島港まで2.5km、鉄道配送対応',
            '集荷・検品・梱包・出荷の一貫対応',
            '包装変更・ラベル貼り対応（同一商品の多チャネル販売対応）',
            '流通加工機能で在庫を柔軟に活用'
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
            'ヤマト横浜ベースまで400m、当日出荷対応',
            '推奨在庫：2週間分（需要予測に基づき自動補給）'
          ]
        },
        connection: '連携システム',
        connectionSub: '最低在庫設定 × 販売予測 → 自動配分',
        connectionDesc: '横浜2週間在庫を維持、青島で必要量を保管・加工して自動補給'
      },
      services: {
        title: 'サービス内容',
        subtitle: 'Our Services',
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
        title: 'Answerの歩み',
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
      about: {
        title: '会社概要',
        subtitle: 'Company Profile',
        established: '2024年6月',
        establishedEn: 'June 2024',
        capital: '5,000万円',
        capitalEn: '50,000,000 JPY',
        address: '〒236-0001 神奈川県横浜市金沢区昭和町3174 ランドポート横浜杉田1F',
        addressEn: '〒236-0001 Kanagawa, Yokohama, Kanazawa Ward, Showa-cho 3174 Landport Yokohama Sugita 1F',
        employees: '8名',
        employeesEn: '8',
      },
      recruit: {
        title: 'リクルート',
        subtitle: 'Recruitment',
        subtitleEn: 'Recruitment',
        description: '一緒に日中物流の未来を創りませんか？',
        descriptionZh: '一起创造日中物流的未来吧？',
        jobs: [
          {
            title: '輸出入業務担当',
            titleEn: 'Import/Export Operations',
            titleZh: '进出口业务担当',
            description: '輸出入書類作成、通関手続き、顧客対応等を担当いただきます。貿易実務経験を活かして、日中物流の最前線で活躍していただけます。',
            descriptionZh: '负责进出口文件制作、清关手续、客户对应等。发挥贸易实务经验，在日中物流最前线活跃。',
            requirements: ['貿易実務経験2年以上', '基本的なPCスキル（Excel、Word）', 'コミュニケーション能力', '責任感とチームワーク精神'],
            requirementsZh: ['贸易实务经验2年以上', '基本的PC技能（Excel、Word）', '沟通能力', '责任感和团队合作精神']
          },
          {
            title: '倉庫作業員',
            titleEn: 'Warehouse Worker',
            titleZh: '仓库作业员',
            description: '入出庫作業、検品、ラベル貼り、在庫管理などの倉庫業務を担当いただきます。安全第一で、効率的な作業を心がけていただける方を募集しています。',
            descriptionZh: '负责出入库作业、检品、贴标签、库存管理等仓库业务。招募能够以安全第一、追求高效作业的候选人。',
            requirements: ['体力に自信がある方', '安全意識の高い方', 'チームワークが取れる方', '未経験者歓迎'],
            requirementsZh: ['有体力自信', '安全意识高', '能够团队合作', '欢迎无经验者']
          },
          {
            title: '経理担当者',
            titleEn: 'Accounting Staff',
            titleZh: '会计担当',
            description: '日次・月次の帳簿処理、請求書・支払管理、決算業務などを担当いただきます。会計知識を活かして、会社の経営をサポートしていただきます。',
            descriptionZh: '负责日常・月度账务处理、发票・支付管理、决算业务等。发挥会计知识，支持公司经营。',
            requirements: ['会計実務経験3年以上', '簿記2級以上', '会計ソフト操作経験', '細かさと正確性'],
            requirementsZh: ['会计实务经验3年以上', '簿记2级以上', '会计软件操作经验', '细致和准确性']
          }
        ]
      },
      message: {
        title: 'Supply Chain, we are the ANSWER.',
        titleZh: '供应链，我们是答案。',
        subtitle: '代表取締役からのメッセージ',
        subtitleZh: '社长致辞',
        content: `アンササプライチェーン株式会社は、2024年6月に設立された新しい企業です。私たちの使命は、「Supply Chain, we are the ANSWER.」という理念のもと、日中間の物流を革新することです。

グローバル化が進む現代において、効率的で信頼性の高いサプライチェーン管理は、企業の成功に不可欠です。私たちは、青島と横浜という2つの戦略的拠点を活用し、日本企業と中国企業の両方のビジネスをサポートします。

20年以上の物流経験を持つ親会社の豊富なノウハウと、最新のテクノロジーを組み合わせることで、従来の物流サービスを超えた価値を提供します。ツインハブシステムにより、コストを30-45%削減しながら、スピードと品質を両立します。

日本企業様には、中国からの輸入を最適化し、在庫管理の効率化を実現します。中国企業様には、日本市場への進出を全面的にサポートし、ACP登録からJCT対応、日本法人設立まで、あらゆる段階でお客様と共に歩みます。

未来への挑戦、私たちがその答えです。`,
        contentZh: `安尔速供应链株式会社成立于2024年6月。我们的使命是在"Supply Chain, we are the ANSWER."这一理念下，革新日中之间的物流。

在全球化的今天，高效且可靠的供应链管理对企业成功至关重要。我们利用青岛和横滨两个战略据点，支持日本企业和中国企业双方的业务。

我们结合拥有20年以上物流经验的母公司（親会社）的丰富经验和最新技术，提供超越传统物流服务的价值。通过Twin Hub（ツインハブ）系统，在降低成本30-45%的同时，兼顾速度与品质。


面向未来的挑战，我们就是答案。`,
      },
      process: {
        title: 'ご利用の流れ',
        subtitle: 'Service Process',
        subtitleEn: 'Service Process',
        steps: [
          { num: '1', title: 'お問い合わせ', titleEn: 'Inquiry', titleZh: '咨询', desc: 'お電話またはフォームでお気軽にご連絡ください', descZh: '电话或表单咨询' },
          { num: '2', title: 'お見積り・ご契約', titleEn: 'Quote', titleZh: '报价', desc: '貨物情報をもとに最適なプランをご提案', descZh: '根据货物提供最优方案' },
          { num: '3', title: '貨物受入れ', titleEn: 'Receiving', titleZh: '收货', desc: '青島または横浜倉庫で貨物をお預かり', descZh: '青岛或横滨仓库收货' },
          { num: '4', title: '配送', titleEn: 'Delivery', titleZh: '配送', desc: 'ご指定の届け先まで確実にお届け', descZh: '准确送达指定地点' },
        ]
      },
      cta: {
        title: '共筑双倉、航通日中',
        subtitle: '青島・横浜双倉で、あなたのビジネスを加速',
        features: ['初期費用0円', '柔軟な契約期間', '日中専門サポート', '即日対応可能'],
        btn1: '無料資料をダウンロード',
        btn2: 'お問い合わせ',
      },
      footer: {
        company: 'アンササプライチェーン株式会社',
        address: '〒236-0001 神奈川県横浜市金沢区昭和町3174 ランドポート横浜杉田1F',
        tel: 'TEL: 045-349-3730',
        email: `Email: info@${emailDomain}`,
        copyright: '© 2024 Answer Supply Chain Co., Ltd. All rights reserved.',
      }
    },
    zh: {
      nav: {
        home: '首页',
        about: '公司概况',
        twinHub: '双仓联动',
        services: '服务内容',
        recruit: '招聘',
        ths: 'THS',
        contact: '联系我们',
      },
      hero: {
        title: 'Twin Hub — 连接日中的物流解决方案',
        subtitle: '青岛・横滨双据点，助力您的业务腾飞',
        features: [
          '✓ 中国成本 × 日本品质',
          '✓ 最快3天抵达横滨',
          '✓ 2周库存高效周转',
          '✓ 日中专业团队服务'
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
        title: 'Twin Hub的协同力',
        subtitle: 'Twin Hub的协同力',
        subtitleEn: 'The Power of Twin Hub',
        qingdao: {
          name: '青岛Hub',
          subtitle: '成本与流通功能优势',
          subtitleEn: 'Cost & Distribution Advantage',
          area: '20,000',
          features: [
            '一期工程20,000㎡大型仓库',
            '仓储费用约为日本的1/3',
            '距青岛港2.5km，铁路配套完善',
            '集货・检品・包装・出运一站式服务',
            '包装修改・标签贴附（同一商品多渠道销售支持）',
            '流通加工功能，灵活利用库存'
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
            '距黑猫主力店400m，当日出货',
            '推荐库存：2周量（根据需求预测自动补货）'
          ]
        },
        connection: '联动系统',
        connectionSub: '最低库存设定 × 销售预测 → 自动调配',
        connectionDesc: '横滨维持2周库存，青岛保管必要量并加工后自动补货'
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
        title: 'Answerの歩み',
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
      about: {
        title: '公司概况',
        subtitle: 'Company Profile',
        companyName: 'Answer Supply Chain Co., Ltd.\nアンササプライチェーン株式会社',
        companyNameEn: 'Answer Supply Chain Co., Ltd.\nAnswer Supply Chain Co., Ltd.',
        established: '2024年6月',
        establishedEn: 'June 2024',
        capital: '5,000万日元',
        capitalEn: '50,000,000 JPY',
        address: '〒236-0001 神奈川县横滨市金泽区昭和町3174 Landport横滨杉田1F',
        addressEn: '〒236-0001 Kanagawa, Yokohama, Kanazawa Ward, Showa-cho 3174 Landport Yokohama Sugita 1F',
        employees: '8人',
        employeesEn: '8',
      },
      recruit: {
        title: '招聘',
        subtitle: 'Recruitment',
        subtitleEn: 'Recruitment',
        description: '一起创造日中物流的未来吧？',
        descriptionZh: '一起创造日中物流的未来吧？',
        jobs: [
          {
            title: '进出口业务担当',
            titleEn: 'Import/Export Operations',
            titleZh: '进出口业务担当',
            description: '负责进出口文件制作、清关手续、客户对应等。发挥贸易实务经验，在日中物流最前线活跃。',
            descriptionZh: '负责进出口文件制作、清关手续、客户对应等。发挥贸易实务经验，在日中物流最前线活跃。',
            requirements: ['贸易实务经验2年以上', '基本的PC技能（Excel、Word）', '沟通能力', '责任感和团队合作精神'],
            requirementsZh: ['贸易实务经验2年以上', '基本的PC技能（Excel、Word）', '沟通能力', '责任感和团队合作精神']
          },
          {
            title: '仓库作业员',
            titleEn: 'Warehouse Worker',
            titleZh: '仓库作业员',
            description: '负责出入库作业、检品、贴标签、库存管理等仓库业务。招募能够以安全第一、追求高效作业的候选人。',
            descriptionZh: '负责出入库作业、检品、贴标签、库存管理等仓库业务。招募能够以安全第一、追求高效作业的候选人。',
            requirements: ['有体力自信', '安全意识高', '能够团队合作', '欢迎无经验者'],
            requirementsZh: ['有体力自信', '安全意识高', '能够团队合作', '欢迎无经验者']
          },
          {
            title: '会计担当',
            titleEn: 'Accounting Staff',
            titleZh: '会计担当',
            description: '负责日常・月度账务处理、发票・支付管理、决算业务等。发挥会计知识，支持公司经营。',
            descriptionZh: '负责日常・月度账务处理、发票・支付管理、决算业务等。发挥会计知识，支持公司经营。',
            requirements: ['会计实务经验3年以上', '簿记2级以上', '会计软件操作经验', '细致和准确性'],
            requirementsZh: ['会计实务经验3年以上', '簿记2级以上', '会计软件操作经验', '细致和准确性']
          }
        ]
      },
      message: {
        title: 'Supply Chain, we are the ANSWER.',
        titleZh: '供应链，我们是答案。',
        subtitle: '社长致辞',
        subtitleZh: '社长致辞',
        content: `安尔速供应链株式会社成立于2024年6月。我们的使命是在"Supply Chain, we are the ANSWER."这一理念下，革新中日之间的物流。

在全球化的今天，高效且可靠的供应链管理对企业成功至关重要。我们利用青岛和横滨两个战略据点，支持日本企业和中国企业双方的业务。

我们结合拥有20年以上物流经验的母公司（親会社）的丰富经验和最新技术，提供超越传统物流服务的价值。通过Twin Hub（ツインハブ）系统，在降低成本30-45%的同时，兼顾速度与品质。


面向未来的挑战，我们就是答案。`,
        contentZh: `安尔速供应链株式会社成立于2024年6月。我们的使命是在"Supply Chain, we are the ANSWER."这一理念下，革新日中之间的物流。

在全球化的今天，高效且可靠的供应链管理对企业成功至关重要。我们利用青岛和横滨两个战略据点，支持日本企业和中国企业双方的业务。

我们结合拥有20年以上物流经验的母公司（親会社）的丰富经验和最新技术，提供超越传统物流服务的价值。通过Twin Hub（ツインハブ）系统，在降低成本30-45%的同时，兼顾速度与品质。


面向未来的挑战，我们就是答案。`,
      },
      process: {
        title: '服务流程',
        subtitle: 'Service Process',
        steps: [
          { num: '01', title: '咨询', titleEn: 'Inquiry', desc: '请随时与我们联系', time: '即时对应' },
          { num: '02', title: '报价・签约', titleEn: 'Quotation', desc: '为您提供最优方案', time: '1-2工作日' },
          { num: '03', title: '货物接收', titleEn: 'Receiving', desc: '青岛仓库接收货物', time: '随时' },
          { num: '04', title: '配送', titleEn: 'Delivery', desc: '准确送达日本国内', time: '最快3天' },
        ]
      },
      cta: {
        title: '共筑双仓，航通日中',
        subtitle: '青岛・横滨双仓，为您的业务加速',
        features: ['初期费用0元', '灵活合同期限', '日中专业支持', '即日对应可能'],
        btn1: '下载免费资料',
        btn2: '联系我们',
      },
      footer: {
        company: 'Answer Supply Chain Co., Ltd.',
        address: '〒236-0001 神奈川県横浜市金沢区昭和町3174 Landport横浜杉田1F',
        tel: 'TEL: 045-349-3730',
        email: `Email: info@${emailDomain}`,
        copyright: '© 2024 Answer Supply Chain Co., Ltd. 版权所有',
      }
    }
  };

  const t = content[lang];

  // 统计数据动画
  const area = useCountUp(28000, 2000);
  const delivery = useCountUp(99.8, 2000);
  const turnover = useCountUp(2, 2000);
  const shipments = useCountUp(38000, 2000);

  const statsSection = useScrollReveal();
  const warehouseSection = useScrollReveal();
  const servicesSection = useScrollReveal();
  const timelineSection = useScrollReveal();
  const aboutSection = useScrollReveal();
  const recruitSection = useScrollReveal();
  const messageSection = useScrollReveal();
  const processSection = useScrollReveal();

  const [activeSection, setActiveSection] = useState('home');

  const openLoginModal = () => {
    setUserType('user');
    setLoginData({ id: '', password: '' });
    setLoginModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'home', offset: 0 },
        { id: 'twin-hub', offset: (document.getElementById('twin-hub')?.offsetTop || 0) - 150 },
        { id: 'services', offset: (document.getElementById('services')?.offsetTop || 0) - 150 },
        { id: 'about', offset: (document.getElementById('about')?.offsetTop || 0) - 150 },
        { id: 'recruit', offset: (document.getElementById('recruit')?.offsetTop || 0) - 150 },
      ];

      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offset) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      fontFamily: "'Noto Sans JP', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#2C3E50',
      lineHeight: 1.6,
      overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;800&family=Noto+Sans+SC:wght@300;400;500;700&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        .service-card {
          position: relative;
          overflow: hidden;
        }
        
        .service-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important;
        }
        
        .service-card-image {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .service-card:hover .service-card-image {
          transform: rotate(8deg) scale(1.1) !important;
        }
        
        .timeline-item .timeline-content-left > div,
        .timeline-item .timeline-content-right > div {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        
        .timeline-item:hover .timeline-content-left > div,
        .timeline-item:hover .timeline-content-right > div {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important;
          border-color: #FF8C00 !important;
        }
        
        .timeline-item:hover .timeline-dot {
          transform: scale(1.2);
          box-shadow: 0 0 0 8px rgba(255, 140, 0, 0.2) !important;
        }
        
        .timeline-dot {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
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
          /* 全局字体大小大幅增加 */
          body {
            font-size: 20px !important;
          }
          
          /* Header responsive */
          header {
            padding: 12px 16px !important;
            height: auto !important;
            min-height: 56px !important;
          }
          
          /* Hide desktop nav on mobile */
          .desktop-nav {
            display: none !important;
          }
          
          /* Show mobile menu button on mobile */
          .mobile-menu-btn {
            display: flex !important;
          }
          
          /* Logo text larger on mobile */
          .logo-text {
            font-size: 18px !important;
          }
          
          .logo-subtext {
            font-size: 12px !important;
          }
          
          /* Hero section mobile - 充满屏幕并居中 */
          .hero-section {
            padding: 40px 16px 60px !important;
            min-height: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            text-align: center !important;
          }
          
          /* Hero 标题字体大幅增大 */
          .hero-section h1 {
            font-size: clamp(36px, 10vw, 52px) !important;
            line-height: 1.3 !important;
            text-align: center !important;
          }
          
          /* Hero 副标题字体增大 */
          .hero-section p {
            font-size: clamp(18px, 5vw, 22px) !important;
            text-align: center !important;
          }
          
          /* Hero features grid to single column - 字体增大并居中 */
          .hero-features-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
            justify-items: center !important;
            text-align: center !important;
            margin: 0 auto !important;
          }
          
          .hero-features-grid > div {
            font-size: 20px !important;
            text-align: center !important;
            justify-content: center !important;
          }
          
          /* Hero CTA buttons stack on mobile - 字体增大并居中 */
          .hero-cta-buttons {
            flex-direction: column !important;
            width: 100% !important;
            align-items: center !important;
          }
          
          .hero-cta-buttons button {
            width: 100% !important;
            max-width: 100% !important;
            padding: 18px 32px !important;
            font-size: 20px !important;
          }
          
          /* Section padding mobile - 充满屏幕并居中 */
          section {
            padding: 40px 16px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            text-align: center !important;
          }
          
          /* Section 标题字体大幅增大并居中 */
          section h2 {
            font-size: clamp(32px, 8vw, 40px) !important;
            text-align: center !important;
          }
          
          section h3 {
            font-size: clamp(26px, 6vw, 32px) !important;
            text-align: center !important;
          }
          
          /* 所有容器充满屏幕并居中 */
          * {
            max-width: 100% !important;
          }
          
          /* Stats grid mobile - single column并居中 */
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            justify-items: center !important;
            margin: 0 auto !important;
          }
          
          /* Services grid mobile - single column - 字体增大并居中 */
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            justify-items: center !important;
            margin: 0 auto !important;
          }
          
          /* Service card 内容字体大幅增大并居中 */
          .service-card {
            text-align: center !important;
            margin: 0 auto !important;
            width: 100% !important;
          }
          
          .service-card h3 {
            font-size: 28px !important;
            text-align: center !important;
          }
          
          .service-card p {
            font-size: 18px !important;
            text-align: center !important;
          }
          
          .service-card li {
            font-size: 17px !important;
            text-align: left !important;
          }
          
          /* Twin Hub warehouse cards - single column并居中 */
          .warehouse-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            justify-items: center !important;
            margin: 0 auto !important;
          }
          
          .warehouse-card {
            padding: 28px !important;
            text-align: center !important;
            width: 100% !important;
            margin: 0 auto !important;
          }
          
          .warehouse-card h3 {
            font-size: 26px !important;
          }
          
          .warehouse-card p {
            font-size: 17px !important;
          }
          
          /* Timeline responsive - 字体增大并居中 */
          .timeline-line {
            display: none !important;
          }
          .timeline-item {
            flex-direction: column !important;
            align-items: center !important;
            gap: 20px !important;
            text-align: center !important;
          }
          .timeline-content-left {
            width: 100% !important;
            text-align: center !important;
          }
          .timeline-content-right {
            width: 100% !important;
            text-align: center !important;
          }
          .timeline-spacer {
            display: none !important;
          }
          .timeline-dot {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            margin: 0 auto !important;
          }
          
          /* Footer responsive */
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            text-align: center !important;
          }
          
          /* Process steps responsive */
          .process-steps {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          
          /* Service card image smaller on mobile */
          .service-image-card {
            width: 80px !important;
            height: 80px !important;
          }
          
          /* Recruit cards mobile并居中 */
          .recruit-grid {
            grid-template-columns: 1fr !important;
            justify-items: center !important;
            margin: 0 auto !important;
          }
          
          /* Modal mobile adjustments */
          .modal-content {
            width: 95% !important;
            max-width: 95% !important;
            margin: 20px auto !important;
            padding: 24px !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
          
          /* Table 内容字体增大并居中 */
          table {
            font-size: 18px !important;
            margin: 0 auto !important;
          }
          
          /* 按钮字体增大 */
          button {
            font-size: 18px !important;
          }
          
          /* 链接字体增大 */
          a {
            font-size: 18px !important;
          }
          
          /* 所有卡片和容器居中 */
          [style*="maxWidth"], [style*="max-width"] {
            margin-left: auto !important;
            margin-right: auto !important;
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
          color: #FF8C00 !important;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #FF8C00;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: #FF8C00 !important;
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
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        
        .warehouse-card:hover {
          transform: scale(1.02);
        }
        
        .process-step:hover .step-number {
          transform: scale(1.1);
        }

        .process-step {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .recruit-card {
          display: flex;
          flex-direction: column;
          height: 100%;
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
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', cursor: 'pointer' }}
          >
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
              background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
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
              <div className="logo-text" style={{ fontWeight: 700, fontSize: '16px', color: '#1A3A52' }}>
                ANSWER SUPPLY CHAIN
              </div>
              <div className="logo-subtext" style={{ fontSize: '11px', color: '#7F8C9A', letterSpacing: '0.5px' }}>
                共筑双倉、航通日中
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}>
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease', cursor: 'pointer' }}
            >
              {t.nav.home}
            </a>
            <a href="#twin-hub" className={`nav-link ${activeSection === 'twin-hub' ? 'active' : ''}`} style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease' }}>
              {t.nav.twinHub}
            </a>
            <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease' }}>
              {t.nav.services}
            </a>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease' }}>
              {t.nav.about}
            </a>
            <a href="#recruit" className={`nav-link ${activeSection === 'recruit' ? 'active' : ''}`} style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease' }}>
              {t.nav.recruit}
            </a>
            <button
              type="button"
              onClick={openLoginModal}
              className="nav-link"
              style={{ position: 'relative', color: '#2C3E50', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'color 0.3s ease', cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontFamily: 'inherit' }}
            >
              {t.nav.ths}
            </button>
            
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
                  background: lang === 'zh' ? '#FF8C00' : 'transparent',
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
              onClick={() => {
                setModalType('consultation');
                setConsultationModalOpen(true);
              }}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(211, 47, 47, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t.nav.contact}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <span style={{
              width: '24px',
              height: '3px',
              background: '#2C3E50',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none',
            }}></span>
            <span style={{
              width: '24px',
              height: '3px',
              background: '#2C3E50',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              opacity: mobileMenuOpen ? 0 : 1,
            }}></span>
            <span style={{
              width: '24px',
              height: '3px',
              background: '#2C3E50',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none',
            }}></span>
          </button>
        </div>
        
        {/* Mobile Menu Panel */}
        <div className="mobile-menu-panel" style={{
          display: mobileMenuOpen ? 'flex' : 'none',
          position: 'fixed',
          top: scrolled ? '64px' : '80px',
          left: 0,
          right: 0,
          background: 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          flexDirection: 'column',
          padding: '20px 16px',
          gap: '16px',
          zIndex: 999,
          maxHeight: `calc(100vh - ${scrolled ? '64px' : '80px'})`,
          overflowY: 'auto',
        }}>
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ color: '#2C3E50', textDecoration: 'none', fontSize: '18px', fontWeight: 500, padding: '12px 0', borderBottom: '1px solid #E8ECF0' }}
          >
            {t.nav.home}
          </a>
          <a 
            href="#twin-hub" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#2C3E50', textDecoration: 'none', fontSize: '18px', fontWeight: 500, padding: '12px 0', borderBottom: '1px solid #E8ECF0' }}
          >
            {t.nav.twinHub}
          </a>
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#2C3E50', textDecoration: 'none', fontSize: '18px', fontWeight: 500, padding: '12px 0', borderBottom: '1px solid #E8ECF0' }}
          >
            {t.nav.services}
          </a>
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#2C3E50', textDecoration: 'none', fontSize: '18px', fontWeight: 500, padding: '12px 0', borderBottom: '1px solid #E8ECF0' }}
          >
            {t.nav.about}
          </a>
          <a 
            href="#recruit" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#2C3E50', textDecoration: 'none', fontSize: '18px', fontWeight: 500, padding: '12px 0', borderBottom: '1px solid #E8ECF0' }}
          >
            {t.nav.recruit}
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              openLoginModal();
            }}
            style={{ color: '#2C3E50', textDecoration: 'none', fontSize: '18px', fontWeight: 500, padding: '12px 0', borderBottom: '1px solid #E8ECF0', background: 'none', borderLeft: 'none', borderRight: 'none', borderTop: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {t.nav.ths}
          </button>
          
          {/* Language Switcher in Mobile Menu */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 0',
            borderBottom: '1px solid #E8ECF0',
          }}>
            <button
              onClick={() => setLang('ja')}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                borderRadius: '8px',
                background: lang === 'ja' ? '#1A3A52' : '#F5F7FA',
                color: lang === 'ja' ? 'white' : '#7F8C9A',
                fontSize: '16px',
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
                flex: 1,
                padding: '10px',
                border: 'none',
                borderRadius: '8px',
                background: lang === 'zh' ? '#FF8C00' : '#F5F7FA',
                color: lang === 'zh' ? 'white' : '#7F8C9A',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              🇨🇳 中文
            </button>
          </div>
          
          {/* CTA Button in Mobile Menu */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setModalType('consultation');
              setConsultationModalOpen(true);
            }}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '18px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            {t.nav.contact}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section" style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: 'url(https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/back.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Dark Overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(26, 58, 82, 0.85) 0%, rgba(13, 31, 45, 0.85) 50%, rgba(26, 58, 82, 0.85) 100%)',
          zIndex: 0,
        }} />
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          opacity: 0.1,
          zIndex: 1,
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

<div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '120px 24px 80px',
          width: '100%',
          position: 'relative',
          zIndex: 2,
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
            <div className="fade-in-delay-2 hero-features-grid" style={{
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
            <div className="fade-in-delay-3 hero-cta-buttons" style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              <button 
                className="btn-primary" 
                onClick={() => {
                  setModalType('consultation');
                  setConsultationModalOpen(true);
                }}
                style={{
                  padding: '18px 40px',
                  background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
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
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(211, 47, 47, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {t.hero.cta1}
              </button>
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
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              {lang === 'ja' ? t.twinHub.subtitle : t.twinHub.subtitleEn}
            </p>
          </div>

          {/* Warehouse Comparison */}
          <div className="warehouse-cards-grid" style={{
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
                border: '3px solid #FF8C00',
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
                color: '#FF8C00',
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
                  color: '#FF8C00',
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
                      background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
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
                background: 'linear-gradient(90deg, #FF8C00 0%, #004E89 50%, #004E89 100%)',
                borderRadius: '2px',
                position: 'relative',
                marginBottom: '24px',
              }}>
              </div>
              <div style={{
                textAlign: 'center',
                background: 'white',
                padding: '20px 24px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                maxWidth: '280px',
              }}>
                <div style={{
                  fontWeight: 700,
                  color: '#1A3A52',
                  fontSize: '16px',
                  marginBottom: '8px',
                }}>
                  {t.twinHub.connection}
                </div>
                <div style={{
                  color: '#FF8C00',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}>
                  {t.twinHub.connectionSub}
                </div>
                {t.twinHub.connectionDesc && (
                  <div style={{
                    color: '#7F8C9A',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid #E5E9F0',
                  }}>
                    {t.twinHub.connectionDesc}
                  </div>
                )}
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
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              {lang === 'ja' ? t.services.subtitle : t.services.subtitleEn}
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {t.services.items.map((service, i) => {
              // 为每个服务卡片配置背景图片 - 使用索引映射更可靠
              const backgroundImages = [
                'https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/OCEAN.png', // 海上輸送サービス
                'https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/CUSTOMER.png', // 通関代理サービス
                'https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/warehouse.png', // 倉庫管理サービス
                'https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/B2C-2.png', // B2C発送代行サービス
                'https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/TIME.png', // 貨物追跡システム
                'https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/consloe.png', // 総合コンサルティング
              ];
              
              const backgroundImage = backgroundImages[i] || null;
              const hasBackground = !!backgroundImage;
              
              return (
              <div 
                key={i}
                className="service-card"
                style={{
                  background: 'white',
                  position: 'relative',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  border: '1px solid #E8ECF0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  opacity: servicesSection.isVisible ? 1 : 0,
                  transform: servicesSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 0.1}s`,
                  overflow: 'visible',
                }}
              >
                {/* 右下角图片卡片 */}
                {hasBackground && (
                  <div 
                    className="service-card-image"
                    style={{
                      position: 'absolute',
                      bottom: '-20px',
                      right: '-20px',
                      width: '140px',
                      height: '140px',
                      borderRadius: '12px',
                      backgroundImage: `url("${backgroundImage}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      zIndex: 10,
                      overflow: 'hidden',
                      border: '3px solid white',
                      transform: 'rotate(5deg)',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }} 
                  />
                )}
                {/* 内容层 */}
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                }}>
                {/* Icon - 所有服务都不显示图标 */}
                {/* Icon removed - 所有卡片都不显示图标 */}

                {/* Title - 所有服务使用特殊字体和样式 */}
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#1A3A52',
                  marginBottom: '8px',
                  fontFamily: '"Noto Sans JP", sans-serif',
                  letterSpacing: '0.8px',
                  lineHeight: '1.3',
                }}>
                  {service.title}
                </h3>
                {service.subtitle && (
                  <p style={{
                    color: '#1A3A52',
                    fontSize: '18px',
                    marginBottom: '12px',
                    fontWeight: 700,
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: 'italic',
                    letterSpacing: '0.5px',
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
                </div>
              </div>
              );
            })}
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
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontWeight: 700,
              letterSpacing: '0.5px',
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
              background: 'linear-gradient(180deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
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
                          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          cursor: 'pointer',
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
                            fontFamily: '"Playfair Display", serif',
                            fontStyle: 'italic',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
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
                          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          cursor: 'pointer',
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
                            fontFamily: '"Playfair Display", serif',
                            fontStyle: 'italic',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
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

      {/* About Section - 公司概况 */}
      <section 
        ref={aboutSection.ref}
        id="about"
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
            opacity: aboutSection.isVisible ? 1 : 0,
            transform: aboutSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: '#1A3A52',
              marginBottom: '8px',
            }}>
              {t.about.title}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#7F8C9A',
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              {t.about.subtitle}
            </p>
          </div>

          {/* Company Info Section Container */}
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            opacity: aboutSection.isVisible ? 1 : 0,
            transform: aboutSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            {/* Left Column: Info List */}
            <div style={{
              flex: '1 1 500px',
              minWidth: '300px',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <tbody>
                  {/* Company Name */}
                  <tr style={{ borderBottom: '1px solid #E8ECF0' }}>
                    <td style={{
                      padding: '28px 0',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#2E8B98',
                      width: '30%',
                      verticalAlign: 'top',
                    }}>
                      {lang === 'ja' ? '企業名' : '企业名称'}
                    </td>
                    <td style={{
                      padding: '28px 0 28px 32px',
                      fontSize: '16px',
                      color: '#2C3E50',
                      lineHeight: 1.8,
                      whiteSpace: 'pre-line',
                    }}>
                      {lang === 'ja' ? 'Answer Supply Chain Co., Ltd.\nアンササプライチェーン株式会社' : 'Answer Supply Chain Co., Ltd.\nAnswer Supply Chain Co., Ltd.'}
                    </td>
                  </tr>

                  {/* Established */}
                  <tr style={{ borderBottom: '1px solid #E8ECF0' }}>
                    <td style={{
                      padding: '28px 0',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#2E8B98',
                      verticalAlign: 'top',
                    }}>
                      {lang === 'ja' ? '設立年月日' : '成立时间'}
                    </td>
                    <td style={{
                      padding: '28px 0 28px 32px',
                      fontSize: '16px',
                      color: '#2C3E50',
                      lineHeight: 1.8,
                    }}>
                      {lang === 'ja' ? t.about.established : t.about.establishedEn}
                    </td>
                  </tr>

                  {/* Capital */}
                  <tr style={{ borderBottom: '1px solid #E8ECF0' }}>
                    <td style={{
                      padding: '28px 0',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#2E8B98',
                      verticalAlign: 'top',
                    }}>
                      {lang === 'ja' ? '資本金' : '资本金'}
                    </td>
                    <td style={{
                      padding: '28px 0 28px 32px',
                      fontSize: '16px',
                      color: '#2C3E50',
                      lineHeight: 1.8,
                    }}>
                      {lang === 'ja' ? t.about.capital : t.about.capitalEn}
                    </td>
                  </tr>

                  {/* Access */}
                  <tr style={{ borderBottom: '1px solid #E8ECF0' }}>
                    <td style={{
                      padding: '28px 0',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#2E8B98',
                      verticalAlign: 'top',
                    }}>
                      {lang === 'ja' ? 'アクセス' : '公司地址'}
                    </td>
                    <td style={{
                      padding: '28px 0 28px 32px',
                      fontSize: '16px',
                      color: '#2C3E50',
                      lineHeight: 1.8,
                    }}>
                      {lang === 'ja' ? t.about.address : t.about.addressEn}
                    </td>
                  </tr>

                   {/* Business Guide */}
                   <tr style={{ borderBottom: '1px solid #E8ECF0' }}>
                    <td style={{
                      padding: '28px 0',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#2E8B98',
                      verticalAlign: 'top',
                    }}>
                      {lang === 'ja' ? '事業案内' : '业务介绍'}
                    </td>
                    <td style={{
                      padding: '28px 0 28px 32px',
                      fontSize: '16px',
                      color: '#2C3E50',
                      lineHeight: 1.8,
                    }}>
                      {lang === 'ja' ? '日中間の国際物流サービス全般' : '中日国际物流服务全般'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Column: Images */}
            <div style={{
              flex: '0 0 340px',
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              <div style={{
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                height: '220px',
              }}>
                <img 
                  src="https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/Front.jpg" 
                  alt="Building Front"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                height: '220px',
              }}>
                <img 
                  src="https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/office.jpg" 
                  alt="Office Interior"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - 数据展示区块 */}
      <section 
        ref={statsSection.ref}
        style={{
          background: '#F5F7FA',
          padding: '100px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Stats Cards - 4项数据，2列×2行 */}
          <div className="fade-in-delay-4 stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '40px',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {[
              { key: 'area', countHook: area, isNumber: true },
              { key: 'delivery', countHook: delivery, isNumber: true },
              { key: 'turnover', countHook: turnover, isNumber: true },
              { key: 'shipments', countHook: shipments, isNumber: true },
            ].map((stat, i) => {
              const statData = t.stats[stat.key];
              // useCountUp 返回 { count, ref }
              // 当statsSection可见时，使用count值；如果count为0但section可见，直接显示最终值
              const targetValues = {
                area: 28000,
                delivery: 99.8,
                turnover: 2,
                shipments: 38000
              };
              const displayCount = statsSection.isVisible ? 
                (stat.countHook.count > 0 ? stat.countHook.count : targetValues[stat.key]) : 0;
              return (
                <div key={stat.key} ref={stat.countHook.ref} className="stat-card" style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid #E8ECF0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>
                    {statData.icon}
                  </div>
                  <div style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 700, color: '#1A3A52', lineHeight: 1 }}>
                    {stat.isNumber ? displayCount.toLocaleString() : statData.value}
                    <span style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', marginLeft: '4px' }}>
                      {statData.unit}
                    </span>
                  </div>
                  <div style={{ color: '#7F8C9A', fontSize: '16px', marginTop: '12px' }}>
                    {statData.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Message Section - 社长致辞 */}
      <section 
        ref={messageSection.ref}
        style={{
          background: 'linear-gradient(135deg, #1A3A52 0%, #0D1F2D 100%)',
          padding: '100px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #FF8C00 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, #FF8C00 0%, transparent 50%)
          `,
        }} />

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            opacity: messageSection.isVisible ? 1 : 0,
            transform: messageSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}>
              {t.message.title}
            </h2>
            <p style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 500,
            }}>
              {lang === 'ja' ? t.message.subtitle : t.message.subtitleZh}
            </p>
          </div>

          {/* Message Content */}
          <div style={{
            background: 'rgba(255,255,255,0.98)',
            borderRadius: '24px',
            padding: '60px 48px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            opacity: messageSection.isVisible ? 1 : 0,
            transform: messageSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            <div style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#2C3E50',
              whiteSpace: 'pre-line',
            }}>
              {lang === 'ja' ? t.message.content : t.message.contentZh}
            </div>
            
            {/* Signature */}
            <div style={{
              marginTop: '40px',
              paddingTop: '32px',
              borderTop: '2px solid #E8ECF0',
              textAlign: 'right',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                gap: '8px',
                marginBottom: '4px',
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1A3A52',
                }}>
                  代表取締役
                </span>
                <span style={{
                  fontSize: '24px',
                  fontFamily: '"楷体", "KaiTi", "STKaiti", "华文楷体", serif',
                  fontWeight: 600,
                  color: '#1A3A52',
                }}>
                  李林子
                </span>
              </div>
              <div style={{
                fontSize: '14px',
                color: '#7F8C9A',
              }}>
                CEO, Answer Supply Chain Co., Ltd.
              </div>
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
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              {lang === 'ja' ? t.process.subtitle : t.process.subtitleEn}
            </p>
          </div>

          {/* Process Steps - 4步横向流程 */}
          <div className="process-steps" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            alignItems: 'stretch',
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
                {/* Step Number - 80px圆形，物流橙背景 */}
                <div 
                  className="step-number"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
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
                  fontFamily: lang === 'ja' ? '"Playfair Display", serif' : (step.titleZh ? 'inherit' : '"Playfair Display", serif'),
                  fontStyle: lang === 'ja' || !step.titleZh ? 'italic' : 'normal',
                  fontWeight: lang === 'ja' || !step.titleZh ? 700 : 'normal',
                  letterSpacing: lang === 'ja' || !step.titleZh ? '0.5px' : 'normal',
                }}>
                  {lang === 'ja' ? step.titleEn : (step.titleZh || step.titleEn)}
                </p>

                {/* Description */}
                <p style={{
                  color: '#4B5563',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  flex: 1,
                  minHeight: '45px',
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
                    background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
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

      {/* Recruit Section - 招聘 */}
      <section 
        ref={recruitSection.ref}
        id="recruit"
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
            opacity: recruitSection.isVisible ? 1 : 0,
            transform: recruitSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: '#1A3A52',
              marginBottom: '8px',
            }}>
              {t.recruit.title}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#7F8C9A',
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              {t.recruit.subtitleEn}
            </p>
            <p style={{
              fontSize: '16px',
              color: '#4B5563',
              marginTop: '16px',
            }}>
              {lang === 'ja' ? t.recruit.description : t.recruit.descriptionZh}
            </p>
          </div>

          {/* Job Cards */}
          <div className="recruit-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            maxWidth: '1200px',
            margin: '0 auto',
            alignItems: 'stretch',
          }}>
            {t.recruit.jobs.map((job, i) => (
              <div
                key={i}
                className="recruit-card"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '2px solid #E8ECF0',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer',
                  opacity: recruitSection.isVisible ? 1 : 0,
                  transform: recruitSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 0.15}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
                  e.currentTarget.style.borderColor = '#FF8C00';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = '#E8ECF0';
                }}
              >
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#1A3A52',
                  marginBottom: '8px',
                }}>
                  {lang === 'ja' ? job.title : (job.titleZh || job.title)}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#7F8C9A',
                  marginBottom: '16px',
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                }}>
                  {job.titleEn}
                </p>
                
                <p style={{
                  fontSize: '14px',
                  color: '#4B5563',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                }}>
                  {lang === 'ja' ? job.description : (job.descriptionZh || job.description)}
                </p>

                <div style={{
                  borderTop: '1px solid #E8ECF0',
                  paddingTop: '20px',
                  flex: 1,
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1A3A52',
                    marginBottom: '12px',
                  }}>
                    {lang === 'ja' ? '必須条件' : '必备条件'}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(lang === 'ja' ? job.requirements : (job.requirementsZh || job.requirements)).map((req, j) => (
                      <div key={j} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: '#4B5563',
                      }}>
                        <span style={{ color: '#FF8C00' }}>•</span>
                        {req}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '24px', width: '100%' }}>
                <button
                  onClick={() => {
                  setModalType('recruit');
                  setConsultationModalOpen(true);
                }}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(211, 47, 47, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {lang === 'ja' ? '応募する' : '立即申请'}
                </button>
                </div>
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
            radial-gradient(circle at 20% 50%, #FF8C00 0%, transparent 50%),
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
              background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
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
            <button 
              className="btn-secondary" 
              onClick={() => {
                setModalType('consultation');
                setConsultationModalOpen(true);
              }}
              style={{
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              💬 {t.cta.btn2}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1A1A1A',
        padding: '60px 24px 30px',
        borderTop: '3px solid #FF8C00',
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
                  background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
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
                {lang === 'ja' ? 'ツインハブで日中をつなぐ物流ソリューション' : 'Twin Hub连接日中的物流解决方案'}
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

      {/* Consultation Modal */}
      {consultationModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
        }} onClick={() => setConsultationModalOpen(false)}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setConsultationModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: '#F5F7FA',
                color: '#7F8C9A',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E8ECF0';
                e.currentTarget.style.color = '#2C3E50';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F5F7FA';
                e.currentTarget.style.color = '#7F8C9A';
              }}
            >
              ×
            </button>

            {/* Modal Content */}
            <div style={{ padding: '40px' }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1A3A52',
                marginBottom: '8px',
              }}>
                {modalType === 'recruit' 
                  ? (lang === 'ja' ? '採用応募' : '招聘申请')
                  : (lang === 'ja' ? 'お問い合わせ' : '联系我们')}
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#7F8C9A',
                marginBottom: '32px',
              }}>
                {modalType === 'recruit'
                  ? (lang === 'ja' 
                      ? '以下のフォームにご記入いただき、お送りください。採用担当者より24時間以内にご連絡いたします。'
                      : '请填写以下表单，我们将在24小时内与您联系。')
                  : (lang === 'ja' 
                      ? '以下のフォームにご記入いただき、お送りください。担当者より24時間以内にご連絡いたします。'
                      : '请填写以下表单，我们将在24小时内与您联系。')}
              </p>

              <form onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitError('');
                
                try {
                  // 调用 API 发送邮件
                  const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      ...formData,
                      type: modalType
                    })
                  });

                  let data;
                  try {
                    data = await response.json();
                  } catch (e) {
                    throw new Error(`服务器响应解析失败 (状态码: ${response.status})`);
                  }

                  if (!response.ok) {
                    const errorMsg = data?.error || data?.message || data?.details || `HTTP ${response.status} 错误`;
                    throw new Error(errorMsg);
                  }

                  // 显示成功消息
                  alert(modalType === 'recruit'
                    ? (lang === 'ja' ? '応募ありがとうございます。採用担当者よりご連絡いたします。' : '感谢您的申请，我们会尽快与您联系。')
                    : (lang === 'ja' ? 'お問い合わせありがとうございます。担当者よりご連絡いたします。' : '感谢您的咨询，我们会尽快与您联系。'));
                  
                  // 关闭对话框并重置表单
                  setConsultationModalOpen(false);
                  setModalType('consultation');
                  setFormData({ name: '', email: '', phone: '', company: '', message: '' });
                  setIsSubmitting(false);
                  
                } catch (error) {
                  console.error('Error submitting form:', error);
                  setSubmitError(lang === 'ja' 
                    ? `送信に失敗しました: ${error.message}。もう一度お試しください。`
                    : `提交失败: ${error.message}，请稍后重试。`);
                  setIsSubmitting(false);
                }
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#2C3E50',
                      marginBottom: '8px',
                    }}>
                      {modalType === 'recruit'
                        ? (lang === 'ja' ? '氏名' : '姓名')
                        : (lang === 'ja' ? 'お名前' : '姓名')} <span style={{ color: '#FF8C00' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E8ECF0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#FF8C00';
                        e.currentTarget.style.outline = 'none';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E8ECF0';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#2C3E50',
                      marginBottom: '8px',
                    }}>
                      {lang === 'ja' ? 'メールアドレス' : '邮箱'} <span style={{ color: '#FF8C00' }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E8ECF0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#FF8C00';
                        e.currentTarget.style.outline = 'none';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E8ECF0';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#2C3E50',
                      marginBottom: '8px',
                    }}>
                      {lang === 'ja' ? '電話番号' : '电话'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E8ECF0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#FF8C00';
                        e.currentTarget.style.outline = 'none';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E8ECF0';
                      }}
                    />
                  </div>

                  {modalType !== 'recruit' && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#2C3E50',
                      marginBottom: '8px',
                    }}>
                      {lang === 'ja' ? '会社名' : '公司名称'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E8ECF0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#FF8C00';
                        e.currentTarget.style.outline = 'none';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E8ECF0';
                      }}
                    />
                  </div>
                  )}

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#2C3E50',
                      marginBottom: '8px',
                    }}>
                      {modalType === 'recruit' 
                        ? (lang === 'ja' ? '応募ポジション' : '应聘职位')
                        : (lang === 'ja' ? 'お問い合わせ内容' : '咨询内容')}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E8ECF0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        transition: 'all 0.2s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#FF8C00';
                        e.currentTarget.style.outline = 'none';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E8ECF0';
                      }}
                    />
                  </div>

                  {submitError && (
                    <div style={{
                      padding: '12px',
                      background: '#FFF3CD',
                      border: '1px solid #FFE69C',
                      borderRadius: '8px',
                      color: '#856404',
                      fontSize: '14px',
                      marginTop: '8px',
                    }}>
                      {submitError}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: isSubmitting 
                        ? '#CCCCCC' 
                        : 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 600,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      marginTop: '8px',
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {isSubmitting 
                      ? (lang === 'ja' ? '送信中...' : '提交中...') 
                      : (lang === 'ja' ? '送信する' : '提交')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal - THS登录 */}
      {loginModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
        }} onClick={() => setLoginModalOpen(false)}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            maxWidth: '480px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setLoginModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: '#F5F7FA',
                color: '#7F8C9A',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E8ECF0';
                e.currentTarget.style.color = '#2C3E50';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F5F7FA';
                e.currentTarget.style.color = '#7F8C9A';
              }}
            >
              ×
            </button>

            {/* Modal Content */}
            <div style={{ padding: '40px' }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1A3A52',
                marginBottom: '8px',
                textAlign: 'center',
              }}>
                THS ログイン
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#7F8C9A',
                marginBottom: '32px',
                textAlign: 'center',
              }}>
                {lang === 'ja' ? 'ログインタイプを選択してください' : '请选择登录类型'}
              </p>

              <form onSubmit={(e) => {
                e.preventDefault();

                const account = loginData.id?.trim();
                const password = loginData.password;
                if (!account || !password) {
                  alert(lang === 'ja' ? 'IDとパスワードを入力してください。' : '请输入 ID 和密码。');
                  return;
                }
                setIsSubmitting(true);

                fetch('https://jstqorjesyjasxurkjvg.supabase.co/auth/v1/token?grant_type=password', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'apikey': supabaseAnonKey
                  },
                  body: JSON.stringify({
                    email: account,
                    password: password
                  })
                })
                .then(response => {
                  if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.error_description || '登录失败'); });
                  }
                  return response.json();
                })
                .then(data => {
                  const params = new URLSearchParams();
                  params.append('access_token', data.access_token);
                  params.append('refresh_token', data.refresh_token);
                  params.append('expires_in', data.expires_in);
                  params.append('token_type', data.token_type);
                  params.append('type', 'recovery');

                  const targetPath = userType === 'user' ? 'client-portal.html' : 'app.html';
                  window.location.href = `${wmsUrl}/${targetPath}#${params.toString()}`;
                })
                .catch(error => {
                  console.error('Login error:', error);
                  alert(lang === 'ja' ? 'ログインに失敗しました。IDとパスワードを確認してください。' : '登录失败，请检查账号和密码。');
                })
                .finally(() => {
                  setIsSubmitting(false);
                });
              }}>
                {/* User Type Selection */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#2C3E50',
                    marginBottom: '12px',
                  }}>
                    {lang === 'ja' ? 'ログインタイプ' : '登录类型'}
                  </label>
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                  }}>
                    <button
                      type="button"
                      onClick={() => setUserType('user')}
                      style={{
                        flex: 1,
                        padding: '12px 24px',
                        border: `2px solid ${userType === 'user' ? '#FF8C00' : '#E8ECF0'}`,
                        borderRadius: '8px',
                        background: userType === 'user' ? '#FFF5F5' : 'white',
                        color: userType === 'user' ? '#FF8C00' : '#7F8C9A',
                        fontSize: '14px',
                        fontWeight: userType === 'user' ? 600 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {lang === 'ja' ? 'ユーザー' : '用户'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('employee')}
                      style={{
                        flex: 1,
                        padding: '12px 24px',
                        border: `2px solid ${userType === 'employee' ? '#FF8C00' : '#E8ECF0'}`,
                        borderRadius: '8px',
                        background: userType === 'employee' ? '#FFF5F5' : 'white',
                        color: userType === 'employee' ? '#FF8C00' : '#7F8C9A',
                        fontSize: '14px',
                        fontWeight: userType === 'employee' ? 600 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {lang === 'ja' ? '従業員' : '员工'}
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#2C3E50',
                    marginBottom: '8px',
                  }}>
                    {lang === 'ja' ? 'ID' : 'ID'} <span style={{ color: '#FF8C00' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={loginData.id}
                    onChange={(e) => setLoginData({ ...loginData, id: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #E8ECF0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#FF8C00';
                      e.currentTarget.style.outline = 'none';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E8ECF0';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#2C3E50',
                    marginBottom: '8px',
                  }}>
                    {lang === 'ja' ? 'パスワード' : '密码'} <span style={{ color: '#FF8C00' }}>*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #E8ECF0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#FF8C00';
                      e.currentTarget.style.outline = 'none';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E8ECF0';
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #FF8C00 0%, #4A90E2 50%, #004E89 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (isSubmitting) return;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(211, 47, 47, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {lang === 'ja' ? 'ログイン' : '登录'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ANSHomepage;
