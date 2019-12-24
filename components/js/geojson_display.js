/* geojson_display.js */

function showRemoteGeoJSON(url) {
	// モダンJavascriptの新機能FetchAPIを使ってリモートのファイルにアクセス
	fetch(url, {method: "GET", redirect: "follow", mode: "cors"}).then(response => {
		if(response.ok){
			response.json().then(geoJson => {
				L.geoJSON(geoJson).addTo(map);
			});
		} else {
			console.log("通信エラー");
		}
	});
}

function showLocalGeoJSON(id) {
	var checkbox = document.getElementById(`loadedGeoJSON-${id}`);
	if (checkbox.checked) {
		loadedJSONFiles[id].addTo(map);
	} else {
		map.removeLayer(loadedJSONFiles[id]);
	}
}
