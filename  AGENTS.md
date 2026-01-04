# Repository Guideline

## Overview

- shared-expense-fe は共有支出アプリのフロントエンド（Next.js）リポジトリ。
- UI/UX、クライアント側ロジック、API 連携を扱い、バックエンドは対象外。

## Coding Style Guidelines

- TypeScript/React の標準に合わせ、ESLint/Stylelint のルールに従う。
- 命名は `camelCase`、型/コンポーネントは `PascalCase`、定数は `UPPER_SNAKE_CASE`。
- コメントは意図や背景が必要な箇所のみ、自己説明的なコードを優先。

## Security considerations

- API キーや認証情報は環境変数で管理し、リポジトリに直書きしない。
- 依存関係は `npm audit` などで定期確認し、重大な脆弱性は速やかに対応。
- 通信は HTTPS 前提、外部入力はバリデーション/サニタイズを行う。

## Build & Test

- セットアップ: `npm install`
- 開発: `npm run dev`
- ビルド: `npm run build`
- テスト/検証: `npm run lint`（必要に応じて追加テストを実行）

## Knowledge & Library

- 実装前に `Context7 MCP Server` を利用し、`resolve-library-id` → `get-library-docs` で関連ライブラリ（例：`/upstash/context7`）の最新情報を取得する。

## Maintenance policy

- 会話の中で繰り返し指示されたことがある場合は反映を検討すること
- 冗長だったり、圧縮の余地がある箇所を検討すること
- 簡潔でありながら密度の濃い文書にすること
