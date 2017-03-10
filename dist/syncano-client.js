var SyncanoClient = function(e) {
    function __webpack_require__(n) {
        if (t[n]) return t[n].exports;
        var r = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, __webpack_require__), r.l = !0, r.exports;
    }
    var t = {};
    return __webpack_require__.m = e, __webpack_require__.c = t, __webpack_require__.i = function(e) {
        return e;
    }, __webpack_require__.d = function(e, t, n) {
        __webpack_require__.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, __webpack_require__.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return __webpack_require__.d(t, "a", t), t;
    }, __webpack_require__.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 26);
}([ function(e, t, n) {
    "use strict";
    function isArray(e) {
        return "[object Array]" === o.call(e);
    }
    function isArrayBuffer(e) {
        return "[object ArrayBuffer]" === o.call(e);
    }
    function isFormData(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
    }
    function isArrayBufferView(e) {
        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;
    }
    function isString(e) {
        return "string" == typeof e;
    }
    function isNumber(e) {
        return "number" == typeof e;
    }
    function isUndefined(e) {
        return void 0 === e;
    }
    function isObject(e) {
        return null !== e && "object" == typeof e;
    }
    function isDate(e) {
        return "[object Date]" === o.call(e);
    }
    function isFile(e) {
        return "[object File]" === o.call(e);
    }
    function isBlob(e) {
        return "[object Blob]" === o.call(e);
    }
    function isFunction(e) {
        return "[object Function]" === o.call(e);
    }
    function isStream(e) {
        return isObject(e) && isFunction(e.pipe);
    }
    function isURLSearchParams(e) {
        return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;
    }
    function trim(e) {
        return e.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    function isStandardBrowserEnv() {
        return "undefined" != typeof window && "undefined" != typeof document && "function" == typeof document.createElement;
    }
    function forEach(e, t) {
        if (null !== e && void 0 !== e) if ("object" == typeof e || isArray(e) || (e = [ e ]), 
        isArray(e)) for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e); else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
    }
    function merge() {
        function assignValue(t, n) {
            "object" == typeof e[n] && "object" == typeof t ? e[n] = merge(e[n], t) : e[n] = t;
        }
        for (var e = {}, t = 0, n = arguments.length; t < n; t++) forEach(arguments[t], assignValue);
        return e;
    }
    function extend(e, t, n) {
        return forEach(t, function(t, o) {
            e[o] = n && "function" == typeof t ? r(t, n) : t;
        }), e;
    }
    var r = n(6), o = Object.prototype.toString;
    e.exports = {
        isArray: isArray,
        isArrayBuffer: isArrayBuffer,
        isFormData: isFormData,
        isArrayBufferView: isArrayBufferView,
        isString: isString,
        isNumber: isNumber,
        isObject: isObject,
        isUndefined: isUndefined,
        isDate: isDate,
        isFile: isFile,
        isBlob: isBlob,
        isFunction: isFunction,
        isStream: isStream,
        isURLSearchParams: isURLSearchParams,
        isStandardBrowserEnv: isStandardBrowserEnv,
        forEach: forEach,
        merge: merge,
        extend: extend,
        trim: trim
    };
}, function(e, t, n) {
    "use strict";
    (function(t) {
        function setContentTypeIfUnset(e, t) {
            !r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
        }
        function getDefaultAdapter() {
            var e;
            return "undefined" != typeof XMLHttpRequest ? e = n(2) : void 0 !== t && (e = n(2)), 
            e;
        }
        var r = n(0), o = n(23), i = /^\)\]\}',?\n/, a = {
            "Content-Type": "application/x-www-form-urlencoded"
        }, u = {
            adapter: getDefaultAdapter(),
            transformRequest: [ function(e, t) {
                return o(t, "Content-Type"), r.isFormData(e) || r.isArrayBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (setContentTypeIfUnset(t, "application/x-www-form-urlencoded;charset=utf-8"), 
                e.toString()) : r.isObject(e) ? (setContentTypeIfUnset(t, "application/json;charset=utf-8"), 
                JSON.stringify(e)) : e;
            } ],
            transformResponse: [ function(e) {
                if ("string" == typeof e) {
                    e = e.replace(i, "");
                    try {
                        e = JSON.parse(e);
                    } catch (e) {}
                }
                return e;
            } ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            validateStatus: function(e) {
                return e >= 200 && e < 300;
            }
        };
        u.headers = {
            common: {
                Accept: "application/json, text/plain, */*"
            }
        }, r.forEach([ "delete", "get", "head" ], function(e) {
            u.headers[e] = {};
        }), r.forEach([ "post", "put", "patch" ], function(e) {
            u.headers[e] = r.merge(a);
        }), e.exports = u;
    }).call(t, n(7));
}, function(e, t, n) {
    "use strict";
    (function(t) {
        var r = n(0), o = n(15), i = n(18), a = n(24), u = n(22), s = n(5), c = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || n(17);
        e.exports = function(e) {
            return new Promise(function(f, l) {
                var p = e.data, d = e.headers;
                r.isFormData(p) && delete d["Content-Type"];
                var h = new XMLHttpRequest(), m = "onreadystatechange", g = !1;
                if ("test" === t.env.NODE_ENV || "undefined" == typeof window || !window.XDomainRequest || "withCredentials" in h || u(e.url) || (h = new window.XDomainRequest(), 
                m = "onload", g = !0, h.onprogress = function() {}, h.ontimeout = function() {}), 
                e.auth) {
                    var v = e.auth.username || "", y = e.auth.password || "";
                    d.Authorization = "Basic " + c(v + ":" + y);
                }
                if (h.open(e.method.toUpperCase(), i(e.url, e.params, e.paramsSerializer), !0), 
                h.timeout = e.timeout, h[m] = function() {
                    if (h && (4 === h.readyState || g) && (0 !== h.status || h.responseURL && 0 === h.responseURL.indexOf("file:"))) {
                        var t = "getAllResponseHeaders" in h ? a(h.getAllResponseHeaders()) : null;
                        o(f, l, {
                            data: e.responseType && "text" !== e.responseType ? h.response : h.responseText,
                            status: 1223 === h.status ? 204 : h.status,
                            statusText: 1223 === h.status ? "No Content" : h.statusText,
                            headers: t,
                            config: e,
                            request: h
                        }), h = null;
                    }
                }, h.onerror = function() {
                    l(s("Network Error", e)), h = null;
                }, h.ontimeout = function() {
                    l(s("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED")), h = null;
                }, r.isStandardBrowserEnv()) {
                    var w = n(20), _ = (e.withCredentials || u(e.url)) && e.xsrfCookieName ? w.read(e.xsrfCookieName) : void 0;
                    _ && (d[e.xsrfHeaderName] = _);
                }
                if ("setRequestHeader" in h && r.forEach(d, function(e, t) {
                    void 0 === p && "content-type" === t.toLowerCase() ? delete d[t] : h.setRequestHeader(t, e);
                }), e.withCredentials && (h.withCredentials = !0), e.responseType) try {
                    h.responseType = e.responseType;
                } catch (e) {
                    if ("json" !== h.responseType) throw e;
                }
                "function" == typeof e.onDownloadProgress && h.addEventListener("progress", e.onDownloadProgress), 
                "function" == typeof e.onUploadProgress && h.upload && h.upload.addEventListener("progress", e.onUploadProgress), 
                e.cancelToken && e.cancelToken.promise.then(function(e) {
                    h && (h.abort(), l(e), h = null);
                }), void 0 === p && (p = null), h.send(p);
            });
        };
    }).call(t, n(7));
}, function(e, t, n) {
    "use strict";
    function Cancel(e) {
        this.message = e;
    }
    Cancel.prototype.toString = function() {
        return "Cancel" + (this.message ? ": " + this.message : "");
    }, Cancel.prototype.__CANCEL__ = !0, e.exports = Cancel;
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return !(!e || !e.__CANCEL__);
    };
}, function(e, t, n) {
    "use strict";
    var r = n(14);
    e.exports = function(e, t, n, o) {
        return r(new Error(e), t, n, o);
    };
}, function(e, t, n) {
    "use strict";
    e.exports = function(e, t) {
        return function() {
            for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
            return e.apply(t, n);
        };
    };
}, function(e, t) {
    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
    }
    function runTimeout(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === defaultSetTimout || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
        try {
            return n(e, 0);
        } catch (t) {
            try {
                return n.call(null, e, 0);
            } catch (t) {
                return n.call(this, e, 0);
            }
        }
    }
    function runClearTimeout(e) {
        if (r === clearTimeout) return clearTimeout(e);
        if ((r === defaultClearTimeout || !r) && clearTimeout) return r = clearTimeout, 
        clearTimeout(e);
        try {
            return r(e);
        } catch (t) {
            try {
                return r.call(null, e);
            } catch (t) {
                return r.call(this, e);
            }
        }
    }
    function cleanUpNextTick() {
        u && i && (u = !1, i.length ? a = i.concat(a) : s = -1, a.length && drainQueue());
    }
    function drainQueue() {
        if (!u) {
            var e = runTimeout(cleanUpNextTick);
            u = !0;
            for (var t = a.length; t; ) {
                for (i = a, a = []; ++s < t; ) i && i[s].run();
                s = -1, t = a.length;
            }
            i = null, u = !1, runClearTimeout(e);
        }
    }
    function Item(e, t) {
        this.fun = e, this.array = t;
    }
    function noop() {}
    var n, r, o = e.exports = {};
    !function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
        } catch (e) {
            n = defaultSetTimout;
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
        } catch (e) {
            r = defaultClearTimeout;
        }
    }();
    var i, a = [], u = !1, s = -1;
    o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        a.push(new Item(e, t)), 1 !== a.length || u || runTimeout(drainQueue);
    }, Item.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", 
    o.versions = {}, o.on = noop, o.addListener = noop, o.once = noop, o.off = noop, 
    o.removeListener = noop, o.removeAllListeners = noop, o.emit = noop, o.binding = function(e) {
        throw new Error("process.binding is not supported");
    }, o.cwd = function() {
        return "/";
    }, o.chdir = function(e) {
        throw new Error("process.chdir is not supported");
    }, o.umask = function() {
        return 0;
    };
}, function(e, t, n) {
    e.exports = n(9);
}, function(e, t, n) {
    "use strict";
    function createInstance(e) {
        var t = new i(e), n = o(i.prototype.request, t);
        return r.extend(n, i.prototype, t), r.extend(n, t), n;
    }
    var r = n(0), o = n(6), i = n(11), a = n(1), u = createInstance(a);
    u.Axios = i, u.create = function(e) {
        return createInstance(r.merge(a, e));
    }, u.Cancel = n(3), u.CancelToken = n(10), u.isCancel = n(4), u.all = function(e) {
        return Promise.all(e);
    }, u.spread = n(25), e.exports = u, e.exports.default = u;
}, function(e, t, n) {
    "use strict";
    function CancelToken(e) {
        if ("function" != typeof e) throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise(function(e) {
            t = e;
        });
        var n = this;
        e(function(e) {
            n.reason || (n.reason = new r(e), t(n.reason));
        });
    }
    var r = n(3);
    CancelToken.prototype.throwIfRequested = function() {
        if (this.reason) throw this.reason;
    }, CancelToken.source = function() {
        var e;
        return {
            token: new CancelToken(function(t) {
                e = t;
            }),
            cancel: e
        };
    }, e.exports = CancelToken;
}, function(e, t, n) {
    "use strict";
    function Axios(e) {
        this.defaults = e, this.interceptors = {
            request: new i(),
            response: new i()
        };
    }
    var r = n(1), o = n(0), i = n(12), a = n(13), u = n(21), s = n(19);
    Axios.prototype.request = function(e) {
        "string" == typeof e && (e = o.merge({
            url: arguments[0]
        }, arguments[1])), e = o.merge(r, this.defaults, {
            method: "get"
        }, e), e.baseURL && !u(e.url) && (e.url = s(e.baseURL, e.url));
        var t = [ a, void 0 ], n = Promise.resolve(e);
        for (this.interceptors.request.forEach(function(e) {
            t.unshift(e.fulfilled, e.rejected);
        }), this.interceptors.response.forEach(function(e) {
            t.push(e.fulfilled, e.rejected);
        }); t.length; ) n = n.then(t.shift(), t.shift());
        return n;
    }, o.forEach([ "delete", "get", "head" ], function(e) {
        Axios.prototype[e] = function(t, n) {
            return this.request(o.merge(n || {}, {
                method: e,
                url: t
            }));
        };
    }), o.forEach([ "post", "put", "patch" ], function(e) {
        Axios.prototype[e] = function(t, n, r) {
            return this.request(o.merge(r || {}, {
                method: e,
                url: t,
                data: n
            }));
        };
    }), e.exports = Axios;
}, function(e, t, n) {
    "use strict";
    function InterceptorManager() {
        this.handlers = [];
    }
    var r = n(0);
    InterceptorManager.prototype.use = function(e, t) {
        return this.handlers.push({
            fulfilled: e,
            rejected: t
        }), this.handlers.length - 1;
    }, InterceptorManager.prototype.eject = function(e) {
        this.handlers[e] && (this.handlers[e] = null);
    }, InterceptorManager.prototype.forEach = function(e) {
        r.forEach(this.handlers, function(t) {
            null !== t && e(t);
        });
    }, e.exports = InterceptorManager;
}, function(e, t, n) {
    "use strict";
    function throwIfCancellationRequested(e) {
        e.cancelToken && e.cancelToken.throwIfRequested();
    }
    var r = n(0), o = n(16), i = n(4), a = n(1);
    e.exports = function(e) {
        return throwIfCancellationRequested(e), e.headers = e.headers || {}, e.data = o(e.data, e.headers, e.transformRequest), 
        e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}), 
        r.forEach([ "delete", "get", "head", "post", "put", "patch", "common" ], function(t) {
            delete e.headers[t];
        }), (e.adapter || a.adapter)(e).then(function(t) {
            return throwIfCancellationRequested(e), t.data = o(t.data, t.headers, e.transformResponse), 
            t;
        }, function(t) {
            return i(t) || (throwIfCancellationRequested(e), t && t.response && (t.response.data = o(t.response.data, t.response.headers, e.transformResponse))), 
            Promise.reject(t);
        });
    };
}, function(e, t, n) {
    "use strict";
    e.exports = function(e, t, n, r) {
        return e.config = t, n && (e.code = n), e.response = r, e;
    };
}, function(e, t, n) {
    "use strict";
    var r = n(5);
    e.exports = function(e, t, n) {
        var o = n.config.validateStatus;
        n.status && o && !o(n.status) ? t(r("Request failed with status code " + n.status, n.config, null, n)) : e(n);
    };
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    e.exports = function(e, t, n) {
        return r.forEach(n, function(n) {
            e = n(e, t);
        }), e;
    };
}, function(e, t, n) {
    "use strict";
    function E() {
        this.message = "String contains an invalid character";
    }
    function btoa(e) {
        for (var t, n, o = String(e), i = "", a = 0, u = r; o.charAt(0 | a) || (u = "=", 
        a % 1); i += u.charAt(63 & t >> 8 - a % 1 * 8)) {
            if ((n = o.charCodeAt(a += .75)) > 255) throw new E();
            t = t << 8 | n;
        }
        return i;
    }
    var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    E.prototype = new Error(), E.prototype.code = 5, E.prototype.name = "InvalidCharacterError", 
    e.exports = btoa;
}, function(e, t, n) {
    "use strict";
    function encode(e) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    var r = n(0);
    e.exports = function(e, t, n) {
        if (!t) return e;
        var o;
        if (n) o = n(t); else if (r.isURLSearchParams(t)) o = t.toString(); else {
            var i = [];
            r.forEach(t, function(e, t) {
                null !== e && void 0 !== e && (r.isArray(e) && (t += "[]"), r.isArray(e) || (e = [ e ]), 
                r.forEach(e, function(e) {
                    r.isDate(e) ? e = e.toISOString() : r.isObject(e) && (e = JSON.stringify(e)), i.push(encode(t) + "=" + encode(e));
                }));
            }), o = i.join("&");
        }
        return o && (e += (e.indexOf("?") === -1 ? "?" : "&") + o), e;
    };
}, function(e, t, n) {
    "use strict";
    e.exports = function(e, t) {
        return e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "");
    };
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    e.exports = r.isStandardBrowserEnv() ? function() {
        return {
            write: function(e, t, n, o, i, a) {
                var u = [];
                u.push(e + "=" + encodeURIComponent(t)), r.isNumber(n) && u.push("expires=" + new Date(n).toGMTString()), 
                r.isString(o) && u.push("path=" + o), r.isString(i) && u.push("domain=" + i), a === !0 && u.push("secure"), 
                document.cookie = u.join("; ");
            },
            read: function(e) {
                var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                return t ? decodeURIComponent(t[3]) : null;
            },
            remove: function(e) {
                this.write(e, "", Date.now() - 864e5);
            }
        };
    }() : function() {
        return {
            write: function() {},
            read: function() {
                return null;
            },
            remove: function() {}
        };
    }();
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
    };
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    e.exports = r.isStandardBrowserEnv() ? function() {
        function resolveURL(e) {
            var r = e;
            return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), 
            {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, "") : "",
                hash: n.hash ? n.hash.replace(/^#/, "") : "",
                hostname: n.hostname,
                port: n.port,
                pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
            };
        }
        var e, t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
        return e = resolveURL(window.location.href), function(t) {
            var n = r.isString(t) ? resolveURL(t) : t;
            return n.protocol === e.protocol && n.host === e.host;
        };
    }() : function() {
        return function() {
            return !0;
        };
    }();
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    e.exports = function(e, t) {
        r.forEach(e, function(n, r) {
            r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]);
        });
    };
}, function(e, t, n) {
    "use strict";
    var r = n(0);
    e.exports = function(e) {
        var t, n, o, i = {};
        return e ? (r.forEach(e.split("\n"), function(e) {
            o = e.indexOf(":"), t = r.trim(e.substr(0, o)).toLowerCase(), n = r.trim(e.substr(o + 1)), 
            t && (i[t] = i[t] ? i[t] + ", " + n : n);
        }), i) : i;
    };
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return function(t) {
            return e.apply(null, t);
        };
    };
}, function(e, t, n) {
    "use strict";
    function _interopRequireDefault(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function SyncanoClient() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : required("instanceName"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.host || "syncano.space";
        return client.instanceName = e, client.baseUrl = "https://" + e + "." + n + "/", 
        client.loginMethod = t.loginMethod, client.setTokenCallback = t.setTokenCallback, 
        client.token = t.token, client.headers = function(e) {
            return Object.assign({}, e);
        }, client;
    }
    function client() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : required("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = this.url(e), a = this.headers(n.headers), u = [ function(e) {
            var t = client.token ? {
                _user_key: client.token
            } : {};
            return JSON.stringify(r({}, e, t));
        } ];
        return (0, i.default)(r({
            method: "POST",
            url: o,
            data: t,
            headers: a,
            transformRequest: u
        }, n)).then(function(e) {
            return e.data;
        });
    }
    function required(e) {
        throw new Error(e + " parameter is required by SyncanoClient");
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
    }, o = n(8), i = _interopRequireDefault(o);
    client.post = client, client.login = function(e, t) {
        var n = this;
        return (this.loginMethod ? this.loginMethod : function(e, t) {
            var r = "" + n.baseUrl + n.instanceName + "/users/auth/", o = JSON.stringify({
                username: e,
                password: t
            });
            return (0, i.default)({
                url: r,
                data: o
            }).then(function(e) {
                return n.setToken(e.token), e;
            });
        })(e, t);
    }, client.url = function(e) {
        return "" + this.baseUrl + e + "/";
    }, client.logout = function() {
        this.token = void 0;
    }, client.setToken = function(e) {
        this.token = e, "function" == typeof client.setTokenCallback && client.setTokenCallback(e);
    }, client.get = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : required("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return this.post(e, r({}, t, {
            _method: "GET"
        }), n);
    }, client.delete = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : required("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return this.post(e, r({}, t, {
            _method: "DELETE"
        }), n);
    }, client.put = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : required("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return this.post(e, r({}, t, {
            _method: "PUT"
        }), n);
    }, client.patch = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : required("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return this.post(e, r({}, t, {
            _method: "PATCH"
        }), n);
    }, client.subscribe = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : required("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : required("callback"), n = !1, r = this.url(e), o = {
            method: "GET",
            timeout: 3e5,
            headers: this.headers()
        };
        return function loop() {
            (0, i.default)(r, o).then(function(e) {
                n || (loop(), t(e.data));
            }).catch(function(e) {
                var t = /(Network Error)|(timeout)/.test(e), r = n === !1;
                t && r && loop();
            });
        }(), {
            stop: function() {
                n = !0;
            }
        };
    }, t.default = SyncanoClient;
} ]);