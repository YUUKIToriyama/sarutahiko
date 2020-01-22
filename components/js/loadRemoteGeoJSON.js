/* loadRemoteGeoJSON.js */

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

async function loadRemoteGeoJSON() {
	var textForm = document.getElementById("urlRemoteFile");
	var url = textForm.value;
	console.log(url);

	// FetchAPIを使ってリモートのファイルにアクセス
	const response = await fetch(url, {method:"GET", redirect:"follow", mode:"cors"}).catch(err => {alert(err); return err});
	const responseURL = response.url;
	const fileName = responseURL.split("/").pop();
	const contentType = response.headers.get("Content-Type");
	const geoJSON = await response.json().catch(err => {alert(err); return err});

	// 読み込んだGeoJSONにポップアップ要素を付加し、配列loadedRemoteJSONFilesに追加する
	loadedRemoteJSONFiles.push(L.geoJSON(geoJSON, {
		onEachFeature: function (feature, layer) {
			var popupText = '<div class="popupText"><table>' + Object.entries(feature).map(x => `<tr><td>${x[0]}</td><td class="value">${JSON.stringify(x[1])}</td></tr>`).join("\n") + '</table></div>';
			layer.bindPopup(popupText);
		}	
	}));

	// 読み込んだGeoJSONの情報を表に出力する
	document.getElementById("loadedRemoteGeoJSONs").innerHTML += `<tr><td><input type="checkbox" id="loadedRemoteGeoJSON-${countRemote}" onChange="showRemoteGeoJSON(${countRemote})"/><td>${fileName}</td><td>${responseURL}</td><td>${contentType}</td></tr>`;
	countRemote = countRemote + 1;


	textForm.focus();
}

