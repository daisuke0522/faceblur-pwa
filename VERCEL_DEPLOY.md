# FaceBlurをVercelで公開する手順

このプロジェクトは、Vercelで静的PWAとして公開できる状態です。

## 1. Vercel設定

Vercelでは以下の設定を使います。

|項目|設定値|
|---|---|
|Framework Preset|Other|
|Install Command|`npm install`|
|Build Command|`npm run build`|
|Output Directory|`dist`|

`vercel.json` に同じ内容を入れているため、通常はVercelが自動で読み取ります。

## 2. package.json

`package.json` には以下のコマンドがあります。

```sh
npm run check:pwa
npm run build
```

- `npm run check:pwa`: PWAに必要なファイルとmanifest設定を確認します。
- `npm run build`: Vercel公開用の `dist/` フォルダを作成します。

## 3. PWA設定

PWA設定は `manifest.json` にあります。

設定済みの主な項目:

- `name`: `FaceBlur - Tap to Protect`
- `short_name`: `FaceBlur`
- `theme_color`: `#0c0c14`
- `background_color`: `#0c0c14`
- `display`: `standalone`
- `start_url`: `./`
- `scope`: `./`

## 4. アイコン配置

アイコンは以下に配置済みです。

```text
assets/icon-192.png
assets/icon-512.png
assets/apple-touch-icon.png
```

`manifest.json` では192x192と512x512を参照しています。iPhoneのホーム画面用には `apple-touch-icon.png` を `face-blur-app.html` と `index.html` から参照しています。

## 5. Service Worker

Service Workerは `service-worker.js` です。以下をキャッシュ対象にしています。

- `index.html`
- `face-blur-app.html`
- `privacy.html`
- `manifest.json`
- アプリアイコン

公開後はHTTPSで配信されるため、対応ブラウザでService Workerが有効になります。

## 6. 公開前チェック

Vercelへアップする前に、ローカルで以下を実行します。

```sh
npm run check:pwa
npm run build
```

この環境では通常の `npm` が入っていない場合があります。その場合でも、Vercel上ではNode.jsとnpmが用意されているため、GitHubへpush後にVercelでビルドできます。

## 7. GitHubへpushする手順

初めてGitHubに置く場合:

```sh
git init
git add .
git commit -m "Prepare FaceBlur PWA for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

`YOUR_ACCOUNT` と `YOUR_REPOSITORY` は自分のGitHubアカウント名とリポジトリ名に置き換えてください。

すでにGitHubリポジトリがある場合:

```sh
git add .
git commit -m "Prepare FaceBlur PWA for Vercel"
git push
```

## 8. VercelでImport Projectする手順

1. Vercelにログインします。
2. ダッシュボードで `Add New...` を押します。
3. `Project` を選びます。
4. GitHub連携を求められたら許可します。
5. FaceBlurのリポジトリを選んで `Import` を押します。
6. 設定画面で以下を確認します。
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. `Deploy` を押します。
8. 完了後、表示されたURLを開きます。

## 9. スマホでホーム画面に追加

iPhone Safari:

1. Vercel公開URLをSafariで開きます。
2. 共有ボタンを押します。
3. `ホーム画面に追加` を選びます。
4. 名前が `FaceBlur` になっていることを確認して追加します。

Android Chrome:

1. Vercel公開URLをChromeで開きます。
2. メニューを開きます。
3. `アプリをインストール` または `ホーム画面に追加` を選びます。

## 10. 公開後に確認すること

- 写真選択ができる
- 顔検出または手動ぼかしが動く
- 保存モーダルが開く
- `privacy.html` が開ける
- スマホのホーム画面に追加できる
- ホーム画面から起動した時にブラウザUIなしのstandalone表示になる
