# 🖼️ Logo URL 配置指南

## 📋 当前配置

你的 Logo URL 已添加到 `.env.local`：

```
VITE_LOGO_URL=https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/sign/company%20Infomation/NEW%20LOGO-C.png?token=...
```

⚠️ **注意**：这是一个**带 token 的签名 URL**，会在 2025年3月25日过期。

---

## 🔄 获取永久公共 URL（推荐）

### 方法1：使用公共 URL（推荐）

签名 URL 会过期，建议获取公共 URL：

1. **确保 bucket 是 Public**
   - 登录 Supabase Dashboard
   - 进入 **Storage** → **Buckets**
   - 找到 `company Infomation` bucket（注意有空格）
   - 确保 bucket 设置为 **Public**

2. **获取公共 URL**
   
   如果 bucket 是 Public，公共 URL 格式为：
   ```
   https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company Infomation/NEW LOGO-C.png
   ```
   
   注意：URL 中的空格需要编码为 `%20`：
   ```
   https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/NEW%20LOGO-C.png
   ```

3. **测试公共 URL**
   - 在浏览器中打开上面的 URL
   - 如果能看到图片，说明可以正常使用

---

## ⚙️ 配置 Vercel 环境变量

### 步骤：

1. **访问 Vercel 环境变量设置**
   - 前往：https://vercel.com/forestlis-projects/ans_homepage/settings/environment-variables

2. **添加 Logo URL**
   - 点击 **Add New**
   - **Name**: `VITE_LOGO_URL`
   - **Value**: 
     ```
     https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/NEW%20LOGO-C.png
     ```
     （使用公共 URL，不要用带 token 的签名 URL）
   
   - **Environment**: 全选（Production, Preview, Development）
   - 点击 **Save**

3. **重新部署**
   - 在 Vercel Dashboard 点击 **Redeploy** 最新部署
   - 或触发新的部署

---

## 🔧 如果 bucket 是 Private

如果你的 bucket 是 Private，需要：

### 选项1：改为 Public（推荐）

1. 在 Supabase → Storage → Buckets
2. 找到 `company Infomation` bucket
3. 点击设置，改为 **Public**
4. 然后使用公共 URL

### 选项2：使用 API 动态获取

如果必须保持 Private，需要在代码中动态获取签名 URL：

```javascript
// 需要使用 Supabase 客户端
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// 获取签名 URL
const { data } = await supabase.storage
  .from('company Infomation')
  .createSignedUrl('NEW LOGO-C.png', 3600) // 1小时有效

const logoUrl = data.signedUrl
```

---

## 📝 更新本地配置

### 如果获取了公共 URL，更新 `.env.local`：

```env
# Logo URL（公共 URL，永久有效）
VITE_LOGO_URL=https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/NEW%20LOGO-C.png
```

### 验证配置：

```bash
# 本地测试
npm run dev

# 检查浏览器控制台是否有错误
# 检查 logo 是否显示
```

---

## ✅ 检查清单

- [ ] ✅ Logo URL 已添加到 `.env.local`
- [ ] ✅ 确认 bucket 是否为 Public
- [ ] ✅ 获取公共 URL（不使用签名 URL）
- [ ] ✅ 在 Vercel 环境变量中添加 `VITE_LOGO_URL`
- [ ] ✅ 测试公共 URL 在浏览器中可以访问
- [ ] ✅ 重新部署后验证 logo 显示正常

---

## 🆘 问题排查

### Logo 不显示

1. **检查 URL 是否正确**
   - 在浏览器中直接打开 URL，看是否能显示图片
   - URL 中的空格是否正确编码为 `%20`

2. **检查环境变量**
   - 确认 Vercel 环境变量中 `VITE_LOGO_URL` 已配置
   - 确认环境变量在正确的环境（Production/Preview/Development）

3. **检查 CORS**
   - 如果 bucket 是 Public，通常不会有 CORS 问题
   - 如果遇到 CORS 错误，在 Supabase 中配置 CORS 策略

4. **查看浏览器控制台**
   - 打开浏览器开发者工具（F12）
   - 查看 Console 是否有错误
   - 查看 Network 标签，检查 logo 请求是否成功

---

## 📚 相关文档

- Supabase Storage 文档：https://supabase.com/docs/guides/storage
