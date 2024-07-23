var games = {
  /* "Ime igre": ["Koliko šteje igra","razlika","dobil true, ni dobil false", "s partnerjem, brez"]*/
  Tri: [10, true, "", true, "3"],
  Dve: [20, true, "", true, "2"],
  Ena: [30, true, "", true, "1"],
  "Solo tri": [40, true, "", false, "S3"],
  "Solo dve": [50, true, "", false, "S2"],
  "Solo ena": [60, true, "", false, "S1"],
  "Solo brez": [80, false, "", false, "SB"],
  Valat: [250, false, "", true, "V"],
  "Barvni Valat": [125, false, "", false, "BV"],
  Berač: [70, false, "", false, "B"],
  "Odprti Berač": [90, false, "", false, "OB"],
  Klop: ["", false, "", true, "K"],
  Renons: [0, false, "", true, "R"],
  Mondfang: [-21, false, "", false, "M"],
  "Po meri": [0, false, "", true, "+"],
  "Uredi radlce": ["", false, "", true, "*"],
};
async function addScore(firstPlayer) {
  let ttl = "Kaj je oseba " + firstPlayer + " igrala?";
  if (listOfPlayers[firstPlayer][1] == "Z") {
    ttl = "Kaj je " + firstPlayer + " igrala?";
  } else if (listOfPlayers[firstPlayer][1] == "M") {
    ttl = "Kaj je " + firstPlayer + " igral?";
  }

  var newElement = makeBottomheet(ttl);

  let i = 0;
  for (const key in games) {
    if (i == 3 || i == 7 || i == 11)
      addElement("md-divider", newElement, null).style.margin = "5px";
    i++;
    let btn = document.createElement("md-outlined-button");
    btn.innerHTML = key;
    btn.style.height = "45px";
    btn.classList.add("gameChose");
    btn.setAttribute("type", "reset");
    var icon = addElement("span", null, "btnIcon");
    icon.setAttribute("slot", "icon");
    icon.innerHTML = games[key][4];
    btn.addEventListener("click", function () {
      document.querySelector(".sheetContents").style.display = "flex";
      document.querySelector(".sheetContents").style.overflow = "hidden";
    
      if (key == "Mondfang") {
        document.querySelector(".bottomSheetScrim").click();
        mondfang(firstPlayer);
      } else if (key == "Renons") {
        renons(newElement, firstPlayer);
      } else if (key == "Klop") {
        
        klop(newElement);
      } else if (key == "Po meri") {
        poMeri(newElement, firstPlayer);
      } else {
        if (key == "Uredi radlce") {
          radlciDodaj(newElement);
        } else {
          calculate(key, games[key], newElement, firstPlayer);
        }
      }
    });
    newElement.appendChild(btn);
  }
}
function radlciDodajSamo() {
  for (const key in listOfPlayers) {
    if (key == "!gamesData!" || key == "!gameName!") {
      continue;
    }
    listOfPlayers[key][0] += "*";
  }
}

function radlciDodaj(newElement) {
  changeOpis(newElement, "Uredi radlce");
  newElement.innerHTML = "";
  var divHolder = addElement("div", newElement, null);
  createSliders();
  addElement("div", newElement, "break");
  let dodajRadlc = addElement("md-text-button", newElement, null);
  dodajRadlc.innerHTML = "Dodaj radlce";
  dodajRadlc.addEventListener("click", function () {
    listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
    for (const key in listOfPlayers) {
      if (key == "!gamesData!" || key == "!gameName!") {
        continue;
      }
      listOfPlayers[key][0] += "*";
    }
    divHolder.innerHTML = "";
    createSliders();
  });

  function createSliders() {
    for (const user in listOfPlayers) {
      if (user == "!gamesData!" || user == "!gameName!") {
        continue;
      }
      let labelname = addElement("label", divHolder, null);

      let radlciPLayer = addElement(
        "md-outlined-text-field",
        labelname,
        "radlciPLayer"
      );
      radlciPLayer.name = user;
      radlciPLayer.setAttribute("min", "0");
      radlciPLayer.setAttribute("type", "text");
      radlciPLayer.value = listOfPlayers[user][0];
      if (zaokrožuj) radlciPLayer.setAttribute("step", "5");
      radlciPLayer.setAttribute("pattern", "[\\*]");
      radlciPLayer.label = "Radlci osebe " + user;

      addElement("div", divHolder, "break");
    }
  }

  let koncano = addElement("md-filled-button", newElement, null);
  koncano.innerHTML = "Končano";
  koncano.addEventListener("click", function () {
    listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
    for (const user in listOfPlayers) {
      if (user == "!gamesData!" || user == "!gameName!") {
        continue;
      }
      let rld = document.getElementsByName(user)[0].value;
      listOfPlayers[user][0] = rld.replace(/[^*]/g, "");
    }
    document.querySelector(".bottomSheetScrim").click();
    count(false);
  });
}

function poMeri(newElement, firstPlayer) {
  newElement.innerHTML = "";
  changeOpis(newElement, "Vpišite točke");
  var player = addElement("md-filled-text-field", newElement, null);
  addElement("div", newElement, "break");
  player.classList.add("poMeri");
  player.type = "number";
  player.innerHTML = firstPlayer;
  player.name = 0;
  player.label = firstPlayer;
  player.id = "meri_" + firstPlayer;
  player.addEventListener("change", function () {
    player.name = player.value;
  });
  setTimeout(() => {
    player.shadowRoot.querySelector(".field").setAttribute("focused", "");
    player.focus()
  }, 10);
  var konc = addElement("md-filled-button", newElement, null);
  konc.innerHTML = "Končano";
  konc.setAttribute("type", "reset");
  konc.addEventListener("click", function () {

    listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
    if (!navigator.onLine) {
      localStorage.offlineChanges = true;
    }
   
    listOfPlayers["!gamesData!"].push([
      "Po Meri",
     firstPlayer,
      null,
     player.value,
      false,
      null,
      true,
      null,
      0,
      false,
      false,
      Date.now(),
    ]);
    document.querySelector(".bottomSheetScrim").click();
    gameAnimation()
    count(false, true);
  });
}
var zaokrožuj = JSON.parse(localStorage.getItem("razlikaOkrozi"));
if (zaokrožuj == null || zaokrožuj == undefined) zaokrožuj = true;
async function klop(newElement) {
  newElement.innerHTML = "";
  changeOpis(newElement, "Ali je bil kdo poln oz. prazen?");
  var prazn = addElement("md-outlined-button", newElement, null);
  prazn.innerHTML = "Poln";
  var poln = addElement("md-outlined-button", newElement, null);
  poln.innerHTML = "Prazen";

  var nibil = addElement("md-filled-button", newElement, null);
  nibil.innerHTML = "Ne";
  prazn.setAttribute("type", "reset");
  poln.setAttribute("type", "reset");
  nibil.setAttribute("type", "reset");
  nibil.style.flexBasis = "100%";
  poln.addEventListener("click", function () {
    newElement.innerHTML = "";
    changeOpis(newElement, "Kdo je bil poln?");
    for (const user in listOfPlayers) {
      if (user == "!gamesData!" || user == "!gameName!") {
        continue;
      }
      let player = addElement("md-outlined-button", newElement, null);
      player.innerHTML = user;
      player.setAttribute("type", "reset");
      player.addEventListener("click", function () {
        /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
        if (!navigator.onLine) {
          localStorage.offlineChanges = true;
        }
        listOfPlayers["!gamesData!"].push([
          "Klop",
          player.innerHTML,
          null,
          70,
          listOfPlayers[player.innerHTML][0].length > 0,
          null,
          true,
          null,
          0,
          false,
          false,
          Date.now(),
        ]);
        document.querySelector(".bottomSheetScrim").click();
        gameAnimation()
        setTimeout(() => {
          count(false, true);
        }, 200);
      });
    }
  });
  prazn.addEventListener("click", function () {
    newElement.innerHTML = "";
    changeOpis(newElement, "Kdo je bil prazen?");
    for (const user in listOfPlayers) {
      if (user == "!gamesData!" || user == "!gameName!") {
        continue;
      }
      let player = addElement("md-outlined-button", newElement, null);
      player.innerHTML = user;
      player.setAttribute("type", "reset");
      player.addEventListener("click", function () {
        /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
        if (!navigator.onLine) {
          localStorage.offlineChanges = true;
        }
        listOfPlayers["!gamesData!"].push([
          "Klop",
          player.innerHTML,
          null,
          -70,
          listOfPlayers[player.innerHTML][0].length > 0,
          null,
          true,
          null,
          0,
          false,
          false,
          Date.now(),
        ]);
        document.querySelector(".bottomSheetScrim").click();
        gameAnimation()
        setTimeout(() => {
          count(false, true);
        }, 200);
      });
    }
  });
  await waitForButtonClick([nibil]);
  newElement.innerHTML = "";

  var igralci = [];
  for (const user in listOfPlayers) {
    if (user == "!gamesData!" || user == "!gameName!") {
      continue;
    }
    let labelname = addElement("label", newElement, null);
    labelname.innerHTML = user;
    let klopPlayer = addElement("md-slider", labelname, "klopPlayer");
    klopPlayer.setAttribute("max", "35");
    klopPlayer.setAttribute("min", "0");
    klopPlayer.setAttribute("labeled", "");
    if (zaokrožuj) klopPlayer.setAttribute("step", "5");
    klopPlayer.setAttribute("ticks", "");
    klopPlayer.label = "Točke osebe " + user;
    igralci.push(user);
    addElement("div", newElement, "break");
  }
  addElement("div", newElement, "break");
  var btn = addElement("md-filled-button", newElement, null);
  btn.innerHTML = "Končano";
  addElement("div", newElement, "break");
  btn.addEventListener("click", function () {
    let isfull = true;
    var plNombers = document.querySelectorAll(".klopPlayer");
    var tockice = [];
    for (const pl of plNombers) {
      if (listOfPlayers[pl.label.replace("Točke osebe ", "")][0].length > 0) {
        tockice.push("-" + pl.value * 2);
      } else {
        tockice.push("-" + pl.value);
      }
    }
    listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
    if (!navigator.onLine) {
      localStorage.offlineChanges = true;
    }

    listOfPlayers["!gamesData!"].push([
      "Klop",
      igralci,
      null,
      tockice,
      null,
      null,
      null,
      null,
      false,
      false,
      false,
      Date.now(),
    ]);
    radlciDodajSamo();
    if (isfull) {
      document.querySelector(".bottomSheetScrim").click();
    
      count(false, true);
    }
  });
}

async function mondfang(firstPlayer) {

  listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
  if (!navigator.onLine) {
    localStorage.offlineChanges = true;
  }

  listOfPlayers["!gamesData!"].push([
    "Mondfang",
    firstPlayer,
    null,
    -21,
    false,
    null,
    true,
    null,
    0,
    false,
    false,
    Date.now(),
  ]);

  gameAnimation()
  count(false, true);
}

async function renons(newElement,firstPlayer) {

  newElement.innerHTML = "";
  changeOpis(newElement, "Koliko znaša renons?");
  let renonsSlider = addElement("md-slider", newElement, "klopPlayer");
  renonsSlider.setAttribute("max", "50");
  renonsSlider.setAttribute("min", "0");
  renonsSlider.setAttribute("labeled", "");
  if (zaokrožuj) renonsSlider.setAttribute("step", "5");
  renonsSlider.setAttribute("ticks", "");
  addElement("div", newElement, "break");
  let okButt = addElement("md-filled-button", newElement, null);
  okButt.innerHTML = "Končano";
  okButt.addEventListener("click", function () {

    listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
    if (!navigator.onLine) {
      localStorage.offlineChanges = true;
    }
    listOfPlayers["!gamesData!"].push([
      "Renons",
     firstPlayer,
      null,
      -Math.abs(parseInt(renonsSlider.value)),
      false,
      null,
      true,
      null,
      0,
      false,
      false,
      Date.now(),
    ]);
    document.querySelector(".bottomSheetScrim").click();
    gameAnimation()
    count(false, true);
  });
}
async function calculate(gameName, properties, newElement, firstPlayer) {
  newElement.innerHTML = "";
  if (Object.keys(listOfPlayers).length == 5) {
    partner(newElement, gameName, properties, false, firstPlayer);
  } else {
    var btn = addElement("md-filled-button", null, null);
    var teamWork = properties[3];
    let ttl =
      "Je oseba <b>" + firstPlayer + "</b> igrala solo ali s partnerjem?";
    if (listOfPlayers[firstPlayer][1] == "Z") {
      ttl = "Je <b>" + firstPlayer + "</b> igrala sama ali s partnerjem?";
    } else if (listOfPlayers[firstPlayer][1] == "M") {
      ttl = "Je <b>" + firstPlayer + "</b> igral sam ali s partnerjem?";
    }
    changeOpis(newElement, ttl);
    btn.setAttribute("type", "reset");
    var dv = [];
    btn.addEventListener("click", function () {
      this.remove();
      for (let i = 0; i < dv.length; i++) {
        dv[i].remove();
      }
      partner(newElement, gameName, properties, false, firstPlayer);
    });
    if (teamWork) {
      for (const user in listOfPlayers) {
        if (user == "!gamesData!" || user == "!gameName!") {
          continue;
        }
        if (user == firstPlayer) {
          continue;
        }
        let player = addElement("md-outlined-button", newElement, null);
        player.innerHTML = user;
        dv.push(player);

        player.setAttribute("type", "reset");
        player.addEventListener("click", function () {
          btn.remove();
          for (let i = 0; i < dv.length; i++) {
            dv[i].remove();
          }
          partner(newElement, gameName, properties, true, firstPlayer, user);
        });
      }
      btn.innerHTML = "Solo";
      btn.style.flexBasis = "100%";
      newElement.appendChild(btn);
    } else {
      partner(newElement, gameName, properties, false, firstPlayer);
    }
  }
}

function waitForButtonClick(btn) {
  return new Promise((resolve) => {
    for (const button in btn) {
      btn[button].addEventListener("click", function () {
        resolve();
      });
    }
  });
}
async function partner(
  newElement,
  gameName,
  properties,
  teamWork,
  firstPlayer,
  secondPlayer
) {
  var slct2 = "";
  if (teamWork && secondPlayer) {
    slct2 = secondPlayer;
  }
  changeOpis(newElement, "Izberite razliko");
  var difNu = document.createElement("md-slider");
  var razlika = 0;
  if (!zaokrožuj) {
    difNu.setAttribute("labeled", "");
    if (properties[1]) {
      difNu.min = 0;
      difNu.value = 0;
      difNu.label = "Razlika";
      difNu.max = 35;
      difNu.style.marginTop = "10px";
      newElement.appendChild(difNu);
      addElement("div", newElement, "break");
      let endButton = addElement("md-filled-button", newElement, null);
      endButton.innerHTML = "Končano";
      endButton.setAttribute("type", "reset");
      difNu.addEventListener("change", function () {
        razlika = difNu.value;
      });
      await waitForButtonClick([endButton]);
      newElement.innerHTML = "";
    }
  } else {
    if (properties[1]) {
      var razlike = [0, 5, 10, 15, 20, 25, 30, 35];
      var dv = [];
      addElement("div", newElement, "break");
      for (const element in razlike) {
        let player = addElement("md-outlined-button", newElement, null);
        player.innerHTML = razlike[element];
        dv.push(player);
        player.setAttribute("type", "reset");
        player.addEventListener("click", function () {
          difNu.value = player.innerHTML;
          razlika = player.innerHTML;
          player.remove();
          newElement.innerHTML = "";
        });
      }
      await waitForButtonClick(dv);
    }
  }
  var btn22 = addElement("md-filled-button", null, null);
  var btn23 = addElement("md-filled-tonal-button", null, null);
  btn22.style.height = btn23.style.height = "50px";
  btn22.style.flexBasis = btn23.style.flexBasis = "100%";
  addElement("div", newElement, "break");
  addElement("div", newElement, "break");
  btn22.innerHTML = "Zmaga";
  btn23.innerHTML = "Poraz";
  addElement("div", newElement, "break");
  var bonusi = {
    /* "Ime igre": ["Koliko šteje igra","razlika","dobil true, ni dobil false", "s partnerjem, brez"]*/
    Trula: [10, 20, null, null, false],
    Kralji: [10, 20, null, null, false],
    "Pagat ultimo": [25, 50, null, null, false],
    "Kralj ultimo": [10, 20, null, null, false],
  };
  var bonusTocke = 0;
  if (!teamWork) {
    slct2 = "partnerigralcakimuniimenic";
    if (!properties[1]) {
      slct2 = "partnerigralcakimuniimenic";
      let ttl =
        "Oseba " +
        firstPlayer +
        " je igrala igro " +
        gameName.toLowerCase() +
        ".";
      if (listOfPlayers[firstPlayer][1] == "Z") {
        ttl = firstPlayer + " je igrala igro " + gameName.toLowerCase() + ".";
      } else if (listOfPlayers[firstPlayer][1] == "M") {
        ttl = firstPlayer + " je igral igro " + gameName.toLowerCase() + ".";
      }
      changeOpis(newElement, ttl);
    } else {
      let ttl =
        "Oseba " +
        firstPlayer +
        " je igrala igro " +
        gameName.toLowerCase() +
        ", z razliko " +
        razlika +
        ".";
      if (listOfPlayers[firstPlayer][1] == "Z") {
        ttl =
          firstPlayer +
          " je igrala igro " +
          gameName.toLowerCase() +
          ", z razliko " +
          razlika +
          ".";
      } else if (listOfPlayers[firstPlayer][1] == "M") {
        ttl =
          firstPlayer +
          " je igral igro " +
          gameName.toLowerCase() +
          ", z razliko " +
          razlika +
          ".";
      }
      changeOpis(newElement, ttl);
    }
  } else {
    if (!properties[1]) {
      let ttl =
        "Osebi " +
        firstPlayer +
        " in " +
        slct2 +
        " sta igrali igro " +
        gameName.toLowerCase() +
        ".";
      if (
        listOfPlayers[firstPlayer][1] == "Z" &&
        listOfPlayers[slct2][1] == "Z"
      ) {
        ttl =
          firstPlayer +
          " in " +
          slct2 +
          " sta igrali igro " +
          gameName.toLowerCase() +
          ".";
      } else if (
        listOfPlayers[firstPlayer][1] !== "N" &&
        listOfPlayers[slct2][1] !== "N"
      ) {
        ttl =
          firstPlayer +
          " in " +
          slct2 +
          " sta igrala igro " +
          gameName.toLowerCase() +
          ".";
      }
      changeOpis(newElement, ttl);
    } else {
      let ttl =
        "Osebi " +
        firstPlayer +
        " in " +
        slct2 +
        " sta igrali igro " +
        gameName.toLowerCase() +
        " z razliko " +
        razlika +
        ".";
      if (
        listOfPlayers[firstPlayer][1] == "Z" &&
        listOfPlayers[slct2][1] == "Z"
      ) {
        ttl =
          firstPlayer +
          " in " +
          slct2 +
          " sta igrali igro " +
          gameName.toLowerCase() +
          " z razliko " +
          razlika +
          ".";
      } else if (
        listOfPlayers[firstPlayer][1] !== "N" &&
        listOfPlayers[slct2][1] !== "N"
      ) {
        ttl =
          firstPlayer +
          " in " +
          slct2 +
          " sta igrala igro " +
          gameName.toLowerCase() +
          " z razliko " +
          razlika +
          ".";
      }
      changeOpis(newElement, ttl);
    }
  }

  if (properties[1]) {
    for (const key in bonusi) {
      let btn = document.createElement("md-outlined-button");
      btn.innerHTML = key;
      btn.style.transition = " all .2s";
      btn.style.height = "45px";

      btn.addEventListener("click", function () {
        var save = $(newElement).children().detach();
        let opis =
          newElement.parentNode.parentNode.querySelector(
            ".bottomSheetTitle"
          ).innerText;
        newElement.innerHTML = "";
        var bonusDialog = newElement;
        changeOpis(newElement, "Izberite ");
        $(".iksRight").hide();
        var napovedanboolean = true;
        var dobil = true;
        let sgset = addElement(
          "md-outlined-segmented-button-set",
          bonusDialog,
          null
        );
        let ninapoved = addElement("md-outlined-segmented-button", sgset, null);
        ninapoved.setAttribute("type", "reset");
        let sgset2 = addElement(
          "md-outlined-segmented-button-set",
          bonusDialog,
          null
        );
        let izgubil = addElement("md-outlined-segmented-button", sgset2, null);
        izgubil.label = "Izgubljeno";
        izgubil.addEventListener("click", function () {
          dobil = false;
        });

        let zmagal = addElement("md-outlined-segmented-button", sgset2, null);
        zmagal.label = "Dobljeno";
        zmagal.addEventListener("click", function () {
          dobil = true;
        });
        let napovedano = addElement(
          "md-outlined-segmented-button",
          sgset,
          null
        );
        if (bonusi[key][3]) napovedano.selected = true;
        if (bonusi[key][3] == false) ninapoved.selected = true;
        addElement("div", bonusDialog, "break").style.height = "10px";
        let deleteBonus = addElement("md-text-button", bonusDialog, null);
        deleteBonus.innerHTML = "Odstrani bonus";
        deleteBonus.setAttribute("type", "reset");
        btn.innerHTML = key;
        deleteBonus.addEventListener("click", function () {
          bonusi[key][2] = null;
          bonusi[key][3] = null;
          bonusi[key][4] = false;
          btn.innerHTML = key;

          $(".iksRight").show();
          $(newElement).empty().append(save);
          changeOpis(newElement, opis);
        });
        let koncaj = addElement("md-filled-tonal-button", bonusDialog, null);
        koncaj.innerHTML = "Končano";
        koncaj.setAttribute("type", "reset");

        napovedano.label = "Napovedano";
        napovedano.setAttribute("type", "reset");
        ninapoved.addEventListener("click", function () {
          napovedanboolean = false;
        });
        napovedano.addEventListener("click", function () {
          napovedanboolean = true;
        });
        ninapoved.label = "Tiho";
        addElement("div", bonusDialog, "break").style.height = "20px";

        if (bonusi[key][2]) zmagal.selected = true;
        if (bonusi[key][2] == false) izgubil.selected = true;
        koncaj.addEventListener("click", function () {
          if (napovedanboolean) {
            bonusi[key][3] = true;
            btn.innerHTML += '<md-icon slot="icon">checkbox</md-icon>';
          } else {
            bonusi[key][3] = false;
            btn.innerHTML += '<md-icon slot="icon">close</md-icon>';
          }
          if (dobil) {
            bonusi[key][2] = true;
            btn.innerHTML += '<md-icon slot="icon">checkbox</md-icon>';
          } else {
            bonusi[key][2] = false;
            btn.innerHTML += '<md-icon slot="icon">close</md-icon>';
          }
          $(".iksRight").show();
          $(newElement).empty().append(save);
          changeOpis(newElement, opis);
         
        });
      });
      newElement.appendChild(btn);
    }
  }
  addElement("md-divider", newElement, null).style.margin = "5px";
  let kontra = addElement("md-outlined-button", newElement, null);
  kontra.innerHTML = "Kontra";
  let rekontra = addElement("md-outlined-button", newElement, null);
  rekontra.innerHTML = "Rekontra";

  var IgraK = false;
  var KraljiK = false;
  var TrulaK = false;
  var KUltK = false;
  var PUltK = false;
  var IgraK2 = false;
  var KraljiK2 = false;
  var TrulaK2 = false;
  var KUltK2 = false;
  var PUltK2 = false;
  var RekontraIf = false;

  rekontra.addEventListener("click", function () {
    var save = $(newElement).children().detach();

    let opis =
      newElement.parentNode.parentNode.querySelector(
        ".bottomSheetTitle"
      ).innerText;
    newElement.innerHTML = "";
    RekontraIf = true;
    //var contentWh = dialogBuilder("Izberite", false);
    var kontraDialog = newElement;
    changeOpis(newElement, "Izberite");
    $(".iksRight").hide();

    var sgset = addElement(
      "md-outlined-segmented-button-set",
      kontraDialog,
      null
    );
    sgset.setAttribute("multiselect", "");

    let btn2 = addElement("md-outlined-segmented-button", sgset, null);
    btn2.label += "Igra " + gameName.toLowerCase();
    btn2.addEventListener("click", function () {
      if (btn2.selected) {
        IgraK2 = true;
      } else {
        IgraK2 = false;
      }
    });
    addElement("div", kontraDialog, "break").style.height = "20px";
    let koncaj = addElement("md-text-button", kontraDialog, null);
    koncaj.innerHTML = "Končano";
    koncaj.addEventListener("click", function (e) {
      $(".iksRight").show();
      $(newElement).empty().append(save);
      changeOpis(newElement, opis);
    });
    if (bonusi["Kralji"][3]) {
      let btn = addElement("md-outlined-segmented-button", sgset, null);
      btn.label += "Kralji";
      btn.addEventListener("click", function () {
        if (btn.selected) {
          KraljiK2 = true;
        } else {
          KraljiK2 = false;
        }
      });
    }
    if (bonusi["Trula"][3]) {
      let btn = addElement("md-outlined-segmented-button", sgset, null);
      btn.label += "Trula";
      btn.addEventListener("click", function () {
        if (btn.selected) {
          TrulaK2 = true;
        } else {
          TrulaK2 = false;
        }
      });
    }
    if (bonusi["Kralj ultimo"][3]) {
      let btn = addElement("md-outlined-segmented-button", sgset, null);
      btn.label += "Kralj ultimo";
      btn.addEventListener("click", function () {
        if (btn.selected) {
          KUltK2 = true;
        } else {
          KUltK2 = false;
        }
      });
    }
    if (bonusi["Pagat ultimo"][3]) {
      let btn = addElement("md-outlined-segmented-button", sgset, null);
      btn.label += "Pagat ultimo";
      btn.addEventListener("click", function () {
        if (btn.selected) {
          PUltK2 = true;
        } else {
          PUltK2 = false;
        }
      });
    }
  });
  kontra.addEventListener("click", function () {
    var save = $(newElement).children().detach();
    let opis =
      newElement.parentNode.parentNode.querySelector(
        ".bottomSheetTitle"
      ).innerText;
    newElement.innerHTML = "";
    var kontraDialog = newElement;
    changeOpis(newElement, "Izberite");
    $(".iksRight").hide();

    var sgset = addElement(
      "md-outlined-segmented-button-set",
      kontraDialog,
      null
    );
    sgset.setAttribute("multiselect", "");

    let btn2 = addElement("md-outlined-segmented-button", sgset, null);
    btn2.label += "Igra " + gameName.toLowerCase();
    btn2.addEventListener("click", function () {
      if (btn2.selected) {
        IgraK = true;
      } else {
        IgraK = false;
      }
    });
    addElement("div", kontraDialog, "break").style.height = "20px";

    let koncaj = addElement("md-text-button", kontraDialog, null);
    koncaj.innerHTML = "Končano";
    koncaj.addEventListener("click", function (e) {
      $(".iksRight").show();
      $(newElement).empty().append(save);
      changeOpis(newElement, opis);
    });
    if (bonusi["Kralji"][3]) {
      let btn = addElement("md-outlined-segmented-button", sgset, null);
      btn.label += "Kralji";
      btn.addEventListener("click", function () {
        if (btn.selected) {
          KraljiK = true;
        } else {
          KraljiK = false;
        }
      });
    }
    if (bonusi["Trula"][3]) {
      let btn = addElement("md-outlined-segmented-button", sgset, null);
      btn.label += "Trula";
      btn.addEventListener("click", function () {
        if (btn.selected) {
          TrulaK = true;
        } else {
          TrulaK = false;
        }
      });
    }
    if (bonusi["Kralj ultimo"][3]) {
      let btn = addElement("md-outlined-segmented-button", sgset, null);
      btn.label += "Kralj ultimo";
      btn.addEventListener("click", function () {
        if (btn.selected) {
          KUltK = true;
        } else {
          KUltK = false;
        }
      });
    }
    if (bonusi["Pagat ultimo"][3]) {
      let btn = addElement("md-outlined-segmented-button", sgset, null);
      btn.label += "Pagat ultimo";
      btn.addEventListener("click", function () {
        if (btn.selected) {
          PUltK = true;
        } else {
          PUltK = false;
        }
      });
    }
  });
  addElement("md-divider", newElement, null).style.margin = "5px";
  //addElement("div", newElement, "break");
  newElement.appendChild(btn23);
  newElement.appendChild(btn22);
  razlika = Math.abs(razlika);
  btn22.addEventListener("click", function () {
    let bnsi = {}; /*  "ime bonus": [tocke, napovedan, doblen]  */

    if (KraljiK) bonusi["Kralji"][1] *= 2;
    if (TrulaK) bonusi["Trula"][1] *= 2;
    if (KUltK) bonusi["Kralj ultimo"][1] *= 2;
    if (PUltK) bonusi["Pagat ultimo"][1] *= 2;
    if (KraljiK2) bonusi["Kralji"][1] *= 4;
    if (TrulaK2) bonusi["Trula"][1] *= 4;
    if (KUltK2) bonusi["Kralj ultimo"][1] *= 4;
    if (PUltK2) bonusi["Pagat ultimo"][1] *= 4;
    let kontre = {
      Kralji: KraljiK,
      Trula: TrulaK,
      "Pagat ultimo": PUltK,
      "Kralj ultimo": KUltK,
      Kralji2: KraljiK2,
      Trula2: TrulaK2,
      "Pagat ultimo2": PUltK2,
      "Kralj ultimo2": KUltK2,
    };
    for (const key in bonusi) {
      if (bonusi[key][2] !== null) {
        if (bonusi[key][2] !== false) {
          if (bonusi[key][3] == true) {
            bnsi[key] = [
              bonusi[key][1],
              true,
              true,
              kontre[key],
              kontre[key + "2"],
            ];
            bonusTocke += bonusi[key][1];
          } else {
            bnsi[key] = [
              bonusi[key][0],
              false,
              true,
              kontre[key],
              kontre[key + "2"],
            ];
            bonusTocke += bonusi[key][0];
          }
        } else {
          if (bonusi[key][3] == true) {
            (bnsi[key] = [-Math.abs(bonusi[key][1]), true, false]),
              kontre[key],
              kontre[key + "2"];
            bonusTocke -= bonusi[key][1];
          } else {
            bnsi[key] = [
              -Math.abs(bonusi[key][0]),
              false,
              false,
              kontre[key],
              kontre[key + "2"],
            ];
            bonusTocke -= bonusi[key][0];
          }
        }
      }
    }
    listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
    if (!navigator.onLine) {
      localStorage.offlineChanges = true;
    }
    if (Object.keys(bnsi).length === 0) bnsi = null;
    if (slct2 !== "" || teamWork) {
      if (properties[1]) {
        if (teamWork) {
          listOfPlayers["!gamesData!"].push([
            String(gameName),
            [firstPlayer, slct2],
            null,
            parseInt(properties[0]) + parseInt(razlika) + bonusTocke,
            listOfPlayers[firstPlayer][0].length > 0,
            parseInt(razlika),
            true,
            bnsi,
            bonusTocke,
            false,
            false,
            Date.now(),
          ]);
        } else {
          listOfPlayers["!gamesData!"].push([
            String(gameName),
            firstPlayer,
            null,
            parseInt(properties[0]) + parseInt(razlika) + bonusTocke,
            listOfPlayers[firstPlayer][0].length > 0,
            parseInt(razlika),
            true,
            bnsi,
            bonusTocke,
            false,
            false,
            Date.now(),
          ]);
        }
      } else {
        if (teamWork) {
          listOfPlayers["!gamesData!"].push([
            String(gameName),
            [firstPlayer, slct2],
            null,
            parseInt(properties[0] + bonusTocke),
            listOfPlayers[firstPlayer][0].length > 0,
            null,
            true,
            bnsi,
            bonusTocke,
            false,
            false,
            Date.now(),
          ]);
        } else {
          listOfPlayers["!gamesData!"].push([
            String(gameName),
            firstPlayer,
            null,
            parseInt(properties[0] + bonusTocke),
            listOfPlayers[firstPlayer][0].length > 0,
            null,
            true,
            bnsi,
            bonusTocke,
            false,
            false,
            Date.now(),
          ]);
        }
      }
    }

    if (
      listOfPlayers["!gamesData!"].slice(-1)[0][3] > 0 &&
      listOfPlayers[firstPlayer][0].length > 0
    ) {
      listOfPlayers[firstPlayer][0] = listOfPlayers[firstPlayer][0].replace(
        "*",
        ""
      );
    }
    if (IgraK) listOfPlayers["!gamesData!"].at(-1)[9] = true;
    if (IgraK2) listOfPlayers["!gamesData!"].at(-1)[10] = true;

    document.querySelector(".bottomSheetScrim").click();

    if (gameName.includes("Valat") || gameName.includes("Berač")) {
      radlciDodajSamo();
    }

    gameAnimation()
    setTimeout(() => {
      count(false, true);
    }, 200);
  });

  btn23.addEventListener("click", function () {
    let bnsi = {}; /*  "ime bonus": [tocke, napovedan, doblen]  */

    if (KraljiK) bonusi["Kralji"][1] *= 2;
    if (TrulaK) bonusi["Trula"][1] *= 2;
    if (KUltK) bonusi["Kralj ultimo"][1] *= 2;
    if (PUltK) bonusi["Pagat ultimo"][1] *= 2;
    if (KraljiK2) bonusi["Kralji"][1] *= 4;
    if (TrulaK2) bonusi["Trula"][1] *= 4;
    if (KUltK2) bonusi["Kralj ultimo"][1] *= 4;
    if (PUltK2) bonusi["Pagat ultimo"][1] *= 4;
    let kontre = {
      Kralji: KraljiK,
      Trula: TrulaK,
      "Pagat ultimo": PUltK,
      "Kralj ultimo": KUltK,
      Kralji2: KraljiK2,
      Trula2: TrulaK2,
      "Pagat ultimo2": PUltK2,
      "Kralj ultimo2": KUltK2,
    };
    for (const key in bonusi) {
      if (bonusi[key][2] !== null) {
        if (bonusi[key][2] !== false) {
          if (bonusi[key][3] == true) {
            bnsi[key] = [
              bonusi[key][1],
              true,
              true,
              kontre[key],
              kontre[key + "2"],
            ];
            bonusTocke += bonusi[key][1];
          } else {
            bnsi[key] = [
              bonusi[key][0],
              false,
              true,
              kontre[key],
              kontre[key + "2"],
            ];
            bonusTocke += bonusi[key][0];
          }
        } else {
          if (bonusi[key][3] == true) {
            (bnsi[key] = [-Math.abs(bonusi[key][1]), true, false]),
              kontre[key],
              kontre[key + "2"];
            bonusTocke -= bonusi[key][1];
          } else {
            bnsi[key] = [
              -Math.abs(bonusi[key][0]),
              false,
              false,
              kontre[key],
              kontre[key + "2"],
            ];
            bonusTocke -= bonusi[key][0];
          }
        }
      }
    }
    listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
    if (!navigator.onLine) {
      localStorage.offlineChanges = true;
    }
    if (Object.keys(bnsi).length === 0) bnsi = null;
    if (properties[1]) {
      if (teamWork) {
        listOfPlayers["!gamesData!"].push([
          String(gameName),
          [firstPlayer, slct2],
          null,
          -Math.abs(parseInt(properties[0]) + parseInt(razlika)) + bonusTocke,
          listOfPlayers[firstPlayer][0].length > 0,
          parseInt(razlika),
          false,
          bnsi,
          bonusTocke,
          false,
          false,
          Date.now(),
        ]);
      } else {
        listOfPlayers["!gamesData!"].push([
          String(gameName),
          firstPlayer,
          null,
          -Math.abs(parseInt(properties[0]) + parseInt(razlika)) + bonusTocke,
          listOfPlayers[firstPlayer][0].length > 0,
          parseInt(razlika),
          false,
          bnsi,
          bonusTocke,
          false,
          false,
          Date.now(),
        ]);
      }
    } else {
      if (teamWork) {
        listOfPlayers["!gamesData!"].push([
          String(gameName),
          [firstPlayer, slct2],
          null,
          -Math.abs(parseInt(properties[0])) + bonusTocke,
          listOfPlayers[firstPlayer][0].length > 0,
          null,
          false,
          bnsi,
          bonusTocke,
          false,
          false,
          Date.now(),
        ]);
      } else {
        listOfPlayers["!gamesData!"].push([
          String(gameName),
          firstPlayer,
          null,
          -Math.abs(parseInt(properties[0])) + bonusTocke,
          listOfPlayers[firstPlayer][0].length > 0,
          null,
          false,
          bnsi,
          bonusTocke,
          false,
          false,
          Date.now(),
        ]);
      }
    }

    if (
      listOfPlayers["!gamesData!"].slice(-1)[0][3] > 0 &&
      listOfPlayers[firstPlayer][0].length > 0
    ) {
      listOfPlayers[firstPlayer][0] = listOfPlayers[firstPlayer][0].replace(
        "*",
        ""
      );
    }
    if (IgraK) listOfPlayers["!gamesData!"].at(-1)[9] = true;
    if (IgraK2) listOfPlayers["!gamesData!"].at(-1)[10] = true;

    document.querySelector(".bottomSheetScrim").click();

    if (gameName.includes("Valat") || gameName.includes("Berač")) {
      radlciDodajSamo();
    }
    gameAnimation()
    setTimeout(() => {
      count(false, true);
    }, 200);
  });
}

function gameAnimation() {
  let score = listOfPlayers["!gamesData!"].at(-1)[3]
  if (listOfPlayers["!gamesData!"].at(-1)[9]) {
   score =((games[listOfPlayers["!gamesData!"].at(-1)[0]][0]+listOfPlayers["!gamesData!"].at(-1)[5]) * 2)+listOfPlayers["!gamesData!"].at(-1)[8]
  }
  if (listOfPlayers["!gamesData!"].at(-1)[10]) {
    score =((games[listOfPlayers["!gamesData!"].at(-1)[0]][0]+listOfPlayers["!gamesData!"].at(-1)[5]) * 4)+listOfPlayers["!gamesData!"].at(-1)[8]
  }
  if (listOfPlayers["!gamesData!"].at(-1)[4]) {
   score = score*2
    }
  let scrim = addElement("div", document.body, "bottomSheetScrim");
  let holder = addElement("div", document.body, "bottomSheetScrim");
  holder.classList.add("scoreAnimHolder");
  let scoreAnimation = addElement("div", holder, "scoreAnimation");
  let scoreTxt = addElement("span", holder, "scoreTxt");
  scoreAnimation.style.width = ((score > 0 ? "+" : "") + score).length + "ch";
  setTimeout(() => {
    scrim.style.opacity = ".5";
    scoreAnimation.style.scale = "1";
    scoreTxt.style.fontSize = "4rem";
  }, 200);
  scoreTxt.innerHTML = (score > 0 ? "+" : "") + score;
  setTimeout(() => {
    setTimeout(() => {
      scoreTxt.style.maxWidth = ((score > 0 ? "+" : "") + score).length + "ch";
    }, 200);
    const emojis =score > 0 ? ["😂", "🤣", "😁", "😀", "😎", "😆", "😅", "😃"] : ['😒','😥','😣','😫','😖','🤬','😭','😧'];
    for (let i = 0; i < 20; i++) {
      let emoji = addElement("span", holder, "emoji");
      emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.animationDelay = `.${i}s`;
      emoji.style.left = i * 5 + "vw";
      emoji.style.fontSize = getRandomNumber(1, 2) + "rem";

      emoji.style.setProperty(
        "--initial-bottom",
        getRandomNumber(-10, -47) + "vh"
      );
    }
  }, 600);
  setTimeout(() => {
    scoreAnimation.style.scale = "0";
    scoreTxt.style.fontSize = "0rem";
    scoreTxt.style.transition = "all .4s";
    scrim.style.opacity = "0";
    setTimeout(() => {
      holder.remove();
      scrim.remove();
    }, 1000);
  }, 3000);
}
function getRandomNumber(min, max, nofloor = false) {
  return nofloor
    ? Math.random() * (max - min + 1) + min
    : Math.floor(Math.random() * (max - min + 1)) + min;
}
function download() {
  var text = JSON.stringify(listOfPlayers);
  // if (sessionStorage.uid !== null && sessionStorage.uid !== undefined && sessionStorage.uid !== 'null') {
  var result =
    "https://stevec-taroka.si/" +
    encodeURIComponent(
      "users/" + sessionStorage.uid + "/games/" + listOfPlayers["!gameName!"]
    );

  console.log(result);

  try {
    if (navigator.userAgent.includes("wv")) {
      Android.share(result);
    } else {
      if (navigator.share) {
        navigator
          .share({
            title: "Tarok igra",
            text: "Vabim te, da se pridružiš moji tarok skupini.",
            url: result,
          })
          .then(() => console.log("Success sharing"))
          .catch((error) => console.log("Error sharing", error));
      }
    }
  } catch (error) {}
}

function deleteAllData() {
  var contentWh = dialogBuilder(
    "Ali res želite izbrisati vse svoje podatke? Tega dejanja ni mogoče razveljaviti.",
    false
  );
  var newElement = contentWh[0];
  var iks = contentWh[1];

  let iconaa = addElement("md-icon", newElement.parentNode, null);
  iconaa.innerHTML = "delete_outline";
  iconaa.setAttribute("slot", "icon");
  iks.addEventListener("click", function (e) {
    hideDialog(newElement);
  });
  let actions = document.createElement("div");
  actions.setAttribute("slot", "actions");
  newElement.parentNode.appendChild(actions);
  var shareButton = document.createElement("md-text-button");
  shareButton.innerHTML = "Da";
  var copyButton = document.createElement("md-filled-tonal-button");
  copyButton.innerHTML = "Ne";

  actions.appendChild(shareButton);
  actions.appendChild(copyButton);
  shareButton.addEventListener("click", async function () {
    await deleteAllDataF();
    location.reload()
    hideDialog(newElement);
  });
  copyButton.addEventListener("click", function () {
    hideDialog(newElement);
  });
}

async function upload() {
  if (
    sessionStorage.uid !== null &&
    sessionStorage.uid !== undefined &&
    sessionStorage.uid !== "null" &&
    navigator.onLine
  ) {
    try {
      var text = decodeURIComponent(location.pathname.slice(1));
      var gameContent = await loadDataPath(text);
      if (text.includes(sessionStorage.uid)) {
        dlgNotif("Ta skupina je vaša.");
        window.history.replaceState({}, document.title, "/" + "");
      } else {
        // window.location.href = location.host

        var contentWh = dialogBuilder(
          "Ali se želite pridružiti skupini '" +
            gameContent["!gameName!"] +
            "' z igralci " +
            JSON.stringify(
              Object.keys(gameContent).filter(
                (key) => key !== "!gamesData!" && key !== "!gameName!"
              )
            )
              .replace(/"/g, "")
              .replace("[", "")
              .replace("]", "")
              .replace(/,/g, ", ") +
            "?"
        );
        var newElement = contentWh[0];
        var iks = contentWh[1];
        gameContent["!gameName!"] = text;
        window.history.replaceState({}, document.title, "/" + "");

        iks.addEventListener("click", function (e) {
          hideDialog(newElement);
        });
        let actions = document.createElement("div");
        actions.setAttribute("slot", "actions");
        newElement.parentNode.appendChild(actions);
        var shareButton = document.createElement("md-filled-tonal-button");
        shareButton.innerHTML = "Da";
        var copyButton = document.createElement("md-text-button");
        copyButton.innerHTML = "Ne";
        actions.appendChild(copyButton);
        actions.appendChild(shareButton);
        shareButton.addEventListener("click", function () {
          const gamesObject = JSON.parse(localStorage.getItem("games")) || {};
          gamesObject["/" + gameContent["!gameName!"]] = gameContent;
          localStorage.setItem("games", JSON.stringify(gamesObject));
          updateUserData();
          hideDialog(newElement);
          Game()
        });
        copyButton.addEventListener("click", function () {
          hideDialog(newElement);
        });
      }
    } catch (error) {
      console.log("Not right link");
    }
  } else {
    if (!location.pathname.includes("public")) {
      dlgNotif(
        "Za dostop do deljene skupine morate biti prijavljeni in imeti internetno povezavo."
      );
    }
  }
}

function hideElement(newElement) {
  newElement.style.animation = "hideScreen .2s forwards";

  setTimeout(() => {
    newElement.remove();
  }, 200);
}

function changeOpis(dlg, desc) {
  if (dlg.className == "mainSheet") {
    dlg.parentNode.parentNode.querySelector("p").innerHTML = desc;
  } else {
    dlg.parentNode
      .querySelector('[slot="headline"]')
      .getElementsByTagName("span")[0].innerHTML = desc;
  }
}

/**
 * Function displays text within an element on which is called
 * @param {HTMLElement} xButt - button elem
 * @param {string} desc - desctription of set element
 * @returns {HTMLElement} HTML elem of x buttom
 */
function dialogBuilder(desc, iksa) {
  var newElement = document.createElement("md-dialog");
  newElement.setAttribute("open", "");
  if (newElement.getOpenAnimation) {
    if (queryAnim) {
      noDialogAnimations(newElement);
    } else {
      dialogAnimations(newElement);
    }
  }
  var xHolder = addElement("span", newElement, null);
  xHolder.setAttribute("slot", "headline");
  xHolder.setAttribute("class", "dialog-headline");
  xHolder.innerHTML = '<span style="flex: .83;">' + desc + "</span>";
  var iks = document.createElement("md-icon-button");

  if (iksa !== false) {
    iks.setAttribute("value", "close");
    iks.classList.add("iksRight");
    iks.innerHTML =
      '<md-icon>close</md-icon><md-ripple for="touch" class="unbounded"></md-ripple>';
    xHolder.appendChild(iks);
    var help = addElement("md-icon-button", xHolder, "iksRight");
    help.innerHTML = "<md-icon>help</md-icon>";
    help.style.right = "50px";
    help.addEventListener("click", function () {
      helpMe(newElement);
    });
  }
  var content = addElement("div", newElement, null);
  content.setAttribute(
    "style",
    "display: flex;flex-wrap: wrap;justify-content: center;"
  );
  content.setAttribute("slot", "content");
  newElement.addEventListener("cancel", function () {
    hideDialog(content);
  });
  document.body.appendChild(newElement);
  setTimeout(() => {
    try {
      document
        .querySelector("body > md-dialog")
        .shadowRoot.querySelector(".scrim").style.zIndex = "3";
    } catch {}
  }, 3);
  content.setAttribute("method", "dialog");
  return [content, iks];
}

function Game(already) {
  if (already) {
    clickedUser(already.toString(), already.toString());
  } else {
    //var dialog = makeBottomheet("Izberite skupino");
    var dialog = document.getElementById("dlgSlct");
    dialog.innerHTML = "";

    var slct = document.createElement("md-list");
    var slct2 = document.createElement("md-list");
    slct2.style.marginBottom = "30px";

    const gamesObject = JSON.parse(localStorage.getItem("games")) || {};
    if (Object.keys(gamesObject).length == 0) {
      var pTxt22 = document.createElement("p");
      pTxt22.innerHTML = "Nimate še nobenih skupin.";
      dialog.appendChild(pTxt22);
    } else {
      for (var i = 0; i < Object.keys(gamesObject).length; i++) {
        let user = Object.keys(gamesObject)[i];
        let full = user;

        if (user.includes("/users/")) {
          user = user.slice(user.lastIndexOf("/") + 1);
          if (user !== "!gamesData!" || user !== "!gameName!") {
            var listItem = addElement("md-list-item", null, null);

            listItem.setAttribute("type", "button");
            listItem.setAttribute("interactive", "");
            if (slct2.getElementsByTagName("md-list-item").length > 0) {
              let divider = addElement("md-divider", slct2, null);
              divider.setAttribute(
                "style",
                "height:5px;--md-divider-color: var(--md-sys-color-surface)"
              );
            }
            listItem.innerHTML += user;
            listItem.addEventListener("click", async function () {
              await clickedUser(user, full);
              /*document.querySelector(".mainSheet").style.opacity = "0";
             
              document.querySelector(".bottomSheetScrim").style.opacity = "0";
              document.querySelector(".handleHolder").style.opacity = "0";
             
              document.querySelector(".bottomSheet").style.transition = "none";
              addElement( "div",  document.querySelector(".mainSheet"),      "makAnmFrSht"    );
              
              setTimeout(() => {
                document.querySelector(".bottomSheetScrim").remove();
                document.querySelector(".bottomSheet").style.zIndex = "0";
              }, 50);

              setTimeout(() => {
                document.querySelector(".bottomSheet").style.transition =
                  "all var(--transDur)";
                document.querySelector(".bottomSheet").style.opacity = "0";
              }, 100);
              setTimeout(() => {
                document.querySelector(".bottomSheet").remove();
              }, 400);
              */
            });
            let Btn = addElement("md-icon-button", listItem, null);
            Btn.setAttribute("slot", "end");
            Btn.innerHTML = "<md-icon >close</md-icon>";
            Btn.addEventListener("click", async function () {
              event.stopPropagation();
              listOfPlayers = await loadDataPath(full);
              listOfPlayers["!gameName!"] = full;

              //document.querySelector(".bottomSheetScrim").click();
              deleteGame();
            });
            slct2.appendChild(listItem);
          }
        } else {
          if (user !== "!gamesData!" || user !== "!gameName!") {
            var listItem = addElement("md-list-item", null, null);

            listItem.setAttribute("type", "button");
            listItem.setAttribute("interactive", "");
            if (slct.getElementsByTagName("md-list-item").length > 0) {
              let divider = addElement("md-divider", slct, null);
              divider.setAttribute(
                "style",
                "height:5px;--md-divider-color: var(--md-sys-color-surface)"
              );
            }
            listItem.innerHTML += user;
            listItem.addEventListener("click", async function () {
              await clickedUser(user, full);
              /* document.querySelector(".mainSheet").style.opacity = "0";
             
              document.querySelector(".bottomSheetScrim").style.opacity = "0";
              document.querySelector(".handleHolder").style.opacity = "0";
              
              document.querySelector(".bottomSheet").style.transition = "none";
              addElement(
                "div",
                document.querySelector(".mainSheet"),
                "makAnmFrSht"
              );
             
              setTimeout(() => {
                document.querySelector(".bottomSheetScrim").remove();
                document.querySelector(".bottomSheet").style.zIndex = "0";
              }, 50);

              setTimeout(() => {
                document.querySelector(".bottomSheet").style.transition =
                  "all var(--transDur)";
                document.querySelector(".bottomSheet").style.opacity = "0";
              }, 100);
              setTimeout(() => {
                document.querySelector(".bottomSheet").remove();
                document
                
              }, 400);*/
            });
            let Btn = addElement("md-icon-button", listItem, null);
            Btn.setAttribute("slot", "end");
            Btn.innerHTML = "<md-icon >delete</md-icon>";
            Btn.addEventListener("click", function () {
              event.stopPropagation();
              listOfPlayers = JSON.parse(localStorage.games)[full.toString()];
              //document.querySelector(".bottomSheetScrim").click();
              deleteGame();
            });
            slct.appendChild(listItem);
          }
        }
      }

      var pTxt = document.createElement("p");
      var pTxt2 = document.createElement("p");
      if (slct.getElementsByTagName("md-list-item").length !== 0) {
        pTxt2.innerHTML = "Moje skupine";
        dialog.appendChild(pTxt2);
        dialog.appendChild(slct);
      }

      if (slct2.getElementsByTagName("md-list-item").length !== 0) {
        pTxt.innerHTML = "Deljene skupine";
        dialog.appendChild(pTxt);
        dialog.appendChild(slct2);
      }
    }

    dialog.style.setProperty("--wipe-position", "100%");
    dialog.style.transform = "translateY(0px)";
  }
}

function hideDialog(dlg) {
  dlg.parentNode.close();
  if (queryAnim) {
    dlg.parentNode.remove();
  } else {
    setTimeout(() => {
      dlg.parentNode.remove();
    }, 150);
  }
}

async function clickedUser(slcta, fulla) {
  let full = decodeURIComponent(fulla);
  if (slcta !== full) {
    if (navigator.onLine) {
      try {
        listOfPlayers = await loadDataPath(full);
        listOfPlayers["!gameName!"] = full;
      } catch {
        dlgNotif("Zgodila se je napaka. Skupina je bila verjetno izbrisana.");

        const gamesObject = JSON.parse(localStorage.getItem("games")) || {};
        delete gamesObject[full];
        localStorage.setItem("games", JSON.stringify(gamesObject));
        updateUserData();
      }
    } else {
      dlgNotif(
        "Brez internetne povezave ne morete dostopati do deljene skupine."
      );
    }
  } else {
    const gamesObject2 = JSON.parse(localStorage.getItem("games")) || {};
    listOfPlayers = gamesObject2[slcta];
  }

  if (listOfPlayers !== undefined) {
    if (!listOfPlayers["!gamesData!"]) {
      listOfPlayers["!gamesData!"] = [];
    }
    getGenders();
    if (listOfPlayers["!gameName!"].includes("/users/")) {
      updateSharedRemote();
      window.history.pushState({}, document.title, "/" + slcta);
      count(true);
    } else {
      window.history.pushState({}, document.title, "/"+ slcta);
      count(true);
    }
  }

}
function dlgNotif(msg, title = "Napaka") {
  var iks = addElement("md-text-button", null, null);

  iks.innerHTML = "Ok";

  var content = dialogBuilder(title, false)[0];
  iks.addEventListener("click", function (e) {
    hideDialog(content);
  });
  let actions = document.createElement("div");
  actions.setAttribute("slot", "actions");
  content.parentNode.appendChild(actions);
  actions.appendChild(iks);
  content.innerHTML = msg;
}

function undo() {
  if (listOfPlayersCopy.length > 0) {
    listOfPlayers = JSON.parse(listOfPlayersCopy[listOfPlayersCopy.length - 1]);
    listOfPlayersCopy.pop();

    count(true);
  }

  if (listOfPlayersCopy.length == 0) {
    document.querySelector(".undoBtn").disabled = true;
  }
}

var listOfPlayers = {};
var listOfPlayersCopy = [];

function newGame() {
  var content = makeBottomheet("Vpišite člane");

  listOfPlayers = {};
  let index = 1;
  var onePl = document.createElement("md-outlined-text-field");
  var newPl = document.createElement("md-text-button");
  var endPl = document.createElement("md-filled-tonal-button");
  newPl.setAttribute("id", "addPlayer");
  newPl.setAttribute("slot", "content");

  newPl.style.margin = endPl.style.margin = "0";
  newPl.innerHTML = "Dodaj igralca";
  onePl.style.marginBottom = "10px";
  onePl.label = "Ime";
  onePl.style.borderRadius = "4px";
  onePl.setAttribute("slot", "content");
  endPl.innerHTML = "Naprej";
  content.appendChild(onePl);
  setTimeout(() => {
    onePl.shadowRoot.querySelector(".field").setAttribute("focused", "");
    onePl.focus()
  }, 10);
  let lnbrk = addElement("div", content, "break");
  lnbrk.style.height = "10px";

  content.appendChild(newPl);
  content.appendChild(endPl);

  newPl.addEventListener("click", function () {
    let onePl2 = addElement("md-outlined-text-field", content, null);
    onePl2.style.borderRadius = "4px";
    onePl2.label = "Ime";
    onePl2.style.marginBottom = "10px";
    content.insertBefore(onePl2, lnbrk);
    setTimeout(() => {
      onePl2.shadowRoot.querySelector(".field").setAttribute("focused", "");
      onePl2.focus()
    }, 10);
    onePl2.focus;
    index++;
    if (index == 5) {
      newPl.disabled = true;
    }
  });
  endPl.addEventListener("click", async function () {
    let nicist = false;
    for (
      var i = 0;
      i < document.getElementsByTagName("md-outlined-text-field").length;
      i++
    ) {
      let inpute = document.getElementsByTagName("md-outlined-text-field")[i];

      if (inpute.value.length == 0 || inpute.value.includes("/")) {
        inpute.style.outline = "7px red solid";
        setTimeout(() => {
          inpute.style.outline = "0px red solid";
        }, 200);
        nicist = true;
      }
    }
    if (!nicist) {
      for (
        var i = 0;
        i < document.getElementsByTagName("md-outlined-text-field").length;
        i++
      ) {
        let input = document.getElementsByTagName("md-outlined-text-field")[i]
          .value;
        listOfPlayers[input] = [""];
      }
      listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
      if (!navigator.onLine) {
        localStorage.offlineChanges = true;
      }
      content.innerHTML = "";
      newPl.remove();
      endPl.remove();
      listOfPlayers["!gamesData!"] = [];

      changeOpis(content, "Vpišite vzdevek skupine");
      var imeIgre = document.createElement("md-filled-text-field");
      setTimeout(() => {
        imeIgre.shadowRoot.querySelector(".field").setAttribute("focused", "");
        imeIgre.focus()
      }, 10);
      var koncajIme = document.createElement("md-filled-tonal-button");
      imeIgre.label = "Vzdevek skupine";
      imeIgre.value = JSON.stringify(
        Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!")
      )
        .replace(/"/g, "")
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .sort()
        .toString()
        .replace(/,/g, ", ");
      koncajIme.innerHTML = "Končano";
      content.appendChild(imeIgre);
      addElement("div", content, "break").style.height = "10px";
      content.appendChild(koncajIme);
      console.log(listOfPlayers);
      getGenders();
      koncajIme.addEventListener("click", function () {
        if (imeIgre.value.length == 0 || imeIgre.value.includes("/")) {
          imeIgre.style.outline = "7px red solid";
          setTimeout(() => {
            imeIgre.style.outline = "0px red solid";
          }, 200);
        } else {
          listOfPlayers["!gameName!"] = imeIgre.value;
          if (!navigator.onLine) {
            localStorage.offlineChanges = true;
          }
          document.querySelector(".bottomSheetScrim").click();

          count(false, true);
        }
      });
    }
  });
}
async function getGenders() {
  for (const key in listOfPlayers) {
    if (key == "!gamesData!" || key == "!gameName!") {
      continue;
    }
    const response = await fetch(
      "https://pxweb.stat.si/SiStatData/api/v1/sl/Data/?query=" +
        encodeURIComponent(key)
    );
    const movies = await response.json();
    if (typeof listOfPlayers[key] == "string") {
      listOfPlayers[key] = [listOfPlayers[key]];
    }
    if (JSON.stringify(movies).includes("Ženska imena")) {
      listOfPlayers[key][1] = "Z";
    } else if (JSON.stringify(movies).includes("Moška imena")) {
      listOfPlayers[key][1] = "M";
    } else {
      listOfPlayers[key][1] = "N";
    }
  }
}
function loclStrg() {
  var inputPr = prompt("Input");
  var data = JSON.parse(inputPr.toString());
  for (const [key, value] of Object.entries(data)) {
    localStorage.setItem(key, value);
  }
}

async function count(animate, newcScore = null) {
  try {
    if (animate) {
      document.querySelector(".cntScreen").style.animation =
        "hideScreen var(--transDur) forwards cubic-bezier(.3,.5,0,1.3)";
      document.querySelector(".crezultLine").style.animation =
        "hideScreen var(--transDur) forwards cubic-bezier(.3,.5,0,1.3)";
    }
  } catch {
   
  }
  let timeTo;
  if (animate) timeTo = 30;
  else timeTo = 0;

  await new Promise((resolve) => setTimeout(resolve, timeTo));
  if (!listOfPlayers["!gamesData!"]) {
    listOfPlayers["!gamesData!"] = [];
  }

  try {
    removeElement(
      document.querySelector(".cntScreen"),
      document.querySelector(".crezultLine")
    );
  } catch (error) {}

  setTimeout(() => {
    let dlgs = document.getElementsByTagName("md-dialog");

    for (let ia = 0; ia < dlgs.length; ia++) {
      dlgs[ia].remove();
    }
  }, 300);

  if (listOfPlayersCopy.length > 0) {
    document.querySelector(".undoBtn").disabled = false;
  }
  if (listOfPlayers["!gameName!"].includes("/users/")) {
    document.querySelector(".shrBtn").disabled = true;
    if (document.getElementById("clck").label !== "yes") {
      document.getElementById("clck").addEventListener("click", function () {
        dlgNotif("Da povabite nekoga v skupino morate biti njen lastnik.");
      });
      document.getElementById("clck").label = "yes";
    }

    document.querySelector(".dltBtn").innerHTML =
      "<md-icon>insert_chart</md-icon>";
  } else {
    document.querySelector(".shrBtn").disabled = false;
    document.querySelector(".dltBtn").innerHTML =
      "<md-icon>insert_chart</md-icon>";
  }
  if (
    sessionStorage.uid == null ||
    sessionStorage.uid == undefined ||
    sessionStorage.uid == "null" ||
    sessionStorage.uid == "undefined" ||
    !navigator.onLine
  ) {
    if (document.getElementById("clck").label !== "yes") {
      document.getElementById("clck").addEventListener("click", function () {
        dlgNotif(
          "Da povabite nekoga v skupino morate biti prijavljeni in imeti internetno povezavo."
        );
      });
      document.getElementById("clck").label = "yes";
    }
    document.querySelector(".shrBtn").disabled = true;
  }
  document.getElementById("actionBar").style.display = "flex";
  document.getElementById("homeContainer").style.display = "none";
  const gamesObject = JSON.parse(localStorage.getItem("games")) || {};
  gamesObject[listOfPlayers["!gameName!"]] = listOfPlayers;

  localStorage.setItem("games", JSON.stringify(gamesObject));
  updateUserData();
  localStorage.removeItem(undefined);
  var newElement = addElement("div", document.body, "cntScreen");
  newElement.id = "cntScreen";
  if (animate) {
    newElement.style.animation =
      "showScreenGame var(--transDur) forwards cubic-bezier(0.05, 0.7, 0.1, 1.0)";
  }
  var rezultLine = document.createElement("div");
  rezultLine.id = "crezultLine";
  for (const key in listOfPlayers) {
    if (key == "!gamesData!" || key == "!gameName!") {
      continue;
    }
    let name = key;
    var chl = document.createElement("div");
   
    var prnt = document.createElement("div");
    if (!Array.isArray(listOfPlayers[key])) {
      const set = new Set([listOfPlayers[key]]);
      listOfPlayers[key][0] = Array.from(set);
    }
    prnt.innerHTML =
      '<p class="namePlayers"> ' +
      listOfPlayers[key][0].toString() +
      "<br>" +
      name +
      " </p>";
    chl.innerHTML = String(chl.innerHTML).replace("undefined", "");
    chl.innerHTML += '<p style = "" class="noText" ></p>';
    chl.innerHTML += ' <p style = "" class="noText" ></p>';
    chl.setAttribute("class", "chl chlName_" + name.replace(/ /g, "_"));
    console.log(key, Object.keys(listOfPlayers).at(-1));
    if(key == Object.keys(listOfPlayers).at(-1)){
      chl.classList.add("chlScrollBar")
    }
    let ripple = addElement("md-ripple", prnt, null);
    ripple.style.zIndex = "10";

    chl.style.display = "inline-block;";
    var pointView = addElement("p", rezultLine, null);
    pointView.setAttribute("class", "rezult_" + name.replace(/ /g, "_"));
    pointView.setAttribute(
      "style",
      "flex: 1; color: var(--_label-text-color); background-color:var(--md-sys-color-secondary-container); padding-top: 15px; padding-bottom: 15px; border-top-left-radius: 30px; border-top-right-radius: 30px; margin-left:10px;margin-right:10px;"
    );
    pointView.innerHTML = "";

    prnt.setAttribute("class", "prnt prntName_" + name.replace(/ /g, "_"));
    prnt.addEventListener("click", function () {
      if (!event.target.className.includes("word")) {
        addScore(name);
      }
    });
    prnt.appendChild(chl);
    newElement.appendChild(prnt);
  }
  var stGame = 0;
  let pointsList = {};
  document.body.appendChild(newElement);
  for (const key in listOfPlayers) {
    if (key == "!gamesData!" || key == "!gameName!") {
      continue;
    } else {
      pointsList[key] = parseInt(0);
    }
  }

  if (!listOfPlayers["!gamesData!"]) listOfPlayers["!gamesData!"] = [];
  for (var ia = 0; ia < listOfPlayers["!gamesData!"].length; ia++) {
    let game = ia;

    if (!listOfPlayers["!gamesData!"][game]) continue;
    let nameOne = listOfPlayers["!gamesData!"][game][1];
    let points = listOfPlayers["!gamesData!"][game][3];
    if (!Array.isArray(nameOne)) {
      const set = new Set([nameOne]);
      nameOne = Array.from(set);
    }
    if (!Array.isArray(points)) {
      const set = new Set([points]);
      points = Array.from(set);
      points.push(points[0]);
    }
    for (const player of nameOne) {
      let playerPoints = points[nameOne.indexOf(player)];
      var kkk = document.createElement("md-text-button");
      if (playerPoints !== "") {
       
        if (listOfPlayers["!gamesData!"][game][9]) {
          playerPoints =((games[listOfPlayers["!gamesData!"][game][0]][0]+listOfPlayers["!gamesData!"][game][5]) * 2)+listOfPlayers["!gamesData!"][game][8]
          kkk.innerHTML = parseInt(playerPoints);
        }
        if (listOfPlayers["!gamesData!"][game][10]) {
          playerPoints =((games[listOfPlayers["!gamesData!"][game][0]][0]+listOfPlayers["!gamesData!"][game][5]) * 4)+listOfPlayers["!gamesData!"][game][8]
          ;
          kkk.innerHTML = parseInt(playerPoints);
        }
        if (listOfPlayers["!gamesData!"][game][4]) {
          playerPoints = parseInt(playerPoints) * 2;
          kkk.innerHTML = parseInt(playerPoints);
        } else {
          kkk.innerHTML = parseInt(playerPoints);
        }
      }
      document
        .querySelector(".chlName_" + player.replace(/ /g, "_"))
        .appendChild(kkk);
      kkk.style.marginTop = "2px";
      kkk.style.marginBottom = "2px";
      kkk.style.fontSize = "1rem";
      if (!Array.isArray(listOfPlayers["!gamesData!"][game][1])) {
        const set = new Set([listOfPlayers["!gamesData!"][game][1]]);
        listOfPlayers["!gamesData!"][game][1] = Array.from(set);
      }
      if (
        listOfPlayers["!gamesData!"][game][4] &&
        listOfPlayers["!gamesData!"][game][1][0] == player
      ) {
        kkk.innerHTML = kkk.innerHTML + "*";
      }
      // kkk.setAttribute("onclick", 'gameData("' + stGame + '")');
      kkk.classList.add(player + "_score");
      kkk.classList.add("score_" + stGame);
      if (playerPoints !== "") {
        pointsList[player] = pointsList[player] + parseInt(playerPoints);
      }

      if (kkk.innerHTML !== "&bbsp;") {
        kkk.addEventListener("click", function () {
          event.stopPropagation();

          gameData(
            event.target
              .getAttribute("class")
              .slice(event.target.getAttribute("class").lastIndexOf("_") + 1),
            stGame
          );
        });
      }
      if (playerPoints == "") {
        kkk.innerHTML = "&nbsp;";
      }

      // document.querySelector(".chlName_" + player).innerHTML += '<md-divider style="--_color: var(--md-sys-color-surface);height: 5px;"></md-divider>'
      addElement(
        "div",
        document.querySelector(".chlName_" + player.replace(/ /g, "_")),
        "break"
      );
    }
    for (const key in listOfPlayers) {
      if (
        nameOne.includes(key) ||
        key == "!gamesData!" ||
        key == "!gameName!"
      ) {
        continue;
      } else {
        var kkk = document.createElement("md-text-button");
        kkk.style.marginTop = "2px";
        kkk.style.marginBottom = "2px";
        kkk.style.fontSize = "1rem";

        kkk.innerHTML = "&nbsp;";
        document
          .querySelector(".chlName_" + key.replace(/ /g, "_"))
          .appendChild(kkk);
        kkk.disabled = true;
        kkk.classList.add("noText");
        addElement(
          "div",
          document.querySelector(".chlName_" + key.replace(/ /g, "_")),
          "break"
        );
      }
    }
    stGame++;
  }
  let names = document.querySelectorAll(".namePlayers");
  let maxHeight = [...names].reduce(
    (max, name) => Math.max(max, name.clientHeight),
    0
  );
  names.forEach((name) => {
    name.style.height = maxHeight + "px";
  });
  try {
    const divs = document.querySelectorAll(".chl");

    // Function to synchronize scrolling
    function scrollAll(event) {
      // Get the scroll position of the currently scrolled div
      const scrollTop = event.target.scrollTop;

      // Loop through each div and set its scrollTop to match the first div
      divs.forEach((div) => {
        div.scrollTop = scrollTop;
      });
    }

    // Bind the scroll event to each div
    divs.forEach((div) => {
      div.addEventListener("scroll", scrollAll);
    });
  } catch (error) {
    
  }
  rezultLine.setAttribute("class", "crezultLine");
  document.getElementById("bottomBar").appendChild(rezultLine);
  if (animate)
    document.querySelector(".crezultLine").style.animation =
      "showScreen var(--transDur) forwards cubic-bezier(0.3, 0.5, 0, 1.3)";

  for (const key in listOfPlayers) {
    if (key == "!gamesData!" || key == "!gameName!") {
      continue;
    }
    document.querySelector(".rezult_" + key.replace(/ /g, "_")).innerHTML =
      pointsList[key];
  }
  if (animate) {
    setTimeout(() => {
      var $target = $(".chl");
      $target.animate(
        { scrollTop: [$target.prop("scrollHeight"), "swing"] },
        {
          duration: $target.prop("scrollHeight") / 2,
          easing: "swing",
        }
      );
    }, 1);
  } else {
    var objDiv = document.getElementsByClassName("chl")[0];
    objDiv.scrollTo(0, objDiv.scrollHeight + 100);
  }
}

function addElement(tag, parent, className) {
  var element = document.createElement(tag);
  if (className) {
    element.classList.add(className);
  }
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}
var completePodatki = {};

function gameData(infom, number) {
  /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
  var info = listOfPlayers["!gamesData!"][parseInt(infom)];
  console.log(info);
  var newElement = makeBottomheet('Igra')

  if (info[0] !== "Po meri" && info[0] !== "Klop") {
    var changeValue = document.createElement("md-outlined-text-field");
    changeValue.type = "number";
    if (info[4]) {
      changeValue.value = info[3] * 2;
    } else {
      changeValue.value = info[3];
    }
    changeValue.label = "Točke";
    newElement.appendChild(changeValue);
  }
  var table = addElement("table", null, "gameData");
  var podatki = [
    "Igra",
    "Igralec",
    "Partner",
    "Točke",
    "Radlc",
    "Razlika",
    "Uspeh",
    "Bonusi",
    "Bonus Točke",
    "Kontra",
    "Rekontra",
    "Datum",
  ];
  table.style.marginBottom = "10px";
  for (let i = 0; i < podatki.length; i++) {
    var key = podatki[i];
    let value = info[i];
    if (i == 0 && value !== "Po Meri") {
      completePodatki[key] = [i, value, games[value.toString()][0]];
    } else {
      if (value == "Po Meri") {
        (completePodatki[key] = [i, value]), "Različno";
      } else {
        completePodatki[key] = [i, value];
      }
    }
  }

  console.log(completePodatki);
  function createTableData(element, element1, data) {
    let tdVelk = addElement("tr", table, "gameTdDiv");

    if (data == "Točke") {
      tdVelk.style.transform = " translateY(10px)";
      element = "" + element.toString().replace("+", "");
    }
    let td1 = addElement("td", tdVelk, "gameDataTd");
    td1.innerHTML = element1;
    let td = addElement("td", tdVelk, "gameDataTdBottom");
    td.innerHTML = element;
  }

  //Datum
  if (completePodatki["Datum"][1]) {
    var date = new Date(completePodatki["Datum"][1]);
    var dateString =
      date.toLocaleString("sl-Si", { weekday: "long" }) +
      ", " +
      date.getDate() +
      ". " +
      date.toLocaleString("sl-Si", { month: "long" }) +
      " " +
      date.getFullYear() +
      ", ob " +
      date.getHours() +
      "." +
      date.getMinutes();
    changeOpis(newElement, dateString);
  }

  let element1;
  let element;
  let data;

  //Igra
  data = "Igra";
  element1 = data;
  element = completePodatki[data][1];

  element1 = data + " " + completePodatki[data][1].toLowerCase();
  if (
    element1.toLowerCase().includes("po meri") ||
    element1.toLowerCase().includes("klop") ||
    element1.toLowerCase().includes("renons") ||
    element1.toLowerCase().includes("mondfang")
  ) {
    element = 0;
    if (element1.includes("po meri")) {
      createTableData("", "Po meri");
    } else if (element1.includes("klop")) {
      createTableData("", "Klop");
    } else if (element1.includes("mondfang")) {
      createTableData("", "Mondfang");
    } else {
      createTableData("", "Renons");
    }
    if (typeof completePodatki["Igralec"][1] == "string")
      completePodatki["Igralec"][1] = completePodatki["Igralec"][1].split(",");
    if (typeof completePodatki["Točke"][1] == "number")
      completePodatki["Točke"][1] = completePodatki["Točke"][1]
        .toString()
        .split(",");
    for (let ina = 0; ina < completePodatki["Igralec"][1].length; ina++) {
      const element = completePodatki["Igralec"][1][ina];
      if (completePodatki["Radlc"][1] && !element1.includes("mondfang")) {
        createTableData(completePodatki["Točke"][1][ina] * 2, element);
      } else {
        createTableData(completePodatki["Točke"][1][ina], element);
      }
    }
  } else {
    element = completePodatki[data][2];
    if (!info[6]) {
      element = "-" + element;
    }
    createTableData(element, element1, data);
  }

  //Razlika
  if (
    !completePodatki["Igra"][1].toLowerCase().includes("po meri") &&
    !completePodatki["Igra"][1].toLowerCase().includes("klop") &&
    completePodatki["Razlika"][1] !== undefined &&
    completePodatki["Razlika"][1] !== false &&
    completePodatki["Razlika"][1] !== null
  ) {
    data = "Razlika";
    element1 = data;
    element = completePodatki[data][1];
    if (!info[6]) {
      element = "-" + element;
    }
    createTableData(element, element1, data);
  }
  
  //Kontra
  try {
    if (
      !completePodatki["Igra"][1].toLowerCase().includes("po meri") &&
      !completePodatki["Igra"][1].toLowerCase().includes("klop") &&
      !completePodatki["Igra"][1].toLowerCase().includes("mondfang") &&
      completePodatki["Kontra"][1]
    ) {
      data = "Kontra";
      element1 = data;

      if (completePodatki["Kontra"][1]) {
       
          element = (completePodatki["Igra"][2]+completePodatki["Razlika"][1])

        
      }

      if (element !== false) createTableData(element, element1, data);
    }
  } catch {}

  //Rekontra
  try {
    if (
      !completePodatki["Igra"][1].toLowerCase().includes("po meri") &&
      !completePodatki["Igra"][1].toLowerCase().includes("klop") &&
      !completePodatki["Igra"][1].toLowerCase().includes("mondfang") &&
      completePodatki["Rekontra"][1]
    ) {
      data = "Rekontra";
      element1 = data;

      if (completePodatki["Rekontra"][1]) {
        element = (completePodatki["Igra"][2]+completePodatki["Razlika"][1])
      }

      if (element !== false) createTableData(element, element1, data);
    }
  } catch {}
  //Bonusi
  if (
    !completePodatki["Igra"][1].toLowerCase().includes("po meri") &&
    !completePodatki["Igra"][1].toLowerCase().includes("klop")
  ) {
    data = "Bonus Točke";
    element1 = data;
    element = completePodatki[data][1];
    if (data == "Bonus Točke") {
      let bonusObject = completePodatki["Bonusi"][1];
      let tocke = {
        Kralji: 20,
        Trula: 20,
        "Pagat ultimo": 50,
        "Kralj ultimo": 20,
      };
      for (const key in completePodatki["Bonusi"][1]) {
        if (bonusObject[key][1]) {
          if (bonusObject[key][3]) {
            createTableData(
              bonusObject[key][0],
              "Napovedano in kontrirano: <wbr>" + key,
              data
            );
          } else if (bonusObject[key][4]) {
            createTableData(
              bonusObject[key][0],
              "Napovedano in rekontrirano: <wbr>" + key,
              data
            );
          } else {
            createTableData(
              tocke[key],
              "Napovedano: <wbr>" + key,
              data
            );
          }

          continue;
        } else {
          createTableData(bonusObject[key][0], key, data);
          continue;
        }
      }
    } else {
      if (!info[6]) {
        if (!element.toString().includes("-")) {
          element = "-" + element;
        }
      }
      createTableData(element, element1, data);
    }
  }
  

//Radlc
if (
  !completePodatki["Igra"][1].toLowerCase().includes("po meri") &&
  !completePodatki["Igra"][1].toLowerCase().includes("klop")
) {
  data = "Radlc";
  element1 = data;
  element = completePodatki[data][1];

  if (completePodatki["Radlc"][1]) {
    element = completePodatki["Točke"][1];
    
    if (completePodatki["Kontra"][1]) {
      element = ((completePodatki["Igra"][2]+completePodatki["Razlika"][1]) * 2)+completePodatki["Bonus Točke"][1];
    }
    if (completePodatki["Rekontra"][1]) {
      element = ((completePodatki["Igra"][2]+completePodatki["Razlika"][1]) * 4)+completePodatki["Bonus Točke"][1];
    }
  }

  if (element !== false) createTableData(element, element1, data);
}
  //Tocke
  if (
    !completePodatki["Igra"][1].toLowerCase().includes("po meri") &&
    !completePodatki["Igra"][1].toLowerCase().includes("klop")
  ) {
    data = "Točke";
    element1 = data;
    element = completePodatki[data][1];
   
    if (completePodatki["Kontra"][1]) {
      element = ((completePodatki["Igra"][2]+completePodatki["Razlika"][1]) * 2)+completePodatki["Bonus Točke"][1];
    }
    if (completePodatki["Rekontra"][1]) {
      element = ((completePodatki["Igra"][2]+completePodatki["Razlika"][1]) * 4)+completePodatki["Bonus Točke"][1];
    }
    if (completePodatki["Radlc"][1]) {
      element = element * 2;
    }
    createTableData(element, element1, data);
  }
  newElement.appendChild(table);
  let brk = addElement("div", newElement, "break");
brk.style.height = "10px";
  var izbrisiIgro = document.createElement("md-text-button");
  izbrisiIgro.innerHTML =
    ' <svg slot="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> Izbriši';
  newElement.appendChild(izbrisiIgro);
  izbrisiIgro.style.margin = "0";
  izbrisiIgro.addEventListener("click", function (e) {
    listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
    if (!navigator.onLine) {
      localStorage.offlineChanges = true;
    }
    listOfPlayers["!gamesData!"].splice(infom, 1);
    if (!Array.isArray(completePodatki["Igralec"][1])) {
      const set = new Set([completePodatki["Igralec"][1]]);
      completePodatki["Igralec"][1] = Array.from(set);
    }

    if (
      completePodatki["Radlc"][1] === true &&
      completePodatki["Točke"][1] > -1
    ) {
      if (!Array.isArray(listOfPlayers[completePodatki["Igralec"][1][0]])) {
        const set = new Set([listOfPlayers[completePodatki["Igralec"][1][0]]]);
        listOfPlayers[completePodatki["Igralec"][1][0]] = Array.from(set);
      }
      listOfPlayers[completePodatki["Igralec"][1][0]][0] =
        listOfPlayers[completePodatki["Igralec"][1][0]][0] + "*";
    }
    const keys = Object.keys(listOfPlayers["!gamesData!"]);
    keys.sort((a, b) => a - b);
    const gamesObject = JSON.parse(localStorage.getItem("games")) || {};
    gamesObject[listOfPlayers["!gameName!"]] = listOfPlayers;
    localStorage.setItem("games", JSON.stringify(gamesObject));

    updateUserData();
    document.querySelector(".bottomSheetScrim").click();
    count(true);
  });
  var iks = document.createElement("md-filled-button");
  iks.innerHTML = "Končano";
  iks.style.margin = "0";
  newElement.appendChild(iks);

  iks.addEventListener("click", function (e) {
    document.querySelector(".bottomSheetScrim").click();
    if (
      info[0] !== "Po Meri" &&
      info[0] !== "Klop" &&
      listOfPlayers["!gamesData!"][infom][3] !== changeValue.value
    ) {
      listOfPlayersCopy.push(JSON.stringify(listOfPlayers));
      if (info[4]) {
        listOfPlayers["!gamesData!"][infom][3] = changeValue.value / 2;
      } else {
        listOfPlayers["!gamesData!"][infom][3] = changeValue.value;
      }
      
      count(true);
    }
  });
}

function deleteGame(elem) {
  var newElement;
  if (!elem) {
    if (listOfPlayers["!gameName!"].includes("/users/")) {
      newElement = dialogBuilder(
        "Ali želite zapustiti deljeno skupino " +
          listOfPlayers["!gameName!"].slice(
            listOfPlayers["!gameName!"].lastIndexOf("/")
          ) +
          "?",
        false
      )[0];
    } else {
      newElement = dialogBuilder(
        "Ali želite izbrisati skupino " + listOfPlayers["!gameName!"] + "?",
        false
      )[0];
    }
  } else {
    newElement = elem;
  }

  let iconaa = addElement("md-icon", newElement.parentNode, null);
  iconaa.innerHTML = "delete_outline";
  iconaa.setAttribute("slot", "icon");

  var shareButton = document.createElement("md-text-button");
  shareButton.innerHTML = "Da";
  var copyButton = document.createElement("md-filled-tonal-button");
  copyButton.innerHTML = "Ne";
  let actions = document.createElement("div");
  actions.setAttribute("slot", "actions");
  newElement.parentNode.appendChild(actions);
  actions.appendChild(shareButton);
  actions.appendChild(copyButton);

  shareButton.addEventListener("click", function () {
    if (!navigator.onLine) {
      localStorage.offlineChanges = true;
    }
    const gamesObject = JSON.parse(localStorage.getItem("games")) || {};
    delete gamesObject[listOfPlayers["!gameName!"]];
    if (!navigator.onLine) {
      localStorage.offlineChanges = true;
    }
    listOfPlayers = [];
    localStorage.setItem("games", JSON.stringify(gamesObject));
    updateUserData();
    document.querySelector(".homeBtn").click();
    hideDialog(newElement);
    Game();
  });
  copyButton.addEventListener("click", function () {
    listOfPlayers = [];
    hideDialog(newElement);
  });
}
async function resolveAfter(s) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, s);
  });
}

function removeElement() {
  for (const element of arguments) {
    element.remove();
  }
}

function privacy() {
  var contentWh = dialogBuilder("Politika");
  var newElement = contentWh[0];
  var iks = contentWh[1];
  newElement.parentNode.classList.add("fullscreen");
  iks.addEventListener("click", function (e) {
    $("#homeContainer").show();

    setTimeout(() => {
      hideDialog(newElement);
      document.getElementById("homeContainer").style.animation = "";
    }, 1);
  });
  try {
    dlgFullscreen(newElement.parentNode);
  } catch {}

  var policy = addElement("p", newElement, null);
  policy.setAttribute(
    "style",
    "white-space: pre;text-wrap: wrap;width: 80%;margin: 20px;color: var(--colorTxtDialog);"
  );

  policy.innerHTML = policyTxt;
}

function feedback() {
  var newElement = makeBottomheet("Povratne informacije");

 
  var emailContentInput = document.createElement("md-outlined-text-field");
  emailContentInput.setAttribute("type", "textarea");
  emailContentInput.setAttribute("rows", "10");
  emailContentInput.setAttribute(
    "style",
    "height: 25vh;width: 90%; resize: vertical;word-wrap: break-word;"
  );
  emailContentInput.label = "Vpišite kaj bi radi izboljšali...";
  emailContentInput.placeholder = "Kar po domače...";
  newElement.appendChild(emailContentInput);
  setTimeout(() => {
    emailContentInput.shadowRoot.querySelector(".field").setAttribute("focused", "");
    emailContentInput.focus()
  }, 10);

  var shareButton = document.createElement("md-filled-tonal-button");
  shareButton.innerHTML = "Pošlji";
addElement("div", newElement, "break")
  newElement.appendChild(shareButton);
  shareButton.addEventListener("click", function () {
    window.open(
      "mailto:stevec.taroka@gmail.com?subject=Imam izbolšavo&body=" +
        emailContentInput.value,
      "_blank"
    );
  });
}
var isLoaded = false;

setTimeout(() => {
  if (!isLoaded) document.querySelector(".loaderInner").style.opacity = "1";
}, 500);

var queryAnim = false;
window.addEventListener("load", function () {

  if(location.pathname.includes("install-app")){

installApp()
  }
  isLoaded = true;
  queryAnim = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try {
    document.querySelector(".loader").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".loader").remove();
    }, 400);
  } catch {}
  if (
    !location.pathname.includes("users") &&
    location.pathname !== "/" &&
    !location.pathname.includes("privacy")
  ) {
    Game(decodeURIComponent(location.pathname.slice(1)));
  }
  if (location.pathname.includes("privacy")) {
    privacy();
  }

  if (localStorage.offlineChanges == undefined) {
  } else {
    if (navigator.onLine) {
      updateUserData();
      localStorage.offlineChanges = undefined;
    }
  }

  if (
    sessionStorage.uid !== null &&
    sessionStorage.uid !== undefined &&
    sessionStorage.uid !== "null" &&
    sessionStorage.uid !== "undefined"
  ) {
    watchChanges();
  }

  if (queryAnim) document.body.style.setProperty("--transDur", "0s");
});
function facebookIntent(link) {
  let dialogIk
  if(link.includes('install'))dialogIk = dialogBuilder("Naloži aplikacijo"); else dialogIk= dialogBuilder("Prijava");
  let dialog = dialogIk[0];
  let iks = dialogIk[1];
  iks.addEventListener("click", function (e) {
    hideDialog(dialog);
  })
  dialog.innerHTML ='Zaradi omejitev Facebooka morate aplikacijo odpreti v brskalniku.'
  let actions = document.createElement("div");
  actions.setAttribute("slot", "actions");
  dialog.parentNode.appendChild(actions);
  let close = addElement("md-filled-button", actions, null);
  close.innerHTML = "Odpri";
  close.addEventListener("click", function () {
    window.location.href = `intent://${link}#Intent;scheme=https;end`// android
    window.location = `googlechrome://${link}`// ios to chrome
  });

}
function installApp() {
  
  if (['fb_iab', 'fban', 'fbav', 'instagram'].some(app => navigator.userAgent.toLowerCase().includes(app))){
    facebookIntent('stevec-taroka.si/install-app')
    }else{
  let dialogIk = dialogBuilder("Naloži aplikacijo");
  let dialog = dialogIk[0];
  let iks = dialogIk[1];
  iks.addEventListener("click", function (e) {
    hideDialog(dialog);
  })

  dialog.innerHTML ='Prenesite apklikacijo za lažji dostop do vaših iger.'
  let actions = document.createElement("div");
  actions.setAttribute("slot", "actions");
  dialog.parentNode.appendChild(actions);
  let close = addElement("md-filled-button", actions, null);
  close.innerHTML = "Prenesi";
  close.addEventListener("click", function () {
    document.getElementById("pwa").click()
    hideDialog(dialog);
  });
}
}

function settings() {
  var contentWh = dialogBuilder("Nastavitve");
  var dialog = contentWh[0];
  var iks = contentWh[1];
  dialog.parentNode.classList.add("fullscreen");
  iks.addEventListener("click", function (e) {

    document.getElementById("homeContainer").style.animation = "none";
    $("#homeContainer").show();

    setTimeout(() => {
      hideDialog(dialog);
      document.getElementById("homeContainer").style.animation = "";
    }, 1);
  });
  dlgFullscreen(dialog.parentNode);

  var holder = addElement("md-list", dialog, null);
  var razlikaOkroz = addElement("md-list-item", holder, null);
 
  razlikaOkroz.innerHTML = "Zaokroževanje razlike&nbsp;&nbsp;&nbsp;&nbsp;";
  var switchRaz = addElement("md-switch", razlikaOkroz, null);
  switchRaz.setAttribute("slot", "end");
  if (
    JSON.parse(localStorage.getItem("razlikaOkrozi")) == true ||
    localStorage.getItem("razlikaOkrozi") == null
  ) {
    switchRaz.setAttribute("selected", "");
  }
  razlikaOkroz.addEventListener("click", function () {
    switchRaz.selected = !switchRaz.selected;
  });
  razlikaOkroz.setAttribute("type", "reset");
  razlikaOkroz.addEventListener("change", function () {
    if (
      localStorage.getItem("razlikaOkrozi") == "true" ||
      localStorage.getItem("razlikaOkrozi") == null
    ) {
      localStorage.setItem("razlikaOkrozi", "false");
    } else {
      localStorage.setItem("razlikaOkrozi", "true");
    }
    zaokrožuj = JSON.parse(localStorage.getItem("razlikaOkrozi"));
  });

  var tema = makeThemeChanger();
  holder.appendChild(tema);
  var polit = addElement("md-list-item", holder);
  polit.innerHTML = "Politika <md-icon slot='start'>policy</md-icon>";
  polit.addEventListener("click", privacy);
  polit.setAttribute("style", "margin: 10px 0;");
  addElement('md-ripple', polit)
  var dltDt = addElement("md-list-item", holder);
  dltDt.innerHTML =
    "<span style='color:var(--md-sys-color-on-error-container)'>Izbriši račun</span> <md-icon slot='start' style='color:var(--md-sys-color-on-error-container)'>delete</md-icon>";
  dltDt.addEventListener("click", deleteAllData);

  addElement('md-ripple', dltDt)
}

function makeThemeChanger() {
  const seedColor = localStorage["seed-color"] || "267,100";
  let clr = seedColor.split(",");

  var tema = addElement("md-filled-card", null, "hueCard");
  addElement("p", tema, "colorTitle").innerHTML = "Barva aplikacije";
  let slider1 = addElement("md-slider", tema, "colorGradient");
  slider1.classList.add("sliderStyle");
  slider1.max = "360";
  slider1.value = clr[0];

  let brk = addElement("div", tema, null);
  brk.style.height = "15px";
  brk.style.width = "3px";
  addElement("p", tema, "colorTitle").innerHTML = "Nasičenost";

  let slider2 = addElement("md-slider", tema, "sliderStyle");
  slider2.value = clr[1];

  slider1.addEventListener("input", function () {
    localStorage["seed-color"] = slider1.value + "," + slider2.value;
    slider2.style.setProperty(
      "--_active-track-color",
      changeTheme(slider1.value, slider2.value)
    );
    slider2.style.setProperty(
      "--_inactive-track-color",
      changeTheme(slider1.value, slider2.value)
    );
  });
  slider2.style.setProperty(
    "--_active-track-color",
    changeTheme(slider1.value, slider2.value)
  );
  slider2.style.setProperty(
    "--_inactive-track-color",
    changeTheme(slider1.value, slider2.value)
  );

  slider2.addEventListener("input", function () {
    localStorage["seed-color"] = slider1.value + "," + slider2.value;
    changeTheme(slider1.value, slider2.value);
  });
  let brk2 = addElement("div", tema, null);
  brk2.style.height = "15px";
  brk2.style.width = "3px";
  addElement("p", tema, "colorTitle").innerHTML = "Tema";
  let themeSwitch = addElement(
    "md-outlined-segmented-button-set",
    tema,
    "noShowScreen"
  );

  let light = addElement("md-outlined-segmented-button", themeSwitch, null);
  let system = addElement("md-outlined-segmented-button", themeSwitch, null);
  let dark = addElement("md-outlined-segmented-button", themeSwitch, null);
  let lightI = addElement("md-icon", light, null);
  let systemI = addElement("md-icon", system, null);
  let darkI = addElement("md-icon", dark, null);
  lightI.setAttribute("slot", "icon");
  systemI.setAttribute("slot", "icon");
  darkI.setAttribute("slot", "icon");
  lightI.innerHTML = "light_mode";
  systemI.innerHTML = "brightness_medium";
  darkI.innerHTML = "dark_mode";
  light.addEventListener("click", function () {
    localStorage.mode = "light";
    changeTheme(slider1.value, slider2.value);
  });
  dark.addEventListener("click", function () {
    localStorage.mode = "dark";
    changeTheme(slider1.value, slider2.value);
  });
  system.addEventListener("click", function () {
    localStorage.mode = "sys";
    changeTheme(slider1.value, slider2.value);
  });

  if (localStorage.mode == "dark") dark.selected = true;
  else if (localStorage.mode == "light") light.selected = true;
  else if (localStorage.mode == "sys") system.selected = true;
  return tema;
}

function helpMe(dlg) {
  if (!document.getElementById("pomoc")) {
    var contentWh = dialogBuilder("Pomoč");
    var dialog = contentWh[0];
    var iks = contentWh[1];
    dialog.parentNode.classList.add("fullscreen");
    if (dlg) {
      //dlg.removeAttribute("open");
    }
    iks.addEventListener("click", function (e) {
      if (!dlg) {


        document.getElementById("homeContainer").style.animation = "none";
        document.getElementById("homeContainer").style.display = "block";

        setTimeout(() => {
          hideDialog(dialog);
          document.getElementById("homeContainer").style.animation = "";
        }, 1);
      } else {


        setTimeout(() => {
          hideDialog(dialog);
          //dlg.setAttribute("open", "");
        }, 1);
      }
    });
    dlgFullscreen(dialog.parentNode, dlg);
    dialog.innerHTML = pomoc;

    var lst = document
      .getElementById("pomoc")
      .getElementsByTagName("md-list-item");
    for (const item of lst) {
      item.addEventListener("click", function () {
        if (item.getElementsByTagName("p")[0].style.height == "0px") {
          expandSection(item.getElementsByTagName("p")[0]);

          item.getElementsByTagName("md-icon")[0].innerHTML = "expand_less";
        } else {
          collapseSection(item.getElementsByTagName("p")[0]);

          item.getElementsByTagName("md-icon")[0].innerHTML = "expand_more";
        }
      });
    }
  }
}

const pomoc = `<div id="pomoc"> <md-list>
<md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kako ustvariti novo skupino?</b> <md-icon slot="end">expand_more</md-icon>
    <p style="font-size:1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>Za ustvarjanje nove skupine na domačem zaslonu kliknite na gumb 'Nova skupina'.<br><br>Po kliku se bo odprlo okno, v katerem lahko vnesete imena igralcev, ki sodelujejo v skupini. Za dodajanje večih igralcev uporabite gumb 'Dodaj igralca'. Po kliku gumba 'Naprej' vnesite še vzdevek skupine in kliknite  'Končano'.</p>
</md-list-item>
<md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kako dodati novo igro na seznam?</b> <md-icon slot="end">expand_more</md-icon>
    <p style="font-size: 1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>Če želite dodati novo igro, na zaslonu za štetje kliknite na igralca, ki jo je igral. Nato sledite navodilom, da boste uspešno dodali novo igro na seznam.</p>
</md-list-item>
<md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kako spremeniti barvno temo?</b> <md-icon slot="end">expand_more</md-icon>
    <p style="font-size: 1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>Za spreminjanje barvne teme aplikacije na domačem zaslonu kliknite na gumb 'Nastavitve', zatem pa gumb 'Tema aplikacije' in izberite barvo, ki vam je všeč.</p>
</md-list-item>
<md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Zakaj Google prijava?</b> <md-icon slot="end">expand_more</md-icon>
    <p style="font-size:1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>Prijava s storitvijo Google vam omogoča enostavno shranjevanje podatkov v oblaku. To pomeni, da lahko na katerikoli napravi, kjer se prijavite s svojim Google računom, dostopate do svojih iger in jih urejate. <br><br>Google prijava vam omogoča tudi deljenje igre s prijatelji.</p>
</md-list-item>
<md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kaj pomenijo gumbi v spodnjem delu zaslona za štetje?</b> <md-icon slot="end">expand_more</md-icon>
    <p style="font-size: 1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>● <md-icon>home</md-icon> vam omogoča, da se vrnete na domači zaslon.<br><br>● <md-icon>undo</md-icon> vam omogoča, da razveljavite zadnje dejanje na seznamu.<br><br>● <md-icon>person_add</md-icon> vam omogoča, da povabite prijatelje v skupino, kjer bodo imeli tudi oni možnost urejanja.<br><br>● <md-icon>insert_chart</md-icon> vam omogoča vpogled v statistiko igre. </p>
</md-list-item>
<md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kako povabiti prijatelje v skupino?</b> <md-icon slot="end">expand_more</md-icon>
    <p style="font-size: 1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>Če želite povabiti prijatelje v skupino, kliknite na tretji gumb v spodnjem delu zaslona <md-icon>person_add</md-icon>. Odpre se vam okno, kjer lahko kopirate ali delite povezavo do igre.<br><br>Ko prijatelj dobi povezavo, jo mora le odpreti.<br><br>Za dodajanje prijateljev v skupino morate biti prijavljeni in imeti internetno povezavo.</p>
</md-list-item>
</md-list><div class="break" style="height:80px;"></div></div>`;
// This is the important part!

function collapseSection(element) {
  // get the height of the element's inner content, regardless of its actual size
  var sectionHeight = element.scrollHeight;

  // temporarily disable all css transitions
  var elementTransition = element.style.transition;
  element.style.transition = "";

  // on the next frame (as soon as the previous style change has taken effect),
  // explicitly set the element's height to its current pixel height, so we
  // aren't transitioning out of 'auto'
  requestAnimationFrame(function () {
    element.style.height = sectionHeight + "px";
    element.style.transition = elementTransition;

    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to height: 0
    requestAnimationFrame(function () {
      element.style.height = 0 + "px";
    });
  });

  // mark the section as "currently collapsed"
  element.setAttribute("data-collapsed", "true");
}

function expandSection(element) {
  // get the height of the element's inner content, regardless of its actual size
  var sectionHeight = element.scrollHeight;

  // have the element transition to the height of its inner content
  element.style.height = sectionHeight + "px";

  // when the next css transition finishes (which should be the one we just triggered)
  element.addEventListener("transitionend", function (e) {
    // remove this event listener so it only gets triggered once
    element.removeEventListener("transitionend", arguments.callee);

    // remove "height" from the element's inline styles, so it can return to its initial value
    element.style.height = null;
  });

  // mark the section as "currently not collapsed"
  element.setAttribute("data-collapsed", "false");
}
window.addEventListener("scroll", (e) => {
  e.preventDefault();
  window.scrollTo(0, 0);
});
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
        registration.update();
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    let clr = localStorage["seed-color"].split(",");
    changeTheme(clr[0], clr[1]);
  });
window.addEventListener("popstate", function (event) {
  console.log("BACK");
  if (location.pathname == "/") document.querySelector(".homeBtn").click();
});

window.addEventListener("load", async function () {
  let installPrompt = null;
  const installButton = document.querySelector("#pwa");
  let ifitis = false;
  window.addEventListener("appinstalled", () => {
    disableInAppInstallPrompt();
    console.log("app installed");
  });
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;

    installButton.style.display = "flex";
    document.querySelector(".bubble").style.visibility = "visible";
  });
  if (window.matchMedia("(display-mode: standalone)").matches) {
    disableInAppInstallPrompt();
    console.log("app standalone");
  }
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    if (!ifitis) {
      installButton.style.display = "flex";
    }
  }
  var relatedApps = [];
  try {
    relatedApps = await navigator.getInstalledRelatedApps();
    if (relatedApps.length !== 0 && !ifitis) {
      installButton.innerHTML = "<md-icon>open_in_new</md-icon>";
      installButton.style.display = "flex";
    }
  } catch {}

  installButton.addEventListener("click", async () => {
    if (relatedApps.length !== 0) {
      window.open("/", "_blank");
      return;
    }

    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      let dialog = dialogBuilder("iOS Aplikacija")[0];
      dialog.innerHTML =
        'Če želite naložiti aplikacijo, spodaj pritisnite gumb za deljenje&nbsp;<md-icon style="font-size: 1rem;display:contents;" aria-hidden="true">ios_share</md-icon></span>&nbsp;in poiščite gumb  "<md-icon style="font-size: 1rem;display:contents;" aria-hidden="true">add_box</md-icon> Add to home screen".';
      let actions = document.createElement("div");
      actions.setAttribute("slot", "actions");
      dialog.parentNode.appendChild(actions);
      let close = addElement("md-text-button", actions, null);
      close.innerHTML = "Ok";
      close.addEventListener("click", function () {
        hideDialog(dialog);
      });
    } else {
      const result = await installPrompt.prompt();

      disableInAppInstallPrompt();
    }
  });

  function disableInAppInstallPrompt() {
    ifitis = true;
    installPrompt = null;
    installButton.style.display = "none";
  }
});
function checkConset() {

	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
	  const cookie = cookies[i].trim();
	  if (cookie.startsWith('consentCookies=')) {
		return true; 
	  }
	}
  return false
}
function makeBottomheet(title, permanent) {
  let bottomSheet = addElement("div", document.body, "bottomSheet");
  let sheetContents = addElement("div", bottomSheet, "sheetContents");
  let draggableArea = addElement("div", bottomSheet, "handleHolder");
  var btTitle;
  if (title !== "") {
    btTitle = addElement("div", draggableArea, "bottomSheetTitle");
    btTitle.innerHTML = '<p style="margin:0;">' + title + "</p>";
    addElement("md-elevation", btTitle);
    btTitle.style.margin = "-" + (btTitle.offsetHeight + 34) + "px";
  }
  let handle = addElement("div", draggableArea, "bottomSheetHandle");
  let scrim = addElement("div", document.body, "bottomSheetScrim");
  
  let mainContent = addElement("main", sheetContents, "mainSheet");
  setTimeout(() => {
    scrim.style.opacity = ".32";
  }, 10);
  scrim.addEventListener("click", function () {
    if (!permanent || checkConset()) {
      sheetHeight = 0;
      onDragEnd();
    }
    
  });
  let toolbarColor = document
    .querySelector('meta[name="theme-color"]')
    .getAttribute("content");
  let sheetHeight; // in vh
  const setSheetHeight = (value) => {
    sheetHeight = Math.max(0, Math.min(100, value));

   bottomSheet.style.transform = `translateY(${100-sheetHeight}dvh)`;

    if (sheetHeight === 100) {
      bottomSheet.classList.add("fullscreenSheet");
   
        document
          .querySelector('meta[name="theme-color"]')
          .setAttribute(
            "content",
            getComputedStyle(document.body).getPropertyValue(
              "--md-sys-color-surface-container"
            )
          );
      
    } else {
      bottomSheet.classList.remove("fullscreenSheet");
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", toolbarColor);
    }
  };

  const touchPosition = (event) => (event.touches ? event.touches[0] : event);

  let dragPosition;

  const onDragStart = (event) => {
    dragPosition = touchPosition(event).pageY;
    sheetContents.classList.add("not-selectable");

    vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
  };
  var vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  var mouseDown = 0;
  window.onmousedown = function () {
    ++mouseDown;
  };
  window.onmouseup = function () {
    --mouseDown;
  };
  const onDragMove = (event) => {
    if (mouseDown || event.type == "touchmove") {
      if (event.target.tagName == "MD-SLIDER") return
      
      const y = touchPosition(event).pageY;
      var deltaY = dragPosition - y;

     

      const deltaHeight = (deltaY / window.innerHeight) * 100;
      if(permanent && sheetHeight<25){
        setSheetHeight(25);
        return
    }
      setSheetHeight(sheetHeight + deltaHeight);

      if (sheetHeight > ((vh - 52) / vh) * 100) {
        btTitle.classList.add("titleFull");
         mainContent.style.paddingTop = '85px'
      } else {
        btTitle.classList.remove("titleFull");
         mainContent.style.paddingTop = '30px'
      }
      var sheetHeight3;

      const mainContentHeight = Math.min(
        mainContent.clientHeight,
        mainContent.scrollHeight
      );
      sheetHeight3 = (mainContentHeight / vh) * 100;

      if (
        (sheetHeight < sheetHeight3 / 2 &&
          !mainContent.innerHTML.includes("md-list")) ||
        (mainContent.innerHTML.includes("md-list") && sheetHeight < 25)
      ) {
        if (title !== "") {
          btTitle.style.transform = "scale(1,0)";
        }
        bottomSheet.classList.add("escapingSheet");
        scrim.style.opacity = "0";
        bottomSheet.style.transition= 'all calc(var(--transDur) - 0.1s)';
      setTimeout(() => {
        bottomSheet.style.transition= '';
      }, 400);
      } else {
        if (title !== "") {
          btTitle.style.transform = "scale(1)";
        }
        bottomSheet.classList.remove("escapingSheet");
        scrim.style.opacity = ".32";
        
      }
      dragPosition = y;
    }
  };
  const onDragEnd = () => {
    setTimeout(() => {
      dragPosition = undefined;
      sheetContents.classList.remove("not-selectable");

      var sheetHeight3;

      const mainContentHeight = Math.min(
        mainContent.clientHeight,
        mainContent.scrollHeight
      );
      sheetHeight3 = (mainContentHeight / vh) * 100;

      if (mainContent.innerHTML.includes("md-list")) {
        if (sheetHeight > 95) {
          setSheetHeight(100);
        } else if (sheetHeight > 25) {
          setSheetHeight(Math.min(sheetHeight3 + 5, 75));
        } else {
         
            setIsSheetShown(false);
            setSheetHeight(0);
          
        }
      } else if (sheetHeight < sheetHeight3 / 2) {
      
          setIsSheetShown(false);
          setSheetHeight(0);
       
      } else if (sheetHeight > sheetHeight3 + (100 - sheetHeight3) / 2) {
        setSheetHeight(100);
      } else {
        setSheetHeight(Math.max(Math.min(sheetHeight3 + 5, 75), 25));
      }

      if (sheetHeight > ((vh - 26) / vh) * 100) {
        btTitle.classList.add("titleFull");
         mainContent.style.paddingTop = '85px'
      } else {
        btTitle.classList.remove("titleFull");
         mainContent.style.paddingTop = '30px'
      }
      bottomSheet.style.transition= 'all calc(var(--transDur) - 0.1s)';
      setTimeout(() => {
        bottomSheet.style.transition= '';
      }, 400);
    }, 6);
  };
  const setIsSheetShown = (isShown) => {
    bottomSheet.setAttribute("aria-hidden", String(!isShown));
    scrim.style.opacity = "0";
    if (title !== "") {
      btTitle.style.transform = "scale(1,0)";
    }

    bottomSheet.addEventListener(
      "transitionend",
      function (event) {
        bottomSheet.remove();
        scrim.remove();
      },
      false
    );
  };

  window.addEventListener("mousedown", onDragStart);
  window.addEventListener("touchstart", onDragStart);

  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("touchmove", onDragMove);

  window.addEventListener("mouseup", onDragEnd);
  window.addEventListener("touchend", onDragEnd);

  bottomSheet.style.transition= 'all calc(var(--transDur) - 0.1s)';
  setTimeout(() => {
    bottomSheet.style.transition= '';
  }, 400);
  setSheetHeight(
    Math.min(sheetContents.offsetHeight, 50, (720 / window.innerHeight) * 100)
  );
  

  const observer = new MutationObserver((mutations) =>
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && sheetHeight < 100) {
        setTimeout(() => {
          const mainContentHeight = Math.min(
            mainContent.clientHeight,
            mainContent.scrollHeight
          ); // Adding 60px for padding or margin

          // Calculate the percentage height of mainContent relative to the viewport height
          const sheetHeight2 = (mainContentHeight / vh) * 100;

          // Set the height of .mainSheet using the calculated percentage height
         
            setSheetHeight(Math.max(Math.min(sheetHeight2 + 5, 75), 25));
          

          if (sheetHeight > ((vh - 52) / vh) * 100) {
            btTitle.classList.add("titleFull");
             mainContent.style.paddingTop = '85px'
          } else {
            btTitle.classList.remove("titleFull");
             mainContent.style.paddingTop = '30px'
          }
          btTitle.style.margin = "-" + (btTitle.offsetHeight + 34) + "px";
        }, 10);
        if (
          mainContent.innerHTML.includes("md-list") &&
          sheetContents.scrollHeight > sheetContents.clientHeight
        ) {
          sheetContents.style.overflow = "scroll";
          sheetContents.style.display = "block";
        }
      }
    })
  );

  observer.observe(mainContent, { childList: true });

  return mainContent;
}

function pravila() {
  var contentWh = dialogBuilder("Pravila");
  var newElement = contentWh[0];
  var iks = contentWh[1];
  newElement.parentNode.classList.add("fullscreen");
  iks.addEventListener("click", function (e) {
    $("#homeContainer").show();

    setTimeout(() => {
      hideDialog(newElement);
      document.getElementById("homeContainer").style.animation = "";
    }, 1);
  });
  try {
    dlgFullscreen(newElement.parentNode);
  } catch {}
  newElement.innerHTML = pravilaText;
}
function statistika() {
	
  var contentWh = dialogBuilder("Statistika - " + listOfPlayers["!gameName!"].slice(listOfPlayers["!gameName!"].lastIndexOf("/")+1));
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
  function calculatePlayerScore(gamesPlayed, wins, losses, totalGames) {
    const winPercentage = (wins / gamesPlayed) * 100;
    // Adjust games played weight to penalize fewer games played with a gentler gradient
    const gamesPlayedWeight = ((1 - (gamesPlayed / totalGames)) / 0.5) * 10;
    // Impact of losses
    const lossImpact = (losses / gamesPlayed) * 100;
    // Final score calculation
    const score = winPercentage - gamesPlayedWeight - lossImpact;
    return Math.round(score);
  }
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
      '</p><table style="width: 100%;margin-top:30px;">' +
      text +
      "</table>";
  }
  function findKeysWithMaxValue(obj, keyName, k2) {
    const sortedKeys = Object.keys(obj).sort((a, b) => obj[b][keyName] - obj[a][keyName]);

    var resultStrings;
    
      resultStrings = sortedKeys.map(
        (key) =>
          `<tr style="margin-bottom: -10px "><td>${key}</td><td style='text-align: center'>${obj[key][keyName]}</td></tr>`
      );
    

    return resultStrings.join("");
  }

  for (const key in lit) {
    let lItem = addElement("md-list-item", list, "stat-item");
    lItem.innerHTML ="<span style='font-weight: bold;font-size: larger' slot='start' >" +  parseInt(i + 1) + "." + "</span>" + usr[lit[i]] + " (" + lit[i] + ")";
    i++;
  }

  makeCardItem("ŠTEVILO VSEH IGER", '<tr style="margin-bottom: -10px;font-size:2rem;text-align:center; "><td>'+listOfPlayers["!gamesData!"].length+'</td></tr>');

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
  for (const key in listOfPlayers) {
    if (key == "!gamesData!" || key == "!gameName!") {
      continue;
    }
      const score = calculatePlayerScore(completeData[key]["steviloIgranih"], completeData[key]["steviloZmag"], completeData[key]["steviloIzgub"],listOfPlayers["!gamesData!"].length);
      completeData[key]["steviloProcentov"] = score
  }
  let maxGames = findKeysWithMaxValue(completeData, "steviloIgranih");
  makeCardItem("NAJVEČ ODIGRANIH IGER", maxGames);
  let maxCalls = findKeysWithMaxValue(completeData, "steviloSlepanih");
  makeCardItem("NAJVEČKRAT KLICANI IGRALCI", maxCalls);
  let maxWins = findKeysWithMaxValue(completeData, "steviloZmag", "odstotekZmag");

  makeCardItem("ZMAGE", maxWins);
  let maxLoses = findKeysWithMaxValue(completeData, "steviloIzgub", "odstotekIzgub");
  makeCardItem("PORAZI", maxLoses);
  let percenti = findKeysWithMaxValue(completeData, "steviloProcentov");
  makeCardItem("POVPREČJE (RATING)", percenti);

}

