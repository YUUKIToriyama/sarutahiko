/* load_remotegeojson.js */

var importedGeoJSONs = [];
var idRemote = 0;

function loadRemoteGeoJSON() {
	var textForm = document.getElementById("urlRemoteFile");
	var url = textForm.value;
	console.log(url);
	//alert(url)

	// モダンJavascriptの新機能FetchAPIを使ってリモートのファイルにアクセス
	fetch(url, {method: "GET", redirect: "follow", mode: "cors"}).then(response => {
		if(response.ok){
			// 読み込んだGeoJSONの情報を表に出力する
			var responseURL = response.url;
			var fileName = responseURL.split("/").pop();
			var contentType = response.headers.get('Content-Type');
			document.getElementById("loadedRemoteGeoJSONs").innerHTML += `<tr><td><input type="checkbox" id="loadedRemoteGeoJSON-${idRemote}" onChange="showRemoteGeoJSON(${idRemote})"/><td>${fileName}</td><td>${responseURL}</td><td>${contentType}</td></tr>`;

			// 読み込んだJSONファイルをleafletjsのオブジェクトに変換し配列に格納する
			// オブジェクトへのアクセスはidRemoteをもちいておこなう
			response.json().then(geoJson => {
				importedGeoJSONs.push(L.geoJSON(geoJson));
				idRemote = idRemote + 1;
			});
		} else {
			alert(`${url}は読み込めませんでした。`);
		}
	});

	textForm.focus();
}

