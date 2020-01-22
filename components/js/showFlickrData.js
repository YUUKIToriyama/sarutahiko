/* showFlickrData.js */

var countFlickr = 0;
var datumFromFlickr = [];

// flickrAPIから取ってきたデータを加工してGeoJSONを返す
// 入力画面からURLを読み取りFlickrからデータを読み込む
async function displayFlickrData() {
	const requestURL = document.getElementById("flickrRequestUrl").value;
	const response = await fetch(requestURL, {method:"GET", redirect:"follow", mode:"cors"}).catch(err => {alert(err); return err});
	const json = await response.json().catch(err => {alert(err); return err});

	// flickrAPIから返ってきたJSONデータをGeoJSONフォーマットに変換する
	var generatedJson = json.photos.photo.map(photo => { 
		return {
			"type": "Feature",
			"properties": {
				"title": photo.id,
				"description": photo.description._content,
				"marker-color": "#123456",
				"marker-size": "medium",
				"marker-symbol": "",
				"flickr-metadata": {
					"id": photo.id,
					"owner_name": photo.ownername,
					"owner_id": photo.owner,
					"title": photo.title,
					"datataken": photo.datataken,
					"url_t": photo.url_t,
					"url_o": photo.url_o,
					"url_sq": photo.url_sq,
					"full_height": photo.height_o,
					"full_width": photo.width_o,
					"description": photo.description._content
				}
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					photo.longitude, photo.latitude
				]
			}
		}
	});
	var geoJsonOutput = {
		"type": "FeatureCollection",
		"features": generatedJson
	};
	
	// 読み込みリストを更新する
	var fromFlickr = document.getElementById("fromFlickr");
	var queries = requestURL.split("?")[1].split("&").map(q => q.split("=")).map(x => `<tr><td>${x[0]}</td><td>${decodeURIComponent(x[1])}</td></tr>`).join("\n");
	fromFlickr.innerHTML += `
		<tr>
			<td><input type="checkbox" id="fromFlickr-${countFlickr}" onChange="showFlickrJSON(${countFlickr})"></td>
			<td><table class="minitable">${queries}</table></td>
			<td><a href="${requestURL}" target="_blank">${json.photos.photo.length}件</a></td>
		</tr>`;
	
	// 整形したgeojsonを表示する
	showFlickrData(geoJsonOutput);
}

function generateRandomColorcode() {
	var str = "";
	for (var i = 0; i < 6; i++) {
		str = str + Math.round(Math.random()*15).toString(16);
	}
	return "#" + str
}

// flickrToGeoJSON()で変換したGeoJSONをleafletオブジェクトに変換して表示する
function showFlickrData(geojson) {
	var pointStyle = {
		"radius": 15,
		"color": generateRandomColorcode(),
		"fillColor": generateRandomColorcode(),
		"weight": 5,
		"opacity": 0.9,
	};
	var output = L.geoJSON(geojson, {
		// デフォルトの青色ピンではなく、L.circleMarkerを利用する
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, pointStyle);
		},
		onEachFeature: function (feature, layer) {
			var popupText = `
				<div class="popupText">
					<table>
						<tr>
							<td>Image</td>
							<td><a href="${feature.properties["flickr-metadata"]["url_o"]}"><img src="${feature.properties["flickr-metadata"]["url_sq"]}" alt="${feature.properties["flickr-metadata"]["title"]}" width="150px" /></a></td>
						</tr>
						<tr>
							<td>Title</td>
							<td><p>${feature.properties["flickr-metadata"]["title"]}</p></td>
						</tr>
						<tr>
							<td>Photo by</td>
							<td><p>${feature.properties["flickr-metadata"]["owner_name"]}(${feature.properties["flickr-metadata"]["owner_id"]})</p></td>	
						</tr>
						<tr>
							<td>Details</td>
							<td><p>${feature.properties["flickr-metadata"]["description"]}</p></td>
						</tr>
						<tr>
							<td>Taken-Date</td>
							<td><p>${feature.properties["flickr-metadata"]["datetaken"]}</p></td>
						</tr>
					</table>
				</div>`;
			layer.bindPopup(popupText);
		}
	});
	datumFromFlickr.push(output);
	countFlickr = countFlickr + 1;
	//layerControl.addOverlay(output, "from flickr");
}
