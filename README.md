# Sarutahiko GeoJSONビューワー
Coming soon...

## めざしているもの
Web上に公開されたオープンマップやgeoJSONファイルを重ね合わせて気軽に地理探検ができるプラットフォームアプリ

## ファイル構成
```text
.
├── LICENSE
├── README.md
├── components
│   ├── css
│   │   └── common.css
│   ├── icon
│   │   ├── icon-192.png
│   │   ├── icon-256.png
│   │   ├── icon-512.png
│   │   └── icon-64.png
│   └── js
│       ├── geojsonDisplay.js
│       ├── loadLocalGeoJSON.js
│       ├── loadRemoteGeoJSON.js
│       ├── mapDisplay.js
│       └── showFlickrData.js
├── data
│   └── basemaps.json
├── index.html
└── sarutahiko.webmanifest
```

### Description
- components/js/mapDisplay.js

index.html上にleafletjs描画領域を用意し、そこになんらかのベースマップを敷くプログラムです。
プルダウンリストによりベースマップを変更する機能のコードもここにあります。

- data/basemaps.json

使えるベースマップの一覧が書かれています。mapDisplay.jsはこれを読み出してプルダウンリストを生成しています。

- components/js/geojsonDisplay.js

先述のmapDisplay.jsで描画した地図の上にgeoJSONファイルを読み出し、あらたなレイヤーを描画するコードです。

- showFlickrData.js

おまけ的機能です。YUUKIToriyama/ryokuchaでやっていたことをこのページ上でもできるように書き換えたものです。flickrAPIのリクエストを貼ると、その検索結果をよしなに整形してマップの上に載せてみることができます。

### その他

将来的にはオフラインでも動作するようにPWAアプリ化しようと考えています。

