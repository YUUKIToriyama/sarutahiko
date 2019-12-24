/* load_localgeojson.js */

// 読み込んだgeoJSONファイルを配列loadedJSONFilesに格納する
// n番目に読み込まれたファイルはloadedJSONFiles[n-1]にある
var loadedJSONFiles = [];
var count = 0;

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
			tableHTML = tableHTML + `<tr><td><input type="checkbox" name="loadedGeoJSON-${count}"/><td>${f.name}</td><td>${f.size}</td><td>${f.type}</td></tr>`;
			
			var fileReader = new FileReader();
			fileReader.onload = x => {
				loadedJSONFiles.push(JSON.parse(fileReader.result));
			}
			fileReader.readAsText(f);
			count = count + 1;
		});

		// 読み込んだファイルの一覧を表示する
		document.getElementById("uploadedGeoJSONs").innerHTML += tableHTML;
	}	
	// ファイルの選択をクリアする
	fileLoad.value = "";
}

fileLoad.addEventListener("change", handleFileSelect, false);
