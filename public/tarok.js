


function adaptColor(bg, txt, btn, dialog, txtDialog) {
    document.body.style.setProperty("--bgColor", bg);
    document.body.style.setProperty("--colorTxt", txt);
    document.body.style.setProperty("--colorBtn", btn);
    document.body.style.setProperty("--colorDialog", dialog);
    document.body.style.setProperty("--colorTxtDialog", txtDialog);
}
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
    transitionDUr = 0
    listOfPlayersCopy = JSON.parse(JSON.stringify(listOfPlayers));

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
        //btn.style.flexBasis = "40%"
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
            }
            else {
                if (key == "Dodaj radlce") {
                    radlciDodaj(true);
                    removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

                    hideDialog(newElement);
                    count(false);
                }
                else {

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
        if (key == "!gamesData!") {
            continue;
        }
        listOfPlayers[key][0] += "*";
    }
    if (remove) {
        document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(1)";
        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))


        count(false);
    }
}


var showIks = '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24.05 26.55 13.7 36.9q-.6.6-1.325.6t-1.275-.6q-.6-.55-.6-1.275 0-.725.6-1.275l10.4-10.4-10.45-10.4q-.55-.55-.55-1.275 0-.725.55-1.275.55-.55 1.275-.55.725 0 1.325.55L24 21.35 34.35 11q.55-.55 1.275-.55.725 0 1.325.55.55.6.55 1.35 0 .75-.55 1.3L26.6 24l10.35 10.4q.55.55.55 1.275 0 .725-.55 1.275-.55.55-1.275.55-.725 0-1.225-.55Z"/></svg>';
window.addEventListener("load", (event) => {

    if (navigator.onLine) showIks = '<md-icon>close</md-icon><md-ripple for="touch" class="unbounded"></md-ripple>'
});

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
        if (user == "!gamesData!") {
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
        player.addEventListener("change", function () { player.name = player.value })
    }
    var konc = addElement("md-filled-button", newElement, null);
    konc.innerHTML = "Končano"
    konc.setAttribute("type", "reset")
    konc.addEventListener("click", function () {

        var nmbs = []
        var nmbs2 = []
        for (const iterator of vls) {
            nmbs.push(iterator.label)
            console.log(document.getElementById("meri_" + iterator.label).name);

            nmbs2.push(document.getElementById("meri_" + iterator.label).name)
        }
        console.log(nmbs2);
        /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
        listOfPlayers["!gamesData!"].push(["Po Meri", nmbs, null, nmbs2, false, null, true, [], 0])
        hideDialog(newElement)
        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        count(true);
    })
}

var zaokrožuj = JSON.parse(localStorage.getItem("razlikaOkrozi"))
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
            if (user == "!gamesData!") {
                continue;
            }
            let player = addElement("md-outlined-button", newElement, null);
            player.innerHTML = user

            player.setAttribute("type", "reset")
            player.addEventListener("click", function () {
                console.log(player);
                /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
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
            if (user == "!gamesData!") {
                continue;
            }
            let player = addElement("md-outlined-button", newElement, null);
            player.innerHTML = user

            player.setAttribute("type", "reset")
            player.addEventListener("click", function () {
                console.log(player);
                /* gamename, prvi igralc, drug igralc, tocke, ima radlc, razlika, dobil zgubil, bonusi, bonusi Tocke*/
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
        hideElement(newElement);

    });
    var igralci = []
    for (const user in listOfPlayers) {
        if (user == "!gamesData!") {
            continue;
        }
        let labelname = addElement("label", newElement, null);
        labelname.innerHTML = user
        let klopPlayer = addElement("md-slider", labelname, "klopPlayer");
        klopPlayer.setAttribute("max", "35")
        klopPlayer.setAttribute("min", "0")
        klopPlayer.setAttribute("labeled", "")
        if (zaokrožuj) klopPlayer.setAttribute("step", "5"); klopPlayer.setAttribute("ticks", "")
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
            console.log(pl)
            tockice.push("-" + pl.value)
        }



        listOfPlayers["!gamesData!"].push(["Klop", igralci, null, tockice, null, null, null, null])
        radlciDodaj(false)


        if (isfull) {
            hideElement(newElement)
            removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
            count(true);
        }
    });
}

async function calculate(gameName, properties, newElement, firstPlayer) {

    if (Object.keys(listOfPlayers).length == 4) {

        partner(newElement, gameName, properties, false, firstPlayer);
    }
    else {
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
            console.log("tlele");
            for (const user in listOfPlayers) {
                if (user == "!gamesData!") {
                    continue;
                }
                if (user == firstPlayer) {
                    continue;
                }
                let player = addElement("md-outlined-button", newElement, null);
                player.innerHTML = user
                dv.push(player)
                console.log(newElement.parentNode);

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

            console.log("tlele");


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
        console.log("zokro");

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

            difNu.addEventListener("change", function () { razlika = difNu.value; console.log(razlika); })
            await waitForButtonClick([endButton]);
            newElement.innerHTML = ""
        }
    } else {
        if (properties[1]) {
            var razlike = [0, 5, 10, 15, 20, 25, 30]
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
    }
    else {
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
                newElement.parentNode.removeAttribute("open")
                var iks = document.createElement("md-icon-button")
                iks.setAttribute("value", "close")
                iks.classList.add("iksRight")
                iks.innerHTML = showIks;
                var bonusDialog = dialogBuilder(iks, "Izberite")
                document.body.appendChild(bonusDialog.parentNode)
                iks.addEventListener("click", function (e) {
                    newElement.parentNode.setAttribute("open", "")
                    hideDialog(bonusDialog)
                });
                addElement("div", bonusDialog, "break");

                bonusDialog.style.filter = "brightness(1)";

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

                    addElement("div", newElement, "break");
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
                        }
                        else {
                            bonusi[key][2] = false;
                        }
                        if (napovedanboolean) {
                            bonusi[key][3] = true;
                        }
                        else {
                            bonusi[key][3] = false;
                        }
                        newElement.style.filter = "brightness(1)";

                        bonusDialog.style.animation = "hideScreen .2s forwards";
                        setTimeout(() => {
                            hideDialog(bonusDialog)
                            newElement.parentNode.setAttribute("open", "")
                        }, 200);
                    });
                });
            });
            newElement.appendChild(btn);
        }
    }
    addElement("div", newElement, "break");
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
                    }
                    else {
                        bnsi[key] = [bonusi[key][0], false, true]
                        bonusTocke += bonusi[key][0];
                    }
                } else {
                    if (bonusi[key][3]) {
                        bnsi[key] = [-Math.abs(bonusi[key][1]), true, false]
                        bonusTocke -= bonusi[key][1];
                    }
                    else {
                        bnsi[key] = [-Math.abs(bonusi[key][0]), false, false]
                        bonusTocke -= bonusi[key][0];
                    }
                }
            }
        }


        if (slct2 !== "" || teamWork) {

            this.remove();
            if (properties[1]) {
                if (teamWork) {
                    listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, parseInt(properties[0]) + parseInt(razlika) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), true, bnsi, bonusTocke])
                }
                else {
                    listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, parseInt(properties[0]) + parseInt(razlika) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), true, bnsi, bonusTocke])
                }
            }
            else {
                if (teamWork) {
                    listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, parseInt(properties[0] + bonusTocke), listOfPlayers[firstPlayer][0].length > 0, null, true, bnsi, bonusTocke])
                }
                else {
                    listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, parseInt(properties[0] + bonusTocke), listOfPlayers[firstPlayer][0].length > 0, null, true, bnsi, bonusTocke])
                }
            }
        }
        if (listOfPlayers["!gamesData!"].slice(-1)[0][3] > 0 && listOfPlayers[firstPlayer][0].length > 0) {

            listOfPlayers[firstPlayer][0] = listOfPlayers[firstPlayer][0].replace("*", ""); console.log(razlika);
        }
        document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(1)";
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
                    }
                    else {
                        bnsi[key] = [bonusi[key][0], false, true]
                        bonusTocke += bonusi[key][0];
                    }
                }
                else {
                    if (bonusi[key][3]) {
                        bnsi[key] = [-Math.abs(bonusi[key][0]), true, false]
                        bonusTocke -= bonusi[key][1];
                    }
                    else {
                        bnsi[key] = [-Math.abs(bonusi[key][0]), false, false]
                        bonusTocke -= bonusi[key][0];
                    }
                }
            }
        }
        if (properties[1]) {
            if (teamWork) {
                listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, -Math.abs(parseInt(properties[0]) + parseInt(razlika)) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), false, bnsi, bonusTocke])

            }
            else {

                listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, -Math.abs(parseInt(properties[0]) + parseInt(razlika)) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), false, bnsi, bonusTocke])
            }
        } else {
            if (teamWork) {
                listOfPlayers["!gamesData!"].push([String(gameName), [firstPlayer, slct2], null, -Math.abs(parseInt(properties[0])) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, null, false, bnsi, bonusTocke])
            }
            else {
                listOfPlayers["!gamesData!"].push([String(gameName), firstPlayer, null, -Math.abs(parseInt(properties[0])) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, null, false, bnsi, bonusTocke])
            }
        }
        if (listOfPlayers["!gamesData!"].slice(-1)[0][3] > 0 && listOfPlayers[firstPlayer][0].length > 0) {

            listOfPlayers[firstPlayer][0] = listOfPlayers[firstPlayer][0].replace("*", ""); console.log(razlika);
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
    console.log(text);
    var result = "https://tarock-counter.web.app#" + encodeURIComponent(text);
    var newElement = addElement("div", document.body, "whlScreen");
    document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(.3)";
    var iks = addElement("div", newElement, "iks");
    iks.innerHTML = showIks;
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideElement(newElement);
    });
    console.log(result);





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
                        .then(() => console.log('Successful share'))
                        .catch((error) => console.log('Error sharing', error));
                }
            }
        }
        catch (error) {
            console.log(error);
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
        }
        catch (error) {
            console.log(error);
        }
    });
}


function upload(encrypted) {
    try {
        var text = JSON.parse(decodeURIComponent(encrypted));
        var newElement = addElement("div", document.body, "whlScreen");
        var iks = addElement("div", newElement, "iks");
        iks.innerHTML = showIks;
        iks.addEventListener("click", function (e) {
            document.getElementById("game").style.animation = "none";
            hideElement(newElement);
        });
        dodajOpis(newElement, "Ali želite uvoziti igro z igralci " + JSON.stringify(Object.keys(text).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", ") + "?",);
        var shareButton = document.createElement("md-filled-button");
        shareButton.innerHTML = "Da";
        var copyButton = document.createElement("md-filled-button");
        copyButton.innerHTML = "Ne";
        newElement.appendChild(copyButton);
        newElement.appendChild(shareButton);
        shareButton.addEventListener("click", function () {
            const gamesObject = JSON.parse(localStorage.getItem('games')) || {};

            gamesObject[JSON.stringify(Object.keys(text).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", ")] = JSON.stringify(text);
            localStorage.setItem("games", JSON.stringify(gamesObject));
            updateUserData()
            try {
                Android.saveStorage(JSON.stringify(localStorage).replace("\\\\", "\\\\\\\\"));
            }
            catch { }
            hideElement(newElement);
        });
        copyButton.addEventListener("click", function () {
            hideElement(newElement);
        });
    }
    catch (error) { console.log(error) }
}

function uploadLink() {


    var newElement = addElement("div", document.body, "whlScreen");
    var iks = addElement("div", newElement, "iks");
    iks.innerHTML = showIks;
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideElement(newElement);
    });
    addElement("div", newElement, "break");
    dodajOpis(newElement, "Prilepite povezavo igre, ki jo je nekdo delil z vami. ");
    var linkInput = document.createElement("input");

    linkInput.type = "link";



    linkInput.placeholder = "Povezava...";

    newElement.appendChild(linkInput);
    linkInput.focus();
    var shareButton = document.createElement("md-filled-button");
    shareButton.innerHTML = "Končano";
    newElement.appendChild(shareButton);

    shareButton.addEventListener("click", function () {
        upload(linkInput.value.slice(29))
        hideElement(newElement);
    });
}



function hideElement(newElement) {


    newElement.style.animation = "hideScreen .2s forwards";
    try {
        document.querySelector(".cntScreen").style.filter = "";
        document.getElementById("bottomBar").style.filter = "";

        setTimeout(() => {
            document.getElementById("actionBar").style.pointerEvents = "auto";
            document.querySelector(".cntScreen").style.pointerEvents = "auto"
        }, 500);

    }
    catch { }
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

    var xHolder = addElement("span", newElement, null);
    xHolder.setAttribute("slot", "headline")
    xHolder.setAttribute("class", "dialog-headline")
    xHolder.innerHTML = '<span style="flex: .9;">' + desc + '</span>'
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
        document.getElementById("homescreen").style.filter = document.getElementById("signInMessage").style.filter = document.getElementById("bottomBar").style.filter = "brightness(1)";
    });


    var slct = document.createElement("md-list");

    document.body.appendChild(dialog.parentNode);
    const gamesObject = JSON.parse(localStorage.getItem('games')) || {};
    for (var i = 0; i < Object.keys(gamesObject).length; i++) {
        let user = Object.keys(gamesObject)[i];
        if (user !== "!gamesData!") {
            if (i > 0) {
                slct.innerHTML += '<md-divider></md-divider><md-list-item type="button" onclick=" clickedUser(\'' + user + '\');" interactive>' + user + "</md-list-item> ";

            } else {
                slct.innerHTML += '<md-list-item type="button" onclick=" clickedUser(\'' + user + '\');" interactive>' + user + "</md-list-item> ";

            }
        }
    }
    dialog.appendChild(slct);

}

function hideDialog(dlg) {
    dlg.parentNode.close()
    setTimeout(() => {
        dlg.parentNode.remove()
    }, 1000);
}
function clickedUser(slcta, gamesObject) {
    const gamesObject2 = JSON.parse(localStorage.getItem('games')) || {};
    listOfPlayers = gamesObject2[slcta];
    console.log(listOfPlayers);
    hideDialog(document.querySelector("body > md-dialog > span"))
    listOfPlayersCopy = JSON.parse(JSON.stringify(listOfPlayers));
    if (listOfPlayers["!gamesData!"] == null) {
        listOfPlayers["!gamesData!"] = [];
    }
    document.getElementById("homescreen").style.filter = document.getElementById("newapp").style.filter = document.getElementById("bottomBar").style.filter = document.getElementById("signInMessage").style.filter = "brightness(.3)";

    count(true);
}


function undo() {
    listOfPlayers = JSON.parse(JSON.stringify(listOfPlayersCopy));
    removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

    count(true);
}
var listOfPlayers = {};
var listOfPlayersCopy = {};

function newGame() {


    var iks = addElement("md-icon-button", null, "iksColor");
    iks.setAttribute("value", "close")
    iks.innerHTML = showIks;
    iks.classList.add("iksRight")
    var content = dialogBuilder(iks, "Vpišite igralce")
    iks.addEventListener("click", function (e) {

        hideDialog(content);
        document.getElementById("homescreen").style.filter = document.getElementById("signInMessage").style.filter = "brightness(1)";

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

    endPl.innerHTML = "Končano";
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
        onePl2.focus();
    });
    endPl.addEventListener("click", function () {

        hideDialog(content);
        listOfPlayers["!gamesData!"] = [];
        for (var i = 0; i < document.getElementsByTagName("md-outlined-text-field").length; i++) {
            let input = document.getElementsByTagName("md-outlined-text-field")[i].value;
            listOfPlayers[input] = [""];
        }


        listOfPlayersCopy = JSON.parse(JSON.stringify(listOfPlayers));
        removeElement(document.getElementById("newgame"), document.getElementById("game"))
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





function count(animate) {
    if (listOfPlayers["!gamesData!"] == null) {
        listOfPlayers["!gamesData!"] = [];
    }
    document.getElementById("actionBar").style.pointerEvents = "auto";
    document.getElementById("actionBar").style.display = "flex"
    document.getElementById("bottomBar").style.filter = "";
    document.getElementById("actionBarStart").style.display = "none"
    document.getElementById("homescreen").style.display = document.getElementById("signInMessage").style.display = "none"

    const gamesObject = JSON.parse(localStorage.getItem('games')) || {};

    gamesObject[JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").split(",").sort().toString().replace(/,/g, ", ")] = listOfPlayers;
    console.log(gamesObject[JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").split(",").sort().toString().replace(/,/g, ", ")]);
    console.log(listOfPlayers);
    localStorage.setItem("games", JSON.stringify(gamesObject));
    updateUserData()



    localStorage.removeItem(undefined)
    var newElement = addElement("div", document.body, "cntScreen");
    if (animate) {
        newElement.style.animation = "showScreen .4s forwards"
    }
    var rezultLine = document.createElement("div");
    for (const key in listOfPlayers) {
        if (key == "!gamesData!") {
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
            if (!event.target.className.includes("word")) { addScore(name) }
        })
        prnt.appendChild(chl);
        newElement.appendChild(prnt);

    }

    var stGame = 0
    let pointsList = {}
    document.body.appendChild(newElement);
    for (const key in listOfPlayers) {
        if (key == "!gamesData!") { continue } else {

            pointsList[key] = parseInt(0)
        }
    }
    for (var ia = 0; ia < listOfPlayers["!gamesData!"].length; ia++) {
        let game = ia
        console.log(ia + "aaaa");
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

                if (listOfPlayers["!gamesData!"][game][4]) { playerPoints = parseInt(playerPoints) * 2; kkk.innerHTML = parseInt(playerPoints); }
                else { kkk.innerHTML = parseInt(playerPoints) }
            }


            document.querySelector(".chlName_" + player).appendChild(kkk);
            kkk.style.marginTop = "-15px";

            if (listOfPlayers["!gamesData!"][game][4] && listOfPlayers["!gamesData!"][game][1][0] == player) {
                kkk.innerHTML = kkk.innerHTML + "*";
            }
            // kkk.setAttribute("onclick", 'gameData("' + stGame + '")');
            kkk.classList.add("word_" + stGame);

            if (playerPoints !== "") { pointsList[player] = pointsList[player] + parseInt(playerPoints) }
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

            if (nameOne.includes(key) || key == "!gamesData!") { continue } else {

                var kkk = document.createElement("p");
                kkk.innerHTML = "&nbsp;";

                document.querySelector(".chlName_" + key).appendChild(kkk);

                kkk.style.marginTop = "-15px";


                kkk.classList.add("noText");
                addElement("div", chl, "break");
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
        if (key !== "!gamesData!") {
            document.querySelector(".rezult_" + key).innerHTML = pointsList[key]

        }
    }
}




function dodajOpis(newElement, text) {
    try {
        newElement.getElementsByClassName("opis")[0].remove();
    }
    catch { }
    var opisek = addElement("p", newElement, "opis");
    opisek.innerHTML = text;
    let lnbrk = addElement("div", newElement, "break");
    return opisek
}

function addElement(tag, parent, className) {
    if (className !== null && className.toLowerCase().includes("screen") && !className.toLowerCase().includes("cntscreen")) {
        document.getElementById("actionBar").style.pointerEvents = "none";
    }
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
    console.log(info);
    console.log(infom);
    var newElement = dialogBuilder(null, "Tukaj lahko vidite podatke o igri in jih spremenite");
    document.body.appendChild(newElement.parentNode)

    if (info[0] !== "Po meri" && info[0] !== "Klop") {
        var changeValue = document.createElement("md-outlined-text-field");
        changeValue.type = "number";

        if (info[4]) { changeValue.value = info[3] * 2 } else { changeValue.value = info[3]; }
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
            console.log("lll" + key);
            completePodatki[key] = [i, value, games[value.toString()][0]]
        }
        else {
            if (value == "Po Meri") { completePodatki[key] = [i, value], "Različno" } else {
                completePodatki[key] = [i, value]
            }
        }
    }
    var vrstniRed = [0, 5, 8, 4, 3]


    function createTableData(element, element1, data) {
        let tdVelk = addElement("tr", table, "gameTdDiv");
        if (data == "Točke") { tdVelk.style.transform = " translateY(10px)"; element = "" + element.toString().replace("+", "") }

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
        if (element == null || element == 0) { continue }
        if (completePodatki["Radlc"][1] && data == "Točke") { element = element * 2 }
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
            element = completePodatki[data][2];
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
        if (data !== "Bonus Točke") {

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

        console.log("akkaka" + infom);
        listOfPlayers["!gamesData!"].splice(infom, 1);

        const keys = Object.keys(listOfPlayers["!gamesData!"]);
        keys.sort((a, b) => a - b);



        const gamesObject = JSON.parse(localStorage.getItem('games')) || {};

        gamesObject[JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").split(",").sort().toString().replace(/,/g, ", ")] = listOfPlayers
        localStorage.setItem("games", JSON.stringify(gamesObject));

        document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(1)";
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
            if (info[4]) { listOfPlayers["!gamesData!"][infom][3] = changeValue.value / 2 } else { listOfPlayers["!gamesData!"][infom][3] = changeValue.value; }

            removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
            setTimeout(() => {
                count(true);
            }, 200);

        }
        hideDialog(newElement);
    });

}

function deleteGame() {
    var iks = document.createElement("md-icon-button")
    iks.setAttribute("value", "close")
    iks.classList.add("iksRight")
    iks.innerHTML = showIks;
    var newElement = dialogBuilder(iks, "Ali želite izbrisati to igro?")

    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideElement(newElement);
    });
    document.body.appendChild(newElement.parentNode)
    var shareButton = document.createElement("md-filled-button");
    shareButton.innerHTML = "Da";
    var copyButton = document.createElement("md-filled-button");
    copyButton.innerHTML = "Ne";
    newElement.appendChild(copyButton);
    newElement.appendChild(shareButton);
    shareButton.addEventListener("click", function () {
        const gamesObject = JSON.parse(localStorage.getItem('games')) || {};

        delete gamesObject[JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").split(",").sort().toString().replace(/,/g, ", ")]
        localStorage.setItem("games", JSON.stringify(gamesObject));
        updateUserData()
        location.reload();
        hideElement(newElement);
    });
    copyButton.addEventListener("click", function () {
        hideElement(newElement);
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
        hideElement(document.getElementsByClassName("whlScreen")[0])
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

window.addEventListener("load", function () {
    console.log("lll");
    if (localStorage.uid == null) {
        hideElement(document.querySelector(".loader"))
    }
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
        document.getElementById("homescreen").style.filter = document.getElementById("signInMessage").style.filter = document.getElementById("bottomBar").style.filter = "brightness(1)";
    });
    document.body.appendChild(dialog.parentNode)
    var tema = addElement("md-text-button", dialog, null)
    tema.setAttribute("type", "reset")
    tema.addEventListener("click", function () { colPick.click() })
    tema.innerHTML = 'Tema aplikacije:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    var colPick = document.createElement("input")
    colPick.setAttribute("type", "color")
    colPick.value = localStorage.getItem("themeColor")
    colPick.addEventListener("change", function () { localStorage.themeColor = colPick.value; changeTheme(event.target.value) });
    tema.appendChild(colPick)
    addElement("div", dialog, "break").style.height = "50px"
    var razlikaOkroz = addElement("md-text-button", dialog, null)
    razlikaOkroz.setAttribute("style", "display: flex;align-items: center;")
    razlikaOkroz.innerHTML = "Zaokroževanje razlike:&nbsp;&nbsp;&nbsp;&nbsp;"

    var switchRaz = addElement("md-switch", razlikaOkroz, null)
    if (JSON.parse(localStorage.getItem("razlikaOkrozi"))) { switchRaz.setAttribute("selected", ""); console.log("iiii"); }
    razlikaOkroz.addEventListener("click", function () { switchRaz.selected = !switchRaz.selected })
    razlikaOkroz.setAttribute("type", "reset")
    razlikaOkroz.addEventListener("change", function () { if (localStorage.getItem("razlikaOkrozi") == "true") { localStorage.setItem("razlikaOkrozi", "false") } else { localStorage.setItem("razlikaOkrozi", "true"); } zaokrožuj = JSON.parse(localStorage.getItem("razlikaOkrozi")) }
    );

}

window.addEventListener("load", function () {
    console.log("load");
    document.querySelector("#game").addEventListener("click", function () {
        event.target.setAttribute("clicked", "")
        console.log("kakakaaaaaaaaaaaaaaaa");
    })
    var lst = document.getElementById("pomoc").getElementsByTagName("md-list-item")
    for (const item of lst) {

        item.addEventListener("click", function () {
            console.log(item.getElementsByTagName('p')[0].style.fontSize);
            if (item.getElementsByTagName('p')[0].style.fontSize == '0px') {
                item.getElementsByTagName('p')[0].style.fontSize = '1rem'
                item.getElementsByTagName('p')[0].style.maxHeight = '100vh'
                item.getElementsByTagName('md-icon')[0].innerHTML = "expand_less"
            } else {
                item.getElementsByTagName('p')[0].style.fontSize = '0'
                item.getElementsByTagName('p')[0].style.maxHeight = '0'
                item.getElementsByTagName('md-icon')[0].innerHTML = "expand_more"

            }
        })
    }
})