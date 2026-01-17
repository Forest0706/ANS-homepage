# 🔑 如何复制 Resend API Key

## 📋 问题说明

API Key 的 Token 通常在**创建时只显示一次**，之后就无法再次查看完整 Token。如果你已经离开了创建页面，需要创建一个新的 API Key。

---

## ✅ 解决方案：创建新的 API Key

### 步骤 1：创建新的 API Key

1. **返回 API Keys 列表页面**
   - 点击左侧菜单的 **API Keys**（如果不在列表页）
   - 或访问：https://resend.com/api-keys

2. **点击创建按钮**
   - 在页面右上角找到 **"+ Create API key"** 按钮（黑色按钮）
   - 点击这个按钮

3. **填写 API Key 信息**
   - **Name**：输入名称，例如：`ANS Website Production`
   - **Permission**：选择 **Sending access**（发送权限）
   - **Domain**：选择 **All domains**（或指定域名）
   - 点击 **Create** 或 **Add**

4. **复制 Token（重要！）**
   - 创建后会立即显示完整的 API Key
   - **⚠️ 这是唯一一次显示完整 Token**
   - 点击 **Copy** 按钮或手动选中并复制
   - Token 格式：`re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **立即保存到安全的地方**（如记事本、密码管理器）

---

## 📝 创建 API Key 的详细步骤

### 在 API Keys 页面：

1. 点击右上角的 **"+ Create API key"** 按钮

2. 在弹出的对话框中：
   ```
   Name: ANS Website Production
   Permission: Sending access ✅
   Domain: All domains ✅
   ```

3. 点击 **Create** 或 **Add**

4. **重要**：创建后会立即显示完整的 Token，类似：
   ```
   re_LvbnqfMq_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   - 点击 **Copy** 按钮复制
   - 或手动选中整个 Token 并复制（Ctrl+C 或 Cmd+C）

5. **保存 Token**
   - 立即保存到安全的地方
   - 接下来要在 Vercel 中使用

---

## ⚠️ 重要提示

- ✅ **Token 只显示一次**：创建后离开页面就无法再次查看
- ✅ **妥善保管**：Token 相当于密码，请妥善保存
- ✅ **可以创建多个**：可以创建多个 API Key 用于不同用途

---

## 🔄 如果已经离开创建页面

如果你已经关闭了创建 API Key 的对话框：

1. **需要重新创建**
   - 点击 **"+ Create API key"** 按钮
   - 创建一个新的 API Key
   - 这次记得立即复制 Token

2. **旧的 API Key 可以保留**
   - 旧的 "Onboarding" API Key 可以保留
   - 不影响使用
   - 新的 API Key 专门用于生产环境

---

## 📋 接下来的步骤

复制 Token 后：

1. ✅ 创建新的 API Key（当前步骤）
2. ✅ 复制完整的 Token
3. ⏳ 在 Vercel 中添加环境变量 `RESEND_API_KEY`
4. ⏳ 重新部署项目
5. ⏳ 测试表单功能

---

**现在点击 "+ Create API key" 按钮，创建新的 API Key 并立即复制 Token！**
