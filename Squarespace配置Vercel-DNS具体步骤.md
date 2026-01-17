# 🎯 Squarespace 配置 Vercel DNS - 具体操作步骤

## 📋 Vercel 的 DNS 要求

根据 Vercel 显示的信息：

**www.ans-scm.com 需要配置**：
- **类型**：CNAME
- **名称**：`www`
- **值**：`217aacefef71365c.vercel-dns-017.com.`

**ans-scm.com（根域名）**：
- 自动重定向到 `www.ans-scm.com`（307 重定向）
- 可能需要在 Squarespace 配置 A 记录或 CNAME

---

## 🔧 在 Squarespace 中配置步骤

### 步骤 1：修改 www 子域名的 DNS 记录

1. **登录 Squarespace**
   - 访问：https://account.squarespace.com/domains/managed/ans-scm.com/dns/dns-settings

2. **找到现有的 www A 记录**
   - 在 **カスタム レコード (Custom Records)** 部分
   - 找到：`www` → `A` → `8.217.129.159` 这条记录

3. **删除旧的 A 记录**
   - 点击该记录旁边的删除按钮（如果有）
   - 或者记录下位置，稍后添加新的 CNAME 后删除

4. **添加新的 CNAME 记录**
   - 点击 **レコードを追加 (Add Record)** 按钮
   - 填写：
     ```
     ホスト (Host): www
     タイプ (Type): CNAME
     データ (Data): 217aacefef71365c.vercel-dns-017.com.
     TTL: 1時間（或 3600）
     ```
   - ⚠️ **重要**：Data 字段的值要包含末尾的点号 `.`，即：`217aacefef71365c.vercel-dns-017.com.`

5. **保存记录**
   - 点击 **保存** 或 **追加** 按钮

6. **删除旧的 www A 记录**（如果还没有删除）
   - 确认新的 CNAME 记录已添加后，删除旧的 A 记录

---

### 步骤 2：配置根域名 ans-scm.com（可选）

Vercel 显示根域名会自动重定向到 www，但为了更好的配置，可以：

#### 选项 A：添加 CNAME 记录（如果 Squarespace 支持）

如果 Squarespace 允许根域名使用 CNAME：
1. 找到 `@` 的 A 记录（`8.217.129.159`）
2. 添加新的 CNAME 记录：
   ```
   ホスト (Host): @
   タイプ (Type): CNAME
   データ (Data): 217aacefef71365c.vercel-dns-017.com.
   ```
3. 删除旧的 A 记录（但可能根域名不支持 CNAME）

#### 选项 B：保持 A 记录（如果 CNAME 不支持）

如果根域名不支持 CNAME：
- 保持现有的 A 记录不变
- Vercel 会自动处理重定向
- 或者等待 Vercel 告诉你根域名需要什么记录

---

## ✅ 配置完成后的 DNS 记录列表

配置完成后，你的 **カスタム レコード** 应该包含：

### 网站相关（Vercel）

```
CNAME 记录:
www → 217aacefef71365c.vercel-dns-017.com.

A 记录（根域名，可选）:
@ → 8.217.129.159（如果根域名不支持 CNAME，保持这个）
```

### 邮件相关（保留，不要删除）

```
MX 记录:
@ → ansscm-com0i.mail.protection.outlook.com (優先度: 1)

TXT 记录:
@ → v=spf1 include:spf.protection.outlook.com -all

CNAME 记录:
autodiscover → autodiscover.outlook.com
```

### Squarespace 系统记录（保留）

```
CNAME:
_domainconnect → _domainconnect.domains.squarespace.com
```

---

## ⏰ 等待 DNS 生效

1. **DNS 传播时间**：通常 5-60 分钟
2. **在 Vercel 中检查状态**：
   - 返回 Vercel **Settings** → **Domains**
   - 点击 `www.ans-scm.com` 旁边的 **Refresh** 按钮
   - 查看状态是否变为 **Valid Configuration**（绿色对勾 ✅）

3. **验证方法**：
   ```bash
   # 命令行检查
   nslookup www.ans-scm.com
   
   # 应该看到指向：217aacefef71365c.vercel-dns-017.com.
   ```

---

## 🔍 验证配置

### 在浏览器中测试：

1. **测试 www 子域名**：
   - 访问：`https://www.ans-scm.com`
   - 应该能看到你的 Vercel 网站

2. **测试根域名**：
   - 访问：`https://ans-scm.com`
   - 应该自动重定向到 `https://www.ans-scm.com`

### 在 Vercel 中检查：

- 返回 Vercel Domains 页面
- 两个域名的状态都应该显示为 **Valid Configuration**
- 如果还是 **Invalid Configuration**，点击 **Refresh** 按钮

---

## ⚠️ 注意事项

1. **CNAME 值要包含末尾的点号**
   - 正确：`217aacefef71365c.vercel-dns-017.com.`（有末尾点）
   - 错误：`217aacefef71365c.vercel-dns-017.com`（没有末尾点）

2. **不要删除邮件相关记录**
   - MX、TXT、autodiscover 记录必须保留
   - 否则邮件服务会中断

3. **如果根域名不支持 CNAME**
   - 某些 DNS 提供商不支持根域名的 CNAME
   - 在这种情况下，保持 A 记录，Vercel 会自动处理重定向

4. **DNS 传播可能需要时间**
   - 不要立即期望看到结果
   - 等待 5-60 分钟后再检查

---

## 🆘 问题排查

### 问题：Vercel 仍然显示 "Invalid Configuration"

**解决方法**：
1. 确认 CNAME 记录的值完全正确（包括末尾的点号）
2. 等待更长时间（最多 24 小时）
3. 在 Vercel 中点击 **Refresh** 按钮
4. 清除浏览器 DNS 缓存

### 问题：www.ans-scm.com 无法访问

**解决方法**：
1. 检查 DNS 记录是否已正确添加
2. 使用 `nslookup www.ans-scm.com` 检查解析是否正确
3. 确认 Vercel 项目已成功部署
4. 检查 Vercel 项目是否有部署错误

---

## 📝 操作检查清单

- [ ] ✅ 在 Squarespace 中删除了 `www` 的旧 A 记录
- [ ] ✅ 在 Squarespace 中添加了 `www` 的 CNAME 记录
- [ ] ✅ CNAME 值正确：`217aacefef71365c.vercel-dns-017.com.`（包含末尾点号）
- [ ] ✅ 保留了所有邮件相关记录（MX、TXT、autodiscover）
- [ ] ✅ 等待了 5-60 分钟让 DNS 生效
- [ ] ✅ 在 Vercel 中点击 Refresh 检查状态
- [ ] ✅ Vercel 显示状态为 **Valid Configuration**
- [ ] ✅ 可以通过 `https://www.ans-scm.com` 访问网站

---

**完成这些步骤后，你的域名就会指向 Vercel 了！** 🎉
