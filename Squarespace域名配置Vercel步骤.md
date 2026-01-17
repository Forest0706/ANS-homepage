# 🌐 Squarespace 域名配置 Vercel 详细步骤

## 📋 当前 DNS 状态

根据你的截图，当前 DNS 记录：

- **A 记录 (@)**: `8.217.129.159` ← 需要修改为 Vercel 的 IP
- **A 记录 (www)**: `8.217.129.159` ← 需要修改为 Vercel 的 IP
- **MX 记录**: 用于邮件服务（需要保留）
- **TXT 记录**: SPF 邮件验证（需要保留）
- **CNAME (autodiscover)**: 邮件客户端配置（需要保留）

---

## 🎯 配置目标

将网站指向 Vercel，但保留邮件服务（Outlook）。

---

## 📝 详细操作步骤

### 第一步：在 Vercel 中添加域名

1. **登录 Vercel**
   - 访问：https://vercel.com
   - 进入你的项目：`ans_homepage`

2. **添加主域名**
   - 点击 **Settings** → **Domains**
   - 点击 **Add Domain**
   - 输入：`ans-scm.com`
   - 点击 **Add**

3. **查看 Vercel 的 DNS 配置要求**
   - Vercel 会显示需要配置的 DNS 记录
   - **通常显示**：
     - A 记录：`@` → `76.76.21.21`（或其他 IP）
     - 或者 CNAME：`@` → `cname.vercel-dns.com`
   - ⚠️ **重要**：请复制 Vercel 显示的具体值

---

### 第二步：在 Squarespace 中修改 DNS 记录

#### 方式 A：使用 A 记录（推荐，如果 Vercel 要求）

**操作步骤**：

1. **登录 Squarespace**
   - 访问：https://account.squarespace.com
   - 进入域名管理：`ans-scm.com`

2. **进入 DNS 设置**
   - 左侧菜单点击：**DNS 設定** (DNS Settings)
   - 或访问：https://account.squarespace.com/domains/managed/ans-scm.com/dns/dns-settings

3. **修改根域名 A 记录**
   - 在 **カスタム レコード (Custom Records)** 部分
   - 找到 **ホスト (Host)**: `@`，**タイプ (Type)**: `A` 的记录
   - 点击编辑（如果有编辑按钮）或删除旧记录后添加新记录
   - **修改为**：
     ```
     ホスト (Host): @
     タイプ (Type): A
     データ (Data): 76.76.21.21（使用 Vercel 显示的具体 IP）
     TTL: 1時間（或 3600）
     ```
   - 点击 **保存** 或 **更新**

4. **修改 www 子域名 A 记录**
   - 找到 **ホスト (Host)**: `www`，**タイプ (Type)**: `A` 的记录
   - 修改 **データ (Data)** 为 Vercel 的 IP：`76.76.21.21`
   - 保存

5. **保留邮件相关记录**（不要删除）
   - ✅ **MX 记录**：保留（用于邮件服务）
   - ✅ **TXT 记录 (SPF)**：保留（用于邮件验证）
   - ✅ **CNAME (autodiscover)**：保留（用于邮件客户端）

#### 方式 B：使用 CNAME 记录（如果 Vercel 支持）

**注意**：根域名 `@` 通常不支持 CNAME，但如果 Vercel 显示可以使用，按以下操作：

1. **删除现有的 A 记录 (@ 和 www)**
   - 找到这两条记录并删除

2. **添加 CNAME 记录**
   - 点击 **レコードを追加 (Add Record)**
   - 配置：
     ```
     ホスト (Host): @
     タイプ (Type): CNAME
     データ (Data): cname.vercel-dns.com（使用 Vercel 显示的值）
     TTL: 1時間
     ```
   - 保存

3. **为 www 添加 CNAME**
   - 点击 **レコードを追加 (Add Record)**
   - 配置：
     ```
     ホスト (Host): www
     タイプ (Type): CNAME
     データ (Data): cname.vercel-dns.com
     TTL: 1時間
     ```
   - 保存

---

### 第三步：添加子域名（可选）

如果需要在 Vercel 中添加 `admin.ans-scm.com` 和 `wms.ans-scm.com`：

#### 在 Vercel 中添加子域名：

1. 在 Vercel **Settings** → **Domains**
2. 点击 **Add Domain**
3. 分别添加：
   - `admin.ans-scm.com`
   - `wms.ans-scm.com`

#### 在 Squarespace 中添加 CNAME 记录：

1. 点击 **レコードを追加 (Add Record)**
2. 添加 `admin` 子域名：
   ```
   ホスト (Host): admin
   タイプ (Type): CNAME
   データ (Data): cname.vercel-dns.com
   TTL: 1時間
   ```
3. 再添加 `wms` 子域名：
   ```
   ホスト (Host): wms
   タイプ (Type): CNAME
   データ (Data): cname.vercel-dns.com
   TTL: 1時間
   ```

---

## 📋 最终 DNS 记录配置示例

### 网站相关（Vercel）

```
A 记录:
@ → 76.76.21.21（Vercel IP）

CNAME 记录:
www → cname.vercel-dns.com
admin → cname.vercel-dns.com（可选）
wms → cname.vercel-dns.com（可选）
```

### 邮件相关（保留，不要删除）

```
MX 记录:
@ → ansscm-com0i.mail.protection.outlook.com (優先度: 1)

TXT 记录:
@ → v=spf1 include:spf.protection.outlook.com -all

CNAME 记录:
autodiscover → autodiscover.outlook.com
```

### Squarespace 系统记录（保留）

```
CNAME:
_domainconnect → _domainconnect.domains.squarespace.com
```

---

## ⏰ 等待 DNS 生效

1. **DNS 传播时间**：通常 5-60 分钟
2. **在 Vercel 中检查**：
   - 返回 Vercel **Settings** → **Domains**
   - 查看域名状态：
     - ⏳ **Validating** = 正在验证
     - ✅ **Valid** = 配置成功，可以访问
     - ❌ **Invalid** = 配置有误

3. **验证方法**：
   ```bash
   # 命令行检查
   nslookup ans-scm.com
   
   # 在线检查
   # 访问：https://dnschecker.org
   ```

---

## ✅ 配置完成检查清单

- [ ] ✅ 在 Vercel 中添加了 `ans-scm.com` 域名
- [ ] ✅ 记录了 Vercel 显示的 DNS 配置值（IP 或 CNAME）
- [ ] ✅ 在 Squarespace 中修改了 `@` 的 A 记录指向 Vercel IP
- [ ] ✅ 在 Squarespace 中修改了 `www` 的 A 记录指向 Vercel IP
- [ ] ✅ 保留了所有邮件相关记录（MX、TXT、autodiscover）
- [ ] ✅ 等待 DNS 生效（5-60 分钟）
- [ ] ✅ Vercel 显示域名状态为 **Valid**
- [ ] ✅ 可以通过 `https://ans-scm.com` 访问网站
- [ ] ✅ SSL 证书自动配置（浏览器显示 🔒）
- [ ] ✅ 邮件功能正常（测试发送邮件）

---

## 🔍 常见问题

### Q1: 为什么根域名不能用 CNAME？

**A**: 根据 DNS 标准，根域名 `@` 通常不支持 CNAME 记录。如果 Vercel 要求使用 CNAME，可能需要：
- 使用 A 记录指向 Vercel 提供的 IP
- 或者使用 Squarespace 的域名转发功能

### Q2: 邮件会受影响吗？

**A**: 不会。只要保留 MX、TXT 和 autodiscover 记录，邮件功能不会受影响。

### Q3: 如何知道 Vercel 的 IP 地址？

**A**: 在 Vercel **Settings** → **Domains** → 添加域名后，Vercel 会显示具体的 DNS 配置值。

### Q4: DNS 更改后网站打不开？

**A**: 
- 等待更长时间（DNS 传播可能需要更久）
- 清除浏览器缓存和 DNS 缓存
- 检查 DNS 记录是否正确配置

---

## 🆘 需要帮助？

如果遇到问题：
1. 查看 Vercel 的错误提示
2. 确认 DNS 记录值是否正确
3. 检查是否保留了邮件相关记录

---

**完成后，你的网站就会通过 `https://ans-scm.com` 访问了！** 🎉
