# GLB Folio

3Dモデルをインタラクティブに閲覧・共有できるポートフォリオSNS。  
GLBファイルをアップロードしてぐるぐる回しながら作品を展示できます。

## 🔗 Demo

（Vercel公開後に追記）

## 📸 Screenshot

（スクリーンショット追加予定）

## 🛠 技術スタック

| 役割 | 技術 |
|------|------|
| フロントエンド | React + Vite |
| 認証 | Supabase Auth（Google OAuth） |
| データベース | Supabase（PostgreSQL） |
| ストレージ | Supabase Storage |
| 3Dビューワー | React Three Fiber（実装予定） |
| デプロイ | Vercel（予定） |

## 🗄 データベース設計

| テーブル | 役割 |
|------|------|
| `profiles` | ユーザープロフィール |
| `models` | 3Dモデル投稿 |
| `likes` | いいね |
| `comments` | コメント |
| `follows` | フォロー関係 |
| `tags` / `model_tags` | タグ管理（多対多） |

## ✨ 主な機能

- [x] Googleアカウントでログイン・ログアウト
- [ ] GLBファイルのアップロード
- [ ] 3Dモデルのインタラクティブビューワー
- [ ] ポートフォリオ一覧・詳細表示
- [ ] いいね・コメント
- [ ] ユーザーフォロー

## 🚀 ローカル環境での起動方法

```bash
git clone https://github.com/u-rush/glb-folio.git
cd glb-folio
npm install
```

プロジェクトルートに `.env` ファイルを作成：

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

## 📁 ディレクトリ構成

```
src/
├── pages/
│   ├── Auth.jsx      # ログイン画面
│   └── Home.jsx      # ログイン後のホーム画面
├── App.jsx           # 認証状態の管理
├── supabase.js       # Supabaseクライアント設定
└── main.jsx
```

## 👤 作者

GitHub: [@u-rush](https://github.com/u-rush)