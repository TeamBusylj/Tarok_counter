


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
    "Renons": [0, false, "", true, "R"],
    "Mondfang": [-21, false, "", false, "R"],
    "Po meri": [0, false, "", true, "+"],
    "Dodaj radlce": ["", false, "", true, "*"],
};
async function addScore(firstPlayer) {

    var iks = addElement("md-icon-button", null, "iksRight");
    iks.innerHTML = showIks;
    var newElement = dialogBuilder(iks, "Oseba <b>" + firstPlayer + "</b> je igrala...")
    document.body.appendChild(newElement.parentNode);
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
            if (key == "Mondfang") {
                mondfang(newElement);
            }
            else if (key == "Renons") {
                renons(newElement);
            }
            else if (key == "Klop") {
                klop(newElement);
            }
            else if (key == "Po meri") {
                poMeri(newElement);
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

        /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke, datum*/
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
            localStorage.offlineChanges = true
        }
        listOfPlayers["!gamesData!"].push(["Po Meri", nmbs, null, nmbs2, false, null, true, [], 0, false, false, Date.now()])
        hideDialog(newElement)

        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        count(true);
    })
}
var zaokrožuj = JSON.parse(localStorage.getItem("razlikaOkrozi"))
if (zaokrožuj == null || zaokrožuj == undefined) zaokrožuj = true
async function klop(newElement2) {
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
        changeOpis(newElement, "Kdo je bil poln?")
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
                listOfPlayers["!gamesData!"].push(["Klop", player.innerHTML, null, 70, listOfPlayers[player.innerHTML][0].length > 0, null, true, [], 0, false, false, Date.now()])
                hideDialog(newElement)
                removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

                count(true);
            })
        }
    })
    prazn.addEventListener("click", function () {
        newElement.innerHTML = ""
        changeOpis(newElement, "Kdo je bil prazen?")
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
                listOfPlayers["!gamesData!"].push(["Klop", player.innerHTML, null, -70, listOfPlayers[player.innerHTML][0].length > 0, null, true, [], 0, false, false, Date.now()])
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
        klopPlayer.label = "Točke osebe " + user;
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
            if (listOfPlayers[pl.label.replace("Točke osebe ", "")][0].length > 0) {
                tockice.push("-" + pl.value * 2)
            } else {
                tockice.push("-" + pl.value)
            }

        }
        listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
            localStorage.offlineChanges = true
        }

        listOfPlayers["!gamesData!"].push(["Klop", igralci, null, tockice, null, null, null, [], false, false, false, Date.now()])
        radlciDodaj(false)
        if (isfull) {
            hideDialog(newElement)
            removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

            count(true);
        }
    });

}

async function mondfang(newElement) {
    newElement.innerHTML = ""

    let vsi = []
    let playerWho
    changeOpis(newElement, "Kdo je izgubil monda?")
    for (const user in listOfPlayers) {
        if (user == "!gamesData!" || user == "!gameName!") {
            continue;
        }
        let player = addElement("md-outlined-button", newElement, null);
        player.innerHTML = user
        vsi.push(player)
        player.setAttribute("type", "reset")
        player.addEventListener("click", function () {
            playerWho = player
            /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
            listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
                localStorage.offlineChanges = true
            }

        })
    }
    await waitForButtonClick(vsi)

    listOfPlayers["!gamesData!"].push(["Mondfang", playerWho.innerHTML, null, -21, listOfPlayers[playerWho.innerHTML][0].length > 0, null, true, [], 0, false, false, Date.now()])
    hideDialog(newElement)
    removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

    count(true);


}

async function renons(newElement) {
    newElement.innerHTML = ""

    let vsi = []
    let playerWho
    changeOpis(newElement, "Kdo je naredil renons?")
    for (const user in listOfPlayers) {
        if (user == "!gamesData!" || user == "!gameName!") {
            continue;
        }
        let player = addElement("md-outlined-button", newElement, null);
        player.innerHTML = user
        vsi.push(player)
        player.setAttribute("type", "reset")
        player.addEventListener("click", function () {
            playerWho = player
            /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
            listOfPlayersCopy.push(JSON.stringify(listOfPlayers)); if (!navigator.onLine) {
                localStorage.offlineChanges = true
            }

        })
    }
    await waitForButtonClick(vsi)
    newElement.innerHTML = ""
    changeOpis(newElement, "Koliko znaša renons?")
    let renonsSlider = addElement("md-slider", newElement, "klopPlayer");
    renonsSlider.setAttribute("max", "50")
    renonsSlider.setAttribute("min", "0")
    renonsSlider.setAttribute("labeled", "")
    if (zaokrožuj) renonsSlider.setAttribute("step", "5");
    renonsSlider.setAttribute("ticks", "")
    addElement("div", newElement, "break")
    let okButt = addElement("md-filled-button", newElement, null);
    okButt.innerHTML = "Končano"
    okButt.addEventListener("click", function () {
        listOfPlayers["!gamesData!"].push(["Renons", playerWho.innerHTML, null, -Math.abs(parseInt(renonsSlider.value)), false, null, true, [], 0, false, false, Date.now()])
        hideDialog(newElement)
        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

        count(true);
    })

}
async function calculate(gameName, properties, newElement, firstPlayer) {

    if (Object.keys(listOfPlayers).length == 5) {
        partner(newElement, gameName, properties, false, firstPlayer);
    } else {
        var btn = addElement("md-filled-button", null, null);
        var teamWork = properties[3];
        changeOpis(newElement, "Je oseba <b>" + firstPlayer + "</b> igrala solo ali s partnerjem?",);
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
    if (teamWork && secondPlayer) {
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
        "Trula": [10, 20, null, false, false],
        "Kralji": [10, 20, null, false, false],
        "Pagat ultimo": [25, 50, null, false, false],
        "Kralj ultimo": [10, 20, null, false, false],
    };
    var bonusTocke = 0;
    if (!teamWork) {
        slct2 = "partnerigralcakimuniimenic"
        if (!properties[1]) {
            slct2 = "partnerigralcakimuniimenic"
            changeOpis(newElement, "Igrala je oseba " + firstPlayer + ".")

        } else {
            changeOpis(newElement, "Igrala je oseba " + firstPlayer + ", z razliko " + razlika + ".")
        }

    } else {
        if (!properties[1]) {

            changeOpis(newElement, "Igrali sta osebi " + firstPlayer + " in " + slct2 + ".")
        } else {
            changeOpis(newElement, "Igrali sta osebi " + firstPlayer + " in " + slct2 + ", z razliko " + razlika + ".")
        }

    }

    if (properties[1]) {
        for (const key in bonusi) {
            let btn = document.createElement("md-outlined-button");
            btn.innerHTML = key;
            btn.style.transition = " all .2s";
            btn.style.height = "45px";

            btn.addEventListener("click", function () {
                newElement.parentNode.removeAttribute("open")




                var bonusDialog = dialogBuilder(null, "Izberite")
                document.body.appendChild(bonusDialog.parentNode)


                var napovedanboolean = true;
                var dobil = true;
                let ninapoved = addElement("md-outlined-button", bonusDialog, null);
                ninapoved.setAttribute("type", "reset")
                let napovedano = addElement("md-filled-tonal-button", bonusDialog, null);
                let actions = document.createElement('div')
                actions.setAttribute("slot", "actions")
                bonusDialog.parentNode.appendChild(actions)
                let deleteBonus = addElement("md-filled-button", actions, null);
                deleteBonus.innerHTML = "Odstrani bonus";
                deleteBonus.setAttribute("type", "reset")
                deleteBonus.addEventListener("click", function () {
                    bonusi[key][2] = null
                    bonusi[key][3] = false
                    bonusi[key][4] = false
                    btn.innerHTML = key

                    hideDialog(bonusDialog)

                    setTimeout(() => {
                        newElement.parentNode.setAttribute("open", "")
                    }, 100);

                })
                napovedano.innerHTML = "Napovedano";
                napovedano.setAttribute("type", "reset")
                ninapoved.addEventListener("click", function () {
                    napovedanboolean = false;
                    napovedano.click();
                });
                ninapoved.innerHTML = "Ne napovedano";
                napovedano.addEventListener("click", function () {
                    bonusDialog.innerHTML = "";
                    btn.innerHTML = '<md-icon slot="icon">checkbox</md-icon>' + key
                    let izgubil = addElement("md-outlined-button", bonusDialog, null);
                    izgubil.innerHTML = "Izgubljeno";
                    izgubil.addEventListener("click", function () {
                        dobil = false;
                        zmagal.click();
                    });
                    let zmagal = addElement("md-filled-tonal-button", bonusDialog, null);
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
                        newElement.parentNode.show()
                        document.body.appendChild(newElement.parentNode)
                        hideDialog(bonusDialog)



                    });
                });
            });
            newElement.appendChild(btn);
        }
    }
    addElement("md-divider", newElement, null).style.margin = "5px"
    let kontra = addElement("md-outlined-button", newElement, null)
    kontra.innerHTML = "Kontra"
    let rekontra = addElement("md-outlined-button", newElement, null)
    rekontra.innerHTML = "Rekontra"

    var IgraK = false
    var KraljiK = false
    var TrulaK = false
    var KUltK = false
    var PUltK = false
    var IgraK2 = false
    var KraljiK2 = false
    var TrulaK2 = false
    var KUltK2 = false
    var PUltK2 = false
    var RekontraIf = false

    rekontra.addEventListener("click", function () {
        newElement.removeAttribute("open")
        RekontraIf = true
        var iks = document.createElement("md-icon-button")

        iks.classList.add("iksRight")
        iks.innerHTML = "<md-icon>arrow_back</md-icon>";
        var kontraDialog = dialogBuilder(iks, "Izberite")
        document.body.appendChild(kontraDialog.parentNode)
        iks.addEventListener("click", function (e) {
            setTimeout(() => {
                newElement.parentNode.setAttribute("open", "")
            }, 100);

            hideDialog(kontraDialog)
        });


        var chkbxw2 = addElement("label", newElement, null)
        chkbxw2.setAttribute("style", "align-items: center;display: flex;width: 100%;justify-content: start;")
        addElement("input", chkbxw2, null).setAttribute("type", "checkbox")
        chkbxw2.innerHTML += "Igra " + gameName.toLowerCase()

        kontraDialog.appendChild(chkbxw2)
        chkbxw2.getElementsByTagName("input")[0].addEventListener("click", function () {
            if (chkbxw2.getElementsByTagName("input")[0].checked) { IgraK2 = true } else { IgraK2 = false }
        })

        if (bonusi["Kralji"][3]) {
            let chkbxw = addElement("label", newElement, null)
            chkbxw.setAttribute("style", "align-items: center;display: flex;width: 100%;justify-content: start;")
            addElement("input", chkbxw, null).setAttribute("type", "checkbox")
            chkbxw.innerHTML += "Kralji"

            kontraDialog.appendChild(chkbxw)
            chkbxw.getElementsByTagName("input")[0].addEventListener("click", function () {
                if (chkbxw.getElementsByTagName("input")[0].checked) { KraljiK2 = true } else { KraljiK2 = false }

            })
        }
        if (bonusi["Trula"][3]) {
            let chkbxw = addElement("label", newElement, null)
            chkbxw.setAttribute("style", "align-items: center;display: flex;width: 100%;justify-content: start;")
            addElement("input", chkbxw, null).setAttribute("type", "checkbox")
            chkbxw.innerHTML += "Trula"

            kontraDialog.appendChild(chkbxw)
            chkbxw.getElementsByTagName("input")[0].addEventListener("click", function () {
                if (chkbxw.getElementsByTagName("input")[0].checked) { TrulaK2 = true } else { TrulaK2 = false }

            })
        }
        if (bonusi["Kralj ultimo"][3]) {
            let chkbxw = addElement("label", newElement, null)
            chkbxw.setAttribute("style", "align-items: center;display: flex;width: 100%;justify-content: start;")
            addElement("input", chkbxw, null).setAttribute("type", "checkbox")
            chkbxw.innerHTML += "Kralj ultimo"

            kontraDialog.appendChild(chkbxw)
            chkbxw.getElementsByTagName("input")[0].addEventListener("click", function () {
                if (chkbxw.getElementsByTagName("input")[0].checked) { KUltK2 = true } else { KUltK2 = false }

            })
        }
        if (bonusi["Pagat ultimo"][3]) {
            let chkbxw = addElement("label", newElement, null)
            chkbxw.setAttribute("style", "align-items: center;display: flex;width: 100%;justify-content: start;")
            addElement("input", chkbxw, null).setAttribute("type", "checkbox")
            chkbxw.innerHTML += "Pagat ultimo"

            kontraDialog.appendChild(chkbxw)
            chkbxw.getElementsByTagName("input")[0].addEventListener("click", function () {
                if (chkbxw.getElementsByTagName("input")[0].checked) { PUltK2 = true } else { PUltK2 = false }

            })
        }

    })
    kontra.addEventListener("click", function () {
        newElement.parentNode.close()
        var iks = document.createElement("md-icon-button")

        iks.classList.add("iksRight")
        iks.innerHTML = "<md-icon>arrow_back</md-icon>";
        var kontraDialog = dialogBuilder(iks, "Izberite")
        document.body.appendChild(kontraDialog.parentNode)
        iks.addEventListener("click", function (e) {
            setTimeout(() => {
                newElement.parentNode.setAttribute("open", "")
            }, 100);
            hideDialog(kontraDialog)
        });


        var chkbxw2 = addElement("label", newElement, null)
        chkbxw2.setAttribute("style", "align-items: center;display: flex;width: 100%;justify-content: start;")
        addElement("input", chkbxw2, null).setAttribute("type", "checkbox")
        chkbxw2.innerHTML += "Igra " + gameName.toLowerCase()

        kontraDialog.appendChild(chkbxw2)
        chkbxw2.getElementsByTagName("input")[0].addEventListener("click", function () {
            if (chkbxw2.getElementsByTagName("input")[0].checked) { IgraK = true } else { IgraK = false }
            if (RekontraIf) RekontraForMore = true
        })

        if (bonusi["Kralji"][3]) {
            let chkbxw = addElement("label", newElement, null)
            chkbxw.setAttribute("style", "align-items: center;display: flex;width: 100%;justify-content: start;")
            addElement("input", chkbxw, null).setAttribute("type", "checkbox")
            chkbxw.innerHTML += "Kralji"

            kontraDialog.appendChild(chkbxw)
            chkbxw.getElementsByTagName("input")[0].addEventListener("click", function () {
                if (chkbxw.getElementsByTagName("input")[0].checked) { KraljiK = true } else { KraljiK = false }
                if (RekontraIf) RekontraForMore = true
            })
        }
        if (bonusi["Trula"][3]) {
            let chkbxw = addElement("label", newElement, null)
            chkbxw.setAttribute("style", "align-items: center;display: flex;width: 100%;justify-content: start;")
            addElement("input", chkbxw, null).setAttribute("type", "checkbox")
            chkbxw.innerHTML += "Trula"

            kontraDialog.appendChild(chkbxw)
            chkbxw.getElementsByTagName("input")[0].addEventListener("click", function () {
                if (chkbxw.getElementsByTagName("input")[0].checked) { TrulaK = true } else { TrulaK = false }
                if (RekontraIf) RekontraForMore = true
            })
        }
        if (bonusi["Kralj ultimo"][3]) {
            let chkbxw = addElement("label", newElement, null)
            chkbxw.setAttribute("style", "align-items: center;display: flex;width: 100%;justify-content: start;")
            addElement("input", chkbxw, null).setAttribute("type", "checkbox")
            chkbxw.innerHTML += "Kralj ultimo"

            kontraDialog.appendChild(chkbxw)
            chkbxw.getElementsByTagName("input")[0].addEventListener("click", function () {
                if (chkbxw.getElementsByTagName("input")[0].checked) { KUltK = true } else { KUltK = false }
                if (RekontraIf) RekontraForMore = true
            })
        }
        if (bonusi["Pagat ultimo"][3]) {
            let mchkbxw = addElement("label", newElement, null)
            chkbxw.setAttribute("style", "align-items: center;display: flex;width: 100%;justify-content: start;")
            addElement("input", chkbxw, null).setAttribute("type", "checkbox")
            chkbxw.innerHTML += "Pagat ultimo"

            kontraDialog.appendChild(chkbxw)
            chkbxw.getElementsByTagName("input")[0].addEventListener("click", function () {
                if (chkbxw.getElementsByTagName("input")[0].checked) { PUltK = true } else { PUltK = false }
                if (RekontraIf) RekontraForMore = true
            })
        }

    })
    addElement("md-divider", newElement, null).style.margin = "5px"
    //addElement("div", newElement, "break");
    newElement.appendChild(btn23);
    newElement.appendChild(btn22);
    razlika = Math.abs(razlika)
    btn22.addEventListener("click", function () {
        let bnsi = {} /*  "ime bonus": [tocke, napovedan, doblen]  */

        if (KraljiK) bonusi["Kralji"][1] *= 2
        if (TrulaK) bonusi["Trula"][1] *= 2
        if (KUltK) bonusi["Kralj ultimo"][1] *= 2
        if (PUltK) bonusi["Pagat ultimo"][1] *= 2
        if (KraljiK2) bonusi["Kralji"][1] *= 4
        if (TrulaK2) bonusi["Trula"][1] *= 4
        if (KUltK2) bonusi["Kralj ultimo"][1] *= 4
        if (PUltK2) bonusi["Pagat ultimo"][1] *= 4
        for (const key in bonusi) {
            if (bonusi[key][2]) {
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
                    listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, parseInt(properties[0]) + parseInt(razlika) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), true, bnsi, bonusTocke, false, false, Date.now()])
                } else {
                    listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, parseInt(properties[0]) + parseInt(razlika) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), true, bnsi, bonusTocke, false, false, Date.now()])
                }
            } else {
                if (teamWork) {
                    listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, parseInt(properties[0] + bonusTocke), listOfPlayers[firstPlayer][0].length > 0, null, true, bnsi, bonusTocke, false, false, Date.now()])
                } else {
                    listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, parseInt(properties[0] + bonusTocke), listOfPlayers[firstPlayer][0].length > 0, null, true, bnsi, bonusTocke, false, false, Date.now()])
                }
            }
        }

        if (listOfPlayers["!gamesData!"].slice(-1)[0][3] > 0 && listOfPlayers[firstPlayer][0].length > 0) {
            listOfPlayers[firstPlayer][0] = listOfPlayers[firstPlayer][0].replace("*", "");

        }
        if (IgraK) listOfPlayers["!gamesData!"].at(-1)[9] = true
        if (IgraK2) listOfPlayers["!gamesData!"].at(-1)[10] = true

        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        hideDialog(newElement);
        if (gameName.includes('Valat') || gameName.includes('Berač')) {
            radlciDodaj(false)
        }

        count(true);
    });

    btn23.addEventListener("click", function () {
        let bnsi = {} /*  "ime bonus": [tocke, napovedan, doblen]  */

        if (KraljiK) bonusi["Kralji"][1] *= 2
        if (TrulaK) bonusi["Trula"][1] *= 2
        if (KUltK) bonusi["Kralj ultimo"][1] *= 2
        if (PUltK) bonusi["Pagat ultimo"][1] *= 2
        if (KraljiK2) bonusi["Kralji"][1] *= 4
        if (TrulaK2) bonusi["Trula"][1] *= 4
        if (KUltK2) bonusi["Kralj ultimo"][1] *= 4
        if (PUltK2) bonusi["Pagat ultimo"][1] *= 4

        for (const key in bonusi) {
            if (bonusi[key][2]) {
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
                listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, -Math.abs(parseInt(properties[0]) + parseInt(razlika)) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), false, bnsi, bonusTocke, false, false, Date.now()])
            } else {
                listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, -Math.abs(parseInt(properties[0]) + parseInt(razlika)) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), false, bnsi, bonusTocke, false, false, Date.now()])
            }
        } else {
            if (teamWork) {
                listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, -Math.abs(parseInt(properties[0])) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, null, false, bnsi, bonusTocke, false, false, Date.now()])
            } else {
                listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, -Math.abs(parseInt(properties[0])) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, null, false, bnsi, bonusTocke, false, false, Date.now()])
            }
        }

        if (listOfPlayers["!gamesData!"].slice(-1)[0][3] > 0 && listOfPlayers[firstPlayer][0].length > 0) {
            listOfPlayers[firstPlayer][0] = listOfPlayers[firstPlayer][0].replace("*", "");

        }
        if (IgraK) listOfPlayers["!gamesData!"].at(-1)[9] = true
        if (IgraK2) listOfPlayers["!gamesData!"].at(-1)[10] = true

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
    // if (sessionStorage.uid !== null && sessionStorage.uid !== undefined && sessionStorage.uid !== 'null') {
    var result = "https://tarock-counter.web.app/" + encodeURIComponent('users/' + sessionStorage.uid + "/games/" + listOfPlayers["!gameName!"]);


    console.log(result);



    try {
        if (navigator.userAgent.includes("wv")) {
            Android.share(result);
        } else {
            if (navigator.share) {
                navigator.share({
                    title: 'Tarok igra',
                    text: 'Vabim te, da se pridružiš moji tarok skupini.',
                    url: result,
                })
                    .then(() => console.log('Success sharing'))
                    .catch((error) => console.log('Error sharing', error))
            }
        }
    } catch (error) {

    }


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
    let actions = document.createElement('div')
    actions.setAttribute("slot", "actions")
    newElement.parentNode.appendChild(actions)
    var shareButton = document.createElement("md-text-button");
    shareButton.innerHTML = "Da";
    var copyButton = document.createElement("md-filled-tonal-button");
    copyButton.innerHTML = "Ne";

    actions.appendChild(shareButton);
    actions.appendChild(copyButton);
    shareButton.addEventListener("click", function () {
        deleteAllDataF()
        hideDialog(newElement);
    });
    copyButton.addEventListener("click", function () {
        hideDialog(newElement);
    });
}

async function upload() {
    if (sessionStorage.uid !== null && sessionStorage.uid !== undefined && sessionStorage.uid !== 'null' && navigator.onLine) {
        try {
            var text = decodeURIComponent(location.pathname.slice(1));
            var gameContent = await loadDataPath(text)
            if (text.includes(sessionStorage.uid)) {
                dlgNotif("Ta skupina je vaša.")
                window.history.replaceState({}, document.title, "/" + "");
            } else {
                // window.location.href = location.host
                var iks = document.createElement("md-icon-button")
                iks.setAttribute("value", "close")
                iks.classList.add("iksRight")
                iks.innerHTML = showIks;
                var newElement = dialogBuilder(iks, "Ali se želite pridružiti skupini '" + gameContent["!gameName!"] + "' z igralci " + JSON.stringify(Object.keys(gameContent).filter((key) => key !== "!gamesData!" && key !== "!gameName!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", ") + "?")
                gameContent["!gameName!"] = text
                window.history.replaceState({}, document.title, "/" + "");
                document.body.appendChild(newElement.parentNode)
                iks.addEventListener("click", function (e) {
                    document.getElementById("game").style.animation = "none";
                    hideDialog(newElement);
                });
                let actions = document.createElement('div')
                actions.setAttribute("slot", "actions")
                newElement.parentNode.appendChild(actions)
                var shareButton = document.createElement("md-filled-tonal-button");
                shareButton.innerHTML = "Da";
                var copyButton = document.createElement("md-text-button");
                copyButton.innerHTML = "Ne";
                actions.appendChild(copyButton);
                actions.appendChild(shareButton);
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
            dlgNotif("Za dostop do deljene skupine morate biti prijavljeni in imeti internetno povezavo.")
            window.history.replaceState({}, document.title, "/" + "");
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
    newElement.addEventListener("cancel", function () {
        hideDialog(newElement)

    })
    if (queryAnim) { noDialogAnimations(newElement) } else {
        dialogAnimations(newElement)
    }
    var xHolder = addElement("span", newElement, null);
    xHolder.setAttribute("slot", "headline")
    xHolder.setAttribute("class", "dialog-headline")
    xHolder.innerHTML = '<span style="flex: .83;">' + desc + '</span>'

    if (xButt) {
        xHolder.appendChild(xButt)
        var help = addElement("md-icon-button", xHolder, "iksRight")
        help.innerHTML = "<md-icon>help</md-icon>"
        help.style.right = "50px"
        help.addEventListener("click", function () { helpMe(newElement) })
    }

    var content = addElement("div", newElement, null);
    content.setAttribute("style", "display: flex;flex-wrap: wrap;justify-content: center;")
    content.setAttribute("slot", "content")

    content.setAttribute("method", "dialog")
    return content
}

function Game(already) {
    if (already) {
        clickedUser(already.toString(), already.toString())
    } else {


        var iks = document.createElement("md-icon-button")
        iks.setAttribute("value", "close")
        iks.classList.add("iksRight")
        iks.innerHTML = showIks;
        var dialog = dialogBuilder(iks, "Izberite skupino")
        iks.addEventListener("click", function (e) {
            document.getElementById("game").style.animation = "none";
            hideDialog(dialog);
        });
        dialog.setAttribute("id", "dlgSlct")

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
        if (slct.getElementsByTagName("md-list-item").length !== 0) { pTxt2.innerHTML = "Zasebne skupine"; dialog.appendChild(pTxt2); dialog.appendChild(slct); }

        if (slct2.getElementsByTagName("md-list-item").length !== 0) { pTxt.innerHTML = "Deljene skupine"; dialog.appendChild(pTxt); dialog.appendChild(slct2); }

        document.body.appendChild(dialog.parentNode);
    }
}

function hideDialog(dlg) {

    dlg.parentNode.close()
    if (queryAnim) { dlg.parentNode.remove() } else {
        setTimeout(() => {
            dlg.parentNode.remove()
        }, 150);
    }
}





async function clickedUser(slcta, fulla) {
    try { hideDialog(document.getElementById("dlgSlct")) } catch { }
    let full = decodeURIComponent(fulla)
    if (slcta !== full) {
        if (navigator.onLine) {

            try {

                listOfPlayers = await loadDataPath(full)
                listOfPlayers["!gameName!"] = full
            } catch {
                dlgNotif("Zgodila se je napaka. Skupina je bila verjetno izbrisana.")

                const gamesObject = JSON.parse(localStorage.getItem('games')) || {};
                delete gamesObject[full]
                localStorage.setItem("games", JSON.stringify(gamesObject));
                updateUserData()
                document.body.appendChild(content.parentNode)
            }

        } else {
            dlgNotif("Brez internetne povezave ne morete dostopati do deljene skupine.")
        }

    } else {
        const gamesObject2 = JSON.parse(localStorage.getItem('games')) || {};
        listOfPlayers = gamesObject2[slcta];
    }




    if (listOfPlayers !== undefined) {
        if (!listOfPlayers["!gamesData!"]) {
            listOfPlayers["!gamesData!"] = [];
        }
        if (listOfPlayers["!gameName!"].includes("/users/")) {
            updateSharedRemote()
            count(true);

        } else {
            count(true);
        }
    }

    if (location.pathname !== "/public/") {
        window.history.pushState({}, document.title, "/" + encodeURIComponent(listOfPlayers["!gameName!"]));

    }
}
function dlgNotif(msg) {

    var iks = addElement("md-text-button", null, null);

    iks.innerHTML = "Ok";


    var content = dialogBuilder(null, "Napaka")
    iks.addEventListener("click", function (e) {
        hideDialog(content);
    });
    let actions = document.createElement('div')
    actions.setAttribute("slot", "actions")
    content.parentNode.appendChild(actions)
    actions.appendChild(iks)
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


    document.body.appendChild(content.parentNode);


    iks.addEventListener("click", function (e) {
        hideDialog(content);

    });

    listOfPlayers = {};
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
    onePl.style.borderRadius = "4px"
    onePl.setAttribute("slot", "content")
    endPl.innerHTML = "Naprej";
    content.appendChild(onePl);
    onePl.focus();
    let lnbrk = addElement("div", content, "break");
    lnbrk.setAttribute("slot", "content")
    endHolder.appendChild(newPl);
    endHolder.appendChild(endPl);

    newPl.addEventListener("click", function () {
        let onePl2 = addElement("md-outlined-text-field", content, null);
        onePl2.style.borderRadius = "4px"
        onePl2.label = "Ime";
        onePl2.style.marginBottom = "10px"
        content.appendChild(onePl2);
        onePl2.focus;
    });
    endPl.addEventListener("click", async function () {
        let nicist = false
        for (var i = 0; i < document.getElementsByTagName("md-outlined-text-field").length; i++) {
            let inpute = document.getElementsByTagName("md-outlined-text-field")[i];

            if (inpute.value.length == 0) {
                inpute.style.outline = "7px red solid"
                setTimeout(() => {
                    inpute.style.outline = "0px red solid"
                }, 200);
                nicist = true
            }
        }
        if (!nicist) {
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
            imeIgre.label = "Vzdevek skupine"
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
        }

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
    if (!listOfPlayers["!gamesData!"]) {
        listOfPlayers["!gamesData!"] = [];
    }
    setTimeout(() => {
        let dlgs = document.getElementsByTagName("md-dialog")

        for (let ia = 0; ia < dlgs.length; ia++) {
            dlgs[ia].remove()
        }
    }, 300);

    if (listOfPlayersCopy.length > 0) {
        document.querySelector(".undoBtn").disabled = false
    }
    if (listOfPlayers["!gameName!"].includes("/users/")) {
        document.querySelector(".shrBtn").disabled = true
        if (document.getElementById("clck").label !== "yes") {
            document.getElementById("clck").addEventListener("click", function () {
                dlgNotif("Da povabite nekoga v skupino morate biti njen lastnik.")
            })
            document.getElementById("clck").label = "yes"
        }


        document.querySelector(".dltBtn").innerHTML = "<md-icon>close</md-icon>"
    } else {
        document.querySelector(".shrBtn").disabled = false
        document.querySelector(".dltBtn").innerHTML = "<md-icon>delete</md-icon>"
    }
    if (sessionStorage.uid == null || sessionStorage.uid == undefined || sessionStorage.uid == "null" || sessionStorage.uid == "undefined" || !navigator.onLine) {

        if (document.getElementById("clck").label !== "yes") {
            document.getElementById("clck").addEventListener("click", function () {
                dlgNotif("Da povabite nekoga v skupino morate biti prijavljeni in imeti internetno povezavo.")
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
        chl.setAttribute("class", "chl chlName_" + name.replace(/ /g, "_"));
        prnt.innerHTML += '<md-ripple style="z-index:303030; position:absolute;"></md-ripple>'
        chl.style.display = "inline-block;";
        var pointView = addElement("p", rezultLine, null)
        pointView.setAttribute("class", "rezult_" + name.replace(/ /g, "_"));
        pointView.setAttribute("style", "flex: 1; color: var(--colorTxtDialog); background-color:var(--colorDialog); padding-top: 15px; padding-bottom: 15px; border-top-left-radius: 30px; border-top-right-radius: 30px; margin-left:10px;margin-right:10px;")
        pointView.innerHTML = ""
        pointView.addEventListener("click", function () {
            addScore(name)
        })
        prnt.setAttribute("class", "prnt prntName_" + name.replace(/ /g, "_"));
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

        if (!listOfPlayers["!gamesData!"][game]) continue
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
                if (listOfPlayers["!gamesData!"][game][9]) {

                    playerPoints = parseInt(kkk.innerHTML) * 2;
                    kkk.innerHTML = parseInt(playerPoints);
                }
                if (listOfPlayers["!gamesData!"][game][10]) {

                    playerPoints = parseInt(kkk.innerHTML) * 4;
                    kkk.innerHTML = parseInt(playerPoints);
                }
            }
            document.querySelector(".chlName_" + player.replace(/ /g, "_")).appendChild(kkk);
            kkk.style.marginTop = "2px";
            kkk.style.marginBottom = "2px";
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
            // document.querySelector(".chlName_" + player).innerHTML += '<md-divider style="--_color: var(--md-sys-color-surface);height: 5px;"></md-divider>'
            addElement("div", document.querySelector(".chlName_" + player.replace(/ /g, "_")), "break");
        }
        for (const key in listOfPlayers) {
            if (nameOne.includes(key) || key == "!gamesData!" || key == "!gameName!") {
                continue
            } else {
                var kkk = document.createElement("md-text-button");
                kkk.style.marginTop = "2px";
                kkk.style.marginBottom = "2px";
                kkk.style.fontSize = "1rem";

                kkk.innerHTML = "&nbsp;";
                document.querySelector(".chlName_" + key.replace(/ /g, "_")).appendChild(kkk);
                kkk.disabled = true
                kkk.classList.add("noText");
                addElement("div", document.querySelector(".chlName_" + key.replace(/ /g, "_")), "break")

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
        document.querySelector(".rezult_" + key.replace(/ /g, "_")).innerHTML = pointsList[key]
    }
    setTimeout(() => {
        var objDiv = document.getElementsByClassName("chl")[0];
        // objDiv.scrollTop = objDiv.scrollHeight;
        objDiv.scrollTo({ top: objDiv.scrollHeight, behavior: 'smooth' });
    }, 200);

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
var completePodatki = {}

function gameData(infom, number) {
    /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
    var info = listOfPlayers["!gamesData!"][parseInt(infom)];

    var newElement = dialogBuilder(null, "Igra");
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
    var podatki = ["Igra", "Igralec", "Partner", "Točke", "Radlc", "Razlika", "Uspeh", "Bonusi", "Bonus Točke", "Kontra", "Rekontra", "Datum"];
    table.style.marginBottom = "10px"
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

    //Datum
    if (completePodatki["Datum"][1]) {
        var date = new Date(completePodatki["Datum"][1]);
        var dateString = (date.toLocaleString('sl-Si', { weekday: 'long' })) + ", " + date.getDate() + ". " + (date.toLocaleString('sl-Si', { month: 'long' })) + " " + date.getFullYear() + ", ob " + date.getHours() + "." + date.getMinutes()
        changeOpis(newElement, dateString)
    }



    let element1
    let element
    let data




    //Igra
    data = "Igra"
    element1 = data
    element = completePodatki[data][1];

    element1 = data + " " + completePodatki[data][1].toLowerCase();
    if (element1.toLowerCase().includes("po meri") || element1.toLowerCase().includes("klop") || element1.toLowerCase().includes("renons") || element1.toLowerCase().includes("mondfang")) {
        element = 0
        if (element1.includes("po meri")) { createTableData("", "Po meri") } else if (element1.includes("klop")) {
            createTableData("", "Klop")
        } else if (element1.includes("mondfang")) { createTableData("", "Mondfang") } else {
            createTableData("", "Renons")
        }
        if (typeof completePodatki["Igralec"][1] == "string") completePodatki["Igralec"][1] = completePodatki["Igralec"][1].split(",")
        if (typeof completePodatki["Točke"][1] == "number") completePodatki["Točke"][1] = completePodatki["Točke"][1].toString().split(",")
        for (let ina = 0; ina < completePodatki["Igralec"][1].length; ina++) {
            const element = completePodatki["Igralec"][1][ina];
            if (completePodatki["Radlc"][1] && !element1.includes("mondfang")) { createTableData(completePodatki["Točke"][1][ina] * 2, element) } else {
                createTableData(completePodatki["Točke"][1][ina], element)
            }


        }


    } else {
        element = completePodatki[data][2];
        if (!info[6]) {
            element = "-" + element
        }
        createTableData(element, element1, data)
    }


    //Razlika
    if (!completePodatki["Igra"][1].toLowerCase().includes("po meri") && !completePodatki["Igra"][1].toLowerCase().includes("klop") && completePodatki["Razlika"][1] !== undefined && completePodatki["Razlika"][1] !== false && completePodatki["Razlika"][1] !== null) {
        data = "Razlika"
        element1 = data
        element = completePodatki[data][1];
        if (!info[6]) {
            element = "-" + element
        }
        createTableData(element, element1, data)
    }
    //Bonusi
    if (!completePodatki["Igra"][1].toLowerCase().includes("po meri") && !completePodatki["Igra"][1].toLowerCase().includes("klop")) {
        data = "Bonus Točke"
        element1 = data
        element = completePodatki[data][1];
        if (data == "Bonus Točke") {
            let bonusObject = completePodatki["Bonusi"][1]
            let tocke = { "Kralji": 20, "Trula": 20, "Pagat ultimo": 50, "Kralj ultimo": 20 }
            for (const key in completePodatki["Bonusi"][1]) {
                if (bonusObject[key][1]) {
                    if (tocke[key] * 2 == bonusObject[key][0]) {
                        createTableData(bonusObject[key][0], "Napovedano in kontrirano: <wbr>" + key, data)
                    } else if (tocke[key] * 4 == bonusObject[key][0]) {
                        createTableData(bonusObject[key][0], "Napovedano in rekontrirano: <wbr>" + key, data)

                    } else {
                        createTableData(bonusObject[key][0], "Napovedano: <wbr>" + key, data)
                    }

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
            }
            createTableData(element, element1, data)
        }
    }
    //Radlc
    if (!completePodatki["Igra"][1].toLowerCase().includes("po meri") && !completePodatki["Igra"][1].toLowerCase().includes("klop")) {

        data = "Radlc"
        element1 = data
        element = completePodatki[data][1];

        if (completePodatki["Radlc"][1]) {
            element = completePodatki["Točke"][1];
        }

        if (element !== false) createTableData(element, element1, data)
    }

    //Kontra
    try {
        if (!completePodatki["Igra"][1].toLowerCase().includes("po meri") && !completePodatki["Igra"][1].toLowerCase().includes("klop") && !completePodatki["Igra"][1].toLowerCase().includes("mondfang") && completePodatki["Kontra"][1]) {

            data = "Kontra"
            element1 = data


            if (completePodatki["Kontra"][1]) {
                if (completePodatki["Radlc"][1]) {
                    element = completePodatki["Točke"][1] * 2;
                } else {
                    element = completePodatki["Točke"][1];
                }
            }

            if (element !== false) createTableData(element, element1, data)
        }
    } catch { }


    //Rekontra
    try {
        if (!completePodatki["Igra"][1].toLowerCase().includes("po meri") && !completePodatki["Igra"][1].toLowerCase().includes("klop") && !completePodatki["Igra"][1].toLowerCase().includes("mondfang") && completePodatki["Rekontra"][1]) {

            data = "Rekontra"
            element1 = data


            if (completePodatki["Rekontra"][1]) {
                if (completePodatki["Radlc"][1]) {
                    element = completePodatki["Točke"][1] * 4;
                } else {
                    element = completePodatki["Točke"][1] * 2;
                }
            }

            if (element !== false) createTableData(element, element1, data)
        }
    } catch { }

    //Tocke
    if (!completePodatki["Igra"][1].toLowerCase().includes("po meri") && !completePodatki["Igra"][1].toLowerCase().includes("klop") && !completePodatki["Igra"][1].toLowerCase().includes("renons") && !completePodatki["Igra"][1].toLowerCase().includes("mondfang")) {

        data = "Točke"
        element1 = data
        element = completePodatki[data][1];
        if (completePodatki["Radlc"][1]) {
            element = element * 2
        }
        if (completePodatki["Kontra"][1]) {
            element = element * 2
        }
        if (completePodatki["Rekontra"][1]) {
            element = element * 4
        }
        createTableData(element, element1, data)
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
        hideDialog(newElement);
        if (info[0] !== "Po Meri" && info[0] !== "Klop" && listOfPlayers["!gamesData!"][infom][3] !== changeValue.value) {
            if (info[4]) {
                listOfPlayers["!gamesData!"][infom][3] = changeValue.value / 2
            } else {
                listOfPlayers["!gamesData!"][infom][3] = changeValue.value;
            }
            removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

            count(true);

        }

    });
}



function deleteGame() {

    var newElement
    if (listOfPlayers["!gameName!"].includes("/users/")) {
        newElement = dialogBuilder(null, "Ali želite zapustiti to deljeno skupino?")
    } else {
        newElement = dialogBuilder(null, "Ali želite izbrisati to skupino?")
    }

    let iconaa = addElement("md-icon", newElement.parentNode, null)
    iconaa.innerHTML = "delete_outline"
    iconaa.setAttribute("slot", "icon")
    document.body.appendChild(newElement.parentNode)
    var shareButton = document.createElement("md-text-button");
    shareButton.innerHTML = "Da";
    var copyButton = document.createElement("md-filled-tonal-button");
    copyButton.innerHTML = "Ne";
    let actions = document.createElement('div')
    actions.setAttribute("slot", "actions")
    newElement.parentNode.appendChild(actions)
    actions.appendChild(shareButton);
    actions.appendChild(copyButton);

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
        document.querySelector(".homeBtn").click()
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

        document.getElementById("game").style.animation = "none";

        document.getElementById("homeContainer").style.animation = "none"
        document.getElementById("homeContainer").style.display = "block"

        setTimeout(() => {
            hideDialog(newElement);
            document.getElementById("homeContainer").style.animation = ""

        }, 1);
    });
    dlgFullscreen(newElement.parentNode)
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
    let actions = document.createElement('div')
    actions.setAttribute("slot", "actions")
    newElement.parentNode.appendChild(actions)
    var shareButton = document.createElement("md-filled-tonal-button");
    shareButton.innerHTML = "Pošlji";

    actions.appendChild(shareButton);
    shareButton.addEventListener("click", function () {
        window.open("mailto:stevec.taroka@gmail.com?subject=Imam izbolšavo&body=" + emailContentInput.value, "_blank");
    });
}
var queryAnim = false
window.addEventListener("load", function () {

    if (sessionStorage.uid == "null") {
        hideElement(document.querySelectorAll(".loader")[0])
    }
    if (!localStorage.firstTime) {
        localStorage.firstTime = true
    }
    if (localStorage.firstTime == "true") {

        //document.getElementById("firstTime").style.display = "block"
    }
    queryAnim = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try { hideElement(document.querySelectorAll(".loader")[0]); } catch { }
    if (!location.pathname.includes("users") && location.pathname !== "/") {
        Game(decodeURIComponent(location.pathname.slice(1)))
    }
    if (localStorage.offlineChanges == undefined) { window.loadDataFromWeb(); } else { if (navigator.onLine) { updateUserData(); localStorage.offlineChanges = undefined } };

    try {
        changeTheme(localStorage.themeColor);
    } catch (error) {
        console.log(error);
    }




    if (sessionStorage.uid !== null && sessionStorage.uid !== undefined && sessionStorage.uid !== 'null' && sessionStorage.uid !== 'undefined') {
        watchChanges()
    }


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

        document.getElementById("homeContainer").style.animation = "none"
        document.getElementById("homeContainer").style.display = "block"

        setTimeout(() => {
            hideDialog(dialog);
            document.getElementById("homeContainer").style.animation = ""

        }, 1);
    });
    dlgFullscreen(dialog.parentNode)
    document.body.appendChild(dialog.parentNode)
    var holder = addElement("md-list", dialog, null)
    var tema = addElement("md-list-item", holder, null)



    tema.innerHTML = 'Tema aplikacije'
    addElement("md-ripple", tema, null)
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
    razlikaOkroz.innerHTML = "Zaokroževanje razlike&nbsp;&nbsp;&nbsp;&nbsp;"
    var switchRaz = addElement("md-switch", razlikaOkroz, null)
    switchRaz.setAttribute("slot", "end")
    if (JSON.parse(localStorage.getItem("razlikaOkrozi")) == true || localStorage.getItem("razlikaOkrozi") == null) {
        switchRaz.setAttribute("selected", "");
    }
    razlikaOkroz.addEventListener("click", function () {
        switchRaz.selected = !switchRaz.selected
    })
    razlikaOkroz.setAttribute("type", "reset")
    razlikaOkroz.addEventListener("change", function () {
        if (localStorage.getItem("razlikaOkrozi") == "true" || localStorage.getItem("razlikaOkrozi") == null) {
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
    const tabs = document.getElementById("tabsi")
    let currentPanel = null;
    const panelIda = tabs.activeTab?.getAttribute('aria-controls');
    const roota = tabs.getRootNode();
    currentPanel = roota.querySelector(`#${panelIda}`);
    setTimeout(() => {
        const next = tabs.activeTab.nextElementSibling;

        if (next) {
            tabs.activeTab.active = false; next.active = true;

        }
    }, 300);

    setTimeout(() => {
        document.querySelector("#nextTab").addEventListener("click", function () {

            currentPanel.hidden = true;
            currentPanel.style.animation = "hideTab var(--transDur) forwards"
            const panelId = tabs.activeTab?.getAttribute('aria-controls');
            const root = tabs.getRootNode();
            const nexta = tabs.activeTab.nextElementSibling; if (nexta) {
                tabs.activeTab.active = false; nexta.active = true;

            }
            currentPanel = root.querySelector(`#${panelId}`);

            if (currentPanel && currentPanel.id !== "panel-four") {
                setTimeout(() => {
                    currentPanel.style.animation = "showTab var(--transDur) forwards"

                    currentPanel.hidden = false;

                }, 200);


            } else {

                document.getElementById("firstTime").style.backgroundColor = "transparent";
                document.getElementById("nextTab").style.animation = "hideTab var(--transDur) forwards"
                localStorage.firstTime = false
                setTimeout(() => {
                    document.getElementById("firstTime").remove()
                    document.getElementById("nextTab").remove()
                }, 300);
            }

        })
    }, 300);


    document.getElementById("colorTrigger").addEventListener("click", function () {
        document.getElementById("colPickStart").click()
    })
    document.getElementById("colPickStart").addEventListener("change", function () {
        localStorage.themeColor = event.target.value;

        changeTheme(event.target.value)
    });
    document.getElementById("panel-three").innerHTML = pomoc
    document.getElementById("pomoc").id = "pomoc2"
    document.getElementById("pomoc2").style.position = "absolute"
    var lst = document.getElementById("pomoc2").getElementsByTagName("md-list-item")
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
})

function helpMe(dlg) {
    if (!document.getElementById("pomoc")) {


        var iks = document.createElement("md-icon-button")
        iks.setAttribute("value", "close")
        iks.classList.add("iksRight")
        iks.innerHTML = showIks;
        var dialog = dialogBuilder(iks, "Pomoč")
        dialog.parentNode.classList.add("fullscreen")
        if (dlg) {
            dlg.removeAttribute("open")
        }
        iks.addEventListener("click", function (e) {

            if (!dlg) {
                document.getElementById("game").style.animation = "none";

                document.getElementById("homeContainer").style.animation = "none"
                document.getElementById("homeContainer").style.display = "block"

                setTimeout(() => {
                    hideDialog(dialog);
                    document.getElementById("homeContainer").style.animation = ""

                }, 1);
            } else {
                document.getElementById("game").style.animation = "none";



                setTimeout(() => {
                    hideDialog(dialog);
                    dlg.setAttribute("open", "")

                }, 1);
            }

        });
        dlgFullscreen(dialog.parentNode, dlg)
        dialog.innerHTML = pomoc
        document.body.appendChild(dialog.parentNode)

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
    <p style="font-size:1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>Prijava s storitvijo Google vam omogoča enostavno shranjevanje podatkov v oblaku. To pomeni, da lahko na katerikoli napravi, kjer se prijavite s svojim Google računom, dostopate do svojih iger in jih urejate. Google prijava vam omogoča tudi deljenje igre s prijatelji.</p>
</md-list-item>
<md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kaj pomenijo gumbi v spodnjem delu zaslona za štetje?</b> <md-icon slot="end">expand_more</md-icon>
    <p style="font-size: 1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>● <md-icon>home</md-icon> vam omogoča, da se vrnete na domači zaslon.<br><br>● <md-icon>undo</md-icon> vam omogoča, da razveljavite zadnje dejanje na seznamu.<br><br>● <md-icon>person_add</md-icon> vam omogoča, da povabite prijatelje v skupino, kjer bodo imeli tudi oni možnost urejanja.<br><br>● <md-icon>delete</md-icon> vam omogoča, da izbrišete celotno igro. </p>
</md-list-item>
<md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kako povabiti prijatelje v skupino?</b> <md-icon slot="end">expand_more</md-icon>
    <p style="font-size: 1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>Če želite povabiti prijatelje v skupino, kliknite na tretji gumb v spodnjem delu zaslona <md-icon>person_add</md-icon>. Odpre se vam okno, kjer lahko kopirate ali delite povezavo do igre.<br><br>Ko prijatelj dobi povezavo, jo mora le odpreti.<br><br>Za dodajanje prijateljev v skupino morate biti prijavljeni in imeti internetno povezavo.</p>
</md-list-item>
</md-list><div class="break" style="height:80px;"></div></div>`
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

            "/assets/icon.png",
            "/assets/btn_google_light_normal_ios.svg",
            "/assets/policies.txt",

            '@material/web/icon/icon.js',
            '@material/web/menu/menu-item.js',
            '@material/web/menu/menu.js',
            '@material/web/dialog/dialog.js',
            '@material/web/ripple/ripple.js',
            '@material/web/button/outlined-button.js',
            '@material/web/switch/switch.js',
            '@material/web/iconbutton/icon-button.js',
            '@material/web/iconbutton/filled-tonal-icon-button.js',
            '@material/web/button/filled-button.js',
            '@material/web/slider/slider.js',
            '@material/web/list/list-item.js',
            '@material/web/fab/fab.js',
            '@material/web/progress/circular-progress.js',
            '@material/web/list/list.js',
            '@material/web/button/text-button.js',
            '@material/web/textfield/outlined-text-field.js',
            '@material/web/textfield/filled-text-field.js',
            '@material/web/button/filled-tonal-button.js'
        ]),
    );
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    changeTheme(localStorage.themeColor)
})
window.addEventListener('popstate', function (event) { console.log("BACK"); if (location.pathname == "/") document.querySelector(".homeBtn").click() })




window.addEventListener("load", async function () {
    let installPrompt = null;
    const installButton = document.querySelector("#pwa");
    let ifitis = false
    window.addEventListener("appinstalled", () => {
        disableInAppInstallPrompt();
        console.log("app installed");
    });
    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installPrompt = event;

        installButton.style.display = "flex";


    });
    if (window.matchMedia('(display-mode: standalone)').matches) {
        disableInAppInstallPrompt();
        console.log("app standalone");
    }
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        if (!ifitis) {
            installButton.style.display = "flex";

        }
    }
    var relatedApps = []
    try {
        relatedApps = await navigator.getInstalledRelatedApps();
        if (relatedApps.length !== 0 && !ifitis) {
            installButton.innerHTML = 'Nadaljuj v aplikaciji<md-icon slot="icon">open_in_new</md-icon>'
            installButton.style.display = "flex";
        }
    } catch {

    }


    installButton.addEventListener("click", async () => {
        if (relatedApps.length !== 0) {
            window.open('/', '_blank');
            return
        }

        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            let dialog = dialogBuilder(null, "iOS Aplikacija")
            dialog.innerHTML = 'Če želite naložiti aplikacijo, spodaj pritisnite gumb za deljenje&nbsp;<md-icon style="font-size: 1rem;display:contents;" aria-hidden="true">ios_share</md-icon></span>&nbsp;in poiščite gumb  "<md-icon style="font-size: 1rem;display:contents;" aria-hidden="true">add_box</md-icon> Add to home screen".'
            let actions = document.createElement('div')
            actions.setAttribute("slot", "actions")
            dialog.parentNode.appendChild(actions)
            let close = addElement("md-text-button", actions, null)
            close.innerHTML = "Ok"
            close.addEventListener("click", function () {
                hideDialog(dialog)
            })
            document.body.appendChild(dialog.parentNode)
        } else {
            const result = await installPrompt.prompt();

            disableInAppInstallPrompt();
        }


    });

    function disableInAppInstallPrompt() {
        ifitis = true
        installPrompt = null;
        installButton.style.display = "none";
    }

})