/*load_geojson.js*/

// 読み込んだgeoJSONファイルを配列loadedJSONFilesに格納する
var loadedJSONFiles = [];

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
		// 読み込んだファイルの一覧を表示する
		document.getElementById('uploadedGeoJSONs').innerHTML += fileList.map(x => `<tr><td><input type="checkbox" name="file-${x.name}"/><td>${x.name}</td><td>${x.size}</td><td>${x.type}</td></tr>`).join('');

		fileList.forEach(f => {
			var fileReader = new FileReader();
			fileReader.onload = x => {
				//console.log(fileReader.result);

				loadedJSONFiles.push({"aaa" : JSON.parse(fileReader.result)});
			}
			fileReader.readAsText(f);
		});
	}	
	// ファイルの選択をクリアする
	fileLoad.value = "";
}

fileLoad.addEventListener("change", handleFileSelect, false);
