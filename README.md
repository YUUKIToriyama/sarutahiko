# sarutahiko
Coming soon...

## めざしているもの
Web上に公開されたオープンマップやgeoJSONファイルを重ね合わせて気軽に地理探検ができるプラットフォームアプリ

## ファイル構成
```text
.
├── components
│   ├── css
│   │   └── common.css
│   └── js
│       ├── geojson_display.js
│       └── map_display.js
├── data
│   └── basemaps.json
└── index.html
```

### Description
- components/js/map_display.js

index.html上にleafletjs描画領域を用意し、そこになんらかのベースマップを敷くプログラムです。
プルダウンリストによりベースマップを変更する機能のコードもここにあります。

- data/basemaps.json

使えるベースマップの一覧が書かれています。map_display.jsはこれを読み出しています。

- components/js/geojson_display.js

先述のmap_display.jsで描画した地図の上にgeoJSONファイルを読み出し、あらたなレイヤーを描画するコードです。
