function Ct(t, e) {
    return function() {
        return t.apply(e, arguments)
    }
}
const {
    toString: an
} = Object.prototype, {
    getPrototypeOf: Ge
} = Object, {
    iterator: Fe,
    toStringTag: Nt
} = Symbol, ze = (t => e => {
    const n = an.call(e);
    return t[n] || (t[n] = n.slice(8, -1).toLowerCase())
})(Object.create(null)), G = t => (t = t.toLowerCase(), e => ze(e) === t), ke = t => e => typeof e === t, {
    isArray: pe
} = Array, ve = ke("undefined");

function Ee(t) {
    return t !== null && !ve(t) && t.constructor !== null && !ve(t.constructor) && I(t.constructor.isBuffer) && t.constructor.isBuffer(t)
}
const At = G("ArrayBuffer");

function cn(t) {
    let e;
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && At(t.buffer), e
}
const ln = ke("string"),
    I = ke("function"),
    Tt = ke("number"),
    we = t => t !== null && typeof t == "object",
    un = t => t === !0 || t === !1,
    Ne = t => {
        if (ze(t) !== "object") return !1;
        const e = Ge(t);
        return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Nt in t) && !(Fe in t)
    },
    fn = t => {
        if (!we(t) || Ee(t)) return !1;
        try {
            return Object.keys(t).length === 0 && Object.getPrototypeOf(t) === Object.prototype
        } catch {
            return !1
        }
    },
    dn = G("Date"),
    pn = G("File"),
    hn = G("Blob"),
    mn = G("FileList"),
    yn = t => we(t) && I(t.pipe),
    gn = t => {
        let e;
        return t && (typeof FormData == "function" && t instanceof FormData || I(t.append) && ((e = ze(t)) === "formdata" || e === "object" && I(t.toString) && t.toString() === "[object FormData]"))
    },
    bn = G("URLSearchParams"),
    [vn, En, wn, Sn] = ["ReadableStream", "Request", "Response", "Headers"].map(G),
    Rn = t => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

function Se(t, e, {
    allOwnKeys: n = !1
} = {}) {
    if (t === null || typeof t > "u") return;
    let r, s;
    if (typeof t != "object" && (t = [t]), pe(t))
        for (r = 0, s = t.length; r < s; r++) e.call(null, t[r], r, t);
    else {
        if (Ee(t)) return;
        const o = n ? Object.getOwnPropertyNames(t) : Object.keys(t),
            i = o.length;
        let c;
        for (r = 0; r < i; r++) c = o[r], e.call(null, t[c], c, t)
    }
}

function Ot(t, e) {
    if (Ee(t)) return null;
    e = e.toLowerCase();
    const n = Object.keys(t);
    let r = n.length,
        s;
    for (; r-- > 0;)
        if (s = n[r], e === s.toLowerCase()) return s;
    return null
}
const ce = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(),
    xt = t => !ve(t) && t !== ce;

function We() {
    const {
        caseless: t
    } = xt(this) && this || {}, e = {}, n = (r, s) => {
        const o = t && Ot(e, s) || s;
        Ne(e[o]) && Ne(r) ? e[o] = We(e[o], r) : Ne(r) ? e[o] = We({}, r) : pe(r) ? e[o] = r.slice() : e[o] = r
    };
    for (let r = 0, s = arguments.length; r < s; r++) arguments[r] && Se(arguments[r], n);
    return e
}
const _n = (t, e, n, {
        allOwnKeys: r
    } = {}) => (Se(e, (s, o) => {
        n && I(s) ? t[o] = Ct(s, n) : t[o] = s
    }, {
        allOwnKeys: r
    }), t),
    Cn = t => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t),
    Nn = (t, e, n, r) => {
        t.prototype = Object.create(e.prototype, r), t.prototype.constructor = t, Object.defineProperty(t, "super", {
            value: e.prototype
        }), n && Object.assign(t.prototype, n)
    },
    An = (t, e, n, r) => {
        let s, o, i;
        const c = {};
        if (e = e || {}, t == null) return e;
        do {
            for (s = Object.getOwnPropertyNames(t), o = s.length; o-- > 0;) i = s[o], (!r || r(i, t, e)) && !c[i] && (e[i] = t[i], c[i] = !0);
            t = n !== !1 && Ge(t)
        } while (t && (!n || n(t, e)) && t !== Object.prototype);
        return e
    },
    Tn = (t, e, n) => {
        t = String(t), (n === void 0 || n > t.length) && (n = t.length), n -= e.length;
        const r = t.indexOf(e, n);
        return r !== -1 && r === n
    },
    On = t => {
        if (!t) return null;
        if (pe(t)) return t;
        let e = t.length;
        if (!Tt(e)) return null;
        const n = new Array(e);
        for (; e-- > 0;) n[e] = t[e];
        return n
    },
    xn = (t => e => t && e instanceof t)(typeof Uint8Array < "u" && Ge(Uint8Array)),
    Ln = (t, e) => {
        const r = (t && t[Fe]).call(t);
        let s;
        for (;
            (s = r.next()) && !s.done;) {
            const o = s.value;
            e.call(t, o[0], o[1])
        }
    },
    Pn = (t, e) => {
        let n;
        const r = [];
        for (;
            (n = t.exec(e)) !== null;) r.push(n);
        return r
    },
    Fn = G("HTMLFormElement"),
    zn = t => t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, r, s) {
        return r.toUpperCase() + s
    }),
    ft = (({
        hasOwnProperty: t
    }) => (e, n) => t.call(e, n))(Object.prototype),
    kn = G("RegExp"),
    Lt = (t, e) => {
        const n = Object.getOwnPropertyDescriptors(t),
            r = {};
        Se(n, (s, o) => {
            let i;
            (i = e(s, o, t)) !== !1 && (r[o] = i || s)
        }), Object.defineProperties(t, r)
    },
    Un = t => {
        Lt(t, (e, n) => {
            if (I(t) && ["arguments", "caller", "callee"].indexOf(n) !== -1) return !1;
            const r = t[n];
            if (I(r)) {
                if (e.enumerable = !1, "writable" in e) {
                    e.writable = !1;
                    return
                }
                e.set || (e.set = () => {
                    throw Error("Can not rewrite read-only method '" + n + "'")
                })
            }
        })
    },
    Bn = (t, e) => {
        const n = {},
            r = s => {
                s.forEach(o => {
                    n[o] = !0
                })
            };
        return pe(t) ? r(t) : r(String(t).split(e)), n
    },
    Dn = () => {},
    Mn = (t, e) => t != null && Number.isFinite(t = +t) ? t : e;

function jn(t) {
    return !!(t && I(t.append) && t[Nt] === "FormData" && t[Fe])
}
const qn = t => {
        const e = new Array(10),
            n = (r, s) => {
                if (we(r)) {
                    if (e.indexOf(r) >= 0) return;
                    if (Ee(r)) return r;
                    if (!("toJSON" in r)) {
                        e[s] = r;
                        const o = pe(r) ? [] : {};
                        return Se(r, (i, c) => {
                            const d = n(i, s + 1);
                            !ve(d) && (o[c] = d)
                        }), e[s] = void 0, o
                    }
                }
                return r
            };
        return n(t, 0)
    },
    Hn = G("AsyncFunction"),
    In = t => t && (we(t) || I(t)) && I(t.then) && I(t.catch),
    Pt = ((t, e) => t ? setImmediate : e ? ((n, r) => (ce.addEventListener("message", ({
        source: s,
        data: o
    }) => {
        s === ce && o === n && r.length && r.shift()()
    }, !1), s => {
        r.push(s), ce.postMessage(n, "*")
    }))(`axios@${Math.random()}`, []) : n => setTimeout(n))(typeof setImmediate == "function", I(ce.postMessage)),
    Wn = typeof queueMicrotask < "u" ? queueMicrotask.bind(ce) : typeof process < "u" && process.nextTick || Pt,
    $n = t => t != null && I(t[Fe]),
    a = {
        isArray: pe,
        isArrayBuffer: At,
        isBuffer: Ee,
        isFormData: gn,
        isArrayBufferView: cn,
        isString: ln,
        isNumber: Tt,
        isBoolean: un,
        isObject: we,
        isPlainObject: Ne,
        isEmptyObject: fn,
        isReadableStream: vn,
        isRequest: En,
        isResponse: wn,
        isHeaders: Sn,
        isUndefined: ve,
        isDate: dn,
        isFile: pn,
        isBlob: hn,
        isRegExp: kn,
        isFunction: I,
        isStream: yn,
        isURLSearchParams: bn,
        isTypedArray: xn,
        isFileList: mn,
        forEach: Se,
        merge: We,
        extend: _n,
        trim: Rn,
        stripBOM: Cn,
        inherits: Nn,
        toFlatObject: An,
        kindOf: ze,
        kindOfTest: G,
        endsWith: Tn,
        toArray: On,
        forEachEntry: Ln,
        matchAll: Pn,
        isHTMLForm: Fn,
        hasOwnProperty: ft,
        hasOwnProp: ft,
        reduceDescriptors: Lt,
        freezeMethods: Un,
        toObjectSet: Bn,
        toCamelCase: zn,
        noop: Dn,
        toFiniteNumber: Mn,
        findKey: Ot,
        global: ce,
        isContextDefined: xt,
        isSpecCompliantForm: jn,
        toJSONObject: qn,
        isAsyncFn: Hn,
        isThenable: In,
        setImmediate: Pt,
        asap: Wn,
        isIterable: $n
    };

function E(t, e, n, r, s) {
    Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), n && (this.config = n), r && (this.request = r), s && (this.response = s, this.status = s.status ? s.status : null)
}
a.inherits(E, Error, {
    toJSON: function() {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: a.toJSONObject(this.config),
            code: this.code,
            status: this.status
        }
    }
});
const Ft = E.prototype,
    zt = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(t => {
    zt[t] = {
        value: t
    }
});
Object.defineProperties(E, zt);
Object.defineProperty(Ft, "isAxiosError", {
    value: !0
});
E.from = (t, e, n, r, s, o) => {
    const i = Object.create(Ft);
    return a.toFlatObject(t, i, function(d) {
        return d !== Error.prototype
    }, c => c !== "isAxiosError"), E.call(i, t.message, e, n, r, s), i.cause = t, i.name = t.name, o && Object.assign(i, o), i
};
const Jn = null;

function $e(t) {
    return a.isPlainObject(t) || a.isArray(t)
}

function kt(t) {
    return a.endsWith(t, "[]") ? t.slice(0, -2) : t
}

function dt(t, e, n) {
    return t ? t.concat(e).map(function(s, o) {
        return s = kt(s), !n && o ? "[" + s + "]" : s
    }).join(n ? "." : "") : e
}

function Vn(t) {
    return a.isArray(t) && !t.some($e)
}
const Xn = a.toFlatObject(a, {}, null, function(e) {
    return /^is[A-Z]/.test(e)
});

function Ue(t, e, n) {
    if (!a.isObject(t)) throw new TypeError("target must be an object");
    e = e || new FormData, n = a.toFlatObject(n, {
        metaTokens: !0,
        dots: !1,
        indexes: !1
    }, !1, function(b, m) {
        return !a.isUndefined(m[b])
    });
    const r = n.metaTokens,
        s = n.visitor || l,
        o = n.dots,
        i = n.indexes,
        d = (n.Blob || typeof Blob < "u" && Blob) && a.isSpecCompliantForm(e);
    if (!a.isFunction(s)) throw new TypeError("visitor must be a function");

    function u(h) {
        if (h === null) return "";
        if (a.isDate(h)) return h.toISOString();
        if (a.isBoolean(h)) return h.toString();
        if (!d && a.isBlob(h)) throw new E("Blob is not supported. Use a Buffer instead.");
        return a.isArrayBuffer(h) || a.isTypedArray(h) ? d && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h
    }

    function l(h, b, m) {
        let _ = h;
        if (h && !m && typeof h == "object") {
            if (a.endsWith(b, "{}")) b = r ? b : b.slice(0, -2), h = JSON.stringify(h);
            else if (a.isArray(h) && Vn(h) || (a.isFileList(h) || a.endsWith(b, "[]")) && (_ = a.toArray(h))) return b = kt(b), _.forEach(function(C, M) {
                !(a.isUndefined(C) || C === null) && e.append(i === !0 ? dt([b], M, o) : i === null ? b : b + "[]", u(C))
            }), !1
        }
        return $e(h) ? !0 : (e.append(dt(m, b, o), u(h)), !1)
    }
    const p = [],
        w = Object.assign(Xn, {
            defaultVisitor: l,
            convertValue: u,
            isVisitable: $e
        });

    function T(h, b) {
        if (!a.isUndefined(h)) {
            if (p.indexOf(h) !== -1) throw Error("Circular reference detected in " + b.join("."));
            p.push(h), a.forEach(h, function(_, O) {
                (!(a.isUndefined(_) || _ === null) && s.call(e, _, a.isString(O) ? O.trim() : O, b, w)) === !0 && T(_, b ? b.concat(O) : [O])
            }), p.pop()
        }
    }
    if (!a.isObject(t)) throw new TypeError("data must be an object");
    return T(t), e
}

function pt(t) {
    const e = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0"
    };
    return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(r) {
        return e[r]
    })
}

function Ye(t, e) {
    this._pairs = [], t && Ue(t, this, e)
}
const Ut = Ye.prototype;
Ut.append = function(e, n) {
    this._pairs.push([e, n])
};
Ut.toString = function(e) {
    const n = e ? function(r) {
        return e.call(this, r, pt)
    } : pt;
    return this._pairs.map(function(s) {
        return n(s[0]) + "=" + n(s[1])
    }, "").join("&")
};

function Kn(t) {
    return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

function Bt(t, e, n) {
    if (!e) return t;
    const r = n && n.encode || Kn;
    a.isFunction(n) && (n = {
        serialize: n
    });
    const s = n && n.serialize;
    let o;
    if (s ? o = s(e, n) : o = a.isURLSearchParams(e) ? e.toString() : new Ye(e, n).toString(r), o) {
        const i = t.indexOf("#");
        i !== -1 && (t = t.slice(0, i)), t += (t.indexOf("?") === -1 ? "?" : "&") + o
    }
    return t
}
class Gn {
    constructor() {
        this.handlers = []
    }
    use(e, n, r) {
        return this.handlers.push({
            fulfilled: e,
            rejected: n,
            synchronous: r ? r.synchronous : !1,
            runWhen: r ? r.runWhen : null
        }), this.handlers.length - 1
    }
    eject(e) {
        this.handlers[e] && (this.handlers[e] = null)
    }
    clear() {
        this.handlers && (this.handlers = [])
    }
    forEach(e) {
        a.forEach(this.handlers, function(r) {
            r !== null && e(r)
        })
    }
}
const ht = Gn,
    Dt = {
        silentJSONParsing: !0,
        forcedJSONParsing: !0,
        clarifyTimeoutError: !1
    },
    Yn = typeof URLSearchParams < "u" ? URLSearchParams : Ye,
    Qn = typeof FormData < "u" ? FormData : null,
    Zn = typeof Blob < "u" ? Blob : null,
    er = {
        isBrowser: !0,
        classes: {
            URLSearchParams: Yn,
            FormData: Qn,
            Blob: Zn
        },
        protocols: ["http", "https", "file", "blob", "url", "data"]
    },
    Qe = typeof window < "u" && typeof document < "u",
    Je = typeof navigator == "object" && navigator || void 0,
    tr = Qe && (!Je || ["ReactNative", "NativeScript", "NS"].indexOf(Je.product) < 0),
    nr = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(),
    rr = Qe && window.location.href || "http://localhost",
    sr = Object.freeze(Object.defineProperty({
        __proto__: null,
        hasBrowserEnv: Qe,
        hasStandardBrowserEnv: tr,
        hasStandardBrowserWebWorkerEnv: nr,
        navigator: Je,
        origin: rr
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    q = { ...sr,
        ...er
    };

function ir(t, e) {
    return Ue(t, new q.classes.URLSearchParams, {
        visitor: function(n, r, s, o) {
            return q.isNode && a.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments)
        },
        ...e
    })
}

function or(t) {
    return a.matchAll(/\w+|\[(\w*)]/g, t).map(e => e[0] === "[]" ? "" : e[1] || e[0])
}

function ar(t) {
    const e = {},
        n = Object.keys(t);
    let r;
    const s = n.length;
    let o;
    for (r = 0; r < s; r++) o = n[r], e[o] = t[o];
    return e
}

function Mt(t) {
    function e(n, r, s, o) {
        let i = n[o++];
        if (i === "__proto__") return !0;
        const c = Number.isFinite(+i),
            d = o >= n.length;
        return i = !i && a.isArray(s) ? s.length : i, d ? (a.hasOwnProp(s, i) ? s[i] = [s[i], r] : s[i] = r, !c) : ((!s[i] || !a.isObject(s[i])) && (s[i] = []), e(n, r, s[i], o) && a.isArray(s[i]) && (s[i] = ar(s[i])), !c)
    }
    if (a.isFormData(t) && a.isFunction(t.entries)) {
        const n = {};
        return a.forEachEntry(t, (r, s) => {
            e(or(r), s, n, 0)
        }), n
    }
    return null
}

function cr(t, e, n) {
    if (a.isString(t)) try {
        return (e || JSON.parse)(t), a.trim(t)
    } catch (r) {
        if (r.name !== "SyntaxError") throw r
    }
    return (n || JSON.stringify)(t)
}
const Ze = {
    transitional: Dt,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [function(e, n) {
        const r = n.getContentType() || "",
            s = r.indexOf("application/json") > -1,
            o = a.isObject(e);
        if (o && a.isHTMLForm(e) && (e = new FormData(e)), a.isFormData(e)) return s ? JSON.stringify(Mt(e)) : e;
        if (a.isArrayBuffer(e) || a.isBuffer(e) || a.isStream(e) || a.isFile(e) || a.isBlob(e) || a.isReadableStream(e)) return e;
        if (a.isArrayBufferView(e)) return e.buffer;
        if (a.isURLSearchParams(e)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
        let c;
        if (o) {
            if (r.indexOf("application/x-www-form-urlencoded") > -1) return ir(e, this.formSerializer).toString();
            if ((c = a.isFileList(e)) || r.indexOf("multipart/form-data") > -1) {
                const d = this.env && this.env.FormData;
                return Ue(c ? {
                    "files[]": e
                } : e, d && new d, this.formSerializer)
            }
        }
        return o || s ? (n.setContentType("application/json", !1), cr(e)) : e
    }],
    transformResponse: [function(e) {
        const n = this.transitional || Ze.transitional,
            r = n && n.forcedJSONParsing,
            s = this.responseType === "json";
        if (a.isResponse(e) || a.isReadableStream(e)) return e;
        if (e && a.isString(e) && (r && !this.responseType || s)) {
            const i = !(n && n.silentJSONParsing) && s;
            try {
                return JSON.parse(e)
            } catch (c) {
                if (i) throw c.name === "SyntaxError" ? E.from(c, E.ERR_BAD_RESPONSE, this, null, this.response) : c
            }
        }
        return e
    }],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: q.classes.FormData,
        Blob: q.classes.Blob
    },
    validateStatus: function(e) {
        return e >= 200 && e < 300
    },
    headers: {
        common: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": void 0
        }
    }
};
a.forEach(["delete", "get", "head", "post", "put", "patch"], t => {
    Ze.headers[t] = {}
});
const et = Ze,
    lr = a.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
    ur = t => {
        const e = {};
        let n, r, s;
        return t && t.split(`
`).forEach(function(i) {
            s = i.indexOf(":"), n = i.substring(0, s).trim().toLowerCase(), r = i.substring(s + 1).trim(), !(!n || e[n] && lr[n]) && (n === "set-cookie" ? e[n] ? e[n].push(r) : e[n] = [r] : e[n] = e[n] ? e[n] + ", " + r : r)
        }), e
    },
    mt = Symbol("internals");

function be(t) {
    return t && String(t).trim().toLowerCase()
}

function Ae(t) {
    return t === !1 || t == null ? t : a.isArray(t) ? t.map(Ae) : String(t)
}

function fr(t) {
    const e = Object.create(null),
        n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; r = n.exec(t);) e[r[1]] = r[2];
    return e
}
const dr = t => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());

function qe(t, e, n, r, s) {
    if (a.isFunction(r)) return r.call(this, e, n);
    if (s && (e = n), !!a.isString(e)) {
        if (a.isString(r)) return e.indexOf(r) !== -1;
        if (a.isRegExp(r)) return r.test(e)
    }
}

function pr(t) {
    return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, n, r) => n.toUpperCase() + r)
}

function hr(t, e) {
    const n = a.toCamelCase(" " + e);
    ["get", "set", "has"].forEach(r => {
        Object.defineProperty(t, r + n, {
            value: function(s, o, i) {
                return this[r].call(this, e, s, o, i)
            },
            configurable: !0
        })
    })
}
class Be {
    constructor(e) {
        e && this.set(e)
    }
    set(e, n, r) {
        const s = this;

        function o(c, d, u) {
            const l = be(d);
            if (!l) throw new Error("header name must be a non-empty string");
            const p = a.findKey(s, l);
            (!p || s[p] === void 0 || u === !0 || u === void 0 && s[p] !== !1) && (s[p || d] = Ae(c))
        }
        const i = (c, d) => a.forEach(c, (u, l) => o(u, l, d));
        if (a.isPlainObject(e) || e instanceof this.constructor) i(e, n);
        else if (a.isString(e) && (e = e.trim()) && !dr(e)) i(ur(e), n);
        else if (a.isObject(e) && a.isIterable(e)) {
            let c = {},
                d, u;
            for (const l of e) {
                if (!a.isArray(l)) throw TypeError("Object iterator must return a key-value pair");
                c[u = l[0]] = (d = c[u]) ? a.isArray(d) ? [...d, l[1]] : [d, l[1]] : l[1]
            }
            i(c, n)
        } else e != null && o(n, e, r);
        return this
    }
    get(e, n) {
        if (e = be(e), e) {
            const r = a.findKey(this, e);
            if (r) {
                const s = this[r];
                if (!n) return s;
                if (n === !0) return fr(s);
                if (a.isFunction(n)) return n.call(this, s, r);
                if (a.isRegExp(n)) return n.exec(s);
                throw new TypeError("parser must be boolean|regexp|function")
            }
        }
    }
    has(e, n) {
        if (e = be(e), e) {
            const r = a.findKey(this, e);
            return !!(r && this[r] !== void 0 && (!n || qe(this, this[r], r, n)))
        }
        return !1
    }
    delete(e, n) {
        const r = this;
        let s = !1;

        function o(i) {
            if (i = be(i), i) {
                const c = a.findKey(r, i);
                c && (!n || qe(r, r[c], c, n)) && (delete r[c], s = !0)
            }
        }
        return a.isArray(e) ? e.forEach(o) : o(e), s
    }
    clear(e) {
        const n = Object.keys(this);
        let r = n.length,
            s = !1;
        for (; r--;) {
            const o = n[r];
            (!e || qe(this, this[o], o, e, !0)) && (delete this[o], s = !0)
        }
        return s
    }
    normalize(e) {
        const n = this,
            r = {};
        return a.forEach(this, (s, o) => {
            const i = a.findKey(r, o);
            if (i) {
                n[i] = Ae(s), delete n[o];
                return
            }
            const c = e ? pr(o) : String(o).trim();
            c !== o && delete n[o], n[c] = Ae(s), r[c] = !0
        }), this
    }
    concat(...e) {
        return this.constructor.concat(this, ...e)
    }
    toJSON(e) {
        const n = Object.create(null);
        return a.forEach(this, (r, s) => {
            r != null && r !== !1 && (n[s] = e && a.isArray(r) ? r.join(", ") : r)
        }), n
    }[Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]()
    }
    toString() {
        return Object.entries(this.toJSON()).map(([e, n]) => e + ": " + n).join(`
`)
    }
    getSetCookie() {
        return this.get("set-cookie") || []
    }
    get[Symbol.toStringTag]() {
        return "AxiosHeaders"
    }
    static from(e) {
        return e instanceof this ? e : new this(e)
    }
    static concat(e, ...n) {
        const r = new this(e);
        return n.forEach(s => r.set(s)), r
    }
    static accessor(e) {
        const r = (this[mt] = this[mt] = {
                accessors: {}
            }).accessors,
            s = this.prototype;

        function o(i) {
            const c = be(i);
            r[c] || (hr(s, i), r[c] = !0)
        }
        return a.isArray(e) ? e.forEach(o) : o(e), this
    }
}
Be.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
a.reduceDescriptors(Be.prototype, ({
    value: t
}, e) => {
    let n = e[0].toUpperCase() + e.slice(1);
    return {
        get: () => t,
        set(r) {
            this[n] = r
        }
    }
});
a.freezeMethods(Be);
const K = Be;

function He(t, e) {
    const n = this || et,
        r = e || n,
        s = K.from(r.headers);
    let o = r.data;
    return a.forEach(t, function(c) {
        o = c.call(n, o, s.normalize(), e ? e.status : void 0)
    }), s.normalize(), o
}

function jt(t) {
    return !!(t && t.__CANCEL__)
}

function he(t, e, n) {
    E.call(this, t ? ? "canceled", E.ERR_CANCELED, e, n), this.name = "CanceledError"
}
a.inherits(he, E, {
    __CANCEL__: !0
});

function qt(t, e, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status) ? t(n) : e(new E("Request failed with status code " + n.status, [E.ERR_BAD_REQUEST, E.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n))
}

function mr(t) {
    const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
    return e && e[1] || ""
}

function yr(t, e) {
    t = t || 10;
    const n = new Array(t),
        r = new Array(t);
    let s = 0,
        o = 0,
        i;
    return e = e !== void 0 ? e : 1e3,
        function(d) {
            const u = Date.now(),
                l = r[o];
            i || (i = u), n[s] = d, r[s] = u;
            let p = o,
                w = 0;
            for (; p !== s;) w += n[p++], p = p % t;
            if (s = (s + 1) % t, s === o && (o = (o + 1) % t), u - i < e) return;
            const T = l && u - l;
            return T ? Math.round(w * 1e3 / T) : void 0
        }
}

function gr(t, e) {
    let n = 0,
        r = 1e3 / e,
        s, o;
    const i = (u, l = Date.now()) => {
        n = l, s = null, o && (clearTimeout(o), o = null), t(...u)
    };
    return [(...u) => {
        const l = Date.now(),
            p = l - n;
        p >= r ? i(u, l) : (s = u, o || (o = setTimeout(() => {
            o = null, i(s)
        }, r - p)))
    }, () => s && i(s)]
}
const xe = (t, e, n = 3) => {
        let r = 0;
        const s = yr(50, 250);
        return gr(o => {
            const i = o.loaded,
                c = o.lengthComputable ? o.total : void 0,
                d = i - r,
                u = s(d),
                l = i <= c;
            r = i;
            const p = {
                loaded: i,
                total: c,
                progress: c ? i / c : void 0,
                bytes: d,
                rate: u || void 0,
                estimated: u && c && l ? (c - i) / u : void 0,
                event: o,
                lengthComputable: c != null,
                [e ? "download" : "upload"]: !0
            };
            t(p)
        }, n)
    },
    yt = (t, e) => {
        const n = t != null;
        return [r => e[0]({
            lengthComputable: n,
            total: t,
            loaded: r
        }), e[1]]
    },
    gt = t => (...e) => a.asap(() => t(...e)),
    br = q.hasStandardBrowserEnv ? ((t, e) => n => (n = new URL(n, q.origin), t.protocol === n.protocol && t.host === n.host && (e || t.port === n.port)))(new URL(q.origin), q.navigator && /(msie|trident)/i.test(q.navigator.userAgent)) : () => !0,
    vr = q.hasStandardBrowserEnv ? {
        write(t, e, n, r, s, o) {
            const i = [t + "=" + encodeURIComponent(e)];
            a.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()), a.isString(r) && i.push("path=" + r), a.isString(s) && i.push("domain=" + s), o === !0 && i.push("secure"), document.cookie = i.join("; ")
        },
        read(t) {
            const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
            return e ? decodeURIComponent(e[3]) : null
        },
        remove(t) {
            this.write(t, "", Date.now() - 864e5)
        }
    } : {
        write() {},
        read() {
            return null
        },
        remove() {}
    };

function Er(t) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
}

function wr(t, e) {
    return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t
}

function Ht(t, e, n) {
    let r = !Er(e);
    return t && (r || n == !1) ? wr(t, e) : e
}
const bt = t => t instanceof K ? { ...t
} : t;

function le(t, e) {
    e = e || {};
    const n = {};

    function r(u, l, p, w) {
        return a.isPlainObject(u) && a.isPlainObject(l) ? a.merge.call({
            caseless: w
        }, u, l) : a.isPlainObject(l) ? a.merge({}, l) : a.isArray(l) ? l.slice() : l
    }

    function s(u, l, p, w) {
        if (a.isUndefined(l)) {
            if (!a.isUndefined(u)) return r(void 0, u, p, w)
        } else return r(u, l, p, w)
    }

    function o(u, l) {
        if (!a.isUndefined(l)) return r(void 0, l)
    }

    function i(u, l) {
        if (a.isUndefined(l)) {
            if (!a.isUndefined(u)) return r(void 0, u)
        } else return r(void 0, l)
    }

    function c(u, l, p) {
        if (p in e) return r(u, l);
        if (p in t) return r(void 0, u)
    }
    const d = {
        url: o,
        method: o,
        data: o,
        baseURL: i,
        transformRequest: i,
        transformResponse: i,
        paramsSerializer: i,
        timeout: i,
        timeoutMessage: i,
        withCredentials: i,
        withXSRFToken: i,
        adapter: i,
        responseType: i,
        xsrfCookieName: i,
        xsrfHeaderName: i,
        onUploadProgress: i,
        onDownloadProgress: i,
        decompress: i,
        maxContentLength: i,
        maxBodyLength: i,
        beforeRedirect: i,
        transport: i,
        httpAgent: i,
        httpsAgent: i,
        cancelToken: i,
        socketPath: i,
        responseEncoding: i,
        validateStatus: c,
        headers: (u, l, p) => s(bt(u), bt(l), p, !0)
    };
    return a.forEach(Object.keys({ ...t,
        ...e
    }), function(l) {
        const p = d[l] || s,
            w = p(t[l], e[l], l);
        a.isUndefined(w) && p !== c || (n[l] = w)
    }), n
}
const It = t => {
        const e = le({}, t);
        let {
            data: n,
            withXSRFToken: r,
            xsrfHeaderName: s,
            xsrfCookieName: o,
            headers: i,
            auth: c
        } = e;
        e.headers = i = K.from(i), e.url = Bt(Ht(e.baseURL, e.url, e.allowAbsoluteUrls), t.params, t.paramsSerializer), c && i.set("Authorization", "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : "")));
        let d;
        if (a.isFormData(n)) {
            if (q.hasStandardBrowserEnv || q.hasStandardBrowserWebWorkerEnv) i.setContentType(void 0);
            else if ((d = i.getContentType()) !== !1) {
                const [u, ...l] = d ? d.split(";").map(p => p.trim()).filter(Boolean) : [];
                i.setContentType([u || "multipart/form-data", ...l].join("; "))
            }
        }
        if (q.hasStandardBrowserEnv && (r && a.isFunction(r) && (r = r(e)), r || r !== !1 && br(e.url))) {
            const u = s && o && vr.read(o);
            u && i.set(s, u)
        }
        return e
    },
    Sr = typeof XMLHttpRequest < "u",
    Rr = Sr && function(t) {
        return new Promise(function(n, r) {
            const s = It(t);
            let o = s.data;
            const i = K.from(s.headers).normalize();
            let {
                responseType: c,
                onUploadProgress: d,
                onDownloadProgress: u
            } = s, l, p, w, T, h;

            function b() {
                T && T(), h && h(), s.cancelToken && s.cancelToken.unsubscribe(l), s.signal && s.signal.removeEventListener("abort", l)
            }
            let m = new XMLHttpRequest;
            m.open(s.method.toUpperCase(), s.url, !0), m.timeout = s.timeout;

            function _() {
                if (!m) return;
                const C = K.from("getAllResponseHeaders" in m && m.getAllResponseHeaders()),
                    x = {
                        data: !c || c === "text" || c === "json" ? m.responseText : m.response,
                        status: m.status,
                        statusText: m.statusText,
                        headers: C,
                        config: t,
                        request: m
                    };
                qt(function(F) {
                    n(F), b()
                }, function(F) {
                    r(F), b()
                }, x), m = null
            }
            "onloadend" in m ? m.onloadend = _ : m.onreadystatechange = function() {
                !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(_)
            }, m.onabort = function() {
                m && (r(new E("Request aborted", E.ECONNABORTED, t, m)), m = null)
            }, m.onerror = function() {
                r(new E("Network Error", E.ERR_NETWORK, t, m)), m = null
            }, m.ontimeout = function() {
                let M = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
                const x = s.transitional || Dt;
                s.timeoutErrorMessage && (M = s.timeoutErrorMessage), r(new E(M, x.clarifyTimeoutError ? E.ETIMEDOUT : E.ECONNABORTED, t, m)), m = null
            }, o === void 0 && i.setContentType(null), "setRequestHeader" in m && a.forEach(i.toJSON(), function(M, x) {
                m.setRequestHeader(x, M)
            }), a.isUndefined(s.withCredentials) || (m.withCredentials = !!s.withCredentials), c && c !== "json" && (m.responseType = s.responseType), u && ([w, h] = xe(u, !0), m.addEventListener("progress", w)), d && m.upload && ([p, T] = xe(d), m.upload.addEventListener("progress", p), m.upload.addEventListener("loadend", T)), (s.cancelToken || s.signal) && (l = C => {
                m && (r(!C || C.type ? new he(null, t, m) : C), m.abort(), m = null)
            }, s.cancelToken && s.cancelToken.subscribe(l), s.signal && (s.signal.aborted ? l() : s.signal.addEventListener("abort", l)));
            const O = mr(s.url);
            if (O && q.protocols.indexOf(O) === -1) {
                r(new E("Unsupported protocol " + O + ":", E.ERR_BAD_REQUEST, t));
                return
            }
            m.send(o || null)
        })
    },
    _r = (t, e) => {
        const {
            length: n
        } = t = t ? t.filter(Boolean) : [];
        if (e || n) {
            let r = new AbortController,
                s;
            const o = function(u) {
                if (!s) {
                    s = !0, c();
                    const l = u instanceof Error ? u : this.reason;
                    r.abort(l instanceof E ? l : new he(l instanceof Error ? l.message : l))
                }
            };
            let i = e && setTimeout(() => {
                i = null, o(new E(`timeout ${e} of ms exceeded`, E.ETIMEDOUT))
            }, e);
            const c = () => {
                t && (i && clearTimeout(i), i = null, t.forEach(u => {
                    u.unsubscribe ? u.unsubscribe(o) : u.removeEventListener("abort", o)
                }), t = null)
            };
            t.forEach(u => u.addEventListener("abort", o));
            const {
                signal: d
            } = r;
            return d.unsubscribe = () => a.asap(c), d
        }
    },
    Cr = _r,
    Nr = function*(t, e) {
        let n = t.byteLength;
        if (!e || n < e) {
            yield t;
            return
        }
        let r = 0,
            s;
        for (; r < n;) s = r + e, yield t.slice(r, s), r = s
    },
    Ar = async function*(t, e) {
        for await (const n of Tr(t)) yield* Nr(n, e)
    },
    Tr = async function*(t) {
        if (t[Symbol.asyncIterator]) {
            yield* t;
            return
        }
        const e = t.getReader();
        try {
            for (;;) {
                const {
                    done: n,
                    value: r
                } = await e.read();
                if (n) break;
                yield r
            }
        } finally {
            await e.cancel()
        }
    },
    vt = (t, e, n, r) => {
        const s = Ar(t, e);
        let o = 0,
            i, c = d => {
                i || (i = !0, r && r(d))
            };
        return new ReadableStream({
            async pull(d) {
                try {
                    const {
                        done: u,
                        value: l
                    } = await s.next();
                    if (u) {
                        c(), d.close();
                        return
                    }
                    let p = l.byteLength;
                    if (n) {
                        let w = o += p;
                        n(w)
                    }
                    d.enqueue(new Uint8Array(l))
                } catch (u) {
                    throw c(u), u
                }
            },
            cancel(d) {
                return c(d), s.return()
            }
        }, {
            highWaterMark: 2
        })
    },
    De = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function",
    Wt = De && typeof ReadableStream == "function",
    Or = De && (typeof TextEncoder == "function" ? (t => e => t.encode(e))(new TextEncoder) : async t => new Uint8Array(await new Response(t).arrayBuffer())),
    $t = (t, ...e) => {
        try {
            return !!t(...e)
        } catch {
            return !1
        }
    },
    xr = Wt && $t(() => {
        let t = !1;
        const e = new Request(q.origin, {
            body: new ReadableStream,
            method: "POST",
            get duplex() {
                return t = !0, "half"
            }
        }).headers.has("Content-Type");
        return t && !e
    }),
    Et = 64 * 1024,
    Ve = Wt && $t(() => a.isReadableStream(new Response("").body)),
    Le = {
        stream: Ve && (t => t.body)
    };
De && (t => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach(e => {
        !Le[e] && (Le[e] = a.isFunction(t[e]) ? n => n[e]() : (n, r) => {
            throw new E(`Response type '${e}' is not supported`, E.ERR_NOT_SUPPORT, r)
        })
    })
})(new Response);
const Lr = async t => {
        if (t == null) return 0;
        if (a.isBlob(t)) return t.size;
        if (a.isSpecCompliantForm(t)) return (await new Request(q.origin, {
            method: "POST",
            body: t
        }).arrayBuffer()).byteLength;
        if (a.isArrayBufferView(t) || a.isArrayBuffer(t)) return t.byteLength;
        if (a.isURLSearchParams(t) && (t = t + ""), a.isString(t)) return (await Or(t)).byteLength
    },
    Pr = async (t, e) => {
        const n = a.toFiniteNumber(t.getContentLength());
        return n ? ? Lr(e)
    },
    Fr = De && (async t => {
        let {
            url: e,
            method: n,
            data: r,
            signal: s,
            cancelToken: o,
            timeout: i,
            onDownloadProgress: c,
            onUploadProgress: d,
            responseType: u,
            headers: l,
            withCredentials: p = "same-origin",
            fetchOptions: w
        } = It(t);
        u = u ? (u + "").toLowerCase() : "text";
        let T = Cr([s, o && o.toAbortSignal()], i),
            h;
        const b = T && T.unsubscribe && (() => {
            T.unsubscribe()
        });
        let m;
        try {
            if (d && xr && n !== "get" && n !== "head" && (m = await Pr(l, r)) !== 0) {
                let x = new Request(e, {
                        method: "POST",
                        body: r,
                        duplex: "half"
                    }),
                    B;
                if (a.isFormData(r) && (B = x.headers.get("content-type")) && l.setContentType(B), x.body) {
                    const [F, ne] = yt(m, xe(gt(d)));
                    r = vt(x.body, Et, F, ne)
                }
            }
            a.isString(p) || (p = p ? "include" : "omit");
            const _ = "credentials" in Request.prototype;
            h = new Request(e, { ...w,
                signal: T,
                method: n.toUpperCase(),
                headers: l.normalize().toJSON(),
                body: r,
                duplex: "half",
                credentials: _ ? p : void 0
            });
            let O = await fetch(h, w);
            const C = Ve && (u === "stream" || u === "response");
            if (Ve && (c || C && b)) {
                const x = {};
                ["status", "statusText", "headers"].forEach(re => {
                    x[re] = O[re]
                });
                const B = a.toFiniteNumber(O.headers.get("content-length")),
                    [F, ne] = c && yt(B, xe(gt(c), !0)) || [];
                O = new Response(vt(O.body, Et, F, () => {
                    ne && ne(), b && b()
                }), x)
            }
            u = u || "text";
            let M = await Le[a.findKey(Le, u) || "text"](O, t);
            return !C && b && b(), await new Promise((x, B) => {
                qt(x, B, {
                    data: M,
                    headers: K.from(O.headers),
                    status: O.status,
                    statusText: O.statusText,
                    config: t,
                    request: h
                })
            })
        } catch (_) {
            throw b && b(), _ && _.name === "TypeError" && /Load failed|fetch/i.test(_.message) ? Object.assign(new E("Network Error", E.ERR_NETWORK, t, h), {
                cause: _.cause || _
            }) : E.from(_, _ && _.code, t, h)
        }
    }),
    Xe = {
        http: Jn,
        xhr: Rr,
        fetch: Fr
    };
a.forEach(Xe, (t, e) => {
    if (t) {
        try {
            Object.defineProperty(t, "name", {
                value: e
            })
        } catch {}
        Object.defineProperty(t, "adapterName", {
            value: e
        })
    }
});
const wt = t => `- ${t}`,
    zr = t => a.isFunction(t) || t === null || t === !1,
    Jt = {
        getAdapter: t => {
            t = a.isArray(t) ? t : [t];
            const {
                length: e
            } = t;
            let n, r;
            const s = {};
            for (let o = 0; o < e; o++) {
                n = t[o];
                let i;
                if (r = n, !zr(n) && (r = Xe[(i = String(n)).toLowerCase()], r === void 0)) throw new E(`Unknown adapter '${i}'`);
                if (r) break;
                s[i || "#" + o] = r
            }
            if (!r) {
                const o = Object.entries(s).map(([c, d]) => `adapter ${c} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build"));
                let i = e ? o.length > 1 ? `since :
` + o.map(wt).join(`
`) : " " + wt(o[0]) : "as no adapter specified";
                throw new E("There is no suitable adapter to dispatch the request " + i, "ERR_NOT_SUPPORT")
            }
            return r
        },
        adapters: Xe
    };

function Ie(t) {
    if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted) throw new he(null, t)
}

function St(t) {
    return Ie(t), t.headers = K.from(t.headers), t.data = He.call(t, t.transformRequest), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Jt.getAdapter(t.adapter || et.adapter)(t).then(function(r) {
        return Ie(t), r.data = He.call(t, t.transformResponse, r), r.headers = K.from(r.headers), r
    }, function(r) {
        return jt(r) || (Ie(t), r && r.response && (r.response.data = He.call(t, t.transformResponse, r.response), r.response.headers = K.from(r.response.headers))), Promise.reject(r)
    })
}
const Vt = "1.11.0",
    Me = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
    Me[t] = function(r) {
        return typeof r === t || "a" + (e < 1 ? "n " : " ") + t
    }
});
const Rt = {};
Me.transitional = function(e, n, r) {
    function s(o, i) {
        return "[Axios v" + Vt + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "")
    }
    return (o, i, c) => {
        if (e === !1) throw new E(s(i, " has been removed" + (n ? " in " + n : "")), E.ERR_DEPRECATED);
        return n && !Rt[i] && (Rt[i] = !0, console.warn(s(i, " has been deprecated since v" + n + " and will be removed in the near future"))), e ? e(o, i, c) : !0
    }
};
Me.spelling = function(e) {
    return (n, r) => (console.warn(`${r} is likely a misspelling of ${e}`), !0)
};

function kr(t, e, n) {
    if (typeof t != "object") throw new E("options must be an object", E.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(t);
    let s = r.length;
    for (; s-- > 0;) {
        const o = r[s],
            i = e[o];
        if (i) {
            const c = t[o],
                d = c === void 0 || i(c, o, t);
            if (d !== !0) throw new E("option " + o + " must be " + d, E.ERR_BAD_OPTION_VALUE);
            continue
        }
        if (n !== !0) throw new E("Unknown option " + o, E.ERR_BAD_OPTION)
    }
}
const Te = {
        assertOptions: kr,
        validators: Me
    },
    Q = Te.validators;
class Pe {
    constructor(e) {
        this.defaults = e || {}, this.interceptors = {
            request: new ht,
            response: new ht
        }
    }
    async request(e, n) {
        try {
            return await this._request(e, n)
        } catch (r) {
            if (r instanceof Error) {
                let s = {};
                Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error;
                const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
                try {
                    r.stack ? o && !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + o) : r.stack = o
                } catch {}
            }
            throw r
        }
    }
    _request(e, n) {
        typeof e == "string" ? (n = n || {}, n.url = e) : n = e || {}, n = le(this.defaults, n);
        const {
            transitional: r,
            paramsSerializer: s,
            headers: o
        } = n;
        r !== void 0 && Te.assertOptions(r, {
            silentJSONParsing: Q.transitional(Q.boolean),
            forcedJSONParsing: Q.transitional(Q.boolean),
            clarifyTimeoutError: Q.transitional(Q.boolean)
        }, !1), s != null && (a.isFunction(s) ? n.paramsSerializer = {
            serialize: s
        } : Te.assertOptions(s, {
            encode: Q.function,
            serialize: Q.function
        }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Te.assertOptions(n, {
            baseUrl: Q.spelling("baseURL"),
            withXsrfToken: Q.spelling("withXSRFToken")
        }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
        let i = o && a.merge(o.common, o[n.method]);
        o && a.forEach(["delete", "get", "head", "post", "put", "patch", "common"], h => {
            delete o[h]
        }), n.headers = K.concat(i, o);
        const c = [];
        let d = !0;
        this.interceptors.request.forEach(function(b) {
            typeof b.runWhen == "function" && b.runWhen(n) === !1 || (d = d && b.synchronous, c.unshift(b.fulfilled, b.rejected))
        });
        const u = [];
        this.interceptors.response.forEach(function(b) {
            u.push(b.fulfilled, b.rejected)
        });
        let l, p = 0,
            w;
        if (!d) {
            const h = [St.bind(this), void 0];
            for (h.unshift(...c), h.push(...u), w = h.length, l = Promise.resolve(n); p < w;) l = l.then(h[p++], h[p++]);
            return l
        }
        w = c.length;
        let T = n;
        for (p = 0; p < w;) {
            const h = c[p++],
                b = c[p++];
            try {
                T = h(T)
            } catch (m) {
                b.call(this, m);
                break
            }
        }
        try {
            l = St.call(this, T)
        } catch (h) {
            return Promise.reject(h)
        }
        for (p = 0, w = u.length; p < w;) l = l.then(u[p++], u[p++]);
        return l
    }
    getUri(e) {
        e = le(this.defaults, e);
        const n = Ht(e.baseURL, e.url, e.allowAbsoluteUrls);
        return Bt(n, e.params, e.paramsSerializer)
    }
}
a.forEach(["delete", "get", "head", "options"], function(e) {
    Pe.prototype[e] = function(n, r) {
        return this.request(le(r || {}, {
            method: e,
            url: n,
            data: (r || {}).data
        }))
    }
});
a.forEach(["post", "put", "patch"], function(e) {
    function n(r) {
        return function(o, i, c) {
            return this.request(le(c || {}, {
                method: e,
                headers: r ? {
                    "Content-Type": "multipart/form-data"
                } : {},
                url: o,
                data: i
            }))
        }
    }
    Pe.prototype[e] = n(), Pe.prototype[e + "Form"] = n(!0)
});
const Oe = Pe;
class tt {
    constructor(e) {
        if (typeof e != "function") throw new TypeError("executor must be a function.");
        let n;
        this.promise = new Promise(function(o) {
            n = o
        });
        const r = this;
        this.promise.then(s => {
            if (!r._listeners) return;
            let o = r._listeners.length;
            for (; o-- > 0;) r._listeners[o](s);
            r._listeners = null
        }), this.promise.then = s => {
            let o;
            const i = new Promise(c => {
                r.subscribe(c), o = c
            }).then(s);
            return i.cancel = function() {
                r.unsubscribe(o)
            }, i
        }, e(function(o, i, c) {
            r.reason || (r.reason = new he(o, i, c), n(r.reason))
        })
    }
    throwIfRequested() {
        if (this.reason) throw this.reason
    }
    subscribe(e) {
        if (this.reason) {
            e(this.reason);
            return
        }
        this._listeners ? this._listeners.push(e) : this._listeners = [e]
    }
    unsubscribe(e) {
        if (!this._listeners) return;
        const n = this._listeners.indexOf(e);
        n !== -1 && this._listeners.splice(n, 1)
    }
    toAbortSignal() {
        const e = new AbortController,
            n = r => {
                e.abort(r)
            };
        return this.subscribe(n), e.signal.unsubscribe = () => this.unsubscribe(n), e.signal
    }
    static source() {
        let e;
        return {
            token: new tt(function(s) {
                e = s
            }),
            cancel: e
        }
    }
}
const Ur = tt;

function Br(t) {
    return function(n) {
        return t.apply(null, n)
    }
}

function Dr(t) {
    return a.isObject(t) && t.isAxiosError === !0
}
const Ke = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
};
Object.entries(Ke).forEach(([t, e]) => {
    Ke[e] = t
});
const Mr = Ke;

function Xt(t) {
    const e = new Oe(t),
        n = Ct(Oe.prototype.request, e);
    return a.extend(n, Oe.prototype, e, {
        allOwnKeys: !0
    }), a.extend(n, e, null, {
        allOwnKeys: !0
    }), n.create = function(s) {
        return Xt(le(t, s))
    }, n
}
const k = Xt(et);
k.Axios = Oe;
k.CanceledError = he;
k.CancelToken = Ur;
k.isCancel = jt;
k.VERSION = Vt;
k.toFormData = Ue;
k.AxiosError = E;
k.Cancel = k.CanceledError;
k.all = function(e) {
    return Promise.all(e)
};
k.spread = Br;
k.isAxiosError = Dr;
k.mergeConfig = le;
k.AxiosHeaders = K;
k.formToJSON = t => Mt(a.isHTMLForm(t) ? new FormData(t) : t);
k.getAdapter = Jt.getAdapter;
k.HttpStatusCode = Mr;
k.default = k;
const jr = k;
window.axios = jr;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
var qr = {
    exports: {}
};
(function(t) {
    (function(e, n) {
        var r = n(e, e.document, Date);
        e.lazySizes = r, t.exports && (t.exports = r)
    })(typeof window < "u" ? window : {}, function(n, r, s) {
        var o, i;
        if (function() {
                var g, y = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    fastLoadedClass: "ls-is-cached",
                    iframeLoadMode: 0,
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: !0,
                    expFactor: 1.5,
                    hFac: .8,
                    loadMode: 2,
                    loadHidden: !0,
                    ricTimeout: 0,
                    throttleDelay: 125
                };
                i = n.lazySizesConfig || n.lazysizesConfig || {};
                for (g in y) g in i || (i[g] = y[g])
            }(), !r || !r.getElementsByClassName) return {
            init: function() {},
            cfg: i,
            noSupport: !0
        };
        var c = r.documentElement,
            d = n.HTMLPictureElement,
            u = "addEventListener",
            l = "getAttribute",
            p = n[u].bind(n),
            w = n.setTimeout,
            T = n.requestAnimationFrame || w,
            h = n.requestIdleCallback,
            b = /^picture$/i,
            m = ["load", "error", "lazyincluded", "_lazyloaded"],
            _ = {},
            O = Array.prototype.forEach,
            C = function(g, y) {
                return _[y] || (_[y] = new RegExp("(\\s|^)" + y + "(\\s|$)")), _[y].test(g[l]("class") || "") && _[y]
            },
            M = function(g, y) {
                C(g, y) || g.setAttribute("class", (g[l]("class") || "").trim() + " " + y)
            },
            x = function(g, y) {
                var S;
                (S = C(g, y)) && g.setAttribute("class", (g[l]("class") || "").replace(S, " "))
            },
            B = function(g, y, S) {
                var z = S ? u : "removeEventListener";
                S && B(g, y), m.forEach(function(P) {
                    g[z](P, y)
                })
            },
            F = function(g, y, S, z, P) {
                var R = r.createEvent("Event");
                return S || (S = {}), S.instance = o, R.initEvent(y, !z, !P), R.detail = S, g.dispatchEvent(R), R
            },
            ne = function(g, y) {
                var S;
                !d && (S = n.picturefill || i.pf) ? (y && y.src && !g[l]("srcset") && g.setAttribute("srcset", y.src), S({
                    reevaluate: !0,
                    elements: [g]
                })) : y && y.src && (g.src = y.src)
            },
            re = function(g, y) {
                return (getComputedStyle(g, null) || {})[y]
            },
            nt = function(g, y, S) {
                for (S = S || g.offsetWidth; S < i.minSize && y && !g._lazysizesWidth;) S = y.offsetWidth, y = y.parentNode;
                return S
            },
            me = function() {
                var g, y, S = [],
                    z = [],
                    P = S,
                    R = function() {
                        var N = P;
                        for (P = S.length ? z : S, g = !0, y = !1; N.length;) N.shift()();
                        g = !1
                    },
                    U = function(N, L) {
                        g && !L ? N.apply(this, arguments) : (P.push(N), y || (y = !0, (r.hidden ? w : T)(R)))
                    };
                return U._lsFlush = R, U
            }(),
            Re = function(g, y) {
                return y ? function() {
                    me(g)
                } : function() {
                    var S = this,
                        z = arguments;
                    me(function() {
                        g.apply(S, z)
                    })
                }
            },
            Kt = function(g) {
                var y, S = 0,
                    z = i.throttleDelay,
                    P = i.ricTimeout,
                    R = function() {
                        y = !1, S = s.now(), g()
                    },
                    U = h && P > 49 ? function() {
                        h(R, {
                            timeout: P
                        }), P !== i.ricTimeout && (P = i.ricTimeout)
                    } : Re(function() {
                        w(R)
                    }, !0);
                return function(N) {
                    var L;
                    (N = N === !0) && (P = 33), !y && (y = !0, L = z - (s.now() - S), L < 0 && (L = 0), N || L < 9 ? U() : w(U, L))
                }
            },
            rt = function(g) {
                var y, S, z = 99,
                    P = function() {
                        y = null, g()
                    },
                    R = function() {
                        var U = s.now() - S;
                        U < z ? w(R, z - U) : (h || P)(P)
                    };
                return function() {
                    S = s.now(), y || (y = w(R, z))
                }
            },
            st = function() {
                var g, y, S, z, P, R, U, N, L, W, Y, oe, Gt = /^img$/i,
                    Yt = /^iframe$/i,
                    Qt = "onscroll" in n && !/(gle|ing)bot/.test(navigator.userAgent),
                    Zt = 0,
                    ye = 0,
                    X = 0,
                    ue = -1,
                    it = function(f) {
                        X--, (!f || X < 0 || !f.target) && (X = 0)
                    },
                    ot = function(f) {
                        return oe == null && (oe = re(r.body, "visibility") == "hidden"), oe || !(re(f.parentNode, "visibility") == "hidden" && re(f, "visibility") == "hidden")
                    },
                    en = function(f, v) {
                        var A, D = f,
                            j = ot(f);
                        for (N -= v, Y += v, L -= v, W += v; j && (D = D.offsetParent) && D != r.body && D != c;) j = (re(D, "opacity") || 1) > 0, j && re(D, "overflow") != "visible" && (A = D.getBoundingClientRect(), j = W > A.left && L < A.right && Y > A.top - 1 && N < A.bottom + 1);
                        return j
                    },
                    at = function() {
                        var f, v, A, D, j, H, Z, ee, se, te, ae, fe, J = o.elements;
                        if ((z = i.loadMode) && X < 8 && (f = J.length)) {
                            for (v = 0, ue++; v < f; v++)
                                if (!(!J[v] || J[v]._lazyRace)) {
                                    if (!Qt || o.prematureUnveil && o.prematureUnveil(J[v])) {
                                        ge(J[v]);
                                        continue
                                    }
                                    if ((!(ee = J[v][l]("data-expand")) || !(H = ee * 1)) && (H = ye), te || (te = !i.expand || i.expand < 1 ? c.clientHeight > 500 && c.clientWidth > 500 ? 500 : 370 : i.expand, o._defEx = te, ae = te * i.expFactor, fe = i.hFac, oe = null, ye < ae && X < 1 && ue > 2 && z > 2 && !r.hidden ? (ye = ae, ue = 0) : z > 1 && ue > 1 && X < 6 ? ye = te : ye = Zt), se !== H && (R = innerWidth + H * fe, U = innerHeight + H, Z = H * -1, se = H), A = J[v].getBoundingClientRect(), (Y = A.bottom) >= Z && (N = A.top) <= U && (W = A.right) >= Z * fe && (L = A.left) <= R && (Y || W || L || N) && (i.loadHidden || ot(J[v])) && (y && X < 3 && !ee && (z < 3 || ue < 4) || en(J[v], H))) {
                                        if (ge(J[v]), j = !0, X > 9) break
                                    } else !j && y && !D && X < 4 && ue < 4 && z > 2 && (g[0] || i.preloadAfterLoad) && (g[0] || !ee && (Y || W || L || N || J[v][l](i.sizesAttr) != "auto")) && (D = g[0] || J[v])
                                }
                            D && !j && ge(D)
                        }
                    },
                    $ = Kt(at),
                    ct = function(f) {
                        var v = f.target;
                        if (v._lazyCache) {
                            delete v._lazyCache;
                            return
                        }
                        it(f), M(v, i.loadedClass), x(v, i.loadingClass), B(v, lt), F(v, "lazyloaded")
                    },
                    tn = Re(ct),
                    lt = function(f) {
                        tn({
                            target: f.target
                        })
                    },
                    nn = function(f, v) {
                        var A = f.getAttribute("data-load-mode") || i.iframeLoadMode;
                        A == 0 ? f.contentWindow.location.replace(v) : A == 1 && (f.src = v)
                    },
                    rn = function(f) {
                        var v, A = f[l](i.srcsetAttr);
                        (v = i.customMedia[f[l]("data-media") || f[l]("media")]) && f.setAttribute("media", v), A && f.setAttribute("srcset", A)
                    },
                    sn = Re(function(f, v, A, D, j) {
                        var H, Z, ee, se, te, ae;
                        (te = F(f, "lazybeforeunveil", v)).defaultPrevented || (D && (A ? M(f, i.autosizesClass) : f.setAttribute("sizes", D)), Z = f[l](i.srcsetAttr), H = f[l](i.srcAttr), j && (ee = f.parentNode, se = ee && b.test(ee.nodeName || "")), ae = v.firesLoad || "src" in f && (Z || H || se), te = {
                            target: f
                        }, M(f, i.loadingClass), ae && (clearTimeout(S), S = w(it, 2500), B(f, lt, !0)), se && O.call(ee.getElementsByTagName("source"), rn), Z ? f.setAttribute("srcset", Z) : H && !se && (Yt.test(f.nodeName) ? nn(f, H) : f.src = H), j && (Z || se) && ne(f, {
                            src: H
                        })), f._lazyRace && delete f._lazyRace, x(f, i.lazyClass), me(function() {
                            var fe = f.complete && f.naturalWidth > 1;
                            (!ae || fe) && (fe && M(f, i.fastLoadedClass), ct(te), f._lazyCache = !0, w(function() {
                                "_lazyCache" in f && delete f._lazyCache
                            }, 9)), f.loading == "lazy" && X--
                        }, !0)
                    }),
                    ge = function(f) {
                        if (!f._lazyRace) {
                            var v, A = Gt.test(f.nodeName),
                                D = A && (f[l](i.sizesAttr) || f[l]("sizes")),
                                j = D == "auto";
                            (j || !y) && A && (f[l]("src") || f.srcset) && !f.complete && !C(f, i.errorClass) && C(f, i.lazyClass) || (v = F(f, "lazyunveilread").detail, j && je.updateElem(f, !0, f.offsetWidth), f._lazyRace = !0, X++, sn(f, v, j, D, A))
                        }
                    },
                    on = rt(function() {
                        i.loadMode = 3, $()
                    }),
                    ut = function() {
                        i.loadMode == 3 && (i.loadMode = 2), on()
                    },
                    Ce = function() {
                        if (!y) {
                            if (s.now() - P < 999) {
                                w(Ce, 999);
                                return
                            }
                            y = !0, i.loadMode = 3, $(), p("scroll", ut, !0)
                        }
                    };
                return {
                    _: function() {
                        P = s.now(), o.elements = r.getElementsByClassName(i.lazyClass), g = r.getElementsByClassName(i.lazyClass + " " + i.preloadClass), p("scroll", $, !0), p("resize", $, !0), p("pageshow", function(f) {
                            if (f.persisted) {
                                var v = r.querySelectorAll("." + i.loadingClass);
                                v.length && v.forEach && T(function() {
                                    v.forEach(function(A) {
                                        A.complete && ge(A)
                                    })
                                })
                            }
                        }), n.MutationObserver ? new MutationObserver($).observe(c, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (c[u]("DOMNodeInserted", $, !0), c[u]("DOMAttrModified", $, !0), setInterval($, 999)), p("hashchange", $, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(f) {
                            r[u](f, $, !0)
                        }), /d$|^c/.test(r.readyState) ? Ce() : (p("load", Ce), r[u]("DOMContentLoaded", $), w(Ce, 2e4)), o.elements.length ? (at(), me._lsFlush()) : $()
                    },
                    checkElems: $,
                    unveil: ge,
                    _aLSL: ut
                }
            }(),
            je = function() {
                var g, y = Re(function(R, U, N, L) {
                        var W, Y, oe;
                        if (R._lazysizesWidth = L, L += "px", R.setAttribute("sizes", L), b.test(U.nodeName || ""))
                            for (W = U.getElementsByTagName("source"), Y = 0, oe = W.length; Y < oe; Y++) W[Y].setAttribute("sizes", L);
                        N.detail.dataAttr || ne(R, N.detail)
                    }),
                    S = function(R, U, N) {
                        var L, W = R.parentNode;
                        W && (N = nt(R, W, N), L = F(R, "lazybeforesizes", {
                            width: N,
                            dataAttr: !!U
                        }), L.defaultPrevented || (N = L.detail.width, N && N !== R._lazysizesWidth && y(R, W, L, N)))
                    },
                    z = function() {
                        var R, U = g.length;
                        if (U)
                            for (R = 0; R < U; R++) S(g[R])
                    },
                    P = rt(z);
                return {
                    _: function() {
                        g = r.getElementsByClassName(i.autosizesClass), p("resize", P)
                    },
                    checkElems: P,
                    updateElem: S
                }
            }(),
            _e = function() {
                !_e.i && r.getElementsByClassName && (_e.i = !0, je._(), st._())
            };
        return w(function() {
            i.init && _e()
        }), o = {
            cfg: i,
            autoSizer: je,
            loader: st,
            init: _e,
            uP: ne,
            aC: M,
            rC: x,
            hC: C,
            fire: F,
            gW: nt,
            rAF: me
        }, o
    })
})(qr);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var V = function() {
        return V = Object.assign || function(e) {
            for (var n, r = 1, s = arguments.length; r < s; r++) {
                n = arguments[r];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
            }
            return e
        }, V.apply(this, arguments)
    },
    Hr = function() {
        function t(e) {
            this.options = e, this.listeners = {}
        }
        return t.prototype.on = function(e, n) {
            var r = this.listeners[e] || [];
            this.listeners[e] = r.concat([n])
        }, t.prototype.triggerEvent = function(e, n) {
            var r = this,
                s = this.listeners[e] || [];
            s.forEach(function(o) {
                return o({
                    target: r,
                    event: n
                })
            })
        }, t
    }(),
    de;
(function(t) {
    t[t.Add = 0] = "Add", t[t.Remove = 1] = "Remove"
})(de || (de = {}));
var Ir = function() {
        function t() {
            this.notifications = []
        }
        return t.prototype.push = function(e) {
            this.notifications.push(e), this.updateFn(e, de.Add, this.notifications)
        }, t.prototype.splice = function(e, n) {
            var r = this.notifications.splice(e, n)[0];
            return this.updateFn(r, de.Remove, this.notifications), r
        }, t.prototype.indexOf = function(e) {
            return this.notifications.indexOf(e)
        }, t.prototype.onUpdate = function(e) {
            this.updateFn = e
        }, t
    }(),
    ie;
(function(t) {
    t.Dismiss = "dismiss", t.Click = "click"
})(ie || (ie = {}));
var _t = {
        types: [{
            type: "success",
            className: "notyf__toast--success",
            backgroundColor: "#3dc763",
            icon: {
                className: "notyf__icon--success",
                tagName: "i"
            }
        }, {
            type: "error",
            className: "notyf__toast--error",
            backgroundColor: "#ed3d3d",
            icon: {
                className: "notyf__icon--error",
                tagName: "i"
            }
        }],
        duration: 2e3,
        ripple: !0,
        position: {
            x: "right",
            y: "bottom"
        },
        dismissible: !1
    },
    Wr = function() {
        function t() {
            this.notifications = [], this.events = {}, this.X_POSITION_FLEX_MAP = {
                left: "flex-start",
                center: "center",
                right: "flex-end"
            }, this.Y_POSITION_FLEX_MAP = {
                top: "flex-start",
                center: "center",
                bottom: "flex-end"
            };
            var e = document.createDocumentFragment(),
                n = this._createHTMLElement({
                    tagName: "div",
                    className: "notyf"
                });
            e.appendChild(n), document.body.appendChild(e), this.container = n, this.animationEndEventName = this._getAnimationEndEventName(), this._createA11yContainer()
        }
        return t.prototype.on = function(e, n) {
            var r;
            this.events = V(V({}, this.events), (r = {}, r[e] = n, r))
        }, t.prototype.update = function(e, n) {
            n === de.Add ? this.addNotification(e) : n === de.Remove && this.removeNotification(e)
        }, t.prototype.removeNotification = function(e) {
            var n = this,
                r = this._popRenderedNotification(e),
                s;
            if (r) {
                s = r.node, s.classList.add("notyf__toast--disappear");
                var o;
                s.addEventListener(this.animationEndEventName, o = function(i) {
                    i.target === s && (s.removeEventListener(n.animationEndEventName, o), n.container.removeChild(s))
                })
            }
        }, t.prototype.addNotification = function(e) {
            var n = this._renderNotification(e);
            this.notifications.push({
                notification: e,
                node: n
            }), this._announce(e.options.message || "Notification")
        }, t.prototype._renderNotification = function(e) {
            var n, r = this._buildNotificationCard(e),
                s = e.options.className;
            return s && (n = r.classList).add.apply(n, s.split(" ")), this.container.appendChild(r), r
        }, t.prototype._popRenderedNotification = function(e) {
            for (var n = -1, r = 0; r < this.notifications.length && n < 0; r++) this.notifications[r].notification === e && (n = r);
            if (n !== -1) return this.notifications.splice(n, 1)[0]
        }, t.prototype.getXPosition = function(e) {
            var n;
            return ((n = e == null ? void 0 : e.position) === null || n === void 0 ? void 0 : n.x) || "right"
        }, t.prototype.getYPosition = function(e) {
            var n;
            return ((n = e == null ? void 0 : e.position) === null || n === void 0 ? void 0 : n.y) || "bottom"
        }, t.prototype.adjustContainerAlignment = function(e) {
            var n = this.X_POSITION_FLEX_MAP[this.getXPosition(e)],
                r = this.Y_POSITION_FLEX_MAP[this.getYPosition(e)],
                s = this.container.style;
            s.setProperty("justify-content", r), s.setProperty("align-items", n)
        }, t.prototype._buildNotificationCard = function(e) {
            var n = this,
                r = e.options,
                s = r.icon;
            this.adjustContainerAlignment(r);
            var o = this._createHTMLElement({
                    tagName: "div",
                    className: "notyf__toast"
                }),
                i = this._createHTMLElement({
                    tagName: "div",
                    className: "notyf__ripple"
                }),
                c = this._createHTMLElement({
                    tagName: "div",
                    className: "notyf__wrapper"
                }),
                d = this._createHTMLElement({
                    tagName: "div",
                    className: "notyf__message"
                });
            d.innerHTML = r.message || "";
            var u = r.background || r.backgroundColor;
            if (s) {
                var l = this._createHTMLElement({
                    tagName: "div",
                    className: "notyf__icon"
                });
                if ((typeof s == "string" || s instanceof String) && (l.innerHTML = new String(s).valueOf()), typeof s == "object") {
                    var p = s.tagName,
                        w = p === void 0 ? "i" : p,
                        T = s.className,
                        h = s.text,
                        b = s.color,
                        m = b === void 0 ? u : b,
                        _ = this._createHTMLElement({
                            tagName: w,
                            className: T,
                            text: h
                        });
                    m && (_.style.color = m), l.appendChild(_)
                }
                c.appendChild(l)
            }
            if (c.appendChild(d), o.appendChild(c), u && (r.ripple ? (i.style.background = u, o.appendChild(i)) : o.style.background = u), r.dismissible) {
                var O = this._createHTMLElement({
                        tagName: "div",
                        className: "notyf__dismiss"
                    }),
                    C = this._createHTMLElement({
                        tagName: "button",
                        className: "notyf__dismiss-btn"
                    });
                O.appendChild(C), c.appendChild(O), o.classList.add("notyf__toast--dismissible"), C.addEventListener("click", function(x) {
                    var B, F;
                    (F = (B = n.events)[ie.Dismiss]) === null || F === void 0 || F.call(B, {
                        target: e,
                        event: x
                    }), x.stopPropagation()
                })
            }
            o.addEventListener("click", function(x) {
                var B, F;
                return (F = (B = n.events)[ie.Click]) === null || F === void 0 ? void 0 : F.call(B, {
                    target: e,
                    event: x
                })
            });
            var M = this.getYPosition(r) === "top" ? "upper" : "lower";
            return o.classList.add("notyf__toast--" + M), o
        }, t.prototype._createHTMLElement = function(e) {
            var n = e.tagName,
                r = e.className,
                s = e.text,
                o = document.createElement(n);
            return r && (o.className = r), o.textContent = s || null, o
        }, t.prototype._createA11yContainer = function() {
            var e = this._createHTMLElement({
                tagName: "div",
                className: "notyf-announcer"
            });
            e.setAttribute("aria-atomic", "true"), e.setAttribute("aria-live", "polite"), e.style.border = "0", e.style.clip = "rect(0 0 0 0)", e.style.height = "1px", e.style.margin = "-1px", e.style.overflow = "hidden", e.style.padding = "0", e.style.position = "absolute", e.style.width = "1px", e.style.outline = "0", document.body.appendChild(e), this.a11yContainer = e
        }, t.prototype._announce = function(e) {
            var n = this;
            this.a11yContainer.textContent = "", setTimeout(function() {
                n.a11yContainer.textContent = e
            }, 100)
        }, t.prototype._getAnimationEndEventName = function() {
            var e = document.createElement("_fake"),
                n = {
                    MozTransition: "animationend",
                    OTransition: "oAnimationEnd",
                    WebkitTransition: "webkitAnimationEnd",
                    transition: "animationend"
                },
                r;
            for (r in n)
                if (e.style[r] !== void 0) return n[r];
            return "animationend"
        }, t
    }(),
    $r = function() {
        function t(e) {
            var n = this;
            this.dismiss = this._removeNotification, this.notifications = new Ir, this.view = new Wr;
            var r = this.registerTypes(e);
            this.options = V(V({}, _t), e), this.options.types = r, this.notifications.onUpdate(function(s, o) {
                return n.view.update(s, o)
            }), this.view.on(ie.Dismiss, function(s) {
                var o = s.target,
                    i = s.event;
                n._removeNotification(o), o.triggerEvent(ie.Dismiss, i)
            }), this.view.on(ie.Click, function(s) {
                var o = s.target,
                    i = s.event;
                return o.triggerEvent(ie.Click, i)
            })
        }
        return t.prototype.error = function(e) {
            var n = this.normalizeOptions("error", e);
            return this.open(n)
        }, t.prototype.success = function(e) {
            var n = this.normalizeOptions("success", e);
            return this.open(n)
        }, t.prototype.open = function(e) {
            var n = this.options.types.find(function(o) {
                    var i = o.type;
                    return i === e.type
                }) || {},
                r = V(V({}, n), e);
            this.assignProps(["ripple", "position", "dismissible"], r);
            var s = new Hr(r);
            return this._pushNotification(s), s
        }, t.prototype.dismissAll = function() {
            for (; this.notifications.splice(0, 1););
        }, t.prototype.assignProps = function(e, n) {
            var r = this;
            e.forEach(function(s) {
                n[s] = n[s] == null ? r.options[s] : n[s]
            })
        }, t.prototype._pushNotification = function(e) {
            var n = this;
            this.notifications.push(e);
            var r = e.options.duration !== void 0 ? e.options.duration : this.options.duration;
            r && setTimeout(function() {
                return n._removeNotification(e)
            }, r)
        }, t.prototype._removeNotification = function(e) {
            var n = this.notifications.indexOf(e);
            n !== -1 && this.notifications.splice(n, 1)
        }, t.prototype.normalizeOptions = function(e, n) {
            var r = {
                type: e
            };
            return typeof n == "string" ? r.message = n : typeof n == "object" && (r = V(V({}, r), n)), r
        }, t.prototype.registerTypes = function(e) {
            var n = (e && e.types || []).slice(),
                r = _t.types.map(function(s) {
                    var o = -1;
                    n.forEach(function(c, d) {
                        c.type === s.type && (o = d)
                    });
                    var i = o !== -1 ? n.splice(o, 1)[0] : {};
                    return V(V({}, s), i)
                });
            return r.concat(n)
        }, t
    }();
const Jr = new $r;
window.notyf = Jr;