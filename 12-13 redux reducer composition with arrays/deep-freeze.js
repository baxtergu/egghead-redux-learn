!function (e) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else { var n; n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, n.deepFreeze = e() } }(function () { return function e(n, r, t) { function o(i, u) { if (!r[i]) { if (!n[i]) { var c = "function" == typeof require && require; if (!u && c) return c(i, !0); if (f) return f(i, !0); var d = new Error("Cannot find module '" + i + "'"); throw d.code = "MODULE_NOT_FOUND", d } var p = r[i] = { exports: {} }; n[i][0].call(p.exports, function (e) { var r = n[i][1][e]; return o(r ? r : e) }, p, p.exports, e, n, r, t) } return r[i].exports } for (var f = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o }({ 1: [function (e, n, r) { n.exports = function e(n) { return Object.freeze(n), Object.getOwnPropertyNames(n).forEach(function (r) { !n.hasOwnProperty(r) || null === n[r] || "object" != typeof n[r] && "function" != typeof n[r] || Object.isFrozen(n[r]) || e(n[r]) }), n } }, {}] }, {}, [1])(1) });