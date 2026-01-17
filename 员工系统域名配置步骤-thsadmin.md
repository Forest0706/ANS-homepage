# 🔧 员工系统域名配置步骤（thsadmin.ans-scm.com）

## 🎯 目标

将员工系统（台账管理）配置为 `thsadmin.ans-scm.com`。

**客户端系统（thscus.ans-scm.com）暂时不配置，后续再处理。**

---

## 📋 配置步骤

### 步骤 1：在 Vercel 中添加域名

#### 1.1 找到员工系统项目

1. **登录 Vercel Dashboard**
   - 访问：https://vercel.com

2. **找到项目**
   - 找到 `ans-scm.vercel.app` 对应的项目（台账管理系统）
   - 如果项目名不同，找到台账管理系统对应的 Vercel 项目

---

#### 1.2 添加域名

1. **进入域名设置**
   - 点击项目进入详情页
   - 点击顶部导航的 **Settings**
   - 在左侧菜单选择 **Domains**

2. **添加域名**
   - 点击 **Add Domain** 按钮
   - 在弹出的输入框中输入：`thsadmin.ans-scm.com`
   - 点击 **Add** 或 **Continue**

3. **获取 DNS 配置信息**
   - Vercel 会显示需要添加的 DNS 记录
   - 通常是 **CNAME** 类型
   - **记录下目标地址**（Target），例如：
     - `cname.vercel-dns.com`
     - 或类似格式的 Vercel DNS 地址

---

### 步骤 2：在 Squarespace 中添加 DNS 记录

#### 2.1 登录 Squarespace

1. **访问 Squarespace**
   - 访问：https://account.squarespace.com
   - 登录账户

2. **选择域名**
   - 在域名列表中找到 `ans-scm.com`
   - 点击进入域名管理

---

#### 2.2 进入 DNS 设置

1. **打开 DNS 设置页面**
   - 点击 **DNS 设置** 或 **DNS Settings**
   - 或者访问：`account.squarespace.com/domains/managed/ans-scm.com/dns/dns-settings`

---

#### 2.3 添加 CNAME 记录

1. **点击添加记录按钮**
   - 在 DNS 记录列表上方，找到 **レコードを追加**（添加记录）按钮
   - 点击按钮

2. **填写 CNAME 记录信息**
   
   - **ホスト（Host）**：`thsadmin`
     - ⚠️ **注意**：只需要填写 `thsadmin`，不需要填写完整域名
   
   - **タイプ（Type）**：选择 `CNAME`
   
   - **データ（Data）**：粘贴 Vercel 提供的目标地址
     - 例如：`cname.vercel-dns.com` 或类似格式
     - ⚠️ **注意**：目标地址通常以点（`.`）结尾，确保完整复制
   
   - **TTL**：通常自动设置为 `1時間`（1小时），可以保持默认

3. **保存记录**
   - 检查信息无误后
   - 点击 **保存** 或 **Add Record** 按钮

---

### 步骤 3：验证 DNS 记录

#### 3.1 在 Squarespace 中确认

添加成功后，DNS 记录列表应该显示：

| ホスト | タイプ | データ | TTL |
|--------|--------|--------|-----|
| `thsadmin` | `CNAME` | `cname.vercel-dns.com` (Vercel提供的地址) | `1時間` |

---

#### 3.2 等待 DNS 传播

- DNS 更改需要 **5-60 分钟**才能生效
- 可以使用在线工具检查：https://dnschecker.org
  - 搜索 `thsadmin.ans-scm.com`
  - 选择 CNAME 记录类型
  - 检查全球各地的 DNS 解析情况

---

### 步骤 4：在 Vercel 中验证域名

1. **返回 Vercel Dashboard**
   - 进入项目 → Settings → Domains

2. **查看域名状态**
   - 找到 `thsadmin.ans-scm.com`
   - 等待状态变为 **Valid**（绿色）✅
   - 可能需要几分钟时间

---

### 步骤 5：测试访问

1. **访问测试**
   - 在浏览器中访问：`https://thsadmin.ans-scm.com/`
   - 应该能看到台账管理系统的登录页面

2. **确认 SSL 证书**
   - 确认地址栏显示锁图标（🔒）
   - 表示 SSL 证书已自动配置

---

## ✅ 配置完成后的效果

### 主页导航

- 点击主页的 **THS** 链接
- 在登录对话框中选择 **"従業員"（员工）**
- 点击 **ログイン**（登录）
- **自动跳转到**：`https://thsadmin.ans-scm.com/`

---

## 📋 操作清单

### Vercel 配置

- [ ] **1. 找到员工系统项目（ans-scm.vercel.app）**
- [ ] **2. Settings → Domains**
- [ ] **3. Add Domain → 输入 `thsadmin.ans-scm.com`**
- [ ] **4. 记录 DNS 配置信息（CNAME 目标地址）**

### Squarespace DNS 配置

- [ ] **5. 登录 Squarespace → 选择 `ans-scm.com`**
- [ ] **6. 进入 DNS 设置**
- [ ] **7. 添加 CNAME 记录：**
   - ホスト：`thsadmin`
   - タイプ：`CNAME`
   - データ：Vercel 提供的目标地址
- [ ] **8. 保存记录**

### 验证

- [ ] **9. 等待 DNS 传播（5-60 分钟）**
- [ ] **10. 在 Vercel 中确认域名状态为 Valid**
- [ ] **11. 测试访问 `https://thsadmin.ans-scm.com/`**
- [ ] **12. 从主页测试 THS → 员工登录跳转**

---

## 📸 需要的配置信息

在 Vercel 中添加域名后，请提供：

**员工系统的 CNAME 配置**：
- 目标地址（Target）：例如 `cname.vercel-dns.com`

我会根据这个信息指导你在 Squarespace 中完成 DNS 配置。

---

## 💡 注意事项

1. **DNS 传播时间**：DNS 更改需要时间生效，请耐心等待 5-60 分钟
2. **Host 字段**：在 Squarespace 中只填写 `thsadmin`，不要填写完整域名
3. **SSL 证书**：Vercel 会自动为域名配置 SSL 证书
4. **代码已更新**：主页代码已更新，配置完成后即可使用
5. **客户端系统**：客户端系统（thscus.ans-scm.com）暂时不配置，后续再处理

---

## 🚀 完成后测试

配置完成后，请测试：

1. ✅ 直接访问 `https://thsadmin.ans-scm.com/` 可以打开登录页面
2. ✅ 从主页点击 THS → 选择员工 → 可以跳转到 `https://thsadmin.ans-scm.com/`

---

**请先在 Vercel 中添加 `thsadmin.ans-scm.com` 域名，完成后告诉我 DNS 配置信息，我会指导你在 Squarespace 中完成配置！** 🎯
