# 📦 Supabase 配置检查清单

## ✅ 代码已推送到 GitHub

代码更改已成功推送到 GitHub，Vercel 会自动检测并部署。

---

## 🖼️ Supabase 图片存储配置

### 当前使用的 Supabase 图片：

代码中使用了以下 Supabase 存储的图片：

1. **Hero 背景图片**
   ```
   https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/back.jpg
   ```

2. **服务卡片背景图片**（6张）
   ```
   - OCEAN.png（海上輸送サービス）
   - CUSTOMER.png（通関代理サービス）
   - warehouse.png（倉庫管理サービス）
   - B2C-2.png（B2C発送代行サービス）
   - TIME.png（貨物追跡システム）
   - consloe.png（総合コンサルティング）
   ```

3. **Logo**（通过环境变量配置）
   ```
   VITE_LOGO_URL
   ```

---

## ✅ Supabase 检查事项

### 1. 存储桶（Bucket）配置

**检查步骤**：
1. 登录 Supabase Dashboard：https://supabase.com/dashboard
2. 进入你的项目
3. 点击左侧菜单 **Storage**
4. 确认 `company Infomation` 存储桶存在
5. 检查存储桶的 **Public** 设置是否为 **true**（公开访问）

**如果存储桶不是公开的**：
- 点击存储桶名称
- 进入 **Settings** 或 **Policies**
- 确保有公开访问权限

### 2. 图片文件检查

**确认以下文件存在于存储桶中**：
- [ ] `back.jpg` - Hero 背景图片
- [ ] `OCEAN.png` - 海上輸送服务图片
- [ ] `CUSTOMER.png` - 通関代理服务图片
- [ ] `warehouse.png` - 倉庫管理服务图片
- [ ] `B2C-2.png` - B2C発送代行服务图片
- [ ] `TIME.png` - 貨物追跡系统图片
- [ ] `consloe.png` - 総合コンサルティング图片

### 3. Logo 配置（可选）

如果使用 Supabase 存储 Logo：

1. **上传 Logo 到 Supabase**
   - 在 `company Infomation` 存储桶中上传 logo 文件
   - 复制文件的 Public URL

2. **配置环境变量**
   - 在 Vercel 项目设置中
   - **Settings** → **Environment Variables**
   - 添加：`VITE_LOGO_URL` = `你的logo的Supabase URL`
   - 选择环境：Production, Preview, Development

### 4. 图片 URL 访问测试

**测试步骤**：
直接在浏览器中访问图片 URL，确认可以正常显示：

```
https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/back.jpg
https://vxoacbydmzmjvnhvwjli.supabase.co/storage/v1/object/public/company%20Infomation/OCEAN.png
... 等等
```

**如果图片无法访问**：
- 检查存储桶是否为公开
- 检查文件名是否正确（注意空格和大小写）
- 检查 URL 编码是否正确（`%20` 代表空格）

---

## 🔒 Supabase 安全配置

### 存储桶权限（推荐配置）

**公开存储桶策略**（用于公共图片）：

```sql
-- 允许所有人读取存储桶中的文件
CREATE POLICY "Public Access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'company Infomation');
```

**或者通过 Supabase Dashboard**：
1. 进入 Storage → Policies
2. 为 `company Infomation` 存储桶添加 **Select** 策略
3. 策略目标：`Public` 或 `Authenticated users`

---

## 📋 Supabase 完整检查清单

- [ ] ✅ Supabase 项目正常运行
- [ ] ✅ `company Infomation` 存储桶存在
- [ ] ✅ 存储桶设置为公开访问
- [ ] ✅ 所有图片文件已上传到存储桶
- [ ] ✅ 图片 URL 可以在浏览器中直接访问
- [ ] ✅ （可选）Logo 已配置环境变量
- [ ] ✅ 存储桶权限策略配置正确

---

## ⚠️ 注意事项

1. **图片 URL 中的空格**：
   - 文件名中的空格会自动编码为 `%20`
   - 例如：`company Infomation` → `company%20Infomation`

2. **图片大小优化**：
   - 建议图片大小不超过 2MB
   - 可以使用图片压缩工具优化

3. **CDN 加速**：
   - Supabase 存储自带 CDN，全球访问速度快
   - 无需额外配置

4. **图片格式**：
   - 支持：JPG, PNG, WebP, SVG 等
   - 推荐使用 WebP 格式以获得更好的压缩比

---

## 🆘 问题排查

### 问题：图片显示不出来（404 错误）

**可能原因**：
- 存储桶不是公开的
- 文件名不正确
- URL 路径错误

**解决方法**：
1. 检查存储桶的公开设置
2. 在 Supabase Dashboard 中直接查看文件的 Public URL
3. 对比代码中的 URL 是否正确

### 问题：图片加载很慢

**解决方法**：
- 压缩图片大小
- 使用 WebP 格式
- Supabase CDN 会自动优化，通常不是问题

---

**✅ 代码已推送到 GitHub，Vercel 会自动部署。Supabase 只需确保存储桶和图片配置正确即可。**
