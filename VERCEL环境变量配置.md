# ⚙️ Vercel 环境变量配置指南

## 📋 你的 Logo URL（公共 URL，永久有效）

```
https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/NEW%20LOGO-C.png
```

✅ 这是公共 URL，不带 token，永久有效！

---

## 🔧 在 Vercel 中添加环境变量

### 步骤详解：

1. **打开环境变量页面**
   - 访问：https://vercel.com/forestlis-projects/ans_homepage/settings/environment-variables
   - 或者：Vercel Dashboard → ans_homepage → Settings → Environment Variables

2. **点击添加按钮**
   - 在页面右上角，找到 **"Add Environment Variable"** 按钮（深色按钮）
   - 点击这个按钮

3. **填写环境变量信息**
   
   在弹出的表单中填写：
   
   - **Name**（变量名）：
     ```
     VITE_LOGO_URL
     ```
   
   - **Value**（值）：
     ```
     https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/NEW%20LOGO-C.png
     ```
   
   - **Environment**（环境）：全选
     - ✅ Production（生产环境）
     - ✅ Preview（预览环境）
     - ✅ Development（开发环境）

4. **保存**
   - 点击 **Save** 或 **Add** 按钮
   - 环境变量已添加

5. **重新部署**
   - 添加环境变量后，需要重新部署才能生效
   - 方法1：在 Vercel Dashboard 点击最新部署，点击 **Redeploy**
   - 方法2：推送到 GitHub 触发自动部署（如果已连接 Git）

---

## 📸 界面说明

根据你提供的截图，界面应该是：

- **顶部标题**：Environment Variables
- **描述**：Store API keys, tokens, and config securely.
- **右上角按钮**：
  - "Link Shared Variable"（浅色按钮）
  - **"Add Environment Variable"**（深色按钮）← 点击这个
- **标签页**：Project（选中）和 Shared
- **搜索和筛选**：Search...、All Environments、Last Updated

---

## ✅ 配置后验证

### 1. 检查环境变量是否添加成功

在 Vercel Dashboard → Settings → Environment Variables 中，应该能看到：
- **Name**: `VITE_LOGO_URL`
- **Value**: `https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/NEW%20LOGO-C.png`
- **Environment**: Production, Preview, Development（全选）

### 2. 重新部署后检查 Logo

1. **重新部署项目**
   - 点击最新部署 → **Redeploy**
   - 或推送到 GitHub 触发自动部署

2. **检查部署日志**
   - 在部署详情中，确认构建成功
   - 检查是否有错误

3. **访问网站检查 Logo**
   - 访问你的网站（Vercel 提供的 URL 或自定义域名）
   - 检查导航栏和 footer 的 logo 是否显示
   - 如果 logo 不显示，打开浏览器开发者工具（F12），查看 Console 和 Network

---

## 🔍 如果看不到 "Add Environment Variable" 按钮

### 可能的原因：

1. **权限问题**
   - 确认你是否有项目管理员权限
   - 如果只是成员，可能没有权限添加环境变量

2. **浏览器问题**
   - 刷新页面（F5 或 Cmd+R）
   - 清除浏览器缓存
   - 尝试使用其他浏览器或隐身模式

3. **项目设置问题**
   - 确认项目名称正确：`ans_homepage`
   - 确认 URL 正确

### 备选方案：

如果网页操作不行，可以使用 Vercel CLI：

```bash
# 1. 安装 Vercel CLI（如果还没安装）
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 在项目目录中
cd /Users/lilinzi/ANS-homepage

# 4. 添加环境变量
vercel env add VITE_LOGO_URL production

# 5. 粘贴 URL：
# https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/NEW%20LOGO-C.png

# 6. 重复步骤 4 和 5，添加到 preview 和 development 环境
vercel env add VITE_LOGO_URL preview
vercel env add VITE_LOGO_URL development
```

---

## 📝 本地环境变量已更新

✅ 你的本地 `.env.local` 文件已更新为公共 URL。

本地开发时运行：
```bash
npm run dev
```

Logo 应该能正常显示。

---

## 🆘 问题排查

### Logo 不显示

1. **检查环境变量**
   - 确认 Vercel 环境变量中 `VITE_LOGO_URL` 已添加
   - 确认环境变量在所有环境中都配置了

2. **检查 URL**
   - 在浏览器中直接打开 URL，确认可以看到图片
   - 检查 URL 中的空格是否正确编码为 `%20`

3. **检查部署**
   - 确认已重新部署（添加环境变量后必须重新部署）
   - 查看部署日志，确认构建成功

4. **检查浏览器控制台**
   - 打开开发者工具（F12）
   - 查看 Console 是否有错误
   - 查看 Network 标签，检查 logo 请求是否成功

---

## ✅ 完成检查清单

- [ ] ✅ 公共 Logo URL 已获取（永久有效）
- [ ] ✅ 本地 `.env.local` 已更新
- [ ] ✅ 在 Vercel 中添加了 `VITE_LOGO_URL` 环境变量
- [ ] ✅ 环境变量在所有环境中都配置了（Production, Preview, Development）
- [ ] ✅ 已重新部署项目
- [ ] ✅ 部署后验证 logo 显示正常

---

**配置完成后，你的 logo 就可以正常显示了！** 🎉
