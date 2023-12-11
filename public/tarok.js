


var games = {
    /* "Ime igre": ["Koliko šteje igra","razlika","dobil true, ni dobil false", "s partnerjem, brez"]*/
    "Tri": [10, true, "", true, "3"],
    "Dve": [20, true, "", true, "2"],
    "Ena": [30, true, "", true, "1"],
    "Solo tri": [40, true, "", false, "S3"],
    "Solo dve": [50, true, "", false, "S2"],
    "Solo ena": [60, true, "", false, "S1"],
    "Solo brez": [80, false, "", false, "SB"],
    "Valat": [250, false, "", true, "V"],
    "Barvni Valat": [125, false, "", true, "BV"],
    "Berač": [70, false, "", false, "B"],
    "Odprti Berač": [90, false, "", false, "OB"],
    "Klop": ["", false, "", true, "K"],
    "Po meri": [0, false, "", true, "+"],
    "Dodaj radlce": ["", false, "", true, "*"],
};
async function addScore(firstPlayer) {

    var iks = addElement("md-icon-button", null, "iksRight");
    iks.innerHTML = showIks;
    var newElement = dialogBuilder(iks, "Oseba <b>" + firstPlayer + "</b> je igrala...")
    iks.addEventListener("click", function (e) {
        hideDialog(newElement);
    });
    let i = 0
    for (const key in games) {
        if (i == 3 || i == 7 || i == 11) addElement("md-divider", newElement, null).style.margin = "5px"
        i++
        let btn = document.createElement("md-outlined-button");
        btn.innerHTML = key;
        btn.style.height = "45px"
        btn.classList.add("gameChose")
        btn.setAttribute("type", "reset")
        var icon = addElement("span", null, "btnIcon")
        icon.setAttribute("slot", "icon")
        icon.innerHTML = games[key][4]
        btn.addEventListener("click", function () {
            newElement.innerHTML = "";
            if (key == "Klop") {
                klop(newElement, key);
            }
            if (key == "Po meri") {
                poMeri(newElement, key);
            } else {
                if (key == "Dodaj radlce") {
                    radlciDodaj(true);
                    hideDialog(newElement);
                } else {
                    calculate(key, games[key], newElement, firstPlayer);
                }
            }
        });
        newElement.appendChild(btn);
    }
    document.body.appendChild(newElement.parentNode);
}

function radlciDodaj(remove) {
    for (const key in listOfPlayers) {
        if (key == "!gamesData!" || key == "!gameName!") {
            continue;
        }
        listOfPlayers[key][0] += "*";
    }
    if (remove) {
        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        count(false);
    }
}
var showIks = '<md-icon>close</md-icon><md-ripple for="touch" class="unbounded"></md-ripple>'

function poMeri(newElement2) {
    hideDialog(newElement2)
    var iks = document.createElement("md-icon-button")
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var newElement = dialogBuilder(iks, "Vpišite toče")
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideDialog(newElement);
    });
    document.body.appendChild(newElement.parentNode)
    var vls = []
    for (const user in listOfPlayers) {
        if (user == "!gamesData!" || user == "!gameName!") {
            continue;
        }
        let player = addElement("md-filled-text-field", newElement, null);
        addElement("div", newElement, "break");
        player.classList.add("poMeri")
        player.type = "number"
        player.innerHTML = user
        player.value = 0
        player.name = 0
        player.label = user
        player.id = "meri_" + user
        vls.push(player)
        player.addEventListener("change", function () {
            player.name = player.value
        })
    }
    var konc = addElement("md-filled-button", newElement, null);
    konc.innerHTML = "Končano"
    konc.setAttribute("type", "reset")
    konc.addEventListener("click", function () {
        var nmbs = []
        var nmbs2 = []
        for (const iterator of vls) {
            nmbs.push(iterator.label)

            nmbs2.push(document.getElementById("meri_" + iterator.label).name)
        }

        /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
            localStorage.offlineChanges = true
        }
        listOfPlayers["!gamesData!"].push(["Po Meri", nmbs, null, nmbs2, false, null, true, [], 0])
        hideDialog(newElement)

        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        count(true);
    })
}
var zaokrožuj = JSON.parse(localStorage.getItem("razlikaOkrozi")) || true
if (zaokrožuj == null || zaokrožuj == undefined) zaokrožuj = true
async function klop(newElement2, gamename) {
    var iks = document.createElement("md-icon-button")
    hideDialog(newElement2);
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var newElement = dialogBuilder(iks, "Ali je bil kdo poln oz. prazen?")
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideDialog(newElement);
    });
    var poln = addElement("md-outlined-button", newElement, null);
    poln.innerHTML = "Poln"
    var prazn = addElement("md-outlined-button", newElement, null);
    prazn.innerHTML = "Prazen"
    var nibil = addElement("md-filled-button", newElement, null);
    nibil.innerHTML = "Ne"
    prazn.setAttribute("type", "reset")
    poln.setAttribute("type", "reset")
    nibil.setAttribute("type", "reset")
    nibil.style.flexBasis = "100%"
    document.body.appendChild(newElement.parentNode);
    poln.addEventListener("click", function () {
        newElement.innerHTML = ""
        changeOpis(newElement, "Izberite kdo je bil poln.")
        for (const user in listOfPlayers) {
            if (user == "!gamesData!" || user == "!gameName!") {
                continue;
            }
            let player = addElement("md-outlined-button", newElement, null);
            player.innerHTML = user
            player.setAttribute("type", "reset")
            player.addEventListener("click", function () {

                /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
                listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
                    localStorage.offlineChanges = true
                }
                listOfPlayers["!gamesData!"].push(["Klop", player.innerHTML, null, 70, listOfPlayers[player.innerHTML][0].length > 0, null, true, [], 0])
                hideDialog(newElement)
                removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

                count(true);
            })
        }
    })
    prazn.addEventListener("click", function () {
        newElement.innerHTML = ""
        changeOpis(newElement, "Izberite kdo je bil prazn.")
        for (const user in listOfPlayers) {
            if (user == "!gamesData!" || user == "!gameName!") {
                continue;
            }
            let player = addElement("md-outlined-button", newElement, null);
            player.innerHTML = user
            player.setAttribute("type", "reset")
            player.addEventListener("click", function () {

                /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
                listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
                    localStorage.offlineChanges = true
                }
                listOfPlayers["!gamesData!"].push(["Klop", player.innerHTML, null, -70, listOfPlayers[player.innerHTML][0].length > 0, null, true, [], 0])
                hideDialog(newElement)
                removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

                count(true);
            })
        }
    })
    await waitForButtonClick([nibil]);
    newElement.innerHTML = ""
    var iks = addElement("div", newElement, "iks");
    iks.innerHTML = showIks;
    iks.addEventListener("click", function (e) {
        hideDialog(newElement);
    });
    var igralci = []
    for (const user in listOfPlayers) {
        if (user == "!gamesData!" || user == "!gameName!") {
            continue;
        }
        let labelname = addElement("label", newElement, null);
        labelname.innerHTML = user
        let klopPlayer = addElement("md-slider", labelname, "klopPlayer");
        klopPlayer.setAttribute("max", "35")
        klopPlayer.setAttribute("min", "0")
        klopPlayer.setAttribute("labeled", "")
        if (zaokrožuj) klopPlayer.setAttribute("step", "5");
        klopPlayer.setAttribute("ticks", "")
        klopPlayer.label = "Tocke osebe " + user;
        igralci.push(user)
        addElement("div", newElement, "break");
    }
    addElement("div", newElement, "break");
    var btn = addElement("md-filled-button", newElement, null);
    btn.innerHTML = "Končano";
    addElement("div", newElement, "break");
    btn.addEventListener("click", function () {
        let isfull = true;
        var plNombers = document.querySelectorAll(".klopPlayer");
        var tockice = []
        for (const pl of plNombers) {

            tockice.push("-" + pl.value)
        }
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
            localStorage.offlineChanges = true
        }
        listOfPlayers["!gamesData!"].push(["Klop", igralci, null, tockice, null, null, null, null])
        radlciDodaj(false)
        if (isfull) {
            hideDialog(newElement)
            removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

            count(true);
        }
    });

}
async function calculate(gameName, properties, newElement, firstPlayer) {
    if (Object.keys(listOfPlayers).length == 5) {
        partner(newElement, gameName, properties, false, firstPlayer);
    } else {
        var btn = addElement("md-filled-button", null, null);
        var teamWork = properties[3];
        // dodajOpis(newElement, "Tukaj izberite ali je oseba <b>" + firstPlayer + "</b> igrala solo ali s partnerjem.",);
        btn.setAttribute("type", "reset")
        var dv = [];
        btn.addEventListener("click", function () {
            this.remove();
            for (let i = 0; i < dv.length; i++) {
                dv[i].remove()
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
                player.innerHTML = user
                dv.push(player)

                player.setAttribute("type", "reset")
                player.addEventListener("click", function () {
                    btn.remove();
                    for (let i = 0; i < dv.length; i++) {
                        dv[i].remove()
                    }
                    partner(newElement, gameName, properties, true, firstPlayer, user);
                })
            }
            btn.innerHTML = "Solo";
            btn.style.flexBasis = "100%"
            newElement.appendChild(btn);

        } else {
            partner(newElement, gameName, properties, false, firstPlayer);
        }
    }
}

function waitForButtonClick(btn) {
    return new Promise((resolve) => {
        for (const button in btn) {
            btn[button].addEventListener('click', function () {
                resolve();
            })
        }
    })
}
async function partner(newElement, gameName, properties, teamWork, firstPlayer, secondPlayer) {
    var slct2 = ""
    if (teamWork && secondPlayer !== null) {
        slct2 = secondPlayer
    }
    changeOpis(newElement, "Izberite razliko")
    var difNu = document.createElement("md-slider");
    var razlika = 0;
    if (!zaokrožuj) {

        difNu.setAttribute("labeled", "")
        if (properties[1]) {
            difNu.min = 0;
            difNu.value = 0
            difNu.label = "Razlika";
            difNu.max = 35;
            difNu.style.marginTop = "10px"
            newElement.appendChild(difNu);
            addElement("div", newElement, "break");
            let endButton = addElement("md-filled-button", newElement, null);
            endButton.innerHTML = "Končano"
            endButton.setAttribute("type", "reset")
            difNu.addEventListener("change", function () {
                razlika = difNu.value;

            })
            await waitForButtonClick([endButton]);
            newElement.innerHTML = ""
        }
    } else {
        if (properties[1]) {
            var razlike = [0, 5, 10, 15, 20, 25, 30, 35]
            var dv = [];
            addElement("div", newElement, "break");
            for (const element in razlike) {
                let player = addElement("md-outlined-button", newElement, null);
                player.innerHTML = razlike[element]
                dv.push(player)
                player.setAttribute("type", "reset")
                player.addEventListener("click", function () {
                    difNu.value = player.innerHTML
                    razlika = player.innerHTML
                    player.remove();
                    newElement.innerHTML = ""
                })
            }
            await waitForButtonClick(dv);
        }
    }
    var btn22 = addElement("md-filled-button", null, null);
    var btn23 = addElement("md-filled-tonal-button", null, null);
    btn22.style.height = btn23.style.height = "50px";
    btn22.style.flexBasis = btn23.style.flexBasis = "100%"
    addElement("div", newElement, "break");
    addElement("div", newElement, "break");
    btn22.innerHTML = "Zmaga";
    btn23.innerHTML = "Poraz";
    addElement("div", newElement, "break");
    var bonusi = {
        /* "Ime igre": ["Koliko šteje igra","razlika","dobil true, ni dobil false", "s partnerjem, brez"]*/
        Trula: [10, 20, null, false, false],
        Kralji: [10, 20, null, false, false],
        "Pagat ultimo": [25, 50, null, false, false],
        "Kralj ultimo": [10, 20, null, false, false],
    };
    var bonusTocke = 0;
    if (!teamWork) {
        slct2 = "partnerigralcakimuniimenic"
        changeOpis(newElement, "Izberite morebitne bonuse in pritisnite 'Zmaga' ali 'Poraz'. Igrala je oseba " + firstPlayer + ", z razliko " + razlika + ".")
    } else {
        changeOpis(newElement, "Izberite morebitne bonuse in pritisnite 'Zmaga' ali 'Poraz'. Igrali sta osebi " + firstPlayer + " in " + slct2 + ", z razliko " + razlika + ".")
    }
    if (properties[1]) {
        for (const key in bonusi) {
            let btn = document.createElement("md-outlined-button");
            btn.innerHTML = key;
            btn.style.transition = " all .2s";
            btn.style.height = "45px";
            btn.setAttribute("type", "reset")
            btn.addEventListener("click", function () {
                newElement.parentNode.close()
                var iks = document.createElement("md-icon-button")
                iks.setAttribute("value", "close")
                iks.classList.add("iksRight")
                iks.innerHTML = showIks;
                var bonusDialog = dialogBuilder(iks, "Izberite")
                document.body.appendChild(bonusDialog.parentNode)
                iks.addEventListener("click", function (e) {
                    newElement.parentNode.show()
                    hideDialog(bonusDialog)
                });
                addElement("div", bonusDialog, "break");
                var napovedanboolean = true;
                var dobil = true;
                let ninapoved = addElement("md-outlined-button", bonusDialog, null);
                ninapoved.setAttribute("type", "reset")
                let napovedano = addElement("md-filled-button", bonusDialog, null);
                napovedano.innerHTML = "Napovedano";
                napovedano.setAttribute("type", "reset")
                ninapoved.addEventListener("click", function () {
                    napovedanboolean = false;
                    napovedano.click();
                });
                ninapoved.innerHTML = "Ne napovedano";
                napovedano.addEventListener("click", function () {
                    bonusDialog.innerHTML = "";

                    let izgubil = addElement("md-outlined-button", bonusDialog, null);
                    izgubil.innerHTML = "Izgubljeno";
                    izgubil.addEventListener("click", function () {
                        dobil = false;
                        zmagal.click();
                    });
                    let zmagal = addElement("md-filled-button", bonusDialog, null);
                    zmagal.innerHTML = "Dobljeno";
                    zmagal.addEventListener("click", function () {
                        if (dobil) {
                            bonusi[key][2] = true;
                        } else {
                            bonusi[key][2] = false;
                        }
                        if (napovedanboolean) {
                            bonusi[key][3] = true;
                        } else {
                            bonusi[key][3] = false;
                        }
                        hideDialog(bonusDialog)

                        newElement.parentNode.show()

                    });
                });
            });
            newElement.appendChild(btn);
        }
    }
    //addElement("div", newElement, "break");
    newElement.appendChild(btn23);
    newElement.appendChild(btn22);
    razlika = Math.abs(razlika)
    btn22.addEventListener("click", function () {
        let bnsi = {} /*  "ime bonus": [tocke, napovedan, doblen]  */
        for (const key in bonusi) {
            if (bonusi[key][2] !== null) {
                if (bonusi[key][2]) {
                    if (bonusi[key][3]) {
                        bnsi[key] = [bonusi[key][1], true, true]
                        bonusTocke += bonusi[key][1];
                    } else {
                        bnsi[key] = [bonusi[key][0], false, true]
                        bonusTocke += bonusi[key][0];
                    }
                } else {
                    if (bonusi[key][3]) {
                        bnsi[key] = [-Math.abs(bonusi[key][1]), true, false]
                        bonusTocke -= bonusi[key][1];
                    } else {
                        bnsi[key] = [-Math.abs(bonusi[key][0]), false, false]
                        bonusTocke -= bonusi[key][0];
                    }
                }
            }
        }
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
            localStorage.offlineChanges = true
        }
        if (slct2 !== "" || teamWork) {
            this.remove();
            if (properties[1]) {
                if (teamWork) {
                    listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, parseInt(properties[0]) + parseInt(razlika) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), true, bnsi, bonusTocke])
                } else {
                    listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, parseInt(properties[0]) + parseInt(razlika) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), true, bnsi, bonusTocke])
                }
            } else {
                if (teamWork) {
                    listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, parseInt(properties[0] + bonusTocke), listOfPlayers[firstPlayer][0].length > 0, null, true, bnsi, bonusTocke])
                } else {
                    listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, parseInt(properties[0] + bonusTocke), listOfPlayers[firstPlayer][0].length > 0, null, true, bnsi, bonusTocke])
                }
            }
        }
        if (listOfPlayers["!gamesData!"].slice(-1)[0][3] > 0 && listOfPlayers[firstPlayer][0].length > 0) {
            listOfPlayers[firstPlayer][0] = listOfPlayers[firstPlayer][0].replace("*", "");

        }
        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        hideDialog(newElement);
        if (gameName.includes('Valat') || gameName.includes('Berač')) {
            radlciDodaj(false)
        }

        count(true);
    });
    btn23.addEventListener("click", function () {
        let bnsi = {} /*  "ime bonus": [tocke, napovedan, doblen]  */
        for (const key in bonusi) {
            if (bonusi[key][2] !== null) {
                if (bonusi[key][2]) {
                    if (bonusi[key][3]) {
                        bnsi[key] = [bonusi[key][1], true, true]
                        bonusTocke += bonusi[key][1];
                    } else {
                        bnsi[key] = [bonusi[key][0], false, true]
                        bonusTocke += bonusi[key][0];
                    }
                } else {
                    if (bonusi[key][3]) {
                        bnsi[key] = [-Math.abs(bonusi[key][0]), true, false]
                        bonusTocke -= bonusi[key][1];
                    } else {
                        bnsi[key] = [-Math.abs(bonusi[key][0]), false, false]
                        bonusTocke -= bonusi[key][0];
                    }
                }
            }
        }
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
            localStorage.offlineChanges = true
        }
        if (properties[1]) {
            if (teamWork) {
                listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, -Math.abs(parseInt(properties[0]) + parseInt(razlika)) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), false, bnsi, bonusTocke])
            } else {
                listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, -Math.abs(parseInt(properties[0]) + parseInt(razlika)) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), false, bnsi, bonusTocke])
            }
        } else {
            if (teamWork) {
                listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, -Math.abs(parseInt(properties[0])) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, null, false, bnsi, bonusTocke])
            } else {
                listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, -Math.abs(parseInt(properties[0])) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, null, false, bnsi, bonusTocke])
            }
        }
        if (listOfPlayers["!gamesData!"].slice(-1)[0][3] > 0 && listOfPlayers[firstPlayer][0].length > 0) {
            listOfPlayers[firstPlayer][0] = listOfPlayers[firstPlayer][0].replace("*", "");

        }
        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        hideDialog(newElement);
        if (gameName.includes('Valat') || gameName.includes('Berač')) {
            radlciDodaj(false)
        }


        count(true);
    })
}

function download() {
    var text = JSON.stringify(listOfPlayers);
    // if (localStorage.uid !== null && localStorage.uid !== undefined && localStorage.uid !== 'null') {
    var result = "https://tarock-counter.web.app/" + encodeURIComponent('users/' + localStorage.uid + "/games/" + listOfPlayers["!gameName!"]);


    console.log(result);

    var iks = document.createElement("md-icon-button")
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var newElement = dialogBuilder(iks, "Povabi v skupino")


    document.body.appendChild(newElement.parentNode)
    iks.addEventListener("click", function (e) {

        hideDialog(newElement);
    });


    var shareButton = document.createElement("md-filled-button");
    shareButton.innerHTML = "Deli";
    var copyButton = document.createElement("md-filled-button");
    copyButton.innerHTML = "Kopiraj";
    newElement.appendChild(copyButton);
    newElement.appendChild(shareButton);
    shareButton.addEventListener("click", function () {
        try {
            if (navigator.userAgent.includes("wv")) {
                Android.share(result);
            } else {
                if (navigator.share) {
                    navigator.share({
                        title: 'Tarok igra',
                        text: 'Deli to igro s prijatelji.',
                        url: result,
                    })
                        .then(() => console.log('Error sharing', error))
                        .catch((error) => console.log('Error sharing', error))
                }
            }
        } catch (error) {

        }
    });
    copyButton.addEventListener("click", function () {
        try {
            var copyText = document.createElement("input");
            copyText.value = result;
            document.body.appendChild(copyText);
            copyText.style.display = "none"
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);
        } catch (error) {

        }
    });
    // }
}

function deleteAllData() {
    var iks = document.createElement("md-icon-button")
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var newElement = dialogBuilder(iks, "Izbris")
    newElement.innerHTML += "Ali res želite izbrisati vse svoje podatke? Tega dejanja ni mogoče razveljaviti."
    document.body.appendChild(newElement.parentNode)
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideDialog(newElement);
    });

    var shareButton = document.createElement("md-filled-button");
    shareButton.innerHTML = "Da";
    var copyButton = document.createElement("md-filled-button");
    copyButton.innerHTML = "Ne";
    newElement.appendChild(copyButton);
    newElement.appendChild(shareButton);
    shareButton.addEventListener("click", function () {
        deleteAllDataF()
        hideDialog(newElement);
    });
    copyButton.addEventListener("click", function () {
        hideDialog(newElement);
    });
}

async function upload() {

    if (localStorage.uid !== null && localStorage.uid !== undefined && localStorage.uid !== 'null' && navigator.onLine) {
        try {
            var text = decodeURIComponent(location.pathname.slice(1));
            var gameContent = await loadDataPath(text)
            if (text.includes(localStorage.uid)) {
                dlgNotif("Ta skupina je vaša.")
                window.history.pushState({}, document.title, "/" + "");
            } else {
                // window.location.href = location.host
                var iks = document.createElement("md-icon-button")
                iks.setAttribute("value", "close")
                iks.classList.add("iksRight")
                iks.innerHTML = showIks;
                var newElement = dialogBuilder(iks, "Ali želite uvoziti igro '" + gameContent["!gameName!"] + "' z igralci " + JSON.stringify(Object.keys(gameContent).filter((key) => key !== "!gamesData!" && key !== "!gameName!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", ") + "?")
                gameContent["!gameName!"] = text
                window.history.pushState({}, document.title, "/" + "");
                document.body.appendChild(newElement.parentNode)
                iks.addEventListener("click", function (e) {
                    document.getElementById("game").style.animation = "none";
                    hideDialog(newElement);
                });

                var shareButton = document.createElement("md-filled-button");
                shareButton.innerHTML = "Da";
                var copyButton = document.createElement("md-filled-button");
                copyButton.innerHTML = "Ne";
                newElement.appendChild(copyButton);
                newElement.appendChild(shareButton);
                shareButton.addEventListener("click", function () {
                    const gamesObject = JSON.parse(localStorage.getItem('games')) || {};
                    gamesObject["/" + gameContent["!gameName!"]] = gameContent;
                    localStorage.setItem("games", JSON.stringify(gamesObject));
                    updateUserData()
                    hideDialog(newElement);
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
            dlgNotif("Za dostop do skupinske igre morate biti prijavljeni in imeti internetno povezavo.")
            window.history.pushState({}, document.title, "/" + "");
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
    dlg.parentNode.querySelector('[slot="headline"]').getElementsByTagName("span")[0].innerHTML = desc;
}

function dialogBuilder(xButt, desc) {
    var newElement = document.createElement("md-dialog");
    newElement.setAttribute("open", "");

    if (queryAnim) {
        newElement.getOpenAnimation().dialog = [[[{
            "opacity": "0"
        }, {

            "opacity": "1"
        }], {
            "duration": 10,
            "easing": "cubic-bezier(.3,.5,0,1.3)"
        }]]
        newElement.getOpenAnimation().content = [[[{
            "opacity": "0"
        }, {

            "opacity": "1"
        }], {
            "duration": 100,
            "easing": "cubic-bezier(.3,.5,0,1)",
            "fill": "forwards"
        }]]
        newElement.getCloseAnimation().dialog = [[[{

            "opacity": "1"
        }, {

            "opacity": "0"
        }], {
            "duration": 100,
            "easing": "cubic-bezier(.3,.5,0,1.0)"
        }]]
        newElement.getCloseAnimation().content = [[[{
            "opacity": "1"
        }, {

            "opacity": "0"
        }], {
            "duration": 100,
            "easing": "linear",
            "fill": "forwards"
        }]]
        newElement.getCloseAnimation().scrim = [[[{
            "opacity": "0.32"
        }, {
            "opacity": "0"
        }], {
            "duration": 50,
            "easing": "linear",
            "fill": "forwards"
        }]]
        newElement.getOpenAnimation().scrim = [[[{
            "opacity": "0"
        }, {
            "opacity": "0.32"
        }], {
            "duration": 50,
            "easing": "linear",
            "fill": "forwards"
        }]]
    } else {
        newElement.getOpenAnimation().dialog = [[[{
            "transform": "scale(0)"
        }, {
            "transform": "scale(1)"
        }], {
            "duration": 500,
            "easing": "cubic-bezier(.3,.5,0,1.3)"
        }]]
        newElement.getOpenAnimation().content = [[[{
            "transform": "scale(0)",
            "overflow": "hidden"
        }, {
            "overflow": "scroll",
            "transform": "scale(1)"
        }], {
            "duration": 500,
            "easing": "cubic-bezier(.3,.5,0,1)",
            "fill": "forwards"
        }]]
        newElement.getCloseAnimation().dialog = [[[{
            "transform": "scale(1)",
            "opacity": "1"
        }, {
            "transform": "scale(0)",
            "opacity": "0"
        }], {
            "duration": 500,
            "easing": "cubic-bezier(.3,.5,0,1.0)"
        }]]
        newElement.getCloseAnimation().content = [[[{
            "transform": "scale(1)"
        }, {
            "transform": "scale(0)"
        }], {
            "duration": 500,
            "easing": "linear",
            "fill": "forwards"
        }]]
        newElement.getCloseAnimation().scrim = [[[{
            "opacity": ".32"
        }, {
            "opacity": "0"
        }], {
            "duration": 400,
            "easing": "linear",
            "fill": "forwards"
        }]]
        newElement.getOpenAnimation().scrim = [[[{
            "opacity": "0"
        }, {
            "opacity": "0.32"
        }], {
            "duration": 500,
            "easing": "linear",
            "fill": "forwards"
        }]]
    }
    var xHolder = addElement("span", newElement, null);
    xHolder.setAttribute("slot", "headline")
    xHolder.setAttribute("class", "dialog-headline")
    xHolder.innerHTML = '<span style="flex: .83;">' + desc + '</span>'
    var help = addElement("md-icon-button", xHolder, "iksRight")
    help.innerHTML = "<md-icon>help</md-icon>"
    help.style.right = "50px"
    help.addEventListener("click", function () { helpMe() })
    if (xButt !== null) {
        xHolder.appendChild(xButt)
    }
    var content = addElement("form", newElement, null);
    content.setAttribute("slot", "content")

    content.setAttribute("method", "dialog")
    return content
}

function Game() {
    var iks = document.createElement("md-icon-button")
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var dialog = dialogBuilder(iks, "Izberite igro")
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideDialog(dialog);
    });
    dialog.id = "dlgSlct"
    var slct = document.createElement("md-list");
    var slct2 = document.createElement("md-list");
    dialog.style.borderRadius = "15px"

    const gamesObject = JSON.parse(localStorage.getItem('games')) || {};

    for (var i = 0; i < Object.keys(gamesObject).length; i++) {
        let user = Object.keys(gamesObject)[i];
        let full = user

        if (user.includes("/users/")) {
            user = user.slice(user.lastIndexOf("/") + 1)
            if (user !== "!gamesData!" || user !== "!gameName!") {
                if (slct2.getElementsByTagName("md-list-item").length > 0) {
                    slct2.innerHTML += '<md-divider style="--_color: var(--md-sys-color-surface-container-high);height: 5px;"></md-divider><md-list-item type="button" onclick=" clickedUser(\'' + user + '\',\'' + full + '\');" interactive>' + user + "</md-list-item> ";
                } else {
                    slct2.innerHTML += '<md-list-item type="button" onclick=" clickedUser(\'' + user + '\',\'' + full + '\');" interactive>' + user + "</md-list-item>";
                }

            }
        } else {

            if (user !== "!gamesData!" || user !== "!gameName!") {
                if (slct.getElementsByTagName("md-list-item").length > 0) {
                    slct.innerHTML += '<md-divider style="--_color: var(--md-sys-color-surface-container-high);height: 5px;"></md-divider><md-list-item type="button" onclick=" clickedUser(\'' + user + '\',\'' + full + '\');" interactive>' + user + "</md-list-item> ";
                } else {
                    slct.innerHTML += '<md-list-item type="button" onclick=" clickedUser(\'' + user + '\',\'' + full + '\');" interactive>' + user + "</md-list-item>";
                }

            }
        }
    }
    var pTxt = document.createElement("p")
    var pTxt2 = document.createElement("p")
    if (slct.getElementsByTagName("md-list-item").length !== 0) { pTxt2.innerHTML = "Zasebne igre"; dialog.appendChild(pTxt2); dialog.appendChild(slct); }

    if (slct2.getElementsByTagName("md-list-item").length !== 0) { pTxt.innerHTML = "Skupne igre"; dialog.appendChild(pTxt); dialog.appendChild(slct2); }

    document.body.appendChild(dialog.parentNode);
}

function hideDialog(dlg) {

    dlg.parentNode.close()
    if (queryAnim) { dlg.parentNode.remove() } else {
        setTimeout(() => {
            dlg.parentNode.remove()
        }, 350);
    }
}





async function clickedUser(slcta, full) {
    if (slcta !== full) {
        if (navigator.onLine) {

            try {

                listOfPlayers = await loadDataPath(full)
                listOfPlayers["!gameName!"] = full
            } catch {
                dlgNotif("Zgodila se je napaka. Skupna igra je mogoče bila izbrisana ali pa trenutno ni dostopna.")

                const gamesObject = JSON.parse(localStorage.getItem('games')) || {};
                delete gamesObject[full]
                localStorage.setItem("games", JSON.stringify(gamesObject));
                updateUserData()
                document.body.appendChild(content.parentNode)
            }

        } else {
            dlgNotif("Brez internetne povezave ne morete dostopati do skupne igre.")
        }

    } else {
        const gamesObject2 = JSON.parse(localStorage.getItem('games')) || {};
        listOfPlayers = gamesObject2[slcta];
    }
    hideDialog(document.getElementById("dlgSlct"))
    if (listOfPlayers["!gamesData!"] == null) {
        listOfPlayers["!gamesData!"] = [];
    }
    if (listOfPlayers["!gameName!"].includes("/users/")) {
        updateSharedRemote()
        count(true);
    } else {
        count(true);
    }
}
function dlgNotif(msg) {
    var iks = addElement("md-icon-button", null, "iksColor");
    iks.setAttribute("value", "close")
    iks.innerHTML = showIks;
    iks.classList.add("iksRight")
    var content = dialogBuilder(iks, "Napaka")
    iks.addEventListener("click", function (e) {
        hideDialog(content);
    });
    content.innerHTML = msg
    document.body.appendChild(content.parentNode)
}

function undo() {
    if (listOfPlayersCopy.length > 0) {
        listOfPlayers = JSON.parse(listOfPlayersCopy[listOfPlayersCopy.length - 1]);
        listOfPlayersCopy.pop();
        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        count(true, false);
    }

    if (listOfPlayersCopy.length == 0) {
        document.querySelector(".undoBtn").disabled = true
    }
}

var listOfPlayers = {};
var listOfPlayersCopy = [];

function newGame() {
    var iks = addElement("md-icon-button", null, "iksColor");
    iks.setAttribute("value", "close")
    iks.innerHTML = showIks;
    iks.classList.add("iksRight")
    var content = dialogBuilder(iks, "Vpišite igralce")
    iks.addEventListener("click", function (e) {
        hideDialog(content);
    });
    var endHolder = addElement("div", content.parentNode, null)
    endHolder.setAttribute("slot", "actions")
    var onePl = document.createElement("md-outlined-text-field");
    var newPl = document.createElement("md-text-button");
    var endPl = document.createElement("md-filled-tonal-button");
    newPl.setAttribute("id", "addPlayer");
    newPl.setAttribute("slot", "content")
    newPl.style.margin = endPl.style.margin = "0"
    newPl.innerHTML = "Dodaj igralca";
    onePl.style.marginBottom = "10px"
    onePl.label = "Ime";
    onePl.setAttribute("slot", "content")
    endPl.innerHTML = "Naprej";
    content.appendChild(onePl);
    onePl.focus();
    let lnbrk = addElement("div", content, "break");
    lnbrk.setAttribute("slot", "content")
    endHolder.appendChild(newPl);
    endHolder.appendChild(endPl);
    document.body.appendChild(content.parentNode);
    newPl.addEventListener("click", function () {
        let onePl2 = addElement("md-outlined-text-field", content, null);
        onePl2.label = "Ime";
        onePl2.style.marginBottom = "10px"
        content.appendChild(onePl2);
        onePl2.focus;
    });
    endPl.addEventListener("click", async function () {
        for (var i = 0; i < document.getElementsByTagName("md-outlined-text-field").length; i++) {
            let input = document.getElementsByTagName("md-outlined-text-field")[i].value;
            listOfPlayers[input] = [""];
        }
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
            localStorage.offlineChanges = true
        };
        content.innerHTML = ""
        newPl.remove()
        endPl.remove()
        listOfPlayers["!gamesData!"] = [];

        changeOpis(content, "Vpišite vzdevek skupine")
        var imeIgre = document.createElement("md-filled-text-field");
        var koncajIme = document.createElement("md-filled-tonal-button");
        imeIgre.label = "Ime igre"
        imeIgre.value = JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").split(",").sort().toString().replace(/,/g, ", ")
        koncajIme.innerHTML = "Končano"
        content.appendChild(imeIgre)
        endHolder.appendChild(koncajIme)
        await waitForButtonClick([koncajIme])
        listOfPlayers["!gameName!"] = imeIgre.value;
        if (!navigator.onLine) {
            localStorage.offlineChanges = true
        }
        hideDialog(content);
        count(true);
    });
}

function loclStrg() {
    var inputPr = prompt("Input")
    var data = JSON.parse(inputPr.toString());
    for (const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, value)
    };
}

function count(animate, undoed) {
    if (listOfPlayers["!gamesData!"] == null) {
        listOfPlayers["!gamesData!"] = [];
    }
    console.log("count");
    if (listOfPlayersCopy.length > 0) {
        document.querySelector(".undoBtn").disabled = false
    }
    if (listOfPlayers["!gameName!"].includes("/users/")) {
        document.querySelector(".shrBtn").disabled = true
        if (document.getElementById("clck").label !== "yes") {
            document.getElementById("clck").addEventListener("click", function () {
                dlgNotif("Da povabite nekoga v igro morate biti lastnik igre.")
            })
            document.getElementById("clck").label = "yes"
        }


        document.querySelector(".dltBtn").innerHTML = "<md-icon>close</md-icon>"
    } else {
        document.querySelector(".shrBtn").disabled = false
        document.querySelector(".dltBtn").innerHTML = "<md-icon>delete</md-icon>"
    }
    if (localStorage.uid == null || localStorage.uid == undefined || localStorage.uid == "null" || localStorage.uid == "undefined" || !navigator.onLine) {

        if (document.getElementById("clck").label !== "yes") {
            document.getElementById("clck").addEventListener("click", function () {
                dlgNotif("Da povabite nekoga v igro morate biti prijavljeni in imeti internetno povezavo.")
            })
            document.getElementById("clck").label = "yes"
        }
        document.querySelector(".shrBtn").disabled = true
    }
    document.getElementById("actionBar").style.display = "flex"
    document.getElementById("homeContainer").style.display = "none"
    const gamesObject = JSON.parse(localStorage.getItem('games')) || {};
    gamesObject[listOfPlayers["!gameName!"]] = listOfPlayers;


    localStorage.setItem("games", JSON.stringify(gamesObject));
    updateUserData()
    localStorage.removeItem(undefined)
    var newElement = addElement("div", document.body, "cntScreen");
    newElement.id = "cntScreen"
    if (animate) {
        newElement.style.animation = "showScreen var(--transDur) forwards cubic-bezier(.3,.5,0,1.3)"
    }
    var rezultLine = document.createElement("div");
    rezultLine.id = "crezultLine"
    for (const key in listOfPlayers) {
        if (key == "!gamesData!" || key == "!gameName!") {
            continue;
        }
        let name = key
        var chl = document.createElement("div");
        var prnt = document.createElement("div");
        prnt.innerHTML = '<p class="namePlayers"> ' + listOfPlayers[key][0] + "<br>" + name + " </p>";
        chl.innerHTML = String(chl.innerHTML).replace("undefined", "");
        chl.innerHTML += '<p style = "" class="noText" ></p>';
        chl.innerHTML += ' <p style = "" class="noText" ></p>';
        chl.setAttribute("class", "chl chlName_" + name);
        prnt.innerHTML += '<md-ripple style="z-index:303030; position:absolute;"></md-ripple>'
        chl.style.display = "inline-block;";
        var pointView = addElement("p", rezultLine, null)
        pointView.setAttribute("class", "rezult_" + name);
        pointView.setAttribute("style", "flex: 1; color: var(--colorTxtDialog); background-color:var(--colorDialog); padding-top: 15px; padding-bottom: 15px; border-top-left-radius: 30px; border-top-right-radius: 30px; margin-left:10px;margin-right:10px;")
        pointView.innerHTML = ""
        pointView.addEventListener("click", function () {
            addScore(name)
        })
        prnt.setAttribute("class", "prnt prntName_" + name);
        prnt.addEventListener("click", function () {
            if (!event.target.className.includes("word")) {
                addScore(name)
            }
        })
        prnt.appendChild(chl);
        newElement.appendChild(prnt);
    }
    var stGame = 0
    let pointsList = {}
    document.body.appendChild(newElement);
    for (const key in listOfPlayers) {
        if (key == "!gamesData!" || key == "!gameName!") {
            continue
        } else {
            pointsList[key] = parseInt(0)
        }
    }
    for (var ia = 0; ia < listOfPlayers["!gamesData!"].length; ia++) {
        let game = ia

        if (listOfPlayers["!gamesData!"][game] == null) continue
        let nameOne = listOfPlayers["!gamesData!"][game][1]
        let points = listOfPlayers["!gamesData!"][game][3]
        if (!Array.isArray(nameOne)) {
            const set = new Set([nameOne]);
            nameOne = Array.from(set);
        }
        if (!Array.isArray(points)) {
            const set = new Set([points]);
            points = Array.from(set);
            points.push(points[0])
        }
        for (const player of nameOne) {
            let playerPoints = points[nameOne.indexOf(player)]
            var kkk = document.createElement("md-text-button");
            if (playerPoints !== "") {
                if (listOfPlayers["!gamesData!"][game][4]) {
                    playerPoints = parseInt(playerPoints) * 2;
                    kkk.innerHTML = parseInt(playerPoints);
                } else {
                    kkk.innerHTML = parseInt(playerPoints)
                }
            }
            document.querySelector(".chlName_" + player).appendChild(kkk);
            kkk.style.marginTop = "-10px";
            kkk.style.fontSize = "1rem";



            if (listOfPlayers["!gamesData!"][game][4] && listOfPlayers["!gamesData!"][game][1][0] == player) {
                kkk.innerHTML = kkk.innerHTML + "*";
            }
            // kkk.setAttribute("onclick", 'gameData("' + stGame + '")');
            kkk.classList.add("word_" + stGame);
            if (playerPoints !== "") {
                pointsList[player] = pointsList[player] + parseInt(playerPoints)
            }
            if (kkk.innerHTML !== "&bbsp;") {
                kkk.addEventListener("click", function () {
                    gameData(event.target.getAttribute("class").slice(5), stGame);
                });
            }
            if (playerPoints == "") {
                kkk.innerHTML = "&nbsp;"
            }

            addElement("div", document.querySelector(".chlName_" + player), "break");
        }
        for (const key in listOfPlayers) {
            if (nameOne.includes(key) || key == "!gamesData!" || key == "!gameName!") {
                continue
            } else {
                var kkk = document.createElement("md-text-button");
                kkk.style.marginTop = "-10px";
                kkk.innerHTML = "&nbsp;";
                document.querySelector(".chlName_" + key).appendChild(kkk);
                kkk.disabled = true
                kkk.classList.add("noText");
                addElement("div", document.querySelector(".chlName_" + key), "break")

            }
        }
        stGame++
    }
    let names = document.querySelectorAll(".namePlayers");
    let maxHeight = [...names].reduce((max, name) => Math.max(max, name.clientHeight), 0);
    names.forEach(name => {
        name.style.height = maxHeight + "px";
    });
    try {
        var subCatContainer = $(".chl");
        document.getElementsByClassName("chl")[0].scrollTop = 1
        document.getElementsByClassName("chl")[0].scrollTop = 0
        subCatContainer.scroll(function () {
            let boxShadow = ""; // Initialize an empty string for the box shadow
            if (Math.round(subCatContainer.scrollTop()) !== 0) {
                boxShadow += "15px 15px ";
            } else {
                boxShadow += "30px 30px ";
            }
            if (Math.round(subCatContainer.scrollTop()) !== (subCatContainer.prop('scrollHeight') - subCatContainer.prop('offsetHeight'))) {
                boxShadow += "15px 15px";
            } else {
                boxShadow += "30px 30px";
            }
            subCatContainer.css("border-radius", boxShadow);
        });
        subCatContainer.scroll(function () {
            subCatContainer.scrollTop($(this).scrollTop());
        });
    } catch { }
    rezultLine.setAttribute("class", "crezultLine");
    document.getElementById("bottomBar").insertBefore(rezultLine, document.getElementById("actionBar"));
    for (const key in listOfPlayers) {

        if (key == "!gamesData!" || key == "!gameName!") {
            continue
        }
        document.querySelector(".rezult_" + key).innerHTML = pointsList[key]
    }
}


function addElement(tag, parent, className) {

    var element = document.createElement(tag);
    if (className !== null) {
        element.classList.add(className);
    }
    if (parent !== null) {
        parent.appendChild(element);
    }
    return element;
}
var completePodatki = {}

function gameData(infom, number) {
    /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
    var info = listOfPlayers["!gamesData!"][parseInt(infom)];

    var newElement = dialogBuilder(null, "Tukaj lahko vidite podatke o igri in jih spremenite");
    document.body.appendChild(newElement.parentNode)
    if (info[0] !== "Po meri" && info[0] !== "Klop") {
        var changeValue = document.createElement("md-outlined-text-field");
        changeValue.type = "number";
        if (info[4]) {
            changeValue.value = info[3] * 2
        } else {
            changeValue.value = info[3];
        }
        changeValue.label = "Točke";
        newElement.appendChild(changeValue);
    }
    var table = addElement("table", null, "gameData");
    var podatki = ["Igra", "Igralec", "Partner", "Točke", "Radlc", "Razlika", "Uspeh", "Bonusi", "Bonus Točke"];
    table.style.marginBottom = " 10px"
    for (let i = 0; i < podatki.length; i++) {
        var key = podatki[i];
        let value = info[i];
        if (i == 0 && value !== "Po Meri") {

            completePodatki[key] = [i, value, games[value.toString()][0]]
        } else {

            if (value == "Po Meri") {
                completePodatki[key] = [i, value], "Različno"
            } else {
                completePodatki[key] = [i, value]
            }
        }
    }
    console.log(completePodatki);
    var vrstniRed = [0, 5, 8, 4, 3]

    function createTableData(element, element1, data) {
        let tdVelk = addElement("tr", table, "gameTdDiv");

        if (data == "Točke") {
            tdVelk.style.transform = " translateY(10px)";
            element = "" + element.toString().replace("+", "")
        }
        let td1 = addElement("td", tdVelk, "gameDataTd");
        td1.innerHTML = element1;
        let td = addElement("td", tdVelk, "gameDataTdBottom");
        td.innerHTML = element;
    }
    for (let i = 0; i < 5; i++) {
        let data = 0
        for (const key in completePodatki) {
            if (completePodatki[key][0] == vrstniRed[i])
                data = key
        }
        let element1 = data;
        let element = completePodatki[data][1];
        if (element == null || element == 0) {
            continue
        }
        if (completePodatki["Radlc"][1] && data == "Točke") {
            element = element * 2
        }
        if (data == "Radlc") {
            if (completePodatki["Radlc"][1]) {
                element = completePodatki["Točke"][1];
            } else {
                if (!info[6]) {
                    element = "-" + element
                }
                continue
            }
        }

        if (data == "Igra") {
            element1 = data + " " + completePodatki[data][1].toLowerCase();
            if (element1.includes("po meri") || element1.includes("klop")) {
                if (element1.includes("po meri")) { createTableData("", "Po meri") } else {
                    createTableData("", "Klop")
                }
                if (typeof completePodatki["Igralec"][1] == "string") completePodatki["Igralec"][1] = completePodatki["Igralec"][1].split(",")
                console.log(completePodatki["Igralec"]);
                if (typeof completePodatki["Točke"][1] == "number") completePodatki["Točke"][1] = completePodatki["Točke"][1].toString().split(",")
                for (let ina = 0; ina < completePodatki["Igralec"][1].length; ina++) {
                    const element = completePodatki["Igralec"][1][ina];
                    if (completePodatki["Radlc"][1]) { createTableData(completePodatki["Točke"][1][ina] * 2, element) } else {
                        createTableData(completePodatki["Točke"][1][ina], element)
                    }


                }
                continue

            } else {
                element = completePodatki[data][2];
            }

        }
        if (data == "Bonus Točke") {
            let bonusObject = completePodatki["Bonusi"][1]
            for (const key in completePodatki["Bonusi"][1]) {
                if (bonusObject[key][1]) {
                    createTableData(bonusObject[key][0], "Napovedano: <wbr>" + key, data)
                    continue;
                } else {
                    createTableData(bonusObject[key][0], key, data)
                    continue;
                }
            }
        } else {
            if (!info[6]) {
                if (!element.toString().includes("-")) {
                    element = "-" + element
                }
            } else {
                element = "+" + element
            }
        }
        if (data == "Bonus Točke" && Object.keys(completePodatki["Bonusi"][1]).length == 0) {
            createTableData(element, element1, data)
        }
        if (data !== "Bonus Točke" && !completePodatki["Igra"][1].toLowerCase().includes("po meri") && !completePodatki["Igra"][1].toLowerCase().includes("klop")) {
            createTableData(element, element1, data)
        }
    }
    newElement.appendChild(table);
    addElement("div", newElement, "break");
    var actionsHold = addElement("span", newElement.parentNode, null)
    actionsHold.setAttribute("slot", "actions")
    var izbrisiIgro = document.createElement("md-outlined-button");
    izbrisiIgro.innerHTML = ' <svg slot="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> Izbriši';
    actionsHold.appendChild(izbrisiIgro);
    izbrisiIgro.style.margin = "0"
    izbrisiIgro.addEventListener("click", function (e) {
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
            localStorage.offlineChanges = true
        }
        listOfPlayers["!gamesData!"].splice(infom, 1);
        const keys = Object.keys(listOfPlayers["!gamesData!"]);
        keys.sort((a, b) => a - b);
        const gamesObject = JSON.parse(localStorage.getItem('games')) || {};
        gamesObject[listOfPlayers["!gameName!"]] = listOfPlayers
        localStorage.setItem("games", JSON.stringify(gamesObject));
        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        updateUserData()
        hideDialog(newElement);
        count(true);
    })
    var iks = document.createElement("md-filled-button");
    iks.innerHTML = "Končano";
    iks.style.margin = "0"
    actionsHold.appendChild(iks);
    iks.addEventListener("click", function (e) {
        if (info[0] !== "Po Meri" && info[0] !== "Klop" && listOfPlayers["!gamesData!"][infom][3] !== changeValue.value) {
            if (info[4]) {
                listOfPlayers["!gamesData!"][infom][3] = changeValue.value / 2
            } else {
                listOfPlayers["!gamesData!"][infom][3] = changeValue.value;
            }
            removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

            count(true);

        }
        hideDialog(newElement);
    });
}

function deleteGame() {
    var iks = document.createElement("md-icon-button")
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var newElement
    if (listOfPlayers["!gameName!"].includes("/users/")) {
        newElement = dialogBuilder(iks, "Ali želite zapustiti to skupno igro?")
    } else {
        newElement = dialogBuilder(iks, "Ali želite izbrisati to igro?")
    }

    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideDialog(newElement);
    });
    document.body.appendChild(newElement.parentNode)
    var shareButton = document.createElement("md-filled-button");
    shareButton.innerHTML = "Da";
    var copyButton = document.createElement("md-filled-button");
    copyButton.innerHTML = "Ne";
    newElement.appendChild(copyButton);
    newElement.appendChild(shareButton);
    shareButton.addEventListener("click", function () {
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
            localStorage.offlineChanges = true
        }
        const gamesObject = JSON.parse(localStorage.getItem('games')) || {};
        delete gamesObject[listOfPlayers["!gameName!"]]
        if (!navigator.onLine) {
            localStorage.offlineChanges = true
        }
        localStorage.setItem("games", JSON.stringify(gamesObject));
        updateUserData()
        location.reload();
        hideDialog(newElement);
    });
    copyButton.addEventListener("click", function () {
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
/*
async function createRipple(event) {
    if (!event.target.className.includes("whlScreen") && !event.target.closest('.whlScreen') && document.getElementsByClassName("whlScreen")[0] !== undefined) {
        hideDialog(document.getElementsByClassName("whlScreen")[0])
    }
    if (event.target.tagName == "BUTTON" || event.target.className.includes("chl")) {
 
        if (event.target.getAttribute("disabled") == null && !event.target.className.includes("Google")) {
            const button = event.target;
            if (event.target.className.includes("chl")) { button.style.overflow = "hidden" }
            const circle = document.createElement("span");
            const diameter = Math.max(button.offsetWidth, button.offsetHeight);
            const radius = diameter / 2;
 
            circle.classList.add("ripple");
            const rect = button.getBoundingClientRect();
 
            circle.style.left = (event.touches[0].clientX - rect.left) + "px";
            circle.style.top = (event.touches[0].clientY - rect.top) + "px";
            circle.style.width = circle.style.height = (diameter / 4) + "px";
            circle.style.opacity = "0";
            button.appendChild(circle);
            circle.style.transition = " all " + (Math.round(diameter) / 700) + "s"
            transitionDUr = (Math.round(diameter) / 500)
            await resolveAfter(2);
            circle.style.opacity = ".4";
            circle.style.width = circle.style.height = (diameter * 2) + "px";
 
            let mouse = false;
            let animation = false;
            document.body.addEventListener("touchend", function () {
                mouse = true;
 
                if (animation) {
                    setTimeout(() => {
 
                        circle.classList.add("fadeOutIt");
                        setTimeout(() => {
                            if (event.target.className.includes("chl")) { button.style.overflow = "scroll" }
 
                            circle.remove();
                        }, 200);
                    }, 0);
                }
            });
            circle.addEventListener("transitionend", function () {
                animation = true;
                if (mouse) {
 
                    setTimeout(() => {
 
                        circle.classList.add("fadeOutIt");
                        setTimeout(() => {
                            if (event.target.className.includes("chl")) { button.style.overflow = "scroll" }
 
                            circle.remove();
                        }, 200);
                    }, 0);
                }
            });
 
        }
    }
}
document.addEventListener("touchstart", createRipple);
*/
function removeElement() {
    for (const element of arguments) {
        element.remove()
    }
}

function privacy() {
    var iks = document.createElement("md-icon-button")
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var newElement = dialogBuilder(iks, "Politika zasebnosti")
    newElement.parentNode.classList.add("fullscreen")
    iks.addEventListener("click", function (e) {
        hideDialog(newElement);
    });
    document.body.appendChild(newElement.parentNode)
    var policy = addElement("p", newElement, null);
    policy.setAttribute("style", "white-space: pre;text-wrap: wrap;width: 80%;margin: 20px;color: var(--colorTxtDialog);")
    jQuery.get('./assets/policies.txt', function (data) {
        policy.innerHTML = data
    });
}

function feedback() {
    var iks = document.createElement("md-icon-button")
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var newElement = dialogBuilder(iks, "Povratne informacije")
    document.body.appendChild(newElement.parentNode)
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideDialog(newElement);
    });
    var emailContentInput = document.createElement("md-outlined-text-field");
    emailContentInput.setAttribute("type", "textarea")
    emailContentInput.setAttribute("rows", "10")
    emailContentInput.setAttribute("style", "height: 25vh;width: 90%; resize: vertical;word-wrap: break-word;")
    emailContentInput.label = "Vpišite kaj bi radi izboljšali...";
    emailContentInput.placeholder = "Kar po domače..."
    newElement.appendChild(emailContentInput);
    emailContentInput.focus();
    var shareButton = document.createElement("md-filled-button");
    shareButton.innerHTML = "Pošlji";
    addElement("div", newElement, "break");
    newElement.appendChild(shareButton);
    shareButton.addEventListener("click", function () {
        window.open("mailto:stevec.taroka@gmail.com?subject=Imam izbolšavo&body=" + emailContentInput.value, "_blank");
    });
}
var queryAnim = false
window.addEventListener("load", function () {

    if (localStorage.uid == null) {
        hideElement(document.querySelector(".loader"))
    }
    queryAnim = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var androidV = null;
    navigator.userAgentData
        .getHighEntropyValues([
            "platform",
            "platformVersion",
        ])
        .then((ua) => {
            if (ua.platform == "Android") androidV = ua.platformVersion
        });

    if (androidV !== null && androidV < 10) queryAnim = true

    if (queryAnim) document.body.style.setProperty('--transDur', '0s');

})

function settings() {
    var iks = document.createElement("md-icon-button")
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var dialog = dialogBuilder(iks, "Nastavitve")
    dialog.parentNode.classList.add("fullscreen")
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideDialog(dialog);
    });
    document.body.appendChild(dialog.parentNode)
    var holder = addElement("md-list", dialog, null)
    var tema = addElement("md-list-item", holder, null)



    tema.innerHTML = 'Tema aplikacije:'
    var colPick = document.createElement("input")
    tema.addEventListener("click", function () {
        colPick.click()
    })
    colPick.setAttribute("slot", "end")
    colPick.setAttribute("type", "color")
    colPick.value = localStorage.getItem("themeColor")
    colPick.addEventListener("change", function () {
        localStorage.themeColor = colPick.value;
        changeTheme(event.target.value)
    });
    tema.appendChild(colPick)
    addElement("md-divider", holder, null)
    var razlikaOkroz = addElement("md-list-item", holder, null)
    razlikaOkroz.setAttribute("style", "display: flex;align-items: center;")
    razlikaOkroz.innerHTML = "Zaokroževanje razlike:&nbsp;&nbsp;&nbsp;&nbsp;"
    var switchRaz = addElement("md-switch", razlikaOkroz, null)
    switchRaz.setAttribute("slot", "end")
    if (JSON.parse(localStorage.getItem("razlikaOkrozi")) || localStorage.getItem("razlikaOkrozi") == null) {
        switchRaz.setAttribute("selected", "");

    }
    razlikaOkroz.addEventListener("click", function () {
        switchRaz.selected = !switchRaz.selected
    })
    razlikaOkroz.setAttribute("type", "reset")
    razlikaOkroz.addEventListener("change", function () {
        if (localStorage.getItem("razlikaOkrozi") == "true") {
            localStorage.setItem("razlikaOkrozi", "false")
        } else {
            localStorage.setItem("razlikaOkrozi", "true");
        }
        zaokrožuj = JSON.parse(localStorage.getItem("razlikaOkrozi"))
    });
}
window.addEventListener("load", function () {

    document.querySelector("#game").addEventListener("click", function () {
        event.target.setAttribute("clicked", "")

    })

})

function helpMe() {
    var iks = document.createElement("md-icon-button")
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var dialog = dialogBuilder(iks, "Pomoč")
    dialog.parentNode.classList.add("fullscreen")
    iks.addEventListener("click", function (e) {
        hideDialog(dialog);
    });
    document.body.appendChild(dialog.parentNode)
    dialog.innerHTML = `<div id="pomoc"> <md-list>
    <md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kako ustvariti novo skupino?</b> <md-icon slot="end">expand_more</md-icon>
        <p style="font-size:1rem;margin:0px;transition: all .4s ease-in-out;height:0px;"><br>Za ustvarjanje nove skupine na domačem zaslonu kliknite na gumb 'Nova skupina'.<br><br>Po kliku se bo odprlo okno, v katerem lahko vnesete imena igralcev, ki sodelujejo v skupini. Za dodajanje večih igralcev uporabite gumb 'Dodaj igralca'. Po kliku gumba 'Naprej' vnesite še vzdevek skupine in kliknite  'Končano'.</p>
    </md-list-item>
    <md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kako dodati novo igro na seznam?</b> <md-icon slot="end">expand_more</md-icon>
        <p style="font-size: 1rem;margin:0px;transition: all .4s ease-in-out;height:0px;"><br>Če želite dodati novo igro, na zaslonu za štetje kliknite na igralca, ki jo je igral. Nato sledite navodilom, da boste uspešno dodali novo igro na seznam.</p>
    </md-list-item>
    <md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kako spremeniti barvno temo?</b> <md-icon slot="end">expand_more</md-icon>
        <p style="font-size: 1rem;margin:0px;transition: all .4s ease-in-out;height:0px;"><br>Za spreminjanje barvne teme aplikacije na domačem zaslonu kliknite na gumb 'Nastavitve', zatem pa gumb 'Tema aplikacije' in izberite barvo, ki vam je všeč.</p>
    </md-list-item>
    <md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Zakaj Google prijava?</b> <md-icon slot="end">expand_more</md-icon>
        <p style="font-size:1rem;margin:0px;transition: all .4s ease-in-out;height:0px;"><br>Prijava s storitvijo Google vam omogoča enostavno shranjevanje podatkov v oblaku. To pomeni, da lahko na katerikoli napravi, kjer se prijavite s svojim Google računom, dostopate do svojih iger in jih urejate. Google prijava vam omogoča tudi deljenje igre s prijatelji.</p>
    </md-list-item>
    <md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kaj pomenijo gumbi v spodnjem delu zaslona za štetje?</b> <md-icon slot="end">expand_more</md-icon>
        <p style="font-size: 1rem;margin:0px;transition: all .4s ease-in-out;height:0px;"><br>● <md-icon>home</md-icon> vam omogoča, da se vrnete na domači zaslon.<br><br>● <md-icon>undo</md-icon> vam omogoča, da razveljavite zadnje dejanje na seznamu.<br><br>● <md-icon>person_add</md-icon> vam omogoča, da povabite prijatelje v skupino, kjer bodo imeli tudi oni možnost urejanja.<br><br>● <md-icon>delete</md-icon> vam omogoča, da izbrišete celotno igro. </p>
    </md-list-item>
    <md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kako povabiti prijatelje v skupino?</b> <md-icon slot="end">expand_more</md-icon>
        <p style="font-size: 1rem;margin:0px;transition: all .4s ease-in-out;height:0px;"><br>Če želite povabiti prijatelje v skupino, kliknite na tretji gumb v spodnjem delu zaslona <md-icon>person_add</md-icon>. Odpre se vam okno, kjer lahko kopirate ali delite povezavo do igre.<br><br>Ko prijatelj dobi povezavo, jo mora le odpreti.<br><br>Za dodajanje prijateljev v skupino morate biti prijavljeni in imeti internetno povezavo.</p>
    </md-list-item>
</md-list></div>`
    var lst = document.getElementById("pomoc").getElementsByTagName("md-list-item")
    for (const item of lst) {
        item.addEventListener("click", function () {
            if (item.getElementsByTagName('p')[0].style.height == '0px') {
                expandSection(item.getElementsByTagName('p')[0])

                item.getElementsByTagName('md-icon')[0].innerHTML = "expand_less"


            } else {
                collapseSection(item.getElementsByTagName('p')[0])

                item.getElementsByTagName('md-icon')[0].innerHTML = "expand_more"
            }
        })
    }
}
// This is the important part!

function collapseSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;

    // temporarily disable all css transitions
    var elementTransition = element.style.transition;
    element.style.transition = '';

    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we 
    // aren't transitioning out of 'auto'
    requestAnimationFrame(function () {
        element.style.height = sectionHeight + 'px';
        element.style.transition = elementTransition;

        // on the next frame (as soon as the previous style change has taken effect),
        // have the element transition to height: 0
        requestAnimationFrame(function () {
            element.style.height = 0 + 'px';
        });
    });

    // mark the section as "currently collapsed"
    element.setAttribute('data-collapsed', 'true');
}

function expandSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;

    // have the element transition to the height of its inner content
    element.style.height = sectionHeight + 'px';

    // when the next css transition finishes (which should be the one we just triggered)
    element.addEventListener('transitionend', function (e) {
        // remove this event listener so it only gets triggered once
        element.removeEventListener('transitionend', arguments.callee);

        // remove "height" from the element's inline styles, so it can return to its initial value
        element.style.height = null;
    });

    // mark the section as "currently not collapsed"
    element.setAttribute('data-collapsed', 'false');
}





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
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};



registerServiceWorker();

const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/index.html",
            "/tarok.css",
            "/tarok.js",
            "/firebase.js",
            "/star-wars-logo.jpg",
            "/assets/icon.png",
            "/assets/btn_google_light_normal_ios.svg",
            "/assets/policies.txt",
        ]),
    );
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    changeTheme(localStorage.themeColor)
})
