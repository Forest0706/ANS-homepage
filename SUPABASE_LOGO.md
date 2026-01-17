# 🖼️ Supabase Logo 配置指南

## 从 Supabase Storage 获取 Logo URL

### 步骤：

1. **访问 Supabase Storage**
   - 登录 Supabase Dashboard
   - 进入 **Storage** → **Buckets**
   - 找到包含 logo 的 bucket（通常是 `public` 或自定义 bucket）

2. **获取 Logo URL**

   **方法 A：公共 URL（推荐）**
   - 如果 logo 在 `public` bucket 中，可以直接使用公共 URL
   - 格式：`https://你的项目ID.supabase.co/storage/v1/object/public/bucket名称/logo文件名`
   - 例如：`https://abcdefgh.supabase.co/storage/v1/object/public/public/logo.png`

   **方法 B：使用 Supabase API**
   ```javascript
   const { data } = await supabase.storage
     .from('bucket名称')
     .getPublicUrl('logo.png')
   const logoUrl = data.publicUrl
   ```

3. **复制 Logo URL**
   - 在 Supabase Storage 中，点击 logo 文件
   - 复制 **Public URL**

---

## 在项目中使用 Logo

### 方法 1：直接使用 Supabase URL（推荐）

更新 `.env.local`：
```env
VITE_SUPABASE_URL=你的supabase_url
VITE_SUPABASE_ANON_KEY=你的supabase_anon_key
VITE_LOGO_URL=https://你的项目ID.supabase.co/storage/v1/object/public/bucket名称/logo文件名
```

在代码中使用：
```javascript
const logoUrl = import.meta.env.VITE_LOGO_URL || '/logo.png'
```

### 方法 2：下载 Logo 到项目

如果想让 logo 跟随项目部署：

1. **下载 Logo**
   - 从 Supabase Storage 下载 logo 文件
   - 保存到 `public/logo.png`（或 `logo.svg`）

2. **更新代码**
   ```javascript
   const logoUrl = '/logo.png'
   ```

---

## 支持的 Logo 格式

- **PNG**（推荐）- 支持透明背景
- **SVG**（推荐）- 矢量图，任意缩放不失真
- **JPG/JPEG** - 普通图片

---

## Logo 最佳实践

1. **尺寸建议**
   - 导航栏 logo：40-60px 高度
   - Footer logo：30-40px 高度
   - 大尺寸 logo：200-400px（用于 landing page）

2. **透明背景**
   - 使用 PNG（透明）或 SVG
   - 确保在深色和浅色背景都能正常显示

3. **响应式设计**
   - 在小屏幕上可能需要较小尺寸
   - 使用 CSS 控制尺寸：`max-width: 100%`

---

## 需要帮助？

如果遇到问题：
- 确认 Supabase Storage bucket 权限设置为 **Public**
- 确认 logo 文件已正确上传
- 检查 URL 是否可访问（在浏览器中打开）
