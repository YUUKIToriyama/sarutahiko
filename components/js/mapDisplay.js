/* map_display.js */

var baseMap = L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	id: "default map",
	attribution: "OpenStreetMap"
});

var map = L.map("map", {
	center: [35.0, 135.0],
	zoom: 9,
	layers: [baseMap]
});


var layerControl;
function addLayerControl() {
	// レイヤコントロールのパーツを追加する
	// layerControlに後付けで新しいレイヤを追加するには layerControl.addOverlay(layer, "layer name");
	layerControl = L.control.layers({"basemap": baseMap});
	layerControl.addTo(map);
}

window.onload = x => {
	addSelectBasemapControl();
	addChangeViewControl();
	addLayerControl();
}


// mapにベースマップ選択ボタンを追加
function addSelectBasemapControl() {
	var selectboxCreate = L.Control.extend({
		options: {
			potision: "topright"
		},
		onAdd: function(map) {
			var container = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-custom");
			container.innerHTML = `<select name="choose_basemap" id="selector" size="1" onchange="selectboxChange()"><option value="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png">ベースマップを選択</option></select>`;
			return container;
		}
	});
	map.addControl(new selectboxCreate());
	loadMapList();
}

// changeView()を呼び出すフォームを追加
function addChangeViewControl() {
	var changeViewControl = L.Control.extend({
		option: {
			potision: "buttomright"
		},
		onAdd: function(map) {
			var container = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-custom");
			container.innerHTML = `
				<form name="setView" id="setview"><fieldset><legend>中心点を変更</legend>
					<input type="number" id="longitude" name="longitude" min="-180" max="180" placeholder="-180~180">
					<label for="longitude">経度</label>
					<br>
					<input type="number" id="latitude" name="latitude" min="-90" max="90" placeholder="-90~90">
					<label for="latitude">緯度</label>
					<br>
					<input type="number" id="zoomlevel" name="zoomlevel" min="0" max="10" placeholder="0~10">
					<label for="zoomlevel">ズームレベル</label>
					<br>
					<input type="button" onclick="changeView(document.getElementById('longitude').value, document.getElementById('latitude').value, document.getElementById('zoomlevel').value)" value="変更">
				</fieldset></form>
				<style>
					#setview input {
						width: 5em;
					}
				</style>`;
			container.style.backgroundColor = "white";
			return container;
		}
	});
	map.addControl(new changeViewControl());
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
	map.removeLayer(baseMap); //removeLayer()を行わないと、それまで表示されていたレイヤーが残ってしまう。
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
