!function (t, e) {"object" == typeof exports && "undefined" != typeof module ? e(exports, require("react")) : "function" == typeof define && define.amd ? define(["exports", "react"], e) : e((t = t || self).ReactRouterDOM = {}, t.React);}(this, function (t, c) {"use strict";var C = "default" in c ? c.default : c;function r(t, e) {t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e;}function e(t) {return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;}function n(t, e) {return t(e = { exports: {} }, e.exports), e.exports;}var o = n(function (t, e) {Object.defineProperty(e, "__esModule", { value: !0 });var n = "function" == typeof Symbol && Symbol.for,r = n ? Symbol.for("react.element") : 60103,o = n ? Symbol.for("react.portal") : 60106,i = n ? Symbol.for("react.fragment") : 60107,a = n ? Symbol.for("react.strict_mode") : 60108,c = n ? Symbol.for("react.profiler") : 60114,u = n ? Symbol.for("react.provider") : 60109,s = n ? Symbol.for("react.context") : 60110,f = n ? Symbol.for("react.async_mode") : 60111,l = n ? Symbol.for("react.concurrent_mode") : 60111,p = n ? Symbol.for("react.forward_ref") : 60112,h = n ? Symbol.for("react.suspense") : 60113,d = n ? Symbol.for("react.suspense_list") : 60120,v = n ? Symbol.for("react.memo") : 60115,y = n ? Symbol.for("react.lazy") : 60116,m = n ? Symbol.for("react.fundamental") : 60117,g = n ? Symbol.for("react.responder") : 60118;function w(t) {if ("object" == typeof t && null !== t) {var e = t.$$typeof;switch (e) {case r:switch (t = t.type) {case f:case l:case i:case c:case a:case h:return t;default:switch (t = t && t.$$typeof) {case s:case p:case u:return t;default:return e;}}case y:case v:case o:return e;}}}function b(t) {return w(t) === l;}e.typeOf = w, e.AsyncMode = f, e.ConcurrentMode = l, e.ContextConsumer = s, e.ContextProvider = u, e.Element = r, e.ForwardRef = p, e.Fragment = i, e.Lazy = y, e.Memo = v, e.Portal = o, e.Profiler = c, e.StrictMode = a, e.Suspense = h, e.isValidElementType = function (t) {return "string" == typeof t || "function" == typeof t || t === i || t === l || t === c || t === a || t === h || t === d || "object" == typeof t && null !== t && (t.$$typeof === y || t.$$typeof === v || t.$$typeof === u || t.$$typeof === s || t.$$typeof === p || t.$$typeof === m || t.$$typeof === g);}, e.isAsyncMode = function (t) {return b(t) || w(t) === f;}, e.isConcurrentMode = b, e.isContextConsumer = function (t) {return w(t) === s;}, e.isContextProvider = function (t) {return w(t) === u;}, e.isElement = function (t) {return "object" == typeof t && null !== t && t.$$typeof === r;}, e.isForwardRef = function (t) {return w(t) === p;}, e.isFragment = function (t) {return w(t) === i;}, e.isLazy = function (t) {return w(t) === y;}, e.isMemo = function (t) {return w(t) === v;}, e.isPortal = function (t) {return w(t) === o;}, e.isProfiler = function (t) {return w(t) === c;}, e.isStrictMode = function (t) {return w(t) === a;}, e.isSuspense = function (t) {return w(t) === h;};});e(o);o.typeOf, o.AsyncMode, o.ConcurrentMode, o.ContextConsumer, o.ContextProvider, o.Element, o.ForwardRef, o.Fragment, o.Lazy, o.Memo, o.Portal, o.Profiler, o.StrictMode, o.Suspense, o.isValidElementType, o.isAsyncMode, o.isConcurrentMode, o.isContextConsumer, o.isContextProvider, o.isElement, o.isForwardRef, o.isFragment, o.isLazy, o.isMemo, o.isPortal, o.isProfiler, o.isStrictMode, o.isSuspense;var i = n(function (t, e) {});e(i);i.typeOf, i.AsyncMode, i.ConcurrentMode, i.ContextConsumer, i.ContextProvider, i.Element, i.ForwardRef, i.Fragment, i.Lazy, i.Memo, i.Portal, i.Profiler, i.StrictMode, i.Suspense, i.isValidElementType, i.isAsyncMode, i.isConcurrentMode, i.isContextConsumer, i.isContextProvider, i.isElement, i.isForwardRef, i.isFragment, i.isLazy, i.isMemo, i.isPortal, i.isProfiler, i.isStrictMode, i.isSuspense;var a = n(function (t) {t.exports = o;}),u = (a.isValidElementType, Object.getOwnPropertySymbols),s = Object.prototype.hasOwnProperty,f = Object.prototype.propertyIsEnumerable;!function () {try {if (!Object.assign) return !1;var t = new String("abc");if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {return e[t];}).join("")) return !1;var r = {};return "abcdefghijklmnopqrst".split("").forEach(function (t) {r[t] = t;}), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("");} catch (t) {return !1;}}() || Object.assign, Function.call.bind(Object.prototype.hasOwnProperty);function l() {}function p() {}p.resetWarningCache = l;var h = n(function (t) {t.exports = function () {function t(t, e, n, r, o, i) {if ("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED" !== i) {var a = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name = "Invariant Violation", a;}}function e() {return t;}var n = { array: t.isRequired = t, bool: t, func: t, number: t, object: t, string: t, symbol: t, any: t, arrayOf: e, element: t, elementType: t, instanceOf: e, node: t, objectOf: e, oneOf: e, oneOfType: e, shape: e, exact: e, checkPropTypes: p, resetWarningCache: l };return n.PropTypes = n;}();});function T() {return (T = Object.assign || function (t) {for (var e = 1; e < arguments.length; e++) {var n = arguments[e];for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);}return t;}).apply(this, arguments);}function d(t) {return "/" === t.charAt(0);}function v(t, e) {for (var n = e, r = n + 1, o = t.length; r < o; n += 1, r += 1) t[n] = t[r];t.pop();}var y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;};var m = "Invariant failed";function k(t) {if (!t) throw new Error(m);}function A(t) {return "/" === t.charAt(0) ? t : "/" + t;}function g(t) {return "/" === t.charAt(0) ? t.substr(1) : t;}function M(t, e) {return function (t, e) {return new RegExp("^" + e + "(\\/|\\?|#|$)", "i").test(t);}(t, e) ? t.substr(e.length) : t;}function _(t) {return "/" === t.charAt(t.length - 1) ? t.slice(0, -1) : t;}function j(t) {var e = t.pathname,n = t.search,r = t.hash,o = e || "/";return n && "?" !== n && (o += "?" === n.charAt(0) ? n : "?" + n), r && "#" !== r && (o += "#" === r.charAt(0) ? r : "#" + r), o;}function L(t, e, n, r) {var o;"string" == typeof t ? (o = function (t) {var e = t || "/",n = "",r = "",o = e.indexOf("#");-1 !== o && (r = e.substr(o), e = e.substr(0, o));var i = e.indexOf("?");return -1 !== i && (n = e.substr(i), e = e.substr(0, i)), { pathname: e, search: "?" === n ? "" : n, hash: "#" === r ? "" : r };}(t)).state = e : (void 0 === (o = T({}, t)).pathname && (o.pathname = ""), o.search ? "?" !== o.search.charAt(0) && (o.search = "?" + o.search) : o.search = "", o.hash ? "#" !== o.hash.charAt(0) && (o.hash = "#" + o.hash) : o.hash = "", void 0 !== e && void 0 === o.state && (o.state = e));try {o.pathname = decodeURI(o.pathname);} catch (t) {throw t instanceof URIError ? new URIError('Pathname "' + o.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : t;}return n && (o.key = n), r ? o.pathname ? "/" !== o.pathname.charAt(0) && (o.pathname = function (t, e) {var n = 1 < arguments.length && void 0 !== e ? e : "",r = t && t.split("/") || [],o = n && n.split("/") || [],i = t && d(t),a = n && d(n),c = i || a;if (t && d(t) ? o = r : r.length && (o.pop(), o = o.concat(r)), !o.length) return "/";var u = void 0;if (o.length) {var s = o[o.length - 1];u = "." === s || ".." === s || "" === s;} else u = !1;for (var f = 0, l = o.length; 0 <= l; l--) {var p = o[l];"." === p ? v(o, l) : ".." === p ? (v(o, l), f++) : f && (v(o, l), f--);}if (!c) for (; f--;) o.unshift("..");!c || "" === o[0] || o[0] && d(o[0]) || o.unshift("");var h = o.join("/");return u && "/" !== h.substr(-1) && (h += "/"), h;}(o.pathname, r.pathname)) : o.pathname = r.pathname : o.pathname || (o.pathname = "/"), o;}function S(t, e) {return t.pathname === e.pathname && t.search === e.search && t.hash === e.hash && t.key === e.key && function n(e, r) {if (e === r) return !0;if (null == e || null == r) return !1;if (Array.isArray(e)) return Array.isArray(r) && e.length === r.length && e.every(function (t, e) {return n(t, r[e]);});var t = void 0 === e ? "undefined" : y(e);if (t !== (void 0 === r ? "undefined" : y(r))) return !1;if ("object" !== t) return !1;var o = e.valueOf(),i = r.valueOf();if (o !== e || i !== r) return n(o, i);var a = Object.keys(e),c = Object.keys(r);return a.length === c.length && a.every(function (t) {return n(e[t], r[t]);});}(t.state, e.state);}function $() {var i = null;var r = [];return { setPrompt: function (t) {return i = t, function () {i === t && (i = null);};}, confirmTransitionTo: function (t, e, n, r) {if (null != i) {var o = "function" == typeof i ? i(t, e) : i;"string" == typeof o ? "function" == typeof n ? n(o, r) : r(!0) : r(!1 !== o);} else r(!0);}, appendListener: function (t) {var e = !0;function n() {e && t.apply(void 0, arguments);}return r.push(n), function () {e = !1, r = r.filter(function (t) {return t !== n;});};}, notifyListeners: function () {for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];r.forEach(function (t) {return t.apply(void 0, e);});} };}var U = !("undefined" == typeof window || !window.document || !window.document.createElement);function F(t, e) {e(window.confirm(t));}var N = "popstate",H = "hashchange";function I() {try {return window.history.state || {};} catch (t) {return {};}}function w(t) {void 0 === t && (t = {}), U || k(!1);var c = window.history,u = function () {var t = window.navigator.userAgent;return (-1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone")) && window.history && "pushState" in window.history;}(),e = !(-1 === window.navigator.userAgent.indexOf("Trident")),n = t,r = n.forceRefresh,s = void 0 !== r && r,o = n.getUserConfirmation,f = void 0 === o ? F : o,i = n.keyLength,a = void 0 === i ? 6 : i,l = t.basename ? _(A(t.basename)) : "";function p(t) {var e = t || {},n = e.key,r = e.state,o = window.location,i = o.pathname + o.search + o.hash;return l && (i = M(i, l)), L(i, r, n);}function h() {return Math.random().toString(36).substr(2, a);}var d = $();function v(t) {T(R, t), R.length = c.length, d.notifyListeners(R.location, R.action);}function y(t) {!function (t) {void 0 === t.state && navigator.userAgent.indexOf("CriOS");}(t) && w(p(t.state));}function m() {w(p(I()));}var g = !1;function w(e) {if (g) g = !1, v();else {d.confirmTransitionTo(e, "POP", f, function (t) {t ? v({ action: "POP", location: e }) : function (t) {var e = R.location,n = x.indexOf(e.key);-1 === n && (n = 0);var r = x.indexOf(t.key);-1 === r && (r = 0);var o = n - r;o && (g = !0, O(o));}(e);});}}var b = p(I()),x = [b.key];function P(t) {return l + j(t);}function O(t) {c.go(t);}var C = 0;function E(t) {1 === (C += t) && 1 === t ? (window.addEventListener(N, y), e && window.addEventListener(H, m)) : 0 === C && (window.removeEventListener(N, y), e && window.removeEventListener(H, m));}var S = !1;var R = { length: c.length, action: "POP", location: b, createHref: P, push: function (t, e) {var a = L(t, e, h(), R.location);d.confirmTransitionTo(a, "PUSH", f, function (t) {if (t) {var e = P(a),n = a.key,r = a.state;if (u) {if (c.pushState({ key: n, state: r }, null, e), s) window.location.href = e;else {var o = x.indexOf(R.location.key),i = x.slice(0, -1 === o ? 0 : o + 1);i.push(a.key), x = i, v({ action: "PUSH", location: a });}} else window.location.href = e;}});}, replace: function (t, e) {var i = "REPLACE",a = L(t, e, h(), R.location);d.confirmTransitionTo(a, i, f, function (t) {if (t) {var e = P(a),n = a.key,r = a.state;if (u) {if (c.replaceState({ key: n, state: r }, null, e), s) window.location.replace(e);else {var o = x.indexOf(R.location.key);-1 !== o && (x[o] = a.key), v({ action: i, location: a });}} else window.location.replace(e);}});}, go: O, goBack: function () {O(-1);}, goForward: function () {O(1);}, block: function (t) {void 0 === t && (t = !1);var e = d.setPrompt(t);return S || (E(1), S = !0), function () {return S && (S = !1, E(-1)), e();};}, listen: function (t) {var e = d.appendListener(t);return E(1), function () {E(-1), e();};} };return R;}var R = "hashchange",B = { hashbang: { encodePath: function (t) {return "!" === t.charAt(0) ? t : "!/" + g(t);}, decodePath: function (t) {return "!" === t.charAt(0) ? t.substr(1) : t;} }, noslash: { encodePath: g, decodePath: A }, slash: { encodePath: A, decodePath: A } };function D() {var t = window.location.href,e = t.indexOf("#");return -1 === e ? "" : t.substring(e + 1);}function W(t) {var e = window.location.href.indexOf("#");window.location.replace(window.location.href.slice(0, 0 <= e ? e : 0) + "#" + t);}function b(t) {void 0 === t && (t = {}), U || k(!1);var e = window.history,n = (window.navigator.userAgent.indexOf("Firefox"), t),r = n.getUserConfirmation,a = void 0 === r ? F : r,o = n.hashType,i = void 0 === o ? "slash" : o,c = t.basename ? _(A(t.basename)) : "",u = B[i],s = u.encodePath,f = u.decodePath;function l() {var t = f(D());return c && (t = M(t, c)), L(t);}var p = $();function h(t) {T(E, t), E.length = e.length, p.notifyListeners(E.location, E.action);}var d = !1,v = null;function y() {var t = D(),e = s(t);if (t !== e) W(e);else {var n = l(),r = E.location;if (!d && S(r, n)) return;if (v === j(n)) return;v = null, function (e) {if (d) d = !1, h();else {p.confirmTransitionTo(e, "POP", a, function (t) {t ? h({ action: "POP", location: e }) : function (t) {var e = E.location,n = b.lastIndexOf(j(e));-1 === n && (n = 0);var r = b.lastIndexOf(j(t));-1 === r && (r = 0);var o = n - r;o && (d = !0, x(o));}(e);});}}(n);}}var m = D(),g = s(m);m !== g && W(g);var w = l(),b = [j(w)];function x(t) {e.go(t);}var P = 0;function O(t) {1 === (P += t) && 1 === t ? window.addEventListener(R, y) : 0 === P && window.removeEventListener(R, y);}var C = !1;var E = { length: e.length, action: "POP", location: w, createHref: function (t) {return "#" + s(c + j(t));}, push: function (t, e) {var i = L(t, void 0, void 0, E.location);p.confirmTransitionTo(i, "PUSH", a, function (t) {if (t) {var e = j(i),n = s(c + e);if (D() !== n) {v = e, function (t) {window.location.hash = t;}(n);var r = b.lastIndexOf(j(E.location)),o = b.slice(0, -1 === r ? 0 : r + 1);o.push(e), b = o, h({ action: "PUSH", location: i });} else h();}});}, replace: function (t, e) {var o = "REPLACE",i = L(t, void 0, void 0, E.location);p.confirmTransitionTo(i, o, a, function (t) {if (t) {var e = j(i),n = s(c + e);D() !== n && (v = e, W(n));var r = b.indexOf(j(E.location));-1 !== r && (b[r] = e), h({ action: o, location: i });}});}, go: x, goBack: function () {x(-1);}, goForward: function () {x(1);}, block: function (t) {void 0 === t && (t = !1);var e = p.setPrompt(t);return C || (O(1), C = !0), function () {return C && (C = !1, O(-1)), e();};}, listen: function (t) {var e = p.appendListener(t);return O(1), function () {O(-1), e();};} };return E;}function x(t, e, n) {return Math.min(Math.max(t, e), n);}function P(t, e) {t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e;}var O = 1073741823,E = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {};function V(t, e) {return tt(X(t, e));}var z = C.createContext || function (r, o) {var t,e,i = "__create-react-context-" + function () {var t = "__global_unique_id__";return E[t] = (E[t] || 0) + 1;}() + "__",n = function (e) {function t() {var t;return (t = e.apply(this, arguments) || this).emitter = function (n) {var r = [];return { on: function (t) {r.push(t);}, off: function (e) {r = r.filter(function (t) {return t !== e;});}, get: function () {return n;}, set: function (t, e) {n = t, r.forEach(function (t) {return t(n, e);});} };}(t.props.value), t;}P(t, e);var n = t.prototype;return n.getChildContext = function () {var t;return (t = {})[i] = this.emitter, t;}, n.componentWillReceiveProps = function (t) {if (this.props.value !== t.value) {var e,n = this.props.value,r = t.value;!function (t, e) {return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e;}(n, r) ? (e = "function" == typeof o ? o(n, r) : O, 0 !== (e |= 0) && this.emitter.set(t.value, e)) : e = 0;}}, n.render = function () {return this.props.children;}, t;}(c.Component);n.childContextTypes = ((t = {})[i] = h.object.isRequired, t);var a = function (t) {function e() {var n;return (n = t.apply(this, arguments) || this).state = { value: n.getValue() }, n.onUpdate = function (t, e) {0 != ((0 | n.observedBits) & e) && n.setState({ value: n.getValue() });}, n;}P(e, t);var n = e.prototype;return n.componentWillReceiveProps = function (t) {var e = t.observedBits;this.observedBits = null == e ? O : e;}, n.componentDidMount = function () {this.context[i] && this.context[i].on(this.onUpdate);var t = this.props.observedBits;this.observedBits = null == t ? O : t;}, n.componentWillUnmount = function () {this.context[i] && this.context[i].off(this.onUpdate);}, n.getValue = function () {return this.context[i] ? this.context[i].get() : r;}, n.render = function () {return function (t) {return Array.isArray(t) ? t[0] : t;}(this.props.children)(this.state.value);}, e;}(c.Component);return a.contextTypes = ((e = {})[i] = h.object, e), { Provider: n, Consumer: a };},q = Array.isArray || function (t) {return "[object Array]" == Object.prototype.toString.call(t);},K = it,J = X,G = tt,Y = ot,Q = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g");function X(t, e) {for (var n, r, o = [], i = 0, a = 0, c = "", u = e && e.delimiter || "/"; null != (n = Q.exec(t));) {var s = n[0],f = n[1],l = n.index;if (c += t.slice(a, l), a = l + s.length, f) c += f[1];else {var p = t[a],h = n[2],d = n[3],v = n[4],y = n[5],m = n[6],g = n[7];c && (o.push(c), c = "");var w = null != h && null != p && p !== h,b = "+" === m || "*" === m,x = "?" === m || "*" === m,P = n[2] || u,O = v || y;o.push({ name: d || i++, prefix: h || "", delimiter: P, optional: x, repeat: b, partial: w, asterisk: !!g, pattern: O ? (r = O, r.replace(/([=!:$\/()])/g, "\\$1")) : g ? ".*" : "[^" + et(P) + "]+?" });}}return a < t.length && (c += t.substr(a)), c && o.push(c), o;}function Z(t) {return encodeURI(t).replace(/[\/?#]/g, function (t) {return "%" + t.charCodeAt(0).toString(16).toUpperCase();});}function tt(f) {for (var l = new Array(f.length), t = 0; t < f.length; t++) "object" == typeof f[t] && (l[t] = new RegExp("^(?:" + f[t].pattern + ")$"));return function (t, e) {for (var n = "", r = t || {}, o = (e || {}).pretty ? Z : encodeURIComponent, i = 0; i < f.length; i++) {var a = f[i];if ("string" != typeof a) {var c,u = r[a.name];if (null == u) {if (a.optional) {a.partial && (n += a.prefix);continue;}throw new TypeError('Expected "' + a.name + '" to be defined');}if (q(u)) {if (!a.repeat) throw new TypeError('Expected "' + a.name + '" to not repeat, but received `' + JSON.stringify(u) + "`");if (0 === u.length) {if (a.optional) continue;throw new TypeError('Expected "' + a.name + '" to not be empty');}for (var s = 0; s < u.length; s++) {if (c = o(u[s]), !l[i].test(c)) throw new TypeError('Expected all "' + a.name + '" to match "' + a.pattern + '", but received `' + JSON.stringify(c) + "`");n += (0 === s ? a.prefix : a.delimiter) + c;}} else {if (c = a.asterisk ? encodeURI(u).replace(/[?#]/g, function (t) {return "%" + t.charCodeAt(0).toString(16).toUpperCase();}) : o(u), !l[i].test(c)) throw new TypeError('Expected "' + a.name + '" to match "' + a.pattern + '", but received "' + c + '"');n += a.prefix + c;}} else n += a;}return n;};}function et(t) {return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");}function nt(t, e) {return t.keys = e, t;}function rt(t) {return t.sensitive ? "" : "i";}function ot(t, e, n) {q(e) || (n = e || n, e = []);for (var r = (n = n || {}).strict, o = !1 !== n.end, i = "", a = 0; a < t.length; a++) {var c = t[a];if ("string" == typeof c) i += et(c);else {var u = et(c.prefix),s = "(?:" + c.pattern + ")";e.push(c), c.repeat && (s += "(?:" + u + s + ")*"), i += s = c.optional ? c.partial ? u + "(" + s + ")?" : "(?:" + u + "(" + s + "))?" : u + "(" + s + ")";}}var f = et(n.delimiter || "/"),l = i.slice(-f.length) === f;return r || (i = (l ? i.slice(0, -f.length) : i) + "(?:" + f + "(?=$))?"), i += o ? "$" : r && l ? "" : "(?=" + f + "|$)", nt(new RegExp("^" + i, rt(n)), e);}function it(t, e, n) {return q(e) || (n = e || n, e = []), n = n || {}, t instanceof RegExp ? function (t, e) {var n = t.source.match(/\((?!\?)/g);if (n) for (var r = 0; r < n.length; r++) e.push({ name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, asterisk: !1, pattern: null });return nt(t, e);}(t, e) : q(t) ? function (t, e, n) {for (var r = [], o = 0; o < t.length; o++) r.push(it(t[o], e, n).source);return nt(new RegExp("(?:" + r.join("|") + ")", rt(n)), e);}(t, e, n) : function (t, e, n) {return ot(X(t, n), e, n);}(t, e, n);}function at(t, e) {if (null == t) return {};var n,r,o = {},i = Object.keys(t);for (r = 0; r < i.length; r++) n = i[r], 0 <= e.indexOf(n) || (o[n] = t[n]);return o;}K.parse = J, K.compile = V, K.tokensToFunction = G, K.tokensToRegExp = Y;var ct = { childContextTypes: !0, contextType: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 },ut = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 },st = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 },ft = {};function lt(t) {return a.isMemo(t) ? st : ft[t.$$typeof] || ct;}ft[a.ForwardRef] = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 };var pt = Object.defineProperty,ht = Object.getOwnPropertyNames,dt = Object.getOwnPropertySymbols,vt = Object.getOwnPropertyDescriptor,yt = Object.getPrototypeOf,mt = Object.prototype;var gt = function t(e, n, r) {if ("string" == typeof n) return e;if (mt) {var o = yt(n);o && o !== mt && t(e, o, r);}var i = ht(n);dt && (i = i.concat(dt(n)));for (var a = lt(e), c = lt(n), u = 0; u < i.length; ++u) {var s = i[u];if (!(ut[s] || r && r[s] || c && c[s] || a && a[s])) {var f = vt(n, s);try {pt(e, s, f);} catch (t) {}}}return e;},wt = function (t) {var e = z();return e.displayName = t, e;}("Router-History"),bt = function (t) {var e = z();return e.displayName = t, e;}("Router"),xt = function (n) {function t(t) {var e;return (e = n.call(this, t) || this).state = { location: t.history.location }, e._isMounted = !1, e._pendingLocation = null, t.staticContext || (e.unlisten = t.history.listen(function (t) {e._isMounted ? e.setState({ location: t }) : e._pendingLocation = t;})), e;}r(t, n), t.computeRootMatch = function (t) {return { path: "/", url: "/", params: {}, isExact: "/" === t };};var e = t.prototype;return e.componentDidMount = function () {this._isMounted = !0, this._pendingLocation && this.setState({ location: this._pendingLocation });}, e.componentWillUnmount = function () {this.unlisten && this.unlisten();}, e.render = function () {return C.createElement(bt.Provider, { value: { history: this.props.history, location: this.state.location, match: t.computeRootMatch(this.state.location.pathname), staticContext: this.props.staticContext } }, C.createElement(wt.Provider, { children: this.props.children || null, value: this.props.history }));}, t;}(C.Component),Pt = function (o) {function t() {for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];return (t = o.call.apply(o, [this].concat(n)) || this).history = function (t) {void 0 === t && (t = {});var e = t,o = e.getUserConfirmation,n = e.initialEntries,r = void 0 === n ? ["/"] : n,i = e.initialIndex,a = void 0 === i ? 0 : i,c = e.keyLength,u = void 0 === c ? 6 : c,s = $();function f(t) {T(y, t), y.length = y.entries.length, s.notifyListeners(y.location, y.action);}function l() {return Math.random().toString(36).substr(2, u);}var p = x(a, 0, r.length - 1),h = r.map(function (t) {return L(t, void 0, "string" == typeof t ? l() : t.key || l());}),d = j;function v(t) {var e = x(y.index + t, 0, y.entries.length - 1),n = y.entries[e];s.confirmTransitionTo(n, "POP", o, function (t) {t ? f({ action: "POP", location: n, index: e }) : f();});}var y = { length: h.length, action: "POP", location: h[p], index: p, entries: h, createHref: d, push: function (t, e) {var r = L(t, e, l(), y.location);s.confirmTransitionTo(r, "PUSH", o, function (t) {if (t) {var e = y.index + 1,n = y.entries.slice(0);n.length > e ? n.splice(e, n.length - e, r) : n.push(r), f({ action: "PUSH", location: r, index: e, entries: n });}});}, replace: function (t, e) {var n = "REPLACE",r = L(t, e, l(), y.location);s.confirmTransitionTo(r, n, o, function (t) {t && (y.entries[y.index] = r, f({ action: n, location: r }));});}, go: v, goBack: function () {v(-1);}, goForward: function () {v(1);}, canGo: function (t) {var e = y.index + t;return 0 <= e && e < y.entries.length;}, block: function (t) {return void 0 === t && (t = !1), s.setPrompt(t);}, listen: function (t) {return s.appendListener(t);} };return y;}(t.props), t;}return r(t, o), t.prototype.render = function () {return C.createElement(xt, { history: this.history, children: this.props.children });}, t;}(C.Component),Ot = function (t) {function e() {return t.apply(this, arguments) || this;}r(e, t);var n = e.prototype;return n.componentDidMount = function () {this.props.onMount && this.props.onMount.call(this, this);}, n.componentDidUpdate = function (t) {this.props.onUpdate && this.props.onUpdate.call(this, this, t);}, n.componentWillUnmount = function () {this.props.onUnmount && this.props.onUnmount.call(this, this);}, n.render = function () {return null;}, e;}(C.Component);var Ct = {},Et = 1e4,St = 0;function Rt(t, e) {return void 0 === t && (t = "/"), void 0 === e && (e = {}), "/" === t ? t : function (t) {if (Ct[t]) return Ct[t];var e = K.compile(t);return St < Et && (Ct[t] = e, St++), e;}(t)(e, { pretty: !0 });}var Tt = {},kt = 1e4,At = 0;function Mt(s, t) {void 0 === t && (t = {}), "string" != typeof t && !Array.isArray(t) || (t = { path: t });var e = t,n = e.path,r = e.exact,f = void 0 !== r && r,o = e.strict,l = void 0 !== o && o,i = e.sensitive,p = void 0 !== i && i;return [].concat(n).reduce(function (t, e) {if (!e && "" !== e) return null;if (t) return t;var n = function (t, e) {var n = "" + e.end + e.strict + e.sensitive,r = Tt[n] || (Tt[n] = {});if (r[t]) return r[t];var o = [],i = { regexp: K(t, o, e), keys: o };return At < kt && (r[t] = i, At++), i;}(e, { end: f, strict: l, sensitive: p }),r = n.regexp,o = n.keys,i = r.exec(s);if (!i) return null;var a = i[0],c = i.slice(1),u = s === a;return f && !u ? null : { path: e, url: "/" === e && "" === a ? "/" : a, isExact: u, params: o.reduce(function (t, e, n) {return t[e.name] = c[n], t;}, {}) };}, null);}var _t = function (t) {function e() {return t.apply(this, arguments) || this;}return r(e, t), e.prototype.render = function () {var c = this;return C.createElement(bt.Consumer, null, function (t) {t || k(!1);var e = c.props.location || t.location,n = T({}, t, { location: e, match: c.props.computedMatch ? c.props.computedMatch : c.props.path ? Mt(e.pathname, c.props) : t.match }),r = c.props,o = r.children,i = r.component,a = r.render;return Array.isArray(o) && 0 === o.length && (o = null), C.createElement(bt.Provider, { value: n }, n.match ? o ? "function" == typeof o ? o(n) : o : i ? C.createElement(i, n) : a ? a(n) : null : "function" == typeof o ? o(n) : null);});}, e;}(C.Component);function jt(t) {return "/" === t.charAt(0) ? t : "/" + t;}function Lt(t) {return "string" == typeof t ? t : j(t);}function $t() {return function () {k(!1);};}function Ut() {}var Ft = function (o) {function t() {for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];return (e = o.call.apply(o, [this].concat(n)) || this).handlePush = function (t) {return e.navigateTo(t, "PUSH");}, e.handleReplace = function (t) {return e.navigateTo(t, "REPLACE");}, e.handleListen = function () {return Ut;}, e.handleBlock = function () {return Ut;}, e;}r(t, o);var e = t.prototype;return e.navigateTo = function (t, e) {var n = this.props,r = n.basename,o = void 0 === r ? "" : r,i = n.context,a = void 0 === i ? {} : i;a.action = e, a.location = function (t, e) {return t ? T({}, e, { pathname: jt(t) + e.pathname }) : e;}(o, L(t)), a.url = Lt(a.location);}, e.render = function () {var t = this.props,e = t.basename,n = void 0 === e ? "" : e,r = t.context,o = void 0 === r ? {} : r,i = t.location,a = void 0 === i ? "/" : i,c = at(t, ["basename", "context", "location"]),u = { createHref: function (t) {return jt(n + Lt(t));}, action: "POP", location: function (t, e) {if (!t) return e;var n = jt(t);return 0 !== e.pathname.indexOf(n) ? e : T({}, e, { pathname: e.pathname.substr(n.length) });}(n, L(a)), push: this.handlePush, replace: this.handleReplace, go: $t(), goBack: $t(), goForward: $t(), listen: this.handleListen, block: this.handleBlock };return C.createElement(xt, T({}, c, { history: u, staticContext: o }));}, t;}(C.Component),Nt = function (t) {function e() {return t.apply(this, arguments) || this;}return r(e, t), e.prototype.render = function () {var t = this;return C.createElement(bt.Consumer, null, function (n) {n || k(!1);var r,o,i = t.props.location || n.location;return C.Children.forEach(t.props.children, function (t) {if (null == o && C.isValidElement(t)) {var e = (r = t).props.path || t.props.from;o = e ? Mt(i.pathname, T({}, t.props, { path: e })) : n.match;}}), o ? C.cloneElement(r, { location: i, computedMatch: o }) : null;});}, e;}(C.Component);var Ht = C.useContext;function It() {return Ht(bt).location;}function Bt(t, e) {return "function" == typeof t ? t(e) : t;}function Dt(t, e) {return "string" == typeof t ? L(t, null, null, e) : t;}function Wt(t) {return t;}var Vt = function (o) {function t() {for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];return (t = o.call.apply(o, [this].concat(n)) || this).history = w(t.props), t;}return r(t, o), t.prototype.render = function () {return C.createElement(xt, { history: this.history, children: this.props.children });}, t;}(C.Component),zt = function (o) {function t() {for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];return (t = o.call.apply(o, [this].concat(n)) || this).history = b(t.props), t;}return r(t, o), t.prototype.render = function () {return C.createElement(xt, { history: this.history, children: this.props.children });}, t;}(C.Component),qt = C.forwardRef;void 0 === qt && (qt = Wt);function Kt(t) {return t;}var Jt = qt(function (t, e) {var n = t.innerRef,r = t.navigate,o = t.onClick,i = at(t, ["innerRef", "navigate", "onClick"]),a = i.target,c = T({}, i, { onClick: function (e) {try {o && o(e);} catch (t) {throw e.preventDefault(), t;}e.defaultPrevented || 0 !== e.button || a && "_self" !== a || function (t) {return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);}(e) || (e.preventDefault(), r());} });return c.ref = Wt !== qt && e || n, C.createElement("a", c);}),Gt = qt(function (t, i) {var e = t.component,a = void 0 === e ? Jt : e,c = t.replace,u = t.to,s = t.innerRef,f = at(t, ["component", "replace", "to", "innerRef"]);return C.createElement(bt.Consumer, null, function (e) {e || k(!1);var n = e.history,t = Dt(Bt(u, e.location), e.location),r = t ? n.createHref(t) : "",o = T({}, f, { href: r, navigate: function () {var t = Bt(u, e.location);(c ? n.replace : n.push)(t);} });return Wt !== qt ? o.ref = i || s : o.innerRef = s, C.createElement(a, o);});}),Yt = C.forwardRef;void 0 === Yt && (Yt = Kt);var Qt = Yt(function (t, f) {var e = t["aria-current"],l = void 0 === e ? "page" : e,n = t.activeClassName,p = void 0 === n ? "active" : n,h = t.activeStyle,d = t.className,v = t.exact,y = t.isActive,m = t.location,g = t.sensitive,w = t.strict,b = t.style,x = t.to,P = t.innerRef,O = at(t, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "sensitive", "strict", "style", "to", "innerRef"]);return C.createElement(bt.Consumer, null, function (t) {t || k(!1);var e = m || t.location,n = Dt(Bt(x, e), e),r = n.pathname,o = r && r.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1"),i = o ? Mt(e.pathname, { path: o, exact: v, sensitive: g, strict: w }) : null,a = !!(y ? y(i, e) : i),c = a ? function () {for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];return e.filter(function (t) {return t;}).join(" ");}(d, p) : d,u = a ? T({}, b, {}, h) : b,s = T({ "aria-current": a && l || null, className: c, style: u, to: n }, O);return Kt !== Yt ? s.ref = f || P : s.innerRef = P, C.createElement(Gt, s);});});t.BrowserRouter = Vt, t.HashRouter = zt, t.Link = Gt, t.MemoryRouter = Pt, t.NavLink = Qt, t.Prompt = function (t) {var r = t.message,e = t.when,o = void 0 === e || e;return C.createElement(bt.Consumer, null, function (t) {if (t || k(!1), !o || t.staticContext) return null;var n = t.history.block;return C.createElement(Ot, { onMount: function (t) {t.release = n(r);}, onUpdate: function (t, e) {e.message !== r && (t.release(), t.release = n(r));}, onUnmount: function (t) {t.release();}, message: r });});}, t.Redirect = function (t) {var i = t.computedMatch,a = t.to,e = t.push,c = void 0 !== e && e;return C.createElement(bt.Consumer, null, function (t) {t || k(!1);var e = t.history,n = t.staticContext,r = c ? e.push : e.replace,o = L(i ? "string" == typeof a ? Rt(a, i.params) : T({}, a, { pathname: Rt(a.pathname, i.params) }) : a);return n ? (r(o), null) : C.createElement(Ot, { onMount: function () {r(o);}, onUpdate: function (t, e) {var n = L(e.to);S(n, T({}, o, { key: n.key })) || r(o);}, to: a });});}, t.Route = _t, t.Router = xt, t.StaticRouter = Ft, t.Switch = Nt, t.generatePath = Rt, t.matchPath = Mt, t.useHistory = function () {return Ht(wt);}, t.useLocation = It, t.useParams = function () {var t = Ht(bt).match;return t ? t.params : {};}, t.useRouteMatch = function (t) {var e = It(),n = Ht(bt).match;return t ? Mt(e.pathname, t) : n;}, t.withRouter = function (r) {function t(t) {var e = t.wrappedComponentRef,n = at(t, ["wrappedComponentRef"]);return C.createElement(bt.Consumer, null, function (t) {return t || k(!1), C.createElement(r, T({}, n, t, { ref: e }));});}var e = "withRouter(" + (r.displayName || r.name) + ")";return t.displayName = e, t.WrappedComponent = r, gt(t, r);}, Object.defineProperty(t, "__esModule", { value: !0 });});