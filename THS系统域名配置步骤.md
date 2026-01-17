# 🔧 THS 系统域名配置步骤

## 🎯 域名配置

- **员工系统（THS Admin）**：`thsadmin.ans-scm.com`
- **客户端系统（THS Customer）**：`thscus.ans-scm.com`

---

## 📋 配置步骤

### 步骤 1：在 Vercel 中添加域名

需要为两个系统分别添加域名。

#### 1.1 员工系统（`ans-scm.vercel.app`）

1. **找到台账管理系统项目**
   - 在 Vercel Dashboard 中找到 `ans-scm.vercel.app` 对应的项目

2. **添加域名**
   - 进入项目 → **Settings** → **Domains**
   - 点击 **Add Domain**
   - 输入：`thsadmin.ans-scm.com`
   - 点击 **Add**

3. **获取 DNS 配置**
   - Vercel 会显示需要添加的 CNAME 记录
   - **记录下这个 CNAME 目标地址**

---

#### 1.2 客户端系统（如果也是 Vercel 项目）

1. **找到客户端系统项目**
   - 在 Vercel Dashboard 中找到客户端系统项目

2. **添加域名**
   - 进入项目 → **Settings** → **Domains**
   - 点击 **Add Domain**
   - 输入：`thscus.ans-scm.com`
   - 点击 **Add**

3. **获取 DNS 配置**
   - Vercel 会显示需要添加的 CNAME 记录
   - **记录下这个 CNAME 目标地址**

---

### 步骤 2：在 Squarespace 中添加 DNS 记录

#### 2.1 添加 `thsadmin.ans-scm.com` 记录

1. **登录 Squarespace**
   - 访问：https://account.squarespace.com
   - 选择 `ans-scm.com` 域名

2. **进入 DNS 设置**
   - 点击 **DNS 设置** 或 **DNS Settings**

3. **添加 CNAME 记录**
   - 点击 **レコードを追加**（添加记录）
   - **ホスト（Host）**：`thsadmin`
   - **タイプ（Type）**：`CNAME`
   - **データ（Data）**：Vercel 提供的目标地址（例如：`cname.vercel-dns.com` 或类似格式）
   - 点击 **保存**

---

#### 2.2 添加 `thscus.ans-scm.com` 记录

1. **添加第二条 CNAME 记录**
   - 点击 **レコードを追加**（添加记录）
   - **ホスト（Host）**：`thscus`
   - **タイプ（Type）**：`CNAME`
   - **データ（Data）**：客户端系统的 Vercel CNAME 目标地址
   - 点击 **保存**

---

### 步骤 3：等待 DNS 传播

- DNS 更改通常需要 **5-60 分钟**生效
- 可以使用在线工具检查：https://dnschecker.org
- 搜索 `thsadmin.ans-scm.com` 和 `thscus.ans-scm.com` 的 CNAME 记录

---

### 步骤 4：验证域名配置

#### 4.1 在 Vercel 中验证

1. **员工系统**
   - Vercel → 项目 → Settings → Domains
   - 确认 `thsadmin.ans-scm.com` 状态为 **Valid**（绿色）

2. **客户端系统**
   - Vercel → 项目 → Settings → Domains
   - 确认 `thscus.ans-scm.com` 状态为 **Valid**（绿色）

---

#### 4.2 测试访问

1. **员工系统**
   - 访问：`https://thsadmin.ans-scm.com/`
   - 确认可以正常打开登录页面

2. **客户端系统**
   - 访问：`https://thscus.ans-scm.com/`
   - 确认可以正常打开登录页面

---

## ✅ 配置完成后的效果

### 主页导航

- 点击 **THS** → 选择 **"従業員"（员工）** → 跳转到 `https://thsadmin.ans-scm.com/`
- 点击 **THS** → 选择 **"ユーザー"（用户）** → 跳转到 `https://thscus.ans-scm.com/`

### 系统访问入口

- **员工登录**：`https://thsadmin.ans-scm.com/`
- **客户端登录**：`https://thscus.ans-scm.com/`
- **主页**：`https://www.ans-scm.com/`

---

## 📋 操作清单

### Vercel 配置

- [ ] **1. 找到员工系统项目（ans-scm.vercel.app）**
- [ ] **2. 添加域名 `thsadmin.ans-scm.com`**
- [ ] **3. 记录 DNS 配置信息（CNAME 目标地址）**
- [ ] **4. 找到客户端系统项目**
- [ ] **5. 添加域名 `thscus.ans-scm.com`**
- [ ] **6. 记录 DNS 配置信息（CNAME 目标地址）**

### Squarespace DNS 配置

- [ ] **7. 添加 `thsadmin` CNAME 记录**
- [ ] **8. 添加 `thscus` CNAME 记录**
- [ ] **9. 等待 DNS 传播（5-60 分钟）**

### 验证

- [ ] **10. 在 Vercel 中验证两个域名状态为 Valid**
- [ ] **11. 测试访问 `https://thsadmin.ans-scm.com/`**
- [ ] **12. 测试访问 `https://thscus.ans-scm.com/`**

---

## 📸 需要的配置信息

在 Vercel 中添加域名后，请提供：

1. **员工系统的 CNAME 配置**：
   - 目标地址（Target）

2. **客户端系统的 CNAME 配置**：
   - 目标地址（Target）

我会根据这些信息指导你在 Squarespace 中完成 DNS 配置。

---

## 💡 注意事项

1. **确认项目**：确保找到正确的 Vercel 项目
2. **DNS 传播时间**：DNS 更改需要时间生效，请耐心等待
3. **SSL 证书**：Vercel 会自动为域名配置 SSL 证书
4. **代码已更新**：主页代码已更新，配置完成后即可使用

---

**代码已更新完成！现在请在 Vercel 中添加两个域名，完成后告诉我 DNS 配置信息，我会指导你在 Squarespace 中完成配置！** 🚀
