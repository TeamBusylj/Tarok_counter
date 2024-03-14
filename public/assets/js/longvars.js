function noDialogAnimations(newElement) {
	newElement.getOpenAnimation().dialog = [
		[
			[
				{
					opacity: "0"
				},
				{
					opacity: "1"
				}
			],
			{
				duration: 10,
				easing: "cubic-bezier(.3,.5,0,1.3)"
			}
		]
	];
	newElement.getOpenAnimation().container = [
		[
			[
				{
					opacity: "0"
				},
				{
					opacity: "1"
				}
			],
			{
				duration: 10,
				easing: "cubic-bezier(.3,.5,0,1.3)"
			}
		]
	];
	newElement.getOpenAnimation().content = [
		[
			[
				{
					opacity: "0"
				},
				{
					opacity: "1"
				}
			],
			{
				duration: 100,
				easing: "cubic-bezier(.3,.5,0,1)",
				fill: "forwards"
			}
		]
	];
	newElement.getCloseAnimation().dialog = [
		[
			[
				{
					opacity: "1"
				},
				{
					opacity: "0"
				}
			],
			{
				duration: 100,
				easing: "cubic-bezier(.3,.5,0,1.0)"
			}
		]
	];
	newElement.getCloseAnimation().content = [
		[
			[
				{
					opacity: "1"
				},
				{
					opacity: "0"
				}
			],
			{
				duration: 100,
				easing: "linear",
				fill: "forwards"
			}
		]
	];
	newElement.getCloseAnimation().scrim = [
		[
			[
				{
					opacity: "0.32"
				},
				{
					opacity: "0"
				}
			],
			{
				duration: 50,
				easing: "linear",
				fill: "forwards"
			}
		]
	];
	newElement.getOpenAnimation().scrim = [
		[
			[
				{
					opacity: "0"
				},
				{
					opacity: "0.32"
				}
			],
			{
				duration: 50,
				easing: "linear",
				fill: "forwards"
			}
		]
	];
}
function dialogAnimations(newElement) {
	newElement.getOpenAnimation().container = [
		[
			[
				{
					opacity: "1"
				},
				{
					opacity: "1"
				}
			],
			{
				duration: 100,
				easing: "cubic-bezier(.3,.5,0,1)",
				fill: "forwards"
			}
		]
	];
	newElement.getCloseAnimation().container = [
		[
			[
				{
					opacity: "1"
				},
				{
					opacity: "0"
				}
			],
			{
				duration: 1000,
				easing: "cubic-bezier(.3,.5,0,1)",
				fill: "forwards"
			}
		]
	];
	newElement.getOpenAnimation().dialog = [
		[
			[
				{
					transform: "scale(.8)",
					opacity: "0"
				},
				{
					transform: "scale(1)",
					opacity: "1"
				}
			],
			{
				duration: 500,
				easing: "cubic-bezier(0.05, 0.7, 0.1, 1.0)"
			}
		]
	];

	newElement.getCloseAnimation().dialog = [
		[
			[
				{
					transform: "scale(1)",
					opacity: "1"
				},
				{
					transform: "scale(.8)",
					opacity: "0"
				}
			],
			{
				duration: 500,
				easing: "cubic-bezier(0.05, 0.7, 0.1, 1.0)"
			}
		]
	];

	newElement.getCloseAnimation().scrim = [
		[
			[
				{
					opacity: ".32"
				},
				{
					opacity: "0"
				}
			],
			{
				duration: 150,
				easing: "linear",
				fill: "forwards"
			}
		]
	];
	newElement.getOpenAnimation().scrim = [
		[
			[
				{
					opacity: "0"
				},
				{
					opacity: "0.32"
				}
			],
			{
				duration: 300,
				easing: "linear",
				fill: "forwards"
			}
		]
	];
}

function dlgFullscreen(dialog, dlga) {
	dialog.getOpenAnimation().content = [
		[
			[
				{
					opacity: "0"
				},
				{
					opacity: "1"
				}
			],
			{
				duration: 0,
				easing: "cubic-bezier(.3, .5, 0, 1.3)",
				fill: "forwards"
			}
		]
	];
	dialog.getOpenAnimation().dialog = [
		[
			[
				{
					transform: "scale(.9)",
					opacity: "0"
				},
				{
					transform: "scale(1)",
					opacity: "1"
				}
			],
			{
				duration: 400,
				easing: "cubic-bezier(.3, .5, 0, 1.3)",
				fill: "forwards"
			}
		]
	];
	dialog.getCloseAnimation().content = [
		[
			[
				{
					opacity: "1"
				},
				{
					opacity: "0"
				}
			],
			{
				duration: 0,
				easing: "linear",
				fill: "forwards"
			}
		]
	];
	dialog.getCloseAnimation().dialog = [
		[
			[
				{
					opacity: "1"
				},
				{
					opacity: "0"
				}
			],
			{
				duration: 0,
				easing: "linear",
				fill: "forwards"
			}
		]
	];
	if (!dlga) {
		document.getElementById("homeContainer").style.display = "none";
	}
}

var policyTxt = `<b>1.</b> Aplikacija je namenjena izključno štetju točk v igri tarok. Prepovedano je kakršnokoli reproduciranje ali kopiranje vsebine za druge namene.


<b>2.</b> Uporabljamo naslednje storitve tretjih oseb:
- Google Firebase (ta storitev zagotavlja shranjevanje podatkov o igrah preko prijave z Google računom ter gostovanje spletne strani)
- Google Analytics (ta storitev zbira anonimne statistične podatke o uporabi aplikacije)

Ker so te storitve tretjih oseb v lasti Googla, lahko več informacij o tem, kako Google uporablja vaše podatke, najdete na povezavi:
<a  target="_blank" href="https://www.google.com/policies/privacy/partners/">Kako Google uporablja podatke</a>



<b>3.</b> Ne shranjujemo vaših osebnih podatkov. Vsi podatki so pridobljeni s storitvijo Google Firebase in niso trajno shranjeni oz. se uničijo takoj, ko aplikacijo zaprete in se obnovijo, ko se znova prijavite. Eden od teh je OAuth ID (unikatna številka vašega računa), ki se shrani na vaš telefon, da vas aplikacija lahko ohrani prijavljene (OAuth ID ni podatek, ki bi bil občutljiv). Piškotke shranjuje Google Firebase za potrebe prijave (več na povezavi: <a  target="_blank" href="https://firebase.google.com/support/privacy">Zasebnost Firebase</a>)


<b>4.</b> Prijava z Google računom je uporabljena za identifikacijo uporabnika in možnost shranjevanja podatkov o igrah v oblaku ter dostopanje do deljenih skupin.


<b>5.</b> Uporabnik odvezuje lastnike aplikacije kakršne koli odgovornosti ob uničenju podatkov, nedostopnosti ali nedelovanju aplikacije.


<b>6.</b> Z uporabo aplikacije se strinjate z uporabo zgoraj omenjenih pogojev in storitev. Pravico imate, da zavrnete kakršno koli zbiranje podatkov tako, da nemudoma zapustite aplikacijo.`