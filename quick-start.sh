#!/bin/bash

echo "🚀 ANS 官网快速部署脚本"
echo "================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo ""

# 安装依赖
echo "📦 安装依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装完成"
echo ""

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建完成"
echo ""

# Git 设置提示
echo "📝 Git 设置提示："
echo "1. 添加文件: git add ."
echo "2. 提交: git commit -m 'Initial commit'"
echo "3. 添加远程仓库: git remote add origin <你的仓库地址>"
echo "4. 推送: git push -u origin main"
echo ""

# Vercel 部署提示
if command -v vercel &> /dev/null; then
    echo "🌐 Vercel CLI 已安装"
    read -p "是否现在部署到 Vercel? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        vercel --prod
    fi
else
    echo "🌐 安装 Vercel CLI: npm i -g vercel"
    echo "然后运行: vercel --prod"
fi

echo ""
echo "✨ 完成！查看 README.md 和 部署指南.md 了解更多信息"
