//url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3087bfa92564db76aee146dad1bb9416&tags=asakusa&min_upload_date=2019%2F05%2F01&max_upload_date=2019%2F05%2F30&has_geo=&extras=geo%2C+url_t%2C+url_o%2C+url_sq%2C+date_taken%2C+owner_name%2C+description%2C+media&per_page=500&format=json&nojsoncallback=1"
//url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3087bfa92564db76aee146dad1bb9416&tags=asakusa&min_upload_date=2019%2F05%2F01&max_upload_date=2019%2F05%2F30&has_geo=1&extras=geo%2C+url_t%2C+url_o%2C+url_sq%2C+date_taken%2C+owner_name%2C+description%2C+media&per_page=500&format=json&nojsoncallback=1"
url = "../../test.json";
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

var testdata = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "47948231543",
        "description": "People praying at Senso-ji Temple in Asakusa, Tokyo. 東京淺草寺的信眾",
        "marker-color": "#00FFFF",
        "marker-size": "medium",
        "marker-symbol": "",
        "flickr-metadata": {
          "id": "47948231543",
          "owner_name": "jameshungyc",
          "owner_id": "157757610@N04",
          "title": "Praying 祈禱",
          "url_t": "https://live.staticflickr.com/65535/47948231543_54084a2994_t.jpg",
          "url_sq": "https://live.staticflickr.com/65535/47948231543_54084a2994_s.jpg",
          "description": "People praying at Senso-ji Temple in Asakusa, Tokyo. 東京淺草寺的信眾"
        }
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          "139.796763",
          "35.714241"
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "47941418213",
        "description": "浅草雷門付近にて\n草24亀戸駅経由浅草寿町行 ASAKUSA-KOTOBUKICHO\nラグビーワールドカップ2019ラッピングバス RWC2019 wrapping bus\nR-N285 臨海支所所属（はとバス委託）\n足立230い285（2020東京大会特別仕様ナンバープレート）",
        "marker-color": "#00FFFF",
        "marker-size": "medium",
        "marker-symbol": "",
        "flickr-metadata": {
          "id": "47941418213",
          "owner_name": "izayuke_tarokaja",
          "owner_id": "46052146@N08",
          "title": "東京都交通局",
          "url_t": "https://live.staticflickr.com/65535/47941418213_11cace007e_t.jpg",
          "url_o": "https://live.staticflickr.com/65535/47941418213_23cc0d3117_o.jpg",
          "url_sq": "https://live.staticflickr.com/65535/47941418213_11cace007e_s.jpg",
          "full_height": 4608,
          "full_width": 3456,
          "description": "浅草雷門付近にて\n草24亀戸駅経由浅草寿町行 ASAKUSA-KOTOBUKICHO\nラグビーワールドカップ2019ラッピングバス RWC2019 wrapping bus\nR-N285 臨海支所所属（はとバス委託）\n足立230い285（2020東京大会特別仕様ナンバープレート）"
        }
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          "139.797635",
          "35.710743"
        ]
      }
    }
  ]
}

//showFlickrData(testdata);
/*
//showFlickrData(flickrToGeoJSON(url));
const promise = new Promise((resolve, reject) => {
	resolve(flickrToGeoJSON(url));
});
promise.then(x => showFlickrData(x));
*/

flickrToGeoJSON(url).then(function onFulfilled(value) {
	console.log(value);
	showFlickrData(value);
}).catch(function onRejected(error) {
	console.log(error);
});
