/* map_display.js */

var map = L.map("map").setView([36.0, 135.0], 5);
// デフォルトのベースマップとしてOpenStreetMapのタイル画像を読み込む
var tileLayer = L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: "OpenStreetMap",
	maxZoom: 19
});
tileLayer.addTo(map);


// 外部ファイル"basemaps.json"に使用できるベースマップのリストを用意している。これを読み出してプルダウンリストを作る
var urlBasemap = "../../data/basemaps.json";
fetch(urlBasemap, {method: "GET", redirect: "follow"}).then(response => {
	if (response.ok) {
		response.json().then(json => {
			var selector = document.getElementById("selector");

			json.forEach(hash => {
				var option = document.createElement("option");
				option.value = hash.url;
				option.innerText = hash.name;
				selector.appendChild(option);
			});
		})
	} else {
		console.log("通信エラー");
	}
});


// プルダウンリストの選択を変更するとそれに合わせてベースマップが変わる仕組み
function selectboxChange() {
	var selector = document.getElementById("selector");
	var selectedItem = selector.options[selector.options.selectedIndex];
	map.removeLayer(tileLayer); //removeLayer()を行わないと、それまで表示されていたレイヤーが残ってしまう。
	tileLayer = L.tileLayer(selectedItem.value, {
		attribution:  selectedItem.innerText,
		maxzoom: 10
	});
	tileLayer.addTo(map)
}
