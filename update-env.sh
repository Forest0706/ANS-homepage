#!/bin/bash

# 更新 .env.local 文件脚本
# 用于添加 Supabase Logo URL

echo "🔧 更新环境变量配置"
echo "===================="
echo ""

# 检查 .env.local 是否存在
if [ ! -f .env.local ]; then
    echo "📝 创建 .env.local 文件..."
    cp .env.example .env.local 2>/dev/null || {
        cat > .env.local << 'EOF'
# Supabase 配置
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_PASSWORD=fkMIIsq4Xw46YLne

# Logo URL（从 Supabase Storage 获取）
# 格式：https://你的项目ID.supabase.co/storage/v1/object/public/bucket名称/logo文件名
VITE_LOGO_URL=
EOF
    }
    echo "✅ .env.local 文件已创建"
fi

echo ""
echo "请手动编辑 .env.local 文件，添加以下内容："
echo ""
echo "VITE_LOGO_URL=https://你的项目ID.supabase.co/storage/v1/object/public/bucket名称/logo文件名"
echo ""
echo "📖 查看 SUPABASE_LOGO.md 了解如何获取 Logo URL"
