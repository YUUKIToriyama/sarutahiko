/* geojson_display.js */

//var url = "https://gist.githubusercontent.com/YUUKIToriyama/e3cabb0bcde4bd50009ed96c5b8279b8/raw/48c5150f59bc508c5b5abd17eb1fd61395ed1fae/pref_kyoto.geojson";

var url = "https://raw.githubusercontent.com/YUUKIToriyama/ryokucha/master/docs/geojson/29Y1eawImGU.geojson";

// モダンJavascriptの新機能FetchAPIを使う
fetch(url, {method: "GET", redirect: "follow", mode: "cors"}).then(response => {
	if(response.ok){
		response.json().then(geoJson => {
			L.geoJSON(geoJson).addTo(map);
		});
	} else {
		console.log("通信エラー");
	}
});
