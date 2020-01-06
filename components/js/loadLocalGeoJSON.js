/* load_localgeojson.js */

// 読み込んだgeoJSONファイルはleafletjsのgeojsonオブジェクトとして配列loadedLocalJSONFilesに格納する
// n番目に読み込まれたファイルはloadedLocalJSONFiles[n-1]
var loadedLocalJSONFiles = [];
var countLocal = 0;

// ファイル選択ボタンのオブジェクト
var fileLoad = document.getElementById("chooseFiles");

function handleFileSelect(evt) {
	var files = evt.target.files;

	var fileList = []
	for (var i = 0; i < files.length; i = i + 1) {
		// filetypeが"application/geo+json"のものだけ通す
		if (files.item(i).type == "application/geo+json") {
			fileList.push(files.item(i));
		}
	}

	// 選択したファイルを読み込む処理
	if (window.confirm("【読込ファイルの確認】\n" + fileList.map(x => "・ " + x.name).join("\n") + "\nの以上" + fileList.length + "件を読み込みます。\nよろしいですか？")) {
		var tableHTML = "";

		fileList.forEach(f => {
			tableHTML = tableHTML + `<tr><td><input type="checkbox" id="loadedGeoJSON-${countLocal}" onChange="showLocalGeoJSON(${countLocal})"/><td>${f.name}</td><td>${f.size}</td><td>${f.type}</td></tr>`;

			var fileReader = new FileReader();
			fileReader.onload = x => {
				try {
					var geojson = JSON.parse(fileReader.result);
				} catch(error) {
					console.log(error);
					alert("パースエラー\n" + error);
				}
				loadedLocalJSONFiles.push(L.geoJSON(geojson, {
					// 各フィーチャにポップアップの説明をつける
					onEachFeature: function (feature, layer) {
						var popupText = '<div class="popupText"><table>' + Object.entries(feature).map(x => `<tr><td>${x[0]}</td><td class="value">${JSON.stringify(x[1])}</td></tr>`).join("\n") + '</table></div>';
						layer.bindPopup(popupText);
					}	
				}));
			}
			fileReader.readAsText(f);
			countLocal = countLocal + 1;
		});

		// 読み込んだファイルの一覧を表示する
		document.getElementById("loadedLocalGeoJSONs").innerHTML += tableHTML;
	}	
	// ファイルの選択をクリアする
	fileLoad.value = "";
}

fileLoad.addEventListener("change", handleFileSelect, false);
