/* geojson_display.js */

function showRemoteGeoJSON(id) {
	var checkbox = document.getElementById(`loadedRemoteGeoJSON-${id}`);
	if (checkbox.checked) {
		loadedRemoteJSONFiles[id].addTo(map);
	} else {
		map.removeLayer(loadedRemoteJSONFiles[id]);
	}
}


function showLocalGeoJSON(id) {
	var checkbox = document.getElementById(`loadedGeoJSON-${id}`);
	if (checkbox.checked) {
		loadedLocalJSONFiles[id].addTo(map);
	} else {
		map.removeLayer(loadedLocalJSONFiles[id]);
	}
}
