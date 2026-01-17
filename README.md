# ANS 安尔速供应链官方网站

中日双仓联动的3PL供应链服务商官方网站

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📦 技术栈

- **React 18** - UI框架
- **Vite** - 构建工具
- **Vercel** - 部署平台
- **Supabase** - 后端服务（如需要）

## 🚢 部署

### Vercel 部署

1. 确保已安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 登录 Vercel：
```bash
vercel login
```

3. 部署到生产环境：
```bash
vercel --prod
```

或者直接通过 GitHub 连接自动部署。

### Git 设置

1. 初始化 Git 仓库（如果还没有）：
```bash
git init
```

2. 添加远程仓库：
```bash
git remote add origin <你的仓库地址>
```

3. 提交并推送：
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

## 📝 环境变量

如果需要连接 Supabase，创建 `.env.local` 文件：

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

⚠️ **注意**：不要在代码中硬编码敏感信息，使用环境变量。

## 📁 项目结构

```
ANS-homepage/
├── src/
│   ├── App.jsx          # 主应用组件
│   └── main.jsx         # 入口文件
├── index.html           # HTML 模板
├── package.json         # 依赖配置
├── vite.config.js       # Vite 配置
├── vercel.json          # Vercel 配置
└── README.md            # 项目说明
```

## 🔗 相关链接

- [ANS WMS系统](https://wms.ans-scm.com)
- [员工台账系统](https://admin.ans-scm.com)

## 📞 联系方式

- **邮箱**: l.li@ans-scm.com
- **电话**: 045-349-3730
