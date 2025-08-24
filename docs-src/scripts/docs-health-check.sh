#!/bin/bash

# ドキュメント健康度チェックスクリプト
# 使用方法: ./docs-health-check.sh

set -e

echo "🏥 ドキュメント健康度チェック開始"
echo "=================================="

# 色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ログ関数
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# プロジェクトルートに移動
cd "$(dirname "$0")/../.." || exit 1

echo
log_info "1. 基本ファイル存在確認"
echo "----------------------------"

required_files=(
    "CLAUDE.md"
    "docs-src/README.md"
    "docs-src/onboarding/README.md"
    "docs-src/architecture/README.md"
    "docs-src/testing/README.md"
    "docs-src/howto/README.md"
    "docs-src/quality/README.md"
    "docs-src/api/README.md"
    "docs-src/release/README.md"
    "docs-src/diagrams/README.md"
    "docs-src/adr/README.md"
)

for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        log_success "存在: $file"
    else
        log_error "不存在: $file"
    fi
done

echo
log_info "2. 動的情報の実態確認"
echo "----------------------------"

# テスト数確認
log_info "テスト実行状況確認中..."
if cd frontend && npm test -- --passWithNoTests --verbose 2>&1 | tail -3 > /tmp/test_result.txt; then
    test_info=$(cat /tmp/test_result.txt | grep -E "(Tests:|Test Suites:)" | tail -2)
    log_success "テスト実行完了"
    echo "$test_info"
    cd ..
else
    log_warning "テスト実行でエラーが発生（継続）"
    cd ..
fi

# ファイル数確認
log_info "TypeScriptファイル数確認..."
ts_files=$(find frontend/src -name "*.tsx" -o -name "*.ts" | grep -v test | grep -v stories | wc -l)
log_success "TypeScriptファイル数: $ts_files"

# コンポーネント数確認
log_info "コンポーネント分類確認..."
ui_count=$(find frontend/src/components/ui -name "*.tsx" 2>/dev/null | grep -v test | grep -v stories | wc -l || echo "0")
forms_count=$(find frontend/src/components/forms -name "*.tsx" 2>/dev/null | grep -v test | grep -v stories | wc -l || echo "0")
nav_count=$(find frontend/src/components/navigation -name "*.tsx" 2>/dev/null | grep -v test | grep -v stories | wc -l || echo "0")
layout_count=$(find frontend/src/components/layout -name "*.tsx" 2>/dev/null | grep -v test | grep -v stories | wc -l || echo "0")

log_success "UI: $ui_count, Forms: $forms_count, Navigation: $nav_count, Layout: $layout_count"

# 旧ディレクトリ残存確認
log_info "旧ディレクトリ(_old)残存確認..."
old_dirs=$(find frontend/src -name "*_old" -type d 2>/dev/null || echo "")
if [[ -z "$old_dirs" ]]; then
    log_success "旧ディレクトリなし（Phase 2完了）"
else
    log_warning "旧ディレクトリ残存:"
    echo "$old_dirs"
fi

echo
log_info "3. ドキュメント内容整合性チェック"
echo "----------------------------"

# CLAUDE.mdの記載内容確認
claude_test_count=$(grep -o "[0-9]\+テスト" CLAUDE.md | head -1 | grep -o "[0-9]\+" || echo "不明")
claude_suite_count=$(grep -o "[0-9]\+スイート" CLAUDE.md | head -1 | grep -o "[0-9]\+" || echo "不明")

log_info "CLAUDE.md記載: ${claude_test_count}テスト、${claude_suite_count}スイート"

# Phase 2進捗確認
phase2_progress=$(grep -o "Phase 2.*([0-9]\+%)" CLAUDE.md | grep -o "[0-9]\+%" || echo "不明")
log_info "CLAUDE.md記載Phase 2進捗: $phase2_progress"

echo
log_info "4. リンク存在確認（基本）"
echo "----------------------------"

# 内部リンク基本確認
docs_links=(
    "docs-src/README.md"
    "docs-src/onboarding/README.md"
    "docs-src/architecture/README.md"
    "docs-src/testing/README.md"
    "docs-src/howto/README.md"
)

for link in "${docs_links[@]}"; do
    if [[ -f "$link" ]]; then
        log_success "リンク先存在: $link"
    else
        log_error "リンク先不存在: $link"
    fi
done

echo
log_info "5. 最近のドキュメント更新履歴"
echo "----------------------------"

# Git履歴確認（docs-srcディレクトリの変更）
if git log --oneline --since="1 week ago" -- docs-src/ CLAUDE.md | head -5; then
    log_success "最近のドキュメント更新あり"
else
    log_warning "過去1週間でドキュメント更新なし"
fi

echo
log_info "6. 健康度総合評価"
echo "----------------------------"

# 基本的なスコア計算（簡易版）
score=0
total=0

# 必須ファイル存在（40点）
existing_files=0
for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        ((existing_files++))
    fi
done
file_score=$(( existing_files * 40 / ${#required_files[@]} ))
score=$((score + file_score))
total=$((total + 40))

# コンポーネント構成（30点）
if [[ "$ui_count" -eq 10 && "$forms_count" -eq 6 && "$nav_count" -eq 10 && "$layout_count" -eq 2 ]]; then
    score=$((score + 30))
    log_success "コンポーネント構成: 完全適合 (+30点)"
elif [[ "$ui_count" -ge 8 && "$forms_count" -ge 5 && "$nav_count" -ge 8 ]]; then
    score=$((score + 20))
    log_warning "コンポーネント構成: 概ね適合 (+20点)"
else
    log_warning "コンポーネント構成: 要確認 (+10点)"
    score=$((score + 10))
fi
total=$((total + 30))

# 旧ディレクトリ状況（20点）
if [[ -z "$old_dirs" ]]; then
    score=$((score + 20))
    log_success "旧ディレクトリ: 完全削除 (+20点)"
else
    old_count=$(echo "$old_dirs" | wc -l)
    if [[ "$old_count" -le 3 ]]; then
        score=$((score + 10))
        log_warning "旧ディレクトリ: 少数残存 (+10点)"
    else
        log_warning "旧ディレクトリ: 多数残存 (+0点)"
    fi
fi
total=$((total + 20))

# 更新鮮度（10点）
recent_updates=$(git log --oneline --since="1 month ago" -- docs-src/ CLAUDE.md | wc -l)
if [[ "$recent_updates" -ge 5 ]]; then
    score=$((score + 10))
    log_success "更新鮮度: 良好 (+10点)"
elif [[ "$recent_updates" -ge 2 ]]; then
    score=$((score + 5))
    log_warning "更新鮮度: 普通 (+5点)"
else
    log_warning "更新鮮度: 要改善 (+0点)"
fi
total=$((total + 10))

echo
echo "=================================="
health_percentage=$((score * 100 / total))

if [[ "$health_percentage" -ge 90 ]]; then
    log_success "📊 ドキュメント健康度: ${health_percentage}% (優秀)"
elif [[ "$health_percentage" -ge 75 ]]; then
    log_success "📊 ドキュメント健康度: ${health_percentage}% (良好)"
elif [[ "$health_percentage" -ge 60 ]]; then
    log_warning "📊 ドキュメント健康度: ${health_percentage}% (改善推奨)"
else
    log_error "📊 ドキュメント健康度: ${health_percentage}% (要対応)"
fi

echo
log_info "🔧 改善推奨事項:"
echo "- ドキュメント数値の実態との同期"
echo "- 旧ディレクトリの削除完了"
echo "- 定期的なドキュメント更新"
echo "- リンク有効性の確認"

echo
log_info "健康度チェック完了 🏁"

# 終了ステータス
if [[ "$health_percentage" -ge 75 ]]; then
    exit 0
else
    exit 1
fi