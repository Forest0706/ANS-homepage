# 🔗 Vercel Git 连接问题排查指南

## ⚠️ 如果点击 Import 没有反应

### 问题1：浏览器弹窗被阻止

**解决方案**：
1. 检查浏览器是否阻止了弹窗
2. 在浏览器地址栏右侧点击弹窗阻止图标，允许弹出窗口
3. 或者在浏览器设置中允许 Vercel 网站的弹窗

### 问题2：GitHub 授权问题

**解决方案**：
1. 确认已登录 GitHub 账号
2. 在 Vercel 中，点击 **Settings** → **Git**
3. 如果看到 "Disconnect" 按钮，说明已连接，可能需要重新连接
4. 点击 **Disconnect**，然后重新 **Connect Git Repository**

### 问题3：仓库权限问题

**解决方案**：
1. 确认仓库 `Forest0706/ANS-homepage` 存在且你有权限访问
2. 检查仓库是否为 Private，如果是，需要授权 Vercel 访问私有仓库
3. 在 GitHub → Settings → Applications → Authorized OAuth Apps 中检查 Vercel 权限

### 问题4：使用 Vercel CLI 连接（备选方案）

如果网页操作不行，可以使用命令行：

```bash
# 1. 安装 Vercel CLI（如果还没安装）
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 在项目目录中链接到现有项目
cd /Users/lilinzi/ANS-homepage
vercel link

# 4. 选择项目 ans_homepage
# 5. 然后部署
vercel --prod
```

---

## 🔄 手动连接 Git 仓库（步骤详解）

### 方法1：在 Vercel Dashboard 中操作

1. **访问项目设置**
   - 前往：https://vercel.com/forestlis-projects/ans_homepage/settings/git
   - 或：Vercel Dashboard → ans_homepage → Settings → Git

2. **连接 Git 仓库**
   - 如果显示 "Connect Git Repository"：
     - 点击按钮
     - 选择 **GitHub**
     - 浏览器会跳转到 GitHub 授权页面
     - 点击 "Authorize Vercel"
     - 回到 Vercel，选择仓库 `Forest0706/ANS-homepage`
     - 点击 **Import**

   - 如果显示 "Disconnect"：
     - 说明已连接，但可能连接了错误的仓库
     - 点击 **Disconnect**
     - 然后重新连接

3. **配置部署设置**
   - **Production Branch**: `main` ✅
   - **Root Directory**: `/` (保持默认)
   - **Framework Preset**: `Vite` (应该自动检测)
   - **Build Command**: `npm run build` (应该自动检测)
   - **Output Directory**: `dist` (应该自动检测)
   - **Install Command**: `npm install` (应该自动检测)

4. **保存并部署**
   - 点击 **Save** 或 **Deploy**

---

## 🔍 检查 Git 连接状态

### 在 Vercel 中检查：

1. 访问：https://vercel.com/forestlis-projects/ans_homepage/settings/git
2. 应该显示：
   - **Git Provider**: GitHub
   - **Repository**: `Forest0706/ANS-homepage`
   - **Production Branch**: `main`
   - **Connected** ✅

### 测试自动部署：

```bash
# 在本地做一个小改动
echo "# Test" >> README.md
git add .
git commit -m "test: 测试自动部署"
git push
```

然后去 Vercel Dashboard 查看，应该会自动触发部署。

---

## 🆘 常见错误

### 错误：Repository not found

**原因**：仓库不存在或没有权限

**解决**：
1. 确认仓库名称正确：`Forest0706/ANS-homepage`
2. 确认仓库是 Public 或已授权 Vercel 访问 Private 仓库

### 错误：GitHub authorization failed

**原因**：GitHub 授权失败

**解决**：
1. 在 GitHub → Settings → Applications → Authorized OAuth Apps
2. 撤销 Vercel 的授权
3. 重新在 Vercel 中连接

### 错误：Build failed

**原因**：项目配置问题

**解决**：
1. 检查 `package.json` 是否存在
2. 检查 `vercel.json` 配置是否正确
3. 查看 Vercel 构建日志找出具体错误

---

## ✅ 验证 Git 连接成功

### 方法1：查看 Vercel Dashboard

1. 访问：https://vercel.com/forestlis-projects/ans_homepage
2. 在 **Deployments** 标签页中，应该能看到来自 GitHub 的部署
3. 部署状态显示 **Ready** 或 **Building**

### 方法2：查看 Git 提交

1. 在 Vercel 项目的 **Deployments** 中
2. 点击某个部署，应该能看到关联的 Git commit
3. 点击 commit 应该能跳转到 GitHub

---

## 📝 如果还是不行

### 备选方案：使用 Vercel CLI

```bash
# 1. 登录 Vercel
vercel login

# 2. 在项目目录中
cd /Users/lilinzi/ANS-homepage

# 3. 链接到项目
vercel link
# 选择项目：ans_homepage
# 选择范围：当前目录

# 4. 手动部署（不依赖 Git）
vercel --prod

# 注意：这样部署不会自动触发，需要手动部署
```

### 或者手动部署：

```bash
# 每次更新代码后
git push                    # 推送到 GitHub
vercel --prod               # 手动部署到 Vercel
```

---

## 📞 需要更多帮助？

- Vercel 支持：https://vercel.com/support
- Vercel 文档：https://vercel.com/docs
