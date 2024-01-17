var games = {
	Tri: [10, !0, "", !0, "3"],
	Dve: [20, !0, "", !0, "2"],
	Ena: [30, !0, "", !0, "1"],
	"Solo tri": [40, !0, "", !1, "S3"],
	"Solo dve": [50, !0, "", !1, "S2"],
	"Solo ena": [60, !0, "", !1, "S1"],
	"Solo brez": [80, !1, "", !1, "SB"],
	Valat: [250, !1, "", !0, "V"],
	"Barvni Valat": [125, !1, "", !0, "BV"],
	Berač: [70, !1, "", !1, "B"],
	"Odprti Berač": [90, !1, "", !1, "OB"],
	Klop: ["", !1, "", !0, "K"],
	Renons: [0, !1, "", !0, "R"],
	Mondfang: [-21, !1, "", !1, "R"],
	"Po meri": [0, !1, "", !0, "+"],
	"Uredi radlce": ["", !1, "", !0, "*"]
};
async function addScore(e) {
	var t = dialogBuilder("Oseba <b>" + e + "</b> je igrala..."),
		l = t[0],
		n = t[1];
	n.addEventListener("click", function (e) {
		hideDialog(l);
	});
	let a = 0;
	for (let i in games) {
		(3 == a || 7 == a || 11 == a) && (addElement("md-divider", l, null).style.margin = "5px"),
			a++;
		let o = document.createElement("md-outlined-button");
		(o.innerHTML = i),
			(o.style.height = "45px"),
			o.classList.add("gameChose"),
			o.setAttribute("type", "reset");
		var r = addElement("span", null, "btnIcon");
		r.setAttribute("slot", "icon"),
			(r.innerHTML = games[i][4]),
			o.addEventListener("click", function () {
				(l.innerHTML = ""),
					"Mondfang" == i
						? mondfang(l)
						: "Renons" == i
						? renons(l)
						: "Klop" == i
						? klop(l)
						: "Po meri" == i
						? poMeri(l, n)
						: "Uredi radlce" == i
						? radlciDodaj(!0, l)
						: calculate(i, games[i], l, e);
			}),
			l.appendChild(o);
	}
}
function radlciDodajSamo() {
	for (let e in listOfPlayers)
		"!gamesData!" != e && "!gameName!" != e && (listOfPlayers[e][0] += "*");
}
function radlciDodaj(e, t) {
	changeOpis(t, "Uredi radlce"), (t.innerHTML = "");
	var l = addElement("div", t, null);
	let n = document.createElement("div");
	n.setAttribute("slot", "actions"), t.parentNode.appendChild(n), i();
	let a = addElement("md-text-button", n, null);
	function i() {
		for (let e in listOfPlayers) {
			if ("!gamesData!" == e || "!gameName!" == e) continue;
			let t = addElement("label", l, null),
				n = addElement("md-outlined-text-field", t, "radlciPLayer");
			if (
				((n.name = e),
				n.setAttribute("min", "0"),
				n.setAttribute("type", "text"),
				!Array.isArray(listOfPlayers[e]))
			) {
				let a = new Set([listOfPlayers[e]]);
				listOfPlayers[e] = Array.from(a);
			}
			(n.value = listOfPlayers[e][0]),
				zaokrožuj && n.setAttribute("step", "5"),
				n.setAttribute("pattern", "[\\*]"),
				(n.label = "Radlci osebe " + e),
				addElement("div", l, "break");
		}
	}
	(a.innerHTML = "Dodaj radlce"),
		a.addEventListener("click", function () {
			for (let e in (listOfPlayersCopy.push(JSON.stringify(listOfPlayers)), listOfPlayers))
				"!gamesData!" != e && "!gameName!" != e && (listOfPlayers[e][0] += "*");
			(l.innerHTML = ""), i();
		});
	let o = addElement("md-filled-button", n, null);
	(o.innerHTML = "Končano"),
		o.addEventListener("click", function () {
			for (let e in (listOfPlayersCopy.push(JSON.stringify(listOfPlayers)), listOfPlayers)) {
				if ("!gamesData!" == e || "!gameName!" == e) continue;
				let l = document.getElementsByName(e)[0].value;
				listOfPlayers[e] = l.replace(/[^*]/g, "");
			}
			hideDialog(t), count(!0);
		});
}
var showIks = '<md-icon>close</md-icon><md-ripple for="touch" class="unbounded"></md-ripple>';
function poMeri(e, t) {
	changeOpis(e, "Vpišite toče"),
		t.addEventListener("click", function (t) {
			(document.getElementById("game").style.animation = "none"), hideDialog(e);
		});
	var l = [];
	for (let n in listOfPlayers) {
		if ("!gamesData!" == n || "!gameName!" == n) continue;
		let a = addElement("md-filled-text-field", e, null);
		addElement("div", e, "break"),
			a.classList.add("poMeri"),
			(a.type = "number"),
			(a.innerHTML = n),
			(a.value = 0),
			(a.name = 0),
			(a.label = n),
			(a.id = "meri_" + n),
			l.push(a),
			a.addEventListener("change", function () {
				a.name = a.value;
			});
	}
	var i = addElement("md-filled-button", e, null);
	(i.innerHTML = "Končano"),
		i.setAttribute("type", "reset"),
		i.addEventListener("click", function () {
			var t = [],
				n = [];
			for (let a of l)
				t.push(a.label), n.push(document.getElementById("meri_" + a.label).name);
			listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
				navigator.onLine || (localStorage.offlineChanges = !0),
				listOfPlayers["!gamesData!"].push([
					"Po Meri",
					t,
					null,
					n,
					!1,
					null,
					!0,
					[],
					0,
					!1,
					!1,
					Date.now()
				]),
				hideDialog(e),
				count(!0);
		});
}
var zaokrožuj = JSON.parse(localStorage.getItem("razlikaOkrozi"));
async function klop(e) {
	changeOpis(e, "Ali je bil kdo poln oz. prazen?");
	var t = addElement("md-outlined-button", e, null);
	t.innerHTML = "Poln";
	var l = addElement("md-outlined-button", e, null);
	l.innerHTML = "Prazen";
	var n = addElement("md-filled-button", e, null);
	(n.innerHTML = "Ne"),
		t.setAttribute("type", "reset"),
		l.setAttribute("type", "reset"),
		n.setAttribute("type", "reset"),
		(n.style.flexBasis = "100%"),
		l.addEventListener("click", function () {
			for (let t in ((e.innerHTML = ""), changeOpis(e, "Kdo je bil poln?"), listOfPlayers)) {
				if ("!gamesData!" == t || "!gameName!" == t) continue;
				let l = addElement("md-outlined-button", e, null);
				(l.innerHTML = t),
					l.setAttribute("type", "reset"),
					l.addEventListener("click", function () {
						listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
							navigator.onLine || (localStorage.offlineChanges = !0),
							listOfPlayers["!gamesData!"].push([
								"Klop",
								l.innerHTML,
								null,
								70,
								listOfPlayers[l.innerHTML][0].length > 0,
								null,
								!0,
								[],
								0,
								!1,
								!1,
								Date.now()
							]),
							hideDialog(e),
							removeElement(
								document.querySelector(".cntScreen"),
								document.querySelector(".crezultLine")
							),
							count(!0);
					});
			}
		}),
		t.addEventListener("click", function () {
			for (let t in ((e.innerHTML = ""),
			changeOpis(e, "Kdo je bil prazen?"),
			listOfPlayers)) {
				if ("!gamesData!" == t || "!gameName!" == t) continue;
				let l = addElement("md-outlined-button", e, null);
				(l.innerHTML = t),
					l.setAttribute("type", "reset"),
					l.addEventListener("click", function () {
						listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
							navigator.onLine || (localStorage.offlineChanges = !0),
							listOfPlayers["!gamesData!"].push([
								"Klop",
								l.innerHTML,
								null,
								-70,
								listOfPlayers[l.innerHTML][0].length > 0,
								null,
								!0,
								[],
								0,
								!1,
								!1,
								Date.now()
							]),
							hideDialog(e),
							removeElement(
								document.querySelector(".cntScreen"),
								document.querySelector(".crezultLine")
							),
							count(!0);
					});
			}
		}),
		await waitForButtonClick([n]),
		(e.innerHTML = "");
	var a = [];
	for (let i in listOfPlayers) {
		if ("!gamesData!" == i || "!gameName!" == i) continue;
		let o = addElement("label", e, null);
		o.innerHTML = i;
		let r = addElement("md-slider", o, "klopPlayer");
		r.setAttribute("max", "35"),
			r.setAttribute("min", "0"),
			r.setAttribute("labeled", ""),
			zaokrožuj && r.setAttribute("step", "5"),
			r.setAttribute("ticks", ""),
			(r.label = "Točke osebe " + i),
			a.push(i),
			addElement("div", e, "break");
	}
	addElement("div", e, "break");
	var s = addElement("md-filled-button", e, null);
	(s.innerHTML = "Končano"),
		addElement("div", e, "break"),
		s.addEventListener("click", function () {
			var t = document.querySelectorAll(".klopPlayer"),
				l = [];
			for (let n of t)
				listOfPlayers[n.label.replace("Točke osebe ", "")][0].length > 0
					? l.push("-" + 2 * n.value)
					: l.push("-" + n.value);
			listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
				navigator.onLine || (localStorage.offlineChanges = !0),
				listOfPlayers["!gamesData!"].push([
					"Klop",
					a,
					null,
					l,
					null,
					null,
					null,
					[],
					!1,
					!1,
					!1,
					Date.now()
				]),
				radlciDodajSamo(),
				hideDialog(e),
				removeElement(
					document.querySelector(".cntScreen"),
					document.querySelector(".crezultLine")
				),
				count(!0);
		});
}
async function mondfang(e) {
	e.innerHTML = "";
	let t = [],
		l;
	for (let n in (changeOpis(e, "Kdo je izgubil monda?"), listOfPlayers)) {
		if ("!gamesData!" == n || "!gameName!" == n) continue;
		let a = addElement("md-outlined-button", e, null);
		(a.innerHTML = n),
			t.push(a),
			a.setAttribute("type", "reset"),
			a.addEventListener("click", function () {
				(l = a),
					listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
					navigator.onLine || (localStorage.offlineChanges = !0);
			});
	}
	await waitForButtonClick(t),
		listOfPlayers["!gamesData!"].push([
			"Mondfang",
			l.innerHTML,
			null,
			-21,
			listOfPlayers[l.innerHTML][0].length > 0,
			null,
			!0,
			[],
			0,
			!1,
			!1,
			Date.now()
		]),
		hideDialog(e),
		removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine")),
		count(!0);
}
async function renons(e) {
	e.innerHTML = "";
	let t = [],
		l;
	for (let n in (changeOpis(e, "Kdo je naredil renons?"), listOfPlayers)) {
		if ("!gamesData!" == n || "!gameName!" == n) continue;
		let a = addElement("md-outlined-button", e, null);
		(a.innerHTML = n),
			t.push(a),
			a.setAttribute("type", "reset"),
			a.addEventListener("click", function () {
				(l = a),
					listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
					navigator.onLine || (localStorage.offlineChanges = !0);
			});
	}
	await waitForButtonClick(t), (e.innerHTML = ""), changeOpis(e, "Koliko znaša renons?");
	let i = addElement("md-slider", e, "klopPlayer");
	i.setAttribute("max", "50"),
		i.setAttribute("min", "0"),
		i.setAttribute("labeled", ""),
		zaokrožuj && i.setAttribute("step", "5"),
		i.setAttribute("ticks", ""),
		addElement("div", e, "break");
	let o = addElement("md-filled-button", e, null);
	(o.innerHTML = "Končano"),
		o.addEventListener("click", function () {
			listOfPlayers["!gamesData!"].push([
				"Renons",
				l.innerHTML,
				null,
				-Math.abs(parseInt(i.value)),
				!1,
				null,
				!0,
				[],
				0,
				!1,
				!1,
				Date.now()
			]),
				hideDialog(e),
				count(!0);
		});
}
async function calculate(e, t, l, n) {
	if (5 == Object.keys(listOfPlayers).length) partner(l, e, t, !1, n);
	else {
		var a = addElement("md-filled-button", null, null),
			i = t[3];
		changeOpis(l, "Je oseba <b>" + n + "</b> igrala solo ali s partnerjem?"),
			a.setAttribute("type", "reset");
		var o = [];
		if (
			(a.addEventListener("click", function () {
				this.remove();
				for (let a = 0; a < o.length; a++) o[a].remove();
				partner(l, e, t, !1, n);
			}),
			i)
		) {
			for (let r in listOfPlayers) {
				if ("!gamesData!" == r || "!gameName!" == r || r == n) continue;
				let s = addElement("md-outlined-button", l, null);
				(s.innerHTML = r),
					o.push(s),
					s.setAttribute("type", "reset"),
					s.addEventListener("click", function () {
						a.remove();
						for (let i = 0; i < o.length; i++) o[i].remove();
						partner(l, e, t, !0, n, r);
					});
			}
			(a.innerHTML = "Solo"), (a.style.flexBasis = "100%"), l.appendChild(a);
		} else partner(l, e, t, !1, n);
	}
}
function waitForButtonClick(e) {
	return new Promise((t) => {
		for (let l in e)
			e[l].addEventListener("click", function () {
				t();
			});
	});
}
async function partner(e, t, l, n, a, i) {
	var o = "";
	n && i && (o = i), changeOpis(e, "Izberite razliko");
	var r = document.createElement("md-slider"),
		s = 0;
	if (zaokrožuj) {
		if (l[1]) {
			var d = [0, 5, 10, 15, 20, 25, 30, 35],
				m = [];
			for (let c in (addElement("div", e, "break"), d)) {
				let u = addElement("md-outlined-button", e, null);
				(u.innerHTML = d[c]),
					m.push(u),
					u.setAttribute("type", "reset"),
					u.addEventListener("click", function () {
						(r.value = u.innerHTML), (s = u.innerHTML), u.remove(), (e.innerHTML = "");
					});
			}
			await waitForButtonClick(m);
		}
	} else if ((r.setAttribute("labeled", ""), l[1])) {
		(r.min = 0),
			(r.value = 0),
			(r.label = "Razlika"),
			(r.max = 35),
			(r.style.marginTop = "10px"),
			e.appendChild(r),
			addElement("div", e, "break");
		let p = addElement("md-filled-button", e, null);
		(p.innerHTML = "Končano"),
			p.setAttribute("type", "reset"),
			r.addEventListener("change", function () {
				s = r.value;
			}),
			await waitForButtonClick([p]),
			(e.innerHTML = "");
	}
	var g = addElement("md-filled-button", null, null),
		f = addElement("md-filled-tonal-button", null, null);
	(g.style.height = f.style.height = "50px"),
		(g.style.flexBasis = f.style.flexBasis = "100%"),
		addElement("div", e, "break"),
		addElement("div", e, "break"),
		(g.innerHTML = "Zmaga"),
		(f.innerHTML = "Poraz"),
		addElement("div", e, "break");
	var y = {
			Trula: [10, 20, null, null, !1],
			Kralji: [10, 20, null, null, !1],
			"Pagat ultimo": [25, 50, null, null, !1],
			"Kralj ultimo": [10, 20, null, null, !1]
		},
		v = 0;
	if (
		(n
			? l[1]
				? changeOpis(e, "Igrali sta osebi " + a + " in " + o + ", z razliko " + s + ".")
				: changeOpis(e, "Igrali sta osebi " + a + " in " + o + ".")
			: ((o = "partnerigralcakimuniimenic"),
			  l[1]
					? changeOpis(e, "Igrala je oseba " + a + ", z razliko " + s + ".")
					: ((o = "partnerigralcakimuniimenic"),
					  changeOpis(e, "Igrala je oseba " + a + "."))),
		l[1])
	)
		for (let h in y) {
			let k = document.createElement("md-outlined-button");
			(k.innerHTML = h),
				(k.style.transition = " all .2s"),
				(k.style.height = "45px"),
				k.addEventListener("click", function () {
					var t = $(e).children().detach();
					let l = e.parentNode
						.querySelector('[slot="headline"]')
						.getElementsByTagName("span")[0].innerHTML;
					e.innerHTML = "";
					var n = e;
					changeOpis(e, "Izberite"), $(".iksRight").hide();
					var a = !0,
						i = !0;
					let o = addElement("md-outlined-segmented-button-set", n, null),
						r = addElement("md-outlined-segmented-button", o, null);
					r.setAttribute("type", "reset");
					let s = addElement("md-outlined-segmented-button", o, null);
					y[h][3] && (s.selected = !0), !1 == y[h][3] && (r.selected = !0);
					let d = document.createElement("div");
					d.setAttribute("slot", "actions"), n.parentNode.appendChild(d);
					let m = addElement("md-text-button", d, null);
					(m.innerHTML = "Odstrani bonus"),
						m.setAttribute("type", "reset"),
						(k.innerHTML = h),
						m.addEventListener("click", function () {
							(y[h][2] = null),
								(y[h][3] = null),
								(y[h][4] = !1),
								(k.innerHTML = h),
								$(".iksRight").show(),
								$(e).empty().append(t),
								changeOpis(e, l),
								d.remove();
						});
					let c = addElement("md-filled-tonal-button", d, null);
					(c.innerHTML = "Končano"),
						c.setAttribute("type", "reset"),
						(s.label = "Napovedano"),
						s.setAttribute("type", "reset"),
						r.addEventListener("click", function () {
							a = !1;
						}),
						s.addEventListener("click", function () {
							a = !0;
						}),
						(r.label = "Tiho"),
						(addElement("div", n, "break").style.height = "20px");
					let u = addElement("md-outlined-segmented-button-set", n, null),
						p = addElement("md-outlined-segmented-button", u, null);
					(p.label = "Izgubljeno"),
						p.addEventListener("click", function () {
							i = !1;
						});
					let g = addElement("md-outlined-segmented-button", u, null);
					(g.label = "Dobljeno"),
						g.addEventListener("click", function () {
							i = !0;
						}),
						y[h][2] && (g.selected = !0),
						!1 == y[h][2] && (p.selected = !0),
						c.addEventListener("click", function () {
							a
								? ((y[h][3] = !0),
								  (k.innerHTML += '<md-icon slot="icon">checkbox</md-icon>'))
								: ((y[h][3] = !1),
								  (k.innerHTML += '<md-icon slot="icon">close</md-icon>')),
								i
									? ((y[h][2] = !0),
									  (k.innerHTML += '<md-icon slot="icon">checkbox</md-icon>'))
									: ((y[h][2] = !1),
									  (k.innerHTML += '<md-icon slot="icon">close</md-icon>')),
								$(".iksRight").show(),
								$(e).empty().append(t),
								changeOpis(e, l),
								d.remove();
						});
				}),
				e.appendChild(k);
		}
	addElement("md-divider", e, null).style.margin = "5px";
	let b = addElement("md-outlined-button", e, null);
	b.innerHTML = "Kontra";
	let E = addElement("md-outlined-button", e, null);
	E.innerHTML = "Rekontra";
	var _ = !1,
		L = !1,
		P = !1,
		T = !1,
		O = !1,
		j = !1,
		M = !1,
		D = !1,
		C = !1,
		H = !1,
		x = !1;
	E.addEventListener("click", function () {
		var l = $(e).children().detach();
		let n = e.parentNode
			.querySelector('[slot="headline"]')
			.getElementsByTagName("span")[0].innerHTML;
		(e.innerHTML = ""), (x = !0);
		var a = e;
		changeOpis(e, "Izberite"), $(".iksRight").hide();
		let i = document.createElement("div");
		i.setAttribute("slot", "actions"), a.parentNode.appendChild(i);
		let o = addElement("md-text-button", i, null);
		(o.innerHTML = "Končano"),
			o.addEventListener("click", function (t) {
				$(".iksRight").show(), $(e).empty().append(l), changeOpis(e, n), i.remove();
			});
		var r = addElement("md-outlined-segmented-button-set", a, null);
		r.setAttribute("multiselect", "");
		let s = addElement("md-outlined-segmented-button", r, null);
		if (
			((s.label += "Igra " + t.toLowerCase()),
			s.addEventListener("click", function () {
				j = !!s.selected;
			}),
			y.Kralji[3])
		) {
			let d = addElement("md-outlined-segmented-button", r, null);
			(d.label += "Kralji"),
				d.addEventListener("click", function () {
					M = !!d.selected;
				});
		}
		if (y.Trula[3]) {
			let m = addElement("md-outlined-segmented-button", r, null);
			(m.label += "Trula"),
				m.addEventListener("click", function () {
					D = !!m.selected;
				});
		}
		if (y["Kralj ultimo"][3]) {
			let c = addElement("md-outlined-segmented-button", r, null);
			(c.label += "Kralj ultimo"),
				c.addEventListener("click", function () {
					C = !!c.selected;
				});
		}
		if (y["Pagat ultimo"][3]) {
			let u = addElement("md-outlined-segmented-button", r, null);
			(u.label += "Pagat ultimo"),
				u.addEventListener("click", function () {
					H = !!u.selected;
				});
		}
	}),
		b.addEventListener("click", function () {
			var l = $(e).children().detach();
			let n = e.parentNode
				.querySelector('[slot="headline"]')
				.getElementsByTagName("span")[0].innerHTML;
			e.innerHTML = "";
			var a = e;
			changeOpis(e, "Izberite"), $(".iksRight").hide();
			let i = document.createElement("div");
			i.setAttribute("slot", "actions"), a.parentNode.appendChild(i);
			let o = addElement("md-text-button", i, null);
			(o.innerHTML = "Končano"),
				o.addEventListener("click", function (t) {
					$(".iksRight").show(), $(e).empty().append(l), changeOpis(e, n), i.remove();
				});
			var r = addElement("md-outlined-segmented-button-set", a, null);
			r.setAttribute("multiselect", "");
			let s = addElement("md-outlined-segmented-button", r, null);
			if (
				((s.label += "Igra " + t.toLowerCase()),
				s.addEventListener("click", function () {
					_ = !!s.selected;
				}),
				y.Kralji[3])
			) {
				let d = addElement("md-outlined-segmented-button", r, null);
				(d.label += "Kralji"),
					d.addEventListener("click", function () {
						L = !!d.selected;
					});
			}
			if (y.Trula[3]) {
				let m = addElement("md-outlined-segmented-button", r, null);
				(m.label += "Trula"),
					m.addEventListener("click", function () {
						P = !!m.selected;
					});
			}
			if (y["Kralj ultimo"][3]) {
				let c = addElement("md-outlined-segmented-button", r, null);
				(c.label += "Kralj ultimo"),
					c.addEventListener("click", function () {
						T = !!c.selected;
					});
			}
			if (y["Pagat ultimo"][3]) {
				let u = addElement("md-outlined-segmented-button", r, null);
				(u.label += "Pagat ultimo"),
					u.addEventListener("click", function () {
						O = !!u.selected;
					});
			}
		}),
		(addElement("md-divider", e, null).style.margin = "5px"),
		e.appendChild(f),
		e.appendChild(g),
		(s = Math.abs(s)),
		g.addEventListener("click", function () {
			let i = {};
			L && (y.Kralji[1] *= 2),
				P && (y.Trula[1] *= 2),
				T && (y["Kralj ultimo"][1] *= 2),
				O && (y["Pagat ultimo"][1] *= 2),
				M && (y.Kralji[1] *= 4),
				D && (y.Trula[1] *= 4),
				C && (y["Kralj ultimo"][1] *= 4),
				H && (y["Pagat ultimo"][1] *= 4);
			let r = {
				Kralji: L,
				Trula: P,
				"Pagat ultimo": O,
				"Kralj ultimo": T,
				Kralji2: M,
				Trula2: D,
				"Pagat ultimo2": H,
				"Kralj ultimo2": C
			};
			for (let d in y)
				null !== y[d][2] &&
					(!1 !== y[d][2]
						? !0 == y[d][3]
							? ((i[d] = [y[d][1], !0, !0, r[d], r[d + "2"]]), (v += y[d][1]))
							: ((i[d] = [y[d][0], !1, !0, r[d], r[d + "2"]]), (v += y[d][0]))
						: !0 == y[d][3]
						? ((i[d] = [-Math.abs(y[d][1]), !0, !1]), r[d], r[d + "2"], (v -= y[d][1]))
						: ((i[d] = [-Math.abs(y[d][0]), !1, !1, r[d], r[d + "2"]]),
						  (v -= y[d][0])));
			listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
				navigator.onLine || (localStorage.offlineChanges = !0),
				("" !== o || n) &&
					(this.remove(),
					l[1]
						? n
							? listOfPlayers["!gamesData!"].push([
									String(t),
									[a, o],
									null,
									parseInt(l[0]) + parseInt(s) + v,
									listOfPlayers[a][0].length > 0,
									parseInt(s),
									!0,
									i,
									v,
									!1,
									!1,
									Date.now()
							  ])
							: listOfPlayers["!gamesData!"].push([
									String(t),
									a,
									null,
									parseInt(l[0]) + parseInt(s) + v,
									listOfPlayers[a][0].length > 0,
									parseInt(s),
									!0,
									i,
									v,
									!1,
									!1,
									Date.now()
							  ])
						: n
						? listOfPlayers["!gamesData!"].push([
								String(t),
								[a, o],
								null,
								parseInt(l[0] + v),
								listOfPlayers[a][0].length > 0,
								null,
								!0,
								i,
								v,
								!1,
								!1,
								Date.now()
						  ])
						: listOfPlayers["!gamesData!"].push([
								String(t),
								a,
								null,
								parseInt(l[0] + v),
								listOfPlayers[a][0].length > 0,
								null,
								!0,
								i,
								v,
								!1,
								!1,
								Date.now()
						  ])),
				listOfPlayers["!gamesData!"].slice(-1)[0][3] > 0 &&
					listOfPlayers[a][0].length > 0 &&
					(listOfPlayers[a][0] = listOfPlayers[a][0].replace("*", "")),
				_ && (listOfPlayers["!gamesData!"].at(-1)[9] = !0),
				j && (listOfPlayers["!gamesData!"].at(-1)[10] = !0),
				hideDialog(e),
				(t.includes("Valat") || t.includes("Berač")) && radlciDodajSamo(),
				count(!0);
		}),
		f.addEventListener("click", function () {
			let i = {};
			L && (y.Kralji[1] *= 2),
				P && (y.Trula[1] *= 2),
				T && (y["Kralj ultimo"][1] *= 2),
				O && (y["Pagat ultimo"][1] *= 2),
				M && (y.Kralji[1] *= 4),
				D && (y.Trula[1] *= 4),
				C && (y["Kralj ultimo"][1] *= 4),
				H && (y["Pagat ultimo"][1] *= 4);
			let r = {
				Kralji: L,
				Trula: P,
				"Pagat ultimo": O,
				"Kralj ultimo": T,
				Kralji2: M,
				Trula2: D,
				"Pagat ultimo2": H,
				"Kralj ultimo2": C
			};
			for (let d in y)
				null !== y[d][2] &&
					(!1 !== y[d][2]
						? !0 == y[d][3]
							? ((i[d] = [y[d][1], !0, !0, r[d], r[d + "2"]]), (v += y[d][1]))
							: ((i[d] = [y[d][0], !1, !0, r[d], r[d + "2"]]), (v += y[d][0]))
						: !0 == y[d][3]
						? ((i[d] = [-Math.abs(y[d][1]), !0, !1]), r[d], r[d + "2"], (v -= y[d][1]))
						: ((i[d] = [-Math.abs(y[d][0]), !1, !1, r[d], r[d + "2"]]),
						  (v -= y[d][0])));
			listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
				navigator.onLine || (localStorage.offlineChanges = !0),
				l[1]
					? n
						? listOfPlayers["!gamesData!"].push([
								String(t),
								[a, o],
								null,
								-Math.abs(parseInt(l[0]) + parseInt(s)) + v,
								listOfPlayers[a][0].length > 0,
								parseInt(s),
								!1,
								i,
								v,
								!1,
								!1,
								Date.now()
						  ])
						: listOfPlayers["!gamesData!"].push([
								String(t),
								a,
								null,
								-Math.abs(parseInt(l[0]) + parseInt(s)) + v,
								listOfPlayers[a][0].length > 0,
								parseInt(s),
								!1,
								i,
								v,
								!1,
								!1,
								Date.now()
						  ])
					: n
					? listOfPlayers["!gamesData!"].push([
							String(t),
							[a, o],
							null,
							-Math.abs(parseInt(l[0])) + v,
							listOfPlayers[a][0].length > 0,
							null,
							!1,
							i,
							v,
							!1,
							!1,
							Date.now()
					  ])
					: listOfPlayers["!gamesData!"].push([
							String(t),
							a,
							null,
							-Math.abs(parseInt(l[0])) + v,
							listOfPlayers[a][0].length > 0,
							null,
							!1,
							i,
							v,
							!1,
							!1,
							Date.now()
					  ]),
				listOfPlayers["!gamesData!"].slice(-1)[0][3] > 0 &&
					listOfPlayers[a][0].length > 0 &&
					(listOfPlayers[a][0] = listOfPlayers[a][0].replace("*", "")),
				_ && (listOfPlayers["!gamesData!"].at(-1)[9] = !0),
				j && (listOfPlayers["!gamesData!"].at(-1)[10] = !0),
				hideDialog(e),
				(t.includes("Valat") || t.includes("Berač")) && radlciDodajSamo(),
				count(!0);
		});
}
function download() {
	JSON.stringify(listOfPlayers);
	var e =
		"https://tarock-counter.web.app/" +
		encodeURIComponent("users/" + sessionStorage.uid + "/games/" + listOfPlayers["!gameName!"]);
	console.log(e);
	try {
		navigator.userAgent.includes("wv")
			? Android.share(e)
			: navigator.share &&
			  navigator
					.share({
						title: "Tarok igra",
						text: "Vabim te, da se pridružiš moji tarok skupini.",
						url: e
					})
					.then(() => console.log("Success sharing"))
					.catch((e) => console.log("Error sharing", e));
	} catch (t) {}
}
function deleteAllData() {
	var e = dialogBuilder(
			"Ali res želite izbrisati vse svoje podatke? Tega dejanja ni mogoče razveljaviti.",
			!1
		),
		t = e[0],
		l = e[1];
	let n = addElement("md-icon", t.parentNode, null);
	(n.innerHTML = "delete_outline"),
		n.setAttribute("slot", "icon"),
		l.addEventListener("click", function (e) {
			(document.getElementById("game").style.animation = "none"), hideDialog(t);
		});
	let a = document.createElement("div");
	a.setAttribute("slot", "actions"), t.parentNode.appendChild(a);
	var i = document.createElement("md-text-button");
	i.innerHTML = "Da";
	var o = document.createElement("md-filled-tonal-button");
	(o.innerHTML = "Ne"),
		a.appendChild(i),
		a.appendChild(o),
		i.addEventListener("click", function () {
			deleteAllDataF(), hideDialog(t);
		}),
		o.addEventListener("click", function () {
			hideDialog(t);
		});
}
async function upload() {
	if (
		null !== sessionStorage.uid &&
		void 0 !== sessionStorage.uid &&
		"null" !== sessionStorage.uid &&
		navigator.onLine
	)
		try {
			var e = decodeURIComponent(location.pathname.slice(1)),
				t = await loadDataPath(e);
			if (e.includes(sessionStorage.uid))
				dlgNotif("Ta skupina je vaša."),
					window.history.replaceState({}, document.title, "/");
			else {
				var l = dialogBuilder(
						"Ali se želite pridružiti skupini '" +
							t["!gameName!"] +
							"' z igralci " +
							JSON.stringify(
								Object.keys(t).filter(
									(e) => "!gamesData!" !== e && "!gameName!" !== e
								)
							)
								.replace(/"/g, "")
								.replace("[", "")
								.replace("]", "")
								.replace(/,/g, ", ") +
							"?"
					),
					n = l[0],
					a = l[1];
				(t["!gameName!"] = e),
					window.history.replaceState({}, document.title, "/"),
					a.addEventListener("click", function (e) {
						(document.getElementById("game").style.animation = "none"), hideDialog(n);
					});
				let i = document.createElement("div");
				i.setAttribute("slot", "actions"), n.parentNode.appendChild(i);
				var o = document.createElement("md-filled-tonal-button");
				o.innerHTML = "Da";
				var r = document.createElement("md-text-button");
				(r.innerHTML = "Ne"),
					i.appendChild(r),
					i.appendChild(o),
					o.addEventListener("click", function () {
						let e = JSON.parse(localStorage.getItem("games")) || {};
						(e["/" + t["!gameName!"]] = t),
							localStorage.setItem("games", JSON.stringify(e)),
							updateUserData(),
							hideDialog(n);
					}),
					r.addEventListener("click", function () {
						hideDialog(n);
					});
			}
		} catch (s) {
			console.log("Not right link");
		}
	else
		location.pathname.includes("public") ||
			(dlgNotif(
				"Za dostop do deljene skupine morate biti prijavljeni in imeti internetno povezavo."
			),
			window.history.replaceState({}, document.title, "/"));
}
function hideElement(e) {
	(e.style.animation = "hideScreen .2s forwards"),
		setTimeout(() => {
			e.remove();
		}, 200);
}
function changeOpis(e, t) {
	e.parentNode.querySelector('[slot="headline"]').getElementsByTagName("span")[0].innerHTML = t;
}
function dialogBuilder(e, t) {
	var l = document.createElement("md-dialog");
	l.setAttribute("open", ""), queryAnim ? noDialogAnimations(l) : dialogAnimations(l);
	var n = addElement("span", l, null);
	n.setAttribute("slot", "headline"),
		n.setAttribute("class", "dialog-headline"),
		(n.innerHTML = '<span style="flex: .83;">' + e + "</span>");
	var a = document.createElement("md-icon-button");
	if (!1 !== t) {
		a.setAttribute("value", "close"),
			a.classList.add("iksRight"),
			(a.innerHTML = showIks),
			n.appendChild(a);
		var i = addElement("md-icon-button", n, "iksRight");
		(i.innerHTML = "<md-icon>help</md-icon>"),
			(i.style.right = "50px"),
			i.addEventListener("click", function () {
				helpMe(l);
			});
	}
	var o = addElement("div", l, null);
	return (
		o.setAttribute("style", "display: flex;flex-wrap: wrap;justify-content: center;"),
		o.setAttribute("slot", "content"),
		l.addEventListener("cancel", function () {
			hideDialog(o);
		}),
		document.body.appendChild(l),
		setTimeout(() => {
			document
				.querySelector("body > md-dialog")
				.shadowRoot.querySelector(".scrim").style.zIndex = "3";
		}, 3),
		o.setAttribute("method", "dialog"),
		[o, a]
	);
}
function Game(e) {
	if (e) clickedUser(e.toString(), e.toString());
	else {
		var t = dialogBuilder("Izberite skupino"),
			l = t[0];
		t[1].addEventListener("click", function (e) {
			(document.getElementById("game").style.animation = "none"), hideDialog(l);
		}),
			l.setAttribute("id", "dlgSlct");
		var n = document.createElement("md-list"),
			a = document.createElement("md-list");
		l.style.borderRadius = "15px";
		let i = JSON.parse(localStorage.getItem("games")) || {};
		if (0 == Object.keys(i).length) {
			var o = document.createElement("p");
			(o.innerHTML = "Nimate še nobenih skupin."), l.appendChild(o);
		} else {
			for (var r = 0; r < Object.keys(i).length; r++) {
				let s = Object.keys(i)[r],
					d = s;
				if (s.includes("/users/")) {
					if (
						"!gamesData!" !== (s = s.slice(s.lastIndexOf("/") + 1)) ||
						"!gameName!" !== s
					) {
						var m = addElement("md-list-item", null, null);
						m.setAttribute("type", "button"),
							m.setAttribute("interactive", ""),
							a.getElementsByTagName("md-list-item").length > 0 &&
								addElement("md-divider", a, null).setAttribute(
									"style",
									"height:5px;--_color: var(--md-sys-color-surface-container-high)"
								),
							(m.innerHTML += s),
							m.addEventListener("click", function () {
								clickedUser(s, d);
							});
						let c = addElement("md-icon-button", m, null);
						c.setAttribute("slot", "end"),
							(c.innerHTML = "<md-icon >close</md-icon>"),
							c.addEventListener("click", async function () {
								event.stopPropagation(),
									((listOfPlayers = await loadDataPath(d))["!gameName!"] = d),
									l.parentNode.close(),
									deleteGame();
							}),
							a.appendChild(m);
					}
				} else if ("!gamesData!" !== s || "!gameName!" !== s) {
					var m = addElement("md-list-item", null, null);
					m.setAttribute("type", "button"),
						m.setAttribute("interactive", ""),
						n.getElementsByTagName("md-list-item").length > 0 &&
							addElement("md-divider", n, null).setAttribute(
								"style",
								"height:5px;--_color: var(--md-sys-color-surface-container-high)"
							),
						(m.innerHTML += s),
						m.addEventListener("click", function () {
							clickedUser(s, d);
						});
					let u = addElement("md-icon-button", m, null);
					u.setAttribute("slot", "end"),
						(u.innerHTML = "<md-icon >delete</md-icon>"),
						u.addEventListener("click", function () {
							event.stopPropagation(),
								(listOfPlayers = JSON.parse(localStorage.games)[d.toString()]),
								l.parentNode.close(),
								deleteGame();
						}),
						n.appendChild(m);
				}
			}
			var p = document.createElement("p"),
				g = document.createElement("p");
			0 !== n.getElementsByTagName("md-list-item").length &&
				((g.innerHTML = "Zasebne skupine"), l.appendChild(g), l.appendChild(n)),
				0 !== a.getElementsByTagName("md-list-item").length &&
					((p.innerHTML = "Deljene skupine"), l.appendChild(p), l.appendChild(a));
		}
	}
}
function hideDialog(e) {
	e.parentNode.close(),
		queryAnim
			? e.parentNode.remove()
			: setTimeout(() => {
					e.parentNode.remove();
			  }, 150);
}
async function clickedUser(e, t) {
	try {
		hideDialog(document.getElementById("dlgSlct"));
	} catch {}
	let l = decodeURIComponent(t);
	if (e !== l) {
		if (navigator.onLine)
			try {
				(listOfPlayers = await loadDataPath(l))["!gameName!"] = l;
			} catch {
				dlgNotif("Zgodila se je napaka. Skupina je bila verjetno izbrisana.");
				let n = JSON.parse(localStorage.getItem("games")) || {};
				delete n[l], localStorage.setItem("games", JSON.stringify(n)), updateUserData();
			}
		else dlgNotif("Brez internetne povezave ne morete dostopati do deljene skupine.");
	} else {
		let a = JSON.parse(localStorage.getItem("games")) || {};
		listOfPlayers = a[e];
	}
	void 0 !== listOfPlayers &&
		(listOfPlayers["!gamesData!"] || (listOfPlayers["!gamesData!"] = []),
		listOfPlayers["!gameName!"].includes("/users/") && updateSharedRemote(),
		count(!0)),
		"/public/" !== location.pathname &&
			window.history.pushState(
				{},
				document.title,
				"/" + encodeURIComponent(listOfPlayers["!gameName!"])
			);
}
function dlgNotif(e, t = "Napaka") {
	var l = addElement("md-text-button", null, null);
	l.innerHTML = "Ok";
	var n = dialogBuilder(t, !1)[0];
	l.addEventListener("click", function (e) {
		hideDialog(n);
	});
	let a = document.createElement("div");
	a.setAttribute("slot", "actions"),
		n.parentNode.appendChild(a),
		a.appendChild(l),
		(n.innerHTML = e);
}
function undo() {
	listOfPlayersCopy.length > 0 &&
		((listOfPlayers = JSON.parse(listOfPlayersCopy[listOfPlayersCopy.length - 1])),
		listOfPlayersCopy.pop(),
		count(!0, !1)),
		0 == listOfPlayersCopy.length && (document.querySelector(".undoBtn").disabled = !0);
}
(null == zaokrožuj || void 0 == zaokrožuj) && (zaokrožuj = !0);
var listOfPlayers = {},
	listOfPlayersCopy = [];
function newGame() {
	var e = dialogBuilder("Vpišite člane"),
		t = e[0];
	e[1].addEventListener("click", function (e) {
		hideDialog(t);
	}),
		(listOfPlayers = {});
	var l = addElement("div", t.parentNode, null);
	l.setAttribute("slot", "actions");
	var n = document.createElement("md-outlined-text-field"),
		a = document.createElement("md-text-button"),
		i = document.createElement("md-filled-tonal-button");
	a.setAttribute("id", "addPlayer"),
		a.setAttribute("slot", "content"),
		(a.style.margin = i.style.margin = "0"),
		(a.innerHTML = "Dodaj igralca"),
		(n.style.marginBottom = "10px"),
		(n.label = "Ime"),
		(n.style.borderRadius = "4px"),
		n.setAttribute("slot", "content"),
		(i.innerHTML = "Naprej"),
		t.appendChild(n),
		n.focus();
	addElement("div", t, "break").setAttribute("slot", "content"),
		l.appendChild(a),
		l.appendChild(i),
		a.addEventListener("click", function () {
			let e = addElement("md-outlined-text-field", t, null);
			(e.style.borderRadius = "4px"),
				(e.label = "Ime"),
				(e.style.marginBottom = "10px"),
				t.appendChild(e),
				e.focus;
		}),
		i.addEventListener("click", async function () {
			let e = !1;
			for (
				var n = 0;
				n < document.getElementsByTagName("md-outlined-text-field").length;
				n++
			) {
				let o = document.getElementsByTagName("md-outlined-text-field")[n];
				0 == o.value.length &&
					((o.style.outline = "7px red solid"),
					setTimeout(() => {
						o.style.outline = "0px red solid";
					}, 200),
					(e = !0));
			}
			if (!e) {
				for (
					var n = 0;
					n < document.getElementsByTagName("md-outlined-text-field").length;
					n++
				)
					listOfPlayers[
						document.getElementsByTagName("md-outlined-text-field")[n].value
					] = [""];
				listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
					navigator.onLine || (localStorage.offlineChanges = !0),
					(t.innerHTML = ""),
					a.remove(),
					i.remove(),
					(listOfPlayers["!gamesData!"] = []),
					changeOpis(t, "Vpišite vzdevek skupine");
				var r = document.createElement("md-filled-text-field"),
					s = document.createElement("md-filled-tonal-button");
				(r.label = "Vzdevek skupine"),
					(r.value = JSON.stringify(
						Object.keys(listOfPlayers).filter((e) => "!gamesData!" !== e)
					)
						.replace(/"/g, "")
						.replace("[", "")
						.replace("]", "")
						.split(",")
						.sort()
						.toString()
						.replace(/,/g, ", ")),
					(s.innerHTML = "Končano"),
					t.appendChild(r),
					l.appendChild(s),
					await waitForButtonClick([s]),
					(listOfPlayers["!gameName!"] = r.value),
					navigator.onLine || (localStorage.offlineChanges = !0),
					hideDialog(t),
					count(!0);
			}
		});
}
function loclStrg() {
	var e = JSON.parse(prompt("Input").toString());
	for (let [t, l] of Object.entries(e)) localStorage.setItem(t, l);
}
function count(e, t) {
	listOfPlayers["!gamesData!"] || (listOfPlayers["!gamesData!"] = []);
	try {
		removeElement(document.querySelector(".cntScreen"), document.querySelector(".crezultLine"));
	} catch (l) {}
	setTimeout(() => {
		let e = document.getElementsByTagName("md-dialog");
		for (let t = 0; t < e.length; t++) e[t].remove();
	}, 300),
		listOfPlayersCopy.length > 0 && (document.querySelector(".undoBtn").disabled = !1),
		listOfPlayers["!gameName!"].includes("/users/")
			? ((document.querySelector(".shrBtn").disabled = !0),
			  "yes" !== document.getElementById("clck").label &&
					(document.getElementById("clck").addEventListener("click", function () {
						dlgNotif("Da povabite nekoga v skupino morate biti njen lastnik.");
					}),
					(document.getElementById("clck").label = "yes")),
			  (document.querySelector(".dltBtn").innerHTML = "<md-icon>insert_chart</md-icon>"))
			: ((document.querySelector(".shrBtn").disabled = !1),
			  (document.querySelector(".dltBtn").innerHTML = "<md-icon>insert_chart</md-icon>")),
		(null != sessionStorage.uid &&
			void 0 != sessionStorage.uid &&
			"null" != sessionStorage.uid &&
			"undefined" != sessionStorage.uid &&
			navigator.onLine) ||
			("yes" !== document.getElementById("clck").label &&
				(document.getElementById("clck").addEventListener("click", function () {
					dlgNotif(
						"Da povabite nekoga v skupino morate biti prijavljeni in imeti internetno povezavo."
					);
				}),
				(document.getElementById("clck").label = "yes")),
			(document.querySelector(".shrBtn").disabled = !0)),
		(document.getElementById("actionBar").style.display = "flex"),
		(document.getElementById("homeContainer").style.display = "none");
	let n = JSON.parse(localStorage.getItem("games")) || {};
	(n[listOfPlayers["!gameName!"]] = listOfPlayers),
		localStorage.setItem("games", JSON.stringify(n)),
		updateUserData(),
		localStorage.removeItem(void 0);
	var a = addElement("div", document.body, "cntScreen");
	(a.id = "cntScreen"),
		e && (a.style.animation = "showScreen var(--transDur) forwards cubic-bezier(.3,.5,0,1.3)");
	var i = document.createElement("div");
	for (let o in ((i.id = "crezultLine"), listOfPlayers)) {
		if ("!gamesData!" == o || "!gameName!" == o) continue;
		let r = o;
		var s = document.createElement("div"),
			d = document.createElement("div");
		if (!Array.isArray(listOfPlayers[o])) {
			let m = new Set([listOfPlayers[o]]);
			listOfPlayers[o] = Array.from(m);
		}
		(d.innerHTML =
			'<p class="namePlayers"> ' + listOfPlayers[o].toString() + "<br>" + r + " </p>"),
			(s.innerHTML = String(s.innerHTML).replace("undefined", "")),
			(s.innerHTML += '<p style = "" class="noText" ></p>'),
			(s.innerHTML += ' <p style = "" class="noText" ></p>'),
			s.setAttribute("class", "chl chlName_" + r.replace(/ /g, "_"));
		(addElement("md-ripple", d, null).style.zIndex = "10"), (s.style.display = "inline-block;");
		var c = addElement("p", i, null);
		c.setAttribute("class", "rezult_" + r.replace(/ /g, "_")),
			c.setAttribute(
				"style",
				"flex: 1; color: var(--colorTxtDialog); background-color:var(--colorDialog); padding-top: 15px; padding-bottom: 15px; border-top-left-radius: 30px; border-top-right-radius: 30px; margin-left:10px;margin-right:10px;"
			),
			(c.innerHTML = ""),
			d.setAttribute("class", "prnt prntName_" + r.replace(/ /g, "_")),
			d.addEventListener("click", function () {
				event.target.className.includes("word") || addScore(r);
			}),
			d.appendChild(s),
			a.appendChild(d);
	}
	var u = 0;
	let p = {};
	for (let g in (document.body.appendChild(a), listOfPlayers))
		"!gamesData!" != g && "!gameName!" != g && (p[g] = parseInt(0));
	listOfPlayers["!gamesData!"] || (listOfPlayers["!gamesData!"] = []);
	for (var f = 0; f < listOfPlayers["!gamesData!"].length; f++) {
		let y = f;
		if (!listOfPlayers["!gamesData!"][y]) continue;
		let v = listOfPlayers["!gamesData!"][y][1],
			h = listOfPlayers["!gamesData!"][y][3];
		if (!Array.isArray(v)) {
			let k = new Set([v]);
			v = Array.from(k);
		}
		if (!Array.isArray(h)) {
			let b = new Set([h]);
			(h = Array.from(b)).push(h[0]);
		}
		for (let E of v) {
			let _ = h[v.indexOf(E)];
			var L = document.createElement("md-text-button");
			if (
				("" !== _ &&
					(listOfPlayers["!gamesData!"][y][4] && (_ = 2 * parseInt(_)),
					(L.innerHTML = parseInt(_)),
					listOfPlayers["!gamesData!"][y][9] &&
						((_ = 2 * parseInt(L.innerHTML)), (L.innerHTML = parseInt(_))),
					listOfPlayers["!gamesData!"][y][10] &&
						((_ = 4 * parseInt(L.innerHTML)), (L.innerHTML = parseInt(_)))),
				document.querySelector(".chlName_" + E.replace(/ /g, "_")).appendChild(L),
				(L.style.marginTop = "2px"),
				(L.style.marginBottom = "2px"),
				(L.style.fontSize = "1rem"),
				!Array.isArray(listOfPlayers["!gamesData!"][y][1]))
			) {
				let P = new Set([listOfPlayers["!gamesData!"][y][1]]);
				listOfPlayers["!gamesData!"][y][1] = Array.from(P);
			}
			listOfPlayers["!gamesData!"][y][4] &&
				listOfPlayers["!gamesData!"][y][1][0] == E &&
				(L.innerHTML = L.innerHTML + "*"),
				L.classList.add(E + "_score"),
				"" !== _ && (p[E] = p[E] + parseInt(_)),
				"&bbsp;" !== L.innerHTML &&
					L.addEventListener("click", function () {
						gameData(event.target.getAttribute("class").slice(5), u);
					}),
				"" == _ && (L.innerHTML = "&nbsp;"),
				addElement(
					"div",
					document.querySelector(".chlName_" + E.replace(/ /g, "_")),
					"break"
				);
		}
		for (let T in listOfPlayers)
			if (!v.includes(T) && "!gamesData!" != T && "!gameName!" != T) {
				var L = document.createElement("md-text-button");
				(L.style.marginTop = "2px"),
					(L.style.marginBottom = "2px"),
					(L.style.fontSize = "1rem"),
					(L.innerHTML = "&nbsp;"),
					document.querySelector(".chlName_" + T.replace(/ /g, "_")).appendChild(L),
					(L.disabled = !0),
					L.classList.add("noText"),
					addElement(
						"div",
						document.querySelector(".chlName_" + T.replace(/ /g, "_")),
						"break"
					);
			}
		u++;
	}
	let O = document.querySelectorAll(".namePlayers"),
		j = [...O].reduce((e, t) => Math.max(e, t.clientHeight), 0);
	O.forEach((e) => {
		e.style.height = j + "px";
	});
	try {
		let M = document.querySelectorAll(".chl");
		function D(e) {
			let t = e.target.scrollTop;
			M.forEach((e) => {
				e.scrollTop = t;
			});
		}
		M.forEach((e) => {
			e.addEventListener("scroll", D);
		});
	} catch (C) {
		console.log(C);
	}
	for (let H in (i.setAttribute("class", "crezultLine"),
	document.getElementById("bottomBar").insertBefore(i, document.getElementById("actionBar")),
	listOfPlayers))
		"!gamesData!" != H &&
			"!gameName!" != H &&
			(document.querySelector(".rezult_" + H.replace(/ /g, "_")).innerHTML = p[H]);
	setTimeout(() => {
		var e = document.getElementsByClassName("chl")[0];
		e.scrollTo(0, e.scrollHeight + 100);
	}, 1);
}
function addElement(e, t, l) {
	var n = document.createElement(e);
	return l && n.classList.add(l), t && t.appendChild(n), n;
}
var completePodatki = {};
function gameData(e, t) {
	var l = listOfPlayers["!gamesData!"][parseInt(e)],
		n = dialogBuilder("Igra", !1)[0];
	if ("Po meri" !== l[0] && "Klop" !== l[0]) {
		var a = document.createElement("md-outlined-text-field");
		(a.type = "number"),
			l[4] ? (a.value = 2 * l[3]) : (a.value = l[3]),
			(a.label = "Točke"),
			n.appendChild(a);
	}
	var i = addElement("table", null, "gameData"),
		o = [
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
			"Datum"
		];
	i.style.marginBottom = "10px";
	for (let r = 0; r < o.length; r++) {
		var s = o[r];
		let d = l[r];
		0 == r && "Po Meri" !== d
			? (completePodatki[s] = [r, d, games[d.toString()][0]])
			: (completePodatki[s] = [r, d]);
	}
	function m(e, t, l) {
		let n = addElement("tr", i, "gameTdDiv");
		"Točke" == l &&
			((n.style.transform = " translateY(10px)"), (e = "" + e.toString().replace("+", "")));
		addElement("td", n, "gameDataTd").innerHTML = t;
		addElement("td", n, "gameDataTdBottom").innerHTML = e;
	}
	if ((console.log(completePodatki), completePodatki.Datum[1])) {
		var c = new Date(completePodatki.Datum[1]);
		changeOpis(
			n,
			c.toLocaleString("sl-Si", { weekday: "long" }) +
				", " +
				c.getDate() +
				". " +
				c.toLocaleString("sl-Si", { month: "long" }) +
				" " +
				c.getFullYear() +
				", ob " +
				c.getHours() +
				"." +
				c.getMinutes()
		);
	}
	let u, p, g;
	if (
		((u = g = "Igra"),
		(p = completePodatki[g][1]),
		(u = g + " " + completePodatki[g][1].toLowerCase()).toLowerCase().includes("po meri") ||
			u.toLowerCase().includes("klop") ||
			u.toLowerCase().includes("renons") ||
			u.toLowerCase().includes("mondfang"))
	) {
		(p = 0),
			m(
				"",
				u.includes("po meri")
					? "Po meri"
					: u.includes("klop")
					? "Klop"
					: u.includes("mondfang")
					? "Mondfang"
					: "Renons"
			),
			"string" == typeof completePodatki.Igralec[1] &&
				(completePodatki.Igralec[1] = completePodatki.Igralec[1].split(",")),
			"number" == typeof completePodatki["Točke"][1] &&
				(completePodatki["Točke"][1] = completePodatki["Točke"][1].toString().split(","));
		for (let f = 0; f < completePodatki.Igralec[1].length; f++) {
			let y = completePodatki.Igralec[1][f];
			m(
				completePodatki.Radlc[1] && !u.includes("mondfang")
					? 2 * completePodatki["Točke"][1][f]
					: completePodatki["Točke"][1][f],
				y
			);
		}
	} else (p = completePodatki[g][2]), l[6] || (p = "-" + p), m(p, u, g);
	if (
		(completePodatki.Igra[1].toLowerCase().includes("po meri") ||
			completePodatki.Igra[1].toLowerCase().includes("klop") ||
			void 0 === completePodatki.Razlika[1] ||
			!1 === completePodatki.Razlika[1] ||
			null === completePodatki.Razlika[1] ||
			((u = g = "Razlika"), (p = completePodatki[g][1]), l[6] || (p = "-" + p), m(p, u, g)),
		!completePodatki.Igra[1].toLowerCase().includes("po meri") &&
			!completePodatki.Igra[1].toLowerCase().includes("klop"))
	) {
		if (((u = g = "Bonus Točke"), (p = completePodatki[g][1]), "Bonus Točke" == g)) {
			let v = completePodatki.Bonusi[1];
			for (let h in completePodatki.Bonusi[1]) {
				if (v[h][1]) {
					v[h][3]
						? m(v[h][0], "Napovedano in kontrirano: <wbr>" + h, g)
						: v[h][4]
						? m(v[h][0], "Napovedano in rekontrirano: <wbr>" + h, g)
						: m(2 * v[h][0], "Napovedano: <wbr>" + h, g);
					continue;
				}
				m(v[h][0], h, g);
			}
		} else l[6] || p.toString().includes("-") || (p = "-" + p), m(p, u, g);
	}
	completePodatki.Igra[1].toLowerCase().includes("po meri") ||
		completePodatki.Igra[1].toLowerCase().includes("klop") ||
		((u = g = "Radlc"),
		(p = completePodatki[g][1]),
		completePodatki.Radlc[1] && (p = completePodatki["Točke"][1]),
		!1 !== p && m(p, u, g));
	try {
		completePodatki.Igra[1].toLowerCase().includes("po meri") ||
			completePodatki.Igra[1].toLowerCase().includes("klop") ||
			completePodatki.Igra[1].toLowerCase().includes("mondfang") ||
			!completePodatki.Kontra[1] ||
			((u = g = "Kontra"),
			completePodatki.Kontra[1] &&
				(p = completePodatki.Radlc[1]
					? 2 * completePodatki["Točke"][1]
					: completePodatki["Točke"][1]),
			!1 !== p && m(p, u, g));
	} catch {}
	try {
		completePodatki.Igra[1].toLowerCase().includes("po meri") ||
			completePodatki.Igra[1].toLowerCase().includes("klop") ||
			completePodatki.Igra[1].toLowerCase().includes("mondfang") ||
			!completePodatki.Rekontra[1] ||
			((u = g = "Rekontra"),
			completePodatki.Rekontra[1] &&
				(p = completePodatki.Radlc[1]
					? 4 * completePodatki["Točke"][1]
					: 2 * completePodatki["Točke"][1]),
			!1 !== p && m(p, u, g));
	} catch {}
	completePodatki.Igra[1].toLowerCase().includes("po meri") ||
		completePodatki.Igra[1].toLowerCase().includes("klop") ||
		completePodatki.Igra[1].toLowerCase().includes("renons") ||
		completePodatki.Igra[1].toLowerCase().includes("mondfang") ||
		((u = g = "Točke"),
		(p = completePodatki[g][1]),
		completePodatki.Radlc[1] && (p *= 2),
		completePodatki.Kontra[1] && (p *= 2),
		completePodatki.Rekontra[1] && (p *= 4),
		m(p, u, g)),
		n.appendChild(i),
		addElement("div", n, "break");
	var k = addElement("span", n.parentNode, null);
	k.setAttribute("slot", "actions");
	var b = document.createElement("md-text-button");
	(b.innerHTML =
		' <svg slot="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> Izbriši'),
		k.appendChild(b),
		(b.style.margin = "0"),
		b.addEventListener("click", function (t) {
			if (
				(listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
				navigator.onLine || (localStorage.offlineChanges = !0),
				listOfPlayers["!gamesData!"].splice(e, 1),
				!Array.isArray(completePodatki.Igralec[1]))
			) {
				let l = new Set([completePodatki.Igralec[1]]);
				completePodatki.Igralec[1] = Array.from(l);
			}
			if (
				(completePodatki.Radlc[1] && completePodatki["Točke"][1],
				!Array.isArray(listOfPlayers[completePodatki.Igralec[1][0]]))
			) {
				let a = new Set([listOfPlayers[completePodatki.Igralec[1][0]]]);
				listOfPlayers[completePodatki.Igralec[1][0]] = Array.from(a);
			}
			listOfPlayers[completePodatki.Igralec[1][0]][0] =
				listOfPlayers[completePodatki.Igralec[1][0]][0] + "*";
			let i = Object.keys(listOfPlayers["!gamesData!"]);
			i.sort((e, t) => e - t);
			let o = JSON.parse(localStorage.getItem("games")) || {};
			(o[listOfPlayers["!gameName!"]] = listOfPlayers),
				localStorage.setItem("games", JSON.stringify(o)),
				updateUserData(),
				hideDialog(n),
				count(!0);
		});
	var E = document.createElement("md-filled-tonal-button");
	(E.innerHTML = "Končano"),
		(E.style.margin = "0"),
		k.appendChild(E),
		E.addEventListener("click", function (t) {
			hideDialog(n),
				"Po Meri" !== l[0] &&
					"Klop" !== l[0] &&
					listOfPlayers["!gamesData!"][e][3] !== a.value &&
					(listOfPlayersCopy.push(JSON.stringify(listOfPlayers)),
					l[4]
						? (listOfPlayers["!gamesData!"][e][3] = a.value / 2)
						: (listOfPlayers["!gamesData!"][e][3] = a.value),
					removeElement(
						document.querySelector(".cntScreen"),
						document.querySelector(".crezultLine")
					),
					count(!0));
		});
}
function deleteGame(e) {
	l =
		e ||
		(listOfPlayers["!gameName!"].includes("/users/")
			? dialogBuilder("Ali želite zapustiti to deljeno skupino?", !1)[0]
			: dialogBuilder("Ali želite izbrisati to skupino?", !1)[0]);
	let t = addElement("md-icon", l.parentNode, null);
	(t.innerHTML = "delete_outline"), t.setAttribute("slot", "icon");
	var l,
		n = document.createElement("md-text-button");
	n.innerHTML = "Da";
	var a = document.createElement("md-filled-tonal-button");
	a.innerHTML = "Ne";
	let i = document.createElement("div");
	i.setAttribute("slot", "actions"),
		l.parentNode.appendChild(i),
		i.appendChild(n),
		i.appendChild(a),
		n.addEventListener("click", function () {
			navigator.onLine || (localStorage.offlineChanges = !0);
			let e = JSON.parse(localStorage.getItem("games")) || {};
			delete e[listOfPlayers["!gameName!"]],
				navigator.onLine || (localStorage.offlineChanges = !0),
				localStorage.setItem("games", JSON.stringify(e)),
				updateUserData(),
				document.querySelector(".homeBtn").click(),
				hideDialog(l);
		}),
		a.addEventListener("click", function () {
			hideDialog(l);
		});
}
async function resolveAfter(e) {
	return new Promise((t) => {
		setTimeout(() => {
			t();
		}, e);
	});
}
function removeElement() {
	for (let e of arguments) e.remove();
}
function privacy() {
	var e = dialogBuilder("Politika"),
		t = e[0],
		l = e[1];
	t.parentNode.classList.add("fullscreen"),
		l.addEventListener("click", function (e) {
			(document.getElementById("game").style.animation = "none"),
				(document.getElementById("homeContainer").style.animation = "none"),
				(document.getElementById("homeContainer").style.display = "block"),
				setTimeout(() => {
					hideDialog(t), (document.getElementById("homeContainer").style.animation = "");
				}, 1);
		}),
		dlgFullscreen(t.parentNode);
	var n = addElement("p", t, null);
	n.setAttribute(
		"style",
		"white-space: pre;text-wrap: wrap;width: 80%;margin: 20px;color: var(--colorTxtDialog);"
	),
		jQuery.get("./assets/policies.txt", function (e) {
			n.innerHTML = e;
		});
}
function feedback() {
	var e = dialogBuilder("Povratne informacije"),
		t = e[0];
	e[1].addEventListener("click", function (e) {
		(document.getElementById("game").style.animation = "none"), hideDialog(t);
	});
	var l = document.createElement("md-outlined-text-field");
	l.setAttribute("type", "textarea"),
		l.setAttribute("rows", "10"),
		l.setAttribute("style", "height: 25vh;width: 90%; resize: vertical;word-wrap: break-word;"),
		(l.label = "Vpišite kaj bi radi izboljšali..."),
		(l.placeholder = "Kar po domače..."),
		t.appendChild(l),
		l.focus();
	let n = document.createElement("div");
	n.setAttribute("slot", "actions"), t.parentNode.appendChild(n);
	var a = document.createElement("md-filled-tonal-button");
	(a.innerHTML = "Pošlji"),
		n.appendChild(a),
		a.addEventListener("click", function () {
			window.open(
				"mailto:stevec.taroka@gmail.com?subject=Imam izbolšavo&body=" + l.value,
				"_blank"
			);
		});
}
var queryAnim = !1;
function settings() {
	var e = dialogBuilder("Nastavitve"),
		t = e[0],
		l = e[1];
	t.parentNode.classList.add("fullscreen"),
		l.addEventListener("click", function (e) {
			(document.getElementById("game").style.animation = "none"),
				(document.getElementById("homeContainer").style.animation = "none"),
				(document.getElementById("homeContainer").style.display = "block"),
				setTimeout(() => {
					hideDialog(t), (document.getElementById("homeContainer").style.animation = "");
				}, 1);
		}),
		dlgFullscreen(t.parentNode);
	var n = addElement("md-list", t, null),
		a = addElement("md-list-item", n, null);
	(a.innerHTML = "Tema aplikacije"), addElement("md-ripple", a, null);
	var i = document.createElement("input");
	a.addEventListener("click", function () {
		i.click();
	}),
		i.setAttribute("slot", "end"),
		i.setAttribute("type", "color"),
		(i.value = localStorage.getItem("themeColor")),
		i.addEventListener("change", function () {
			(localStorage.themeColor = i.value), changeTheme(event.target.value);
		}),
		a.appendChild(i),
		addElement("md-divider", n, null);
	var o = addElement("md-list-item", n, null);
	o.setAttribute("style", "display: flex;align-items: center;"),
		(o.innerHTML = "Zaokroževanje razlike&nbsp;&nbsp;&nbsp;&nbsp;");
	var r = addElement("md-switch", o, null);
	r.setAttribute("slot", "end"),
		(!0 == JSON.parse(localStorage.getItem("razlikaOkrozi")) ||
			null == localStorage.getItem("razlikaOkrozi")) &&
			r.setAttribute("selected", ""),
		o.addEventListener("click", function () {
			r.selected = !r.selected;
		}),
		o.setAttribute("type", "reset"),
		o.addEventListener("change", function () {
			"true" == localStorage.getItem("razlikaOkrozi") ||
			null == localStorage.getItem("razlikaOkrozi")
				? localStorage.setItem("razlikaOkrozi", "false")
				: localStorage.setItem("razlikaOkrozi", "true"),
				(zaokrožuj = JSON.parse(localStorage.getItem("razlikaOkrozi")));
		});
}
function helpMe(e) {
	if (!document.getElementById("pomoc")) {
		var t = dialogBuilder("Pomoč"),
			l = t[0],
			n = t[1];
		l.parentNode.classList.add("fullscreen"),
			e && e.removeAttribute("open"),
			n.addEventListener("click", function (t) {
				e
					? ((document.getElementById("game").style.animation = "none"),
					  setTimeout(() => {
							hideDialog(l), e.setAttribute("open", "");
					  }, 1))
					: ((document.getElementById("game").style.animation = "none"),
					  (document.getElementById("homeContainer").style.animation = "none"),
					  (document.getElementById("homeContainer").style.display = "block"),
					  setTimeout(() => {
							hideDialog(l),
								(document.getElementById("homeContainer").style.animation = "");
					  }, 1));
			}),
			dlgFullscreen(l.parentNode, e),
			(l.innerHTML = pomoc);
		var a = document.getElementById("pomoc").getElementsByTagName("md-list-item");
		for (let i of a)
			i.addEventListener("click", function () {
				"0px" == i.getElementsByTagName("p")[0].style.height
					? (expandSection(i.getElementsByTagName("p")[0]),
					  (i.getElementsByTagName("md-icon")[0].innerHTML = "expand_less"))
					: (collapseSection(i.getElementsByTagName("p")[0]),
					  (i.getElementsByTagName("md-icon")[0].innerHTML = "expand_more"));
			});
	}
}
window.addEventListener("load", function () {
	"null" == sessionStorage.uid && hideElement(document.querySelectorAll(".loader")[0]),
		localStorage.firstTime,
		"true" == localStorage.firstTime && (localStorage.firstTime = !1),
		(queryAnim = window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	try {
		hideElement(document.querySelectorAll(".loader")[0]);
	} catch {}
	location.pathname.includes("users") ||
		"/" === location.pathname ||
		Game(decodeURIComponent(location.pathname.slice(1))),
		navigator.userAgent.match(/FBAN|FBAV/i) &&
			window.open("googlechrome://navigate?url=https://tarock-counter.web.app"),
		void 0 == localStorage.offlineChanges
			? window.loadDataFromWeb()
			: navigator.onLine && (updateUserData(), (localStorage.offlineChanges = void 0));
	try {
		changeTheme(localStorage.themeColor);
	} catch (e) {
		console.log(e);
	}
	null !== sessionStorage.uid &&
		void 0 !== sessionStorage.uid &&
		"null" !== sessionStorage.uid &&
		"undefined" !== sessionStorage.uid &&
		watchChanges(),
		queryAnim && document.body.style.setProperty("--transDur", "0s");
});
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
    <p style="font-size: 1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>● <md-icon>home</md-icon> vam omogoča, da se vrnete na domači zaslon.<br><br>● <md-icon>undo</md-icon> vam omogoča, da razveljavite zadnje dejanje na seznamu.<br><br>● <md-icon>person_add</md-icon> vam omogoča, da povabite prijatelje v skupino, kjer bodo imeli tudi oni možnost urejanja.<br><br>● <md-icon>delete</md-icon> vam omogoča, da izbrišete celotno igro. </p>
</md-list-item>
<md-list-item type="button"><b style="font-size: 1.2rem;margin-bottom:5px">Kako povabiti prijatelje v skupino?</b> <md-icon slot="end">expand_more</md-icon>
    <p style="font-size: 1rem;margin:0px;transition: all var(--transDur) ease-in-out;height:0px;"><br>Če želite povabiti prijatelje v skupino, kliknite na tretji gumb v spodnjem delu zaslona <md-icon>person_add</md-icon>. Odpre se vam okno, kjer lahko kopirate ali delite povezavo do igre.<br><br>Ko prijatelj dobi povezavo, jo mora le odpreti.<br><br>Za dodajanje prijateljev v skupino morate biti prijavljeni in imeti internetno povezavo.</p>
</md-list-item>
</md-list><div class="break" style="height:80px;"></div></div>`;
function collapseSection(e) {
	var t = e.scrollHeight,
		l = e.style.transition;
	(e.style.transition = ""),
		requestAnimationFrame(function () {
			(e.style.height = t + "px"),
				(e.style.transition = l),
				requestAnimationFrame(function () {
					e.style.height = "0px";
				});
		}),
		e.setAttribute("data-collapsed", "true");
}
function expandSection(e) {
	var t = e.scrollHeight;
	(e.style.height = t + "px"),
		e.addEventListener("transitionend", function (t) {
			e.removeEventListener("transitionend", arguments.callee), (e.style.height = null);
		}),
		e.setAttribute("data-collapsed", "false");
}
const registerServiceWorker = async () => {
	if ("serviceWorker" in navigator)
		try {
			let e = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
			e.installing
				? console.log("Service worker installing")
				: e.waiting
				? console.log("Service worker installed")
				: e.active && (console.log("Service worker active"), e.update());
		} catch (t) {
			console.error(`Registration failed with ${t}`);
		}
};
registerServiceWorker(),
	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
		changeTheme(localStorage.themeColor);
	}),
	window.addEventListener("popstate", function (e) {
		console.log("BACK"), "/" == location.pathname && document.querySelector(".homeBtn").click();
	}),
	window.addEventListener("load", async function () {
		let e = null,
			t = document.querySelector("#pwa"),
			l = !1;
		window.addEventListener("appinstalled", () => {
			a(), console.log("app installed");
		}),
			window.addEventListener("beforeinstallprompt", (l) => {
				l.preventDefault(), (e = l), (t.style.display = "flex");
			}),
			window.matchMedia("(display-mode: standalone)").matches &&
				(a(), console.log("app standalone")),
			!/iPad|iPhone|iPod/.test(navigator.userAgent) ||
				window.MSStream ||
				l ||
				(t.style.display = "flex");
		var n = [];
		try {
			(n = await navigator.getInstalledRelatedApps()),
				0 === n.length ||
					l ||
					((t.innerHTML =
						'Nadaljuj v aplikaciji<md-icon slot="icon">open_in_new</md-icon>'),
					(t.style.display = "flex"));
		} catch {}
		function a() {
			(l = !0), (e = null), (t.style.display = "none");
		}
		t.addEventListener("click", async () => {
			if (0 !== n.length) {
				window.open("/", "_blank");
				return;
			}
			if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
				let t = dialogBuilder("iOS Aplikacija")[0];
				t.innerHTML =
					'Če želite naložiti aplikacijo, spodaj pritisnite gumb za deljenje&nbsp;<md-icon style="font-size: 1rem;display:contents;" aria-hidden="true">ios_share</md-icon></span>&nbsp;in poiščite gumb  "<md-icon style="font-size: 1rem;display:contents;" aria-hidden="true">add_box</md-icon> Add to home screen".';
				let l = document.createElement("div");
				l.setAttribute("slot", "actions"), t.parentNode.appendChild(l);
				let i = addElement("md-text-button", l, null);
				(i.innerHTML = "Ok"),
					i.addEventListener("click", function () {
						hideDialog(t);
					});
			} else await e.prompt(), a();
		});
	});
