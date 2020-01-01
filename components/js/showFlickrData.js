/* showFlickrData.js */

// flickrAPIから取ってきたデータを加工してGeoJSONを返す
function flickrToGeoJSON(requestURL) {
	return new Promise((resolve, reject) => {
		getRemoteData(requestURL).then(response => {
			response.json().then(json => {
				// flickrAPIから返ってきたJSONデータをGeoJSONフォーマットに変換する
				var generatedJson = json.photos.photo.map(photo => { 
					return {
						"type": "Feature",
						"properties": {
							"title": photo.id,
							"description": photo.description._content,
							"marker-color": "#00FFFF",
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

				// resolveに返り値を格納して、あとでPromise.thenによって呼び出す。
				resolve(geoJsonOutput);

				// 読み込みリストを更新する
				var fromFlickr = document.getElementById("fromFlickr");
				var queries = requestURL.split("?")[1].split("&").map(q => q.split("=")).map(x => `<tr><td>${x[0]}</td><td>${decodeURIComponent(x[1])}</td></tr>`).join("\n");
				fromFlickr.innerHTML += `<tr><td><input type="checkbox" id="" onChange=""></td><td><table>${queries}</table></td><td>${requestURL}</td>	<td>${json.photos.photo.length}件</td></tr>`;
			}).catch(error => {
				reject(error);
			});
		}).catch(error => {
			reject(error);
		});
	});
}

// flickrToGeoJSON()で変換したGeoJSONをleafletオブジェクトに変換して表示する
function showFlickrData(geojson) {
	L.geoJSON(geojson, {
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
	}).addTo(map);
}

// 入力画面からURLを読み取りFlickrからデータを読み込む
function displayFlickrData(){
	var url = document.getElementById("flickrRequestUrl").value;
	console.log(url);
	flickrToGeoJSON(url).then(function onFulfilled(value) {
		console.log(value);
		showFlickrData(value);
	}).catch(function onRejected(error) {
		console.log(error);
	});
}
