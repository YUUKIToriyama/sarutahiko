/* map_display.js */

var map = L.map("map").setView([36.0, 135.0], 6);
// デフォルトのベースマップとしてOpenStreetMapのタイル画像を読み込む
var tileLayer = L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: "OpenStreetMap",
	maxZoom: 19
});
tileLayer.addTo(map);


L.CustomControl = L.Control.extend({
	onAdd: function(map) {
		var ctrl1 = L.DomUtil.create("div");
		ctrl1.innerHTML = `<select name="choose_basemap" id="selector" size="1" onchange="selectboxChange()"><option value="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png">ベースマップを選択</option></select>`;
		return ctrl1;
	},
	onRemove: function(map) {
		//
	}
});
L.control.custom = function(opts) {
	return new L.CustomControl(opts);
}

L.control.custom({potision: "buttomleft"}).addTo(map);
	
window.onload = x => {
	// 外部ファイル"basemaps.json"に使用できるベースマップのリストを用意している。これを読み出してプルダウンリストを作る
	var urlBasemap = "https://yuukitoriyama.github.io/sarutahiko/data/basemaps.json";
	fetch(urlBasemap, {method: "GET", redirect: "follow", mode: "cors"}).then(response => {
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
}


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
