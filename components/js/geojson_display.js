/* geojson_display.js */

function showRemoteGeoJSON(id) {
	var checkbox = document.getElementById(`loadedRemoteGeoJSON-${id}`);
	if (checkbox.checked) {
		importedGeoJSONs[id].addTo(map);
	} else {
		map.removeLayer(importedGeoJSONs[id]);
	}
}


function showLocalGeoJSON(id) {
	var checkbox = document.getElementById(`loadedGeoJSON-${id}`);
	if (checkbox.checked) {
		loadedJSONFiles[id].addTo(map);
	} else {
		map.removeLayer(loadedJSONFiles[id]);
	}
}
