/* geojson_display.js */

function showRemoteGeoJSON(id) {
	var checkbox = document.getElementById(`loadedRemoteGeoJSON-${id}`);
	if (checkbox.checked) {
		//loadedRemoteJSONFiles[id].addTo(map);
		layerControl.addOverlay(loadedRemoteJSONFiles[id], "remote-" + id);
	} else {
		map.removeLayer(loadedRemoteJSONFiles[id]);
		layerControl.removeLayer(loadedRemoteJSONFiles[id]);
	}
}

function showLocalGeoJSON(id) {
	var checkbox = document.getElementById(`loadedGeoJSON-${id}`);
	if (checkbox.checked) {
		//loadedLocalJSONFiles[id].addTo(map);
		layerControl.addOverlay(loadedLocalJSONFiles[id], "local-" + id);
	} else {
		map.removeLayer(loadedLocalJSONFiles[id]);
		layerControl.removeLayer(loadedLocalJSONFiles[id]);
	}
}

function showFlickrJSON(id) {
        var checkbox = document.getElementById(`fromFlickr-${id}`);
        if (checkbox.checked) {
                layerControl.addOverlay(datumFromFlickr[id], "flickr-" + id);
        } else {
                map.removeLayer(datumFromFlickr[id]);
                layerControl.removeLayer(datumFromFlickr[id]);
        }
}
