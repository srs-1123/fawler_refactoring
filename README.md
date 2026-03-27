# Fowler Refactoring Practice

Martin Fowler「リファクタリング 第2版」のサンプルコードをJavaScript + TDDで写経するプロジェクト。

## 環境

- Node.js（WSL Ubuntu側にインストール）
- Jest

## セットアップ

```bash
npm install
```

## テストの実行

```bash
# 1回だけ実行
npm test

# ファイル保存のたびに自動実行（TDD推奨）
npm run test:watch
```

## ディレクトリ構成

```
src/    # 実装コード
tests/  # テストコード
```