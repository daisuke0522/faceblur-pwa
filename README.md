# FaceBlur 開発メモ

このフォルダには、iCloud Drive上の添付ファイルを元にした開発用コピーを置いています。

- `face-blur-app.html`: 単体で動くFaceBlurプロトタイプ
- `FaceBlur Lovable Spec.md`: Lovable向け仕様書のコピー
- `manifest.json`: PWAインストール用設定
- `service-worker.js`: オフライン/キャッシュ用Service Worker
- `privacy.html`: 公開時に必要なプライバシーポリシー
- `assets/`: アプリアイコン
- `package.json`: Vercel用のbuild/checkコマンド
- `vercel.json`: Vercelのビルド・出力設定
- `VERCEL_DEPLOY.md`: GitHub/Vercel公開手順

## ローカル確認

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

ブラウザで `http://localhost:4173/face-blur-app.html` を開いて確認します。

スマホで確認する場合は、Macとスマホを同じWi-Fiに接続してから以下を開きます。

```text
http://192.168.1.7:4173/
```

`localhost` はスマホ自身を指すため、スマホからMac上の開発サーバーを開く用途では使えません。

## 一般公開の最短手順

まずはWebアプリ/PWAとして公開するのがおすすめです。HTTPSで公開すると、対応ブラウザではホーム画面に追加してアプリのように使えます。

Vercelで公開する場合は [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) を参照してください。

### Netlifyで公開する場合

1. Netlifyにログイン
2. このフォルダの中身をまとめてアップロード
3. 公開URLを開いて動作確認
4. スマホで公開URLを開き、ホーム画面に追加

### Vercelで公開する場合

1. GitHubなどにこのフォルダの内容をpush
2. VercelでNew Projectを作成
3. Framework PresetはOther
4. Build Commandは空欄
5. Output Directoryは `.` に設定

### GitHub Pagesで公開する場合

1. リポジトリにこのフォルダの内容をpush
2. Settings > Pagesを開く
3. Branchを選択してDeploy
4. 発行されたURLをスマホで確認

## 公開前チェック

- `privacy.html` の問い合わせ先を実際の連絡先に差し替える
- 独自ドメインを使う場合は公開URLでmanifestの起動を確認する
- iPhone SafariとAndroid Chromeで写真選択、ぼかし、保存を確認する
- 公開URLがHTTPSになっていることを確認する
- 顔検出用CDNが読み込めない場合でも手動ぼかしが使えることを確認する

## 今回の改善

- アップロード領域のキーボード操作とフォーカス表示を追加
- `accept` に `.heic` / `.heif` を追加
- PWA用のmanifest、Service Worker、アプリアイコンを追加
- プライバシーポリシーページを追加
- スマホのホーム画面追加向けmetaタグを追加
- 画像読み込み失敗時のトースト表示を追加
- 手動追加した範囲がある状態で再スキャンに失敗した場合も件数を維持
- 手動タップ範囲がキャンバス外にはみ出しにくいよう補正
- 保存モーダルに通常ダウンロードリンクを追加
- モーダルの背景クリックとEscキーで閉じられるように改善
- `origData` 未設定時の再描画ガードを追加
