function e(e, t, r, o) {
  var a,
    i = arguments.length,
    n =
      i < 3 ? t : null === o ? (o = Object.getOwnPropertyDescriptor(t, r)) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
    n = Reflect.decorate(e, t, r, o);
  else
    for (var s = e.length - 1; s >= 0; s--)
      (a = e[s]) && (n = (i < 3 ? a(n) : i > 3 ? a(t, r, n) : a(t, r)) || n);
  return i > 3 && n && Object.defineProperty(t, r, n), n;
}
"function" == typeof SuppressedError && SuppressedError;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = (e) => (t, r) => {
    void 0 !== r
      ? r.addInitializer(() => {
          customElements.define(e, t);
        })
      : customElements.define(e, t);
  },
  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ r = globalThis,
  o =
    r.ShadowRoot &&
    (void 0 === r.ShadyCSS || r.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  a = Symbol(),
  i = new WeakMap();
let n = class {
  constructor(e, t, r) {
    if (((this._$cssResult$ = !0), r !== a))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    (this.cssText = e), (this.t = t);
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (o && void 0 === e) {
      const r = void 0 !== t && 1 === t.length;
      r && (e = i.get(t)),
        void 0 === e &&
          ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText),
          r && i.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const s = (e, ...t) => {
    const r =
      1 === e.length
        ? e[0]
        : t.reduce(
            (t, r, o) =>
              t +
              ((e) => {
                if (!0 === e._$cssResult$) return e.cssText;
                if ("number" == typeof e) return e;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    e +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(r) +
              e[o + 1],
            e[0]
          );
    return new n(r, e, a);
  },
  l = o
    ? (e) => e
    : (e) =>
        e instanceof CSSStyleSheet
          ? ((e) => {
              let t = "";
              for (const r of e.cssRules) t += r.cssText;
              return ((e) =>
                new n("string" == typeof e ? e : e + "", void 0, a))(t);
            })(e)
          : e,
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ {
    is: d,
    defineProperty: c,
    getOwnPropertyDescriptor: h,
    getOwnPropertyNames: p,
    getOwnPropertySymbols: u,
    getPrototypeOf: v,
  } = Object,
  m = globalThis,
  f = m.trustedTypes,
  b = f ? f.emptyScript : "",
  g = m.reactiveElementPolyfillSupport,
  y = (e, t) => e,
  x = {
    toAttribute(e, t) {
      switch (t) {
        case Boolean:
          e = e ? b : null;
          break;
        case Object:
        case Array:
          e = null == e ? e : JSON.stringify(e);
      }
      return e;
    },
    fromAttribute(e, t) {
      let r = e;
      switch (t) {
        case Boolean:
          r = null !== e;
          break;
        case Number:
          r = null === e ? null : Number(e);
          break;
        case Object:
        case Array:
          try {
            r = JSON.parse(e);
          } catch (e) {
            r = null;
          }
      }
      return r;
    },
  },
  _ = (e, t) => !d(e, t),
  w = { attribute: !0, type: String, converter: x, reflect: !1, hasChanged: _ };
(Symbol.metadata ??= Symbol("metadata")),
  (m.litPropertyMetadata ??= new WeakMap());
class k extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = w) {
    if (
      (t.state && (t.attribute = !1),
      this._$Ei(),
      this.elementProperties.set(e, t),
      !t.noAccessor)
    ) {
      const r = Symbol(),
        o = this.getPropertyDescriptor(e, r, t);
      void 0 !== o && c(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: o, set: a } = h(this.prototype, e) ?? {
      get() {
        return this[t];
      },
      set(e) {
        this[t] = e;
      },
    };
    return {
      get() {
        return o?.call(this);
      },
      set(t) {
        const i = o?.call(this);
        a.call(this, t), this.requestUpdate(e, i, r);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? w;
  }
  static _$Ei() {
    if (this.hasOwnProperty(y("elementProperties"))) return;
    const e = v(this);
    e.finalize(),
      void 0 !== e.l && (this.l = [...e.l]),
      (this.elementProperties = new Map(e.elementProperties));
  }
  static finalize() {
    if (this.hasOwnProperty(y("finalized"))) return;
    if (
      ((this.finalized = !0), this._$Ei(), this.hasOwnProperty(y("properties")))
    ) {
      const e = this.properties,
        t = [...p(e), ...u(e)];
      for (const r of t) this.createProperty(r, e[r]);
    }
    const e = this[Symbol.metadata];
    if (null !== e) {
      const t = litPropertyMetadata.get(e);
      if (void 0 !== t)
        for (const [e, r] of t) this.elementProperties.set(e, r);
    }
    this._$Eh = new Map();
    for (const [e, t] of this.elementProperties) {
      const r = this._$Eu(e, t);
      void 0 !== r && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const e of r) t.unshift(l(e));
    } else void 0 !== e && t.push(l(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return !1 === r
      ? void 0
      : "string" == typeof r
      ? r
      : "string" == typeof e
      ? e.toLowerCase()
      : void 0;
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev();
  }
  _$Ev() {
    (this._$Eg = new Promise((e) => (this.enableUpdating = e))),
      (this._$AL = new Map()),
      this._$E_(),
      this.requestUpdate(),
      this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$ES ??= []).push(e),
      void 0 !== this.renderRoot && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$ES?.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$E_() {
    const e = new Map(),
      t = this.constructor.elementProperties;
    for (const r of t.keys())
      this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((e, t) => {
        if (o)
          e.adoptedStyleSheets = t.map((e) =>
            e instanceof CSSStyleSheet ? e : e.styleSheet
          );
        else
          for (const o of t) {
            const t = document.createElement("style"),
              a = r.litNonce;
            void 0 !== a && t.setAttribute("nonce", a),
              (t.textContent = o.cssText),
              e.appendChild(t);
          }
      })(e, this.constructor.elementStyles),
      e
    );
  }
  connectedCallback() {
    (this.renderRoot ??= this.createRenderRoot()),
      this.enableUpdating(!0),
      this._$ES?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {}
  disconnectedCallback() {
    this._$ES?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$EO(e, t) {
    const r = this.constructor.elementProperties.get(e),
      o = this.constructor._$Eu(e, r);
    if (void 0 !== o && !0 === r.reflect) {
      const a = (
        void 0 !== r.converter?.toAttribute ? r.converter : x
      ).toAttribute(t, r.type);
      (this._$Em = e),
        null == a ? this.removeAttribute(o) : this.setAttribute(o, a),
        (this._$Em = null);
    }
  }
  _$AK(e, t) {
    const r = this.constructor,
      o = r._$Eh.get(e);
    if (void 0 !== o && this._$Em !== o) {
      const e = r.getPropertyOptions(o),
        a =
          "function" == typeof e.converter
            ? { fromAttribute: e.converter }
            : void 0 !== e.converter?.fromAttribute
            ? e.converter
            : x;
      (this._$Em = o),
        (this[o] = a.fromAttribute(t, e.type)),
        (this._$Em = null);
    }
  }
  requestUpdate(e, t, r, o = !1, a) {
    if (void 0 !== e) {
      if (
        ((r ??= this.constructor.getPropertyOptions(e)),
        !(r.hasChanged ?? _)(o ? a : this[e], t))
      )
        return;
      this.C(e, t, r);
    }
    !1 === this.isUpdatePending && (this._$Eg = this._$EP());
  }
  C(e, t, r) {
    this._$AL.has(e) || this._$AL.set(e, t),
      !0 === r.reflect && this._$Em !== e && (this._$Ej ??= new Set()).add(e);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (e) {
      Promise.reject(e);
    }
    const e = this.scheduleUpdate();
    return null != e && (await e), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this._$Ep) {
        for (const [e, t] of this._$Ep) this[e] = t;
        this._$Ep = void 0;
      }
      const e = this.constructor.elementProperties;
      if (e.size > 0)
        for (const [t, r] of e)
          !0 !== r.wrapped ||
            this._$AL.has(t) ||
            void 0 === this[t] ||
            this.C(t, this[t], r);
    }
    let e = !1;
    const t = this._$AL;
    try {
      (e = this.shouldUpdate(t)),
        e
          ? (this.willUpdate(t),
            this._$ES?.forEach((e) => e.hostUpdate?.()),
            this.update(t))
          : this._$ET();
    } catch (t) {
      throw ((e = !1), this._$ET(), t);
    }
    e && this._$AE(t);
  }
  willUpdate(e) {}
  _$AE(e) {
    this._$ES?.forEach((e) => e.hostUpdated?.()),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
      this.updated(e);
  }
  _$ET() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    (this._$Ej &&= this._$Ej.forEach((e) => this._$EO(e, this[e]))),
      this._$ET();
  }
  updated(e) {}
  firstUpdated(e) {}
}
(k.elementStyles = []),
  (k.shadowRootOptions = { mode: "open" }),
  (k[y("elementProperties")] = new Map()),
  (k[y("finalized")] = new Map()),
  g?.({ ReactiveElement: k }),
  (m.reactiveElementVersions ??= []).push("2.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = {
    attribute: !0,
    type: String,
    converter: x,
    reflect: !1,
    hasChanged: _,
  },
  C = (e = $, t, r) => {
    const { kind: o, metadata: a } = r;
    let i = globalThis.litPropertyMetadata.get(a);
    if (
      (void 0 === i && globalThis.litPropertyMetadata.set(a, (i = new Map())),
      i.set(r.name, e),
      "accessor" === o)
    ) {
      const { name: o } = r;
      return {
        set(r) {
          const a = t.get.call(this);
          t.set.call(this, r), this.requestUpdate(o, a, e);
        },
        init(t) {
          return void 0 !== t && this.C(o, void 0, e), t;
        },
      };
    }
    if ("setter" === o) {
      const { name: o } = r;
      return function (r) {
        const a = this[o];
        t.call(this, r), this.requestUpdate(o, a, e);
      };
    }
    throw Error("Unsupported decorator location: " + o);
  };
function E(e) {
  return (t, r) =>
    "object" == typeof r
      ? C(e, t, r)
      : ((e, t, r) => {
          const o = t.hasOwnProperty(r);
          return (
            t.constructor.createProperty(r, o ? { ...e, wrapped: !0 } : e),
            o ? Object.getOwnPropertyDescriptor(t, r) : void 0
          );
        })(e, t, r);
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
}
function A(e) {
  return E({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const z = (e, t, r) => (
  (r.configurable = !0),
  (r.enumerable = !0),
  Reflect.decorate && "object" != typeof t && Object.defineProperty(e, t, r),
  r
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
);
function S(e, t) {
  return (t, r, o) =>
    z(t, r, {
      get() {
        return ((t) => t.renderRoot?.querySelector(e) ?? null)(this);
      },
    });
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
}
let T;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function I(e) {
  return (t, r) =>
    z(t, r, {
      async get() {
        return (
          await this.updateComplete, this.renderRoot?.querySelector(e) ?? null
        );
      },
    });
  /**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
}
function R(e) {
  return (t, r) => {
    const { slot: o, selector: a } = e ?? {},
      i = "slot" + (o ? `[name=${o}]` : ":not([name])");
    return z(t, r, {
      get() {
        const t = this.renderRoot?.querySelector(i),
          r = t?.assignedElements(e) ?? [];
        return void 0 === a ? r : r.filter((e) => e.matches(a));
      },
    });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis,
  L = O.trustedTypes,
  P = L ? L.createPolicy("lit-html", { createHTML: (e) => e }) : void 0,
  M = "$lit$",
  B = `lit$${(Math.random() + "").slice(9)}$`,
  N = "?" + B,
  U = `<${N}>`,
  D = document,
  F = () => D.createComment(""),
  H = (e) => null === e || ("object" != typeof e && "function" != typeof e),
  V = Array.isArray,
  q = "[ \t\n\f\r]",
  j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  W = /-->/g,
  G = />/g,
  K = RegExp(
    `>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    "g"
  ),
  Y = /'/g,
  X = /"/g,
  Z = /^(?:script|style|textarea|title)$/i,
  J = (
    (e) =>
    (t, ...r) => ({ _$litType$: e, strings: t, values: r })
  )(1),
  Q = Symbol.for("lit-noChange"),
  ee = Symbol.for("lit-nothing"),
  te = new WeakMap(),
  re = D.createTreeWalker(D, 129);
function oe(e, t) {
  if (!Array.isArray(e) || !e.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== P ? P.createHTML(t) : t;
}
class ae {
  constructor({ strings: e, _$litType$: t }, r) {
    let o;
    this.parts = [];
    let a = 0,
      i = 0;
    const n = e.length - 1,
      s = this.parts,
      [l, d] = ((e, t) => {
        const r = e.length - 1,
          o = [];
        let a,
          i = 2 === t ? "<svg>" : "",
          n = j;
        for (let t = 0; t < r; t++) {
          const r = e[t];
          let s,
            l,
            d = -1,
            c = 0;
          for (
            ;
            c < r.length && ((n.lastIndex = c), (l = n.exec(r)), null !== l);

          )
            (c = n.lastIndex),
              n === j
                ? "!--" === l[1]
                  ? (n = W)
                  : void 0 !== l[1]
                  ? (n = G)
                  : void 0 !== l[2]
                  ? (Z.test(l[2]) && (a = RegExp("</" + l[2], "g")), (n = K))
                  : void 0 !== l[3] && (n = K)
                : n === K
                ? ">" === l[0]
                  ? ((n = a ?? j), (d = -1))
                  : void 0 === l[1]
                  ? (d = -2)
                  : ((d = n.lastIndex - l[2].length),
                    (s = l[1]),
                    (n = void 0 === l[3] ? K : '"' === l[3] ? X : Y))
                : n === X || n === Y
                ? (n = K)
                : n === W || n === G
                ? (n = j)
                : ((n = K), (a = void 0));
          const h = n === K && e[t + 1].startsWith("/>") ? " " : "";
          i +=
            n === j
              ? r + U
              : d >= 0
              ? (o.push(s), r.slice(0, d) + M + r.slice(d) + B + h)
              : r + B + (-2 === d ? t : h);
        }
        return [oe(e, i + (e[r] || "<?>") + (2 === t ? "</svg>" : "")), o];
      })(e, t);
    if (
      ((this.el = ae.createElement(l, r)),
      (re.currentNode = this.el.content),
      2 === t)
    ) {
      const e = this.el.content.firstChild;
      e.replaceWith(...e.childNodes);
    }
    for (; null !== (o = re.nextNode()) && s.length < n; ) {
      if (1 === o.nodeType) {
        if (o.hasAttributes())
          for (const e of o.getAttributeNames())
            if (e.endsWith(M)) {
              const t = d[i++],
                r = o.getAttribute(e).split(B),
                n = /([.?@])?(.*)/.exec(t);
              s.push({
                type: 1,
                index: a,
                name: n[2],
                strings: r,
                ctor:
                  "." === n[1]
                    ? de
                    : "?" === n[1]
                    ? ce
                    : "@" === n[1]
                    ? he
                    : le,
              }),
                o.removeAttribute(e);
            } else
              e.startsWith(B) &&
                (s.push({ type: 6, index: a }), o.removeAttribute(e));
        if (Z.test(o.tagName)) {
          const e = o.textContent.split(B),
            t = e.length - 1;
          if (t > 0) {
            o.textContent = L ? L.emptyScript : "";
            for (let r = 0; r < t; r++)
              o.append(e[r], F()),
                re.nextNode(),
                s.push({ type: 2, index: ++a });
            o.append(e[t], F());
          }
        }
      } else if (8 === o.nodeType)
        if (o.data === N) s.push({ type: 2, index: a });
        else {
          let e = -1;
          for (; -1 !== (e = o.data.indexOf(B, e + 1)); )
            s.push({ type: 7, index: a }), (e += B.length - 1);
        }
      a++;
    }
  }
  static createElement(e, t) {
    const r = D.createElement("template");
    return (r.innerHTML = e), r;
  }
}
function ie(e, t, r = e, o) {
  if (t === Q) return t;
  let a = void 0 !== o ? r._$Co?.[o] : r._$Cl;
  const i = H(t) ? void 0 : t._$litDirective$;
  return (
    a?.constructor !== i &&
      (a?._$AO?.(!1),
      void 0 === i ? (a = void 0) : ((a = new i(e)), a._$AT(e, r, o)),
      void 0 !== o ? ((r._$Co ??= [])[o] = a) : (r._$Cl = a)),
    void 0 !== a && (t = ie(e, a._$AS(e, t.values), a, o)),
    t
  );
}
class ne {
  constructor(e, t) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = e), (this._$AM = t);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const {
        el: { content: t },
        parts: r,
      } = this._$AD,
      o = (e?.creationScope ?? D).importNode(t, !0);
    re.currentNode = o;
    let a = re.nextNode(),
      i = 0,
      n = 0,
      s = r[0];
    for (; void 0 !== s; ) {
      if (i === s.index) {
        let t;
        2 === s.type
          ? (t = new se(a, a.nextSibling, this, e))
          : 1 === s.type
          ? (t = new s.ctor(a, s.name, s.strings, this, e))
          : 6 === s.type && (t = new pe(a, this, e)),
          this._$AV.push(t),
          (s = r[++n]);
      }
      i !== s?.index && ((a = re.nextNode()), i++);
    }
    return (re.currentNode = D), o;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV)
      void 0 !== r &&
        (void 0 !== r.strings
          ? (r._$AI(e, r, t), (t += r.strings.length - 2))
          : r._$AI(e[t])),
        t++;
  }
}
class se {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, o) {
    (this.type = 2),
      (this._$AH = ee),
      (this._$AN = void 0),
      (this._$AA = e),
      (this._$AB = t),
      (this._$AM = r),
      (this.options = o),
      (this._$Cv = o?.isConnected ?? !0);
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return void 0 !== t && 11 === e?.nodeType && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    (e = ie(this, e, t)),
      H(e)
        ? e === ee || null == e || "" === e
          ? (this._$AH !== ee && this._$AR(), (this._$AH = ee))
          : e !== this._$AH && e !== Q && this._(e)
        : void 0 !== e._$litType$
        ? this.g(e)
        : void 0 !== e.nodeType
        ? this.$(e)
        : ((e) => V(e) || "function" == typeof e?.[Symbol.iterator])(e)
        ? this.T(e)
        : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), (this._$AH = this.k(e)));
  }
  _(e) {
    this._$AH !== ee && H(this._$AH)
      ? (this._$AA.nextSibling.data = e)
      : this.$(D.createTextNode(e)),
      (this._$AH = e);
  }
  g(e) {
    const { values: t, _$litType$: r } = e,
      o =
        "number" == typeof r
          ? this._$AC(e)
          : (void 0 === r.el &&
              (r.el = ae.createElement(oe(r.h, r.h[0]), this.options)),
            r);
    if (this._$AH?._$AD === o) this._$AH.p(t);
    else {
      const e = new ne(o, this),
        r = e.u(this.options);
      e.p(t), this.$(r), (this._$AH = e);
    }
  }
  _$AC(e) {
    let t = te.get(e.strings);
    return void 0 === t && te.set(e.strings, (t = new ae(e))), t;
  }
  T(e) {
    V(this._$AH) || ((this._$AH = []), this._$AR());
    const t = this._$AH;
    let r,
      o = 0;
    for (const a of e)
      o === t.length
        ? t.push((r = new se(this.k(F()), this.k(F()), this, this.options)))
        : (r = t[o]),
        r._$AI(a),
        o++;
    o < t.length && (this._$AR(r && r._$AB.nextSibling, o), (t.length = o));
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e && e !== this._$AB; ) {
      const t = e.nextSibling;
      e.remove(), (e = t);
    }
  }
  setConnected(e) {
    void 0 === this._$AM && ((this._$Cv = e), this._$AP?.(e));
  }
}
class le {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, o, a) {
    (this.type = 1),
      (this._$AH = ee),
      (this._$AN = void 0),
      (this.element = e),
      (this.name = t),
      (this._$AM = o),
      (this.options = a),
      r.length > 2 || "" !== r[0] || "" !== r[1]
        ? ((this._$AH = Array(r.length - 1).fill(new String())),
          (this.strings = r))
        : (this._$AH = ee);
  }
  _$AI(e, t = this, r, o) {
    const a = this.strings;
    let i = !1;
    if (void 0 === a)
      (e = ie(this, e, t, 0)),
        (i = !H(e) || (e !== this._$AH && e !== Q)),
        i && (this._$AH = e);
    else {
      const o = e;
      let n, s;
      for (e = a[0], n = 0; n < a.length - 1; n++)
        (s = ie(this, o[r + n], t, n)),
          s === Q && (s = this._$AH[n]),
          (i ||= !H(s) || s !== this._$AH[n]),
          s === ee ? (e = ee) : e !== ee && (e += (s ?? "") + a[n + 1]),
          (this._$AH[n] = s);
    }
    i && !o && this.O(e);
  }
  O(e) {
    e === ee
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, e ?? "");
  }
}
class de extends le {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  O(e) {
    this.element[this.name] = e === ee ? void 0 : e;
  }
}
class ce extends le {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  O(e) {
    this.element.toggleAttribute(this.name, !!e && e !== ee);
  }
}
class he extends le {
  constructor(e, t, r, o, a) {
    super(e, t, r, o, a), (this.type = 5);
  }
  _$AI(e, t = this) {
    if ((e = ie(this, e, t, 0) ?? ee) === Q) return;
    const r = this._$AH,
      o =
        (e === ee && r !== ee) ||
        e.capture !== r.capture ||
        e.once !== r.once ||
        e.passive !== r.passive,
      a = e !== ee && (r === ee || o);
    o && this.element.removeEventListener(this.name, this, r),
      a && this.element.addEventListener(this.name, this, e),
      (this._$AH = e);
  }
  handleEvent(e) {
    "function" == typeof this._$AH
      ? this._$AH.call(this.options?.host ?? this.element, e)
      : this._$AH.handleEvent(e);
  }
}
class pe {
  constructor(e, t, r) {
    (this.element = e),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = t),
      (this.options = r);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ie(this, e);
  }
}
const ue = O.litHtmlPolyfillSupport;
ue?.(ae, se), (O.litHtmlVersions ??= []).push("3.0.2");
const ve = (e, t, r) => {
  const o = r?.renderBefore ?? t;
  let a = o._$litPart$;
  if (void 0 === a) {
    const e = r?.renderBefore ?? null;
    o._$litPart$ = a = new se(t.insertBefore(F(), e), e, void 0, r ?? {});
  }
  return a._$AI(e), a;
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
};
let me = class extends k {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return (this.renderOptions.renderBefore ??= e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(e),
      (this._$Do = ve(t, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Q;
  }
};
(me._$litElement$ = !0),
  (me.finalized = !0),
  globalThis.litElementHydrateSupport?.({ LitElement: me });
const fe = globalThis.litElementPolyfillSupport;
fe?.({ LitElement: me }), (globalThis.litElementVersions ??= []).push("4.0.1");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class be extends me {
  render() {
    return J`<slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback(),
      "false" !== this.getAttribute("aria-hidden")
        ? this.setAttribute("aria-hidden", "true")
        : this.removeAttribute("aria-hidden");
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const ge = s`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}/*# sourceMappingURL=icon-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let ye = class extends be {};
(ye.styles = [ge]), (ye = e([t("md-icon")], ye));
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class xe extends me {
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  render() {
    return J`<span class="shadow"></span>`;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const _e = s`:host{display:flex;pointer-events:none}:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}/*# sourceMappingURL=elevation-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let we = class extends xe {};
(we.styles = [_e]), (we = e([t("md-elevation")], we));
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const ke = Symbol("attachableController");
let $e;
$e = new MutationObserver((e) => {
  for (const t of e) t.target[ke]?.hostConnected();
});
class Ce {
  get htmlFor() {
    return this.host.getAttribute("for");
  }
  set htmlFor(e) {
    null === e
      ? this.host.removeAttribute("for")
      : this.host.setAttribute("for", e);
  }
  get control() {
    return this.host.hasAttribute("for")
      ? this.htmlFor && this.host.isConnected
        ? this.host.getRootNode().querySelector(`#${this.htmlFor}`)
        : null
      : this.currentControl || this.host.parentElement;
  }
  set control(e) {
    e ? this.attach(e) : this.detach();
  }
  constructor(e, t) {
    (this.host = e),
      (this.onControlChange = t),
      (this.currentControl = null),
      e.addController(this),
      (e[ke] = this),
      $e?.observe(e, { attributeFilter: ["for"] });
  }
  attach(e) {
    e !== this.currentControl &&
      (this.setCurrentControl(e), this.host.removeAttribute("for"));
  }
  detach() {
    this.setCurrentControl(null), this.host.setAttribute("for", "");
  }
  hostConnected() {
    this.setCurrentControl(this.control);
  }
  hostDisconnected() {
    this.setCurrentControl(null);
  }
  setCurrentControl(e) {
    this.onControlChange(this.currentControl, e), (this.currentControl = e);
    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
  }
}
const Ee = ["focusin", "focusout", "pointerdown"];
class Ae extends me {
  constructor() {
    super(...arguments),
      (this.visible = !1),
      (this.inward = !1),
      (this.attachableController = new Ce(
        this,
        this.onControlChange.bind(this)
      ));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(e) {
    this.attachableController.htmlFor = e;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(e) {
    this.attachableController.control = e;
  }
  attach(e) {
    this.attachableController.attach(e);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  handleEvent(e) {
    if (!e[ze]) {
      switch (e.type) {
        default:
          return;
        case "focusin":
          this.visible = this.control?.matches(":focus-visible") ?? !1;
          break;
        case "focusout":
        case "pointerdown":
          this.visible = !1;
      }
      e[ze] = !0;
    }
  }
  onControlChange(e, t) {
    for (const r of Ee)
      e?.removeEventListener(r, this), t?.addEventListener(r, this);
  }
  update(e) {
    e.has("visible") && this.dispatchEvent(new Event("visibility-changed")),
      super.update(e);
  }
}
e([E({ type: Boolean, reflect: !0 })], Ae.prototype, "visible", void 0),
  e([E({ type: Boolean, reflect: !0 })], Ae.prototype, "inward", void 0);
const ze = Symbol("handledByFocusRing"),
  Se = s`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}/*# sourceMappingURL=focus-ring-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Te = class extends Ae {};
(Te.styles = [Se]), (Te = e([t("md-focus-ring")], Te));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = 1,
  Re = 3,
  Oe = 4,
  Le =
    (e) =>
    (...t) => ({ _$litDirective$: e, values: t });
let Pe = class {
  constructor(e) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, r) {
    (this._$Ct = e), (this._$AM = t), (this._$Ci = r);
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Me = Le(
    class extends Pe {
      constructor(e) {
        if (
          (super(e),
          e.type !== Ie || "class" !== e.name || e.strings?.length > 2)
        )
          throw Error(
            "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."
          );
      }
      render(e) {
        return (
          " " +
          Object.keys(e)
            .filter((t) => e[t])
            .join(" ") +
          " "
        );
      }
      update(e, [t]) {
        if (void 0 === this.it) {
          (this.it = new Set()),
            void 0 !== e.strings &&
              (this.st = new Set(
                e.strings
                  .join(" ")
                  .split(/\s/)
                  .filter((e) => "" !== e)
              ));
          for (const e in t) t[e] && !this.st?.has(e) && this.it.add(e);
          return this.render(t);
        }
        const r = e.element.classList;
        for (const e of this.it) e in t || (r.remove(e), this.it.delete(e));
        for (const e in t) {
          const o = !!t[e];
          o === this.it.has(e) ||
            this.st?.has(e) ||
            (o ? (r.add(e), this.it.add(e)) : (r.remove(e), this.it.delete(e)));
        }
        return Q;
      }
    }
  ),
  Be = "cubic-bezier(0.2, 0, 0, 1)",
  Ne = "cubic-bezier(.3,0,0,1)",
  Ue = "cubic-bezier(.3,0,.8,.15)";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ var De;
!(function (e) {
  (e[(e.INACTIVE = 0)] = "INACTIVE"),
    (e[(e.TOUCH_DELAY = 1)] = "TOUCH_DELAY"),
    (e[(e.HOLDING = 2)] = "HOLDING"),
    (e[(e.WAITING_FOR_CLICK = 3)] = "WAITING_FOR_CLICK");
})(De || (De = {}));
const Fe = [
    "click",
    "contextmenu",
    "pointercancel",
    "pointerdown",
    "pointerenter",
    "pointerleave",
    "pointerup",
  ],
  He = window.matchMedia("(forced-colors: active)");
class Ve extends me {
  constructor() {
    super(...arguments),
      (this.disabled = !1),
      (this.hovered = !1),
      (this.pressed = !1),
      (this.rippleSize = ""),
      (this.rippleScale = ""),
      (this.initialSize = 0),
      (this.state = De.INACTIVE),
      (this.checkBoundsAfterContextMenu = !1),
      (this.attachableController = new Ce(
        this,
        this.onControlChange.bind(this)
      ));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(e) {
    this.attachableController.htmlFor = e;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(e) {
    this.attachableController.control = e;
  }
  attach(e) {
    this.attachableController.attach(e);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  render() {
    const e = { hovered: this.hovered, pressed: this.pressed };
    return J`<div class="surface ${Me(e)}"></div>`;
  }
  update(e) {
    e.has("disabled") &&
      this.disabled &&
      ((this.hovered = !1), (this.pressed = !1)),
      super.update(e);
  }
  handlePointerenter(e) {
    this.shouldReactToEvent(e) && (this.hovered = !0);
  }
  handlePointerleave(e) {
    this.shouldReactToEvent(e) &&
      ((this.hovered = !1),
      this.state !== De.INACTIVE && this.endPressAnimation());
  }
  handlePointerup(e) {
    if (this.shouldReactToEvent(e)) {
      if (this.state !== De.HOLDING)
        return this.state === De.TOUCH_DELAY
          ? ((this.state = De.WAITING_FOR_CLICK),
            void this.startPressAnimation(this.rippleStartEvent))
          : void 0;
      this.state = De.WAITING_FOR_CLICK;
    }
  }
  async handlePointerdown(e) {
    if (this.shouldReactToEvent(e)) {
      if (((this.rippleStartEvent = e), !this.isTouch(e)))
        return (
          (this.state = De.WAITING_FOR_CLICK), void this.startPressAnimation(e)
        );
      (this.checkBoundsAfterContextMenu && !this.inBounds(e)) ||
        ((this.checkBoundsAfterContextMenu = !1),
        (this.state = De.TOUCH_DELAY),
        await new Promise((e) => {
          setTimeout(e, 150);
        }),
        this.state === De.TOUCH_DELAY &&
          ((this.state = De.HOLDING), this.startPressAnimation(e)));
    }
  }
  handleClick() {
    this.disabled ||
      (this.state !== De.WAITING_FOR_CLICK
        ? this.state === De.INACTIVE &&
          (this.startPressAnimation(), this.endPressAnimation())
        : this.endPressAnimation());
  }
  handlePointercancel(e) {
    this.shouldReactToEvent(e) && this.endPressAnimation();
  }
  handleContextmenu() {
    this.disabled ||
      ((this.checkBoundsAfterContextMenu = !0), this.endPressAnimation());
  }
  determineRippleSize() {
    const { height: e, width: t } = this.getBoundingClientRect(),
      r = Math.max(e, t),
      o = Math.max(0.35 * r, 75),
      a = Math.floor(0.2 * r),
      i = Math.sqrt(t ** 2 + e ** 2) + 10;
    (this.initialSize = a),
      (this.rippleScale = "" + (i + o) / a),
      (this.rippleSize = `${a}px`);
  }
  getNormalizedPointerEventCoords(e) {
    const { scrollX: t, scrollY: r } = window,
      { left: o, top: a } = this.getBoundingClientRect(),
      i = t + o,
      n = r + a,
      { pageX: s, pageY: l } = e;
    return { x: s - i, y: l - n };
  }
  getTranslationCoordinates(e) {
    const { height: t, width: r } = this.getBoundingClientRect(),
      o = { x: (r - this.initialSize) / 2, y: (t - this.initialSize) / 2 };
    let a;
    return (
      (a =
        e instanceof PointerEvent
          ? this.getNormalizedPointerEventCoords(e)
          : { x: r / 2, y: t / 2 }),
      (a = { x: a.x - this.initialSize / 2, y: a.y - this.initialSize / 2 }),
      { startPoint: a, endPoint: o }
    );
  }
  startPressAnimation(e) {
    if (!this.mdRoot) return;
    (this.pressed = !0),
      this.growAnimation?.cancel(),
      this.determineRippleSize();
    const { startPoint: t, endPoint: r } = this.getTranslationCoordinates(e),
      o = `${t.x}px, ${t.y}px`,
      a = `${r.x}px, ${r.y}px`;
    this.growAnimation = this.mdRoot.animate(
      {
        top: [0, 0],
        left: [0, 0],
        height: [this.rippleSize, this.rippleSize],
        width: [this.rippleSize, this.rippleSize],
        transform: [
          `translate(${o}) scale(1)`,
          `translate(${a}) scale(${this.rippleScale})`,
        ],
      },
      { pseudoElement: "::after", duration: 450, easing: Be, fill: "forwards" }
    );
  }
  async endPressAnimation() {
    (this.rippleStartEvent = void 0), (this.state = De.INACTIVE);
    const e = this.growAnimation;
    let t = 1 / 0;
    "number" == typeof e?.currentTime
      ? (t = e.currentTime)
      : e?.currentTime && (t = e.currentTime.to("ms").value),
      t >= 225
        ? (this.pressed = !1)
        : (await new Promise((e) => {
            setTimeout(e, 225 - t);
          }),
          this.growAnimation === e && (this.pressed = !1));
  }
  shouldReactToEvent(e) {
    if (this.disabled || !e.isPrimary) return !1;
    if (
      this.rippleStartEvent &&
      this.rippleStartEvent.pointerId !== e.pointerId
    )
      return !1;
    if ("pointerenter" === e.type || "pointerleave" === e.type)
      return !this.isTouch(e);
    const t = 1 === e.buttons;
    return this.isTouch(e) || t;
  }
  inBounds({ x: e, y: t }) {
    const {
      top: r,
      left: o,
      bottom: a,
      right: i,
    } = this.getBoundingClientRect();
    return e >= o && e <= i && t >= r && t <= a;
  }
  isTouch({ pointerType: e }) {
    return "touch" === e;
  }
  async handleEvent(e) {
    if (!He?.matches)
      switch (e.type) {
        case "click":
          this.handleClick();
          break;
        case "contextmenu":
          this.handleContextmenu();
          break;
        case "pointercancel":
          this.handlePointercancel(e);
          break;
        case "pointerdown":
          await this.handlePointerdown(e);
          break;
        case "pointerenter":
          this.handlePointerenter(e);
          break;
        case "pointerleave":
          this.handlePointerleave(e);
          break;
        case "pointerup":
          this.handlePointerup(e);
      }
  }
  onControlChange(e, t) {
    for (const r of Fe)
      e?.removeEventListener(r, this), t?.addEventListener(r, this);
  }
}
e([E({ type: Boolean, reflect: !0 })], Ve.prototype, "disabled", void 0),
  e([A()], Ve.prototype, "hovered", void 0),
  e([A()], Ve.prototype, "pressed", void 0),
  e([S(".surface")], Ve.prototype, "mdRoot", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const qe = s`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}/*# sourceMappingURL=ripple-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let je = class extends Ve {};
(je.styles = [qe]), (je = e([t("md-ripple")], je));
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const We = [
  "ariaAtomic",
  "ariaAutoComplete",
  "ariaBusy",
  "ariaChecked",
  "ariaColCount",
  "ariaColIndex",
  "ariaColSpan",
  "ariaCurrent",
  "ariaDisabled",
  "ariaExpanded",
  "ariaHasPopup",
  "ariaHidden",
  "ariaInvalid",
  "ariaKeyShortcuts",
  "ariaLabel",
  "ariaLevel",
  "ariaLive",
  "ariaModal",
  "ariaMultiLine",
  "ariaMultiSelectable",
  "ariaOrientation",
  "ariaPlaceholder",
  "ariaPosInSet",
  "ariaPressed",
  "ariaReadOnly",
  "ariaRequired",
  "ariaRoleDescription",
  "ariaRowCount",
  "ariaRowIndex",
  "ariaRowSpan",
  "ariaSelected",
  "ariaSetSize",
  "ariaSort",
  "ariaValueMax",
  "ariaValueMin",
  "ariaValueNow",
  "ariaValueText",
];
function Ge(e) {
  return e
    .replace("aria", "aria-")
    .replace(/Elements?/g, "")
    .toLowerCase();
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ function Ke(e) {
  for (const t of We) e.createProperty(t, { attribute: Ge(t), reflect: !0 });
  e.addInitializer((e) => {
    const t = {
      hostConnected() {
        e.setAttribute("role", "presentation");
      },
    };
    e.addController(t);
  });
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ We.map(Ge);
class Ye extends me {
  constructor() {
    super(...arguments),
      (this.size = "medium"),
      (this.label = ""),
      (this.lowered = !1);
  }
  render() {
    const { ariaLabel: e } = this;
    return J`
      <button
        class="fab ${Me(this.getRenderClasses())}"
        aria-label=${e || ee}>
        <md-elevation></md-elevation>
        <md-focus-ring part="focus-ring"></md-focus-ring>
        <md-ripple class="ripple"></md-ripple>
        ${this.renderTouchTarget()} ${this.renderIcon()} ${this.renderLabel()}
      </button>
    `;
  }
  getRenderClasses() {
    const e = !!this.label;
    return {
      lowered: this.lowered,
      small: "small" === this.size && !e,
      large: "large" === this.size && !e,
      extended: e,
    };
  }
  renderTouchTarget() {
    return J`<div class="touch-target"></div>`;
  }
  renderLabel() {
    return this.label ? J`<span class="label">${this.label}</span>` : "";
  }
  renderIcon() {
    const { ariaLabel: e } = this;
    return J`<span class="icon">
      <slot
        name="icon"
        aria-hidden=${e || this.label ? "true" : ee}>
        <span></span>
      </slot>
    </span>`;
  }
}
Ke(Ye),
  (Ye.shadowRootOptions = { mode: "open", delegatesFocus: !0 }),
  e([E({ reflect: !0 })], Ye.prototype, "size", void 0),
  e([E()], Ye.prototype, "label", void 0),
  e([E({ type: Boolean })], Ye.prototype, "lowered", void 0);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Xe extends Ye {
  constructor() {
    super(...arguments), (this.variant = "surface");
  }
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      primary: "primary" === this.variant,
      secondary: "secondary" === this.variant,
      tertiary: "tertiary" === this.variant,
    };
  }
}
e([E()], Xe.prototype, "variant", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Ze = s`:host{--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-color: var(--md-fab-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12);--_focus-label-text-color: var(--md-fab-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-fab-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-fab-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-fab-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-fab-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_large-container-height: var(--md-fab-large-container-height, 96px);--_large-container-width: var(--md-fab-large-container-width, 96px);--_large-icon-size: var(--md-fab-large-icon-size, 36px);--_pressed-label-text-color: var(--md-fab-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_primary-container-color: var(--md-fab-primary-container-color, var(--md-sys-color-primary-container, #eaddff));--_primary-focus-icon-color: var(--md-fab-primary-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-label-text-color: var(--md-fab-primary-focus-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-icon-color: var(--md-fab-primary-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-label-text-color: var(--md-fab-primary-hover-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-state-layer-color: var(--md-fab-primary-hover-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-icon-color: var(--md-fab-primary-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-label-text-color: var(--md-fab-primary-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-icon-color: var(--md-fab-primary-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-label-text-color: var(--md-fab-primary-pressed-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-state-layer-color: var(--md-fab-primary-pressed-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_secondary-container-color: var(--md-fab-secondary-container-color, var(--md-sys-color-secondary-container, #e8def8));--_secondary-focus-icon-color: var(--md-fab-secondary-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-label-text-color: var(--md-fab-secondary-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-icon-color: var(--md-fab-secondary-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-label-text-color: var(--md-fab-secondary-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-state-layer-color: var(--md-fab-secondary-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-icon-color: var(--md-fab-secondary-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-label-text-color: var(--md-fab-secondary-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-icon-color: var(--md-fab-secondary-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-label-text-color: var(--md-fab-secondary-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-state-layer-color: var(--md-fab-secondary-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_small-container-height: var(--md-fab-small-container-height, 40px);--_small-container-width: var(--md-fab-small-container-width, 40px);--_small-icon-size: var(--md-fab-small-icon-size, 24px);--_tertiary-container-color: var(--md-fab-tertiary-container-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_tertiary-focus-icon-color: var(--md-fab-tertiary-focus-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-label-text-color: var(--md-fab-tertiary-focus-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-icon-color: var(--md-fab-tertiary-hover-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-label-text-color: var(--md-fab-tertiary-hover-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-state-layer-color: var(--md-fab-tertiary-hover-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-icon-color: var(--md-fab-tertiary-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-label-text-color: var(--md-fab-tertiary-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-icon-color: var(--md-fab-tertiary-pressed-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-label-text-color: var(--md-fab-tertiary-pressed-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-state-layer-color: var(--md-fab-tertiary-pressed-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_container-shape-start-start: var(--md-fab-container-shape-start-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-start-end: var(--md-fab-container-shape-start-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-end: var(--md-fab-container-shape-end-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-start: var(--md-fab-container-shape-end-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_large-container-shape-start-start: var(--md-fab-large-container-shape-start-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-start-end: var(--md-fab-large-container-shape-start-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-end: var(--md-fab-large-container-shape-end-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-start: var(--md-fab-large-container-shape-end-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_small-container-shape-start-start: var(--md-fab-small-container-shape-start-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-start-end: var(--md-fab-small-container-shape-start-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-end: var(--md-fab-small-container-shape-end-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-start: var(--md-fab-small-container-shape-end-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));cursor:pointer}:host([size=small][touch-target=wrapper]){margin:max(0px,48px - var(--_small-container-height))}.fab{cursor:inherit}.fab .icon ::slotted(*){color:var(--_icon-color)}.fab:focus{color:var(--_focus-icon-color)}.fab:hover{color:var(--_hover-icon-color)}.fab:active{color:var(--_pressed-icon-color)}.fab.primary{background-color:var(--_primary-container-color);--md-ripple-hover-color: var(--_primary-hover-state-layer-color);--md-ripple-pressed-color: var(--_primary-pressed-state-layer-color)}.fab.primary .icon ::slotted(*){color:var(--_primary-icon-color)}.fab.primary:focus{color:var(--_primary-focus-icon-color)}.fab.primary:hover{color:var(--_primary-hover-icon-color)}.fab.primary:active{color:var(--_primary-pressed-icon-color)}.fab.primary .label{color:var(--_primary-label-text-color)}.fab:hover .fab.primary .label{color:var(--_primary-hover-label-text-color)}.fab:focus .fab.primary .label{color:var(--_primary-focus-label-text-color)}.fab:active .fab.primary .label{color:var(--_primary-pressed-label-text-color)}.fab.secondary{background-color:var(--_secondary-container-color);--md-ripple-hover-color: var(--_secondary-hover-state-layer-color);--md-ripple-pressed-color: var(--_secondary-pressed-state-layer-color)}.fab.secondary .icon ::slotted(*){color:var(--_secondary-icon-color)}.fab.secondary:focus{color:var(--_secondary-focus-icon-color)}.fab.secondary:hover{color:var(--_secondary-hover-icon-color)}.fab.secondary:active{color:var(--_secondary-pressed-icon-color)}.fab.secondary .label{color:var(--_secondary-label-text-color)}.fab:hover .fab.secondary .label{color:var(--_secondary-hover-label-text-color)}.fab:focus .fab.secondary .label{color:var(--_secondary-focus-label-text-color)}.fab:active .fab.secondary .label{color:var(--_secondary-pressed-label-text-color)}.fab.tertiary{background-color:var(--_tertiary-container-color);--md-ripple-hover-color: var(--_tertiary-hover-state-layer-color);--md-ripple-pressed-color: var(--_tertiary-pressed-state-layer-color)}.fab.tertiary .icon ::slotted(*){color:var(--_tertiary-icon-color)}.fab.tertiary:focus{color:var(--_tertiary-focus-icon-color)}.fab.tertiary:hover{color:var(--_tertiary-hover-icon-color)}.fab.tertiary:active{color:var(--_tertiary-pressed-icon-color)}.fab.tertiary .label{color:var(--_tertiary-label-text-color)}.fab:hover .fab.tertiary .label{color:var(--_tertiary-hover-label-text-color)}.fab:focus .fab.tertiary .label{color:var(--_tertiary-focus-label-text-color)}.fab:active .fab.tertiary .label{color:var(--_tertiary-pressed-label-text-color)}.fab.extended slot span{padding-inline-start:4px}.fab.small{width:var(--_small-container-width);height:var(--_small-container-height)}.fab.small .icon ::slotted(*){width:var(--_small-icon-size);height:var(--_small-icon-size);font-size:var(--_small-icon-size)}.fab.small,.fab.small .ripple{border-start-start-radius:var(--_small-container-shape-start-start);border-start-end-radius:var(--_small-container-shape-start-end);border-end-start-radius:var(--_small-container-shape-end-start);border-end-end-radius:var(--_small-container-shape-end-end)}.fab.small md-focus-ring{--md-focus-ring-shape-start-start: var(--_small-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_small-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_small-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_small-container-shape-end-start)}/*# sourceMappingURL=fab-styles.css.map */
`,
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */ Je = s`@media(forced-colors: active){.fab{border:1px solid ButtonText}.fab.extended{padding-inline-start:15px;padding-inline-end:19px}md-focus-ring{--md-focus-ring-outward-offset: 3px}}/*# sourceMappingURL=forced-colors-styles.css.map */
`,
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */ Qe = s`:host{--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);display:inline-flex;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([size=medium][touch-target=wrapper]){margin:max(0px,48px - var(--_container-height))}:host([size=large][touch-target=wrapper]){margin:max(0px,48px - var(--_large-container-height))}.fab,.icon,.icon ::slotted(*){display:flex}.fab{align-items:center;justify-content:center;vertical-align:middle;padding:0;position:relative;height:var(--_container-height);transition-property:background-color;border-width:0px;outline:none;z-index:0;--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color);background-color:var(--_container-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color)}.fab.extended{width:inherit;box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px}.fab:not(.extended){width:var(--_container-width)}.fab.large{width:var(--_large-container-width);height:var(--_large-container-height)}.fab.large .icon ::slotted(*){width:var(--_large-icon-size);height:var(--_large-icon-size);font-size:var(--_large-icon-size)}.fab.large,.fab.large .ripple{border-start-start-radius:var(--_large-container-shape-start-start);border-start-end-radius:var(--_large-container-shape-start-end);border-end-start-radius:var(--_large-container-shape-end-start);border-end-end-radius:var(--_large-container-shape-end-end)}.fab.large md-focus-ring{--md-focus-ring-shape-start-start: var(--_large-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_large-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_large-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_large-container-shape-end-start)}.fab:focus{--md-elevation-level: var(--_focus-container-elevation)}.fab:hover{--md-elevation-level: var(--_hover-container-elevation)}.fab:active{--md-elevation-level: var(--_pressed-container-elevation)}.fab.lowered{background-color:var(--_lowered-container-color);--md-elevation-level: var(--_lowered-container-elevation)}.fab.lowered:focus{--md-elevation-level: var(--_lowered-focus-container-elevation)}.fab.lowered:hover{--md-elevation-level: var(--_lowered-hover-container-elevation)}.fab.lowered:active{--md-elevation-level: var(--_lowered-pressed-container-elevation)}.fab .label{color:var(--_label-text-color)}.fab:hover .fab .label{color:var(--_hover-label-text-color)}.fab:focus .fab .label{color:var(--_focus-label-text-color)}.fab:active .fab .label{color:var(--_pressed-label-text-color)}.label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight)}.fab.extended .icon ::slotted(*){margin-inline-end:12px}.ripple{overflow:hidden}.ripple,md-elevation{z-index:-1}.touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host([touch-target=none]) .touch-target{display:none}md-elevation,.fab{transition-duration:280ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1)}.fab,.ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.icon ::slotted(*){width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let et = class extends Xe {};
(et.styles = [Qe, Ze, Je]), (et = e([t("md-fab")], et));
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const tt = Symbol("internals"),
  rt = Symbol("privateInternals");
function ot(e) {
  return class extends e {
    get [tt]() {
      return this[rt] || (this[rt] = this.attachInternals()), this[rt];
    }
  };
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ function at(e) {
  e.addInitializer((e) => {
    const t = e;
    t.addEventListener("click", async (e) => {
      const { type: r, [tt]: o } = t,
        { form: a } = o;
      a &&
        "button" !== r &&
        (await new Promise((e) => {
          setTimeout(e);
        }),
        e.defaultPrevented ||
          ("reset" !== r
            ? (a.addEventListener(
                "submit",
                (e) => {
                  Object.defineProperty(e, "submitter", {
                    configurable: !0,
                    enumerable: !0,
                    get: () => t,
                  });
                },
                { capture: !0, once: !0 }
              ),
              o.setFormValue(t.value),
              a.requestSubmit())
            : a.reset()));
    });
  });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ function it(e) {
  const t = new MouseEvent("click", { bubbles: !0 });
  return e.dispatchEvent(t), t;
}
function nt(e) {
  return (
    e.currentTarget === e.target &&
    e.composedPath()[0] === e.target &&
    !e.target.disabled &&
    !(function (e) {
      const t = st;
      return (
        t && (e.preventDefault(), e.stopImmediatePropagation()),
        (async function () {
          (st = !0), await null, (st = !1);
        })(),
        /**
         * @license
         * Copyright 2019 Google LLC
         * SPDX-License-Identifier: Apache-2.0
         */
        t
      );
    })(e)
  );
}
let st = !1;
const lt = ot(me);
class dt extends lt {
  get name() {
    return this.getAttribute("name") ?? "";
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  get form() {
    return this[tt].form;
  }
  constructor() {
    super(),
      (this.disabled = !1),
      (this.href = ""),
      (this.target = ""),
      (this.trailingIcon = !1),
      (this.hasIcon = !1),
      (this.type = "submit"),
      (this.value = ""),
      (this.handleActivationClick = (e) => {
        nt(e) && this.buttonElement && (this.focus(), it(this.buttonElement));
      }),
      this.addEventListener("click", this.handleActivationClick);
  }
  focus() {
    this.buttonElement?.focus();
  }
  blur() {
    this.buttonElement?.blur();
  }
  render() {
    const e = this.disabled && !this.href,
      t = this.href ? this.renderLink() : this.renderButton(),
      r = this.href ? "link" : "button";
    return J`
      ${this.renderElevationOrOutline?.()}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${r}></md-focus-ring>
      <md-ripple for=${r} ?disabled="${e}"></md-ripple>
      ${t}
    `;
  }
  renderButton() {
    const { ariaLabel: e, ariaHasPopup: t, ariaExpanded: r } = this;
    return J`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-label="${e || ee}"
      aria-haspopup="${t || ee}"
      aria-expanded="${r || ee}">
      ${this.renderContent()}
    </button>`;
  }
  renderLink() {
    const { ariaLabel: e, ariaHasPopup: t, ariaExpanded: r } = this;
    return J`<a
      id="link"
      class="button"
      aria-label="${e || ee}"
      aria-haspopup="${t || ee}"
      aria-expanded="${r || ee}"
      href=${this.href}
      target=${this.target || ee}
      >${this.renderContent()}
    </a>`;
  }
  renderContent() {
    const e = J`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;
    return J`
      <span class="touch"></span>
      ${this.trailingIcon ? ee : e}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon ? e : ee}
    `;
  }
  handleSlotChange() {
    this.hasIcon = this.assignedIcons.length > 0;
  }
}
Ke(dt),
  at(dt),
  (dt.formAssociated = !0),
  (dt.shadowRootOptions = { mode: "open", delegatesFocus: !0 }),
  e([E({ type: Boolean, reflect: !0 })], dt.prototype, "disabled", void 0),
  e([E()], dt.prototype, "href", void 0),
  e([E()], dt.prototype, "target", void 0),
  e(
    [E({ type: Boolean, attribute: "trailing-icon", reflect: !0 })],
    dt.prototype,
    "trailingIcon",
    void 0
  ),
  e(
    [E({ type: Boolean, attribute: "has-icon", reflect: !0 })],
    dt.prototype,
    "hasIcon",
    void 0
  ),
  e([E()], dt.prototype, "type", void 0),
  e([E({ reflect: !0 })], dt.prototype, "value", void 0),
  e([S(".button")], dt.prototype, "buttonElement", void 0),
  e([R({ slot: "icon", flatten: !0 })], dt.prototype, "assignedIcons", void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ct extends dt {
  renderElevationOrOutline() {
    return J`<div class="outline"></div>`;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const ht = s`:host{--_container-height: var(--md-outlined-button-container-height, 40px);--_disabled-label-text-color: var(--md-outlined-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-button-disabled-label-text-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-button-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-outlined-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-outlined-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-outlined-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-outlined-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-outlined-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-outlined-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-button-outline-width, 1px);--_pressed-label-text-color: var(--md-outlined-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-outline-color: var(--md-outlined-button-pressed-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-color: var(--md-outlined-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-outlined-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-outlined-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-outlined-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-outlined-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-outlined-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-outlined-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-outlined-button-icon-size, 18px);--_pressed-icon-color: var(--md-outlined-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-outlined-button-container-shape-start-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-outlined-button-container-shape-start-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-outlined-button-container-shape-end-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-outlined-button-container-shape-end-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-outlined-button-leading-space, 24px);--_trailing-space: var(--md-outlined-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-outlined-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-outlined-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-outlined-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-outlined-button-with-trailing-icon-trailing-space, 16px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}.outline{inset:0;border-style:solid;position:absolute;box-sizing:border-box;border-color:var(--_outline-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}:host(:active) .outline{border-color:var(--_pressed-outline-color)}:host([disabled]) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}@media(forced-colors: active){:host([disabled]) .background{border-color:GrayText}:host([disabled]) .outline{opacity:1}}.outline,md-ripple{border-width:var(--_outline-width)}md-ripple{inline-size:calc(100% - 2*var(--_outline-width));block-size:calc(100% - 2*var(--_outline-width));border-style:solid;border-color:rgba(0,0,0,0)}/*# sourceMappingURL=outlined-styles.css.map */
`,
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */ pt = s`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host([disabled]){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background-color:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host([disabled]) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host([disabled]) .background{background-color:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host([disabled]){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([disabled]) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let ut = class extends ct {};
(ut.styles = [pt, ht]), (ut = e([t("md-outlined-button")], ut));
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class vt extends me {
  constructor() {
    super(...arguments),
      (this.value = 0),
      (this.max = 1),
      (this.indeterminate = !1),
      (this.fourColor = !1);
  }
  render() {
    const { ariaLabel: e } = this;
    return J`
      <div
        class="progress ${Me(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${e || ee}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate ? ee : this.value}
        >${this.renderIndicator()}</div
      >
    `;
  }
  getRenderClasses() {
    return { indeterminate: this.indeterminate, "four-color": this.fourColor };
  }
}
Ke(vt),
  e([E({ type: Number })], vt.prototype, "value", void 0),
  e([E({ type: Number })], vt.prototype, "max", void 0),
  e([E({ type: Boolean })], vt.prototype, "indeterminate", void 0),
  e(
    [E({ type: Boolean, attribute: "four-color" })],
    vt.prototype,
    "fourColor",
    void 0
  );
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class mt extends vt {
  renderIndicator() {
    return this.indeterminate
      ? this.renderIndeterminateContainer()
      : this.renderDeterminateContainer();
  }
  renderDeterminateContainer() {
    const e = 100 * (1 - this.value / this.max);
    return J`
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${e}></circle>
      </svg>
    `;
  }
  renderIndeterminateContainer() {
    return J` <div class="spinner">
      <div class="left">
        <div class="circle"></div>
      </div>
      <div class="right">
        <div class="circle"></div>
      </div>
    </div>`;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const ft = s`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}/*# sourceMappingURL=circular-progress-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let bt = class extends mt {};
(bt.styles = [ft]), (bt = e([t("md-circular-progress")], bt));
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class gt extends dt {
  renderElevationOrOutline() {
    return J`<md-elevation></md-elevation>`;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const yt = s`:host{--_container-color: var(--md-filled-tonal-button-container-color, var(--md-sys-color-secondary-container, #e8def8));--_container-elevation: var(--md-filled-tonal-button-container-elevation, 0);--_container-height: var(--md-filled-tonal-button-container-height, 40px);--_container-shadow-color: var(--md-filled-tonal-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-tonal-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-tonal-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-tonal-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-tonal-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-tonal-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-tonal-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-tonal-button-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-container-elevation: var(--md-filled-tonal-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-tonal-button-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-color: var(--md-filled-tonal-button-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-opacity: var(--md-filled-tonal-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-tonal-button-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_label-text-font: var(--md-filled-tonal-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-tonal-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-tonal-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-tonal-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-tonal-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-tonal-button-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-color: var(--md-filled-tonal-button-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filled-tonal-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-tonal-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-tonal-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-tonal-button-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-icon-color: var(--md-filled-tonal-button-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_icon-color: var(--md-filled-tonal-button-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_icon-size: var(--md-filled-tonal-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-tonal-button-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_container-shape-start-start: var(--md-filled-tonal-button-container-shape-start-start, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-tonal-button-container-shape-start-end, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-tonal-button-container-shape-end-end, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-tonal-button-container-shape-end-start, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-tonal-button-leading-space, 24px);--_trailing-space: var(--md-filled-tonal-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-tonal-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-tonal-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-tonal-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-tonal-button-with-trailing-icon-trailing-space, 16px)}/*# sourceMappingURL=filled-tonal-styles.css.map */
`,
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */ xt = s`md-elevation{transition-duration:280ms}:host([disabled]) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host([disabled]) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}/*# sourceMappingURL=shared-elevation-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let _t = class extends gt {};
(_t.styles = [pt, xt, yt]), (_t = e([t("md-filled-tonal-button")], _t));
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class wt extends dt {
  renderElevationOrOutline() {
    return J`<md-elevation></md-elevation>`;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const kt = s`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}/*# sourceMappingURL=filled-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let $t = class extends wt {};
($t.styles = [pt, xt, kt]), ($t = e([t("md-filled-button")], $t));
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = Symbol.for(""),
  Et = (e) => {
    if (e?.r === Ct) return e?._$litStatic$;
  },
  At = (e, ...t) => ({
    _$litStatic$: t.reduce(
      (t, r, o) =>
        t +
        ((e) => {
          if (void 0 !== e._$litStatic$) return e._$litStatic$;
          throw Error(
            `Value passed to 'literal' function must be a 'literal' result: ${e}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`
          );
        })(r) +
        e[o + 1],
      e[0]
    ),
    r: Ct,
  }),
  zt = new Map(),
  St = (
    (e) =>
    (t, ...r) => {
      const o = r.length;
      let a, i;
      const n = [],
        s = [];
      let l,
        d = 0,
        c = !1;
      for (; d < o; ) {
        for (l = t[d]; d < o && void 0 !== ((i = r[d]), (a = Et(i))); )
          (l += a + t[++d]), (c = !0);
        d !== o && s.push(i), n.push(l), d++;
      }
      if ((d === o && n.push(t[o]), c)) {
        const e = n.join("$$lit$$");
        void 0 === (t = zt.get(e)) && ((n.raw = n), zt.set(e, (t = n))),
          (r = s);
      }
      return e(t, ...r);
    }
  )(J);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ function Tt(e, t = !0) {
  return (
    t && "rtl" === getComputedStyle(e).getPropertyValue("direction").trim()
  );
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const It = ot(me);
class Rt extends It {
  constructor() {
    super(...arguments),
      (this.disabled = !1),
      (this.flipIconInRtl = !1),
      (this.href = ""),
      (this.target = ""),
      (this.ariaLabelSelected = ""),
      (this.toggle = !1),
      (this.selected = !1),
      (this.type = "submit"),
      (this.value = ""),
      (this.flipIcon = Tt(this, this.flipIconInRtl));
  }
  get name() {
    return this.getAttribute("name") ?? "";
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  get form() {
    return this[tt].form;
  }
  get labels() {
    return this[tt].labels;
  }
  willUpdate() {
    this.href && (this.disabled = !1);
  }
  render() {
    const e = this.href ? At`div` : At`button`,
      { ariaLabel: t, ariaHasPopup: r, ariaExpanded: o } = this,
      a = t && this.ariaLabelSelected,
      i = this.toggle ? this.selected : ee;
    let n = ee;
    return (
      this.href || (n = a && this.selected ? this.ariaLabelSelected : t),
      St`<${e}
        class="icon-button ${Me(this.getRenderClasses())}"
        id="button"
        aria-label="${n || ee}"
        aria-haspopup="${(!this.href && r) || ee}"
        aria-expanded="${(!this.href && o) || ee}"
        aria-pressed="${i}"
        ?disabled="${!this.href && this.disabled}"
        @click="${this.handleClick}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected ? ee : this.renderIcon()}
        ${this.selected ? this.renderSelectedIcon() : ee}
        ${this.renderTouchTarget()}
        ${this.href && this.renderLink()}
  </${e}>`
    );
  }
  renderLink() {
    const { ariaLabel: e } = this;
    return J`
      <a
        class="link"
        id="link"
        href="${this.href}"
        target="${this.target || ee}"
        aria-label="${e || ee}"></a>
    `;
  }
  getRenderClasses() {
    return {
      "flip-icon": this.flipIcon,
      selected: this.toggle && this.selected,
    };
  }
  renderIcon() {
    return J`<span class="icon"><slot></slot></span>`;
  }
  renderSelectedIcon() {
    return J`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`;
  }
  renderTouchTarget() {
    return J`<span class="touch"></span>`;
  }
  renderFocusRing() {
    return J`<md-focus-ring
      part="focus-ring"
      for=${this.href ? "link" : "button"}></md-focus-ring>`;
  }
  renderRipple() {
    return J`<md-ripple
      for=${this.href ? "link" : ee}
      ?disabled="${!this.href && this.disabled}"></md-ripple>`;
  }
  connectedCallback() {
    (this.flipIcon = Tt(this, this.flipIconInRtl)), super.connectedCallback();
  }
  async handleClick(e) {
    await 0,
      !this.toggle ||
        this.disabled ||
        e.defaultPrevented ||
        ((this.selected = !this.selected),
        this.dispatchEvent(
          new InputEvent("input", { bubbles: !0, composed: !0 })
        ),
        this.dispatchEvent(new Event("change", { bubbles: !0 })));
  }
}
Ke(Rt),
  at(Rt),
  (Rt.formAssociated = !0),
  (Rt.shadowRootOptions = { mode: "open", delegatesFocus: !0 }),
  e([E({ type: Boolean, reflect: !0 })], Rt.prototype, "disabled", void 0),
  e(
    [E({ type: Boolean, attribute: "flip-icon-in-rtl" })],
    Rt.prototype,
    "flipIconInRtl",
    void 0
  ),
  e([E()], Rt.prototype, "href", void 0),
  e([E()], Rt.prototype, "target", void 0),
  e(
    [E({ attribute: "aria-label-selected" })],
    Rt.prototype,
    "ariaLabelSelected",
    void 0
  ),
  e([E({ type: Boolean })], Rt.prototype, "toggle", void 0),
  e([E({ type: Boolean, reflect: !0 })], Rt.prototype, "selected", void 0),
  e([E()], Rt.prototype, "type", void 0),
  e([E({ reflect: !0 })], Rt.prototype, "value", void 0),
  e([A()], Rt.prototype, "flipIcon", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Ot = s`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host([disabled]){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{height:100%;outline:none;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host([disabled]){--_disabled-icon-opacity: 1}}/*# sourceMappingURL=shared-styles.css.map */
`,
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */ Lt = s`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:disabled{color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:disabled .icon{opacity:var(--_disabled-icon-opacity)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}.selected:not(:disabled){color:var(--_selected-icon-color)}.selected:not(:disabled):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled):active{color:var(--_selected-pressed-icon-color)}/*# sourceMappingURL=standard-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Pt = class extends Rt {
  getRenderClasses() {
    return { ...super.getRenderClasses(), standard: !0 };
  }
};
(Pt.styles = [Ot, Lt]),
  (Pt = e([t("md-icon-button")], Pt)),
  window.addEventListener("load", function () {
    Promise.resolve().then(function () {
      return Zt;
    }),
      Promise.resolve().then(function () {
        return wr;
      }),
      Promise.resolve().then(function () {
        return Rr;
      }),
      Promise.resolve().then(function () {
        return Nr;
      }),
      Promise.resolve().then(function () {
        return qr;
      }),
      Promise.resolve().then(function () {
        return Yr;
      }),
      Promise.resolve().then(function () {
        return po;
      }),
      Promise.resolve().then(function () {
        return mo;
      }),
      Promise.resolve().then(function () {
        return ko;
      }),
      Promise.resolve().then(function () {
        return Ao;
      }),
      Promise.resolve().then(function () {
        return Ro;
      }),
      Promise.resolve().then(function () {
        return Mo;
      }),
      Promise.resolve().then(function () {
        return ia;
      }),
      Promise.resolve().then(function () {
        return pa;
      }),
      Promise.resolve().then(function () {
        return Ho;
      });
  }),
  window.addEventListener("load", async (e) => {
    const {
      Hct: r,
      themeFromSourceColor: o,
      argbFromHex: a,
      applyTheme: i,
      hexFromArgb: n,
    } = await import("@material/material-color-utilities/index.js");
    var s;
    try {
      s = localStorage["seed-color"].split(",");
    } catch (e) {
      s = [267, 100];
    }
    function l(e, t) {
      let n = r.from(e, t, 50).toInt(),
        s = (localStorage["seed-color"] || "267,100").split(",");
      n = r.from(s[0], s[1], 50).toInt();
      const l = o(n, [{ name: "custom-1", value: a("#ff0000"), blend: !0 }]);
      localStorage.mode = localStorage.mode || "sys";
      let c =
        "dark" === localStorage.mode ||
        ("light" !== localStorage.mode &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      return (
        i(l, { target: document.body, dark: c }),
        document
          .querySelector("meta[name='theme-color']")
          .setAttribute(
            "content",
            getComputedStyle(document.body).getPropertyValue(
              "--md-sys-color-surface"
            )
          ),
        d(e)
      );
    }
    function d(e) {
      const t = Array.from({ length: 100 }, (t, o) => {
          const a = 1.5 * o,
            i = r.from(e, a, 50);
          return n(i.toInt());
        }),
        o = t.map((e, t) => `${e} ${t}%`);
      return `linear-gradient(to right, ${o.join(", ")})`;
    }
    l(s[0], s[1]),
      console.log("kkk"),
      (window.changeTheme = l),
      (window.buildGradient = d);
  });
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Mt extends me {
  constructor() {
    super(...arguments), (this.multiline = !1);
  }
  render() {
    return J`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `;
  }
  handleTextSlotChange() {
    let e = !1,
      t = 0;
    for (const r of this.textSlots)
      if ((Bt(r) && (t += 1), t > 1)) {
        e = !0;
        break;
      }
    this.multiline = e;
  }
}
function Bt(e) {
  for (const t of e.assignedNodes({ flatten: !0 })) {
    const e = t.nodeType === Node.ELEMENT_NODE,
      r = t.nodeType === Node.TEXT_NODE && t.textContent?.match(/\S/);
    if (e || r) return !0;
  }
  return !1;
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ e([E({ type: Boolean, reflect: !0 })], Mt.prototype, "multiline", void 0),
  e(
    [
      (function (e) {
        return (t, r) =>
          z(t, r, {
            get() {
              return (
                this.renderRoot ?? (T ??= document.createDocumentFragment())
              ).querySelectorAll(e);
            },
          });
      })(".text slot"),
    ],
    Mt.prototype,
    "textSlots",
    void 0
  );
const Nt = s`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}/*# sourceMappingURL=item-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Ut = class extends Mt {};
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ (Ut.styles = [Nt]), (Ut = e([t("md-item")], Ut));
const Dt = function (e, t) {
    return new CustomEvent("close-menu", {
      bubbles: !0,
      composed: !0,
      detail: { initiator: e, reason: t, itemPath: [e] },
    });
  },
  Ft = "click-selection",
  Ht = "keydown",
  Vt = { ESCAPE: "Escape", SPACE: "Space", ENTER: "Enter" };
function qt(e) {
  return Object.values(Vt).some((t) => t === e);
}
function jt(e, t) {
  const r = new Event("md-contains", { bubbles: !0, composed: !0 });
  let o = [];
  const a = (e) => {
    o = e.composedPath();
  };
  return (
    t.addEventListener("md-contains", a),
    e.dispatchEvent(r),
    t.removeEventListener("md-contains", a),
    o.length > 0
  );
}
const Wt = {
  NONE: "none",
  LIST_ROOT: "list-root",
  FIRST_ITEM: "first-item",
  LAST_ITEM: "last-item",
};
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class Gt {
  constructor(e, t) {
    (this.host = e),
      (this.internalTypeaheadText = null),
      (this.onClick = () => {
        this.host.keepOpen ||
          this.host.dispatchEvent(Dt(this.host, { kind: Ft }));
      }),
      (this.onKeydown = (e) => {
        if (this.host.href && "Enter" === e.code) {
          const e = this.getInteractiveElement();
          e instanceof HTMLAnchorElement && e.click();
        }
        if (e.defaultPrevented) return;
        const t = e.code;
        (this.host.keepOpen && "Escape" !== t) ||
          (qt(t) &&
            (e.preventDefault(),
            this.host.dispatchEvent(Dt(this.host, { kind: Ht, key: t }))));
      }),
      (this.getHeadlineElements = t.getHeadlineElements),
      (this.getSupportingTextElements = t.getSupportingTextElements),
      (this.getDefaultElements = t.getDefaultElements),
      (this.getInteractiveElement = t.getInteractiveElement),
      this.host.addController(this);
  }
  get typeaheadText() {
    if (null !== this.internalTypeaheadText) return this.internalTypeaheadText;
    const e = this.getHeadlineElements(),
      t = [];
    return (
      e.forEach((e) => {
        e.textContent && e.textContent.trim() && t.push(e.textContent.trim());
      }),
      0 === t.length &&
        this.getDefaultElements().forEach((e) => {
          e.textContent && e.textContent.trim() && t.push(e.textContent.trim());
        }),
      0 === t.length &&
        this.getSupportingTextElements().forEach((e) => {
          e.textContent && e.textContent.trim() && t.push(e.textContent.trim());
        }),
      t.join(" ")
    );
  }
  get tagName() {
    switch (this.host.type) {
      case "link":
        return "a";
      case "button":
        return "button";
      default:
        return "li";
    }
  }
  get role() {
    return "option" === this.host.type ? "option" : "menuitem";
  }
  hostConnected() {
    this.host.toggleAttribute("md-menu-item", !0);
  }
  hostUpdate() {
    this.host.href && (this.host.type = "link");
  }
  setTypeaheadText(e) {
    this.internalTypeaheadText = e;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class Kt extends me {
  constructor() {
    super(...arguments),
      (this.disabled = !1),
      (this.type = "menuitem"),
      (this.href = ""),
      (this.target = ""),
      (this.keepOpen = !1),
      (this.selected = !1),
      (this.menuItemController = new Gt(this, {
        getHeadlineElements: () => this.headlineElements,
        getSupportingTextElements: () => this.supportingTextElements,
        getDefaultElements: () => this.defaultElements,
        getInteractiveElement: () => this.listItemRoot,
      }));
  }
  get typeaheadText() {
    return this.menuItemController.typeaheadText;
  }
  set typeaheadText(e) {
    this.menuItemController.setTypeaheadText(e);
  }
  render() {
    return this.renderListItem(J`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `);
  }
  renderListItem(e) {
    const t = "link" === this.type;
    let r;
    switch (this.menuItemController.tagName) {
      case "a":
        r = At`a`;
        break;
      case "button":
        r = At`button`;
        break;
      default:
        r = At`li`;
    }
    const o = t && this.target ? this.target : ee;
    return St`
      <${r}
        id="item"
        tabindex=${this.disabled && !t ? -1 : 0}
        role=${this.menuItemController.role}
        aria-label=${this.ariaLabel || ee}
        aria-selected=${this.ariaSelected || ee}
        aria-checked=${this.ariaChecked || ee}
        aria-expanded=${this.ariaExpanded || ee}
        aria-haspopup=${this.ariaHasPopup || ee}
        class="list-item ${Me(this.getRenderClasses())}"
        href=${this.href || ee}
        target=${o}
        @click=${this.menuItemController.onClick}
        @keydown=${this.menuItemController.onKeydown}
      >${e}</${r}>
    `;
  }
  renderRipple() {
    return J` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.disabled}></md-ripple>`;
  }
  renderFocusRing() {
    return J` <md-focus-ring
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`;
  }
  getRenderClasses() {
    return { disabled: this.disabled, selected: this.selected };
  }
  renderBody() {
    return J`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `;
  }
  focus() {
    this.listItemRoot?.focus();
  }
}
Ke(Kt),
  (Kt.shadowRootOptions = { ...me.shadowRootOptions, delegatesFocus: !0 }),
  e([E({ type: Boolean, reflect: !0 })], Kt.prototype, "disabled", void 0),
  e([E()], Kt.prototype, "type", void 0),
  e([E()], Kt.prototype, "href", void 0),
  e([E()], Kt.prototype, "target", void 0),
  e(
    [E({ type: Boolean, attribute: "keep-open" })],
    Kt.prototype,
    "keepOpen",
    void 0
  ),
  e([E({ type: Boolean })], Kt.prototype, "selected", void 0),
  e([S(".list-item")], Kt.prototype, "listItemRoot", void 0),
  e([R({ slot: "headline" })], Kt.prototype, "headlineElements", void 0),
  e(
    [R({ slot: "supporting-text" })],
    Kt.prototype,
    "supportingTextElements",
    void 0
  ),
  e(
    [
      (function (e) {
        return (t, r) => {
          const { slot: o } = e ?? {},
            a = "slot" + (o ? `[name=${o}]` : ":not([name])");
          return z(t, r, {
            get() {
              const t = this.renderRoot?.querySelector(a);
              return t?.assignedNodes(e) ?? [];
            },
          });
        };
      })({ slot: "" }),
    ],
    Kt.prototype,
    "defaultElements",
    void 0
  ),
  e([E({ attribute: "typeahead-text" })], Kt.prototype, "typeaheadText", null);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Yt = s`:host{display:flex;--md-ripple-hover-color: var(--md-menu-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-menu-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-menu-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-menu-item-pressed-state-layer-opacity, 0.12)}:host([disabled]){opacity:var(--md-menu-item-disabled-opacity, 0.3);pointer-events:none}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.list-item:not(.disabled){cursor:pointer}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;color:var(--md-menu-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-menu-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-menu-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-menu-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-menu-item-one-line-container-height, 56px);padding-top:var(--md-menu-item-top-space, 12px);padding-bottom:var(--md-menu-item-bottom-space, 12px);padding-inline-start:var(--md-menu-item-leading-space, 16px);padding-inline-end:var(--md-menu-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-menu-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-menu-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-menu-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-menu-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-menu-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-menu-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-menu-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-menu-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-menu-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}.list-item{background-color:var(--md-menu-item-container-color, transparent)}.list-item.selected{background-color:var(--md-menu-item-selected-container-color, var(--md-sys-color-secondary-container, #e8def8))}.selected:not(.disabled) ::slotted(*){color:var(--md-menu-item-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b))}@media(forced-colors: active){:host([disabled]),:host([disabled]) slot{color:GrayText;opacity:1}.list-item{position:relative}.list-item.selected::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}/*# sourceMappingURL=menu-item-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Xt = class extends Kt {};
(Xt.styles = [Yt]), (Xt = e([t("md-menu-item")], Xt));
var Zt = Object.freeze({
  __proto__: null,
  get MdMenuItem() {
    return Xt;
  },
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Jt = "important",
  Qt = " !" + Jt,
  er = Le(
    class extends Pe {
      constructor(e) {
        if (
          (super(e),
          e.type !== Ie || "style" !== e.name || e.strings?.length > 2)
        )
          throw Error(
            "The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute."
          );
      }
      render(e) {
        return Object.keys(e).reduce((t, r) => {
          const o = e[r];
          return null == o
            ? t
            : t +
                `${(r = r.includes("-")
                  ? r
                  : r
                      .replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&")
                      .toLowerCase())}:${o};`;
        }, "");
      }
      update(e, [t]) {
        const { style: r } = e.element;
        if (void 0 === this.ut)
          return (this.ut = new Set(Object.keys(t))), this.render(t);
        for (const e of this.ut)
          null == t[e] &&
            (this.ut.delete(e),
            e.includes("-") ? r.removeProperty(e) : (r[e] = null));
        for (const e in t) {
          const o = t[e];
          if (null != o) {
            this.ut.add(e);
            const t = "string" == typeof o && o.endsWith(Qt);
            e.includes("-") || t
              ? r.setProperty(e, t ? o.slice(0, -11) : o, t ? Jt : "")
              : (r[e] = o);
          }
        }
        return Q;
      }
    }
  );
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ function tr(e, t = lr) {
  const r = ar(e, t);
  return r && ((r.tabIndex = 0), r.focus()), r;
}
function rr(e, t = lr) {
  const r = ir(e, t);
  return r && ((r.tabIndex = 0), r.focus()), r;
}
function or(e, t = lr) {
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    if (0 === o.tabIndex && t(o)) return { item: o, index: r };
  }
  return null;
}
function ar(e, t = lr) {
  for (const r of e) if (t(r)) return r;
  return null;
}
function ir(e, t = lr) {
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    if (t(o)) return o;
  }
  return null;
}
function nr(e, t, r = lr) {
  if (t) {
    const o = (function (e, t, r = lr) {
      for (let o = 1; o < e.length; o++) {
        const a = e[(o + t) % e.length];
        if (r(a)) return a;
      }
      return e[t] ? e[t] : null;
    })(e, t.index, r);
    return o && ((o.tabIndex = 0), o.focus()), o;
  }
  return tr(e, r);
}
function sr(e, t, r = lr) {
  if (t) {
    const o = (function (e, t, r = lr) {
      for (let o = 1; o < e.length; o++) {
        const a = e[(t - o + e.length) % e.length];
        if (r(a)) return a;
      }
      return e[t] ? e[t] : null;
    })(e, t.index, r);
    return o && ((o.tabIndex = 0), o.focus()), o;
  }
  return rr(e, r);
}
function lr(e) {
  return !e.disabled;
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const dr = {
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  Home: "Home",
  End: "End",
};
class cr {
  constructor(e) {
    (this.handleKeydown = (e) => {
      const t = e.key;
      if (e.defaultPrevented || !this.isNavigableKey(t)) return;
      const r = this.items;
      if (!r.length) return;
      const o = or(r, this.isActivatable);
      o && (o.item.tabIndex = -1), e.preventDefault();
      const a = this.isRtl();
      switch (t) {
        case dr.ArrowDown:
        case a ? dr.ArrowLeft : dr.ArrowRight:
          nr(r, o, this.isActivatable);
          break;
        case dr.ArrowUp:
        case a ? dr.ArrowRight : dr.ArrowLeft:
          sr(r, o, this.isActivatable);
          break;
        case dr.Home:
          tr(r, this.isActivatable);
          break;
        case dr.End:
          rr(r, this.isActivatable);
      }
    }),
      (this.onDeactivateItems = () => {
        const e = this.items;
        for (const t of e) this.deactivateItem(t);
      }),
      (this.onRequestActivation = (e) => {
        this.onDeactivateItems();
        const t = e.target;
        this.activateItem(t), t.focus();
      }),
      (this.onSlotchange = () => {
        const e = this.items;
        let t = !1;
        for (const r of e)
          !r.disabled && r.tabIndex > -1 && !t
            ? ((t = !0), (r.tabIndex = 0))
            : (r.tabIndex = -1);
        if (t) return;
        const r = ar(e, this.isActivatable);
        r && (r.tabIndex = 0);
      });
    const {
      isItem: t,
      getPossibleItems: r,
      isRtl: o,
      deactivateItem: a,
      activateItem: i,
      isNavigableKey: n,
      isActivatable: s,
    } = e;
    (this.isItem = t),
      (this.getPossibleItems = r),
      (this.isRtl = o),
      (this.deactivateItem = a),
      (this.activateItem = i),
      (this.isNavigableKey = n),
      (this.isActivatable = s);
  }
  get items() {
    const e = this.getPossibleItems(),
      t = [];
    for (const r of e) {
      if (this.isItem(r)) {
        t.push(r);
        continue;
      }
      const e = r.item;
      e && this.isItem(e) && t.push(e);
    }
    return t;
  }
  activateNextItem() {
    const e = this.items,
      t = or(e, this.isActivatable);
    return t && (t.item.tabIndex = -1), nr(e, t, this.isActivatable);
  }
  activatePreviousItem() {
    const e = this.items,
      t = or(e, this.isActivatable);
    return t && (t.item.tabIndex = -1), sr(e, t, this.isActivatable);
    /**
     * @license
     * Copyright 2023 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
  }
}
const hr = {
  END_START: "end-start",
  END_END: "end-end",
  START_START: "start-start",
  START_END: "start-end",
};
class pr {
  constructor(e, t) {
    (this.host = e),
      (this.getProperties = t),
      (this.surfaceStylesInternal = { display: "none" }),
      (this.lastValues = { isOpen: !1 }),
      this.host.addController(this);
  }
  get surfaceStyles() {
    return this.surfaceStylesInternal;
  }
  async position() {
    const {
        surfaceEl: e,
        anchorEl: t,
        anchorCorner: r,
        surfaceCorner: o,
        positioning: a,
        xOffset: i,
        yOffset: n,
        repositionStrategy: s,
      } = this.getProperties(),
      l = r.toLowerCase().trim(),
      d = o.toLowerCase().trim();
    if (!e || !t) return;
    const c = window.innerWidth,
      h = window.innerHeight,
      p = document.createElement("div");
    (p.style.opacity = "0"),
      (p.style.position = "fixed"),
      (p.style.display = "block"),
      (p.style.inset = "0"),
      document.body.appendChild(p);
    const u = p.getBoundingClientRect();
    p.remove();
    const v = window.innerHeight - u.bottom,
      m = window.innerWidth - u.right;
    (this.surfaceStylesInternal = { display: "block", opacity: "0" }),
      this.host.requestUpdate(),
      await this.host.updateComplete,
      e.popover && e.isConnected && e.showPopover();
    const f = e.getSurfacePositionClientRect
        ? e.getSurfacePositionClientRect()
        : e.getBoundingClientRect(),
      b = t.getSurfacePositionClientRect
        ? t.getSurfacePositionClientRect()
        : t.getBoundingClientRect(),
      [g, y] = d.split("-"),
      [x, _] = l.split("-"),
      w = "ltr" === getComputedStyle(e).direction;
    let {
      blockInset: k,
      blockOutOfBoundsCorrection: $,
      surfaceBlockProperty: C,
    } = this.calculateBlock({
      surfaceRect: f,
      anchorRect: b,
      anchorBlock: x,
      surfaceBlock: g,
      yOffset: n,
      positioning: a,
      windowInnerHeight: h,
      blockScrollbarHeight: v,
    });
    if ($) {
      const e = "start" === g ? "end" : "start",
        t = "start" === x ? "end" : "start",
        r = this.calculateBlock({
          surfaceRect: f,
          anchorRect: b,
          anchorBlock: t,
          surfaceBlock: e,
          yOffset: n,
          positioning: a,
          windowInnerHeight: h,
          blockScrollbarHeight: v,
        });
      $ > r.blockOutOfBoundsCorrection &&
        ((k = r.blockInset),
        ($ = r.blockOutOfBoundsCorrection),
        (C = r.surfaceBlockProperty));
    }
    let {
      inlineInset: E,
      inlineOutOfBoundsCorrection: A,
      surfaceInlineProperty: z,
    } = this.calculateInline({
      surfaceRect: f,
      anchorRect: b,
      anchorInline: _,
      surfaceInline: y,
      xOffset: i,
      positioning: a,
      isLTR: w,
      windowInnerWidth: c,
      inlineScrollbarWidth: m,
    });
    if (A) {
      const e = "start" === y ? "end" : "start",
        t = "start" === _ ? "end" : "start",
        r = this.calculateInline({
          surfaceRect: f,
          anchorRect: b,
          anchorInline: t,
          surfaceInline: e,
          xOffset: i,
          positioning: a,
          isLTR: w,
          windowInnerWidth: c,
          inlineScrollbarWidth: m,
        });
      Math.abs(A) > Math.abs(r.inlineOutOfBoundsCorrection) &&
        ((E = r.inlineInset),
        (A = r.inlineOutOfBoundsCorrection),
        (z = r.surfaceInlineProperty));
    }
    "move" === s && ((k -= $), (E -= A)),
      (this.surfaceStylesInternal = {
        display: "block",
        opacity: "1",
        [C]: `${k}px`,
        [z]: `${E}px`,
      }),
      "resize" === s &&
        ($ && (this.surfaceStylesInternal.height = f.height - $ + "px"),
        A && (this.surfaceStylesInternal.width = f.width - A + "px")),
      this.host.requestUpdate();
  }
  calculateBlock(e) {
    const {
        surfaceRect: t,
        anchorRect: r,
        anchorBlock: o,
        surfaceBlock: a,
        yOffset: i,
        positioning: n,
        windowInnerHeight: s,
        blockScrollbarHeight: l,
      } = e,
      d = "fixed" === n || "document" === n ? 1 : 0,
      c = "document" === n ? 1 : 0,
      h = "start" === a ? 1 : 0,
      p = "end" === a ? 1 : 0,
      u = (o !== a ? 1 : 0) * r.height + i,
      v = h * r.top + p * (s - r.bottom - l);
    return {
      blockInset: d * v + c * (h * window.scrollY - p * window.scrollY) + u,
      blockOutOfBoundsCorrection: Math.abs(Math.min(0, s - v - u - t.height)),
      surfaceBlockProperty:
        "start" === a ? "inset-block-start" : "inset-block-end",
    };
  }
  calculateInline(e) {
    const {
        isLTR: t,
        surfaceInline: r,
        anchorInline: o,
        anchorRect: a,
        surfaceRect: i,
        xOffset: n,
        positioning: s,
        windowInnerWidth: l,
        inlineScrollbarWidth: d,
      } = e,
      c = "fixed" === s || "document" === s ? 1 : 0,
      h = "document" === s ? 1 : 0,
      p = t ? 1 : 0,
      u = t ? 0 : 1,
      v = "start" === r ? 1 : 0,
      m = "end" === r ? 1 : 0,
      f = (o !== r ? 1 : 0) * a.width + n,
      b =
        p * (v * a.left + m * (l - a.right - d)) +
        u * (v * (l - a.right - d) + m * a.left);
    let g = "start" === r ? "inset-inline-start" : "inset-inline-end";
    return (
      ("document" !== s && "fixed" !== s) ||
        (g = ("start" === r && t) || ("end" === r && !t) ? "left" : "right"),
      {
        inlineInset:
          c * b +
          f +
          h *
            (p * (v * window.scrollX - m * window.scrollX) +
              u * (m * window.scrollX - v * window.scrollX)),
        inlineOutOfBoundsCorrection: Math.abs(Math.min(0, l - b - f - i.width)),
        surfaceInlineProperty: g,
      }
    );
  }
  hostUpdate() {
    this.onUpdate();
  }
  hostUpdated() {
    this.onUpdate();
  }
  async onUpdate() {
    const e = this.getProperties();
    let t = !1;
    for (const [r, o] of Object.entries(e))
      if (((t = t || o !== this.lastValues[r]), t)) break;
    const r = this.lastValues.isOpen !== e.isOpen,
      o = !!e.anchorEl,
      a = !!e.surfaceEl;
    t &&
      o &&
      a &&
      ((this.lastValues.isOpen = e.isOpen),
      e.isOpen
        ? ((this.lastValues = e), await this.position(), e.onOpen())
        : r && (await e.beforeClose(), this.close(), e.onClose()));
  }
  close() {
    (this.surfaceStylesInternal = { display: "none" }),
      this.host.requestUpdate();
    const e = this.getProperties().surfaceEl;
    e?.popover && e?.isConnected && e.hidePopover();
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const ur = 0,
  vr = 1,
  mr = 2;
class fr {
  constructor(e) {
    (this.getProperties = e),
      (this.typeaheadRecords = []),
      (this.typaheadBuffer = ""),
      (this.cancelTypeaheadTimeout = 0),
      (this.isTypingAhead = !1),
      (this.lastActiveRecord = null),
      (this.onKeydown = (e) => {
        this.isTypingAhead ? this.typeahead(e) : this.beginTypeahead(e);
      }),
      (this.endTypeahead = () => {
        (this.isTypingAhead = !1),
          (this.typaheadBuffer = ""),
          (this.typeaheadRecords = []);
      });
  }
  get items() {
    return this.getProperties().getItems();
  }
  get active() {
    return this.getProperties().active;
  }
  beginTypeahead(e) {
    this.active &&
      ("Space" === e.code ||
        "Enter" === e.code ||
        e.code.startsWith("Arrow") ||
        "Escape" === e.code ||
        ((this.isTypingAhead = !0),
        (this.typeaheadRecords = this.items.map((e, t) => [
          t,
          e,
          e.typeaheadText.trim().toLowerCase(),
        ])),
        (this.lastActiveRecord =
          this.typeaheadRecords.find((e) => 0 === e[vr].tabIndex) ?? null),
        this.lastActiveRecord && (this.lastActiveRecord[vr].tabIndex = -1),
        this.typeahead(e)));
  }
  typeahead(e) {
    if (e.defaultPrevented) return;
    if (
      (clearTimeout(this.cancelTypeaheadTimeout),
      "Enter" === e.code || e.code.startsWith("Arrow") || "Escape" === e.code)
    )
      return (
        this.endTypeahead(),
        void (
          this.lastActiveRecord && (this.lastActiveRecord[vr].tabIndex = -1)
        )
      );
    "Space" === e.code && e.preventDefault(),
      (this.cancelTypeaheadTimeout = setTimeout(
        this.endTypeahead,
        this.getProperties().typeaheadBufferTime
      )),
      (this.typaheadBuffer += e.key.toLowerCase());
    const t = this.lastActiveRecord ? this.lastActiveRecord[ur] : -1,
      r = this.typeaheadRecords.length,
      o = (e) => (e[ur] + r - t) % r,
      a = this.typeaheadRecords
        .filter((e) => !e[vr].disabled && e[mr].startsWith(this.typaheadBuffer))
        .sort((e, t) => o(e) - o(t));
    if (0 === a.length)
      return (
        clearTimeout(this.cancelTypeaheadTimeout),
        this.lastActiveRecord && (this.lastActiveRecord[vr].tabIndex = -1),
        void this.endTypeahead()
      );
    const i = 1 === this.typaheadBuffer.length;
    let n;
    (n = this.lastActiveRecord === a[0] && i ? a[1] ?? a[0] : a[0]),
      this.lastActiveRecord && (this.lastActiveRecord[vr].tabIndex = -1),
      (this.lastActiveRecord = n),
      (n[vr].tabIndex = 0),
      n[vr].focus();
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const br = new Set([dr.ArrowDown, dr.ArrowUp, dr.Home, dr.End]),
  gr = new Set([dr.ArrowLeft, dr.ArrowRight, ...br]);
class yr extends me {
  get openDirection() {
    return "start" === this.menuCorner.split("-")[0] ? "DOWN" : "UP";
  }
  get anchorElement() {
    return this.anchor
      ? this.getRootNode().querySelector(`#${this.anchor}`)
      : this.currentAnchorElement;
  }
  set anchorElement(e) {
    (this.currentAnchorElement = e), this.requestUpdate("anchorElement");
  }
  constructor() {
    super(),
      (this.anchor = ""),
      (this.positioning = "absolute"),
      (this.quick = !1),
      (this.hasOverflow = !1),
      (this.open = !1),
      (this.xOffset = 0),
      (this.yOffset = 0),
      (this.typeaheadDelay = 200),
      (this.anchorCorner = hr.END_START),
      (this.menuCorner = hr.START_START),
      (this.stayOpenOnOutsideClick = !1),
      (this.stayOpenOnFocusout = !1),
      (this.skipRestoreFocus = !1),
      (this.defaultFocus = Wt.FIRST_ITEM),
      (this.typeaheadActive = !0),
      (this.isSubmenu = !1),
      (this.pointerPath = []),
      (this.isRepositioning = !1),
      (this.openCloseAnimationSignal = (function () {
        let e = null;
        return {
          start: () => (e?.abort(), (e = new AbortController()), e.signal),
          finish() {
            e = null;
          },
        };
      })()),
      /**
       * @license
       * Copyright 2022 Google LLC
       * SPDX-License-Identifier: Apache-2.0
       */
      (this.listController = new cr({
        isItem: (e) => e.hasAttribute("md-menu-item"),
        getPossibleItems: () => this.slotItems,
        isRtl: () => "rtl" === getComputedStyle(this).direction,
        deactivateItem: (e) => {
          (e.selected = !1), (e.tabIndex = -1);
        },
        activateItem: (e) => {
          (e.selected = !0), (e.tabIndex = 0);
        },
        isNavigableKey: (e) =>
          this.isSubmenu
            ? e ===
                ("rtl" === getComputedStyle(this).direction
                  ? dr.ArrowLeft
                  : dr.ArrowRight) || br.has(e)
            : gr.has(e),
      })),
      (this.lastFocusedElement = null),
      (this.typeaheadController = new fr(() => ({
        getItems: () => this.items,
        typeaheadBufferTime: this.typeaheadDelay,
        active: this.typeaheadActive,
      }))),
      (this.currentAnchorElement = null),
      (this.internals = this.attachInternals()),
      (this.menuPositionController = new pr(this, () => ({
        anchorCorner: this.anchorCorner,
        surfaceCorner: this.menuCorner,
        surfaceEl: this.surfaceEl,
        anchorEl: this.anchorElement,
        positioning:
          "popover" === this.positioning ? "document" : this.positioning,
        isOpen: this.open,
        xOffset: this.xOffset,
        yOffset: this.yOffset,
        onOpen: this.onOpened,
        beforeClose: this.beforeClose,
        onClose: this.onClosed,
        repositionStrategy:
          this.hasOverflow && "popover" !== this.positioning
            ? "move"
            : "resize",
      }))),
      (this.onWindowResize = () => {
        this.isRepositioning ||
          ("document" !== this.positioning &&
            "fixed" !== this.positioning &&
            "popover" !== this.positioning) ||
          ((this.isRepositioning = !0),
          this.reposition(),
          (this.isRepositioning = !1));
      }),
      (this.handleFocusout = async (e) => {
        const t = this.anchorElement;
        if (
          this.stayOpenOnFocusout ||
          !this.open ||
          this.pointerPath.includes(t)
        )
          return;
        if (e.relatedTarget) {
          if (
            jt(e.relatedTarget, this) ||
            (0 !== this.pointerPath.length && jt(e.relatedTarget, t))
          )
            return;
        } else if (this.pointerPath.includes(this)) return;
        const r = this.skipRestoreFocus;
        (this.skipRestoreFocus = !0),
          this.close(),
          await this.updateComplete,
          (this.skipRestoreFocus = r);
      }),
      (this.onOpened = async () => {
        this.lastFocusedElement = (function (e = document) {
          let t = e.activeElement;
          for (; t && t?.shadowRoot?.activeElement; )
            t = t.shadowRoot.activeElement;
          return t;
        })();
        const e = this.items,
          t = or(e);
        t && this.defaultFocus !== Wt.NONE && (t.item.tabIndex = -1);
        let r = !this.quick;
        switch (
          (this.quick
            ? this.dispatchEvent(new Event("opening"))
            : (r = !!(await this.animateOpen())),
          this.defaultFocus)
        ) {
          case Wt.FIRST_ITEM:
            const t = ar(e);
            t && ((t.tabIndex = 0), t.focus(), await t.updateComplete);
            break;
          case Wt.LAST_ITEM:
            const r = ir(e);
            r && ((r.tabIndex = 0), r.focus(), await r.updateComplete);
            break;
          case Wt.LIST_ROOT:
            this.focus();
        }
        r || this.dispatchEvent(new Event("opened"));
      }),
      (this.beforeClose = async () => {
        (this.open = !1),
          this.skipRestoreFocus || this.lastFocusedElement?.focus?.(),
          this.quick || (await this.animateClose());
      }),
      (this.onClosed = () => {
        this.quick &&
          (this.dispatchEvent(new Event("closing")),
          this.dispatchEvent(new Event("closed")));
      }),
      (this.onWindowPointerdown = (e) => {
        this.pointerPath = e.composedPath();
      }),
      (this.onDocumentClick = (e) => {
        if (!this.open) return;
        const t = e.composedPath();
        this.stayOpenOnOutsideClick ||
          t.includes(this) ||
          t.includes(this.anchorElement) ||
          (this.open = !1);
      }),
      (this.internals.role = "menu"),
      this.addEventListener("keydown", this.handleKeydown),
      this.addEventListener("keydown", this.captureKeydown, { capture: !0 }),
      this.addEventListener("focusout", this.handleFocusout);
  }
  get items() {
    return this.listController.items;
  }
  willUpdate(e) {
    e.has("open") &&
      (this.open
        ? this.removeAttribute("aria-hidden")
        : this.setAttribute("aria-hidden", "true"));
  }
  update(e) {
    e.has("open") &&
      (this.open
        ? this.setUpGlobalEventListeners()
        : this.cleanUpGlobalEventListeners()),
      e.has("positioning") &&
        "popover" === this.positioning &&
        !this.showPopover &&
        (this.positioning = "fixed"),
      super.update(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.open && this.setUpGlobalEventListeners();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.cleanUpGlobalEventListeners();
  }
  render() {
    return this.renderSurface();
  }
  renderSurface() {
    return J`
      <div
        class="menu ${Me(this.getSurfaceClasses())}"
        style=${er(this.menuPositionController.surfaceStyles)}
        popover=${"popover" === this.positioning ? "manual" : ee}>
        ${this.renderElevation()}
        <div class="items">
          <div class="item-padding"> ${this.renderMenuItems()} </div>
        </div>
      </div>
    `;
  }
  renderMenuItems() {
    return J`<slot
      @close-menu=${this.onCloseMenu}
      @deactivate-items=${this.onDeactivateItems}
      @request-activation=${this.onRequestActivation}
      @deactivate-typeahead=${this.handleDeactivateTypeahead}
      @activate-typeahead=${this.handleActivateTypeahead}
      @stay-open-on-focusout=${this.handleStayOpenOnFocusout}
      @close-on-focusout=${this.handleCloseOnFocusout}
      @slotchange=${this.listController.onSlotchange}></slot>`;
  }
  renderElevation() {
    return J`<md-elevation part="elevation"></md-elevation>`;
  }
  getSurfaceClasses() {
    return {
      open: this.open,
      fixed: "fixed" === this.positioning,
      "has-overflow": this.hasOverflow,
    };
  }
  captureKeydown(e) {
    e.target === this &&
      !e.defaultPrevented &&
      qt(e.code) &&
      (e.preventDefault(), this.close()),
      this.typeaheadController.onKeydown(e);
  }
  async animateOpen() {
    const e = this.surfaceEl,
      t = this.slotEl;
    if (!e || !t) return !0;
    const r = this.openDirection;
    this.dispatchEvent(new Event("opening")),
      e.classList.toggle("animating", !0);
    const o = this.openCloseAnimationSignal.start(),
      a = e.offsetHeight,
      i = "UP" === r,
      n = this.items,
      s = 250 / n.length,
      l = e.animate([{ height: "0px" }, { height: `${a}px` }], {
        duration: 500,
        easing: Ne,
      }),
      d = t.animate(
        [{ transform: i ? `translateY(-${a}px)` : "" }, { transform: "" }],
        { duration: 500, easing: Ne }
      ),
      c = e.animate([{ opacity: 0 }, { opacity: 1 }], 50),
      h = [];
    for (let e = 0; e < n.length; e++) {
      const t = n[i ? n.length - 1 - e : e],
        r = t.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 250,
          delay: s * e,
        });
      t.classList.toggle("md-menu-hidden", !0),
        r.addEventListener("finish", () => {
          t.classList.toggle("md-menu-hidden", !1);
        }),
        h.push([t, r]);
    }
    let p = (e) => {};
    const u = new Promise((e) => {
      p = e;
    });
    return (
      o.addEventListener("abort", () => {
        l.cancel(),
          d.cancel(),
          c.cancel(),
          h.forEach(([e, t]) => {
            e.classList.toggle("md-menu-hidden", !1), t.cancel();
          }),
          p(!0);
      }),
      l.addEventListener("finish", () => {
        e.classList.toggle("animating", !1),
          this.openCloseAnimationSignal.finish(),
          p(!1);
      }),
      await u
    );
  }
  animateClose() {
    let e, t;
    const r = new Promise((r, o) => {
        (e = r), (t = o);
      }),
      o = this.surfaceEl,
      a = this.slotEl;
    if (!o || !a) return t(), r;
    const i = "UP" === this.openDirection;
    this.dispatchEvent(new Event("closing")),
      o.classList.toggle("animating", !0);
    const n = this.openCloseAnimationSignal.start(),
      s = o.offsetHeight,
      l = this.items,
      d = 50 / l.length,
      c = o.animate([{ height: `${s}px` }, { height: 0.35 * s + "px" }], {
        duration: 150,
        easing: Ue,
      }),
      h = a.animate(
        [
          { transform: "" },
          { transform: i ? `translateY(-${0.65 * s}px)` : "" },
        ],
        { duration: 150, easing: Ue }
      ),
      p = o.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 50,
        delay: 100,
      }),
      u = [];
    for (let e = 0; e < l.length; e++) {
      const t = l[i ? e : l.length - 1 - e],
        r = t.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 50,
          delay: 50 + d * e,
        });
      r.addEventListener("finish", () => {
        t.classList.toggle("md-menu-hidden", !0);
      }),
        u.push([t, r]);
    }
    return (
      n.addEventListener("abort", () => {
        c.cancel(),
          h.cancel(),
          p.cancel(),
          u.forEach(([e, t]) => {
            t.cancel(), e.classList.toggle("md-menu-hidden", !1);
          }),
          t();
      }),
      c.addEventListener("finish", () => {
        o.classList.toggle("animating", !1),
          u.forEach(([e]) => {
            e.classList.toggle("md-menu-hidden", !1);
          }),
          this.openCloseAnimationSignal.finish(),
          this.dispatchEvent(new Event("closed")),
          e(!0);
      }),
      r
    );
  }
  handleKeydown(e) {
    (this.pointerPath = []), this.listController.handleKeydown(e);
  }
  setUpGlobalEventListeners() {
    document.addEventListener("click", this.onDocumentClick, { capture: !0 }),
      window.addEventListener("pointerdown", this.onWindowPointerdown),
      document.addEventListener("resize", this.onWindowResize, { passive: !0 }),
      window.addEventListener("resize", this.onWindowResize, { passive: !0 });
  }
  cleanUpGlobalEventListeners() {
    document.removeEventListener("click", this.onDocumentClick, {
      capture: !0,
    }),
      window.removeEventListener("pointerdown", this.onWindowPointerdown),
      document.removeEventListener("resize", this.onWindowResize),
      window.removeEventListener("resize", this.onWindowResize);
  }
  onCloseMenu() {
    this.close();
  }
  onDeactivateItems(e) {
    e.stopPropagation(), this.listController.onDeactivateItems();
  }
  onRequestActivation(e) {
    e.stopPropagation(), this.listController.onRequestActivation(e);
  }
  handleDeactivateTypeahead(e) {
    e.stopPropagation(), (this.typeaheadActive = !1);
  }
  handleActivateTypeahead(e) {
    e.stopPropagation(), (this.typeaheadActive = !0);
  }
  handleStayOpenOnFocusout(e) {
    e.stopPropagation(), (this.stayOpenOnFocusout = !0);
  }
  handleCloseOnFocusout(e) {
    e.stopPropagation(), (this.stayOpenOnFocusout = !1);
  }
  close() {
    (this.open = !1),
      this.slotItems.forEach((e) => {
        e.close?.();
      });
  }
  show() {
    this.open = !0;
  }
  activateNextItem() {
    return this.listController.activateNextItem() ?? null;
  }
  activatePreviousItem() {
    return this.listController.activatePreviousItem() ?? null;
  }
  reposition() {
    this.open && this.menuPositionController.position();
  }
}
e([S(".menu")], yr.prototype, "surfaceEl", void 0),
  e([S("slot")], yr.prototype, "slotEl", void 0),
  e([E()], yr.prototype, "anchor", void 0),
  e([E()], yr.prototype, "positioning", void 0),
  e([E({ type: Boolean })], yr.prototype, "quick", void 0),
  e(
    [E({ type: Boolean, attribute: "has-overflow" })],
    yr.prototype,
    "hasOverflow",
    void 0
  ),
  e([E({ type: Boolean, reflect: !0 })], yr.prototype, "open", void 0),
  e(
    [E({ type: Number, attribute: "x-offset" })],
    yr.prototype,
    "xOffset",
    void 0
  ),
  e(
    [E({ type: Number, attribute: "y-offset" })],
    yr.prototype,
    "yOffset",
    void 0
  ),
  e(
    [E({ type: Number, attribute: "typeahead-delay" })],
    yr.prototype,
    "typeaheadDelay",
    void 0
  ),
  e([E({ attribute: "anchor-corner" })], yr.prototype, "anchorCorner", void 0),
  e([E({ attribute: "menu-corner" })], yr.prototype, "menuCorner", void 0),
  e(
    [E({ type: Boolean, attribute: "stay-open-on-outside-click" })],
    yr.prototype,
    "stayOpenOnOutsideClick",
    void 0
  ),
  e(
    [E({ type: Boolean, attribute: "stay-open-on-focusout" })],
    yr.prototype,
    "stayOpenOnFocusout",
    void 0
  ),
  e(
    [E({ type: Boolean, attribute: "skip-restore-focus" })],
    yr.prototype,
    "skipRestoreFocus",
    void 0
  ),
  e([E({ attribute: "default-focus" })], yr.prototype, "defaultFocus", void 0),
  e([R({ flatten: !0 })], yr.prototype, "slotItems", void 0),
  e([A()], yr.prototype, "typeaheadActive", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const xr = s`:host{--md-elevation-level: var(--md-menu-container-elevation, 2);--md-elevation-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));min-width:112px;color:unset;display:contents}md-focus-ring{--md-focus-ring-shape: var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px))}.menu{border-radius:var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px));display:none;inset:auto;border:none;padding:0px;overflow:visible;background-color:rgba(0,0,0,0);color:inherit;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit;max-width:inherit}.menu::backdrop{display:none}.fixed{position:fixed}.items{display:block;list-style-type:none;margin:0;outline:none;box-sizing:border-box;background-color:var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));height:inherit;max-height:inherit;overflow:auto;min-width:inherit;max-width:inherit;border-radius:inherit}.item-padding{padding-block:8px}.has-overflow:not([popover]) .items{overflow:visible}.has-overflow.animating .items,.animating .items{overflow:hidden}.has-overflow.animating .items{pointer-events:none}.animating ::slotted(.md-menu-hidden){opacity:0}slot{display:block;height:inherit;max-height:inherit}::slotted(:is(md-divider,[role=separator])){margin:8px 0}@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}/*# sourceMappingURL=menu-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let _r = class extends yr {};
(_r.styles = [xr]), (_r = e([t("md-menu")], _r));
var wr = Object.freeze({
  __proto__: null,
  Corner: hr,
  FocusState: Wt,
  get MdMenu() {
    return _r;
  },
});
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class kr extends me {
  constructor() {
    super(...arguments),
      (this.inset = !1),
      (this.insetStart = !1),
      (this.insetEnd = !1);
  }
}
e([E({ type: Boolean, reflect: !0 })], kr.prototype, "inset", void 0),
  e(
    [E({ type: Boolean, reflect: !0, attribute: "inset-start" })],
    kr.prototype,
    "insetStart",
    void 0
  ),
  e(
    [E({ type: Boolean, reflect: !0, attribute: "inset-end" })],
    kr.prototype,
    "insetEnd",
    void 0
  );
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const $r = s`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}/*# sourceMappingURL=divider-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Cr = class extends kr {};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ function Er(e, t) {
  !t.bubbles || (e.shadowRoot && !t.composed) || t.stopPropagation();
  const r = Reflect.construct(t.constructor, [t.type, t]),
    o = e.dispatchEvent(r);
  return o || t.preventDefault(), o;
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ (Cr.styles = [$r]), (Cr = e([t("md-divider")], Cr));
const Ar = {
    dialog: [
      [
        [{ transform: "translateY(-50px)" }, { transform: "translateY(0)" }],
        { duration: 500, easing: Ne },
      ],
    ],
    scrim: [
      [
        [{ opacity: 0 }, { opacity: 0.32 }],
        { duration: 500, easing: "linear" },
      ],
    ],
    container: [
      [
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 50, easing: "linear", pseudoElement: "::before" },
      ],
      [
        [{ height: "35%" }, { height: "100%" }],
        { duration: 500, easing: Ne, pseudoElement: "::before" },
      ],
    ],
    headline: [
      [
        [{ opacity: 0 }, { opacity: 0, offset: 0.2 }, { opacity: 1 }],
        { duration: 250, easing: "linear", fill: "forwards" },
      ],
    ],
    content: [
      [
        [{ opacity: 0 }, { opacity: 0, offset: 0.2 }, { opacity: 1 }],
        { duration: 250, easing: "linear", fill: "forwards" },
      ],
    ],
    actions: [
      [
        [{ opacity: 0 }, { opacity: 0, offset: 0.5 }, { opacity: 1 }],
        { duration: 300, easing: "linear", fill: "forwards" },
      ],
    ],
  },
  zr = {
    dialog: [
      [
        [{ transform: "translateY(0)" }, { transform: "translateY(-50px)" }],
        { duration: 150, easing: Ue },
      ],
    ],
    scrim: [
      [
        [{ opacity: 0.32 }, { opacity: 0 }],
        { duration: 150, easing: "linear" },
      ],
    ],
    container: [
      [
        [{ height: "100%" }, { height: "35%" }],
        { duration: 150, easing: Ue, pseudoElement: "::before" },
      ],
      [
        [{ opacity: "1" }, { opacity: "0" }],
        {
          delay: 100,
          duration: 50,
          easing: "linear",
          pseudoElement: "::before",
        },
      ],
    ],
    headline: [
      [
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 100, easing: "linear", fill: "forwards" },
      ],
    ],
    content: [
      [
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 100, easing: "linear", fill: "forwards" },
      ],
    ],
    actions: [
      [
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 100, easing: "linear", fill: "forwards" },
      ],
    ],
  };
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class Sr extends me {
  get open() {
    return this.isOpen;
  }
  set open(e) {
    e !== this.isOpen &&
      ((this.isOpen = e),
      e
        ? (this.setAttribute("open", ""), this.show())
        : (this.removeAttribute("open"), this.close()));
  }
  constructor() {
    super(),
      (this.returnValue = ""),
      (this.getOpenAnimation = () => Ar),
      (this.getCloseAnimation = () => zr),
      (this.isOpen = !1),
      (this.isOpening = !1),
      (this.isConnectedPromise = this.getIsConnectedPromise()),
      (this.isAtScrollTop = !1),
      (this.isAtScrollBottom = !1),
      (this.nextClickIsFromContent = !1),
      (this.hasHeadline = !1),
      (this.hasActions = !1),
      (this.hasIcon = !1),
      (this.escapePressedWithoutCancel = !1),
      this.addEventListener("submit", this.handleSubmit),
      this.addEventListener("focus", () => {
        this.dialog?.focus();
      }),
      this.addEventListener("blur", () => {
        this.dialog?.blur();
      });
  }
  async show() {
    (this.isOpening = !0),
      await this.isConnectedPromise,
      await this.updateComplete;
    const e = this.dialog;
    !e.open && this.isOpening
      ? this.dispatchEvent(new Event("open", { cancelable: !0 }))
        ? (e.showModal(),
          (this.open = !0),
          this.scroller && (this.scroller.scrollTop = 0),
          this.querySelector("[autofocus]")?.focus(),
          await this.animateDialog(this.getOpenAnimation()),
          this.dispatchEvent(new Event("opened")),
          (this.isOpening = !1))
        : (this.open = !1)
      : (this.isOpening = !1);
  }
  async close(e = this.returnValue) {
    if (((this.isOpening = !1), !this.isConnected))
      return void (this.open = !1);
    await this.updateComplete;
    const t = this.dialog;
    if (!t.open || this.isOpening) return void (this.open = !1);
    const r = this.returnValue;
    (this.returnValue = e),
      this.dispatchEvent(new Event("close", { cancelable: !0 }))
        ? (await this.animateDialog(this.getCloseAnimation()),
          t.close(e),
          (this.open = !1),
          this.dispatchEvent(new Event("closed")))
        : (this.returnValue = r);
  }
  connectedCallback() {
    super.connectedCallback(), this.isConnectedPromiseResolve();
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      (this.isConnectedPromise = this.getIsConnectedPromise());
  }
  render() {
    const e = this.open && !(this.isAtScrollTop && this.isAtScrollBottom),
      t = {
        "has-headline": this.hasHeadline,
        "has-actions": this.hasActions,
        "has-icon": this.hasIcon,
        scrollable: e,
        "show-top-divider": e && !this.isAtScrollTop,
        "show-bottom-divider": e && !this.isAtScrollBottom,
      },
      { ariaLabel: r } = this;
    return J`
      <div class="scrim"></div>
      <dialog
        class=${Me(t)}
        aria-label=${r || ee}
        aria-labelledby=${this.hasHeadline ? "headline" : ee}
        role=${"alert" === this.type ? "alertdialog" : ee}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue || ee}>
        <div class="container" @click=${this.handleContentClick}>
          <div class="headline">
            <div class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this.handleIconChange}></slot>
            </div>
            <h2 id="headline" aria-hidden=${!this.hasHeadline || ee}>
              <slot
                name="headline"
                @slotchange=${this.handleHeadlineChange}></slot>
            </h2>
            <md-divider></md-divider>
          </div>
          <div class="scroller">
            <div class="content">
              <div class="top anchor"></div>
              <slot name="content"></slot>
              <div class="bottom anchor"></div>
            </div>
          </div>
          <div class="actions">
            <md-divider></md-divider>
            <slot name="actions" @slotchange=${this.handleActionsChange}></slot>
          </div>
        </div>
      </dialog>
    `;
  }
  firstUpdated() {
    (this.intersectionObserver = new IntersectionObserver(
      (e) => {
        for (const t of e) this.handleAnchorIntersection(t);
      },
      { root: this.scroller }
    )),
      this.intersectionObserver.observe(this.topAnchor),
      this.intersectionObserver.observe(this.bottomAnchor);
  }
  handleDialogClick() {
    this.nextClickIsFromContent
      ? (this.nextClickIsFromContent = !1)
      : !this.dispatchEvent(new Event("cancel", { cancelable: !0 })) ||
        this.close();
  }
  handleContentClick() {
    this.nextClickIsFromContent = !0;
  }
  handleSubmit(e) {
    const t = e.target,
      { submitter: r } = e;
    "dialog" === t.method &&
      r &&
      this.close(r.getAttribute("value") ?? this.returnValue);
  }
  handleCancel(e) {
    if (e.target !== this.dialog) return;
    this.escapePressedWithoutCancel = !1;
    const t = !Er(this, e);
    e.preventDefault(), t || this.close();
  }
  handleClose() {
    this.escapePressedWithoutCancel &&
      ((this.escapePressedWithoutCancel = !1),
      this.dialog?.dispatchEvent(new Event("cancel", { cancelable: !0 })));
  }
  handleKeydown(e) {
    "Escape" === e.key &&
      ((this.escapePressedWithoutCancel = !0),
      setTimeout(() => {
        this.escapePressedWithoutCancel = !1;
      }));
  }
  async animateDialog(e) {
    const {
      dialog: t,
      scrim: r,
      container: o,
      headline: a,
      content: i,
      actions: n,
    } = this;
    if (!(t && r && o && a && i && n)) return;
    const {
        container: s,
        dialog: l,
        scrim: d,
        headline: c,
        content: h,
        actions: p,
      } = e,
      u = [
        [t, l ?? []],
        [r, d ?? []],
        [o, s ?? []],
        [a, c ?? []],
        [i, h ?? []],
        [n, p ?? []],
      ],
      v = [];
    for (const [e, t] of u) for (const r of t) v.push(e.animate(...r));
    await Promise.all(v.map((e) => e.finished));
  }
  handleHeadlineChange(e) {
    const t = e.target;
    this.hasHeadline = t.assignedElements().length > 0;
  }
  handleActionsChange(e) {
    const t = e.target;
    this.hasActions = t.assignedElements().length > 0;
  }
  handleIconChange(e) {
    const t = e.target;
    this.hasIcon = t.assignedElements().length > 0;
  }
  handleAnchorIntersection(e) {
    const { target: t, isIntersecting: r } = e;
    t === this.topAnchor && (this.isAtScrollTop = r),
      t === this.bottomAnchor && (this.isAtScrollBottom = r);
  }
  getIsConnectedPromise() {
    return new Promise((e) => {
      this.isConnectedPromiseResolve = e;
    });
  }
}
Ke(Sr),
  e([E({ type: Boolean })], Sr.prototype, "open", null),
  e([E({ attribute: !1 })], Sr.prototype, "returnValue", void 0),
  e([E()], Sr.prototype, "type", void 0),
  e([S("dialog")], Sr.prototype, "dialog", void 0),
  e([S(".scrim")], Sr.prototype, "scrim", void 0),
  e([S(".container")], Sr.prototype, "container", void 0),
  e([S(".headline")], Sr.prototype, "headline", void 0),
  e([S(".content")], Sr.prototype, "content", void 0),
  e([S(".actions")], Sr.prototype, "actions", void 0),
  e([A()], Sr.prototype, "isAtScrollTop", void 0),
  e([A()], Sr.prototype, "isAtScrollBottom", void 0),
  e([S(".scroller")], Sr.prototype, "scroller", void 0),
  e([S(".top.anchor")], Sr.prototype, "topAnchor", void 0),
  e([S(".bottom.anchor")], Sr.prototype, "bottomAnchor", void 0),
  e([A()], Sr.prototype, "hasHeadline", void 0),
  e([A()], Sr.prototype, "hasActions", void 0),
  e([A()], Sr.prototype, "hasIcon", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Tr = s`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}/*# sourceMappingURL=dialog-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Ir = class extends Sr {};
(Ir.styles = [Tr]), (Ir = e([t("md-dialog")], Ir));
var Rr = Object.freeze({
  __proto__: null,
  get MdDialog() {
    return Ir;
  },
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class Or extends me {
  constructor() {
    super(...arguments), (this.multiselect = !1);
  }
  getButtonDisabled(e) {
    return !this.indexOutOfBounds(e) && this.buttons[e].disabled;
  }
  setButtonDisabled(e, t) {
    this.indexOutOfBounds(e) || (this.buttons[e].disabled = t);
  }
  getButtonSelected(e) {
    return !this.indexOutOfBounds(e) && this.buttons[e].selected;
  }
  setButtonSelected(e, t) {
    if (!this.indexOutOfBounds(e) && !this.getButtonDisabled(e)) {
      if (this.multiselect)
        return (this.buttons[e].selected = t), void this.emitSelectionEvent(e);
      if (t) {
        (this.buttons[e].selected = !0), this.emitSelectionEvent(e);
        for (let t = 0; t < this.buttons.length; t++)
          t !== e && (this.buttons[t].selected = !1);
      }
    }
  }
  handleSegmentedButtonInteraction(e) {
    const t = this.buttons.indexOf(e.target);
    this.toggleSelection(t);
  }
  toggleSelection(e) {
    this.indexOutOfBounds(e) ||
      this.setButtonSelected(e, !this.buttons[e].selected);
  }
  indexOutOfBounds(e) {
    return e < 0 || e >= this.buttons.length;
  }
  emitSelectionEvent(e) {
    this.dispatchEvent(
      new CustomEvent("segmented-button-set-selection", {
        detail: {
          button: this.buttons[e],
          selected: this.buttons[e].selected,
          index: e,
        },
        bubbles: !0,
        composed: !0,
      })
    );
  }
  render() {
    const { ariaLabel: e } = this;
    return J`
      <span
        role="group"
        @segmented-button-interaction="${this.handleSegmentedButtonInteraction}"
        aria-label=${e || ee}
        class="md3-segmented-button-set">
        <slot></slot>
      </span>
    `;
  }
  getRenderClasses() {
    return {};
  }
}
Ke(Or),
  e([E({ type: Boolean })], Or.prototype, "multiselect", void 0),
  e([R({ flatten: !0 })], Or.prototype, "buttons", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Lr extends Or {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-segmented-button-set--outlined": !0,
    };
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const Pr = s`:host{--_container-height: var(--md-outlined-segmented-button-container-height, 40px);--_disabled-icon-color: var(--md-outlined-segmented-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-color: var(--md-outlined-segmented-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-color: var(--md-outlined-segmented-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-outlined-segmented-button-hover-state-layer-opacity, 0.08);--_label-text-font: var(--md-outlined-segmented-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-segmented-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-segmented-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-segmented-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-segmented-button-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-opacity: var(--md-outlined-segmented-button-pressed-state-layer-opacity, 0.12);--_selected-container-color: var(--md-outlined-segmented-button-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-focus-icon-color: var(--md-outlined-segmented-button-selected-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-focus-label-text-color: var(--md-outlined-segmented-button-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-icon-color: var(--md-outlined-segmented-button-selected-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-outlined-segmented-button-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-outlined-segmented-button-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-label-text-color: var(--md-outlined-segmented-button-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-icon-color: var(--md-outlined-segmented-button-selected-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-outlined-segmented-button-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-outlined-segmented-button-selected-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_unselected-focus-icon-color: var(--md-outlined-segmented-button-unselected-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-focus-label-text-color: var(--md-outlined-segmented-button-unselected-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-icon-color: var(--md-outlined-segmented-button-unselected-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-label-text-color: var(--md-outlined-segmented-button-unselected-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-state-layer-color: var(--md-outlined-segmented-button-unselected-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-label-text-color: var(--md-outlined-segmented-button-unselected-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-pressed-icon-color: var(--md-outlined-segmented-button-unselected-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-pressed-label-text-color: var(--md-outlined-segmented-button-unselected-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-pressed-state-layer-color: var(--md-outlined-segmented-button-unselected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-size: var(--md-outlined-segmented-button-icon-size, 18px);--_selected-icon-color: var(--md-outlined-segmented-button-selected-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_unselected-icon-color: var(--md-outlined-segmented-button-unselected-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_shape-start-start: var(--md-outlined-segmented-button-shape-start-start, var(--md-outlined-segmented-button-shape, var(--md-sys-shape-corner-full, 9999px)));--_shape-start-end: var(--md-outlined-segmented-button-shape-start-end, var(--md-outlined-segmented-button-shape, var(--md-sys-shape-corner-full, 9999px)));--_shape-end-end: var(--md-outlined-segmented-button-shape-end-end, var(--md-outlined-segmented-button-shape, var(--md-sys-shape-corner-full, 9999px)));--_shape-end-start: var(--md-outlined-segmented-button-shape-end-start, var(--md-outlined-segmented-button-shape, var(--md-sys-shape-corner-full, 9999px)))}/*# sourceMappingURL=outlined-styles.css.map */
`,
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */ Mr = s`:host{display:flex;outline:none}.md3-segmented-button-set{display:grid;grid-auto-columns:1fr;grid-auto-flow:column;grid-auto-rows:auto;width:100%;height:var(--_container-height)}.md3-segmented-button-set ::slotted(:first-child){border-start-start-radius:var(--_shape-start-start);border-end-start-radius:var(--_shape-end-start)}.md3-segmented-button-set ::slotted(:last-child){border-start-end-radius:var(--_shape-start-end);border-end-end-radius:var(--_shape-end-end)}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Br = class extends Lr {};
(Br.styles = [Mr, Pr]), (Br = e([t("md-outlined-segmented-button-set")], Br));
var Nr = Object.freeze({
  __proto__: null,
  get MdOutlinedSegmentedButtonSet() {
    return Br;
  },
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class Ur extends me {
  constructor() {
    super(...arguments),
      (this.disabled = !1),
      (this.selected = !1),
      (this.label = ""),
      (this.noCheckmark = !1),
      (this.hasIcon = !1),
      (this.animState = "");
  }
  update(e) {
    (this.animState = this.nextAnimationState(e)),
      super.update(e),
      (this.hasIcon = this.iconElement.length > 0);
  }
  nextAnimationState(e) {
    const t = e.get("selected");
    if (void 0 === t) return "";
    const r = this.selected,
      o = !this.noCheckmark;
    return !t && r && o ? "selecting" : t && !r && o ? "deselecting" : "";
  }
  handleClick() {
    const e = new Event("segmented-button-interaction", {
      bubbles: !0,
      composed: !0,
    });
    this.dispatchEvent(e);
  }
  render() {
    const { ariaLabel: e } = this;
    return J`
      <button
        tabindex="${this.disabled ? "-1" : "0"}"
        aria-label=${e || ee}
        aria-pressed=${this.selected}
        ?disabled=${this.disabled}
        @click="${this.handleClick}"
        class="md3-segmented-button ${Me(this.getRenderClasses())}">
        <md-focus-ring
          class="md3-segmented-button__focus-ring"
          part="focus-ring"></md-focus-ring>
        <md-ripple
          ?disabled="${this.disabled}"
          class="md3-segmented-button__ripple"></md-ripple>
        ${this.renderOutline()} ${this.renderLeading()} ${this.renderLabel()}
        ${this.renderTouchTarget()}
      </button>
    `;
  }
  getRenderClasses() {
    return {
      "md3-segmented-button--selected": this.selected,
      "md3-segmented-button--unselected": !this.selected,
      "md3-segmented-button--with-label": "" !== this.label,
      "md3-segmented-button--without-label": "" === this.label,
      "md3-segmented-button--with-icon": this.hasIcon,
      "md3-segmented-button--with-checkmark": !this.noCheckmark,
      "md3-segmented-button--without-checkmark": this.noCheckmark,
      "md3-segmented-button--selecting": "selecting" === this.animState,
      "md3-segmented-button--deselecting": "deselecting" === this.animState,
    };
  }
  renderOutline() {
    return ee;
  }
  renderLeading() {
    return "" === this.label
      ? this.renderLeadingWithoutLabel()
      : this.renderLeadingWithLabel();
  }
  renderLeadingWithoutLabel() {
    return J`
      <span class="md3-segmented-button__leading" aria-hidden="true">
        <span class="md3-segmented-button__graphic">
          <svg class="md3-segmented-button__checkmark" viewBox="0 0 24 24">
            <path
              class="md3-segmented-button__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
          </svg>
        </span>
        <span class="md3-segmented-button__icon" aria-hidden="true">
          <slot name="icon"></slot>
        </span>
      </span>
    `;
  }
  renderLeadingWithLabel() {
    return J`
      <span class="md3-segmented-button__leading" aria-hidden="true">
        <span class="md3-segmented-button__graphic">
          <svg class="md3-segmented-button__checkmark" viewBox="0 0 24 24">
            <path
              class="md3-segmented-button__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
          </svg>
          <span class="md3-segmented-button__icon" aria-hidden="true">
            <slot name="icon"></slot>
          </span>
        </span>
      </span>
    `;
  }
  renderLabel() {
    return J`
      <span class="md3-segmented-button__label-text">${this.label}</span>
    `;
  }
  renderTouchTarget() {
    return J`<span class="md3-segmented-button__touch"></span>`;
  }
}
Ke(Ur),
  e([E({ type: Boolean })], Ur.prototype, "disabled", void 0),
  e([E({ type: Boolean })], Ur.prototype, "selected", void 0),
  e([E()], Ur.prototype, "label", void 0),
  e(
    [E({ type: Boolean, attribute: "no-checkmark" })],
    Ur.prototype,
    "noCheckmark",
    void 0
  ),
  e(
    [E({ type: Boolean, attribute: "has-icon" })],
    Ur.prototype,
    "hasIcon",
    void 0
  ),
  e([A()], Ur.prototype, "animState", void 0),
  e([R({ slot: "icon", flatten: !0 })], Ur.prototype, "iconElement", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Dr extends Ur {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-segmented-button--outlined": !0,
    };
  }
  renderOutline() {
    return J`<span class="md3-segmented-button__outline"></span>`;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const Fr = s`:host{--_container-height: var(--md-outlined-segmented-button-container-height, 40px);--_disabled-icon-color: var(--md-outlined-segmented-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-color: var(--md-outlined-segmented-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-color: var(--md-outlined-segmented-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-outlined-segmented-button-hover-state-layer-opacity, 0.08);--_label-text-font: var(--md-outlined-segmented-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-segmented-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-segmented-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-segmented-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-segmented-button-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-opacity: var(--md-outlined-segmented-button-pressed-state-layer-opacity, 0.12);--_selected-container-color: var(--md-outlined-segmented-button-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-focus-icon-color: var(--md-outlined-segmented-button-selected-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-focus-label-text-color: var(--md-outlined-segmented-button-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-icon-color: var(--md-outlined-segmented-button-selected-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-outlined-segmented-button-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-outlined-segmented-button-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-label-text-color: var(--md-outlined-segmented-button-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-icon-color: var(--md-outlined-segmented-button-selected-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-outlined-segmented-button-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-outlined-segmented-button-selected-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_shape: var(--md-outlined-segmented-button-shape, var(--md-sys-shape-corner-full, 9999px));--_unselected-focus-icon-color: var(--md-outlined-segmented-button-unselected-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-focus-label-text-color: var(--md-outlined-segmented-button-unselected-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-icon-color: var(--md-outlined-segmented-button-unselected-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-label-text-color: var(--md-outlined-segmented-button-unselected-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-state-layer-color: var(--md-outlined-segmented-button-unselected-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-label-text-color: var(--md-outlined-segmented-button-unselected-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-pressed-icon-color: var(--md-outlined-segmented-button-unselected-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-pressed-label-text-color: var(--md-outlined-segmented-button-unselected-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-pressed-state-layer-color: var(--md-outlined-segmented-button-unselected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-size: var(--md-outlined-segmented-button-icon-size, 18px);--_selected-icon-color: var(--md-outlined-segmented-button-selected-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_unselected-icon-color: var(--md-outlined-segmented-button-unselected-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_shape-start-start: var(--md-outlined-segmented-button-shape-start-start, var(--md-sys-shape-corner-full, 9999px));--_shape-start-end: var(--md-outlined-segmented-button-shape-start-end, var(--md-sys-shape-corner-full, 9999px));--_shape-end-end: var(--md-outlined-segmented-button-shape-end-end, var(--md-sys-shape-corner-full, 9999px));--_shape-end-start: var(--md-outlined-segmented-button-shape-end-start, var(--md-sys-shape-corner-full, 9999px));--_spacing-leading: var(--md-outlined-segmented-button-spacing-leading, 12px);--_spacing-trailing: var(--md-outlined-segmented-button-spacing-trailing, 12px)}.md3-segmented-button__outline{border-radius:inherit;border-style:solid;border-width:1px;inset:0px -0.5px;pointer-events:none;position:absolute}/*# sourceMappingURL=outlined-styles.css.map */
`,
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */ Hr = s`@keyframes md3-segmented-button-checkmark-selection-draw-in{from{stroke-dashoffset:29.7833385}to{stroke-dashoffset:0}}@keyframes md3-segmented-button-simple-fade-out{from{opacity:1}to{opacity:0}}@keyframes md3-segmented-button-simple-fade-in{from{opacity:0}to{opacity:1}}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.md3-segmented-button{align-items:center;background:rgba(0,0,0,0);border:none;border-radius:inherit;display:flex;flex:1;justify-content:center;outline:none;position:relative;vertical-align:middle;padding-inline-start:var(--_spacing-leading);padding-inline-end:var(--_spacing-trailing)}.md3-segmented-button .md3-segmented-button__outline{border-color:var(--_outline-color)}.md3-segmented-button:disabled .md3-segmented-button__outline{border-color:var(--_disabled-outline-color)}.md3-segmented-button .md3-segmented-button__graphic,.md3-segmented-button .md3-segmented-button__checkmark,.md3-segmented-button .md3-segmented-button__icon,.md3-segmented-button .md3-segmented-button__icon ::slotted([slot=icon]){height:var(--_icon-size);width:var(--_icon-size);font-size:var(--_icon-size)}.md3-segmented-button.md3-segmented-button--with-icon.md3-segmented-button--with-label .md3-segmented-button__graphic,.md3-segmented-button.md3-segmented-button--selected.md3-segmented-button--with-label.md3-segmented-button--with-checkmark .md3-segmented-button__graphic,.md3-segmented-button.md3-segmented-button--selected.md3-segmented-button--without-label.md3-segmented-button--with-checkmark .md3-segmented-button__graphic{width:calc(var(--_icon-size) + 8px)}.md3-segmented-button .md3-segmented-button__label-text{font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight)}.md3-segmented-button.md3-segmented-button--selected:enabled .md3-segmented-button__label-text{color:var(--_selected-label-text-color)}.md3-segmented-button.md3-segmented-button--selected:enabled:hover .md3-segmented-button__label-text{color:var(--_selected-hover-label-text-color)}.md3-segmented-button.md3-segmented-button--selected:enabled:focus .md3-segmented-button__label-text{color:var(--_selected-focus-label-text-color)}.md3-segmented-button.md3-segmented-button--selected:enabled:active .md3-segmented-button__label-text{color:var(--_selected-pressed-label-text-color)}.md3-segmented-button.md3-segmented-button--unselected:enabled .md3-segmented-button__label-text{color:var(--_unselected-label-text-color)}.md3-segmented-button.md3-segmented-button--unselected:enabled:hover .md3-segmented-button__label-text{color:var(--_unselected-hover-label-text-color)}.md3-segmented-button.md3-segmented-button--unselected:enabled:focus .md3-segmented-button__label-text{color:var(--_unselected-focus-label-text-color)}.md3-segmented-button.md3-segmented-button--unselected:enabled:active .md3-segmented-button__label-text{color:var(--_unselected-pressed-label-text-color)}.md3-segmented-button:disabled .md3-segmented-button__label-text{color:var(--_disabled-label-text-color)}.md3-segmented-button--unselected{--md-ripple-hover-color: var(--_unselected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_unselected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.md3-segmented-button--unselected .md3-segmented-button__icon{color:var(--_unselected-icon-color)}.md3-segmented-button--unselected:hover .md3-segmented-button__icon{color:var(--_unselected-hover-icon-color)}.md3-segmented-button--unselected:focus .md3-segmented-button__icon{color:var(--_unselected-focus-icon-color)}.md3-segmented-button--unselected:active .md3-segmented-button__icon{color:var(--_unselected-pressed-icon-color)}.md3-segmented-button--unselected:disabled .md3-segmented-button__icon{color:var(--_disabled-icon-color)}.md3-segmented-button--selected{background-color:var(--_selected-container-color);--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.md3-segmented-button--selected .md3-segmented-button__icon{color:var(--_selected-icon-color)}.md3-segmented-button--selected .md3-segmented-button__checkmark-path{stroke:var(--_selected-icon-color)}.md3-segmented-button--selected:hover .md3-segmented-button__checkmark-path{stroke:var(--_selected-hover-icon-color)}.md3-segmented-button--selected:focus .md3-segmented-button__checkmark-path{stroke:var(--_selected-focus-icon-color)}.md3-segmented-button--selected:active .md3-segmented-button__checkmark-path{stroke:var(--_selected-pressed-icon-color)}.md3-segmented-button--selected:disabled .md3-segmented-button__checkmark-path{stroke:var(--_disabled-icon-color)}.md3-segmented-button:enabled{cursor:pointer}.md3-segmented-button__focus-ring{z-index:1}.md3-segmented-button__ripple{border-radius:inherit;z-index:0}.md3-segmented-button__touch{position:absolute;top:50%;height:48px;left:50%;width:100%;transform:translate(-50%, -50%)}.md3-segmented-button__leading,.md3-segmented-button__graphic{display:inline-flex;justify-content:flex-start;align-items:center}.md3-segmented-button__graphic{position:relative;overflow:hidden}.md3-segmented-button__graphic{transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.md3-segmented-button--unselected.md3-segmented-button--with-label .md3-segmented-button__graphic,.md3-segmented-button--unselected.md3-segmented-button--without-label .md3-segmented-button__graphic,.md3-segmented-button--selected.md3-segmented-button--without-checkmark .md3-segmented-button__graphic{width:0}.md3-segmented-button--unselected .md3-segmented-button__checkmark{opacity:0}.md3-segmented-button--selected.md3-segmented-button--with-label .md3-segmented-button__icon{opacity:0}.md3-segmented-button--with-label .md3-segmented-button__checkmark{display:inline-flex;position:absolute}.md3-segmented-button__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385}.md3-segmented-button--selecting .md3-segmented-button__checkmark-path{stroke-dashoffset:29.7833385;animation:md3-segmented-button-checkmark-selection-draw-in;animation-duration:150ms;animation-delay:50ms;animation-fill-mode:forwards;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.md3-segmented-button--selecting.md3-segmented-button--with-label .md3-segmented-button__icon{animation:md3-segmented-button-simple-fade-out;animation-duration:75ms;animation-timing-function:linear;animation-fill-mode:forwards}.md3-segmented-button--deselecting .md3-segmented-button__checkmark{animation:md3-segmented-button-simple-fade-out;animation-duration:50ms;animation-timing-function:linear;animation-fill-mode:forwards}.md3-segmented-button--deselecting.md3-segmented-button--with-label .md3-segmented-button__icon{opacity:0;animation:md3-segmented-button-simple-fade-in;animation-delay:50ms;animation-duration:150ms;animation-timing-function:linear;animation-fill-mode:forwards}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Vr = class extends Dr {};
(Vr.styles = [Hr, Fr]), (Vr = e([t("md-outlined-segmented-button")], Vr));
var qr = Object.freeze({
  __proto__: null,
  get MdOutlinedSegmentedButton() {
    return Vr;
  },
});
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class jr extends me {
  render() {
    return J`
      <md-elevation part="elevation"></md-elevation>
      <div class="background"></div>
      <slot></slot>
      <div class="outline"></div>
    `;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const Wr = s`:host{--_container-color: var(--md-filled-card-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_container-elevation: var(--md-filled-card-container-elevation, 0);--_container-shadow-color: var(--md-filled-card-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-shape: var(--md-filled-card-container-shape, var(--md-sys-shape-corner-medium, 12px))}/*# sourceMappingURL=filled-styles.css.map */
`,
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */ Gr = s`:host{border-radius:var(--_container-shape);box-sizing:border-box;display:flex;flex-direction:column;position:relative;z-index:0}md-elevation,.background,.outline{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color);z-index:-1}.outline{border:1px solid rgba(0,0,0,0);z-index:1}md-elevation{z-index:-1;--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}slot{border-radius:inherit}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Kr = class extends jr {};
(Kr.styles = [Gr, Wr]), (Kr = e([t("md-filled-card")], Kr));
var Yr = Object.freeze({
  __proto__: null,
  get MdFilledCard() {
    return Kr;
  },
});
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const Xr = Symbol("createValidator"),
  Zr = Symbol("getValidityAnchor"),
  Jr = Symbol("privateValidator"),
  Qr = Symbol("privateSyncValidity"),
  eo = Symbol("privateCustomValidationMessage");
function to(e) {
  var t;
  class r extends e {
    constructor() {
      super(...arguments), (this[t] = "");
    }
    get validity() {
      return this[Qr](), this[tt].validity;
    }
    get validationMessage() {
      return this[Qr](), this[tt].validationMessage;
    }
    get willValidate() {
      return this[Qr](), this[tt].willValidate;
    }
    checkValidity() {
      return this[Qr](), this[tt].checkValidity();
    }
    reportValidity() {
      return this[Qr](), this[tt].reportValidity();
    }
    setCustomValidity(e) {
      (this[eo] = e), this[Qr]();
    }
    requestUpdate(e, t, r) {
      super.requestUpdate(e, t, r), this[Qr]();
    }
    firstUpdated(e) {
      super.firstUpdated(e), this[Qr]();
    }
    [((t = eo), Qr)]() {
      this[Jr] || (this[Jr] = this[Xr]());
      const { validity: e, validationMessage: t } = this[Jr].getValidity(),
        r = !!this[eo],
        o = this[eo] || t;
      this[tt].setValidity({ ...e, customError: r }, o, this[Zr]() ?? void 0);
    }
    [Xr]() {
      throw new Error("Implement [createValidator]");
    }
    [Zr]() {
      throw new Error("Implement [getValidityAnchor]");
    }
  }
  return r;
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const ro = Symbol("getFormValue"),
  oo = Symbol("getFormState");
function ao(t) {
  class r extends t {
    get form() {
      return this[tt].form;
    }
    get labels() {
      return this[tt].labels;
    }
    get name() {
      return this.getAttribute("name") ?? "";
    }
    set name(e) {
      this.setAttribute("name", e);
    }
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(e) {
      this.toggleAttribute("disabled", e);
    }
    attributeChangedCallback(e, t, r) {
      if ("name" !== e && "disabled" !== e)
        super.attributeChangedCallback(e, t, r);
      else {
        const r = "disabled" === e ? null !== t : t;
        this.requestUpdate(e, r);
      }
    }
    requestUpdate(e, t, r) {
      super.requestUpdate(e, t, r),
        this[tt].setFormValue(this[ro](), this[oo]());
    }
    [ro]() {
      throw new Error("Implement [getFormValue]");
    }
    [oo]() {
      return this[ro]();
    }
    formDisabledCallback(e) {
      this.disabled = e;
    }
  }
  return (
    (r.formAssociated = !0),
    e([E({ noAccessor: !0 })], r.prototype, "name", null),
    e([E({ type: Boolean, noAccessor: !0 })], r.prototype, "disabled", null),
    r
  );
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class io {
  constructor(e) {
    (this.getCurrentState = e),
      (this.currentValidity = { validity: {}, validationMessage: "" });
  }
  getValidity() {
    const e = this.getCurrentState();
    if (this.prevState && this.equals(this.prevState, e))
      return this.currentValidity;
    const { validity: t, validationMessage: r } = this.computeValidity(e);
    return (
      (this.prevState = this.copy(e)),
      (this.currentValidity = {
        validationMessage: r,
        validity: {
          badInput: t.badInput,
          customError: t.customError,
          patternMismatch: t.patternMismatch,
          rangeOverflow: t.rangeOverflow,
          rangeUnderflow: t.rangeUnderflow,
          stepMismatch: t.stepMismatch,
          tooLong: t.tooLong,
          tooShort: t.tooShort,
          typeMismatch: t.typeMismatch,
          valueMissing: t.valueMissing,
        },
      }),
      this.currentValidity
    );
    /**
     * @license
     * Copyright 2023 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
  }
}
class no extends io {
  computeValidity(e) {
    return (
      this.checkboxControl ||
        ((this.checkboxControl = document.createElement("input")),
        (this.checkboxControl.type = "checkbox")),
      (this.checkboxControl.checked = e.checked),
      (this.checkboxControl.required = e.required),
      {
        validity: this.checkboxControl.validity,
        validationMessage: this.checkboxControl.validationMessage,
      }
    );
  }
  equals(e, t) {
    return e.checked === t.checked && e.required === t.required;
  }
  copy({ checked: e, required: t }) {
    return { checked: e, required: t };
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const so = to(ao(ot(me)));
class lo extends so {
  constructor() {
    super(),
      (this.selected = !1),
      (this.icons = !1),
      (this.showOnlySelectedIcon = !1),
      (this.required = !1),
      (this.value = "on"),
      this.addEventListener("click", (e) => {
        nt(e) && this.input && (this.focus(), it(this.input));
      });
  }
  render() {
    return J`
      <div class="switch ${Me(this.getRenderClasses())}">
        <input
          id="switch"
          class="touch"
          type="checkbox"
          role="switch"
          aria-label=${this.ariaLabel || ee}
          ?checked=${this.selected}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @change=${this.handleChange} />

        <md-focus-ring part="focus-ring" for="switch"></md-focus-ring>
        <span class="track"> ${this.renderHandle()} </span>
      </div>
    `;
  }
  getRenderClasses() {
    return {
      selected: this.selected,
      unselected: !this.selected,
      disabled: this.disabled,
    };
  }
  renderHandle() {
    const e = {
      "with-icon": this.showOnlySelectedIcon ? this.selected : this.icons,
    };
    return J`
      ${this.renderTouchTarget()}
      <span class="handle-container">
        <md-ripple for="switch" ?disabled="${this.disabled}"></md-ripple>
        <span class="handle ${Me(e)}">
          ${this.shouldShowIcons() ? this.renderIcons() : J``}
        </span>
      </span>
    `;
  }
  renderIcons() {
    return J`
      <div class="icons">
        ${this.renderOnIcon()}
        ${this.showOnlySelectedIcon ? J`` : this.renderOffIcon()}
      </div>
    `;
  }
  renderOnIcon() {
    return J`
      <slot class="icon icon--on" name="on-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
        </svg>
      </slot>
    `;
  }
  renderOffIcon() {
    return J`
      <slot class="icon icon--off" name="off-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
        </svg>
      </slot>
    `;
  }
  renderTouchTarget() {
    return J`<span class="touch"></span>`;
  }
  shouldShowIcons() {
    return this.icons || this.showOnlySelectedIcon;
  }
  handleChange(e) {
    const t = e.target;
    (this.selected = t.checked), Er(this, e);
  }
  [ro]() {
    return this.selected ? this.value : null;
  }
  [oo]() {
    return String(this.selected);
  }
  formResetCallback() {
    this.selected = this.hasAttribute("selected");
  }
  formStateRestoreCallback(e) {
    this.selected = "true" === e;
  }
  [Xr]() {
    return new no(() => ({ checked: this.selected, required: this.required }));
  }
  [Zr]() {
    return this.input;
  }
}
Ke(lo),
  (lo.shadowRootOptions = { mode: "open", delegatesFocus: !0 }),
  e([E({ type: Boolean })], lo.prototype, "selected", void 0),
  e([E({ type: Boolean })], lo.prototype, "icons", void 0),
  e(
    [E({ type: Boolean, attribute: "show-only-selected-icon" })],
    lo.prototype,
    "showOnlySelectedIcon",
    void 0
  ),
  e([E({ type: Boolean })], lo.prototype, "required", void 0),
  e([E()], lo.prototype, "value", void 0),
  e([S("input")], lo.prototype, "input", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const co = s`@layer styles, hcm;@layer styles{:host{display:inline-flex;outline:none;vertical-align:top;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-switch-track-height, 32px))/2) 0px}md-focus-ring{--md-focus-ring-shape-start-start: var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-start-end: var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-end: var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-start: var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}.switch{align-items:center;display:inline-flex;flex-shrink:0;position:relative;width:var(--md-switch-track-width, 52px);height:var(--md-switch-track-height, 32px);border-start-start-radius:var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}input{appearance:none;height:48px;outline:none;margin:0;position:absolute;width:100%;z-index:1;cursor:inherit}:host([touch-target=none]) input{display:none}}@layer styles{.track{position:absolute;width:100%;height:100%;box-sizing:border-box;border-radius:inherit;display:flex;justify-content:center;align-items:center}.track::before{content:"";display:flex;position:absolute;height:100%;width:100%;border-radius:inherit;box-sizing:border-box;transition-property:opacity,background-color;transition-timing-function:linear;transition-duration:67ms}.disabled .track{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.disabled .track::before,.disabled .track::after{transition:none;opacity:var(--md-switch-disabled-track-opacity, 0.12)}.disabled .track::before{background-clip:content-box}.selected .track::before{background:var(--md-switch-selected-track-color, var(--md-sys-color-primary, #6750a4))}.selected:hover .track::before{background:var(--md-switch-selected-hover-track-color, var(--md-sys-color-primary, #6750a4))}.selected:focus-within .track::before{background:var(--md-switch-selected-focus-track-color, var(--md-sys-color-primary, #6750a4))}.selected:active .track::before{background:var(--md-switch-selected-pressed-track-color, var(--md-sys-color-primary, #6750a4))}.selected.disabled .track{background-clip:border-box}.selected.disabled .track::before{background:var(--md-switch-disabled-selected-track-color, var(--md-sys-color-on-surface, #1d1b20))}.unselected .track::before{background:var(--md-switch-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-track-outline-color, var(--md-sys-color-outline, #79747e));border-style:solid;border-width:var(--md-switch-track-outline-width, 2px)}.unselected:hover .track::before{background:var(--md-switch-hover-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-hover-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:focus-visible .track::before{background:var(--md-switch-focus-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-focus-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:active .track::before{background:var(--md-switch-pressed-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-pressed-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected.disabled .track::before{background:var(--md-switch-disabled-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-disabled-track-outline-color, var(--md-sys-color-on-surface, #1d1b20))}}@layer hcm{@media(forced-colors: active){.selected .track::before{background:ButtonText;border-color:ButtonText}.disabled .track::before{border-color:GrayText;opacity:1}.disabled.selected .track::before{background:GrayText}}}@layer styles{.handle-container{display:flex;place-content:center;place-items:center;position:relative;transition:margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)}.selected .handle-container{margin-inline-start:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.unselected .handle-container{margin-inline-end:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.disabled .handle-container{transition:none}.handle{border-start-start-radius:var(--md-switch-handle-shape-start-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-handle-shape-start-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-handle-shape-end-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-handle-shape-end-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));height:var(--md-switch-handle-height, 16px);width:var(--md-switch-handle-width, 16px);transform-origin:center;transition-property:height,width;transition-duration:250ms,250ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1),cubic-bezier(0.2, 0, 0, 1);z-index:0}.handle::before{content:"";display:flex;inset:0;position:absolute;border-radius:inherit;box-sizing:border-box;transition:background-color 67ms linear}.disabled .handle,.disabled .handle::before{transition:none}.selected .handle{height:var(--md-switch-selected-handle-height, 24px);width:var(--md-switch-selected-handle-width, 24px)}.handle.with-icon{height:var(--md-switch-with-icon-handle-height, 24px);width:var(--md-switch-with-icon-handle-width, 24px)}.selected:not(.disabled):active .handle,.unselected:not(.disabled):active .handle{height:var(--md-switch-pressed-handle-height, 28px);width:var(--md-switch-pressed-handle-width, 28px);transition-timing-function:linear;transition-duration:100ms}.selected .handle::before{background-color:var(--md-switch-selected-handle-color, var(--md-sys-color-on-primary, #fff))}.selected:hover .handle::before{background-color:var(--md-switch-selected-hover-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:focus-within .handle::before{background-color:var(--md-switch-selected-focus-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:active .handle::before{background-color:var(--md-switch-selected-pressed-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected.disabled .handle::before{background-color:var(--md-switch-disabled-selected-handle-color, var(--md-sys-color-surface, #fef7ff));opacity:var(--md-switch-disabled-selected-handle-opacity, 1)}.unselected .handle::before{background-color:var(--md-switch-handle-color, var(--md-sys-color-outline, #79747e))}.unselected:hover .handle::before{background-color:var(--md-switch-hover-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:focus-within .handle::before{background-color:var(--md-switch-focus-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:active .handle::before{background-color:var(--md-switch-pressed-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected.disabled .handle::before{background-color:var(--md-switch-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-handle-opacity, 0.38)}md-ripple{border-radius:var(--md-switch-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-switch-state-layer-size, 40px);inset:unset;width:var(--md-switch-state-layer-size, 40px)}.selected md-ripple{--md-ripple-hover-color: var(--md-switch-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-color: var(--md-switch-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-switch-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-selected-pressed-state-layer-opacity, 0.12)}.unselected md-ripple{--md-ripple-hover-color: var(--md-switch-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-color: var(--md-switch-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-switch-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-pressed-state-layer-opacity, 0.12)}}@layer hcm{@media(forced-colors: active){.unselected .handle::before{background:ButtonText}.disabled .handle::before{opacity:1}.disabled.unselected .handle::before{background:GrayText}}}@layer styles{.icons{position:relative;height:100%;width:100%}.icon{position:absolute;inset:0;margin:auto;display:flex;align-items:center;justify-content:center;fill:currentColor;transition:fill 67ms linear,opacity 33ms linear,transform 167ms cubic-bezier(0.2, 0, 0, 1);opacity:0}.disabled .icon{transition:none}.selected .icon--on,.unselected .icon--off{opacity:1}.unselected .handle:not(.with-icon) .icon--on{transform:rotate(-45deg)}.icon--off{width:var(--md-switch-icon-size, 16px);height:var(--md-switch-icon-size, 16px);color:var(--md-switch-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:hover .icon--off{color:var(--md-switch-hover-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:focus-within .icon--off{color:var(--md-switch-focus-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:active .icon--off{color:var(--md-switch-pressed-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected.disabled .icon--off{color:var(--md-switch-disabled-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));opacity:var(--md-switch-disabled-icon-opacity, 0.38)}.icon--on{width:var(--md-switch-selected-icon-size, 16px);height:var(--md-switch-selected-icon-size, 16px);color:var(--md-switch-selected-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:hover .icon--on{color:var(--md-switch-selected-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:focus-within .icon--on{color:var(--md-switch-selected-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:active .icon--on{color:var(--md-switch-selected-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected.disabled .icon--on{color:var(--md-switch-disabled-selected-icon-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-selected-icon-opacity, 0.38)}}@layer hcm{@media(forced-colors: active){.icon--off{fill:Canvas}.icon--on{fill:ButtonText}.disabled.unselected .icon--off,.disabled.selected .icon--on{opacity:1}.disabled .icon--on{fill:GrayText}}}/*# sourceMappingURL=switch-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let ho = class extends lo {};
(ho.styles = [co]), (ho = e([t("md-switch")], ho));
var po = Object.freeze({
  __proto__: null,
  get MdSwitch() {
    return ho;
  },
});
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const uo = s`:host{--_container-color: var(--md-filled-tonal-icon-button-container-color, var(--md-sys-color-secondary-container, #e8def8));--_container-height: var(--md-filled-tonal-icon-button-container-height, 40px);--_container-width: var(--md-filled-tonal-icon-button-container-width, 40px);--_disabled-container-color: var(--md-filled-tonal-icon-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-tonal-icon-button-disabled-container-opacity, 0.12);--_disabled-icon-color: var(--md-filled-tonal-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-tonal-icon-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-tonal-icon-button-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-icon-color: var(--md-filled-tonal-icon-button-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-color: var(--md-filled-tonal-icon-button-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-opacity: var(--md-filled-tonal-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-filled-tonal-icon-button-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_icon-size: var(--md-filled-tonal-icon-button-icon-size, 24px);--_pressed-icon-color: var(--md-filled-tonal-icon-button-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-color: var(--md-filled-tonal-icon-button-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filled-tonal-icon-button-pressed-state-layer-opacity, 0.12);--_selected-container-color: var(--md-filled-tonal-icon-button-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_toggle-selected-focus-icon-color: var(--md-filled-tonal-icon-button-toggle-selected-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-hover-icon-color: var(--md-filled-tonal-icon-button-toggle-selected-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-hover-state-layer-color: var(--md-filled-tonal-icon-button-toggle-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-icon-color: var(--md-filled-tonal-icon-button-toggle-selected-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-pressed-icon-color: var(--md-filled-tonal-icon-button-toggle-selected-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-pressed-state-layer-color: var(--md-filled-tonal-icon-button-toggle-selected-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_unselected-container-color: var(--md-filled-tonal-icon-button-unselected-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_toggle-focus-icon-color: var(--md-filled-tonal-icon-button-toggle-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-hover-icon-color: var(--md-filled-tonal-icon-button-toggle-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-hover-state-layer-color: var(--md-filled-tonal-icon-button-toggle-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-icon-color: var(--md-filled-tonal-icon-button-toggle-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-pressed-icon-color: var(--md-filled-tonal-icon-button-toggle-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-pressed-state-layer-color: var(--md-filled-tonal-icon-button-toggle-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-filled-tonal-icon-button-container-shape-start-start, var(--md-filled-tonal-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-tonal-icon-button-container-shape-start-end, var(--md-filled-tonal-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-tonal-icon-button-container-shape-end-end, var(--md-filled-tonal-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-tonal-icon-button-container-shape-end-start, var(--md-filled-tonal-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)))}.icon-button{color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.icon-button:hover{color:var(--_hover-icon-color)}.icon-button:focus{color:var(--_focus-icon-color)}.icon-button:active{color:var(--_pressed-icon-color)}.icon-button:disabled{color:var(--_disabled-icon-color)}.icon-button::before{background-color:var(--_container-color);border-radius:inherit;content:"";inset:0;position:absolute;z-index:-1}.icon-button:disabled::before{background-color:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.icon-button:disabled .icon{opacity:var(--_disabled-icon-opacity)}.toggle-filled-tonal{--md-ripple-hover-color: var(--_toggle-hover-state-layer-color);--md-ripple-pressed-color: var(--_toggle-pressed-state-layer-color)}.toggle-filled-tonal:not(:disabled){color:var(--_toggle-icon-color)}.toggle-filled-tonal:not(:disabled):hover{color:var(--_toggle-hover-icon-color)}.toggle-filled-tonal:not(:disabled):focus{color:var(--_toggle-focus-icon-color)}.toggle-filled-tonal:not(:disabled):active{color:var(--_toggle-pressed-icon-color)}.toggle-filled-tonal:not(:disabled)::before{background-color:var(--_unselected-container-color)}.selected{--md-ripple-hover-color: var(--_toggle-selected-hover-state-layer-color);--md-ripple-pressed-color: var(--_toggle-selected-pressed-state-layer-color)}.selected:not(:disabled){color:var(--_toggle-selected-icon-color)}.selected:not(:disabled):hover{color:var(--_toggle-selected-hover-icon-color)}.selected:not(:disabled):focus{color:var(--_toggle-selected-focus-icon-color)}.selected:not(:disabled):active{color:var(--_toggle-selected-pressed-icon-color)}.selected:not(:disabled)::before{background-color:var(--_selected-container-color)}/*# sourceMappingURL=filled-tonal-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let vo = class extends Rt {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "filled-tonal": !0,
      "toggle-filled-tonal": this.toggle,
    };
  }
};
(vo.styles = [Ot, uo]), (vo = e([t("md-filled-tonal-icon-button")], vo));
var mo = Object.freeze({
  __proto__: null,
  get MdFilledTonalIconButton() {
    return vo;
  },
});
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const fo = s`@media(forced-colors: active){:host{--md-slider-active-track-color: CanvasText;--md-slider-disabled-active-track-color: GrayText;--md-slider-disabled-active-track-opacity: 1;--md-slider-disabled-handle-color: GrayText;--md-slider-disabled-inactive-track-color: GrayText;--md-slider-disabled-inactive-track-opacity: 1;--md-slider-focus-handle-color: CanvasText;--md-slider-handle-color: CanvasText;--md-slider-handle-shadow-color: Canvas;--md-slider-hover-handle-color: CanvasText;--md-slider-hover-state-layer-color: Canvas;--md-slider-hover-state-layer-opacity: 1;--md-slider-inactive-track-color: Canvas;--md-slider-label-container-color: Canvas;--md-slider-label-text-color: CanvasText;--md-slider-pressed-handle-color: CanvasText;--md-slider-pressed-state-layer-color: Canvas;--md-slider-pressed-state-layer-opacity: 1;--md-slider-with-overlap-handle-outline-color: CanvasText}.label,.label::before{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}:host(:not([disabled])) .track::before{border:1px solid var(--_active-track-color)}.tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='CanvasText'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}.tickmarks::after{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/svg%3E")}:host([disabled]) .tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}}/*# sourceMappingURL=forced-colors-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function bo(e, t, r) {
  return e ? t(e) : r?.(e);
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const go = ao(ot(me));
class yo extends go {
  get nameStart() {
    return this.getAttribute("name-start") ?? this.name;
  }
  set nameStart(e) {
    this.setAttribute("name-start", e);
  }
  get nameEnd() {
    return this.getAttribute("name-end") ?? this.nameStart;
  }
  set nameEnd(e) {
    this.setAttribute("name-end", e);
  }
  get renderAriaLabelStart() {
    const { ariaLabel: e } = this;
    return (
      this.ariaLabelStart ||
      (e && `${e} start`) ||
      this.valueLabelStart ||
      String(this.valueStart)
    );
  }
  get renderAriaValueTextStart() {
    return (
      this.ariaValueTextStart || this.valueLabelStart || String(this.valueStart)
    );
  }
  get renderAriaLabelEnd() {
    const { ariaLabel: e } = this;
    return this.range
      ? this.ariaLabelEnd ||
          (e && `${e} end`) ||
          this.valueLabelEnd ||
          String(this.valueEnd)
      : e || this.valueLabel || String(this.value);
  }
  get renderAriaValueTextEnd() {
    if (this.range)
      return (
        this.ariaValueTextEnd || this.valueLabelEnd || String(this.valueEnd)
      );
    const { ariaValueText: e } = this;
    return e || this.valueLabel || String(this.value);
  }
  constructor() {
    super(),
      (this.min = 0),
      (this.max = 100),
      (this.valueLabel = ""),
      (this.valueLabelStart = ""),
      (this.valueLabelEnd = ""),
      (this.ariaLabelStart = ""),
      (this.ariaValueTextStart = ""),
      (this.ariaLabelEnd = ""),
      (this.ariaValueTextEnd = ""),
      (this.step = 1),
      (this.ticks = !1),
      (this.labeled = !1),
      (this.range = !1),
      (this.handleStartHover = !1),
      (this.handleEndHover = !1),
      (this.startOnTop = !1),
      (this.handlesOverlapping = !1),
      (this.ripplePointerId = 1),
      (this.isRedispatchingEvent = !1),
      this.addEventListener("click", (e) => {
        nt(e) && this.inputEnd && (this.focus(), it(this.inputEnd));
      });
  }
  focus() {
    this.inputEnd?.focus();
  }
  willUpdate(e) {
    this.renderValueStart = e.has("valueStart")
      ? this.valueStart
      : this.inputStart?.valueAsNumber;
    const t = (e.has("valueEnd") && this.range) || e.has("value");
    (this.renderValueEnd = t
      ? this.range
        ? this.valueEnd
        : this.value
      : this.inputEnd?.valueAsNumber),
      void 0 !== e.get("handleStartHover")
        ? this.toggleRippleHover(this.rippleStart, this.handleStartHover)
        : void 0 !== e.get("handleEndHover") &&
          this.toggleRippleHover(this.rippleEnd, this.handleEndHover);
  }
  updated(e) {
    if (
      (this.range && (this.renderValueStart = this.inputStart.valueAsNumber),
      (this.renderValueEnd = this.inputEnd.valueAsNumber),
      this.range)
    ) {
      const e = (this.max - this.min) / 3;
      if (void 0 === this.valueStart) {
        this.inputStart.valueAsNumber = this.min + e;
        const t = this.inputStart.valueAsNumber;
        this.valueStart = this.renderValueStart = t;
      }
      if (void 0 === this.valueEnd) {
        this.inputEnd.valueAsNumber = this.min + 2 * e;
        const t = this.inputEnd.valueAsNumber;
        this.valueEnd = this.renderValueEnd = t;
      }
    } else this.value ?? (this.value = this.renderValueEnd);
    if (
      e.has("range") ||
      e.has("renderValueStart") ||
      e.has("renderValueEnd") ||
      this.isUpdatePending
    ) {
      const e = this.handleStart?.querySelector(".handleNub"),
        t = this.handleEnd?.querySelector(".handleNub");
      this.handlesOverlapping = (function (e, t) {
        if (!e || !t) return !1;
        const r = e.getBoundingClientRect(),
          o = t.getBoundingClientRect();
        return !(
          r.top > o.bottom ||
          r.right < o.left ||
          r.bottom < o.top ||
          r.left > o.right
        );
      })(
        /**
         * @license
         * Copyright 2022 Google LLC
         * SPDX-License-Identifier: Apache-2.0
         */ e,
        t
      );
    }
    this.performUpdate();
  }
  render() {
    const e = 0 === this.step ? 1 : this.step,
      t = Math.max(this.max - this.min, e),
      r = this.range ? ((this.renderValueStart ?? this.min) - this.min) / t : 0,
      o = ((this.renderValueEnd ?? this.min) - this.min) / t,
      a = {
        "--_start-fraction": String(r),
        "--_end-fraction": String(o),
        "--_tick-count": String(t / e),
      },
      i = { ranged: this.range },
      n = this.valueLabelStart || String(this.renderValueStart),
      s =
        (this.range ? this.valueLabelEnd : this.valueLabel) ||
        String(this.renderValueEnd),
      l = {
        start: !0,
        value: this.renderValueStart,
        ariaLabel: this.renderAriaLabelStart,
        ariaValueText: this.renderAriaValueTextStart,
        ariaMin: this.min,
        ariaMax: this.valueEnd ?? this.max,
      },
      d = {
        start: !1,
        value: this.renderValueEnd,
        ariaLabel: this.renderAriaLabelEnd,
        ariaValueText: this.renderAriaValueTextEnd,
        ariaMin: this.range ? this.valueStart ?? this.min : this.min,
        ariaMax: this.max,
      },
      c = { start: !0, hover: this.handleStartHover, label: n },
      h = { start: !1, hover: this.handleEndHover, label: s },
      p = { hover: this.handleStartHover || this.handleEndHover };
    return J` <div
      class="container ${Me(i)}"
      style=${er(a)}>
      ${bo(this.range, () => this.renderInput(l))}
      ${this.renderInput(d)} ${this.renderTrack()}
      <div class="handleContainerPadded">
        <div class="handleContainerBlock">
          <div class="handleContainer ${Me(p)}">
            ${bo(this.range, () => this.renderHandle(c))}
            ${this.renderHandle(h)}
          </div>
        </div>
      </div>
    </div>`;
  }
  renderTrack() {
    return J`
      <div class="track"></div>
      ${this.ticks ? J`<div class="tickmarks"></div>` : ee}
    `;
  }
  renderLabel(e) {
    return J`<div class="label" aria-hidden="true">
      <span class="labelContent" part="label">${e}</span>
    </div>`;
  }
  renderHandle({ start: e, hover: t, label: r }) {
    const o = !this.disabled && e === this.startOnTop,
      a = !this.disabled && this.handlesOverlapping,
      i = e ? "start" : "end";
    return J`<div
      class="handle ${Me({ [i]: !0, hover: t, onTop: o, isOverlapping: a })}">
      <md-focus-ring part="focus-ring" for=${i}></md-focus-ring>
      <md-ripple
        for=${i}
        class=${i}
        ?disabled=${this.disabled}></md-ripple>
      <div class="handleNub"><md-elevation></md-elevation></div>
      ${bo(this.labeled, () => this.renderLabel(r))}
    </div>`;
  }
  renderInput({
    start: e,
    value: t,
    ariaLabel: r,
    ariaValueText: o,
    ariaMin: a,
    ariaMax: i,
  }) {
    const n = e ? "start" : "end";
    return J`<input
      type="range"
      class="${Me({ start: e, end: !e })}"
      @focus=${this.handleFocus}
      @pointerdown=${this.handleDown}
      @pointerup=${this.handleUp}
      @pointerenter=${this.handleEnter}
      @pointermove=${this.handleMove}
      @pointerleave=${this.handleLeave}
      @keydown=${this.handleKeydown}
      @keyup=${this.handleKeyup}
      @input=${this.handleInput}
      @change=${this.handleChange}
      id=${n}
      .disabled=${this.disabled}
      .min=${String(this.min)}
      aria-valuemin=${a}
      .max=${String(this.max)}
      aria-valuemax=${i}
      .step=${String(this.step)}
      .value=${String(t)}
      .tabIndex=${e ? 1 : 0}
      aria-label=${r || ee}
      aria-valuetext=${o} />`;
  }
  async toggleRippleHover(e, t) {
    const r = await e;
    r &&
      (t
        ? r.handlePointerenter(
            new PointerEvent("pointerenter", {
              isPrimary: !0,
              pointerId: this.ripplePointerId,
            })
          )
        : r.handlePointerleave(
            new PointerEvent("pointerleave", {
              isPrimary: !0,
              pointerId: this.ripplePointerId,
            })
          ));
  }
  handleFocus(e) {
    this.updateOnTop(e.target);
  }
  startAction(e) {
    const t = e.target,
      r = t === this.inputStart ? this.inputEnd : this.inputStart;
    this.action = {
      canFlip: "pointerdown" === e.type,
      flipped: !1,
      target: t,
      fixed: r,
      values: new Map([
        [t, t.valueAsNumber],
        [r, r?.valueAsNumber],
      ]),
    };
  }
  finishAction(e) {
    this.action = void 0;
  }
  handleKeydown(e) {
    this.startAction(e);
  }
  handleKeyup(e) {
    this.finishAction(e);
  }
  handleDown(e) {
    this.startAction(e), (this.ripplePointerId = e.pointerId);
    const t = e.target === this.inputStart;
    (this.handleStartHover = !this.disabled && t && Boolean(this.handleStart)),
      (this.handleEndHover = !this.disabled && !t && Boolean(this.handleEnd));
  }
  async handleUp(e) {
    if (!this.action) return;
    const { target: t, values: r, flipped: o } = this.action;
    await new Promise(requestAnimationFrame),
      void 0 !== t &&
        (t.focus(),
        o &&
          t.valueAsNumber !== r.get(t) &&
          t.dispatchEvent(new Event("change", { bubbles: !0 }))),
      this.finishAction(e);
  }
  handleMove(e) {
    (this.handleStartHover = !this.disabled && xo(e, this.handleStart)),
      (this.handleEndHover = !this.disabled && xo(e, this.handleEnd));
  }
  handleEnter(e) {
    this.handleMove(e);
  }
  handleLeave() {
    (this.handleStartHover = !1), (this.handleEndHover = !1);
  }
  updateOnTop(e) {
    this.startOnTop = e.classList.contains("start");
  }
  needsClamping() {
    if (!this.action) return !1;
    const { target: e, fixed: t } = this.action;
    return e === this.inputStart
      ? e.valueAsNumber > t.valueAsNumber
      : e.valueAsNumber < t.valueAsNumber;
  }
  isActionFlipped() {
    const { action: e } = this;
    if (!e) return !1;
    const { target: t, fixed: r, values: o } = e;
    return (
      e.canFlip &&
        o.get(t) === o.get(r) &&
        this.needsClamping() &&
        ((e.canFlip = !1), (e.flipped = !0), (e.target = r), (e.fixed = t)),
      e.flipped
    );
  }
  flipAction() {
    if (!this.action) return !1;
    const { target: e, fixed: t, values: r } = this.action,
      o = e.valueAsNumber !== t.valueAsNumber;
    return (e.valueAsNumber = t.valueAsNumber), (t.valueAsNumber = r.get(t)), o;
  }
  clampAction() {
    if (!this.needsClamping() || !this.action) return !1;
    const { target: e, fixed: t } = this.action;
    return (e.valueAsNumber = t.valueAsNumber), !0;
  }
  handleInput(e) {
    if (this.isRedispatchingEvent) return;
    let t = !1,
      r = !1;
    this.range &&
      (this.isActionFlipped() && ((t = !0), (r = this.flipAction())),
      this.clampAction() && ((t = !0), (r = !1)));
    const o = e.target;
    this.updateOnTop(o),
      this.range
        ? ((this.valueStart = this.inputStart.valueAsNumber),
          (this.valueEnd = this.inputEnd.valueAsNumber))
        : (this.value = this.inputEnd.valueAsNumber),
      t && e.stopPropagation(),
      r &&
        ((this.isRedispatchingEvent = !0),
        Er(o, e),
        (this.isRedispatchingEvent = !1));
  }
  handleChange(e) {
    const t = e.target,
      { target: r, values: o } = this.action ?? {};
    (r && r.valueAsNumber === o.get(t)) || Er(this, e), this.finishAction(e);
  }
  [ro]() {
    if (this.range) {
      const e = new FormData();
      return (
        e.append(this.nameStart, String(this.valueStart)),
        e.append(this.nameEnd, String(this.valueEnd)),
        e
      );
    }
    return String(this.value);
  }
  formResetCallback() {
    if (this.range) {
      const e = this.getAttribute("value-start");
      this.valueStart = null !== e ? Number(e) : void 0;
      const t = this.getAttribute("value-end");
      return void (this.valueEnd = null !== t ? Number(t) : void 0);
    }
    const e = this.getAttribute("value");
    this.value = null !== e ? Number(e) : void 0;
  }
  formStateRestoreCallback(e) {
    if (Array.isArray(e)) {
      const [[, t], [, r]] = e;
      return (
        (this.valueStart = Number(t)),
        (this.valueEnd = Number(r)),
        void (this.range = !0)
      );
    }
    (this.value = Number(e)), (this.range = !1);
  }
}
function xo({ x: e, y: t }, r) {
  if (!r) return !1;
  const { top: o, left: a, bottom: i, right: n } = r.getBoundingClientRect();
  return e >= a && e <= n && t >= o && t <= i;
}
Ke(yo),
  (yo.shadowRootOptions = { ...me.shadowRootOptions, delegatesFocus: !0 }),
  e([E({ type: Number })], yo.prototype, "min", void 0),
  e([E({ type: Number })], yo.prototype, "max", void 0),
  e([E({ type: Number })], yo.prototype, "value", void 0),
  e(
    [E({ type: Number, attribute: "value-start" })],
    yo.prototype,
    "valueStart",
    void 0
  ),
  e(
    [E({ type: Number, attribute: "value-end" })],
    yo.prototype,
    "valueEnd",
    void 0
  ),
  e([E({ attribute: "value-label" })], yo.prototype, "valueLabel", void 0),
  e(
    [E({ attribute: "value-label-start" })],
    yo.prototype,
    "valueLabelStart",
    void 0
  ),
  e(
    [E({ attribute: "value-label-end" })],
    yo.prototype,
    "valueLabelEnd",
    void 0
  ),
  e(
    [E({ attribute: "aria-label-start" })],
    yo.prototype,
    "ariaLabelStart",
    void 0
  ),
  e(
    [E({ attribute: "aria-valuetext-start" })],
    yo.prototype,
    "ariaValueTextStart",
    void 0
  ),
  e([E({ attribute: "aria-label-end" })], yo.prototype, "ariaLabelEnd", void 0),
  e(
    [E({ attribute: "aria-valuetext-end" })],
    yo.prototype,
    "ariaValueTextEnd",
    void 0
  ),
  e([E({ type: Number })], yo.prototype, "step", void 0),
  e([E({ type: Boolean })], yo.prototype, "ticks", void 0),
  e([E({ type: Boolean })], yo.prototype, "labeled", void 0),
  e([E({ type: Boolean })], yo.prototype, "range", void 0),
  e([S("input.start")], yo.prototype, "inputStart", void 0),
  e([S(".handle.start")], yo.prototype, "handleStart", void 0),
  e([I("md-ripple.start")], yo.prototype, "rippleStart", void 0),
  e([S("input.end")], yo.prototype, "inputEnd", void 0),
  e([S(".handle.end")], yo.prototype, "handleEnd", void 0),
  e([I("md-ripple.end")], yo.prototype, "rippleEnd", void 0),
  e([A()], yo.prototype, "handleStartHover", void 0),
  e([A()], yo.prototype, "handleEndHover", void 0),
  e([A()], yo.prototype, "startOnTop", void 0),
  e([A()], yo.prototype, "handlesOverlapping", void 0),
  e([A()], yo.prototype, "renderValueStart", void 0),
  e([A()], yo.prototype, "renderValueEnd", void 0);
const _o = s`:host{--_active-track-color: var(--md-slider-active-track-color, var(--md-sys-color-primary, #6750a4));--_active-track-height: var(--md-slider-active-track-height, 4px);--_active-track-shape: var(--md-slider-active-track-shape, var(--md-sys-shape-corner-full, 9999px));--_disabled-active-track-color: var(--md-slider-disabled-active-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-track-opacity: var(--md-slider-disabled-active-track-opacity, 0.38);--_disabled-handle-color: var(--md-slider-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-handle-elevation: var(--md-slider-disabled-handle-elevation, 0);--_disabled-inactive-track-color: var(--md-slider-disabled-inactive-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-inactive-track-opacity: var(--md-slider-disabled-inactive-track-opacity, 0.12);--_focus-handle-color: var(--md-slider-focus-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-color: var(--md-slider-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-elevation: var(--md-slider-handle-elevation, 1);--_handle-height: var(--md-slider-handle-height, 20px);--_handle-shadow-color: var(--md-slider-handle-shadow-color, var(--md-sys-color-shadow, #000));--_handle-shape: var(--md-slider-handle-shape, var(--md-sys-shape-corner-full, 9999px));--_handle-width: var(--md-slider-handle-width, 20px);--_hover-handle-color: var(--md-slider-hover-handle-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-slider-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-slider-hover-state-layer-opacity, 0.08);--_inactive-track-color: var(--md-slider-inactive-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_inactive-track-height: var(--md-slider-inactive-track-height, 4px);--_inactive-track-shape: var(--md-slider-inactive-track-shape, var(--md-sys-shape-corner-full, 9999px));--_label-container-color: var(--md-slider-label-container-color, var(--md-sys-color-primary, #6750a4));--_label-container-height: var(--md-slider-label-container-height, 28px);--_pressed-handle-color: var(--md-slider-pressed-handle-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-slider-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-slider-pressed-state-layer-opacity, 0.12);--_state-layer-size: var(--md-slider-state-layer-size, 40px);--_with-overlap-handle-outline-color: var(--md-slider-with-overlap-handle-outline-color, var(--md-sys-color-on-primary, #fff));--_with-overlap-handle-outline-width: var(--md-slider-with-overlap-handle-outline-width, 1px);--_with-tick-marks-active-container-color: var(--md-slider-with-tick-marks-active-container-color, var(--md-sys-color-on-primary, #fff));--_with-tick-marks-container-size: var(--md-slider-with-tick-marks-container-size, 2px);--_with-tick-marks-disabled-container-color: var(--md-slider-with-tick-marks-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_with-tick-marks-inactive-container-color: var(--md-slider-with-tick-marks-inactive-container-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-slider-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-slider-label-text-font, var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-slider-label-text-line-height, var(--md-sys-typescale-label-medium-line-height, 1rem));--_label-text-size: var(--md-slider-label-text-size, var(--md-sys-typescale-label-medium-size, 0.75rem));--_label-text-weight: var(--md-slider-label-text-weight, var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)));--_start-fraction: 0;--_end-fraction: 0;--_tick-count: 0;display:inline-flex;vertical-align:middle;min-inline-size:200px;--md-elevation-level: var(--_handle-elevation);--md-elevation-shadow-color: var(--_handle-shadow-color)}md-focus-ring{height:48px;inset:unset;width:48px}md-elevation{transition-duration:250ms}@media(prefers-reduced-motion){.label{transition-duration:0}}:host([disabled]){opacity:var(--_disabled-active-track-opacity);--md-elevation-level: var(--_disabled-handle-elevation)}.container{flex:1;display:flex;align-items:center;position:relative;block-size:var(--_state-layer-size);pointer-events:none;touch-action:none}.track,.tickmarks{position:absolute;inset:0;display:flex;align-items:center}.track::before,.tickmarks::before,.track::after,.tickmarks::after{position:absolute;content:"";inset-inline-start:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));inset-inline-end:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));background-size:calc((100% - var(--_with-tick-marks-container-size)*2)/var(--_tick-count)) 100%}.track::before,.tickmarks::before{block-size:var(--_inactive-track-height);border-radius:var(--_inactive-track-shape)}.track::before{background:var(--_inactive-track-color)}.tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-inactive-container-color) 0, var(--_with-tick-marks-inactive-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}:host([disabled]) .track::before{opacity:calc(1/var(--_disabled-active-track-opacity)*var(--_disabled-inactive-track-opacity));background-color:var(--_disabled-inactive-track-color)}.track::after,.tickmarks::after{block-size:var(--_active-track-height);border-radius:var(--_active-track-shape);clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))) 0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)))}.track::after{background:var(--_active-track-color)}.tickmarks::after{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-active-container-color) 0, var(--_with-tick-marks-active-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.track:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}.tickmarks:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}:host([disabled]) .track::after{background:var(--_disabled-active-track-color)}:host([disabled]) .tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-disabled-container-color) 0, var(--_with-tick-marks-disabled-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.handleContainerPadded{position:relative;block-size:100%;inline-size:100%;padding-inline:calc(var(--_state-layer-size)/2)}.handleContainerBlock{position:relative;block-size:100%;inline-size:100%}.handleContainer{position:absolute;inset-block-start:0;inset-block-end:0;inset-inline-start:calc(100%*var(--_start-fraction));inline-size:calc(100%*(var(--_end-fraction) - var(--_start-fraction)))}.handle{position:absolute;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);border-radius:var(--_handle-shape);display:flex;place-content:center;place-items:center}.handleNub{position:absolute;height:var(--_handle-height);width:var(--_handle-width);border-radius:var(--_handle-shape);background:var(--_handle-color)}:host([disabled]) .handleNub{background:var(--_disabled-handle-color)}input.end:focus~.handleContainerPadded .handle.end>.handleNub,input.start:focus~.handleContainerPadded .handle.start>.handleNub{background:var(--_focus-handle-color)}.container>.handleContainerPadded .handle.hover>.handleNub{background:var(--_hover-handle-color)}:host(:not([disabled])) input.end:active~.handleContainerPadded .handle.end>.handleNub,:host(:not([disabled])) input.start:active~.handleContainerPadded .handle.start>.handleNub{background:var(--_pressed-handle-color)}.onTop.isOverlapping .label,.onTop.isOverlapping .label::before{outline:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.onTop.isOverlapping .handleNub{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.handle.start{inset-inline-start:calc(0px - var(--_state-layer-size)/2)}.handle.end{inset-inline-end:calc(0px - var(--_state-layer-size)/2)}.label{position:absolute;box-sizing:border-box;display:flex;padding:4px;place-content:center;place-items:center;border-radius:var(--md-sys-shape-corner-full, 9999px);color:var(--_label-text-color);font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);inset-block-end:100%;min-inline-size:var(--_label-container-height);min-block-size:var(--_label-container-height);background:var(--_label-container-color);transition:transform 100ms cubic-bezier(0.2, 0, 0, 1);transform-origin:center bottom;transform:scale(0)}:host(:focus-within) .label,.handleContainer.hover .label,:where(:has(input:active)) .label{transform:scale(1)}.label::before,.label::after{position:absolute;display:block;content:"";background:inherit}.label::before{inline-size:calc(var(--_label-container-height)/2);block-size:calc(var(--_label-container-height)/2);bottom:calc(var(--_label-container-height)/-10);transform:rotate(45deg)}.label::after{inset:0px;border-radius:inherit}.labelContent{z-index:1}input[type=range]{opacity:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:absolute;box-sizing:border-box;height:100%;width:100%;margin:0;background:rgba(0,0,0,0);cursor:pointer;pointer-events:auto;appearance:none}input[type=range]:focus{outline:none}::-webkit-slider-runnable-track{-webkit-appearance:none}::-moz-range-track{appearance:none}::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;block-size:var(--_handle-height);inline-size:var(--_handle-width);opacity:0;z-index:2}input.end::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_end-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.end:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}input.start::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_start-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.start:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}::-moz-range-thumb{appearance:none;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);transform:scaleX(0);opacity:0;z-index:2}.ranged input.start{clip-path:inset(0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))) 0 0)}.ranged input.start:dir(rtl){clip-path:inset(0 0 0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))))}.ranged input.end{clip-path:inset(0 0 0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)))}.ranged input.end:dir(rtl){clip-path:inset(0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)) 0 0)}.onTop{z-index:1}.handle{--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-ripple{border-radius:50%;height:var(--_state-layer-size);width:var(--_state-layer-size)}/*# sourceMappingURL=slider-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let wo = class extends yo {};
(wo.styles = [_o, fo]), (wo = e([t("md-slider")], wo));
var ko = Object.freeze({
  __proto__: null,
  get MdSlider() {
    return wo;
  },
});
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class $o extends me {
  constructor() {
    super(...arguments),
      (this.disabled = !1),
      (this.type = "text"),
      (this.isListItem = !0),
      (this.href = ""),
      (this.target = "");
  }
  get isDisabled() {
    return this.disabled && "link" !== this.type;
  }
  willUpdate(e) {
    this.href && (this.type = "link"), super.willUpdate(e);
  }
  render() {
    return this.renderListItem(J`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `);
  }
  renderListItem(e) {
    const t = "link" === this.type;
    let r;
    switch (this.type) {
      case "link":
        r = At`a`;
        break;
      case "button":
        r = At`button`;
        break;
      default:
        r = At`li`;
    }
    const o = "text" !== this.type,
      a = t && this.target ? this.target : ee;
    return St`
      <${r}
        id="item"
        tabindex="${this.isDisabled || !o ? -1 : 0}"
        ?disabled=${this.isDisabled}
        role="listitem"
        aria-selected=${this.ariaSelected || ee}
        aria-checked=${this.ariaChecked || ee}
        aria-expanded=${this.ariaExpanded || ee}
        aria-haspopup=${this.ariaHasPopup || ee}
        class="list-item ${Me(this.getRenderClasses())}"
        href=${this.href || ee}
        target=${a}
        @focus=${this.onFocus}
      >${e}</${r}>
    `;
  }
  renderRipple() {
    return "text" === this.type
      ? ee
      : J` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.isDisabled}></md-ripple>`;
  }
  renderFocusRing() {
    return "text" === this.type
      ? ee
      : J` <md-focus-ring
      @visibility-changed=${this.onFocusRingVisibilityChanged}
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`;
  }
  onFocusRingVisibilityChanged(e) {}
  getRenderClasses() {
    return { disabled: this.isDisabled };
  }
  renderBody() {
    return J`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `;
  }
  onFocus() {
    -1 === this.tabIndex &&
      this.dispatchEvent(
        new Event("request-activation", { bubbles: !0, composed: !0 })
      );
  }
  focus() {
    this.listItemRoot?.focus();
  }
}
Ke($o),
  ($o.shadowRootOptions = { ...me.shadowRootOptions, delegatesFocus: !0 }),
  e([E({ type: Boolean, reflect: !0 })], $o.prototype, "disabled", void 0),
  e([E({ reflect: !0 })], $o.prototype, "type", void 0),
  e(
    [E({ type: Boolean, attribute: "md-list-item", reflect: !0 })],
    $o.prototype,
    "isListItem",
    void 0
  ),
  e([E()], $o.prototype, "href", void 0),
  e([E()], $o.prototype, "target", void 0),
  e([S(".list-item")], $o.prototype, "listItemRoot", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Co = s`:host{display:flex;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--md-list-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-list-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-list-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-list-item-pressed-state-layer-opacity, 0.12)}:host(:is([type=button]:not([disabled]),[type=link])){cursor:pointer}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;cursor:inherit;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%}.list-item.interactive{cursor:pointer}.list-item.disabled{opacity:var(--md-list-item-disabled-opacity, 0.3);pointer-events:none}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;height:100%;color:var(--md-list-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-list-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-list-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-list-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-list-item-one-line-container-height, 56px);padding-top:var(--md-list-item-top-space, 12px);padding-bottom:var(--md-list-item-bottom-space, 12px);padding-inline-start:var(--md-list-item-leading-space, 16px);padding-inline-end:var(--md-list-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-list-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-list-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-list-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-list-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-list-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-list-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-list-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-list-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-list-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}@media(forced-colors: active){.disabled slot{color:GrayText}.list-item.disabled{color:GrayText;opacity:1}}/*# sourceMappingURL=list-item-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Eo = class extends $o {};
(Eo.styles = [Co]), (Eo = e([t("md-list-item")], Eo));
var Ao = Object.freeze({
  __proto__: null,
  get MdListItem() {
    return Eo;
  },
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const zo = new Set(Object.values(dr));
class So extends me {
  get items() {
    return this.listController.items;
  }
  constructor() {
    super(),
      (this.listController = new cr({
        isItem: (e) => e.hasAttribute("md-list-item"),
        getPossibleItems: () => this.slotItems,
        isRtl: () => "rtl" === getComputedStyle(this).direction,
        deactivateItem: (e) => {
          e.tabIndex = -1;
        },
        activateItem: (e) => {
          e.tabIndex = 0;
        },
        isNavigableKey: (e) => zo.has(e),
        isActivatable: (e) => !e.disabled && "text" !== e.type,
      })),
      (this.internals = this.attachInternals()),
      (this.internals.role = "list"),
      this.addEventListener("keydown", this.listController.handleKeydown);
  }
  render() {
    return J`
      <slot
        @deactivate-items=${this.listController.onDeactivateItems}
        @request-activation=${this.listController.onRequestActivation}
        @slotchange=${this.listController.onSlotchange}>
      </slot>
    `;
  }
  activateNextItem() {
    return this.listController.activateNextItem();
  }
  activatePreviousItem() {
    return this.listController.activatePreviousItem();
  }
}
e([R({ flatten: !0 })], So.prototype, "slotItems", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const To = s`:host{background:var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));color:unset;display:flex;flex-direction:column;outline:none;padding:8px 0;position:relative}/*# sourceMappingURL=list-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Io = class extends So {};
(Io.styles = [To]), (Io = e([t("md-list")], Io));
var Ro = Object.freeze({
  __proto__: null,
  get MdList() {
    return Io;
  },
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class Oo extends dt {}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const Lo = s`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}/*# sourceMappingURL=text-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Po = class extends Oo {};
(Po.styles = [pt, Lo]), (Po = e([t("md-text-button")], Po));
var Mo = Object.freeze({
  __proto__: null,
  get MdTextButton() {
    return Po;
  },
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class Bo extends me {
  constructor() {
    super(...arguments),
      (this.disabled = !1),
      (this.error = !1),
      (this.focused = !1),
      (this.label = ""),
      (this.populated = !1),
      (this.required = !1),
      (this.resizable = !1),
      (this.supportingText = ""),
      (this.errorText = ""),
      (this.count = -1),
      (this.max = -1),
      (this.hasStart = !1),
      (this.hasEnd = !1),
      (this.isAnimating = !1),
      (this.refreshErrorAlert = !1),
      (this.disableTransitions = !1);
  }
  get counterText() {
    const e = this.count ?? -1,
      t = this.max ?? -1;
    return e < 0 || t <= 0 ? "" : `${e} / ${t}`;
  }
  get supportingOrErrorText() {
    return this.error && this.errorText ? this.errorText : this.supportingText;
  }
  reannounceError() {
    this.refreshErrorAlert = !0;
  }
  update(e) {
    e.has("disabled") &&
      void 0 !== e.get("disabled") &&
      (this.disableTransitions = !0),
      this.disabled &&
        this.focused &&
        (e.set("focused", !0), (this.focused = !1)),
      this.animateLabelIfNeeded({
        wasFocused: e.get("focused"),
        wasPopulated: e.get("populated"),
      }),
      super.update(e);
  }
  render() {
    const e = this.renderLabel(!0),
      t = this.renderLabel(!1),
      r = this.renderOutline?.(e),
      o = {
        disabled: this.disabled,
        "disable-transitions": this.disableTransitions,
        error: this.error && !this.disabled,
        focused: this.focused,
        "with-start": this.hasStart,
        "with-end": this.hasEnd,
        populated: this.populated,
        resizable: this.resizable,
        required: this.required,
        "no-label": !this.label,
      };
    return J`
      <div class="field ${Me(o)}">
        <div class="container-overflow">
          ${this.renderBackground?.()} ${this.renderIndicator?.()} ${r}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${t} ${r ? ee : e}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `;
  }
  updated(e) {
    (e.has("supportingText") ||
      e.has("errorText") ||
      e.has("count") ||
      e.has("max")) &&
      this.updateSlottedAriaDescribedBy(),
      this.refreshErrorAlert &&
        requestAnimationFrame(() => {
          this.refreshErrorAlert = !1;
        }),
      this.disableTransitions &&
        requestAnimationFrame(() => {
          this.disableTransitions = !1;
        });
  }
  renderSupportingText() {
    const { supportingOrErrorText: e, counterText: t } = this;
    if (!e && !t) return ee;
    const r = J`<span>${e}</span>`,
      o = t ? J`<span class="counter">${t}</span>` : ee,
      a = this.error && this.errorText && !this.refreshErrorAlert;
    return J`
      <div class="supporting-text" role=${a ? "alert" : ee}>${r}${o}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `;
  }
  updateSlottedAriaDescribedBy() {
    for (const e of this.slottedAriaDescribedBy)
      ve(J`${this.supportingOrErrorText} ${this.counterText}`, e),
        e.setAttribute("hidden", "");
  }
  renderLabel(e) {
    if (!this.label) return ee;
    let t;
    t = e
      ? this.focused || this.populated || this.isAnimating
      : !this.focused && !this.populated && !this.isAnimating;
    const r = { hidden: !t, floating: e, resting: !e },
      o = `${this.label}${this.required ? "*" : ""}`;
    return J`
      <span class="label ${Me(r)}" aria-hidden=${!t}
        >${o}</span
      >
    `;
  }
  animateLabelIfNeeded({ wasFocused: e, wasPopulated: t }) {
    this.label &&
      (e ?? (e = this.focused),
      t ?? (t = this.populated),
      (e || t) !== (this.focused || this.populated) &&
        ((this.isAnimating = !0),
        this.labelAnimation?.cancel(),
        (this.labelAnimation = this.floatingLabelEl?.animate(
          this.getLabelKeyframes(),
          { duration: 150, easing: Be }
        )),
        this.labelAnimation?.addEventListener("finish", () => {
          this.isAnimating = !1;
        })));
  }
  getLabelKeyframes() {
    const { floatingLabelEl: e, restingLabelEl: t } = this;
    if (!e || !t) return [];
    const { x: r, y: o, height: a } = e.getBoundingClientRect(),
      { x: i, y: n, height: s } = t.getBoundingClientRect(),
      l = e.scrollWidth,
      d = t.scrollWidth,
      c = d / l,
      h = `translateX(${i - r}px) translateY(${
        n - o + Math.round((s - a * c) / 2)
      }px) scale(${c})`,
      p = "translateX(0) translateY(0) scale(1)",
      u = t.clientWidth,
      v = d > u ? u / c + "px" : "";
    return this.focused || this.populated
      ? [
          { transform: h, width: v },
          { transform: p, width: v },
        ]
      : [
          { transform: p, width: v },
          { transform: h, width: v },
        ];
  }
  getSurfacePositionClientRect() {
    return this.containerEl.getBoundingClientRect();
  }
}
e([E({ type: Boolean })], Bo.prototype, "disabled", void 0),
  e([E({ type: Boolean })], Bo.prototype, "error", void 0),
  e([E({ type: Boolean })], Bo.prototype, "focused", void 0),
  e([E()], Bo.prototype, "label", void 0),
  e([E({ type: Boolean })], Bo.prototype, "populated", void 0),
  e([E({ type: Boolean })], Bo.prototype, "required", void 0),
  e([E({ type: Boolean })], Bo.prototype, "resizable", void 0),
  e(
    [E({ attribute: "supporting-text" })],
    Bo.prototype,
    "supportingText",
    void 0
  ),
  e([E({ attribute: "error-text" })], Bo.prototype, "errorText", void 0),
  e([E({ type: Number })], Bo.prototype, "count", void 0),
  e([E({ type: Number })], Bo.prototype, "max", void 0),
  e(
    [E({ type: Boolean, attribute: "has-start" })],
    Bo.prototype,
    "hasStart",
    void 0
  ),
  e(
    [E({ type: Boolean, attribute: "has-end" })],
    Bo.prototype,
    "hasEnd",
    void 0
  ),
  e(
    [R({ slot: "aria-describedby" })],
    Bo.prototype,
    "slottedAriaDescribedBy",
    void 0
  ),
  e([A()], Bo.prototype, "isAnimating", void 0),
  e([A()], Bo.prototype, "refreshErrorAlert", void 0),
  e([A()], Bo.prototype, "disableTransitions", void 0),
  e([S(".label.floating")], Bo.prototype, "floatingLabelEl", void 0),
  e([S(".label.resting")], Bo.prototype, "restingLabelEl", void 0),
  e([S(".container")], Bo.prototype, "containerEl", void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class No extends Bo {
  renderOutline(e) {
    return J`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${e}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const Uo = s`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}/*# sourceMappingURL=outlined-styles.css.map */
`,
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */ Do = s`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start,.with-end .end{min-width:48px}.with-start .start{margin-inline-end:4px}.with-end .end{margin-inline-start:4px}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let Fo = class extends No {};
(Fo.styles = [Do, Uo]), (Fo = e([t("md-outlined-field")], Fo));
var Ho = Object.freeze({
  __proto__: null,
  get MdOutlinedField() {
    return Fo;
  },
});
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const Vo = s`:host{--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-outlined-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-outlined-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_leading-space: var(--md-outlined-text-field-leading-space, 16px);--_trailing-space: var(--md-outlined-text-field-trailing-space, 16px);--_top-space: var(--md-outlined-text-field-top-space, 16px);--_bottom-space: var(--md-outlined-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-outlined-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-outlined-text-field-input-text-suffix-leading-space, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--md-outlined-field-bottom-space: var(--_bottom-space);--md-outlined-field-container-shape-end-end: var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_container-shape-start-start);--md-outlined-field-content-color: var(--_input-text-color);--md-outlined-field-content-font: var(--_input-text-font);--md-outlined-field-content-line-height: var(--_input-text-line-height);--md-outlined-field-content-size: var(--_input-text-size);--md-outlined-field-content-weight: var(--_input-text-weight);--md-outlined-field-disabled-content-color: var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_focus-outline-color);--md-outlined-field-focus-outline-width: var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_hover-outline-color);--md-outlined-field-hover-outline-width: var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_label-text-color);--md-outlined-field-label-text-font: var(--_label-text-font);--md-outlined-field-label-text-line-height: var(--_label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_label-text-populated-size);--md-outlined-field-label-text-size: var(--_label-text-size);--md-outlined-field-label-text-weight: var(--_label-text-weight);--md-outlined-field-leading-content-color: var(--_leading-icon-color);--md-outlined-field-leading-space: var(--_leading-space);--md-outlined-field-outline-color: var(--_outline-color);--md-outlined-field-outline-width: var(--_outline-width);--md-outlined-field-supporting-text-color: var(--_supporting-text-color);--md-outlined-field-supporting-text-font: var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_supporting-text-weight);--md-outlined-field-top-space: var(--_top-space);--md-outlined-field-trailing-content-color: var(--_trailing-icon-color);--md-outlined-field-trailing-space: var(--_trailing-space)}/*# sourceMappingURL=outlined-styles.css.map */
`,
  /**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ qo = {},
  jo = Le(
    class extends Pe {
      constructor(e) {
        if ((super(e), e.type !== Re && e.type !== Ie && e.type !== Oe))
          throw Error(
            "The `live` directive is not allowed on child or event bindings"
          );
        if (!((e) => void 0 === e.strings)(e))
          throw Error("`live` bindings can only contain a single expression");
      }
      render(e) {
        return e;
      }
      update(e, [t]) {
        if (t === Q || t === ee) return t;
        const r = e.element,
          o = e.name;
        if (e.type === Re) {
          if (t === r[o]) return Q;
        } else if (e.type === Oe) {
          if (!!t === r.hasAttribute(o)) return Q;
        } else if (e.type === Ie && r.getAttribute(o) === t + "") return Q;
        return (
          ((e, t = qo) => {
            e._$AH = t;
            /**
             * @license
             * Copyright 2020 Google LLC
             * SPDX-License-Identifier: BSD-3-Clause
             */
          })(e),
          t
        );
      }
    }
  ),
  Wo = Symbol("onReportValidity"),
  Go = Symbol("privateCleanupFormListeners"),
  Ko = Symbol("privateDoNotReportInvalid"),
  Yo = Symbol("privateIsSelfReportingValidity"),
  Xo = Symbol("privateCallOnReportValidity");
const Zo = new WeakMap();
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Jo extends io {
  computeValidity({ state: e, renderedControl: t }) {
    let r = t;
    Qo(e) && !r
      ? ((r = this.inputControl || document.createElement("input")),
        (this.inputControl = r))
      : r ||
        ((r = this.textAreaControl || document.createElement("textarea")),
        (this.textAreaControl = r));
    const o = Qo(e) ? r : null;
    if (
      (o && (o.type = e.type),
      r.value !== e.value && (r.value = e.value),
      (r.required = e.required),
      o)
    ) {
      const t = e;
      t.pattern ? (o.pattern = t.pattern) : o.removeAttribute("pattern"),
        t.min ? (o.min = t.min) : o.removeAttribute("min"),
        t.max ? (o.max = t.max) : o.removeAttribute("max"),
        t.step ? (o.step = t.step) : o.removeAttribute("step");
    }
    return (
      (e.minLength ?? -1) > -1
        ? r.setAttribute("minlength", String(e.minLength))
        : r.removeAttribute("minlength"),
      (e.maxLength ?? -1) > -1
        ? r.setAttribute("maxlength", String(e.maxLength))
        : r.removeAttribute("maxlength"),
      { validity: r.validity, validationMessage: r.validationMessage }
    );
  }
  equals({ state: e }, { state: t }) {
    const r =
      e.type === t.type &&
      e.value === t.value &&
      e.required === t.required &&
      e.minLength === t.minLength &&
      e.maxLength === t.maxLength;
    return Qo(e) && Qo(t)
      ? r &&
          e.pattern === t.pattern &&
          e.min === t.min &&
          e.max === t.max &&
          e.step === t.step
      : r;
  }
  copy({ state: e }) {
    return {
      state: Qo(e) ? this.copyInput(e) : this.copyTextArea(e),
      renderedControl: null,
    };
  }
  copyInput(e) {
    const { type: t, pattern: r, min: o, max: a, step: i } = e;
    return {
      ...this.copySharedState(e),
      type: t,
      pattern: r,
      min: o,
      max: a,
      step: i,
    };
  }
  copyTextArea(e) {
    return { ...this.copySharedState(e), type: e.type };
  }
  copySharedState({ value: e, required: t, minLength: r, maxLength: o }) {
    return { value: e, required: t, minLength: r, maxLength: o };
  }
}
function Qo(e) {
  return "textarea" !== e.type;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const ea = (function (e) {
  var t, r, o;
  class a extends e {
    constructor(...e) {
      super(...e),
        (this[t] = new AbortController()),
        (this[r] = !1),
        (this[o] = !1),
        this.addEventListener(
          "invalid",
          (e) => {
            !this[Ko] &&
              e.isTrusted &&
              this.addEventListener(
                "invalid",
                () => {
                  this[Xo](e);
                },
                { once: !0 }
              );
          },
          { capture: !0 }
        );
    }
    checkValidity() {
      this[Ko] = !0;
      const e = super.checkValidity();
      return (this[Ko] = !1), e;
    }
    reportValidity() {
      this[Yo] = !0;
      const e = super.reportValidity();
      return e && this[Xo](null), (this[Yo] = !1), e;
    }
    [((t = Go), (r = Ko), (o = Yo), Xo)](e) {
      const t = e?.defaultPrevented;
      t ||
        (this[Wo](e),
        !t &&
          e?.defaultPrevented &&
          (this[Yo] ||
            (function (e, t) {
              if (!e) return !0;
              let r;
              for (const t of e.elements)
                if (t.matches(":invalid")) {
                  r = t;
                  break;
                }
              return r === t;
            })(this[tt].form, this)) &&
          this.focus());
    }
    [Wo](e) {
      throw new Error("Implement [onReportValidity]");
    }
    formAssociatedCallback(e) {
      super.formAssociatedCallback && super.formAssociatedCallback(e),
        this[Go].abort(),
        e &&
          ((this[Go] = new AbortController()),
          (function (e, t, r, o) {
            const a = (function (e) {
              if (!Zo.has(e)) {
                const t = new EventTarget();
                Zo.set(e, t);
                for (const r of ["reportValidity", "requestSubmit"]) {
                  const o = e[r];
                  e[r] = function () {
                    t.dispatchEvent(new Event("before"));
                    const e = Reflect.apply(o, this, arguments);
                    return t.dispatchEvent(new Event("after")), e;
                  };
                }
              }
              return Zo.get(e);
            })(t);
            let i,
              n = !1,
              s = !1;
            a.addEventListener(
              "before",
              () => {
                (s = !0),
                  (i = new AbortController()),
                  (n = !1),
                  e.addEventListener(
                    "invalid",
                    () => {
                      n = !0;
                    },
                    { signal: i.signal }
                  );
              },
              { signal: o }
            ),
              a.addEventListener(
                "after",
                () => {
                  (s = !1), i?.abort(), n || r();
                },
                { signal: o }
              ),
              t.addEventListener(
                "submit",
                () => {
                  s || r();
                },
                { signal: o }
              );
          })(
            this,
            e,
            () => {
              this[Xo](null);
            },
            this[Go].signal
          ));
    }
  }
  return a;
})(to(ao(ot(me))));
class ta extends ea {
  constructor() {
    super(...arguments),
      (this.error = !1),
      (this.errorText = ""),
      (this.label = ""),
      (this.required = !1),
      (this.value = ""),
      (this.prefixText = ""),
      (this.suffixText = ""),
      (this.hasLeadingIcon = !1),
      (this.hasTrailingIcon = !1),
      (this.supportingText = ""),
      (this.textDirection = ""),
      (this.rows = 2),
      (this.cols = 20),
      (this.inputMode = ""),
      (this.max = ""),
      (this.maxLength = -1),
      (this.min = ""),
      (this.minLength = -1),
      (this.noSpinner = !1),
      (this.pattern = ""),
      (this.placeholder = ""),
      (this.readOnly = !1),
      (this.multiple = !1),
      (this.step = ""),
      (this.type = "text"),
      (this.autocomplete = ""),
      (this.dirty = !1),
      (this.focused = !1),
      (this.nativeError = !1),
      (this.nativeErrorText = "");
  }
  get selectionDirection() {
    return this.getInputOrTextarea().selectionDirection;
  }
  set selectionDirection(e) {
    this.getInputOrTextarea().selectionDirection = e;
  }
  get selectionEnd() {
    return this.getInputOrTextarea().selectionEnd;
  }
  set selectionEnd(e) {
    this.getInputOrTextarea().selectionEnd = e;
  }
  get selectionStart() {
    return this.getInputOrTextarea().selectionStart;
  }
  set selectionStart(e) {
    this.getInputOrTextarea().selectionStart = e;
  }
  get valueAsNumber() {
    const e = this.getInput();
    return e ? e.valueAsNumber : NaN;
  }
  set valueAsNumber(e) {
    const t = this.getInput();
    t && ((t.valueAsNumber = e), (this.value = t.value));
  }
  get valueAsDate() {
    const e = this.getInput();
    return e ? e.valueAsDate : null;
  }
  set valueAsDate(e) {
    const t = this.getInput();
    t && ((t.valueAsDate = e), (this.value = t.value));
  }
  get hasError() {
    return this.error || this.nativeError;
  }
  select() {
    this.getInputOrTextarea().select();
  }
  setRangeText(...e) {
    this.getInputOrTextarea().setRangeText(...e),
      (this.value = this.getInputOrTextarea().value);
  }
  setSelectionRange(e, t, r) {
    this.getInputOrTextarea().setSelectionRange(e, t, r);
  }
  stepDown(e) {
    const t = this.getInput();
    t && (t.stepDown(e), (this.value = t.value));
  }
  stepUp(e) {
    const t = this.getInput();
    t && (t.stepUp(e), (this.value = t.value));
  }
  reset() {
    (this.dirty = !1),
      (this.value = this.getAttribute("value") ?? ""),
      (this.nativeError = !1),
      (this.nativeErrorText = "");
  }
  attributeChangedCallback(e, t, r) {
    ("value" === e && this.dirty) || super.attributeChangedCallback(e, t, r);
  }
  render() {
    const e = {
      disabled: this.disabled,
      error: !this.disabled && this.hasError,
      textarea: "textarea" === this.type,
      "no-spinner": this.noSpinner,
    };
    return J`
      <span class="text-field ${Me(e)}">
        ${this.renderField()}
      </span>
    `;
  }
  updated(e) {
    const t = this.getInputOrTextarea().value;
    this.value !== t && (this.value = t);
  }
  renderField() {
    return St`<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${"textarea" === this.type}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
    </${this.fieldTag}>`;
  }
  renderLeadingIcon() {
    return J`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
  }
  renderTrailingIcon() {
    return J`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
  }
  renderInputOrTextarea() {
    const e = { direction: this.textDirection },
      t = this.ariaLabel || this.label || ee,
      r = this.autocomplete,
      o = (this.maxLength ?? -1) > -1,
      a = (this.minLength ?? -1) > -1;
    if ("textarea" === this.type)
      return J`
        <textarea
          class="input"
          style=${er(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${r || ee}
          ?disabled=${this.disabled}
          maxlength=${o ? this.maxLength : ee}
          minlength=${a ? this.minLength : ee}
          placeholder=${this.placeholder || ee}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${jo(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;
    const i = this.renderPrefix(),
      n = this.renderSuffix(),
      s = this.inputMode;
    return J`
      <div class="input-wrapper">
        ${i}
        <input
          class="input"
          style=${er(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${r || ee}
          ?disabled=${this.disabled}
          inputmode=${s || ee}
          max=${this.max || ee}
          maxlength=${o ? this.maxLength : ee}
          min=${this.min || ee}
          minlength=${a ? this.minLength : ee}
          pattern=${this.pattern || ee}
          placeholder=${this.placeholder || ee}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step || ee}
          type=${this.type}
          .value=${jo(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${n}
      </div>
    `;
  }
  renderPrefix() {
    return this.renderAffix(this.prefixText, !1);
  }
  renderSuffix() {
    return this.renderAffix(this.suffixText, !0);
  }
  renderAffix(e, t) {
    return e
      ? J`<span class="${Me({ suffix: t, prefix: !t })}">${e}</span>`
      : ee;
  }
  getErrorText() {
    return this.error ? this.errorText : this.nativeErrorText;
  }
  handleFocusChange() {
    this.focused = this.inputOrTextarea?.matches(":focus") ?? !1;
  }
  handleInput(e) {
    (this.dirty = !0), (this.value = e.target.value);
  }
  redispatchEvent(e) {
    Er(this, e);
  }
  getInputOrTextarea() {
    return (
      this.inputOrTextarea || (this.connectedCallback(), this.scheduleUpdate()),
      this.isUpdatePending && this.scheduleUpdate(),
      this.inputOrTextarea
    );
  }
  getInput() {
    return "textarea" === this.type ? null : this.getInputOrTextarea();
  }
  handleIconChange() {
    (this.hasLeadingIcon = this.leadingIcons.length > 0),
      (this.hasTrailingIcon = this.trailingIcons.length > 0);
  }
  [ro]() {
    return this.value;
  }
  formResetCallback() {
    this.reset();
  }
  formStateRestoreCallback(e) {
    this.value = e;
  }
  focus() {
    this.getInputOrTextarea().focus();
  }
  [Xr]() {
    return new Jo(() => ({
      state: this,
      renderedControl: this.inputOrTextarea,
    }));
  }
  [Zr]() {
    return this.inputOrTextarea;
  }
  [Wo](e) {
    e?.preventDefault();
    const t = this.getErrorText();
    (this.nativeError = !!e),
      (this.nativeErrorText = this.validationMessage),
      t === this.getErrorText() && this.field?.reannounceError();
  }
}
Ke(ta),
  (ta.shadowRootOptions = { ...me.shadowRootOptions, delegatesFocus: !0 }),
  e([E({ type: Boolean, reflect: !0 })], ta.prototype, "error", void 0),
  e([E({ attribute: "error-text" })], ta.prototype, "errorText", void 0),
  e([E()], ta.prototype, "label", void 0),
  e([E({ type: Boolean, reflect: !0 })], ta.prototype, "required", void 0),
  e([E()], ta.prototype, "value", void 0),
  e([E({ attribute: "prefix-text" })], ta.prototype, "prefixText", void 0),
  e([E({ attribute: "suffix-text" })], ta.prototype, "suffixText", void 0),
  e(
    [E({ type: Boolean, attribute: "has-leading-icon" })],
    ta.prototype,
    "hasLeadingIcon",
    void 0
  ),
  e(
    [E({ type: Boolean, attribute: "has-trailing-icon" })],
    ta.prototype,
    "hasTrailingIcon",
    void 0
  ),
  e(
    [E({ attribute: "supporting-text" })],
    ta.prototype,
    "supportingText",
    void 0
  ),
  e(
    [E({ attribute: "text-direction" })],
    ta.prototype,
    "textDirection",
    void 0
  ),
  e([E({ type: Number })], ta.prototype, "rows", void 0),
  e([E({ type: Number })], ta.prototype, "cols", void 0),
  e([E({ reflect: !0 })], ta.prototype, "inputMode", void 0),
  e([E()], ta.prototype, "max", void 0),
  e([E({ type: Number })], ta.prototype, "maxLength", void 0),
  e([E()], ta.prototype, "min", void 0),
  e([E({ type: Number })], ta.prototype, "minLength", void 0),
  e(
    [E({ type: Boolean, attribute: "no-spinner" })],
    ta.prototype,
    "noSpinner",
    void 0
  ),
  e([E()], ta.prototype, "pattern", void 0),
  e(
    [
      E({
        reflect: !0,
        converter: {
          fromAttribute: (e) => e ?? "",
          toAttribute: (e) => e || null,
        },
      }),
    ],
    ta.prototype,
    "placeholder",
    void 0
  ),
  e([E({ type: Boolean, reflect: !0 })], ta.prototype, "readOnly", void 0),
  e([E({ type: Boolean, reflect: !0 })], ta.prototype, "multiple", void 0),
  e([E()], ta.prototype, "step", void 0),
  e([E({ reflect: !0 })], ta.prototype, "type", void 0),
  e([E({ reflect: !0 })], ta.prototype, "autocomplete", void 0),
  e([A()], ta.prototype, "dirty", void 0),
  e([A()], ta.prototype, "focused", void 0),
  e([A()], ta.prototype, "nativeError", void 0),
  e([A()], ta.prototype, "nativeErrorText", void 0),
  e([S(".input")], ta.prototype, "inputOrTextarea", void 0),
  e([S(".field")], ta.prototype, "field", void 0),
  e([R({ slot: "leading-icon" })], ta.prototype, "leadingIcons", void 0),
  e([R({ slot: "trailing-icon" })], ta.prototype, "trailingIcons", void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ra extends ta {
  constructor() {
    super(...arguments), (this.fieldTag = At`md-outlined-field`);
    /**
     * @license
     * Copyright 2022 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
  }
}
const oa = s`:host{display:inline-flex;outline:none;resize:both;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}.icon{color:currentColor;display:flex;fill:currentColor}.icon ::slotted(*){display:flex}[hasstart] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[hasend] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let aa = class extends ra {
  constructor() {
    super(...arguments), (this.fieldTag = At`md-outlined-field`);
  }
};
(aa.styles = [oa, Vo]), (aa = e([t("md-outlined-text-field")], aa));
var ia = Object.freeze({
  __proto__: null,
  get MdOutlinedTextField() {
    return aa;
  },
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class na extends Bo {
  renderBackground() {
    return J`
      <div class="background"></div>
      <div class="state-layer"></div>
    `;
  }
  renderIndicator() {
    return J`<div class="active-indicator"></div>`;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const sa = s`@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px);--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)))}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}/*# sourceMappingURL=filled-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let la = class extends na {};
(la.styles = [Do, sa]), (la = e([t("md-filled-field")], la));
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const da = s`:host{--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-filled-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-filled-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-filled-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-filled-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-filled-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-filled-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_leading-space: var(--md-filled-text-field-leading-space, 16px);--_trailing-space: var(--md-filled-text-field-trailing-space, 16px);--_top-space: var(--md-filled-text-field-top-space, 16px);--_bottom-space: var(--md-filled-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);--_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);--_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--md-filled-field-active-indicator-color: var(--_active-indicator-color);--md-filled-field-active-indicator-height: var(--_active-indicator-height);--md-filled-field-bottom-space: var(--_bottom-space);--md-filled-field-container-color: var(--_container-color);--md-filled-field-container-shape-end-end: var(--_container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_container-shape-start-start);--md-filled-field-content-color: var(--_input-text-color);--md-filled-field-content-font: var(--_input-text-font);--md-filled-field-content-line-height: var(--_input-text-line-height);--md-filled-field-content-size: var(--_input-text-size);--md-filled-field-content-weight: var(--_input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);--md-filled-field-error-content-color: var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_error-label-text-color);--md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_label-text-color);--md-filled-field-label-text-font: var(--_label-text-font);--md-filled-field-label-text-line-height: var(--_label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_label-text-populated-size);--md-filled-field-label-text-size: var(--_label-text-size);--md-filled-field-label-text-weight: var(--_label-text-weight);--md-filled-field-leading-content-color: var(--_leading-icon-color);--md-filled-field-leading-space: var(--_leading-space);--md-filled-field-supporting-text-color: var(--_supporting-text-color);--md-filled-field-supporting-text-font: var(--_supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_supporting-text-size);--md-filled-field-supporting-text-weight: var(--_supporting-text-weight);--md-filled-field-top-space: var(--_top-space);--md-filled-field-trailing-content-color: var(--_trailing-icon-color);--md-filled-field-trailing-space: var(--_trailing-space);--md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);--md-filled-field-with-label-top-space: var(--_with-label-top-space)}/*# sourceMappingURL=filled-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ class ca extends ta {
  constructor() {
    super(...arguments), (this.fieldTag = At`md-filled-field`);
    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
  }
}
let ha = class extends ca {
  constructor() {
    super(...arguments), (this.fieldTag = At`md-filled-field`);
  }
};
(ha.styles = [oa, da]), (ha = e([t("md-filled-text-field")], ha));
var pa = Object.freeze({
  __proto__: null,
  get MdFilledTextField() {
    return ha;
  },
});
