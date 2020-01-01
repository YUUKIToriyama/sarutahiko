/* load_remotegeojson.js */

var loadedRemoteJSONFiles = [];
var countRemote = 0;

function getRemoteData(url) {
        return new Promise(function (resolve, reject) {
                fetch(url, {method: "GET", redirect: "follow", mode: "cors"}).then(response => {
                        resolve(response)
                }).catch(error => {
                        reject(error)
                })
        })
}

function loadRemoteGeoJSON() {
	var textForm = document.getElementById("urlRemoteFile");
	var url = textForm.value;
	console.log(url);
	
	// FetchAPIを使ってリモートのファイルにアクセス
	getRemoteData(url).then(data => {
		var responseURL = data.url;
		var fileName = responseURL.split("/").pop();
		var contentType = data.headers.get("Content-Type");

		// オブジェクトへのアクセスはcountRemoteをもちいておこなう
		data.json().then(geoJson => {
			loadedRemoteJSONFiles.push(L.geoJSON(geoJson, {
				// 各フィーチャにポップアップ要素を追加する
				onEachFeature: function (feature, layer) {
					var popupText = '<div class="popupText"><table>' + Object.entries(feature).map(x => `<tr><td>${x[0]}</td><td class="value">${JSON.stringify(x[1])}</td></tr>`).join("\n") + '</table></div>';
					layer.bindPopup(popupText);
				}	
			}));
			// 読み込んだGeoJSONの情報を表に出力する
			document.getElementById("loadedRemoteGeoJSONs").innerHTML += `<tr><td><input type="checkbox" id="loadedRemoteGeoJSON-${countRemote}" onChange="showRemoteGeoJSON(${countRemote})"/><td>${fileName}</td><td>${responseURL}</td><td>${contentType}</td></tr>`;
			countRemote = countRemote + 1;
		}).catch(error => {
			console.log(error);
			alert(error);
		});
	}).catch(error => {
		console.log(error)
	})

	textForm.focus();
}

