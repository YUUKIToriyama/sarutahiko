/* load_remotegeojson.js */

var loadedRemoteJSONFiles = [];
var countRemote = 0;

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
			document.getElementById("loadedRemoteGeoJSONs").innerHTML += `<tr><td><input type="checkbox" id="loadedRemoteGeoJSON-${countRemote}" onChange="showRemoteGeoJSON(${countRemote})"/><td>${fileName}</td><td>${responseURL}</td><td>${contentType}</td></tr>`;

			// 読み込んだJSONファイルをleafletjsのオブジェクトに変換し配列に格納する
			// オブジェクトへのアクセスはcountRemoteをもちいておこなう
			response.json().then(geoJson => {
				loadedRemoteJSONFiles.push(L.geoJSON(geoJson, {
					// 各フィーチャにポップアップ要素を追加する
					onEachFeature: function (feature, layer) {
						var popupText = '<div class="popupText"><table>' + Object.entries(feature).map(x => `<tr><td>${x[0]}</td><td class="value">${JSON.stringify(x[1])}</td></tr>`).join("\n") + '</table></div>';
						layer.bindPopup(popupText);
					}	
				}));
				countRemote = countRemote + 1;
			});
		} else {
			alert(`${url}は読み込めませんでした。`);
		}
	}).catch(err => {
		alert("ネットワークエラー\n" + err.message);
	});

	textForm.focus();
}

