function noDialogAnimations(a) {
  (a.getOpenAnimation().dialog = [
    [
      [{ opacity: "0" }, { opacity: "1" }],
      { duration: 10, easing: "cubic-bezier(.3,.5,0,1.3)" },
    ],
  ]),
    (a.getOpenAnimation().container = [
      [
        [{ opacity: "0" }, { opacity: "1" }],
        { duration: 10, easing: "cubic-bezier(.3,.5,0,1.3)" },
      ],
    ]),
    (a.getOpenAnimation().content = [
      [
        [{ opacity: "0" }, { opacity: "1" }],
        { duration: 100, easing: "cubic-bezier(.3,.5,0,1)", fill: "forwards" },
      ],
    ]),
    (a.getCloseAnimation().dialog = [
      [
        [{ opacity: "1" }, { opacity: "0" }],
        { duration: 100, easing: "cubic-bezier(.3,.5,0,1.0)" },
      ],
    ]),
    (a.getCloseAnimation().content = [
      [
        [{ opacity: "1" }, { opacity: "0" }],
        { duration: 100, easing: "linear", fill: "forwards" },
      ],
    ]),
    (a.getCloseAnimation().scrim = [
      [
        [{ opacity: "0.32" }, { opacity: "0" }],
        { duration: 50, easing: "linear", fill: "forwards" },
      ],
    ]),
    (a.getOpenAnimation().scrim = [
      [
        [{ opacity: "0" }, { opacity: "0.32" }],
        { duration: 50, easing: "linear", fill: "forwards" },
      ],
    ]);
}
function dialogAnimations(a) {
  (a.getOpenAnimation().container = [
    [
      [{ opacity: "1" }, { opacity: "1" }],
      { duration: 100, easing: "cubic-bezier(.3,.5,0,1)", fill: "forwards" },
    ],
  ]),
    (a.getCloseAnimation().container = [
      [
        [{ opacity: "1" }, { opacity: "0" }],
        { duration: 1e3, easing: "cubic-bezier(.3,.5,0,1)", fill: "forwards" },
      ],
    ]),
    (a.getOpenAnimation().dialog = [
      [
        [
          { transform: "scale(.8)", opacity: "0" },
          { transform: "scale(1)", opacity: "1" },
        ],
        { duration: 500, easing: "cubic-bezier(0.05, 0.7, 0.1, 1.0)" },
      ],
    ]),
    (a.getCloseAnimation().dialog = [
      [
        [
          { transform: "scale(1)", opacity: "1" },
          { transform: "scale(.8)", opacity: "0" },
        ],
        { duration: 500, easing: "cubic-bezier(0.05, 0.7, 0.1, 1.0)" },
      ],
    ]),
    (a.getCloseAnimation().scrim = [
      [
        [{ opacity: ".32" }, { opacity: "0" }],
        { duration: 150, easing: "linear", fill: "forwards" },
      ],
    ]),
    (a.getOpenAnimation().scrim = [
      [
        [{ opacity: "0" }, { opacity: "0.32" }],
        { duration: 300, easing: "linear", fill: "forwards" },
      ],
    ]);
}
function dlgFullscreen(a, i) {
  (a.getOpenAnimation().content = [
    [
      [{ opacity: "0" }, { opacity: "1" }],
      { duration: 0, easing: "cubic-bezier(.3, .5, 0, 1.3)", fill: "forwards" },
    ],
  ]),
    (a.getOpenAnimation().dialog = [
      [
        [
          { transform: "scale(.9)", opacity: "0" },
          { transform: "scale(1)", opacity: "1" },
        ],
        {
          duration: 400,
          easing: "cubic-bezier(.3, .5, 0, 1.3)",
          fill: "forwards",
        },
      ],
    ]),
    (a.getCloseAnimation().content = [
      [
        [{ opacity: "1" }, { opacity: "0" }],
        { duration: 0, easing: "linear", fill: "forwards" },
      ],
    ]),
    (a.getCloseAnimation().dialog = [
      [
        [{ opacity: "1" }, { opacity: "0" }],
        { duration: 0, easing: "linear", fill: "forwards" },
      ],
    ]),
    i || (document.getElementById("homeContainer").style.display = "none");
}

var policyTxt =
  '<b>1.</b> Aplikacija je namenjena izključno štetju točk v igri tarok. Prepovedano je kakršnokoli reproduciranje ali kopiranje vsebine za druge namene.\n\n\n<b>2.</b> Uporabljamo naslednje storitve tretjih oseb:\n- Facebook Login (ta storitev omogoča prijavo z računom Facebook)\n- Google Firebase (ta storitev zagotavlja shranjevanje podatkov o igrah preko prijave z Google računom ter gostovanje spletne strani)\n- Google Analytics (ta storitev zbira anonimne statistične podatke o uporabi aplikacije)\n\nKer so te storitve tretjih oseb v lasti Googla in Facebooka, lahko več informacij o tem, kako Google in Facebook uporabljata vaše podatke, najdete na povezavah <a  target="_blank" href="https://policies.google.com/privacy">Pravilniki Google</a>, ter <a  target="_blank" href="https://www.facebook.com/privacy/policy">Pravilniki Facebook.</a>\n\n\n\n<b>3.</b> Ne shranjujemo vaših osebnih podatkov. Vsi podatki so pridobljeni s storitvijo Google Firebase oz. Facebook Login in niso trajno shranjeni oz. se uničijo takoj, ko aplikacijo zaprete in se obnovijo, ko se znova prijavite. \n-OAuth ID (unikatna številka vašega računa), ki se shrani v vašo napravo, da vas aplikacija lahko ohrani prijavljene (OAuth ID ni podatek, ki bi bil občutljiv). \n- Vaš E-mail račun, je uporabljen le za identifikacijo skupaj z O-Auth ID-jem. \n-Vaše ime, ki ste ga povezali z vašim Facebook ali Google računom je uporabljen le za napis \'Pozdravljeni, ...\' in se ne shranjuje nikamor. Piškotke shranjujeta Google Firebase za potrebe prijave (več na povezavi: <a  target="_blank" href="https://firebase.google.com/support/privacy">Zasebnost Firebase</a>)\n\n\n<b>4.</b>Prijava z Google računom oz. Facebook računom je uporabljena za identifikacijo uporabnika in možnost shranjevanja podatkov o igrah v oblaku ter dostopanje do deljenih skupin. Podatkov ne posredujemo tretjim osebam in sploh nikomur. \n\n\n<b>5.</b> Uporabnik odvezuje lastnike aplikacije kakršne koli odgovornosti ob uničenju podatkov, nedostopnosti ali nedelovanju aplikacije.\n\n\n<b>6.</b> Z uporabo aplikacije se strinjate z uporabo zgoraj omenjenih pogojev in storitev. Pravico imate, da zavrnete kakršno koli zbiranje podatkov tako, da nemudoma zapustite aplikacijo.';
var pravilaText =
  '<div class="pravilaSeznam"><a href="#uvod">1. Uvod</a> <a href="#karte">2. Karte</a> <a href="#deljenje">3. Deljenje kart</a> <a href="#napoved">4. Napoved igre</a> <a href="#kralj">5. Klicanje kralja</a> <a href="#izmenjava">6. Izmenjava s talonom</a> <a href="#bonusi">7. Bonusi</a> <a href="#igra">8. Igra</a> <a href="#stetje">9. Štetje kart</a> <a href="#tockovanje">10. Točkovanje</a></div><div class="pravilaContainer" id="uvod"><p class="pravilaTitle">Uvod</p><md-divider></md-divider><span>Tarok je igra za 3 ali 4 igralce. Ta pravila so prevod pravil iz <a href="https://valat.si/pravila">te spletne strani</a>, z manjšimi spremembami.<br>To je najbolj priljubljena družabna igra. Številni resni igralci imajo raje zahtevnejšo igro za tri igralce, v kateri je manj raznolikosti, a več prostora za strateško igro.<br>Taroka se ni težko naučiti, ima pa veliko različnih iger, ki si jih je treba zapomniti.<br><br>Tukaj je nekaj besed, ki se uporabljajo v igri:<br>&nbsp;&nbsp;- <b>ŠTIH</b> pomeni vzetek, torej ko vsak igralec odloži karto na mizo.<br>&nbsp;&nbsp;- <b>AKTIVNI IGRALEC</b> je igralec, ki igra <a style="text-decoration:underline" href="#napoved">zadnjo napovedano igro.</a><br>&nbsp;&nbsp;- <b>PARTNER</b> je igralec, ki ga je aktivni igralec <a style="text-decoration:underline" href="#kralj">klical.</a><br>&nbsp;&nbsp;- <b>AKTIVNA/PASIVNA EKIPA</b> sta 2 ekipi v kateri se igralci razdelijo z napovedjo igre in klicanjem. Aktivno ekipo sestavlja aktivni igralec (in njegov partner, če ga ima). Pasivno ekipo sestavljajo ostali igralci.<br>&nbsp;&nbsp;- <b>RAZLIKA</b> je vrednost, ki se šteje aktivni ekipi, da <a style="text-decoration:underline" href="#stetje">seštejemo točke</a> pri kartah, ki jih je pobrala, jih zaokrožimo na 5 in izračunamo koliko manjka do 35. Če ima aktivna ekipa 41 točk, je razlika 5, ker zaokroženo 40 manjka 5 točk do 35.</span></div><div class="pravilaContainer" id="karte"><p class="pravilaTitle">Karte</p><md-divider></md-divider><span>Igro tarok se igra s 54 kartami, od teg je 22 tarokov in 34 platelcev. Karte imajo različne vrednosti in zato različno vplivajo na končni razultat.<br><br><b>Taroki</b> so karte, ki imajo na sebi rimsko številko. Te so razporejene od <span style="font-family:ui-sans-serif">I</span> do <span style="font-family:serif">XXI</span>, torej od 1 do 21. Zadnji in najvišji tarok se imenuje Škis, na sebi nima nobenega simbola, le človeka.<br><br><b>Trula</b> so pagat (tarok <span style="font-family:ui-sans-serif">I</span>), mond (tarok <span style="font-family:ui-sans-serif">XXI</span>) in škis. So močne karte, zato vsaka od njih šteje 5 točk. <a style="text-decoration:underline" href="#bonusi">Trulo in pagat ultimo se lahko napove kot bonus.</a> Če padejo vse tri karte naenkrat, štih pobere pagat.<br><br><b>Platelci</b> so karte, ki so razdeljene na 4 barve- srce, kara, križ in pik.<br>Vsaka barva ima 8 kart, od tega 4 figure in 4 ostale platelce. Pri figurah imamo kranja, kraljico, kavala in fanta. Kavala in fanta najlažje ločimo po tem, da ima kaval konja, fant pa ne.<br>Platelci se točkujejo tako: kralj šteje 5 pik, kraljica 4, kaval 3, fant 2 in ostali placelci 1.</span></div><div class="pravilaContainer" id="deljenje"><p class="pravilaTitle">Deljenje kart</p><md-divider></md-divider><span>Igralci se usedejo v krog, eden izmed njih začne kot delilec. Vsako rundo se vloga delilca premakne za eno mesto naprej. Ali boste igrali v smeri urinega kazalca ali v nasprotni smeri, se dogovorite sami. Igra je zelo preprosta, saj vsaka runda sledi točno določenemu zaporedju korakov, ki bodo opisani v nadaljevanju.<br><br>Delilec najprej dobro premeša karte. Potem iz kupčka vzame 6 kart in jih položi na posebno mesto na mizi, ne da bi jih kdo videl. Ta kupček se imenuje <b>talon</b>.<br>Preostale karte enakomerno razdeli med igralce - če igrajo trije, dobi vsak 16 kart, sicer pa vsak 12.<br>Po deljenju lahko igralci pogledajo svoje karte. Če je kateri igralec brez tarokov, se karte ponovno delijo (pregovor: <b>BREZ TAROKA NI TAROKA</b>).</span></div><div class="pravilaContainer" id="napoved"><p class="pravilaTitle">Napoved igre</p><md-divider></md-divider><span>Ko igralci pregledajo svoje karte, se morajo dogovoriti, katero izmed različnih iger bodo igrali. To imenujemo <b>licitacija igre</b>. Nekatere igre niso na voljo pri treh igralcih ali pa prinesejo manj točk.<br><br><b style="font-size:1.1rem">Vrste iger pri taroku</b><br>Poznamo <b>pozitivne</b> in <b>negativne</b> igre. Pri negativnih igrah je cilj pobrati čim manj kart, poleg tega pa imajo še nekaj dodatnih pravil. Obstajajo <b>solo igre</b> in <b>igre s partnerjem</b>. Pri solo igrah je igralec sam in igra proti ostalim igralcem. Če igrajo le trije, so vse igre solo. Nekatere igre omogočajo napoved <a style="text-decoration:underline" href="#bonusi">dodatnih bonusov</a>. Pri teh igrah šteje tudi osvojitev brez napovedi (tiha osvojitev).<br><br>Za boljšo predstavo je spodaj tabela vseh možnih iger:<br><table class="vseIgre"><tbody><tr><th style="border-top-left-radius:20px">Igra</th><th>Vred&shy;nost v 4</th><th>Vred&shy;nost v 3</th><th>Ne&shy;ga&shy;ti&shy;vna igra</th><th>S par&shy;tner&shy;jem</th><th style="border-top-right-radius:20px">Ima bo&shy;nu&shy;se</th></tr><tr><td>Tri</td><td>10 + raz&shy;lika</td><td class="b">/</td><td></td><td class="g">DA</td><td class="g">DA</td></tr><tr><td>Dve</td><td>20 + raz&shy;lika</td><td class="b">/</td><td></td><td class="g">DA</td><td class="g">DA</td></tr><tr><td>Ena</td><td>30 + raz&shy;lika</td><td class="b">/</td><td></td><td class="g">DA</td><td class="g">DA</td></tr><tr><td>Solo tri</td><td>40 + raz&shy;lika</td><td>10 + raz&shy;lika</td><td></td><td></td><td class="g">DA</td></tr><tr><td>Solo dve</td><td>50 + raz&shy;lika</td><td>20 + raz&shy;lika</td><td></td><td></td><td class="g">DA</td></tr><tr><td>Solo ena</td><td>60 + raz&shy;lika</td><td>30 + raz&shy;lika</td><td></td><td></td><td class="g">DA</td></tr><tr><td>Solo brez</td><td>80</td><td>80</td><td></td><td></td><td></td></tr><tr><td>Klop</td><td>70</td><td>70</td><td class="r">DA</td><td></td><td></td></tr><tr><td>Berač</td><td>70</td><td>70</td><td class="r">DA</td><td></td><td></td></tr><tr><td>Odprti berač</td><td>90</td><td class="b">/</td><td class="r">DA</td><td></td><td></td></tr><tr><td>Barvni valat</td><td>125</td><td class="b">/</td><td></td><td></td><td></td></tr><tr><td style="border-bottom-left-radius:20px">Valat</td><td>500</td><td>500</td><td></td><td></td><td style="border-bottom-right-radius:20px"></td></tr></tbody></table><b style="font-size:1.1rem">Postopek napovedovanja</b><br>Napovedovanje začne igralec nasproti delilca.<br>Vsak igralec bodisi napove igro ali pa reče <b>"naprej"</b> in s tem izstopi iz napovedovanja. To se ponavlja v krogu, dokler ne ostane samo še en igralec. Ta postane aktivni igralec, ki igra zadnjo napovedano igro.<br><br>Pri napovedovanju ima igralec, ki je v krogu naslednji od delilca poseben status:<br>Ostali igralci morajo vedno preseči najvišjo prejšnjo napoved, medtem ko jo lahko ta tudi izenači. Edini lahko napove najnižji dve igri, klop in tri (ali solo tri), vendar le, če vsi pred njim že v prvem krogu izstopijo.</span></div><div class="pravilaContainer" id="kralj"><p class="pravilaTitle">Klicanje kralja</p><md-divider></md-divider><span>Če aktivni igralec igra igro s partnerjem, partnerja določi tako, da kliče kralja.<br>To naredi tako, da izbere eno izmed štirih barv in kdor ima kralja v tej barvi, postane njegov partner. Seveda ne sme izbrati barve kralja, ki jo ima v rokah, saj bi to pomenilo, da bo igral sam.<br>Na tej točki samo partner ve, kdo je v aktivni ekipi, ostali pa bodo to morali še ugotoviti. To lahko zmede ostale igralce, vendar ponavadi ni dobra odločitev.</span></div><div class="pravilaContainer" id="izmenjava"><p class="pravilaTitle">Izmenjava s talonom</p><md-divider></md-divider><span>Če igralec igra igro, ki ima v imenu številko (tri, dva, ena), izmenja toliko kart s talonom.<br><br>V tem primeru, nek igralec odpre talon in ga brez razporejanja razdeli na kupčke po toliko kart, kot je številka v imenu igre. Aktivni igralec izbere eno izmed skupin in jo doda v svoje karte.<br>Iz svojih kart nato izloči enako število kart (se založi), da ima enako število kart kot ostali igralci. Ni dovoljeno izločiti kart, ki so vredne 5 točk (trule in kraljev).<br>Izločene karte se točkujejo aktivni ekipi, preostanek talona pa pasivni ekipi.<br><br>Če se pri odpiranju talona izkaže, da je klicani kralj v talonu, aktivni igralec igra sam. Da se igra uravnovesi, dobi možnost osvojitve preostanka talona, ki bi sicer pripadal pasivni ekipi. Če izbere del talona, v katerem je klicani kralj, in z njim pobere štih, je talon njegov.<br><br><b>Nasvet:</b> Igralec naj se založi tako, da ima v rokah čim manj različnih barv, torej če ima 2 pikovi karti in 3 karine, je najbolje, da založi pike.</span></div><div class="pravilaContainer" id="bonusi"><p class="pravilaTitle">Bonusi</p><md-divider></md-divider><span>Pri vseh igrah, razen pri klopu, obstajajo tudi bonusi. Bonusi so lahko osvojeni <b>tiho</b> ali <b>napovedano</b>. Tiho pomeni, da se med igro zgodi, da ekipa naredi bonus brez predhodnje napovedi. Lahko se pa bonusi napovejo že pred igroNapoved vedno začne aktivni igralec.<br><br><b>Trula:</b> pomeni, da bo ekipa, ki jo je napovedala pobrala pagata, monda in škisa.<br><br><b>Kralji:</b> pomeni, da bo ekipa, ki jih je napovedala pobrala vse 4 kralje.<br><br><b>Kralj ultimo:</b> pomeni, da bo partner aktivnega igralca (ali on sam, če nima partnerja), v zadnjem štihu igre vrgel kralja in ga bo pobrala aktivna ekipa.<br><br><b>Pagat ultimo:</b> pomeni, da bo igralec, ki ga je napovedal, v zadnjem štihu igre vrgel pagata in z njo pobral štih. Če kdorkoli pagata pobere z višjim tarokom, se šteje minus.<br><br><b>Valat:</b> pomeni, da bo ekipa, ki ga je napovedala pobrala vse štihe.<br><br><table class="vseIgre"><tbody><tr><th style="border-top-left-radius:20px">Bonus</th><th>Vrednost</th><th>Napovedana vrednost</th><th style="border-top-right-radius:20px">Kdo lahko napove?</th></tr><tr><td>Trula</td><td>10</td><td>20</td><td>Kdorkoli.</td></tr><tr><td>Kralji</td><td>10</td><td>20</td><td>Kdorkoli.</td></tr><tr><td>Kralj ultimo</td><td>10</td><td>20</td><td>Igralec, ki ima klicanega kralja.</td></tr><tr><td>Pagat ultimo</td><td>25</td><td>50</td><td>Igralec, ki ima pagata.</td></tr><tr><td style="border-bottom-left-radius:20px">Valat</td><td>250</td><td>500</td><td style="border-bottom-right-radius:20px">Kdorkoli iz aktivne ekipe.</td></tr></tbody></table></span></div><div class="pravilaContainer" id="igra"><p class="pravilaTitle">Igra</p><md-divider></md-divider><span>Glavni del igre poteka kot zaporedje štihov.<br><br>Začne igralec, ki je imel obezno in nadaljuje naslednji v krogu. Vsak naslednji igralec more na mizo vreči karto, ki ustreza prvi. Torej, če je prvi igralec vrgel srčevo karto, morajo vsi igralci na mizo vreči srčevo karto. Če kateri od igralcev srčeve karte nima, lahko vrže tarok in s tem pobere vse srce. Če pa kakšen igralec nima niti ustrezne karte, niti taroka lahko odvrže katerokoli karto.<br>Štih vedno zmaga igralec, ki je vrgel najvišjo karto.<br><br>Naslednji štih začne tisti, ki je zmagal prejšnjega. Igra se konča, ko igralcem zmanjka kart ali prej, če je končni rezultat v točkah že znan. Po koncu igre se vsem prištejejo zaslužene točke.</span></div><div class="pravilaContainer" id="tockovanje"><p class="pravilaTitle">Točkovanje</p><md-divider></md-divider><span><b style="font-size:1.1rem">Klop</b><br>Vsi, ki v igri klopa niso pobrali niti ene karte, so zmagovalci, zato vsak izmed njih piše +70. Če je kdo pobral več kot 35 točk, je poraženec in piše -70. Če ni bilo ne zmagovalcev ne poražencev, vsak piše minus točke, ki jih je pobral.<br><br><b style="font-size:1.1rem">Tri, dva, ena</b><br>Če je aktivna ekipa skupaj dosegla najmanj 35 točk in eno karto, pišejo vsi člani vrednost igre (10, 20 ali 30 točk), skupaj z <a style="text-decoration:underline" href="#uvod">razliko</a>, ki jo je pobrala med igro, v nasprotnem primeru pa minus toliko. Poleg prištejemo, še vrednost bonusov.<br><br><b style="font-size:1.1rem">Solo tri, solo dva, solo ena</b><br>Če je aktivni igralec skupaj dosegel najmanj 35 točk in eno karto, piše vrednost igre (10, 20 ali 30 točk), skupaj z <a style="text-decoration:underline" href="#uvod">razliko</a>, ki jo je pobral med igro, v nasprotnem primeru pa minus toliko. Poleg prištejemo, še vrednost bonusov.<br><br><b style="font-size:1.1rem">Radlci</b><br>Ko se obračunajo vse točke za igro in za bonuse, se preveri, če ima aktivni igralec kakšen neporabljen radlc. Če ga ima, se podvojijo točke vseh igralcev v aktivni ekipi. Če je aktivni igralec igro zmagal, se mu radlc izbriše, v nasprotnem pa se ohrani.<br>Pravilo je malo drugačno pri igri klop, kjer se vsakemu igralcu, ki ima neporabljen radlc, podvojijo točke za igro. V primeru, da je nekdo zmagal klopa (ni pobral niti ene karte), se mu radlc izbriše.<br><b>Če se je igralo igro klop, berač, odprti berač, barvni valat ali valat, dobi vsak igralec en dodaten radlc za prihodnje igre.</b><br><br><b style="font-size:1.1rem">Mondfang (izguba monda)</b><br>Igralec, ki v igrah ena, dva, tri, solo ena, solo dva, solo tri ali solo brez izgubi monda, piše -21 točk. To se lahko zgodi na dva načina:<br>- Če je igralec igral monda in z njim ni zmagal štiha (če je v istem štihu padel še škis).<br>- Če aktivni igralec pusti monda v talonu in ga dobi pasivna ekipa.<br><br>Izguba monda se točkuje brez radlcov, torej se ne podvoji.</span></div>';
