function statistika() {
	if (
		!location.href.includes("https://tarock-counter--added-statistics-fw6szl24.web.app") &&
		!location.href.includes("http://127.0.0.1:5500/public/") &&
		!sessionStorage.uid == "b0fl1Itgx4WLrk2IUm55RlmQQXb2"
	) {
		dlgNotif("Prihaja kmalu", "Statistika");
	} else {
		var contentWh = dialogBuilder("Statistika - " + listOfPlayers["!gameName!"]);
		var newElement = contentWh[0];
		var iks = contentWh[1];
		newElement.parentNode.classList.add("fullscreen");
		dlgFullscreen(newElement.parentNode);
		iks.addEventListener("click", function (e) {
			hideDialog(newElement);
		});

		let list = addElement("md-list", newElement, "stat-list");
		let i = 0;

		let lit = [];
		let usr = {};
		var completeData = {};
		let zaIgrat = ["Klop", "Renons", "Mondfang", "Po Meri"];
		for (const key in listOfPlayers) {
			if (key == "!gamesData!" || key == "!gameName!") {
				continue;
			}
			completeData[key] = {};
			completeData[key]["steviloIgranih"] = 0;
			completeData[key]["steviloSlepanih"] = 0;
			completeData[key]["steviloZmag"] = 0;
			completeData[key]["steviloIzgub"] = 0;
			completeData[key]["seznamTock"] = [];
			lit.push(parseInt(document.querySelector(".rezult_" + key).innerHTML));
			usr[lit.at(-1)] = key;
			let seznamTock = document.querySelectorAll("." + key + "_score");
			for (const tocka of seznamTock) {
				completeData[key]["seznamTock"].push(tocka.innerHTML);
			}
		}

		lit.sort((a, b) => b - a);
		let containerCard = addElement("div", newElement, "flexer");
		function makeCardItem(title, text) {
			let lItem3 = addElement("md-item", containerCard, "stat-item");
			lItem3.innerHTML =
				'<p class="titleTxt" slot="trailing-supporting-text">' +
				title +
				'</p><md-list style="width: 100%;margin-top:30px;font-size: larger;">' +
				text +
				"</md-list>";
		}
		function findKeysWithMaxValue(obj, keyName, k2) {
			const sortedKeys = Object.keys(obj).sort((a, b) => obj[b][keyName] - obj[a][keyName]);

			var resultStrings;
			if (k2) {
				resultStrings = sortedKeys.map(
					(key) =>
						`<md-list-item style="margin-bottom: -10px "><div  slot=start>${key}</div><div slot="end">${obj[key][keyName]}&nbsp&nbsp&nbsp&nbsp</div><div slot=end>&nbsp ${obj[key][k2]}%</div></md-list-item>`
				);
			} else {
				resultStrings = sortedKeys.map(
					(key) =>
						`<md-list-item style="margin-bottom: -10px "><div slot=start>${key}</div><div slot=end>${obj[key][keyName]}</div></md-list-item>`
				);
			}

			return resultStrings.join("");
		}

		for (const key in lit) {
			let lItem = addElement("md-list-item", list, "stat-item");
			lItem.innerHTML = parseInt(i + 1) + "." + "     " + usr[lit[i]] + " (" + lit[i] + ")";
			i++;
		}

		makeCardItem("Število iger", listOfPlayers["!gamesData!"].length);

		for (const game of listOfPlayers["!gamesData!"]) {
			if (!zaIgrat.includes(game[0])) {
				completeData[game[1][0]]["steviloIgranih"] += 1;
				if (game[6]) completeData[game[1][0]]["steviloZmag"] += 1;
				else completeData[game[1][0]]["steviloIzgub"] += 1;

				if (game[1].length == 2) completeData[game[1][1]]["steviloSlepanih"] += 1;
			}
		}
		for (const key in listOfPlayers) {
			if (key == "!gamesData!" || key == "!gameName!") {
				continue;
			}
			completeData[key].odstotekZmag = Math.round(
				(completeData[key].steviloZmag / completeData[key].steviloIgranih) * 100
			);
			completeData[key].odstotekIzgub = Math.round(
				(completeData[key].steviloIzgub / completeData[key].steviloIgranih) * 100
			);
		}
		console.log(completeData);

		let maxGames = findKeysWithMaxValue(completeData, "steviloIgranih");
		makeCardItem("Največkrat igral-a", maxGames);
		let maxCalls = findKeysWithMaxValue(completeData, "steviloSlepanih");
		makeCardItem("Klicanja", maxCalls);
		let maxWins = findKeysWithMaxValue(completeData, "steviloZmag", "odstotekZmag");
		console.log(maxWins.split(",")[0]);

		makeCardItem("Zmage", maxWins);
		let maxLoses = findKeysWithMaxValue(completeData, "steviloIzgub", "odstotekIzgub");
		makeCardItem("Porazi", maxLoses);
	}
}
