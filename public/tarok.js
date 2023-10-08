function adaptColor(bg, txt, btn, dialog, txtDialog) {
    document.body.style.setProperty("--bgColor", bg);
    document.body.style.setProperty("--colorTxt", txt);
    document.body.style.setProperty("--colorBtn", btn);
    document.body.style.setProperty("--colorDialog", dialog);
    document.body.style.setProperty("--colorTxtDialog", txtDialog);
}
var games = {
    /* "Ime igre": ["Koliko šteje igra","razlika","dobil true, ni dobil false", "s partnerjem, brez"]*/
    Tri: [10, true, "", true],
    Dve: [20, true, "", true],
    Ena: [30, true, "", true],
    "Solo brez": [80, false, "", false],
    "Solo tri": [40, true, "", false],
    "Solo dve": [50, true, "", false],
    "Solo ena": [60, true, "", false],
    Klop: ["", false, "", true],
    Valat: [250, false, "", true],
    "Barvni Valat": [125, false, "", true],
    Berač: [70, false, "", false],
    "Odprti Berač": [90, false, "", false],
    "Po meri": ["", false, "", true],
    "Dodaj radlce": ["", false, "", true],
};

async function addScore(firstPlayer) {
    /* await resolveAfter(10);
 
     await resolveAfter(parseInt(transitionDUr.toString().replace(".","").slice(0, 2)+"00")/8);*/
    transitionDUr = 0
    listOfPlayersCopy = JSON.parse(JSON.stringify(listOfPlayers));
    var newElement = addElement("div", null, "whlScreen");
    document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(.3)";
    let lnbrk = addElement("div", newElement, "break");
    lnbrk.style.height = "30px";
    dodajOpis(newElement, "Tukaj izberite katero igro je oseba <b>" + firstPlayer + "</b> igrala.",);
    var iks = addElement("div", newElement, "iks");
    iks.innerHTML = showIks;
    iks.addEventListener("click", function (e) {
        hideElement(newElement);

    });
    for (const key in games) {
        let btn = document.createElement("button");
        btn.innerHTML = key;
        btn.classList.add("gameChose")
        btn.addEventListener("click", function () {
            newElement.innerHTML = "";
            if (key == "Klop" || key == "Po meri") {
                klop(newElement, key);
            }
            else {
                if (key == "Dodaj radlce") {
                    radlciDodaj(true);
                    removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

                    hideElement(newElement);
                    count(false);
                }
                else {
                    calculate(key, games[key], newElement, firstPlayer);
                }
            }
        });
        newElement.appendChild(btn);
    }

    document.body.appendChild(newElement);
    let names = document.querySelectorAll(".gameChose");
    console.log(names)
    let maxHeight = [...names].reduce((max, name) => Math.max(max, name.clientHeight), 0);

    names.forEach(name => {
        name.style.height = maxHeight + "px";
    });
}
var intervalTime = 0
var inert = setTimeout(() => {
    intervalTime = 1
}, 1000);
window.addEventListener('resize', function (event) {
    var ineret = setInterval(() => {
        if (intervalTime == 1) {
            let names = document.querySelectorAll(".namePlayers");
            names.forEach(name => {
                name.style.height = "fit-content"

            });
            let maxHeight = [...names].reduce((max, name) => Math.max(max, name.clientHeight), 0);

            names.forEach(name => {
                name.style.height = "0"

                name.style.height = maxHeight + "px";
            });
            this.clearInterval()
            inert = setTimeout(() => {
                intervalTime = 1
            }, 1000);
            intervalTime = 0
        }
    }, 500);


}, true);
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

function androidRadlci(list) {
    let listRadlc = list;
    for (const key in listOfPlayers) {
        if (listRadlc.includes(key)) {
            console.log(key + " includes");
            listOfPlayers[key][0] += "*";
        }
    }
    removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

    count(false);
}
var showIks = '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24.05 26.55 13.7 36.9q-.6.6-1.325.6t-1.275-.6q-.6-.55-.6-1.275 0-.725.6-1.275l10.4-10.4-10.45-10.4q-.55-.55-.55-1.275 0-.725.55-1.275.55-.55 1.275-.55.725 0 1.325.55L24 21.35 34.35 11q.55-.55 1.275-.55.725 0 1.325.55.55.6.55 1.35 0 .75-.55 1.3L26.6 24l10.35 10.4q.55.55.55 1.275 0 .725-.55 1.275-.55.55-1.275.55-.725 0-1.225-.55Z"/></svg>';
window.addEventListener("load", (event) => {

    if (navigator.onLine) showIks = '<i translate="no" class="material-icons iksFont">close</i>'
});


function klop(newElement2, gamename) {
    var newElement = addElement("div", document.body, "whlScreen");
    document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(.3)";
    dodajOpis(newElement, "Tukaj vpišite koliko točk je dobil posamezen igralec. Pišite brez predznaka minus.",);
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
        let klopPlayer = addElement("input", newElement, "klopPlayer");
        klopPlayer.type = "number";
        klopPlayer.min = 0;
        klopPlayer.name = user;
        klopPlayer.placeholder = "Tocke osebe " + user + "...";
        igralci.push(user)
    }
    addElement("div", newElement, "break");
    var btn = addElement("button", newElement, null);
    btn.innerHTML = "Končano";
    addElement("div", newElement, "break");
    btn.addEventListener("click", function () {
        let isfull = true;
        var plNombers = document.querySelectorAll(".klopPlayer");
        var tockice = []
        console.log(plNombers)
        for (const pl of plNombers) {
            console.log(pl)
            tockice.push(pl.value)
        }

        console.log(tockice)
        if (gamename == "Klop") {
            if (Array.from(document.querySelectorAll(".klopPlayer")).every((input) => input.type === "submit" || input.value.trim() !== "",)) {
                listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length + 1] = ["Klop", igralci, null, tockice, null, null, null, null];
                radlciDodaj(false)
            }
        }
        else {
            listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length + 1] = ["Po meri", igralci, null, tockice, null, null, null, null];
        }
        if (isfull) {
            hideElement(newElement)
            removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"), newElement2)
            count(false);
        }
    });
}

async function calculate(gameName, properties, newElement, firstPlayer) {
    var iks = addElement("div", newElement, "iks");
    iks.innerHTML = showIks;
    iks.addEventListener("click", function (e) {
        hideElement(newElement);

    });
    if (Object.keys(listOfPlayers).length == 4) {
        partner(newElement, gameName, properties, false, firstPlayer);
    }
    else {
        var btn = addElement("button", null, null);

        var teamWork = properties[3];
        let lnbrk = addElement("div", newElement, "break");
        lnbrk.style.height = "50px";
        dodajOpis(newElement, "Tukaj izberite ali je oseba <b>" + firstPlayer + "</b> igrala solo ali s partnerjem.",);
        newElement.setAttribute("class", "whlScreen");


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
                if (user == "!gamesData!") {
                    continue;
                }
                if (user == firstPlayer) {
                    continue;
                }
                let player = addElement("button", newElement, null);
                player.innerHTML = user
                dv.push(player)
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
            console.log(button)
            btn[button].addEventListener('click', function () {

                resolve();
            })
        }


    })
}


async function partner(newElement, gameName, properties, teamWork, firstPlayer, secondPlayer) {
    var opisek = dodajOpis(newElement, "Tukaj izberite razliko.");
    var slct2 = ""
    if (teamWork && secondPlayer !== null) {
        slct2 = secondPlayer
    }

    var razlika = 0;
    var difNu = document.createElement("input");
    if (properties[1]) {
        difNu.type = "number";
        difNu.pattern = "[0-9]*";
        difNu.min = 0;
        difNu.inputMode = "numeric"
        difNu.placeholder = "Razlika...";
        difNu.max = 34;
        newElement.appendChild(difNu);

        difNu.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                difNu.blur()
                difNu.removeEventListener("keypress")
            }
        });
        var razlika;
        difNu.addEventListener("change", function () {
            let nearestMultipleOf5 = Math.round(difNu.value / 5) * 5;
            difNu.value = nearestMultipleOf5;
            razlika = difNu.value;
            difNu.style.border = "none"
        });
        var razlike = [0, 5, 10, 15, 20, 25, 30]
        var dv = [];
        addElement("div", newElement, "break");
        for (const element in razlike) {

            let player = addElement("button", newElement, null);
            player.innerHTML = razlike[element]
            dv.push(player)
            player.addEventListener("click", function () {
                difNu.value = player.innerHTML.slice(0, player.innerHTML.indexOf("<span"))
                razlika = player.innerHTML.slice(0, player.innerHTML.indexOf("<span"))
                player.remove();
                for (let i = 0; i < dv.length; i++) {
                    dv[i].remove()
                }
                difNu.remove()

            })
        }


        await waitForButtonClick(dv);
    }
    console.log(razlika)
    var btn22 = addElement("button", null, null);
    var btn23 = addElement("button", null, null);
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
        opisek.innerHTML = "Tukaj izberite morebitne bonuse in pritisnite 'Zmaga' ali 'Poraz'. Igrala je oseba " + firstPlayer + ", z razliko " + razlika + "."
    }
    else {
        opisek.innerHTML = "Tukaj izberite morebitne bonuse in pritisnite 'Zmaga' ali 'Poraz'. Igrali sta osebi " + firstPlayer + " in " + slct2 + ", z razliko " + razlika + "."
    }
    if (properties[1]) {
        for (const key in bonusi) {
            let btn = document.createElement("button");
            btn.innerHTML = key;
            btn.style.transition = " all .2s";
            btn.style.opacity = ".6";
            btn.addEventListener("click", function () {
                var bonusDialog = addElement("div", document.body, "whlScreen");
                var iks = addElement("div", bonusDialog, "iks");
                iks.innerHTML = showIks;
                iks.addEventListener("click", function (e) {
                    bonusDialog.style.animation = "hideScreen .2s forwards";
                    setTimeout(() => {
                        bonusDialog.remove();
                    }, 200);
                    newElement.style.filter = "brightness(1)";

                });
                let lnbrk = addElement("div", bonusDialog, "break");
                lnbrk.style.height = "50px";
                bonusDialog.style.filter = "brightness(1)";
                newElement.style.filter = "brightness(.4)";
                var napovedanboolean = true;
                var dobil = true;
                let napovedano = addElement("button", bonusDialog, null);
                napovedano.innerHTML = "Napovedano";
                let ninapoved = addElement("button", bonusDialog, null);
                ninapoved.addEventListener("click", function () {
                    napovedanboolean = false;
                    napovedano.click();
                });
                ninapoved.innerHTML = "Ne napovedano";
                napovedano.addEventListener("click", function () {
                    bonusDialog.innerHTML = "";
                    bonusDialog.appendChild(iks);
                    let izgubil = addElement("button", bonusDialog, null);
                    izgubil.innerHTML = "Izgubljeno";
                    izgubil.addEventListener("click", function () {
                        dobil = false;
                        zmagal.click();
                    });
                    let zmagal = addElement("button", bonusDialog, null);
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
                        hideElement(bonusDialog);
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
    console.log(bonusTocke);
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
        console.log(bonusTocke);
        console.log(bnsi);
        if (difNu.value !== "" || properties[1] == false) {
            if (slct2 !== "" || teamWork) {
                let nearestMultipleOf5 = Math.round(razlika / 5) * 5;
                razlika = nearestMultipleOf5;
                this.remove();
                if (properties[1]) {
                    if (teamWork) {
                        listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length + 1] = [String(gameName), [firstPlayer, slct2], null, parseInt(properties[0]) + parseInt(razlika) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), true, bnsi, bonusTocke];
                        /*                        plusScore(firstPlayer, slct2, parseInt(properties[0] + parseInt(razlika) + bonusTocke),);*/
                    }
                    else {
                        listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length + 1] = [String(gameName), firstPlayer, null, parseInt(properties[0]) + parseInt(razlika) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), true, bnsi, bonusTocke];
                        /*                        aloneplusScore(firstPlayer, parseInt(parseInt(properties[0]) + parseInt(razlika) + bonusTocke,), true,);*/
                    }
                }
                else {
                    if (teamWork) {
                        listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length + 1] = [String(gameName), [firstPlayer, slct2], null, parseInt(properties[0] + bonusTocke), listOfPlayers[firstPlayer][0].length > 0, null, true, bnsi, bonusTocke];
                        /*                        plusScore(firstPlayer, slct2, parseInt(properties[0]) + bonusTocke,);*/
                    }
                    else {
                        listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length + 1] = [String(gameName), firstPlayer, null, parseInt(properties[0] + bonusTocke), listOfPlayers[firstPlayer][0].length > 0, null, true, bnsi, bonusTocke];
                        /*                        aloneplusScore(firstPlayer, parseInt(properties[0]) + bonusTocke, true,);*/
                    }
                }
            }
            if (listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length][3] > 0 && listOfPlayers[firstPlayer][0].length > 0) {
                listOfPlayers[firstPlayer][0] = listOfPlayers[firstPlayer][0].replace("*", "",);
            }
            document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(1)";
            removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

            hideElement(newElement);
            if (gameName.includes('Valat') || gameName.includes('Berač')) {
                radlciDodaj(false)
            }
            count(true);
        }
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
        console.log(bonusTocke);
        console.log(bnsi);
        if (properties[1]) {
            if (teamWork) {
                listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length + 1] = [String(gameName), [firstPlayer, slct2], null, -Math.abs(parseInt(properties[0]) + parseInt(razlika)) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), false, bnsi, bonusTocke];

                /*                plusScore(firstPlayer, slct2, -Math.abs(parseInt(properties[0] + parseInt(razlika))) + bonusTocke);*/
            }
            else {

                listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length + 1] = [String(gameName), firstPlayer, null, -Math.abs(parseInt(properties[0]) + parseInt(razlika)) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, parseInt(razlika), false, bnsi, bonusTocke];
                /*                     aloneplusScore(firstPlayer, -Math.abs(parseInt(properties[0]) + parseInt(razlika) )+ bonusTocke, true);*/
            }
        } else {
            if (teamWork) {
                listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length + 1] = [String(gameName), [firstPlayer, slct2], null, -Math.abs(parseInt(properties[0])) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, null, false, bnsi, bonusTocke];
                /*                plusScore(firstPlayer, slct2, -Math.abs(parseInt(properties[0] )+ bonusTocke),);*/
            }
            else {
                listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length + 1] = [String(gameName), firstPlayer, null, -Math.abs(parseInt(properties[0])) + bonusTocke, listOfPlayers[firstPlayer][0].length > 0, null, false, bnsi, bonusTocke];
                /*                aloneplusScore(firstPlayer, -Math.abs(parseInt(properties[0] )+ bonusTocke), true);*/
            }
        }
        if (listOfPlayers["!gamesData!"][Object.keys(listOfPlayers["!gamesData!"]).length][3] > 0 && listOfPlayers[firstPlayer][0].length > 0) {
            listOfPlayers[firstPlayer][0] = listOfPlayers[firstPlayer][0].replace("*", "",);
        }
        document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(1)";
        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        hideElement(newElement);
        if (gameName.includes('Valat') || gameName.includes('Berač')) {
            radlciDodaj(false)
        }
        count(true);
    })
}

function download() {
    var text = JSON.stringify(listOfPlayers);
    console.log(text);
    var result = "https://teambusylj.github.io/SloRadio/tarok.html#" + encodeURIComponent(text);
    var newElement = addElement("div", document.body, "whlScreen");
    document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(.3)";
    var iks = addElement("div", newElement, "iks");
    iks.innerHTML = showIks;
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideElement(newElement);
    });
    console.log(result);





    var shareButton = document.createElement("button");
    shareButton.innerHTML = "Deli";
    var copyButton = document.createElement("button");
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
        var shareButton = document.createElement("button");
        shareButton.innerHTML = "Da";
        var copyButton = document.createElement("button");
        copyButton.innerHTML = "Ne";
        newElement.appendChild(copyButton);
        newElement.appendChild(shareButton);
        shareButton.addEventListener("click", function () {
            localStorage.setItem(JSON.stringify(Object.keys(text).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", "), JSON.stringify(text),);
            localStorage.setItem(JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", ")["!gamesData"], JSON.stringify(text["!gamesData"]),);
            updateUserData(JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", ")["!gamesData"], JSON.stringify(text["!gamesData"]))
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
    dodajOpis(newElement, "Prilepite povezavo igre, ki jo je nekdo delil z vami. ");
    var linkInput = document.createElement("input");

    linkInput.type = "link";



    linkInput.placeholder = "Povezava...";

    newElement.appendChild(linkInput);
    linkInput.focus();
    var shareButton = document.createElement("button");
    shareButton.innerHTML = "Končano";
    newElement.appendChild(shareButton);

    shareButton.addEventListener("click", function () {
        upload(linkInput.value.slice(49))
        hideElement(newElement);
    });
}



/*function plusScore(playedUser, user, score) {
    if (listOfPlayers[playedUser][0] !== "") {
        listOfPlayers[user].push(score * 2);
        listOfPlayers[playedUser].push(parseInt(score * 2) + "*");
        if (score > 0 && listOfPlayers[playedUser][0].length > 0) {
            listOfPlayers[playedUser][0] = listOfPlayers[playedUser][0].replace("*", "",);
        }
    }
    else {
        listOfPlayers[user].push(score);
        listOfPlayers[playedUser].push(score);
    }
}
*/
/*function aloneplusScore(user, score) {
    if (listOfPlayers[user][0] !== "") {
        listOfPlayers[user].push(parseInt(score * 2) + "*");
        if (score > 0 && listOfPlayers[user][0].length > 0) {
            listOfPlayers[user][0] = listOfPlayers[user][0].replace("*", "");
        }
    }
    else {
        listOfPlayers[user].push(score);
    }
}
*/
function hideElement(newElement) {

    document.getElementById("actionBar").style.pointerEvents = "auto";
    newElement.style.animation = "hideScreen .2s forwards";
    try {
        document.querySelector(".cntScreen").style.filter = "";
        document.getElementById("bottomBar").style.filter = "";

    }
    catch { }
    setTimeout(() => {
        newElement.remove();
    }, 200);
}

function Game() {
    var newElement = document.createElement("div");
    newElement.setAttribute("class", "whlScreen");
    dodajOpis(newElement, "Izberite igro.");
    var iks = addElement("div", newElement, "iks");
    iks.innerHTML = showIks;
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideElement(newElement);
    });
    var slct = document.createElement("select");
    slct.innerHTML += "<option>Select</option>";
    document.body.appendChild(newElement);
    for (var i = 0; i < localStorage.length; i++) {
        let user = Object.keys(localStorage)[i];
        if (user !== "!gamesData!" && !user.includes("firebase") && user !== "uid") {
            slct.innerHTML += "<option>" + user + "</option>";
        }
    }
    newElement.appendChild(slct);
    slct.addEventListener("change", function () {
        if (slct.value !== "Select") {
            listOfPlayers = JSON.parse(localStorage[slct.value]);
            hideElement(newElement);
            listOfPlayersCopy = JSON.parse(JSON.stringify(listOfPlayers));
            if (listOfPlayers["!gamesData!"] == null) {
                listOfPlayers["!gamesData!"] = {};
            }
            document.getElementById("newgame").style.display = "none";
            document.getElementById("game").style.display = "none";
            document.getElementById("linkadd").style.display = "none";
            count(true);
        }
    });
}

function undo() {
    listOfPlayers = JSON.parse(JSON.stringify(listOfPlayersCopy));
    removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

    count(false);
}
var listOfPlayers = {};
var listOfPlayersCopy = {};

function newGame() {
    var newElement = document.createElement("div");
    newElement.setAttribute("class", "whlScreen");
    var iks = addElement("div", newElement, "iks");
    iks.innerHTML = showIks;
    iks.addEventListener("click", function (e) {
        hideElement(newElement);
    });
    let lnbrk = addElement("div", newElement, "break");
    lnbrk.style.height = "50px";
    var onePl = document.createElement("input");
    var newPl = document.createElement("button");
    var endPl = document.createElement("button");
    newPl.setAttribute("id", "addPlayer");
    newPl.innerHTML = "Dodaj igralca";
    newPl.setAttribute("class", "child");
    onePl.setAttribute("class", "child");
    onePl.placeholder = "Ime...";
    endPl.setAttribute("class", "child");
    endPl.innerHTML = "Končano";
    newElement.appendChild(onePl);
    onePl.focus();
    newElement.appendChild(newPl);
    newElement.appendChild(endPl);
    document.body.appendChild(newElement);
    newPl.addEventListener("click", function () {
        let onePl2 = addElement("input", newElement, "child");
        onePl2.placeholder = "Ime...";
        newElement.insertBefore(onePl2, newPl);
        onePl2.focus();
    });
    endPl.addEventListener("click", function () {
        listOfPlayers["!gamesData!"] = {};
        for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
            let input = document.getElementsByTagName("input")[i].value;
            listOfPlayers[input] = [""];
        }
        newElement.style.display = "none";
        localStorage.setItem(JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", "), JSON.stringify(listOfPlayers),);
        updateUserData(JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", "), JSON.stringify(listOfPlayers))
        listOfPlayersCopy = JSON.parse(JSON.stringify(listOfPlayers));
        removeElement(document.getElementById("newgame"), document.getElementById("game"))
        count(true);
    });

}

function loclStrg() {
    var inputPr = prompt("Input")
    console.log("" + inputPr + "");
    var data = JSON.parse(inputPr.toString());
    for (const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, value)
    };
}

function padArraysToLongest(obj) {
    let maxLength = 0;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const currentArray = obj[key];
            const currentLength = currentArray.length;
            if (currentLength > maxLength) {
                maxLength = currentLength;
            }
        }
    }
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const currentArray = obj[key];
            while (currentArray.length < maxLength) {
                currentArray.push("&nbsp");
            }
        }
    }
}



function count(animate) {
    document.getElementById("actionBar").style.pointerEvents = "auto";
    document.getElementById("actionBar").style.display = "flex"
    document.getElementById("homescreen").style.display = "none"
    padArraysToLongest(listOfPlayers);
    localStorage.setItem(JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", "), JSON.stringify(listOfPlayers),);
    localStorage.setItem(JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", ")["!gamesData"], JSON.stringify(listOfPlayers["!gamesData"]),);
    updateUserData(JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", "), JSON.stringify(listOfPlayers))
    try {
        Android.saveStorage(JSON.stringify(localStorage).replace("\\\\", "\\\\\\\\"));
    }
    catch { }

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
            if (!event.target.getAttribute("class").includes("word")) addScore(name)
        })
        prnt.appendChild(chl);
        newElement.appendChild(prnt);

    }
    var stGame = 1
    let pointsList = {}
    document.body.appendChild(newElement);
    for (const key in listOfPlayers) {
        if (key == "!gamesData!") { continue } else {
            pointsList[key] = parseInt(0)
        }
    }
    for (const game in listOfPlayers["!gamesData!"]) {
        let nameOne = listOfPlayers["!gamesData!"][stGame][1]
        let points = listOfPlayers["!gamesData!"][stGame][3]

        if (!Array.isArray(nameOne)) {
            const set = new Set([nameOne]);
            nameOne = Array.from(set);

        }
        if (!Array.isArray(points)) {
            const set = new Set([points]);
            points = Array.from(set);
            points.push(points[0])
        }
        console.log(points)
        for (const player of nameOne) {

            console.log(points)

            var kkk = document.createElement("p");
            if (points[nameOne.indexOf(player)] !== "") {
                if (listOfPlayers["!gamesData!"][stGame][4]) { kkk.innerHTML = parseInt(points[nameOne.indexOf(player)]) * 2; }
                else { kkk.innerHTML = parseInt(points[nameOne.indexOf(player)]) }
            }

            console.log(".chlName_" + player)
            document.querySelector(".chlName_" + player).appendChild(kkk);
            kkk.style.marginTop = "-15px";
            console.log(listOfPlayers["!gamesData!"][stGame][1][0] == player)
            if (listOfPlayers["!gamesData!"][stGame][4] && listOfPlayers["!gamesData!"][stGame][1][0] == player) {
                kkk.innerHTML = kkk.innerHTML + "*";
            }
            // kkk.setAttribute("onclick", 'gameData("' + stGame + '")');
            kkk.classList.add("word_" + stGame);
            if (points[nameOne.indexOf(player)] !== "") pointsList[player] += parseInt(points[nameOne.indexOf(player)])
            kkk.addEventListener("click", function () {
                gameData(event.target.getAttribute("class").slice(5), stGame);
            });
        }
        for (const key in listOfPlayers) {

            if (nameOne.includes(key) || key == "!gamesData!") { continue } else {
                console.log(key)
                var kkk = document.createElement("p");
                kkk.innerHTML = "&nbsp;";

                document.querySelector(".chlName_" + key).appendChild(kkk);
                console.log(".chlName_" + key)
                kkk.style.marginTop = "-15px";


                kkk.classList.add("noText");

            }


        }

        stGame++
    }
    let names = document.querySelectorAll(".namePlayers");
    let maxHeight = [...names].reduce((max, name) => Math.max(max, name.clientHeight), 0);

    names.forEach(name => {
        name.style.height = maxHeight + "px";
    });
    var subDiv = document.querySelectorAll(".chl");

    for (let i = 0; i < subDiv.length; i++) {
        const element = subDiv[i];
        element.addEventListener("scroll", function () {
            for (const key in subDiv) {
                subDiv[key].scrollTop = event.target.scrollTop;
            }
        });

    }
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
    var newElement = addElement("div", document.body, "whlScreen");
    document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(.3)";
    dodajOpis(newElement, "Tukaj lahko vidite podatke o igri in jih spremenite.",);
    if (info[0] !== "Po meri" && info[0] !== "Klop") {
        var changeValue = document.createElement("input");
        changeValue.type = "number";

        if (info[4]) { changeValue.value = info[3] * 2 } else { changeValue.value = info[3]; }
        changeValue.placeholder = "Točke...";

        newElement.appendChild(changeValue);
    }
    var table = addElement("table", null, "gameData");
    var podatki = ["Igra", "Igralec", "Partner", "Točke", "Radlc", "Razlika", "Uspeh", "Bonusi", "Bonus Točke"];
    table.style.marginBottom = " 10px"
    for (let i = 0; i < podatki.length; i++) {
        var key = podatki[i];
        let value = info[i];
        if (i == 0) {
            completePodatki[key] = [i, value, games[value][0]]
        }
        else {

            completePodatki[key] = [i, value]

        }
    }
    console.log(completePodatki);
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
                    console.log("bomus")
                    createTableData(bonusObject[key][0], "Napovedano: <wbr>" + key, data)
                    continue;
                } else {
                    console.log("bomus")
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
    var izbrisiIgro = document.createElement("button");
    izbrisiIgro.innerHTML = '<i translate="no" class="material-icons">delete</i> Izbriši';
    newElement.appendChild(izbrisiIgro);
    izbrisiIgro.addEventListener("click", function (e) {
        delete listOfPlayers["!gamesData!"][infom]
        document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(1)";
        removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))
        hideElement(newElement);
        count(false);
    })
    var iks = document.createElement("button");
    iks.innerHTML = "Končano";
    newElement.appendChild(iks);
    iks.addEventListener("click", function (e) {
        if (info[0] !== "Po meri" && info[0] !== "Klop" && listOfPlayers["!gamesData!"][infom][3] !== changeValue.value) {
            console.log(infom)
            if (info[4]) { listOfPlayers["!gamesData!"][infom][3] = changeValue.value / 2 } else { listOfPlayers["!gamesData!"][infom][3] = changeValue.value; }

            removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"))

            count(false);
        }
        hideElement(newElement);
    });
    document.body.appendChild(newElement);
}

function deleteGame() {
    var newElement = addElement("div", document.body, "whlScreen");
    var iks = addElement("div", newElement, "iks");
    iks.innerHTML = showIks;
    iks.addEventListener("click", function (e) {
        document.getElementById("game").style.animation = "none";
        hideElement(newElement);
    });
    document.querySelector(".cntScreen").style.filter = document.getElementById("bottomBar").style.filter = "brightness(.3)";
    dodajOpis(newElement, "Ali želite izbrisati to igro?",);
    var shareButton = document.createElement("button");
    shareButton.innerHTML = "Da";
    var copyButton = document.createElement("button");
    copyButton.innerHTML = "Ne";
    newElement.appendChild(copyButton);
    newElement.appendChild(shareButton);
    shareButton.addEventListener("click", function () {
        localStorage.removeItem(JSON.stringify(Object.keys(listOfPlayers).filter((key) => key !== "!gamesData!"),).replace(/"/g, "").replace("[", "").replace("]", "").replace(/,/g, ", "),);
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
var transitionDUr = 0
async function createRipple(event) {
    console.log(event.target.className)
    if (event.target.tagName == "BUTTON" || event.target.className.includes("chl")) {

        if (event.target.getAttribute("disabled") == null) {
            const button = event.target;
            if (event.target.className.includes("chl")) { button.style.overflow = "hidden" }
            const circle = document.createElement("span");
            const diameter = Math.max(button.offsetWidth, button.offsetHeight);
            const radius = diameter / 2;

            circle.classList.add("ripple");
            const rect = button.getBoundingClientRect();
            console.log(diameter)

            circle.style.left = (event.touches[0].clientX - rect.left) + "px";
            circle.style.top = (event.touches[0].clientY - rect.top) + "px";
            circle.style.width = circle.style.height = (diameter / 4) + "px";
            circle.style.opacity = "0";
            button.appendChild(circle);
            circle.style.transition = " all " + (Math.round(diameter) / 700) + "s"
            transitionDUr = (Math.round(diameter) / 500)
            console.log(" all " + (Math.round(diameter) / 500) + "s")
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

function removeElement() {
    for (const element of arguments) {
        console.log(element)
        element.remove()
    }
}
