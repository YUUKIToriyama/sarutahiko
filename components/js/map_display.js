/* map_display.js */

var map = L.map("map").setView([36.0, 135.0], 6);
// デフォルトのベースマップとしてOpenStreetMapのタイル画像を読み込む
var tileLayer = L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: "OpenStreetMap",
	maxZoom: 19
});
tileLayer.addTo(map);

// mapにベースマップ選択ボタンを追加
var selectboxCreate = L.Control.extend({
	options: {
		potision: "topright",
	},
	onAdd: function(map) {
		var container = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-custom");
		container.innerHTML = `<select name="choose_basemap" id="selector" size="1" onchange="selectboxChange()"><option value="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png">ベースマップを選択</option></select>`;
		return container;
	}
});

map.addControl(new selectboxCreate());
	
window.onload = x => {
	loadMapList();
}


function loadMapList() {
	// 外部ファイル"basemaps.json"に使用できるベースマップのリストを用意している。これを読み出してプルダウンリストを作る
	var urlBasemap = "https://yuukitoriyama.github.io/sarutahiko/data/basemaps.json"; //ウェブ上で使うときは絶対アドレスで指定しないとうまく行かない
	//var urlBasemap = "../../data/basemaps.json";
	getRemoteData(urlBasemap).then(res => {
		res.json().then(json => {
			// jsonファイルの読み込みに成功したら
			var pulldownList = document.getElementById("selector");
			json.forEach(hash => {
				Object.entries(hash).forEach(mapdatum => {
					var optGroup = document.createElement("optgroup");
					optGroup.label = mapdatum[0];
					mapdatum[1].forEach(mapdata => {
						var option = document.createElement("option");
						option.value = mapdata.url;
						option.innerText = mapdata.name;
						optGroup.appendChild(option);
					});
					pulldownList.appendChild(optGroup);
				});	
			});
		}).catch(err => {
			console.log(err);
		})
	}).catch(err => {
		console.log(err);
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


function changeView(longitude, latitude, zoomLevel) {
	// longitude:経度 latitude:緯度 zoomLevel:ズームレベル
	map.setView([latitude, longitude], zoomLevel);
}
