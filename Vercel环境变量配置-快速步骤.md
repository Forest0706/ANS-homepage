# ⚙️ Vercel 环境变量配置 - 快速步骤

## 🔑 你的 Resend API Key

```
re_bh5X2DTB_4dxmbzpXUGSKkfcjYTNXkqBc
```

---

## 📝 在 Vercel 中配置步骤

### 步骤 1：打开 Vercel 环境变量页面

访问：
```
https://vercel.com/forestlis-projects/ans_homepage/settings/environment-variables
```

或者：
1. 访问 Vercel Dashboard：https://vercel.com
2. 点击项目：`ans_homepage`
3. 点击 **Settings**（顶部导航栏）
4. 点击左侧菜单的 **Environment Variables**

---

### 步骤 2：添加环境变量

1. **点击 "Add New" 按钮**
   - 在页面右上角或环境变量列表上方

2. **填写环境变量信息**：
   ```
   Key: RESEND_API_KEY
   Value: re_bh5X2DTB_4dxmbzpXUGSKkfcjYTNXkqBc
   ```

3. **选择环境**：
   - ✅ **Production**（生产环境）
   - ✅ **Preview**（预览环境）
   - ✅ **Development**（开发环境）
   - 建议全选

4. **点击 "Save" 或 "Add"**

---

### 步骤 3：验证环境变量

添加后，你应该能在列表中看到：
```
RESEND_API_KEY    •••••••••••••••••••••••••••••••••    Production, Preview, Development
```

---

### 步骤 4：重新部署项目

环境变量添加后，需要重新部署才能生效。

**方法 1：在 Vercel Dashboard 中重新部署**
1. 在 Vercel Dashboard 中，进入项目 `ans_homepage`
2. 点击 **Deployments** 标签
3. 找到最新的部署记录
4. 点击右侧的 **⋯**（三个点）
5. 选择 **Redeploy**
6. 确认重新部署

**方法 2：推送代码触发自动部署**
```bash
git add .
git commit -m "chore: 配置 Resend API Key"
git push origin main
```

---

## ✅ 配置完成检查清单

- [ ] ✅ 在 Vercel 中添加了 `RESEND_API_KEY` 环境变量
- [ ] ✅ 环境变量值正确：`re_bh5X2DTB_4dxmbzpXUGSKkfcjYTNXkqBc`
- [ ] ✅ 选择了所有环境（Production, Preview, Development）
- [ ] ✅ 重新部署了项目
- [ ] ✅ 等待部署完成

---

## 🧪 测试表单功能

部署完成后，测试表单：

1. **访问网站**：https://www.ans-scm.com

2. **测试咨询表单**：
   - 点击"お問い合わせ"按钮
   - 填写表单
   - 点击"送信する"
   - 应该显示成功消息

3. **测试招聘表单**：
   - 点击"応募する"按钮
   - 填写表单
   - 点击"送信する"
   - 应该显示成功消息

4. **检查邮箱**：
   - 登录 `info@ans-scm.com` 邮箱
   - 应该收到表单提交的邮件

---

## 🆘 如果遇到问题

### 问题：环境变量不生效

**解决方法**：
- 确认已重新部署项目
- 检查环境变量名称是否正确：`RESEND_API_KEY`（全大写）
- 检查环境变量值是否正确复制（没有多余空格）

### 问题：邮件发送失败

**解决方法**：
- 查看 Vercel Function Logs：
  - Vercel Dashboard → 项目 → **Functions** → 查看日志
- 检查 API Key 是否正确
- 确认 Resend 账户状态正常

---

**现在去 Vercel 添加环境变量，然后重新部署项目！** 🚀
