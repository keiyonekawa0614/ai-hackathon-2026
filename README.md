# AI ハッカソン 2026

AIを活用したハッカソン用Webアプリケーションテンプレート

## 機能

- 画像アップロード（ドラッグ&ドロップ対応）
- AIチャットインターフェース
- 履歴ダッシュボード
- ダークモード対応
- レスポンシブデザイン

## 技術スタック

- **フレームワーク**: Next.js 15
- **スタイリング**: Tailwind CSS v4
- **UIコンポーネント**: shadcn/ui
- **アイコン**: Lucide React

## ローカル開発

### 前提条件

- Node.js 18以上
- pnpm

### セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

---

## Cloud Run へのデプロイ

### 1. 前提条件

Google Cloud CLIをインストールしてください。  
https://cloud.google.com/sdk/docs/install

```bash
# Google Cloudにログイン
gcloud auth login

# プロジェクトを設定（YOUR_PROJECT_IDを置き換え）
gcloud config set project YOUR_PROJECT_ID
```

### 2. 必要なAPIを有効化

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### 3. デプロイ

以下のコマンドでビルドからデプロイまで自動実行されます。

```bash
gcloud run deploy ai-hackathon-2026 \
  --source . \
  --region=asia-northeast1 \
  --allow-unauthenticated \
  --port=3000 \
  --memory=512Mi \
  --cpu=1
```

デプロイが完了すると、URLが表示されます。

### 環境変数を追加する場合

```bash
gcloud run deploy ai-hackathon-2026 \
  --source . \
  --region=asia-northeast1 \
  --allow-unauthenticated \
  --port=3000 \
  --memory=512Mi \
  --cpu=1 \
  --set-env-vars="API_KEY=xxx,DATABASE_URL=yyy"
```

---

## プロジェクト構成

```
├── app/
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # ルートレイアウト
│   └── page.tsx             # メインページ
├── components/
│   ├── ui/                  # shadcn/ui コンポーネント
│   ├── header.tsx           # ヘッダー
│   ├── image-upload.tsx     # 画像アップロード
│   ├── chat-interface.tsx   # チャットUI
│   └── history-dashboard.tsx # 履歴表示
├── public/                  # 静的ファイル
├── Dockerfile               # Dockerビルド設定
├── .dockerignore            # Docker除外設定
└── next.config.mjs          # Next.js設定
```

---

## Built with v0

This project is linked to [v0](https://v0.app). You can continue developing by visiting:

[Continue working on v0 →](https://v0.app/chat/projects/prj_0srG9neIDlLBvhuxh4KgDer4rAfK)

## ライセンス

MIT
