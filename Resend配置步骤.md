# 📧 Resend 配置完整步骤

## ✅ 当前进度

- [x] ✅ 步骤 1：注册 Resend 账号（已完成）
- [x] ✅ 步骤 2：获取 API Key（已完成，在 Onboarding 页面）
- [ ] ⏳ 步骤 3：发送测试邮件（当前步骤）
- [ ] ⏳ 步骤 4：配置 Vercel 环境变量
- [ ] ⏳ 步骤 5：验证域名（可选但推荐）

---

## 🎯 步骤 3：发送测试邮件（当前）

在 Resend Onboarding 页面：

1. **查看代码示例**
   - 页面显示了 Node.js 代码示例
   - 代码已经包含了你的 API Key（已自动填充）

2. **点击 "Send email" 按钮**
   - 这会发送一封测试邮件到 `forestlee621@gmail.com`
   - 用于验证 Resend 是否正常工作

3. **检查邮箱**
   - 查看 `forestlee621@gmail.com` 的收件箱
   - 应该收到一封主题为 "Hello World" 的邮件

**完成后**：点击页面上的 "Next" 或继续下一步。

---

## 🔑 步骤 4：配置 Vercel 环境变量（重要）

### 4.1 复制 API Key

1. 在 Resend Dashboard 中：
   - 点击左侧菜单 **API Keys**
   - 找到你的 API Key
   - 点击 **Reveal** 或 **Copy** 按钮复制 API Key
   - ⚠️ **重要**：API Key 只显示一次，请妥善保管

### 4.2 在 Vercel 中添加环境变量

1. **访问 Vercel 项目设置**
   - 访问：https://vercel.com/forestlis-projects/ans_homepage/settings/environment-variables
   - 或：Vercel Dashboard → ans_homepage → Settings → Environment Variables

2. **添加环境变量**
   - 点击 **Add New** 按钮
   - 填写：
     ```
     Name: RESEND_API_KEY
     Value: （粘贴从 Resend 复制的 API Key）
     Environment: ✅ Production ✅ Preview ✅ Development（全选）
     ```
   - 点击 **Save**

3. **重新部署项目**
   - 环境变量添加后，需要重新部署才能生效
   - 方法1：在 Vercel Dashboard 点击最新部署，点击 **Redeploy**
   - 方法2：推送到 GitHub 触发自动部署

---

## 🌐 步骤 5：验证域名（推荐）

### 为什么需要验证域名？

- ✅ 可以使用 `noreply@ans-scm.com` 作为发件人（更专业）
- ✅ 提高邮件送达率
- ✅ 避免进入垃圾邮件箱

### 操作步骤：

1. **在 Resend 中添加域名**
   - 访问 Resend Dashboard
   - 点击左侧菜单 **Domains**
   - 点击 **Add Domain**
   - 输入：`ans-scm.com`
   - 点击 **Add**

2. **配置 DNS 记录**
   - Resend 会显示需要添加的 DNS 记录
   - 通常包括：
     - **TXT 记录**：用于验证域名所有权
     - **DKIM 记录**：用于邮件签名
     - **SPF 记录**：用于邮件验证

3. **在 Squarespace 中添加 DNS 记录**
   - 登录 Squarespace DNS 设置
   - 添加 Resend 要求的 DNS 记录
   - 等待验证（通常几分钟）

4. **更新 API 代码**
   - 验证通过后，修改 `api/send-email.js` 中的 `from` 字段：
     ```javascript
     from: 'ANS Website <noreply@ans-scm.com>',
     ```

---

## ✅ 配置完成检查清单

- [ ] ✅ 在 Resend 中发送了测试邮件
- [ ] ✅ 收到了测试邮件
- [ ] ✅ 复制了 API Key
- [ ] ✅ 在 Vercel 中添加了 `RESEND_API_KEY` 环境变量
- [ ] ✅ 重新部署了 Vercel 项目
- [ ] ✅ （可选）验证了域名
- [ ] ✅ 测试表单提交功能

---

## 🧪 测试表单功能

配置完成后：

1. 访问网站：`https://www.ans-scm.com`
2. 点击"お問い合わせ"或"応募する"
3. 填写表单并提交
4. 检查 `info@ans-scm.com` 是否收到邮件

---

## 🆘 常见问题

### Q: API Key 在哪里找？

**A**: 
- Resend Dashboard → **API Keys** → 找到你的 Key → 点击 **Reveal**

### Q: 环境变量添加后不生效？

**A**: 
- 需要重新部署项目
- 在 Vercel 中点击 **Redeploy**

### Q: 邮件发送失败？

**A**: 
- 检查 API Key 是否正确
- 检查环境变量是否已配置
- 查看 Vercel Function Logs 中的错误信息

---

**现在先完成步骤 3（发送测试邮件），然后继续步骤 4（配置 Vercel 环境变量）！**
