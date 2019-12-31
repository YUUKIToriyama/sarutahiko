//url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3087bfa92564db76aee146dad1bb9416&tags=asakusa&min_upload_date=2019%2F05%2F01&max_upload_date=2019%2F05%2F30&has_geo=&extras=geo%2C+url_t%2C+url_o%2C+url_sq%2C+date_taken%2C+owner_name%2C+description%2C+media&per_page=500&format=json&nojsoncallback=1"
//url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3087bfa92564db76aee146dad1bb9416&tags=asakusa&min_upload_date=2019%2F05%2F01&max_upload_date=2019%2F05%2F30&has_geo=1&extras=geo%2C+url_t%2C+url_o%2C+url_sq%2C+date_taken%2C+owner_name%2C+description%2C+media&per_page=500&format=json&nojsoncallback=1"
//url = "../../test.json";
function flickrToGeoJSON(requestURL) {
return new Promise((resolve, reject) => {
	fetch(requestURL, {method: "GET", redirect: "follow", mode: "cors"}).then(response => {
		if (response.ok) {
			response.json().then(json => {
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
			}).catch(err => {
				console.log(err.message);
			});
		} else {
			console.log("response NG");
		};
	}).catch(err => {
		console.log(err.message);
	});
});
}

function showFlickrData(geojson) {
	L.geoJSON(geojson, {
		onEachFeature: function (feature, layer) {
			var popupText = `
				<div style="width: 200px; padding: 20px;">
					<table>
						<tr>
							<td>Image</td>
							<td><a href="${feature.properties["flickr-metadata"]["url_o"]}"><img src="${feature.properties["flickr-metadata"]["url_sq"]}" alt="${feature.properties["flickr-metadata"]["title"]}" width="150px" /></a></td>
						</tr>
						<tr>
							<td>Title></td>
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

/*
//showFlickrData(flickrToGeoJSON(url));
const promise = new Promise((resolve, reject) => {
	resolve(flickrToGeoJSON(url));
});
promise.then(x => showFlickrData(x));
*/

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
