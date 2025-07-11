import {
  _registerComponent as e,
  registerVersion as t,
  _getProvider,
  getApp as n,
  _removeServiceInstance as i,
  SDK_VERSION as s,
} from "./firebase-app.js";
const stringToByteArray$1 = function (e) {
    const t = [];
    let n = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e.charCodeAt(i);
      s < 128
        ? (t[n++] = s)
        : s < 2048
        ? ((t[n++] = (s >> 6) | 192), (t[n++] = (63 & s) | 128))
        : 55296 == (64512 & s) &&
          i + 1 < e.length &&
          56320 == (64512 & e.charCodeAt(i + 1))
        ? ((s = 65536 + ((1023 & s) << 10) + (1023 & e.charCodeAt(++i))),
          (t[n++] = (s >> 18) | 240),
          (t[n++] = ((s >> 12) & 63) | 128),
          (t[n++] = ((s >> 6) & 63) | 128),
          (t[n++] = (63 & s) | 128))
        : ((t[n++] = (s >> 12) | 224),
          (t[n++] = ((s >> 6) & 63) | 128),
          (t[n++] = (63 & s) | 128));
    }
    return t;
  },
  o = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: "function" == typeof atob,
    encodeByteArray(e, t) {
      if (!Array.isArray(e))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        i = [];
      for (let t = 0; t < e.length; t += 3) {
        const s = e[t],
          o = t + 1 < e.length,
          u = o ? e[t + 1] : 0,
          l = t + 2 < e.length,
          _ = l ? e[t + 2] : 0,
          h = s >> 2,
          d = ((3 & s) << 4) | (u >> 4);
        let m = ((15 & u) << 2) | (_ >> 6),
          f = 63 & _;
        l || ((f = 64), o || (m = 64)), i.push(n[h], n[d], n[m], n[f]);
      }
      return i.join("");
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? btoa(e)
        : this.encodeByteArray(stringToByteArray$1(e), t);
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? atob(e)
        : (function (e) {
            const t = [];
            let n = 0,
              i = 0;
            for (; n < e.length; ) {
              const s = e[n++];
              if (s < 128) t[i++] = String.fromCharCode(s);
              else if (s > 191 && s < 224) {
                const o = e[n++];
                t[i++] = String.fromCharCode(((31 & s) << 6) | (63 & o));
              } else if (s > 239 && s < 365) {
                const o =
                  (((7 & s) << 18) |
                    ((63 & e[n++]) << 12) |
                    ((63 & e[n++]) << 6) |
                    (63 & e[n++])) -
                  65536;
                (t[i++] = String.fromCharCode(55296 + (o >> 10))),
                  (t[i++] = String.fromCharCode(56320 + (1023 & o)));
              } else {
                const o = e[n++],
                  u = e[n++];
                t[i++] = String.fromCharCode(
                  ((15 & s) << 12) | ((63 & o) << 6) | (63 & u)
                );
              }
            }
            return t.join("");
          })(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray(e, t) {
      this.init_();
      const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        i = [];
      for (let t = 0; t < e.length; ) {
        const s = n[e.charAt(t++)],
          o = t < e.length ? n[e.charAt(t)] : 0;
        ++t;
        const u = t < e.length ? n[e.charAt(t)] : 64;
        ++t;
        const l = t < e.length ? n[e.charAt(t)] : 64;
        if ((++t, null == s || null == o || null == u || null == l))
          throw new DecodeBase64StringError();
        const _ = (s << 2) | (o >> 4);
        if ((i.push(_), 64 !== u)) {
          const e = ((o << 4) & 240) | (u >> 2);
          if ((i.push(e), 64 !== l)) {
            const e = ((u << 6) & 192) | l;
            i.push(e);
          }
        }
      }
      return i;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] =
              this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
      }
    },
  };
class DecodeBase64StringError extends Error {
  constructor() {
    super(...arguments), (this.name = "DecodeBase64StringError");
  }
}
const base64urlEncodeWithoutPadding = function (e) {
  return (function (e) {
    const t = stringToByteArray$1(e);
    return o.encodeByteArray(t, !0);
  })(e).replace(/\./g, "");
};
const getDefaultsFromGlobal = () =>
    (function getGlobal() {
      if ("undefined" != typeof self) return self;
      if ("undefined" != typeof window) return window;
      if ("undefined" != typeof global) return global;
      throw new Error("Unable to locate global object.");
    })().__FIREBASE_DEFAULTS__,
  getDefaultsFromCookie = () => {
    if ("undefined" == typeof document) return;
    let e;
    try {
      e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch (e) {
      return;
    }
    const t =
      e &&
      (function (e) {
        try {
          return o.decodeString(e, !0);
        } catch (e) {
          console.error("base64Decode failed: ", e);
        }
        return null;
      })(e[1]);
    return t && JSON.parse(t);
  },
  getDefaults = () => {
    try {
      return (
        getDefaultsFromGlobal() ||
        (() => {
          if ("undefined" == typeof process || void 0 === process.env) return;
          const e = process.env.__FIREBASE_DEFAULTS__;
          return e ? JSON.parse(e) : void 0;
        })() ||
        getDefaultsFromCookie()
      );
    } catch (e) {
      return void console.info(
        `Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`
      );
    }
  },
  getDefaultEmulatorHostnameAndPort = (e) => {
    const t = ((e) => {
      var t, n;
      return null ===
        (n =
          null === (t = getDefaults()) || void 0 === t
            ? void 0
            : t.emulatorHosts) || void 0 === n
        ? void 0
        : n[e];
    })(e);
    if (!t) return;
    const n = t.lastIndexOf(":");
    if (n <= 0 || n + 1 === t.length)
      throw new Error(`Invalid host ${t} with no separate hostname and port!`);
    const i = parseInt(t.substring(n + 1), 10);
    return "[" === t[0] ? [t.substring(1, n - 1), i] : [t.substring(0, n), i];
  };
function getUA() {
  return "undefined" != typeof navigator &&
    "string" == typeof navigator.userAgent
    ? navigator.userAgent
    : "";
}
function isSafari() {
  return (
    !(function isNode() {
      var e;
      const t =
        null === (e = getDefaults()) || void 0 === e
          ? void 0
          : e.forceEnvironment;
      if ("node" === t) return !0;
      if ("browser" === t) return !1;
      try {
        return (
          "[object process]" === Object.prototype.toString.call(global.process)
        );
      } catch (e) {
        return !1;
      }
    })() &&
    navigator.userAgent.includes("Safari") &&
    !navigator.userAgent.includes("Chrome")
  );
}
class FirebaseError extends Error {
  constructor(e, t, n) {
    super(t),
      (this.code = e),
      (this.customData = n),
      (this.name = "FirebaseError"),
      Object.setPrototypeOf(this, FirebaseError.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, ErrorFactory.prototype.create);
  }
}
class ErrorFactory {
  constructor(e, t, n) {
    (this.service = e), (this.serviceName = t), (this.errors = n);
  }
  create(e, ...t) {
    const n = t[0] || {},
      i = `${this.service}/${e}`,
      s = this.errors[e],
      o = s
        ? (function replaceTemplate(e, t) {
            return e.replace(u, (e, n) => {
              const i = t[n];
              return null != i ? String(i) : `<${n}?>`;
            });
          })(s, n)
        : "Error",
      l = `${this.serviceName}: ${o} (${i}).`;
    return new FirebaseError(i, l, n);
  }
}
const u = /\{\$([^}]+)}/g;
function deepEqual(e, t) {
  if (e === t) return !0;
  const n = Object.keys(e),
    i = Object.keys(t);
  for (const s of n) {
    if (!i.includes(s)) return !1;
    const n = e[s],
      o = t[s];
    if (isObject(n) && isObject(o)) {
      if (!deepEqual(n, o)) return !1;
    } else if (n !== o) return !1;
  }
  for (const e of i) if (!n.includes(e)) return !1;
  return !0;
}
function isObject(e) {
  return null !== e && "object" == typeof e;
}
function getModularInstance(e) {
  return e && e._delegate ? e._delegate : e;
}
class Component {
  constructor(e, t, n) {
    (this.name = e),
      (this.instanceFactory = t),
      (this.type = n),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(e) {
    return (this.instantiationMode = e), this;
  }
  setMultipleInstances(e) {
    return (this.multipleInstances = e), this;
  }
  setServiceProps(e) {
    return (this.serviceProps = e), this;
  }
  setInstanceCreatedCallback(e) {
    return (this.onInstanceCreated = e), this;
  }
}
var l;
!(function (e) {
  (e[(e.DEBUG = 0)] = "DEBUG"),
    (e[(e.VERBOSE = 1)] = "VERBOSE"),
    (e[(e.INFO = 2)] = "INFO"),
    (e[(e.WARN = 3)] = "WARN"),
    (e[(e.ERROR = 4)] = "ERROR"),
    (e[(e.SILENT = 5)] = "SILENT");
})(l || (l = {}));
const _ = {
    debug: l.DEBUG,
    verbose: l.VERBOSE,
    info: l.INFO,
    warn: l.WARN,
    error: l.ERROR,
    silent: l.SILENT,
  },
  h = l.INFO,
  d = {
    [l.DEBUG]: "log",
    [l.VERBOSE]: "log",
    [l.INFO]: "info",
    [l.WARN]: "warn",
    [l.ERROR]: "error",
  },
  defaultLogHandler = (e, t, ...n) => {
    if (t < e.logLevel) return;
    const i = new Date().toISOString(),
      s = d[t];
    if (!s)
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${t})`
      );
    console[s](`[${i}]  ${e.name}:`, ...n);
  };
var m,
  f =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {},
  g = g || {},
  E = f || self;
function aa(e) {
  var t = typeof e;
  return (
    "array" ==
      (t = "object" != t ? t : e ? (Array.isArray(e) ? "array" : t) : "null") ||
    ("object" == t && "number" == typeof e.length)
  );
}
function p(e) {
  var t = typeof e;
  return ("object" == t && null != e) || "function" == t;
}
var V = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
  b = 0;
function ea(e, t, n) {
  return e.call.apply(e.bind, arguments);
}
function fa(e, t, n) {
  if (!e) throw Error();
  if (2 < arguments.length) {
    var i = Array.prototype.slice.call(arguments, 2);
    return function () {
      var n = Array.prototype.slice.call(arguments);
      return Array.prototype.unshift.apply(n, i), e.apply(t, n);
    };
  }
  return function () {
    return e.apply(t, arguments);
  };
}
function q$1(e, t, n) {
  return (q$1 =
    Function.prototype.bind &&
    -1 != Function.prototype.bind.toString().indexOf("native code")
      ? ea
      : fa).apply(null, arguments);
}
function ha(e, t) {
  var n = Array.prototype.slice.call(arguments, 1);
  return function () {
    var t = n.slice();
    return t.push.apply(t, arguments), e.apply(this, t);
  };
}
function r(e, t) {
  function c() {}
  (c.prototype = t.prototype),
    (e.$ = t.prototype),
    (e.prototype = new c()),
    (e.prototype.constructor = e),
    (e.ac = function (e, n, i) {
      for (
        var s = Array(arguments.length - 2), o = 2;
        o < arguments.length;
        o++
      )
        s[o - 2] = arguments[o];
      return t.prototype[n].apply(e, s);
    });
}
function v$1() {
  (this.s = this.s), (this.o = this.o);
}
(v$1.prototype.s = !1),
  (v$1.prototype.sa = function () {
    !this.s &&
      ((this.s = !0), this.N(), 0) &&
      (function ba(e) {
        return (
          (Object.prototype.hasOwnProperty.call(e, V) && e[V]) || (e[V] = ++b)
        );
      })(this);
  }),
  (v$1.prototype.N = function () {
    if (this.o) for (; this.o.length; ) this.o.shift()();
  });
const S = Array.prototype.indexOf
  ? function (e, t) {
      return Array.prototype.indexOf.call(e, t, void 0);
    }
  : function (e, t) {
      if ("string" == typeof e)
        return "string" != typeof t || 1 != t.length ? -1 : e.indexOf(t, 0);
      for (let n = 0; n < e.length; n++) if (n in e && e[n] === t) return n;
      return -1;
    };
function ma(e) {
  const t = e.length;
  if (0 < t) {
    const n = Array(t);
    for (let i = 0; i < t; i++) n[i] = e[i];
    return n;
  }
  return [];
}
function na(e, t) {
  for (let t = 1; t < arguments.length; t++) {
    const n = arguments[t];
    if (aa(n)) {
      const t = e.length || 0,
        i = n.length || 0;
      e.length = t + i;
      for (let s = 0; s < i; s++) e[t + s] = n[s];
    } else e.push(n);
  }
}
function w$1(e, t) {
  (this.type = e), (this.g = this.target = t), (this.defaultPrevented = !1);
}
w$1.prototype.h = function () {
  this.defaultPrevented = !0;
};
var v = (function () {
  if (!E.addEventListener || !Object.defineProperty) return !1;
  var e = !1,
    t = Object.defineProperty({}, "passive", {
      get: function () {
        e = !0;
      },
    });
  try {
    const c = () => {};
    E.addEventListener("test", c, t), E.removeEventListener("test", c, t);
  } catch (e) {}
  return e;
})();
function x$1(e) {
  return /^[\s\xa0]*$/.test(e);
}
function pa() {
  var e = E.navigator;
  return e && (e = e.userAgent) ? e : "";
}
function y(e) {
  return -1 != pa().indexOf(e);
}
function qa(e) {
  return qa[" "](e), e;
}
qa[" "] = function () {};
var w,
  D,
  C,
  F = y("Opera"),
  x = y("Trident") || y("MSIE"),
  M = y("Edge"),
  N = M || x,
  k =
    y("Gecko") &&
    !(-1 != pa().toLowerCase().indexOf("webkit") && !y("Edge")) &&
    !(y("Trident") || y("MSIE")) &&
    !y("Edge"),
  O = -1 != pa().toLowerCase().indexOf("webkit") && !y("Edge");
function ya() {
  var e = E.document;
  return e ? e.documentMode : void 0;
}
e: {
  var L = "",
    B =
      ((D = pa()),
      k
        ? /rv:([^\);]+)(\)|;)/.exec(D)
        : M
        ? /Edge\/([\d\.]+)/.exec(D)
        : x
        ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(D)
        : O
        ? /WebKit\/(\S+)/.exec(D)
        : F
        ? /(?:Version)[ \/]?(\S+)/.exec(D)
        : void 0);
  if ((B && (L = B ? B[1] : ""), x)) {
    var q = ya();
    if (null != q && q > parseFloat(L)) {
      w = String(q);
      break e;
    }
  }
  w = L;
}
if (E.document && x) {
  var $ = ya();
  C = $ || parseInt(w, 10) || void 0;
} else C = void 0;
var U = C;
function A(e, t) {
  if (
    (w$1.call(this, e ? e.type : ""),
    (this.relatedTarget = this.g = this.target = null),
    (this.button =
      this.screenY =
      this.screenX =
      this.clientY =
      this.clientX =
        0),
    (this.key = ""),
    (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
    (this.state = null),
    (this.pointerId = 0),
    (this.pointerType = ""),
    (this.i = null),
    e)
  ) {
    var n = (this.type = e.type),
      i =
        e.changedTouches && e.changedTouches.length
          ? e.changedTouches[0]
          : null;
    if (
      ((this.target = e.target || e.srcElement),
      (this.g = t),
      (t = e.relatedTarget))
    ) {
      if (k) {
        e: {
          try {
            qa(t.nodeName);
            var s = !0;
            break e;
          } catch (e) {}
          s = !1;
        }
        s || (t = null);
      }
    } else
      "mouseover" == n
        ? (t = e.fromElement)
        : "mouseout" == n && (t = e.toElement);
    (this.relatedTarget = t),
      i
        ? ((this.clientX = void 0 !== i.clientX ? i.clientX : i.pageX),
          (this.clientY = void 0 !== i.clientY ? i.clientY : i.pageY),
          (this.screenX = i.screenX || 0),
          (this.screenY = i.screenY || 0))
        : ((this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX),
          (this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY),
          (this.screenX = e.screenX || 0),
          (this.screenY = e.screenY || 0)),
      (this.button = e.button),
      (this.key = e.key || ""),
      (this.ctrlKey = e.ctrlKey),
      (this.altKey = e.altKey),
      (this.shiftKey = e.shiftKey),
      (this.metaKey = e.metaKey),
      (this.pointerId = e.pointerId || 0),
      (this.pointerType =
        "string" == typeof e.pointerType
          ? e.pointerType
          : K[e.pointerType] || ""),
      (this.state = e.state),
      (this.i = e),
      e.defaultPrevented && A.$.h.call(this);
  }
}
r(A, w$1);
var K = { 2: "touch", 3: "pen", 4: "mouse" };
A.prototype.h = function () {
  A.$.h.call(this);
  var e = this.i;
  e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
};
var Q = "closure_listenable_" + ((1e6 * Math.random()) | 0),
  G = 0;
function Ja(e, t, n, i, s) {
  (this.listener = e),
    (this.proxy = null),
    (this.src = t),
    (this.type = n),
    (this.capture = !!i),
    (this.la = s),
    (this.key = ++G),
    (this.fa = this.ia = !1);
}
function Ma(e) {
  (e.fa = !0),
    (e.listener = null),
    (e.proxy = null),
    (e.src = null),
    (e.la = null);
}
function Na(e, t, n) {
  for (const i in e) t.call(n, e[i], i, e);
}
function Pa(e) {
  const t = {};
  for (const n in e) t[n] = e[n];
  return t;
}
const z =
  "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
    " "
  );
function Ra(e, t) {
  let n, i;
  for (let t = 1; t < arguments.length; t++) {
    for (n in ((i = arguments[t]), i)) e[n] = i[n];
    for (let t = 0; t < z.length; t++)
      (n = z[t]), Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }
}
function Sa(e) {
  (this.src = e), (this.g = {}), (this.h = 0);
}
function Ua(e, t) {
  var n = t.type;
  if (n in e.g) {
    var i,
      s = e.g[n],
      o = S(s, t);
    (i = 0 <= o) && Array.prototype.splice.call(s, o, 1),
      i && (Ma(t), 0 == e.g[n].length && (delete e.g[n], e.h--));
  }
}
function Ta(e, t, n, i) {
  for (var s = 0; s < e.length; ++s) {
    var o = e[s];
    if (!o.fa && o.listener == t && o.capture == !!n && o.la == i) return s;
  }
  return -1;
}
Sa.prototype.add = function (e, t, n, i, s) {
  var o = e.toString();
  (e = this.g[o]) || ((e = this.g[o] = []), this.h++);
  var u = Ta(e, t, i, s);
  return (
    -1 < u
      ? ((t = e[u]), n || (t.ia = !1))
      : (((t = new Ja(t, this.src, o, !!i, s)).ia = n), e.push(t)),
    t
  );
};
var W = "closure_lm_" + ((1e6 * Math.random()) | 0),
  j = {};
function Ya(e, t, n, i, s) {
  if (i && i.once) return Za(e, t, n, i, s);
  if (Array.isArray(t)) {
    for (var o = 0; o < t.length; o++) Ya(e, t[o], n, i, s);
    return null;
  }
  return (
    (n = $a(n)),
    e && e[Q] ? e.O(t, n, p(i) ? !!i.capture : !!i, s) : ab(e, t, n, !1, i, s)
  );
}
function ab(e, t, n, i, s, o) {
  if (!t) throw Error("Invalid event type");
  var u = p(s) ? !!s.capture : !!s,
    l = bb(e);
  if ((l || (e[W] = l = new Sa(e)), (n = l.add(t, n, i, u, o)).proxy)) return n;
  if (
    ((i = (function cb() {
      function a(t) {
        return e.call(a.src, a.listener, t);
      }
      const e = eb;
      return a;
    })()),
    (n.proxy = i),
    (i.src = e),
    (i.listener = n),
    e.addEventListener)
  )
    v || (s = u),
      void 0 === s && (s = !1),
      e.addEventListener(t.toString(), i, s);
  else if (e.attachEvent) e.attachEvent(db(t.toString()), i);
  else {
    if (!e.addListener || !e.removeListener)
      throw Error("addEventListener and attachEvent are unavailable.");
    e.addListener(i);
  }
  return n;
}
function Za(e, t, n, i, s) {
  if (Array.isArray(t)) {
    for (var o = 0; o < t.length; o++) Za(e, t[o], n, i, s);
    return null;
  }
  return (
    (n = $a(n)),
    e && e[Q] ? e.P(t, n, p(i) ? !!i.capture : !!i, s) : ab(e, t, n, !0, i, s)
  );
}
function fb(e, t, n, i, s) {
  if (Array.isArray(t)) for (var o = 0; o < t.length; o++) fb(e, t[o], n, i, s);
  else
    (i = p(i) ? !!i.capture : !!i),
      (n = $a(n)),
      e && e[Q]
        ? ((e = e.i),
          (t = String(t).toString()) in e.g &&
            -1 < (n = Ta((o = e.g[t]), n, i, s)) &&
            (Ma(o[n]),
            Array.prototype.splice.call(o, n, 1),
            0 == o.length && (delete e.g[t], e.h--)))
        : e &&
          (e = bb(e)) &&
          ((t = e.g[t.toString()]),
          (e = -1),
          t && (e = Ta(t, n, i, s)),
          (n = -1 < e ? t[e] : null) && gb(n));
}
function gb(e) {
  if ("number" != typeof e && e && !e.fa) {
    var t = e.src;
    if (t && t[Q]) Ua(t.i, e);
    else {
      var n = e.type,
        i = e.proxy;
      t.removeEventListener
        ? t.removeEventListener(n, i, e.capture)
        : t.detachEvent
        ? t.detachEvent(db(n), i)
        : t.addListener && t.removeListener && t.removeListener(i),
        (n = bb(t))
          ? (Ua(n, e), 0 == n.h && ((n.src = null), (t[W] = null)))
          : Ma(e);
    }
  }
}
function db(e) {
  return e in j ? j[e] : (j[e] = "on" + e);
}
function eb(e, t) {
  if (e.fa) e = !0;
  else {
    t = new A(t, this);
    var n = e.listener,
      i = e.la || e.src;
    e.ia && gb(e), (e = n.call(i, t));
  }
  return e;
}
function bb(e) {
  return (e = e[W]) instanceof Sa ? e : null;
}
var H = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
function $a(e) {
  return "function" == typeof e
    ? e
    : (e[H] ||
        (e[H] = function (t) {
          return e.handleEvent(t);
        }),
      e[H]);
}
function B$1() {
  v$1.call(this), (this.i = new Sa(this)), (this.S = this), (this.J = null);
}
function C$1(e, t) {
  var n,
    i = e.J;
  if (i) for (n = []; i; i = i.J) n.push(i);
  if (((e = e.S), (i = t.type || t), "string" == typeof t)) t = new w$1(t, e);
  else if (t instanceof w$1) t.target = t.target || e;
  else {
    var s = t;
    Ra((t = new w$1(i, e)), s);
  }
  if (((s = !0), n))
    for (var o = n.length - 1; 0 <= o; o--) {
      var u = (t.g = n[o]);
      s = ib(u, i, !0, t) && s;
    }
  if (((s = ib((u = t.g = e), i, !0, t) && s), (s = ib(u, i, !1, t) && s), n))
    for (o = 0; o < n.length; o++) s = ib((u = t.g = n[o]), i, !1, t) && s;
}
function ib(e, t, n, i) {
  if (!(t = e.i.g[String(t)])) return !0;
  t = t.concat();
  for (var s = !0, o = 0; o < t.length; ++o) {
    var u = t[o];
    if (u && !u.fa && u.capture == n) {
      var l = u.listener,
        _ = u.la || u.src;
      u.ia && Ua(e.i, u), (s = !1 !== l.call(_, i) && s);
    }
  }
  return s && !i.defaultPrevented;
}
r(B$1, v$1),
  (B$1.prototype[Q] = !0),
  (B$1.prototype.removeEventListener = function (e, t, n, i) {
    fb(this, e, t, n, i);
  }),
  (B$1.prototype.N = function () {
    if ((B$1.$.N.call(this), this.i)) {
      var e,
        t = this.i;
      for (e in t.g) {
        for (var n = t.g[e], i = 0; i < n.length; i++) Ma(n[i]);
        delete t.g[e], t.h--;
      }
    }
    this.J = null;
  }),
  (B$1.prototype.O = function (e, t, n, i) {
    return this.i.add(String(e), t, !1, n, i);
  }),
  (B$1.prototype.P = function (e, t, n, i) {
    return this.i.add(String(e), t, !0, n, i);
  });
var Y = E.JSON.stringify;
function lb() {
  var e = ee;
  let t = null;
  return (
    e.g && ((t = e.g), (e.g = e.g.next), e.g || (e.h = null), (t.next = null)),
    t
  );
}
var J = new (class kb {
  constructor(e, t) {
    (this.i = e), (this.j = t), (this.h = 0), (this.g = null);
  }
  get() {
    let e;
    return (
      0 < this.h
        ? (this.h--, (e = this.g), (this.g = e.next), (e.next = null))
        : (e = this.i()),
      e
    );
  }
})(
  () => new pb(),
  (e) => e.reset()
);
class pb {
  constructor() {
    this.next = this.g = this.h = null;
  }
  set(e, t) {
    (this.h = e), (this.g = t), (this.next = null);
  }
  reset() {
    this.next = this.g = this.h = null;
  }
}
function qb(e) {
  var t = 1;
  e = e.split(":");
  const n = [];
  for (; 0 < t && e.length; ) n.push(e.shift()), t--;
  return e.length && n.push(e.join(":")), n;
}
function rb(e) {
  E.setTimeout(() => {
    throw e;
  }, 0);
}
let X,
  Z = !1,
  ee = new (class nb {
    constructor() {
      this.h = this.g = null;
    }
    add(e, t) {
      const n = J.get();
      n.set(e, t), this.h ? (this.h.next = n) : (this.g = n), (this.h = n);
    }
  })(),
  vb = () => {
    const e = E.Promise.resolve(void 0);
    X = () => {
      e.then(ub);
    };
  };
var ub = () => {
  for (var e; (e = lb()); ) {
    try {
      e.h.call(e.g);
    } catch (e) {
      rb(e);
    }
    var t = J;
    t.j(e), 100 > t.h && (t.h++, (e.next = t.g), (t.g = e));
  }
  Z = !1;
};
function wb(e, t) {
  B$1.call(this),
    (this.h = e || 1),
    (this.g = t || E),
    (this.j = q$1(this.qb, this)),
    (this.l = Date.now());
}
function xb(e) {
  (e.ga = !1), e.T && (e.g.clearTimeout(e.T), (e.T = null));
}
function yb(e, t, n) {
  if ("function" == typeof e) n && (e = q$1(e, n));
  else {
    if (!e || "function" != typeof e.handleEvent)
      throw Error("Invalid listener argument");
    e = q$1(e.handleEvent, e);
  }
  return 2147483647 < Number(t) ? -1 : E.setTimeout(e, t || 0);
}
function zb(e) {
  e.g = yb(() => {
    (e.g = null), e.i && ((e.i = !1), zb(e));
  }, e.j);
  const t = e.h;
  (e.h = null), e.m.apply(null, t);
}
r(wb, B$1),
  ((m = wb.prototype).ga = !1),
  (m.T = null),
  (m.qb = function () {
    if (this.ga) {
      var e = Date.now() - this.l;
      0 < e && e < 0.8 * this.h
        ? (this.T = this.g.setTimeout(this.j, this.h - e))
        : (this.T && (this.g.clearTimeout(this.T), (this.T = null)),
          C$1(this, "tick"),
          this.ga && (xb(this), this.start()));
    }
  }),
  (m.start = function () {
    (this.ga = !0),
      this.T ||
        ((this.T = this.g.setTimeout(this.j, this.h)), (this.l = Date.now()));
  }),
  (m.N = function () {
    wb.$.N.call(this), xb(this), delete this.g;
  });
class Ab extends v$1 {
  constructor(e, t) {
    super(),
      (this.m = e),
      (this.j = t),
      (this.h = null),
      (this.i = !1),
      (this.g = null);
  }
  l(e) {
    (this.h = arguments), this.g ? (this.i = !0) : zb(this);
  }
  N() {
    super.N(),
      this.g &&
        (E.clearTimeout(this.g),
        (this.g = null),
        (this.i = !1),
        (this.h = null));
  }
}
function Bb(e) {
  v$1.call(this), (this.h = e), (this.g = {});
}
r(Bb, v$1);
var te = [];
function Eb(e, t, n, i) {
  Array.isArray(n) || (n && (te[0] = n.toString()), (n = te));
  for (var s = 0; s < n.length; s++) {
    var o = Ya(t, n[s], i || e.handleEvent, !1, e.h || e);
    if (!o) break;
    e.g[o.key] = o;
  }
}
function Fb(e) {
  Na(
    e.g,
    function (e, t) {
      this.g.hasOwnProperty(t) && gb(e);
    },
    e
  ),
    (e.g = {});
}
function Gb() {
  this.g = !0;
}
function D$1(e, t, n, i) {
  e.info(function () {
    return (
      "XMLHTTP TEXT (" +
      t +
      "): " +
      (function Jb(e, t) {
        if (!e.g) return t;
        if (!t) return null;
        try {
          var n = JSON.parse(t);
          if (n)
            for (e = 0; e < n.length; e++)
              if (Array.isArray(n[e])) {
                var i = n[e];
                if (!(2 > i.length)) {
                  var s = i[1];
                  if (Array.isArray(s) && !(1 > s.length)) {
                    var o = s[0];
                    if ("noop" != o && "stop" != o && "close" != o)
                      for (var u = 1; u < s.length; u++) s[u] = "";
                  }
                }
              }
          return Y(n);
        } catch (e) {
          return t;
        }
      })(e, n) +
      (i ? " " + i : "")
    );
  });
}
(Bb.prototype.N = function () {
  Bb.$.N.call(this), Fb(this);
}),
  (Bb.prototype.handleEvent = function () {
    throw Error("EventHandler.handleEvent not implemented");
  }),
  (Gb.prototype.Ea = function () {
    this.g = !1;
  }),
  (Gb.prototype.info = function () {});
var ne = {},
  re = null;
function Mb() {
  return (re = re || new B$1());
}
function Nb(e) {
  w$1.call(this, ne.Ta, e);
}
function Ob(e) {
  const t = Mb();
  C$1(t, new Nb(t));
}
function Pb(e, t) {
  w$1.call(this, ne.STAT_EVENT, e), (this.stat = t);
}
function F$1(e) {
  const t = Mb();
  C$1(t, new Pb(t, e));
}
function Qb(e, t) {
  w$1.call(this, ne.Ua, e), (this.size = t);
}
function Rb(e, t) {
  if ("function" != typeof e)
    throw Error("Fn must not be null and must be a function");
  return E.setTimeout(function () {
    e();
  }, t);
}
(ne.Ta = "serverreachability"),
  r(Nb, w$1),
  (ne.STAT_EVENT = "statevent"),
  r(Pb, w$1),
  (ne.Ua = "timingevent"),
  r(Qb, w$1);
var ie = {
    NO_ERROR: 0,
    rb: 1,
    Eb: 2,
    Db: 3,
    yb: 4,
    Cb: 5,
    Fb: 6,
    Qa: 7,
    TIMEOUT: 8,
    Ib: 9,
  },
  se = {
    wb: "complete",
    Sb: "success",
    Ra: "error",
    Qa: "abort",
    Kb: "ready",
    Lb: "readystatechange",
    TIMEOUT: "timeout",
    Gb: "incrementaldata",
    Jb: "progress",
    zb: "downloadprogress",
    $b: "uploadprogress",
  };
function Ub() {}
function Vb(e) {
  return e.h || (e.h = e.i());
}
function Wb() {}
Ub.prototype.h = null;
var oe,
  ae = { OPEN: "a", vb: "b", Ra: "c", Hb: "d" };
function Yb() {
  w$1.call(this, "d");
}
function Zb() {
  w$1.call(this, "c");
}
function ac() {}
function bc(e, t, n, i) {
  (this.l = e),
    (this.j = t),
    (this.m = n),
    (this.W = i || 1),
    (this.U = new Bb(this)),
    (this.P = ce),
    (e = N ? 125 : void 0),
    (this.V = new wb(e)),
    (this.I = null),
    (this.i = !1),
    (this.u = this.B = this.A = this.L = this.G = this.Y = this.C = null),
    (this.F = []),
    (this.g = null),
    (this.o = 0),
    (this.s = this.v = null),
    (this.ca = -1),
    (this.J = !1),
    (this.O = 0),
    (this.M = null),
    (this.ba = this.K = this.aa = this.S = !1),
    (this.h = new dc());
}
function dc() {
  (this.i = null), (this.g = ""), (this.h = !1);
}
r(Yb, w$1),
  r(Zb, w$1),
  r(ac, Ub),
  (ac.prototype.g = function () {
    return new XMLHttpRequest();
  }),
  (ac.prototype.i = function () {
    return {};
  }),
  (oe = new ac());
var ce = 45e3,
  ue = {},
  le = {};
function gc(e, t, n) {
  (e.L = 1), (e.A = hc(G$1(t))), (e.u = n), (e.S = !0), ic(e, null);
}
function ic(e, t) {
  (e.G = Date.now()), jc(e), (e.B = G$1(e.A));
  var n = e.B,
    i = e.W;
  Array.isArray(i) || (i = [String(i)]),
    kc(n.i, "t", i),
    (e.o = 0),
    (n = e.l.J),
    (e.h = new dc()),
    (e.g = lc(e.l, n ? t : null, !e.u)),
    0 < e.O && (e.M = new Ab(q$1(e.Pa, e, e.g), e.O)),
    Eb(e.U, e.g, "readystatechange", e.nb),
    (t = e.I ? Pa(e.I) : {}),
    e.u
      ? (e.v || (e.v = "POST"),
        (t["Content-Type"] = "application/x-www-form-urlencoded"),
        e.g.ha(e.B, e.v, e.u, t))
      : ((e.v = "GET"), e.g.ha(e.B, e.v, null, t)),
    Ob(),
    (function Hb(e, t, n, i, s, o) {
      e.info(function () {
        if (e.g)
          if (o)
            for (var u = "", l = o.split("&"), _ = 0; _ < l.length; _++) {
              var h = l[_].split("=");
              if (1 < h.length) {
                var d = h[0];
                h = h[1];
                var m = d.split("_");
                u =
                  2 <= m.length && "type" == m[1]
                    ? u + (d + "=") + h + "&"
                    : u + (d + "=redacted&");
              }
            }
          else u = null;
        else u = o;
        return (
          "XMLHTTP REQ (" +
          i +
          ") [attempt " +
          s +
          "]: " +
          t +
          "\n" +
          n +
          "\n" +
          u
        );
      });
    })(e.j, e.v, e.B, e.m, e.W, e.u);
}
function oc(e) {
  return !!e.g && "GET" == e.v && 2 != e.L && e.l.Ha;
}
function rc(e, t, n) {
  let i,
    s = !0;
  for (; !e.J && e.o < n.length; ) {
    if (((i = uc(e, n)), i == le)) {
      4 == t && ((e.s = 4), F$1(14), (s = !1)),
        D$1(e.j, e.m, null, "[Incomplete Response]");
      break;
    }
    if (i == ue) {
      (e.s = 4), F$1(15), D$1(e.j, e.m, n, "[Invalid Chunk]"), (s = !1);
      break;
    }
    D$1(e.j, e.m, i, null), qc(e, i);
  }
  oc(e) && 0 != e.o && ((e.h.g = e.h.g.slice(e.o)), (e.o = 0)),
    4 != t || 0 != n.length || e.h.h || ((e.s = 1), F$1(16), (s = !1)),
    (e.i = e.i && s),
    s
      ? 0 < n.length &&
        !e.ba &&
        ((e.ba = !0),
        (t = e.l).g == e &&
          t.ca &&
          !t.M &&
          (t.l.info(
            "Great, no buffering proxy detected. Bytes received: " + n.length
          ),
          vc(t),
          (t.M = !0),
          F$1(11)))
      : (D$1(e.j, e.m, n, "[Invalid Chunked Response]"), I(e), pc(e));
}
function uc(e, t) {
  var n = e.o,
    i = t.indexOf("\n", n);
  return -1 == i
    ? le
    : ((n = Number(t.substring(n, i))),
      isNaN(n)
        ? ue
        : (i += 1) + n > t.length
        ? le
        : ((t = t.slice(i, i + n)), (e.o = i + n), t));
}
function jc(e) {
  (e.Y = Date.now() + e.P), wc(e, e.P);
}
function wc(e, t) {
  if (null != e.C) throw Error("WatchDog timer not null");
  e.C = Rb(q$1(e.lb, e), t);
}
function nc(e) {
  e.C && (E.clearTimeout(e.C), (e.C = null));
}
function pc(e) {
  0 == e.l.H || e.J || sc(e.l, e);
}
function I(e) {
  nc(e);
  var t = e.M;
  t && "function" == typeof t.sa && t.sa(),
    (e.M = null),
    xb(e.V),
    Fb(e.U),
    e.g && ((t = e.g), (e.g = null), t.abort(), t.sa());
}
function qc(e, t) {
  try {
    var n = e.l;
    if (0 != n.H && (n.g == e || xc(n.i, e)))
      if (!e.K && xc(n.i, e) && 3 == n.H) {
        try {
          var i = n.Ja.g.parse(t);
        } catch (e) {
          i = null;
        }
        if (Array.isArray(i) && 3 == i.length) {
          var s = i;
          if (0 == s[0]) {
            e: if (!n.u) {
              if (n.g) {
                if (!(n.g.G + 3e3 < e.G)) break e;
                yc(n), zc(n);
              }
              Ac(n), F$1(18);
            }
          } else
            (n.Fa = s[1]),
              0 < n.Fa - n.V &&
                37500 > s[2] &&
                n.G &&
                0 == n.A &&
                !n.v &&
                (n.v = Rb(q$1(n.ib, n), 6e3));
          if (1 >= Bc(n.i) && n.oa) {
            try {
              n.oa();
            } catch (e) {}
            n.oa = void 0;
          }
        } else J$1(n, 11);
      } else if (((e.K || n.g == e) && yc(n), !x$1(t)))
        for (s = n.Ja.g.parse(t), t = 0; t < s.length; t++) {
          let h = s[t];
          if (((n.V = h[0]), (h = h[1]), 2 == n.H))
            if ("c" == h[0]) {
              (n.K = h[1]), (n.pa = h[2]);
              const t = h[3];
              null != t && ((n.ra = t), n.l.info("VER=" + n.ra));
              const s = h[4];
              null != s && ((n.Ga = s), n.l.info("SVER=" + n.Ga));
              const d = h[5];
              null != d &&
                "number" == typeof d &&
                0 < d &&
                ((i = 1.5 * d),
                (n.L = i),
                n.l.info("backChannelRequestTimeoutMs_=" + i)),
                (i = n);
              const m = e.g;
              if (m) {
                const e = m.g
                  ? m.g.getResponseHeader("X-Client-Wire-Protocol")
                  : null;
                if (e) {
                  var o = i.i;
                  o.g ||
                    (-1 == e.indexOf("spdy") &&
                      -1 == e.indexOf("quic") &&
                      -1 == e.indexOf("h2")) ||
                    ((o.j = o.l),
                    (o.g = new Set()),
                    o.h && (Cc(o, o.h), (o.h = null)));
                }
                if (i.F) {
                  const e = m.g
                    ? m.g.getResponseHeader("X-HTTP-Session-Id")
                    : null;
                  e && ((i.Da = e), K$1(i.I, i.F, e));
                }
              }
              (n.H = 3),
                n.h && n.h.Ba(),
                n.ca &&
                  ((n.S = Date.now() - e.G),
                  n.l.info("Handshake RTT: " + n.S + "ms"));
              var u = e;
              if ((((i = n).wa = Dc(i, i.J ? i.pa : null, i.Y)), u.K)) {
                Ec(i.i, u);
                var l = u,
                  _ = i.L;
                _ && l.setTimeout(_), l.C && (nc(l), jc(l)), (i.g = u);
              } else Fc(i);
              0 < n.j.length && Gc(n);
            } else ("stop" != h[0] && "close" != h[0]) || J$1(n, 7);
          else
            3 == n.H &&
              ("stop" == h[0] || "close" == h[0]
                ? "stop" == h[0]
                  ? J$1(n, 7)
                  : Hc(n)
                : "noop" != h[0] && n.h && n.h.Aa(h),
              (n.A = 0));
        }
    Ob();
  } catch (e) {}
}
function Kc(e, t) {
  if (e.forEach && "function" == typeof e.forEach) e.forEach(t, void 0);
  else if (aa(e) || "string" == typeof e)
    Array.prototype.forEach.call(e, t, void 0);
  else
    for (
      var n = (function Jc(e) {
          if (e.ta && "function" == typeof e.ta) return e.ta();
          if (!e.Z || "function" != typeof e.Z) {
            if ("undefined" != typeof Map && e instanceof Map)
              return Array.from(e.keys());
            if (!("undefined" != typeof Set && e instanceof Set)) {
              if (aa(e) || "string" == typeof e) {
                var t = [];
                e = e.length;
                for (var n = 0; n < e; n++) t.push(n);
                return t;
              }
              (t = []), (n = 0);
              for (const i in e) t[n++] = i;
              return t;
            }
          }
        })(e),
        i = (function Ic(e) {
          if (e.Z && "function" == typeof e.Z) return e.Z();
          if (
            ("undefined" != typeof Map && e instanceof Map) ||
            ("undefined" != typeof Set && e instanceof Set)
          )
            return Array.from(e.values());
          if ("string" == typeof e) return e.split("");
          if (aa(e)) {
            for (var t = [], n = e.length, i = 0; i < n; i++) t.push(e[i]);
            return t;
          }
          for (i in ((t = []), (n = 0), e)) t[n++] = e[i];
          return t;
        })(e),
        s = i.length,
        o = 0;
      o < s;
      o++
    )
      t.call(void 0, i[o], n && n[o], e);
}
((m = bc.prototype).setTimeout = function (e) {
  this.P = e;
}),
  (m.nb = function (e) {
    e = e.target;
    const t = this.M;
    t && 3 == H$1(e) ? t.l() : this.Pa(e);
  }),
  (m.Pa = function (e) {
    try {
      if (e == this.g)
        e: {
          const d = H$1(this.g);
          var t = this.g.Ia();
          this.g.da();
          if (
            !(3 > d) &&
            (3 != d || N || (this.g && (this.h.h || this.g.ja() || mc(this.g))))
          ) {
            this.J || 4 != d || 7 == t || Ob(), nc(this);
            var n = this.g.da();
            this.ca = n;
            t: if (oc(this)) {
              var i = mc(this.g);
              e = "";
              var s = i.length,
                o = 4 == H$1(this.g);
              if (!this.h.i) {
                if ("undefined" == typeof TextDecoder) {
                  I(this), pc(this);
                  var u = "";
                  break t;
                }
                this.h.i = new E.TextDecoder();
              }
              for (t = 0; t < s; t++)
                (this.h.h = !0),
                  (e += this.h.i.decode(i[t], { stream: o && t == s - 1 }));
              (i.length = 0), (this.h.g += e), (this.o = 0), (u = this.h.g);
            } else u = this.g.ja();
            if (
              ((this.i = 200 == n),
              (function Ib(e, t, n, i, s, o, u) {
                e.info(function () {
                  return (
                    "XMLHTTP RESP (" +
                    i +
                    ") [ attempt " +
                    s +
                    "]: " +
                    t +
                    "\n" +
                    n +
                    "\n" +
                    o +
                    " " +
                    u
                  );
                });
              })(this.j, this.v, this.B, this.m, this.W, d, n),
              this.i)
            ) {
              if (this.aa && !this.K) {
                t: {
                  if (this.g) {
                    var l,
                      _ = this.g;
                    if (
                      (l = _.g
                        ? _.g.getResponseHeader("X-HTTP-Initial-Response")
                        : null) &&
                      !x$1(l)
                    ) {
                      var h = l;
                      break t;
                    }
                  }
                  h = null;
                }
                if (!(n = h)) {
                  (this.i = !1), (this.s = 3), F$1(12), I(this), pc(this);
                  break e;
                }
                D$1(
                  this.j,
                  this.m,
                  n,
                  "Initial handshake response via X-HTTP-Initial-Response"
                ),
                  (this.K = !0),
                  qc(this, n);
              }
              this.S
                ? (rc(this, d, u),
                  N &&
                    this.i &&
                    3 == d &&
                    (Eb(this.U, this.V, "tick", this.mb), this.V.start()))
                : (D$1(this.j, this.m, u, null), qc(this, u)),
                4 == d && I(this),
                this.i &&
                  !this.J &&
                  (4 == d ? sc(this.l, this) : ((this.i = !1), jc(this)));
            } else
              (function tc(e) {
                const t = {};
                e = (
                  (e.g && 2 <= H$1(e) && e.g.getAllResponseHeaders()) ||
                  ""
                ).split("\r\n");
                for (let i = 0; i < e.length; i++) {
                  if (x$1(e[i])) continue;
                  var n = qb(e[i]);
                  const s = n[0];
                  if ("string" != typeof (n = n[1])) continue;
                  n = n.trim();
                  const o = t[s] || [];
                  (t[s] = o), o.push(n);
                }
                !(function Oa(e, t) {
                  for (const n in e) t.call(void 0, e[n], n, e);
                })(t, function (e) {
                  return e.join(", ");
                });
              })(this.g),
                400 == n && 0 < u.indexOf("Unknown SID")
                  ? ((this.s = 3), F$1(12))
                  : ((this.s = 0), F$1(13)),
                I(this),
                pc(this);
          }
        }
    } catch (e) {}
  }),
  (m.mb = function () {
    if (this.g) {
      var e = H$1(this.g),
        t = this.g.ja();
      this.o < t.length &&
        (nc(this), rc(this, e, t), this.i && 4 != e && jc(this));
    }
  }),
  (m.cancel = function () {
    (this.J = !0), I(this);
  }),
  (m.lb = function () {
    this.C = null;
    const e = Date.now();
    0 <= e - this.Y
      ? ((function Kb(e, t) {
          e.info(function () {
            return "TIMEOUT: " + t;
          });
        })(this.j, this.B),
        2 != this.L && (Ob(), F$1(17)),
        I(this),
        (this.s = 2),
        pc(this))
      : wc(this, this.Y - e);
  });
var _e = RegExp(
  "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
);
function M$1(e) {
  if (
    ((this.g = this.s = this.j = ""),
    (this.m = null),
    (this.o = this.l = ""),
    (this.h = !1),
    e instanceof M$1)
  ) {
    (this.h = e.h),
      Nc(this, e.j),
      (this.s = e.s),
      (this.g = e.g),
      Oc(this, e.m),
      (this.l = e.l);
    var t = e.i,
      n = new Pc();
    (n.i = t.i),
      t.g && ((n.g = new Map(t.g)), (n.h = t.h)),
      Qc(this, n),
      (this.o = e.o);
  } else
    e && (t = String(e).match(_e))
      ? ((this.h = !1),
        Nc(this, t[1] || "", !0),
        (this.s = Rc(t[2] || "")),
        (this.g = Rc(t[3] || "", !0)),
        Oc(this, t[4]),
        (this.l = Rc(t[5] || "", !0)),
        Qc(this, t[6] || "", !0),
        (this.o = Rc(t[7] || "")))
      : ((this.h = !1), (this.i = new Pc(null, this.h)));
}
function G$1(e) {
  return new M$1(e);
}
function Nc(e, t, n) {
  (e.j = n ? Rc(t, !0) : t), e.j && (e.j = e.j.replace(/:$/, ""));
}
function Oc(e, t) {
  if (t) {
    if (((t = Number(t)), isNaN(t) || 0 > t))
      throw Error("Bad port number " + t);
    e.m = t;
  } else e.m = null;
}
function Qc(e, t, n) {
  t instanceof Pc
    ? ((e.i = t),
      (function Xc(e, t) {
        t &&
          !e.j &&
          (N$1(e),
          (e.i = null),
          e.g.forEach(function (e, t) {
            var n = t.toLowerCase();
            t != n && ($c(this, t), kc(this, n, e));
          }, e)),
          (e.j = t);
      })(e.i, e.h))
    : (n || (t = Sc(t, fe)), (e.i = new Pc(t, e.h)));
}
function K$1(e, t, n) {
  e.i.set(t, n);
}
function hc(e) {
  return (
    K$1(
      e,
      "zx",
      Math.floor(2147483648 * Math.random()).toString(36) +
        Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(
          36
        )
    ),
    e
  );
}
function Rc(e, t) {
  return e
    ? t
      ? decodeURI(e.replace(/%25/g, "%2525"))
      : decodeURIComponent(e)
    : "";
}
function Sc(e, t, n) {
  return "string" == typeof e
    ? ((e = encodeURI(e).replace(t, Zc)),
      n && (e = e.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
      e)
    : null;
}
function Zc(e) {
  return (
    "%" +
    (((e = e.charCodeAt(0)) >> 4) & 15).toString(16) +
    (15 & e).toString(16)
  );
}
M$1.prototype.toString = function () {
  var e = [],
    t = this.j;
  t && e.push(Sc(t, he, !0), ":");
  var n = this.g;
  return (
    (n || "file" == t) &&
      (e.push("//"),
      (t = this.s) && e.push(Sc(t, he, !0), "@"),
      e.push(
        encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")
      ),
      null != (n = this.m) && e.push(":", String(n))),
    (n = this.l) &&
      (this.g && "/" != n.charAt(0) && e.push("/"),
      e.push(Sc(n, "/" == n.charAt(0) ? me : de, !0))),
    (n = this.i.toString()) && e.push("?", n),
    (n = this.o) && e.push("#", Sc(n, ge)),
    e.join("")
  );
};
var he = /[#\/\?@]/g,
  de = /[#\?:]/g,
  me = /[#\?]/g,
  fe = /[#\?@]/g,
  ge = /#/g;
function Pc(e, t) {
  (this.h = this.g = null), (this.i = e || null), (this.j = !!t);
}
function N$1(e) {
  e.g ||
    ((e.g = new Map()),
    (e.h = 0),
    e.i &&
      (function Mc(e, t) {
        if (e) {
          e = e.split("&");
          for (var n = 0; n < e.length; n++) {
            var i = e[n].indexOf("="),
              s = null;
            if (0 <= i) {
              var o = e[n].substring(0, i);
              s = e[n].substring(i + 1);
            } else o = e[n];
            t(o, s ? decodeURIComponent(s.replace(/\+/g, " ")) : "");
          }
        }
      })(e.i, function (t, n) {
        e.add(decodeURIComponent(t.replace(/\+/g, " ")), n);
      }));
}
function $c(e, t) {
  N$1(e),
    (t = O$1(e, t)),
    e.g.has(t) && ((e.i = null), (e.h -= e.g.get(t).length), e.g.delete(t));
}
function ad(e, t) {
  return N$1(e), (t = O$1(e, t)), e.g.has(t);
}
function kc(e, t, n) {
  $c(e, t),
    0 < n.length &&
      ((e.i = null), e.g.set(O$1(e, t), ma(n)), (e.h += n.length));
}
function O$1(e, t) {
  return (t = String(t)), e.j && (t = t.toLowerCase()), t;
}
((m = Pc.prototype).add = function (e, t) {
  N$1(this), (this.i = null), (e = O$1(this, e));
  var n = this.g.get(e);
  return n || this.g.set(e, (n = [])), n.push(t), (this.h += 1), this;
}),
  (m.forEach = function (e, t) {
    N$1(this),
      this.g.forEach(function (n, i) {
        n.forEach(function (n) {
          e.call(t, n, i, this);
        }, this);
      }, this);
  }),
  (m.ta = function () {
    N$1(this);
    const e = Array.from(this.g.values()),
      t = Array.from(this.g.keys()),
      n = [];
    for (let i = 0; i < t.length; i++) {
      const s = e[i];
      for (let e = 0; e < s.length; e++) n.push(t[i]);
    }
    return n;
  }),
  (m.Z = function (e) {
    N$1(this);
    let t = [];
    if ("string" == typeof e)
      ad(this, e) && (t = t.concat(this.g.get(O$1(this, e))));
    else {
      e = Array.from(this.g.values());
      for (let n = 0; n < e.length; n++) t = t.concat(e[n]);
    }
    return t;
  }),
  (m.set = function (e, t) {
    return (
      N$1(this),
      (this.i = null),
      ad(this, (e = O$1(this, e))) && (this.h -= this.g.get(e).length),
      this.g.set(e, [t]),
      (this.h += 1),
      this
    );
  }),
  (m.get = function (e, t) {
    return e && 0 < (e = this.Z(e)).length ? String(e[0]) : t;
  }),
  (m.toString = function () {
    if (this.i) return this.i;
    if (!this.g) return "";
    const e = [],
      t = Array.from(this.g.keys());
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      const o = encodeURIComponent(String(i)),
        u = this.Z(i);
      for (i = 0; i < u.length; i++) {
        var s = o;
        "" !== u[i] && (s += "=" + encodeURIComponent(String(u[i]))), e.push(s);
      }
    }
    return (this.i = e.join("&"));
  });
function cd(e) {
  (this.l = e || Ie),
    E.PerformanceNavigationTiming
      ? (e =
          0 < (e = E.performance.getEntriesByType("navigation")).length &&
          ("hq" == e[0].nextHopProtocol || "h2" == e[0].nextHopProtocol))
      : (e = !!(E.g && E.g.Ka && E.g.Ka() && E.g.Ka().dc)),
    (this.j = e ? this.l : 1),
    (this.g = null),
    1 < this.j && (this.g = new Set()),
    (this.h = null),
    (this.i = []);
}
var Ie = 10;
function ed(e) {
  return !!e.h || (!!e.g && e.g.size >= e.j);
}
function Bc(e) {
  return e.h ? 1 : e.g ? e.g.size : 0;
}
function xc(e, t) {
  return e.h ? e.h == t : !!e.g && e.g.has(t);
}
function Cc(e, t) {
  e.g ? e.g.add(t) : (e.h = t);
}
function Ec(e, t) {
  e.h && e.h == t ? (e.h = null) : e.g && e.g.has(t) && e.g.delete(t);
}
function fd(e) {
  if (null != e.h) return e.i.concat(e.h.F);
  if (null != e.g && 0 !== e.g.size) {
    let t = e.i;
    for (const n of e.g.values()) t = t.concat(n.F);
    return t;
  }
  return ma(e.i);
}
cd.prototype.cancel = function () {
  if (((this.i = fd(this)), this.h)) this.h.cancel(), (this.h = null);
  else if (this.g && 0 !== this.g.size) {
    for (const e of this.g.values()) e.cancel();
    this.g.clear();
  }
};
function hd() {
  this.g = new (class {
    stringify(e) {
      return E.JSON.stringify(e, void 0);
    }
    parse(e) {
      return E.JSON.parse(e, void 0);
    }
  })();
}
function id(e, t, n) {
  const i = n || "";
  try {
    Kc(e, function (e, n) {
      let s = e;
      p(e) && (s = Y(e)), t.push(i + n + "=" + encodeURIComponent(s));
    });
  } catch (e) {
    throw (t.push(i + "type=" + encodeURIComponent("_badmap")), e);
  }
}
function kd(e, t, n, i, s) {
  try {
    (t.onload = null),
      (t.onerror = null),
      (t.onabort = null),
      (t.ontimeout = null),
      s(i);
  } catch (e) {}
}
function ld(e) {
  (this.l = e.ec || null), (this.j = e.ob || !1);
}
function md(e, t) {
  B$1.call(this),
    (this.F = e),
    (this.u = t),
    (this.m = void 0),
    (this.readyState = pe),
    (this.status = 0),
    (this.responseType =
      this.responseText =
      this.response =
      this.statusText =
        ""),
    (this.onreadystatechange = null),
    (this.v = new Headers()),
    (this.h = null),
    (this.C = "GET"),
    (this.B = ""),
    (this.g = !1),
    (this.A = this.j = this.l = null);
}
r(ld, Ub),
  (ld.prototype.g = function () {
    return new md(this.l, this.j);
  }),
  (ld.prototype.i = (function (e) {
    return function () {
      return e;
    };
  })({})),
  r(md, B$1);
var pe = 0;
function qd(e) {
  e.j.read().then(e.Xa.bind(e)).catch(e.ka.bind(e));
}
function pd(e) {
  (e.readyState = 4), (e.l = null), (e.j = null), (e.A = null), od(e);
}
function od(e) {
  e.onreadystatechange && e.onreadystatechange.call(e);
}
((m = md.prototype).open = function (e, t) {
  if (this.readyState != pe)
    throw (this.abort(), Error("Error reopening a connection"));
  (this.C = e), (this.B = t), (this.readyState = 1), od(this);
}),
  (m.send = function (e) {
    if (1 != this.readyState)
      throw (this.abort(), Error("need to call open() first. "));
    this.g = !0;
    const t = {
      headers: this.v,
      method: this.C,
      credentials: this.m,
      cache: void 0,
    };
    e && (t.body = e),
      (this.F || E)
        .fetch(new Request(this.B, t))
        .then(this.$a.bind(this), this.ka.bind(this));
  }),
  (m.abort = function () {
    (this.response = this.responseText = ""),
      (this.v = new Headers()),
      (this.status = 0),
      this.j && this.j.cancel("Request was aborted.").catch(() => {}),
      1 <= this.readyState &&
        this.g &&
        4 != this.readyState &&
        ((this.g = !1), pd(this)),
      (this.readyState = pe);
  }),
  (m.$a = function (e) {
    if (
      this.g &&
      ((this.l = e),
      this.h ||
        ((this.status = this.l.status),
        (this.statusText = this.l.statusText),
        (this.h = e.headers),
        (this.readyState = 2),
        od(this)),
      this.g && ((this.readyState = 3), od(this), this.g))
    )
      if ("arraybuffer" === this.responseType)
        e.arrayBuffer().then(this.Ya.bind(this), this.ka.bind(this));
      else if (void 0 !== E.ReadableStream && "body" in e) {
        if (((this.j = e.body.getReader()), this.u)) {
          if (this.responseType)
            throw Error(
              'responseType must be empty for "streamBinaryChunks" mode responses.'
            );
          this.response = [];
        } else
          (this.response = this.responseText = ""),
            (this.A = new TextDecoder());
        qd(this);
      } else e.text().then(this.Za.bind(this), this.ka.bind(this));
  }),
  (m.Xa = function (e) {
    if (this.g) {
      if (this.u && e.value) this.response.push(e.value);
      else if (!this.u) {
        var t = e.value ? e.value : new Uint8Array(0);
        (t = this.A.decode(t, { stream: !e.done })) &&
          (this.response = this.responseText += t);
      }
      e.done ? pd(this) : od(this), 3 == this.readyState && qd(this);
    }
  }),
  (m.Za = function (e) {
    this.g && ((this.response = this.responseText = e), pd(this));
  }),
  (m.Ya = function (e) {
    this.g && ((this.response = e), pd(this));
  }),
  (m.ka = function () {
    this.g && pd(this);
  }),
  (m.setRequestHeader = function (e, t) {
    this.v.append(e, t);
  }),
  (m.getResponseHeader = function (e) {
    return (this.h && this.h.get(e.toLowerCase())) || "";
  }),
  (m.getAllResponseHeaders = function () {
    if (!this.h) return "";
    const e = [],
      t = this.h.entries();
    for (var n = t.next(); !n.done; )
      (n = n.value), e.push(n[0] + ": " + n[1]), (n = t.next());
    return e.join("\r\n");
  }),
  Object.defineProperty(md.prototype, "withCredentials", {
    get: function () {
      return "include" === this.m;
    },
    set: function (e) {
      this.m = e ? "include" : "same-origin";
    },
  });
var Te = E.JSON.parse;
function P(e) {
  B$1.call(this),
    (this.headers = new Map()),
    (this.u = e || null),
    (this.h = !1),
    (this.C = this.g = null),
    (this.I = ""),
    (this.m = 0),
    (this.j = ""),
    (this.l = this.G = this.v = this.F = !1),
    (this.B = 0),
    (this.A = null),
    (this.K = Ee),
    (this.L = this.M = !1);
}
r(P, B$1);
var Ee = "",
  Pe = /^https?$/i,
  Ae = ["POST", "PUT"];
function vd(e, t) {
  (e.h = !1),
    e.g && ((e.l = !0), e.g.abort(), (e.l = !1)),
    (e.j = t),
    (e.m = 5),
    yd(e),
    zd(e);
}
function yd(e) {
  e.F || ((e.F = !0), C$1(e, "complete"), C$1(e, "error"));
}
function Ad(e) {
  if (e.h && void 0 !== g && (!e.C[1] || 4 != H$1(e) || 2 != e.da()))
    if (e.v && 4 == H$1(e)) yb(e.La, 0, e);
    else if ((C$1(e, "readystatechange"), 4 == H$1(e))) {
      e.h = !1;
      try {
        const u = e.da();
        e: switch (u) {
          case 200:
          case 201:
          case 202:
          case 204:
          case 206:
          case 304:
          case 1223:
            var t = !0;
            break e;
          default:
            t = !1;
        }
        var n;
        if (!(n = t)) {
          var i;
          if ((i = 0 === u)) {
            var s = String(e.I).match(_e)[1] || null;
            !s &&
              E.self &&
              E.self.location &&
              (s = E.self.location.protocol.slice(0, -1)),
              (i = !Pe.test(s ? s.toLowerCase() : ""));
          }
          n = i;
        }
        if (n) C$1(e, "complete"), C$1(e, "success");
        else {
          e.m = 6;
          try {
            var o = 2 < H$1(e) ? e.g.statusText : "";
          } catch (e) {
            o = "";
          }
          (e.j = o + " [" + e.da() + "]"), yd(e);
        }
      } finally {
        zd(e);
      }
    }
}
function zd(e, t) {
  if (e.g) {
    wd(e);
    const n = e.g,
      i = e.C[0] ? () => {} : null;
    (e.g = null), (e.C = null), t || C$1(e, "ready");
    try {
      n.onreadystatechange = i;
    } catch (e) {}
  }
}
function wd(e) {
  e.g && e.L && (e.g.ontimeout = null),
    e.A && (E.clearTimeout(e.A), (e.A = null));
}
function H$1(e) {
  return e.g ? e.g.readyState : 0;
}
function mc(e) {
  try {
    if (!e.g) return null;
    if ("response" in e.g) return e.g.response;
    switch (e.K) {
      case Ee:
      case "text":
        return e.g.responseText;
      case "arraybuffer":
        if ("mozResponseArrayBuffer" in e.g) return e.g.mozResponseArrayBuffer;
    }
    return null;
  } catch (e) {
    return null;
  }
}
function Bd(e) {
  let t = "";
  return (
    Na(e, function (e, n) {
      (t += n), (t += ":"), (t += e), (t += "\r\n");
    }),
    t
  );
}
function Cd(e, t, n) {
  e: {
    for (i in n) {
      var i = !1;
      break e;
    }
    i = !0;
  }
  i ||
    ((n = Bd(n)),
    "string" == typeof e
      ? null != n && encodeURIComponent(String(n))
      : K$1(e, t, n));
}
function Dd(e, t, n) {
  return (n && n.internalChannelParams && n.internalChannelParams[e]) || t;
}
function Ed(e) {
  (this.Ga = 0),
    (this.j = []),
    (this.l = new Gb()),
    (this.pa =
      this.wa =
      this.I =
      this.Y =
      this.g =
      this.Da =
      this.F =
      this.na =
      this.o =
      this.U =
      this.s =
        null),
    (this.fb = this.W = 0),
    (this.cb = Dd("failFast", !1, e)),
    (this.G = this.v = this.u = this.m = this.h = null),
    (this.aa = !0),
    (this.Fa = this.V = -1),
    (this.ba = this.A = this.C = 0),
    (this.ab = Dd("baseRetryDelayMs", 5e3, e)),
    (this.hb = Dd("retryDelaySeedMs", 1e4, e)),
    (this.eb = Dd("forwardChannelMaxRetries", 2, e)),
    (this.xa = Dd("forwardChannelRequestTimeoutMs", 2e4, e)),
    (this.va = (e && e.xmlHttpFactory) || void 0),
    (this.Ha = (e && e.useFetchStreams) || !1),
    (this.L = void 0),
    (this.J = (e && e.supportsCrossDomainXhr) || !1),
    (this.K = ""),
    (this.i = new cd(e && e.concurrentRequestLimit)),
    (this.Ja = new hd()),
    (this.P = (e && e.fastHandshake) || !1),
    (this.O = (e && e.encodeInitMessageHeaders) || !1),
    this.P && this.O && (this.O = !1),
    (this.bb = (e && e.bc) || !1),
    e && e.Ea && this.l.Ea(),
    e && e.forceLongPolling && (this.aa = !1),
    (this.ca = (!this.P && this.aa && e && e.detectBufferingProxy) || !1),
    (this.qa = void 0),
    e &&
      e.longPollingTimeout &&
      0 < e.longPollingTimeout &&
      (this.qa = e.longPollingTimeout),
    (this.oa = void 0),
    (this.S = 0),
    (this.M = !1),
    (this.ma = this.B = null);
}
function Hc(e) {
  if ((Fd(e), 3 == e.H)) {
    var t = e.W++,
      n = G$1(e.I);
    if (
      (K$1(n, "SID", e.K),
      K$1(n, "RID", t),
      K$1(n, "TYPE", "terminate"),
      Gd(e, n),
      ((t = new bc(e, e.l, t)).L = 2),
      (t.A = hc(G$1(n))),
      (n = !1),
      E.navigator && E.navigator.sendBeacon)
    )
      try {
        n = E.navigator.sendBeacon(t.A.toString(), "");
      } catch (e) {}
    !n && E.Image && ((new Image().src = t.A), (n = !0)),
      n || ((t.g = lc(t.l, null)), t.g.ha(t.A)),
      (t.G = Date.now()),
      jc(t);
  }
  Hd(e);
}
function zc(e) {
  e.g && (vc(e), e.g.cancel(), (e.g = null));
}
function Fd(e) {
  zc(e),
    e.u && (E.clearTimeout(e.u), (e.u = null)),
    yc(e),
    e.i.cancel(),
    e.m && ("number" == typeof e.m && E.clearTimeout(e.m), (e.m = null));
}
function Gc(e) {
  if (!ed(e.i) && !e.m) {
    e.m = !0;
    var t = e.Na;
    X || vb(), Z || (X(), (Z = !0)), ee.add(t, e), (e.C = 0);
  }
}
function Ld(e, t) {
  var n;
  n = t ? t.m : e.W++;
  const i = G$1(e.I);
  K$1(i, "SID", e.K),
    K$1(i, "RID", n),
    K$1(i, "AID", e.V),
    Gd(e, i),
    e.o && e.s && Cd(i, e.o, e.s),
    (n = new bc(e, e.l, n, e.C + 1)),
    null === e.o && (n.I = e.s),
    t && (e.j = t.F.concat(e.j)),
    (t = Kd(e, n, 1e3)),
    n.setTimeout(
      Math.round(0.5 * e.xa) + Math.round(0.5 * e.xa * Math.random())
    ),
    Cc(e.i, n),
    gc(n, i, t);
}
function Gd(e, t) {
  e.na &&
    Na(e.na, function (e, n) {
      K$1(t, n, e);
    }),
    e.h &&
      Kc({}, function (e, n) {
        K$1(t, n, e);
      });
}
function Kd(e, t, n) {
  n = Math.min(e.j.length, n);
  var i = e.h ? q$1(e.h.Va, e.h, e) : null;
  e: {
    var s = e.j;
    let t = -1;
    for (;;) {
      const e = ["count=" + n];
      -1 == t
        ? 0 < n
          ? ((t = s[0].g), e.push("ofs=" + t))
          : (t = 0)
        : e.push("ofs=" + t);
      let o = !0;
      for (let u = 0; u < n; u++) {
        let n = s[u].g;
        const l = s[u].map;
        if (((n -= t), 0 > n)) (t = Math.max(0, s[u].g - 100)), (o = !1);
        else
          try {
            id(l, e, "req" + n + "_");
          } catch (e) {
            i && i(l);
          }
      }
      if (o) {
        i = e.join("&");
        break e;
      }
    }
  }
  return (e = e.j.splice(0, n)), (t.F = e), i;
}
function Fc(e) {
  if (!e.g && !e.u) {
    e.ba = 1;
    var t = e.Ma;
    X || vb(), Z || (X(), (Z = !0)), ee.add(t, e), (e.A = 0);
  }
}
function Ac(e) {
  return (
    !(e.g || e.u || 3 <= e.A) &&
    (e.ba++, (e.u = Rb(q$1(e.Ma, e), Jd(e, e.A))), e.A++, !0)
  );
}
function vc(e) {
  null != e.B && (E.clearTimeout(e.B), (e.B = null));
}
function Md(e) {
  (e.g = new bc(e, e.l, "rpc", e.ba)),
    null === e.o && (e.g.I = e.s),
    (e.g.O = 0);
  var t = G$1(e.wa);
  K$1(t, "RID", "rpc"),
    K$1(t, "SID", e.K),
    K$1(t, "AID", e.V),
    K$1(t, "CI", e.G ? "0" : "1"),
    !e.G && e.qa && K$1(t, "TO", e.qa),
    K$1(t, "TYPE", "xmlhttp"),
    Gd(e, t),
    e.o && e.s && Cd(t, e.o, e.s),
    e.L && e.g.setTimeout(e.L);
  var n = e.g;
  (e = e.pa), (n.L = 1), (n.A = hc(G$1(t))), (n.u = null), (n.S = !0), ic(n, e);
}
function yc(e) {
  null != e.v && (E.clearTimeout(e.v), (e.v = null));
}
function sc(e, t) {
  var n = null;
  if (e.g == t) {
    yc(e), vc(e), (e.g = null);
    var i = 2;
  } else {
    if (!xc(e.i, t)) return;
    (n = t.F), Ec(e.i, t), (i = 1);
  }
  if (0 != e.H)
    if (t.i)
      if (1 == i) {
        (n = t.u ? t.u.length : 0), (t = Date.now() - t.G);
        var s = e.C;
        C$1((i = Mb()), new Qb(i, n)), Gc(e);
      } else Fc(e);
    else if (
      3 == (s = t.s) ||
      (0 == s && 0 < t.ca) ||
      !(
        (1 == i &&
          (function Id(e, t) {
            return !(
              Bc(e.i) >= e.i.j - (e.m ? 1 : 0) ||
              (e.m
                ? ((e.j = t.F.concat(e.j)), 0)
                : 1 == e.H ||
                  2 == e.H ||
                  e.C >= (e.cb ? 0 : e.eb) ||
                  ((e.m = Rb(q$1(e.Na, e, t), Jd(e, e.C))), e.C++, 0))
            );
          })(e, t)) ||
        (2 == i && Ac(e))
      )
    )
      switch ((n && 0 < n.length && ((t = e.i), (t.i = t.i.concat(n))), s)) {
        case 1:
          J$1(e, 5);
          break;
        case 4:
          J$1(e, 10);
          break;
        case 3:
          J$1(e, 6);
          break;
        default:
          J$1(e, 2);
      }
}
function Jd(e, t) {
  let n = e.ab + Math.floor(Math.random() * e.hb);
  return e.isActive() || (n *= 2), n * t;
}
function J$1(e, t) {
  if ((e.l.info("Error code " + t), 2 == t)) {
    var n = null;
    e.h && (n = null);
    var i = q$1(e.pb, e);
    n ||
      ((n = new M$1("//www.google.com/images/cleardot.gif")),
      (E.location && "http" == E.location.protocol) || Nc(n, "https"),
      hc(n)),
      (function jd(e, t) {
        const n = new Gb();
        if (E.Image) {
          const i = new Image();
          (i.onload = ha(kd, n, i, "TestLoadImage: loaded", !0, t)),
            (i.onerror = ha(kd, n, i, "TestLoadImage: error", !1, t)),
            (i.onabort = ha(kd, n, i, "TestLoadImage: abort", !1, t)),
            (i.ontimeout = ha(kd, n, i, "TestLoadImage: timeout", !1, t)),
            E.setTimeout(function () {
              i.ontimeout && i.ontimeout();
            }, 1e4),
            (i.src = e);
        } else t(!1);
      })(n.toString(), i);
  } else F$1(2);
  (e.H = 0), e.h && e.h.za(t), Hd(e), Fd(e);
}
function Hd(e) {
  if (((e.H = 0), (e.ma = []), e.h)) {
    const t = fd(e.i);
    (0 == t.length && 0 == e.j.length) ||
      (na(e.ma, t),
      na(e.ma, e.j),
      (e.i.i.length = 0),
      ma(e.j),
      (e.j.length = 0)),
      e.h.ya();
  }
}
function Dc(e, t, n) {
  var i = n instanceof M$1 ? G$1(n) : new M$1(n);
  if ("" != i.g) t && (i.g = t + "." + i.g), Oc(i, i.m);
  else {
    var s = E.location;
    (i = s.protocol),
      (t = t ? t + "." + s.hostname : s.hostname),
      (s = +s.port);
    var o = new M$1(null);
    i && Nc(o, i), t && (o.g = t), s && Oc(o, s), n && (o.l = n), (i = o);
  }
  return (
    (n = e.F),
    (t = e.Da),
    n && t && K$1(i, n, t),
    K$1(i, "VER", e.ra),
    Gd(e, i),
    i
  );
}
function lc(e, t, n) {
  if (t && !e.J)
    throw Error("Can't create secondary domain capable XhrIo object.");
  return (
    (t = e.Ha && !e.va ? new P(new ld({ ob: n })) : new P(e.va)).Oa(e.J), t
  );
}
function Nd() {}
function Od() {
  if (x && !(10 <= Number(U)))
    throw Error("Environmental error: no available transport.");
}
function Q$1(e, t) {
  B$1.call(this),
    (this.g = new Ed(t)),
    (this.l = e),
    (this.h = (t && t.messageUrlParams) || null),
    (e = (t && t.messageHeaders) || null),
    t &&
      t.clientProtocolHeaderRequired &&
      (e
        ? (e["X-Client-Protocol"] = "webchannel")
        : (e = { "X-Client-Protocol": "webchannel" })),
    (this.g.s = e),
    (e = (t && t.initMessageHeaders) || null),
    t &&
      t.messageContentType &&
      (e
        ? (e["X-WebChannel-Content-Type"] = t.messageContentType)
        : (e = { "X-WebChannel-Content-Type": t.messageContentType })),
    t &&
      t.Ca &&
      (e
        ? (e["X-WebChannel-Client-Profile"] = t.Ca)
        : (e = { "X-WebChannel-Client-Profile": t.Ca })),
    (this.g.U = e),
    (e = t && t.cc) && !x$1(e) && (this.g.o = e),
    (this.A = (t && t.supportsCrossDomainXhr) || !1),
    (this.v = (t && t.sendRawJson) || !1),
    (t = t && t.httpSessionIdParam) &&
      !x$1(t) &&
      ((this.g.F = t),
      null !== (e = this.h) && t in e && t in (e = this.h) && delete e[t]),
    (this.j = new R(this));
}
function Pd(e) {
  Yb.call(this),
    e.__headers__ &&
      ((this.headers = e.__headers__),
      (this.statusCode = e.__status__),
      delete e.__headers__,
      delete e.__status__);
  var t = e.__sm__;
  if (t) {
    e: {
      for (const n in t) {
        e = n;
        break e;
      }
      e = void 0;
    }
    (this.i = e) && ((e = this.i), (t = null !== t && e in t ? t[e] : void 0)),
      (this.data = t);
  } else this.data = e;
}
function Qd() {
  Zb.call(this), (this.status = 1);
}
function R(e) {
  this.g = e;
}
function S$1() {
  (this.blockSize = -1),
    (this.blockSize = 64),
    (this.g = Array(4)),
    (this.m = Array(this.blockSize)),
    (this.i = this.h = 0),
    this.reset();
}
function Sd(e, t, n) {
  n || (n = 0);
  var i = Array(16);
  if ("string" == typeof t)
    for (var s = 0; 16 > s; ++s)
      i[s] =
        t.charCodeAt(n++) |
        (t.charCodeAt(n++) << 8) |
        (t.charCodeAt(n++) << 16) |
        (t.charCodeAt(n++) << 24);
  else
    for (s = 0; 16 > s; ++s)
      i[s] = t[n++] | (t[n++] << 8) | (t[n++] << 16) | (t[n++] << 24);
  (t = e.g[0]), (n = e.g[1]), (s = e.g[2]);
  var o = e.g[3],
    u = (t + (o ^ (n & (s ^ o))) + i[0] + 3614090360) & 4294967295;
  (u =
    ((n =
      (s =
        (o =
          (t =
            (n =
              (s =
                (o =
                  (t =
                    (n =
                      (s =
                        (o =
                          (t =
                            (n =
                              (s =
                                (o =
                                  (t =
                                    (n =
                                      (s =
                                        (o =
                                          (t =
                                            (n =
                                              (s =
                                                (o =
                                                  (t =
                                                    (n =
                                                      (s =
                                                        (o =
                                                          (t =
                                                            (n =
                                                              (s =
                                                                (o =
                                                                  (t =
                                                                    (n =
                                                                      (s =
                                                                        (o =
                                                                          (t =
                                                                            (n =
                                                                              (s =
                                                                                (o =
                                                                                  (t =
                                                                                    (n =
                                                                                      (s =
                                                                                        (o =
                                                                                          (t =
                                                                                            (n =
                                                                                              (s =
                                                                                                (o =
                                                                                                  (t =
                                                                                                    (n =
                                                                                                      (s =
                                                                                                        (o =
                                                                                                          (t =
                                                                                                            (n =
                                                                                                              (s =
                                                                                                                (o =
                                                                                                                  (t =
                                                                                                                    (n =
                                                                                                                      (s =
                                                                                                                        (o =
                                                                                                                          (t =
                                                                                                                            n +
                                                                                                                            (((u <<
                                                                                                                              7) &
                                                                                                                              4294967295) |
                                                                                                                              (u >>>
                                                                                                                                25))) +
                                                                                                                          ((((u =
                                                                                                                            (o +
                                                                                                                              (s ^
                                                                                                                                (t &
                                                                                                                                  (n ^
                                                                                                                                    s))) +
                                                                                                                              i[1] +
                                                                                                                              3905402710) &
                                                                                                                            4294967295) <<
                                                                                                                            12) &
                                                                                                                            4294967295) |
                                                                                                                            (u >>>
                                                                                                                              20))) +
                                                                                                                        ((((u =
                                                                                                                          (s +
                                                                                                                            (n ^
                                                                                                                              (o &
                                                                                                                                (t ^
                                                                                                                                  n))) +
                                                                                                                            i[2] +
                                                                                                                            606105819) &
                                                                                                                          4294967295) <<
                                                                                                                          17) &
                                                                                                                          4294967295) |
                                                                                                                          (u >>>
                                                                                                                            15))) +
                                                                                                                      ((((u =
                                                                                                                        (n +
                                                                                                                          (t ^
                                                                                                                            (s &
                                                                                                                              (o ^
                                                                                                                                t))) +
                                                                                                                          i[3] +
                                                                                                                          3250441966) &
                                                                                                                        4294967295) <<
                                                                                                                        22) &
                                                                                                                        4294967295) |
                                                                                                                        (u >>>
                                                                                                                          10))) +
                                                                                                                    ((((u =
                                                                                                                      (t +
                                                                                                                        (o ^
                                                                                                                          (n &
                                                                                                                            (s ^
                                                                                                                              o))) +
                                                                                                                        i[4] +
                                                                                                                        4118548399) &
                                                                                                                      4294967295) <<
                                                                                                                      7) &
                                                                                                                      4294967295) |
                                                                                                                      (u >>>
                                                                                                                        25))) +
                                                                                                                  ((((u =
                                                                                                                    (o +
                                                                                                                      (s ^
                                                                                                                        (t &
                                                                                                                          (n ^
                                                                                                                            s))) +
                                                                                                                      i[5] +
                                                                                                                      1200080426) &
                                                                                                                    4294967295) <<
                                                                                                                    12) &
                                                                                                                    4294967295) |
                                                                                                                    (u >>>
                                                                                                                      20))) +
                                                                                                                ((((u =
                                                                                                                  (s +
                                                                                                                    (n ^
                                                                                                                      (o &
                                                                                                                        (t ^
                                                                                                                          n))) +
                                                                                                                    i[6] +
                                                                                                                    2821735955) &
                                                                                                                  4294967295) <<
                                                                                                                  17) &
                                                                                                                  4294967295) |
                                                                                                                  (u >>>
                                                                                                                    15))) +
                                                                                                              ((((u =
                                                                                                                (n +
                                                                                                                  (t ^
                                                                                                                    (s &
                                                                                                                      (o ^
                                                                                                                        t))) +
                                                                                                                  i[7] +
                                                                                                                  4249261313) &
                                                                                                                4294967295) <<
                                                                                                                22) &
                                                                                                                4294967295) |
                                                                                                                (u >>>
                                                                                                                  10))) +
                                                                                                            ((((u =
                                                                                                              (t +
                                                                                                                (o ^
                                                                                                                  (n &
                                                                                                                    (s ^
                                                                                                                      o))) +
                                                                                                                i[8] +
                                                                                                                1770035416) &
                                                                                                              4294967295) <<
                                                                                                              7) &
                                                                                                              4294967295) |
                                                                                                              (u >>>
                                                                                                                25))) +
                                                                                                          ((((u =
                                                                                                            (o +
                                                                                                              (s ^
                                                                                                                (t &
                                                                                                                  (n ^
                                                                                                                    s))) +
                                                                                                              i[9] +
                                                                                                              2336552879) &
                                                                                                            4294967295) <<
                                                                                                            12) &
                                                                                                            4294967295) |
                                                                                                            (u >>>
                                                                                                              20))) +
                                                                                                        ((((u =
                                                                                                          (s +
                                                                                                            (n ^
                                                                                                              (o &
                                                                                                                (t ^
                                                                                                                  n))) +
                                                                                                            i[10] +
                                                                                                            4294925233) &
                                                                                                          4294967295) <<
                                                                                                          17) &
                                                                                                          4294967295) |
                                                                                                          (u >>>
                                                                                                            15))) +
                                                                                                      ((((u =
                                                                                                        (n +
                                                                                                          (t ^
                                                                                                            (s &
                                                                                                              (o ^
                                                                                                                t))) +
                                                                                                          i[11] +
                                                                                                          2304563134) &
                                                                                                        4294967295) <<
                                                                                                        22) &
                                                                                                        4294967295) |
                                                                                                        (u >>>
                                                                                                          10))) +
                                                                                                    ((((u =
                                                                                                      (t +
                                                                                                        (o ^
                                                                                                          (n &
                                                                                                            (s ^
                                                                                                              o))) +
                                                                                                        i[12] +
                                                                                                        1804603682) &
                                                                                                      4294967295) <<
                                                                                                      7) &
                                                                                                      4294967295) |
                                                                                                      (u >>>
                                                                                                        25))) +
                                                                                                  ((((u =
                                                                                                    (o +
                                                                                                      (s ^
                                                                                                        (t &
                                                                                                          (n ^
                                                                                                            s))) +
                                                                                                      i[13] +
                                                                                                      4254626195) &
                                                                                                    4294967295) <<
                                                                                                    12) &
                                                                                                    4294967295) |
                                                                                                    (u >>>
                                                                                                      20))) +
                                                                                                ((((u =
                                                                                                  (s +
                                                                                                    (n ^
                                                                                                      (o &
                                                                                                        (t ^
                                                                                                          n))) +
                                                                                                    i[14] +
                                                                                                    2792965006) &
                                                                                                  4294967295) <<
                                                                                                  17) &
                                                                                                  4294967295) |
                                                                                                  (u >>>
                                                                                                    15))) +
                                                                                              ((((u =
                                                                                                (n +
                                                                                                  (t ^
                                                                                                    (s &
                                                                                                      (o ^
                                                                                                        t))) +
                                                                                                  i[15] +
                                                                                                  1236535329) &
                                                                                                4294967295) <<
                                                                                                22) &
                                                                                                4294967295) |
                                                                                                (u >>>
                                                                                                  10))) +
                                                                                            ((((u =
                                                                                              (t +
                                                                                                (s ^
                                                                                                  (o &
                                                                                                    (n ^
                                                                                                      s))) +
                                                                                                i[1] +
                                                                                                4129170786) &
                                                                                              4294967295) <<
                                                                                              5) &
                                                                                              4294967295) |
                                                                                              (u >>>
                                                                                                27))) +
                                                                                          ((((u =
                                                                                            (o +
                                                                                              (n ^
                                                                                                (s &
                                                                                                  (t ^
                                                                                                    n))) +
                                                                                              i[6] +
                                                                                              3225465664) &
                                                                                            4294967295) <<
                                                                                            9) &
                                                                                            4294967295) |
                                                                                            (u >>>
                                                                                              23))) +
                                                                                        ((((u =
                                                                                          (s +
                                                                                            (t ^
                                                                                              (n &
                                                                                                (o ^
                                                                                                  t))) +
                                                                                            i[11] +
                                                                                            643717713) &
                                                                                          4294967295) <<
                                                                                          14) &
                                                                                          4294967295) |
                                                                                          (u >>>
                                                                                            18))) +
                                                                                      ((((u =
                                                                                        (n +
                                                                                          (o ^
                                                                                            (t &
                                                                                              (s ^
                                                                                                o))) +
                                                                                          i[0] +
                                                                                          3921069994) &
                                                                                        4294967295) <<
                                                                                        20) &
                                                                                        4294967295) |
                                                                                        (u >>>
                                                                                          12))) +
                                                                                    ((((u =
                                                                                      (t +
                                                                                        (s ^
                                                                                          (o &
                                                                                            (n ^
                                                                                              s))) +
                                                                                        i[5] +
                                                                                        3593408605) &
                                                                                      4294967295) <<
                                                                                      5) &
                                                                                      4294967295) |
                                                                                      (u >>>
                                                                                        27))) +
                                                                                  ((((u =
                                                                                    (o +
                                                                                      (n ^
                                                                                        (s &
                                                                                          (t ^
                                                                                            n))) +
                                                                                      i[10] +
                                                                                      38016083) &
                                                                                    4294967295) <<
                                                                                    9) &
                                                                                    4294967295) |
                                                                                    (u >>>
                                                                                      23))) +
                                                                                ((((u =
                                                                                  (s +
                                                                                    (t ^
                                                                                      (n &
                                                                                        (o ^
                                                                                          t))) +
                                                                                    i[15] +
                                                                                    3634488961) &
                                                                                  4294967295) <<
                                                                                  14) &
                                                                                  4294967295) |
                                                                                  (u >>>
                                                                                    18))) +
                                                                              ((((u =
                                                                                (n +
                                                                                  (o ^
                                                                                    (t &
                                                                                      (s ^
                                                                                        o))) +
                                                                                  i[4] +
                                                                                  3889429448) &
                                                                                4294967295) <<
                                                                                20) &
                                                                                4294967295) |
                                                                                (u >>>
                                                                                  12))) +
                                                                            ((((u =
                                                                              (t +
                                                                                (s ^
                                                                                  (o &
                                                                                    (n ^
                                                                                      s))) +
                                                                                i[9] +
                                                                                568446438) &
                                                                              4294967295) <<
                                                                              5) &
                                                                              4294967295) |
                                                                              (u >>>
                                                                                27))) +
                                                                          ((((u =
                                                                            (o +
                                                                              (n ^
                                                                                (s &
                                                                                  (t ^
                                                                                    n))) +
                                                                              i[14] +
                                                                              3275163606) &
                                                                            4294967295) <<
                                                                            9) &
                                                                            4294967295) |
                                                                            (u >>>
                                                                              23))) +
                                                                        ((((u =
                                                                          (s +
                                                                            (t ^
                                                                              (n &
                                                                                (o ^
                                                                                  t))) +
                                                                            i[3] +
                                                                            4107603335) &
                                                                          4294967295) <<
                                                                          14) &
                                                                          4294967295) |
                                                                          (u >>>
                                                                            18))) +
                                                                      ((((u =
                                                                        (n +
                                                                          (o ^
                                                                            (t &
                                                                              (s ^
                                                                                o))) +
                                                                          i[8] +
                                                                          1163531501) &
                                                                        4294967295) <<
                                                                        20) &
                                                                        4294967295) |
                                                                        (u >>>
                                                                          12))) +
                                                                    ((((u =
                                                                      (t +
                                                                        (s ^
                                                                          (o &
                                                                            (n ^
                                                                              s))) +
                                                                        i[13] +
                                                                        2850285829) &
                                                                      4294967295) <<
                                                                      5) &
                                                                      4294967295) |
                                                                      (u >>>
                                                                        27))) +
                                                                  ((((u =
                                                                    (o +
                                                                      (n ^
                                                                        (s &
                                                                          (t ^
                                                                            n))) +
                                                                      i[2] +
                                                                      4243563512) &
                                                                    4294967295) <<
                                                                    9) &
                                                                    4294967295) |
                                                                    (u >>>
                                                                      23))) +
                                                                ((((u =
                                                                  (s +
                                                                    (t ^
                                                                      (n &
                                                                        (o ^
                                                                          t))) +
                                                                    i[7] +
                                                                    1735328473) &
                                                                  4294967295) <<
                                                                  14) &
                                                                  4294967295) |
                                                                  (u >>> 18))) +
                                                              ((((u =
                                                                (n +
                                                                  (o ^
                                                                    (t &
                                                                      (s ^
                                                                        o))) +
                                                                  i[12] +
                                                                  2368359562) &
                                                                4294967295) <<
                                                                20) &
                                                                4294967295) |
                                                                (u >>> 12))) +
                                                            ((((u =
                                                              (t +
                                                                (n ^ s ^ o) +
                                                                i[5] +
                                                                4294588738) &
                                                              4294967295) <<
                                                              4) &
                                                              4294967295) |
                                                              (u >>> 28))) +
                                                          ((((u =
                                                            (o +
                                                              (t ^ n ^ s) +
                                                              i[8] +
                                                              2272392833) &
                                                            4294967295) <<
                                                            11) &
                                                            4294967295) |
                                                            (u >>> 21))) +
                                                        ((((u =
                                                          (s +
                                                            (o ^ t ^ n) +
                                                            i[11] +
                                                            1839030562) &
                                                          4294967295) <<
                                                          16) &
                                                          4294967295) |
                                                          (u >>> 16))) +
                                                      ((((u =
                                                        (n +
                                                          (s ^ o ^ t) +
                                                          i[14] +
                                                          4259657740) &
                                                        4294967295) <<
                                                        23) &
                                                        4294967295) |
                                                        (u >>> 9))) +
                                                    ((((u =
                                                      (t +
                                                        (n ^ s ^ o) +
                                                        i[1] +
                                                        2763975236) &
                                                      4294967295) <<
                                                      4) &
                                                      4294967295) |
                                                      (u >>> 28))) +
                                                  ((((u =
                                                    (o +
                                                      (t ^ n ^ s) +
                                                      i[4] +
                                                      1272893353) &
                                                    4294967295) <<
                                                    11) &
                                                    4294967295) |
                                                    (u >>> 21))) +
                                                ((((u =
                                                  (s +
                                                    (o ^ t ^ n) +
                                                    i[7] +
                                                    4139469664) &
                                                  4294967295) <<
                                                  16) &
                                                  4294967295) |
                                                  (u >>> 16))) +
                                              ((((u =
                                                (n +
                                                  (s ^ o ^ t) +
                                                  i[10] +
                                                  3200236656) &
                                                4294967295) <<
                                                23) &
                                                4294967295) |
                                                (u >>> 9))) +
                                            ((((u =
                                              (t +
                                                (n ^ s ^ o) +
                                                i[13] +
                                                681279174) &
                                              4294967295) <<
                                              4) &
                                              4294967295) |
                                              (u >>> 28))) +
                                          ((((u =
                                            (o +
                                              (t ^ n ^ s) +
                                              i[0] +
                                              3936430074) &
                                            4294967295) <<
                                            11) &
                                            4294967295) |
                                            (u >>> 21))) +
                                        ((((u =
                                          (s +
                                            (o ^ t ^ n) +
                                            i[3] +
                                            3572445317) &
                                          4294967295) <<
                                          16) &
                                          4294967295) |
                                          (u >>> 16))) +
                                      ((((u =
                                        (n + (s ^ o ^ t) + i[6] + 76029189) &
                                        4294967295) <<
                                        23) &
                                        4294967295) |
                                        (u >>> 9))) +
                                    ((((u =
                                      (t + (n ^ s ^ o) + i[9] + 3654602809) &
                                      4294967295) <<
                                      4) &
                                      4294967295) |
                                      (u >>> 28))) +
                                  ((((u =
                                    (o + (t ^ n ^ s) + i[12] + 3873151461) &
                                    4294967295) <<
                                    11) &
                                    4294967295) |
                                    (u >>> 21))) +
                                ((((u =
                                  (s + (o ^ t ^ n) + i[15] + 530742520) &
                                  4294967295) <<
                                  16) &
                                  4294967295) |
                                  (u >>> 16))) +
                              ((((u =
                                (n + (s ^ o ^ t) + i[2] + 3299628645) &
                                4294967295) <<
                                23) &
                                4294967295) |
                                (u >>> 9))) +
                            ((((u =
                              (t + (s ^ (n | ~o)) + i[0] + 4096336452) &
                              4294967295) <<
                              6) &
                              4294967295) |
                              (u >>> 26))) +
                          ((((u =
                            (o + (n ^ (t | ~s)) + i[7] + 1126891415) &
                            4294967295) <<
                            10) &
                            4294967295) |
                            (u >>> 22))) +
                        ((((u =
                          (s + (t ^ (o | ~n)) + i[14] + 2878612391) &
                          4294967295) <<
                          15) &
                          4294967295) |
                          (u >>> 17))) +
                      ((((u =
                        (n + (o ^ (s | ~t)) + i[5] + 4237533241) &
                        4294967295) <<
                        21) &
                        4294967295) |
                        (u >>> 11))) +
                    ((((u =
                      (t + (s ^ (n | ~o)) + i[12] + 1700485571) & 4294967295) <<
                      6) &
                      4294967295) |
                      (u >>> 26))) +
                  ((((u =
                    (o + (n ^ (t | ~s)) + i[3] + 2399980690) & 4294967295) <<
                    10) &
                    4294967295) |
                    (u >>> 22))) +
                ((((u =
                  (s + (t ^ (o | ~n)) + i[10] + 4293915773) & 4294967295) <<
                  15) &
                  4294967295) |
                  (u >>> 17))) +
              ((((u = (n + (o ^ (s | ~t)) + i[1] + 2240044497) & 4294967295) <<
                21) &
                4294967295) |
                (u >>> 11))) +
            ((((u = (t + (s ^ (n | ~o)) + i[8] + 1873313359) & 4294967295) <<
              6) &
              4294967295) |
              (u >>> 26))) +
          ((((u = (o + (n ^ (t | ~s)) + i[15] + 4264355552) & 4294967295) <<
            10) &
            4294967295) |
            (u >>> 22))) +
        ((((u = (s + (t ^ (o | ~n)) + i[6] + 2734768916) & 4294967295) << 15) &
          4294967295) |
          (u >>> 17))) +
      ((((u = (n + (o ^ (s | ~t)) + i[13] + 1309151649) & 4294967295) << 21) &
        4294967295) |
        (u >>> 11))) +
      ((o =
        (t =
          n +
          ((((u = (t + (s ^ (n | ~o)) + i[4] + 4149444226) & 4294967295) << 6) &
            4294967295) |
            (u >>> 26))) +
        ((((u = (o + (n ^ (t | ~s)) + i[11] + 3174756917) & 4294967295) << 10) &
          4294967295) |
          (u >>> 22))) ^
        ((s =
          o +
          ((((u = (s + (t ^ (o | ~n)) + i[2] + 718787259) & 4294967295) << 15) &
            4294967295) |
            (u >>> 17))) |
          ~t)) +
      i[9] +
      3951481745) &
    4294967295),
    (e.g[0] = (e.g[0] + t) & 4294967295),
    (e.g[1] =
      (e.g[1] + (s + (((u << 21) & 4294967295) | (u >>> 11)))) & 4294967295),
    (e.g[2] = (e.g[2] + s) & 4294967295),
    (e.g[3] = (e.g[3] + o) & 4294967295);
}
function T(e, t) {
  this.h = t;
  for (var n = [], i = !0, s = e.length - 1; 0 <= s; s--) {
    var o = 0 | e[s];
    (i && o == t) || ((n[s] = o), (i = !1));
  }
  this.g = n;
}
((m = P.prototype).Oa = function (e) {
  this.M = e;
}),
  (m.ha = function (e, t, n, i) {
    if (this.g)
      throw Error(
        "[goog.net.XhrIo] Object is active with another request=" +
          this.I +
          "; newUri=" +
          e
      );
    (t = t ? t.toUpperCase() : "GET"),
      (this.I = e),
      (this.j = ""),
      (this.m = 0),
      (this.F = !1),
      (this.h = !0),
      (this.g = this.u ? this.u.g() : oe.g()),
      (this.C = this.u ? Vb(this.u) : Vb(oe)),
      (this.g.onreadystatechange = q$1(this.La, this));
    try {
      (this.G = !0), this.g.open(t, String(e), !0), (this.G = !1);
    } catch (e) {
      return void vd(this, e);
    }
    if (((e = n || ""), (n = new Map(this.headers)), i))
      if (Object.getPrototypeOf(i) === Object.prototype)
        for (var s in i) n.set(s, i[s]);
      else {
        if ("function" != typeof i.keys || "function" != typeof i.get)
          throw Error("Unknown input type for opt_headers: " + String(i));
        for (const e of i.keys()) n.set(e, i.get(e));
      }
    (i = Array.from(n.keys()).find((e) => "content-type" == e.toLowerCase())),
      (s = E.FormData && e instanceof E.FormData),
      !(0 <= S(Ae, t)) ||
        i ||
        s ||
        n.set(
          "Content-Type",
          "application/x-www-form-urlencoded;charset=utf-8"
        );
    for (const [e, t] of n) this.g.setRequestHeader(e, t);
    this.K && (this.g.responseType = this.K),
      "withCredentials" in this.g &&
        this.g.withCredentials !== this.M &&
        (this.g.withCredentials = this.M);
    try {
      wd(this),
        0 < this.B &&
          ((this.L = (function xd(e) {
            return x && "number" == typeof e.timeout && void 0 !== e.ontimeout;
          })(this.g))
            ? ((this.g.timeout = this.B),
              (this.g.ontimeout = q$1(this.ua, this)))
            : (this.A = yb(this.ua, this.B, this))),
        (this.v = !0),
        this.g.send(e),
        (this.v = !1);
    } catch (e) {
      vd(this, e);
    }
  }),
  (m.ua = function () {
    void 0 !== g &&
      this.g &&
      ((this.j = "Timed out after " + this.B + "ms, aborting"),
      (this.m = 8),
      C$1(this, "timeout"),
      this.abort(8));
  }),
  (m.abort = function (e) {
    this.g &&
      this.h &&
      ((this.h = !1),
      (this.l = !0),
      this.g.abort(),
      (this.l = !1),
      (this.m = e || 7),
      C$1(this, "complete"),
      C$1(this, "abort"),
      zd(this));
  }),
  (m.N = function () {
    this.g &&
      (this.h && ((this.h = !1), (this.l = !0), this.g.abort(), (this.l = !1)),
      zd(this, !0)),
      P.$.N.call(this);
  }),
  (m.La = function () {
    this.s || (this.G || this.v || this.l ? Ad(this) : this.kb());
  }),
  (m.kb = function () {
    Ad(this);
  }),
  (m.isActive = function () {
    return !!this.g;
  }),
  (m.da = function () {
    try {
      return 2 < H$1(this) ? this.g.status : -1;
    } catch (e) {
      return -1;
    }
  }),
  (m.ja = function () {
    try {
      return this.g ? this.g.responseText : "";
    } catch (e) {
      return "";
    }
  }),
  (m.Wa = function (e) {
    if (this.g) {
      var t = this.g.responseText;
      return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), Te(t);
    }
  }),
  (m.Ia = function () {
    return this.m;
  }),
  (m.Sa = function () {
    return "string" == typeof this.j ? this.j : String(this.j);
  }),
  ((m = Ed.prototype).ra = 8),
  (m.H = 1),
  (m.Na = function (e) {
    if (this.m)
      if (((this.m = null), 1 == this.H)) {
        if (!e) {
          (this.W = Math.floor(1e5 * Math.random())), (e = this.W++);
          const s = new bc(this, this.l, e);
          let o = this.s;
          if (
            (this.U && (o ? ((o = Pa(o)), Ra(o, this.U)) : (o = this.U)),
            null !== this.o || this.O || ((s.I = o), (o = null)),
            this.P)
          )
            e: {
              for (var t = 0, n = 0; n < this.j.length; n++) {
                var i = this.j[n];
                if (
                  void 0 ===
                  (i =
                    "__data__" in i.map &&
                    "string" == typeof (i = i.map.__data__)
                      ? i.length
                      : void 0)
                )
                  break;
                if (4096 < (t += i)) {
                  t = n;
                  break e;
                }
                if (4096 === t || n === this.j.length - 1) {
                  t = n + 1;
                  break e;
                }
              }
              t = 1e3;
            }
          else t = 1e3;
          (t = Kd(this, s, t)),
            K$1((n = G$1(this.I)), "RID", e),
            K$1(n, "CVER", 22),
            this.F && K$1(n, "X-HTTP-Session-Id", this.F),
            Gd(this, n),
            o &&
              (this.O
                ? (t = "headers=" + encodeURIComponent(String(Bd(o))) + "&" + t)
                : this.o && Cd(n, this.o, o)),
            Cc(this.i, s),
            this.bb && K$1(n, "TYPE", "init"),
            this.P
              ? (K$1(n, "$req", t),
                K$1(n, "SID", "null"),
                (s.aa = !0),
                gc(s, n, null))
              : gc(s, n, t),
            (this.H = 2);
        }
      } else
        3 == this.H &&
          (e ? Ld(this, e) : 0 == this.j.length || ed(this.i) || Ld(this));
  }),
  (m.Ma = function () {
    if (
      ((this.u = null),
      Md(this),
      this.ca && !(this.M || null == this.g || 0 >= this.S))
    ) {
      var e = 2 * this.S;
      this.l.info("BP detection timer enabled: " + e),
        (this.B = Rb(q$1(this.jb, this), e));
    }
  }),
  (m.jb = function () {
    this.B &&
      ((this.B = null),
      this.l.info("BP detection timeout reached."),
      this.l.info("Buffering proxy detected and switch to long-polling!"),
      (this.G = !1),
      (this.M = !0),
      F$1(10),
      zc(this),
      Md(this));
  }),
  (m.ib = function () {
    null != this.v && ((this.v = null), zc(this), Ac(this), F$1(19));
  }),
  (m.pb = function (e) {
    e
      ? (this.l.info("Successfully pinged google.com"), F$1(2))
      : (this.l.info("Failed to ping google.com"), F$1(1));
  }),
  (m.isActive = function () {
    return !!this.h && this.h.isActive(this);
  }),
  ((m = Nd.prototype).Ba = function () {}),
  (m.Aa = function () {}),
  (m.za = function () {}),
  (m.ya = function () {}),
  (m.isActive = function () {
    return !0;
  }),
  (m.Va = function () {}),
  (Od.prototype.g = function (e, t) {
    return new Q$1(e, t);
  }),
  r(Q$1, B$1),
  (Q$1.prototype.m = function () {
    (this.g.h = this.j), this.A && (this.g.J = !0);
    var e = this.g,
      t = this.l,
      n = this.h || void 0;
    F$1(0),
      (e.Y = t),
      (e.na = n || {}),
      (e.G = e.aa),
      (e.I = Dc(e, null, e.Y)),
      Gc(e);
  }),
  (Q$1.prototype.close = function () {
    Hc(this.g);
  }),
  (Q$1.prototype.u = function (e) {
    var t = this.g;
    if ("string" == typeof e) {
      var n = {};
      (n.__data__ = e), (e = n);
    } else this.v && (((n = {}).__data__ = Y(e)), (e = n));
    t.j.push(
      new (class {
        constructor(e, t) {
          (this.g = e), (this.map = t);
        }
      })(t.fb++, e)
    ),
      3 == t.H && Gc(t);
  }),
  (Q$1.prototype.N = function () {
    (this.g.h = null),
      delete this.j,
      Hc(this.g),
      delete this.g,
      Q$1.$.N.call(this);
  }),
  r(Pd, Yb),
  r(Qd, Zb),
  r(R, Nd),
  (R.prototype.Ba = function () {
    C$1(this.g, "a");
  }),
  (R.prototype.Aa = function (e) {
    C$1(this.g, new Pd(e));
  }),
  (R.prototype.za = function (e) {
    C$1(this.g, new Qd());
  }),
  (R.prototype.ya = function () {
    C$1(this.g, "b");
  }),
  r(S$1, function Rd() {
    this.blockSize = -1;
  }),
  (S$1.prototype.reset = function () {
    (this.g[0] = 1732584193),
      (this.g[1] = 4023233417),
      (this.g[2] = 2562383102),
      (this.g[3] = 271733878),
      (this.i = this.h = 0);
  }),
  (S$1.prototype.j = function (e, t) {
    void 0 === t && (t = e.length);
    for (var n = t - this.blockSize, i = this.m, s = this.h, o = 0; o < t; ) {
      if (0 == s) for (; o <= n; ) Sd(this, e, o), (o += this.blockSize);
      if ("string" == typeof e) {
        for (; o < t; )
          if (((i[s++] = e.charCodeAt(o++)), s == this.blockSize)) {
            Sd(this, i), (s = 0);
            break;
          }
      } else
        for (; o < t; )
          if (((i[s++] = e[o++]), s == this.blockSize)) {
            Sd(this, i), (s = 0);
            break;
          }
    }
    (this.h = s), (this.i += t);
  }),
  (S$1.prototype.l = function () {
    var e = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
    e[0] = 128;
    for (var t = 1; t < e.length - 8; ++t) e[t] = 0;
    var n = 8 * this.i;
    for (t = e.length - 8; t < e.length; ++t) (e[t] = 255 & n), (n /= 256);
    for (this.j(e), e = Array(16), t = n = 0; 4 > t; ++t)
      for (var i = 0; 32 > i; i += 8) e[n++] = (this.g[t] >>> i) & 255;
    return e;
  });
var Re = {};
function Td(e) {
  return -128 <= e && 128 > e
    ? (function ra(e, t) {
        var n = Re;
        return Object.prototype.hasOwnProperty.call(n, e)
          ? n[e]
          : (n[e] = t(e));
      })(e, function (e) {
        return new T([0 | e], 0 > e ? -1 : 0);
      })
    : new T([0 | e], 0 > e ? -1 : 0);
}
function U$1(e) {
  if (isNaN(e) || !isFinite(e)) return Ve;
  if (0 > e) return W$1(U$1(-e));
  for (var t = [], n = 1, i = 0; e >= n; i++) (t[i] = (e / n) | 0), (n *= ye);
  return new T(t, 0);
}
var ye = 4294967296,
  Ve = Td(0),
  Se = Td(1),
  ve = Td(16777216);
function Y$1(e) {
  if (0 != e.h) return !1;
  for (var t = 0; t < e.g.length; t++) if (0 != e.g[t]) return !1;
  return !0;
}
function X$1(e) {
  return -1 == e.h;
}
function W$1(e) {
  for (var t = e.g.length, n = [], i = 0; i < t; i++) n[i] = ~e.g[i];
  return new T(n, ~e.h).add(Se);
}
function Zd(e, t) {
  return e.add(W$1(t));
}
function $d(e, t) {
  for (; (65535 & e[t]) != e[t]; )
    (e[t + 1] += e[t] >>> 16), (e[t] &= 65535), t++;
}
function ae$1(e, t) {
  (this.g = e), (this.h = t);
}
function Yd(e, t) {
  if (Y$1(t)) throw Error("division by zero");
  if (Y$1(e)) return new ae$1(Ve, Ve);
  if (X$1(e)) return (t = Yd(W$1(e), t)), new ae$1(W$1(t.g), W$1(t.h));
  if (X$1(t)) return (t = Yd(e, W$1(t))), new ae$1(W$1(t.g), t.h);
  if (30 < e.g.length) {
    if (X$1(e) || X$1(t))
      throw Error("slowDivide_ only works with positive integers.");
    for (var n = Se, i = t; 0 >= i.X(e); ) (n = be(n)), (i = be(i));
    var s = Z$1(n, 1),
      o = Z$1(i, 1);
    for (i = Z$1(i, 2), n = Z$1(n, 2); !Y$1(i); ) {
      var u = o.add(i);
      0 >= u.X(e) && ((s = s.add(n)), (o = u)),
        (i = Z$1(i, 1)),
        (n = Z$1(n, 1));
    }
    return (t = Zd(e, s.R(t))), new ae$1(s, t);
  }
  for (s = Ve; 0 <= e.X(t); ) {
    for (
      n = Math.max(1, Math.floor(e.ea() / t.ea())),
        i =
          48 >= (i = Math.ceil(Math.log(n) / Math.LN2))
            ? 1
            : Math.pow(2, i - 48),
        u = (o = U$1(n)).R(t);
      X$1(u) || 0 < u.X(e);

    )
      u = (o = U$1((n -= i))).R(t);
    Y$1(o) && (o = Se), (s = s.add(o)), (e = Zd(e, u));
  }
  return new ae$1(s, e);
}
function be(e) {
  for (var t = e.g.length + 1, n = [], i = 0; i < t; i++)
    n[i] = (e.D(i) << 1) | (e.D(i - 1) >>> 31);
  return new T(n, e.h);
}
function Z$1(e, t) {
  var n = t >> 5;
  t %= 32;
  for (var i = e.g.length - n, s = [], o = 0; o < i; o++)
    s[o] =
      0 < t ? (e.D(o + n) >>> t) | (e.D(o + n + 1) << (32 - t)) : e.D(o + n);
  return new T(s, e.h);
}
((m = T.prototype).ea = function () {
  if (X$1(this)) return -W$1(this).ea();
  for (var e = 0, t = 1, n = 0; n < this.g.length; n++) {
    var i = this.D(n);
    (e += (0 <= i ? i : ye + i) * t), (t *= ye);
  }
  return e;
}),
  (m.toString = function (e) {
    if (2 > (e = e || 10) || 36 < e) throw Error("radix out of range: " + e);
    if (Y$1(this)) return "0";
    if (X$1(this)) return "-" + W$1(this).toString(e);
    for (var t = U$1(Math.pow(e, 6)), n = this, i = ""; ; ) {
      var s = Yd(n, t).g,
        o = ((0 < (n = Zd(n, s.R(t))).g.length ? n.g[0] : n.h) >>> 0).toString(
          e
        );
      if (Y$1((n = s))) return o + i;
      for (; 6 > o.length; ) o = "0" + o;
      i = o + i;
    }
  }),
  (m.D = function (e) {
    return 0 > e ? 0 : e < this.g.length ? this.g[e] : this.h;
  }),
  (m.X = function (e) {
    return X$1((e = Zd(this, e))) ? -1 : Y$1(e) ? 0 : 1;
  }),
  (m.abs = function () {
    return X$1(this) ? W$1(this) : this;
  }),
  (m.add = function (e) {
    for (
      var t = Math.max(this.g.length, e.g.length), n = [], i = 0, s = 0;
      s <= t;
      s++
    ) {
      var o = i + (65535 & this.D(s)) + (65535 & e.D(s)),
        u = (o >>> 16) + (this.D(s) >>> 16) + (e.D(s) >>> 16);
      (i = u >>> 16), (o &= 65535), (u &= 65535), (n[s] = (u << 16) | o);
    }
    return new T(n, -2147483648 & n[n.length - 1] ? -1 : 0);
  }),
  (m.R = function (e) {
    if (Y$1(this) || Y$1(e)) return Ve;
    if (X$1(this)) return X$1(e) ? W$1(this).R(W$1(e)) : W$1(W$1(this).R(e));
    if (X$1(e)) return W$1(this.R(W$1(e)));
    if (0 > this.X(ve) && 0 > e.X(ve)) return U$1(this.ea() * e.ea());
    for (var t = this.g.length + e.g.length, n = [], i = 0; i < 2 * t; i++)
      n[i] = 0;
    for (i = 0; i < this.g.length; i++)
      for (var s = 0; s < e.g.length; s++) {
        var o = this.D(i) >>> 16,
          u = 65535 & this.D(i),
          l = e.D(s) >>> 16,
          _ = 65535 & e.D(s);
        (n[2 * i + 2 * s] += u * _),
          $d(n, 2 * i + 2 * s),
          (n[2 * i + 2 * s + 1] += o * _),
          $d(n, 2 * i + 2 * s + 1),
          (n[2 * i + 2 * s + 1] += u * l),
          $d(n, 2 * i + 2 * s + 1),
          (n[2 * i + 2 * s + 2] += o * l),
          $d(n, 2 * i + 2 * s + 2);
      }
    for (i = 0; i < t; i++) n[i] = (n[2 * i + 1] << 16) | n[2 * i];
    for (i = t; i < 2 * t; i++) n[i] = 0;
    return new T(n, 0);
  }),
  (m.gb = function (e) {
    return Yd(this, e).h;
  }),
  (m.and = function (e) {
    for (var t = Math.max(this.g.length, e.g.length), n = [], i = 0; i < t; i++)
      n[i] = this.D(i) & e.D(i);
    return new T(n, this.h & e.h);
  }),
  (m.or = function (e) {
    for (var t = Math.max(this.g.length, e.g.length), n = [], i = 0; i < t; i++)
      n[i] = this.D(i) | e.D(i);
    return new T(n, this.h | e.h);
  }),
  (m.xor = function (e) {
    for (var t = Math.max(this.g.length, e.g.length), n = [], i = 0; i < t; i++)
      n[i] = this.D(i) ^ e.D(i);
    return new T(n, this.h ^ e.h);
  }),
  (Od.prototype.createWebChannel = Od.prototype.g),
  (Q$1.prototype.send = Q$1.prototype.u),
  (Q$1.prototype.open = Q$1.prototype.m),
  (Q$1.prototype.close = Q$1.prototype.close),
  (ie.NO_ERROR = 0),
  (ie.TIMEOUT = 8),
  (ie.HTTP_ERROR = 6),
  (se.COMPLETE = "complete"),
  (Wb.EventType = ae),
  (ae.OPEN = "a"),
  (ae.CLOSE = "b"),
  (ae.ERROR = "c"),
  (ae.MESSAGE = "d"),
  (B$1.prototype.listen = B$1.prototype.O),
  (P.prototype.listenOnce = P.prototype.P),
  (P.prototype.getLastError = P.prototype.Sa),
  (P.prototype.getLastErrorCode = P.prototype.Ia),
  (P.prototype.getStatus = P.prototype.da),
  (P.prototype.getResponseJson = P.prototype.Wa),
  (P.prototype.getResponseText = P.prototype.ja),
  (P.prototype.send = P.prototype.ha),
  (P.prototype.setWithCredentials = P.prototype.Oa),
  (S$1.prototype.digest = S$1.prototype.l),
  (S$1.prototype.reset = S$1.prototype.reset),
  (S$1.prototype.update = S$1.prototype.j),
  (T.prototype.add = T.prototype.add),
  (T.prototype.multiply = T.prototype.R),
  (T.prototype.modulo = T.prototype.gb),
  (T.prototype.compare = T.prototype.X),
  (T.prototype.toNumber = T.prototype.ea),
  (T.prototype.toString = T.prototype.toString),
  (T.prototype.getBits = T.prototype.D),
  (T.fromNumber = U$1),
  (T.fromString = function Vd(e, t) {
    if (0 == e.length) throw Error("number format error: empty string");
    if (2 > (t = t || 10) || 36 < t) throw Error("radix out of range: " + t);
    if ("-" == e.charAt(0)) return W$1(Vd(e.substring(1), t));
    if (0 <= e.indexOf("-"))
      throw Error('number format error: interior "-" character');
    for (var n = U$1(Math.pow(t, 8)), i = Ve, s = 0; s < e.length; s += 8) {
      var o = Math.min(8, e.length - s),
        u = parseInt(e.substring(s, s + o), t);
      8 > o
        ? ((o = U$1(Math.pow(t, o))), (i = i.R(o).add(U$1(u))))
        : (i = (i = i.R(n)).add(U$1(u)));
    }
    return i;
  });
var we = ie,
  De = se,
  Ce = ne,
  Fe = 10,
  xe = 11,
  Me = Wb,
  Ne = P,
  ke = S$1,
  Oe = T;
const Le = "@firebase/firestore";
class User {
  constructor(e) {
    this.uid = e;
  }
  isAuthenticated() {
    return null != this.uid;
  }
  toKey() {
    return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
  }
  isEqual(e) {
    return e.uid === this.uid;
  }
}
(User.UNAUTHENTICATED = new User(null)),
  (User.GOOGLE_CREDENTIALS = new User("google-credentials-uid")),
  (User.FIRST_PARTY = new User("first-party-uid")),
  (User.MOCK_USER = new User("mock-user"));
let Be = "10.7.1";
const qe = new (class Logger {
  constructor(e) {
    (this.name = e),
      (this._logLevel = h),
      (this._logHandler = defaultLogHandler),
      (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(e) {
    if (!(e in l))
      throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e;
  }
  setLogLevel(e) {
    this._logLevel = "string" == typeof e ? _[e] : e;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(e) {
    if ("function" != typeof e)
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = e;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(e) {
    this._userLogHandler = e;
  }
  debug(...e) {
    this._userLogHandler && this._userLogHandler(this, l.DEBUG, ...e),
      this._logHandler(this, l.DEBUG, ...e);
  }
  log(...e) {
    this._userLogHandler && this._userLogHandler(this, l.VERBOSE, ...e),
      this._logHandler(this, l.VERBOSE, ...e);
  }
  info(...e) {
    this._userLogHandler && this._userLogHandler(this, l.INFO, ...e),
      this._logHandler(this, l.INFO, ...e);
  }
  warn(...e) {
    this._userLogHandler && this._userLogHandler(this, l.WARN, ...e),
      this._logHandler(this, l.WARN, ...e);
  }
  error(...e) {
    this._userLogHandler && this._userLogHandler(this, l.ERROR, ...e),
      this._logHandler(this, l.ERROR, ...e);
  }
})("@firebase/firestore");
function __PRIVATE_getLogLevel() {
  return qe.logLevel;
}
function setLogLevel(e) {
  qe.setLogLevel(e);
}
function __PRIVATE_logDebug(e, ...t) {
  if (qe.logLevel <= l.DEBUG) {
    const n = t.map(__PRIVATE_argToString);
    qe.debug(`Firestore (${Be}): ${e}`, ...n);
  }
}
function __PRIVATE_logError(e, ...t) {
  if (qe.logLevel <= l.ERROR) {
    const n = t.map(__PRIVATE_argToString);
    qe.error(`Firestore (${Be}): ${e}`, ...n);
  }
}
function __PRIVATE_logWarn(e, ...t) {
  if (qe.logLevel <= l.WARN) {
    const n = t.map(__PRIVATE_argToString);
    qe.warn(`Firestore (${Be}): ${e}`, ...n);
  }
}
function __PRIVATE_argToString(e) {
  if ("string" == typeof e) return e;
  try {
    return (function __PRIVATE_formatJSON(e) {
      return JSON.stringify(e);
    })(e);
  } catch (t) {
    return e;
  }
}
function fail(e = "Unexpected state") {
  const t = `FIRESTORE (${Be}) INTERNAL ASSERTION FAILED: ` + e;
  throw (__PRIVATE_logError(t), new Error(t));
}
function __PRIVATE_hardAssert(e, t) {
  e || fail();
}
function __PRIVATE_debugAssert(e, t) {
  e || fail();
}
function __PRIVATE_debugCast(e, t) {
  return e;
}
const $e = {
  OK: "ok",
  CANCELLED: "cancelled",
  UNKNOWN: "unknown",
  INVALID_ARGUMENT: "invalid-argument",
  DEADLINE_EXCEEDED: "deadline-exceeded",
  NOT_FOUND: "not-found",
  ALREADY_EXISTS: "already-exists",
  PERMISSION_DENIED: "permission-denied",
  UNAUTHENTICATED: "unauthenticated",
  RESOURCE_EXHAUSTED: "resource-exhausted",
  FAILED_PRECONDITION: "failed-precondition",
  ABORTED: "aborted",
  OUT_OF_RANGE: "out-of-range",
  UNIMPLEMENTED: "unimplemented",
  INTERNAL: "internal",
  UNAVAILABLE: "unavailable",
  DATA_LOSS: "data-loss",
};
class FirestoreError extends FirebaseError {
  constructor(e, t) {
    super(e, t),
      (this.code = e),
      (this.message = t),
      (this.toString = () =>
        `${this.name}: [code=${this.code}]: ${this.message}`);
  }
}
class __PRIVATE_Deferred {
  constructor() {
    this.promise = new Promise((e, t) => {
      (this.resolve = e), (this.reject = t);
    });
  }
}
class __PRIVATE_OAuthToken {
  constructor(e, t) {
    (this.user = t),
      (this.type = "OAuth"),
      (this.headers = new Map()),
      this.headers.set("Authorization", `Bearer ${e}`);
  }
}
class __PRIVATE_EmptyAuthCredentialsProvider {
  getToken() {
    return Promise.resolve(null);
  }
  invalidateToken() {}
  start(e, t) {
    e.enqueueRetryable(() => t(User.UNAUTHENTICATED));
  }
  shutdown() {}
}
class __PRIVATE_EmulatorAuthCredentialsProvider {
  constructor(e) {
    (this.token = e), (this.changeListener = null);
  }
  getToken() {
    return Promise.resolve(this.token);
  }
  invalidateToken() {}
  start(e, t) {
    (this.changeListener = t), e.enqueueRetryable(() => t(this.token.user));
  }
  shutdown() {
    this.changeListener = null;
  }
}
class __PRIVATE_FirebaseAuthCredentialsProvider {
  constructor(e) {
    (this.t = e),
      (this.currentUser = User.UNAUTHENTICATED),
      (this.i = 0),
      (this.forceRefresh = !1),
      (this.auth = null);
  }
  start(e, t) {
    let n = this.i;
    const __PRIVATE_guardedChangeListener = (e) =>
      this.i !== n ? ((n = this.i), t(e)) : Promise.resolve();
    let i = new __PRIVATE_Deferred();
    this.o = () => {
      this.i++,
        (this.currentUser = this.u()),
        i.resolve(),
        (i = new __PRIVATE_Deferred()),
        e.enqueueRetryable(() =>
          __PRIVATE_guardedChangeListener(this.currentUser)
        );
    };
    const __PRIVATE_awaitNextToken = () => {
        const t = i;
        e.enqueueRetryable(async () => {
          await t.promise,
            await __PRIVATE_guardedChangeListener(this.currentUser);
        });
      },
      __PRIVATE_registerAuth = (e) => {
        __PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "Auth detected"),
          (this.auth = e),
          this.auth.addAuthTokenListener(this.o),
          __PRIVATE_awaitNextToken();
      };
    this.t.onInit((e) => __PRIVATE_registerAuth(e)),
      setTimeout(() => {
        if (!this.auth) {
          const e = this.t.getImmediate({ optional: !0 });
          e
            ? __PRIVATE_registerAuth(e)
            : (__PRIVATE_logDebug(
                "FirebaseAuthCredentialsProvider",
                "Auth not yet detected"
              ),
              i.resolve(),
              (i = new __PRIVATE_Deferred()));
        }
      }, 0),
      __PRIVATE_awaitNextToken();
  }
  getToken() {
    const e = this.i,
      t = this.forceRefresh;
    return (
      (this.forceRefresh = !1),
      this.auth
        ? this.auth
            .getToken(t)
            .then((t) =>
              this.i !== e
                ? (__PRIVATE_logDebug(
                    "FirebaseAuthCredentialsProvider",
                    "getToken aborted due to token change."
                  ),
                  this.getToken())
                : t
                ? (__PRIVATE_hardAssert("string" == typeof t.accessToken),
                  new __PRIVATE_OAuthToken(t.accessToken, this.currentUser))
                : null
            )
        : Promise.resolve(null)
    );
  }
  invalidateToken() {
    this.forceRefresh = !0;
  }
  shutdown() {
    this.auth && this.auth.removeAuthTokenListener(this.o);
  }
  u() {
    const e = this.auth && this.auth.getUid();
    return (
      __PRIVATE_hardAssert(null === e || "string" == typeof e), new User(e)
    );
  }
}
class __PRIVATE_FirstPartyToken {
  constructor(e, t, n) {
    (this.l = e),
      (this.h = t),
      (this.P = n),
      (this.type = "FirstParty"),
      (this.user = User.FIRST_PARTY),
      (this.I = new Map());
  }
  T() {
    return this.P ? this.P() : null;
  }
  get headers() {
    this.I.set("X-Goog-AuthUser", this.l);
    const e = this.T();
    return (
      e && this.I.set("Authorization", e),
      this.h && this.I.set("X-Goog-Iam-Authorization-Token", this.h),
      this.I
    );
  }
}
class __PRIVATE_FirstPartyAuthCredentialsProvider {
  constructor(e, t, n) {
    (this.l = e), (this.h = t), (this.P = n);
  }
  getToken() {
    return Promise.resolve(
      new __PRIVATE_FirstPartyToken(this.l, this.h, this.P)
    );
  }
  start(e, t) {
    e.enqueueRetryable(() => t(User.FIRST_PARTY));
  }
  shutdown() {}
  invalidateToken() {}
}
class AppCheckToken {
  constructor(e) {
    (this.value = e),
      (this.type = "AppCheck"),
      (this.headers = new Map()),
      e && e.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
  }
}
class __PRIVATE_FirebaseAppCheckTokenProvider {
  constructor(e) {
    (this.A = e),
      (this.forceRefresh = !1),
      (this.appCheck = null),
      (this.R = null);
  }
  start(e, t) {
    const onTokenChanged = (e) => {
      null != e.error &&
        __PRIVATE_logDebug(
          "FirebaseAppCheckTokenProvider",
          `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`
        );
      const n = e.token !== this.R;
      return (
        (this.R = e.token),
        __PRIVATE_logDebug(
          "FirebaseAppCheckTokenProvider",
          `Received ${n ? "new" : "existing"} token.`
        ),
        n ? t(e.token) : Promise.resolve()
      );
    };
    this.o = (t) => {
      e.enqueueRetryable(() => onTokenChanged(t));
    };
    const __PRIVATE_registerAppCheck = (e) => {
      __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", "AppCheck detected"),
        (this.appCheck = e),
        this.appCheck.addTokenListener(this.o);
    };
    this.A.onInit((e) => __PRIVATE_registerAppCheck(e)),
      setTimeout(() => {
        if (!this.appCheck) {
          const e = this.A.getImmediate({ optional: !0 });
          e
            ? __PRIVATE_registerAppCheck(e)
            : __PRIVATE_logDebug(
                "FirebaseAppCheckTokenProvider",
                "AppCheck not yet detected"
              );
        }
      }, 0);
  }
  getToken() {
    const e = this.forceRefresh;
    return (
      (this.forceRefresh = !1),
      this.appCheck
        ? this.appCheck
            .getToken(e)
            .then((e) =>
              e
                ? (__PRIVATE_hardAssert("string" == typeof e.token),
                  (this.R = e.token),
                  new AppCheckToken(e.token))
                : null
            )
        : Promise.resolve(null)
    );
  }
  invalidateToken() {
    this.forceRefresh = !0;
  }
  shutdown() {
    this.appCheck && this.appCheck.removeTokenListener(this.o);
  }
}
class __PRIVATE_EmptyAppCheckTokenProvider {
  getToken() {
    return Promise.resolve(new AppCheckToken(""));
  }
  invalidateToken() {}
  start(e, t) {}
  shutdown() {}
}
function __PRIVATE_randomBytes(e) {
  const t = "undefined" != typeof self && (self.crypto || self.msCrypto),
    n = new Uint8Array(e);
  if (t && "function" == typeof t.getRandomValues) t.getRandomValues(n);
  else for (let t = 0; t < e; t++) n[t] = Math.floor(256 * Math.random());
  return n;
}
class __PRIVATE_AutoId {
  static newId() {
    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      t = Math.floor(256 / e.length) * e.length;
    let n = "";
    for (; n.length < 20; ) {
      const i = __PRIVATE_randomBytes(40);
      for (let s = 0; s < i.length; ++s)
        n.length < 20 && i[s] < t && (n += e.charAt(i[s] % e.length));
    }
    return n;
  }
}
function __PRIVATE_primitiveComparator(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function __PRIVATE_arrayEquals(e, t, n) {
  return e.length === t.length && e.every((e, i) => n(e, t[i]));
}
function __PRIVATE_immediateSuccessor(e) {
  return e + "\0";
}
class Timestamp {
  constructor(e, t) {
    if (((this.seconds = e), (this.nanoseconds = t), t < 0))
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Timestamp nanoseconds out of range: " + t
      );
    if (t >= 1e9)
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Timestamp nanoseconds out of range: " + t
      );
    if (e < -62135596800)
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Timestamp seconds out of range: " + e
      );
    if (e >= 253402300800)
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Timestamp seconds out of range: " + e
      );
  }
  static now() {
    return Timestamp.fromMillis(Date.now());
  }
  static fromDate(e) {
    return Timestamp.fromMillis(e.getTime());
  }
  static fromMillis(e) {
    const t = Math.floor(e / 1e3),
      n = Math.floor(1e6 * (e - 1e3 * t));
    return new Timestamp(t, n);
  }
  toDate() {
    return new Date(this.toMillis());
  }
  toMillis() {
    return 1e3 * this.seconds + this.nanoseconds / 1e6;
  }
  _compareTo(e) {
    return this.seconds === e.seconds
      ? __PRIVATE_primitiveComparator(this.nanoseconds, e.nanoseconds)
      : __PRIVATE_primitiveComparator(this.seconds, e.seconds);
  }
  isEqual(e) {
    return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
  }
  toString() {
    return (
      "Timestamp(seconds=" +
      this.seconds +
      ", nanoseconds=" +
      this.nanoseconds +
      ")"
    );
  }
  toJSON() {
    return { seconds: this.seconds, nanoseconds: this.nanoseconds };
  }
  valueOf() {
    const e = this.seconds - -62135596800;
    return (
      String(e).padStart(12, "0") +
      "." +
      String(this.nanoseconds).padStart(9, "0")
    );
  }
}
class SnapshotVersion {
  constructor(e) {
    this.timestamp = e;
  }
  static fromTimestamp(e) {
    return new SnapshotVersion(e);
  }
  static min() {
    return new SnapshotVersion(new Timestamp(0, 0));
  }
  static max() {
    return new SnapshotVersion(new Timestamp(253402300799, 999999999));
  }
  compareTo(e) {
    return this.timestamp._compareTo(e.timestamp);
  }
  isEqual(e) {
    return this.timestamp.isEqual(e.timestamp);
  }
  toMicroseconds() {
    return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
  }
  toString() {
    return "SnapshotVersion(" + this.timestamp.toString() + ")";
  }
  toTimestamp() {
    return this.timestamp;
  }
}
class BasePath {
  constructor(e, t, n) {
    void 0 === t ? (t = 0) : t > e.length && fail(),
      void 0 === n ? (n = e.length - t) : n > e.length - t && fail(),
      (this.segments = e),
      (this.offset = t),
      (this.len = n);
  }
  get length() {
    return this.len;
  }
  isEqual(e) {
    return 0 === BasePath.comparator(this, e);
  }
  child(e) {
    const t = this.segments.slice(this.offset, this.limit());
    return (
      e instanceof BasePath
        ? e.forEach((e) => {
            t.push(e);
          })
        : t.push(e),
      this.construct(t)
    );
  }
  limit() {
    return this.offset + this.length;
  }
  popFirst(e) {
    return (
      (e = void 0 === e ? 1 : e),
      this.construct(this.segments, this.offset + e, this.length - e)
    );
  }
  popLast() {
    return this.construct(this.segments, this.offset, this.length - 1);
  }
  firstSegment() {
    return this.segments[this.offset];
  }
  lastSegment() {
    return this.get(this.length - 1);
  }
  get(e) {
    return this.segments[this.offset + e];
  }
  isEmpty() {
    return 0 === this.length;
  }
  isPrefixOf(e) {
    if (e.length < this.length) return !1;
    for (let t = 0; t < this.length; t++)
      if (this.get(t) !== e.get(t)) return !1;
    return !0;
  }
  isImmediateParentOf(e) {
    if (this.length + 1 !== e.length) return !1;
    for (let t = 0; t < this.length; t++)
      if (this.get(t) !== e.get(t)) return !1;
    return !0;
  }
  forEach(e) {
    for (let t = this.offset, n = this.limit(); t < n; t++) e(this.segments[t]);
  }
  toArray() {
    return this.segments.slice(this.offset, this.limit());
  }
  static comparator(e, t) {
    const n = Math.min(e.length, t.length);
    for (let i = 0; i < n; i++) {
      const n = e.get(i),
        s = t.get(i);
      if (n < s) return -1;
      if (n > s) return 1;
    }
    return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
  }
}
class ResourcePath extends BasePath {
  construct(e, t, n) {
    return new ResourcePath(e, t, n);
  }
  canonicalString() {
    return this.toArray().join("/");
  }
  toString() {
    return this.canonicalString();
  }
  static fromString(...e) {
    const t = [];
    for (const n of e) {
      if (n.indexOf("//") >= 0)
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          `Invalid segment (${n}). Paths must not contain // in them.`
        );
      t.push(...n.split("/").filter((e) => e.length > 0));
    }
    return new ResourcePath(t);
  }
  static emptyPath() {
    return new ResourcePath([]);
  }
}
const Ue = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
class FieldPath$1 extends BasePath {
  construct(e, t, n) {
    return new FieldPath$1(e, t, n);
  }
  static isValidIdentifier(e) {
    return Ue.test(e);
  }
  canonicalString() {
    return this.toArray()
      .map(
        (e) => (
          (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`")),
          FieldPath$1.isValidIdentifier(e) || (e = "`" + e + "`"),
          e
        )
      )
      .join(".");
  }
  toString() {
    return this.canonicalString();
  }
  isKeyField() {
    return 1 === this.length && "__name__" === this.get(0);
  }
  static keyField() {
    return new FieldPath$1(["__name__"]);
  }
  static fromServerFormat(e) {
    const t = [];
    let n = "",
      i = 0;
    const __PRIVATE_addCurrentSegment = () => {
      if (0 === n.length)
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
        );
      t.push(n), (n = "");
    };
    let s = !1;
    for (; i < e.length; ) {
      const t = e[i];
      if ("\\" === t) {
        if (i + 1 === e.length)
          throw new FirestoreError(
            $e.INVALID_ARGUMENT,
            "Path has trailing escape character: " + e
          );
        const t = e[i + 1];
        if ("\\" !== t && "." !== t && "`" !== t)
          throw new FirestoreError(
            $e.INVALID_ARGUMENT,
            "Path has invalid escape sequence: " + e
          );
        (n += t), (i += 2);
      } else
        "`" === t
          ? ((s = !s), i++)
          : "." !== t || s
          ? ((n += t), i++)
          : (__PRIVATE_addCurrentSegment(), i++);
    }
    if ((__PRIVATE_addCurrentSegment(), s))
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Unterminated ` in path: " + e
      );
    return new FieldPath$1(t);
  }
  static emptyPath() {
    return new FieldPath$1([]);
  }
}
class DocumentKey {
  constructor(e) {
    this.path = e;
  }
  static fromPath(e) {
    return new DocumentKey(ResourcePath.fromString(e));
  }
  static fromName(e) {
    return new DocumentKey(ResourcePath.fromString(e).popFirst(5));
  }
  static empty() {
    return new DocumentKey(ResourcePath.emptyPath());
  }
  get collectionGroup() {
    return this.path.popLast().lastSegment();
  }
  hasCollectionId(e) {
    return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
  }
  getCollectionGroup() {
    return this.path.get(this.path.length - 2);
  }
  getCollectionPath() {
    return this.path.popLast();
  }
  isEqual(e) {
    return null !== e && 0 === ResourcePath.comparator(this.path, e.path);
  }
  toString() {
    return this.path.toString();
  }
  static comparator(e, t) {
    return ResourcePath.comparator(e.path, t.path);
  }
  static isDocumentKey(e) {
    return e.length % 2 == 0;
  }
  static fromSegments(e) {
    return new DocumentKey(new ResourcePath(e.slice()));
  }
}
class FieldIndex {
  constructor(e, t, n, i) {
    (this.indexId = e),
      (this.collectionGroup = t),
      (this.fields = n),
      (this.indexState = i);
  }
}
function __PRIVATE_fieldIndexGetArraySegment(e) {
  return e.fields.find((e) => 2 === e.kind);
}
function __PRIVATE_fieldIndexGetDirectionalSegments(e) {
  return e.fields.filter((e) => 2 !== e.kind);
}
function __PRIVATE_fieldIndexSemanticComparator(e, t) {
  let n = __PRIVATE_primitiveComparator(e.collectionGroup, t.collectionGroup);
  if (0 !== n) return n;
  for (let i = 0; i < Math.min(e.fields.length, t.fields.length); ++i)
    if (
      ((n = __PRIVATE_indexSegmentComparator(e.fields[i], t.fields[i])),
      0 !== n)
    )
      return n;
  return __PRIVATE_primitiveComparator(e.fields.length, t.fields.length);
}
FieldIndex.UNKNOWN_ID = -1;
class IndexSegment {
  constructor(e, t) {
    (this.fieldPath = e), (this.kind = t);
  }
}
function __PRIVATE_indexSegmentComparator(e, t) {
  const n = FieldPath$1.comparator(e.fieldPath, t.fieldPath);
  return 0 !== n ? n : __PRIVATE_primitiveComparator(e.kind, t.kind);
}
class IndexState {
  constructor(e, t) {
    (this.sequenceNumber = e), (this.offset = t);
  }
  static empty() {
    return new IndexState(0, IndexOffset.min());
  }
}
function __PRIVATE_newIndexOffsetSuccessorFromReadTime(e, t) {
  const n = e.toTimestamp().seconds,
    i = e.toTimestamp().nanoseconds + 1,
    s = SnapshotVersion.fromTimestamp(
      1e9 === i ? new Timestamp(n + 1, 0) : new Timestamp(n, i)
    );
  return new IndexOffset(s, DocumentKey.empty(), t);
}
function __PRIVATE_newIndexOffsetFromDocument(e) {
  return new IndexOffset(e.readTime, e.key, -1);
}
class IndexOffset {
  constructor(e, t, n) {
    (this.readTime = e), (this.documentKey = t), (this.largestBatchId = n);
  }
  static min() {
    return new IndexOffset(SnapshotVersion.min(), DocumentKey.empty(), -1);
  }
  static max() {
    return new IndexOffset(SnapshotVersion.max(), DocumentKey.empty(), -1);
  }
}
function __PRIVATE_indexOffsetComparator(e, t) {
  let n = e.readTime.compareTo(t.readTime);
  return 0 !== n
    ? n
    : ((n = DocumentKey.comparator(e.documentKey, t.documentKey)),
      0 !== n
        ? n
        : __PRIVATE_primitiveComparator(e.largestBatchId, t.largestBatchId));
}
const Ke =
  "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
class PersistenceTransaction {
  constructor() {
    this.onCommittedListeners = [];
  }
  addOnCommittedListener(e) {
    this.onCommittedListeners.push(e);
  }
  raiseOnCommittedEvent() {
    this.onCommittedListeners.forEach((e) => e());
  }
}
async function __PRIVATE_ignoreIfPrimaryLeaseLoss(e) {
  if (e.code !== $e.FAILED_PRECONDITION || e.message !== Ke) throw e;
  __PRIVATE_logDebug("LocalStore", "Unexpectedly lost primary lease");
}
class PersistencePromise {
  constructor(e) {
    (this.nextCallback = null),
      (this.catchCallback = null),
      (this.result = void 0),
      (this.error = void 0),
      (this.isDone = !1),
      (this.callbackAttached = !1),
      e(
        (e) => {
          (this.isDone = !0),
            (this.result = e),
            this.nextCallback && this.nextCallback(e);
        },
        (e) => {
          (this.isDone = !0),
            (this.error = e),
            this.catchCallback && this.catchCallback(e);
        }
      );
  }
  catch(e) {
    return this.next(void 0, e);
  }
  next(e, t) {
    return (
      this.callbackAttached && fail(),
      (this.callbackAttached = !0),
      this.isDone
        ? this.error
          ? this.wrapFailure(t, this.error)
          : this.wrapSuccess(e, this.result)
        : new PersistencePromise((n, i) => {
            (this.nextCallback = (t) => {
              this.wrapSuccess(e, t).next(n, i);
            }),
              (this.catchCallback = (e) => {
                this.wrapFailure(t, e).next(n, i);
              });
          })
    );
  }
  toPromise() {
    return new Promise((e, t) => {
      this.next(e, t);
    });
  }
  wrapUserFunction(e) {
    try {
      const t = e();
      return t instanceof PersistencePromise
        ? t
        : PersistencePromise.resolve(t);
    } catch (e) {
      return PersistencePromise.reject(e);
    }
  }
  wrapSuccess(e, t) {
    return e
      ? this.wrapUserFunction(() => e(t))
      : PersistencePromise.resolve(t);
  }
  wrapFailure(e, t) {
    return e ? this.wrapUserFunction(() => e(t)) : PersistencePromise.reject(t);
  }
  static resolve(e) {
    return new PersistencePromise((t, n) => {
      t(e);
    });
  }
  static reject(e) {
    return new PersistencePromise((t, n) => {
      n(e);
    });
  }
  static waitFor(e) {
    return new PersistencePromise((t, n) => {
      let i = 0,
        s = 0,
        o = !1;
      e.forEach((e) => {
        ++i,
          e.next(
            () => {
              ++s, o && s === i && t();
            },
            (e) => n(e)
          );
      }),
        (o = !0),
        s === i && t();
    });
  }
  static or(e) {
    let t = PersistencePromise.resolve(!1);
    for (const n of e)
      t = t.next((e) => (e ? PersistencePromise.resolve(e) : n()));
    return t;
  }
  static forEach(e, t) {
    const n = [];
    return (
      e.forEach((e, i) => {
        n.push(t.call(this, e, i));
      }),
      this.waitFor(n)
    );
  }
  static mapArray(e, t) {
    return new PersistencePromise((n, i) => {
      const s = e.length,
        o = new Array(s);
      let u = 0;
      for (let l = 0; l < s; l++) {
        const _ = l;
        t(e[_]).next(
          (e) => {
            (o[_] = e), ++u, u === s && n(o);
          },
          (e) => i(e)
        );
      }
    });
  }
  static doWhile(e, t) {
    return new PersistencePromise((n, i) => {
      const process = () => {
        !0 === e()
          ? t().next(() => {
              process();
            }, i)
          : n();
      };
      process();
    });
  }
}
class __PRIVATE_SimpleDbTransaction {
  constructor(e, t) {
    (this.action = e),
      (this.transaction = t),
      (this.aborted = !1),
      (this.V = new __PRIVATE_Deferred()),
      (this.transaction.oncomplete = () => {
        this.V.resolve();
      }),
      (this.transaction.onabort = () => {
        t.error
          ? this.V.reject(new __PRIVATE_IndexedDbTransactionError(e, t.error))
          : this.V.resolve();
      }),
      (this.transaction.onerror = (t) => {
        const n = __PRIVATE_checkForAndReportiOSError(t.target.error);
        this.V.reject(new __PRIVATE_IndexedDbTransactionError(e, n));
      });
  }
  static open(e, t, n, i) {
    try {
      return new __PRIVATE_SimpleDbTransaction(t, e.transaction(i, n));
    } catch (e) {
      throw new __PRIVATE_IndexedDbTransactionError(t, e);
    }
  }
  get m() {
    return this.V.promise;
  }
  abort(e) {
    e && this.V.reject(e),
      this.aborted ||
        (__PRIVATE_logDebug(
          "SimpleDb",
          "Aborting transaction:",
          e ? e.message : "Client-initiated abort"
        ),
        (this.aborted = !0),
        this.transaction.abort());
  }
  g() {
    const e = this.transaction;
    this.aborted || "function" != typeof e.commit || e.commit();
  }
  store(e) {
    const t = this.transaction.objectStore(e);
    return new __PRIVATE_SimpleDbStore(t);
  }
}
class __PRIVATE_SimpleDb {
  constructor(e, t, n) {
    (this.name = e),
      (this.version = t),
      (this.p = n),
      12.2 === __PRIVATE_SimpleDb.S(getUA()) &&
        __PRIVATE_logError(
          "Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround."
        );
  }
  static delete(e) {
    return (
      __PRIVATE_logDebug("SimpleDb", "Removing database:", e),
      __PRIVATE_wrapRequest(window.indexedDB.deleteDatabase(e)).toPromise()
    );
  }
  static D() {
    if (
      !(function isIndexedDBAvailable() {
        try {
          return "object" == typeof indexedDB;
        } catch (e) {
          return !1;
        }
      })()
    )
      return !1;
    if (__PRIVATE_SimpleDb.C()) return !0;
    const e = getUA(),
      t = __PRIVATE_SimpleDb.S(e),
      n = 0 < t && t < 10,
      i = __PRIVATE_SimpleDb.v(e),
      s = 0 < i && i < 4.5;
    return !(
      e.indexOf("MSIE ") > 0 ||
      e.indexOf("Trident/") > 0 ||
      e.indexOf("Edge/") > 0 ||
      n ||
      s
    );
  }
  static C() {
    var e;
    return (
      "undefined" != typeof process &&
      "YES" === (null === (e = process.env) || void 0 === e ? void 0 : e.F)
    );
  }
  static M(e, t) {
    return e.store(t);
  }
  static S(e) {
    const t = e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
      n = t ? t[1].split("_").slice(0, 2).join(".") : "-1";
    return Number(n);
  }
  static v(e) {
    const t = e.match(/Android ([\d.]+)/i),
      n = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
    return Number(n);
  }
  async O(e) {
    return (
      this.db ||
        (__PRIVATE_logDebug("SimpleDb", "Opening database:", this.name),
        (this.db = await new Promise((t, n) => {
          const i = indexedDB.open(this.name, this.version);
          (i.onsuccess = (e) => {
            const n = e.target.result;
            t(n);
          }),
            (i.onblocked = () => {
              n(
                new __PRIVATE_IndexedDbTransactionError(
                  e,
                  "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."
                )
              );
            }),
            (i.onerror = (t) => {
              const i = t.target.error;
              "VersionError" === i.name
                ? n(
                    new FirestoreError(
                      $e.FAILED_PRECONDITION,
                      "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh."
                    )
                  )
                : "InvalidStateError" === i.name
                ? n(
                    new FirestoreError(
                      $e.FAILED_PRECONDITION,
                      "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " +
                        i
                    )
                  )
                : n(new __PRIVATE_IndexedDbTransactionError(e, i));
            }),
            (i.onupgradeneeded = (e) => {
              __PRIVATE_logDebug(
                "SimpleDb",
                'Database "' + this.name + '" requires upgrade from version:',
                e.oldVersion
              );
              const t = e.target.result;
              this.p
                .N(t, i.transaction, e.oldVersion, this.version)
                .next(() => {
                  __PRIVATE_logDebug(
                    "SimpleDb",
                    "Database upgrade to version " + this.version + " complete"
                  );
                });
            });
        }))),
      this.B && (this.db.onversionchange = (e) => this.B(e)),
      this.db
    );
  }
  L(e) {
    (this.B = e), this.db && (this.db.onversionchange = (t) => e(t));
  }
  async runTransaction(e, t, n, i) {
    const s = "readonly" === t;
    let o = 0;
    for (;;) {
      ++o;
      try {
        this.db = await this.O(e);
        const t = __PRIVATE_SimpleDbTransaction.open(
            this.db,
            e,
            s ? "readonly" : "readwrite",
            n
          ),
          o = i(t)
            .next((e) => (t.g(), e))
            .catch((e) => (t.abort(e), PersistencePromise.reject(e)))
            .toPromise();
        return o.catch(() => {}), await t.m, o;
      } catch (e) {
        const t = e,
          n = "FirebaseError" !== t.name && o < 3;
        if (
          (__PRIVATE_logDebug(
            "SimpleDb",
            "Transaction failed with error:",
            t.message,
            "Retrying:",
            n
          ),
          this.close(),
          !n)
        )
          return Promise.reject(t);
      }
    }
  }
  close() {
    this.db && this.db.close(), (this.db = void 0);
  }
}
class __PRIVATE_IterationController {
  constructor(e) {
    (this.k = e), (this.q = !1), (this.K = null);
  }
  get isDone() {
    return this.q;
  }
  get $() {
    return this.K;
  }
  set cursor(e) {
    this.k = e;
  }
  done() {
    this.q = !0;
  }
  U(e) {
    this.K = e;
  }
  delete() {
    return __PRIVATE_wrapRequest(this.k.delete());
  }
}
class __PRIVATE_IndexedDbTransactionError extends FirestoreError {
  constructor(e, t) {
    super($e.UNAVAILABLE, `IndexedDB transaction '${e}' failed: ${t}`),
      (this.name = "IndexedDbTransactionError");
  }
}
function __PRIVATE_isIndexedDbTransactionError(e) {
  return "IndexedDbTransactionError" === e.name;
}
class __PRIVATE_SimpleDbStore {
  constructor(e) {
    this.store = e;
  }
  put(e, t) {
    let n;
    return (
      void 0 !== t
        ? (__PRIVATE_logDebug("SimpleDb", "PUT", this.store.name, e, t),
          (n = this.store.put(t, e)))
        : (__PRIVATE_logDebug(
            "SimpleDb",
            "PUT",
            this.store.name,
            "<auto-key>",
            e
          ),
          (n = this.store.put(e))),
      __PRIVATE_wrapRequest(n)
    );
  }
  add(e) {
    return (
      __PRIVATE_logDebug("SimpleDb", "ADD", this.store.name, e, e),
      __PRIVATE_wrapRequest(this.store.add(e))
    );
  }
  get(e) {
    return __PRIVATE_wrapRequest(this.store.get(e)).next(
      (t) => (
        void 0 === t && (t = null),
        __PRIVATE_logDebug("SimpleDb", "GET", this.store.name, e, t),
        t
      )
    );
  }
  delete(e) {
    return (
      __PRIVATE_logDebug("SimpleDb", "DELETE", this.store.name, e),
      __PRIVATE_wrapRequest(this.store.delete(e))
    );
  }
  count() {
    return (
      __PRIVATE_logDebug("SimpleDb", "COUNT", this.store.name),
      __PRIVATE_wrapRequest(this.store.count())
    );
  }
  W(e, t) {
    const n = this.options(e, t);
    if (n.index || "function" != typeof this.store.getAll) {
      const e = this.cursor(n),
        t = [];
      return this.G(e, (e, n) => {
        t.push(n);
      }).next(() => t);
    }
    {
      const e = this.store.getAll(n.range);
      return new PersistencePromise((t, n) => {
        (e.onerror = (e) => {
          n(e.target.error);
        }),
          (e.onsuccess = (e) => {
            t(e.target.result);
          });
      });
    }
  }
  j(e, t) {
    const n = this.store.getAll(e, null === t ? void 0 : t);
    return new PersistencePromise((e, t) => {
      (n.onerror = (e) => {
        t(e.target.error);
      }),
        (n.onsuccess = (t) => {
          e(t.target.result);
        });
    });
  }
  H(e, t) {
    __PRIVATE_logDebug("SimpleDb", "DELETE ALL", this.store.name);
    const n = this.options(e, t);
    n.J = !1;
    const i = this.cursor(n);
    return this.G(i, (e, t, n) => n.delete());
  }
  Y(e, t) {
    let n;
    t ? (n = e) : ((n = {}), (t = e));
    const i = this.cursor(n);
    return this.G(i, t);
  }
  Z(e) {
    const t = this.cursor({});
    return new PersistencePromise((n, i) => {
      (t.onerror = (e) => {
        const t = __PRIVATE_checkForAndReportiOSError(e.target.error);
        i(t);
      }),
        (t.onsuccess = (t) => {
          const i = t.target.result;
          i
            ? e(i.primaryKey, i.value).next((e) => {
                e ? i.continue() : n();
              })
            : n();
        });
    });
  }
  G(e, t) {
    const n = [];
    return new PersistencePromise((i, s) => {
      (e.onerror = (e) => {
        s(e.target.error);
      }),
        (e.onsuccess = (e) => {
          const s = e.target.result;
          if (!s) return void i();
          const o = new __PRIVATE_IterationController(s),
            u = t(s.primaryKey, s.value, o);
          if (u instanceof PersistencePromise) {
            const e = u.catch((e) => (o.done(), PersistencePromise.reject(e)));
            n.push(e);
          }
          o.isDone ? i() : null === o.$ ? s.continue() : s.continue(o.$);
        });
    }).next(() => PersistencePromise.waitFor(n));
  }
  options(e, t) {
    let n;
    return (
      void 0 !== e && ("string" == typeof e ? (n = e) : (t = e)),
      { index: n, range: t }
    );
  }
  cursor(e) {
    let t = "next";
    if ((e.reverse && (t = "prev"), e.index)) {
      const n = this.store.index(e.index);
      return e.J ? n.openKeyCursor(e.range, t) : n.openCursor(e.range, t);
    }
    return this.store.openCursor(e.range, t);
  }
}
function __PRIVATE_wrapRequest(e) {
  return new PersistencePromise((t, n) => {
    (e.onsuccess = (e) => {
      const n = e.target.result;
      t(n);
    }),
      (e.onerror = (e) => {
        const t = __PRIVATE_checkForAndReportiOSError(e.target.error);
        n(t);
      });
  });
}
let Qe = !1;
function __PRIVATE_checkForAndReportiOSError(e) {
  const t = __PRIVATE_SimpleDb.S(getUA());
  if (t >= 12.2 && t < 13) {
    const t =
      "An internal error was encountered in the Indexed Database server";
    if (e.message.indexOf(t) >= 0) {
      const e = new FirestoreError(
        "internal",
        `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`
      );
      return (
        Qe ||
          ((Qe = !0),
          setTimeout(() => {
            throw e;
          }, 0)),
        e
      );
    }
  }
  return e;
}
class __PRIVATE_IndexBackfillerScheduler {
  constructor(e, t) {
    (this.asyncQueue = e), (this.X = t), (this.task = null);
  }
  start() {
    this.ee(15e3);
  }
  stop() {
    this.task && (this.task.cancel(), (this.task = null));
  }
  get started() {
    return null !== this.task;
  }
  ee(e) {
    __PRIVATE_logDebug("IndexBackiller", `Scheduled in ${e}ms`),
      (this.task = this.asyncQueue.enqueueAfterDelay(
        "index_backfill",
        e,
        async () => {
          this.task = null;
          try {
            __PRIVATE_logDebug(
              "IndexBackiller",
              `Documents written: ${await this.X.te()}`
            );
          } catch (e) {
            __PRIVATE_isIndexedDbTransactionError(e)
              ? __PRIVATE_logDebug(
                  "IndexBackiller",
                  "Ignoring IndexedDB error during index backfill: ",
                  e
                )
              : await __PRIVATE_ignoreIfPrimaryLeaseLoss(e);
          }
          await this.ee(6e4);
        }
      ));
  }
}
class __PRIVATE_IndexBackfiller {
  constructor(e, t) {
    (this.localStore = e), (this.persistence = t);
  }
  async te(e = 50) {
    return this.persistence.runTransaction(
      "Backfill Indexes",
      "readwrite-primary",
      (t) => this.ne(t, e)
    );
  }
  ne(e, t) {
    const n = new Set();
    let i = t,
      s = !0;
    return PersistencePromise.doWhile(
      () => !0 === s && i > 0,
      () =>
        this.localStore.indexManager
          .getNextCollectionGroupToUpdate(e)
          .next((t) => {
            if (null !== t && !n.has(t))
              return (
                __PRIVATE_logDebug(
                  "IndexBackiller",
                  `Processing collection: ${t}`
                ),
                this.re(e, t, i).next((e) => {
                  (i -= e), n.add(t);
                })
              );
            s = !1;
          })
    ).next(() => t - i);
  }
  re(e, t, n) {
    return this.localStore.indexManager
      .getMinOffsetFromCollectionGroup(e, t)
      .next((i) =>
        this.localStore.localDocuments
          .getNextDocuments(e, t, i, n)
          .next((n) => {
            const s = n.changes;
            return this.localStore.indexManager
              .updateIndexEntries(e, s)
              .next(() => this.ie(i, n))
              .next(
                (n) => (
                  __PRIVATE_logDebug("IndexBackiller", `Updating offset: ${n}`),
                  this.localStore.indexManager.updateCollectionGroup(e, t, n)
                )
              )
              .next(() => s.size);
          })
      );
  }
  ie(e, t) {
    let n = e;
    return (
      t.changes.forEach((e, t) => {
        const i = __PRIVATE_newIndexOffsetFromDocument(t);
        __PRIVATE_indexOffsetComparator(i, n) > 0 && (n = i);
      }),
      new IndexOffset(
        n.readTime,
        n.documentKey,
        Math.max(t.batchId, e.largestBatchId)
      )
    );
  }
}
class __PRIVATE_ListenSequence {
  constructor(e, t) {
    (this.previousValue = e),
      t &&
        ((t.sequenceNumberHandler = (e) => this.se(e)),
        (this.oe = (e) => t.writeSequenceNumber(e)));
  }
  se(e) {
    return (
      (this.previousValue = Math.max(e, this.previousValue)), this.previousValue
    );
  }
  next() {
    const e = ++this.previousValue;
    return this.oe && this.oe(e), e;
  }
}
function __PRIVATE_isNullOrUndefined(e) {
  return null == e;
}
function __PRIVATE_isNegativeZero(e) {
  return 0 === e && 1 / e == -1 / 0;
}
function isSafeInteger(e) {
  return (
    "number" == typeof e &&
    Number.isInteger(e) &&
    !__PRIVATE_isNegativeZero(e) &&
    e <= Number.MAX_SAFE_INTEGER &&
    e >= Number.MIN_SAFE_INTEGER
  );
}
function __PRIVATE_encodeResourcePath(e) {
  let t = "";
  for (let n = 0; n < e.length; n++)
    t.length > 0 && (t = __PRIVATE_encodeSeparator(t)),
      (t = __PRIVATE_encodeSegment(e.get(n), t));
  return __PRIVATE_encodeSeparator(t);
}
function __PRIVATE_encodeSegment(e, t) {
  let n = t;
  const i = e.length;
  for (let t = 0; t < i; t++) {
    const i = e.charAt(t);
    switch (i) {
      case "\0":
        n += "";
        break;
      case "":
        n += "";
        break;
      default:
        n += i;
    }
  }
  return n;
}
function __PRIVATE_encodeSeparator(e) {
  return e + "";
}
function __PRIVATE_decodeResourcePath(e) {
  const t = e.length;
  if ((__PRIVATE_hardAssert(t >= 2), 2 === t))
    return (
      __PRIVATE_hardAssert("" === e.charAt(0) && "" === e.charAt(1)),
      ResourcePath.emptyPath()
    );
  const __PRIVATE_lastReasonableEscapeIndex = t - 2,
    n = [];
  let i = "";
  for (let s = 0; s < t; ) {
    const t = e.indexOf("", s);
    switch (
      ((t < 0 || t > __PRIVATE_lastReasonableEscapeIndex) && fail(),
      e.charAt(t + 1))
    ) {
      case "":
        const o = e.substring(s, t);
        let u;
        0 === i.length ? (u = o) : ((i += o), (u = i), (i = "")), n.push(u);
        break;
      case "":
        (i += e.substring(s, t)), (i += "\0");
        break;
      case "":
        i += e.substring(s, t + 1);
        break;
      default:
        fail();
    }
    s = t + 2;
  }
  return new ResourcePath(n);
}
__PRIVATE_ListenSequence._e = -1;
const Ge = ["userId", "batchId"];
function __PRIVATE_newDbDocumentMutationPrefixForPath(e, t) {
  return [e, __PRIVATE_encodeResourcePath(t)];
}
function __PRIVATE_newDbDocumentMutationKey(e, t, n) {
  return [e, __PRIVATE_encodeResourcePath(t), n];
}
const ze = {},
  We = ["prefixPath", "collectionGroup", "readTime", "documentId"],
  je = ["prefixPath", "collectionGroup", "documentId"],
  He = ["collectionGroup", "readTime", "prefixPath", "documentId"],
  Ye = ["canonicalId", "targetId"],
  Je = ["targetId", "path"],
  Xe = ["path", "targetId"],
  Ze = ["collectionId", "parent"],
  et = ["indexId", "uid"],
  tt = ["uid", "sequenceNumber"],
  nt = [
    "indexId",
    "uid",
    "arrayValue",
    "directionalValue",
    "orderedDocumentKey",
    "documentKey",
  ],
  rt = ["indexId", "uid", "orderedDocumentKey"],
  it = ["userId", "collectionPath", "documentId"],
  st = ["userId", "collectionPath", "largestBatchId"],
  ot = ["userId", "collectionGroup", "largestBatchId"],
  at = [
    "mutationQueues",
    "mutations",
    "documentMutations",
    "remoteDocuments",
    "targets",
    "owner",
    "targetGlobal",
    "targetDocuments",
    "clientMetadata",
    "remoteDocumentGlobal",
    "collectionParents",
    "bundles",
    "namedQueries",
  ],
  ct = [...at, "documentOverlays"],
  ut = [
    "mutationQueues",
    "mutations",
    "documentMutations",
    "remoteDocumentsV14",
    "targets",
    "owner",
    "targetGlobal",
    "targetDocuments",
    "clientMetadata",
    "remoteDocumentGlobal",
    "collectionParents",
    "bundles",
    "namedQueries",
    "documentOverlays",
  ],
  lt = ut,
  _t = [...lt, "indexConfiguration", "indexState", "indexEntries"];
class __PRIVATE_IndexedDbTransaction extends PersistenceTransaction {
  constructor(e, t) {
    super(), (this.ae = e), (this.currentSequenceNumber = t);
  }
}
function __PRIVATE_getStore(e, t) {
  const n = __PRIVATE_debugCast(e);
  return __PRIVATE_SimpleDb.M(n.ae, t);
}
function __PRIVATE_objectSize(e) {
  let t = 0;
  for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
  return t;
}
function forEach(e, t) {
  for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
}
function isEmpty(e) {
  for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
  return !0;
}
class SortedMap {
  constructor(e, t) {
    (this.comparator = e), (this.root = t || LLRBNode.EMPTY);
  }
  insert(e, t) {
    return new SortedMap(
      this.comparator,
      this.root
        .insert(e, t, this.comparator)
        .copy(null, null, LLRBNode.BLACK, null, null)
    );
  }
  remove(e) {
    return new SortedMap(
      this.comparator,
      this.root
        .remove(e, this.comparator)
        .copy(null, null, LLRBNode.BLACK, null, null)
    );
  }
  get(e) {
    let t = this.root;
    for (; !t.isEmpty(); ) {
      const n = this.comparator(e, t.key);
      if (0 === n) return t.value;
      n < 0 ? (t = t.left) : n > 0 && (t = t.right);
    }
    return null;
  }
  indexOf(e) {
    let t = 0,
      n = this.root;
    for (; !n.isEmpty(); ) {
      const i = this.comparator(e, n.key);
      if (0 === i) return t + n.left.size;
      i < 0 ? (n = n.left) : ((t += n.left.size + 1), (n = n.right));
    }
    return -1;
  }
  isEmpty() {
    return this.root.isEmpty();
  }
  get size() {
    return this.root.size;
  }
  minKey() {
    return this.root.minKey();
  }
  maxKey() {
    return this.root.maxKey();
  }
  inorderTraversal(e) {
    return this.root.inorderTraversal(e);
  }
  forEach(e) {
    this.inorderTraversal((t, n) => (e(t, n), !1));
  }
  toString() {
    const e = [];
    return (
      this.inorderTraversal((t, n) => (e.push(`${t}:${n}`), !1)),
      `{${e.join(", ")}}`
    );
  }
  reverseTraversal(e) {
    return this.root.reverseTraversal(e);
  }
  getIterator() {
    return new SortedMapIterator(this.root, null, this.comparator, !1);
  }
  getIteratorFrom(e) {
    return new SortedMapIterator(this.root, e, this.comparator, !1);
  }
  getReverseIterator() {
    return new SortedMapIterator(this.root, null, this.comparator, !0);
  }
  getReverseIteratorFrom(e) {
    return new SortedMapIterator(this.root, e, this.comparator, !0);
  }
}
class SortedMapIterator {
  constructor(e, t, n, i) {
    (this.isReverse = i), (this.nodeStack = []);
    let s = 1;
    for (; !e.isEmpty(); )
      if (((s = t ? n(e.key, t) : 1), t && i && (s *= -1), s < 0))
        e = this.isReverse ? e.left : e.right;
      else {
        if (0 === s) {
          this.nodeStack.push(e);
          break;
        }
        this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left);
      }
  }
  getNext() {
    let e = this.nodeStack.pop();
    const t = { key: e.key, value: e.value };
    if (this.isReverse)
      for (e = e.left; !e.isEmpty(); ) this.nodeStack.push(e), (e = e.right);
    else for (e = e.right; !e.isEmpty(); ) this.nodeStack.push(e), (e = e.left);
    return t;
  }
  hasNext() {
    return this.nodeStack.length > 0;
  }
  peek() {
    if (0 === this.nodeStack.length) return null;
    const e = this.nodeStack[this.nodeStack.length - 1];
    return { key: e.key, value: e.value };
  }
}
class LLRBNode {
  constructor(e, t, n, i, s) {
    (this.key = e),
      (this.value = t),
      (this.color = null != n ? n : LLRBNode.RED),
      (this.left = null != i ? i : LLRBNode.EMPTY),
      (this.right = null != s ? s : LLRBNode.EMPTY),
      (this.size = this.left.size + 1 + this.right.size);
  }
  copy(e, t, n, i, s) {
    return new LLRBNode(
      null != e ? e : this.key,
      null != t ? t : this.value,
      null != n ? n : this.color,
      null != i ? i : this.left,
      null != s ? s : this.right
    );
  }
  isEmpty() {
    return !1;
  }
  inorderTraversal(e) {
    return (
      this.left.inorderTraversal(e) ||
      e(this.key, this.value) ||
      this.right.inorderTraversal(e)
    );
  }
  reverseTraversal(e) {
    return (
      this.right.reverseTraversal(e) ||
      e(this.key, this.value) ||
      this.left.reverseTraversal(e)
    );
  }
  min() {
    return this.left.isEmpty() ? this : this.left.min();
  }
  minKey() {
    return this.min().key;
  }
  maxKey() {
    return this.right.isEmpty() ? this.key : this.right.maxKey();
  }
  insert(e, t, n) {
    let i = this;
    const s = n(e, i.key);
    return (
      (i =
        s < 0
          ? i.copy(null, null, null, i.left.insert(e, t, n), null)
          : 0 === s
          ? i.copy(null, t, null, null, null)
          : i.copy(null, null, null, null, i.right.insert(e, t, n))),
      i.fixUp()
    );
  }
  removeMin() {
    if (this.left.isEmpty()) return LLRBNode.EMPTY;
    let e = this;
    return (
      e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()),
      (e = e.copy(null, null, null, e.left.removeMin(), null)),
      e.fixUp()
    );
  }
  remove(e, t) {
    let n,
      i = this;
    if (t(e, i.key) < 0)
      i.left.isEmpty() ||
        i.left.isRed() ||
        i.left.left.isRed() ||
        (i = i.moveRedLeft()),
        (i = i.copy(null, null, null, i.left.remove(e, t), null));
    else {
      if (
        (i.left.isRed() && (i = i.rotateRight()),
        i.right.isEmpty() ||
          i.right.isRed() ||
          i.right.left.isRed() ||
          (i = i.moveRedRight()),
        0 === t(e, i.key))
      ) {
        if (i.right.isEmpty()) return LLRBNode.EMPTY;
        (n = i.right.min()),
          (i = i.copy(n.key, n.value, null, null, i.right.removeMin()));
      }
      i = i.copy(null, null, null, null, i.right.remove(e, t));
    }
    return i.fixUp();
  }
  isRed() {
    return this.color;
  }
  fixUp() {
    let e = this;
    return (
      e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
      e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
      e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
      e
    );
  }
  moveRedLeft() {
    let e = this.colorFlip();
    return (
      e.right.left.isRed() &&
        ((e = e.copy(null, null, null, null, e.right.rotateRight())),
        (e = e.rotateLeft()),
        (e = e.colorFlip())),
      e
    );
  }
  moveRedRight() {
    let e = this.colorFlip();
    return (
      e.left.left.isRed() && ((e = e.rotateRight()), (e = e.colorFlip())), e
    );
  }
  rotateLeft() {
    const e = this.copy(null, null, LLRBNode.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, e, null);
  }
  rotateRight() {
    const e = this.copy(null, null, LLRBNode.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, e);
  }
  colorFlip() {
    const e = this.left.copy(null, null, !this.left.color, null, null),
      t = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, e, t);
  }
  checkMaxDepth() {
    const e = this.check();
    return Math.pow(2, e) <= this.size + 1;
  }
  check() {
    if (this.isRed() && this.left.isRed()) throw fail();
    if (this.right.isRed()) throw fail();
    const e = this.left.check();
    if (e !== this.right.check()) throw fail();
    return e + (this.isRed() ? 0 : 1);
  }
}
(LLRBNode.EMPTY = null),
  (LLRBNode.RED = !0),
  (LLRBNode.BLACK = !1),
  (LLRBNode.EMPTY = new (class LLRBEmptyNode {
    constructor() {
      this.size = 0;
    }
    get key() {
      throw fail();
    }
    get value() {
      throw fail();
    }
    get color() {
      throw fail();
    }
    get left() {
      throw fail();
    }
    get right() {
      throw fail();
    }
    copy(e, t, n, i, s) {
      return this;
    }
    insert(e, t, n) {
      return new LLRBNode(e, t);
    }
    remove(e, t) {
      return this;
    }
    isEmpty() {
      return !0;
    }
    inorderTraversal(e) {
      return !1;
    }
    reverseTraversal(e) {
      return !1;
    }
    minKey() {
      return null;
    }
    maxKey() {
      return null;
    }
    isRed() {
      return !1;
    }
    checkMaxDepth() {
      return !0;
    }
    check() {
      return 0;
    }
  })());
class SortedSet {
  constructor(e) {
    (this.comparator = e), (this.data = new SortedMap(this.comparator));
  }
  has(e) {
    return null !== this.data.get(e);
  }
  first() {
    return this.data.minKey();
  }
  last() {
    return this.data.maxKey();
  }
  get size() {
    return this.data.size;
  }
  indexOf(e) {
    return this.data.indexOf(e);
  }
  forEach(e) {
    this.data.inorderTraversal((t, n) => (e(t), !1));
  }
  forEachInRange(e, t) {
    const n = this.data.getIteratorFrom(e[0]);
    for (; n.hasNext(); ) {
      const i = n.getNext();
      if (this.comparator(i.key, e[1]) >= 0) return;
      t(i.key);
    }
  }
  forEachWhile(e, t) {
    let n;
    for (
      n = void 0 !== t ? this.data.getIteratorFrom(t) : this.data.getIterator();
      n.hasNext();

    )
      if (!e(n.getNext().key)) return;
  }
  firstAfterOrEqual(e) {
    const t = this.data.getIteratorFrom(e);
    return t.hasNext() ? t.getNext().key : null;
  }
  getIterator() {
    return new SortedSetIterator(this.data.getIterator());
  }
  getIteratorFrom(e) {
    return new SortedSetIterator(this.data.getIteratorFrom(e));
  }
  add(e) {
    return this.copy(this.data.remove(e).insert(e, !0));
  }
  delete(e) {
    return this.has(e) ? this.copy(this.data.remove(e)) : this;
  }
  isEmpty() {
    return this.data.isEmpty();
  }
  unionWith(e) {
    let t = this;
    return (
      t.size < e.size && ((t = e), (e = this)),
      e.forEach((e) => {
        t = t.add(e);
      }),
      t
    );
  }
  isEqual(e) {
    if (!(e instanceof SortedSet)) return !1;
    if (this.size !== e.size) return !1;
    const t = this.data.getIterator(),
      n = e.data.getIterator();
    for (; t.hasNext(); ) {
      const e = t.getNext().key,
        i = n.getNext().key;
      if (0 !== this.comparator(e, i)) return !1;
    }
    return !0;
  }
  toArray() {
    const e = [];
    return (
      this.forEach((t) => {
        e.push(t);
      }),
      e
    );
  }
  toString() {
    const e = [];
    return this.forEach((t) => e.push(t)), "SortedSet(" + e.toString() + ")";
  }
  copy(e) {
    const t = new SortedSet(this.comparator);
    return (t.data = e), t;
  }
}
class SortedSetIterator {
  constructor(e) {
    this.iter = e;
  }
  getNext() {
    return this.iter.getNext().key;
  }
  hasNext() {
    return this.iter.hasNext();
  }
}
function __PRIVATE_advanceIterator(e) {
  return e.hasNext() ? e.getNext() : void 0;
}
class FieldMask {
  constructor(e) {
    (this.fields = e), e.sort(FieldPath$1.comparator);
  }
  static empty() {
    return new FieldMask([]);
  }
  unionWith(e) {
    let t = new SortedSet(FieldPath$1.comparator);
    for (const e of this.fields) t = t.add(e);
    for (const n of e) t = t.add(n);
    return new FieldMask(t.toArray());
  }
  covers(e) {
    for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
    return !1;
  }
  isEqual(e) {
    return __PRIVATE_arrayEquals(this.fields, e.fields, (e, t) => e.isEqual(t));
  }
}
class __PRIVATE_Base64DecodeError extends Error {
  constructor() {
    super(...arguments), (this.name = "Base64DecodeError");
  }
}
function __PRIVATE_isBase64Available() {
  return "undefined" != typeof atob;
}
class ByteString {
  constructor(e) {
    this.binaryString = e;
  }
  static fromBase64String(e) {
    const t = (function __PRIVATE_decodeBase64(e) {
      try {
        return atob(e);
      } catch (e) {
        throw "undefined" != typeof DOMException && e instanceof DOMException
          ? new __PRIVATE_Base64DecodeError("Invalid base64 string: " + e)
          : e;
      }
    })(e);
    return new ByteString(t);
  }
  static fromUint8Array(e) {
    const t = (function __PRIVATE_binaryStringFromUint8Array(e) {
      let t = "";
      for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
      return t;
    })(e);
    return new ByteString(t);
  }
  [Symbol.iterator]() {
    let e = 0;
    return {
      next: () =>
        e < this.binaryString.length
          ? { value: this.binaryString.charCodeAt(e++), done: !1 }
          : { value: void 0, done: !0 },
    };
  }
  toBase64() {
    return (function __PRIVATE_encodeBase64(e) {
      return btoa(e);
    })(this.binaryString);
  }
  toUint8Array() {
    return (function __PRIVATE_uint8ArrayFromBinaryString(e) {
      const t = new Uint8Array(e.length);
      for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
      return t;
    })(this.binaryString);
  }
  approximateByteSize() {
    return 2 * this.binaryString.length;
  }
  compareTo(e) {
    return __PRIVATE_primitiveComparator(this.binaryString, e.binaryString);
  }
  isEqual(e) {
    return this.binaryString === e.binaryString;
  }
}
ByteString.EMPTY_BYTE_STRING = new ByteString("");
const ht = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function __PRIVATE_normalizeTimestamp(e) {
  if ((__PRIVATE_hardAssert(!!e), "string" == typeof e)) {
    let t = 0;
    const n = ht.exec(e);
    if ((__PRIVATE_hardAssert(!!n), n[1])) {
      let e = n[1];
      (e = (e + "000000000").substr(0, 9)), (t = Number(e));
    }
    const i = new Date(e);
    return { seconds: Math.floor(i.getTime() / 1e3), nanos: t };
  }
  return {
    seconds: __PRIVATE_normalizeNumber(e.seconds),
    nanos: __PRIVATE_normalizeNumber(e.nanos),
  };
}
function __PRIVATE_normalizeNumber(e) {
  return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0;
}
function __PRIVATE_normalizeByteString(e) {
  return "string" == typeof e
    ? ByteString.fromBase64String(e)
    : ByteString.fromUint8Array(e);
}
function __PRIVATE_isServerTimestamp(e) {
  var t, n;
  return (
    "server_timestamp" ===
    (null ===
      (n = (
        (null === (t = null == e ? void 0 : e.mapValue) || void 0 === t
          ? void 0
          : t.fields) || {}
      ).__type__) || void 0 === n
      ? void 0
      : n.stringValue)
  );
}
function __PRIVATE_getPreviousValue(e) {
  const t = e.mapValue.fields.__previous_value__;
  return __PRIVATE_isServerTimestamp(t) ? __PRIVATE_getPreviousValue(t) : t;
}
function __PRIVATE_getLocalWriteTime(e) {
  const t = __PRIVATE_normalizeTimestamp(
    e.mapValue.fields.__local_write_time__.timestampValue
  );
  return new Timestamp(t.seconds, t.nanos);
}
class DatabaseInfo {
  constructor(e, t, n, i, s, o, u, l, _) {
    (this.databaseId = e),
      (this.appId = t),
      (this.persistenceKey = n),
      (this.host = i),
      (this.ssl = s),
      (this.forceLongPolling = o),
      (this.autoDetectLongPolling = u),
      (this.longPollingOptions = l),
      (this.useFetchStreams = _);
  }
}
class DatabaseId {
  constructor(e, t) {
    (this.projectId = e), (this.database = t || "(default)");
  }
  static empty() {
    return new DatabaseId("", "");
  }
  get isDefaultDatabase() {
    return "(default)" === this.database;
  }
  isEqual(e) {
    return (
      e instanceof DatabaseId &&
      e.projectId === this.projectId &&
      e.database === this.database
    );
  }
}
const dt = { mapValue: { fields: { __type__: { stringValue: "__max__" } } } },
  mt = { nullValue: "NULL_VALUE" };
function __PRIVATE_typeOrder(e) {
  return "nullValue" in e
    ? 0
    : "booleanValue" in e
    ? 1
    : "integerValue" in e || "doubleValue" in e
    ? 2
    : "timestampValue" in e
    ? 3
    : "stringValue" in e
    ? 5
    : "bytesValue" in e
    ? 6
    : "referenceValue" in e
    ? 7
    : "geoPointValue" in e
    ? 8
    : "arrayValue" in e
    ? 9
    : "mapValue" in e
    ? __PRIVATE_isServerTimestamp(e)
      ? 4
      : __PRIVATE_isMaxValue(e)
      ? 9007199254740991
      : 10
    : fail();
}
function __PRIVATE_valueEquals(e, t) {
  if (e === t) return !0;
  const n = __PRIVATE_typeOrder(e);
  if (n !== __PRIVATE_typeOrder(t)) return !1;
  switch (n) {
    case 0:
    case 9007199254740991:
      return !0;
    case 1:
      return e.booleanValue === t.booleanValue;
    case 4:
      return __PRIVATE_getLocalWriteTime(e).isEqual(
        __PRIVATE_getLocalWriteTime(t)
      );
    case 3:
      return (function __PRIVATE_timestampEquals(e, t) {
        if (
          "string" == typeof e.timestampValue &&
          "string" == typeof t.timestampValue &&
          e.timestampValue.length === t.timestampValue.length
        )
          return e.timestampValue === t.timestampValue;
        const n = __PRIVATE_normalizeTimestamp(e.timestampValue),
          i = __PRIVATE_normalizeTimestamp(t.timestampValue);
        return n.seconds === i.seconds && n.nanos === i.nanos;
      })(e, t);
    case 5:
      return e.stringValue === t.stringValue;
    case 6:
      return (function __PRIVATE_blobEquals(e, t) {
        return __PRIVATE_normalizeByteString(e.bytesValue).isEqual(
          __PRIVATE_normalizeByteString(t.bytesValue)
        );
      })(e, t);
    case 7:
      return e.referenceValue === t.referenceValue;
    case 8:
      return (function __PRIVATE_geoPointEquals(e, t) {
        return (
          __PRIVATE_normalizeNumber(e.geoPointValue.latitude) ===
            __PRIVATE_normalizeNumber(t.geoPointValue.latitude) &&
          __PRIVATE_normalizeNumber(e.geoPointValue.longitude) ===
            __PRIVATE_normalizeNumber(t.geoPointValue.longitude)
        );
      })(e, t);
    case 2:
      return (function __PRIVATE_numberEquals(e, t) {
        if ("integerValue" in e && "integerValue" in t)
          return (
            __PRIVATE_normalizeNumber(e.integerValue) ===
            __PRIVATE_normalizeNumber(t.integerValue)
          );
        if ("doubleValue" in e && "doubleValue" in t) {
          const n = __PRIVATE_normalizeNumber(e.doubleValue),
            i = __PRIVATE_normalizeNumber(t.doubleValue);
          return n === i
            ? __PRIVATE_isNegativeZero(n) === __PRIVATE_isNegativeZero(i)
            : isNaN(n) && isNaN(i);
        }
        return !1;
      })(e, t);
    case 9:
      return __PRIVATE_arrayEquals(
        e.arrayValue.values || [],
        t.arrayValue.values || [],
        __PRIVATE_valueEquals
      );
    case 10:
      return (function __PRIVATE_objectEquals(e, t) {
        const n = e.mapValue.fields || {},
          i = t.mapValue.fields || {};
        if (__PRIVATE_objectSize(n) !== __PRIVATE_objectSize(i)) return !1;
        for (const e in n)
          if (
            n.hasOwnProperty(e) &&
            (void 0 === i[e] || !__PRIVATE_valueEquals(n[e], i[e]))
          )
            return !1;
        return !0;
      })(e, t);
    default:
      return fail();
  }
}
function __PRIVATE_arrayValueContains(e, t) {
  return void 0 !== (e.values || []).find((e) => __PRIVATE_valueEquals(e, t));
}
function __PRIVATE_valueCompare(e, t) {
  if (e === t) return 0;
  const n = __PRIVATE_typeOrder(e),
    i = __PRIVATE_typeOrder(t);
  if (n !== i) return __PRIVATE_primitiveComparator(n, i);
  switch (n) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return __PRIVATE_primitiveComparator(e.booleanValue, t.booleanValue);
    case 2:
      return (function __PRIVATE_compareNumbers(e, t) {
        const n = __PRIVATE_normalizeNumber(e.integerValue || e.doubleValue),
          i = __PRIVATE_normalizeNumber(t.integerValue || t.doubleValue);
        return n < i
          ? -1
          : n > i
          ? 1
          : n === i
          ? 0
          : isNaN(n)
          ? isNaN(i)
            ? 0
            : -1
          : 1;
      })(e, t);
    case 3:
      return __PRIVATE_compareTimestamps(e.timestampValue, t.timestampValue);
    case 4:
      return __PRIVATE_compareTimestamps(
        __PRIVATE_getLocalWriteTime(e),
        __PRIVATE_getLocalWriteTime(t)
      );
    case 5:
      return __PRIVATE_primitiveComparator(e.stringValue, t.stringValue);
    case 6:
      return (function __PRIVATE_compareBlobs(e, t) {
        const n = __PRIVATE_normalizeByteString(e),
          i = __PRIVATE_normalizeByteString(t);
        return n.compareTo(i);
      })(e.bytesValue, t.bytesValue);
    case 7:
      return (function __PRIVATE_compareReferences(e, t) {
        const n = e.split("/"),
          i = t.split("/");
        for (let e = 0; e < n.length && e < i.length; e++) {
          const t = __PRIVATE_primitiveComparator(n[e], i[e]);
          if (0 !== t) return t;
        }
        return __PRIVATE_primitiveComparator(n.length, i.length);
      })(e.referenceValue, t.referenceValue);
    case 8:
      return (function __PRIVATE_compareGeoPoints(e, t) {
        const n = __PRIVATE_primitiveComparator(
          __PRIVATE_normalizeNumber(e.latitude),
          __PRIVATE_normalizeNumber(t.latitude)
        );
        return 0 !== n
          ? n
          : __PRIVATE_primitiveComparator(
              __PRIVATE_normalizeNumber(e.longitude),
              __PRIVATE_normalizeNumber(t.longitude)
            );
      })(e.geoPointValue, t.geoPointValue);
    case 9:
      return (function __PRIVATE_compareArrays(e, t) {
        const n = e.values || [],
          i = t.values || [];
        for (let e = 0; e < n.length && e < i.length; ++e) {
          const t = __PRIVATE_valueCompare(n[e], i[e]);
          if (t) return t;
        }
        return __PRIVATE_primitiveComparator(n.length, i.length);
      })(e.arrayValue, t.arrayValue);
    case 10:
      return (function __PRIVATE_compareMaps(e, t) {
        if (e === dt.mapValue && t === dt.mapValue) return 0;
        if (e === dt.mapValue) return 1;
        if (t === dt.mapValue) return -1;
        const n = e.fields || {},
          i = Object.keys(n),
          s = t.fields || {},
          o = Object.keys(s);
        i.sort(), o.sort();
        for (let e = 0; e < i.length && e < o.length; ++e) {
          const t = __PRIVATE_primitiveComparator(i[e], o[e]);
          if (0 !== t) return t;
          const u = __PRIVATE_valueCompare(n[i[e]], s[o[e]]);
          if (0 !== u) return u;
        }
        return __PRIVATE_primitiveComparator(i.length, o.length);
      })(e.mapValue, t.mapValue);
    default:
      throw fail();
  }
}
function __PRIVATE_compareTimestamps(e, t) {
  if ("string" == typeof e && "string" == typeof t && e.length === t.length)
    return __PRIVATE_primitiveComparator(e, t);
  const n = __PRIVATE_normalizeTimestamp(e),
    i = __PRIVATE_normalizeTimestamp(t),
    s = __PRIVATE_primitiveComparator(n.seconds, i.seconds);
  return 0 !== s ? s : __PRIVATE_primitiveComparator(n.nanos, i.nanos);
}
function canonicalId(e) {
  return __PRIVATE_canonifyValue(e);
}
function __PRIVATE_canonifyValue(e) {
  return "nullValue" in e
    ? "null"
    : "booleanValue" in e
    ? "" + e.booleanValue
    : "integerValue" in e
    ? "" + e.integerValue
    : "doubleValue" in e
    ? "" + e.doubleValue
    : "timestampValue" in e
    ? (function __PRIVATE_canonifyTimestamp(e) {
        const t = __PRIVATE_normalizeTimestamp(e);
        return `time(${t.seconds},${t.nanos})`;
      })(e.timestampValue)
    : "stringValue" in e
    ? e.stringValue
    : "bytesValue" in e
    ? (function __PRIVATE_canonifyByteString(e) {
        return __PRIVATE_normalizeByteString(e).toBase64();
      })(e.bytesValue)
    : "referenceValue" in e
    ? (function __PRIVATE_canonifyReference(e) {
        return DocumentKey.fromName(e).toString();
      })(e.referenceValue)
    : "geoPointValue" in e
    ? (function __PRIVATE_canonifyGeoPoint(e) {
        return `geo(${e.latitude},${e.longitude})`;
      })(e.geoPointValue)
    : "arrayValue" in e
    ? (function __PRIVATE_canonifyArray(e) {
        let t = "[",
          n = !0;
        for (const i of e.values || [])
          n ? (n = !1) : (t += ","), (t += __PRIVATE_canonifyValue(i));
        return t + "]";
      })(e.arrayValue)
    : "mapValue" in e
    ? (function __PRIVATE_canonifyMap(e) {
        const t = Object.keys(e.fields || {}).sort();
        let n = "{",
          i = !0;
        for (const s of t)
          i ? (i = !1) : (n += ","),
            (n += `${s}:${__PRIVATE_canonifyValue(e.fields[s])}`);
        return n + "}";
      })(e.mapValue)
    : fail();
}
function __PRIVATE_estimateByteSize(e) {
  switch (__PRIVATE_typeOrder(e)) {
    case 0:
    case 1:
      return 4;
    case 2:
      return 8;
    case 3:
    case 8:
      return 16;
    case 4:
      const t = __PRIVATE_getPreviousValue(e);
      return t ? 16 + __PRIVATE_estimateByteSize(t) : 16;
    case 5:
      return 2 * e.stringValue.length;
    case 6:
      return __PRIVATE_normalizeByteString(e.bytesValue).approximateByteSize();
    case 7:
      return e.referenceValue.length;
    case 9:
      return (function __PRIVATE_estimateArrayByteSize(e) {
        return (e.values || []).reduce(
          (e, t) => e + __PRIVATE_estimateByteSize(t),
          0
        );
      })(e.arrayValue);
    case 10:
      return (function __PRIVATE_estimateMapByteSize(e) {
        let t = 0;
        return (
          forEach(e.fields, (e, n) => {
            t += e.length + __PRIVATE_estimateByteSize(n);
          }),
          t
        );
      })(e.mapValue);
    default:
      throw fail();
  }
}
function __PRIVATE_refValue(e, t) {
  return {
    referenceValue: `projects/${e.projectId}/databases/${
      e.database
    }/documents/${t.path.canonicalString()}`,
  };
}
function isInteger(e) {
  return !!e && "integerValue" in e;
}
function isArray(e) {
  return !!e && "arrayValue" in e;
}
function __PRIVATE_isNullValue(e) {
  return !!e && "nullValue" in e;
}
function __PRIVATE_isNanValue(e) {
  return !!e && "doubleValue" in e && isNaN(Number(e.doubleValue));
}
function __PRIVATE_isMapValue(e) {
  return !!e && "mapValue" in e;
}
function __PRIVATE_deepClone(e) {
  if (e.geoPointValue)
    return { geoPointValue: Object.assign({}, e.geoPointValue) };
  if (e.timestampValue && "object" == typeof e.timestampValue)
    return { timestampValue: Object.assign({}, e.timestampValue) };
  if (e.mapValue) {
    const t = { mapValue: { fields: {} } };
    return (
      forEach(
        e.mapValue.fields,
        (e, n) => (t.mapValue.fields[e] = __PRIVATE_deepClone(n))
      ),
      t
    );
  }
  if (e.arrayValue) {
    const t = { arrayValue: { values: [] } };
    for (let n = 0; n < (e.arrayValue.values || []).length; ++n)
      t.arrayValue.values[n] = __PRIVATE_deepClone(e.arrayValue.values[n]);
    return t;
  }
  return Object.assign({}, e);
}
function __PRIVATE_isMaxValue(e) {
  return (
    "__max__" === (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue
  );
}
function __PRIVATE_valuesGetLowerBound(e) {
  return "nullValue" in e
    ? mt
    : "booleanValue" in e
    ? { booleanValue: !1 }
    : "integerValue" in e || "doubleValue" in e
    ? { doubleValue: NaN }
    : "timestampValue" in e
    ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } }
    : "stringValue" in e
    ? { stringValue: "" }
    : "bytesValue" in e
    ? { bytesValue: "" }
    : "referenceValue" in e
    ? __PRIVATE_refValue(DatabaseId.empty(), DocumentKey.empty())
    : "geoPointValue" in e
    ? { geoPointValue: { latitude: -90, longitude: -180 } }
    : "arrayValue" in e
    ? { arrayValue: {} }
    : "mapValue" in e
    ? { mapValue: {} }
    : fail();
}
function __PRIVATE_valuesGetUpperBound(e) {
  return "nullValue" in e
    ? { booleanValue: !1 }
    : "booleanValue" in e
    ? { doubleValue: NaN }
    : "integerValue" in e || "doubleValue" in e
    ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } }
    : "timestampValue" in e
    ? { stringValue: "" }
    : "stringValue" in e
    ? { bytesValue: "" }
    : "bytesValue" in e
    ? __PRIVATE_refValue(DatabaseId.empty(), DocumentKey.empty())
    : "referenceValue" in e
    ? { geoPointValue: { latitude: -90, longitude: -180 } }
    : "geoPointValue" in e
    ? { arrayValue: {} }
    : "arrayValue" in e
    ? { mapValue: {} }
    : "mapValue" in e
    ? dt
    : fail();
}
function __PRIVATE_lowerBoundCompare(e, t) {
  const n = __PRIVATE_valueCompare(e.value, t.value);
  return 0 !== n
    ? n
    : e.inclusive && !t.inclusive
    ? -1
    : !e.inclusive && t.inclusive
    ? 1
    : 0;
}
function __PRIVATE_upperBoundCompare(e, t) {
  const n = __PRIVATE_valueCompare(e.value, t.value);
  return 0 !== n
    ? n
    : e.inclusive && !t.inclusive
    ? 1
    : !e.inclusive && t.inclusive
    ? -1
    : 0;
}
class ObjectValue {
  constructor(e) {
    this.value = e;
  }
  static empty() {
    return new ObjectValue({ mapValue: {} });
  }
  field(e) {
    if (e.isEmpty()) return this.value;
    {
      let t = this.value;
      for (let n = 0; n < e.length - 1; ++n)
        if (
          ((t = (t.mapValue.fields || {})[e.get(n)]), !__PRIVATE_isMapValue(t))
        )
          return null;
      return (t = (t.mapValue.fields || {})[e.lastSegment()]), t || null;
    }
  }
  set(e, t) {
    this.getFieldsMap(e.popLast())[e.lastSegment()] = __PRIVATE_deepClone(t);
  }
  setAll(e) {
    let t = FieldPath$1.emptyPath(),
      n = {},
      i = [];
    e.forEach((e, s) => {
      if (!t.isImmediateParentOf(s)) {
        const e = this.getFieldsMap(t);
        this.applyChanges(e, n, i), (n = {}), (i = []), (t = s.popLast());
      }
      e
        ? (n[s.lastSegment()] = __PRIVATE_deepClone(e))
        : i.push(s.lastSegment());
    });
    const s = this.getFieldsMap(t);
    this.applyChanges(s, n, i);
  }
  delete(e) {
    const t = this.field(e.popLast());
    __PRIVATE_isMapValue(t) &&
      t.mapValue.fields &&
      delete t.mapValue.fields[e.lastSegment()];
  }
  isEqual(e) {
    return __PRIVATE_valueEquals(this.value, e.value);
  }
  getFieldsMap(e) {
    let t = this.value;
    t.mapValue.fields || (t.mapValue = { fields: {} });
    for (let n = 0; n < e.length; ++n) {
      let i = t.mapValue.fields[e.get(n)];
      (__PRIVATE_isMapValue(i) && i.mapValue.fields) ||
        ((i = { mapValue: { fields: {} } }), (t.mapValue.fields[e.get(n)] = i)),
        (t = i);
    }
    return t.mapValue.fields;
  }
  applyChanges(e, t, n) {
    forEach(t, (t, n) => (e[t] = n));
    for (const t of n) delete e[t];
  }
  clone() {
    return new ObjectValue(__PRIVATE_deepClone(this.value));
  }
}
function __PRIVATE_extractFieldMask(e) {
  const t = [];
  return (
    forEach(e.fields, (e, n) => {
      const i = new FieldPath$1([e]);
      if (__PRIVATE_isMapValue(n)) {
        const e = __PRIVATE_extractFieldMask(n.mapValue).fields;
        if (0 === e.length) t.push(i);
        else for (const n of e) t.push(i.child(n));
      } else t.push(i);
    }),
    new FieldMask(t)
  );
}
class MutableDocument {
  constructor(e, t, n, i, s, o, u) {
    (this.key = e),
      (this.documentType = t),
      (this.version = n),
      (this.readTime = i),
      (this.createTime = s),
      (this.data = o),
      (this.documentState = u);
  }
  static newInvalidDocument(e) {
    return new MutableDocument(
      e,
      0,
      SnapshotVersion.min(),
      SnapshotVersion.min(),
      SnapshotVersion.min(),
      ObjectValue.empty(),
      0
    );
  }
  static newFoundDocument(e, t, n, i) {
    return new MutableDocument(e, 1, t, SnapshotVersion.min(), n, i, 0);
  }
  static newNoDocument(e, t) {
    return new MutableDocument(
      e,
      2,
      t,
      SnapshotVersion.min(),
      SnapshotVersion.min(),
      ObjectValue.empty(),
      0
    );
  }
  static newUnknownDocument(e, t) {
    return new MutableDocument(
      e,
      3,
      t,
      SnapshotVersion.min(),
      SnapshotVersion.min(),
      ObjectValue.empty(),
      2
    );
  }
  convertToFoundDocument(e, t) {
    return (
      !this.createTime.isEqual(SnapshotVersion.min()) ||
        (2 !== this.documentType && 0 !== this.documentType) ||
        (this.createTime = e),
      (this.version = e),
      (this.documentType = 1),
      (this.data = t),
      (this.documentState = 0),
      this
    );
  }
  convertToNoDocument(e) {
    return (
      (this.version = e),
      (this.documentType = 2),
      (this.data = ObjectValue.empty()),
      (this.documentState = 0),
      this
    );
  }
  convertToUnknownDocument(e) {
    return (
      (this.version = e),
      (this.documentType = 3),
      (this.data = ObjectValue.empty()),
      (this.documentState = 2),
      this
    );
  }
  setHasCommittedMutations() {
    return (this.documentState = 2), this;
  }
  setHasLocalMutations() {
    return (
      (this.documentState = 1), (this.version = SnapshotVersion.min()), this
    );
  }
  setReadTime(e) {
    return (this.readTime = e), this;
  }
  get hasLocalMutations() {
    return 1 === this.documentState;
  }
  get hasCommittedMutations() {
    return 2 === this.documentState;
  }
  get hasPendingWrites() {
    return this.hasLocalMutations || this.hasCommittedMutations;
  }
  isValidDocument() {
    return 0 !== this.documentType;
  }
  isFoundDocument() {
    return 1 === this.documentType;
  }
  isNoDocument() {
    return 2 === this.documentType;
  }
  isUnknownDocument() {
    return 3 === this.documentType;
  }
  isEqual(e) {
    return (
      e instanceof MutableDocument &&
      this.key.isEqual(e.key) &&
      this.version.isEqual(e.version) &&
      this.documentType === e.documentType &&
      this.documentState === e.documentState &&
      this.data.isEqual(e.data)
    );
  }
  mutableCopy() {
    return new MutableDocument(
      this.key,
      this.documentType,
      this.version,
      this.readTime,
      this.createTime,
      this.data.clone(),
      this.documentState
    );
  }
  toString() {
    return `Document(${this.key}, ${this.version}, ${JSON.stringify(
      this.data.value
    )}, {createTime: ${this.createTime}}), {documentType: ${
      this.documentType
    }}), {documentState: ${this.documentState}})`;
  }
}
class Bound {
  constructor(e, t) {
    (this.position = e), (this.inclusive = t);
  }
}
function __PRIVATE_boundCompareToDocument(e, t, n) {
  let i = 0;
  for (let s = 0; s < e.position.length; s++) {
    const o = t[s],
      u = e.position[s];
    if (
      ((i = o.field.isKeyField()
        ? DocumentKey.comparator(DocumentKey.fromName(u.referenceValue), n.key)
        : __PRIVATE_valueCompare(u, n.data.field(o.field))),
      "desc" === o.dir && (i *= -1),
      0 !== i)
    )
      break;
  }
  return i;
}
function __PRIVATE_boundEquals(e, t) {
  if (null === e) return null === t;
  if (null === t) return !1;
  if (e.inclusive !== t.inclusive || e.position.length !== t.position.length)
    return !1;
  for (let n = 0; n < e.position.length; n++)
    if (!__PRIVATE_valueEquals(e.position[n], t.position[n])) return !1;
  return !0;
}
class OrderBy {
  constructor(e, t = "asc") {
    (this.field = e), (this.dir = t);
  }
}
function __PRIVATE_orderByEquals(e, t) {
  return e.dir === t.dir && e.field.isEqual(t.field);
}
class Filter {}
class FieldFilter extends Filter {
  constructor(e, t, n) {
    super(), (this.field = e), (this.op = t), (this.value = n);
  }
  static create(e, t, n) {
    return e.isKeyField()
      ? "in" === t || "not-in" === t
        ? this.createKeyFieldInFilter(e, t, n)
        : new __PRIVATE_KeyFieldFilter(e, t, n)
      : "array-contains" === t
      ? new __PRIVATE_ArrayContainsFilter(e, n)
      : "in" === t
      ? new __PRIVATE_InFilter(e, n)
      : "not-in" === t
      ? new __PRIVATE_NotInFilter(e, n)
      : "array-contains-any" === t
      ? new __PRIVATE_ArrayContainsAnyFilter(e, n)
      : new FieldFilter(e, t, n);
  }
  static createKeyFieldInFilter(e, t, n) {
    return "in" === t
      ? new __PRIVATE_KeyFieldInFilter(e, n)
      : new __PRIVATE_KeyFieldNotInFilter(e, n);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return "!=" === this.op
      ? null !== t &&
          this.matchesComparison(__PRIVATE_valueCompare(t, this.value))
      : null !== t &&
          __PRIVATE_typeOrder(this.value) === __PRIVATE_typeOrder(t) &&
          this.matchesComparison(__PRIVATE_valueCompare(t, this.value));
  }
  matchesComparison(e) {
    switch (this.op) {
      case "<":
        return e < 0;
      case "<=":
        return e <= 0;
      case "==":
        return 0 === e;
      case "!=":
        return 0 !== e;
      case ">":
        return e > 0;
      case ">=":
        return e >= 0;
      default:
        return fail();
    }
  }
  isInequality() {
    return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0;
  }
  getFlattenedFilters() {
    return [this];
  }
  getFilters() {
    return [this];
  }
}
class CompositeFilter extends Filter {
  constructor(e, t) {
    super(), (this.filters = e), (this.op = t), (this.ue = null);
  }
  static create(e, t) {
    return new CompositeFilter(e, t);
  }
  matches(e) {
    return __PRIVATE_compositeFilterIsConjunction(this)
      ? void 0 === this.filters.find((t) => !t.matches(e))
      : void 0 !== this.filters.find((t) => t.matches(e));
  }
  getFlattenedFilters() {
    return (
      null !== this.ue ||
        (this.ue = this.filters.reduce(
          (e, t) => e.concat(t.getFlattenedFilters()),
          []
        )),
      this.ue
    );
  }
  getFilters() {
    return Object.assign([], this.filters);
  }
}
function __PRIVATE_compositeFilterIsConjunction(e) {
  return "and" === e.op;
}
function __PRIVATE_compositeFilterIsDisjunction(e) {
  return "or" === e.op;
}
function __PRIVATE_compositeFilterIsFlatConjunction(e) {
  return (
    __PRIVATE_compositeFilterIsFlat(e) &&
    __PRIVATE_compositeFilterIsConjunction(e)
  );
}
function __PRIVATE_compositeFilterIsFlat(e) {
  for (const t of e.filters) if (t instanceof CompositeFilter) return !1;
  return !0;
}
function __PRIVATE_canonifyFilter(e) {
  if (e instanceof FieldFilter)
    return e.field.canonicalString() + e.op.toString() + canonicalId(e.value);
  if (__PRIVATE_compositeFilterIsFlatConjunction(e))
    return e.filters.map((e) => __PRIVATE_canonifyFilter(e)).join(",");
  {
    const t = e.filters.map((e) => __PRIVATE_canonifyFilter(e)).join(",");
    return `${e.op}(${t})`;
  }
}
function __PRIVATE_filterEquals(e, t) {
  return e instanceof FieldFilter
    ? (function __PRIVATE_fieldFilterEquals(e, t) {
        return (
          t instanceof FieldFilter &&
          e.op === t.op &&
          e.field.isEqual(t.field) &&
          __PRIVATE_valueEquals(e.value, t.value)
        );
      })(e, t)
    : e instanceof CompositeFilter
    ? (function __PRIVATE_compositeFilterEquals(e, t) {
        return (
          t instanceof CompositeFilter &&
          e.op === t.op &&
          e.filters.length === t.filters.length &&
          e.filters.reduce(
            (e, n, i) => e && __PRIVATE_filterEquals(n, t.filters[i]),
            !0
          )
        );
      })(e, t)
    : void fail();
}
function __PRIVATE_compositeFilterWithAddedFilters(e, t) {
  const n = e.filters.concat(t);
  return CompositeFilter.create(n, e.op);
}
function __PRIVATE_stringifyFilter(e) {
  return e instanceof FieldFilter
    ? (function __PRIVATE_stringifyFieldFilter(e) {
        return `${e.field.canonicalString()} ${e.op} ${canonicalId(e.value)}`;
      })(e)
    : e instanceof CompositeFilter
    ? (function __PRIVATE_stringifyCompositeFilter(e) {
        return (
          e.op.toString() +
          " {" +
          e.getFilters().map(__PRIVATE_stringifyFilter).join(" ,") +
          "}"
        );
      })(e)
    : "Filter";
}
class __PRIVATE_KeyFieldFilter extends FieldFilter {
  constructor(e, t, n) {
    super(e, t, n), (this.key = DocumentKey.fromName(n.referenceValue));
  }
  matches(e) {
    const t = DocumentKey.comparator(e.key, this.key);
    return this.matchesComparison(t);
  }
}
class __PRIVATE_KeyFieldInFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "in", t),
      (this.keys = __PRIVATE_extractDocumentKeysFromArrayValue("in", t));
  }
  matches(e) {
    return this.keys.some((t) => t.isEqual(e.key));
  }
}
class __PRIVATE_KeyFieldNotInFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "not-in", t),
      (this.keys = __PRIVATE_extractDocumentKeysFromArrayValue("not-in", t));
  }
  matches(e) {
    return !this.keys.some((t) => t.isEqual(e.key));
  }
}
function __PRIVATE_extractDocumentKeysFromArrayValue(e, t) {
  var n;
  return (
    (null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) || []
  ).map((e) => DocumentKey.fromName(e.referenceValue));
}
class __PRIVATE_ArrayContainsFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "array-contains", t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return isArray(t) && __PRIVATE_arrayValueContains(t.arrayValue, this.value);
  }
}
class __PRIVATE_InFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "in", t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return null !== t && __PRIVATE_arrayValueContains(this.value.arrayValue, t);
  }
}
class __PRIVATE_NotInFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "not-in", t);
  }
  matches(e) {
    if (
      __PRIVATE_arrayValueContains(this.value.arrayValue, {
        nullValue: "NULL_VALUE",
      })
    )
      return !1;
    const t = e.data.field(this.field);
    return (
      null !== t && !__PRIVATE_arrayValueContains(this.value.arrayValue, t)
    );
  }
}
class __PRIVATE_ArrayContainsAnyFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "array-contains-any", t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return (
      !(!isArray(t) || !t.arrayValue.values) &&
      t.arrayValue.values.some((e) =>
        __PRIVATE_arrayValueContains(this.value.arrayValue, e)
      )
    );
  }
}
class __PRIVATE_TargetImpl {
  constructor(e, t = null, n = [], i = [], s = null, o = null, u = null) {
    (this.path = e),
      (this.collectionGroup = t),
      (this.orderBy = n),
      (this.filters = i),
      (this.limit = s),
      (this.startAt = o),
      (this.endAt = u),
      (this.ce = null);
  }
}
function __PRIVATE_newTarget(
  e,
  t = null,
  n = [],
  i = [],
  s = null,
  o = null,
  u = null
) {
  return new __PRIVATE_TargetImpl(e, t, n, i, s, o, u);
}
function __PRIVATE_canonifyTarget(e) {
  const t = __PRIVATE_debugCast(e);
  if (null === t.ce) {
    let e = t.path.canonicalString();
    null !== t.collectionGroup && (e += "|cg:" + t.collectionGroup),
      (e += "|f:"),
      (e += t.filters.map((e) => __PRIVATE_canonifyFilter(e)).join(",")),
      (e += "|ob:"),
      (e += t.orderBy
        .map((e) =>
          (function __PRIVATE_canonifyOrderBy(e) {
            return e.field.canonicalString() + e.dir;
          })(e)
        )
        .join(",")),
      __PRIVATE_isNullOrUndefined(t.limit) || ((e += "|l:"), (e += t.limit)),
      t.startAt &&
        ((e += "|lb:"),
        (e += t.startAt.inclusive ? "b:" : "a:"),
        (e += t.startAt.position.map((e) => canonicalId(e)).join(","))),
      t.endAt &&
        ((e += "|ub:"),
        (e += t.endAt.inclusive ? "a:" : "b:"),
        (e += t.endAt.position.map((e) => canonicalId(e)).join(","))),
      (t.ce = e);
  }
  return t.ce;
}
function __PRIVATE_targetEquals(e, t) {
  if (e.limit !== t.limit) return !1;
  if (e.orderBy.length !== t.orderBy.length) return !1;
  for (let n = 0; n < e.orderBy.length; n++)
    if (!__PRIVATE_orderByEquals(e.orderBy[n], t.orderBy[n])) return !1;
  if (e.filters.length !== t.filters.length) return !1;
  for (let n = 0; n < e.filters.length; n++)
    if (!__PRIVATE_filterEquals(e.filters[n], t.filters[n])) return !1;
  return (
    e.collectionGroup === t.collectionGroup &&
    !!e.path.isEqual(t.path) &&
    !!__PRIVATE_boundEquals(e.startAt, t.startAt) &&
    __PRIVATE_boundEquals(e.endAt, t.endAt)
  );
}
function __PRIVATE_targetIsDocumentTarget(e) {
  return (
    DocumentKey.isDocumentKey(e.path) &&
    null === e.collectionGroup &&
    0 === e.filters.length
  );
}
function __PRIVATE_targetGetFieldFiltersForPath(e, t) {
  return e.filters.filter(
    (e) => e instanceof FieldFilter && e.field.isEqual(t)
  );
}
function __PRIVATE_targetGetAscendingBound(e, t, n) {
  let i = mt,
    s = !0;
  for (const n of __PRIVATE_targetGetFieldFiltersForPath(e, t)) {
    let e = mt,
      t = !0;
    switch (n.op) {
      case "<":
      case "<=":
        e = __PRIVATE_valuesGetLowerBound(n.value);
        break;
      case "==":
      case "in":
      case ">=":
        e = n.value;
        break;
      case ">":
        (e = n.value), (t = !1);
        break;
      case "!=":
      case "not-in":
        e = mt;
    }
    __PRIVATE_lowerBoundCompare(
      { value: i, inclusive: s },
      { value: e, inclusive: t }
    ) < 0 && ((i = e), (s = t));
  }
  if (null !== n)
    for (let o = 0; o < e.orderBy.length; ++o)
      if (e.orderBy[o].field.isEqual(t)) {
        const e = n.position[o];
        __PRIVATE_lowerBoundCompare(
          { value: i, inclusive: s },
          { value: e, inclusive: n.inclusive }
        ) < 0 && ((i = e), (s = n.inclusive));
        break;
      }
  return { value: i, inclusive: s };
}
function __PRIVATE_targetGetDescendingBound(e, t, n) {
  let i = dt,
    s = !0;
  for (const n of __PRIVATE_targetGetFieldFiltersForPath(e, t)) {
    let e = dt,
      t = !0;
    switch (n.op) {
      case ">=":
      case ">":
        (e = __PRIVATE_valuesGetUpperBound(n.value)), (t = !1);
        break;
      case "==":
      case "in":
      case "<=":
        e = n.value;
        break;
      case "<":
        (e = n.value), (t = !1);
        break;
      case "!=":
      case "not-in":
        e = dt;
    }
    __PRIVATE_upperBoundCompare(
      { value: i, inclusive: s },
      { value: e, inclusive: t }
    ) > 0 && ((i = e), (s = t));
  }
  if (null !== n)
    for (let o = 0; o < e.orderBy.length; ++o)
      if (e.orderBy[o].field.isEqual(t)) {
        const e = n.position[o];
        __PRIVATE_upperBoundCompare(
          { value: i, inclusive: s },
          { value: e, inclusive: n.inclusive }
        ) > 0 && ((i = e), (s = n.inclusive));
        break;
      }
  return { value: i, inclusive: s };
}
class __PRIVATE_QueryImpl {
  constructor(
    e,
    t = null,
    n = [],
    i = [],
    s = null,
    o = "F",
    u = null,
    l = null
  ) {
    (this.path = e),
      (this.collectionGroup = t),
      (this.explicitOrderBy = n),
      (this.filters = i),
      (this.limit = s),
      (this.limitType = o),
      (this.startAt = u),
      (this.endAt = l),
      (this.le = null),
      (this.he = null),
      (this.Pe = null),
      this.startAt,
      this.endAt;
  }
}
function __PRIVATE_newQuery(e, t, n, i, s, o, u, l) {
  return new __PRIVATE_QueryImpl(e, t, n, i, s, o, u, l);
}
function __PRIVATE_newQueryForPath(e) {
  return new __PRIVATE_QueryImpl(e);
}
function __PRIVATE_queryMatchesAllDocuments(e) {
  return (
    0 === e.filters.length &&
    null === e.limit &&
    null == e.startAt &&
    null == e.endAt &&
    (0 === e.explicitOrderBy.length ||
      (1 === e.explicitOrderBy.length &&
        e.explicitOrderBy[0].field.isKeyField()))
  );
}
function __PRIVATE_isCollectionGroupQuery(e) {
  return null !== e.collectionGroup;
}
function __PRIVATE_queryNormalizedOrderBy(e) {
  const t = __PRIVATE_debugCast(e);
  if (null === t.le) {
    t.le = [];
    const e = new Set();
    for (const n of t.explicitOrderBy)
      t.le.push(n), e.add(n.field.canonicalString());
    const n =
        t.explicitOrderBy.length > 0
          ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir
          : "asc",
      i = (function __PRIVATE_getInequalityFilterFields(e) {
        let t = new SortedSet(FieldPath$1.comparator);
        return (
          e.filters.forEach((e) => {
            e.getFlattenedFilters().forEach((e) => {
              e.isInequality() && (t = t.add(e.field));
            });
          }),
          t
        );
      })(t);
    i.forEach((i) => {
      e.has(i.canonicalString()) ||
        i.isKeyField() ||
        t.le.push(new OrderBy(i, n));
    }),
      e.has(FieldPath$1.keyField().canonicalString()) ||
        t.le.push(new OrderBy(FieldPath$1.keyField(), n));
  }
  return t.le;
}
function __PRIVATE_queryToTarget(e) {
  const t = __PRIVATE_debugCast(e);
  return (
    t.he ||
      (t.he = __PRIVATE__queryToTarget(t, __PRIVATE_queryNormalizedOrderBy(e))),
    t.he
  );
}
function __PRIVATE__queryToTarget(e, t) {
  if ("F" === e.limitType)
    return __PRIVATE_newTarget(
      e.path,
      e.collectionGroup,
      t,
      e.filters,
      e.limit,
      e.startAt,
      e.endAt
    );
  {
    t = t.map((e) => {
      const t = "desc" === e.dir ? "asc" : "desc";
      return new OrderBy(e.field, t);
    });
    const n = e.endAt ? new Bound(e.endAt.position, e.endAt.inclusive) : null,
      i = e.startAt ? new Bound(e.startAt.position, e.startAt.inclusive) : null;
    return __PRIVATE_newTarget(
      e.path,
      e.collectionGroup,
      t,
      e.filters,
      e.limit,
      n,
      i
    );
  }
}
function __PRIVATE_queryWithAddedFilter(e, t) {
  const n = e.filters.concat([t]);
  return new __PRIVATE_QueryImpl(
    e.path,
    e.collectionGroup,
    e.explicitOrderBy.slice(),
    n,
    e.limit,
    e.limitType,
    e.startAt,
    e.endAt
  );
}
function __PRIVATE_queryWithLimit(e, t, n) {
  return new __PRIVATE_QueryImpl(
    e.path,
    e.collectionGroup,
    e.explicitOrderBy.slice(),
    e.filters.slice(),
    t,
    n,
    e.startAt,
    e.endAt
  );
}
function __PRIVATE_queryEquals(e, t) {
  return (
    __PRIVATE_targetEquals(
      __PRIVATE_queryToTarget(e),
      __PRIVATE_queryToTarget(t)
    ) && e.limitType === t.limitType
  );
}
function __PRIVATE_canonifyQuery(e) {
  return `${__PRIVATE_canonifyTarget(__PRIVATE_queryToTarget(e))}|lt:${
    e.limitType
  }`;
}
function __PRIVATE_stringifyQuery(e) {
  return `Query(target=${(function __PRIVATE_stringifyTarget(e) {
    let t = e.path.canonicalString();
    return (
      null !== e.collectionGroup &&
        (t += " collectionGroup=" + e.collectionGroup),
      e.filters.length > 0 &&
        (t += `, filters: [${e.filters
          .map((e) => __PRIVATE_stringifyFilter(e))
          .join(", ")}]`),
      __PRIVATE_isNullOrUndefined(e.limit) || (t += ", limit: " + e.limit),
      e.orderBy.length > 0 &&
        (t += `, orderBy: [${e.orderBy
          .map((e) =>
            (function __PRIVATE_stringifyOrderBy(e) {
              return `${e.field.canonicalString()} (${e.dir})`;
            })(e)
          )
          .join(", ")}]`),
      e.startAt &&
        ((t += ", startAt: "),
        (t += e.startAt.inclusive ? "b:" : "a:"),
        (t += e.startAt.position.map((e) => canonicalId(e)).join(","))),
      e.endAt &&
        ((t += ", endAt: "),
        (t += e.endAt.inclusive ? "a:" : "b:"),
        (t += e.endAt.position.map((e) => canonicalId(e)).join(","))),
      `Target(${t})`
    );
  })(__PRIVATE_queryToTarget(e))}; limitType=${e.limitType})`;
}
function __PRIVATE_queryMatches(e, t) {
  return (
    t.isFoundDocument() &&
    (function __PRIVATE_queryMatchesPathAndCollectionGroup(e, t) {
      const n = t.key.path;
      return null !== e.collectionGroup
        ? t.key.hasCollectionId(e.collectionGroup) && e.path.isPrefixOf(n)
        : DocumentKey.isDocumentKey(e.path)
        ? e.path.isEqual(n)
        : e.path.isImmediateParentOf(n);
    })(e, t) &&
    (function __PRIVATE_queryMatchesOrderBy(e, t) {
      for (const n of __PRIVATE_queryNormalizedOrderBy(e))
        if (!n.field.isKeyField() && null === t.data.field(n.field)) return !1;
      return !0;
    })(e, t) &&
    (function __PRIVATE_queryMatchesFilters(e, t) {
      for (const n of e.filters) if (!n.matches(t)) return !1;
      return !0;
    })(e, t) &&
    (function __PRIVATE_queryMatchesBounds(e, t) {
      return (
        !(
          e.startAt &&
          !(function __PRIVATE_boundSortsBeforeDocument(e, t, n) {
            const i = __PRIVATE_boundCompareToDocument(e, t, n);
            return e.inclusive ? i <= 0 : i < 0;
          })(e.startAt, __PRIVATE_queryNormalizedOrderBy(e), t)
        ) &&
        !(
          e.endAt &&
          !(function __PRIVATE_boundSortsAfterDocument(e, t, n) {
            const i = __PRIVATE_boundCompareToDocument(e, t, n);
            return e.inclusive ? i >= 0 : i > 0;
          })(e.endAt, __PRIVATE_queryNormalizedOrderBy(e), t)
        )
      );
    })(e, t)
  );
}
function __PRIVATE_queryCollectionGroup(e) {
  return (
    e.collectionGroup ||
    (e.path.length % 2 == 1
      ? e.path.lastSegment()
      : e.path.get(e.path.length - 2))
  );
}
function __PRIVATE_newQueryComparator(e) {
  return (t, n) => {
    let i = !1;
    for (const s of __PRIVATE_queryNormalizedOrderBy(e)) {
      const e = __PRIVATE_compareDocs(s, t, n);
      if (0 !== e) return e;
      i = i || s.field.isKeyField();
    }
    return 0;
  };
}
function __PRIVATE_compareDocs(e, t, n) {
  const i = e.field.isKeyField()
    ? DocumentKey.comparator(t.key, n.key)
    : (function __PRIVATE_compareDocumentsByField(e, t, n) {
        const i = t.data.field(e),
          s = n.data.field(e);
        return null !== i && null !== s ? __PRIVATE_valueCompare(i, s) : fail();
      })(e.field, t, n);
  switch (e.dir) {
    case "asc":
      return i;
    case "desc":
      return -1 * i;
    default:
      return fail();
  }
}
class ObjectMap {
  constructor(e, t) {
    (this.mapKeyFn = e),
      (this.equalsFn = t),
      (this.inner = {}),
      (this.innerSize = 0);
  }
  get(e) {
    const t = this.mapKeyFn(e),
      n = this.inner[t];
    if (void 0 !== n) for (const [t, i] of n) if (this.equalsFn(t, e)) return i;
  }
  has(e) {
    return void 0 !== this.get(e);
  }
  set(e, t) {
    const n = this.mapKeyFn(e),
      i = this.inner[n];
    if (void 0 === i) return (this.inner[n] = [[e, t]]), void this.innerSize++;
    for (let n = 0; n < i.length; n++)
      if (this.equalsFn(i[n][0], e)) return void (i[n] = [e, t]);
    i.push([e, t]), this.innerSize++;
  }
  delete(e) {
    const t = this.mapKeyFn(e),
      n = this.inner[t];
    if (void 0 === n) return !1;
    for (let i = 0; i < n.length; i++)
      if (this.equalsFn(n[i][0], e))
        return (
          1 === n.length ? delete this.inner[t] : n.splice(i, 1),
          this.innerSize--,
          !0
        );
    return !1;
  }
  forEach(e) {
    forEach(this.inner, (t, n) => {
      for (const [t, i] of n) e(t, i);
    });
  }
  isEmpty() {
    return isEmpty(this.inner);
  }
  size() {
    return this.innerSize;
  }
}
const ft = new SortedMap(DocumentKey.comparator);
function __PRIVATE_mutableDocumentMap() {
  return ft;
}
const gt = new SortedMap(DocumentKey.comparator);
function documentMap(...e) {
  let t = gt;
  for (const n of e) t = t.insert(n.key, n);
  return t;
}
function __PRIVATE_convertOverlayedDocumentMapToDocumentMap(e) {
  let t = gt;
  return e.forEach((e, n) => (t = t.insert(e, n.overlayedDocument))), t;
}
function __PRIVATE_newOverlayMap() {
  return __PRIVATE_newDocumentKeyMap();
}
function __PRIVATE_newMutationMap() {
  return __PRIVATE_newDocumentKeyMap();
}
function __PRIVATE_newDocumentKeyMap() {
  return new ObjectMap(
    (e) => e.toString(),
    (e, t) => e.isEqual(t)
  );
}
const It = new SortedMap(DocumentKey.comparator),
  pt = new SortedSet(DocumentKey.comparator);
function __PRIVATE_documentKeySet(...e) {
  let t = pt;
  for (const n of e) t = t.add(n);
  return t;
}
const Tt = new SortedSet(__PRIVATE_primitiveComparator);
function __PRIVATE_targetIdSet() {
  return Tt;
}
function __PRIVATE_toDouble(e, t) {
  if (e.useProto3Json) {
    if (isNaN(t)) return { doubleValue: "NaN" };
    if (t === 1 / 0) return { doubleValue: "Infinity" };
    if (t === -1 / 0) return { doubleValue: "-Infinity" };
  }
  return { doubleValue: __PRIVATE_isNegativeZero(t) ? "-0" : t };
}
function __PRIVATE_toInteger(e) {
  return { integerValue: "" + e };
}
function toNumber(e, t) {
  return isSafeInteger(t) ? __PRIVATE_toInteger(t) : __PRIVATE_toDouble(e, t);
}
class TransformOperation {
  constructor() {
    this._ = void 0;
  }
}
function __PRIVATE_applyTransformOperationToLocalView(e, t, n) {
  return e instanceof __PRIVATE_ServerTimestampTransform
    ? (function serverTimestamp$1(e, t) {
        const n = {
          fields: {
            __type__: { stringValue: "server_timestamp" },
            __local_write_time__: {
              timestampValue: { seconds: e.seconds, nanos: e.nanoseconds },
            },
          },
        };
        return (
          t &&
            __PRIVATE_isServerTimestamp(t) &&
            (t = __PRIVATE_getPreviousValue(t)),
          t && (n.fields.__previous_value__ = t),
          { mapValue: n }
        );
      })(n, t)
    : e instanceof __PRIVATE_ArrayUnionTransformOperation
    ? __PRIVATE_applyArrayUnionTransformOperation(e, t)
    : e instanceof __PRIVATE_ArrayRemoveTransformOperation
    ? __PRIVATE_applyArrayRemoveTransformOperation(e, t)
    : (function __PRIVATE_applyNumericIncrementTransformOperationToLocalView(
        e,
        t
      ) {
        const n = __PRIVATE_computeTransformOperationBaseValue(e, t),
          i = asNumber(n) + asNumber(e.Ie);
        return isInteger(n) && isInteger(e.Ie)
          ? __PRIVATE_toInteger(i)
          : __PRIVATE_toDouble(e.serializer, i);
      })(e, t);
}
function __PRIVATE_applyTransformOperationToRemoteDocument(e, t, n) {
  return e instanceof __PRIVATE_ArrayUnionTransformOperation
    ? __PRIVATE_applyArrayUnionTransformOperation(e, t)
    : e instanceof __PRIVATE_ArrayRemoveTransformOperation
    ? __PRIVATE_applyArrayRemoveTransformOperation(e, t)
    : n;
}
function __PRIVATE_computeTransformOperationBaseValue(e, t) {
  return e instanceof __PRIVATE_NumericIncrementTransformOperation
    ? (function __PRIVATE_isNumber(e) {
        return (
          isInteger(e) ||
          (function __PRIVATE_isDouble(e) {
            return !!e && "doubleValue" in e;
          })(e)
        );
      })(t)
      ? t
      : { integerValue: 0 }
    : null;
}
class __PRIVATE_ServerTimestampTransform extends TransformOperation {}
class __PRIVATE_ArrayUnionTransformOperation extends TransformOperation {
  constructor(e) {
    super(), (this.elements = e);
  }
}
function __PRIVATE_applyArrayUnionTransformOperation(e, t) {
  const n = __PRIVATE_coercedFieldValuesArray(t);
  for (const t of e.elements)
    n.some((e) => __PRIVATE_valueEquals(e, t)) || n.push(t);
  return { arrayValue: { values: n } };
}
class __PRIVATE_ArrayRemoveTransformOperation extends TransformOperation {
  constructor(e) {
    super(), (this.elements = e);
  }
}
function __PRIVATE_applyArrayRemoveTransformOperation(e, t) {
  let n = __PRIVATE_coercedFieldValuesArray(t);
  for (const t of e.elements) n = n.filter((e) => !__PRIVATE_valueEquals(e, t));
  return { arrayValue: { values: n } };
}
class __PRIVATE_NumericIncrementTransformOperation extends TransformOperation {
  constructor(e, t) {
    super(), (this.serializer = e), (this.Ie = t);
  }
}
function asNumber(e) {
  return __PRIVATE_normalizeNumber(e.integerValue || e.doubleValue);
}
function __PRIVATE_coercedFieldValuesArray(e) {
  return isArray(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
}
class FieldTransform {
  constructor(e, t) {
    (this.field = e), (this.transform = t);
  }
}
class MutationResult {
  constructor(e, t) {
    (this.version = e), (this.transformResults = t);
  }
}
class Precondition {
  constructor(e, t) {
    (this.updateTime = e), (this.exists = t);
  }
  static none() {
    return new Precondition();
  }
  static exists(e) {
    return new Precondition(void 0, e);
  }
  static updateTime(e) {
    return new Precondition(e);
  }
  get isNone() {
    return void 0 === this.updateTime && void 0 === this.exists;
  }
  isEqual(e) {
    return (
      this.exists === e.exists &&
      (this.updateTime
        ? !!e.updateTime && this.updateTime.isEqual(e.updateTime)
        : !e.updateTime)
    );
  }
}
function __PRIVATE_preconditionIsValidForDocument(e, t) {
  return void 0 !== e.updateTime
    ? t.isFoundDocument() && t.version.isEqual(e.updateTime)
    : void 0 === e.exists || e.exists === t.isFoundDocument();
}
class Mutation {}
function __PRIVATE_calculateOverlayMutation(e, t) {
  if (!e.hasLocalMutations || (t && 0 === t.fields.length)) return null;
  if (null === t)
    return e.isNoDocument()
      ? new __PRIVATE_DeleteMutation(e.key, Precondition.none())
      : new __PRIVATE_SetMutation(e.key, e.data, Precondition.none());
  {
    const n = e.data,
      i = ObjectValue.empty();
    let s = new SortedSet(FieldPath$1.comparator);
    for (let e of t.fields)
      if (!s.has(e)) {
        let t = n.field(e);
        null === t && e.length > 1 && ((e = e.popLast()), (t = n.field(e))),
          null === t ? i.delete(e) : i.set(e, t),
          (s = s.add(e));
      }
    return new __PRIVATE_PatchMutation(
      e.key,
      i,
      new FieldMask(s.toArray()),
      Precondition.none()
    );
  }
}
function __PRIVATE_mutationApplyToRemoteDocument(e, t, n) {
  e instanceof __PRIVATE_SetMutation
    ? (function __PRIVATE_setMutationApplyToRemoteDocument(e, t, n) {
        const i = e.value.clone(),
          s = __PRIVATE_serverTransformResults(
            e.fieldTransforms,
            t,
            n.transformResults
          );
        i.setAll(s),
          t.convertToFoundDocument(n.version, i).setHasCommittedMutations();
      })(e, t, n)
    : e instanceof __PRIVATE_PatchMutation
    ? (function __PRIVATE_patchMutationApplyToRemoteDocument(e, t, n) {
        if (!__PRIVATE_preconditionIsValidForDocument(e.precondition, t))
          return void t.convertToUnknownDocument(n.version);
        const i = __PRIVATE_serverTransformResults(
            e.fieldTransforms,
            t,
            n.transformResults
          ),
          s = t.data;
        s.setAll(__PRIVATE_getPatch(e)),
          s.setAll(i),
          t.convertToFoundDocument(n.version, s).setHasCommittedMutations();
      })(e, t, n)
    : (function __PRIVATE_deleteMutationApplyToRemoteDocument(e, t, n) {
        t.convertToNoDocument(n.version).setHasCommittedMutations();
      })(0, t, n);
}
function __PRIVATE_mutationApplyToLocalView(e, t, n, i) {
  return e instanceof __PRIVATE_SetMutation
    ? (function __PRIVATE_setMutationApplyToLocalView(e, t, n, i) {
        if (!__PRIVATE_preconditionIsValidForDocument(e.precondition, t))
          return n;
        const s = e.value.clone(),
          o = __PRIVATE_localTransformResults(e.fieldTransforms, i, t);
        return (
          s.setAll(o),
          t.convertToFoundDocument(t.version, s).setHasLocalMutations(),
          null
        );
      })(e, t, n, i)
    : e instanceof __PRIVATE_PatchMutation
    ? (function __PRIVATE_patchMutationApplyToLocalView(e, t, n, i) {
        if (!__PRIVATE_preconditionIsValidForDocument(e.precondition, t))
          return n;
        const s = __PRIVATE_localTransformResults(e.fieldTransforms, i, t),
          o = t.data;
        return (
          o.setAll(__PRIVATE_getPatch(e)),
          o.setAll(s),
          t.convertToFoundDocument(t.version, o).setHasLocalMutations(),
          null === n
            ? null
            : n
                .unionWith(e.fieldMask.fields)
                .unionWith(e.fieldTransforms.map((e) => e.field))
        );
      })(e, t, n, i)
    : (function __PRIVATE_deleteMutationApplyToLocalView(e, t, n) {
        return __PRIVATE_preconditionIsValidForDocument(e.precondition, t)
          ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null)
          : n;
      })(e, t, n);
}
function __PRIVATE_mutationExtractBaseValue(e, t) {
  let n = null;
  for (const i of e.fieldTransforms) {
    const e = t.data.field(i.field),
      s = __PRIVATE_computeTransformOperationBaseValue(i.transform, e || null);
    null != s && (null === n && (n = ObjectValue.empty()), n.set(i.field, s));
  }
  return n || null;
}
function __PRIVATE_mutationEquals(e, t) {
  return (
    e.type === t.type &&
    !!e.key.isEqual(t.key) &&
    !!e.precondition.isEqual(t.precondition) &&
    !!(function __PRIVATE_fieldTransformsAreEqual(e, t) {
      return (
        (void 0 === e && void 0 === t) ||
        (!(!e || !t) &&
          __PRIVATE_arrayEquals(e, t, (e, t) =>
            (function __PRIVATE_fieldTransformEquals(e, t) {
              return (
                e.field.isEqual(t.field) &&
                (function __PRIVATE_transformOperationEquals(e, t) {
                  return (e instanceof __PRIVATE_ArrayUnionTransformOperation &&
                    t instanceof __PRIVATE_ArrayUnionTransformOperation) ||
                    (e instanceof __PRIVATE_ArrayRemoveTransformOperation &&
                      t instanceof __PRIVATE_ArrayRemoveTransformOperation)
                    ? __PRIVATE_arrayEquals(
                        e.elements,
                        t.elements,
                        __PRIVATE_valueEquals
                      )
                    : e instanceof
                        __PRIVATE_NumericIncrementTransformOperation &&
                      t instanceof __PRIVATE_NumericIncrementTransformOperation
                    ? __PRIVATE_valueEquals(e.Ie, t.Ie)
                    : e instanceof __PRIVATE_ServerTimestampTransform &&
                      t instanceof __PRIVATE_ServerTimestampTransform;
                })(e.transform, t.transform)
              );
            })(e, t)
          ))
      );
    })(e.fieldTransforms, t.fieldTransforms) &&
    (0 === e.type
      ? e.value.isEqual(t.value)
      : 1 !== e.type ||
        (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)))
  );
}
class __PRIVATE_SetMutation extends Mutation {
  constructor(e, t, n, i = []) {
    super(),
      (this.key = e),
      (this.value = t),
      (this.precondition = n),
      (this.fieldTransforms = i),
      (this.type = 0);
  }
  getFieldMask() {
    return null;
  }
}
class __PRIVATE_PatchMutation extends Mutation {
  constructor(e, t, n, i, s = []) {
    super(),
      (this.key = e),
      (this.data = t),
      (this.fieldMask = n),
      (this.precondition = i),
      (this.fieldTransforms = s),
      (this.type = 1);
  }
  getFieldMask() {
    return this.fieldMask;
  }
}
function __PRIVATE_getPatch(e) {
  const t = new Map();
  return (
    e.fieldMask.fields.forEach((n) => {
      if (!n.isEmpty()) {
        const i = e.data.field(n);
        t.set(n, i);
      }
    }),
    t
  );
}
function __PRIVATE_serverTransformResults(e, t, n) {
  const i = new Map();
  __PRIVATE_hardAssert(e.length === n.length);
  for (let s = 0; s < n.length; s++) {
    const o = e[s],
      u = o.transform,
      l = t.data.field(o.field);
    i.set(
      o.field,
      __PRIVATE_applyTransformOperationToRemoteDocument(u, l, n[s])
    );
  }
  return i;
}
function __PRIVATE_localTransformResults(e, t, n) {
  const i = new Map();
  for (const s of e) {
    const e = s.transform,
      o = n.data.field(s.field);
    i.set(s.field, __PRIVATE_applyTransformOperationToLocalView(e, o, t));
  }
  return i;
}
class __PRIVATE_DeleteMutation extends Mutation {
  constructor(e, t) {
    super(),
      (this.key = e),
      (this.precondition = t),
      (this.type = 2),
      (this.fieldTransforms = []);
  }
  getFieldMask() {
    return null;
  }
}
class __PRIVATE_VerifyMutation extends Mutation {
  constructor(e, t) {
    super(),
      (this.key = e),
      (this.precondition = t),
      (this.type = 3),
      (this.fieldTransforms = []);
  }
  getFieldMask() {
    return null;
  }
}
class MutationBatch {
  constructor(e, t, n, i) {
    (this.batchId = e),
      (this.localWriteTime = t),
      (this.baseMutations = n),
      (this.mutations = i);
  }
  applyToRemoteDocument(e, t) {
    const n = t.mutationResults;
    for (let t = 0; t < this.mutations.length; t++) {
      const i = this.mutations[t];
      i.key.isEqual(e.key) &&
        __PRIVATE_mutationApplyToRemoteDocument(i, e, n[t]);
    }
  }
  applyToLocalView(e, t) {
    for (const n of this.baseMutations)
      n.key.isEqual(e.key) &&
        (t = __PRIVATE_mutationApplyToLocalView(n, e, t, this.localWriteTime));
    for (const n of this.mutations)
      n.key.isEqual(e.key) &&
        (t = __PRIVATE_mutationApplyToLocalView(n, e, t, this.localWriteTime));
    return t;
  }
  applyToLocalDocumentSet(e, t) {
    const n = __PRIVATE_newMutationMap();
    return (
      this.mutations.forEach((i) => {
        const s = e.get(i.key),
          o = s.overlayedDocument;
        let u = this.applyToLocalView(o, s.mutatedFields);
        u = t.has(i.key) ? null : u;
        const l = __PRIVATE_calculateOverlayMutation(o, u);
        null !== l && n.set(i.key, l),
          o.isValidDocument() || o.convertToNoDocument(SnapshotVersion.min());
      }),
      n
    );
  }
  keys() {
    return this.mutations.reduce(
      (e, t) => e.add(t.key),
      __PRIVATE_documentKeySet()
    );
  }
  isEqual(e) {
    return (
      this.batchId === e.batchId &&
      __PRIVATE_arrayEquals(this.mutations, e.mutations, (e, t) =>
        __PRIVATE_mutationEquals(e, t)
      ) &&
      __PRIVATE_arrayEquals(this.baseMutations, e.baseMutations, (e, t) =>
        __PRIVATE_mutationEquals(e, t)
      )
    );
  }
}
class MutationBatchResult {
  constructor(e, t, n, i) {
    (this.batch = e),
      (this.commitVersion = t),
      (this.mutationResults = n),
      (this.docVersions = i);
  }
  static from(e, t, n) {
    __PRIVATE_hardAssert(e.mutations.length === n.length);
    let i = (function __PRIVATE_documentVersionMap() {
      return It;
    })();
    const s = e.mutations;
    for (let e = 0; e < s.length; e++) i = i.insert(s[e].key, n[e].version);
    return new MutationBatchResult(e, t, n, i);
  }
}
class Overlay {
  constructor(e, t) {
    (this.largestBatchId = e), (this.mutation = t);
  }
  getKey() {
    return this.mutation.key;
  }
  isEqual(e) {
    return null !== e && this.mutation === e.mutation;
  }
  toString() {
    return `Overlay{\n      largestBatchId: ${
      this.largestBatchId
    },\n      mutation: ${this.mutation.toString()}\n    }`;
  }
}
class __PRIVATE_AggregateImpl {
  constructor(e, t, n) {
    (this.alias = e), (this.aggregateType = t), (this.fieldPath = n);
  }
}
class ExistenceFilter {
  constructor(e, t) {
    (this.count = e), (this.unchangedNames = t);
  }
}
var Et, Pt;
function __PRIVATE_isPermanentError(e) {
  switch (e) {
    default:
      return fail();
    case $e.CANCELLED:
    case $e.UNKNOWN:
    case $e.DEADLINE_EXCEEDED:
    case $e.RESOURCE_EXHAUSTED:
    case $e.INTERNAL:
    case $e.UNAVAILABLE:
    case $e.UNAUTHENTICATED:
      return !1;
    case $e.INVALID_ARGUMENT:
    case $e.NOT_FOUND:
    case $e.ALREADY_EXISTS:
    case $e.PERMISSION_DENIED:
    case $e.FAILED_PRECONDITION:
    case $e.ABORTED:
    case $e.OUT_OF_RANGE:
    case $e.UNIMPLEMENTED:
    case $e.DATA_LOSS:
      return !0;
  }
}
function __PRIVATE_mapCodeFromRpcCode(e) {
  if (void 0 === e)
    return __PRIVATE_logError("GRPC error has no .code"), $e.UNKNOWN;
  switch (e) {
    case Et.OK:
      return $e.OK;
    case Et.CANCELLED:
      return $e.CANCELLED;
    case Et.UNKNOWN:
      return $e.UNKNOWN;
    case Et.DEADLINE_EXCEEDED:
      return $e.DEADLINE_EXCEEDED;
    case Et.RESOURCE_EXHAUSTED:
      return $e.RESOURCE_EXHAUSTED;
    case Et.INTERNAL:
      return $e.INTERNAL;
    case Et.UNAVAILABLE:
      return $e.UNAVAILABLE;
    case Et.UNAUTHENTICATED:
      return $e.UNAUTHENTICATED;
    case Et.INVALID_ARGUMENT:
      return $e.INVALID_ARGUMENT;
    case Et.NOT_FOUND:
      return $e.NOT_FOUND;
    case Et.ALREADY_EXISTS:
      return $e.ALREADY_EXISTS;
    case Et.PERMISSION_DENIED:
      return $e.PERMISSION_DENIED;
    case Et.FAILED_PRECONDITION:
      return $e.FAILED_PRECONDITION;
    case Et.ABORTED:
      return $e.ABORTED;
    case Et.OUT_OF_RANGE:
      return $e.OUT_OF_RANGE;
    case Et.UNIMPLEMENTED:
      return $e.UNIMPLEMENTED;
    case Et.DATA_LOSS:
      return $e.DATA_LOSS;
    default:
      return fail();
  }
}
((Pt = Et || (Et = {}))[(Pt.OK = 0)] = "OK"),
  (Pt[(Pt.CANCELLED = 1)] = "CANCELLED"),
  (Pt[(Pt.UNKNOWN = 2)] = "UNKNOWN"),
  (Pt[(Pt.INVALID_ARGUMENT = 3)] = "INVALID_ARGUMENT"),
  (Pt[(Pt.DEADLINE_EXCEEDED = 4)] = "DEADLINE_EXCEEDED"),
  (Pt[(Pt.NOT_FOUND = 5)] = "NOT_FOUND"),
  (Pt[(Pt.ALREADY_EXISTS = 6)] = "ALREADY_EXISTS"),
  (Pt[(Pt.PERMISSION_DENIED = 7)] = "PERMISSION_DENIED"),
  (Pt[(Pt.UNAUTHENTICATED = 16)] = "UNAUTHENTICATED"),
  (Pt[(Pt.RESOURCE_EXHAUSTED = 8)] = "RESOURCE_EXHAUSTED"),
  (Pt[(Pt.FAILED_PRECONDITION = 9)] = "FAILED_PRECONDITION"),
  (Pt[(Pt.ABORTED = 10)] = "ABORTED"),
  (Pt[(Pt.OUT_OF_RANGE = 11)] = "OUT_OF_RANGE"),
  (Pt[(Pt.UNIMPLEMENTED = 12)] = "UNIMPLEMENTED"),
  (Pt[(Pt.INTERNAL = 13)] = "INTERNAL"),
  (Pt[(Pt.UNAVAILABLE = 14)] = "UNAVAILABLE"),
  (Pt[(Pt.DATA_LOSS = 15)] = "DATA_LOSS");
let At = null;
function __PRIVATE_newTextEncoder() {
  return new TextEncoder();
}
const Rt = new Oe([4294967295, 4294967295], 0);
function __PRIVATE_getMd5HashValue(e) {
  const t = __PRIVATE_newTextEncoder().encode(e),
    n = new ke();
  return n.update(t), new Uint8Array(n.digest());
}
function __PRIVATE_get64BitUints(e) {
  const t = new DataView(e.buffer),
    n = t.getUint32(0, !0),
    i = t.getUint32(4, !0),
    s = t.getUint32(8, !0),
    o = t.getUint32(12, !0);
  return [new Oe([n, i], 0), new Oe([s, o], 0)];
}
class BloomFilter {
  constructor(e, t, n) {
    if (
      ((this.bitmap = e),
      (this.padding = t),
      (this.hashCount = n),
      t < 0 || t >= 8)
    )
      throw new __PRIVATE_BloomFilterError(`Invalid padding: ${t}`);
    if (n < 0) throw new __PRIVATE_BloomFilterError(`Invalid hash count: ${n}`);
    if (e.length > 0 && 0 === this.hashCount)
      throw new __PRIVATE_BloomFilterError(`Invalid hash count: ${n}`);
    if (0 === e.length && 0 !== t)
      throw new __PRIVATE_BloomFilterError(
        `Invalid padding when bitmap length is 0: ${t}`
      );
    (this.Te = 8 * e.length - t), (this.Ee = Oe.fromNumber(this.Te));
  }
  de(e, t, n) {
    let i = e.add(t.multiply(Oe.fromNumber(n)));
    return (
      1 === i.compare(Rt) && (i = new Oe([i.getBits(0), i.getBits(1)], 0)),
      i.modulo(this.Ee).toNumber()
    );
  }
  Ae(e) {
    return 0 != (this.bitmap[Math.floor(e / 8)] & (1 << e % 8));
  }
  mightContain(e) {
    if (0 === this.Te) return !1;
    const t = __PRIVATE_getMd5HashValue(e),
      [n, i] = __PRIVATE_get64BitUints(t);
    for (let e = 0; e < this.hashCount; e++) {
      const t = this.de(n, i, e);
      if (!this.Ae(t)) return !1;
    }
    return !0;
  }
  static create(e, t, n) {
    const i = e % 8 == 0 ? 0 : 8 - (e % 8),
      s = new Uint8Array(Math.ceil(e / 8)),
      o = new BloomFilter(s, i, t);
    return n.forEach((e) => o.insert(e)), o;
  }
  insert(e) {
    if (0 === this.Te) return;
    const t = __PRIVATE_getMd5HashValue(e),
      [n, i] = __PRIVATE_get64BitUints(t);
    for (let e = 0; e < this.hashCount; e++) {
      const t = this.de(n, i, e);
      this.Re(t);
    }
  }
  Re(e) {
    const t = Math.floor(e / 8),
      n = e % 8;
    this.bitmap[t] |= 1 << n;
  }
}
class __PRIVATE_BloomFilterError extends Error {
  constructor() {
    super(...arguments), (this.name = "BloomFilterError");
  }
}
class RemoteEvent {
  constructor(e, t, n, i, s) {
    (this.snapshotVersion = e),
      (this.targetChanges = t),
      (this.targetMismatches = n),
      (this.documentUpdates = i),
      (this.resolvedLimboDocuments = s);
  }
  static createSynthesizedRemoteEventForCurrentChange(e, t, n) {
    const i = new Map();
    return (
      i.set(
        e,
        TargetChange.createSynthesizedTargetChangeForCurrentChange(e, t, n)
      ),
      new RemoteEvent(
        SnapshotVersion.min(),
        i,
        new SortedMap(__PRIVATE_primitiveComparator),
        __PRIVATE_mutableDocumentMap(),
        __PRIVATE_documentKeySet()
      )
    );
  }
}
class TargetChange {
  constructor(e, t, n, i, s) {
    (this.resumeToken = e),
      (this.current = t),
      (this.addedDocuments = n),
      (this.modifiedDocuments = i),
      (this.removedDocuments = s);
  }
  static createSynthesizedTargetChangeForCurrentChange(e, t, n) {
    return new TargetChange(
      n,
      t,
      __PRIVATE_documentKeySet(),
      __PRIVATE_documentKeySet(),
      __PRIVATE_documentKeySet()
    );
  }
}
class __PRIVATE_DocumentWatchChange {
  constructor(e, t, n, i) {
    (this.Ve = e), (this.removedTargetIds = t), (this.key = n), (this.me = i);
  }
}
class __PRIVATE_ExistenceFilterChange {
  constructor(e, t) {
    (this.targetId = e), (this.fe = t);
  }
}
class __PRIVATE_WatchTargetChange {
  constructor(e, t, n = ByteString.EMPTY_BYTE_STRING, i = null) {
    (this.state = e),
      (this.targetIds = t),
      (this.resumeToken = n),
      (this.cause = i);
  }
}
class __PRIVATE_TargetState {
  constructor() {
    (this.ge = 0),
      (this.pe = __PRIVATE_snapshotChangesMap()),
      (this.ye = ByteString.EMPTY_BYTE_STRING),
      (this.we = !1),
      (this.Se = !0);
  }
  get current() {
    return this.we;
  }
  get resumeToken() {
    return this.ye;
  }
  get be() {
    return 0 !== this.ge;
  }
  get De() {
    return this.Se;
  }
  Ce(e) {
    e.approximateByteSize() > 0 && ((this.Se = !0), (this.ye = e));
  }
  ve() {
    let e = __PRIVATE_documentKeySet(),
      t = __PRIVATE_documentKeySet(),
      n = __PRIVATE_documentKeySet();
    return (
      this.pe.forEach((i, s) => {
        switch (s) {
          case 0:
            e = e.add(i);
            break;
          case 2:
            t = t.add(i);
            break;
          case 1:
            n = n.add(i);
            break;
          default:
            fail();
        }
      }),
      new TargetChange(this.ye, this.we, e, t, n)
    );
  }
  Fe() {
    (this.Se = !1), (this.pe = __PRIVATE_snapshotChangesMap());
  }
  Me(e, t) {
    (this.Se = !0), (this.pe = this.pe.insert(e, t));
  }
  xe(e) {
    (this.Se = !0), (this.pe = this.pe.remove(e));
  }
  Oe() {
    this.ge += 1;
  }
  Ne() {
    (this.ge -= 1), __PRIVATE_hardAssert(this.ge >= 0);
  }
  Be() {
    (this.Se = !0), (this.we = !0);
  }
}
class __PRIVATE_WatchChangeAggregator {
  constructor(e) {
    (this.Le = e),
      (this.ke = new Map()),
      (this.qe = __PRIVATE_mutableDocumentMap()),
      (this.Qe = __PRIVATE_documentTargetMap()),
      (this.Ke = new SortedMap(__PRIVATE_primitiveComparator));
  }
  $e(e) {
    for (const t of e.Ve)
      e.me && e.me.isFoundDocument()
        ? this.Ue(t, e.me)
        : this.We(t, e.key, e.me);
    for (const t of e.removedTargetIds) this.We(t, e.key, e.me);
  }
  Ge(e) {
    this.forEachTarget(e, (t) => {
      const n = this.ze(t);
      switch (e.state) {
        case 0:
          this.je(t) && n.Ce(e.resumeToken);
          break;
        case 1:
          n.Ne(), n.be || n.Fe(), n.Ce(e.resumeToken);
          break;
        case 2:
          n.Ne(), n.be || this.removeTarget(t);
          break;
        case 3:
          this.je(t) && (n.Be(), n.Ce(e.resumeToken));
          break;
        case 4:
          this.je(t) && (this.He(t), n.Ce(e.resumeToken));
          break;
        default:
          fail();
      }
    });
  }
  forEachTarget(e, t) {
    e.targetIds.length > 0
      ? e.targetIds.forEach(t)
      : this.ke.forEach((e, n) => {
          this.je(n) && t(n);
        });
  }
  Je(e) {
    const t = e.targetId,
      n = e.fe.count,
      i = this.Ye(t);
    if (i) {
      const s = i.target;
      if (__PRIVATE_targetIsDocumentTarget(s))
        if (0 === n) {
          const e = new DocumentKey(s.path);
          this.We(
            t,
            e,
            MutableDocument.newNoDocument(e, SnapshotVersion.min())
          );
        } else __PRIVATE_hardAssert(1 === n);
      else {
        const i = this.Ze(t);
        if (i !== n) {
          const n = this.Xe(e),
            s = n ? this.et(n, e, i) : 1;
          if (0 !== s) {
            this.He(t);
            const e =
              2 === s
                ? "TargetPurposeExistenceFilterMismatchBloom"
                : "TargetPurposeExistenceFilterMismatch";
            this.Ke = this.Ke.insert(t, e);
          }
          null == At ||
            At.tt(
              (function __PRIVATE_createExistenceFilterMismatchInfoForTestingHooks(
                e,
                t,
                n,
                i,
                s
              ) {
                var o, u, l, _, h, d;
                const m = {
                    localCacheCount: e,
                    existenceFilterCount: t.count,
                    databaseId: n.database,
                    projectId: n.projectId,
                  },
                  f = t.unchangedNames;
                return (
                  f &&
                    (m.bloomFilter = {
                      applied: 0 === s,
                      hashCount:
                        null !== (o = null == f ? void 0 : f.hashCount) &&
                        void 0 !== o
                          ? o
                          : 0,
                      bitmapLength:
                        null !==
                          (_ =
                            null ===
                              (l =
                                null === (u = null == f ? void 0 : f.bits) ||
                                void 0 === u
                                  ? void 0
                                  : u.bitmap) || void 0 === l
                              ? void 0
                              : l.length) && void 0 !== _
                          ? _
                          : 0,
                      padding:
                        null !==
                          (d =
                            null === (h = null == f ? void 0 : f.bits) ||
                            void 0 === h
                              ? void 0
                              : h.padding) && void 0 !== d
                          ? d
                          : 0,
                      mightContain: (e) => {
                        var t;
                        return (
                          null !==
                            (t = null == i ? void 0 : i.mightContain(e)) &&
                          void 0 !== t &&
                          t
                        );
                      },
                    }),
                  m
                );
              })(i, e.fe, this.Le.nt(), n, s)
            );
        }
      }
    }
  }
  Xe(e) {
    const t = e.fe.unchangedNames;
    if (!t || !t.bits) return null;
    const {
      bits: { bitmap: n = "", padding: i = 0 },
      hashCount: s = 0,
    } = t;
    let o, u;
    try {
      o = __PRIVATE_normalizeByteString(n).toUint8Array();
    } catch (e) {
      if (e instanceof __PRIVATE_Base64DecodeError)
        return (
          __PRIVATE_logWarn(
            "Decoding the base64 bloom filter in existence filter failed (" +
              e.message +
              "); ignoring the bloom filter and falling back to full re-query."
          ),
          null
        );
      throw e;
    }
    try {
      u = new BloomFilter(o, i, s);
    } catch (e) {
      return (
        __PRIVATE_logWarn(
          e instanceof __PRIVATE_BloomFilterError
            ? "BloomFilter error: "
            : "Applying bloom filter failed: ",
          e
        ),
        null
      );
    }
    return 0 === u.Te ? null : u;
  }
  et(e, t, n) {
    return t.fe.count === n - this.rt(e, t.targetId) ? 0 : 2;
  }
  rt(e, t) {
    const n = this.Le.getRemoteKeysForTarget(t);
    let i = 0;
    return (
      n.forEach((n) => {
        const s = this.Le.nt(),
          o = `projects/${s.projectId}/databases/${
            s.database
          }/documents/${n.path.canonicalString()}`;
        e.mightContain(o) || (this.We(t, n, null), i++);
      }),
      i
    );
  }
  it(e) {
    const t = new Map();
    this.ke.forEach((n, i) => {
      const s = this.Ye(i);
      if (s) {
        if (n.current && __PRIVATE_targetIsDocumentTarget(s.target)) {
          const t = new DocumentKey(s.target.path);
          null !== this.qe.get(t) ||
            this.st(i, t) ||
            this.We(i, t, MutableDocument.newNoDocument(t, e));
        }
        n.De && (t.set(i, n.ve()), n.Fe());
      }
    });
    let n = __PRIVATE_documentKeySet();
    this.Qe.forEach((e, t) => {
      let i = !0;
      t.forEachWhile((e) => {
        const t = this.Ye(e);
        return (
          !t || "TargetPurposeLimboResolution" === t.purpose || ((i = !1), !1)
        );
      }),
        i && (n = n.add(e));
    }),
      this.qe.forEach((t, n) => n.setReadTime(e));
    const i = new RemoteEvent(e, t, this.Ke, this.qe, n);
    return (
      (this.qe = __PRIVATE_mutableDocumentMap()),
      (this.Qe = __PRIVATE_documentTargetMap()),
      (this.Ke = new SortedMap(__PRIVATE_primitiveComparator)),
      i
    );
  }
  Ue(e, t) {
    if (!this.je(e)) return;
    const n = this.st(e, t.key) ? 2 : 0;
    this.ze(e).Me(t.key, n),
      (this.qe = this.qe.insert(t.key, t)),
      (this.Qe = this.Qe.insert(t.key, this.ot(t.key).add(e)));
  }
  We(e, t, n) {
    if (!this.je(e)) return;
    const i = this.ze(e);
    this.st(e, t) ? i.Me(t, 1) : i.xe(t),
      (this.Qe = this.Qe.insert(t, this.ot(t).delete(e))),
      n && (this.qe = this.qe.insert(t, n));
  }
  removeTarget(e) {
    this.ke.delete(e);
  }
  Ze(e) {
    const t = this.ze(e).ve();
    return (
      this.Le.getRemoteKeysForTarget(e).size +
      t.addedDocuments.size -
      t.removedDocuments.size
    );
  }
  Oe(e) {
    this.ze(e).Oe();
  }
  ze(e) {
    let t = this.ke.get(e);
    return t || ((t = new __PRIVATE_TargetState()), this.ke.set(e, t)), t;
  }
  ot(e) {
    let t = this.Qe.get(e);
    return (
      t ||
        ((t = new SortedSet(__PRIVATE_primitiveComparator)),
        (this.Qe = this.Qe.insert(e, t))),
      t
    );
  }
  je(e) {
    const t = null !== this.Ye(e);
    return (
      t ||
        __PRIVATE_logDebug(
          "WatchChangeAggregator",
          "Detected inactive target",
          e
        ),
      t
    );
  }
  Ye(e) {
    const t = this.ke.get(e);
    return t && t.be ? null : this.Le._t(e);
  }
  He(e) {
    this.ke.set(e, new __PRIVATE_TargetState()),
      this.Le.getRemoteKeysForTarget(e).forEach((t) => {
        this.We(e, t, null);
      });
  }
  st(e, t) {
    return this.Le.getRemoteKeysForTarget(e).has(t);
  }
}
function __PRIVATE_documentTargetMap() {
  return new SortedMap(DocumentKey.comparator);
}
function __PRIVATE_snapshotChangesMap() {
  return new SortedMap(DocumentKey.comparator);
}
const yt = { asc: "ASCENDING", desc: "DESCENDING" },
  Vt = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "!=": "NOT_EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "not-in": "NOT_IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY",
  },
  bt = { and: "AND", or: "OR" };
class JsonProtoSerializer {
  constructor(e, t) {
    (this.databaseId = e), (this.useProto3Json = t);
  }
}
function __PRIVATE_toInt32Proto(e, t) {
  return e.useProto3Json || __PRIVATE_isNullOrUndefined(t) ? t : { value: t };
}
function toTimestamp(e, t) {
  return e.useProto3Json
    ? `${new Date(1e3 * t.seconds)
        .toISOString()
        .replace(/\.\d*/, "")
        .replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z`
    : { seconds: "" + t.seconds, nanos: t.nanoseconds };
}
function __PRIVATE_toBytes(e, t) {
  return e.useProto3Json ? t.toBase64() : t.toUint8Array();
}
function __PRIVATE_toVersion(e, t) {
  return toTimestamp(e, t.toTimestamp());
}
function __PRIVATE_fromVersion(e) {
  return (
    __PRIVATE_hardAssert(!!e),
    SnapshotVersion.fromTimestamp(
      (function fromTimestamp(e) {
        const t = __PRIVATE_normalizeTimestamp(e);
        return new Timestamp(t.seconds, t.nanos);
      })(e)
    )
  );
}
function __PRIVATE_toResourceName(e, t) {
  return (function __PRIVATE_fullyQualifiedPrefixPath(e) {
    return new ResourcePath(["projects", e.projectId, "databases", e.database]);
  })(e)
    .child("documents")
    .child(t)
    .canonicalString();
}
function __PRIVATE_fromResourceName(e) {
  const t = ResourcePath.fromString(e);
  return __PRIVATE_hardAssert(__PRIVATE_isValidResourceName(t)), t;
}
function __PRIVATE_toName(e, t) {
  return __PRIVATE_toResourceName(e.databaseId, t.path);
}
function fromName(e, t) {
  const n = __PRIVATE_fromResourceName(t);
  if (n.get(1) !== e.databaseId.projectId)
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      "Tried to deserialize key from different project: " +
        n.get(1) +
        " vs " +
        e.databaseId.projectId
    );
  if (n.get(3) !== e.databaseId.database)
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      "Tried to deserialize key from different database: " +
        n.get(3) +
        " vs " +
        e.databaseId.database
    );
  return new DocumentKey(__PRIVATE_extractLocalPathFromResourceName(n));
}
function __PRIVATE_toQueryPath(e, t) {
  return __PRIVATE_toResourceName(e.databaseId, t);
}
function __PRIVATE_fromQueryPath(e) {
  const t = __PRIVATE_fromResourceName(e);
  return 4 === t.length
    ? ResourcePath.emptyPath()
    : __PRIVATE_extractLocalPathFromResourceName(t);
}
function __PRIVATE_getEncodedDatabaseId(e) {
  return new ResourcePath([
    "projects",
    e.databaseId.projectId,
    "databases",
    e.databaseId.database,
  ]).canonicalString();
}
function __PRIVATE_extractLocalPathFromResourceName(e) {
  return (
    __PRIVATE_hardAssert(e.length > 4 && "documents" === e.get(4)),
    e.popFirst(5)
  );
}
function __PRIVATE_toMutationDocument(e, t, n) {
  return { name: __PRIVATE_toName(e, t), fields: n.value.mapValue.fields };
}
function __PRIVATE_fromDocument(e, t, n) {
  const i = fromName(e, t.name),
    s = __PRIVATE_fromVersion(t.updateTime),
    o = t.createTime
      ? __PRIVATE_fromVersion(t.createTime)
      : SnapshotVersion.min(),
    u = new ObjectValue({ mapValue: { fields: t.fields } }),
    l = MutableDocument.newFoundDocument(i, s, o, u);
  return (
    n && l.setHasCommittedMutations(), n ? l.setHasCommittedMutations() : l
  );
}
function toMutation(e, t) {
  let n;
  if (t instanceof __PRIVATE_SetMutation)
    n = { update: __PRIVATE_toMutationDocument(e, t.key, t.value) };
  else if (t instanceof __PRIVATE_DeleteMutation)
    n = { delete: __PRIVATE_toName(e, t.key) };
  else if (t instanceof __PRIVATE_PatchMutation)
    n = {
      update: __PRIVATE_toMutationDocument(e, t.key, t.data),
      updateMask: __PRIVATE_toDocumentMask(t.fieldMask),
    };
  else {
    if (!(t instanceof __PRIVATE_VerifyMutation)) return fail();
    n = { verify: __PRIVATE_toName(e, t.key) };
  }
  return (
    t.fieldTransforms.length > 0 &&
      (n.updateTransforms = t.fieldTransforms.map((e) =>
        (function __PRIVATE_toFieldTransform(e, t) {
          const n = t.transform;
          if (n instanceof __PRIVATE_ServerTimestampTransform)
            return {
              fieldPath: t.field.canonicalString(),
              setToServerValue: "REQUEST_TIME",
            };
          if (n instanceof __PRIVATE_ArrayUnionTransformOperation)
            return {
              fieldPath: t.field.canonicalString(),
              appendMissingElements: { values: n.elements },
            };
          if (n instanceof __PRIVATE_ArrayRemoveTransformOperation)
            return {
              fieldPath: t.field.canonicalString(),
              removeAllFromArray: { values: n.elements },
            };
          if (n instanceof __PRIVATE_NumericIncrementTransformOperation)
            return { fieldPath: t.field.canonicalString(), increment: n.Ie };
          throw fail();
        })(0, e)
      )),
    t.precondition.isNone ||
      (n.currentDocument = (function __PRIVATE_toPrecondition(e, t) {
        return void 0 !== t.updateTime
          ? { updateTime: __PRIVATE_toVersion(e, t.updateTime) }
          : void 0 !== t.exists
          ? { exists: t.exists }
          : fail();
      })(e, t.precondition)),
    n
  );
}
function __PRIVATE_fromMutation(e, t) {
  const n = t.currentDocument
      ? (function __PRIVATE_fromPrecondition(e) {
          return void 0 !== e.updateTime
            ? Precondition.updateTime(__PRIVATE_fromVersion(e.updateTime))
            : void 0 !== e.exists
            ? Precondition.exists(e.exists)
            : Precondition.none();
        })(t.currentDocument)
      : Precondition.none(),
    i = t.updateTransforms
      ? t.updateTransforms.map((t) =>
          (function __PRIVATE_fromFieldTransform(e, t) {
            let n = null;
            if ("setToServerValue" in t)
              __PRIVATE_hardAssert("REQUEST_TIME" === t.setToServerValue),
                (n = new __PRIVATE_ServerTimestampTransform());
            else if ("appendMissingElements" in t) {
              const e = t.appendMissingElements.values || [];
              n = new __PRIVATE_ArrayUnionTransformOperation(e);
            } else if ("removeAllFromArray" in t) {
              const e = t.removeAllFromArray.values || [];
              n = new __PRIVATE_ArrayRemoveTransformOperation(e);
            } else
              "increment" in t
                ? (n = new __PRIVATE_NumericIncrementTransformOperation(
                    e,
                    t.increment
                  ))
                : fail();
            const i = FieldPath$1.fromServerFormat(t.fieldPath);
            return new FieldTransform(i, n);
          })(e, t)
        )
      : [];
  if (t.update) {
    t.update.name;
    const s = fromName(e, t.update.name),
      o = new ObjectValue({ mapValue: { fields: t.update.fields } });
    if (t.updateMask) {
      const e = (function __PRIVATE_fromDocumentMask(e) {
        const t = e.fieldPaths || [];
        return new FieldMask(t.map((e) => FieldPath$1.fromServerFormat(e)));
      })(t.updateMask);
      return new __PRIVATE_PatchMutation(s, o, e, n, i);
    }
    return new __PRIVATE_SetMutation(s, o, n, i);
  }
  if (t.delete) {
    const i = fromName(e, t.delete);
    return new __PRIVATE_DeleteMutation(i, n);
  }
  if (t.verify) {
    const i = fromName(e, t.verify);
    return new __PRIVATE_VerifyMutation(i, n);
  }
  return fail();
}
function __PRIVATE_toDocumentsTarget(e, t) {
  return { documents: [__PRIVATE_toQueryPath(e, t.path)] };
}
function __PRIVATE_toQueryTarget(e, t) {
  const n = { structuredQuery: {} },
    i = t.path;
  null !== t.collectionGroup
    ? ((n.parent = __PRIVATE_toQueryPath(e, i)),
      (n.structuredQuery.from = [
        { collectionId: t.collectionGroup, allDescendants: !0 },
      ]))
    : ((n.parent = __PRIVATE_toQueryPath(e, i.popLast())),
      (n.structuredQuery.from = [{ collectionId: i.lastSegment() }]));
  const s = (function __PRIVATE_toFilters(e) {
    if (0 !== e.length)
      return __PRIVATE_toFilter(CompositeFilter.create(e, "and"));
  })(t.filters);
  s && (n.structuredQuery.where = s);
  const o = (function __PRIVATE_toOrder(e) {
    if (0 !== e.length)
      return e.map((e) =>
        (function __PRIVATE_toPropertyOrder(e) {
          return {
            field: __PRIVATE_toFieldPathReference(e.field),
            direction: __PRIVATE_toDirection(e.dir),
          };
        })(e)
      );
  })(t.orderBy);
  o && (n.structuredQuery.orderBy = o);
  const u = __PRIVATE_toInt32Proto(e, t.limit);
  return (
    null !== u && (n.structuredQuery.limit = u),
    t.startAt &&
      (n.structuredQuery.startAt = (function __PRIVATE_toStartAtCursor(e) {
        return { before: e.inclusive, values: e.position };
      })(t.startAt)),
    t.endAt &&
      (n.structuredQuery.endAt = (function __PRIVATE_toEndAtCursor(e) {
        return { before: !e.inclusive, values: e.position };
      })(t.endAt)),
    n
  );
}
function __PRIVATE_convertQueryTargetToQuery(e) {
  let t = __PRIVATE_fromQueryPath(e.parent);
  const n = e.structuredQuery,
    i = n.from ? n.from.length : 0;
  let s = null;
  if (i > 0) {
    __PRIVATE_hardAssert(1 === i);
    const e = n.from[0];
    e.allDescendants ? (s = e.collectionId) : (t = t.child(e.collectionId));
  }
  let o = [];
  n.where &&
    (o = (function __PRIVATE_fromFilters(e) {
      const t = __PRIVATE_fromFilter(e);
      return t instanceof CompositeFilter &&
        __PRIVATE_compositeFilterIsFlatConjunction(t)
        ? t.getFilters()
        : [t];
    })(n.where));
  let u = [];
  n.orderBy &&
    (u = (function __PRIVATE_fromOrder(e) {
      return e.map((e) =>
        (function __PRIVATE_fromPropertyOrder(e) {
          return new OrderBy(
            __PRIVATE_fromFieldPathReference(e.field),
            (function __PRIVATE_fromDirection(e) {
              switch (e) {
                case "ASCENDING":
                  return "asc";
                case "DESCENDING":
                  return "desc";
                default:
                  return;
              }
            })(e.direction)
          );
        })(e)
      );
    })(n.orderBy));
  let l = null;
  n.limit &&
    (l = (function __PRIVATE_fromInt32Proto(e) {
      let t;
      return (
        (t = "object" == typeof e ? e.value : e),
        __PRIVATE_isNullOrUndefined(t) ? null : t
      );
    })(n.limit));
  let _ = null;
  n.startAt &&
    (_ = (function __PRIVATE_fromStartAtCursor(e) {
      const t = !!e.before,
        n = e.values || [];
      return new Bound(n, t);
    })(n.startAt));
  let h = null;
  return (
    n.endAt &&
      (h = (function __PRIVATE_fromEndAtCursor(e) {
        const t = !e.before,
          n = e.values || [];
        return new Bound(n, t);
      })(n.endAt)),
    __PRIVATE_newQuery(t, s, u, o, l, "F", _, h)
  );
}
function __PRIVATE_fromFilter(e) {
  return void 0 !== e.unaryFilter
    ? (function __PRIVATE_fromUnaryFilter(e) {
        switch (e.unaryFilter.op) {
          case "IS_NAN":
            const t = __PRIVATE_fromFieldPathReference(e.unaryFilter.field);
            return FieldFilter.create(t, "==", { doubleValue: NaN });
          case "IS_NULL":
            const n = __PRIVATE_fromFieldPathReference(e.unaryFilter.field);
            return FieldFilter.create(n, "==", { nullValue: "NULL_VALUE" });
          case "IS_NOT_NAN":
            const i = __PRIVATE_fromFieldPathReference(e.unaryFilter.field);
            return FieldFilter.create(i, "!=", { doubleValue: NaN });
          case "IS_NOT_NULL":
            const s = __PRIVATE_fromFieldPathReference(e.unaryFilter.field);
            return FieldFilter.create(s, "!=", { nullValue: "NULL_VALUE" });
          default:
            return fail();
        }
      })(e)
    : void 0 !== e.fieldFilter
    ? (function __PRIVATE_fromFieldFilter(e) {
        return FieldFilter.create(
          __PRIVATE_fromFieldPathReference(e.fieldFilter.field),
          (function __PRIVATE_fromOperatorName(e) {
            switch (e) {
              case "EQUAL":
                return "==";
              case "NOT_EQUAL":
                return "!=";
              case "GREATER_THAN":
                return ">";
              case "GREATER_THAN_OR_EQUAL":
                return ">=";
              case "LESS_THAN":
                return "<";
              case "LESS_THAN_OR_EQUAL":
                return "<=";
              case "ARRAY_CONTAINS":
                return "array-contains";
              case "IN":
                return "in";
              case "NOT_IN":
                return "not-in";
              case "ARRAY_CONTAINS_ANY":
                return "array-contains-any";
              default:
                return fail();
            }
          })(e.fieldFilter.op),
          e.fieldFilter.value
        );
      })(e)
    : void 0 !== e.compositeFilter
    ? (function __PRIVATE_fromCompositeFilter(e) {
        return CompositeFilter.create(
          e.compositeFilter.filters.map((e) => __PRIVATE_fromFilter(e)),
          (function __PRIVATE_fromCompositeOperatorName(e) {
            switch (e) {
              case "AND":
                return "and";
              case "OR":
                return "or";
              default:
                return fail();
            }
          })(e.compositeFilter.op)
        );
      })(e)
    : fail();
}
function __PRIVATE_toDirection(e) {
  return yt[e];
}
function __PRIVATE_toOperatorName(e) {
  return Vt[e];
}
function __PRIVATE_toCompositeOperatorName(e) {
  return bt[e];
}
function __PRIVATE_toFieldPathReference(e) {
  return { fieldPath: e.canonicalString() };
}
function __PRIVATE_fromFieldPathReference(e) {
  return FieldPath$1.fromServerFormat(e.fieldPath);
}
function __PRIVATE_toFilter(e) {
  return e instanceof FieldFilter
    ? (function __PRIVATE_toUnaryOrFieldFilter(e) {
        if ("==" === e.op) {
          if (__PRIVATE_isNanValue(e.value))
            return {
              unaryFilter: {
                field: __PRIVATE_toFieldPathReference(e.field),
                op: "IS_NAN",
              },
            };
          if (__PRIVATE_isNullValue(e.value))
            return {
              unaryFilter: {
                field: __PRIVATE_toFieldPathReference(e.field),
                op: "IS_NULL",
              },
            };
        } else if ("!=" === e.op) {
          if (__PRIVATE_isNanValue(e.value))
            return {
              unaryFilter: {
                field: __PRIVATE_toFieldPathReference(e.field),
                op: "IS_NOT_NAN",
              },
            };
          if (__PRIVATE_isNullValue(e.value))
            return {
              unaryFilter: {
                field: __PRIVATE_toFieldPathReference(e.field),
                op: "IS_NOT_NULL",
              },
            };
        }
        return {
          fieldFilter: {
            field: __PRIVATE_toFieldPathReference(e.field),
            op: __PRIVATE_toOperatorName(e.op),
            value: e.value,
          },
        };
      })(e)
    : e instanceof CompositeFilter
    ? (function __PRIVATE_toCompositeFilter(e) {
        const t = e.getFilters().map((e) => __PRIVATE_toFilter(e));
        return 1 === t.length
          ? t[0]
          : {
              compositeFilter: {
                op: __PRIVATE_toCompositeOperatorName(e.op),
                filters: t,
              },
            };
      })(e)
    : fail();
}
function __PRIVATE_toDocumentMask(e) {
  const t = [];
  return (
    e.fields.forEach((e) => t.push(e.canonicalString())), { fieldPaths: t }
  );
}
function __PRIVATE_isValidResourceName(e) {
  return e.length >= 4 && "projects" === e.get(0) && "databases" === e.get(2);
}
class TargetData {
  constructor(
    e,
    t,
    n,
    i,
    s = SnapshotVersion.min(),
    o = SnapshotVersion.min(),
    u = ByteString.EMPTY_BYTE_STRING,
    l = null
  ) {
    (this.target = e),
      (this.targetId = t),
      (this.purpose = n),
      (this.sequenceNumber = i),
      (this.snapshotVersion = s),
      (this.lastLimboFreeSnapshotVersion = o),
      (this.resumeToken = u),
      (this.expectedCount = l);
  }
  withSequenceNumber(e) {
    return new TargetData(
      this.target,
      this.targetId,
      this.purpose,
      e,
      this.snapshotVersion,
      this.lastLimboFreeSnapshotVersion,
      this.resumeToken,
      this.expectedCount
    );
  }
  withResumeToken(e, t) {
    return new TargetData(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      t,
      this.lastLimboFreeSnapshotVersion,
      e,
      null
    );
  }
  withExpectedCount(e) {
    return new TargetData(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      this.snapshotVersion,
      this.lastLimboFreeSnapshotVersion,
      this.resumeToken,
      e
    );
  }
  withLastLimboFreeSnapshotVersion(e) {
    return new TargetData(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      this.snapshotVersion,
      e,
      this.resumeToken,
      this.expectedCount
    );
  }
}
class __PRIVATE_LocalSerializer {
  constructor(e) {
    this.ut = e;
  }
}
function __PRIVATE_toDbRemoteDocument(e, t) {
  const n = t.key,
    i = {
      prefixPath: n.getCollectionPath().popLast().toArray(),
      collectionGroup: n.collectionGroup,
      documentId: n.path.lastSegment(),
      readTime: __PRIVATE_toDbTimestampKey(t.readTime),
      hasCommittedMutations: t.hasCommittedMutations,
    };
  if (t.isFoundDocument())
    i.document = (function __PRIVATE_toDocument(e, t) {
      return {
        name: __PRIVATE_toName(e, t.key),
        fields: t.data.value.mapValue.fields,
        updateTime: toTimestamp(e, t.version.toTimestamp()),
        createTime: toTimestamp(e, t.createTime.toTimestamp()),
      };
    })(e.ut, t);
  else if (t.isNoDocument())
    i.noDocument = {
      path: n.path.toArray(),
      readTime: __PRIVATE_toDbTimestamp(t.version),
    };
  else {
    if (!t.isUnknownDocument()) return fail();
    i.unknownDocument = {
      path: n.path.toArray(),
      version: __PRIVATE_toDbTimestamp(t.version),
    };
  }
  return i;
}
function __PRIVATE_toDbTimestampKey(e) {
  const t = e.toTimestamp();
  return [t.seconds, t.nanoseconds];
}
function __PRIVATE_toDbTimestamp(e) {
  const t = e.toTimestamp();
  return { seconds: t.seconds, nanoseconds: t.nanoseconds };
}
function __PRIVATE_fromDbTimestamp(e) {
  const t = new Timestamp(e.seconds, e.nanoseconds);
  return SnapshotVersion.fromTimestamp(t);
}
function __PRIVATE_fromDbMutationBatch(e, t) {
  const n = (t.baseMutations || []).map((t) => __PRIVATE_fromMutation(e.ut, t));
  for (let e = 0; e < t.mutations.length - 1; ++e) {
    const n = t.mutations[e];
    if (e + 1 < t.mutations.length && void 0 !== t.mutations[e + 1].transform) {
      const i = t.mutations[e + 1];
      (n.updateTransforms = i.transform.fieldTransforms),
        t.mutations.splice(e + 1, 1),
        ++e;
    }
  }
  const i = t.mutations.map((t) => __PRIVATE_fromMutation(e.ut, t)),
    s = Timestamp.fromMillis(t.localWriteTimeMs);
  return new MutationBatch(t.batchId, s, n, i);
}
function __PRIVATE_fromDbTarget(e) {
  const t = __PRIVATE_fromDbTimestamp(e.readTime),
    n =
      void 0 !== e.lastLimboFreeSnapshotVersion
        ? __PRIVATE_fromDbTimestamp(e.lastLimboFreeSnapshotVersion)
        : SnapshotVersion.min();
  let i;
  return (
    (i = (function __PRIVATE_isDocumentQuery(e) {
      return void 0 !== e.documents;
    })(e.query)
      ? (function __PRIVATE_fromDocumentsTarget(e) {
          return (
            __PRIVATE_hardAssert(1 === e.documents.length),
            __PRIVATE_queryToTarget(
              __PRIVATE_newQueryForPath(__PRIVATE_fromQueryPath(e.documents[0]))
            )
          );
        })(e.query)
      : (function __PRIVATE_fromQueryTarget(e) {
          return __PRIVATE_queryToTarget(
            __PRIVATE_convertQueryTargetToQuery(e)
          );
        })(e.query)),
    new TargetData(
      i,
      e.targetId,
      "TargetPurposeListen",
      e.lastListenSequenceNumber,
      t,
      n,
      ByteString.fromBase64String(e.resumeToken)
    )
  );
}
function __PRIVATE_toDbTarget(e, t) {
  const n = __PRIVATE_toDbTimestamp(t.snapshotVersion),
    i = __PRIVATE_toDbTimestamp(t.lastLimboFreeSnapshotVersion);
  let s;
  s = __PRIVATE_targetIsDocumentTarget(t.target)
    ? __PRIVATE_toDocumentsTarget(e.ut, t.target)
    : __PRIVATE_toQueryTarget(e.ut, t.target);
  const o = t.resumeToken.toBase64();
  return {
    targetId: t.targetId,
    canonicalId: __PRIVATE_canonifyTarget(t.target),
    readTime: n,
    resumeToken: o,
    lastListenSequenceNumber: t.sequenceNumber,
    lastLimboFreeSnapshotVersion: i,
    query: s,
  };
}
function __PRIVATE_fromBundledQuery(e) {
  const t = __PRIVATE_convertQueryTargetToQuery({
    parent: e.parent,
    structuredQuery: e.structuredQuery,
  });
  return "LAST" === e.limitType ? __PRIVATE_queryWithLimit(t, t.limit, "L") : t;
}
function __PRIVATE_fromDbDocumentOverlay(e, t) {
  return new Overlay(
    t.largestBatchId,
    __PRIVATE_fromMutation(e.ut, t.overlayMutation)
  );
}
function __PRIVATE_toDbDocumentOverlayKey(e, t) {
  const n = t.path.lastSegment();
  return [e, __PRIVATE_encodeResourcePath(t.path.popLast()), n];
}
function __PRIVATE_toDbIndexState(e, t, n, i) {
  return {
    indexId: e,
    uid: t.uid || "",
    sequenceNumber: n,
    readTime: __PRIVATE_toDbTimestamp(i.readTime),
    documentKey: __PRIVATE_encodeResourcePath(i.documentKey.path),
    largestBatchId: i.largestBatchId,
  };
}
class __PRIVATE_IndexedDbBundleCache {
  getBundleMetadata(e, t) {
    return __PRIVATE_bundlesStore(e)
      .get(t)
      .next((e) => {
        if (e)
          return (function __PRIVATE_fromDbBundle(e) {
            return {
              id: e.bundleId,
              createTime: __PRIVATE_fromDbTimestamp(e.createTime),
              version: e.version,
            };
          })(e);
      });
  }
  saveBundleMetadata(e, t) {
    return __PRIVATE_bundlesStore(e).put(
      (function __PRIVATE_toDbBundle(e) {
        return {
          bundleId: e.id,
          createTime: __PRIVATE_toDbTimestamp(
            __PRIVATE_fromVersion(e.createTime)
          ),
          version: e.version,
        };
      })(t)
    );
  }
  getNamedQuery(e, t) {
    return __PRIVATE_namedQueriesStore(e)
      .get(t)
      .next((e) => {
        if (e)
          return (function __PRIVATE_fromDbNamedQuery(e) {
            return {
              name: e.name,
              query: __PRIVATE_fromBundledQuery(e.bundledQuery),
              readTime: __PRIVATE_fromDbTimestamp(e.readTime),
            };
          })(e);
      });
  }
  saveNamedQuery(e, t) {
    return __PRIVATE_namedQueriesStore(e).put(
      (function __PRIVATE_toDbNamedQuery(e) {
        return {
          name: e.name,
          readTime: __PRIVATE_toDbTimestamp(__PRIVATE_fromVersion(e.readTime)),
          bundledQuery: e.bundledQuery,
        };
      })(t)
    );
  }
}
function __PRIVATE_bundlesStore(e) {
  return __PRIVATE_getStore(e, "bundles");
}
function __PRIVATE_namedQueriesStore(e) {
  return __PRIVATE_getStore(e, "namedQueries");
}
class __PRIVATE_IndexedDbDocumentOverlayCache {
  constructor(e, t) {
    (this.serializer = e), (this.userId = t);
  }
  static ct(e, t) {
    const n = t.uid || "";
    return new __PRIVATE_IndexedDbDocumentOverlayCache(e, n);
  }
  getOverlay(e, t) {
    return __PRIVATE_documentOverlayStore(e)
      .get(__PRIVATE_toDbDocumentOverlayKey(this.userId, t))
      .next((e) =>
        e ? __PRIVATE_fromDbDocumentOverlay(this.serializer, e) : null
      );
  }
  getOverlays(e, t) {
    const n = __PRIVATE_newOverlayMap();
    return PersistencePromise.forEach(t, (t) =>
      this.getOverlay(e, t).next((e) => {
        null !== e && n.set(t, e);
      })
    ).next(() => n);
  }
  saveOverlays(e, t, n) {
    const i = [];
    return (
      n.forEach((n, s) => {
        const o = new Overlay(t, s);
        i.push(this.lt(e, o));
      }),
      PersistencePromise.waitFor(i)
    );
  }
  removeOverlaysForBatchId(e, t, n) {
    const i = new Set();
    t.forEach((e) =>
      i.add(__PRIVATE_encodeResourcePath(e.getCollectionPath()))
    );
    const s = [];
    return (
      i.forEach((t) => {
        const i = IDBKeyRange.bound(
          [this.userId, t, n],
          [this.userId, t, n + 1],
          !1,
          !0
        );
        s.push(
          __PRIVATE_documentOverlayStore(e).H("collectionPathOverlayIndex", i)
        );
      }),
      PersistencePromise.waitFor(s)
    );
  }
  getOverlaysForCollection(e, t, n) {
    const i = __PRIVATE_newOverlayMap(),
      s = __PRIVATE_encodeResourcePath(t),
      o = IDBKeyRange.bound(
        [this.userId, s, n],
        [this.userId, s, Number.POSITIVE_INFINITY],
        !0
      );
    return __PRIVATE_documentOverlayStore(e)
      .W("collectionPathOverlayIndex", o)
      .next((e) => {
        for (const t of e) {
          const e = __PRIVATE_fromDbDocumentOverlay(this.serializer, t);
          i.set(e.getKey(), e);
        }
        return i;
      });
  }
  getOverlaysForCollectionGroup(e, t, n, i) {
    const s = __PRIVATE_newOverlayMap();
    let o;
    const u = IDBKeyRange.bound(
      [this.userId, t, n],
      [this.userId, t, Number.POSITIVE_INFINITY],
      !0
    );
    return __PRIVATE_documentOverlayStore(e)
      .Y({ index: "collectionGroupOverlayIndex", range: u }, (e, t, n) => {
        const u = __PRIVATE_fromDbDocumentOverlay(this.serializer, t);
        s.size() < i || u.largestBatchId === o
          ? (s.set(u.getKey(), u), (o = u.largestBatchId))
          : n.done();
      })
      .next(() => s);
  }
  lt(e, t) {
    return __PRIVATE_documentOverlayStore(e).put(
      (function __PRIVATE_toDbDocumentOverlay(e, t, n) {
        const [i, s, o] = __PRIVATE_toDbDocumentOverlayKey(t, n.mutation.key);
        return {
          userId: t,
          collectionPath: s,
          documentId: o,
          collectionGroup: n.mutation.key.getCollectionGroup(),
          largestBatchId: n.largestBatchId,
          overlayMutation: toMutation(e.ut, n.mutation),
        };
      })(this.serializer, this.userId, t)
    );
  }
}
function __PRIVATE_documentOverlayStore(e) {
  return __PRIVATE_getStore(e, "documentOverlays");
}
class __PRIVATE_FirestoreIndexValueWriter {
  constructor() {}
  ht(e, t) {
    this.Pt(e, t), t.It();
  }
  Pt(e, t) {
    if ("nullValue" in e) this.Tt(t, 5);
    else if ("booleanValue" in e) this.Tt(t, 10), t.Et(e.booleanValue ? 1 : 0);
    else if ("integerValue" in e)
      this.Tt(t, 15), t.Et(__PRIVATE_normalizeNumber(e.integerValue));
    else if ("doubleValue" in e) {
      const n = __PRIVATE_normalizeNumber(e.doubleValue);
      isNaN(n)
        ? this.Tt(t, 13)
        : (this.Tt(t, 15), __PRIVATE_isNegativeZero(n) ? t.Et(0) : t.Et(n));
    } else if ("timestampValue" in e) {
      const n = e.timestampValue;
      this.Tt(t, 20),
        "string" == typeof n
          ? t.dt(n)
          : (t.dt(`${n.seconds || ""}`), t.Et(n.nanos || 0));
    } else if ("stringValue" in e) this.At(e.stringValue, t), this.Rt(t);
    else if ("bytesValue" in e)
      this.Tt(t, 30),
        t.Vt(__PRIVATE_normalizeByteString(e.bytesValue)),
        this.Rt(t);
    else if ("referenceValue" in e) this.ft(e.referenceValue, t);
    else if ("geoPointValue" in e) {
      const n = e.geoPointValue;
      this.Tt(t, 45), t.Et(n.latitude || 0), t.Et(n.longitude || 0);
    } else
      "mapValue" in e
        ? __PRIVATE_isMaxValue(e)
          ? this.Tt(t, Number.MAX_SAFE_INTEGER)
          : (this.gt(e.mapValue, t), this.Rt(t))
        : "arrayValue" in e
        ? (this.yt(e.arrayValue, t), this.Rt(t))
        : fail();
  }
  At(e, t) {
    this.Tt(t, 25), this.wt(e, t);
  }
  wt(e, t) {
    t.dt(e);
  }
  gt(e, t) {
    const n = e.fields || {};
    this.Tt(t, 55);
    for (const e of Object.keys(n)) this.At(e, t), this.Pt(n[e], t);
  }
  yt(e, t) {
    const n = e.values || [];
    this.Tt(t, 50);
    for (const e of n) this.Pt(e, t);
  }
  ft(e, t) {
    this.Tt(t, 37),
      DocumentKey.fromName(e).path.forEach((e) => {
        this.Tt(t, 60), this.wt(e, t);
      });
  }
  Tt(e, t) {
    e.Et(t);
  }
  Rt(e) {
    e.Et(2);
  }
}
function __PRIVATE_numberOfLeadingZerosInByte(e) {
  if (0 === e) return 8;
  let t = 0;
  return (
    e >> 4 == 0 && ((t += 4), (e <<= 4)),
    e >> 6 == 0 && ((t += 2), (e <<= 2)),
    e >> 7 == 0 && (t += 1),
    t
  );
}
function __PRIVATE_unsignedNumLength(e) {
  const t =
    64 -
    (function __PRIVATE_numberOfLeadingZeros(e) {
      let t = 0;
      for (let n = 0; n < 8; ++n) {
        const i = __PRIVATE_numberOfLeadingZerosInByte(255 & e[n]);
        if (((t += i), 8 !== i)) break;
      }
      return t;
    })(e);
  return Math.ceil(t / 8);
}
__PRIVATE_FirestoreIndexValueWriter.St =
  new __PRIVATE_FirestoreIndexValueWriter();
class __PRIVATE_OrderedCodeWriter {
  constructor() {
    (this.buffer = new Uint8Array(1024)), (this.position = 0);
  }
  bt(e) {
    const t = e[Symbol.iterator]();
    let n = t.next();
    for (; !n.done; ) this.Dt(n.value), (n = t.next());
    this.Ct();
  }
  vt(e) {
    const t = e[Symbol.iterator]();
    let n = t.next();
    for (; !n.done; ) this.Ft(n.value), (n = t.next());
    this.Mt();
  }
  xt(e) {
    for (const t of e) {
      const e = t.charCodeAt(0);
      if (e < 128) this.Dt(e);
      else if (e < 2048) this.Dt(960 | (e >>> 6)), this.Dt(128 | (63 & e));
      else if (t < "\ud800" || "\udbff" < t)
        this.Dt(480 | (e >>> 12)),
          this.Dt(128 | (63 & (e >>> 6))),
          this.Dt(128 | (63 & e));
      else {
        const e = t.codePointAt(0);
        this.Dt(240 | (e >>> 18)),
          this.Dt(128 | (63 & (e >>> 12))),
          this.Dt(128 | (63 & (e >>> 6))),
          this.Dt(128 | (63 & e));
      }
    }
    this.Ct();
  }
  Ot(e) {
    for (const t of e) {
      const e = t.charCodeAt(0);
      if (e < 128) this.Ft(e);
      else if (e < 2048) this.Ft(960 | (e >>> 6)), this.Ft(128 | (63 & e));
      else if (t < "\ud800" || "\udbff" < t)
        this.Ft(480 | (e >>> 12)),
          this.Ft(128 | (63 & (e >>> 6))),
          this.Ft(128 | (63 & e));
      else {
        const e = t.codePointAt(0);
        this.Ft(240 | (e >>> 18)),
          this.Ft(128 | (63 & (e >>> 12))),
          this.Ft(128 | (63 & (e >>> 6))),
          this.Ft(128 | (63 & e));
      }
    }
    this.Mt();
  }
  Nt(e) {
    const t = this.Bt(e),
      n = __PRIVATE_unsignedNumLength(t);
    this.Lt(1 + n), (this.buffer[this.position++] = 255 & n);
    for (let e = t.length - n; e < t.length; ++e)
      this.buffer[this.position++] = 255 & t[e];
  }
  kt(e) {
    const t = this.Bt(e),
      n = __PRIVATE_unsignedNumLength(t);
    this.Lt(1 + n), (this.buffer[this.position++] = ~(255 & n));
    for (let e = t.length - n; e < t.length; ++e)
      this.buffer[this.position++] = ~(255 & t[e]);
  }
  qt() {
    this.Qt(255), this.Qt(255);
  }
  Kt() {
    this.$t(255), this.$t(255);
  }
  reset() {
    this.position = 0;
  }
  seed(e) {
    this.Lt(e.length),
      this.buffer.set(e, this.position),
      (this.position += e.length);
  }
  Ut() {
    return this.buffer.slice(0, this.position);
  }
  Bt(e) {
    const t = (function __PRIVATE_doubleToLongBits(e) {
        const t = new DataView(new ArrayBuffer(8));
        return t.setFloat64(0, e, !1), new Uint8Array(t.buffer);
      })(e),
      n = 0 != (128 & t[0]);
    t[0] ^= n ? 255 : 128;
    for (let e = 1; e < t.length; ++e) t[e] ^= n ? 255 : 0;
    return t;
  }
  Dt(e) {
    const t = 255 & e;
    0 === t
      ? (this.Qt(0), this.Qt(255))
      : 255 === t
      ? (this.Qt(255), this.Qt(0))
      : this.Qt(t);
  }
  Ft(e) {
    const t = 255 & e;
    0 === t
      ? (this.$t(0), this.$t(255))
      : 255 === t
      ? (this.$t(255), this.$t(0))
      : this.$t(e);
  }
  Ct() {
    this.Qt(0), this.Qt(1);
  }
  Mt() {
    this.$t(0), this.$t(1);
  }
  Qt(e) {
    this.Lt(1), (this.buffer[this.position++] = e);
  }
  $t(e) {
    this.Lt(1), (this.buffer[this.position++] = ~e);
  }
  Lt(e) {
    const t = e + this.position;
    if (t <= this.buffer.length) return;
    let n = 2 * this.buffer.length;
    n < t && (n = t);
    const i = new Uint8Array(n);
    i.set(this.buffer), (this.buffer = i);
  }
}
class __PRIVATE_AscendingIndexByteEncoder {
  constructor(e) {
    this.Wt = e;
  }
  Vt(e) {
    this.Wt.bt(e);
  }
  dt(e) {
    this.Wt.xt(e);
  }
  Et(e) {
    this.Wt.Nt(e);
  }
  It() {
    this.Wt.qt();
  }
}
class __PRIVATE_DescendingIndexByteEncoder {
  constructor(e) {
    this.Wt = e;
  }
  Vt(e) {
    this.Wt.vt(e);
  }
  dt(e) {
    this.Wt.Ot(e);
  }
  Et(e) {
    this.Wt.kt(e);
  }
  It() {
    this.Wt.Kt();
  }
}
class __PRIVATE_IndexByteEncoder {
  constructor() {
    (this.Wt = new __PRIVATE_OrderedCodeWriter()),
      (this.Gt = new __PRIVATE_AscendingIndexByteEncoder(this.Wt)),
      (this.zt = new __PRIVATE_DescendingIndexByteEncoder(this.Wt));
  }
  seed(e) {
    this.Wt.seed(e);
  }
  jt(e) {
    return 0 === e ? this.Gt : this.zt;
  }
  Ut() {
    return this.Wt.Ut();
  }
  reset() {
    this.Wt.reset();
  }
}
class __PRIVATE_IndexEntry {
  constructor(e, t, n, i) {
    (this.indexId = e),
      (this.documentKey = t),
      (this.arrayValue = n),
      (this.directionalValue = i);
  }
  Ht() {
    const e = this.directionalValue.length,
      t = 0 === e || 255 === this.directionalValue[e - 1] ? e + 1 : e,
      n = new Uint8Array(t);
    return (
      n.set(this.directionalValue, 0),
      t !== e ? n.set([0], this.directionalValue.length) : ++n[n.length - 1],
      new __PRIVATE_IndexEntry(
        this.indexId,
        this.documentKey,
        this.arrayValue,
        n
      )
    );
  }
}
function __PRIVATE_indexEntryComparator(e, t) {
  let n = e.indexId - t.indexId;
  return 0 !== n
    ? n
    : ((n = __PRIVATE_compareByteArrays(e.arrayValue, t.arrayValue)),
      0 !== n
        ? n
        : ((n = __PRIVATE_compareByteArrays(
            e.directionalValue,
            t.directionalValue
          )),
          0 !== n ? n : DocumentKey.comparator(e.documentKey, t.documentKey)));
}
function __PRIVATE_compareByteArrays(e, t) {
  for (let n = 0; n < e.length && n < t.length; ++n) {
    const i = e[n] - t[n];
    if (0 !== i) return i;
  }
  return e.length - t.length;
}
class __PRIVATE_TargetIndexMatcher {
  constructor(e) {
    (this.Jt = new SortedSet((e, t) =>
      FieldPath$1.comparator(e.field, t.field)
    )),
      (this.collectionId =
        null != e.collectionGroup ? e.collectionGroup : e.path.lastSegment()),
      (this.Yt = e.orderBy),
      (this.Zt = []);
    for (const t of e.filters) {
      const e = t;
      e.isInequality() ? (this.Jt = this.Jt.add(e)) : this.Zt.push(e);
    }
  }
  get Xt() {
    return this.Jt.size > 1;
  }
  en(e) {
    if (
      (__PRIVATE_hardAssert(e.collectionGroup === this.collectionId), this.Xt)
    )
      return !1;
    const t = __PRIVATE_fieldIndexGetArraySegment(e);
    if (void 0 !== t && !this.tn(t)) return !1;
    const n = __PRIVATE_fieldIndexGetDirectionalSegments(e);
    let i = new Set(),
      s = 0,
      o = 0;
    for (; s < n.length && this.tn(n[s]); ++s)
      i = i.add(n[s].fieldPath.canonicalString());
    if (s === n.length) return !0;
    if (this.Jt.size > 0) {
      const e = this.Jt.getIterator().getNext();
      if (!i.has(e.field.canonicalString())) {
        const t = n[s];
        if (!this.nn(e, t) || !this.rn(this.Yt[o++], t)) return !1;
      }
      ++s;
    }
    for (; s < n.length; ++s) {
      const e = n[s];
      if (o >= this.Yt.length || !this.rn(this.Yt[o++], e)) return !1;
    }
    return !0;
  }
  sn() {
    if (this.Xt) return null;
    let e = new SortedSet(FieldPath$1.comparator);
    const t = [];
    for (const n of this.Zt)
      if (!n.field.isKeyField())
        if ("array-contains" === n.op || "array-contains-any" === n.op)
          t.push(new IndexSegment(n.field, 2));
        else {
          if (e.has(n.field)) continue;
          (e = e.add(n.field)), t.push(new IndexSegment(n.field, 0));
        }
    for (const n of this.Yt)
      n.field.isKeyField() ||
        e.has(n.field) ||
        ((e = e.add(n.field)),
        t.push(new IndexSegment(n.field, "asc" === n.dir ? 0 : 1)));
    return new FieldIndex(
      FieldIndex.UNKNOWN_ID,
      this.collectionId,
      t,
      IndexState.empty()
    );
  }
  tn(e) {
    for (const t of this.Zt) if (this.nn(t, e)) return !0;
    return !1;
  }
  nn(e, t) {
    if (void 0 === e || !e.field.isEqual(t.fieldPath)) return !1;
    const n = "array-contains" === e.op || "array-contains-any" === e.op;
    return (2 === t.kind) === n;
  }
  rn(e, t) {
    return (
      !!e.field.isEqual(t.fieldPath) &&
      ((0 === t.kind && "asc" === e.dir) || (1 === t.kind && "desc" === e.dir))
    );
  }
}
function __PRIVATE_computeInExpansion(e) {
  var t, n;
  if (
    (__PRIVATE_hardAssert(
      e instanceof FieldFilter || e instanceof CompositeFilter
    ),
    e instanceof FieldFilter)
  ) {
    if (e instanceof __PRIVATE_InFilter) {
      const i =
        (null ===
          (n =
            null === (t = e.value.arrayValue) || void 0 === t
              ? void 0
              : t.values) || void 0 === n
          ? void 0
          : n.map((t) => FieldFilter.create(e.field, "==", t))) || [];
      return CompositeFilter.create(i, "or");
    }
    return e;
  }
  const i = e.filters.map((e) => __PRIVATE_computeInExpansion(e));
  return CompositeFilter.create(i, e.op);
}
function __PRIVATE_getDnfTerms(e) {
  if (0 === e.getFilters().length) return [];
  const t = __PRIVATE_computeDistributedNormalForm(
    __PRIVATE_computeInExpansion(e)
  );
  return (
    __PRIVATE_hardAssert(__PRIVATE_isDisjunctiveNormalForm(t)),
    __PRIVATE_isSingleFieldFilter(t) || __PRIVATE_isFlatConjunction(t)
      ? [t]
      : t.getFilters()
  );
}
function __PRIVATE_isSingleFieldFilter(e) {
  return e instanceof FieldFilter;
}
function __PRIVATE_isFlatConjunction(e) {
  return (
    e instanceof CompositeFilter &&
    __PRIVATE_compositeFilterIsFlatConjunction(e)
  );
}
function __PRIVATE_isDisjunctiveNormalForm(e) {
  return (
    __PRIVATE_isSingleFieldFilter(e) ||
    __PRIVATE_isFlatConjunction(e) ||
    (function __PRIVATE_isDisjunctionOfFieldFiltersAndFlatConjunctions(e) {
      if (
        e instanceof CompositeFilter &&
        __PRIVATE_compositeFilterIsDisjunction(e)
      ) {
        for (const t of e.getFilters())
          if (
            !__PRIVATE_isSingleFieldFilter(t) &&
            !__PRIVATE_isFlatConjunction(t)
          )
            return !1;
        return !0;
      }
      return !1;
    })(e)
  );
}
function __PRIVATE_computeDistributedNormalForm(e) {
  if (
    (__PRIVATE_hardAssert(
      e instanceof FieldFilter || e instanceof CompositeFilter
    ),
    e instanceof FieldFilter)
  )
    return e;
  if (1 === e.filters.length)
    return __PRIVATE_computeDistributedNormalForm(e.filters[0]);
  const t = e.filters.map((e) => __PRIVATE_computeDistributedNormalForm(e));
  let n = CompositeFilter.create(t, e.op);
  return (
    (n = __PRIVATE_applyAssociation(n)),
    __PRIVATE_isDisjunctiveNormalForm(n)
      ? n
      : (__PRIVATE_hardAssert(n instanceof CompositeFilter),
        __PRIVATE_hardAssert(__PRIVATE_compositeFilterIsConjunction(n)),
        __PRIVATE_hardAssert(n.filters.length > 1),
        n.filters.reduce((e, t) => __PRIVATE_applyDistribution(e, t)))
  );
}
function __PRIVATE_applyDistribution(e, t) {
  let n;
  return (
    __PRIVATE_hardAssert(
      e instanceof FieldFilter || e instanceof CompositeFilter
    ),
    __PRIVATE_hardAssert(
      t instanceof FieldFilter || t instanceof CompositeFilter
    ),
    (n =
      e instanceof FieldFilter
        ? t instanceof FieldFilter
          ? (function __PRIVATE_applyDistributionFieldFilters(e, t) {
              return CompositeFilter.create([e, t], "and");
            })(e, t)
          : __PRIVATE_applyDistributionFieldAndCompositeFilters(e, t)
        : t instanceof FieldFilter
        ? __PRIVATE_applyDistributionFieldAndCompositeFilters(t, e)
        : (function __PRIVATE_applyDistributionCompositeFilters(e, t) {
            if (
              (__PRIVATE_hardAssert(
                e.filters.length > 0 && t.filters.length > 0
              ),
              __PRIVATE_compositeFilterIsConjunction(e) &&
                __PRIVATE_compositeFilterIsConjunction(t))
            )
              return __PRIVATE_compositeFilterWithAddedFilters(
                e,
                t.getFilters()
              );
            const n = __PRIVATE_compositeFilterIsDisjunction(e) ? e : t,
              i = __PRIVATE_compositeFilterIsDisjunction(e) ? t : e,
              s = n.filters.map((e) => __PRIVATE_applyDistribution(e, i));
            return CompositeFilter.create(s, "or");
          })(e, t)),
    __PRIVATE_applyAssociation(n)
  );
}
function __PRIVATE_applyDistributionFieldAndCompositeFilters(e, t) {
  if (__PRIVATE_compositeFilterIsConjunction(t))
    return __PRIVATE_compositeFilterWithAddedFilters(t, e.getFilters());
  {
    const n = t.filters.map((t) => __PRIVATE_applyDistribution(e, t));
    return CompositeFilter.create(n, "or");
  }
}
function __PRIVATE_applyAssociation(e) {
  if (
    (__PRIVATE_hardAssert(
      e instanceof FieldFilter || e instanceof CompositeFilter
    ),
    e instanceof FieldFilter)
  )
    return e;
  const t = e.getFilters();
  if (1 === t.length) return __PRIVATE_applyAssociation(t[0]);
  if (__PRIVATE_compositeFilterIsFlat(e)) return e;
  const n = t.map((e) => __PRIVATE_applyAssociation(e)),
    i = [];
  return (
    n.forEach((t) => {
      t instanceof FieldFilter
        ? i.push(t)
        : t instanceof CompositeFilter &&
          (t.op === e.op ? i.push(...t.filters) : i.push(t));
    }),
    1 === i.length ? i[0] : CompositeFilter.create(i, e.op)
  );
}
class __PRIVATE_MemoryIndexManager {
  constructor() {
    this.on = new __PRIVATE_MemoryCollectionParentIndex();
  }
  addToCollectionParentIndex(e, t) {
    return this.on.add(t), PersistencePromise.resolve();
  }
  getCollectionParents(e, t) {
    return PersistencePromise.resolve(this.on.getEntries(t));
  }
  addFieldIndex(e, t) {
    return PersistencePromise.resolve();
  }
  deleteFieldIndex(e, t) {
    return PersistencePromise.resolve();
  }
  deleteAllFieldIndexes(e) {
    return PersistencePromise.resolve();
  }
  createTargetIndexes(e, t) {
    return PersistencePromise.resolve();
  }
  getDocumentsMatchingTarget(e, t) {
    return PersistencePromise.resolve(null);
  }
  getIndexType(e, t) {
    return PersistencePromise.resolve(0);
  }
  getFieldIndexes(e, t) {
    return PersistencePromise.resolve([]);
  }
  getNextCollectionGroupToUpdate(e) {
    return PersistencePromise.resolve(null);
  }
  getMinOffset(e, t) {
    return PersistencePromise.resolve(IndexOffset.min());
  }
  getMinOffsetFromCollectionGroup(e, t) {
    return PersistencePromise.resolve(IndexOffset.min());
  }
  updateCollectionGroup(e, t, n) {
    return PersistencePromise.resolve();
  }
  updateIndexEntries(e, t) {
    return PersistencePromise.resolve();
  }
}
class __PRIVATE_MemoryCollectionParentIndex {
  constructor() {
    this.index = {};
  }
  add(e) {
    const t = e.lastSegment(),
      n = e.popLast(),
      i = this.index[t] || new SortedSet(ResourcePath.comparator),
      s = !i.has(n);
    return (this.index[t] = i.add(n)), s;
  }
  has(e) {
    const t = e.lastSegment(),
      n = e.popLast(),
      i = this.index[t];
    return i && i.has(n);
  }
  getEntries(e) {
    return (this.index[e] || new SortedSet(ResourcePath.comparator)).toArray();
  }
}
const St = new Uint8Array(0);
class __PRIVATE_IndexedDbIndexManager {
  constructor(e, t) {
    (this.user = e),
      (this.databaseId = t),
      (this._n = new __PRIVATE_MemoryCollectionParentIndex()),
      (this.an = new ObjectMap(
        (e) => __PRIVATE_canonifyTarget(e),
        (e, t) => __PRIVATE_targetEquals(e, t)
      )),
      (this.uid = e.uid || "");
  }
  addToCollectionParentIndex(e, t) {
    if (!this._n.has(t)) {
      const n = t.lastSegment(),
        i = t.popLast();
      e.addOnCommittedListener(() => {
        this._n.add(t);
      });
      const s = { collectionId: n, parent: __PRIVATE_encodeResourcePath(i) };
      return __PRIVATE_collectionParentsStore(e).put(s);
    }
    return PersistencePromise.resolve();
  }
  getCollectionParents(e, t) {
    const n = [],
      i = IDBKeyRange.bound(
        [t, ""],
        [__PRIVATE_immediateSuccessor(t), ""],
        !1,
        !0
      );
    return __PRIVATE_collectionParentsStore(e)
      .W(i)
      .next((e) => {
        for (const i of e) {
          if (i.collectionId !== t) break;
          n.push(__PRIVATE_decodeResourcePath(i.parent));
        }
        return n;
      });
  }
  addFieldIndex(e, t) {
    const n = __PRIVATE_indexConfigurationStore(e),
      i = (function __PRIVATE_toDbIndexConfiguration(e) {
        return {
          indexId: e.indexId,
          collectionGroup: e.collectionGroup,
          fields: e.fields.map((e) => [e.fieldPath.canonicalString(), e.kind]),
        };
      })(t);
    delete i.indexId;
    const s = n.add(i);
    if (t.indexState) {
      const n = __PRIVATE_indexStateStore(e);
      return s.next((e) => {
        n.put(
          __PRIVATE_toDbIndexState(
            e,
            this.user,
            t.indexState.sequenceNumber,
            t.indexState.offset
          )
        );
      });
    }
    return s.next();
  }
  deleteFieldIndex(e, t) {
    const n = __PRIVATE_indexConfigurationStore(e),
      i = __PRIVATE_indexStateStore(e),
      s = __PRIVATE_indexEntriesStore(e);
    return n
      .delete(t.indexId)
      .next(() =>
        i.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))
      )
      .next(() =>
        s.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))
      );
  }
  deleteAllFieldIndexes(e) {
    const t = __PRIVATE_indexConfigurationStore(e),
      n = __PRIVATE_indexEntriesStore(e),
      i = __PRIVATE_indexStateStore(e);
    return t
      .H()
      .next(() => n.H())
      .next(() => i.H());
  }
  createTargetIndexes(e, t) {
    return PersistencePromise.forEach(this.un(t), (t) =>
      this.getIndexType(e, t).next((n) => {
        if (0 === n || 1 === n) {
          const n = new __PRIVATE_TargetIndexMatcher(t).sn();
          if (null != n) return this.addFieldIndex(e, n);
        }
      })
    );
  }
  getDocumentsMatchingTarget(e, t) {
    const n = __PRIVATE_indexEntriesStore(e);
    let i = !0;
    const s = new Map();
    return PersistencePromise.forEach(this.un(t), (t) =>
      this.cn(e, t).next((e) => {
        i && (i = !!e), s.set(t, e);
      })
    ).next(() => {
      if (i) {
        let e = __PRIVATE_documentKeySet();
        const i = [];
        return PersistencePromise.forEach(s, (s, o) => {
          __PRIVATE_logDebug(
            "IndexedDbIndexManager",
            `Using index ${(function __PRIVATE_fieldIndexToString(e) {
              return `id=${e.indexId}|cg=${e.collectionGroup}|f=${e.fields
                .map((e) => `${e.fieldPath}:${e.kind}`)
                .join(",")}`;
            })(s)} to execute ${__PRIVATE_canonifyTarget(t)}`
          );
          const u = (function __PRIVATE_targetGetArrayValues(e, t) {
              const n = __PRIVATE_fieldIndexGetArraySegment(t);
              if (void 0 === n) return null;
              for (const t of __PRIVATE_targetGetFieldFiltersForPath(
                e,
                n.fieldPath
              ))
                switch (t.op) {
                  case "array-contains-any":
                    return t.value.arrayValue.values || [];
                  case "array-contains":
                    return [t.value];
                }
              return null;
            })(o, s),
            l = (function __PRIVATE_targetGetNotInValues(e, t) {
              const n = new Map();
              for (const i of __PRIVATE_fieldIndexGetDirectionalSegments(t))
                for (const t of __PRIVATE_targetGetFieldFiltersForPath(
                  e,
                  i.fieldPath
                ))
                  switch (t.op) {
                    case "==":
                    case "in":
                      n.set(i.fieldPath.canonicalString(), t.value);
                      break;
                    case "not-in":
                    case "!=":
                      return (
                        n.set(i.fieldPath.canonicalString(), t.value),
                        Array.from(n.values())
                      );
                  }
              return null;
            })(o, s),
            _ = (function __PRIVATE_targetGetLowerBound(e, t) {
              const n = [];
              let i = !0;
              for (const s of __PRIVATE_fieldIndexGetDirectionalSegments(t)) {
                const t =
                  0 === s.kind
                    ? __PRIVATE_targetGetAscendingBound(
                        e,
                        s.fieldPath,
                        e.startAt
                      )
                    : __PRIVATE_targetGetDescendingBound(
                        e,
                        s.fieldPath,
                        e.startAt
                      );
                n.push(t.value), i && (i = t.inclusive);
              }
              return new Bound(n, i);
            })(o, s),
            h = (function __PRIVATE_targetGetUpperBound(e, t) {
              const n = [];
              let i = !0;
              for (const s of __PRIVATE_fieldIndexGetDirectionalSegments(t)) {
                const t =
                  0 === s.kind
                    ? __PRIVATE_targetGetDescendingBound(
                        e,
                        s.fieldPath,
                        e.endAt
                      )
                    : __PRIVATE_targetGetAscendingBound(
                        e,
                        s.fieldPath,
                        e.endAt
                      );
                n.push(t.value), i && (i = t.inclusive);
              }
              return new Bound(n, i);
            })(o, s),
            d = this.ln(s, o, _),
            m = this.ln(s, o, h),
            f = this.hn(s, o, l),
            g = this.Pn(s.indexId, u, d, _.inclusive, m, h.inclusive, f);
          return PersistencePromise.forEach(g, (s) =>
            n.j(s, t.limit).next((t) => {
              t.forEach((t) => {
                const n = DocumentKey.fromSegments(t.documentKey);
                e.has(n) || ((e = e.add(n)), i.push(n));
              });
            })
          );
        }).next(() => i);
      }
      return PersistencePromise.resolve(null);
    });
  }
  un(e) {
    let t = this.an.get(e);
    return (
      t ||
      ((t =
        0 === e.filters.length
          ? [e]
          : __PRIVATE_getDnfTerms(CompositeFilter.create(e.filters, "and")).map(
              (t) =>
                __PRIVATE_newTarget(
                  e.path,
                  e.collectionGroup,
                  e.orderBy,
                  t.getFilters(),
                  e.limit,
                  e.startAt,
                  e.endAt
                )
            )),
      this.an.set(e, t),
      t)
    );
  }
  Pn(e, t, n, i, s, o, u) {
    const l = (null != t ? t.length : 1) * Math.max(n.length, s.length),
      _ = l / (null != t ? t.length : 1),
      h = [];
    for (let d = 0; d < l; ++d) {
      const l = t ? this.In(t[d / _]) : St,
        m = this.Tn(e, l, n[d % _], i),
        f = this.En(e, l, s[d % _], o),
        g = u.map((t) => this.Tn(e, l, t, !0));
      h.push(...this.createRange(m, f, g));
    }
    return h;
  }
  Tn(e, t, n, i) {
    const s = new __PRIVATE_IndexEntry(e, DocumentKey.empty(), t, n);
    return i ? s : s.Ht();
  }
  En(e, t, n, i) {
    const s = new __PRIVATE_IndexEntry(e, DocumentKey.empty(), t, n);
    return i ? s.Ht() : s;
  }
  cn(e, t) {
    const n = new __PRIVATE_TargetIndexMatcher(t),
      i = null != t.collectionGroup ? t.collectionGroup : t.path.lastSegment();
    return this.getFieldIndexes(e, i).next((e) => {
      let t = null;
      for (const i of e)
        n.en(i) && (!t || i.fields.length > t.fields.length) && (t = i);
      return t;
    });
  }
  getIndexType(e, t) {
    let n = 2;
    const i = this.un(t);
    return PersistencePromise.forEach(i, (t) =>
      this.cn(e, t).next((e) => {
        e
          ? 0 !== n &&
            e.fields.length <
              (function __PRIVATE_targetGetSegmentCount(e) {
                let t = new SortedSet(FieldPath$1.comparator),
                  n = !1;
                for (const i of e.filters)
                  for (const e of i.getFlattenedFilters())
                    e.field.isKeyField() ||
                      ("array-contains" === e.op ||
                      "array-contains-any" === e.op
                        ? (n = !0)
                        : (t = t.add(e.field)));
                for (const n of e.orderBy)
                  n.field.isKeyField() || (t = t.add(n.field));
                return t.size + (n ? 1 : 0);
              })(t) &&
            (n = 1)
          : (n = 0);
      })
    ).next(() =>
      (function __PRIVATE_targetHasLimit(e) {
        return null !== e.limit;
      })(t) &&
      i.length > 1 &&
      2 === n
        ? 1
        : n
    );
  }
  dn(e, t) {
    const n = new __PRIVATE_IndexByteEncoder();
    for (const i of __PRIVATE_fieldIndexGetDirectionalSegments(e)) {
      const e = t.data.field(i.fieldPath);
      if (null == e) return null;
      const s = n.jt(i.kind);
      __PRIVATE_FirestoreIndexValueWriter.St.ht(e, s);
    }
    return n.Ut();
  }
  In(e) {
    const t = new __PRIVATE_IndexByteEncoder();
    return __PRIVATE_FirestoreIndexValueWriter.St.ht(e, t.jt(0)), t.Ut();
  }
  An(e, t) {
    const n = new __PRIVATE_IndexByteEncoder();
    return (
      __PRIVATE_FirestoreIndexValueWriter.St.ht(
        __PRIVATE_refValue(this.databaseId, t),
        n.jt(
          (function __PRIVATE_fieldIndexGetKeyOrder(e) {
            const t = __PRIVATE_fieldIndexGetDirectionalSegments(e);
            return 0 === t.length ? 0 : t[t.length - 1].kind;
          })(e)
        )
      ),
      n.Ut()
    );
  }
  hn(e, t, n) {
    if (null === n) return [];
    let i = [];
    i.push(new __PRIVATE_IndexByteEncoder());
    let s = 0;
    for (const o of __PRIVATE_fieldIndexGetDirectionalSegments(e)) {
      const e = n[s++];
      for (const n of i)
        if (this.Rn(t, o.fieldPath) && isArray(e)) i = this.Vn(i, o, e);
        else {
          const t = n.jt(o.kind);
          __PRIVATE_FirestoreIndexValueWriter.St.ht(e, t);
        }
    }
    return this.mn(i);
  }
  ln(e, t, n) {
    return this.hn(e, t, n.position);
  }
  mn(e) {
    const t = [];
    for (let n = 0; n < e.length; ++n) t[n] = e[n].Ut();
    return t;
  }
  Vn(e, t, n) {
    const i = [...e],
      s = [];
    for (const e of n.arrayValue.values || [])
      for (const n of i) {
        const i = new __PRIVATE_IndexByteEncoder();
        i.seed(n.Ut()),
          __PRIVATE_FirestoreIndexValueWriter.St.ht(e, i.jt(t.kind)),
          s.push(i);
      }
    return s;
  }
  Rn(e, t) {
    return !!e.filters.find(
      (e) =>
        e instanceof FieldFilter &&
        e.field.isEqual(t) &&
        ("in" === e.op || "not-in" === e.op)
    );
  }
  getFieldIndexes(e, t) {
    const n = __PRIVATE_indexConfigurationStore(e),
      i = __PRIVATE_indexStateStore(e);
    return (
      t ? n.W("collectionGroupIndex", IDBKeyRange.bound(t, t)) : n.W()
    ).next((e) => {
      const t = [];
      return PersistencePromise.forEach(e, (e) =>
        i.get([e.indexId, this.uid]).next((n) => {
          t.push(
            (function __PRIVATE_fromDbIndexConfiguration(e, t) {
              const n = t
                  ? new IndexState(
                      t.sequenceNumber,
                      new IndexOffset(
                        __PRIVATE_fromDbTimestamp(t.readTime),
                        new DocumentKey(
                          __PRIVATE_decodeResourcePath(t.documentKey)
                        ),
                        t.largestBatchId
                      )
                    )
                  : IndexState.empty(),
                i = e.fields.map(
                  ([e, t]) =>
                    new IndexSegment(FieldPath$1.fromServerFormat(e), t)
                );
              return new FieldIndex(e.indexId, e.collectionGroup, i, n);
            })(e, n)
          );
        })
      ).next(() => t);
    });
  }
  getNextCollectionGroupToUpdate(e) {
    return this.getFieldIndexes(e).next((e) =>
      0 === e.length
        ? null
        : (e.sort((e, t) => {
            const n = e.indexState.sequenceNumber - t.indexState.sequenceNumber;
            return 0 !== n
              ? n
              : __PRIVATE_primitiveComparator(
                  e.collectionGroup,
                  t.collectionGroup
                );
          }),
          e[0].collectionGroup)
    );
  }
  updateCollectionGroup(e, t, n) {
    const i = __PRIVATE_indexConfigurationStore(e),
      s = __PRIVATE_indexStateStore(e);
    return this.fn(e).next((e) =>
      i
        .W("collectionGroupIndex", IDBKeyRange.bound(t, t))
        .next((t) =>
          PersistencePromise.forEach(t, (t) =>
            s.put(__PRIVATE_toDbIndexState(t.indexId, this.user, e, n))
          )
        )
    );
  }
  updateIndexEntries(e, t) {
    const n = new Map();
    return PersistencePromise.forEach(t, (t, i) => {
      const s = n.get(t.collectionGroup);
      return (
        s
          ? PersistencePromise.resolve(s)
          : this.getFieldIndexes(e, t.collectionGroup)
      ).next(
        (s) => (
          n.set(t.collectionGroup, s),
          PersistencePromise.forEach(s, (n) =>
            this.gn(e, t, n).next((t) => {
              const s = this.pn(i, n);
              return t.isEqual(s)
                ? PersistencePromise.resolve()
                : this.yn(e, i, n, t, s);
            })
          )
        )
      );
    });
  }
  wn(e, t, n, i) {
    return __PRIVATE_indexEntriesStore(e).put({
      indexId: i.indexId,
      uid: this.uid,
      arrayValue: i.arrayValue,
      directionalValue: i.directionalValue,
      orderedDocumentKey: this.An(n, t.key),
      documentKey: t.key.path.toArray(),
    });
  }
  Sn(e, t, n, i) {
    return __PRIVATE_indexEntriesStore(e).delete([
      i.indexId,
      this.uid,
      i.arrayValue,
      i.directionalValue,
      this.An(n, t.key),
      t.key.path.toArray(),
    ]);
  }
  gn(e, t, n) {
    const i = __PRIVATE_indexEntriesStore(e);
    let s = new SortedSet(__PRIVATE_indexEntryComparator);
    return i
      .Y(
        {
          index: "documentKeyIndex",
          range: IDBKeyRange.only([n.indexId, this.uid, this.An(n, t)]),
        },
        (e, i) => {
          s = s.add(
            new __PRIVATE_IndexEntry(
              n.indexId,
              t,
              i.arrayValue,
              i.directionalValue
            )
          );
        }
      )
      .next(() => s);
  }
  pn(e, t) {
    let n = new SortedSet(__PRIVATE_indexEntryComparator);
    const i = this.dn(t, e);
    if (null == i) return n;
    const s = __PRIVATE_fieldIndexGetArraySegment(t);
    if (null != s) {
      const o = e.data.field(s.fieldPath);
      if (isArray(o))
        for (const s of o.arrayValue.values || [])
          n = n.add(new __PRIVATE_IndexEntry(t.indexId, e.key, this.In(s), i));
    } else n = n.add(new __PRIVATE_IndexEntry(t.indexId, e.key, St, i));
    return n;
  }
  yn(e, t, n, i, s) {
    __PRIVATE_logDebug(
      "IndexedDbIndexManager",
      "Updating index entries for document '%s'",
      t.key
    );
    const o = [];
    return (
      (function __PRIVATE_diffSortedSets(e, t, n, i, s) {
        const o = e.getIterator(),
          u = t.getIterator();
        let l = __PRIVATE_advanceIterator(o),
          _ = __PRIVATE_advanceIterator(u);
        for (; l || _; ) {
          let e = !1,
            t = !1;
          if (l && _) {
            const i = n(l, _);
            i < 0 ? (t = !0) : i > 0 && (e = !0);
          } else null != l ? (t = !0) : (e = !0);
          e
            ? (i(_), (_ = __PRIVATE_advanceIterator(u)))
            : t
            ? (s(l), (l = __PRIVATE_advanceIterator(o)))
            : ((l = __PRIVATE_advanceIterator(o)),
              (_ = __PRIVATE_advanceIterator(u)));
        }
      })(
        i,
        s,
        __PRIVATE_indexEntryComparator,
        (i) => {
          o.push(this.wn(e, t, n, i));
        },
        (i) => {
          o.push(this.Sn(e, t, n, i));
        }
      ),
      PersistencePromise.waitFor(o)
    );
  }
  fn(e) {
    let t = 1;
    return __PRIVATE_indexStateStore(e)
      .Y(
        {
          index: "sequenceNumberIndex",
          reverse: !0,
          range: IDBKeyRange.upperBound([this.uid, Number.MAX_SAFE_INTEGER]),
        },
        (e, n, i) => {
          i.done(), (t = n.sequenceNumber + 1);
        }
      )
      .next(() => t);
  }
  createRange(e, t, n) {
    n = n
      .sort((e, t) => __PRIVATE_indexEntryComparator(e, t))
      .filter(
        (e, t, n) => !t || 0 !== __PRIVATE_indexEntryComparator(e, n[t - 1])
      );
    const i = [];
    i.push(e);
    for (const s of n) {
      const n = __PRIVATE_indexEntryComparator(s, e),
        o = __PRIVATE_indexEntryComparator(s, t);
      if (0 === n) i[0] = e.Ht();
      else if (n > 0 && o < 0) i.push(s), i.push(s.Ht());
      else if (o > 0) break;
    }
    i.push(t);
    const s = [];
    for (let e = 0; e < i.length; e += 2) {
      if (this.bn(i[e], i[e + 1])) return [];
      const t = [
          i[e].indexId,
          this.uid,
          i[e].arrayValue,
          i[e].directionalValue,
          St,
          [],
        ],
        n = [
          i[e + 1].indexId,
          this.uid,
          i[e + 1].arrayValue,
          i[e + 1].directionalValue,
          St,
          [],
        ];
      s.push(IDBKeyRange.bound(t, n));
    }
    return s;
  }
  bn(e, t) {
    return __PRIVATE_indexEntryComparator(e, t) > 0;
  }
  getMinOffsetFromCollectionGroup(e, t) {
    return this.getFieldIndexes(e, t).next(
      __PRIVATE_getMinOffsetFromFieldIndexes
    );
  }
  getMinOffset(e, t) {
    return PersistencePromise.mapArray(this.un(t), (t) =>
      this.cn(e, t).next((e) => e || fail())
    ).next(__PRIVATE_getMinOffsetFromFieldIndexes);
  }
}
function __PRIVATE_collectionParentsStore(e) {
  return __PRIVATE_getStore(e, "collectionParents");
}
function __PRIVATE_indexEntriesStore(e) {
  return __PRIVATE_getStore(e, "indexEntries");
}
function __PRIVATE_indexConfigurationStore(e) {
  return __PRIVATE_getStore(e, "indexConfiguration");
}
function __PRIVATE_indexStateStore(e) {
  return __PRIVATE_getStore(e, "indexState");
}
function __PRIVATE_getMinOffsetFromFieldIndexes(e) {
  __PRIVATE_hardAssert(0 !== e.length);
  let t = e[0].indexState.offset,
    n = t.largestBatchId;
  for (let i = 1; i < e.length; i++) {
    const s = e[i].indexState.offset;
    __PRIVATE_indexOffsetComparator(s, t) < 0 && (t = s),
      n < s.largestBatchId && (n = s.largestBatchId);
  }
  return new IndexOffset(t.readTime, t.documentKey, n);
}
const vt = {
  didRun: !1,
  sequenceNumbersCollected: 0,
  targetsRemoved: 0,
  documentsRemoved: 0,
};
class LruParams {
  constructor(e, t, n) {
    (this.cacheSizeCollectionThreshold = e),
      (this.percentileToCollect = t),
      (this.maximumSequenceNumbersToCollect = n);
  }
  static withCacheSize(e) {
    return new LruParams(
      e,
      LruParams.DEFAULT_COLLECTION_PERCENTILE,
      LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
    );
  }
}
function removeMutationBatch(e, t, n) {
  const i = e.store("mutations"),
    s = e.store("documentMutations"),
    o = [],
    u = IDBKeyRange.only(n.batchId);
  let l = 0;
  const _ = i.Y({ range: u }, (e, t, n) => (l++, n.delete()));
  o.push(
    _.next(() => {
      __PRIVATE_hardAssert(1 === l);
    })
  );
  const h = [];
  for (const e of n.mutations) {
    const i = __PRIVATE_newDbDocumentMutationKey(t, e.key.path, n.batchId);
    o.push(s.delete(i)), h.push(e.key);
  }
  return PersistencePromise.waitFor(o).next(() => h);
}
function __PRIVATE_dbDocumentSize(e) {
  if (!e) return 0;
  let t;
  if (e.document) t = e.document;
  else if (e.unknownDocument) t = e.unknownDocument;
  else {
    if (!e.noDocument) throw fail();
    t = e.noDocument;
  }
  return JSON.stringify(t).length;
}
(LruParams.DEFAULT_COLLECTION_PERCENTILE = 10),
  (LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
  (LruParams.DEFAULT = new LruParams(
    41943040,
    LruParams.DEFAULT_COLLECTION_PERCENTILE,
    LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
  )),
  (LruParams.DISABLED = new LruParams(-1, 0, 0));
class __PRIVATE_IndexedDbMutationQueue {
  constructor(e, t, n, i) {
    (this.userId = e),
      (this.serializer = t),
      (this.indexManager = n),
      (this.referenceDelegate = i),
      (this.Dn = {});
  }
  static ct(e, t, n, i) {
    __PRIVATE_hardAssert("" !== e.uid);
    const s = e.isAuthenticated() ? e.uid : "";
    return new __PRIVATE_IndexedDbMutationQueue(s, t, n, i);
  }
  checkEmpty(e) {
    let t = !0;
    const n = IDBKeyRange.bound(
      [this.userId, Number.NEGATIVE_INFINITY],
      [this.userId, Number.POSITIVE_INFINITY]
    );
    return __PRIVATE_mutationsStore(e)
      .Y({ index: "userMutationsIndex", range: n }, (e, n, i) => {
        (t = !1), i.done();
      })
      .next(() => t);
  }
  addMutationBatch(e, t, n, i) {
    const s = __PRIVATE_documentMutationsStore(e),
      o = __PRIVATE_mutationsStore(e);
    return o.add({}).next((u) => {
      __PRIVATE_hardAssert("number" == typeof u);
      const l = new MutationBatch(u, t, n, i),
        _ = (function __PRIVATE_toDbMutationBatch(e, t, n) {
          const i = n.baseMutations.map((t) => toMutation(e.ut, t)),
            s = n.mutations.map((t) => toMutation(e.ut, t));
          return {
            userId: t,
            batchId: n.batchId,
            localWriteTimeMs: n.localWriteTime.toMillis(),
            baseMutations: i,
            mutations: s,
          };
        })(this.serializer, this.userId, l),
        h = [];
      let d = new SortedSet((e, t) =>
        __PRIVATE_primitiveComparator(e.canonicalString(), t.canonicalString())
      );
      for (const e of i) {
        const t = __PRIVATE_newDbDocumentMutationKey(
          this.userId,
          e.key.path,
          u
        );
        (d = d.add(e.key.path.popLast())),
          h.push(o.put(_)),
          h.push(s.put(t, ze));
      }
      return (
        d.forEach((t) => {
          h.push(this.indexManager.addToCollectionParentIndex(e, t));
        }),
        e.addOnCommittedListener(() => {
          this.Dn[u] = l.keys();
        }),
        PersistencePromise.waitFor(h).next(() => l)
      );
    });
  }
  lookupMutationBatch(e, t) {
    return __PRIVATE_mutationsStore(e)
      .get(t)
      .next((e) =>
        e
          ? (__PRIVATE_hardAssert(e.userId === this.userId),
            __PRIVATE_fromDbMutationBatch(this.serializer, e))
          : null
      );
  }
  Cn(e, t) {
    return this.Dn[t]
      ? PersistencePromise.resolve(this.Dn[t])
      : this.lookupMutationBatch(e, t).next((e) => {
          if (e) {
            const n = e.keys();
            return (this.Dn[t] = n), n;
          }
          return null;
        });
  }
  getNextMutationBatchAfterBatchId(e, t) {
    const n = t + 1,
      i = IDBKeyRange.lowerBound([this.userId, n]);
    let s = null;
    return __PRIVATE_mutationsStore(e)
      .Y({ index: "userMutationsIndex", range: i }, (e, t, i) => {
        t.userId === this.userId &&
          (__PRIVATE_hardAssert(t.batchId >= n),
          (s = __PRIVATE_fromDbMutationBatch(this.serializer, t))),
          i.done();
      })
      .next(() => s);
  }
  getHighestUnacknowledgedBatchId(e) {
    const t = IDBKeyRange.upperBound([this.userId, Number.POSITIVE_INFINITY]);
    let n = -1;
    return __PRIVATE_mutationsStore(e)
      .Y({ index: "userMutationsIndex", range: t, reverse: !0 }, (e, t, i) => {
        (n = t.batchId), i.done();
      })
      .next(() => n);
  }
  getAllMutationBatches(e) {
    const t = IDBKeyRange.bound(
      [this.userId, -1],
      [this.userId, Number.POSITIVE_INFINITY]
    );
    return __PRIVATE_mutationsStore(e)
      .W("userMutationsIndex", t)
      .next((e) =>
        e.map((e) => __PRIVATE_fromDbMutationBatch(this.serializer, e))
      );
  }
  getAllMutationBatchesAffectingDocumentKey(e, t) {
    const n = __PRIVATE_newDbDocumentMutationPrefixForPath(this.userId, t.path),
      i = IDBKeyRange.lowerBound(n),
      s = [];
    return __PRIVATE_documentMutationsStore(e)
      .Y({ range: i }, (n, i, o) => {
        const [u, l, _] = n,
          h = __PRIVATE_decodeResourcePath(l);
        if (u === this.userId && t.path.isEqual(h))
          return __PRIVATE_mutationsStore(e)
            .get(_)
            .next((e) => {
              if (!e) throw fail();
              __PRIVATE_hardAssert(e.userId === this.userId),
                s.push(__PRIVATE_fromDbMutationBatch(this.serializer, e));
            });
        o.done();
      })
      .next(() => s);
  }
  getAllMutationBatchesAffectingDocumentKeys(e, t) {
    let n = new SortedSet(__PRIVATE_primitiveComparator);
    const i = [];
    return (
      t.forEach((t) => {
        const s = __PRIVATE_newDbDocumentMutationPrefixForPath(
            this.userId,
            t.path
          ),
          o = IDBKeyRange.lowerBound(s),
          u = __PRIVATE_documentMutationsStore(e).Y({ range: o }, (e, i, s) => {
            const [o, u, l] = e,
              _ = __PRIVATE_decodeResourcePath(u);
            o === this.userId && t.path.isEqual(_) ? (n = n.add(l)) : s.done();
          });
        i.push(u);
      }),
      PersistencePromise.waitFor(i).next(() => this.vn(e, n))
    );
  }
  getAllMutationBatchesAffectingQuery(e, t) {
    const n = t.path,
      i = n.length + 1,
      s = __PRIVATE_newDbDocumentMutationPrefixForPath(this.userId, n),
      o = IDBKeyRange.lowerBound(s);
    let u = new SortedSet(__PRIVATE_primitiveComparator);
    return __PRIVATE_documentMutationsStore(e)
      .Y({ range: o }, (e, t, s) => {
        const [o, l, _] = e,
          h = __PRIVATE_decodeResourcePath(l);
        o === this.userId && n.isPrefixOf(h)
          ? h.length === i && (u = u.add(_))
          : s.done();
      })
      .next(() => this.vn(e, u));
  }
  vn(e, t) {
    const n = [],
      i = [];
    return (
      t.forEach((t) => {
        i.push(
          __PRIVATE_mutationsStore(e)
            .get(t)
            .next((e) => {
              if (null === e) throw fail();
              __PRIVATE_hardAssert(e.userId === this.userId),
                n.push(__PRIVATE_fromDbMutationBatch(this.serializer, e));
            })
        );
      }),
      PersistencePromise.waitFor(i).next(() => n)
    );
  }
  removeMutationBatch(e, t) {
    return removeMutationBatch(e.ae, this.userId, t).next(
      (n) => (
        e.addOnCommittedListener(() => {
          this.Fn(t.batchId);
        }),
        PersistencePromise.forEach(n, (t) =>
          this.referenceDelegate.markPotentiallyOrphaned(e, t)
        )
      )
    );
  }
  Fn(e) {
    delete this.Dn[e];
  }
  performConsistencyCheck(e) {
    return this.checkEmpty(e).next((t) => {
      if (!t) return PersistencePromise.resolve();
      const n = IDBKeyRange.lowerBound(
          (function __PRIVATE_newDbDocumentMutationPrefixForUser(e) {
            return [e];
          })(this.userId)
        ),
        i = [];
      return __PRIVATE_documentMutationsStore(e)
        .Y({ range: n }, (e, t, n) => {
          if (e[0] === this.userId) {
            const t = __PRIVATE_decodeResourcePath(e[1]);
            i.push(t);
          } else n.done();
        })
        .next(() => {
          __PRIVATE_hardAssert(0 === i.length);
        });
    });
  }
  containsKey(e, t) {
    return __PRIVATE_mutationQueueContainsKey(e, this.userId, t);
  }
  Mn(e) {
    return __PRIVATE_mutationQueuesStore(e)
      .get(this.userId)
      .next(
        (e) =>
          e || {
            userId: this.userId,
            lastAcknowledgedBatchId: -1,
            lastStreamToken: "",
          }
      );
  }
}
function __PRIVATE_mutationQueueContainsKey(e, t, n) {
  const i = __PRIVATE_newDbDocumentMutationPrefixForPath(t, n.path),
    s = i[1],
    o = IDBKeyRange.lowerBound(i);
  let u = !1;
  return __PRIVATE_documentMutationsStore(e)
    .Y({ range: o, J: !0 }, (e, n, i) => {
      const [o, l, _] = e;
      o === t && l === s && (u = !0), i.done();
    })
    .next(() => u);
}
function __PRIVATE_mutationsStore(e) {
  return __PRIVATE_getStore(e, "mutations");
}
function __PRIVATE_documentMutationsStore(e) {
  return __PRIVATE_getStore(e, "documentMutations");
}
function __PRIVATE_mutationQueuesStore(e) {
  return __PRIVATE_getStore(e, "mutationQueues");
}
class __PRIVATE_TargetIdGenerator {
  constructor(e) {
    this.xn = e;
  }
  next() {
    return (this.xn += 2), this.xn;
  }
  static On() {
    return new __PRIVATE_TargetIdGenerator(0);
  }
  static Nn() {
    return new __PRIVATE_TargetIdGenerator(-1);
  }
}
class __PRIVATE_IndexedDbTargetCache {
  constructor(e, t) {
    (this.referenceDelegate = e), (this.serializer = t);
  }
  allocateTargetId(e) {
    return this.Bn(e).next((t) => {
      const n = new __PRIVATE_TargetIdGenerator(t.highestTargetId);
      return (
        (t.highestTargetId = n.next()),
        this.Ln(e, t).next(() => t.highestTargetId)
      );
    });
  }
  getLastRemoteSnapshotVersion(e) {
    return this.Bn(e).next((e) =>
      SnapshotVersion.fromTimestamp(
        new Timestamp(
          e.lastRemoteSnapshotVersion.seconds,
          e.lastRemoteSnapshotVersion.nanoseconds
        )
      )
    );
  }
  getHighestSequenceNumber(e) {
    return this.Bn(e).next((e) => e.highestListenSequenceNumber);
  }
  setTargetsMetadata(e, t, n) {
    return this.Bn(e).next(
      (i) => (
        (i.highestListenSequenceNumber = t),
        n && (i.lastRemoteSnapshotVersion = n.toTimestamp()),
        t > i.highestListenSequenceNumber &&
          (i.highestListenSequenceNumber = t),
        this.Ln(e, i)
      )
    );
  }
  addTargetData(e, t) {
    return this.kn(e, t).next(() =>
      this.Bn(e).next(
        (n) => ((n.targetCount += 1), this.qn(t, n), this.Ln(e, n))
      )
    );
  }
  updateTargetData(e, t) {
    return this.kn(e, t);
  }
  removeTargetData(e, t) {
    return this.removeMatchingKeysForTargetId(e, t.targetId)
      .next(() => __PRIVATE_targetsStore(e).delete(t.targetId))
      .next(() => this.Bn(e))
      .next(
        (t) => (
          __PRIVATE_hardAssert(t.targetCount > 0),
          (t.targetCount -= 1),
          this.Ln(e, t)
        )
      );
  }
  removeTargets(e, t, n) {
    let i = 0;
    const s = [];
    return __PRIVATE_targetsStore(e)
      .Y((o, u) => {
        const l = __PRIVATE_fromDbTarget(u);
        l.sequenceNumber <= t &&
          null === n.get(l.targetId) &&
          (i++, s.push(this.removeTargetData(e, l)));
      })
      .next(() => PersistencePromise.waitFor(s))
      .next(() => i);
  }
  forEachTarget(e, t) {
    return __PRIVATE_targetsStore(e).Y((e, n) => {
      const i = __PRIVATE_fromDbTarget(n);
      t(i);
    });
  }
  Bn(e) {
    return __PRIVATE_globalTargetStore(e)
      .get("targetGlobalKey")
      .next((e) => (__PRIVATE_hardAssert(null !== e), e));
  }
  Ln(e, t) {
    return __PRIVATE_globalTargetStore(e).put("targetGlobalKey", t);
  }
  kn(e, t) {
    return __PRIVATE_targetsStore(e).put(
      __PRIVATE_toDbTarget(this.serializer, t)
    );
  }
  qn(e, t) {
    let n = !1;
    return (
      e.targetId > t.highestTargetId &&
        ((t.highestTargetId = e.targetId), (n = !0)),
      e.sequenceNumber > t.highestListenSequenceNumber &&
        ((t.highestListenSequenceNumber = e.sequenceNumber), (n = !0)),
      n
    );
  }
  getTargetCount(e) {
    return this.Bn(e).next((e) => e.targetCount);
  }
  getTargetData(e, t) {
    const n = __PRIVATE_canonifyTarget(t),
      i = IDBKeyRange.bound(
        [n, Number.NEGATIVE_INFINITY],
        [n, Number.POSITIVE_INFINITY]
      );
    let s = null;
    return __PRIVATE_targetsStore(e)
      .Y({ range: i, index: "queryTargetsIndex" }, (e, n, i) => {
        const o = __PRIVATE_fromDbTarget(n);
        __PRIVATE_targetEquals(t, o.target) && ((s = o), i.done());
      })
      .next(() => s);
  }
  addMatchingKeys(e, t, n) {
    const i = [],
      s = __PRIVATE_documentTargetStore(e);
    return (
      t.forEach((t) => {
        const o = __PRIVATE_encodeResourcePath(t.path);
        i.push(s.put({ targetId: n, path: o })),
          i.push(this.referenceDelegate.addReference(e, n, t));
      }),
      PersistencePromise.waitFor(i)
    );
  }
  removeMatchingKeys(e, t, n) {
    const i = __PRIVATE_documentTargetStore(e);
    return PersistencePromise.forEach(t, (t) => {
      const s = __PRIVATE_encodeResourcePath(t.path);
      return PersistencePromise.waitFor([
        i.delete([n, s]),
        this.referenceDelegate.removeReference(e, n, t),
      ]);
    });
  }
  removeMatchingKeysForTargetId(e, t) {
    const n = __PRIVATE_documentTargetStore(e),
      i = IDBKeyRange.bound([t], [t + 1], !1, !0);
    return n.delete(i);
  }
  getMatchingKeysForTargetId(e, t) {
    const n = IDBKeyRange.bound([t], [t + 1], !1, !0),
      i = __PRIVATE_documentTargetStore(e);
    let s = __PRIVATE_documentKeySet();
    return i
      .Y({ range: n, J: !0 }, (e, t, n) => {
        const i = __PRIVATE_decodeResourcePath(e[1]),
          o = new DocumentKey(i);
        s = s.add(o);
      })
      .next(() => s);
  }
  containsKey(e, t) {
    const n = __PRIVATE_encodeResourcePath(t.path),
      i = IDBKeyRange.bound([n], [__PRIVATE_immediateSuccessor(n)], !1, !0);
    let s = 0;
    return __PRIVATE_documentTargetStore(e)
      .Y({ index: "documentTargetsIndex", J: !0, range: i }, ([e, t], n, i) => {
        0 !== e && (s++, i.done());
      })
      .next(() => s > 0);
  }
  _t(e, t) {
    return __PRIVATE_targetsStore(e)
      .get(t)
      .next((e) => (e ? __PRIVATE_fromDbTarget(e) : null));
  }
}
function __PRIVATE_targetsStore(e) {
  return __PRIVATE_getStore(e, "targets");
}
function __PRIVATE_globalTargetStore(e) {
  return __PRIVATE_getStore(e, "targetGlobal");
}
function __PRIVATE_documentTargetStore(e) {
  return __PRIVATE_getStore(e, "targetDocuments");
}
function __PRIVATE_bufferEntryComparator([e, t], [n, i]) {
  const s = __PRIVATE_primitiveComparator(e, n);
  return 0 === s ? __PRIVATE_primitiveComparator(t, i) : s;
}
class __PRIVATE_RollingSequenceNumberBuffer {
  constructor(e) {
    (this.Qn = e),
      (this.buffer = new SortedSet(__PRIVATE_bufferEntryComparator)),
      (this.Kn = 0);
  }
  $n() {
    return ++this.Kn;
  }
  Un(e) {
    const t = [e, this.$n()];
    if (this.buffer.size < this.Qn) this.buffer = this.buffer.add(t);
    else {
      const e = this.buffer.last();
      __PRIVATE_bufferEntryComparator(t, e) < 0 &&
        (this.buffer = this.buffer.delete(e).add(t));
    }
  }
  get maxValue() {
    return this.buffer.last()[0];
  }
}
class __PRIVATE_LruScheduler {
  constructor(e, t, n) {
    (this.garbageCollector = e),
      (this.asyncQueue = t),
      (this.localStore = n),
      (this.Wn = null);
  }
  start() {
    -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold &&
      this.Gn(6e4);
  }
  stop() {
    this.Wn && (this.Wn.cancel(), (this.Wn = null));
  }
  get started() {
    return null !== this.Wn;
  }
  Gn(e) {
    __PRIVATE_logDebug(
      "LruGarbageCollector",
      `Garbage collection scheduled in ${e}ms`
    ),
      (this.Wn = this.asyncQueue.enqueueAfterDelay(
        "lru_garbage_collection",
        e,
        async () => {
          this.Wn = null;
          try {
            await this.localStore.collectGarbage(this.garbageCollector);
          } catch (e) {
            __PRIVATE_isIndexedDbTransactionError(e)
              ? __PRIVATE_logDebug(
                  "LruGarbageCollector",
                  "Ignoring IndexedDB error during garbage collection: ",
                  e
                )
              : await __PRIVATE_ignoreIfPrimaryLeaseLoss(e);
          }
          await this.Gn(3e5);
        }
      ));
  }
}
class __PRIVATE_LruGarbageCollectorImpl {
  constructor(e, t) {
    (this.zn = e), (this.params = t);
  }
  calculateTargetCount(e, t) {
    return this.zn.jn(e).next((e) => Math.floor((t / 100) * e));
  }
  nthSequenceNumber(e, t) {
    if (0 === t) return PersistencePromise.resolve(__PRIVATE_ListenSequence._e);
    const n = new __PRIVATE_RollingSequenceNumberBuffer(t);
    return this.zn
      .forEachTarget(e, (e) => n.Un(e.sequenceNumber))
      .next(() => this.zn.Hn(e, (e) => n.Un(e)))
      .next(() => n.maxValue);
  }
  removeTargets(e, t, n) {
    return this.zn.removeTargets(e, t, n);
  }
  removeOrphanedDocuments(e, t) {
    return this.zn.removeOrphanedDocuments(e, t);
  }
  collect(e, t) {
    return -1 === this.params.cacheSizeCollectionThreshold
      ? (__PRIVATE_logDebug(
          "LruGarbageCollector",
          "Garbage collection skipped; disabled"
        ),
        PersistencePromise.resolve(vt))
      : this.getCacheSize(e).next((n) =>
          n < this.params.cacheSizeCollectionThreshold
            ? (__PRIVATE_logDebug(
                "LruGarbageCollector",
                `Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`
              ),
              vt)
            : this.Jn(e, t)
        );
  }
  getCacheSize(e) {
    return this.zn.getCacheSize(e);
  }
  Jn(e, t) {
    let n, i, s, o, u, _, h;
    const d = Date.now();
    return this.calculateTargetCount(e, this.params.percentileToCollect)
      .next(
        (t) => (
          t > this.params.maximumSequenceNumbersToCollect
            ? (__PRIVATE_logDebug(
                "LruGarbageCollector",
                `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`
              ),
              (i = this.params.maximumSequenceNumbersToCollect))
            : (i = t),
          (o = Date.now()),
          this.nthSequenceNumber(e, i)
        )
      )
      .next((i) => ((n = i), (u = Date.now()), this.removeTargets(e, n, t)))
      .next(
        (t) => ((s = t), (_ = Date.now()), this.removeOrphanedDocuments(e, n))
      )
      .next(
        (e) => (
          (h = Date.now()),
          __PRIVATE_getLogLevel() <= l.DEBUG &&
            __PRIVATE_logDebug(
              "LruGarbageCollector",
              `LRU Garbage Collection\n\tCounted targets in ${
                o - d
              }ms\n\tDetermined least recently used ${i} in ` +
                (u - o) +
                "ms\n" +
                `\tRemoved ${s} targets in ` +
                (_ - u) +
                "ms\n" +
                `\tRemoved ${e} documents in ` +
                (h - _) +
                "ms\n" +
                `Total Duration: ${h - d}ms`
            ),
          PersistencePromise.resolve({
            didRun: !0,
            sequenceNumbersCollected: i,
            targetsRemoved: s,
            documentsRemoved: e,
          })
        )
      );
  }
}
function __PRIVATE_newLruGarbageCollector(e, t) {
  return new __PRIVATE_LruGarbageCollectorImpl(e, t);
}
class __PRIVATE_IndexedDbLruDelegateImpl {
  constructor(e, t) {
    (this.db = e),
      (this.garbageCollector = __PRIVATE_newLruGarbageCollector(this, t));
  }
  jn(e) {
    const t = this.Yn(e);
    return this.db
      .getTargetCache()
      .getTargetCount(e)
      .next((e) => t.next((t) => e + t));
  }
  Yn(e) {
    let t = 0;
    return this.Hn(e, (e) => {
      t++;
    }).next(() => t);
  }
  forEachTarget(e, t) {
    return this.db.getTargetCache().forEachTarget(e, t);
  }
  Hn(e, t) {
    return this.Zn(e, (e, n) => t(n));
  }
  addReference(e, t, n) {
    return __PRIVATE_writeSentinelKey(e, n);
  }
  removeReference(e, t, n) {
    return __PRIVATE_writeSentinelKey(e, n);
  }
  removeTargets(e, t, n) {
    return this.db.getTargetCache().removeTargets(e, t, n);
  }
  markPotentiallyOrphaned(e, t) {
    return __PRIVATE_writeSentinelKey(e, t);
  }
  Xn(e, t) {
    return (function __PRIVATE_mutationQueuesContainKey(e, t) {
      let n = !1;
      return __PRIVATE_mutationQueuesStore(e)
        .Z((i) =>
          __PRIVATE_mutationQueueContainsKey(e, i, t).next(
            (e) => (e && (n = !0), PersistencePromise.resolve(!e))
          )
        )
        .next(() => n);
    })(e, t);
  }
  removeOrphanedDocuments(e, t) {
    const n = this.db.getRemoteDocumentCache().newChangeBuffer(),
      i = [];
    let s = 0;
    return this.Zn(e, (o, u) => {
      if (u <= t) {
        const t = this.Xn(e, o).next((t) => {
          if (!t)
            return (
              s++,
              n.getEntry(e, o).next(
                () => (
                  n.removeEntry(o, SnapshotVersion.min()),
                  __PRIVATE_documentTargetStore(e).delete(
                    (function __PRIVATE_sentinelKey$1(e) {
                      return [0, __PRIVATE_encodeResourcePath(e.path)];
                    })(o)
                  )
                )
              )
            );
        });
        i.push(t);
      }
    })
      .next(() => PersistencePromise.waitFor(i))
      .next(() => n.apply(e))
      .next(() => s);
  }
  removeTarget(e, t) {
    const n = t.withSequenceNumber(e.currentSequenceNumber);
    return this.db.getTargetCache().updateTargetData(e, n);
  }
  updateLimboDocument(e, t) {
    return __PRIVATE_writeSentinelKey(e, t);
  }
  Zn(e, t) {
    const n = __PRIVATE_documentTargetStore(e);
    let i,
      s = __PRIVATE_ListenSequence._e;
    return n
      .Y(
        { index: "documentTargetsIndex" },
        ([e, n], { path: o, sequenceNumber: u }) => {
          0 === e
            ? (s !== __PRIVATE_ListenSequence._e &&
                t(new DocumentKey(__PRIVATE_decodeResourcePath(i)), s),
              (s = u),
              (i = o))
            : (s = __PRIVATE_ListenSequence._e);
        }
      )
      .next(() => {
        s !== __PRIVATE_ListenSequence._e &&
          t(new DocumentKey(__PRIVATE_decodeResourcePath(i)), s);
      });
  }
  getCacheSize(e) {
    return this.db.getRemoteDocumentCache().getSize(e);
  }
}
function __PRIVATE_writeSentinelKey(e, t) {
  return __PRIVATE_documentTargetStore(e).put(
    (function __PRIVATE_sentinelRow(e, t) {
      return {
        targetId: 0,
        path: __PRIVATE_encodeResourcePath(e.path),
        sequenceNumber: t,
      };
    })(t, e.currentSequenceNumber)
  );
}
class RemoteDocumentChangeBuffer {
  constructor() {
    (this.changes = new ObjectMap(
      (e) => e.toString(),
      (e, t) => e.isEqual(t)
    )),
      (this.changesApplied = !1);
  }
  addEntry(e) {
    this.assertNotApplied(), this.changes.set(e.key, e);
  }
  removeEntry(e, t) {
    this.assertNotApplied(),
      this.changes.set(e, MutableDocument.newInvalidDocument(e).setReadTime(t));
  }
  getEntry(e, t) {
    this.assertNotApplied();
    const n = this.changes.get(t);
    return void 0 !== n
      ? PersistencePromise.resolve(n)
      : this.getFromCache(e, t);
  }
  getEntries(e, t) {
    return this.getAllFromCache(e, t);
  }
  apply(e) {
    return (
      this.assertNotApplied(), (this.changesApplied = !0), this.applyChanges(e)
    );
  }
  assertNotApplied() {}
}
class __PRIVATE_IndexedDbRemoteDocumentCacheImpl {
  constructor(e) {
    this.serializer = e;
  }
  setIndexManager(e) {
    this.indexManager = e;
  }
  addEntry(e, t, n) {
    return __PRIVATE_remoteDocumentsStore(e).put(n);
  }
  removeEntry(e, t, n) {
    return __PRIVATE_remoteDocumentsStore(e).delete(
      (function __PRIVATE_dbReadTimeKey(e, t) {
        const n = e.path.toArray();
        return [
          n.slice(0, n.length - 2),
          n[n.length - 2],
          __PRIVATE_toDbTimestampKey(t),
          n[n.length - 1],
        ];
      })(t, n)
    );
  }
  updateMetadata(e, t) {
    return this.getMetadata(e).next((n) => ((n.byteSize += t), this.er(e, n)));
  }
  getEntry(e, t) {
    let n = MutableDocument.newInvalidDocument(t);
    return __PRIVATE_remoteDocumentsStore(e)
      .Y(
        {
          index: "documentKeyIndex",
          range: IDBKeyRange.only(__PRIVATE_dbKey(t)),
        },
        (e, i) => {
          n = this.tr(t, i);
        }
      )
      .next(() => n);
  }
  nr(e, t) {
    let n = { size: 0, document: MutableDocument.newInvalidDocument(t) };
    return __PRIVATE_remoteDocumentsStore(e)
      .Y(
        {
          index: "documentKeyIndex",
          range: IDBKeyRange.only(__PRIVATE_dbKey(t)),
        },
        (e, i) => {
          n = { document: this.tr(t, i), size: __PRIVATE_dbDocumentSize(i) };
        }
      )
      .next(() => n);
  }
  getEntries(e, t) {
    let n = __PRIVATE_mutableDocumentMap();
    return this.rr(e, t, (e, t) => {
      const i = this.tr(e, t);
      n = n.insert(e, i);
    }).next(() => n);
  }
  ir(e, t) {
    let n = __PRIVATE_mutableDocumentMap(),
      i = new SortedMap(DocumentKey.comparator);
    return this.rr(e, t, (e, t) => {
      const s = this.tr(e, t);
      (n = n.insert(e, s)), (i = i.insert(e, __PRIVATE_dbDocumentSize(t)));
    }).next(() => ({ documents: n, sr: i }));
  }
  rr(e, t, n) {
    if (t.isEmpty()) return PersistencePromise.resolve();
    let i = new SortedSet(__PRIVATE_dbKeyComparator);
    t.forEach((e) => (i = i.add(e)));
    const s = IDBKeyRange.bound(
        __PRIVATE_dbKey(i.first()),
        __PRIVATE_dbKey(i.last())
      ),
      o = i.getIterator();
    let u = o.getNext();
    return __PRIVATE_remoteDocumentsStore(e)
      .Y({ index: "documentKeyIndex", range: s }, (e, t, i) => {
        const s = DocumentKey.fromSegments([
          ...t.prefixPath,
          t.collectionGroup,
          t.documentId,
        ]);
        for (; u && __PRIVATE_dbKeyComparator(u, s) < 0; )
          n(u, null), (u = o.getNext());
        u && u.isEqual(s) && (n(u, t), (u = o.hasNext() ? o.getNext() : null)),
          u ? i.U(__PRIVATE_dbKey(u)) : i.done();
      })
      .next(() => {
        for (; u; ) n(u, null), (u = o.hasNext() ? o.getNext() : null);
      });
  }
  getDocumentsMatchingQuery(e, t, n, i, s) {
    const o = t.path,
      u = [
        o.popLast().toArray(),
        o.lastSegment(),
        __PRIVATE_toDbTimestampKey(n.readTime),
        n.documentKey.path.isEmpty() ? "" : n.documentKey.path.lastSegment(),
      ],
      l = [
        o.popLast().toArray(),
        o.lastSegment(),
        [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
        "",
      ];
    return __PRIVATE_remoteDocumentsStore(e)
      .W(IDBKeyRange.bound(u, l, !0))
      .next((e) => {
        null == s || s.incrementDocumentReadCount(e.length);
        let n = __PRIVATE_mutableDocumentMap();
        for (const s of e) {
          const e = this.tr(
            DocumentKey.fromSegments(
              s.prefixPath.concat(s.collectionGroup, s.documentId)
            ),
            s
          );
          e.isFoundDocument() &&
            (__PRIVATE_queryMatches(t, e) || i.has(e.key)) &&
            (n = n.insert(e.key, e));
        }
        return n;
      });
  }
  getAllFromCollectionGroup(e, t, n, i) {
    let s = __PRIVATE_mutableDocumentMap();
    const o = __PRIVATE_dbCollectionGroupKey(t, n),
      u = __PRIVATE_dbCollectionGroupKey(t, IndexOffset.max());
    return __PRIVATE_remoteDocumentsStore(e)
      .Y(
        { index: "collectionGroupIndex", range: IDBKeyRange.bound(o, u, !0) },
        (e, t, n) => {
          const o = this.tr(
            DocumentKey.fromSegments(
              t.prefixPath.concat(t.collectionGroup, t.documentId)
            ),
            t
          );
          (s = s.insert(o.key, o)), s.size === i && n.done();
        }
      )
      .next(() => s);
  }
  newChangeBuffer(e) {
    return new __PRIVATE_IndexedDbRemoteDocumentChangeBuffer(
      this,
      !!e && e.trackRemovals
    );
  }
  getSize(e) {
    return this.getMetadata(e).next((e) => e.byteSize);
  }
  getMetadata(e) {
    return __PRIVATE_documentGlobalStore(e)
      .get("remoteDocumentGlobalKey")
      .next((e) => (__PRIVATE_hardAssert(!!e), e));
  }
  er(e, t) {
    return __PRIVATE_documentGlobalStore(e).put("remoteDocumentGlobalKey", t);
  }
  tr(e, t) {
    if (t) {
      const e = (function __PRIVATE_fromDbRemoteDocument(e, t) {
        let n;
        if (t.document)
          n = __PRIVATE_fromDocument(
            e.ut,
            t.document,
            !!t.hasCommittedMutations
          );
        else if (t.noDocument) {
          const e = DocumentKey.fromSegments(t.noDocument.path),
            i = __PRIVATE_fromDbTimestamp(t.noDocument.readTime);
          (n = MutableDocument.newNoDocument(e, i)),
            t.hasCommittedMutations && n.setHasCommittedMutations();
        } else {
          if (!t.unknownDocument) return fail();
          {
            const e = DocumentKey.fromSegments(t.unknownDocument.path),
              i = __PRIVATE_fromDbTimestamp(t.unknownDocument.version);
            n = MutableDocument.newUnknownDocument(e, i);
          }
        }
        return (
          t.readTime &&
            n.setReadTime(
              (function __PRIVATE_fromDbTimestampKey(e) {
                const t = new Timestamp(e[0], e[1]);
                return SnapshotVersion.fromTimestamp(t);
              })(t.readTime)
            ),
          n
        );
      })(this.serializer, t);
      if (!e.isNoDocument() || !e.version.isEqual(SnapshotVersion.min()))
        return e;
    }
    return MutableDocument.newInvalidDocument(e);
  }
}
function __PRIVATE_newIndexedDbRemoteDocumentCache(e) {
  return new __PRIVATE_IndexedDbRemoteDocumentCacheImpl(e);
}
class __PRIVATE_IndexedDbRemoteDocumentChangeBuffer extends RemoteDocumentChangeBuffer {
  constructor(e, t) {
    super(),
      (this._r = e),
      (this.trackRemovals = t),
      (this.ar = new ObjectMap(
        (e) => e.toString(),
        (e, t) => e.isEqual(t)
      ));
  }
  applyChanges(e) {
    const t = [];
    let n = 0,
      i = new SortedSet((e, t) =>
        __PRIVATE_primitiveComparator(e.canonicalString(), t.canonicalString())
      );
    return (
      this.changes.forEach((s, o) => {
        const u = this.ar.get(s);
        if (
          (t.push(this._r.removeEntry(e, s, u.readTime)), o.isValidDocument())
        ) {
          const l = __PRIVATE_toDbRemoteDocument(this._r.serializer, o);
          i = i.add(s.path.popLast());
          const _ = __PRIVATE_dbDocumentSize(l);
          (n += _ - u.size), t.push(this._r.addEntry(e, s, l));
        } else if (((n -= u.size), this.trackRemovals)) {
          const n = __PRIVATE_toDbRemoteDocument(
            this._r.serializer,
            o.convertToNoDocument(SnapshotVersion.min())
          );
          t.push(this._r.addEntry(e, s, n));
        }
      }),
      i.forEach((n) => {
        t.push(this._r.indexManager.addToCollectionParentIndex(e, n));
      }),
      t.push(this._r.updateMetadata(e, n)),
      PersistencePromise.waitFor(t)
    );
  }
  getFromCache(e, t) {
    return this._r
      .nr(e, t)
      .next(
        (e) => (
          this.ar.set(t, { size: e.size, readTime: e.document.readTime }),
          e.document
        )
      );
  }
  getAllFromCache(e, t) {
    return this._r.ir(e, t).next(
      ({ documents: e, sr: t }) => (
        t.forEach((t, n) => {
          this.ar.set(t, { size: n, readTime: e.get(t).readTime });
        }),
        e
      )
    );
  }
}
function __PRIVATE_documentGlobalStore(e) {
  return __PRIVATE_getStore(e, "remoteDocumentGlobal");
}
function __PRIVATE_remoteDocumentsStore(e) {
  return __PRIVATE_getStore(e, "remoteDocumentsV14");
}
function __PRIVATE_dbKey(e) {
  const t = e.path.toArray();
  return [t.slice(0, t.length - 2), t[t.length - 2], t[t.length - 1]];
}
function __PRIVATE_dbCollectionGroupKey(e, t) {
  const n = t.documentKey.path.toArray();
  return [
    e,
    __PRIVATE_toDbTimestampKey(t.readTime),
    n.slice(0, n.length - 2),
    n.length > 0 ? n[n.length - 1] : "",
  ];
}
function __PRIVATE_dbKeyComparator(e, t) {
  const n = e.path.toArray(),
    i = t.path.toArray();
  let s = 0;
  for (let e = 0; e < n.length - 2 && e < i.length - 2; ++e)
    if (((s = __PRIVATE_primitiveComparator(n[e], i[e])), s)) return s;
  return (
    (s = __PRIVATE_primitiveComparator(n.length, i.length)),
    s ||
      ((s = __PRIVATE_primitiveComparator(n[n.length - 2], i[i.length - 2])),
      s || __PRIVATE_primitiveComparator(n[n.length - 1], i[i.length - 1]))
  );
}
class OverlayedDocument {
  constructor(e, t) {
    (this.overlayedDocument = e), (this.mutatedFields = t);
  }
}
class LocalDocumentsView {
  constructor(e, t, n, i) {
    (this.remoteDocumentCache = e),
      (this.mutationQueue = t),
      (this.documentOverlayCache = n),
      (this.indexManager = i);
  }
  getDocument(e, t) {
    let n = null;
    return this.documentOverlayCache
      .getOverlay(e, t)
      .next((i) => ((n = i), this.remoteDocumentCache.getEntry(e, t)))
      .next(
        (e) => (
          null !== n &&
            __PRIVATE_mutationApplyToLocalView(
              n.mutation,
              e,
              FieldMask.empty(),
              Timestamp.now()
            ),
          e
        )
      );
  }
  getDocuments(e, t) {
    return this.remoteDocumentCache
      .getEntries(e, t)
      .next((t) =>
        this.getLocalViewOfDocuments(e, t, __PRIVATE_documentKeySet()).next(
          () => t
        )
      );
  }
  getLocalViewOfDocuments(e, t, n = __PRIVATE_documentKeySet()) {
    const i = __PRIVATE_newOverlayMap();
    return this.populateOverlays(e, i, t).next(() =>
      this.computeViews(e, t, i, n).next((e) => {
        let t = documentMap();
        return (
          e.forEach((e, n) => {
            t = t.insert(e, n.overlayedDocument);
          }),
          t
        );
      })
    );
  }
  getOverlayedDocuments(e, t) {
    const n = __PRIVATE_newOverlayMap();
    return this.populateOverlays(e, n, t).next(() =>
      this.computeViews(e, t, n, __PRIVATE_documentKeySet())
    );
  }
  populateOverlays(e, t, n) {
    const i = [];
    return (
      n.forEach((e) => {
        t.has(e) || i.push(e);
      }),
      this.documentOverlayCache.getOverlays(e, i).next((e) => {
        e.forEach((e, n) => {
          t.set(e, n);
        });
      })
    );
  }
  computeViews(e, t, n, i) {
    let s = __PRIVATE_mutableDocumentMap();
    const o = __PRIVATE_newDocumentKeyMap(),
      u = (function __PRIVATE_newOverlayedDocumentMap() {
        return __PRIVATE_newDocumentKeyMap();
      })();
    return (
      t.forEach((e, t) => {
        const u = n.get(t.key);
        i.has(t.key) &&
        (void 0 === u || u.mutation instanceof __PRIVATE_PatchMutation)
          ? (s = s.insert(t.key, t))
          : void 0 !== u
          ? (o.set(t.key, u.mutation.getFieldMask()),
            __PRIVATE_mutationApplyToLocalView(
              u.mutation,
              t,
              u.mutation.getFieldMask(),
              Timestamp.now()
            ))
          : o.set(t.key, FieldMask.empty());
      }),
      this.recalculateAndSaveOverlays(e, s).next(
        (e) => (
          e.forEach((e, t) => o.set(e, t)),
          t.forEach((e, t) => {
            var n;
            return u.set(
              e,
              new OverlayedDocument(
                t,
                null !== (n = o.get(e)) && void 0 !== n ? n : null
              )
            );
          }),
          u
        )
      )
    );
  }
  recalculateAndSaveOverlays(e, t) {
    const n = __PRIVATE_newDocumentKeyMap();
    let i = new SortedMap((e, t) => e - t),
      s = __PRIVATE_documentKeySet();
    return this.mutationQueue
      .getAllMutationBatchesAffectingDocumentKeys(e, t)
      .next((e) => {
        for (const s of e)
          s.keys().forEach((e) => {
            const o = t.get(e);
            if (null === o) return;
            let u = n.get(e) || FieldMask.empty();
            (u = s.applyToLocalView(o, u)), n.set(e, u);
            const l = (i.get(s.batchId) || __PRIVATE_documentKeySet()).add(e);
            i = i.insert(s.batchId, l);
          });
      })
      .next(() => {
        const o = [],
          u = i.getReverseIterator();
        for (; u.hasNext(); ) {
          const i = u.getNext(),
            l = i.key,
            _ = i.value,
            h = __PRIVATE_newMutationMap();
          _.forEach((e) => {
            if (!s.has(e)) {
              const i = __PRIVATE_calculateOverlayMutation(t.get(e), n.get(e));
              null !== i && h.set(e, i), (s = s.add(e));
            }
          }),
            o.push(this.documentOverlayCache.saveOverlays(e, l, h));
        }
        return PersistencePromise.waitFor(o);
      })
      .next(() => n);
  }
  recalculateAndSaveOverlaysForDocumentKeys(e, t) {
    return this.remoteDocumentCache
      .getEntries(e, t)
      .next((t) => this.recalculateAndSaveOverlays(e, t));
  }
  getDocumentsMatchingQuery(e, t, n, i) {
    return (function __PRIVATE_isDocumentQuery$1(e) {
      return (
        DocumentKey.isDocumentKey(e.path) &&
        null === e.collectionGroup &&
        0 === e.filters.length
      );
    })(t)
      ? this.getDocumentsMatchingDocumentQuery(e, t.path)
      : __PRIVATE_isCollectionGroupQuery(t)
      ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, i)
      : this.getDocumentsMatchingCollectionQuery(e, t, n, i);
  }
  getNextDocuments(e, t, n, i) {
    return this.remoteDocumentCache
      .getAllFromCollectionGroup(e, t, n, i)
      .next((s) => {
        const o =
          i - s.size > 0
            ? this.documentOverlayCache.getOverlaysForCollectionGroup(
                e,
                t,
                n.largestBatchId,
                i - s.size
              )
            : PersistencePromise.resolve(__PRIVATE_newOverlayMap());
        let u = -1,
          l = s;
        return o.next((t) =>
          PersistencePromise.forEach(
            t,
            (t, n) => (
              u < n.largestBatchId && (u = n.largestBatchId),
              s.get(t)
                ? PersistencePromise.resolve()
                : this.remoteDocumentCache.getEntry(e, t).next((e) => {
                    l = l.insert(t, e);
                  })
            )
          )
            .next(() => this.populateOverlays(e, t, s))
            .next(() => this.computeViews(e, l, t, __PRIVATE_documentKeySet()))
            .next((e) => ({
              batchId: u,
              changes: __PRIVATE_convertOverlayedDocumentMapToDocumentMap(e),
            }))
        );
      });
  }
  getDocumentsMatchingDocumentQuery(e, t) {
    return this.getDocument(e, new DocumentKey(t)).next((e) => {
      let t = documentMap();
      return e.isFoundDocument() && (t = t.insert(e.key, e)), t;
    });
  }
  getDocumentsMatchingCollectionGroupQuery(e, t, n, i) {
    const s = t.collectionGroup;
    let o = documentMap();
    return this.indexManager.getCollectionParents(e, s).next((u) =>
      PersistencePromise.forEach(u, (u) => {
        const l = (function __PRIVATE_asCollectionQueryAtPath(e, t) {
          return new __PRIVATE_QueryImpl(
            t,
            null,
            e.explicitOrderBy.slice(),
            e.filters.slice(),
            e.limit,
            e.limitType,
            e.startAt,
            e.endAt
          );
        })(t, u.child(s));
        return this.getDocumentsMatchingCollectionQuery(e, l, n, i).next(
          (e) => {
            e.forEach((e, t) => {
              o = o.insert(e, t);
            });
          }
        );
      }).next(() => o)
    );
  }
  getDocumentsMatchingCollectionQuery(e, t, n, i) {
    let s;
    return this.documentOverlayCache
      .getOverlaysForCollection(e, t.path, n.largestBatchId)
      .next(
        (o) => (
          (s = o),
          this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, s, i)
        )
      )
      .next((e) => {
        s.forEach((t, n) => {
          const i = n.getKey();
          null === e.get(i) &&
            (e = e.insert(i, MutableDocument.newInvalidDocument(i)));
        });
        let n = documentMap();
        return (
          e.forEach((e, i) => {
            const o = s.get(e);
            void 0 !== o &&
              __PRIVATE_mutationApplyToLocalView(
                o.mutation,
                i,
                FieldMask.empty(),
                Timestamp.now()
              ),
              __PRIVATE_queryMatches(t, i) && (n = n.insert(e, i));
          }),
          n
        );
      });
  }
}
class __PRIVATE_MemoryBundleCache {
  constructor(e) {
    (this.serializer = e), (this.ur = new Map()), (this.cr = new Map());
  }
  getBundleMetadata(e, t) {
    return PersistencePromise.resolve(this.ur.get(t));
  }
  saveBundleMetadata(e, t) {
    return (
      this.ur.set(
        t.id,
        (function __PRIVATE_fromBundleMetadata(e) {
          return {
            id: e.id,
            version: e.version,
            createTime: __PRIVATE_fromVersion(e.createTime),
          };
        })(t)
      ),
      PersistencePromise.resolve()
    );
  }
  getNamedQuery(e, t) {
    return PersistencePromise.resolve(this.cr.get(t));
  }
  saveNamedQuery(e, t) {
    return (
      this.cr.set(
        t.name,
        (function __PRIVATE_fromProtoNamedQuery(e) {
          return {
            name: e.name,
            query: __PRIVATE_fromBundledQuery(e.bundledQuery),
            readTime: __PRIVATE_fromVersion(e.readTime),
          };
        })(t)
      ),
      PersistencePromise.resolve()
    );
  }
}
class __PRIVATE_MemoryDocumentOverlayCache {
  constructor() {
    (this.overlays = new SortedMap(DocumentKey.comparator)),
      (this.lr = new Map());
  }
  getOverlay(e, t) {
    return PersistencePromise.resolve(this.overlays.get(t));
  }
  getOverlays(e, t) {
    const n = __PRIVATE_newOverlayMap();
    return PersistencePromise.forEach(t, (t) =>
      this.getOverlay(e, t).next((e) => {
        null !== e && n.set(t, e);
      })
    ).next(() => n);
  }
  saveOverlays(e, t, n) {
    return (
      n.forEach((n, i) => {
        this.lt(e, t, i);
      }),
      PersistencePromise.resolve()
    );
  }
  removeOverlaysForBatchId(e, t, n) {
    const i = this.lr.get(n);
    return (
      void 0 !== i &&
        (i.forEach((e) => (this.overlays = this.overlays.remove(e))),
        this.lr.delete(n)),
      PersistencePromise.resolve()
    );
  }
  getOverlaysForCollection(e, t, n) {
    const i = __PRIVATE_newOverlayMap(),
      s = t.length + 1,
      o = new DocumentKey(t.child("")),
      u = this.overlays.getIteratorFrom(o);
    for (; u.hasNext(); ) {
      const e = u.getNext().value,
        o = e.getKey();
      if (!t.isPrefixOf(o.path)) break;
      o.path.length === s && e.largestBatchId > n && i.set(e.getKey(), e);
    }
    return PersistencePromise.resolve(i);
  }
  getOverlaysForCollectionGroup(e, t, n, i) {
    let s = new SortedMap((e, t) => e - t);
    const o = this.overlays.getIterator();
    for (; o.hasNext(); ) {
      const e = o.getNext().value;
      if (e.getKey().getCollectionGroup() === t && e.largestBatchId > n) {
        let t = s.get(e.largestBatchId);
        null === t &&
          ((t = __PRIVATE_newOverlayMap()),
          (s = s.insert(e.largestBatchId, t))),
          t.set(e.getKey(), e);
      }
    }
    const u = __PRIVATE_newOverlayMap(),
      l = s.getIterator();
    for (
      ;
      l.hasNext() &&
      (l.getNext().value.forEach((e, t) => u.set(e, t)), !(u.size() >= i));

    );
    return PersistencePromise.resolve(u);
  }
  lt(e, t, n) {
    const i = this.overlays.get(n.key);
    if (null !== i) {
      const e = this.lr.get(i.largestBatchId).delete(n.key);
      this.lr.set(i.largestBatchId, e);
    }
    this.overlays = this.overlays.insert(n.key, new Overlay(t, n));
    let s = this.lr.get(t);
    void 0 === s && ((s = __PRIVATE_documentKeySet()), this.lr.set(t, s)),
      this.lr.set(t, s.add(n.key));
  }
}
class __PRIVATE_ReferenceSet {
  constructor() {
    (this.hr = new SortedSet(__PRIVATE_DocReference.Pr)),
      (this.Ir = new SortedSet(__PRIVATE_DocReference.Tr));
  }
  isEmpty() {
    return this.hr.isEmpty();
  }
  addReference(e, t) {
    const n = new __PRIVATE_DocReference(e, t);
    (this.hr = this.hr.add(n)), (this.Ir = this.Ir.add(n));
  }
  Er(e, t) {
    e.forEach((e) => this.addReference(e, t));
  }
  removeReference(e, t) {
    this.dr(new __PRIVATE_DocReference(e, t));
  }
  Ar(e, t) {
    e.forEach((e) => this.removeReference(e, t));
  }
  Rr(e) {
    const t = new DocumentKey(new ResourcePath([])),
      n = new __PRIVATE_DocReference(t, e),
      i = new __PRIVATE_DocReference(t, e + 1),
      s = [];
    return (
      this.Ir.forEachInRange([n, i], (e) => {
        this.dr(e), s.push(e.key);
      }),
      s
    );
  }
  Vr() {
    this.hr.forEach((e) => this.dr(e));
  }
  dr(e) {
    (this.hr = this.hr.delete(e)), (this.Ir = this.Ir.delete(e));
  }
  mr(e) {
    const t = new DocumentKey(new ResourcePath([])),
      n = new __PRIVATE_DocReference(t, e),
      i = new __PRIVATE_DocReference(t, e + 1);
    let s = __PRIVATE_documentKeySet();
    return (
      this.Ir.forEachInRange([n, i], (e) => {
        s = s.add(e.key);
      }),
      s
    );
  }
  containsKey(e) {
    const t = new __PRIVATE_DocReference(e, 0),
      n = this.hr.firstAfterOrEqual(t);
    return null !== n && e.isEqual(n.key);
  }
}
class __PRIVATE_DocReference {
  constructor(e, t) {
    (this.key = e), (this.gr = t);
  }
  static Pr(e, t) {
    return (
      DocumentKey.comparator(e.key, t.key) ||
      __PRIVATE_primitiveComparator(e.gr, t.gr)
    );
  }
  static Tr(e, t) {
    return (
      __PRIVATE_primitiveComparator(e.gr, t.gr) ||
      DocumentKey.comparator(e.key, t.key)
    );
  }
}
class __PRIVATE_MemoryMutationQueue {
  constructor(e, t) {
    (this.indexManager = e),
      (this.referenceDelegate = t),
      (this.mutationQueue = []),
      (this.pr = 1),
      (this.yr = new SortedSet(__PRIVATE_DocReference.Pr));
  }
  checkEmpty(e) {
    return PersistencePromise.resolve(0 === this.mutationQueue.length);
  }
  addMutationBatch(e, t, n, i) {
    const s = this.pr;
    this.pr++,
      this.mutationQueue.length > 0 &&
        this.mutationQueue[this.mutationQueue.length - 1];
    const o = new MutationBatch(s, t, n, i);
    this.mutationQueue.push(o);
    for (const t of i)
      (this.yr = this.yr.add(new __PRIVATE_DocReference(t.key, s))),
        this.indexManager.addToCollectionParentIndex(e, t.key.path.popLast());
    return PersistencePromise.resolve(o);
  }
  lookupMutationBatch(e, t) {
    return PersistencePromise.resolve(this.wr(t));
  }
  getNextMutationBatchAfterBatchId(e, t) {
    const n = t + 1,
      i = this.Sr(n),
      s = i < 0 ? 0 : i;
    return PersistencePromise.resolve(
      this.mutationQueue.length > s ? this.mutationQueue[s] : null
    );
  }
  getHighestUnacknowledgedBatchId() {
    return PersistencePromise.resolve(
      0 === this.mutationQueue.length ? -1 : this.pr - 1
    );
  }
  getAllMutationBatches(e) {
    return PersistencePromise.resolve(this.mutationQueue.slice());
  }
  getAllMutationBatchesAffectingDocumentKey(e, t) {
    const n = new __PRIVATE_DocReference(t, 0),
      i = new __PRIVATE_DocReference(t, Number.POSITIVE_INFINITY),
      s = [];
    return (
      this.yr.forEachInRange([n, i], (e) => {
        const t = this.wr(e.gr);
        s.push(t);
      }),
      PersistencePromise.resolve(s)
    );
  }
  getAllMutationBatchesAffectingDocumentKeys(e, t) {
    let n = new SortedSet(__PRIVATE_primitiveComparator);
    return (
      t.forEach((e) => {
        const t = new __PRIVATE_DocReference(e, 0),
          i = new __PRIVATE_DocReference(e, Number.POSITIVE_INFINITY);
        this.yr.forEachInRange([t, i], (e) => {
          n = n.add(e.gr);
        });
      }),
      PersistencePromise.resolve(this.br(n))
    );
  }
  getAllMutationBatchesAffectingQuery(e, t) {
    const n = t.path,
      i = n.length + 1;
    let s = n;
    DocumentKey.isDocumentKey(s) || (s = s.child(""));
    const o = new __PRIVATE_DocReference(new DocumentKey(s), 0);
    let u = new SortedSet(__PRIVATE_primitiveComparator);
    return (
      this.yr.forEachWhile((e) => {
        const t = e.key.path;
        return !!n.isPrefixOf(t) && (t.length === i && (u = u.add(e.gr)), !0);
      }, o),
      PersistencePromise.resolve(this.br(u))
    );
  }
  br(e) {
    const t = [];
    return (
      e.forEach((e) => {
        const n = this.wr(e);
        null !== n && t.push(n);
      }),
      t
    );
  }
  removeMutationBatch(e, t) {
    __PRIVATE_hardAssert(0 === this.Dr(t.batchId, "removed")),
      this.mutationQueue.shift();
    let n = this.yr;
    return PersistencePromise.forEach(t.mutations, (i) => {
      const s = new __PRIVATE_DocReference(i.key, t.batchId);
      return (
        (n = n.delete(s)),
        this.referenceDelegate.markPotentiallyOrphaned(e, i.key)
      );
    }).next(() => {
      this.yr = n;
    });
  }
  Fn(e) {}
  containsKey(e, t) {
    const n = new __PRIVATE_DocReference(t, 0),
      i = this.yr.firstAfterOrEqual(n);
    return PersistencePromise.resolve(t.isEqual(i && i.key));
  }
  performConsistencyCheck(e) {
    return this.mutationQueue.length, PersistencePromise.resolve();
  }
  Dr(e, t) {
    return this.Sr(e);
  }
  Sr(e) {
    return 0 === this.mutationQueue.length
      ? 0
      : e - this.mutationQueue[0].batchId;
  }
  wr(e) {
    const t = this.Sr(e);
    return t < 0 || t >= this.mutationQueue.length
      ? null
      : this.mutationQueue[t];
  }
}
class __PRIVATE_MemoryRemoteDocumentCacheImpl {
  constructor(e) {
    (this.Cr = e),
      (this.docs = (function __PRIVATE_documentEntryMap() {
        return new SortedMap(DocumentKey.comparator);
      })()),
      (this.size = 0);
  }
  setIndexManager(e) {
    this.indexManager = e;
  }
  addEntry(e, t) {
    const n = t.key,
      i = this.docs.get(n),
      s = i ? i.size : 0,
      o = this.Cr(t);
    return (
      (this.docs = this.docs.insert(n, { document: t.mutableCopy(), size: o })),
      (this.size += o - s),
      this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
    );
  }
  removeEntry(e) {
    const t = this.docs.get(e);
    t && ((this.docs = this.docs.remove(e)), (this.size -= t.size));
  }
  getEntry(e, t) {
    const n = this.docs.get(t);
    return PersistencePromise.resolve(
      n ? n.document.mutableCopy() : MutableDocument.newInvalidDocument(t)
    );
  }
  getEntries(e, t) {
    let n = __PRIVATE_mutableDocumentMap();
    return (
      t.forEach((e) => {
        const t = this.docs.get(e);
        n = n.insert(
          e,
          t ? t.document.mutableCopy() : MutableDocument.newInvalidDocument(e)
        );
      }),
      PersistencePromise.resolve(n)
    );
  }
  getDocumentsMatchingQuery(e, t, n, i) {
    let s = __PRIVATE_mutableDocumentMap();
    const o = t.path,
      u = new DocumentKey(o.child("")),
      l = this.docs.getIteratorFrom(u);
    for (; l.hasNext(); ) {
      const {
        key: e,
        value: { document: u },
      } = l.getNext();
      if (!o.isPrefixOf(e.path)) break;
      e.path.length > o.length + 1 ||
        __PRIVATE_indexOffsetComparator(
          __PRIVATE_newIndexOffsetFromDocument(u),
          n
        ) <= 0 ||
        ((i.has(u.key) || __PRIVATE_queryMatches(t, u)) &&
          (s = s.insert(u.key, u.mutableCopy())));
    }
    return PersistencePromise.resolve(s);
  }
  getAllFromCollectionGroup(e, t, n, i) {
    fail();
  }
  vr(e, t) {
    return PersistencePromise.forEach(this.docs, (e) => t(e));
  }
  newChangeBuffer(e) {
    return new __PRIVATE_MemoryRemoteDocumentChangeBuffer(this);
  }
  getSize(e) {
    return PersistencePromise.resolve(this.size);
  }
}
class __PRIVATE_MemoryRemoteDocumentChangeBuffer extends RemoteDocumentChangeBuffer {
  constructor(e) {
    super(), (this._r = e);
  }
  applyChanges(e) {
    const t = [];
    return (
      this.changes.forEach((n, i) => {
        i.isValidDocument()
          ? t.push(this._r.addEntry(e, i))
          : this._r.removeEntry(n);
      }),
      PersistencePromise.waitFor(t)
    );
  }
  getFromCache(e, t) {
    return this._r.getEntry(e, t);
  }
  getAllFromCache(e, t) {
    return this._r.getEntries(e, t);
  }
}
class __PRIVATE_MemoryTargetCache {
  constructor(e) {
    (this.persistence = e),
      (this.Fr = new ObjectMap(
        (e) => __PRIVATE_canonifyTarget(e),
        __PRIVATE_targetEquals
      )),
      (this.lastRemoteSnapshotVersion = SnapshotVersion.min()),
      (this.highestTargetId = 0),
      (this.Mr = 0),
      (this.Or = new __PRIVATE_ReferenceSet()),
      (this.targetCount = 0),
      (this.Nr = __PRIVATE_TargetIdGenerator.On());
  }
  forEachTarget(e, t) {
    return this.Fr.forEach((e, n) => t(n)), PersistencePromise.resolve();
  }
  getLastRemoteSnapshotVersion(e) {
    return PersistencePromise.resolve(this.lastRemoteSnapshotVersion);
  }
  getHighestSequenceNumber(e) {
    return PersistencePromise.resolve(this.Mr);
  }
  allocateTargetId(e) {
    return (
      (this.highestTargetId = this.Nr.next()),
      PersistencePromise.resolve(this.highestTargetId)
    );
  }
  setTargetsMetadata(e, t, n) {
    return (
      n && (this.lastRemoteSnapshotVersion = n),
      t > this.Mr && (this.Mr = t),
      PersistencePromise.resolve()
    );
  }
  kn(e) {
    this.Fr.set(e.target, e);
    const t = e.targetId;
    t > this.highestTargetId &&
      ((this.Nr = new __PRIVATE_TargetIdGenerator(t)),
      (this.highestTargetId = t)),
      e.sequenceNumber > this.Mr && (this.Mr = e.sequenceNumber);
  }
  addTargetData(e, t) {
    return this.kn(t), (this.targetCount += 1), PersistencePromise.resolve();
  }
  updateTargetData(e, t) {
    return this.kn(t), PersistencePromise.resolve();
  }
  removeTargetData(e, t) {
    return (
      this.Fr.delete(t.target),
      this.Or.Rr(t.targetId),
      (this.targetCount -= 1),
      PersistencePromise.resolve()
    );
  }
  removeTargets(e, t, n) {
    let i = 0;
    const s = [];
    return (
      this.Fr.forEach((o, u) => {
        u.sequenceNumber <= t &&
          null === n.get(u.targetId) &&
          (this.Fr.delete(o),
          s.push(this.removeMatchingKeysForTargetId(e, u.targetId)),
          i++);
      }),
      PersistencePromise.waitFor(s).next(() => i)
    );
  }
  getTargetCount(e) {
    return PersistencePromise.resolve(this.targetCount);
  }
  getTargetData(e, t) {
    const n = this.Fr.get(t) || null;
    return PersistencePromise.resolve(n);
  }
  addMatchingKeys(e, t, n) {
    return this.Or.Er(t, n), PersistencePromise.resolve();
  }
  removeMatchingKeys(e, t, n) {
    this.Or.Ar(t, n);
    const i = this.persistence.referenceDelegate,
      s = [];
    return (
      i &&
        t.forEach((t) => {
          s.push(i.markPotentiallyOrphaned(e, t));
        }),
      PersistencePromise.waitFor(s)
    );
  }
  removeMatchingKeysForTargetId(e, t) {
    return this.Or.Rr(t), PersistencePromise.resolve();
  }
  getMatchingKeysForTargetId(e, t) {
    const n = this.Or.mr(t);
    return PersistencePromise.resolve(n);
  }
  containsKey(e, t) {
    return PersistencePromise.resolve(this.Or.containsKey(t));
  }
}
class __PRIVATE_MemoryPersistence {
  constructor(e, t) {
    (this.Br = {}),
      (this.overlays = {}),
      (this.Lr = new __PRIVATE_ListenSequence(0)),
      (this.kr = !1),
      (this.kr = !0),
      (this.referenceDelegate = e(this)),
      (this.qr = new __PRIVATE_MemoryTargetCache(this)),
      (this.indexManager = new __PRIVATE_MemoryIndexManager()),
      (this.remoteDocumentCache =
        (function __PRIVATE_newMemoryRemoteDocumentCache(e) {
          return new __PRIVATE_MemoryRemoteDocumentCacheImpl(e);
        })((e) => this.referenceDelegate.Qr(e))),
      (this.serializer = new __PRIVATE_LocalSerializer(t)),
      (this.Kr = new __PRIVATE_MemoryBundleCache(this.serializer));
  }
  start() {
    return Promise.resolve();
  }
  shutdown() {
    return (this.kr = !1), Promise.resolve();
  }
  get started() {
    return this.kr;
  }
  setDatabaseDeletedListener() {}
  setNetworkEnabled() {}
  getIndexManager(e) {
    return this.indexManager;
  }
  getDocumentOverlayCache(e) {
    let t = this.overlays[e.toKey()];
    return (
      t ||
        ((t = new __PRIVATE_MemoryDocumentOverlayCache()),
        (this.overlays[e.toKey()] = t)),
      t
    );
  }
  getMutationQueue(e, t) {
    let n = this.Br[e.toKey()];
    return (
      n ||
        ((n = new __PRIVATE_MemoryMutationQueue(t, this.referenceDelegate)),
        (this.Br[e.toKey()] = n)),
      n
    );
  }
  getTargetCache() {
    return this.qr;
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache;
  }
  getBundleCache() {
    return this.Kr;
  }
  runTransaction(e, t, n) {
    __PRIVATE_logDebug("MemoryPersistence", "Starting transaction:", e);
    const i = new __PRIVATE_MemoryTransaction(this.Lr.next());
    return (
      this.referenceDelegate.$r(),
      n(i)
        .next((e) => this.referenceDelegate.Ur(i).next(() => e))
        .toPromise()
        .then((e) => (i.raiseOnCommittedEvent(), e))
    );
  }
  Wr(e, t) {
    return PersistencePromise.or(
      Object.values(this.Br).map((n) => () => n.containsKey(e, t))
    );
  }
}
class __PRIVATE_MemoryTransaction extends PersistenceTransaction {
  constructor(e) {
    super(), (this.currentSequenceNumber = e);
  }
}
class __PRIVATE_MemoryEagerDelegate {
  constructor(e) {
    (this.persistence = e),
      (this.Gr = new __PRIVATE_ReferenceSet()),
      (this.zr = null);
  }
  static jr(e) {
    return new __PRIVATE_MemoryEagerDelegate(e);
  }
  get Hr() {
    if (this.zr) return this.zr;
    throw fail();
  }
  addReference(e, t, n) {
    return (
      this.Gr.addReference(n, t),
      this.Hr.delete(n.toString()),
      PersistencePromise.resolve()
    );
  }
  removeReference(e, t, n) {
    return (
      this.Gr.removeReference(n, t),
      this.Hr.add(n.toString()),
      PersistencePromise.resolve()
    );
  }
  markPotentiallyOrphaned(e, t) {
    return this.Hr.add(t.toString()), PersistencePromise.resolve();
  }
  removeTarget(e, t) {
    this.Gr.Rr(t.targetId).forEach((e) => this.Hr.add(e.toString()));
    const n = this.persistence.getTargetCache();
    return n
      .getMatchingKeysForTargetId(e, t.targetId)
      .next((e) => {
        e.forEach((e) => this.Hr.add(e.toString()));
      })
      .next(() => n.removeTargetData(e, t));
  }
  $r() {
    this.zr = new Set();
  }
  Ur(e) {
    const t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
    return PersistencePromise.forEach(this.Hr, (n) => {
      const i = DocumentKey.fromPath(n);
      return this.Jr(e, i).next((e) => {
        e || t.removeEntry(i, SnapshotVersion.min());
      });
    }).next(() => ((this.zr = null), t.apply(e)));
  }
  updateLimboDocument(e, t) {
    return this.Jr(e, t).next((e) => {
      e ? this.Hr.delete(t.toString()) : this.Hr.add(t.toString());
    });
  }
  Qr(e) {
    return 0;
  }
  Jr(e, t) {
    return PersistencePromise.or([
      () => PersistencePromise.resolve(this.Gr.containsKey(t)),
      () => this.persistence.getTargetCache().containsKey(e, t),
      () => this.persistence.Wr(e, t),
    ]);
  }
}
class __PRIVATE_MemoryLruDelegate {
  constructor(e, t) {
    (this.persistence = e),
      (this.Yr = new ObjectMap(
        (e) => __PRIVATE_encodeResourcePath(e.path),
        (e, t) => e.isEqual(t)
      )),
      (this.garbageCollector = __PRIVATE_newLruGarbageCollector(this, t));
  }
  static jr(e, t) {
    return new __PRIVATE_MemoryLruDelegate(e, t);
  }
  $r() {}
  Ur(e) {
    return PersistencePromise.resolve();
  }
  forEachTarget(e, t) {
    return this.persistence.getTargetCache().forEachTarget(e, t);
  }
  jn(e) {
    const t = this.Yn(e);
    return this.persistence
      .getTargetCache()
      .getTargetCount(e)
      .next((e) => t.next((t) => e + t));
  }
  Yn(e) {
    let t = 0;
    return this.Hn(e, (e) => {
      t++;
    }).next(() => t);
  }
  Hn(e, t) {
    return PersistencePromise.forEach(this.Yr, (n, i) =>
      this.Xn(e, n, i).next((e) => (e ? PersistencePromise.resolve() : t(i)))
    );
  }
  removeTargets(e, t, n) {
    return this.persistence.getTargetCache().removeTargets(e, t, n);
  }
  removeOrphanedDocuments(e, t) {
    let n = 0;
    const i = this.persistence.getRemoteDocumentCache(),
      s = i.newChangeBuffer();
    return i
      .vr(e, (i) =>
        this.Xn(e, i, t).next((e) => {
          e || (n++, s.removeEntry(i, SnapshotVersion.min()));
        })
      )
      .next(() => s.apply(e))
      .next(() => n);
  }
  markPotentiallyOrphaned(e, t) {
    return (
      this.Yr.set(t, e.currentSequenceNumber), PersistencePromise.resolve()
    );
  }
  removeTarget(e, t) {
    const n = t.withSequenceNumber(e.currentSequenceNumber);
    return this.persistence.getTargetCache().updateTargetData(e, n);
  }
  addReference(e, t, n) {
    return (
      this.Yr.set(n, e.currentSequenceNumber), PersistencePromise.resolve()
    );
  }
  removeReference(e, t, n) {
    return (
      this.Yr.set(n, e.currentSequenceNumber), PersistencePromise.resolve()
    );
  }
  updateLimboDocument(e, t) {
    return (
      this.Yr.set(t, e.currentSequenceNumber), PersistencePromise.resolve()
    );
  }
  Qr(e) {
    let t = e.key.toString().length;
    return (
      e.isFoundDocument() && (t += __PRIVATE_estimateByteSize(e.data.value)), t
    );
  }
  Xn(e, t, n) {
    return PersistencePromise.or([
      () => this.persistence.Wr(e, t),
      () => this.persistence.getTargetCache().containsKey(e, t),
      () => {
        const e = this.Yr.get(t);
        return PersistencePromise.resolve(void 0 !== e && e > n);
      },
    ]);
  }
  getCacheSize(e) {
    return this.persistence.getRemoteDocumentCache().getSize(e);
  }
}
class __PRIVATE_SchemaConverter {
  constructor(e) {
    this.serializer = e;
  }
  N(e, t, n, i) {
    const s = new __PRIVATE_SimpleDbTransaction("createOrUpgrade", t);
    n < 1 &&
      i >= 1 &&
      ((function __PRIVATE_createPrimaryClientStore(e) {
        e.createObjectStore("owner");
      })(e),
      (function __PRIVATE_createMutationQueue(e) {
        e.createObjectStore("mutationQueues", { keyPath: "userId" }),
          e
            .createObjectStore("mutations", {
              keyPath: "batchId",
              autoIncrement: !0,
            })
            .createIndex("userMutationsIndex", Ge, { unique: !0 }),
          e.createObjectStore("documentMutations");
      })(e),
      __PRIVATE_createQueryCache(e),
      (function __PRIVATE_createLegacyRemoteDocumentCache(e) {
        e.createObjectStore("remoteDocuments");
      })(e));
    let o = PersistencePromise.resolve();
    return (
      n < 3 &&
        i >= 3 &&
        (0 !== n &&
          ((function __PRIVATE_dropQueryCache(e) {
            e.deleteObjectStore("targetDocuments"),
              e.deleteObjectStore("targets"),
              e.deleteObjectStore("targetGlobal");
          })(e),
          __PRIVATE_createQueryCache(e)),
        (o = o.next(() =>
          (function __PRIVATE_writeEmptyTargetGlobalEntry(e) {
            const t = e.store("targetGlobal"),
              n = {
                highestTargetId: 0,
                highestListenSequenceNumber: 0,
                lastRemoteSnapshotVersion: SnapshotVersion.min().toTimestamp(),
                targetCount: 0,
              };
            return t.put("targetGlobalKey", n);
          })(s)
        ))),
      n < 4 &&
        i >= 4 &&
        (0 !== n &&
          (o = o.next(() =>
            (function __PRIVATE_upgradeMutationBatchSchemaAndMigrateData(e, t) {
              return t
                .store("mutations")
                .W()
                .next((n) => {
                  e.deleteObjectStore("mutations"),
                    e
                      .createObjectStore("mutations", {
                        keyPath: "batchId",
                        autoIncrement: !0,
                      })
                      .createIndex("userMutationsIndex", Ge, { unique: !0 });
                  const i = t.store("mutations"),
                    s = n.map((e) => i.put(e));
                  return PersistencePromise.waitFor(s);
                });
            })(e, s)
          )),
        (o = o.next(() => {
          !(function __PRIVATE_createClientMetadataStore(e) {
            e.createObjectStore("clientMetadata", { keyPath: "clientId" });
          })(e);
        }))),
      n < 5 && i >= 5 && (o = o.next(() => this.Zr(s))),
      n < 6 &&
        i >= 6 &&
        (o = o.next(
          () => (
            (function __PRIVATE_createDocumentGlobalStore(e) {
              e.createObjectStore("remoteDocumentGlobal");
            })(e),
            this.Xr(s)
          )
        )),
      n < 7 && i >= 7 && (o = o.next(() => this.ei(s))),
      n < 8 && i >= 8 && (o = o.next(() => this.ti(e, s))),
      n < 9 &&
        i >= 9 &&
        (o = o.next(() => {
          !(function __PRIVATE_dropRemoteDocumentChangesStore(e) {
            e.objectStoreNames.contains("remoteDocumentChanges") &&
              e.deleteObjectStore("remoteDocumentChanges");
          })(e);
        })),
      n < 10 && i >= 10 && (o = o.next(() => this.ni(s))),
      n < 11 &&
        i >= 11 &&
        (o = o.next(() => {
          !(function __PRIVATE_createBundlesStore(e) {
            e.createObjectStore("bundles", { keyPath: "bundleId" });
          })(e),
            (function __PRIVATE_createNamedQueriesStore(e) {
              e.createObjectStore("namedQueries", { keyPath: "name" });
            })(e);
        })),
      n < 12 &&
        i >= 12 &&
        (o = o.next(() => {
          !(function __PRIVATE_createDocumentOverlayStore(e) {
            const t = e.createObjectStore("documentOverlays", { keyPath: it });
            t.createIndex("collectionPathOverlayIndex", st, { unique: !1 }),
              t.createIndex("collectionGroupOverlayIndex", ot, { unique: !1 });
          })(e);
        })),
      n < 13 &&
        i >= 13 &&
        (o = o
          .next(() =>
            (function __PRIVATE_createRemoteDocumentCache(e) {
              const t = e.createObjectStore("remoteDocumentsV14", {
                keyPath: We,
              });
              t.createIndex("documentKeyIndex", je),
                t.createIndex("collectionGroupIndex", He);
            })(e)
          )
          .next(() => this.ri(e, s))
          .next(() => e.deleteObjectStore("remoteDocuments"))),
      n < 14 && i >= 14 && (o = o.next(() => this.ii(e, s))),
      n < 15 &&
        i >= 15 &&
        (o = o.next(() =>
          (function __PRIVATE_createFieldIndex(e) {
            e
              .createObjectStore("indexConfiguration", {
                keyPath: "indexId",
                autoIncrement: !0,
              })
              .createIndex("collectionGroupIndex", "collectionGroup", {
                unique: !1,
              }),
              e
                .createObjectStore("indexState", { keyPath: et })
                .createIndex("sequenceNumberIndex", tt, { unique: !1 }),
              e
                .createObjectStore("indexEntries", { keyPath: nt })
                .createIndex("documentKeyIndex", rt, { unique: !1 });
          })(e)
        )),
      o
    );
  }
  Xr(e) {
    let t = 0;
    return e
      .store("remoteDocuments")
      .Y((e, n) => {
        t += __PRIVATE_dbDocumentSize(n);
      })
      .next(() => {
        const n = { byteSize: t };
        return e
          .store("remoteDocumentGlobal")
          .put("remoteDocumentGlobalKey", n);
      });
  }
  Zr(e) {
    const t = e.store("mutationQueues"),
      n = e.store("mutations");
    return t.W().next((t) =>
      PersistencePromise.forEach(t, (t) => {
        const i = IDBKeyRange.bound(
          [t.userId, -1],
          [t.userId, t.lastAcknowledgedBatchId]
        );
        return n.W("userMutationsIndex", i).next((n) =>
          PersistencePromise.forEach(n, (n) => {
            __PRIVATE_hardAssert(n.userId === t.userId);
            const i = __PRIVATE_fromDbMutationBatch(this.serializer, n);
            return removeMutationBatch(e, t.userId, i).next(() => {});
          })
        );
      })
    );
  }
  ei(e) {
    const t = e.store("targetDocuments"),
      n = e.store("remoteDocuments");
    return e
      .store("targetGlobal")
      .get("targetGlobalKey")
      .next((e) => {
        const i = [];
        return n
          .Y((n, s) => {
            const o = new ResourcePath(n),
              u = (function __PRIVATE_sentinelKey(e) {
                return [0, __PRIVATE_encodeResourcePath(e)];
              })(o);
            i.push(
              t
                .get(u)
                .next((n) =>
                  n
                    ? PersistencePromise.resolve()
                    : ((n) =>
                        t.put({
                          targetId: 0,
                          path: __PRIVATE_encodeResourcePath(n),
                          sequenceNumber: e.highestListenSequenceNumber,
                        }))(o)
                )
            );
          })
          .next(() => PersistencePromise.waitFor(i));
      });
  }
  ti(e, t) {
    e.createObjectStore("collectionParents", { keyPath: Ze });
    const n = t.store("collectionParents"),
      i = new __PRIVATE_MemoryCollectionParentIndex(),
      addEntry = (e) => {
        if (i.add(e)) {
          const t = e.lastSegment(),
            i = e.popLast();
          return n.put({
            collectionId: t,
            parent: __PRIVATE_encodeResourcePath(i),
          });
        }
      };
    return t
      .store("remoteDocuments")
      .Y({ J: !0 }, (e, t) => {
        const n = new ResourcePath(e);
        return addEntry(n.popLast());
      })
      .next(() =>
        t.store("documentMutations").Y({ J: !0 }, ([e, t, n], i) => {
          const s = __PRIVATE_decodeResourcePath(t);
          return addEntry(s.popLast());
        })
      );
  }
  ni(e) {
    const t = e.store("targets");
    return t.Y((e, n) => {
      const i = __PRIVATE_fromDbTarget(n),
        s = __PRIVATE_toDbTarget(this.serializer, i);
      return t.put(s);
    });
  }
  ri(e, t) {
    const n = t.store("remoteDocuments"),
      i = [];
    return n
      .Y((e, n) => {
        const s = t.store("remoteDocumentsV14"),
          o = (function __PRIVATE_extractKey(e) {
            return e.document
              ? new DocumentKey(
                  ResourcePath.fromString(e.document.name).popFirst(5)
                )
              : e.noDocument
              ? DocumentKey.fromSegments(e.noDocument.path)
              : e.unknownDocument
              ? DocumentKey.fromSegments(e.unknownDocument.path)
              : fail();
          })(n).path.toArray(),
          u = {
            prefixPath: o.slice(0, o.length - 2),
            collectionGroup: o[o.length - 2],
            documentId: o[o.length - 1],
            readTime: n.readTime || [0, 0],
            unknownDocument: n.unknownDocument,
            noDocument: n.noDocument,
            document: n.document,
            hasCommittedMutations: !!n.hasCommittedMutations,
          };
        i.push(s.put(u));
      })
      .next(() => PersistencePromise.waitFor(i));
  }
  ii(e, t) {
    const n = t.store("mutations"),
      i = __PRIVATE_newIndexedDbRemoteDocumentCache(this.serializer),
      s = new __PRIVATE_MemoryPersistence(
        __PRIVATE_MemoryEagerDelegate.jr,
        this.serializer.ut
      );
    return n.W().next((e) => {
      const n = new Map();
      return (
        e.forEach((e) => {
          var t;
          let i =
            null !== (t = n.get(e.userId)) && void 0 !== t
              ? t
              : __PRIVATE_documentKeySet();
          __PRIVATE_fromDbMutationBatch(this.serializer, e)
            .keys()
            .forEach((e) => (i = i.add(e))),
            n.set(e.userId, i);
        }),
        PersistencePromise.forEach(n, (e, n) => {
          const o = new User(n),
            u = __PRIVATE_IndexedDbDocumentOverlayCache.ct(this.serializer, o),
            l = s.getIndexManager(o),
            _ = __PRIVATE_IndexedDbMutationQueue.ct(
              o,
              this.serializer,
              l,
              s.referenceDelegate
            );
          return new LocalDocumentsView(i, _, u, l)
            .recalculateAndSaveOverlaysForDocumentKeys(
              new __PRIVATE_IndexedDbTransaction(
                t,
                __PRIVATE_ListenSequence._e
              ),
              e
            )
            .next();
        })
      );
    });
  }
}
function __PRIVATE_createQueryCache(e) {
  e
    .createObjectStore("targetDocuments", { keyPath: Je })
    .createIndex("documentTargetsIndex", Xe, { unique: !0 }),
    e
      .createObjectStore("targets", { keyPath: "targetId" })
      .createIndex("queryTargetsIndex", Ye, { unique: !0 }),
    e.createObjectStore("targetGlobal");
}
const wt =
  "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";
class __PRIVATE_IndexedDbPersistence {
  constructor(e, t, n, i, s, o, u, l, _, h, d = 15) {
    if (
      ((this.allowTabSynchronization = e),
      (this.persistenceKey = t),
      (this.clientId = n),
      (this.si = s),
      (this.window = o),
      (this.document = u),
      (this.oi = _),
      (this._i = h),
      (this.ai = d),
      (this.Lr = null),
      (this.kr = !1),
      (this.isPrimary = !1),
      (this.networkEnabled = !0),
      (this.ui = null),
      (this.inForeground = !1),
      (this.ci = null),
      (this.li = null),
      (this.hi = Number.NEGATIVE_INFINITY),
      (this.Pi = (e) => Promise.resolve()),
      !__PRIVATE_IndexedDbPersistence.D())
    )
      throw new FirestoreError(
        $e.UNIMPLEMENTED,
        "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled."
      );
    (this.referenceDelegate = new __PRIVATE_IndexedDbLruDelegateImpl(this, i)),
      (this.Ii = t + "main"),
      (this.serializer = new __PRIVATE_LocalSerializer(l)),
      (this.Ti = new __PRIVATE_SimpleDb(
        this.Ii,
        this.ai,
        new __PRIVATE_SchemaConverter(this.serializer)
      )),
      (this.qr = new __PRIVATE_IndexedDbTargetCache(
        this.referenceDelegate,
        this.serializer
      )),
      (this.remoteDocumentCache = __PRIVATE_newIndexedDbRemoteDocumentCache(
        this.serializer
      )),
      (this.Kr = new __PRIVATE_IndexedDbBundleCache()),
      this.window && this.window.localStorage
        ? (this.Ei = this.window.localStorage)
        : ((this.Ei = null),
          !1 === h &&
            __PRIVATE_logError(
              "IndexedDbPersistence",
              "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."
            ));
  }
  start() {
    return this.di()
      .then(() => {
        if (!this.isPrimary && !this.allowTabSynchronization)
          throw new FirestoreError($e.FAILED_PRECONDITION, wt);
        return (
          this.Ai(),
          this.Ri(),
          this.Vi(),
          this.runTransaction(
            "getHighestListenSequenceNumber",
            "readonly",
            (e) => this.qr.getHighestSequenceNumber(e)
          )
        );
      })
      .then((e) => {
        this.Lr = new __PRIVATE_ListenSequence(e, this.oi);
      })
      .then(() => {
        this.kr = !0;
      })
      .catch((e) => (this.Ti && this.Ti.close(), Promise.reject(e)));
  }
  mi(e) {
    return (
      (this.Pi = async (t) => {
        if (this.started) return e(t);
      }),
      e(this.isPrimary)
    );
  }
  setDatabaseDeletedListener(e) {
    this.Ti.L(async (t) => {
      null === t.newVersion && (await e());
    });
  }
  setNetworkEnabled(e) {
    this.networkEnabled !== e &&
      ((this.networkEnabled = e),
      this.si.enqueueAndForget(async () => {
        this.started && (await this.di());
      }));
  }
  di() {
    return this.runTransaction(
      "updateClientMetadataAndTryBecomePrimary",
      "readwrite",
      (e) =>
        __PRIVATE_clientMetadataStore(e)
          .put({
            clientId: this.clientId,
            updateTimeMs: Date.now(),
            networkEnabled: this.networkEnabled,
            inForeground: this.inForeground,
          })
          .next(() => {
            if (this.isPrimary)
              return this.fi(e).next((e) => {
                e ||
                  ((this.isPrimary = !1),
                  this.si.enqueueRetryable(() => this.Pi(!1)));
              });
          })
          .next(() => this.gi(e))
          .next((t) =>
            this.isPrimary && !t
              ? this.pi(e).next(() => !1)
              : !!t && this.yi(e).next(() => !0)
          )
    )
      .catch((e) => {
        if (__PRIVATE_isIndexedDbTransactionError(e))
          return (
            __PRIVATE_logDebug(
              "IndexedDbPersistence",
              "Failed to extend owner lease: ",
              e
            ),
            this.isPrimary
          );
        if (!this.allowTabSynchronization) throw e;
        return (
          __PRIVATE_logDebug(
            "IndexedDbPersistence",
            "Releasing owner lease after error during lease refresh",
            e
          ),
          !1
        );
      })
      .then((e) => {
        this.isPrimary !== e && this.si.enqueueRetryable(() => this.Pi(e)),
          (this.isPrimary = e);
      });
  }
  fi(e) {
    return __PRIVATE_primaryClientStore(e)
      .get("owner")
      .next((e) => PersistencePromise.resolve(this.wi(e)));
  }
  Si(e) {
    return __PRIVATE_clientMetadataStore(e).delete(this.clientId);
  }
  async bi() {
    if (this.isPrimary && !this.Di(this.hi, 18e5)) {
      this.hi = Date.now();
      const e = await this.runTransaction(
        "maybeGarbageCollectMultiClientState",
        "readwrite-primary",
        (e) => {
          const t = __PRIVATE_getStore(e, "clientMetadata");
          return t.W().next((e) => {
            const n = this.Ci(e, 18e5),
              i = e.filter((e) => -1 === n.indexOf(e));
            return PersistencePromise.forEach(i, (e) =>
              t.delete(e.clientId)
            ).next(() => i);
          });
        }
      ).catch(() => []);
      if (this.Ei) for (const t of e) this.Ei.removeItem(this.vi(t.clientId));
    }
  }
  Vi() {
    this.li = this.si.enqueueAfterDelay("client_metadata_refresh", 4e3, () =>
      this.di()
        .then(() => this.bi())
        .then(() => this.Vi())
    );
  }
  wi(e) {
    return !!e && e.ownerId === this.clientId;
  }
  gi(e) {
    return this._i
      ? PersistencePromise.resolve(!0)
      : __PRIVATE_primaryClientStore(e)
          .get("owner")
          .next((t) => {
            if (
              null !== t &&
              this.Di(t.leaseTimestampMs, 5e3) &&
              !this.Fi(t.ownerId)
            ) {
              if (this.wi(t) && this.networkEnabled) return !0;
              if (!this.wi(t)) {
                if (!t.allowTabSynchronization)
                  throw new FirestoreError($e.FAILED_PRECONDITION, wt);
                return !1;
              }
            }
            return (
              !(!this.networkEnabled || !this.inForeground) ||
              __PRIVATE_clientMetadataStore(e)
                .W()
                .next(
                  (e) =>
                    void 0 ===
                    this.Ci(e, 5e3).find((e) => {
                      if (this.clientId !== e.clientId) {
                        const t = !this.networkEnabled && e.networkEnabled,
                          n = !this.inForeground && e.inForeground,
                          i = this.networkEnabled === e.networkEnabled;
                        if (t || (n && i)) return !0;
                      }
                      return !1;
                    })
                )
            );
          })
          .next(
            (e) => (
              this.isPrimary !== e &&
                __PRIVATE_logDebug(
                  "IndexedDbPersistence",
                  `Client ${e ? "is" : "is not"} eligible for a primary lease.`
                ),
              e
            )
          );
  }
  async shutdown() {
    (this.kr = !1),
      this.Mi(),
      this.li && (this.li.cancel(), (this.li = null)),
      this.xi(),
      this.Oi(),
      await this.Ti.runTransaction(
        "shutdown",
        "readwrite",
        ["owner", "clientMetadata"],
        (e) => {
          const t = new __PRIVATE_IndexedDbTransaction(
            e,
            __PRIVATE_ListenSequence._e
          );
          return this.pi(t).next(() => this.Si(t));
        }
      ),
      this.Ti.close(),
      this.Ni();
  }
  Ci(e, t) {
    return e.filter((e) => this.Di(e.updateTimeMs, t) && !this.Fi(e.clientId));
  }
  Bi() {
    return this.runTransaction("getActiveClients", "readonly", (e) =>
      __PRIVATE_clientMetadataStore(e)
        .W()
        .next((e) => this.Ci(e, 18e5).map((e) => e.clientId))
    );
  }
  get started() {
    return this.kr;
  }
  getMutationQueue(e, t) {
    return __PRIVATE_IndexedDbMutationQueue.ct(
      e,
      this.serializer,
      t,
      this.referenceDelegate
    );
  }
  getTargetCache() {
    return this.qr;
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache;
  }
  getIndexManager(e) {
    return new __PRIVATE_IndexedDbIndexManager(
      e,
      this.serializer.ut.databaseId
    );
  }
  getDocumentOverlayCache(e) {
    return __PRIVATE_IndexedDbDocumentOverlayCache.ct(this.serializer, e);
  }
  getBundleCache() {
    return this.Kr;
  }
  runTransaction(e, t, n) {
    __PRIVATE_logDebug("IndexedDbPersistence", "Starting transaction:", e);
    const i = "readonly" === t ? "readonly" : "readwrite",
      s = (function __PRIVATE_getObjectStores(e) {
        return 15 === e
          ? _t
          : 14 === e
          ? lt
          : 13 === e
          ? ut
          : 12 === e
          ? ct
          : 11 === e
          ? at
          : void fail();
      })(this.ai);
    let o;
    return this.Ti.runTransaction(
      e,
      i,
      s,
      (i) => (
        (o = new __PRIVATE_IndexedDbTransaction(
          i,
          this.Lr ? this.Lr.next() : __PRIVATE_ListenSequence._e
        )),
        "readwrite-primary" === t
          ? this.fi(o)
              .next((e) => !!e || this.gi(o))
              .next((t) => {
                if (!t)
                  throw (
                    (__PRIVATE_logError(
                      `Failed to obtain primary lease for action '${e}'.`
                    ),
                    (this.isPrimary = !1),
                    this.si.enqueueRetryable(() => this.Pi(!1)),
                    new FirestoreError($e.FAILED_PRECONDITION, Ke))
                  );
                return n(o);
              })
              .next((e) => this.yi(o).next(() => e))
          : this.Li(o).next(() => n(o))
      )
    ).then((e) => (o.raiseOnCommittedEvent(), e));
  }
  Li(e) {
    return __PRIVATE_primaryClientStore(e)
      .get("owner")
      .next((e) => {
        if (
          null !== e &&
          this.Di(e.leaseTimestampMs, 5e3) &&
          !this.Fi(e.ownerId) &&
          !this.wi(e) &&
          !(
            this._i ||
            (this.allowTabSynchronization && e.allowTabSynchronization)
          )
        )
          throw new FirestoreError($e.FAILED_PRECONDITION, wt);
      });
  }
  yi(e) {
    const t = {
      ownerId: this.clientId,
      allowTabSynchronization: this.allowTabSynchronization,
      leaseTimestampMs: Date.now(),
    };
    return __PRIVATE_primaryClientStore(e).put("owner", t);
  }
  static D() {
    return __PRIVATE_SimpleDb.D();
  }
  pi(e) {
    const t = __PRIVATE_primaryClientStore(e);
    return t
      .get("owner")
      .next((e) =>
        this.wi(e)
          ? (__PRIVATE_logDebug(
              "IndexedDbPersistence",
              "Releasing primary lease."
            ),
            t.delete("owner"))
          : PersistencePromise.resolve()
      );
  }
  Di(e, t) {
    const n = Date.now();
    return !(
      e < n - t ||
      (e > n &&
        (__PRIVATE_logError(
          `Detected an update time that is in the future: ${e} > ${n}`
        ),
        1))
    );
  }
  Ai() {
    null !== this.document &&
      "function" == typeof this.document.addEventListener &&
      ((this.ci = () => {
        this.si.enqueueAndForget(
          () => (
            (this.inForeground = "visible" === this.document.visibilityState),
            this.di()
          )
        );
      }),
      this.document.addEventListener("visibilitychange", this.ci),
      (this.inForeground = "visible" === this.document.visibilityState));
  }
  xi() {
    this.ci &&
      (this.document.removeEventListener("visibilitychange", this.ci),
      (this.ci = null));
  }
  Ri() {
    var e;
    "function" ==
      typeof (null === (e = this.window) || void 0 === e
        ? void 0
        : e.addEventListener) &&
      ((this.ui = () => {
        this.Mi();
        const e = /(?:Version|Mobile)\/1[456]/;
        isSafari() &&
          (navigator.appVersion.match(e) || navigator.userAgent.match(e)) &&
          this.si.enterRestrictedMode(!0),
          this.si.enqueueAndForget(() => this.shutdown());
      }),
      this.window.addEventListener("pagehide", this.ui));
  }
  Oi() {
    this.ui &&
      (this.window.removeEventListener("pagehide", this.ui), (this.ui = null));
  }
  Fi(e) {
    var t;
    try {
      const n =
        null !==
        (null === (t = this.Ei) || void 0 === t
          ? void 0
          : t.getItem(this.vi(e)));
      return (
        __PRIVATE_logDebug(
          "IndexedDbPersistence",
          `Client '${e}' ${n ? "is" : "is not"} zombied in LocalStorage`
        ),
        n
      );
    } catch (e) {
      return (
        __PRIVATE_logError(
          "IndexedDbPersistence",
          "Failed to get zombied client id.",
          e
        ),
        !1
      );
    }
  }
  Mi() {
    if (this.Ei)
      try {
        this.Ei.setItem(this.vi(this.clientId), String(Date.now()));
      } catch (e) {
        __PRIVATE_logError("Failed to set zombie client id.", e);
      }
  }
  Ni() {
    if (this.Ei)
      try {
        this.Ei.removeItem(this.vi(this.clientId));
      } catch (e) {}
  }
  vi(e) {
    return `firestore_zombie_${this.persistenceKey}_${e}`;
  }
}
function __PRIVATE_primaryClientStore(e) {
  return __PRIVATE_getStore(e, "owner");
}
function __PRIVATE_clientMetadataStore(e) {
  return __PRIVATE_getStore(e, "clientMetadata");
}
function __PRIVATE_indexedDbStoragePrefix(e, t) {
  let n = e.projectId;
  return (
    e.isDefaultDatabase || (n += "." + e.database),
    "firestore/" + t + "/" + n + "/"
  );
}
class __PRIVATE_LocalViewChanges {
  constructor(e, t, n, i) {
    (this.targetId = e), (this.fromCache = t), (this.ki = n), (this.qi = i);
  }
  static Qi(e, t) {
    let n = __PRIVATE_documentKeySet(),
      i = __PRIVATE_documentKeySet();
    for (const e of t.docChanges)
      switch (e.type) {
        case 0:
          n = n.add(e.doc.key);
          break;
        case 1:
          i = i.add(e.doc.key);
      }
    return new __PRIVATE_LocalViewChanges(e, t.fromCache, n, i);
  }
}
class QueryContext {
  constructor() {
    this._documentReadCount = 0;
  }
  get documentReadCount() {
    return this._documentReadCount;
  }
  incrementDocumentReadCount(e) {
    this._documentReadCount += e;
  }
}
class __PRIVATE_QueryEngine {
  constructor() {
    (this.Ki = !1), (this.$i = !1), (this.Ui = 100), (this.Wi = 8);
  }
  initialize(e, t) {
    (this.Gi = e), (this.indexManager = t), (this.Ki = !0);
  }
  getDocumentsMatchingQuery(e, t, n, i) {
    const s = { result: null };
    return this.zi(e, t)
      .next((e) => {
        s.result = e;
      })
      .next(() => {
        if (!s.result)
          return this.ji(e, t, i, n).next((e) => {
            s.result = e;
          });
      })
      .next(() => {
        if (s.result) return;
        const n = new QueryContext();
        return this.Hi(e, t, n).next((i) => {
          if (((s.result = i), this.$i)) return this.Ji(e, t, n, i.size);
        });
      })
      .next(() => s.result);
  }
  Ji(e, t, n, i) {
    return n.documentReadCount < this.Ui
      ? (__PRIVATE_getLogLevel() <= l.DEBUG &&
          __PRIVATE_logDebug(
            "QueryEngine",
            "SDK will not create cache indexes for query:",
            __PRIVATE_stringifyQuery(t),
            "since it only creates cache indexes for collection contains",
            "more than or equal to",
            this.Ui,
            "documents"
          ),
        PersistencePromise.resolve())
      : (__PRIVATE_getLogLevel() <= l.DEBUG &&
          __PRIVATE_logDebug(
            "QueryEngine",
            "Query:",
            __PRIVATE_stringifyQuery(t),
            "scans",
            n.documentReadCount,
            "local documents and returns",
            i,
            "documents as results."
          ),
        n.documentReadCount > this.Wi * i
          ? (__PRIVATE_getLogLevel() <= l.DEBUG &&
              __PRIVATE_logDebug(
                "QueryEngine",
                "The SDK decides to create cache indexes for query:",
                __PRIVATE_stringifyQuery(t),
                "as using cache indexes may help improve performance."
              ),
            this.indexManager.createTargetIndexes(
              e,
              __PRIVATE_queryToTarget(t)
            ))
          : PersistencePromise.resolve());
  }
  zi(e, t) {
    if (__PRIVATE_queryMatchesAllDocuments(t))
      return PersistencePromise.resolve(null);
    let n = __PRIVATE_queryToTarget(t);
    return this.indexManager.getIndexType(e, n).next((i) =>
      0 === i
        ? null
        : (null !== t.limit &&
            1 === i &&
            ((t = __PRIVATE_queryWithLimit(t, null, "F")),
            (n = __PRIVATE_queryToTarget(t))),
          this.indexManager.getDocumentsMatchingTarget(e, n).next((i) => {
            const s = __PRIVATE_documentKeySet(...i);
            return this.Gi.getDocuments(e, s).next((i) =>
              this.indexManager.getMinOffset(e, n).next((n) => {
                const o = this.Yi(t, i);
                return this.Zi(t, o, s, n.readTime)
                  ? this.zi(e, __PRIVATE_queryWithLimit(t, null, "F"))
                  : this.Xi(e, o, t, n);
              })
            );
          }))
    );
  }
  ji(e, t, n, i) {
    return __PRIVATE_queryMatchesAllDocuments(t) ||
      i.isEqual(SnapshotVersion.min())
      ? PersistencePromise.resolve(null)
      : this.Gi.getDocuments(e, n).next((s) => {
          const o = this.Yi(t, s);
          return this.Zi(t, o, n, i)
            ? PersistencePromise.resolve(null)
            : (__PRIVATE_getLogLevel() <= l.DEBUG &&
                __PRIVATE_logDebug(
                  "QueryEngine",
                  "Re-using previous result from %s to execute query: %s",
                  i.toString(),
                  __PRIVATE_stringifyQuery(t)
                ),
              this.Xi(
                e,
                o,
                t,
                __PRIVATE_newIndexOffsetSuccessorFromReadTime(i, -1)
              ).next((e) => e));
        });
  }
  Yi(e, t) {
    let n = new SortedSet(__PRIVATE_newQueryComparator(e));
    return (
      t.forEach((t, i) => {
        __PRIVATE_queryMatches(e, i) && (n = n.add(i));
      }),
      n
    );
  }
  Zi(e, t, n, i) {
    if (null === e.limit) return !1;
    if (n.size !== t.size) return !0;
    const s = "F" === e.limitType ? t.last() : t.first();
    return !!s && (s.hasPendingWrites || s.version.compareTo(i) > 0);
  }
  Hi(e, t, n) {
    return (
      __PRIVATE_getLogLevel() <= l.DEBUG &&
        __PRIVATE_logDebug(
          "QueryEngine",
          "Using full collection scan to execute query:",
          __PRIVATE_stringifyQuery(t)
        ),
      this.Gi.getDocumentsMatchingQuery(e, t, IndexOffset.min(), n)
    );
  }
  Xi(e, t, n, i) {
    return this.Gi.getDocumentsMatchingQuery(e, n, i).next(
      (e) => (
        t.forEach((t) => {
          e = e.insert(t.key, t);
        }),
        e
      )
    );
  }
}
class __PRIVATE_LocalStoreImpl {
  constructor(e, t, n, i) {
    (this.persistence = e),
      (this.es = t),
      (this.serializer = i),
      (this.ts = new SortedMap(__PRIVATE_primitiveComparator)),
      (this.ns = new ObjectMap(
        (e) => __PRIVATE_canonifyTarget(e),
        __PRIVATE_targetEquals
      )),
      (this.rs = new Map()),
      (this.ss = e.getRemoteDocumentCache()),
      (this.qr = e.getTargetCache()),
      (this.Kr = e.getBundleCache()),
      this.os(n);
  }
  os(e) {
    (this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e)),
      (this.indexManager = this.persistence.getIndexManager(e)),
      (this.mutationQueue = this.persistence.getMutationQueue(
        e,
        this.indexManager
      )),
      (this.localDocuments = new LocalDocumentsView(
        this.ss,
        this.mutationQueue,
        this.documentOverlayCache,
        this.indexManager
      )),
      this.ss.setIndexManager(this.indexManager),
      this.es.initialize(this.localDocuments, this.indexManager);
  }
  collectGarbage(e) {
    return this.persistence.runTransaction(
      "Collect garbage",
      "readwrite-primary",
      (t) => e.collect(t, this.ts)
    );
  }
}
function __PRIVATE_newLocalStore(e, t, n, i) {
  return new __PRIVATE_LocalStoreImpl(e, t, n, i);
}
async function __PRIVATE_localStoreHandleUserChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  return await n.persistence.runTransaction(
    "Handle user change",
    "readonly",
    (e) => {
      let i;
      return n.mutationQueue
        .getAllMutationBatches(e)
        .next(
          (s) => ((i = s), n.os(t), n.mutationQueue.getAllMutationBatches(e))
        )
        .next((t) => {
          const s = [],
            o = [];
          let u = __PRIVATE_documentKeySet();
          for (const e of i) {
            s.push(e.batchId);
            for (const t of e.mutations) u = u.add(t.key);
          }
          for (const e of t) {
            o.push(e.batchId);
            for (const t of e.mutations) u = u.add(t.key);
          }
          return n.localDocuments
            .getDocuments(e, u)
            .next((e) => ({ _s: e, removedBatchIds: s, addedBatchIds: o }));
        });
    }
  );
}
function __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e) {
  const t = __PRIVATE_debugCast(e);
  return t.persistence.runTransaction(
    "Get last remote snapshot version",
    "readonly",
    (e) => t.qr.getLastRemoteSnapshotVersion(e)
  );
}
function __PRIVATE_populateDocumentChangeBuffer(e, t, n) {
  let i = __PRIVATE_documentKeySet(),
    s = __PRIVATE_documentKeySet();
  return (
    n.forEach((e) => (i = i.add(e))),
    t.getEntries(e, i).next((e) => {
      let i = __PRIVATE_mutableDocumentMap();
      return (
        n.forEach((n, o) => {
          const u = e.get(n);
          o.isFoundDocument() !== u.isFoundDocument() && (s = s.add(n)),
            o.isNoDocument() && o.version.isEqual(SnapshotVersion.min())
              ? (t.removeEntry(n, o.readTime), (i = i.insert(n, o)))
              : !u.isValidDocument() ||
                o.version.compareTo(u.version) > 0 ||
                (0 === o.version.compareTo(u.version) && u.hasPendingWrites)
              ? (t.addEntry(o), (i = i.insert(n, o)))
              : __PRIVATE_logDebug(
                  "LocalStore",
                  "Ignoring outdated watch update for ",
                  n,
                  ". Current version:",
                  u.version,
                  " Watch version:",
                  o.version
                );
        }),
        { us: i, cs: s }
      );
    })
  );
}
function __PRIVATE_localStoreGetNextMutationBatch(e, t) {
  const n = __PRIVATE_debugCast(e);
  return n.persistence.runTransaction(
    "Get next mutation batch",
    "readonly",
    (e) => (
      void 0 === t && (t = -1),
      n.mutationQueue.getNextMutationBatchAfterBatchId(e, t)
    )
  );
}
function __PRIVATE_localStoreAllocateTarget(e, t) {
  const n = __PRIVATE_debugCast(e);
  return n.persistence
    .runTransaction("Allocate target", "readwrite", (e) => {
      let i;
      return n.qr
        .getTargetData(e, t)
        .next((s) =>
          s
            ? ((i = s), PersistencePromise.resolve(i))
            : n.qr
                .allocateTargetId(e)
                .next(
                  (s) => (
                    (i = new TargetData(
                      t,
                      s,
                      "TargetPurposeListen",
                      e.currentSequenceNumber
                    )),
                    n.qr.addTargetData(e, i).next(() => i)
                  )
                )
        );
    })
    .then((e) => {
      const i = n.ts.get(e.targetId);
      return (
        (null === i || e.snapshotVersion.compareTo(i.snapshotVersion) > 0) &&
          ((n.ts = n.ts.insert(e.targetId, e)), n.ns.set(t, e.targetId)),
        e
      );
    });
}
async function __PRIVATE_localStoreReleaseTarget(e, t, n) {
  const i = __PRIVATE_debugCast(e),
    s = i.ts.get(t),
    o = n ? "readwrite" : "readwrite-primary";
  try {
    n ||
      (await i.persistence.runTransaction("Release target", o, (e) =>
        i.persistence.referenceDelegate.removeTarget(e, s)
      ));
  } catch (e) {
    if (!__PRIVATE_isIndexedDbTransactionError(e)) throw e;
    __PRIVATE_logDebug(
      "LocalStore",
      `Failed to update sequence numbers for target ${t}: ${e}`
    );
  }
  (i.ts = i.ts.remove(t)), i.ns.delete(s.target);
}
function __PRIVATE_localStoreExecuteQuery(e, t, n) {
  const i = __PRIVATE_debugCast(e);
  let s = SnapshotVersion.min(),
    o = __PRIVATE_documentKeySet();
  return i.persistence.runTransaction("Execute query", "readwrite", (e) =>
    (function __PRIVATE_localStoreGetTargetData(e, t, n) {
      const i = __PRIVATE_debugCast(e),
        s = i.ns.get(n);
      return void 0 !== s
        ? PersistencePromise.resolve(i.ts.get(s))
        : i.qr.getTargetData(t, n);
    })(i, e, __PRIVATE_queryToTarget(t))
      .next((t) => {
        if (t)
          return (
            (s = t.lastLimboFreeSnapshotVersion),
            i.qr.getMatchingKeysForTargetId(e, t.targetId).next((e) => {
              o = e;
            })
          );
      })
      .next(() =>
        i.es.getDocumentsMatchingQuery(
          e,
          t,
          n ? s : SnapshotVersion.min(),
          n ? o : __PRIVATE_documentKeySet()
        )
      )
      .next(
        (e) => (
          __PRIVATE_setMaxReadTime(i, __PRIVATE_queryCollectionGroup(t), e),
          { documents: e, ls: o }
        )
      )
  );
}
function __PRIVATE_localStoreGetCachedTarget(e, t) {
  const n = __PRIVATE_debugCast(e),
    i = __PRIVATE_debugCast(n.qr),
    s = n.ts.get(t);
  return s
    ? Promise.resolve(s.target)
    : n.persistence.runTransaction("Get target data", "readonly", (e) =>
        i._t(e, t).next((e) => (e ? e.target : null))
      );
}
function __PRIVATE_localStoreGetNewDocumentChanges(e, t) {
  const n = __PRIVATE_debugCast(e),
    i = n.rs.get(t) || SnapshotVersion.min();
  return n.persistence
    .runTransaction("Get new document changes", "readonly", (e) =>
      n.ss.getAllFromCollectionGroup(
        e,
        t,
        __PRIVATE_newIndexOffsetSuccessorFromReadTime(i, -1),
        Number.MAX_SAFE_INTEGER
      )
    )
    .then((e) => (__PRIVATE_setMaxReadTime(n, t, e), e));
}
function __PRIVATE_setMaxReadTime(e, t, n) {
  let i = e.rs.get(t) || SnapshotVersion.min();
  n.forEach((e, t) => {
    t.readTime.compareTo(i) > 0 && (i = t.readTime);
  }),
    e.rs.set(t, i);
}
async function __PRIVATE_localStoreSaveNamedQuery(
  e,
  t,
  n = __PRIVATE_documentKeySet()
) {
  const i = await __PRIVATE_localStoreAllocateTarget(
      e,
      __PRIVATE_queryToTarget(__PRIVATE_fromBundledQuery(t.bundledQuery))
    ),
    s = __PRIVATE_debugCast(e);
  return s.persistence.runTransaction("Save named query", "readwrite", (e) => {
    const o = __PRIVATE_fromVersion(t.readTime);
    if (i.snapshotVersion.compareTo(o) >= 0) return s.Kr.saveNamedQuery(e, t);
    const u = i.withResumeToken(ByteString.EMPTY_BYTE_STRING, o);
    return (
      (s.ts = s.ts.insert(u.targetId, u)),
      s.qr
        .updateTargetData(e, u)
        .next(() => s.qr.removeMatchingKeysForTargetId(e, i.targetId))
        .next(() => s.qr.addMatchingKeys(e, n, i.targetId))
        .next(() => s.Kr.saveNamedQuery(e, t))
    );
  });
}
function createWebStorageClientStateKey(e, t) {
  return `firestore_clients_${e}_${t}`;
}
function createWebStorageMutationBatchKey(e, t, n) {
  let i = `firestore_mutations_${e}_${n}`;
  return t.isAuthenticated() && (i += `_${t.uid}`), i;
}
function createWebStorageQueryTargetMetadataKey(e, t) {
  return `firestore_targets_${e}_${t}`;
}
class __PRIVATE_MutationMetadata {
  constructor(e, t, n, i) {
    (this.user = e), (this.batchId = t), (this.state = n), (this.error = i);
  }
  static Ts(e, t, n) {
    const i = JSON.parse(n);
    let s,
      o =
        "object" == typeof i &&
        -1 !== ["pending", "acknowledged", "rejected"].indexOf(i.state) &&
        (void 0 === i.error || "object" == typeof i.error);
    return (
      o &&
        i.error &&
        ((o =
          "string" == typeof i.error.message &&
          "string" == typeof i.error.code),
        o && (s = new FirestoreError(i.error.code, i.error.message))),
      o
        ? new __PRIVATE_MutationMetadata(e, t, i.state, s)
        : (__PRIVATE_logError(
            "SharedClientState",
            `Failed to parse mutation state for ID '${t}': ${n}`
          ),
          null)
    );
  }
  Es() {
    const e = { state: this.state, updateTimeMs: Date.now() };
    return (
      this.error &&
        (e.error = { code: this.error.code, message: this.error.message }),
      JSON.stringify(e)
    );
  }
}
class __PRIVATE_QueryTargetMetadata {
  constructor(e, t, n) {
    (this.targetId = e), (this.state = t), (this.error = n);
  }
  static Ts(e, t) {
    const n = JSON.parse(t);
    let i,
      s =
        "object" == typeof n &&
        -1 !== ["not-current", "current", "rejected"].indexOf(n.state) &&
        (void 0 === n.error || "object" == typeof n.error);
    return (
      s &&
        n.error &&
        ((s =
          "string" == typeof n.error.message &&
          "string" == typeof n.error.code),
        s && (i = new FirestoreError(n.error.code, n.error.message))),
      s
        ? new __PRIVATE_QueryTargetMetadata(e, n.state, i)
        : (__PRIVATE_logError(
            "SharedClientState",
            `Failed to parse target state for ID '${e}': ${t}`
          ),
          null)
    );
  }
  Es() {
    const e = { state: this.state, updateTimeMs: Date.now() };
    return (
      this.error &&
        (e.error = { code: this.error.code, message: this.error.message }),
      JSON.stringify(e)
    );
  }
}
class __PRIVATE_RemoteClientState {
  constructor(e, t) {
    (this.clientId = e), (this.activeTargetIds = t);
  }
  static Ts(e, t) {
    const n = JSON.parse(t);
    let i = "object" == typeof n && n.activeTargetIds instanceof Array,
      s = __PRIVATE_targetIdSet();
    for (let e = 0; i && e < n.activeTargetIds.length; ++e)
      (i = isSafeInteger(n.activeTargetIds[e])),
        (s = s.add(n.activeTargetIds[e]));
    return i
      ? new __PRIVATE_RemoteClientState(e, s)
      : (__PRIVATE_logError(
          "SharedClientState",
          `Failed to parse client data for instance '${e}': ${t}`
        ),
        null);
  }
}
class __PRIVATE_SharedOnlineState {
  constructor(e, t) {
    (this.clientId = e), (this.onlineState = t);
  }
  static Ts(e) {
    const t = JSON.parse(e);
    return "object" == typeof t &&
      -1 !== ["Unknown", "Online", "Offline"].indexOf(t.onlineState) &&
      "string" == typeof t.clientId
      ? new __PRIVATE_SharedOnlineState(t.clientId, t.onlineState)
      : (__PRIVATE_logError(
          "SharedClientState",
          `Failed to parse online state: ${e}`
        ),
        null);
  }
}
class __PRIVATE_LocalClientState {
  constructor() {
    this.activeTargetIds = __PRIVATE_targetIdSet();
  }
  ds(e) {
    this.activeTargetIds = this.activeTargetIds.add(e);
  }
  As(e) {
    this.activeTargetIds = this.activeTargetIds.delete(e);
  }
  Es() {
    const e = {
      activeTargetIds: this.activeTargetIds.toArray(),
      updateTimeMs: Date.now(),
    };
    return JSON.stringify(e);
  }
}
class __PRIVATE_WebStorageSharedClientState {
  constructor(e, t, n, i, s) {
    (this.window = e),
      (this.si = t),
      (this.persistenceKey = n),
      (this.Rs = i),
      (this.syncEngine = null),
      (this.onlineStateHandler = null),
      (this.sequenceNumberHandler = null),
      (this.Vs = this.fs.bind(this)),
      (this.gs = new SortedMap(__PRIVATE_primitiveComparator)),
      (this.started = !1),
      (this.ps = []);
    const o = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    (this.storage = this.window.localStorage),
      (this.currentUser = s),
      (this.ys = createWebStorageClientStateKey(this.persistenceKey, this.Rs)),
      (this.ws = (function createWebStorageSequenceNumberKey(e) {
        return `firestore_sequence_number_${e}`;
      })(this.persistenceKey)),
      (this.gs = this.gs.insert(this.Rs, new __PRIVATE_LocalClientState())),
      (this.Ss = new RegExp(`^firestore_clients_${o}_([^_]*)$`)),
      (this.bs = new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`)),
      (this.Ds = new RegExp(`^firestore_targets_${o}_(\\d+)$`)),
      (this.Cs = (function createWebStorageOnlineStateKey(e) {
        return `firestore_online_state_${e}`;
      })(this.persistenceKey)),
      (this.vs = (function createBundleLoadedKey(e) {
        return `firestore_bundle_loaded_v2_${e}`;
      })(this.persistenceKey)),
      this.window.addEventListener("storage", this.Vs);
  }
  static D(e) {
    return !(!e || !e.localStorage);
  }
  async start() {
    const e = await this.syncEngine.Bi();
    for (const t of e) {
      if (t === this.Rs) continue;
      const e = this.getItem(
        createWebStorageClientStateKey(this.persistenceKey, t)
      );
      if (e) {
        const n = __PRIVATE_RemoteClientState.Ts(t, e);
        n && (this.gs = this.gs.insert(n.clientId, n));
      }
    }
    this.Fs();
    const t = this.storage.getItem(this.Cs);
    if (t) {
      const e = this.Ms(t);
      e && this.xs(e);
    }
    for (const e of this.ps) this.fs(e);
    (this.ps = []),
      this.window.addEventListener("pagehide", () => this.shutdown()),
      (this.started = !0);
  }
  writeSequenceNumber(e) {
    this.setItem(this.ws, JSON.stringify(e));
  }
  getAllActiveQueryTargets() {
    return this.Os(this.gs);
  }
  isActiveQueryTarget(e) {
    let t = !1;
    return (
      this.gs.forEach((n, i) => {
        i.activeTargetIds.has(e) && (t = !0);
      }),
      t
    );
  }
  addPendingMutation(e) {
    this.Ns(e, "pending");
  }
  updateMutationState(e, t, n) {
    this.Ns(e, t, n), this.Bs(e);
  }
  addLocalQueryTarget(e) {
    let t = "not-current";
    if (this.isActiveQueryTarget(e)) {
      const n = this.storage.getItem(
        createWebStorageQueryTargetMetadataKey(this.persistenceKey, e)
      );
      if (n) {
        const i = __PRIVATE_QueryTargetMetadata.Ts(e, n);
        i && (t = i.state);
      }
    }
    return this.Ls.ds(e), this.Fs(), t;
  }
  removeLocalQueryTarget(e) {
    this.Ls.As(e), this.Fs();
  }
  isLocalQueryTarget(e) {
    return this.Ls.activeTargetIds.has(e);
  }
  clearQueryState(e) {
    this.removeItem(
      createWebStorageQueryTargetMetadataKey(this.persistenceKey, e)
    );
  }
  updateQueryState(e, t, n) {
    this.ks(e, t, n);
  }
  handleUserChange(e, t, n) {
    t.forEach((e) => {
      this.Bs(e);
    }),
      (this.currentUser = e),
      n.forEach((e) => {
        this.addPendingMutation(e);
      });
  }
  setOnlineState(e) {
    this.qs(e);
  }
  notifyBundleLoaded(e) {
    this.Qs(e);
  }
  shutdown() {
    this.started &&
      (this.window.removeEventListener("storage", this.Vs),
      this.removeItem(this.ys),
      (this.started = !1));
  }
  getItem(e) {
    const t = this.storage.getItem(e);
    return __PRIVATE_logDebug("SharedClientState", "READ", e, t), t;
  }
  setItem(e, t) {
    __PRIVATE_logDebug("SharedClientState", "SET", e, t),
      this.storage.setItem(e, t);
  }
  removeItem(e) {
    __PRIVATE_logDebug("SharedClientState", "REMOVE", e),
      this.storage.removeItem(e);
  }
  fs(e) {
    const t = e;
    if (t.storageArea === this.storage) {
      if (
        (__PRIVATE_logDebug("SharedClientState", "EVENT", t.key, t.newValue),
        t.key === this.ys)
      )
        return void __PRIVATE_logError(
          "Received WebStorage notification for local change. Another client might have garbage-collected our state"
        );
      this.si.enqueueRetryable(async () => {
        if (this.started) {
          if (null !== t.key)
            if (this.Ss.test(t.key)) {
              if (null == t.newValue) {
                const e = this.Ks(t.key);
                return this.$s(e, null);
              }
              {
                const e = this.Us(t.key, t.newValue);
                if (e) return this.$s(e.clientId, e);
              }
            } else if (this.bs.test(t.key)) {
              if (null !== t.newValue) {
                const e = this.Ws(t.key, t.newValue);
                if (e) return this.Gs(e);
              }
            } else if (this.Ds.test(t.key)) {
              if (null !== t.newValue) {
                const e = this.zs(t.key, t.newValue);
                if (e) return this.js(e);
              }
            } else if (t.key === this.Cs) {
              if (null !== t.newValue) {
                const e = this.Ms(t.newValue);
                if (e) return this.xs(e);
              }
            } else if (t.key === this.ws) {
              const e = (function __PRIVATE_fromWebStorageSequenceNumber(e) {
                let t = __PRIVATE_ListenSequence._e;
                if (null != e)
                  try {
                    const n = JSON.parse(e);
                    __PRIVATE_hardAssert("number" == typeof n), (t = n);
                  } catch (e) {
                    __PRIVATE_logError(
                      "SharedClientState",
                      "Failed to read sequence number from WebStorage",
                      e
                    );
                  }
                return t;
              })(t.newValue);
              e !== __PRIVATE_ListenSequence._e &&
                this.sequenceNumberHandler(e);
            } else if (t.key === this.vs) {
              const e = this.Hs(t.newValue);
              await Promise.all(e.map((e) => this.syncEngine.Js(e)));
            }
        } else this.ps.push(t);
      });
    }
  }
  get Ls() {
    return this.gs.get(this.Rs);
  }
  Fs() {
    this.setItem(this.ys, this.Ls.Es());
  }
  Ns(e, t, n) {
    const i = new __PRIVATE_MutationMetadata(this.currentUser, e, t, n),
      s = createWebStorageMutationBatchKey(
        this.persistenceKey,
        this.currentUser,
        e
      );
    this.setItem(s, i.Es());
  }
  Bs(e) {
    const t = createWebStorageMutationBatchKey(
      this.persistenceKey,
      this.currentUser,
      e
    );
    this.removeItem(t);
  }
  qs(e) {
    const t = { clientId: this.Rs, onlineState: e };
    this.storage.setItem(this.Cs, JSON.stringify(t));
  }
  ks(e, t, n) {
    const i = createWebStorageQueryTargetMetadataKey(this.persistenceKey, e),
      s = new __PRIVATE_QueryTargetMetadata(e, t, n);
    this.setItem(i, s.Es());
  }
  Qs(e) {
    const t = JSON.stringify(Array.from(e));
    this.setItem(this.vs, t);
  }
  Ks(e) {
    const t = this.Ss.exec(e);
    return t ? t[1] : null;
  }
  Us(e, t) {
    const n = this.Ks(e);
    return __PRIVATE_RemoteClientState.Ts(n, t);
  }
  Ws(e, t) {
    const n = this.bs.exec(e),
      i = Number(n[1]),
      s = void 0 !== n[2] ? n[2] : null;
    return __PRIVATE_MutationMetadata.Ts(new User(s), i, t);
  }
  zs(e, t) {
    const n = this.Ds.exec(e),
      i = Number(n[1]);
    return __PRIVATE_QueryTargetMetadata.Ts(i, t);
  }
  Ms(e) {
    return __PRIVATE_SharedOnlineState.Ts(e);
  }
  Hs(e) {
    return JSON.parse(e);
  }
  async Gs(e) {
    if (e.user.uid === this.currentUser.uid)
      return this.syncEngine.Ys(e.batchId, e.state, e.error);
    __PRIVATE_logDebug(
      "SharedClientState",
      `Ignoring mutation for non-active user ${e.user.uid}`
    );
  }
  js(e) {
    return this.syncEngine.Zs(e.targetId, e.state, e.error);
  }
  $s(e, t) {
    const n = t ? this.gs.insert(e, t) : this.gs.remove(e),
      i = this.Os(this.gs),
      s = this.Os(n),
      o = [],
      u = [];
    return (
      s.forEach((e) => {
        i.has(e) || o.push(e);
      }),
      i.forEach((e) => {
        s.has(e) || u.push(e);
      }),
      this.syncEngine.Xs(o, u).then(() => {
        this.gs = n;
      })
    );
  }
  xs(e) {
    this.gs.get(e.clientId) && this.onlineStateHandler(e.onlineState);
  }
  Os(e) {
    let t = __PRIVATE_targetIdSet();
    return (
      e.forEach((e, n) => {
        t = t.unionWith(n.activeTargetIds);
      }),
      t
    );
  }
}
class __PRIVATE_MemorySharedClientState {
  constructor() {
    (this.eo = new __PRIVATE_LocalClientState()),
      (this.no = {}),
      (this.onlineStateHandler = null),
      (this.sequenceNumberHandler = null);
  }
  addPendingMutation(e) {}
  updateMutationState(e, t, n) {}
  addLocalQueryTarget(e) {
    return this.eo.ds(e), this.no[e] || "not-current";
  }
  updateQueryState(e, t, n) {
    this.no[e] = t;
  }
  removeLocalQueryTarget(e) {
    this.eo.As(e);
  }
  isLocalQueryTarget(e) {
    return this.eo.activeTargetIds.has(e);
  }
  clearQueryState(e) {
    delete this.no[e];
  }
  getAllActiveQueryTargets() {
    return this.eo.activeTargetIds;
  }
  isActiveQueryTarget(e) {
    return this.eo.activeTargetIds.has(e);
  }
  start() {
    return (this.eo = new __PRIVATE_LocalClientState()), Promise.resolve();
  }
  handleUserChange(e, t, n) {}
  setOnlineState(e) {}
  shutdown() {}
  writeSequenceNumber(e) {}
  notifyBundleLoaded(e) {}
}
class __PRIVATE_NoopConnectivityMonitor {
  ro(e) {}
  shutdown() {}
}
class __PRIVATE_BrowserConnectivityMonitor {
  constructor() {
    (this.io = () => this.so()),
      (this.oo = () => this._o()),
      (this.ao = []),
      this.uo();
  }
  ro(e) {
    this.ao.push(e);
  }
  shutdown() {
    window.removeEventListener("online", this.io),
      window.removeEventListener("offline", this.oo);
  }
  uo() {
    window.addEventListener("online", this.io),
      window.addEventListener("offline", this.oo);
  }
  so() {
    __PRIVATE_logDebug(
      "ConnectivityMonitor",
      "Network connectivity changed: AVAILABLE"
    );
    for (const e of this.ao) e(0);
  }
  _o() {
    __PRIVATE_logDebug(
      "ConnectivityMonitor",
      "Network connectivity changed: UNAVAILABLE"
    );
    for (const e of this.ao) e(1);
  }
  static D() {
    return (
      "undefined" != typeof window &&
      void 0 !== window.addEventListener &&
      void 0 !== window.removeEventListener
    );
  }
}
let Dt = null;
function __PRIVATE_generateUniqueDebugId() {
  return (
    null === Dt
      ? (Dt = (function __PRIVATE_generateInitialUniqueDebugId() {
          return 268435456 + Math.round(2147483648 * Math.random());
        })())
      : Dt++,
    "0x" + Dt.toString(16)
  );
}
const Ct = {
  BatchGetDocuments: "batchGet",
  Commit: "commit",
  RunQuery: "runQuery",
  RunAggregationQuery: "runAggregationQuery",
};
class __PRIVATE_StreamBridge {
  constructor(e) {
    (this.co = e.co), (this.lo = e.lo);
  }
  ho(e) {
    this.Po = e;
  }
  Io(e) {
    this.To = e;
  }
  onMessage(e) {
    this.Eo = e;
  }
  close() {
    this.lo();
  }
  send(e) {
    this.co(e);
  }
  Ao() {
    this.Po();
  }
  Ro(e) {
    this.To(e);
  }
  Vo(e) {
    this.Eo(e);
  }
}
const Ft = "WebChannelConnection";
class __PRIVATE_WebChannelConnection extends class __PRIVATE_RestConnection {
  constructor(e) {
    (this.databaseInfo = e), (this.databaseId = e.databaseId);
    const t = e.ssl ? "https" : "http",
      n = encodeURIComponent(this.databaseId.projectId),
      i = encodeURIComponent(this.databaseId.database);
    (this.mo = t + "://" + e.host),
      (this.fo = `projects/${n}/databases/${i}`),
      (this.po =
        "(default)" === this.databaseId.database
          ? `project_id=${n}`
          : `project_id=${n}&database_id=${i}`);
  }
  get yo() {
    return !1;
  }
  wo(e, t, n, i, s) {
    const o = __PRIVATE_generateUniqueDebugId(),
      u = this.So(e, t);
    __PRIVATE_logDebug("RestConnection", `Sending RPC '${e}' ${o}:`, u, n);
    const l = {
      "google-cloud-resource-prefix": this.fo,
      "x-goog-request-params": this.po,
    };
    return (
      this.bo(l, i, s),
      this.Do(e, u, l, n).then(
        (t) => (
          __PRIVATE_logDebug("RestConnection", `Received RPC '${e}' ${o}: `, t),
          t
        ),
        (t) => {
          throw (
            (__PRIVATE_logWarn(
              "RestConnection",
              `RPC '${e}' ${o} failed with error: `,
              t,
              "url: ",
              u,
              "request:",
              n
            ),
            t)
          );
        }
      )
    );
  }
  Co(e, t, n, i, s, o) {
    return this.wo(e, t, n, i, s);
  }
  bo(e, t, n) {
    (e["X-Goog-Api-Client"] = (function __PRIVATE_getGoogApiClientValue() {
      return "gl-js/ fire/" + Be;
    })()),
      (e["Content-Type"] = "text/plain"),
      this.databaseInfo.appId &&
        (e["X-Firebase-GMPID"] = this.databaseInfo.appId),
      t && t.headers.forEach((t, n) => (e[n] = t)),
      n && n.headers.forEach((t, n) => (e[n] = t));
  }
  So(e, t) {
    const n = Ct[e];
    return `${this.mo}/v1/${t}:${n}`;
  }
} {
  constructor(e) {
    super(e),
      (this.forceLongPolling = e.forceLongPolling),
      (this.autoDetectLongPolling = e.autoDetectLongPolling),
      (this.useFetchStreams = e.useFetchStreams),
      (this.longPollingOptions = e.longPollingOptions);
  }
  Do(e, t, n, i) {
    const s = __PRIVATE_generateUniqueDebugId();
    return new Promise((o, u) => {
      const l = new Ne();
      l.setWithCredentials(!0),
        l.listenOnce(De.COMPLETE, () => {
          try {
            switch (l.getLastErrorCode()) {
              case we.NO_ERROR:
                const t = l.getResponseJson();
                __PRIVATE_logDebug(
                  Ft,
                  `XHR for RPC '${e}' ${s} received:`,
                  JSON.stringify(t)
                ),
                  o(t);
                break;
              case we.TIMEOUT:
                __PRIVATE_logDebug(Ft, `RPC '${e}' ${s} timed out`),
                  u(
                    new FirestoreError($e.DEADLINE_EXCEEDED, "Request time out")
                  );
                break;
              case we.HTTP_ERROR:
                const n = l.getStatus();
                if (
                  (__PRIVATE_logDebug(
                    Ft,
                    `RPC '${e}' ${s} failed with status:`,
                    n,
                    "response text:",
                    l.getResponseText()
                  ),
                  n > 0)
                ) {
                  let e = l.getResponseJson();
                  Array.isArray(e) && (e = e[0]);
                  const t = null == e ? void 0 : e.error;
                  if (t && t.status && t.message) {
                    const e =
                      (function __PRIVATE_mapCodeFromHttpResponseErrorStatus(
                        e
                      ) {
                        const t = e.toLowerCase().replace(/_/g, "-");
                        return Object.values($e).indexOf(t) >= 0
                          ? t
                          : $e.UNKNOWN;
                      })(t.status);
                    u(new FirestoreError(e, t.message));
                  } else
                    u(
                      new FirestoreError(
                        $e.UNKNOWN,
                        "Server responded with status " + l.getStatus()
                      )
                    );
                } else
                  u(new FirestoreError($e.UNAVAILABLE, "Connection failed."));
                break;
              default:
                fail();
            }
          } finally {
            __PRIVATE_logDebug(Ft, `RPC '${e}' ${s} completed.`);
          }
        });
      const _ = JSON.stringify(i);
      __PRIVATE_logDebug(Ft, `RPC '${e}' ${s} sending request:`, i),
        l.send(t, "POST", _, n, 15);
    });
  }
  vo(e, t, n) {
    const i = __PRIVATE_generateUniqueDebugId(),
      s = [this.mo, "/", "google.firestore.v1.Firestore", "/", e, "/channel"],
      o = new Od(),
      u = Mb(),
      l = {
        httpSessionIdParam: "gsessionid",
        initMessageHeaders: {},
        messageUrlParams: {
          database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`,
        },
        sendRawJson: !0,
        supportsCrossDomainXhr: !0,
        internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
        forceLongPolling: this.forceLongPolling,
        detectBufferingProxy: this.autoDetectLongPolling,
      },
      _ = this.longPollingOptions.timeoutSeconds;
    void 0 !== _ && (l.longPollingTimeout = Math.round(1e3 * _)),
      this.useFetchStreams && (l.useFetchStreams = !0),
      this.bo(l.initMessageHeaders, t, n),
      (l.encodeInitMessageHeaders = !0);
    const h = s.join("");
    __PRIVATE_logDebug(Ft, `Creating RPC '${e}' stream ${i}: ${h}`, l);
    const d = o.createWebChannel(h, l);
    let m = !1,
      f = !1;
    const g = new __PRIVATE_StreamBridge({
        co: (t) => {
          f
            ? __PRIVATE_logDebug(
                Ft,
                `Not sending because RPC '${e}' stream ${i} is closed:`,
                t
              )
            : (m ||
                (__PRIVATE_logDebug(
                  Ft,
                  `Opening RPC '${e}' stream ${i} transport.`
                ),
                d.open(),
                (m = !0)),
              __PRIVATE_logDebug(Ft, `RPC '${e}' stream ${i} sending:`, t),
              d.send(t));
        },
        lo: () => d.close(),
      }),
      __PRIVATE_unguardedEventListen = (e, t, n) => {
        e.listen(t, (e) => {
          try {
            n(e);
          } catch (e) {
            setTimeout(() => {
              throw e;
            }, 0);
          }
        });
      };
    return (
      __PRIVATE_unguardedEventListen(d, Me.EventType.OPEN, () => {
        f || __PRIVATE_logDebug(Ft, `RPC '${e}' stream ${i} transport opened.`);
      }),
      __PRIVATE_unguardedEventListen(d, Me.EventType.CLOSE, () => {
        f ||
          ((f = !0),
          __PRIVATE_logDebug(Ft, `RPC '${e}' stream ${i} transport closed`),
          g.Ro());
      }),
      __PRIVATE_unguardedEventListen(d, Me.EventType.ERROR, (t) => {
        f ||
          ((f = !0),
          __PRIVATE_logWarn(Ft, `RPC '${e}' stream ${i} transport errored:`, t),
          g.Ro(
            new FirestoreError(
              $e.UNAVAILABLE,
              "The operation could not be completed"
            )
          ));
      }),
      __PRIVATE_unguardedEventListen(d, Me.EventType.MESSAGE, (t) => {
        var n;
        if (!f) {
          const s = t.data[0];
          __PRIVATE_hardAssert(!!s);
          const o = s,
            u =
              o.error ||
              (null === (n = o[0]) || void 0 === n ? void 0 : n.error);
          if (u) {
            __PRIVATE_logDebug(Ft, `RPC '${e}' stream ${i} received error:`, u);
            const t = u.status;
            let n = (function __PRIVATE_mapCodeFromRpcStatus(e) {
                const t = Et[e];
                if (void 0 !== t) return __PRIVATE_mapCodeFromRpcCode(t);
              })(t),
              s = u.message;
            void 0 === n &&
              ((n = $e.INTERNAL),
              (s =
                "Unknown error status: " + t + " with message " + u.message)),
              (f = !0),
              g.Ro(new FirestoreError(n, s)),
              d.close();
          } else
            __PRIVATE_logDebug(Ft, `RPC '${e}' stream ${i} received:`, s),
              g.Vo(s);
        }
      }),
      __PRIVATE_unguardedEventListen(u, Ce.STAT_EVENT, (t) => {
        t.stat === Fe
          ? __PRIVATE_logDebug(
              Ft,
              `RPC '${e}' stream ${i} detected buffering proxy`
            )
          : t.stat === xe &&
            __PRIVATE_logDebug(
              Ft,
              `RPC '${e}' stream ${i} detected no buffering proxy`
            );
      }),
      setTimeout(() => {
        g.Ao();
      }, 0),
      g
    );
  }
}
function __PRIVATE_getWindow() {
  return "undefined" != typeof window ? window : null;
}
function getDocument() {
  return "undefined" != typeof document ? document : null;
}
function __PRIVATE_newSerializer(e) {
  return new JsonProtoSerializer(e, !0);
}
class __PRIVATE_ExponentialBackoff {
  constructor(e, t, n = 1e3, i = 1.5, s = 6e4) {
    (this.si = e),
      (this.timerId = t),
      (this.Fo = n),
      (this.Mo = i),
      (this.xo = s),
      (this.Oo = 0),
      (this.No = null),
      (this.Bo = Date.now()),
      this.reset();
  }
  reset() {
    this.Oo = 0;
  }
  Lo() {
    this.Oo = this.xo;
  }
  ko(e) {
    this.cancel();
    const t = Math.floor(this.Oo + this.qo()),
      n = Math.max(0, Date.now() - this.Bo),
      i = Math.max(0, t - n);
    i > 0 &&
      __PRIVATE_logDebug(
        "ExponentialBackoff",
        `Backing off for ${i} ms (base delay: ${this.Oo} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`
      ),
      (this.No = this.si.enqueueAfterDelay(
        this.timerId,
        i,
        () => ((this.Bo = Date.now()), e())
      )),
      (this.Oo *= this.Mo),
      this.Oo < this.Fo && (this.Oo = this.Fo),
      this.Oo > this.xo && (this.Oo = this.xo);
  }
  Qo() {
    null !== this.No && (this.No.skipDelay(), (this.No = null));
  }
  cancel() {
    null !== this.No && (this.No.cancel(), (this.No = null));
  }
  qo() {
    return (Math.random() - 0.5) * this.Oo;
  }
}
class __PRIVATE_PersistentStream {
  constructor(e, t, n, i, s, o, u, l) {
    (this.si = e),
      (this.Ko = n),
      (this.$o = i),
      (this.connection = s),
      (this.authCredentialsProvider = o),
      (this.appCheckCredentialsProvider = u),
      (this.listener = l),
      (this.state = 0),
      (this.Uo = 0),
      (this.Wo = null),
      (this.Go = null),
      (this.stream = null),
      (this.zo = new __PRIVATE_ExponentialBackoff(e, t));
  }
  jo() {
    return 1 === this.state || 5 === this.state || this.Ho();
  }
  Ho() {
    return 2 === this.state || 3 === this.state;
  }
  start() {
    4 !== this.state ? this.auth() : this.Jo();
  }
  async stop() {
    this.jo() && (await this.close(0));
  }
  Yo() {
    (this.state = 0), this.zo.reset();
  }
  Zo() {
    this.Ho() &&
      null === this.Wo &&
      (this.Wo = this.si.enqueueAfterDelay(this.Ko, 6e4, () => this.Xo()));
  }
  e_(e) {
    this.t_(), this.stream.send(e);
  }
  async Xo() {
    if (this.Ho()) return this.close(0);
  }
  t_() {
    this.Wo && (this.Wo.cancel(), (this.Wo = null));
  }
  n_() {
    this.Go && (this.Go.cancel(), (this.Go = null));
  }
  async close(e, t) {
    this.t_(),
      this.n_(),
      this.zo.cancel(),
      this.Uo++,
      4 !== e
        ? this.zo.reset()
        : t && t.code === $e.RESOURCE_EXHAUSTED
        ? (__PRIVATE_logError(t.toString()),
          __PRIVATE_logError(
            "Using maximum backoff delay to prevent overloading the backend."
          ),
          this.zo.Lo())
        : t &&
          t.code === $e.UNAUTHENTICATED &&
          3 !== this.state &&
          (this.authCredentialsProvider.invalidateToken(),
          this.appCheckCredentialsProvider.invalidateToken()),
      null !== this.stream &&
        (this.r_(), this.stream.close(), (this.stream = null)),
      (this.state = e),
      await this.listener.Io(t);
  }
  r_() {}
  auth() {
    this.state = 1;
    const e = this.i_(this.Uo),
      t = this.Uo;
    Promise.all([
      this.authCredentialsProvider.getToken(),
      this.appCheckCredentialsProvider.getToken(),
    ]).then(
      ([e, n]) => {
        this.Uo === t && this.s_(e, n);
      },
      (t) => {
        e(() => {
          const e = new FirestoreError(
            $e.UNKNOWN,
            "Fetching auth token failed: " + t.message
          );
          return this.o_(e);
        });
      }
    );
  }
  s_(e, t) {
    const n = this.i_(this.Uo);
    (this.stream = this.__(e, t)),
      this.stream.ho(() => {
        n(
          () => (
            (this.state = 2),
            (this.Go = this.si.enqueueAfterDelay(
              this.$o,
              1e4,
              () => (this.Ho() && (this.state = 3), Promise.resolve())
            )),
            this.listener.ho()
          )
        );
      }),
      this.stream.Io((e) => {
        n(() => this.o_(e));
      }),
      this.stream.onMessage((e) => {
        n(() => this.onMessage(e));
      });
  }
  Jo() {
    (this.state = 5),
      this.zo.ko(async () => {
        (this.state = 0), this.start();
      });
  }
  o_(e) {
    return (
      __PRIVATE_logDebug("PersistentStream", `close with error: ${e}`),
      (this.stream = null),
      this.close(4, e)
    );
  }
  i_(e) {
    return (t) => {
      this.si.enqueueAndForget(() =>
        this.Uo === e
          ? t()
          : (__PRIVATE_logDebug(
              "PersistentStream",
              "stream callback skipped by getCloseGuardedDispatcher."
            ),
            Promise.resolve())
      );
    };
  }
}
class __PRIVATE_PersistentListenStream extends __PRIVATE_PersistentStream {
  constructor(e, t, n, i, s, o) {
    super(
      e,
      "listen_stream_connection_backoff",
      "listen_stream_idle",
      "health_check_timeout",
      t,
      n,
      i,
      o
    ),
      (this.serializer = s);
  }
  __(e, t) {
    return this.connection.vo("Listen", e, t);
  }
  onMessage(e) {
    this.zo.reset();
    const t = (function __PRIVATE_fromWatchChange(e, t) {
        let n;
        if ("targetChange" in t) {
          t.targetChange;
          const i = (function __PRIVATE_fromWatchTargetChangeState(e) {
              return "NO_CHANGE" === e
                ? 0
                : "ADD" === e
                ? 1
                : "REMOVE" === e
                ? 2
                : "CURRENT" === e
                ? 3
                : "RESET" === e
                ? 4
                : fail();
            })(t.targetChange.targetChangeType || "NO_CHANGE"),
            s = t.targetChange.targetIds || [],
            o = (function __PRIVATE_fromBytes(e, t) {
              return e.useProto3Json
                ? (__PRIVATE_hardAssert(void 0 === t || "string" == typeof t),
                  ByteString.fromBase64String(t || ""))
                : (__PRIVATE_hardAssert(
                    void 0 === t || t instanceof Uint8Array
                  ),
                  ByteString.fromUint8Array(t || new Uint8Array()));
            })(e, t.targetChange.resumeToken),
            u = t.targetChange.cause,
            l =
              u &&
              (function __PRIVATE_fromRpcStatus(e) {
                const t =
                  void 0 === e.code
                    ? $e.UNKNOWN
                    : __PRIVATE_mapCodeFromRpcCode(e.code);
                return new FirestoreError(t, e.message || "");
              })(u);
          n = new __PRIVATE_WatchTargetChange(i, s, o, l || null);
        } else if ("documentChange" in t) {
          t.documentChange;
          const i = t.documentChange;
          i.document, i.document.name, i.document.updateTime;
          const s = fromName(e, i.document.name),
            o = __PRIVATE_fromVersion(i.document.updateTime),
            u = i.document.createTime
              ? __PRIVATE_fromVersion(i.document.createTime)
              : SnapshotVersion.min(),
            l = new ObjectValue({ mapValue: { fields: i.document.fields } }),
            _ = MutableDocument.newFoundDocument(s, o, u, l),
            h = i.targetIds || [],
            d = i.removedTargetIds || [];
          n = new __PRIVATE_DocumentWatchChange(h, d, _.key, _);
        } else if ("documentDelete" in t) {
          t.documentDelete;
          const i = t.documentDelete;
          i.document;
          const s = fromName(e, i.document),
            o = i.readTime
              ? __PRIVATE_fromVersion(i.readTime)
              : SnapshotVersion.min(),
            u = MutableDocument.newNoDocument(s, o),
            l = i.removedTargetIds || [];
          n = new __PRIVATE_DocumentWatchChange([], l, u.key, u);
        } else if ("documentRemove" in t) {
          t.documentRemove;
          const i = t.documentRemove;
          i.document;
          const s = fromName(e, i.document),
            o = i.removedTargetIds || [];
          n = new __PRIVATE_DocumentWatchChange([], o, s, null);
        } else {
          if (!("filter" in t)) return fail();
          {
            t.filter;
            const e = t.filter;
            e.targetId;
            const { count: i = 0, unchangedNames: s } = e,
              o = new ExistenceFilter(i, s),
              u = e.targetId;
            n = new __PRIVATE_ExistenceFilterChange(u, o);
          }
        }
        return n;
      })(this.serializer, e),
      n = (function __PRIVATE_versionFromListenResponse(e) {
        if (!("targetChange" in e)) return SnapshotVersion.min();
        const t = e.targetChange;
        return t.targetIds && t.targetIds.length
          ? SnapshotVersion.min()
          : t.readTime
          ? __PRIVATE_fromVersion(t.readTime)
          : SnapshotVersion.min();
      })(e);
    return this.listener.a_(t, n);
  }
  u_(e) {
    const t = {};
    (t.database = __PRIVATE_getEncodedDatabaseId(this.serializer)),
      (t.addTarget = (function __PRIVATE_toTarget(e, t) {
        let n;
        const i = t.target;
        if (
          ((n = __PRIVATE_targetIsDocumentTarget(i)
            ? { documents: __PRIVATE_toDocumentsTarget(e, i) }
            : { query: __PRIVATE_toQueryTarget(e, i) }),
          (n.targetId = t.targetId),
          t.resumeToken.approximateByteSize() > 0)
        ) {
          n.resumeToken = __PRIVATE_toBytes(e, t.resumeToken);
          const i = __PRIVATE_toInt32Proto(e, t.expectedCount);
          null !== i && (n.expectedCount = i);
        } else if (t.snapshotVersion.compareTo(SnapshotVersion.min()) > 0) {
          n.readTime = toTimestamp(e, t.snapshotVersion.toTimestamp());
          const i = __PRIVATE_toInt32Proto(e, t.expectedCount);
          null !== i && (n.expectedCount = i);
        }
        return n;
      })(this.serializer, e));
    const n = (function __PRIVATE_toListenRequestLabels(e, t) {
      const n = (function __PRIVATE_toLabel(e) {
        switch (e) {
          case "TargetPurposeListen":
            return null;
          case "TargetPurposeExistenceFilterMismatch":
            return "existence-filter-mismatch";
          case "TargetPurposeExistenceFilterMismatchBloom":
            return "existence-filter-mismatch-bloom";
          case "TargetPurposeLimboResolution":
            return "limbo-document";
          default:
            return fail();
        }
      })(t.purpose);
      return null == n ? null : { "goog-listen-tags": n };
    })(this.serializer, e);
    n && (t.labels = n), this.e_(t);
  }
  c_(e) {
    const t = {};
    (t.database = __PRIVATE_getEncodedDatabaseId(this.serializer)),
      (t.removeTarget = e),
      this.e_(t);
  }
}
class __PRIVATE_PersistentWriteStream extends __PRIVATE_PersistentStream {
  constructor(e, t, n, i, s, o) {
    super(
      e,
      "write_stream_connection_backoff",
      "write_stream_idle",
      "health_check_timeout",
      t,
      n,
      i,
      o
    ),
      (this.serializer = s),
      (this.l_ = !1);
  }
  get h_() {
    return this.l_;
  }
  start() {
    (this.l_ = !1), (this.lastStreamToken = void 0), super.start();
  }
  r_() {
    this.l_ && this.P_([]);
  }
  __(e, t) {
    return this.connection.vo("Write", e, t);
  }
  onMessage(e) {
    if (
      (__PRIVATE_hardAssert(!!e.streamToken),
      (this.lastStreamToken = e.streamToken),
      this.l_)
    ) {
      this.zo.reset();
      const t = (function __PRIVATE_fromWriteResults(e, t) {
          return e && e.length > 0
            ? (__PRIVATE_hardAssert(void 0 !== t),
              e.map((e) =>
                (function __PRIVATE_fromWriteResult(e, t) {
                  let n = e.updateTime
                    ? __PRIVATE_fromVersion(e.updateTime)
                    : __PRIVATE_fromVersion(t);
                  return (
                    n.isEqual(SnapshotVersion.min()) &&
                      (n = __PRIVATE_fromVersion(t)),
                    new MutationResult(n, e.transformResults || [])
                  );
                })(e, t)
              ))
            : [];
        })(e.writeResults, e.commitTime),
        n = __PRIVATE_fromVersion(e.commitTime);
      return this.listener.I_(n, t);
    }
    return (
      __PRIVATE_hardAssert(!e.writeResults || 0 === e.writeResults.length),
      (this.l_ = !0),
      this.listener.T_()
    );
  }
  E_() {
    const e = {};
    (e.database = __PRIVATE_getEncodedDatabaseId(this.serializer)), this.e_(e);
  }
  P_(e) {
    const t = {
      streamToken: this.lastStreamToken,
      writes: e.map((e) => toMutation(this.serializer, e)),
    };
    this.e_(t);
  }
}
class __PRIVATE_DatastoreImpl extends class Datastore {} {
  constructor(e, t, n, i) {
    super(),
      (this.authCredentials = e),
      (this.appCheckCredentials = t),
      (this.connection = n),
      (this.serializer = i),
      (this.d_ = !1);
  }
  A_() {
    if (this.d_)
      throw new FirestoreError(
        $e.FAILED_PRECONDITION,
        "The client has already been terminated."
      );
  }
  wo(e, t, n) {
    return (
      this.A_(),
      Promise.all([
        this.authCredentials.getToken(),
        this.appCheckCredentials.getToken(),
      ])
        .then(([i, s]) => this.connection.wo(e, t, n, i, s))
        .catch((e) => {
          throw "FirebaseError" === e.name
            ? (e.code === $e.UNAUTHENTICATED &&
                (this.authCredentials.invalidateToken(),
                this.appCheckCredentials.invalidateToken()),
              e)
            : new FirestoreError($e.UNKNOWN, e.toString());
        })
    );
  }
  Co(e, t, n, i) {
    return (
      this.A_(),
      Promise.all([
        this.authCredentials.getToken(),
        this.appCheckCredentials.getToken(),
      ])
        .then(([s, o]) => this.connection.Co(e, t, n, s, o, i))
        .catch((e) => {
          throw "FirebaseError" === e.name
            ? (e.code === $e.UNAUTHENTICATED &&
                (this.authCredentials.invalidateToken(),
                this.appCheckCredentials.invalidateToken()),
              e)
            : new FirestoreError($e.UNKNOWN, e.toString());
        })
    );
  }
  terminate() {
    this.d_ = !0;
  }
}
class __PRIVATE_OnlineStateTracker {
  constructor(e, t) {
    (this.asyncQueue = e),
      (this.onlineStateHandler = t),
      (this.state = "Unknown"),
      (this.V_ = 0),
      (this.m_ = null),
      (this.f_ = !0);
  }
  g_() {
    0 === this.V_ &&
      (this.p_("Unknown"),
      (this.m_ = this.asyncQueue.enqueueAfterDelay(
        "online_state_timeout",
        1e4,
        () => (
          (this.m_ = null),
          this.y_("Backend didn't respond within 10 seconds."),
          this.p_("Offline"),
          Promise.resolve()
        )
      )));
  }
  w_(e) {
    "Online" === this.state
      ? this.p_("Unknown")
      : (this.V_++,
        this.V_ >= 1 &&
          (this.S_(),
          this.y_(
            `Connection failed 1 times. Most recent error: ${e.toString()}`
          ),
          this.p_("Offline")));
  }
  set(e) {
    this.S_(), (this.V_ = 0), "Online" === e && (this.f_ = !1), this.p_(e);
  }
  p_(e) {
    e !== this.state && ((this.state = e), this.onlineStateHandler(e));
  }
  y_(e) {
    const t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
    this.f_
      ? (__PRIVATE_logError(t), (this.f_ = !1))
      : __PRIVATE_logDebug("OnlineStateTracker", t);
  }
  S_() {
    null !== this.m_ && (this.m_.cancel(), (this.m_ = null));
  }
}
class __PRIVATE_RemoteStoreImpl {
  constructor(e, t, n, i, s) {
    (this.localStore = e),
      (this.datastore = t),
      (this.asyncQueue = n),
      (this.remoteSyncer = {}),
      (this.b_ = []),
      (this.D_ = new Map()),
      (this.C_ = new Set()),
      (this.v_ = []),
      (this.F_ = s),
      this.F_.ro((e) => {
        n.enqueueAndForget(async () => {
          __PRIVATE_canUseNetwork(this) &&
            (__PRIVATE_logDebug(
              "RemoteStore",
              "Restarting streams for network reachability change."
            ),
            await (async function __PRIVATE_restartNetwork(e) {
              const t = __PRIVATE_debugCast(e);
              t.C_.add(4),
                await __PRIVATE_disableNetworkInternal(t),
                t.M_.set("Unknown"),
                t.C_.delete(4),
                await __PRIVATE_enableNetworkInternal(t);
            })(this));
        });
      }),
      (this.M_ = new __PRIVATE_OnlineStateTracker(n, i));
  }
}
async function __PRIVATE_enableNetworkInternal(e) {
  if (__PRIVATE_canUseNetwork(e)) for (const t of e.v_) await t(!0);
}
async function __PRIVATE_disableNetworkInternal(e) {
  for (const t of e.v_) await t(!1);
}
function __PRIVATE_remoteStoreListen(e, t) {
  const n = __PRIVATE_debugCast(e);
  n.D_.has(t.targetId) ||
    (n.D_.set(t.targetId, t),
    __PRIVATE_shouldStartWatchStream(n)
      ? __PRIVATE_startWatchStream(n)
      : __PRIVATE_ensureWatchStream(n).Ho() &&
        __PRIVATE_sendWatchRequest(n, t));
}
function __PRIVATE_remoteStoreUnlisten(e, t) {
  const n = __PRIVATE_debugCast(e),
    i = __PRIVATE_ensureWatchStream(n);
  n.D_.delete(t),
    i.Ho() && __PRIVATE_sendUnwatchRequest(n, t),
    0 === n.D_.size &&
      (i.Ho() ? i.Zo() : __PRIVATE_canUseNetwork(n) && n.M_.set("Unknown"));
}
function __PRIVATE_sendWatchRequest(e, t) {
  if (
    (e.x_.Oe(t.targetId),
    t.resumeToken.approximateByteSize() > 0 ||
      t.snapshotVersion.compareTo(SnapshotVersion.min()) > 0)
  ) {
    const n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;
    t = t.withExpectedCount(n);
  }
  __PRIVATE_ensureWatchStream(e).u_(t);
}
function __PRIVATE_sendUnwatchRequest(e, t) {
  e.x_.Oe(t), __PRIVATE_ensureWatchStream(e).c_(t);
}
function __PRIVATE_startWatchStream(e) {
  (e.x_ = new __PRIVATE_WatchChangeAggregator({
    getRemoteKeysForTarget: (t) => e.remoteSyncer.getRemoteKeysForTarget(t),
    _t: (t) => e.D_.get(t) || null,
    nt: () => e.datastore.serializer.databaseId,
  })),
    __PRIVATE_ensureWatchStream(e).start(),
    e.M_.g_();
}
function __PRIVATE_shouldStartWatchStream(e) {
  return (
    __PRIVATE_canUseNetwork(e) &&
    !__PRIVATE_ensureWatchStream(e).jo() &&
    e.D_.size > 0
  );
}
function __PRIVATE_canUseNetwork(e) {
  return 0 === __PRIVATE_debugCast(e).C_.size;
}
function __PRIVATE_cleanUpWatchStreamState(e) {
  e.x_ = void 0;
}
async function __PRIVATE_onWatchStreamOpen(e) {
  e.D_.forEach((t, n) => {
    __PRIVATE_sendWatchRequest(e, t);
  });
}
async function __PRIVATE_onWatchStreamClose(e, t) {
  __PRIVATE_cleanUpWatchStreamState(e),
    __PRIVATE_shouldStartWatchStream(e)
      ? (e.M_.w_(t), __PRIVATE_startWatchStream(e))
      : e.M_.set("Unknown");
}
async function __PRIVATE_onWatchStreamChange(e, t, n) {
  if (
    (e.M_.set("Online"),
    t instanceof __PRIVATE_WatchTargetChange && 2 === t.state && t.cause)
  )
    try {
      await (async function __PRIVATE_handleTargetError(e, t) {
        const n = t.cause;
        for (const i of t.targetIds)
          e.D_.has(i) &&
            (await e.remoteSyncer.rejectListen(i, n),
            e.D_.delete(i),
            e.x_.removeTarget(i));
      })(e, t);
    } catch (n) {
      __PRIVATE_logDebug(
        "RemoteStore",
        "Failed to remove targets %s: %s ",
        t.targetIds.join(","),
        n
      ),
        await __PRIVATE_disableNetworkUntilRecovery(e, n);
    }
  else if (
    (t instanceof __PRIVATE_DocumentWatchChange
      ? e.x_.$e(t)
      : t instanceof __PRIVATE_ExistenceFilterChange
      ? e.x_.Je(t)
      : e.x_.Ge(t),
    !n.isEqual(SnapshotVersion.min()))
  )
    try {
      const t = await __PRIVATE_localStoreGetLastRemoteSnapshotVersion(
        e.localStore
      );
      n.compareTo(t) >= 0 &&
        (await (function __PRIVATE_raiseWatchSnapshot(e, t) {
          const n = e.x_.it(t);
          return (
            n.targetChanges.forEach((n, i) => {
              if (n.resumeToken.approximateByteSize() > 0) {
                const s = e.D_.get(i);
                s && e.D_.set(i, s.withResumeToken(n.resumeToken, t));
              }
            }),
            n.targetMismatches.forEach((t, n) => {
              const i = e.D_.get(t);
              if (!i) return;
              e.D_.set(
                t,
                i.withResumeToken(
                  ByteString.EMPTY_BYTE_STRING,
                  i.snapshotVersion
                )
              ),
                __PRIVATE_sendUnwatchRequest(e, t);
              const s = new TargetData(i.target, t, n, i.sequenceNumber);
              __PRIVATE_sendWatchRequest(e, s);
            }),
            e.remoteSyncer.applyRemoteEvent(n)
          );
        })(e, n));
    } catch (t) {
      __PRIVATE_logDebug("RemoteStore", "Failed to raise snapshot:", t),
        await __PRIVATE_disableNetworkUntilRecovery(e, t);
    }
}
async function __PRIVATE_disableNetworkUntilRecovery(e, t, n) {
  if (!__PRIVATE_isIndexedDbTransactionError(t)) throw t;
  e.C_.add(1),
    await __PRIVATE_disableNetworkInternal(e),
    e.M_.set("Offline"),
    n ||
      (n = () =>
        __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e.localStore)),
    e.asyncQueue.enqueueRetryable(async () => {
      __PRIVATE_logDebug("RemoteStore", "Retrying IndexedDB access"),
        await n(),
        e.C_.delete(1),
        await __PRIVATE_enableNetworkInternal(e);
    });
}
function __PRIVATE_executeWithRecovery(e, t) {
  return t().catch((n) => __PRIVATE_disableNetworkUntilRecovery(e, n, t));
}
async function __PRIVATE_fillWritePipeline(e) {
  const t = __PRIVATE_debugCast(e),
    n = __PRIVATE_ensureWriteStream(t);
  let i = t.b_.length > 0 ? t.b_[t.b_.length - 1].batchId : -1;
  for (; __PRIVATE_canAddToWritePipeline(t); )
    try {
      const e = await __PRIVATE_localStoreGetNextMutationBatch(t.localStore, i);
      if (null === e) {
        0 === t.b_.length && n.Zo();
        break;
      }
      (i = e.batchId), __PRIVATE_addToWritePipeline(t, e);
    } catch (e) {
      await __PRIVATE_disableNetworkUntilRecovery(t, e);
    }
  __PRIVATE_shouldStartWriteStream(t) && __PRIVATE_startWriteStream(t);
}
function __PRIVATE_canAddToWritePipeline(e) {
  return __PRIVATE_canUseNetwork(e) && e.b_.length < 10;
}
function __PRIVATE_addToWritePipeline(e, t) {
  e.b_.push(t);
  const n = __PRIVATE_ensureWriteStream(e);
  n.Ho() && n.h_ && n.P_(t.mutations);
}
function __PRIVATE_shouldStartWriteStream(e) {
  return (
    __PRIVATE_canUseNetwork(e) &&
    !__PRIVATE_ensureWriteStream(e).jo() &&
    e.b_.length > 0
  );
}
function __PRIVATE_startWriteStream(e) {
  __PRIVATE_ensureWriteStream(e).start();
}
async function __PRIVATE_onWriteStreamOpen(e) {
  __PRIVATE_ensureWriteStream(e).E_();
}
async function __PRIVATE_onWriteHandshakeComplete(e) {
  const t = __PRIVATE_ensureWriteStream(e);
  for (const n of e.b_) t.P_(n.mutations);
}
async function __PRIVATE_onMutationResult(e, t, n) {
  const i = e.b_.shift(),
    s = MutationBatchResult.from(i, t, n);
  await __PRIVATE_executeWithRecovery(e, () =>
    e.remoteSyncer.applySuccessfulWrite(s)
  ),
    await __PRIVATE_fillWritePipeline(e);
}
async function __PRIVATE_onWriteStreamClose(e, t) {
  t &&
    __PRIVATE_ensureWriteStream(e).h_ &&
    (await (async function __PRIVATE_handleWriteError(e, t) {
      if (
        (function __PRIVATE_isPermanentWriteError(e) {
          return __PRIVATE_isPermanentError(e) && e !== $e.ABORTED;
        })(t.code)
      ) {
        const n = e.b_.shift();
        __PRIVATE_ensureWriteStream(e).Yo(),
          await __PRIVATE_executeWithRecovery(e, () =>
            e.remoteSyncer.rejectFailedWrite(n.batchId, t)
          ),
          await __PRIVATE_fillWritePipeline(e);
      }
    })(e, t)),
    __PRIVATE_shouldStartWriteStream(e) && __PRIVATE_startWriteStream(e);
}
async function __PRIVATE_remoteStoreHandleCredentialChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  n.asyncQueue.verifyOperationInProgress(),
    __PRIVATE_logDebug("RemoteStore", "RemoteStore received new credentials");
  const i = __PRIVATE_canUseNetwork(n);
  n.C_.add(3),
    await __PRIVATE_disableNetworkInternal(n),
    i && n.M_.set("Unknown"),
    await n.remoteSyncer.handleCredentialChange(t),
    n.C_.delete(3),
    await __PRIVATE_enableNetworkInternal(n);
}
async function __PRIVATE_remoteStoreApplyPrimaryState(e, t) {
  const n = __PRIVATE_debugCast(e);
  t
    ? (n.C_.delete(2), await __PRIVATE_enableNetworkInternal(n))
    : t ||
      (n.C_.add(2),
      await __PRIVATE_disableNetworkInternal(n),
      n.M_.set("Unknown"));
}
function __PRIVATE_ensureWatchStream(e) {
  return (
    e.O_ ||
      ((e.O_ = (function __PRIVATE_newPersistentWatchStream(e, t, n) {
        const i = __PRIVATE_debugCast(e);
        return (
          i.A_(),
          new __PRIVATE_PersistentListenStream(
            t,
            i.connection,
            i.authCredentials,
            i.appCheckCredentials,
            i.serializer,
            n
          )
        );
      })(e.datastore, e.asyncQueue, {
        ho: __PRIVATE_onWatchStreamOpen.bind(null, e),
        Io: __PRIVATE_onWatchStreamClose.bind(null, e),
        a_: __PRIVATE_onWatchStreamChange.bind(null, e),
      })),
      e.v_.push(async (t) => {
        t
          ? (e.O_.Yo(),
            __PRIVATE_shouldStartWatchStream(e)
              ? __PRIVATE_startWatchStream(e)
              : e.M_.set("Unknown"))
          : (await e.O_.stop(), __PRIVATE_cleanUpWatchStreamState(e));
      })),
    e.O_
  );
}
function __PRIVATE_ensureWriteStream(e) {
  return (
    e.N_ ||
      ((e.N_ = (function __PRIVATE_newPersistentWriteStream(e, t, n) {
        const i = __PRIVATE_debugCast(e);
        return (
          i.A_(),
          new __PRIVATE_PersistentWriteStream(
            t,
            i.connection,
            i.authCredentials,
            i.appCheckCredentials,
            i.serializer,
            n
          )
        );
      })(e.datastore, e.asyncQueue, {
        ho: __PRIVATE_onWriteStreamOpen.bind(null, e),
        Io: __PRIVATE_onWriteStreamClose.bind(null, e),
        T_: __PRIVATE_onWriteHandshakeComplete.bind(null, e),
        I_: __PRIVATE_onMutationResult.bind(null, e),
      })),
      e.v_.push(async (t) => {
        t
          ? (e.N_.Yo(), await __PRIVATE_fillWritePipeline(e))
          : (await e.N_.stop(),
            e.b_.length > 0 &&
              (__PRIVATE_logDebug(
                "RemoteStore",
                `Stopping write stream with ${e.b_.length} pending writes`
              ),
              (e.b_ = [])));
      })),
    e.N_
  );
}
class DelayedOperation {
  constructor(e, t, n, i, s) {
    (this.asyncQueue = e),
      (this.timerId = t),
      (this.targetTimeMs = n),
      (this.op = i),
      (this.removalCallback = s),
      (this.deferred = new __PRIVATE_Deferred()),
      (this.then = this.deferred.promise.then.bind(this.deferred.promise)),
      this.deferred.promise.catch((e) => {});
  }
  get promise() {
    return this.deferred.promise;
  }
  static createAndSchedule(e, t, n, i, s) {
    const o = Date.now() + n,
      u = new DelayedOperation(e, t, o, i, s);
    return u.start(n), u;
  }
  start(e) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
  }
  skipDelay() {
    return this.handleDelayElapsed();
  }
  cancel(e) {
    null !== this.timerHandle &&
      (this.clearTimeout(),
      this.deferred.reject(
        new FirestoreError(
          $e.CANCELLED,
          "Operation cancelled" + (e ? ": " + e : "")
        )
      ));
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() =>
      null !== this.timerHandle
        ? (this.clearTimeout(), this.op().then((e) => this.deferred.resolve(e)))
        : Promise.resolve()
    );
  }
  clearTimeout() {
    null !== this.timerHandle &&
      (this.removalCallback(this),
      clearTimeout(this.timerHandle),
      (this.timerHandle = null));
  }
}
function __PRIVATE_wrapInUserErrorIfRecoverable(e, t) {
  if (
    (__PRIVATE_logError("AsyncQueue", `${t}: ${e}`),
    __PRIVATE_isIndexedDbTransactionError(e))
  )
    return new FirestoreError($e.UNAVAILABLE, `${t}: ${e}`);
  throw e;
}
class DocumentSet {
  constructor(e) {
    (this.comparator = e
      ? (t, n) => e(t, n) || DocumentKey.comparator(t.key, n.key)
      : (e, t) => DocumentKey.comparator(e.key, t.key)),
      (this.keyedMap = documentMap()),
      (this.sortedSet = new SortedMap(this.comparator));
  }
  static emptySet(e) {
    return new DocumentSet(e.comparator);
  }
  has(e) {
    return null != this.keyedMap.get(e);
  }
  get(e) {
    return this.keyedMap.get(e);
  }
  first() {
    return this.sortedSet.minKey();
  }
  last() {
    return this.sortedSet.maxKey();
  }
  isEmpty() {
    return this.sortedSet.isEmpty();
  }
  indexOf(e) {
    const t = this.keyedMap.get(e);
    return t ? this.sortedSet.indexOf(t) : -1;
  }
  get size() {
    return this.sortedSet.size;
  }
  forEach(e) {
    this.sortedSet.inorderTraversal((t, n) => (e(t), !1));
  }
  add(e) {
    const t = this.delete(e.key);
    return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null));
  }
  delete(e) {
    const t = this.get(e);
    return t
      ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t))
      : this;
  }
  isEqual(e) {
    if (!(e instanceof DocumentSet)) return !1;
    if (this.size !== e.size) return !1;
    const t = this.sortedSet.getIterator(),
      n = e.sortedSet.getIterator();
    for (; t.hasNext(); ) {
      const e = t.getNext().key,
        i = n.getNext().key;
      if (!e.isEqual(i)) return !1;
    }
    return !0;
  }
  toString() {
    const e = [];
    return (
      this.forEach((t) => {
        e.push(t.toString());
      }),
      0 === e.length
        ? "DocumentSet ()"
        : "DocumentSet (\n  " + e.join("  \n") + "\n)"
    );
  }
  copy(e, t) {
    const n = new DocumentSet();
    return (
      (n.comparator = this.comparator), (n.keyedMap = e), (n.sortedSet = t), n
    );
  }
}
class __PRIVATE_DocumentChangeSet {
  constructor() {
    this.B_ = new SortedMap(DocumentKey.comparator);
  }
  track(e) {
    const t = e.doc.key,
      n = this.B_.get(t);
    n
      ? 0 !== e.type && 3 === n.type
        ? (this.B_ = this.B_.insert(t, e))
        : 3 === e.type && 1 !== n.type
        ? (this.B_ = this.B_.insert(t, { type: n.type, doc: e.doc }))
        : 2 === e.type && 2 === n.type
        ? (this.B_ = this.B_.insert(t, { type: 2, doc: e.doc }))
        : 2 === e.type && 0 === n.type
        ? (this.B_ = this.B_.insert(t, { type: 0, doc: e.doc }))
        : 1 === e.type && 0 === n.type
        ? (this.B_ = this.B_.remove(t))
        : 1 === e.type && 2 === n.type
        ? (this.B_ = this.B_.insert(t, { type: 1, doc: n.doc }))
        : 0 === e.type && 1 === n.type
        ? (this.B_ = this.B_.insert(t, { type: 2, doc: e.doc }))
        : fail()
      : (this.B_ = this.B_.insert(t, e));
  }
  L_() {
    const e = [];
    return (
      this.B_.inorderTraversal((t, n) => {
        e.push(n);
      }),
      e
    );
  }
}
class ViewSnapshot {
  constructor(e, t, n, i, s, o, u, l, _) {
    (this.query = e),
      (this.docs = t),
      (this.oldDocs = n),
      (this.docChanges = i),
      (this.mutatedKeys = s),
      (this.fromCache = o),
      (this.syncStateChanged = u),
      (this.excludesMetadataChanges = l),
      (this.hasCachedResults = _);
  }
  static fromInitialDocuments(e, t, n, i, s) {
    const o = [];
    return (
      t.forEach((e) => {
        o.push({ type: 0, doc: e });
      }),
      new ViewSnapshot(e, t, DocumentSet.emptySet(t), o, n, i, !0, !1, s)
    );
  }
  get hasPendingWrites() {
    return !this.mutatedKeys.isEmpty();
  }
  isEqual(e) {
    if (
      !(
        this.fromCache === e.fromCache &&
        this.hasCachedResults === e.hasCachedResults &&
        this.syncStateChanged === e.syncStateChanged &&
        this.mutatedKeys.isEqual(e.mutatedKeys) &&
        __PRIVATE_queryEquals(this.query, e.query) &&
        this.docs.isEqual(e.docs) &&
        this.oldDocs.isEqual(e.oldDocs)
      )
    )
      return !1;
    const t = this.docChanges,
      n = e.docChanges;
    if (t.length !== n.length) return !1;
    for (let e = 0; e < t.length; e++)
      if (t[e].type !== n[e].type || !t[e].doc.isEqual(n[e].doc)) return !1;
    return !0;
  }
}
class __PRIVATE_QueryListenersInfo {
  constructor() {
    (this.k_ = void 0), (this.listeners = []);
  }
}
class __PRIVATE_EventManagerImpl {
  constructor() {
    (this.queries = new ObjectMap(
      (e) => __PRIVATE_canonifyQuery(e),
      __PRIVATE_queryEquals
    )),
      (this.onlineState = "Unknown"),
      (this.q_ = new Set());
  }
}
async function __PRIVATE_eventManagerListen(e, t) {
  const n = __PRIVATE_debugCast(e),
    i = t.query;
  let s = !1,
    o = n.queries.get(i);
  if ((o || ((s = !0), (o = new __PRIVATE_QueryListenersInfo())), s))
    try {
      o.k_ = await n.onListen(i);
    } catch (e) {
      const n = __PRIVATE_wrapInUserErrorIfRecoverable(
        e,
        `Initialization of query '${__PRIVATE_stringifyQuery(t.query)}' failed`
      );
      return void t.onError(n);
    }
  n.queries.set(i, o),
    o.listeners.push(t),
    t.Q_(n.onlineState),
    o.k_ && t.K_(o.k_) && __PRIVATE_raiseSnapshotsInSyncEvent(n);
}
async function __PRIVATE_eventManagerUnlisten(e, t) {
  const n = __PRIVATE_debugCast(e),
    i = t.query;
  let s = !1;
  const o = n.queries.get(i);
  if (o) {
    const e = o.listeners.indexOf(t);
    e >= 0 && (o.listeners.splice(e, 1), (s = 0 === o.listeners.length));
  }
  if (s) return n.queries.delete(i), n.onUnlisten(i);
}
function __PRIVATE_eventManagerOnWatchChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  let i = !1;
  for (const e of t) {
    const t = e.query,
      s = n.queries.get(t);
    if (s) {
      for (const t of s.listeners) t.K_(e) && (i = !0);
      s.k_ = e;
    }
  }
  i && __PRIVATE_raiseSnapshotsInSyncEvent(n);
}
function __PRIVATE_eventManagerOnWatchError(e, t, n) {
  const i = __PRIVATE_debugCast(e),
    s = i.queries.get(t);
  if (s) for (const e of s.listeners) e.onError(n);
  i.queries.delete(t);
}
function __PRIVATE_raiseSnapshotsInSyncEvent(e) {
  e.q_.forEach((e) => {
    e.next();
  });
}
class __PRIVATE_QueryListener {
  constructor(e, t, n) {
    (this.query = e),
      (this.U_ = t),
      (this.W_ = !1),
      (this.G_ = null),
      (this.onlineState = "Unknown"),
      (this.options = n || {});
  }
  K_(e) {
    if (!this.options.includeMetadataChanges) {
      const t = [];
      for (const n of e.docChanges) 3 !== n.type && t.push(n);
      e = new ViewSnapshot(
        e.query,
        e.docs,
        e.oldDocs,
        t,
        e.mutatedKeys,
        e.fromCache,
        e.syncStateChanged,
        !0,
        e.hasCachedResults
      );
    }
    let t = !1;
    return (
      this.W_
        ? this.z_(e) && (this.U_.next(e), (t = !0))
        : this.j_(e, this.onlineState) && (this.H_(e), (t = !0)),
      (this.G_ = e),
      t
    );
  }
  onError(e) {
    this.U_.error(e);
  }
  Q_(e) {
    this.onlineState = e;
    let t = !1;
    return (
      this.G_ &&
        !this.W_ &&
        this.j_(this.G_, e) &&
        (this.H_(this.G_), (t = !0)),
      t
    );
  }
  j_(e, t) {
    if (!e.fromCache) return !0;
    const n = "Offline" !== t;
    return (
      (!this.options.J_ || !n) &&
      (!e.docs.isEmpty() || e.hasCachedResults || "Offline" === t)
    );
  }
  z_(e) {
    if (e.docChanges.length > 0) return !0;
    const t = this.G_ && this.G_.hasPendingWrites !== e.hasPendingWrites;
    return (
      !(!e.syncStateChanged && !t) && !0 === this.options.includeMetadataChanges
    );
  }
  H_(e) {
    (e = ViewSnapshot.fromInitialDocuments(
      e.query,
      e.docs,
      e.mutatedKeys,
      e.fromCache,
      e.hasCachedResults
    )),
      (this.W_ = !0),
      this.U_.next(e);
  }
}
class __PRIVATE_SizedBundleElement {
  constructor(e, t) {
    (this.Y_ = e), (this.byteLength = t);
  }
  Z_() {
    return "metadata" in this.Y_;
  }
}
class __PRIVATE_BundleConverterImpl {
  constructor(e) {
    this.serializer = e;
  }
  hs(e) {
    return fromName(this.serializer, e);
  }
  Ps(e) {
    return e.metadata.exists
      ? __PRIVATE_fromDocument(this.serializer, e.document, !1)
      : MutableDocument.newNoDocument(
          this.hs(e.metadata.name),
          this.Is(e.metadata.readTime)
        );
  }
  Is(e) {
    return __PRIVATE_fromVersion(e);
  }
}
class __PRIVATE_BundleLoader {
  constructor(e, t, n) {
    (this.X_ = e),
      (this.localStore = t),
      (this.serializer = n),
      (this.queries = []),
      (this.documents = []),
      (this.collectionGroups = new Set()),
      (this.progress = __PRIVATE_bundleInitialProgress(e));
  }
  ea(e) {
    this.progress.bytesLoaded += e.byteLength;
    let t = this.progress.documentsLoaded;
    if (e.Y_.namedQuery) this.queries.push(e.Y_.namedQuery);
    else if (e.Y_.documentMetadata) {
      this.documents.push({ metadata: e.Y_.documentMetadata }),
        e.Y_.documentMetadata.exists || ++t;
      const n = ResourcePath.fromString(e.Y_.documentMetadata.name);
      this.collectionGroups.add(n.get(n.length - 2));
    } else
      e.Y_.document &&
        ((this.documents[this.documents.length - 1].document = e.Y_.document),
        ++t);
    return t !== this.progress.documentsLoaded
      ? ((this.progress.documentsLoaded = t), Object.assign({}, this.progress))
      : null;
  }
  ta(e) {
    const t = new Map(),
      n = new __PRIVATE_BundleConverterImpl(this.serializer);
    for (const i of e)
      if (i.metadata.queries) {
        const e = n.hs(i.metadata.name);
        for (const n of i.metadata.queries) {
          const i = (t.get(n) || __PRIVATE_documentKeySet()).add(e);
          t.set(n, i);
        }
      }
    return t;
  }
  async complete() {
    const e = await (async function __PRIVATE_localStoreApplyBundledDocuments(
        e,
        t,
        n,
        i
      ) {
        const s = __PRIVATE_debugCast(e);
        let o = __PRIVATE_documentKeySet(),
          u = __PRIVATE_mutableDocumentMap();
        for (const e of n) {
          const n = t.hs(e.metadata.name);
          e.document && (o = o.add(n));
          const i = t.Ps(e);
          i.setReadTime(t.Is(e.metadata.readTime)), (u = u.insert(n, i));
        }
        const l = s.ss.newChangeBuffer({ trackRemovals: !0 }),
          _ = await __PRIVATE_localStoreAllocateTarget(
            s,
            (function __PRIVATE_umbrellaTarget(e) {
              return __PRIVATE_queryToTarget(
                __PRIVATE_newQueryForPath(
                  ResourcePath.fromString(`__bundle__/docs/${e}`)
                )
              );
            })(i)
          );
        return s.persistence.runTransaction(
          "Apply bundle documents",
          "readwrite",
          (e) =>
            __PRIVATE_populateDocumentChangeBuffer(e, l, u)
              .next((t) => (l.apply(e), t))
              .next((t) =>
                s.qr
                  .removeMatchingKeysForTargetId(e, _.targetId)
                  .next(() => s.qr.addMatchingKeys(e, o, _.targetId))
                  .next(() =>
                    s.localDocuments.getLocalViewOfDocuments(e, t.us, t.cs)
                  )
                  .next(() => t.us)
              )
        );
      })(
        this.localStore,
        new __PRIVATE_BundleConverterImpl(this.serializer),
        this.documents,
        this.X_.id
      ),
      t = this.ta(this.documents);
    for (const e of this.queries)
      await __PRIVATE_localStoreSaveNamedQuery(
        this.localStore,
        e,
        t.get(e.name)
      );
    return (
      (this.progress.taskState = "Success"),
      { progress: this.progress, na: this.collectionGroups, ra: e }
    );
  }
}
function __PRIVATE_bundleInitialProgress(e) {
  return {
    taskState: "Running",
    documentsLoaded: 0,
    bytesLoaded: 0,
    totalDocuments: e.totalDocuments,
    totalBytes: e.totalBytes,
  };
}
class __PRIVATE_AddedLimboDocument {
  constructor(e) {
    this.key = e;
  }
}
class __PRIVATE_RemovedLimboDocument {
  constructor(e) {
    this.key = e;
  }
}
class __PRIVATE_View {
  constructor(e, t) {
    (this.query = e),
      (this.ia = t),
      (this.sa = null),
      (this.hasCachedResults = !1),
      (this.current = !1),
      (this.oa = __PRIVATE_documentKeySet()),
      (this.mutatedKeys = __PRIVATE_documentKeySet()),
      (this._a = __PRIVATE_newQueryComparator(e)),
      (this.aa = new DocumentSet(this._a));
  }
  get ua() {
    return this.ia;
  }
  ca(e, t) {
    const n = t ? t.la : new __PRIVATE_DocumentChangeSet(),
      i = t ? t.aa : this.aa;
    let s = t ? t.mutatedKeys : this.mutatedKeys,
      o = i,
      u = !1;
    const l =
        "F" === this.query.limitType && i.size === this.query.limit
          ? i.last()
          : null,
      _ =
        "L" === this.query.limitType && i.size === this.query.limit
          ? i.first()
          : null;
    if (
      (e.inorderTraversal((e, t) => {
        const h = i.get(e),
          d = __PRIVATE_queryMatches(this.query, t) ? t : null,
          m = !!h && this.mutatedKeys.has(h.key),
          f =
            !!d &&
            (d.hasLocalMutations ||
              (this.mutatedKeys.has(d.key) && d.hasCommittedMutations));
        let g = !1;
        h && d
          ? h.data.isEqual(d.data)
            ? m !== f && (n.track({ type: 3, doc: d }), (g = !0))
            : this.ha(h, d) ||
              (n.track({ type: 2, doc: d }),
              (g = !0),
              ((l && this._a(d, l) > 0) || (_ && this._a(d, _) < 0)) &&
                (u = !0))
          : !h && d
          ? (n.track({ type: 0, doc: d }), (g = !0))
          : h &&
            !d &&
            (n.track({ type: 1, doc: h }), (g = !0), (l || _) && (u = !0)),
          g &&
            (d
              ? ((o = o.add(d)), (s = f ? s.add(e) : s.delete(e)))
              : ((o = o.delete(e)), (s = s.delete(e))));
      }),
      null !== this.query.limit)
    )
      for (; o.size > this.query.limit; ) {
        const e = "F" === this.query.limitType ? o.last() : o.first();
        (o = o.delete(e.key)),
          (s = s.delete(e.key)),
          n.track({ type: 1, doc: e });
      }
    return { aa: o, la: n, Zi: u, mutatedKeys: s };
  }
  ha(e, t) {
    return (
      e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations
    );
  }
  applyChanges(e, t, n, i) {
    const s = this.aa;
    (this.aa = e.aa), (this.mutatedKeys = e.mutatedKeys);
    const o = e.la.L_();
    o.sort(
      (e, t) =>
        (function __PRIVATE_compareChangeType(e, t) {
          const order = (e) => {
            switch (e) {
              case 0:
                return 1;
              case 2:
              case 3:
                return 2;
              case 1:
                return 0;
              default:
                return fail();
            }
          };
          return order(e) - order(t);
        })(e.type, t.type) || this._a(e.doc, t.doc)
    ),
      this.Pa(n),
      (i = null != i && i);
    const u = t && !i ? this.Ia() : [],
      l = 0 === this.oa.size && this.current && !i ? 1 : 0,
      _ = l !== this.sa;
    return (
      (this.sa = l),
      0 !== o.length || _
        ? {
            snapshot: new ViewSnapshot(
              this.query,
              e.aa,
              s,
              o,
              e.mutatedKeys,
              0 === l,
              _,
              !1,
              !!n && n.resumeToken.approximateByteSize() > 0
            ),
            Ta: u,
          }
        : { Ta: u }
    );
  }
  Q_(e) {
    return this.current && "Offline" === e
      ? ((this.current = !1),
        this.applyChanges(
          {
            aa: this.aa,
            la: new __PRIVATE_DocumentChangeSet(),
            mutatedKeys: this.mutatedKeys,
            Zi: !1,
          },
          !1
        ))
      : { Ta: [] };
  }
  Ea(e) {
    return (
      !this.ia.has(e) && !!this.aa.has(e) && !this.aa.get(e).hasLocalMutations
    );
  }
  Pa(e) {
    e &&
      (e.addedDocuments.forEach((e) => (this.ia = this.ia.add(e))),
      e.modifiedDocuments.forEach((e) => {}),
      e.removedDocuments.forEach((e) => (this.ia = this.ia.delete(e))),
      (this.current = e.current));
  }
  Ia() {
    if (!this.current) return [];
    const e = this.oa;
    (this.oa = __PRIVATE_documentKeySet()),
      this.aa.forEach((e) => {
        this.Ea(e.key) && (this.oa = this.oa.add(e.key));
      });
    const t = [];
    return (
      e.forEach((e) => {
        this.oa.has(e) || t.push(new __PRIVATE_RemovedLimboDocument(e));
      }),
      this.oa.forEach((n) => {
        e.has(n) || t.push(new __PRIVATE_AddedLimboDocument(n));
      }),
      t
    );
  }
  da(e) {
    (this.ia = e.ls), (this.oa = __PRIVATE_documentKeySet());
    const t = this.ca(e.documents);
    return this.applyChanges(t, !0);
  }
  Aa() {
    return ViewSnapshot.fromInitialDocuments(
      this.query,
      this.aa,
      this.mutatedKeys,
      0 === this.sa,
      this.hasCachedResults
    );
  }
}
class __PRIVATE_QueryView {
  constructor(e, t, n) {
    (this.query = e), (this.targetId = t), (this.view = n);
  }
}
class LimboResolution {
  constructor(e) {
    (this.key = e), (this.Ra = !1);
  }
}
class __PRIVATE_SyncEngineImpl {
  constructor(e, t, n, i, s, o) {
    (this.localStore = e),
      (this.remoteStore = t),
      (this.eventManager = n),
      (this.sharedClientState = i),
      (this.currentUser = s),
      (this.maxConcurrentLimboResolutions = o),
      (this.Va = {}),
      (this.ma = new ObjectMap(
        (e) => __PRIVATE_canonifyQuery(e),
        __PRIVATE_queryEquals
      )),
      (this.fa = new Map()),
      (this.ga = new Set()),
      (this.pa = new SortedMap(DocumentKey.comparator)),
      (this.ya = new Map()),
      (this.wa = new __PRIVATE_ReferenceSet()),
      (this.Sa = {}),
      (this.ba = new Map()),
      (this.Da = __PRIVATE_TargetIdGenerator.Nn()),
      (this.onlineState = "Unknown"),
      (this.Ca = void 0);
  }
  get isPrimaryClient() {
    return !0 === this.Ca;
  }
}
async function __PRIVATE_syncEngineListen(e, t) {
  const n = __PRIVATE_ensureWatchCallbacks(e);
  let i, s;
  const o = n.ma.get(t);
  if (o)
    (i = o.targetId),
      n.sharedClientState.addLocalQueryTarget(i),
      (s = o.view.Aa());
  else {
    const e = await __PRIVATE_localStoreAllocateTarget(
        n.localStore,
        __PRIVATE_queryToTarget(t)
      ),
      o = n.sharedClientState.addLocalQueryTarget(e.targetId);
    (i = e.targetId),
      (s = await __PRIVATE_initializeViewAndComputeSnapshot(
        n,
        t,
        i,
        "current" === o,
        e.resumeToken
      )),
      n.isPrimaryClient && __PRIVATE_remoteStoreListen(n.remoteStore, e);
  }
  return s;
}
async function __PRIVATE_initializeViewAndComputeSnapshot(e, t, n, i, s) {
  e.va = (t, n, i) =>
    (async function __PRIVATE_applyDocChanges(e, t, n, i) {
      let s = t.view.ca(n);
      s.Zi &&
        (s = await __PRIVATE_localStoreExecuteQuery(
          e.localStore,
          t.query,
          !1
        ).then(({ documents: e }) => t.view.ca(e, s)));
      const o = i && i.targetChanges.get(t.targetId),
        u = i && null != i.targetMismatches.get(t.targetId),
        l = t.view.applyChanges(s, e.isPrimaryClient, o, u);
      return __PRIVATE_updateTrackedLimbos(e, t.targetId, l.Ta), l.snapshot;
    })(e, t, n, i);
  const o = await __PRIVATE_localStoreExecuteQuery(e.localStore, t, !0),
    u = new __PRIVATE_View(t, o.ls),
    l = u.ca(o.documents),
    _ = TargetChange.createSynthesizedTargetChangeForCurrentChange(
      n,
      i && "Offline" !== e.onlineState,
      s
    ),
    h = u.applyChanges(l, e.isPrimaryClient, _);
  __PRIVATE_updateTrackedLimbos(e, n, h.Ta);
  const d = new __PRIVATE_QueryView(t, n, u);
  return (
    e.ma.set(t, d),
    e.fa.has(n) ? e.fa.get(n).push(t) : e.fa.set(n, [t]),
    h.snapshot
  );
}
async function __PRIVATE_syncEngineUnlisten(e, t) {
  const n = __PRIVATE_debugCast(e),
    i = n.ma.get(t),
    s = n.fa.get(i.targetId);
  if (s.length > 1)
    return (
      n.fa.set(
        i.targetId,
        s.filter((e) => !__PRIVATE_queryEquals(e, t))
      ),
      void n.ma.delete(t)
    );
  n.isPrimaryClient
    ? (n.sharedClientState.removeLocalQueryTarget(i.targetId),
      n.sharedClientState.isActiveQueryTarget(i.targetId) ||
        (await __PRIVATE_localStoreReleaseTarget(n.localStore, i.targetId, !1)
          .then(() => {
            n.sharedClientState.clearQueryState(i.targetId),
              __PRIVATE_remoteStoreUnlisten(n.remoteStore, i.targetId),
              __PRIVATE_removeAndCleanupTarget(n, i.targetId);
          })
          .catch(__PRIVATE_ignoreIfPrimaryLeaseLoss)))
    : (__PRIVATE_removeAndCleanupTarget(n, i.targetId),
      await __PRIVATE_localStoreReleaseTarget(n.localStore, i.targetId, !0));
}
async function __PRIVATE_syncEngineApplyRemoteEvent(e, t) {
  const n = __PRIVATE_debugCast(e);
  try {
    const e = await (function __PRIVATE_localStoreApplyRemoteEventToLocalCache(
      e,
      t
    ) {
      const n = __PRIVATE_debugCast(e),
        i = t.snapshotVersion;
      let s = n.ts;
      return n.persistence
        .runTransaction("Apply remote event", "readwrite-primary", (e) => {
          const o = n.ss.newChangeBuffer({ trackRemovals: !0 });
          s = n.ts;
          const u = [];
          t.targetChanges.forEach((o, l) => {
            const _ = s.get(l);
            if (!_) return;
            u.push(
              n.qr
                .removeMatchingKeys(e, o.removedDocuments, l)
                .next(() => n.qr.addMatchingKeys(e, o.addedDocuments, l))
            );
            let h = _.withSequenceNumber(e.currentSequenceNumber);
            null !== t.targetMismatches.get(l)
              ? (h = h
                  .withResumeToken(
                    ByteString.EMPTY_BYTE_STRING,
                    SnapshotVersion.min()
                  )
                  .withLastLimboFreeSnapshotVersion(SnapshotVersion.min()))
              : o.resumeToken.approximateByteSize() > 0 &&
                (h = h.withResumeToken(o.resumeToken, i)),
              (s = s.insert(l, h)),
              (function __PRIVATE_shouldPersistTargetData(e, t, n) {
                return (
                  0 === e.resumeToken.approximateByteSize() ||
                  t.snapshotVersion.toMicroseconds() -
                    e.snapshotVersion.toMicroseconds() >=
                    3e8 ||
                  n.addedDocuments.size +
                    n.modifiedDocuments.size +
                    n.removedDocuments.size >
                    0
                );
              })(_, h, o) && u.push(n.qr.updateTargetData(e, h));
          });
          let l = __PRIVATE_mutableDocumentMap(),
            _ = __PRIVATE_documentKeySet();
          if (
            (t.documentUpdates.forEach((i) => {
              t.resolvedLimboDocuments.has(i) &&
                u.push(
                  n.persistence.referenceDelegate.updateLimboDocument(e, i)
                );
            }),
            u.push(
              __PRIVATE_populateDocumentChangeBuffer(
                e,
                o,
                t.documentUpdates
              ).next((e) => {
                (l = e.us), (_ = e.cs);
              })
            ),
            !i.isEqual(SnapshotVersion.min()))
          ) {
            const t = n.qr
              .getLastRemoteSnapshotVersion(e)
              .next((t) =>
                n.qr.setTargetsMetadata(e, e.currentSequenceNumber, i)
              );
            u.push(t);
          }
          return PersistencePromise.waitFor(u)
            .next(() => o.apply(e))
            .next(() => n.localDocuments.getLocalViewOfDocuments(e, l, _))
            .next(() => l);
        })
        .then((e) => ((n.ts = s), e));
    })(n.localStore, t);
    t.targetChanges.forEach((e, t) => {
      const i = n.ya.get(t);
      i &&
        (__PRIVATE_hardAssert(
          e.addedDocuments.size +
            e.modifiedDocuments.size +
            e.removedDocuments.size <=
            1
        ),
        e.addedDocuments.size > 0
          ? (i.Ra = !0)
          : e.modifiedDocuments.size > 0
          ? __PRIVATE_hardAssert(i.Ra)
          : e.removedDocuments.size > 0 &&
            (__PRIVATE_hardAssert(i.Ra), (i.Ra = !1)));
    }),
      await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n, e, t);
  } catch (e) {
    await __PRIVATE_ignoreIfPrimaryLeaseLoss(e);
  }
}
function __PRIVATE_syncEngineApplyOnlineStateChange(e, t, n) {
  const i = __PRIVATE_debugCast(e);
  if ((i.isPrimaryClient && 0 === n) || (!i.isPrimaryClient && 1 === n)) {
    const e = [];
    i.ma.forEach((n, i) => {
      const s = i.view.Q_(t);
      s.snapshot && e.push(s.snapshot);
    }),
      (function __PRIVATE_eventManagerOnOnlineStateChange(e, t) {
        const n = __PRIVATE_debugCast(e);
        n.onlineState = t;
        let i = !1;
        n.queries.forEach((e, n) => {
          for (const e of n.listeners) e.Q_(t) && (i = !0);
        }),
          i && __PRIVATE_raiseSnapshotsInSyncEvent(n);
      })(i.eventManager, t),
      e.length && i.Va.a_(e),
      (i.onlineState = t),
      i.isPrimaryClient && i.sharedClientState.setOnlineState(t);
  }
}
async function __PRIVATE_syncEngineRejectListen(e, t, n) {
  const i = __PRIVATE_debugCast(e);
  i.sharedClientState.updateQueryState(t, "rejected", n);
  const s = i.ya.get(t),
    o = s && s.key;
  if (o) {
    let e = new SortedMap(DocumentKey.comparator);
    e = e.insert(o, MutableDocument.newNoDocument(o, SnapshotVersion.min()));
    const n = __PRIVATE_documentKeySet().add(o),
      s = new RemoteEvent(
        SnapshotVersion.min(),
        new Map(),
        new SortedMap(__PRIVATE_primitiveComparator),
        e,
        n
      );
    await __PRIVATE_syncEngineApplyRemoteEvent(i, s),
      (i.pa = i.pa.remove(o)),
      i.ya.delete(t),
      __PRIVATE_pumpEnqueuedLimboResolutions(i);
  } else
    await __PRIVATE_localStoreReleaseTarget(i.localStore, t, !1)
      .then(() => __PRIVATE_removeAndCleanupTarget(i, t, n))
      .catch(__PRIVATE_ignoreIfPrimaryLeaseLoss);
}
async function __PRIVATE_syncEngineApplySuccessfulWrite(e, t) {
  const n = __PRIVATE_debugCast(e),
    i = t.batch.batchId;
  try {
    const e = await (function __PRIVATE_localStoreAcknowledgeBatch(e, t) {
      const n = __PRIVATE_debugCast(e);
      return n.persistence.runTransaction(
        "Acknowledge batch",
        "readwrite-primary",
        (e) => {
          const i = t.batch.keys(),
            s = n.ss.newChangeBuffer({ trackRemovals: !0 });
          return (function __PRIVATE_applyWriteToRemoteDocuments(e, t, n, i) {
            const s = n.batch,
              o = s.keys();
            let u = PersistencePromise.resolve();
            return (
              o.forEach((e) => {
                u = u
                  .next(() => i.getEntry(t, e))
                  .next((t) => {
                    const o = n.docVersions.get(e);
                    __PRIVATE_hardAssert(null !== o),
                      t.version.compareTo(o) < 0 &&
                        (s.applyToRemoteDocument(t, n),
                        t.isValidDocument() &&
                          (t.setReadTime(n.commitVersion), i.addEntry(t)));
                  });
              }),
              u.next(() => e.mutationQueue.removeMutationBatch(t, s))
            );
          })(n, e, t, s)
            .next(() => s.apply(e))
            .next(() => n.mutationQueue.performConsistencyCheck(e))
            .next(() =>
              n.documentOverlayCache.removeOverlaysForBatchId(
                e,
                i,
                t.batch.batchId
              )
            )
            .next(() =>
              n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
                e,
                (function __PRIVATE_getKeysWithTransformResults(e) {
                  let t = __PRIVATE_documentKeySet();
                  for (let n = 0; n < e.mutationResults.length; ++n)
                    e.mutationResults[n].transformResults.length > 0 &&
                      (t = t.add(e.batch.mutations[n].key));
                  return t;
                })(t)
              )
            )
            .next(() => n.localDocuments.getDocuments(e, i));
        }
      );
    })(n.localStore, t);
    __PRIVATE_processUserCallback(n, i, null),
      __PRIVATE_triggerPendingWritesCallbacks(n, i),
      n.sharedClientState.updateMutationState(i, "acknowledged"),
      await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n, e);
  } catch (e) {
    await __PRIVATE_ignoreIfPrimaryLeaseLoss(e);
  }
}
async function __PRIVATE_syncEngineRejectFailedWrite(e, t, n) {
  const i = __PRIVATE_debugCast(e);
  try {
    const e = await (function __PRIVATE_localStoreRejectBatch(e, t) {
      const n = __PRIVATE_debugCast(e);
      return n.persistence.runTransaction(
        "Reject batch",
        "readwrite-primary",
        (e) => {
          let i;
          return n.mutationQueue
            .lookupMutationBatch(e, t)
            .next(
              (t) => (
                __PRIVATE_hardAssert(null !== t),
                (i = t.keys()),
                n.mutationQueue.removeMutationBatch(e, t)
              )
            )
            .next(() => n.mutationQueue.performConsistencyCheck(e))
            .next(() =>
              n.documentOverlayCache.removeOverlaysForBatchId(e, i, t)
            )
            .next(() =>
              n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e, i)
            )
            .next(() => n.localDocuments.getDocuments(e, i));
        }
      );
    })(i.localStore, t);
    __PRIVATE_processUserCallback(i, t, n),
      __PRIVATE_triggerPendingWritesCallbacks(i, t),
      i.sharedClientState.updateMutationState(t, "rejected", n),
      await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(i, e);
  } catch (n) {
    await __PRIVATE_ignoreIfPrimaryLeaseLoss(n);
  }
}
function __PRIVATE_triggerPendingWritesCallbacks(e, t) {
  (e.ba.get(t) || []).forEach((e) => {
    e.resolve();
  }),
    e.ba.delete(t);
}
function __PRIVATE_processUserCallback(e, t, n) {
  const i = __PRIVATE_debugCast(e);
  let s = i.Sa[i.currentUser.toKey()];
  if (s) {
    const e = s.get(t);
    e && (n ? e.reject(n) : e.resolve(), (s = s.remove(t))),
      (i.Sa[i.currentUser.toKey()] = s);
  }
}
function __PRIVATE_removeAndCleanupTarget(e, t, n = null) {
  e.sharedClientState.removeLocalQueryTarget(t);
  for (const i of e.fa.get(t)) e.ma.delete(i), n && e.Va.Fa(i, n);
  e.fa.delete(t),
    e.isPrimaryClient &&
      e.wa.Rr(t).forEach((t) => {
        e.wa.containsKey(t) || __PRIVATE_removeLimboTarget(e, t);
      });
}
function __PRIVATE_removeLimboTarget(e, t) {
  e.ga.delete(t.path.canonicalString());
  const n = e.pa.get(t);
  null !== n &&
    (__PRIVATE_remoteStoreUnlisten(e.remoteStore, n),
    (e.pa = e.pa.remove(t)),
    e.ya.delete(n),
    __PRIVATE_pumpEnqueuedLimboResolutions(e));
}
function __PRIVATE_updateTrackedLimbos(e, t, n) {
  for (const i of n)
    i instanceof __PRIVATE_AddedLimboDocument
      ? (e.wa.addReference(i.key, t), __PRIVATE_trackLimboChange(e, i))
      : i instanceof __PRIVATE_RemovedLimboDocument
      ? (__PRIVATE_logDebug(
          "SyncEngine",
          "Document no longer in limbo: " + i.key
        ),
        e.wa.removeReference(i.key, t),
        e.wa.containsKey(i.key) || __PRIVATE_removeLimboTarget(e, i.key))
      : fail();
}
function __PRIVATE_trackLimboChange(e, t) {
  const n = t.key,
    i = n.path.canonicalString();
  e.pa.get(n) ||
    e.ga.has(i) ||
    (__PRIVATE_logDebug("SyncEngine", "New document in limbo: " + n),
    e.ga.add(i),
    __PRIVATE_pumpEnqueuedLimboResolutions(e));
}
function __PRIVATE_pumpEnqueuedLimboResolutions(e) {
  for (; e.ga.size > 0 && e.pa.size < e.maxConcurrentLimboResolutions; ) {
    const t = e.ga.values().next().value;
    e.ga.delete(t);
    const n = new DocumentKey(ResourcePath.fromString(t)),
      i = e.Da.next();
    e.ya.set(i, new LimboResolution(n)),
      (e.pa = e.pa.insert(n, i)),
      __PRIVATE_remoteStoreListen(
        e.remoteStore,
        new TargetData(
          __PRIVATE_queryToTarget(__PRIVATE_newQueryForPath(n.path)),
          i,
          "TargetPurposeLimboResolution",
          __PRIVATE_ListenSequence._e
        )
      );
  }
}
async function __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(e, t, n) {
  const i = __PRIVATE_debugCast(e),
    s = [],
    o = [],
    u = [];
  i.ma.isEmpty() ||
    (i.ma.forEach((e, l) => {
      u.push(
        i.va(l, t, n).then((e) => {
          if (
            ((e || n) &&
              i.isPrimaryClient &&
              i.sharedClientState.updateQueryState(
                l.targetId,
                (null == e ? void 0 : e.fromCache) ? "not-current" : "current"
              ),
            e)
          ) {
            s.push(e);
            const t = __PRIVATE_LocalViewChanges.Qi(l.targetId, e);
            o.push(t);
          }
        })
      );
    }),
    await Promise.all(u),
    i.Va.a_(s),
    await (async function __PRIVATE_localStoreNotifyLocalViewChanges(e, t) {
      const n = __PRIVATE_debugCast(e);
      try {
        await n.persistence.runTransaction(
          "notifyLocalViewChanges",
          "readwrite",
          (e) =>
            PersistencePromise.forEach(t, (t) =>
              PersistencePromise.forEach(t.ki, (i) =>
                n.persistence.referenceDelegate.addReference(e, t.targetId, i)
              ).next(() =>
                PersistencePromise.forEach(t.qi, (i) =>
                  n.persistence.referenceDelegate.removeReference(
                    e,
                    t.targetId,
                    i
                  )
                )
              )
            )
        );
      } catch (e) {
        if (!__PRIVATE_isIndexedDbTransactionError(e)) throw e;
        __PRIVATE_logDebug(
          "LocalStore",
          "Failed to update sequence numbers: " + e
        );
      }
      for (const e of t) {
        const t = e.targetId;
        if (!e.fromCache) {
          const e = n.ts.get(t),
            i = e.snapshotVersion,
            s = e.withLastLimboFreeSnapshotVersion(i);
          n.ts = n.ts.insert(t, s);
        }
      }
    })(i.localStore, o));
}
async function __PRIVATE_syncEngineHandleCredentialChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  if (!n.currentUser.isEqual(t)) {
    __PRIVATE_logDebug("SyncEngine", "User change. New user:", t.toKey());
    const e = await __PRIVATE_localStoreHandleUserChange(n.localStore, t);
    (n.currentUser = t),
      (function __PRIVATE_rejectOutstandingPendingWritesCallbacks(e, t) {
        e.ba.forEach((e) => {
          e.forEach((e) => {
            e.reject(new FirestoreError($e.CANCELLED, t));
          });
        }),
          e.ba.clear();
      })(n, "'waitForPendingWrites' promise is rejected due to a user change."),
      n.sharedClientState.handleUserChange(
        t,
        e.removedBatchIds,
        e.addedBatchIds
      ),
      await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n, e._s);
  }
}
function __PRIVATE_syncEngineGetRemoteKeysForTarget(e, t) {
  const n = __PRIVATE_debugCast(e),
    i = n.ya.get(t);
  if (i && i.Ra) return __PRIVATE_documentKeySet().add(i.key);
  {
    let e = __PRIVATE_documentKeySet();
    const i = n.fa.get(t);
    if (!i) return e;
    for (const t of i) {
      const i = n.ma.get(t);
      e = e.unionWith(i.view.ua);
    }
    return e;
  }
}
async function __PRIVATE_synchronizeViewAndComputeSnapshot(e, t) {
  const n = __PRIVATE_debugCast(e),
    i = await __PRIVATE_localStoreExecuteQuery(n.localStore, t.query, !0),
    s = t.view.da(i);
  return (
    n.isPrimaryClient && __PRIVATE_updateTrackedLimbos(n, t.targetId, s.Ta), s
  );
}
async function __PRIVATE_syncEngineSynchronizeWithChangedDocuments(e, t) {
  const n = __PRIVATE_debugCast(e);
  return __PRIVATE_localStoreGetNewDocumentChanges(n.localStore, t).then((e) =>
    __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n, e)
  );
}
async function __PRIVATE_syncEngineApplyBatchState(e, t, n, i) {
  const s = __PRIVATE_debugCast(e),
    o = await (function __PRIVATE_localStoreLookupMutationDocuments(e, t) {
      const n = __PRIVATE_debugCast(e),
        i = __PRIVATE_debugCast(n.mutationQueue);
      return n.persistence.runTransaction(
        "Lookup mutation documents",
        "readonly",
        (e) =>
          i
            .Cn(e, t)
            .next((t) =>
              t
                ? n.localDocuments.getDocuments(e, t)
                : PersistencePromise.resolve(null)
            )
      );
    })(s.localStore, t);
  null !== o
    ? ("pending" === n
        ? await __PRIVATE_fillWritePipeline(s.remoteStore)
        : "acknowledged" === n || "rejected" === n
        ? (__PRIVATE_processUserCallback(s, t, i || null),
          __PRIVATE_triggerPendingWritesCallbacks(s, t),
          (function __PRIVATE_localStoreRemoveCachedMutationBatchMetadata(
            e,
            t
          ) {
            __PRIVATE_debugCast(__PRIVATE_debugCast(e).mutationQueue).Fn(t);
          })(s.localStore, t))
        : fail(),
      await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(s, o))
    : __PRIVATE_logDebug(
        "SyncEngine",
        "Cannot apply mutation batch with id: " + t
      );
}
async function __PRIVATE_synchronizeQueryViewsAndRaiseSnapshots(e, t, n) {
  const i = __PRIVATE_debugCast(e),
    s = [],
    o = [];
  for (const e of t) {
    let t;
    const n = i.fa.get(e);
    if (n && 0 !== n.length) {
      t = await __PRIVATE_localStoreAllocateTarget(
        i.localStore,
        __PRIVATE_queryToTarget(n[0])
      );
      for (const e of n) {
        const t = i.ma.get(e),
          n = await __PRIVATE_synchronizeViewAndComputeSnapshot(i, t);
        n.snapshot && o.push(n.snapshot);
      }
    } else {
      const n = await __PRIVATE_localStoreGetCachedTarget(i.localStore, e);
      (t = await __PRIVATE_localStoreAllocateTarget(i.localStore, n)),
        await __PRIVATE_initializeViewAndComputeSnapshot(
          i,
          __PRIVATE_synthesizeTargetToQuery(n),
          e,
          !1,
          t.resumeToken
        );
    }
    s.push(t);
  }
  return i.Va.a_(o), s;
}
function __PRIVATE_synthesizeTargetToQuery(e) {
  return __PRIVATE_newQuery(
    e.path,
    e.collectionGroup,
    e.orderBy,
    e.filters,
    e.limit,
    "F",
    e.startAt,
    e.endAt
  );
}
function __PRIVATE_syncEngineGetActiveClients(e) {
  return (function __PRIVATE_localStoreGetActiveClients(e) {
    return __PRIVATE_debugCast(__PRIVATE_debugCast(e).persistence).Bi();
  })(__PRIVATE_debugCast(e).localStore);
}
async function __PRIVATE_syncEngineApplyTargetState(e, t, n, i) {
  const s = __PRIVATE_debugCast(e);
  if (s.Ca)
    return void __PRIVATE_logDebug(
      "SyncEngine",
      "Ignoring unexpected query state notification."
    );
  const o = s.fa.get(t);
  if (o && o.length > 0)
    switch (n) {
      case "current":
      case "not-current": {
        const e = await __PRIVATE_localStoreGetNewDocumentChanges(
            s.localStore,
            __PRIVATE_queryCollectionGroup(o[0])
          ),
          i = RemoteEvent.createSynthesizedRemoteEventForCurrentChange(
            t,
            "current" === n,
            ByteString.EMPTY_BYTE_STRING
          );
        await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(s, e, i);
        break;
      }
      case "rejected":
        await __PRIVATE_localStoreReleaseTarget(s.localStore, t, !0),
          __PRIVATE_removeAndCleanupTarget(s, t, i);
        break;
      default:
        fail();
    }
}
async function __PRIVATE_syncEngineApplyActiveTargetsChange(e, t, n) {
  const i = __PRIVATE_ensureWatchCallbacks(e);
  if (i.Ca) {
    for (const e of t) {
      if (i.fa.has(e)) {
        __PRIVATE_logDebug(
          "SyncEngine",
          "Adding an already active target " + e
        );
        continue;
      }
      const t = await __PRIVATE_localStoreGetCachedTarget(i.localStore, e),
        n = await __PRIVATE_localStoreAllocateTarget(i.localStore, t);
      await __PRIVATE_initializeViewAndComputeSnapshot(
        i,
        __PRIVATE_synthesizeTargetToQuery(t),
        n.targetId,
        !1,
        n.resumeToken
      ),
        __PRIVATE_remoteStoreListen(i.remoteStore, n);
    }
    for (const e of n)
      i.fa.has(e) &&
        (await __PRIVATE_localStoreReleaseTarget(i.localStore, e, !1)
          .then(() => {
            __PRIVATE_remoteStoreUnlisten(i.remoteStore, e),
              __PRIVATE_removeAndCleanupTarget(i, e);
          })
          .catch(__PRIVATE_ignoreIfPrimaryLeaseLoss));
  }
}
function __PRIVATE_ensureWatchCallbacks(e) {
  const t = __PRIVATE_debugCast(e);
  return (
    (t.remoteStore.remoteSyncer.applyRemoteEvent =
      __PRIVATE_syncEngineApplyRemoteEvent.bind(null, t)),
    (t.remoteStore.remoteSyncer.getRemoteKeysForTarget =
      __PRIVATE_syncEngineGetRemoteKeysForTarget.bind(null, t)),
    (t.remoteStore.remoteSyncer.rejectListen =
      __PRIVATE_syncEngineRejectListen.bind(null, t)),
    (t.Va.a_ = __PRIVATE_eventManagerOnWatchChange.bind(null, t.eventManager)),
    (t.Va.Fa = __PRIVATE_eventManagerOnWatchError.bind(null, t.eventManager)),
    t
  );
}
function __PRIVATE_syncEngineEnsureWriteCallbacks(e) {
  const t = __PRIVATE_debugCast(e);
  return (
    (t.remoteStore.remoteSyncer.applySuccessfulWrite =
      __PRIVATE_syncEngineApplySuccessfulWrite.bind(null, t)),
    (t.remoteStore.remoteSyncer.rejectFailedWrite =
      __PRIVATE_syncEngineRejectFailedWrite.bind(null, t)),
    t
  );
}
class MemoryOfflineComponentProvider {
  constructor() {
    this.synchronizeTabs = !1;
  }
  async initialize(e) {
    (this.serializer = __PRIVATE_newSerializer(e.databaseInfo.databaseId)),
      (this.sharedClientState = this.createSharedClientState(e)),
      (this.persistence = this.createPersistence(e)),
      await this.persistence.start(),
      (this.localStore = this.createLocalStore(e)),
      (this.gcScheduler = this.createGarbageCollectionScheduler(
        e,
        this.localStore
      )),
      (this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(
        e,
        this.localStore
      ));
  }
  createGarbageCollectionScheduler(e, t) {
    return null;
  }
  createIndexBackfillerScheduler(e, t) {
    return null;
  }
  createLocalStore(e) {
    return __PRIVATE_newLocalStore(
      this.persistence,
      new __PRIVATE_QueryEngine(),
      e.initialUser,
      this.serializer
    );
  }
  createPersistence(e) {
    return new __PRIVATE_MemoryPersistence(
      __PRIVATE_MemoryEagerDelegate.jr,
      this.serializer
    );
  }
  createSharedClientState(e) {
    return new __PRIVATE_MemorySharedClientState();
  }
  async terminate() {
    this.gcScheduler && this.gcScheduler.stop(),
      await this.sharedClientState.shutdown(),
      await this.persistence.shutdown();
  }
}
class __PRIVATE_LruGcMemoryOfflineComponentProvider extends MemoryOfflineComponentProvider {
  constructor(e) {
    super(), (this.cacheSizeBytes = e);
  }
  createGarbageCollectionScheduler(e, t) {
    __PRIVATE_hardAssert(
      this.persistence.referenceDelegate instanceof __PRIVATE_MemoryLruDelegate
    );
    const n = this.persistence.referenceDelegate.garbageCollector;
    return new __PRIVATE_LruScheduler(n, e.asyncQueue, t);
  }
  createPersistence(e) {
    const t =
      void 0 !== this.cacheSizeBytes
        ? LruParams.withCacheSize(this.cacheSizeBytes)
        : LruParams.DEFAULT;
    return new __PRIVATE_MemoryPersistence(
      (e) => __PRIVATE_MemoryLruDelegate.jr(e, t),
      this.serializer
    );
  }
}
class __PRIVATE_IndexedDbOfflineComponentProvider extends MemoryOfflineComponentProvider {
  constructor(e, t, n) {
    super(),
      (this.xa = e),
      (this.cacheSizeBytes = t),
      (this.forceOwnership = n),
      (this.synchronizeTabs = !1);
  }
  async initialize(e) {
    await super.initialize(e),
      await this.xa.initialize(this, e),
      await __PRIVATE_syncEngineEnsureWriteCallbacks(this.xa.syncEngine),
      await __PRIVATE_fillWritePipeline(this.xa.remoteStore),
      await this.persistence.mi(
        () => (
          this.gcScheduler &&
            !this.gcScheduler.started &&
            this.gcScheduler.start(),
          this.indexBackfillerScheduler &&
            !this.indexBackfillerScheduler.started &&
            this.indexBackfillerScheduler.start(),
          Promise.resolve()
        )
      );
  }
  createLocalStore(e) {
    return __PRIVATE_newLocalStore(
      this.persistence,
      new __PRIVATE_QueryEngine(),
      e.initialUser,
      this.serializer
    );
  }
  createGarbageCollectionScheduler(e, t) {
    const n = this.persistence.referenceDelegate.garbageCollector;
    return new __PRIVATE_LruScheduler(n, e.asyncQueue, t);
  }
  createIndexBackfillerScheduler(e, t) {
    const n = new __PRIVATE_IndexBackfiller(t, this.persistence);
    return new __PRIVATE_IndexBackfillerScheduler(e.asyncQueue, n);
  }
  createPersistence(e) {
    const t = __PRIVATE_indexedDbStoragePrefix(
        e.databaseInfo.databaseId,
        e.databaseInfo.persistenceKey
      ),
      n =
        void 0 !== this.cacheSizeBytes
          ? LruParams.withCacheSize(this.cacheSizeBytes)
          : LruParams.DEFAULT;
    return new __PRIVATE_IndexedDbPersistence(
      this.synchronizeTabs,
      t,
      e.clientId,
      n,
      e.asyncQueue,
      __PRIVATE_getWindow(),
      getDocument(),
      this.serializer,
      this.sharedClientState,
      !!this.forceOwnership
    );
  }
  createSharedClientState(e) {
    return new __PRIVATE_MemorySharedClientState();
  }
}
class __PRIVATE_MultiTabOfflineComponentProvider extends __PRIVATE_IndexedDbOfflineComponentProvider {
  constructor(e, t) {
    super(e, t, !1),
      (this.xa = e),
      (this.cacheSizeBytes = t),
      (this.synchronizeTabs = !0);
  }
  async initialize(e) {
    await super.initialize(e);
    const t = this.xa.syncEngine;
    this.sharedClientState instanceof __PRIVATE_WebStorageSharedClientState &&
      ((this.sharedClientState.syncEngine = {
        Ys: __PRIVATE_syncEngineApplyBatchState.bind(null, t),
        Zs: __PRIVATE_syncEngineApplyTargetState.bind(null, t),
        Xs: __PRIVATE_syncEngineApplyActiveTargetsChange.bind(null, t),
        Bi: __PRIVATE_syncEngineGetActiveClients.bind(null, t),
        Js: __PRIVATE_syncEngineSynchronizeWithChangedDocuments.bind(null, t),
      }),
      await this.sharedClientState.start()),
      await this.persistence.mi(async (e) => {
        await (async function __PRIVATE_syncEngineApplyPrimaryState(e, t) {
          const n = __PRIVATE_debugCast(e);
          if (
            (__PRIVATE_ensureWatchCallbacks(n),
            __PRIVATE_syncEngineEnsureWriteCallbacks(n),
            !0 === t && !0 !== n.Ca)
          ) {
            const e = n.sharedClientState.getAllActiveQueryTargets(),
              t = await __PRIVATE_synchronizeQueryViewsAndRaiseSnapshots(
                n,
                e.toArray()
              );
            (n.Ca = !0),
              await __PRIVATE_remoteStoreApplyPrimaryState(n.remoteStore, !0);
            for (const e of t) __PRIVATE_remoteStoreListen(n.remoteStore, e);
          } else if (!1 === t && !1 !== n.Ca) {
            const e = [];
            let t = Promise.resolve();
            n.fa.forEach((i, s) => {
              n.sharedClientState.isLocalQueryTarget(s)
                ? e.push(s)
                : (t = t.then(
                    () => (
                      __PRIVATE_removeAndCleanupTarget(n, s),
                      __PRIVATE_localStoreReleaseTarget(n.localStore, s, !0)
                    )
                  )),
                __PRIVATE_remoteStoreUnlisten(n.remoteStore, s);
            }),
              await t,
              await __PRIVATE_synchronizeQueryViewsAndRaiseSnapshots(n, e),
              (function __PRIVATE_resetLimboDocuments(e) {
                const t = __PRIVATE_debugCast(e);
                t.ya.forEach((e, n) => {
                  __PRIVATE_remoteStoreUnlisten(t.remoteStore, n);
                }),
                  t.wa.Vr(),
                  (t.ya = new Map()),
                  (t.pa = new SortedMap(DocumentKey.comparator));
              })(n),
              (n.Ca = !1),
              await __PRIVATE_remoteStoreApplyPrimaryState(n.remoteStore, !1);
          }
        })(this.xa.syncEngine, e),
          this.gcScheduler &&
            (e && !this.gcScheduler.started
              ? this.gcScheduler.start()
              : e || this.gcScheduler.stop()),
          this.indexBackfillerScheduler &&
            (e && !this.indexBackfillerScheduler.started
              ? this.indexBackfillerScheduler.start()
              : e || this.indexBackfillerScheduler.stop());
      });
  }
  createSharedClientState(e) {
    const t = __PRIVATE_getWindow();
    if (!__PRIVATE_WebStorageSharedClientState.D(t))
      throw new FirestoreError(
        $e.UNIMPLEMENTED,
        "IndexedDB persistence is only available on platforms that support LocalStorage."
      );
    const n = __PRIVATE_indexedDbStoragePrefix(
      e.databaseInfo.databaseId,
      e.databaseInfo.persistenceKey
    );
    return new __PRIVATE_WebStorageSharedClientState(
      t,
      e.asyncQueue,
      n,
      e.clientId,
      e.initialUser
    );
  }
}
class OnlineComponentProvider {
  async initialize(e, t) {
    this.localStore ||
      ((this.localStore = e.localStore),
      (this.sharedClientState = e.sharedClientState),
      (this.datastore = this.createDatastore(t)),
      (this.remoteStore = this.createRemoteStore(t)),
      (this.eventManager = this.createEventManager(t)),
      (this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
      (this.sharedClientState.onlineStateHandler = (e) =>
        __PRIVATE_syncEngineApplyOnlineStateChange(this.syncEngine, e, 1)),
      (this.remoteStore.remoteSyncer.handleCredentialChange =
        __PRIVATE_syncEngineHandleCredentialChange.bind(null, this.syncEngine)),
      await __PRIVATE_remoteStoreApplyPrimaryState(
        this.remoteStore,
        this.syncEngine.isPrimaryClient
      ));
  }
  createEventManager(e) {
    return (function __PRIVATE_newEventManager() {
      return new __PRIVATE_EventManagerImpl();
    })();
  }
  createDatastore(e) {
    const t = __PRIVATE_newSerializer(e.databaseInfo.databaseId),
      n = (function __PRIVATE_newConnection(e) {
        return new __PRIVATE_WebChannelConnection(e);
      })(e.databaseInfo);
    return (function __PRIVATE_newDatastore(e, t, n, i) {
      return new __PRIVATE_DatastoreImpl(e, t, n, i);
    })(e.authCredentials, e.appCheckCredentials, n, t);
  }
  createRemoteStore(e) {
    return (function __PRIVATE_newRemoteStore(e, t, n, i, s) {
      return new __PRIVATE_RemoteStoreImpl(e, t, n, i, s);
    })(
      this.localStore,
      this.datastore,
      e.asyncQueue,
      (e) => __PRIVATE_syncEngineApplyOnlineStateChange(this.syncEngine, e, 0),
      (function __PRIVATE_newConnectivityMonitor() {
        return __PRIVATE_BrowserConnectivityMonitor.D()
          ? new __PRIVATE_BrowserConnectivityMonitor()
          : new __PRIVATE_NoopConnectivityMonitor();
      })()
    );
  }
  createSyncEngine(e, t) {
    return (function __PRIVATE_newSyncEngine(e, t, n, i, s, o, u) {
      const l = new __PRIVATE_SyncEngineImpl(e, t, n, i, s, o);
      return u && (l.Ca = !0), l;
    })(
      this.localStore,
      this.remoteStore,
      this.eventManager,
      this.sharedClientState,
      e.initialUser,
      e.maxConcurrentLimboResolutions,
      t
    );
  }
  terminate() {
    return (async function __PRIVATE_remoteStoreShutdown(e) {
      const t = __PRIVATE_debugCast(e);
      __PRIVATE_logDebug("RemoteStore", "RemoteStore shutting down."),
        t.C_.add(5),
        await __PRIVATE_disableNetworkInternal(t),
        t.F_.shutdown(),
        t.M_.set("Unknown");
    })(this.remoteStore);
  }
}
function __PRIVATE_toByteStreamReaderHelper(e, t = 10240) {
  let n = 0;
  return {
    async read() {
      if (n < e.byteLength) {
        const i = { value: e.slice(n, n + t), done: !1 };
        return (n += t), i;
      }
      return { done: !0 };
    },
    async cancel() {},
    releaseLock() {},
    closed: Promise.resolve(),
  };
}
class __PRIVATE_AsyncObserver {
  constructor(e) {
    (this.observer = e), (this.muted = !1);
  }
  next(e) {
    this.observer.next && this.Oa(this.observer.next, e);
  }
  error(e) {
    this.observer.error
      ? this.Oa(this.observer.error, e)
      : __PRIVATE_logError(
          "Uncaught Error in snapshot listener:",
          e.toString()
        );
  }
  Na() {
    this.muted = !0;
  }
  Oa(e, t) {
    this.muted ||
      setTimeout(() => {
        this.muted || e(t);
      }, 0);
  }
}
class __PRIVATE_BundleReaderImpl {
  constructor(e, t) {
    (this.Ba = e),
      (this.serializer = t),
      (this.metadata = new __PRIVATE_Deferred()),
      (this.buffer = new Uint8Array()),
      (this.La = (function __PRIVATE_newTextDecoder() {
        return new TextDecoder("utf-8");
      })()),
      this.ka().then(
        (e) => {
          e && e.Z_()
            ? this.metadata.resolve(e.Y_.metadata)
            : this.metadata.reject(
                new Error(
                  `The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(
                    null == e ? void 0 : e.Y_
                  )}`
                )
              );
        },
        (e) => this.metadata.reject(e)
      );
  }
  close() {
    return this.Ba.cancel();
  }
  async getMetadata() {
    return this.metadata.promise;
  }
  async Ma() {
    return await this.getMetadata(), this.ka();
  }
  async ka() {
    const e = await this.qa();
    if (null === e) return null;
    const t = this.La.decode(e),
      n = Number(t);
    isNaN(n) && this.Qa(`length string (${t}) is not valid number`);
    const i = await this.Ka(n);
    return new __PRIVATE_SizedBundleElement(JSON.parse(i), e.length + n);
  }
  $a() {
    return this.buffer.findIndex((e) => e === "{".charCodeAt(0));
  }
  async qa() {
    for (; this.$a() < 0 && !(await this.Ua()); );
    if (0 === this.buffer.length) return null;
    const e = this.$a();
    e < 0 &&
      this.Qa("Reached the end of bundle when a length string is expected.");
    const t = this.buffer.slice(0, e);
    return (this.buffer = this.buffer.slice(e)), t;
  }
  async Ka(e) {
    for (; this.buffer.length < e; )
      (await this.Ua()) &&
        this.Qa("Reached the end of bundle when more is expected.");
    const t = this.La.decode(this.buffer.slice(0, e));
    return (this.buffer = this.buffer.slice(e)), t;
  }
  Qa(e) {
    throw (this.Ba.cancel(), new Error(`Invalid bundle format: ${e}`));
  }
  async Ua() {
    const e = await this.Ba.read();
    if (!e.done) {
      const t = new Uint8Array(this.buffer.length + e.value.length);
      t.set(this.buffer), t.set(e.value, this.buffer.length), (this.buffer = t);
    }
    return e.done;
  }
}
class Transaction$2 {
  constructor(e) {
    (this.datastore = e),
      (this.readVersions = new Map()),
      (this.mutations = []),
      (this.committed = !1),
      (this.lastWriteError = null),
      (this.writtenDocs = new Set());
  }
  async lookup(e) {
    if ((this.ensureCommitNotCalled(), this.mutations.length > 0))
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Firestore transactions require all reads to be executed before all writes."
      );
    const t = await (async function __PRIVATE_invokeBatchGetDocumentsRpc(e, t) {
      const n = __PRIVATE_debugCast(e),
        i = __PRIVATE_getEncodedDatabaseId(n.serializer) + "/documents",
        s = { documents: t.map((e) => __PRIVATE_toName(n.serializer, e)) },
        o = await n.Co("BatchGetDocuments", i, s, t.length),
        u = new Map();
      o.forEach((e) => {
        const t = (function __PRIVATE_fromBatchGetDocumentsResponse(e, t) {
          return "found" in t
            ? (function __PRIVATE_fromFound(e, t) {
                __PRIVATE_hardAssert(!!t.found),
                  t.found.name,
                  t.found.updateTime;
                const n = fromName(e, t.found.name),
                  i = __PRIVATE_fromVersion(t.found.updateTime),
                  s = t.found.createTime
                    ? __PRIVATE_fromVersion(t.found.createTime)
                    : SnapshotVersion.min(),
                  o = new ObjectValue({ mapValue: { fields: t.found.fields } });
                return MutableDocument.newFoundDocument(n, i, s, o);
              })(e, t)
            : "missing" in t
            ? (function __PRIVATE_fromMissing(e, t) {
                __PRIVATE_hardAssert(!!t.missing),
                  __PRIVATE_hardAssert(!!t.readTime);
                const n = fromName(e, t.missing),
                  i = __PRIVATE_fromVersion(t.readTime);
                return MutableDocument.newNoDocument(n, i);
              })(e, t)
            : fail();
        })(n.serializer, e);
        u.set(t.key.toString(), t);
      });
      const l = [];
      return (
        t.forEach((e) => {
          const t = u.get(e.toString());
          __PRIVATE_hardAssert(!!t), l.push(t);
        }),
        l
      );
    })(this.datastore, e);
    return t.forEach((e) => this.recordVersion(e)), t;
  }
  set(e, t) {
    this.write(t.toMutation(e, this.precondition(e))),
      this.writtenDocs.add(e.toString());
  }
  update(e, t) {
    try {
      this.write(t.toMutation(e, this.preconditionForUpdate(e)));
    } catch (e) {
      this.lastWriteError = e;
    }
    this.writtenDocs.add(e.toString());
  }
  delete(e) {
    this.write(new __PRIVATE_DeleteMutation(e, this.precondition(e))),
      this.writtenDocs.add(e.toString());
  }
  async commit() {
    if ((this.ensureCommitNotCalled(), this.lastWriteError))
      throw this.lastWriteError;
    const e = this.readVersions;
    this.mutations.forEach((t) => {
      e.delete(t.key.toString());
    }),
      e.forEach((e, t) => {
        const n = DocumentKey.fromPath(t);
        this.mutations.push(
          new __PRIVATE_VerifyMutation(n, this.precondition(n))
        );
      }),
      await (async function __PRIVATE_invokeCommitRpc(e, t) {
        const n = __PRIVATE_debugCast(e),
          i = __PRIVATE_getEncodedDatabaseId(n.serializer) + "/documents",
          s = { writes: t.map((e) => toMutation(n.serializer, e)) };
        await n.wo("Commit", i, s);
      })(this.datastore, this.mutations),
      (this.committed = !0);
  }
  recordVersion(e) {
    let t;
    if (e.isFoundDocument()) t = e.version;
    else {
      if (!e.isNoDocument()) throw fail();
      t = SnapshotVersion.min();
    }
    const n = this.readVersions.get(e.key.toString());
    if (n) {
      if (!t.isEqual(n))
        throw new FirestoreError(
          $e.ABORTED,
          "Document version changed between two reads."
        );
    } else this.readVersions.set(e.key.toString(), t);
  }
  precondition(e) {
    const t = this.readVersions.get(e.toString());
    return !this.writtenDocs.has(e.toString()) && t
      ? t.isEqual(SnapshotVersion.min())
        ? Precondition.exists(!1)
        : Precondition.updateTime(t)
      : Precondition.none();
  }
  preconditionForUpdate(e) {
    const t = this.readVersions.get(e.toString());
    if (!this.writtenDocs.has(e.toString()) && t) {
      if (t.isEqual(SnapshotVersion.min()))
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          "Can't update a document that doesn't exist."
        );
      return Precondition.updateTime(t);
    }
    return Precondition.exists(!0);
  }
  write(e) {
    this.ensureCommitNotCalled(), this.mutations.push(e);
  }
  ensureCommitNotCalled() {}
}
class __PRIVATE_TransactionRunner {
  constructor(e, t, n, i, s) {
    (this.asyncQueue = e),
      (this.datastore = t),
      (this.options = n),
      (this.updateFunction = i),
      (this.deferred = s),
      (this.Wa = n.maxAttempts),
      (this.zo = new __PRIVATE_ExponentialBackoff(
        this.asyncQueue,
        "transaction_retry"
      ));
  }
  run() {
    (this.Wa -= 1), this.Ga();
  }
  Ga() {
    this.zo.ko(async () => {
      const e = new Transaction$2(this.datastore),
        t = this.za(e);
      t &&
        t
          .then((t) => {
            this.asyncQueue.enqueueAndForget(() =>
              e
                .commit()
                .then(() => {
                  this.deferred.resolve(t);
                })
                .catch((e) => {
                  this.ja(e);
                })
            );
          })
          .catch((e) => {
            this.ja(e);
          });
    });
  }
  za(e) {
    try {
      const t = this.updateFunction(e);
      return !__PRIVATE_isNullOrUndefined(t) && t.catch && t.then
        ? t
        : (this.deferred.reject(
            Error("Transaction callback must return a Promise")
          ),
          null);
    } catch (e) {
      return this.deferred.reject(e), null;
    }
  }
  ja(e) {
    this.Wa > 0 && this.Ha(e)
      ? ((this.Wa -= 1),
        this.asyncQueue.enqueueAndForget(() => (this.Ga(), Promise.resolve())))
      : this.deferred.reject(e);
  }
  Ha(e) {
    if ("FirebaseError" === e.name) {
      const t = e.code;
      return (
        "aborted" === t ||
        "failed-precondition" === t ||
        "already-exists" === t ||
        !__PRIVATE_isPermanentError(t)
      );
    }
    return !1;
  }
}
class FirestoreClient {
  constructor(e, t, n, i) {
    (this.authCredentials = e),
      (this.appCheckCredentials = t),
      (this.asyncQueue = n),
      (this.databaseInfo = i),
      (this.user = User.UNAUTHENTICATED),
      (this.clientId = __PRIVATE_AutoId.newId()),
      (this.authCredentialListener = () => Promise.resolve()),
      (this.appCheckCredentialListener = () => Promise.resolve()),
      this.authCredentials.start(n, async (e) => {
        __PRIVATE_logDebug("FirestoreClient", "Received user=", e.uid),
          await this.authCredentialListener(e),
          (this.user = e);
      }),
      this.appCheckCredentials.start(
        n,
        (e) => (
          __PRIVATE_logDebug(
            "FirestoreClient",
            "Received new app check token=",
            e
          ),
          this.appCheckCredentialListener(e, this.user)
        )
      );
  }
  async getConfiguration() {
    return {
      asyncQueue: this.asyncQueue,
      databaseInfo: this.databaseInfo,
      clientId: this.clientId,
      authCredentials: this.authCredentials,
      appCheckCredentials: this.appCheckCredentials,
      initialUser: this.user,
      maxConcurrentLimboResolutions: 100,
    };
  }
  setCredentialChangeListener(e) {
    this.authCredentialListener = e;
  }
  setAppCheckTokenChangeListener(e) {
    this.appCheckCredentialListener = e;
  }
  verifyNotTerminated() {
    if (this.asyncQueue.isShuttingDown)
      throw new FirestoreError(
        $e.FAILED_PRECONDITION,
        "The client has already been terminated."
      );
  }
  terminate() {
    this.asyncQueue.enterRestrictedMode();
    const e = new __PRIVATE_Deferred();
    return (
      this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
        try {
          this._onlineComponents && (await this._onlineComponents.terminate()),
            this._offlineComponents &&
              (await this._offlineComponents.terminate()),
            this.authCredentials.shutdown(),
            this.appCheckCredentials.shutdown(),
            e.resolve();
        } catch (t) {
          const n = __PRIVATE_wrapInUserErrorIfRecoverable(
            t,
            "Failed to shutdown persistence"
          );
          e.reject(n);
        }
      }),
      e.promise
    );
  }
}
async function __PRIVATE_setOfflineComponentProvider(e, t) {
  e.asyncQueue.verifyOperationInProgress(),
    __PRIVATE_logDebug(
      "FirestoreClient",
      "Initializing OfflineComponentProvider"
    );
  const n = await e.getConfiguration();
  await t.initialize(n);
  let i = n.initialUser;
  e.setCredentialChangeListener(async (e) => {
    i.isEqual(e) ||
      (await __PRIVATE_localStoreHandleUserChange(t.localStore, e), (i = e));
  }),
    t.persistence.setDatabaseDeletedListener(() => e.terminate()),
    (e._offlineComponents = t);
}
async function __PRIVATE_setOnlineComponentProvider(e, t) {
  e.asyncQueue.verifyOperationInProgress();
  const n = await __PRIVATE_ensureOfflineComponents(e);
  __PRIVATE_logDebug("FirestoreClient", "Initializing OnlineComponentProvider");
  const i = await e.getConfiguration();
  await t.initialize(n, i),
    e.setCredentialChangeListener((e) =>
      __PRIVATE_remoteStoreHandleCredentialChange(t.remoteStore, e)
    ),
    e.setAppCheckTokenChangeListener((e, n) =>
      __PRIVATE_remoteStoreHandleCredentialChange(t.remoteStore, n)
    ),
    (e._onlineComponents = t);
}
function __PRIVATE_canFallbackFromIndexedDbError(e) {
  return "FirebaseError" === e.name
    ? e.code === $e.FAILED_PRECONDITION || e.code === $e.UNIMPLEMENTED
    : !("undefined" != typeof DOMException && e instanceof DOMException) ||
        22 === e.code ||
        20 === e.code ||
        11 === e.code;
}
async function __PRIVATE_ensureOfflineComponents(e) {
  if (!e._offlineComponents)
    if (e._uninitializedComponentsProvider) {
      __PRIVATE_logDebug(
        "FirestoreClient",
        "Using user provided OfflineComponentProvider"
      );
      try {
        await __PRIVATE_setOfflineComponentProvider(
          e,
          e._uninitializedComponentsProvider._offline
        );
      } catch (t) {
        const n = t;
        if (!__PRIVATE_canFallbackFromIndexedDbError(n)) throw n;
        __PRIVATE_logWarn(
          "Error using user provided cache. Falling back to memory cache: " + n
        ),
          await __PRIVATE_setOfflineComponentProvider(
            e,
            new MemoryOfflineComponentProvider()
          );
      }
    } else
      __PRIVATE_logDebug(
        "FirestoreClient",
        "Using default OfflineComponentProvider"
      ),
        await __PRIVATE_setOfflineComponentProvider(
          e,
          new MemoryOfflineComponentProvider()
        );
  return e._offlineComponents;
}
async function __PRIVATE_ensureOnlineComponents(e) {
  return (
    e._onlineComponents ||
      (e._uninitializedComponentsProvider
        ? (__PRIVATE_logDebug(
            "FirestoreClient",
            "Using user provided OnlineComponentProvider"
          ),
          await __PRIVATE_setOnlineComponentProvider(
            e,
            e._uninitializedComponentsProvider._online
          ))
        : (__PRIVATE_logDebug(
            "FirestoreClient",
            "Using default OnlineComponentProvider"
          ),
          await __PRIVATE_setOnlineComponentProvider(
            e,
            new OnlineComponentProvider()
          ))),
    e._onlineComponents
  );
}
function __PRIVATE_getPersistence(e) {
  return __PRIVATE_ensureOfflineComponents(e).then((e) => e.persistence);
}
function __PRIVATE_getLocalStore(e) {
  return __PRIVATE_ensureOfflineComponents(e).then((e) => e.localStore);
}
function __PRIVATE_getRemoteStore(e) {
  return __PRIVATE_ensureOnlineComponents(e).then((e) => e.remoteStore);
}
function __PRIVATE_getSyncEngine(e) {
  return __PRIVATE_ensureOnlineComponents(e).then((e) => e.syncEngine);
}
function __PRIVATE_getDatastore(e) {
  return __PRIVATE_ensureOnlineComponents(e).then((e) => e.datastore);
}
async function __PRIVATE_getEventManager(e) {
  const t = await __PRIVATE_ensureOnlineComponents(e),
    n = t.eventManager;
  return (
    (n.onListen = __PRIVATE_syncEngineListen.bind(null, t.syncEngine)),
    (n.onUnlisten = __PRIVATE_syncEngineUnlisten.bind(null, t.syncEngine)),
    n
  );
}
function __PRIVATE_firestoreClientGetDocumentViaSnapshotListener(e, t, n = {}) {
  const i = new __PRIVATE_Deferred();
  return (
    e.asyncQueue.enqueueAndForget(async () =>
      (function __PRIVATE_readDocumentViaSnapshotListener(e, t, n, i, s) {
        const o = new __PRIVATE_AsyncObserver({
            next: (o) => {
              t.enqueueAndForget(() => __PRIVATE_eventManagerUnlisten(e, u));
              const l = o.docs.has(n);
              !l && o.fromCache
                ? s.reject(
                    new FirestoreError(
                      $e.UNAVAILABLE,
                      "Failed to get document because the client is offline."
                    )
                  )
                : l && o.fromCache && i && "server" === i.source
                ? s.reject(
                    new FirestoreError(
                      $e.UNAVAILABLE,
                      'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'
                    )
                  )
                : s.resolve(o);
            },
            error: (e) => s.reject(e),
          }),
          u = new __PRIVATE_QueryListener(
            __PRIVATE_newQueryForPath(n.path),
            o,
            { includeMetadataChanges: !0, J_: !0 }
          );
        return __PRIVATE_eventManagerListen(e, u);
      })(await __PRIVATE_getEventManager(e), e.asyncQueue, t, n, i)
    ),
    i.promise
  );
}
function __PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(
  e,
  t,
  n = {}
) {
  const i = new __PRIVATE_Deferred();
  return (
    e.asyncQueue.enqueueAndForget(async () =>
      (function __PRIVATE_executeQueryViaSnapshotListener(e, t, n, i, s) {
        const o = new __PRIVATE_AsyncObserver({
            next: (n) => {
              t.enqueueAndForget(() => __PRIVATE_eventManagerUnlisten(e, u)),
                n.fromCache && "server" === i.source
                  ? s.reject(
                      new FirestoreError(
                        $e.UNAVAILABLE,
                        'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'
                      )
                    )
                  : s.resolve(n);
            },
            error: (e) => s.reject(e),
          }),
          u = new __PRIVATE_QueryListener(n, o, {
            includeMetadataChanges: !0,
            J_: !0,
          });
        return __PRIVATE_eventManagerListen(e, u);
      })(await __PRIVATE_getEventManager(e), e.asyncQueue, t, n, i)
    ),
    i.promise
  );
}
function __PRIVATE_firestoreClientLoadBundle(e, t, n, i) {
  const s = (function __PRIVATE_createBundleReader(e, t) {
    let n;
    return (
      (n = "string" == typeof e ? __PRIVATE_newTextEncoder().encode(e) : e),
      (function __PRIVATE_newBundleReader(e, t) {
        return new __PRIVATE_BundleReaderImpl(e, t);
      })(
        (function __PRIVATE_toByteStreamReader(e, t) {
          if (e instanceof Uint8Array)
            return __PRIVATE_toByteStreamReaderHelper(e, t);
          if (e instanceof ArrayBuffer)
            return __PRIVATE_toByteStreamReaderHelper(new Uint8Array(e), t);
          if (e instanceof ReadableStream) return e.getReader();
          throw new Error(
            "Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream"
          );
        })(n),
        t
      )
    );
  })(n, __PRIVATE_newSerializer(t));
  e.asyncQueue.enqueueAndForget(async () => {
    !(function __PRIVATE_syncEngineLoadBundle(e, t, n) {
      const i = __PRIVATE_debugCast(e);
      (async function __PRIVATE_loadBundleImpl(e, t, n) {
        try {
          const i = await t.getMetadata();
          if (
            await (function __PRIVATE_localStoreHasNewerBundle(e, t) {
              const n = __PRIVATE_debugCast(e),
                i = __PRIVATE_fromVersion(t.createTime);
              return n.persistence
                .runTransaction("hasNewerBundle", "readonly", (e) =>
                  n.Kr.getBundleMetadata(e, t.id)
                )
                .then((e) => !!e && e.createTime.compareTo(i) >= 0);
            })(e.localStore, i)
          )
            return (
              await t.close(),
              n._completeWith(
                (function __PRIVATE_bundleSuccessProgress(e) {
                  return {
                    taskState: "Success",
                    documentsLoaded: e.totalDocuments,
                    bytesLoaded: e.totalBytes,
                    totalDocuments: e.totalDocuments,
                    totalBytes: e.totalBytes,
                  };
                })(i)
              ),
              Promise.resolve(new Set())
            );
          n._updateProgress(__PRIVATE_bundleInitialProgress(i));
          const s = new __PRIVATE_BundleLoader(i, e.localStore, t.serializer);
          let o = await t.Ma();
          for (; o; ) {
            const e = await s.ea(o);
            e && n._updateProgress(e), (o = await t.Ma());
          }
          const u = await s.complete();
          return (
            await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(
              e,
              u.ra,
              void 0
            ),
            await (function __PRIVATE_localStoreSaveBundle(e, t) {
              const n = __PRIVATE_debugCast(e);
              return n.persistence.runTransaction(
                "Save bundle",
                "readwrite",
                (e) => n.Kr.saveBundleMetadata(e, t)
              );
            })(e.localStore, i),
            n._completeWith(u.progress),
            Promise.resolve(u.na)
          );
        } catch (e) {
          return (
            __PRIVATE_logWarn("SyncEngine", `Loading bundle failed with ${e}`),
            n._failWith(e),
            Promise.resolve(new Set())
          );
        }
      })(i, t, n).then((e) => {
        i.sharedClientState.notifyBundleLoaded(e);
      });
    })(await __PRIVATE_getSyncEngine(e), s, i);
  });
}
function __PRIVATE_cloneLongPollingOptions(e) {
  const t = {};
  return (
    void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds), t
  );
}
const xt = new Map();
function __PRIVATE_validateNonEmptyArgument(e, t, n) {
  if (!n)
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      `Function ${e}() cannot be called with an empty ${t}.`
    );
}
function __PRIVATE_validateIsNotUsedTogether(e, t, n, i) {
  if (!0 === t && !0 === i)
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      `${e} and ${n} cannot be used together.`
    );
}
function __PRIVATE_validateDocumentPath(e) {
  if (!DocumentKey.isDocumentKey(e))
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`
    );
}
function __PRIVATE_validateCollectionPath(e) {
  if (DocumentKey.isDocumentKey(e))
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`
    );
}
function __PRIVATE_valueDescription(e) {
  if (void 0 === e) return "undefined";
  if (null === e) return "null";
  if ("string" == typeof e)
    return e.length > 20 && (e = `${e.substring(0, 20)}...`), JSON.stringify(e);
  if ("number" == typeof e || "boolean" == typeof e) return "" + e;
  if ("object" == typeof e) {
    if (e instanceof Array) return "an array";
    {
      const t = (function __PRIVATE_tryGetCustomObjectType(e) {
        return e.constructor ? e.constructor.name : null;
      })(e);
      return t ? `a custom ${t} object` : "an object";
    }
  }
  return "function" == typeof e ? "a function" : fail();
}
function __PRIVATE_cast(e, t) {
  if (("_delegate" in e && (e = e._delegate), !(e instanceof t))) {
    if (t.name === e.constructor.name)
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?"
      );
    {
      const n = __PRIVATE_valueDescription(e);
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        `Expected type '${t.name}', but it was: ${n}`
      );
    }
  }
  return e;
}
function __PRIVATE_validatePositiveNumber(e, t) {
  if (t <= 0)
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      `Function ${e}() requires a positive number, but it was: ${t}.`
    );
}
class FirestoreSettingsImpl {
  constructor(e) {
    var t, n;
    if (void 0 === e.host) {
      if (void 0 !== e.ssl)
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          "Can't provide ssl option if host option is not set"
        );
      (this.host = "firestore.googleapis.com"), (this.ssl = !0);
    } else
      (this.host = e.host),
        (this.ssl = null === (t = e.ssl) || void 0 === t || t);
    if (
      ((this.credentials = e.credentials),
      (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
      (this.localCache = e.localCache),
      void 0 === e.cacheSizeBytes)
    )
      this.cacheSizeBytes = 41943040;
    else {
      if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          "cacheSizeBytes must be at least 1048576"
        );
      this.cacheSizeBytes = e.cacheSizeBytes;
    }
    __PRIVATE_validateIsNotUsedTogether(
      "experimentalForceLongPolling",
      e.experimentalForceLongPolling,
      "experimentalAutoDetectLongPolling",
      e.experimentalAutoDetectLongPolling
    ),
      (this.experimentalForceLongPolling = !!e.experimentalForceLongPolling),
      this.experimentalForceLongPolling
        ? (this.experimentalAutoDetectLongPolling = !1)
        : void 0 === e.experimentalAutoDetectLongPolling
        ? (this.experimentalAutoDetectLongPolling = !0)
        : (this.experimentalAutoDetectLongPolling =
            !!e.experimentalAutoDetectLongPolling),
      (this.experimentalLongPollingOptions = __PRIVATE_cloneLongPollingOptions(
        null !== (n = e.experimentalLongPollingOptions) && void 0 !== n ? n : {}
      )),
      (function __PRIVATE_validateLongPollingOptions(e) {
        if (void 0 !== e.timeoutSeconds) {
          if (isNaN(e.timeoutSeconds))
            throw new FirestoreError(
              $e.INVALID_ARGUMENT,
              `invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`
            );
          if (e.timeoutSeconds < 5)
            throw new FirestoreError(
              $e.INVALID_ARGUMENT,
              `invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`
            );
          if (e.timeoutSeconds > 30)
            throw new FirestoreError(
              $e.INVALID_ARGUMENT,
              `invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`
            );
        }
      })(this.experimentalLongPollingOptions),
      (this.useFetchStreams = !!e.useFetchStreams);
  }
  isEqual(e) {
    return (
      this.host === e.host &&
      this.ssl === e.ssl &&
      this.credentials === e.credentials &&
      this.cacheSizeBytes === e.cacheSizeBytes &&
      this.experimentalForceLongPolling === e.experimentalForceLongPolling &&
      this.experimentalAutoDetectLongPolling ===
        e.experimentalAutoDetectLongPolling &&
      (function __PRIVATE_longPollingOptionsEqual(e, t) {
        return e.timeoutSeconds === t.timeoutSeconds;
      })(
        this.experimentalLongPollingOptions,
        e.experimentalLongPollingOptions
      ) &&
      this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
      this.useFetchStreams === e.useFetchStreams
    );
  }
}
class Firestore$1 {
  constructor(e, t, n, i) {
    (this._authCredentials = e),
      (this._appCheckCredentials = t),
      (this._databaseId = n),
      (this._app = i),
      (this.type = "firestore-lite"),
      (this._persistenceKey = "(lite)"),
      (this._settings = new FirestoreSettingsImpl({})),
      (this._settingsFrozen = !1);
  }
  get app() {
    if (!this._app)
      throw new FirestoreError(
        $e.FAILED_PRECONDITION,
        "Firestore was not initialized using the Firebase SDK. 'app' is not available"
      );
    return this._app;
  }
  get _initialized() {
    return this._settingsFrozen;
  }
  get _terminated() {
    return void 0 !== this._terminateTask;
  }
  _setSettings(e) {
    if (this._settingsFrozen)
      throw new FirestoreError(
        $e.FAILED_PRECONDITION,
        "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object."
      );
    (this._settings = new FirestoreSettingsImpl(e)),
      void 0 !== e.credentials &&
        (this._authCredentials =
          (function __PRIVATE_makeAuthCredentialsProvider(e) {
            if (!e) return new __PRIVATE_EmptyAuthCredentialsProvider();
            switch (e.type) {
              case "firstParty":
                return new __PRIVATE_FirstPartyAuthCredentialsProvider(
                  e.sessionIndex || "0",
                  e.iamToken || null,
                  e.authTokenFactory || null
                );
              case "provider":
                return e.client;
              default:
                throw new FirestoreError(
                  $e.INVALID_ARGUMENT,
                  "makeAuthCredentialsProvider failed due to invalid credential type"
                );
            }
          })(e.credentials));
  }
  _getSettings() {
    return this._settings;
  }
  _freezeSettings() {
    return (this._settingsFrozen = !0), this._settings;
  }
  _delete() {
    return (
      this._terminateTask || (this._terminateTask = this._terminate()),
      this._terminateTask
    );
  }
  toJSON() {
    return {
      app: this._app,
      databaseId: this._databaseId,
      settings: this._settings,
    };
  }
  _terminate() {
    return (
      (function __PRIVATE_removeComponents(e) {
        const t = xt.get(e);
        t &&
          (__PRIVATE_logDebug("ComponentProvider", "Removing Datastore"),
          xt.delete(e),
          t.terminate());
      })(this),
      Promise.resolve()
    );
  }
}
function connectFirestoreEmulator(e, t, n, i = {}) {
  var s;
  const o = (e = __PRIVATE_cast(e, Firestore$1))._getSettings(),
    u = `${t}:${n}`;
  if (
    ("firestore.googleapis.com" !== o.host &&
      o.host !== u &&
      __PRIVATE_logWarn(
        "Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."
      ),
    e._setSettings(Object.assign(Object.assign({}, o), { host: u, ssl: !1 })),
    i.mockUserToken)
  ) {
    let t, n;
    if ("string" == typeof i.mockUserToken)
      (t = i.mockUserToken), (n = User.MOCK_USER);
    else {
      t = (function createMockUserToken(e, t) {
        if (e.uid)
          throw new Error(
            'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
          );
        const n = t || "demo-project",
          i = e.iat || 0,
          s = e.sub || e.user_id;
        if (!s)
          throw new Error(
            "mockUserToken must contain 'sub' or 'user_id' field!"
          );
        const o = Object.assign(
          {
            iss: `https://securetoken.google.com/${n}`,
            aud: n,
            iat: i,
            exp: i + 3600,
            auth_time: i,
            sub: s,
            user_id: s,
            firebase: { sign_in_provider: "custom", identities: {} },
          },
          e
        );
        return [
          base64urlEncodeWithoutPadding(
            JSON.stringify({ alg: "none", type: "JWT" })
          ),
          base64urlEncodeWithoutPadding(JSON.stringify(o)),
          "",
        ].join(".");
      })(
        i.mockUserToken,
        null === (s = e._app) || void 0 === s ? void 0 : s.options.projectId
      );
      const o = i.mockUserToken.sub || i.mockUserToken.user_id;
      if (!o)
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          "mockUserToken must contain 'sub' or 'user_id' field!"
        );
      n = new User(o);
    }
    e._authCredentials = new __PRIVATE_EmulatorAuthCredentialsProvider(
      new __PRIVATE_OAuthToken(t, n)
    );
  }
}
class Query {
  constructor(e, t, n) {
    (this.converter = t),
      (this._query = n),
      (this.type = "query"),
      (this.firestore = e);
  }
  withConverter(e) {
    return new Query(this.firestore, e, this._query);
  }
}
class DocumentReference {
  constructor(e, t, n) {
    (this.converter = t),
      (this._key = n),
      (this.type = "document"),
      (this.firestore = e);
  }
  get _path() {
    return this._key.path;
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get path() {
    return this._key.path.canonicalString();
  }
  get parent() {
    return new CollectionReference(
      this.firestore,
      this.converter,
      this._key.path.popLast()
    );
  }
  withConverter(e) {
    return new DocumentReference(this.firestore, e, this._key);
  }
}
class CollectionReference extends Query {
  constructor(e, t, n) {
    super(e, t, __PRIVATE_newQueryForPath(n)),
      (this._path = n),
      (this.type = "collection");
  }
  get id() {
    return this._query.path.lastSegment();
  }
  get path() {
    return this._query.path.canonicalString();
  }
  get parent() {
    const e = this._path.popLast();
    return e.isEmpty()
      ? null
      : new DocumentReference(this.firestore, null, new DocumentKey(e));
  }
  withConverter(e) {
    return new CollectionReference(this.firestore, e, this._path);
  }
}
function collection(e, t, ...n) {
  if (
    ((e = getModularInstance(e)),
    __PRIVATE_validateNonEmptyArgument("collection", "path", t),
    e instanceof Firestore$1)
  ) {
    const i = ResourcePath.fromString(t, ...n);
    return (
      __PRIVATE_validateCollectionPath(i), new CollectionReference(e, null, i)
    );
  }
  {
    if (!(e instanceof DocumentReference || e instanceof CollectionReference))
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
      );
    const i = e._path.child(ResourcePath.fromString(t, ...n));
    return (
      __PRIVATE_validateCollectionPath(i),
      new CollectionReference(e.firestore, null, i)
    );
  }
}
function collectionGroup(e, t) {
  if (
    ((e = __PRIVATE_cast(e, Firestore$1)),
    __PRIVATE_validateNonEmptyArgument("collectionGroup", "collection id", t),
    t.indexOf("/") >= 0)
  )
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      `Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`
    );
  return new Query(
    e,
    null,
    (function __PRIVATE_newQueryForCollectionGroup(e) {
      return new __PRIVATE_QueryImpl(ResourcePath.emptyPath(), e);
    })(t)
  );
}
function doc(e, t, ...n) {
  if (
    ((e = getModularInstance(e)),
    1 === arguments.length && (t = __PRIVATE_AutoId.newId()),
    __PRIVATE_validateNonEmptyArgument("doc", "path", t),
    e instanceof Firestore$1)
  ) {
    const i = ResourcePath.fromString(t, ...n);
    return (
      __PRIVATE_validateDocumentPath(i),
      new DocumentReference(e, null, new DocumentKey(i))
    );
  }
  {
    if (!(e instanceof DocumentReference || e instanceof CollectionReference))
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
      );
    const i = e._path.child(ResourcePath.fromString(t, ...n));
    return (
      __PRIVATE_validateDocumentPath(i),
      new DocumentReference(
        e.firestore,
        e instanceof CollectionReference ? e.converter : null,
        new DocumentKey(i)
      )
    );
  }
}
function refEqual(e, t) {
  return (
    (e = getModularInstance(e)),
    (t = getModularInstance(t)),
    (e instanceof DocumentReference || e instanceof CollectionReference) &&
      (t instanceof DocumentReference || t instanceof CollectionReference) &&
      e.firestore === t.firestore &&
      e.path === t.path &&
      e.converter === t.converter
  );
}
function queryEqual(e, t) {
  return (
    (e = getModularInstance(e)),
    (t = getModularInstance(t)),
    e instanceof Query &&
      t instanceof Query &&
      e.firestore === t.firestore &&
      __PRIVATE_queryEquals(e._query, t._query) &&
      e.converter === t.converter
  );
}
class __PRIVATE_AsyncQueueImpl {
  constructor() {
    (this.Ja = Promise.resolve()),
      (this.Ya = []),
      (this.Za = !1),
      (this.Xa = []),
      (this.eu = null),
      (this.tu = !1),
      (this.nu = !1),
      (this.ru = []),
      (this.zo = new __PRIVATE_ExponentialBackoff(this, "async_queue_retry")),
      (this.iu = () => {
        const e = getDocument();
        e &&
          __PRIVATE_logDebug(
            "AsyncQueue",
            "Visibility state changed to " + e.visibilityState
          ),
          this.zo.Qo();
      });
    const e = getDocument();
    e &&
      "function" == typeof e.addEventListener &&
      e.addEventListener("visibilitychange", this.iu);
  }
  get isShuttingDown() {
    return this.Za;
  }
  enqueueAndForget(e) {
    this.enqueue(e);
  }
  enqueueAndForgetEvenWhileRestricted(e) {
    this.su(), this.ou(e);
  }
  enterRestrictedMode(e) {
    if (!this.Za) {
      (this.Za = !0), (this.nu = e || !1);
      const t = getDocument();
      t &&
        "function" == typeof t.removeEventListener &&
        t.removeEventListener("visibilitychange", this.iu);
    }
  }
  enqueue(e) {
    if ((this.su(), this.Za)) return new Promise(() => {});
    const t = new __PRIVATE_Deferred();
    return this.ou(() =>
      this.Za && this.nu
        ? Promise.resolve()
        : (e().then(t.resolve, t.reject), t.promise)
    ).then(() => t.promise);
  }
  enqueueRetryable(e) {
    this.enqueueAndForget(() => (this.Ya.push(e), this._u()));
  }
  async _u() {
    if (0 !== this.Ya.length) {
      try {
        await this.Ya[0](), this.Ya.shift(), this.zo.reset();
      } catch (e) {
        if (!__PRIVATE_isIndexedDbTransactionError(e)) throw e;
        __PRIVATE_logDebug(
          "AsyncQueue",
          "Operation failed with retryable error: " + e
        );
      }
      this.Ya.length > 0 && this.zo.ko(() => this._u());
    }
  }
  ou(e) {
    const t = this.Ja.then(
      () => (
        (this.tu = !0),
        e()
          .catch((e) => {
            (this.eu = e), (this.tu = !1);
            const t = (function __PRIVATE_getMessageOrStack(e) {
              let t = e.message || "";
              return (
                e.stack &&
                  (t = e.stack.includes(e.message)
                    ? e.stack
                    : e.message + "\n" + e.stack),
                t
              );
            })(e);
            throw (__PRIVATE_logError("INTERNAL UNHANDLED ERROR: ", t), e);
          })
          .then((e) => ((this.tu = !1), e))
      )
    );
    return (this.Ja = t), t;
  }
  enqueueAfterDelay(e, t, n) {
    this.su(), this.ru.indexOf(e) > -1 && (t = 0);
    const i = DelayedOperation.createAndSchedule(this, e, t, n, (e) =>
      this.au(e)
    );
    return this.Xa.push(i), i;
  }
  su() {
    this.eu && fail();
  }
  verifyOperationInProgress() {}
  async uu() {
    let e;
    do {
      (e = this.Ja), await e;
    } while (e !== this.Ja);
  }
  cu(e) {
    for (const t of this.Xa) if (t.timerId === e) return !0;
    return !1;
  }
  lu(e) {
    return this.uu().then(() => {
      this.Xa.sort((e, t) => e.targetTimeMs - t.targetTimeMs);
      for (const t of this.Xa)
        if ((t.skipDelay(), "all" !== e && t.timerId === e)) break;
      return this.uu();
    });
  }
  hu(e) {
    this.ru.push(e);
  }
  au(e) {
    const t = this.Xa.indexOf(e);
    this.Xa.splice(t, 1);
  }
}
function __PRIVATE_isPartialObserver(e) {
  return (function __PRIVATE_implementsAnyMethods(e, t) {
    if ("object" != typeof e || null === e) return !1;
    const n = e;
    for (const e of t) if (e in n && "function" == typeof n[e]) return !0;
    return !1;
  })(e, ["next", "error", "complete"]);
}
class LoadBundleTask {
  constructor() {
    (this._progressObserver = {}),
      (this._taskCompletionResolver = new __PRIVATE_Deferred()),
      (this._lastProgress = {
        taskState: "Running",
        totalBytes: 0,
        totalDocuments: 0,
        bytesLoaded: 0,
        documentsLoaded: 0,
      });
  }
  onProgress(e, t, n) {
    this._progressObserver = { next: e, error: t, complete: n };
  }
  catch(e) {
    return this._taskCompletionResolver.promise.catch(e);
  }
  then(e, t) {
    return this._taskCompletionResolver.promise.then(e, t);
  }
  _completeWith(e) {
    this._updateProgress(e),
      this._progressObserver.complete && this._progressObserver.complete(),
      this._taskCompletionResolver.resolve(e);
  }
  _failWith(e) {
    (this._lastProgress.taskState = "Error"),
      this._progressObserver.next &&
        this._progressObserver.next(this._lastProgress),
      this._progressObserver.error && this._progressObserver.error(e),
      this._taskCompletionResolver.reject(e);
  }
  _updateProgress(e) {
    (this._lastProgress = e),
      this._progressObserver.next && this._progressObserver.next(e);
  }
}
const Mt = -1;
class Firestore extends Firestore$1 {
  constructor(e, t, n, i) {
    super(e, t, n, i),
      (this.type = "firestore"),
      (this._queue = (function __PRIVATE_newAsyncQueue() {
        return new __PRIVATE_AsyncQueueImpl();
      })()),
      (this._persistenceKey = (null == i ? void 0 : i.name) || "[DEFAULT]");
  }
  _terminate() {
    return (
      this._firestoreClient || __PRIVATE_configureFirestore(this),
      this._firestoreClient.terminate()
    );
  }
}
function initializeFirestore(e, t, n) {
  n || (n = "(default)");
  const i = _getProvider(e, "firestore");
  if (i.isInitialized(n)) {
    const e = i.getImmediate({ identifier: n });
    if (deepEqual(i.getOptions(n), t)) return e;
    throw new FirestoreError(
      $e.FAILED_PRECONDITION,
      "initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance."
    );
  }
  if (void 0 !== t.cacheSizeBytes && void 0 !== t.localCache)
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      "cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object"
    );
  if (
    void 0 !== t.cacheSizeBytes &&
    -1 !== t.cacheSizeBytes &&
    t.cacheSizeBytes < 1048576
  )
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      "cacheSizeBytes must be at least 1048576"
    );
  return i.initialize({ options: t, instanceIdentifier: n });
}
function getFirestore(e, t) {
  const i = "object" == typeof e ? e : n(),
    s = "string" == typeof e ? e : t || "(default)",
    o = _getProvider(i, "firestore").getImmediate({ identifier: s });
  if (!o._initialized) {
    const e = getDefaultEmulatorHostnameAndPort("firestore");
    e && connectFirestoreEmulator(o, ...e);
  }
  return o;
}
function ensureFirestoreConfigured(e) {
  return (
    e._firestoreClient || __PRIVATE_configureFirestore(e),
    e._firestoreClient.verifyNotTerminated(),
    e._firestoreClient
  );
}
function __PRIVATE_configureFirestore(e) {
  var t, n, i;
  const s = e._freezeSettings(),
    o = (function __PRIVATE_makeDatabaseInfo(e, t, n, i) {
      return new DatabaseInfo(
        e,
        t,
        n,
        i.host,
        i.ssl,
        i.experimentalForceLongPolling,
        i.experimentalAutoDetectLongPolling,
        __PRIVATE_cloneLongPollingOptions(i.experimentalLongPollingOptions),
        i.useFetchStreams
      );
    })(
      e._databaseId,
      (null === (t = e._app) || void 0 === t ? void 0 : t.options.appId) || "",
      e._persistenceKey,
      s
    );
  (e._firestoreClient = new FirestoreClient(
    e._authCredentials,
    e._appCheckCredentials,
    e._queue,
    o
  )),
    (null === (n = s.localCache) || void 0 === n
      ? void 0
      : n._offlineComponentProvider) &&
      (null === (i = s.localCache) || void 0 === i
        ? void 0
        : i._onlineComponentProvider) &&
      (e._firestoreClient._uninitializedComponentsProvider = {
        _offlineKind: s.localCache.kind,
        _offline: s.localCache._offlineComponentProvider,
        _online: s.localCache._onlineComponentProvider,
      });
}
function enableIndexedDbPersistence(e, t) {
  __PRIVATE_verifyNotInitialized((e = __PRIVATE_cast(e, Firestore)));
  const n = ensureFirestoreConfigured(e);
  if (n._uninitializedComponentsProvider)
    throw new FirestoreError(
      $e.FAILED_PRECONDITION,
      "SDK cache is already specified."
    );
  __PRIVATE_logWarn(
    "enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead."
  );
  const i = e._freezeSettings(),
    s = new OnlineComponentProvider();
  return __PRIVATE_setPersistenceProviders(
    n,
    s,
    new __PRIVATE_IndexedDbOfflineComponentProvider(
      s,
      i.cacheSizeBytes,
      null == t ? void 0 : t.forceOwnership
    )
  );
}
function enableMultiTabIndexedDbPersistence(e) {
  __PRIVATE_verifyNotInitialized((e = __PRIVATE_cast(e, Firestore)));
  const t = ensureFirestoreConfigured(e);
  if (t._uninitializedComponentsProvider)
    throw new FirestoreError(
      $e.FAILED_PRECONDITION,
      "SDK cache is already specified."
    );
  __PRIVATE_logWarn(
    "enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead."
  );
  const n = e._freezeSettings(),
    i = new OnlineComponentProvider();
  return __PRIVATE_setPersistenceProviders(
    t,
    i,
    new __PRIVATE_MultiTabOfflineComponentProvider(i, n.cacheSizeBytes)
  );
}
function __PRIVATE_setPersistenceProviders(e, t, n) {
  const i = new __PRIVATE_Deferred();
  return e.asyncQueue
    .enqueue(async () => {
      try {
        await __PRIVATE_setOfflineComponentProvider(e, n),
          await __PRIVATE_setOnlineComponentProvider(e, t),
          i.resolve();
      } catch (e) {
        const t = e;
        if (!__PRIVATE_canFallbackFromIndexedDbError(t)) throw t;
        __PRIVATE_logWarn(
          "Error enabling indexeddb cache. Falling back to memory cache: " + t
        ),
          i.reject(t);
      }
    })
    .then(() => i.promise);
}
function clearIndexedDbPersistence(e) {
  if (e._initialized && !e._terminated)
    throw new FirestoreError(
      $e.FAILED_PRECONDITION,
      "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated."
    );
  const t = new __PRIVATE_Deferred();
  return (
    e._queue.enqueueAndForgetEvenWhileRestricted(async () => {
      try {
        await (async function __PRIVATE_indexedDbClearPersistence(e) {
          if (!__PRIVATE_SimpleDb.D()) return Promise.resolve();
          const t = e + "main";
          await __PRIVATE_SimpleDb.delete(t);
        })(__PRIVATE_indexedDbStoragePrefix(e._databaseId, e._persistenceKey)),
          t.resolve();
      } catch (e) {
        t.reject(e);
      }
    }),
    t.promise
  );
}
function waitForPendingWrites(e) {
  return (function __PRIVATE_firestoreClientWaitForPendingWrites(e) {
    const t = new __PRIVATE_Deferred();
    return (
      e.asyncQueue.enqueueAndForget(async () =>
        (async function __PRIVATE_syncEngineRegisterPendingWritesCallback(
          e,
          t
        ) {
          const n = __PRIVATE_debugCast(e);
          __PRIVATE_canUseNetwork(n.remoteStore) ||
            __PRIVATE_logDebug(
              "SyncEngine",
              "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."
            );
          try {
            const e =
              await (function __PRIVATE_localStoreGetHighestUnacknowledgedBatchId(
                e
              ) {
                const t = __PRIVATE_debugCast(e);
                return t.persistence.runTransaction(
                  "Get highest unacknowledged batch id",
                  "readonly",
                  (e) => t.mutationQueue.getHighestUnacknowledgedBatchId(e)
                );
              })(n.localStore);
            if (-1 === e) return void t.resolve();
            const i = n.ba.get(e) || [];
            i.push(t), n.ba.set(e, i);
          } catch (e) {
            const n = __PRIVATE_wrapInUserErrorIfRecoverable(
              e,
              "Initialization of waitForPendingWrites() operation failed"
            );
            t.reject(n);
          }
        })(await __PRIVATE_getSyncEngine(e), t)
      ),
      t.promise
    );
  })(ensureFirestoreConfigured((e = __PRIVATE_cast(e, Firestore))));
}
function enableNetwork(e) {
  return (function __PRIVATE_firestoreClientEnableNetwork(e) {
    return e.asyncQueue.enqueue(async () => {
      const t = await __PRIVATE_getPersistence(e),
        n = await __PRIVATE_getRemoteStore(e);
      return (
        t.setNetworkEnabled(!0),
        (function __PRIVATE_remoteStoreEnableNetwork(e) {
          const t = __PRIVATE_debugCast(e);
          return t.C_.delete(0), __PRIVATE_enableNetworkInternal(t);
        })(n)
      );
    });
  })(ensureFirestoreConfigured((e = __PRIVATE_cast(e, Firestore))));
}
function disableNetwork(e) {
  return (function __PRIVATE_firestoreClientDisableNetwork(e) {
    return e.asyncQueue.enqueue(async () => {
      const t = await __PRIVATE_getPersistence(e),
        n = await __PRIVATE_getRemoteStore(e);
      return (
        t.setNetworkEnabled(!1),
        (async function __PRIVATE_remoteStoreDisableNetwork(e) {
          const t = __PRIVATE_debugCast(e);
          t.C_.add(0),
            await __PRIVATE_disableNetworkInternal(t),
            t.M_.set("Offline");
        })(n)
      );
    });
  })(ensureFirestoreConfigured((e = __PRIVATE_cast(e, Firestore))));
}
function terminate(e) {
  return i(e.app, "firestore", e._databaseId.database), e._delete();
}
function loadBundle(e, t) {
  const n = ensureFirestoreConfigured((e = __PRIVATE_cast(e, Firestore))),
    i = new LoadBundleTask();
  return __PRIVATE_firestoreClientLoadBundle(n, e._databaseId, t, i), i;
}
function namedQuery(e, t) {
  return (function __PRIVATE_firestoreClientGetNamedQuery(e, t) {
    return e.asyncQueue.enqueue(async () =>
      (function __PRIVATE_localStoreGetNamedQuery(e, t) {
        const n = __PRIVATE_debugCast(e);
        return n.persistence.runTransaction(
          "Get named query",
          "readonly",
          (e) => n.Kr.getNamedQuery(e, t)
        );
      })(await __PRIVATE_getLocalStore(e), t)
    );
  })(ensureFirestoreConfigured((e = __PRIVATE_cast(e, Firestore))), t).then(
    (t) => (t ? new Query(e, null, t.query) : null)
  );
}
function __PRIVATE_verifyNotInitialized(e) {
  if (e._initialized || e._terminated)
    throw new FirestoreError(
      $e.FAILED_PRECONDITION,
      "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object."
    );
}
class AggregateField {
  constructor(e = "count", t) {
    (this._internalFieldPath = t),
      (this.type = "AggregateField"),
      (this.aggregateType = e);
  }
}
class AggregateQuerySnapshot {
  constructor(e, t, n) {
    (this._userDataWriter = t),
      (this._data = n),
      (this.type = "AggregateQuerySnapshot"),
      (this.query = e);
  }
  data() {
    return this._userDataWriter.convertObjectMap(this._data);
  }
}
class Bytes {
  constructor(e) {
    this._byteString = e;
  }
  static fromBase64String(e) {
    try {
      return new Bytes(ByteString.fromBase64String(e));
    } catch (e) {
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Failed to construct data from Base64 string: " + e
      );
    }
  }
  static fromUint8Array(e) {
    return new Bytes(ByteString.fromUint8Array(e));
  }
  toBase64() {
    return this._byteString.toBase64();
  }
  toUint8Array() {
    return this._byteString.toUint8Array();
  }
  toString() {
    return "Bytes(base64: " + this.toBase64() + ")";
  }
  isEqual(e) {
    return this._byteString.isEqual(e._byteString);
  }
}
class FieldPath {
  constructor(...e) {
    for (let t = 0; t < e.length; ++t)
      if (0 === e[t].length)
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          "Invalid field name at argument $(i + 1). Field names must not be empty."
        );
    this._internalPath = new FieldPath$1(e);
  }
  isEqual(e) {
    return this._internalPath.isEqual(e._internalPath);
  }
}
function documentId() {
  return new FieldPath("__name__");
}
class FieldValue {
  constructor(e) {
    this._methodName = e;
  }
}
class GeoPoint {
  constructor(e, t) {
    if (!isFinite(e) || e < -90 || e > 90)
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Latitude must be a number between -90 and 90, but was: " + e
      );
    if (!isFinite(t) || t < -180 || t > 180)
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Longitude must be a number between -180 and 180, but was: " + t
      );
    (this._lat = e), (this._long = t);
  }
  get latitude() {
    return this._lat;
  }
  get longitude() {
    return this._long;
  }
  isEqual(e) {
    return this._lat === e._lat && this._long === e._long;
  }
  toJSON() {
    return { latitude: this._lat, longitude: this._long };
  }
  _compareTo(e) {
    return (
      __PRIVATE_primitiveComparator(this._lat, e._lat) ||
      __PRIVATE_primitiveComparator(this._long, e._long)
    );
  }
}
const Nt = /^__.*__$/;
class ParsedSetData {
  constructor(e, t, n) {
    (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
  }
  toMutation(e, t) {
    return null !== this.fieldMask
      ? new __PRIVATE_PatchMutation(
          e,
          this.data,
          this.fieldMask,
          t,
          this.fieldTransforms
        )
      : new __PRIVATE_SetMutation(e, this.data, t, this.fieldTransforms);
  }
}
class ParsedUpdateData {
  constructor(e, t, n) {
    (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
  }
  toMutation(e, t) {
    return new __PRIVATE_PatchMutation(
      e,
      this.data,
      this.fieldMask,
      t,
      this.fieldTransforms
    );
  }
}
function __PRIVATE_isWrite(e) {
  switch (e) {
    case 0:
    case 2:
    case 1:
      return !0;
    case 3:
    case 4:
      return !1;
    default:
      throw fail();
  }
}
class __PRIVATE_ParseContextImpl {
  constructor(e, t, n, i, s, o) {
    (this.settings = e),
      (this.databaseId = t),
      (this.serializer = n),
      (this.ignoreUndefinedProperties = i),
      void 0 === s && this.Pu(),
      (this.fieldTransforms = s || []),
      (this.fieldMask = o || []);
  }
  get path() {
    return this.settings.path;
  }
  get Iu() {
    return this.settings.Iu;
  }
  Tu(e) {
    return new __PRIVATE_ParseContextImpl(
      Object.assign(Object.assign({}, this.settings), e),
      this.databaseId,
      this.serializer,
      this.ignoreUndefinedProperties,
      this.fieldTransforms,
      this.fieldMask
    );
  }
  Eu(e) {
    var t;
    const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
      i = this.Tu({ path: n, du: !1 });
    return i.Au(e), i;
  }
  Ru(e) {
    var t;
    const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
      i = this.Tu({ path: n, du: !1 });
    return i.Pu(), i;
  }
  Vu(e) {
    return this.Tu({ path: void 0, du: !0 });
  }
  mu(e) {
    return __PRIVATE_createError(
      e,
      this.settings.methodName,
      this.settings.fu || !1,
      this.path,
      this.settings.gu
    );
  }
  contains(e) {
    return (
      void 0 !== this.fieldMask.find((t) => e.isPrefixOf(t)) ||
      void 0 !== this.fieldTransforms.find((t) => e.isPrefixOf(t.field))
    );
  }
  Pu() {
    if (this.path)
      for (let e = 0; e < this.path.length; e++) this.Au(this.path.get(e));
  }
  Au(e) {
    if (0 === e.length) throw this.mu("Document fields must not be empty");
    if (__PRIVATE_isWrite(this.Iu) && Nt.test(e))
      throw this.mu('Document fields cannot begin and end with "__"');
  }
}
class __PRIVATE_UserDataReader {
  constructor(e, t, n) {
    (this.databaseId = e),
      (this.ignoreUndefinedProperties = t),
      (this.serializer = n || __PRIVATE_newSerializer(e));
  }
  pu(e, t, n, i = !1) {
    return new __PRIVATE_ParseContextImpl(
      {
        Iu: e,
        methodName: t,
        gu: n,
        path: FieldPath$1.emptyPath(),
        du: !1,
        fu: i,
      },
      this.databaseId,
      this.serializer,
      this.ignoreUndefinedProperties
    );
  }
}
function __PRIVATE_newUserDataReader(e) {
  const t = e._freezeSettings(),
    n = __PRIVATE_newSerializer(e._databaseId);
  return new __PRIVATE_UserDataReader(
    e._databaseId,
    !!t.ignoreUndefinedProperties,
    n
  );
}
function __PRIVATE_parseSetData(e, t, n, i, s, o = {}) {
  const u = e.pu(o.merge || o.mergeFields ? 2 : 0, t, n, s);
  __PRIVATE_validatePlainObject("Data must be an object, but it was:", u, i);
  const l = __PRIVATE_parseObject(i, u);
  let _, h;
  if (o.merge) (_ = new FieldMask(u.fieldMask)), (h = u.fieldTransforms);
  else if (o.mergeFields) {
    const e = [];
    for (const i of o.mergeFields) {
      const s = __PRIVATE_fieldPathFromArgument$1(t, i, n);
      if (!u.contains(s))
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          `Field '${s}' is specified in your field mask but missing from your input data.`
        );
      __PRIVATE_fieldMaskContains(e, s) || e.push(s);
    }
    (_ = new FieldMask(e)),
      (h = u.fieldTransforms.filter((e) => _.covers(e.field)));
  } else (_ = null), (h = u.fieldTransforms);
  return new ParsedSetData(new ObjectValue(l), _, h);
}
class __PRIVATE_DeleteFieldValueImpl extends FieldValue {
  _toFieldTransform(e) {
    if (2 !== e.Iu)
      throw 1 === e.Iu
        ? e.mu(
            `${this._methodName}() can only appear at the top level of your update data`
          )
        : e.mu(
            `${this._methodName}() cannot be used with set() unless you pass {merge:true}`
          );
    return e.fieldMask.push(e.path), null;
  }
  isEqual(e) {
    return e instanceof __PRIVATE_DeleteFieldValueImpl;
  }
}
function __PRIVATE_createSentinelChildContext(e, t, n) {
  return new __PRIVATE_ParseContextImpl(
    { Iu: 3, gu: t.settings.gu, methodName: e._methodName, du: n },
    t.databaseId,
    t.serializer,
    t.ignoreUndefinedProperties
  );
}
class __PRIVATE_ServerTimestampFieldValueImpl extends FieldValue {
  _toFieldTransform(e) {
    return new FieldTransform(e.path, new __PRIVATE_ServerTimestampTransform());
  }
  isEqual(e) {
    return e instanceof __PRIVATE_ServerTimestampFieldValueImpl;
  }
}
class __PRIVATE_ArrayUnionFieldValueImpl extends FieldValue {
  constructor(e, t) {
    super(e), (this.yu = t);
  }
  _toFieldTransform(e) {
    const t = __PRIVATE_createSentinelChildContext(this, e, !0),
      n = this.yu.map((e) => __PRIVATE_parseData(e, t)),
      i = new __PRIVATE_ArrayUnionTransformOperation(n);
    return new FieldTransform(e.path, i);
  }
  isEqual(e) {
    return this === e;
  }
}
class __PRIVATE_ArrayRemoveFieldValueImpl extends FieldValue {
  constructor(e, t) {
    super(e), (this.yu = t);
  }
  _toFieldTransform(e) {
    const t = __PRIVATE_createSentinelChildContext(this, e, !0),
      n = this.yu.map((e) => __PRIVATE_parseData(e, t)),
      i = new __PRIVATE_ArrayRemoveTransformOperation(n);
    return new FieldTransform(e.path, i);
  }
  isEqual(e) {
    return this === e;
  }
}
class __PRIVATE_NumericIncrementFieldValueImpl extends FieldValue {
  constructor(e, t) {
    super(e), (this.wu = t);
  }
  _toFieldTransform(e) {
    const t = new __PRIVATE_NumericIncrementTransformOperation(
      e.serializer,
      toNumber(e.serializer, this.wu)
    );
    return new FieldTransform(e.path, t);
  }
  isEqual(e) {
    return this === e;
  }
}
function __PRIVATE_parseUpdateData(e, t, n, i) {
  const s = e.pu(1, t, n);
  __PRIVATE_validatePlainObject("Data must be an object, but it was:", s, i);
  const o = [],
    u = ObjectValue.empty();
  forEach(i, (e, i) => {
    const l = __PRIVATE_fieldPathFromDotSeparatedString(t, e, n);
    i = getModularInstance(i);
    const _ = s.Ru(l);
    if (i instanceof __PRIVATE_DeleteFieldValueImpl) o.push(l);
    else {
      const e = __PRIVATE_parseData(i, _);
      null != e && (o.push(l), u.set(l, e));
    }
  });
  const l = new FieldMask(o);
  return new ParsedUpdateData(u, l, s.fieldTransforms);
}
function __PRIVATE_parseUpdateVarargs(e, t, n, i, s, o) {
  const u = e.pu(1, t, n),
    l = [__PRIVATE_fieldPathFromArgument$1(t, i, n)],
    _ = [s];
  if (o.length % 2 != 0)
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`
    );
  for (let e = 0; e < o.length; e += 2)
    l.push(__PRIVATE_fieldPathFromArgument$1(t, o[e])), _.push(o[e + 1]);
  const h = [],
    d = ObjectValue.empty();
  for (let e = l.length - 1; e >= 0; --e)
    if (!__PRIVATE_fieldMaskContains(h, l[e])) {
      const t = l[e];
      let n = _[e];
      n = getModularInstance(n);
      const i = u.Ru(t);
      if (n instanceof __PRIVATE_DeleteFieldValueImpl) h.push(t);
      else {
        const e = __PRIVATE_parseData(n, i);
        null != e && (h.push(t), d.set(t, e));
      }
    }
  const m = new FieldMask(h);
  return new ParsedUpdateData(d, m, u.fieldTransforms);
}
function __PRIVATE_parseQueryValue(e, t, n, i = !1) {
  return __PRIVATE_parseData(n, e.pu(i ? 4 : 3, t));
}
function __PRIVATE_parseData(e, t) {
  if (__PRIVATE_looksLikeJsonObject((e = getModularInstance(e))))
    return (
      __PRIVATE_validatePlainObject("Unsupported field value:", t, e),
      __PRIVATE_parseObject(e, t)
    );
  if (e instanceof FieldValue)
    return (
      (function __PRIVATE_parseSentinelFieldValue(e, t) {
        if (!__PRIVATE_isWrite(t.Iu))
          throw t.mu(
            `${e._methodName}() can only be used with update() and set()`
          );
        if (!t.path)
          throw t.mu(
            `${e._methodName}() is not currently supported inside arrays`
          );
        const n = e._toFieldTransform(t);
        n && t.fieldTransforms.push(n);
      })(e, t),
      null
    );
  if (void 0 === e && t.ignoreUndefinedProperties) return null;
  if ((t.path && t.fieldMask.push(t.path), e instanceof Array)) {
    if (t.settings.du && 4 !== t.Iu)
      throw t.mu("Nested arrays are not supported");
    return (function __PRIVATE_parseArray(e, t) {
      const n = [];
      let i = 0;
      for (const s of e) {
        let e = __PRIVATE_parseData(s, t.Vu(i));
        null == e && (e = { nullValue: "NULL_VALUE" }), n.push(e), i++;
      }
      return { arrayValue: { values: n } };
    })(e, t);
  }
  return (function __PRIVATE_parseScalarValue(e, t) {
    if (null === (e = getModularInstance(e)))
      return { nullValue: "NULL_VALUE" };
    if ("number" == typeof e) return toNumber(t.serializer, e);
    if ("boolean" == typeof e) return { booleanValue: e };
    if ("string" == typeof e) return { stringValue: e };
    if (e instanceof Date) {
      const n = Timestamp.fromDate(e);
      return { timestampValue: toTimestamp(t.serializer, n) };
    }
    if (e instanceof Timestamp) {
      const n = new Timestamp(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
      return { timestampValue: toTimestamp(t.serializer, n) };
    }
    if (e instanceof GeoPoint)
      return {
        geoPointValue: { latitude: e.latitude, longitude: e.longitude },
      };
    if (e instanceof Bytes)
      return { bytesValue: __PRIVATE_toBytes(t.serializer, e._byteString) };
    if (e instanceof DocumentReference) {
      const n = t.databaseId,
        i = e.firestore._databaseId;
      if (!i.isEqual(n))
        throw t.mu(
          `Document reference is for database ${i.projectId}/${i.database} but should be for database ${n.projectId}/${n.database}`
        );
      return {
        referenceValue: __PRIVATE_toResourceName(
          e.firestore._databaseId || t.databaseId,
          e._key.path
        ),
      };
    }
    throw t.mu(`Unsupported field value: ${__PRIVATE_valueDescription(e)}`);
  })(e, t);
}
function __PRIVATE_parseObject(e, t) {
  const n = {};
  return (
    isEmpty(e)
      ? t.path && t.path.length > 0 && t.fieldMask.push(t.path)
      : forEach(e, (e, i) => {
          const s = __PRIVATE_parseData(i, t.Eu(e));
          null != s && (n[e] = s);
        }),
    { mapValue: { fields: n } }
  );
}
function __PRIVATE_looksLikeJsonObject(e) {
  return !(
    "object" != typeof e ||
    null === e ||
    e instanceof Array ||
    e instanceof Date ||
    e instanceof Timestamp ||
    e instanceof GeoPoint ||
    e instanceof Bytes ||
    e instanceof DocumentReference ||
    e instanceof FieldValue
  );
}
function __PRIVATE_validatePlainObject(e, t, n) {
  if (
    !__PRIVATE_looksLikeJsonObject(n) ||
    !(function __PRIVATE_isPlainObject(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        (Object.getPrototypeOf(e) === Object.prototype ||
          null === Object.getPrototypeOf(e))
      );
    })(n)
  ) {
    const i = __PRIVATE_valueDescription(n);
    throw "an object" === i ? t.mu(e + " a custom object") : t.mu(e + " " + i);
  }
}
function __PRIVATE_fieldPathFromArgument$1(e, t, n) {
  if ((t = getModularInstance(t)) instanceof FieldPath) return t._internalPath;
  if ("string" == typeof t)
    return __PRIVATE_fieldPathFromDotSeparatedString(e, t);
  throw __PRIVATE_createError(
    "Field path arguments must be of type string or ",
    e,
    !1,
    void 0,
    n
  );
}
const kt = new RegExp("[~\\*/\\[\\]]");
function __PRIVATE_fieldPathFromDotSeparatedString(e, t, n) {
  if (t.search(kt) >= 0)
    throw __PRIVATE_createError(
      `Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,
      e,
      !1,
      void 0,
      n
    );
  try {
    return new FieldPath(...t.split("."))._internalPath;
  } catch (i) {
    throw __PRIVATE_createError(
      `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      e,
      !1,
      void 0,
      n
    );
  }
}
function __PRIVATE_createError(e, t, n, i, s) {
  const o = i && !i.isEmpty(),
    u = void 0 !== s;
  let l = `Function ${t}() called with invalid data`;
  n && (l += " (via `toFirestore()`)"), (l += ". ");
  let _ = "";
  return (
    (o || u) &&
      ((_ += " (found"),
      o && (_ += ` in field ${i}`),
      u && (_ += ` in document ${s}`),
      (_ += ")")),
    new FirestoreError($e.INVALID_ARGUMENT, l + e + _)
  );
}
function __PRIVATE_fieldMaskContains(e, t) {
  return e.some((e) => e.isEqual(t));
}
class DocumentSnapshot$1 {
  constructor(e, t, n, i, s) {
    (this._firestore = e),
      (this._userDataWriter = t),
      (this._key = n),
      (this._document = i),
      (this._converter = s);
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get ref() {
    return new DocumentReference(this._firestore, this._converter, this._key);
  }
  exists() {
    return null !== this._document;
  }
  data() {
    if (this._document) {
      if (this._converter) {
        const e = new QueryDocumentSnapshot$1(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          null
        );
        return this._converter.fromFirestore(e);
      }
      return this._userDataWriter.convertValue(this._document.data.value);
    }
  }
  get(e) {
    if (this._document) {
      const t = this._document.data.field(
        __PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", e)
      );
      if (null !== t) return this._userDataWriter.convertValue(t);
    }
  }
}
class QueryDocumentSnapshot$1 extends DocumentSnapshot$1 {
  data() {
    return super.data();
  }
}
function __PRIVATE_fieldPathFromArgument(e, t) {
  return "string" == typeof t
    ? __PRIVATE_fieldPathFromDotSeparatedString(e, t)
    : t instanceof FieldPath
    ? t._internalPath
    : t._delegate._internalPath;
}
function __PRIVATE_validateHasExplicitOrderByForLimitToLast(e) {
  if ("L" === e.limitType && 0 === e.explicitOrderBy.length)
    throw new FirestoreError(
      $e.UNIMPLEMENTED,
      "limitToLast() queries require specifying at least one orderBy() clause"
    );
}
class AppliableConstraint {}
class QueryConstraint extends AppliableConstraint {}
function query(e, t, ...n) {
  let i = [];
  t instanceof AppliableConstraint && i.push(t),
    (i = i.concat(n)),
    (function __PRIVATE_validateQueryConstraintArray(e) {
      const t = e.filter(
          (e) => e instanceof QueryCompositeFilterConstraint
        ).length,
        n = e.filter((e) => e instanceof QueryFieldFilterConstraint).length;
      if (t > 1 || (t > 0 && n > 0))
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`."
        );
    })(i);
  for (const t of i) e = t._apply(e);
  return e;
}
class QueryFieldFilterConstraint extends QueryConstraint {
  constructor(e, t, n) {
    super(),
      (this._field = e),
      (this._op = t),
      (this._value = n),
      (this.type = "where");
  }
  static _create(e, t, n) {
    return new QueryFieldFilterConstraint(e, t, n);
  }
  _apply(e) {
    const t = this._parse(e);
    return (
      __PRIVATE_validateNewFieldFilter(e._query, t),
      new Query(
        e.firestore,
        e.converter,
        __PRIVATE_queryWithAddedFilter(e._query, t)
      )
    );
  }
  _parse(e) {
    const t = __PRIVATE_newUserDataReader(e.firestore),
      n = (function __PRIVATE_newQueryFilter(e, t, n, i, s, o, u) {
        let l;
        if (s.isKeyField()) {
          if ("array-contains" === o || "array-contains-any" === o)
            throw new FirestoreError(
              $e.INVALID_ARGUMENT,
              `Invalid Query. You can't perform '${o}' queries on documentId().`
            );
          if ("in" === o || "not-in" === o) {
            __PRIVATE_validateDisjunctiveFilterElements(u, o);
            const t = [];
            for (const n of u) t.push(__PRIVATE_parseDocumentIdValue(i, e, n));
            l = { arrayValue: { values: t } };
          } else l = __PRIVATE_parseDocumentIdValue(i, e, u);
        } else
          ("in" !== o && "not-in" !== o && "array-contains-any" !== o) ||
            __PRIVATE_validateDisjunctiveFilterElements(u, o),
            (l = __PRIVATE_parseQueryValue(
              n,
              t,
              u,
              "in" === o || "not-in" === o
            ));
        return FieldFilter.create(s, o, l);
      })(
        e._query,
        "where",
        t,
        e.firestore._databaseId,
        this._field,
        this._op,
        this._value
      );
    return n;
  }
}
function where(e, t, n) {
  const i = t,
    s = __PRIVATE_fieldPathFromArgument("where", e);
  return QueryFieldFilterConstraint._create(s, i, n);
}
class QueryCompositeFilterConstraint extends AppliableConstraint {
  constructor(e, t) {
    super(), (this.type = e), (this._queryConstraints = t);
  }
  static _create(e, t) {
    return new QueryCompositeFilterConstraint(e, t);
  }
  _parse(e) {
    const t = this._queryConstraints
      .map((t) => t._parse(e))
      .filter((e) => e.getFilters().length > 0);
    return 1 === t.length
      ? t[0]
      : CompositeFilter.create(t, this._getOperator());
  }
  _apply(e) {
    const t = this._parse(e);
    return 0 === t.getFilters().length
      ? e
      : ((function __PRIVATE_validateNewFilter(e, t) {
          let n = e;
          const i = t.getFlattenedFilters();
          for (const e of i)
            __PRIVATE_validateNewFieldFilter(n, e),
              (n = __PRIVATE_queryWithAddedFilter(n, e));
        })(e._query, t),
        new Query(
          e.firestore,
          e.converter,
          __PRIVATE_queryWithAddedFilter(e._query, t)
        ));
  }
  _getQueryConstraints() {
    return this._queryConstraints;
  }
  _getOperator() {
    return "and" === this.type ? "and" : "or";
  }
}
function or(...e) {
  return (
    e.forEach((e) => __PRIVATE_validateQueryFilterConstraint("or", e)),
    QueryCompositeFilterConstraint._create("or", e)
  );
}
function and(...e) {
  return (
    e.forEach((e) => __PRIVATE_validateQueryFilterConstraint("and", e)),
    QueryCompositeFilterConstraint._create("and", e)
  );
}
class QueryOrderByConstraint extends QueryConstraint {
  constructor(e, t) {
    super(), (this._field = e), (this._direction = t), (this.type = "orderBy");
  }
  static _create(e, t) {
    return new QueryOrderByConstraint(e, t);
  }
  _apply(e) {
    const t = (function __PRIVATE_newQueryOrderBy(e, t, n) {
      if (null !== e.startAt)
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          "Invalid query. You must not call startAt() or startAfter() before calling orderBy()."
        );
      if (null !== e.endAt)
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          "Invalid query. You must not call endAt() or endBefore() before calling orderBy()."
        );
      return new OrderBy(t, n);
    })(e._query, this._field, this._direction);
    return new Query(
      e.firestore,
      e.converter,
      (function __PRIVATE_queryWithAddedOrderBy(e, t) {
        const n = e.explicitOrderBy.concat([t]);
        return new __PRIVATE_QueryImpl(
          e.path,
          e.collectionGroup,
          n,
          e.filters.slice(),
          e.limit,
          e.limitType,
          e.startAt,
          e.endAt
        );
      })(e._query, t)
    );
  }
}
function orderBy(e, t = "asc") {
  const n = t,
    i = __PRIVATE_fieldPathFromArgument("orderBy", e);
  return QueryOrderByConstraint._create(i, n);
}
class QueryLimitConstraint extends QueryConstraint {
  constructor(e, t, n) {
    super(), (this.type = e), (this._limit = t), (this._limitType = n);
  }
  static _create(e, t, n) {
    return new QueryLimitConstraint(e, t, n);
  }
  _apply(e) {
    return new Query(
      e.firestore,
      e.converter,
      __PRIVATE_queryWithLimit(e._query, this._limit, this._limitType)
    );
  }
}
function limit(e) {
  return (
    __PRIVATE_validatePositiveNumber("limit", e),
    QueryLimitConstraint._create("limit", e, "F")
  );
}
function limitToLast(e) {
  return (
    __PRIVATE_validatePositiveNumber("limitToLast", e),
    QueryLimitConstraint._create("limitToLast", e, "L")
  );
}
class QueryStartAtConstraint extends QueryConstraint {
  constructor(e, t, n) {
    super(), (this.type = e), (this._docOrFields = t), (this._inclusive = n);
  }
  static _create(e, t, n) {
    return new QueryStartAtConstraint(e, t, n);
  }
  _apply(e) {
    const t = __PRIVATE_newQueryBoundFromDocOrFields(
      e,
      this.type,
      this._docOrFields,
      this._inclusive
    );
    return new Query(
      e.firestore,
      e.converter,
      (function __PRIVATE_queryWithStartAt(e, t) {
        return new __PRIVATE_QueryImpl(
          e.path,
          e.collectionGroup,
          e.explicitOrderBy.slice(),
          e.filters.slice(),
          e.limit,
          e.limitType,
          t,
          e.endAt
        );
      })(e._query, t)
    );
  }
}
function startAt(...e) {
  return QueryStartAtConstraint._create("startAt", e, !0);
}
function startAfter(...e) {
  return QueryStartAtConstraint._create("startAfter", e, !1);
}
class QueryEndAtConstraint extends QueryConstraint {
  constructor(e, t, n) {
    super(), (this.type = e), (this._docOrFields = t), (this._inclusive = n);
  }
  static _create(e, t, n) {
    return new QueryEndAtConstraint(e, t, n);
  }
  _apply(e) {
    const t = __PRIVATE_newQueryBoundFromDocOrFields(
      e,
      this.type,
      this._docOrFields,
      this._inclusive
    );
    return new Query(
      e.firestore,
      e.converter,
      (function __PRIVATE_queryWithEndAt(e, t) {
        return new __PRIVATE_QueryImpl(
          e.path,
          e.collectionGroup,
          e.explicitOrderBy.slice(),
          e.filters.slice(),
          e.limit,
          e.limitType,
          e.startAt,
          t
        );
      })(e._query, t)
    );
  }
}
function endBefore(...e) {
  return QueryEndAtConstraint._create("endBefore", e, !1);
}
function endAt(...e) {
  return QueryEndAtConstraint._create("endAt", e, !0);
}
function __PRIVATE_newQueryBoundFromDocOrFields(e, t, n, i) {
  if (((n[0] = getModularInstance(n[0])), n[0] instanceof DocumentSnapshot$1))
    return (function __PRIVATE_newQueryBoundFromDocument(e, t, n, i, s) {
      if (!i)
        throw new FirestoreError(
          $e.NOT_FOUND,
          `Can't use a DocumentSnapshot that doesn't exist for ${n}().`
        );
      const o = [];
      for (const n of __PRIVATE_queryNormalizedOrderBy(e))
        if (n.field.isKeyField()) o.push(__PRIVATE_refValue(t, i.key));
        else {
          const e = i.data.field(n.field);
          if (__PRIVATE_isServerTimestamp(e))
            throw new FirestoreError(
              $e.INVALID_ARGUMENT,
              'Invalid query. You are trying to start or end a query using a document for which the field "' +
                n.field +
                '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)'
            );
          if (null === e) {
            const e = n.field.canonicalString();
            throw new FirestoreError(
              $e.INVALID_ARGUMENT,
              `Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`
            );
          }
          o.push(e);
        }
      return new Bound(o, s);
    })(e._query, e.firestore._databaseId, t, n[0]._document, i);
  {
    const s = __PRIVATE_newUserDataReader(e.firestore);
    return (function __PRIVATE_newQueryBoundFromFields(e, t, n, i, s, o) {
      const u = e.explicitOrderBy;
      if (s.length > u.length)
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          `Too many arguments provided to ${i}(). The number of arguments must be less than or equal to the number of orderBy() clauses`
        );
      const l = [];
      for (let o = 0; o < s.length; o++) {
        const _ = s[o];
        if (u[o].field.isKeyField()) {
          if ("string" != typeof _)
            throw new FirestoreError(
              $e.INVALID_ARGUMENT,
              `Invalid query. Expected a string for document ID in ${i}(), but got a ${typeof _}`
            );
          if (!__PRIVATE_isCollectionGroupQuery(e) && -1 !== _.indexOf("/"))
            throw new FirestoreError(
              $e.INVALID_ARGUMENT,
              `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${i}() must be a plain document ID, but '${_}' contains a slash.`
            );
          const n = e.path.child(ResourcePath.fromString(_));
          if (!DocumentKey.isDocumentKey(n))
            throw new FirestoreError(
              $e.INVALID_ARGUMENT,
              `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${i}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`
            );
          const s = new DocumentKey(n);
          l.push(__PRIVATE_refValue(t, s));
        } else {
          const e = __PRIVATE_parseQueryValue(n, i, _);
          l.push(e);
        }
      }
      return new Bound(l, o);
    })(e._query, e.firestore._databaseId, s, t, n, i);
  }
}
function __PRIVATE_parseDocumentIdValue(e, t, n) {
  if ("string" == typeof (n = getModularInstance(n))) {
    if ("" === n)
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string."
      );
    if (!__PRIVATE_isCollectionGroupQuery(t) && -1 !== n.indexOf("/"))
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`
      );
    const i = t.path.child(ResourcePath.fromString(n));
    if (!DocumentKey.isDocumentKey(i))
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`
      );
    return __PRIVATE_refValue(e, new DocumentKey(i));
  }
  if (n instanceof DocumentReference) return __PRIVATE_refValue(e, n._key);
  throw new FirestoreError(
    $e.INVALID_ARGUMENT,
    `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${__PRIVATE_valueDescription(
      n
    )}.`
  );
}
function __PRIVATE_validateDisjunctiveFilterElements(e, t) {
  if (!Array.isArray(e) || 0 === e.length)
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`
    );
}
function __PRIVATE_validateNewFieldFilter(e, t) {
  const n = (function __PRIVATE_findOpInsideFilters(e, t) {
    for (const n of e)
      for (const e of n.getFlattenedFilters())
        if (t.indexOf(e.op) >= 0) return e.op;
    return null;
  })(
    e.filters,
    (function __PRIVATE_conflictingOps(e) {
      switch (e) {
        case "!=":
          return ["!=", "not-in"];
        case "array-contains-any":
        case "in":
          return ["not-in"];
        case "not-in":
          return ["array-contains-any", "in", "not-in", "!="];
        default:
          return [];
      }
    })(t.op)
  );
  if (null !== n)
    throw n === t.op
      ? new FirestoreError(
          $e.INVALID_ARGUMENT,
          `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`
        )
      : new FirestoreError(
          $e.INVALID_ARGUMENT,
          `Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`
        );
}
function __PRIVATE_validateQueryFilterConstraint(e, t) {
  if (
    !(
      t instanceof QueryFieldFilterConstraint ||
      t instanceof QueryCompositeFilterConstraint
    )
  )
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      `Function ${e}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`
    );
}
class AbstractUserDataWriter {
  convertValue(e, t = "none") {
    switch (__PRIVATE_typeOrder(e)) {
      case 0:
        return null;
      case 1:
        return e.booleanValue;
      case 2:
        return __PRIVATE_normalizeNumber(e.integerValue || e.doubleValue);
      case 3:
        return this.convertTimestamp(e.timestampValue);
      case 4:
        return this.convertServerTimestamp(e, t);
      case 5:
        return e.stringValue;
      case 6:
        return this.convertBytes(__PRIVATE_normalizeByteString(e.bytesValue));
      case 7:
        return this.convertReference(e.referenceValue);
      case 8:
        return this.convertGeoPoint(e.geoPointValue);
      case 9:
        return this.convertArray(e.arrayValue, t);
      case 10:
        return this.convertObject(e.mapValue, t);
      default:
        throw fail();
    }
  }
  convertObject(e, t) {
    return this.convertObjectMap(e.fields, t);
  }
  convertObjectMap(e, t = "none") {
    const n = {};
    return (
      forEach(e, (e, i) => {
        n[e] = this.convertValue(i, t);
      }),
      n
    );
  }
  convertGeoPoint(e) {
    return new GeoPoint(
      __PRIVATE_normalizeNumber(e.latitude),
      __PRIVATE_normalizeNumber(e.longitude)
    );
  }
  convertArray(e, t) {
    return (e.values || []).map((e) => this.convertValue(e, t));
  }
  convertServerTimestamp(e, t) {
    switch (t) {
      case "previous":
        const n = __PRIVATE_getPreviousValue(e);
        return null == n ? null : this.convertValue(n, t);
      case "estimate":
        return this.convertTimestamp(__PRIVATE_getLocalWriteTime(e));
      default:
        return null;
    }
  }
  convertTimestamp(e) {
    const t = __PRIVATE_normalizeTimestamp(e);
    return new Timestamp(t.seconds, t.nanos);
  }
  convertDocumentKey(e, t) {
    const n = ResourcePath.fromString(e);
    __PRIVATE_hardAssert(__PRIVATE_isValidResourceName(n));
    const i = new DatabaseId(n.get(1), n.get(3)),
      s = new DocumentKey(n.popFirst(5));
    return (
      i.isEqual(t) ||
        __PRIVATE_logError(
          `Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`
        ),
      s
    );
  }
}
function __PRIVATE_applyFirestoreDataConverter(e, t, n) {
  let i;
  return (
    (i = e
      ? n && (n.merge || n.mergeFields)
        ? e.toFirestore(t, n)
        : e.toFirestore(t)
      : t),
    i
  );
}
class __PRIVATE_LiteUserDataWriter extends AbstractUserDataWriter {
  constructor(e) {
    super(), (this.firestore = e);
  }
  convertBytes(e) {
    return new Bytes(e);
  }
  convertReference(e) {
    const t = this.convertDocumentKey(e, this.firestore._databaseId);
    return new DocumentReference(this.firestore, null, t);
  }
}
function sum(e) {
  return new AggregateField("sum", __PRIVATE_fieldPathFromArgument$1("sum", e));
}
function average(e) {
  return new AggregateField(
    "avg",
    __PRIVATE_fieldPathFromArgument$1("average", e)
  );
}
function count() {
  return new AggregateField("count");
}
function aggregateFieldEqual(e, t) {
  var n, i;
  return (
    e instanceof AggregateField &&
    t instanceof AggregateField &&
    e.aggregateType === t.aggregateType &&
    (null === (n = e._internalFieldPath) || void 0 === n
      ? void 0
      : n.canonicalString()) ===
      (null === (i = t._internalFieldPath) || void 0 === i
        ? void 0
        : i.canonicalString())
  );
}
function aggregateQuerySnapshotEqual(e, t) {
  return queryEqual(e.query, t.query) && deepEqual(e.data(), t.data());
}
class SnapshotMetadata {
  constructor(e, t) {
    (this.hasPendingWrites = e), (this.fromCache = t);
  }
  isEqual(e) {
    return (
      this.hasPendingWrites === e.hasPendingWrites &&
      this.fromCache === e.fromCache
    );
  }
}
class DocumentSnapshot extends DocumentSnapshot$1 {
  constructor(e, t, n, i, s, o) {
    super(e, t, n, i, o),
      (this._firestore = e),
      (this._firestoreImpl = e),
      (this.metadata = s);
  }
  exists() {
    return super.exists();
  }
  data(e = {}) {
    if (this._document) {
      if (this._converter) {
        const t = new QueryDocumentSnapshot(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          this.metadata,
          null
        );
        return this._converter.fromFirestore(t, e);
      }
      return this._userDataWriter.convertValue(
        this._document.data.value,
        e.serverTimestamps
      );
    }
  }
  get(e, t = {}) {
    if (this._document) {
      const n = this._document.data.field(
        __PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", e)
      );
      if (null !== n)
        return this._userDataWriter.convertValue(n, t.serverTimestamps);
    }
  }
}
class QueryDocumentSnapshot extends DocumentSnapshot {
  data(e = {}) {
    return super.data(e);
  }
}
class QuerySnapshot {
  constructor(e, t, n, i) {
    (this._firestore = e),
      (this._userDataWriter = t),
      (this._snapshot = i),
      (this.metadata = new SnapshotMetadata(i.hasPendingWrites, i.fromCache)),
      (this.query = n);
  }
  get docs() {
    const e = [];
    return this.forEach((t) => e.push(t)), e;
  }
  get size() {
    return this._snapshot.docs.size;
  }
  get empty() {
    return 0 === this.size;
  }
  forEach(e, t) {
    this._snapshot.docs.forEach((n) => {
      e.call(
        t,
        new QueryDocumentSnapshot(
          this._firestore,
          this._userDataWriter,
          n.key,
          n,
          new SnapshotMetadata(
            this._snapshot.mutatedKeys.has(n.key),
            this._snapshot.fromCache
          ),
          this.query.converter
        )
      );
    });
  }
  docChanges(e = {}) {
    const t = !!e.includeMetadataChanges;
    if (t && this._snapshot.excludesMetadataChanges)
      throw new FirestoreError(
        $e.INVALID_ARGUMENT,
        "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot()."
      );
    return (
      (this._cachedChanges &&
        this._cachedChangesIncludeMetadataChanges === t) ||
        ((this._cachedChanges = (function __PRIVATE_changesFromSnapshot(e, t) {
          if (e._snapshot.oldDocs.isEmpty()) {
            let t = 0;
            return e._snapshot.docChanges.map((n) => {
              const i = new QueryDocumentSnapshot(
                e._firestore,
                e._userDataWriter,
                n.doc.key,
                n.doc,
                new SnapshotMetadata(
                  e._snapshot.mutatedKeys.has(n.doc.key),
                  e._snapshot.fromCache
                ),
                e.query.converter
              );
              return (
                n.doc, { type: "added", doc: i, oldIndex: -1, newIndex: t++ }
              );
            });
          }
          {
            let n = e._snapshot.oldDocs;
            return e._snapshot.docChanges
              .filter((e) => t || 3 !== e.type)
              .map((t) => {
                const i = new QueryDocumentSnapshot(
                  e._firestore,
                  e._userDataWriter,
                  t.doc.key,
                  t.doc,
                  new SnapshotMetadata(
                    e._snapshot.mutatedKeys.has(t.doc.key),
                    e._snapshot.fromCache
                  ),
                  e.query.converter
                );
                let s = -1,
                  o = -1;
                return (
                  0 !== t.type &&
                    ((s = n.indexOf(t.doc.key)), (n = n.delete(t.doc.key))),
                  1 !== t.type &&
                    ((n = n.add(t.doc)), (o = n.indexOf(t.doc.key))),
                  {
                    type: __PRIVATE_resultChangeType(t.type),
                    doc: i,
                    oldIndex: s,
                    newIndex: o,
                  }
                );
              });
          }
        })(this, t)),
        (this._cachedChangesIncludeMetadataChanges = t)),
      this._cachedChanges
    );
  }
}
function __PRIVATE_resultChangeType(e) {
  switch (e) {
    case 0:
      return "added";
    case 2:
    case 3:
      return "modified";
    case 1:
      return "removed";
    default:
      return fail();
  }
}
function snapshotEqual(e, t) {
  return e instanceof DocumentSnapshot && t instanceof DocumentSnapshot
    ? e._firestore === t._firestore &&
        e._key.isEqual(t._key) &&
        (null === e._document
          ? null === t._document
          : e._document.isEqual(t._document)) &&
        e._converter === t._converter
    : e instanceof QuerySnapshot &&
        t instanceof QuerySnapshot &&
        e._firestore === t._firestore &&
        queryEqual(e.query, t.query) &&
        e.metadata.isEqual(t.metadata) &&
        e._snapshot.isEqual(t._snapshot);
}
function getDoc(e) {
  e = __PRIVATE_cast(e, DocumentReference);
  const t = __PRIVATE_cast(e.firestore, Firestore);
  return __PRIVATE_firestoreClientGetDocumentViaSnapshotListener(
    ensureFirestoreConfigured(t),
    e._key
  ).then((n) => __PRIVATE_convertToDocSnapshot(t, e, n));
}
class __PRIVATE_ExpUserDataWriter extends AbstractUserDataWriter {
  constructor(e) {
    super(), (this.firestore = e);
  }
  convertBytes(e) {
    return new Bytes(e);
  }
  convertReference(e) {
    const t = this.convertDocumentKey(e, this.firestore._databaseId);
    return new DocumentReference(this.firestore, null, t);
  }
}
function getDocFromCache(e) {
  e = __PRIVATE_cast(e, DocumentReference);
  const t = __PRIVATE_cast(e.firestore, Firestore),
    n = ensureFirestoreConfigured(t),
    i = new __PRIVATE_ExpUserDataWriter(t);
  return (function __PRIVATE_firestoreClientGetDocumentFromLocalCache(e, t) {
    const n = new __PRIVATE_Deferred();
    return (
      e.asyncQueue.enqueueAndForget(async () =>
        (async function __PRIVATE_readDocumentFromCache(e, t, n) {
          try {
            const i = await (function __PRIVATE_localStoreReadDocument(e, t) {
              const n = __PRIVATE_debugCast(e);
              return n.persistence.runTransaction(
                "read document",
                "readonly",
                (e) => n.localDocuments.getDocument(e, t)
              );
            })(e, t);
            i.isFoundDocument()
              ? n.resolve(i)
              : i.isNoDocument()
              ? n.resolve(null)
              : n.reject(
                  new FirestoreError(
                    $e.UNAVAILABLE,
                    "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"
                  )
                );
          } catch (e) {
            const i = __PRIVATE_wrapInUserErrorIfRecoverable(
              e,
              `Failed to get document '${t} from cache`
            );
            n.reject(i);
          }
        })(await __PRIVATE_getLocalStore(e), t, n)
      ),
      n.promise
    );
  })(n, e._key).then(
    (n) =>
      new DocumentSnapshot(
        t,
        i,
        e._key,
        n,
        new SnapshotMetadata(null !== n && n.hasLocalMutations, !0),
        e.converter
      )
  );
}
function getDocFromServer(e) {
  e = __PRIVATE_cast(e, DocumentReference);
  const t = __PRIVATE_cast(e.firestore, Firestore);
  return __PRIVATE_firestoreClientGetDocumentViaSnapshotListener(
    ensureFirestoreConfigured(t),
    e._key,
    { source: "server" }
  ).then((n) => __PRIVATE_convertToDocSnapshot(t, e, n));
}
function getDocs(e) {
  e = __PRIVATE_cast(e, Query);
  const t = __PRIVATE_cast(e.firestore, Firestore),
    n = ensureFirestoreConfigured(t),
    i = new __PRIVATE_ExpUserDataWriter(t);
  return (
    __PRIVATE_validateHasExplicitOrderByForLimitToLast(e._query),
    __PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(n, e._query).then(
      (n) => new QuerySnapshot(t, i, e, n)
    )
  );
}
function getDocsFromCache(e) {
  e = __PRIVATE_cast(e, Query);
  const t = __PRIVATE_cast(e.firestore, Firestore),
    n = ensureFirestoreConfigured(t),
    i = new __PRIVATE_ExpUserDataWriter(t);
  return (function __PRIVATE_firestoreClientGetDocumentsFromLocalCache(e, t) {
    const n = new __PRIVATE_Deferred();
    return (
      e.asyncQueue.enqueueAndForget(async () =>
        (async function __PRIVATE_executeQueryFromCache(e, t, n) {
          try {
            const i = await __PRIVATE_localStoreExecuteQuery(e, t, !0),
              s = new __PRIVATE_View(t, i.ls),
              o = s.ca(i.documents),
              u = s.applyChanges(o, !1);
            n.resolve(u.snapshot);
          } catch (e) {
            const i = __PRIVATE_wrapInUserErrorIfRecoverable(
              e,
              `Failed to execute query '${t} against cache`
            );
            n.reject(i);
          }
        })(await __PRIVATE_getLocalStore(e), t, n)
      ),
      n.promise
    );
  })(n, e._query).then((n) => new QuerySnapshot(t, i, e, n));
}
function getDocsFromServer(e) {
  e = __PRIVATE_cast(e, Query);
  const t = __PRIVATE_cast(e.firestore, Firestore),
    n = ensureFirestoreConfigured(t),
    i = new __PRIVATE_ExpUserDataWriter(t);
  return __PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(n, e._query, {
    source: "server",
  }).then((n) => new QuerySnapshot(t, i, e, n));
}
function setDoc(e, t, n) {
  e = __PRIVATE_cast(e, DocumentReference);
  const i = __PRIVATE_cast(e.firestore, Firestore),
    s = __PRIVATE_applyFirestoreDataConverter(e.converter, t, n);
  return executeWrite(i, [
    __PRIVATE_parseSetData(
      __PRIVATE_newUserDataReader(i),
      "setDoc",
      e._key,
      s,
      null !== e.converter,
      n
    ).toMutation(e._key, Precondition.none()),
  ]);
}
function updateDoc(e, t, n, ...i) {
  e = __PRIVATE_cast(e, DocumentReference);
  const s = __PRIVATE_cast(e.firestore, Firestore),
    o = __PRIVATE_newUserDataReader(s);
  let u;
  return (
    (u =
      "string" == typeof (t = getModularInstance(t)) || t instanceof FieldPath
        ? __PRIVATE_parseUpdateVarargs(o, "updateDoc", e._key, t, n, i)
        : __PRIVATE_parseUpdateData(o, "updateDoc", e._key, t)),
    executeWrite(s, [u.toMutation(e._key, Precondition.exists(!0))])
  );
}
function deleteDoc(e) {
  return executeWrite(__PRIVATE_cast(e.firestore, Firestore), [
    new __PRIVATE_DeleteMutation(e._key, Precondition.none()),
  ]);
}
function addDoc(e, t) {
  const n = __PRIVATE_cast(e.firestore, Firestore),
    i = doc(e),
    s = __PRIVATE_applyFirestoreDataConverter(e.converter, t);
  return executeWrite(n, [
    __PRIVATE_parseSetData(
      __PRIVATE_newUserDataReader(e.firestore),
      "addDoc",
      i._key,
      s,
      null !== e.converter,
      {}
    ).toMutation(i._key, Precondition.exists(!1)),
  ]).then(() => i);
}
function onSnapshot(e, ...t) {
  var n, i, s;
  e = getModularInstance(e);
  let o = { includeMetadataChanges: !1 },
    u = 0;
  "object" != typeof t[u] ||
    __PRIVATE_isPartialObserver(t[u]) ||
    ((o = t[u]), u++);
  const l = { includeMetadataChanges: o.includeMetadataChanges };
  if (__PRIVATE_isPartialObserver(t[u])) {
    const e = t[u];
    (t[u] = null === (n = e.next) || void 0 === n ? void 0 : n.bind(e)),
      (t[u + 1] = null === (i = e.error) || void 0 === i ? void 0 : i.bind(e)),
      (t[u + 2] =
        null === (s = e.complete) || void 0 === s ? void 0 : s.bind(e));
  }
  let _, h, d;
  if (e instanceof DocumentReference)
    (h = __PRIVATE_cast(e.firestore, Firestore)),
      (d = __PRIVATE_newQueryForPath(e._key.path)),
      (_ = {
        next: (n) => {
          t[u] && t[u](__PRIVATE_convertToDocSnapshot(h, e, n));
        },
        error: t[u + 1],
        complete: t[u + 2],
      });
  else {
    const n = __PRIVATE_cast(e, Query);
    (h = __PRIVATE_cast(n.firestore, Firestore)), (d = n._query);
    const i = new __PRIVATE_ExpUserDataWriter(h);
    (_ = {
      next: (e) => {
        t[u] && t[u](new QuerySnapshot(h, i, n, e));
      },
      error: t[u + 1],
      complete: t[u + 2],
    }),
      __PRIVATE_validateHasExplicitOrderByForLimitToLast(e._query);
  }
  return (function __PRIVATE_firestoreClientListen(e, t, n, i) {
    const s = new __PRIVATE_AsyncObserver(i),
      o = new __PRIVATE_QueryListener(t, s, n);
    return (
      e.asyncQueue.enqueueAndForget(async () =>
        __PRIVATE_eventManagerListen(await __PRIVATE_getEventManager(e), o)
      ),
      () => {
        s.Na(),
          e.asyncQueue.enqueueAndForget(async () =>
            __PRIVATE_eventManagerUnlisten(
              await __PRIVATE_getEventManager(e),
              o
            )
          );
      }
    );
  })(ensureFirestoreConfigured(h), d, l, _);
}
function onSnapshotsInSync(e, t) {
  return (function __PRIVATE_firestoreClientAddSnapshotsInSyncListener(e, t) {
    const n = new __PRIVATE_AsyncObserver(t);
    return (
      e.asyncQueue.enqueueAndForget(async () =>
        (function __PRIVATE_addSnapshotsInSyncListener(e, t) {
          __PRIVATE_debugCast(e).q_.add(t), t.next();
        })(await __PRIVATE_getEventManager(e), n)
      ),
      () => {
        n.Na(),
          e.asyncQueue.enqueueAndForget(async () =>
            (function __PRIVATE_removeSnapshotsInSyncListener(e, t) {
              __PRIVATE_debugCast(e).q_.delete(t);
            })(await __PRIVATE_getEventManager(e), n)
          );
      }
    );
  })(
    ensureFirestoreConfigured((e = __PRIVATE_cast(e, Firestore))),
    __PRIVATE_isPartialObserver(t) ? t : { next: t }
  );
}
function executeWrite(e, t) {
  return (function __PRIVATE_firestoreClientWrite(e, t) {
    const n = new __PRIVATE_Deferred();
    return (
      e.asyncQueue.enqueueAndForget(async () =>
        (async function __PRIVATE_syncEngineWrite(e, t, n) {
          const i = __PRIVATE_syncEngineEnsureWriteCallbacks(e);
          try {
            const e = await (function __PRIVATE_localStoreWriteLocally(e, t) {
              const n = __PRIVATE_debugCast(e),
                i = Timestamp.now(),
                s = t.reduce(
                  (e, t) => e.add(t.key),
                  __PRIVATE_documentKeySet()
                );
              let o, u;
              return n.persistence
                .runTransaction("Locally write mutations", "readwrite", (e) => {
                  let l = __PRIVATE_mutableDocumentMap(),
                    _ = __PRIVATE_documentKeySet();
                  return n.ss
                    .getEntries(e, s)
                    .next((e) => {
                      (l = e),
                        l.forEach((e, t) => {
                          t.isValidDocument() || (_ = _.add(e));
                        });
                    })
                    .next(() => n.localDocuments.getOverlayedDocuments(e, l))
                    .next((s) => {
                      o = s;
                      const u = [];
                      for (const e of t) {
                        const t = __PRIVATE_mutationExtractBaseValue(
                          e,
                          o.get(e.key).overlayedDocument
                        );
                        null != t &&
                          u.push(
                            new __PRIVATE_PatchMutation(
                              e.key,
                              t,
                              __PRIVATE_extractFieldMask(t.value.mapValue),
                              Precondition.exists(!0)
                            )
                          );
                      }
                      return n.mutationQueue.addMutationBatch(e, i, u, t);
                    })
                    .next((t) => {
                      u = t;
                      const i = t.applyToLocalDocumentSet(o, _);
                      return n.documentOverlayCache.saveOverlays(
                        e,
                        t.batchId,
                        i
                      );
                    });
                })
                .then(() => ({
                  batchId: u.batchId,
                  changes:
                    __PRIVATE_convertOverlayedDocumentMapToDocumentMap(o),
                }));
            })(i.localStore, t);
            i.sharedClientState.addPendingMutation(e.batchId),
              (function __PRIVATE_addMutationCallback(e, t, n) {
                let i = e.Sa[e.currentUser.toKey()];
                i || (i = new SortedMap(__PRIVATE_primitiveComparator)),
                  (i = i.insert(t, n)),
                  (e.Sa[e.currentUser.toKey()] = i);
              })(i, e.batchId, n),
              await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(
                i,
                e.changes
              ),
              await __PRIVATE_fillWritePipeline(i.remoteStore);
          } catch (e) {
            const t = __PRIVATE_wrapInUserErrorIfRecoverable(
              e,
              "Failed to persist write"
            );
            n.reject(t);
          }
        })(await __PRIVATE_getSyncEngine(e), t, n)
      ),
      n.promise
    );
  })(ensureFirestoreConfigured(e), t);
}
function __PRIVATE_convertToDocSnapshot(e, t, n) {
  const i = n.docs.get(t._key),
    s = new __PRIVATE_ExpUserDataWriter(e);
  return new DocumentSnapshot(
    e,
    s,
    t._key,
    i,
    new SnapshotMetadata(n.hasPendingWrites, n.fromCache),
    t.converter
  );
}
function getCountFromServer(e) {
  return getAggregateFromServer(e, { count: count() });
}
function getAggregateFromServer(e, t) {
  const n = __PRIVATE_cast(e.firestore, Firestore),
    i = ensureFirestoreConfigured(n),
    s = (function __PRIVATE_mapToArray(e, t) {
      const n = [];
      for (const i in e)
        Object.prototype.hasOwnProperty.call(e, i) && n.push(t(e[i], i, e));
      return n;
    })(
      t,
      (e, t) =>
        new __PRIVATE_AggregateImpl(t, e.aggregateType, e._internalFieldPath)
    );
  return (function __PRIVATE_firestoreClientRunAggregateQuery(e, t, n) {
    const i = new __PRIVATE_Deferred();
    return (
      e.asyncQueue.enqueueAndForget(async () => {
        try {
          const s = await __PRIVATE_getDatastore(e);
          i.resolve(
            (async function __PRIVATE_invokeRunAggregationQueryRpc(e, t, n) {
              var i;
              const s = __PRIVATE_debugCast(e),
                { request: o, R_: u } =
                  (function __PRIVATE_toRunAggregationQueryRequest(e, t, n) {
                    const i = __PRIVATE_toQueryTarget(e, t),
                      s = {},
                      o = [];
                    let u = 0;
                    return (
                      n.forEach((e) => {
                        const t = "aggregate_" + u++;
                        (s[t] = e.alias),
                          "count" === e.aggregateType
                            ? o.push({ alias: t, count: {} })
                            : "avg" === e.aggregateType
                            ? o.push({
                                alias: t,
                                avg: {
                                  field: __PRIVATE_toFieldPathReference(
                                    e.fieldPath
                                  ),
                                },
                              })
                            : "sum" === e.aggregateType &&
                              o.push({
                                alias: t,
                                sum: {
                                  field: __PRIVATE_toFieldPathReference(
                                    e.fieldPath
                                  ),
                                },
                              });
                      }),
                      {
                        request: {
                          structuredAggregationQuery: {
                            aggregations: o,
                            structuredQuery: i.structuredQuery,
                          },
                          parent: i.parent,
                        },
                        R_: s,
                      }
                    );
                  })(
                    s.serializer,
                    (function __PRIVATE_queryToAggregateTarget(e) {
                      const t = __PRIVATE_debugCast(e);
                      return (
                        t.Pe ||
                          (t.Pe = __PRIVATE__queryToTarget(
                            t,
                            e.explicitOrderBy
                          )),
                        t.Pe
                      );
                    })(t),
                    n
                  ),
                l = o.parent;
              s.connection.yo || delete o.parent;
              const _ = (await s.Co("RunAggregationQuery", l, o, 1)).filter(
                (e) => !!e.result
              );
              __PRIVATE_hardAssert(1 === _.length);
              const h =
                null === (i = _[0].result) || void 0 === i
                  ? void 0
                  : i.aggregateFields;
              return Object.keys(h).reduce((e, t) => ((e[u[t]] = h[t]), e), {});
            })(s, t, n)
          );
        } catch (e) {
          i.reject(e);
        }
      }),
      i.promise
    );
  })(i, e._query, s).then((t) =>
    (function __PRIVATE_convertToAggregateQuerySnapshot(e, t, n) {
      const i = new __PRIVATE_ExpUserDataWriter(e);
      return new AggregateQuerySnapshot(t, i, n);
    })(n, e, t)
  );
}
class __PRIVATE_MemoryLocalCacheImpl {
  constructor(e) {
    (this.kind = "memory"),
      (this._onlineComponentProvider = new OnlineComponentProvider()),
      (null == e ? void 0 : e.garbageCollector)
        ? (this._offlineComponentProvider =
            e.garbageCollector._offlineComponentProvider)
        : (this._offlineComponentProvider =
            new MemoryOfflineComponentProvider());
  }
  toJSON() {
    return { kind: this.kind };
  }
}
class __PRIVATE_PersistentLocalCacheImpl {
  constructor(e) {
    let t;
    (this.kind = "persistent"),
      (null == e ? void 0 : e.tabManager)
        ? (e.tabManager._initialize(e), (t = e.tabManager))
        : ((t = persistentSingleTabManager(void 0)), t._initialize(e)),
      (this._onlineComponentProvider = t._onlineComponentProvider),
      (this._offlineComponentProvider = t._offlineComponentProvider);
  }
  toJSON() {
    return { kind: this.kind };
  }
}
class __PRIVATE_MemoryEagerGabageCollectorImpl {
  constructor() {
    (this.kind = "memoryEager"),
      (this._offlineComponentProvider = new MemoryOfflineComponentProvider());
  }
  toJSON() {
    return { kind: this.kind };
  }
}
class __PRIVATE_MemoryLruGabageCollectorImpl {
  constructor(e) {
    (this.kind = "memoryLru"),
      (this._offlineComponentProvider =
        new __PRIVATE_LruGcMemoryOfflineComponentProvider(e));
  }
  toJSON() {
    return { kind: this.kind };
  }
}
function memoryEagerGarbageCollector() {
  return new __PRIVATE_MemoryEagerGabageCollectorImpl();
}
function memoryLruGarbageCollector(e) {
  return new __PRIVATE_MemoryLruGabageCollectorImpl(
    null == e ? void 0 : e.cacheSizeBytes
  );
}
function memoryLocalCache(e) {
  return new __PRIVATE_MemoryLocalCacheImpl(e);
}
function persistentLocalCache(e) {
  return new __PRIVATE_PersistentLocalCacheImpl(e);
}
class __PRIVATE_SingleTabManagerImpl {
  constructor(e) {
    (this.forceOwnership = e), (this.kind = "persistentSingleTab");
  }
  toJSON() {
    return { kind: this.kind };
  }
  _initialize(e) {
    (this._onlineComponentProvider = new OnlineComponentProvider()),
      (this._offlineComponentProvider =
        new __PRIVATE_IndexedDbOfflineComponentProvider(
          this._onlineComponentProvider,
          null == e ? void 0 : e.cacheSizeBytes,
          this.forceOwnership
        ));
  }
}
class __PRIVATE_MultiTabManagerImpl {
  constructor() {
    this.kind = "PersistentMultipleTab";
  }
  toJSON() {
    return { kind: this.kind };
  }
  _initialize(e) {
    (this._onlineComponentProvider = new OnlineComponentProvider()),
      (this._offlineComponentProvider =
        new __PRIVATE_MultiTabOfflineComponentProvider(
          this._onlineComponentProvider,
          null == e ? void 0 : e.cacheSizeBytes
        ));
  }
}
function persistentSingleTabManager(e) {
  return new __PRIVATE_SingleTabManagerImpl(
    null == e ? void 0 : e.forceOwnership
  );
}
function persistentMultipleTabManager() {
  return new __PRIVATE_MultiTabManagerImpl();
}
const Ot = { maxAttempts: 5 };
class WriteBatch {
  constructor(e, t) {
    (this._firestore = e),
      (this._commitHandler = t),
      (this._mutations = []),
      (this._committed = !1),
      (this._dataReader = __PRIVATE_newUserDataReader(e));
  }
  set(e, t, n) {
    this._verifyNotCommitted();
    const i = __PRIVATE_validateReference(e, this._firestore),
      s = __PRIVATE_applyFirestoreDataConverter(i.converter, t, n),
      o = __PRIVATE_parseSetData(
        this._dataReader,
        "WriteBatch.set",
        i._key,
        s,
        null !== i.converter,
        n
      );
    return (
      this._mutations.push(o.toMutation(i._key, Precondition.none())), this
    );
  }
  update(e, t, n, ...i) {
    this._verifyNotCommitted();
    const s = __PRIVATE_validateReference(e, this._firestore);
    let o;
    return (
      (o =
        "string" == typeof (t = getModularInstance(t)) || t instanceof FieldPath
          ? __PRIVATE_parseUpdateVarargs(
              this._dataReader,
              "WriteBatch.update",
              s._key,
              t,
              n,
              i
            )
          : __PRIVATE_parseUpdateData(
              this._dataReader,
              "WriteBatch.update",
              s._key,
              t
            )),
      this._mutations.push(o.toMutation(s._key, Precondition.exists(!0))),
      this
    );
  }
  delete(e) {
    this._verifyNotCommitted();
    const t = __PRIVATE_validateReference(e, this._firestore);
    return (
      (this._mutations = this._mutations.concat(
        new __PRIVATE_DeleteMutation(t._key, Precondition.none())
      )),
      this
    );
  }
  commit() {
    return (
      this._verifyNotCommitted(),
      (this._committed = !0),
      this._mutations.length > 0
        ? this._commitHandler(this._mutations)
        : Promise.resolve()
    );
  }
  _verifyNotCommitted() {
    if (this._committed)
      throw new FirestoreError(
        $e.FAILED_PRECONDITION,
        "A write batch can no longer be used after commit() has been called."
      );
  }
}
function __PRIVATE_validateReference(e, t) {
  if ((e = getModularInstance(e)).firestore !== t)
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      "Provided document reference is from a different Firestore instance."
    );
  return e;
}
class Transaction extends class Transaction$1 {
  constructor(e, t) {
    (this._firestore = e),
      (this._transaction = t),
      (this._dataReader = __PRIVATE_newUserDataReader(e));
  }
  get(e) {
    const t = __PRIVATE_validateReference(e, this._firestore),
      n = new __PRIVATE_LiteUserDataWriter(this._firestore);
    return this._transaction.lookup([t._key]).then((e) => {
      if (!e || 1 !== e.length) return fail();
      const i = e[0];
      if (i.isFoundDocument())
        return new DocumentSnapshot$1(
          this._firestore,
          n,
          i.key,
          i,
          t.converter
        );
      if (i.isNoDocument())
        return new DocumentSnapshot$1(
          this._firestore,
          n,
          t._key,
          null,
          t.converter
        );
      throw fail();
    });
  }
  set(e, t, n) {
    const i = __PRIVATE_validateReference(e, this._firestore),
      s = __PRIVATE_applyFirestoreDataConverter(i.converter, t, n),
      o = __PRIVATE_parseSetData(
        this._dataReader,
        "Transaction.set",
        i._key,
        s,
        null !== i.converter,
        n
      );
    return this._transaction.set(i._key, o), this;
  }
  update(e, t, n, ...i) {
    const s = __PRIVATE_validateReference(e, this._firestore);
    let o;
    return (
      (o =
        "string" == typeof (t = getModularInstance(t)) || t instanceof FieldPath
          ? __PRIVATE_parseUpdateVarargs(
              this._dataReader,
              "Transaction.update",
              s._key,
              t,
              n,
              i
            )
          : __PRIVATE_parseUpdateData(
              this._dataReader,
              "Transaction.update",
              s._key,
              t
            )),
      this._transaction.update(s._key, o),
      this
    );
  }
  delete(e) {
    const t = __PRIVATE_validateReference(e, this._firestore);
    return this._transaction.delete(t._key), this;
  }
} {
  constructor(e, t) {
    super(e, t), (this._firestore = e);
  }
  get(e) {
    const t = __PRIVATE_validateReference(e, this._firestore),
      n = new __PRIVATE_ExpUserDataWriter(this._firestore);
    return super
      .get(e)
      .then(
        (e) =>
          new DocumentSnapshot(
            this._firestore,
            n,
            t._key,
            e._document,
            new SnapshotMetadata(!1, !1),
            t.converter
          )
      );
  }
}
function runTransaction(e, t, n) {
  e = __PRIVATE_cast(e, Firestore);
  const i = Object.assign(Object.assign({}, Ot), n);
  return (
    (function __PRIVATE_validateTransactionOptions(e) {
      if (e.maxAttempts < 1)
        throw new FirestoreError(
          $e.INVALID_ARGUMENT,
          "Max attempts must be at least 1"
        );
    })(i),
    (function __PRIVATE_firestoreClientTransaction(e, t, n) {
      const i = new __PRIVATE_Deferred();
      return (
        e.asyncQueue.enqueueAndForget(async () => {
          const s = await __PRIVATE_getDatastore(e);
          new __PRIVATE_TransactionRunner(e.asyncQueue, s, n, t, i).run();
        }),
        i.promise
      );
    })(ensureFirestoreConfigured(e), (n) => t(new Transaction(e, n)), i)
  );
}
function deleteField() {
  return new __PRIVATE_DeleteFieldValueImpl("deleteField");
}
function serverTimestamp() {
  return new __PRIVATE_ServerTimestampFieldValueImpl("serverTimestamp");
}
function arrayUnion(...e) {
  return new __PRIVATE_ArrayUnionFieldValueImpl("arrayUnion", e);
}
function arrayRemove(...e) {
  return new __PRIVATE_ArrayRemoveFieldValueImpl("arrayRemove", e);
}
function increment(e) {
  return new __PRIVATE_NumericIncrementFieldValueImpl("increment", e);
}
function writeBatch(e) {
  return (
    ensureFirestoreConfigured((e = __PRIVATE_cast(e, Firestore))),
    new WriteBatch(e, (t) => executeWrite(e, t))
  );
}
function setIndexConfiguration(e, t) {
  var n;
  const i = ensureFirestoreConfigured((e = __PRIVATE_cast(e, Firestore)));
  if (
    !i._uninitializedComponentsProvider ||
    "memory" ===
      (null === (n = i._uninitializedComponentsProvider) || void 0 === n
        ? void 0
        : n._offlineKind)
  )
    return (
      __PRIVATE_logWarn("Cannot enable indexes when persistence is disabled"),
      Promise.resolve()
    );
  const s = (function __PRIVATE_parseIndexes(e) {
    const t =
        "string" == typeof e
          ? (function __PRIVATE_tryParseJson(e) {
              try {
                return JSON.parse(e);
              } catch (e) {
                throw new FirestoreError(
                  $e.INVALID_ARGUMENT,
                  "Failed to parse JSON: " + (null == e ? void 0 : e.message)
                );
              }
            })(e)
          : e,
      n = [];
    if (Array.isArray(t.indexes))
      for (const e of t.indexes) {
        const t = __PRIVATE_tryGetString(e, "collectionGroup"),
          i = [];
        if (Array.isArray(e.fields))
          for (const t of e.fields) {
            const e = __PRIVATE_fieldPathFromDotSeparatedString(
              "setIndexConfiguration",
              __PRIVATE_tryGetString(t, "fieldPath")
            );
            "CONTAINS" === t.arrayConfig
              ? i.push(new IndexSegment(e, 2))
              : "ASCENDING" === t.order
              ? i.push(new IndexSegment(e, 0))
              : "DESCENDING" === t.order && i.push(new IndexSegment(e, 1));
          }
        n.push(new FieldIndex(FieldIndex.UNKNOWN_ID, t, i, IndexState.empty()));
      }
    return n;
  })(t);
  return (function __PRIVATE_firestoreClientSetIndexConfiguration(e, t) {
    return e.asyncQueue.enqueue(async () =>
      (async function __PRIVATE_localStoreConfigureFieldIndexes(e, t) {
        const n = __PRIVATE_debugCast(e),
          i = n.indexManager,
          s = [];
        return n.persistence.runTransaction(
          "Configure indexes",
          "readwrite",
          (e) =>
            i
              .getFieldIndexes(e)
              .next((n) =>
                (function __PRIVATE_diffArrays(e, t, n, i, s) {
                  (e = [...e]), (t = [...t]), e.sort(n), t.sort(n);
                  const o = e.length,
                    u = t.length;
                  let l = 0,
                    _ = 0;
                  for (; l < u && _ < o; ) {
                    const o = n(e[_], t[l]);
                    o < 0 ? s(e[_++]) : o > 0 ? i(t[l++]) : (l++, _++);
                  }
                  for (; l < u; ) i(t[l++]);
                  for (; _ < o; ) s(e[_++]);
                })(
                  n,
                  t,
                  __PRIVATE_fieldIndexSemanticComparator,
                  (t) => {
                    s.push(i.addFieldIndex(e, t));
                  },
                  (t) => {
                    s.push(i.deleteFieldIndex(e, t));
                  }
                )
              )
              .next(() => PersistencePromise.waitFor(s))
        );
      })(await __PRIVATE_getLocalStore(e), t)
    );
  })(i, s);
}
function __PRIVATE_tryGetString(e, t) {
  if ("string" != typeof e[t])
    throw new FirestoreError(
      $e.INVALID_ARGUMENT,
      "Missing string value for: " + t
    );
  return e[t];
}
class PersistentCacheIndexManager {
  constructor(e) {
    (this._client = e), (this.type = "PersistentCacheIndexManager");
  }
}
function getPersistentCacheIndexManager(e) {
  var t;
  e = __PRIVATE_cast(e, Firestore);
  const n = Lt.get(e);
  if (n) return n;
  const i = ensureFirestoreConfigured(e);
  if (
    "persistent" !==
    (null === (t = i._uninitializedComponentsProvider) || void 0 === t
      ? void 0
      : t._offlineKind)
  )
    return null;
  const s = new PersistentCacheIndexManager(i);
  return Lt.set(e, s), s;
}
function enablePersistentCacheIndexAutoCreation(e) {
  __PRIVATE_setPersistentCacheIndexAutoCreationEnabled(e, !0);
}
function disablePersistentCacheIndexAutoCreation(e) {
  __PRIVATE_setPersistentCacheIndexAutoCreationEnabled(e, !1);
}
function deleteAllPersistentCacheIndexes(e) {
  e._client.verifyNotTerminated(),
    (function __PRIVATE_firestoreClientDeleteAllFieldIndexes(e) {
      return e.asyncQueue.enqueue(async () =>
        (function __PRIVATE_localStoreDeleteAllFieldIndexes(e) {
          const t = __PRIVATE_debugCast(e),
            n = t.indexManager;
          return t.persistence.runTransaction(
            "Delete All Indexes",
            "readwrite",
            (e) => n.deleteAllFieldIndexes(e)
          );
        })(await __PRIVATE_getLocalStore(e))
      );
    })(e._client)
      .then((e) =>
        __PRIVATE_logDebug("deleting all persistent cache indexes succeeded")
      )
      .catch((e) =>
        __PRIVATE_logWarn("deleting all persistent cache indexes failed", e)
      );
}
function __PRIVATE_setPersistentCacheIndexAutoCreationEnabled(e, t) {
  e._client.verifyNotTerminated(),
    (function __PRIVATE_firestoreClientSetPersistentCacheIndexAutoCreationEnabled(
      e,
      t
    ) {
      return e.asyncQueue.enqueue(async () =>
        (function __PRIVATE_localStoreSetIndexAutoCreationEnabled(e, t) {
          __PRIVATE_debugCast(e).es.$i = t;
        })(await __PRIVATE_getLocalStore(e), t)
      );
    })(e._client, t)
      .then((e) =>
        __PRIVATE_logDebug(
          `setting persistent cache index auto creation isEnabled=${t} succeeded`
        )
      )
      .catch((e) =>
        __PRIVATE_logWarn(
          `setting persistent cache index auto creation isEnabled=${t} failed`,
          e
        )
      );
}
const Lt = new WeakMap();
class TestingHooks {
  constructor() {
    throw new Error("instances of this class should not be created");
  }
  static onExistenceFilterMismatch(e) {
    return __PRIVATE_TestingHooksSpiImpl.instance.onExistenceFilterMismatch(e);
  }
}
class __PRIVATE_TestingHooksSpiImpl {
  constructor() {
    this.Su = new Map();
  }
  static get instance() {
    return (
      Bt ||
        ((Bt = new __PRIVATE_TestingHooksSpiImpl()),
        (function __PRIVATE_setTestingHooksSpi(e) {
          if (At) throw new Error("a TestingHooksSpi instance is already set");
          At = e;
        })(Bt)),
      Bt
    );
  }
  tt(e) {
    this.Su.forEach((t) => t(e));
  }
  onExistenceFilterMismatch(e) {
    const t = Symbol(),
      n = this.Su;
    return n.set(t, e), () => n.delete(t);
  }
}
let Bt = null;
!(function __PRIVATE_registerFirestore(n, i = !0) {
  !(function __PRIVATE_setSDKVersion(e) {
    Be = e;
  })(s),
    e(
      new Component(
        "firestore",
        (e, { instanceIdentifier: t, options: n }) => {
          const s = e.getProvider("app").getImmediate(),
            o = new Firestore(
              new __PRIVATE_FirebaseAuthCredentialsProvider(
                e.getProvider("auth-internal")
              ),
              new __PRIVATE_FirebaseAppCheckTokenProvider(
                e.getProvider("app-check-internal")
              ),
              (function __PRIVATE_databaseIdFromApp(e, t) {
                if (
                  !Object.prototype.hasOwnProperty.apply(e.options, [
                    "projectId",
                  ])
                )
                  throw new FirestoreError(
                    $e.INVALID_ARGUMENT,
                    '"projectId" not provided in firebase.initializeApp.'
                  );
                return new DatabaseId(e.options.projectId, t);
              })(s, t),
              s
            );
          return (
            (n = Object.assign({ useFetchStreams: i }, n)), o._setSettings(n), o
          );
        },
        "PUBLIC"
      ).setMultipleInstances(!0)
    ),
    t(Le, "4.4.0", n),
    t(Le, "4.4.0", "esm2017");
})();
export {
  AbstractUserDataWriter,
  AggregateField,
  AggregateQuerySnapshot,
  Bytes,
  Mt as CACHE_SIZE_UNLIMITED,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  FieldPath,
  FieldValue,
  Firestore,
  FirestoreError,
  GeoPoint,
  LoadBundleTask,
  PersistentCacheIndexManager,
  Query,
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QueryDocumentSnapshot,
  QueryEndAtConstraint,
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  QuerySnapshot,
  QueryStartAtConstraint,
  SnapshotMetadata,
  Timestamp,
  Transaction,
  WriteBatch,
  __PRIVATE_AutoId as _AutoId,
  ByteString as _ByteString,
  DatabaseId as _DatabaseId,
  DocumentKey as _DocumentKey,
  __PRIVATE_EmptyAppCheckTokenProvider as _EmptyAppCheckTokenProvider,
  __PRIVATE_EmptyAuthCredentialsProvider as _EmptyAuthCredentialsProvider,
  FieldPath$1 as _FieldPath,
  TestingHooks as _TestingHooks,
  __PRIVATE_cast as _cast,
  __PRIVATE_debugAssert as _debugAssert,
  __PRIVATE_isBase64Available as _isBase64Available,
  __PRIVATE_logWarn as _logWarn,
  __PRIVATE_validateIsNotUsedTogether as _validateIsNotUsedTogether,
  addDoc,
  aggregateFieldEqual,
  aggregateQuerySnapshotEqual,
  and,
  arrayRemove,
  arrayUnion,
  average,
  clearIndexedDbPersistence,
  collection,
  collectionGroup,
  connectFirestoreEmulator,
  count,
  deleteAllPersistentCacheIndexes,
  deleteDoc,
  deleteField,
  disableNetwork,
  disablePersistentCacheIndexAutoCreation,
  doc,
  documentId,
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence,
  enableNetwork,
  enablePersistentCacheIndexAutoCreation,
  endAt,
  endBefore,
  ensureFirestoreConfigured,
  executeWrite,
  getAggregateFromServer,
  getCountFromServer,
  getDoc,
  getDocFromCache,
  getDocFromServer,
  getDocs,
  getDocsFromCache,
  getDocsFromServer,
  getFirestore,
  getPersistentCacheIndexManager,
  increment,
  initializeFirestore,
  limit,
  limitToLast,
  loadBundle,
  memoryEagerGarbageCollector,
  memoryLocalCache,
  memoryLruGarbageCollector,
  namedQuery,
  onSnapshot,
  onSnapshotsInSync,
  or,
  orderBy,
  persistentLocalCache,
  persistentMultipleTabManager,
  persistentSingleTabManager,
  query,
  queryEqual,
  refEqual,
  runTransaction,
  serverTimestamp,
  setDoc,
  setIndexConfiguration,
  setLogLevel,
  snapshotEqual,
  startAfter,
  startAt,
  sum,
  terminate,
  updateDoc,
  waitForPendingWrites,
  where,
  writeBatch,
};

//# sourceMappingURL=firebase-firestore.js.map
