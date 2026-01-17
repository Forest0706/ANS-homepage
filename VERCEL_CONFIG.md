# 🌐 Vercel 配置完整指南

## 1️⃣ Vercel 与 Git 仓库连接

### 步骤：

1. **在 Vercel 项目中连接 Git**

   - 访问你的 Vercel 项目：`ans_homepage`
   - 进入 **Settings** → **Git**
   - 点击 **Connect Git Repository**
   - 选择 **GitHub** 作为 Git 提供商
   - 授权 Vercel 访问你的 GitHub 账号
   - 选择仓库：`Forest0706/ANS-homepage`
   - 点击 **Import**

2. **配置自动部署**

   - 在 **Git** 设置中，确认以下配置：
     - **Production Branch**: `main` ✅
     - **Root Directory**: `/` (保持默认)
     - **Framework Preset**: `Vite` (应该自动检测)
     - **Build Command**: `npm run build` (应该自动检测)
     - **Output Directory**: `dist` (应该自动检测)

3. **测试自动部署**

   - 修改代码并推送到 GitHub：
     ```bash
     git add .
     git commit -m "test: 测试自动部署"
     git push
     ```
   - Vercel 会自动检测并开始部署

---

## 2️⃣ 配置主域名 ans-scm.com

### 步骤：

1. **在 Vercel 中添加域名**

   - 访问项目 **Settings** → **Domains**
   - 点击 **Add Domain**
   - 输入域名：`ans-scm.com`
   - 点击 **Add**

2. **配置 DNS 记录**

   在你的域名注册商（如 Namecheap, GoDaddy, Cloudflare）添加以下 DNS 记录：

   **A 记录**（根域名）：
   ```
   类型: A
   名称: @
   值: 76.76.21.21
   TTL: 3600
   ```

   或者使用 **CNAME 记录**（推荐）：
   ```
   类型: CNAME
   名称: @
   值: cname.vercel-dns.com
   TTL: 3600
   ```

   **验证**：
   - Vercel 会显示需要配置的 DNS 记录
   - 按照 Vercel 显示的记录配置（可能因 Vercel 账户不同而不同）
   - 等待 DNS 生效（通常 5-60 分钟）

3. **添加 www 子域名（可选）**

   - 在 **Domains** 中添加：`www.ans-scm.com`
   - 配置 DNS：
     ```
     类型: CNAME
     名称: www
     值: cname.vercel-dns.com
     ```

---

## 3️⃣ 配置子域名（台账系统和 WMS 系统）

### 方案 A：使用 Vercel 的多项目部署（推荐）

#### 步骤：

1. **为台账系统创建新项目**
   - 在 Vercel 创建新项目：`ans-admin`
   - 连接同一个 Git 仓库或单独仓库
   - 在 **Settings** → **Domains** 中添加：`admin.ans-scm.com`
   - 配置 DNS：
     ```
     类型: CNAME
     名称: admin
     值: cname.vercel-dns.com
     ```

2. **为 WMS 系统创建新项目**
   - 在 Vercel 创建新项目：`ans-wms`
   - 连接同一个 Git 仓库或单独仓库
   - 在 **Settings** → **Domains** 中添加：`wms.ans-scm.com`
   - 配置 DNS：
     ```
     类型: CNAME
     名称: wms
     值: cname.vercel-dns.com
     ```

### 方案 B：使用 Vercel 的 Rewrites（单项目）

如果两个系统是同一个项目的一部分，可以在 `vercel.json` 中配置路由：

```json
{
  "rewrites": [
    {
      "source": "/admin/:path*",
      "destination": "/admin/index.html"
    },
    {
      "source": "/wms/:path*",
      "destination": "/wms/index.html"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

但这需要你的系统支持路径路由。

### 方案 C：使用 Reverse Proxy（高级）

如果台账和 WMS 系统部署在其他服务器上，可以：
- 在 Vercel 配置 **Redirects** 或 **Rewrites**
- 或者使用 Cloudflare Workers 作为反向代理

---

## 4️⃣ DNS 配置示例（完整）

在你的域名注册商配置以下 DNS 记录：

```
# 主域名
类型: A 或 CNAME
名称: @
值: (Vercel 提供的 IP 或 CNAME)

# www 子域名
类型: CNAME
名称: www
值: cname.vercel-dns.com

# admin 子域名（台账系统）
类型: CNAME
名称: admin
值: cname.vercel-dns.com

# wms 子域名（WMS 系统）
类型: CNAME
名称: wms
值: cname.vercel-dns.com
```

⚠️ **注意**：Vercel 会根据你的账户显示具体的 DNS 值，请按照 Vercel 控制台中显示的配置。

---

## 📋 配置检查清单

- [ ] ✅ Vercel 项目已连接到 Git 仓库
- [ ] ✅ 自动部署已启用并测试成功
- [ ] ✅ 主域名 `ans-scm.com` 已添加到 Vercel
- [ ] ✅ DNS A 记录或 CNAME 记录已配置
- [ ] ✅ 主域名 DNS 验证通过
- [ ] ✅ 子域名 `admin.ans-scm.com` 已配置（如需要）
- [ ] ✅ 子域名 `wms.ans-scm.com` 已配置（如需要）
- [ ] ✅ 所有域名 SSL 证书自动生成（Vercel 自动处理）

---

## 🔍 验证域名配置

1. **检查 DNS 传播**
   ```bash
   # 检查主域名
   nslookup ans-scm.com
   
   # 检查子域名
   nslookup admin.ans-scm.com
   nslookup wms.ans-scm.com
   ```

2. **检查 SSL 证书**
   - Vercel 会自动为所有域名配置 SSL 证书
   - 访问 `https://ans-scm.com` 验证 HTTPS 是否正常

3. **检查子域名**
   - 访问 `https://admin.ans-scm.com` 验证台账系统
   - 访问 `https://wms.ans-scm.com` 验证 WMS 系统

---

## 🆘 常见问题

### 问题：DNS 验证失败

**解决**：
- 确认 DNS 记录类型和值正确
- 等待 DNS 传播完成（最多 72 小时）
- 清除 DNS 缓存：`sudo dscacheutil -flushcache` (macOS)

### 问题：子域名无法访问

**解决**：
- 确认在 Vercel 中已添加子域名
- 确认 DNS CNAME 记录已配置
- 确认子域名指向正确的 Vercel 项目

### 问题：SSL 证书未生成

**解决**：
- Vercel 通常在 DNS 验证通过后自动生成
- 等待 24 小时，如果仍未生成，联系 Vercel 支持

---

## 📞 需要帮助？

如果配置过程中遇到问题：
- 查看 [Vercel 域名文档](https://vercel.com/docs/concepts/projects/domains)
- 联系 Vercel 支持
