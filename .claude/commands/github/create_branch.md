# GitHub Issue Branch 作成

**使用方法**: `/github:create_branch <issue_number>`

## 実行内容
1. GitHub の Issue #$ARGUMENTS の内容を確認
2. Issue の概要に基づいた適切なブランチ名を生成
3. カレントブランチから新しいブランチを作成
4. ブランチ名フォーマット: `Issue#$ARGUMENTS_<descriptive_name>`

## ブランチ命名規則
- **機能追加**: `Issue#X_feature_name`
- **バグ修正**: `Issue#X_fix_description` 
- **改善**: `Issue#X_improve_target`
- **設定**: `Issue#X_config_update`

## 例
```bash
# Issue #25 "Add user authentication"
→ Issue#25_user_authentication

# Issue #30 "Fix button styling bug"
→ Issue#30_fix_button_styling
```