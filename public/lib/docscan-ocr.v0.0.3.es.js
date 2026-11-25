/* DocScan OCR v0.0.3 | Client-Side Browser Passport & ID Scanner */
// \0rolldown/runtime.js
var e = Object.defineProperty, t = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, r = Object.prototype.hasOwnProperty, i = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, a = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), o = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, s = (i, a, o, s) => {
	if (a && typeof a == "object" || typeof a == "function") for (var c = n(a), l = 0, u = c.length, d; l < u; l++) d = c[l], !r.call(i, d) && d !== o && e(i, d, {
		get: ((e) => a[e]).bind(null, d),
		enumerable: !(s = t(a, d)) || s.enumerable
	});
	return i;
}, c = (t) => r.call(t, "module.exports") ? t["module.exports"] : s(e({}, "__esModule", { value: !0 }), t), l = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), u = "0.0.3", d = /* @__PURE__ */ a(((e, t) => {
	var n = function(e) {
		var t = Object.prototype, n = t.hasOwnProperty, r = Object.defineProperty || function(e, t, n) {
			e[t] = n.value;
		}, i, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", s = a.asyncIterator || "@@asyncIterator", c = a.toStringTag || "@@toStringTag";
		function l(e, t, n) {
			return Object.defineProperty(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}), e[t];
		}
		try {
			l({}, "");
		} catch {
			l = function(e, t, n) {
				return e[t] = n;
			};
		}
		function u(e, t, n, i) {
			var a = t && t.prototype instanceof _ ? t : _, o = Object.create(a.prototype);
			return r(o, "_invoke", { value: E(e, n, new A(i || [])) }), o;
		}
		e.wrap = u;
		function d(e, t, n) {
			try {
				return {
					type: "normal",
					arg: e.call(t, n)
				};
			} catch (e) {
				return {
					type: "throw",
					arg: e
				};
			}
		}
		var f = "suspendedStart", p = "suspendedYield", m = "executing", h = "completed", g = {};
		function _() {}
		function v() {}
		function y() {}
		var b = {};
		l(b, o, function() {
			return this;
		});
		var x = Object.getPrototypeOf, S = x && x(x(j([])));
		S && S !== t && n.call(S, o) && (b = S);
		var C = y.prototype = _.prototype = Object.create(b);
		v.prototype = y, r(C, "constructor", {
			value: y,
			configurable: !0
		}), r(y, "constructor", {
			value: v,
			configurable: !0
		}), v.displayName = l(y, c, "GeneratorFunction");
		function w(e) {
			[
				"next",
				"throw",
				"return"
			].forEach(function(t) {
				l(e, t, function(e) {
					return this._invoke(t, e);
				});
			});
		}
		e.isGeneratorFunction = function(e) {
			var t = typeof e == "function" && e.constructor;
			return t ? t === v || (t.displayName || t.name) === "GeneratorFunction" : !1;
		}, e.mark = function(e) {
			return Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y, l(e, c, "GeneratorFunction")), e.prototype = Object.create(C), e;
		}, e.awrap = function(e) {
			return { __await: e };
		};
		function T(e, t) {
			function i(r, a, o, s) {
				var c = d(e[r], e, a);
				if (c.type === "throw") s(c.arg);
				else {
					var l = c.arg, u = l.value;
					return u && typeof u == "object" && n.call(u, "__await") ? t.resolve(u.__await).then(function(e) {
						i("next", e, o, s);
					}, function(e) {
						i("throw", e, o, s);
					}) : t.resolve(u).then(function(e) {
						l.value = e, o(l);
					}, function(e) {
						return i("throw", e, o, s);
					});
				}
			}
			var a;
			function o(e, n) {
				function r() {
					return new t(function(t, r) {
						i(e, n, t, r);
					});
				}
				return a = a ? a.then(r, r) : r();
			}
			r(this, "_invoke", { value: o });
		}
		w(T.prototype), l(T.prototype, s, function() {
			return this;
		}), e.AsyncIterator = T, e.async = function(t, n, r, i, a) {
			a === void 0 && (a = Promise);
			var o = new T(u(t, n, r, i), a);
			return e.isGeneratorFunction(n) ? o : o.next().then(function(e) {
				return e.done ? e.value : o.next();
			});
		};
		function E(e, t, n) {
			var r = f;
			return function(i, a) {
				if (r === m) throw Error("Generator is already running");
				if (r === h) {
					if (i === "throw") throw a;
					return M();
				}
				for (n.method = i, n.arg = a;;) {
					var o = n.delegate;
					if (o) {
						var s = D(o, n);
						if (s) {
							if (s === g) continue;
							return s;
						}
					}
					if (n.method === "next") n.sent = n._sent = n.arg;
					else if (n.method === "throw") {
						if (r === f) throw r = h, n.arg;
						n.dispatchException(n.arg);
					} else n.method === "return" && n.abrupt("return", n.arg);
					r = m;
					var c = d(e, t, n);
					if (c.type === "normal") {
						if (r = n.done ? h : p, c.arg === g) continue;
						return {
							value: c.arg,
							done: n.done
						};
					}
					c.type === "throw" && (r = h, n.method = "throw", n.arg = c.arg);
				}
			};
		}
		function D(e, t) {
			var n = t.method, r = e.iterator[n];
			if (r === i) return t.delegate = null, n === "throw" && e.iterator.return && (t.method = "return", t.arg = i, D(e, t), t.method === "throw") || n !== "return" && (t.method = "throw", t.arg = /* @__PURE__ */ TypeError("The iterator does not provide a '" + n + "' method")), g;
			var a = d(r, e.iterator, t.arg);
			if (a.type === "throw") return t.method = "throw", t.arg = a.arg, t.delegate = null, g;
			var o = a.arg;
			if (!o) return t.method = "throw", t.arg = /* @__PURE__ */ TypeError("iterator result is not an object"), t.delegate = null, g;
			if (o.done) t[e.resultName] = o.value, t.next = e.nextLoc, t.method !== "return" && (t.method = "next", t.arg = i);
			else return o;
			return t.delegate = null, g;
		}
		w(C), l(C, c, "Generator"), l(C, o, function() {
			return this;
		}), l(C, "toString", function() {
			return "[object Generator]";
		});
		function O(e) {
			var t = { tryLoc: e[0] };
			1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
		}
		function k(e) {
			var t = e.completion || {};
			t.type = "normal", delete t.arg, e.completion = t;
		}
		function A(e) {
			this.tryEntries = [{ tryLoc: "root" }], e.forEach(O, this), this.reset(!0);
		}
		e.keys = function(e) {
			var t = Object(e), n = [];
			for (var r in t) n.push(r);
			return n.reverse(), function e() {
				for (; n.length;) {
					var r = n.pop();
					if (r in t) return e.value = r, e.done = !1, e;
				}
				return e.done = !0, e;
			};
		};
		function j(e) {
			if (e) {
				var t = e[o];
				if (t) return t.call(e);
				if (typeof e.next == "function") return e;
				if (!isNaN(e.length)) {
					var r = -1, a = function t() {
						for (; ++r < e.length;) if (n.call(e, r)) return t.value = e[r], t.done = !1, t;
						return t.value = i, t.done = !0, t;
					};
					return a.next = a;
				}
			}
			return { next: M };
		}
		e.values = j;
		function M() {
			return {
				value: i,
				done: !0
			};
		}
		return A.prototype = {
			constructor: A,
			reset: function(e) {
				if (this.prev = 0, this.next = 0, this.sent = this._sent = i, this.done = !1, this.delegate = null, this.method = "next", this.arg = i, this.tryEntries.forEach(k), !e) for (var t in this) t.charAt(0) === "t" && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = i);
			},
			stop: function() {
				this.done = !0;
				var e = this.tryEntries[0].completion;
				if (e.type === "throw") throw e.arg;
				return this.rval;
			},
			dispatchException: function(e) {
				if (this.done) throw e;
				var t = this;
				function r(n, r) {
					return s.type = "throw", s.arg = e, t.next = n, r && (t.method = "next", t.arg = i), !!r;
				}
				for (var a = this.tryEntries.length - 1; a >= 0; --a) {
					var o = this.tryEntries[a], s = o.completion;
					if (o.tryLoc === "root") return r("end");
					if (o.tryLoc <= this.prev) {
						var c = n.call(o, "catchLoc"), l = n.call(o, "finallyLoc");
						if (c && l) {
							if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
							if (this.prev < o.finallyLoc) return r(o.finallyLoc);
						} else if (c) {
							if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
						} else if (l) {
							if (this.prev < o.finallyLoc) return r(o.finallyLoc);
						} else throw Error("try statement without catch or finally");
					}
				}
			},
			abrupt: function(e, t) {
				for (var r = this.tryEntries.length - 1; r >= 0; --r) {
					var i = this.tryEntries[r];
					if (i.tryLoc <= this.prev && n.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
						var a = i;
						break;
					}
				}
				a && (e === "break" || e === "continue") && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
				var o = a ? a.completion : {};
				return o.type = e, o.arg = t, a ? (this.method = "next", this.next = a.finallyLoc, g) : this.complete(o);
			},
			complete: function(e, t) {
				if (e.type === "throw") throw e.arg;
				return e.type === "break" || e.type === "continue" ? this.next = e.arg : e.type === "return" ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : e.type === "normal" && t && (this.next = t), g;
			},
			finish: function(e) {
				for (var t = this.tryEntries.length - 1; t >= 0; --t) {
					var n = this.tryEntries[t];
					if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), k(n), g;
				}
			},
			catch: function(e) {
				for (var t = this.tryEntries.length - 1; t >= 0; --t) {
					var n = this.tryEntries[t];
					if (n.tryLoc === e) {
						var r = n.completion;
						if (r.type === "throw") {
							var i = r.arg;
							k(n);
						}
						return i;
					}
				}
				throw Error("illegal catch attempt");
			},
			delegateYield: function(e, t, n) {
				return this.delegate = {
					iterator: j(e),
					resultName: t,
					nextLoc: n
				}, this.method === "next" && (this.arg = i), g;
			}
		}, e;
	}(typeof t == "object" ? t.exports : {});
	try {
		regeneratorRuntime = n;
	} catch {
		typeof globalThis == "object" ? globalThis.regeneratorRuntime = n : Function("r", "regeneratorRuntime = r")(n);
	}
})), f = /* @__PURE__ */ a(((e, t) => {
	t.exports = (e, t) => `${e}-${t}-${Math.random().toString(16).slice(3, 8)}`;
})), p = /* @__PURE__ */ a(((e, t) => {
	var n = f(), r = 0;
	t.exports = ({ id: e, action: t, payload: i = {} }) => {
		let a = e;
		return a === void 0 && (a = n("Job", r), r += 1), {
			id: a,
			action: t,
			payload: i
		};
	};
})), m = /* @__PURE__ */ a(((e, t, n) => {
	var r = !1;
	e.logging = r, e.setLogging = (e) => {
		r = e;
	}, e.log = (...e) => r ? console.log.apply(n, e) : null;
})), h = /* @__PURE__ */ a(((e, t, n) => {
	var r = p(), { log: i } = m(), a = f(), o = 0;
	t.exports = () => {
		let e = a("Scheduler", o), t = {}, s = {}, c = [];
		o += 1;
		let l = () => c.length, u = () => Object.keys(t).length, d = () => {
			if (c.length !== 0) {
				let e = Object.keys(t);
				for (let n = 0; n < e.length; n += 1) if (s[e[n]] === void 0) {
					c[0](t[e[n]]);
					break;
				}
			}
		}, f = (t, a) => new Promise((o, l) => {
			let u = r({
				action: t,
				payload: a
			});
			c.push(async (e) => {
				c.shift(), s[e.id] = u;
				try {
					o(await e[t].apply(n, [...a, u.id]));
				} catch (e) {
					l(e);
				} finally {
					delete s[e.id], d();
				}
			}), i(`[${e}]: Add ${u.id} to JobQueue`), i(`[${e}]: JobQueue length=${c.length}`), d();
		});
		return {
			addWorker: (n) => (t[n.id] = n, i(`[${e}]: Add ${n.id}`), i(`[${e}]: Number of workers=${u()}`), d(), n.id),
			addJob: async (t, ...n) => {
				if (u() === 0) throw Error(`[${e}]: You need to have at least one worker before adding jobs`);
				return f(t, n);
			},
			terminate: async () => {
				Object.keys(t).forEach(async (e) => {
					await t[e].terminate();
				}), c = [];
			},
			getQueueLen: l,
			getNumWorkers: u
		};
	};
})), g = /* @__PURE__ */ a(((e, t) => {
	t.exports = (e) => {
		let t = {};
		return typeof WorkerGlobalScope < "u" ? t.type = "webworker" : typeof document == "object" ? t.type = "browser" : typeof process == "object" && typeof l == "function" && (t.type = "node"), e === void 0 ? t : t[e];
	};
})), _ = /* @__PURE__ */ a(((e, t) => {
	var n = g()("type") === "browser" ? (e) => new URL(e, window.location.href).href : (e) => e;
	t.exports = (e) => {
		let t = { ...e };
		return [
			"corePath",
			"workerPath",
			"langPath"
		].forEach((r) => {
			e[r] && (t[r] = n(t[r]));
		}), t;
	};
})), v = /* @__PURE__ */ a(((e, t) => {
	t.exports = {
		TESSERACT_ONLY: 0,
		LSTM_ONLY: 1,
		TESSERACT_LSTM_COMBINED: 2,
		DEFAULT: 3
	};
})), y = /* @__PURE__ */ o({
	author: () => "",
	browser: () => k,
	bugs: () => I,
	collective: () => R,
	contributors: () => A,
	default: () => z,
	dependencies: () => N,
	description: () => S,
	devDependencies: () => M,
	homepage: () => L,
	jsdelivr: () => D,
	license: () => j,
	main: () => C,
	name: () => b,
	overrides: () => P,
	repository: () => F,
	scripts: () => O,
	type: () => w,
	types: () => T,
	unpkg: () => E,
	version: () => x
}), b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, z, B = i((() => {
	b = "tesseract.js", x = "7.0.0", S = "Pure Javascript Multilingual OCR", C = "src/index.js", w = "commonjs", T = "src/index.d.ts", E = "dist/tesseract.min.js", D = "dist/tesseract.min.js", O = {
		start: "node scripts/server.js",
		build: "rimraf dist && webpack --config scripts/webpack.config.prod.js && rollup -c scripts/rollup.esm.mjs",
		"profile:tesseract": "webpack-bundle-analyzer dist/tesseract-stats.json",
		"profile:worker": "webpack-bundle-analyzer dist/worker-stats.json",
		prepublishOnly: "npm run build",
		wait: "rimraf dist && wait-on http://localhost:3000/dist/tesseract.min.js",
		test: "npm-run-all -p -r start test:all",
		"test:all": "npm-run-all wait test:browser test:node:all",
		"test:browser": "karma start karma.conf.js",
		"test:node": "nyc mocha --exit --bail --require ./scripts/test-helper.mjs",
		"test:node:all": "npm run test:node -- ./tests/*.test.mjs",
		lint: "eslint src",
		"lint:fix": "eslint --fix src",
		postinstall: "opencollective-postinstall || true"
	}, k = { "./src/worker/node/index.js": "./src/worker/browser/index.js" }, A = ["jeromewu"], j = "Apache-2.0", M = {
		"@babel/core": "^7.21.4",
		"@babel/eslint-parser": "^7.21.3",
		"@babel/preset-env": "^7.21.4",
		"@rollup/plugin-commonjs": "^24.1.0",
		acorn: "^8.8.2",
		"babel-loader": "^9.1.2",
		buffer: "^6.0.3",
		cors: "^2.8.5",
		eslint: "^7.32.0",
		"eslint-config-airbnb-base": "^14.2.1",
		"eslint-plugin-import": "^2.27.5",
		"expect.js": "^0.3.1",
		express: "^4.18.2",
		mocha: "^10.2.0",
		"npm-run-all": "^4.1.5",
		karma: "^6.4.2",
		"karma-chrome-launcher": "^3.2.0",
		"karma-firefox-launcher": "^2.1.2",
		"karma-mocha": "^2.0.1",
		"karma-webpack": "^5.0.0",
		nyc: "^15.1.0",
		rimraf: "^5.0.0",
		rollup: "^3.20.7",
		"wait-on": "^7.0.1",
		webpack: "^5.79.0",
		"webpack-bundle-analyzer": "^4.8.0",
		"webpack-cli": "^5.0.1",
		"webpack-dev-middleware": "^6.0.2",
		"rollup-plugin-sourcemaps": "^0.6.3"
	}, N = {
		"bmp-js": "^0.1.0",
		"idb-keyval": "^6.2.0",
		"is-url": "^1.2.4",
		"node-fetch": "^2.6.9",
		"opencollective-postinstall": "^2.0.3",
		"regenerator-runtime": "^0.13.3",
		"tesseract.js-core": "^7.0.0",
		"wasm-feature-detect": "^1.8.0",
		zlibjs: "^0.3.1"
	}, P = { "@rollup/pluginutils": "^5.0.2" }, F = {
		type: "git",
		url: "https://github.com/naptha/tesseract.js.git"
	}, I = { url: "https://github.com/naptha/tesseract.js/issues" }, L = "https://github.com/naptha/tesseract.js", R = {
		type: "opencollective",
		url: "https://opencollective.com/tesseractjs"
	}, z = {
		name: b,
		version: x,
		description: S,
		main: C,
		type: w,
		types: T,
		unpkg: E,
		jsdelivr: D,
		scripts: O,
		browser: k,
		author: "",
		contributors: A,
		license: j,
		devDependencies: M,
		dependencies: N,
		overrides: P,
		repository: F,
		bugs: I,
		homepage: L,
		collective: R
	};
})), V = /* @__PURE__ */ a(((e, t) => {
	t.exports = {
		workerBlobURL: !0,
		logger: () => {}
	};
})), H = /* @__PURE__ */ a(((e, t) => {
	var n = (B(), c(y).default).version;
	t.exports = {
		...V(),
		workerPath: `https://cdn.jsdelivr.net/npm/tesseract.js@v${n}/dist/worker.min.js`
	};
})), U = /* @__PURE__ */ a(((e, t) => {
	t.exports = ({ workerPath: e, workerBlobURL: t }) => {
		let n;
		if (Blob && URL && t) {
			let t = new Blob([`importScripts("${e}");`], { type: "application/javascript" });
			n = new Worker(URL.createObjectURL(t));
		} else n = new Worker(e);
		return n;
	};
})), W = /* @__PURE__ */ a(((e, t) => {
	t.exports = (e) => {
		e.terminate();
	};
})), ee = /* @__PURE__ */ a(((e, t) => {
	t.exports = (e, t) => {
		e.onmessage = ({ data: e }) => {
			t(e);
		};
	};
})), te = /* @__PURE__ */ a(((e, t) => {
	t.exports = async (e, t) => {
		e.postMessage(t);
	};
})), ne = /* @__PURE__ */ a(((e, t) => {
	var n = (e) => new Promise((t, n) => {
		let r = new FileReader();
		r.onload = () => {
			t(r.result);
		}, r.onerror = ({ target: { error: { code: e } } }) => {
			n(Error(`File could not be read! Code=${e}`));
		}, r.readAsArrayBuffer(e);
	}), r = async (e) => {
		let t = e;
		return e === void 0 ? "undefined" : (typeof e == "string" ? t = /data:image\/([a-zA-Z]*);base64,([^"]*)/.test(e) ? atob(e.split(",")[1]).split("").map((e) => e.charCodeAt(0)) : await (await fetch(e)).arrayBuffer() : typeof HTMLElement < "u" && e instanceof HTMLElement ? (e.tagName === "IMG" && (t = await r(e.src)), e.tagName === "VIDEO" && (t = await r(e.poster)), e.tagName === "CANVAS" && await new Promise((r) => {
			e.toBlob(async (e) => {
				t = await n(e), r();
			});
		})) : typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? t = await n(await e.convertToBlob()) : (e instanceof File || e instanceof Blob) && (t = await n(e)), new Uint8Array(t));
	};
	t.exports = r;
})), re = /* @__PURE__ */ a(((e, t) => {
	t.exports = {
		defaultOptions: H(),
		spawnWorker: U(),
		terminateWorker: W(),
		onMessage: ee(),
		send: te(),
		loadImage: ne()
	};
})), G = /* @__PURE__ */ a(((e, t) => {
	var n = _(), r = p(), { log: i } = m(), a = f(), o = v(), { defaultOptions: s, spawnWorker: c, terminateWorker: l, onMessage: u, loadImage: d, send: h } = re(), g = 0;
	t.exports = async (e = "eng", t = o.LSTM_ONLY, f = {}, p = {}) => {
		let m = a("Worker", g), { logger: _, errorHandler: v, ...y } = n({
			...s,
			...f
		}), b = {}, x = typeof e == "string" ? e.split("+") : e, S = t, C = p, w = [o.DEFAULT, o.LSTM_ONLY].includes(t) && !y.legacyCore, T, E, D = new Promise((e, t) => {
			E = e, T = t;
		}), O = (e) => {
			T(e.message);
		}, k = c(y);
		k.onerror = O, g += 1;
		let A = ({ id: e, action: t, payload: n }) => new Promise((r, a) => {
			i(`[${m}]: Start ${e}, action=${t}`);
			let o = `${t}-${e}`;
			b[o] = {
				resolve: r,
				reject: a
			}, h(k, {
				workerId: m,
				jobId: e,
				action: t,
				payload: n
			});
		}), j = () => console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)"), M = (e) => A(r({
			id: e,
			action: "load",
			payload: { options: {
				lstmOnly: w,
				corePath: y.corePath,
				logging: y.logging
			} }
		})), N = (e, t, n) => A(r({
			id: n,
			action: "FS",
			payload: {
				method: "writeFile",
				args: [e, t]
			}
		})), P = (e, t) => A(r({
			id: t,
			action: "FS",
			payload: {
				method: "readFile",
				args: [e, { encoding: "utf8" }]
			}
		})), F = (e, t) => A(r({
			id: t,
			action: "FS",
			payload: {
				method: "unlink",
				args: [e]
			}
		})), I = (e, t, n) => A(r({
			id: n,
			action: "FS",
			payload: {
				method: e,
				args: t
			}
		})), L = (e, t) => A(r({
			id: t,
			action: "loadLanguage",
			payload: {
				langs: e,
				options: {
					langPath: y.langPath,
					dataPath: y.dataPath,
					cachePath: y.cachePath,
					cacheMethod: y.cacheMethod,
					gzip: y.gzip,
					lstmOnly: [o.DEFAULT, o.LSTM_ONLY].includes(S) && !y.legacyLang
				}
			}
		})), R = (e, t, n, i) => A(r({
			id: i,
			action: "initialize",
			payload: {
				langs: e,
				oem: t,
				config: n
			}
		})), z = (e = "eng", t, n, r) => {
			if (w && [o.TESSERACT_ONLY, o.TESSERACT_LSTM_COMBINED].includes(t)) throw Error("Legacy model requested but code missing.");
			let i = t || S;
			S = i;
			let a = n || C;
			C = a;
			let s = (typeof e == "string" ? e.split("+") : e).filter((e) => !x.includes(e));
			return x.push(...s), s.length > 0 ? L(s, r).then(() => R(e, i, a, r)) : R(e, i, a, r);
		}, B = (e = {}, t) => A(r({
			id: t,
			action: "setParameters",
			payload: { params: e }
		})), V = async (e, t = {}, n = { text: !0 }, i) => A(r({
			id: i,
			action: "recognize",
			payload: {
				image: await d(e),
				options: t,
				output: n
			}
		})), H = async (e, t) => {
			if (w) throw Error("`worker.detect` requires Legacy model, which was not loaded.");
			return A(r({
				id: t,
				action: "detect",
				payload: { image: await d(e) }
			}));
		}, U = async () => (k !== null && (l(k), k = null), Promise.resolve());
		u(k, ({ workerId: e, jobId: t, status: n, action: r, data: a }) => {
			let o = `${r}-${t}`;
			if (n === "resolve") i(`[${e}]: Complete ${t}`), b[o].resolve({
				jobId: t,
				data: a
			}), delete b[o];
			else if (n === "reject") {
				if (b[o].reject(a), delete b[o], r === "load" && T(a), v) v(a);
				else throw Error(a);
			} else n === "progress" && _({
				...a,
				userJobId: t
			});
		});
		let W = {
			id: m,
			worker: k,
			load: j,
			writeText: N,
			readText: P,
			removeFile: F,
			FS: I,
			reinitialize: z,
			setParameters: B,
			recognize: V,
			detect: H,
			terminate: U
		};
		return M().then(() => L(e)).then(() => R(e, t, p)).then(() => E(W)).catch(() => {}), D;
	};
})), K = /* @__PURE__ */ a(((e, t) => {
	var n = G();
	t.exports = {
		recognize: async (e, t, r) => {
			let i = await n(t, 1, r);
			return i.recognize(e).finally(async () => {
				await i.terminate();
			});
		},
		detect: async (e, t) => {
			let r = await n("osd", 0, t);
			return r.detect(e).finally(async () => {
				await r.terminate();
			});
		}
	};
})), ie = /* @__PURE__ */ a(((e, t) => {
	t.exports = {
		AFR: "afr",
		AMH: "amh",
		ARA: "ara",
		ASM: "asm",
		AZE: "aze",
		AZE_CYRL: "aze_cyrl",
		BEL: "bel",
		BEN: "ben",
		BOD: "bod",
		BOS: "bos",
		BUL: "bul",
		CAT: "cat",
		CEB: "ceb",
		CES: "ces",
		CHI_SIM: "chi_sim",
		CHI_TRA: "chi_tra",
		CHR: "chr",
		CYM: "cym",
		DAN: "dan",
		DEU: "deu",
		DZO: "dzo",
		ELL: "ell",
		ENG: "eng",
		ENM: "enm",
		EPO: "epo",
		EST: "est",
		EUS: "eus",
		FAS: "fas",
		FIN: "fin",
		FRA: "fra",
		FRK: "frk",
		FRM: "frm",
		GLE: "gle",
		GLG: "glg",
		GRC: "grc",
		GUJ: "guj",
		HAT: "hat",
		HEB: "heb",
		HIN: "hin",
		HRV: "hrv",
		HUN: "hun",
		IKU: "iku",
		IND: "ind",
		ISL: "isl",
		ITA: "ita",
		ITA_OLD: "ita_old",
		JAV: "jav",
		JPN: "jpn",
		KAN: "kan",
		KAT: "kat",
		KAT_OLD: "kat_old",
		KAZ: "kaz",
		KHM: "khm",
		KIR: "kir",
		KOR: "kor",
		KUR: "kur",
		LAO: "lao",
		LAT: "lat",
		LAV: "lav",
		LIT: "lit",
		MAL: "mal",
		MAR: "mar",
		MKD: "mkd",
		MLT: "mlt",
		MSA: "msa",
		MYA: "mya",
		NEP: "nep",
		NLD: "nld",
		NOR: "nor",
		ORI: "ori",
		PAN: "pan",
		POL: "pol",
		POR: "por",
		PUS: "pus",
		RON: "ron",
		RUS: "rus",
		SAN: "san",
		SIN: "sin",
		SLK: "slk",
		SLV: "slv",
		SPA: "spa",
		SPA_OLD: "spa_old",
		SQI: "sqi",
		SRP: "srp",
		SRP_LATN: "srp_latn",
		SWA: "swa",
		SWE: "swe",
		SYR: "syr",
		TAM: "tam",
		TEL: "tel",
		TGK: "tgk",
		TGL: "tgl",
		THA: "tha",
		TIR: "tir",
		TUR: "tur",
		UIG: "uig",
		UKR: "ukr",
		URD: "urd",
		UZB: "uzb",
		UZB_CYRL: "uzb_cyrl",
		VIE: "vie",
		YID: "yid"
	};
})), ae = /* @__PURE__ */ a(((e, t) => {
	t.exports = {
		OSD_ONLY: "0",
		AUTO_OSD: "1",
		AUTO_ONLY: "2",
		AUTO: "3",
		SINGLE_COLUMN: "4",
		SINGLE_BLOCK_VERT_TEXT: "5",
		SINGLE_BLOCK: "6",
		SINGLE_LINE: "7",
		SINGLE_WORD: "8",
		CIRCLE_WORD: "9",
		SINGLE_CHAR: "10",
		SPARSE_TEXT: "11",
		SPARSE_TEXT_OSD: "12",
		RAW_LINE: "13"
	};
})), q = (/* @__PURE__ */ a(((e, t) => {
	d();
	var n = h(), r = G(), i = K(), a = ie(), o = v(), s = ae(), { setLogging: c } = m();
	t.exports = {
		languages: a,
		OEM: o,
		PSM: s,
		createScheduler: n,
		createWorker: r,
		setLogging: c,
		...i
	};
})))(), oe = {
	AFG: "Afghanistan",
	ALB: "Albania",
	DZA: "Algeria",
	AND: "Andorra",
	AGO: "Angola",
	ATG: "Antigua and Barbuda",
	ARG: "Argentina",
	ARM: "Armenia",
	AUS: "Australia",
	AUT: "Austria",
	AZE: "Azerbaijan",
	BHS: "Bahamas",
	BHR: "Bahrain",
	BGD: "Bangladesh",
	BRB: "Barbados",
	BLR: "Belarus",
	BEL: "Belgium",
	BLZ: "Belize",
	BEN: "Benin",
	BTN: "Bhutan",
	BOL: "Bolivia",
	BIH: "Bosnia and Herzegovina",
	BWA: "Botswana",
	BRA: "Brazil",
	BRN: "Brunei Darussalam",
	BGR: "Bulgaria",
	BFA: "Burkina Faso",
	BDI: "Burundi",
	CPV: "Cabo Verde",
	KHM: "Cambodia",
	CMR: "Cameroon",
	CAN: "Canada",
	CAF: "Central African Republic",
	TCD: "Chad",
	CHL: "Chile",
	CHN: "China",
	COL: "Colombia",
	COM: "Comoros",
	COG: "Congo",
	COD: "Congo (Democratic Republic)",
	CRI: "Costa Rica",
	CIV: "Côte d'Ivoire",
	HRV: "Croatia",
	CUB: "Cuba",
	CYP: "Cyprus",
	CZE: "Czechia",
	DNK: "Denmark",
	DJI: "Djibouti",
	DMA: "Dominica",
	DOM: "Dominican Republic",
	ECU: "Ecuador",
	EGY: "Egypt",
	SLV: "El Salvador",
	GNQ: "Equatorial Guinea",
	ERI: "Eritrea",
	EST: "Estonia",
	SWZ: "Eswatini",
	ETH: "Ethiopia",
	FJI: "Fiji",
	FIN: "Finland",
	FRA: "France",
	GAB: "Gabon",
	GMB: "Gambia",
	GEO: "Georgia",
	DEU: "Germany",
	"D<<": "Germany",
	D: "Germany",
	GHA: "Ghana",
	GRC: "Greece",
	GRD: "Grenada",
	GTM: "Guatemala",
	GIN: "Guinea",
	GNB: "Guinea-Bissau",
	GUY: "Guyana",
	HTI: "Haiti",
	HND: "Honduras",
	HKG: "Hong Kong",
	HUN: "Hungary",
	ISL: "Iceland",
	IND: "India",
	IDN: "Indonesia",
	IRN: "Iran",
	IRQ: "Iraq",
	IRL: "Ireland",
	ISR: "Israel",
	ITA: "Italy",
	JAM: "Jamaica",
	JPN: "Japan",
	JOR: "Jordan",
	KAZ: "Kazakhstan",
	KEN: "Kenya",
	KIR: "Kiribati",
	PRK: "Korea (North)",
	KOR: "Korea (South)",
	KWT: "Kuwait",
	KGZ: "Kyrgyzstan",
	LAO: "Laos",
	LVA: "Latvia",
	LBN: "Lebanon",
	LSO: "Lesotho",
	LBR: "Liberia",
	LBY: "Libya",
	LIE: "Liechtenstein",
	LTU: "Lithuania",
	LUX: "Luxembourg",
	MAC: "Macao",
	MDG: "Madagascar",
	MWI: "Malawi",
	MYS: "Malaysia",
	MDV: "Maldives",
	MLI: "Mali",
	MLT: "Malta",
	MHL: "Marshall Islands",
	MRT: "Mauritania",
	MUS: "Mauritius",
	MEX: "Mexico",
	FSM: "Micronesia",
	MDA: "Moldova",
	MCO: "Monaco",
	MNG: "Mongolia",
	MNE: "Montenegro",
	MAR: "Morocco",
	MOZ: "Mozambique",
	MMR: "Myanmar",
	NAM: "Namibia",
	NRU: "Nauru",
	NPL: "Nepal",
	NLD: "Netherlands",
	NZL: "New Zealand",
	NIC: "Nicaragua",
	NER: "Niger",
	NGA: "Nigeria",
	MKD: "North Macedonia",
	NOR: "Norway",
	OMN: "Oman",
	PAK: "Pakistan",
	PLW: "Palau",
	PSE: "Palestine",
	PAN: "Panama",
	PNG: "Papua New Guinea",
	PRY: "Paraguay",
	PER: "Peru",
	PHL: "Philippines",
	POL: "Poland",
	PRT: "Portugal",
	QAT: "Qatar",
	ROU: "Romania",
	RUS: "Russia",
	RWA: "Rwanda",
	KNA: "Saint Kitts and Nevis",
	LCA: "Saint Lucia",
	VCT: "Saint Vincent and the Grenadines",
	WSM: "Samoa",
	SMR: "San Marino",
	STP: "Sao Tome and Principe",
	SAU: "Saudi Arabia",
	SEN: "Senegal",
	SRB: "Serbia",
	SYC: "Seychelles",
	SLE: "Sierra Leone",
	SGP: "Singapore",
	SVK: "Slovakia",
	SVN: "Slovenia",
	SLB: "Solomon Islands",
	SOM: "Somalia",
	ZAF: "South Africa",
	SSD: "South Sudan",
	ESP: "Spain",
	LKA: "Sri Lanka",
	SDN: "Sudan",
	SUR: "Suriname",
	SWE: "Sweden",
	CHE: "Switzerland",
	SYR: "Syria",
	TWN: "Taiwan",
	TJK: "Tajikistan",
	TZA: "Tanzania",
	THA: "Thailand",
	TLS: "Timor-Leste",
	TGO: "Togo",
	TON: "Tonga",
	TTO: "Trinidad and Tobago",
	TUN: "Tunisia",
	TUR: "Turkey",
	TKM: "Turkmenistan",
	TUV: "Tuvalu",
	UGA: "Uganda",
	UKR: "Ukraine",
	ARE: "United Arab Emirates",
	GBR: "United Kingdom",
	GBD: "United Kingdom (British Dependent Territories)",
	GBN: "United Kingdom (British National Overseas)",
	GBO: "United Kingdom (British Overseas Citizen)",
	GBP: "United Kingdom (British Protected Person)",
	GBS: "United Kingdom (British Subject)",
	USA: "United States",
	URY: "Uruguay",
	UZB: "Uzbekistan",
	VUT: "Vanuatu",
	VAT: "Vatican City",
	VEN: "Venezuela",
	VNM: "Viet Nam",
	YEM: "Yemen",
	ZMB: "Zambia",
	ZWE: "Zimbabwe",
	UTO: "Utopia (Specimen)",
	XOM: "Sovereign Military Order of Malta",
	XXA: "Stateless Person",
	XXB: "Refugee (1951 Convention)",
	XXC: "Refugee (Other)",
	XXX: "Unspecified Nationality",
	UNO: "United Nations Organization",
	UNA: "United Nations Specialized Agency",
	UNK: "Kosovo (UNMIK)"
};
function se(e) {
	if (!e) return null;
	let t = e.trim().replace(/<+$/g, "").toUpperCase();
	return t ? oe[t] ? oe[t] : t === "D" ? "Germany" : oe[e.trim().toUpperCase()] ?? null : null;
}
// src/scanner/imagePreprocessor.ts
function ce(e) {
	return new Promise((t, n) => {
		if (e instanceof HTMLImageElement) {
			e.complete && e.naturalWidth > 0 ? t(e) : (e.onload = () => t(e), e.onerror = () => n(/* @__PURE__ */ Error("Failed to load HTMLImageElement")));
			return;
		}
		if (e instanceof HTMLCanvasElement) {
			let r = new Image();
			r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error("Failed to convert canvas to image")), r.src = e.toDataURL("image/png");
			return;
		}
		let r = new Image();
		r.crossOrigin = "anonymous";
		let i = null;
		r.onload = () => {
			i && URL.revokeObjectURL(i), t(r);
		}, r.onerror = () => {
			i && URL.revokeObjectURL(i), n(/* @__PURE__ */ Error("Unable to decode image file for OCR preprocessing"));
		}, typeof e == "string" ? r.src = e : (i = URL.createObjectURL(e), r.src = i);
	});
}
function le(e, t = 400) {
	let n = Math.max(1, e instanceof HTMLImageElement && e.naturalWidth || e.width), r = Math.max(1, e instanceof HTMLImageElement && e.naturalHeight || e.height), i = Math.min(1, t / Math.max(n, r)), a = Math.max(1, Math.round(n * i)), o = Math.max(1, Math.round(r * i)), s = document.createElement("canvas");
	s.width = a, s.height = o;
	let c = s.getContext("2d", { willReadFrequently: !0 });
	if (!c) throw Error("2D canvas context unavailable");
	c.fillStyle = "#ffffff", c.fillRect(0, 0, a, o), c.imageSmoothingEnabled = !0, c.imageSmoothingQuality = "medium", c.drawImage(e, 0, 0, a, o);
	let l = c.getImageData(0, 0, a, o).data, u = new Uint8ClampedArray(a * o);
	for (let e = 0, t = 0; e < l.length; e += 4, t++) u[t] = Math.round(.299 * l[e] + .587 * l[e + 1] + .114 * l[e + 2]);
	return {
		data: u,
		width: a,
		height: o
	};
}
function ue(e, t, n) {
	let r = e.getImageData(0, 0, t, n), i = r.data, a = /* @__PURE__ */ new Uint32Array(256), o = Math.floor(t * .02), s = Math.floor(n * .02), c = 0;
	for (let e = 0; e < n; e++) for (let r = 0; r < t; r++) {
		let l = (e * t + r) * 4, u = Math.round(.299 * i[l] + .587 * i[l + 1] + .114 * i[l + 2]);
		i[l] = u, i[l + 1] = u, i[l + 2] = u, r >= o && r < t - o && e >= s && e < n - s && (a[u]++, c++);
	}
	let l = 0, u = 255, d = 0, f = c * .006, p = c * .96;
	for (let e = 0; e < 256; e++) if (d += a[e], d >= f) {
		l = e;
		break;
	}
	d = 0;
	for (let e = 255; e >= 0; e--) if (d += a[e], c - d <= p) {
		u = e;
		break;
	}
	l = Math.min(36, Math.max(12, l)), u = Math.min(246, Math.max(225, u));
	let m = Math.max(1, u - l);
	for (let e = 0; e < i.length; e += 4) {
		let t = Math.max(0, Math.min(255, (i[e] - l) * 255 / m));
		i[e] = t, i[e + 1] = t, i[e + 2] = t;
	}
	e.putImageData(r, 0, 0);
}
function de(e, t, n, r, i) {
	let a = e.getImageData(0, 0, t, n), o = a.data, s = t * n, c = new Uint8ClampedArray(s);
	for (let e = 0, t = 0; e < o.length; e += 4, t++) c[t] = Math.round(.299 * o[e] + .587 * o[e + 1] + .114 * o[e + 2]);
	if (!i) return {
		data: c,
		width: t,
		height: n
	};
	let l = Math.max(r, Math.floor(t * .03)), u = Math.min(t - r, Math.ceil(t * .97)), d = r, f = n - r, p = new Uint8ClampedArray(s);
	p.fill(255);
	let m = [];
	for (let e = d; e < f; e++) {
		let n = e * t, i = [];
		for (let e = l; e < u; e += 2) i.push(c[n + e]);
		if (i.length === 0) continue;
		i.sort((e, t) => e - t);
		let a = i[Math.floor(i.length * .88)] || 255;
		if (a - (i[Math.floor(i.length * .02)] ?? 0) < 18) continue;
		let o = Math.max(40, a);
		for (let e = r; e < t - r; e++) {
			let t = Math.max(0, Math.min(255, Math.round(c[n + e] / o * 255)));
			p[n + e] = t, e & 3 || m.push(t);
		}
	}
	m.sort((e, t) => e - t);
	let h = m[Math.floor(m.length * .015)] ?? 20, g = m[Math.floor(m.length * .88)] ?? 245, _ = Math.min(125, Math.max(15, h + 15)), v = Math.min(248, Math.max(215, g)), y = Math.max(1, v - _);
	for (let e = 0, t = 0; e < o.length; e += 4, t++) {
		let n = p[t], r;
		r = n <= _ ? 0 : n >= v ? 255 : Math.round((n - _) / y * 255), c[t] = r, o[e] = r, o[e + 1] = r, o[e + 2] = r;
	}
	return e.putImageData(a, 0, 0), {
		data: c,
		width: t,
		height: n
	};
}
function J(e) {
	let t = e.width, n = e.height, r = e.getContext("2d", { willReadFrequently: !0 });
	if (!r) return e;
	let i = r.getImageData(0, 0, t, n).data, a = (e) => i[e] < 248 || i[e + 1] < 248 || i[e + 2] < 248, o = (e) => {
		let n = 0, r = Math.max(3, Math.floor(t * .01)), i = Math.max(1, Math.floor(t / 160)), o = e * t;
		for (let e = 0; e < t; e += i) if (a((o + e) * 4) && (n++, n >= r)) return !0;
		return !1;
	}, s = (e, n, r) => {
		let i = 0, o = Math.max(3, Math.floor((r - n) * .01)), s = Math.max(1, Math.floor((r - n) / 160));
		for (let c = n; c <= r; c += s) if (a((c * t + e) * 4) && (i++, i >= o)) return !0;
		return !1;
	}, c = 0;
	for (; c < n - 10 && !o(c);) c++;
	let l = n - 1;
	for (; l > c + 10 && !o(l);) l--;
	let u = 0;
	for (; u < t - 10 && !s(u, c, l);) u++;
	let d = t - 1;
	for (; d > u + 10 && !s(d, c, l);) d--;
	c = Math.max(0, c - 8), u = Math.max(0, u - 8), l = Math.min(n - 1, l + 8), d = Math.min(t - 1, d + 8);
	let f = d - u + 1, p = l - c + 1;
	if (f < t * .35 || p < n * .35 || f >= t - 16 && p >= n - 16) return e;
	let m = document.createElement("canvas");
	m.width = f, m.height = p;
	let h = m.getContext("2d", { willReadFrequently: !0 });
	return h ? (h.drawImage(e, u, c, f, p, 0, 0, f, p), m) : e;
}
function fe(e, t, n, r, i, a) {
	let o = Math.round(t * .018), s = Math.max(1, t - o * 2), c = Math.round(n * r), l = Math.max(1, Math.round(n * i) - c), u = s < 1500 ? 1800 / s : 1.15, d = Math.round(s * u), f = Math.round(l * u), p = d + 64, m = f + 64, h = document.createElement("canvas");
	h.width = p, h.height = m;
	let g = h.getContext("2d", { willReadFrequently: !0 });
	if (!g) throw Error("2D canvas context unavailable");
	g.fillStyle = "#ffffff", g.fillRect(0, 0, p, m), g.imageSmoothingEnabled = !0, g.imageSmoothingQuality = "high", g.drawImage(e, o, c, s, l, 32, 32, d, f);
	let _ = de(g, p, m, 32, a);
	return {
		dataUrl: h.toDataURL("image/png"),
		grayscale: _
	};
}
async function pe(e, t = {}) {
	let { preprocess: n = !0, rotation: r = 0, deskewDegrees: i = 0 } = t, a = e instanceof HTMLCanvasElement ? e : await ce(e), o = a instanceof HTMLImageElement && a.naturalWidth || a.width, s = a instanceof HTMLImageElement && a.naturalHeight || a.height, c = r + i, l = Math.abs(i) >= .1, u, d;
	if (l) {
		let e = c * Math.PI / 180, t = Math.abs(Math.cos(e)), n = Math.abs(Math.sin(e));
		u = Math.max(1, Math.round(o * t + s * n)), d = Math.max(1, Math.round(o * n + s * t));
	} else {
		let e = r === 90 || r === 270;
		u = e ? s : o, d = e ? o : s;
	}
	let f = 1;
	u < 1600 ? f = Math.min(3, 1800 / Math.max(1, u)) : u > 2200 && (f = 2200 / u);
	let p = document.createElement("canvas");
	p.width = Math.round(u * f), p.height = Math.round(d * f);
	let m = p.getContext("2d", { willReadFrequently: !0 });
	if (!m) throw Error("2D canvas context unavailable");
	m.fillStyle = "#ffffff", m.fillRect(0, 0, p.width, p.height), m.imageSmoothingEnabled = !0, m.imageSmoothingQuality = "high", m.save(), m.translate(p.width / 2, p.height / 2), m.rotate(c * Math.PI / 180);
	let h = Math.round(o * f), g = Math.round(s * f);
	m.drawImage(a, -h / 2, -g / 2, h, g), m.restore(), l && (p = J(p));
	let _ = p.width, v = p.height, y = p.toDataURL("image/png"), b = document.createElement("canvas");
	b.width = _, b.height = v;
	let x = b.getContext("2d", { willReadFrequently: !0 });
	if (!x) throw Error("2D canvas context unavailable");
	x.drawImage(p, 0, 0), n && ue(x, _, v);
	let S = b.toDataURL("image/png"), C = fe(p, _, v, .6, .982, n), w = fe(p, _, v, .7, .982, n);
	return {
		originalDataUrl: y,
		enhancedDataUrl: S,
		mrzCropDataUrl: C.dataUrl,
		mrzGrayscale: C.grayscale,
		mrzTightCropDataUrl: w.dataUrl,
		mrzTightGrayscale: w.grayscale,
		width: _,
		height: v
	};
}
// src/scanner/mrzParser.ts
var me = [
	7,
	3,
	1
], he = {
	"<": 0,
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	A: 10,
	B: 11,
	C: 12,
	D: 13,
	E: 14,
	F: 15,
	G: 16,
	H: 17,
	I: 18,
	J: 19,
	K: 20,
	L: 21,
	M: 22,
	N: 23,
	O: 24,
	P: 25,
	Q: 26,
	R: 27,
	S: 28,
	T: 29,
	U: 30,
	V: 31,
	W: 32,
	X: 33,
	Y: 34,
	Z: 35
}, ge = {
	O: ["0"],
	D: ["0"],
	Q: ["0"],
	I: ["1", "9"],
	L: ["1"],
	T: ["1"],
	Z: ["2"],
	S: ["5"],
	G: ["6"],
	B: ["8"]
};
function _e(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = he[e[n]] ?? 0;
		t += r * me[n % 3];
	}
	return String(t % 10);
}
function ve(e) {
	let t = e.toUpperCase();
	return /[A-Z0-9<]/.test(t) ? t : "<";
}
function Y(e) {
	return e.replace(/O/g, "0").replace(/Q/g, "0").replace(/D/g, "0").replace(/I/g, "1").replace(/L/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/G/g, "6").replace(/B/g, "8");
}
function X(e) {
	return e.replace(/0/g, "O").replace(/1/g, "I").replace(/2/g, "Z").replace(/5/g, "S").replace(/6/g, "G").replace(/8/g, "B");
}
function ye(e, t) {
	let n = Y(t);
	if (!/^\d$/.test(n) || _e(e) === n) return e;
	let r = e.replace(/[ODQ]/g, "0");
	if (_e(r) === n) return r;
	let i = (e) => e.replace(/[ODQ]/g, "0").replace(/[IL]/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/G/g, "6").replace(/B/g, "8"), a = e.match(/^([A-Z]{1,3})(.*)$/);
	if (a) {
		let e = a[1] + i(a[2]);
		if (_e(e) === n) return e;
	}
	let o = i(e);
	if (_e(o) === n) return o;
	let s = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let n = ge[e[t]];
		n && s.push({
			idx: t,
			reps: n
		});
	}
	for (let t of s) for (let r of t.reps) {
		let i = e.slice(0, t.idx) + r + e.slice(t.idx + 1);
		if (_e(i) === n) return i;
	}
	for (let t = 0; t < s.length; t++) for (let r = t + 1; r < s.length; r++) {
		let i = s[t], a = s[r];
		for (let t of i.reps) for (let r of a.reps) {
			let o = e.split("");
			o[i.idx] = t, o[a.idx] = r;
			let s = o.join("");
			if (_e(s) === n) return s;
		}
	}
	return e;
}
function be(e, t) {
	let n = Y(e);
	if (!/^\d{6}$/.test(n)) return null;
	let r = parseInt(n.slice(0, 2), 10), i = parseInt(n.slice(2, 4), 10), a = parseInt(n.slice(4, 6), 10);
	if (i < 1 || i > 12 || a < 1 || a > 31) return null;
	let o = (/* @__PURE__ */ new Date()).getFullYear(), s = o % 100, c = Math.floor(o / 100) * 100, l;
	return l = t === "birth" ? r > s ? c - 100 + r : c + r : r <= s + 50 ? c + r : c - 100 + r, `${l}-${String(i).padStart(2, "0")}-${String(a).padStart(2, "0")}`;
}
function xe(e) {
	let t = e.replace(/<+$/g, ""), n = "";
	for (; t !== n;) n = t, t = t.replace(/(?:<+[KL]{2,}|<<[KL])$/g, "").replace(/<+$/g, "");
	return t;
}
function Se(e) {
	let t = xe(e).split("<<"), n = t[0] ?? "", r = t.slice(1).join("<"), i = (e) => X(e).split(/<+/).map((e) => e.trim()).filter(Boolean), a = i(n), o = i(r);
	return {
		surname: a.join(" "),
		surnames: a,
		givenNames: o.join(" "),
		givenNamesList: o
	};
}
function Ce(e) {
	let t = e.toUpperCase();
	return t === "M" ? "M" : t === "F" ? "F" : t === "X" ? "X" : "Unspecified";
}
function we(e) {
	let t = e.trim();
	return !!(!t || /[a-z]{3,}/.test(t) && !t.includes("<") || /[/()]/.test(t) && !t.includes("<"));
}
function Te(e) {
	return e.replace(/\s+/g, "").split("").map(ve).join("");
}
function Ee(e) {
	if (e.length < 26 || !/^[A-Z0-9<]+$/.test(e) || e.startsWith("<")) return !1;
	let t = (e.match(/</g) || []).length, n = (e.match(/\d/g) || []).length;
	return t >= 2 || n >= 4 && e.length >= 28;
}
function De(e, t) {
	return e.length === t ? e : e.length > t ? e.slice(0, t) : e.padEnd(t, "<");
}
function Z(e, t, n, r) {
	let i = Y(r), a = _e(n);
	return {
		label: e,
		field: t,
		expected: a,
		actual: i,
		valid: i === a
	};
}
function Oe(e, t) {
	return t === "D" && e.startsWith("D") && e.length === 2 ? "D" : e;
}
function ke(e, t, n = !1) {
	let r = De(e, 44), i = De(t, 44), a = X(r.slice(0, 2)).replace(/</g, ""), o = X(r.slice(2, 5)).replace(/</g, ""), { surname: s, surnames: c, givenNames: l, givenNamesList: u } = Se(r.slice(5, 44)), d = i.slice(9, 10), f = ye(i.slice(0, 9), d), p = X(i.slice(10, 13)).replace(/</g, "");
	o = Oe(o, p), !o && p && (o = p);
	let m = Y(i.slice(13, 19)), h = i.slice(19, 20), g = Ce(i.slice(20, 21)), _ = Y(i.slice(21, 27)), v = i.slice(27, 28), y = n ? i.slice(28, 44) : i.slice(28, 42), b = n ? "" : i.slice(42, 43), x = n ? "" : i.slice(43, 44), S = [
		Z("Document Number", "documentNumber", f, d),
		Z("Date of Birth", "dateOfBirth", m, h),
		Z("Date of Expiry", "dateOfExpiry", _, v)
	];
	if (!n) {
		y.replace(/</g, "").length > 0 && S.push(Z("Personal Number", "optionalData1", y, b));
		let e = f + d + m + h + _ + v + y + b;
		S.push(Z("Composite Check", "composite", e, x));
	}
	let C = S.filter((e) => e.valid).length, w = n ? "MRVA" : "TD3", T = f + d + i.slice(10, 13) + m + h + i.slice(20, 21) + _ + v + i.slice(28, 44);
	return {
		format: w,
		documentCode: a || "P",
		rawLines: [r, T],
		issuingCountry: o,
		surname: s,
		surnames: c,
		givenNames: l,
		givenNamesList: u,
		documentNumber: f.replace(/</g, ""),
		nationality: p,
		dateOfBirth: be(m, "birth"),
		rawDateOfBirth: m,
		sex: g,
		dateOfExpiry: be(_, "expiry"),
		rawDateOfExpiry: _,
		optionalData1: y.replace(/</g, ""),
		optionalData2: "",
		checkDigits: S,
		allCheckDigitsValid: C === S.length,
		validCount: C,
		totalChecks: S.length
	};
}
function Ae(e, t, n) {
	let r = De(e, 30), i = De(t, 30), a = De(n, 30), o = X(r.slice(0, 2)).replace(/</g, ""), s = X(r.slice(2, 5)).replace(/</g, ""), c = r.slice(14, 15), l = ye(r.slice(5, 14), c), u = r.slice(15, 30), d = Y(i.slice(0, 6)), f = i.slice(6, 7), p = Ce(i.slice(7, 8)), m = Y(i.slice(8, 14)), h = i.slice(14, 15), g = X(i.slice(15, 18)).replace(/</g, "");
	s = Oe(s, g), !s && g && (s = g);
	let _ = i.slice(18, 29), v = i.slice(29, 30), { surname: y, surnames: b, givenNames: x, givenNamesList: S } = Se(a), C = r.slice(0, 5) + l + c + u, w = d + f + i.slice(7, 8) + m + h + i.slice(15, 30), T = l + c + u + d + f + m + h + _, E = [
		Z("Document Number", "documentNumber", l, c),
		Z("Date of Birth", "dateOfBirth", d, f),
		Z("Date of Expiry", "dateOfExpiry", m, h),
		Z("Composite Check", "composite", T, v)
	], D = E.filter((e) => e.valid).length;
	return {
		format: "TD1",
		documentCode: o,
		rawLines: [
			C,
			w,
			a
		],
		issuingCountry: s,
		surname: y,
		surnames: b,
		givenNames: x,
		givenNamesList: S,
		documentNumber: l.replace(/</g, ""),
		nationality: g,
		dateOfBirth: be(d, "birth"),
		rawDateOfBirth: d,
		sex: p,
		dateOfExpiry: be(m, "expiry"),
		rawDateOfExpiry: m,
		optionalData1: u.replace(/</g, ""),
		optionalData2: _.replace(/</g, ""),
		checkDigits: E,
		allCheckDigitsValid: D === E.length,
		validCount: D,
		totalChecks: E.length
	};
}
function je(e, t, n = !1) {
	let r = De(e, 36), i = De(t, 36), a = X(r.slice(0, 2)).replace(/</g, ""), o = X(r.slice(2, 5)).replace(/</g, ""), { surname: s, surnames: c, givenNames: l, givenNamesList: u } = Se(r.slice(5, 36)), d = i.slice(9, 10), f = ye(i.slice(0, 9), d), p = X(i.slice(10, 13)).replace(/</g, "");
	o = Oe(o, p), !o && p && (o = p);
	let m = Y(i.slice(13, 19)), h = i.slice(19, 20), g = Ce(i.slice(20, 21)), _ = Y(i.slice(21, 27)), v = i.slice(27, 28), y = n ? i.slice(28, 36) : i.slice(28, 35), b = n ? "" : i.slice(35, 36), x = [
		Z("Document Number", "documentNumber", f, d),
		Z("Date of Birth", "dateOfBirth", m, h),
		Z("Date of Expiry", "dateOfExpiry", _, v)
	];
	if (!n) {
		let e = f + d + m + h + _ + v + y;
		x.push(Z("Composite Check", "composite", e, b));
	}
	let S = x.filter((e) => e.valid).length;
	return {
		format: n ? "MRVB" : "TD2",
		documentCode: a,
		rawLines: [r, i],
		issuingCountry: o,
		surname: s,
		surnames: c,
		givenNames: l,
		givenNamesList: u,
		documentNumber: f.replace(/</g, ""),
		nationality: p,
		dateOfBirth: be(m, "birth"),
		rawDateOfBirth: m,
		sex: g,
		dateOfExpiry: be(_, "expiry"),
		rawDateOfExpiry: _,
		optionalData1: y.replace(/</g, ""),
		optionalData2: "",
		checkDigits: x,
		allCheckDigitsValid: S === x.length,
		validCount: S,
		totalChecks: x.length
	};
}
function Me(e) {
	let t = e.split(/\r?\n/).filter((e) => !we(e)).map(Te).filter(Ee);
	if (t.length < 2) return null;
	let n = [];
	for (let e = 0; e <= t.length - 3; e++) {
		let r = t[e], i = t[e + 1], a = t[e + 2], o = (r.length + i.length + a.length) / 3;
		o >= 27 && o <= 35 && /^[IAC]/.test(r) && n.push(Ae(r, i, a));
	}
	for (let e = 0; e <= t.length - 2; e++) {
		let r = t[e], i = t[e + 1], a = Math.max(r.length, i.length), o = Math.min(r.length, i.length);
		if (a >= 40 && o >= 38 && /^[PV]/.test(r)) {
			let e = r.startsWith("V");
			n.push(ke(r, i, e));
		} else if (o >= 33 && a <= 39 && /^[PVIAC]/.test(r) && !/^[IAC]/.test(r)) {
			let e = r.startsWith("V");
			n.push(je(r, i, e));
		}
	}
	if (n.length === 0) {
		if (t.length >= 3 && t[t.length - 3].length <= 36 && /^[IAC]/.test(t[t.length - 3])) n.push(Ae(t[t.length - 3], t[t.length - 2], t[t.length - 1]));
		else {
			let e = t[t.length - 2], r = t[t.length - 1];
			/^[PVIAC]/.test(e) && (Math.max(e.length, r.length) >= 39 ? n.push(ke(e, r, e.startsWith("V"))) : n.push(je(e, r, e.startsWith("V"))));
		}
	}
	return n.length === 0 ? null : (n.sort((e, t) => {
		let n = e.validCount * 10 + (e.dateOfBirth ? 3 : 0) + (e.dateOfExpiry ? 3 : 0) + (e.surname ? 2 : 0) + (e.givenNames ? 2 : 0);
		return t.validCount * 10 + (t.dateOfBirth ? 3 : 0) + (t.dateOfExpiry ? 3 : 0) + (t.surname ? 2 : 0) + (t.givenNames ? 2 : 0) - n;
	}), n[0]);
}
// src/scanner/orientation.ts
function Ne(e, t, n) {
	let r = t + 1, i = new Float64Array(r * (n + 1));
	for (let a = 1; a <= n; a++) {
		let n = 0, o = (a - 1) * t, s = a * r, c = (a - 1) * r;
		for (let r = 1; r <= t; r++) n += e[o + r - 1], i[s + r] = i[c + r] + n;
	}
	return i;
}
function Pe(e, t, n) {
	let r = Ne(e, t, n), i = t + 1, a = Math.max(3, Math.round(Math.min(t, n) / 70)), o = Math.max(2, Math.floor(t * .025)), s = Math.max(2, Math.floor(n * .025)), c = t / 2, l = n / 2, u = [];
	for (let d = s; d < n - s; d++) {
		let s = Math.max(0, d - a), f = Math.min(n, d + a + 1), p = s * i, m = f * i, h = d * t;
		for (let n = o; n < t - o; n++) {
			let i = e[h + n];
			if (i > 218) continue;
			let o = Math.max(0, n - a), g = Math.min(t, n + a + 1), _ = (g - o) * (f - s), v = (r[m + g] - r[p + g] - r[m + o] + r[p + o]) / _ - i;
			v >= 14 && u.push({
				dx: n - c,
				dy: d - l,
				weight: Math.min(4, v / 16)
			});
		}
	}
	if (u.length < 120) for (let d = s; d < n - s; d += 2) {
		let s = Math.max(0, d - a), f = Math.min(n, d + a + 1), p = s * i, m = f * i, h = d * t;
		for (let n = o; n < t - o; n += 2) {
			let i = e[h + n];
			if (i > 230) continue;
			let o = Math.max(0, n - a), g = Math.min(t, n + a + 1), _ = (g - o) * (f - s), v = (r[m + g] - r[p + g] - r[m + o] + r[p + o]) / _ - i;
			v >= 7 && u.push({
				dx: n - c,
				dy: d - l,
				weight: Math.min(3, v / 12)
			});
		}
	}
	let d = 4500;
	if (u.length <= d) return u;
	let f = [], p = u.length / d;
	for (let e = 0; e < d; e++) f.push(u[Math.floor(e * p)]);
	return f;
}
function Fe(e, t, n, r) {
	let i = t * Math.PI / 180, a = Math.cos(i), o = Math.sin(i), s = Math.ceil(r * 2 / n) + 4, c = Math.floor(s / 2), l = new Float32Array(s), u = new Float32Array(s);
	for (let t = 0; t < e.length; t++) {
		let r = e[t], i = r.dx * a + r.dy * o, d = -r.dx * o + r.dy * a, f = Math.round(d / n) + c;
		f >= 0 && f < s && (l[f] += r.weight);
		let p = Math.round(i / n) + c;
		p >= 0 && p < s && (u[p] += r.weight);
	}
	let d = 0, f = 0;
	for (let e = 0; e < s; e++) {
		let t = l[e], n = u[e];
		d += t * t, f += n * n;
	}
	return {
		hScore: d,
		vScore: f
	};
}
function Ie(e, t, n, r) {
	let i = t * Math.PI / 180, a = Math.cos(i), o = Math.sin(i), s = Math.abs(n * a) + Math.abs(r * o), c = Math.abs(n * o) + Math.abs(r * a), l = s / 2, u = c / 2, d = Array.from({ length: 40 }, () => /* @__PURE__ */ new Uint8Array(48)), f = Array.from({ length: 40 }, () => /* @__PURE__ */ new Uint8Array(48)), p = /* @__PURE__ */ new Float32Array(40), m = /* @__PURE__ */ new Float32Array(40);
	for (let t = 0; t < e.length; t++) {
		let n = e[t], r = n.dx * a - n.dy * o + l, i = n.dx * o + n.dy * a + u, h = r / Math.max(1, s), g = i / Math.max(1, c);
		if (h < 0 || h >= 1 || g < 0 || g >= 1) continue;
		let _ = Math.min(39, Math.floor(g * 40)), v = Math.min(47, Math.floor(h * 48));
		d[_][v] = 1, p[_] += n.weight;
		let y = Math.min(39, Math.floor(h * 40)), b = Math.min(47, Math.floor(g * 48));
		f[y][b] = 1, m[y] += n.weight;
	}
	let h = (e, t, n, r) => {
		let i = 0, a = 0;
		for (let o = n; o <= r; o++) {
			let n = 0;
			for (let t = 0; t < 48; t++) n += e[o][t];
			let r = n / 48;
			if (r >= .42) {
				a++;
				let e = r * t[o];
				e > i && (i = e);
			}
		}
		return i * (1 + Math.min(a, 6) * .22);
	}, g = h(d, p, 1, 13), _ = h(d, p, 26, 39), v = h(f, m, 1, 13), y = h(f, m, 26, 39), b = Math.max(g, _, v, y), x = "none";
	return b > 0 && (_ === b ? x = "bottom" : g === b ? x = "top" : y === b ? x = "right" : v === b && (x = "left")), {
		bottom: _,
		top: g,
		right: y,
		left: v,
		hint: x
	};
}
function Le(e, t, n) {
	if (t < 24 || n < 24 || e.length < t * n) return {
		deskewDegrees: 0,
		rankedCoarseRotations: [
			0,
			180,
			90,
			270
		],
		axisConfidence: 1,
		mrzEdgeHint: "none"
	};
	let r = Pe(e, t, n);
	if (r.length < 40) return {
		deskewDegrees: 0,
		rankedCoarseRotations: [
			0,
			180,
			90,
			270
		],
		axisConfidence: 1,
		mrzEdgeHint: "none"
	};
	let i = Math.hypot(t / 2, n / 2), a = Math.max(2, Math.round(Math.min(t, n) / 130)), o = 0, s = -1, c = 0, l = -1;
	for (let e = -45; e <= 44; e += 1.5) {
		let { hScore: t, vScore: n } = Fe(r, e, a, i);
		t > s && (s = t, o = e), n > l && (l = n, c = e);
	}
	let u = s >= l ? o : c, d = o, f = s, p = c, m = l;
	for (let e = -1.8; e <= 1.801; e += .2) {
		let t = u + e;
		if (t < -45 || t > 45) continue;
		let { hScore: n, vScore: o } = Fe(r, t, a, i);
		n > f && (f = n, d = t), o > m && (m = o, p = t);
	}
	let h = Math.round(-(f >= m ? d : p) * 10) / 10;
	Math.abs(h) < .7 && (h = 0);
	let g = Math.max(f, m) / Math.max(1, Math.min(f, m)), _ = Ie(r, h, t, n), v = _.top > _.bottom * 1.15 ? [180, 0] : [0, 180], y = _.left > _.right * 1.08 ? [270, 90] : [90, 270], b = f >= m ? [
		v[0],
		v[1],
		y[0],
		y[1]
	] : [
		y[0],
		y[1],
		v[0],
		v[1]
	];
	return {
		deskewDegrees: h,
		rankedCoarseRotations: b,
		axisConfidence: g,
		mrzEdgeHint: _.hint
	};
}
// src/scanner/pairMerger.ts
function Re(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date(), i = r.getFullYear() - n.getFullYear(), a = r.getMonth() - n.getMonth();
	return (a < 0 || a === 0 && r.getDate() < n.getDate()) && i--, i >= 0 && i <= 130 ? i : null;
}
function ze(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date();
	return r.setHours(0, 0, 0, 0), n < r;
}
function Be(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function Ve(e) {
	return (e ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function He(e) {
	return /[^\u0000-\u007F]/.test(e);
}
function Ue(e) {
	return e ? (e.allCheckDigitsValid ? 100 : 0) + e.validCount * 18 + (e.surname ? 10 : 0) + (e.documentNumber ? 10 : 0) : -1;
}
function Q(e, t, n, r, i, a, o, s) {
	let c = e?.trim() || null, l = t?.trim() || null;
	if (c && l) {
		if (a[i] = o?.includes("MRZ") || s?.includes("MRZ") ? "MRZ+VIZ" : "VIZ", Be(c) === Be(l)) {
			if (He(c) && !He(l)) return c;
			if (He(l) && !He(c)) return l;
		}
		return o === "MRZ" && s !== "MRZ" ? c : s === "MRZ" && o !== "MRZ" ? l : c.length !== l.length && Math.abs(c.length - l.length) >= 3 ? c.length > l.length ? c : l : n >= r ? c : l;
	}
	return c ? (a[i] = o ?? "VIZ", c) : l ? (a[i] = s ?? "VIZ", l) : null;
}
function We(e, t, n, r, i) {
	let a = e?.trim() || null, o = t?.trim() || null, s = n?.trim() || null, c = o && s ? o.length >= s.length ? o : s : o || s;
	if (a && c) {
		i[r] = "MRZ+VIZ";
		let e = Be(a), t = Be(c);
		return t === e && He(c) || t.length > e.length && e.length >= 8 && t.startsWith(e.slice(0, Math.min(8, e.length))) ? c : a;
	}
	return a ? (i[r] = "MRZ", a) : c ? (i[r] = "VIZ", c) : null;
}
function Ge(e, t) {
	return e.documentType === "unknown" ? t.documentType === "unknown" ? "unknown" : t.documentType : e.documentType;
}
function Ke(e, t) {
	if (!e && !t) return;
	if (e && !t) return e;
	if (!e && t) return t;
	let n = e, r = t, i = Array.from(/* @__PURE__ */ new Set([...n.issues, ...r.issues])), a = n.passed && r.passed;
	return {
		passed: a,
		overallScore: Math.min(n.overallScore, r.overallScore),
		sharpnessScore: Math.min(n.sharpnessScore, r.sharpnessScore),
		isSharp: n.isSharp && r.isSharp,
		glareRatio: Math.max(n.glareRatio, r.glareRatio),
		hasGlare: n.hasGlare || r.hasGlare,
		meanBrightness: Math.round((n.meanBrightness + r.meanBrightness) / 2),
		exposureStatus: n.exposureStatus === "ok" ? r.exposureStatus : n.exposureStatus,
		documentDetected: n.documentDetected && r.documentDetected,
		detectedCorners: r.detectedCorners ?? n.detectedCorners,
		stabilityScore: Math.min(n.stabilityScore, r.stabilityScore),
		isStable: n.isStable && r.isStable,
		motionDelta: Math.max(n.motionDelta, r.motionDelta),
		issues: i,
		guidance: a ? n.guidance : n.passed ? r.guidance : n.guidance
	};
}
function qe(e, t) {
	let n = e.mrz !== null, r = t.mrz !== null, i = "front+back";
	n && r ? i = "both_mrz" : n && !r ? i = "swapped_detected" : !n && !r && (i = "visual_only");
	let a = Ue(t.mrz) >= Ue(e.mrz) ? t.mrz : e.mrz, o = Ue(t.mrz) >= Ue(e.mrz) ? t.rawMrzText || e.rawMrzText : e.rawMrzText || t.rawMrzText, s = n ? null : e, c = r ? null : t, l = {}, u = [], d = Ve(e.documentNumber), f = Ve(t.documentNumber);
	if (d && f && d !== f && !d.includes(f) && !f.includes(d) && u.push({
		field: "documentNumber",
		frontValue: e.documentNumber,
		backValue: t.documentNumber,
		resolution: t.mrz?.allCheckDigitsValid ? `Used back MRZ value (${t.documentNumber})` : e.mrz?.allCheckDigitsValid ? `Used front MRZ value (${e.documentNumber})` : "Used higher-confidence side"
	}), e.dateOfBirth && t.dateOfBirth && e.dateOfBirth !== t.dateOfBirth && u.push({
		field: "dateOfBirth",
		frontValue: e.dateOfBirth,
		backValue: t.dateOfBirth,
		resolution: a?.dateOfBirth ? `Used MRZ date of birth (${a.dateOfBirth})` : "Used higher-confidence side"
	}), e.dateOfExpiry && t.dateOfExpiry && e.dateOfExpiry !== t.dateOfExpiry && u.push({
		field: "dateOfExpiry",
		frontValue: e.dateOfExpiry,
		backValue: t.dateOfExpiry,
		resolution: a?.dateOfExpiry ? `Used MRZ date of expiry (${a.dateOfExpiry})` : "Used higher-confidence side"
	}), e.sex !== "Unspecified" && t.sex !== "Unspecified" && e.sex !== t.sex && u.push({
		field: "sex",
		frontValue: e.sex,
		backValue: t.sex,
		resolution: a?.sex && a.sex !== "Unspecified" ? `Used MRZ sex (${a.sex})` : `Used front side (${e.sex})`
	}), e.surname && t.surname) {
		let n = Be(e.surname), r = Be(t.surname), i = new Set(n.split(" ").filter((e) => e.length >= 2)), o = r.split(" ").filter((e) => e.length >= 2).some((e) => i.has(e));
		n && r && !o && !n.includes(r) && !r.includes(n) && u.push({
			field: "surname",
			frontValue: e.surname,
			backValue: t.surname,
			resolution: a?.surname ? `Used MRZ surname (${a.surname})` : "Used higher-confidence side"
		});
	}
	let p = Q(e.issuingCountry, t.issuingCountry, e.confidence, t.confidence, "issuingCountry", l, e.fieldSources.issuingCountry, t.fieldSources.issuingCountry), m = Q(e.nationality, t.nationality, e.confidence, t.confidence, "nationality", l, e.fieldSources.nationality, t.fieldSources.nationality), h = We(a?.surname, s?.surname ?? (n ? null : e.surname), c?.surname ?? (r ? null : t.surname), "surname", l) ?? Q(e.surname, t.surname, e.confidence, t.confidence, "surname", l, e.fieldSources.surname, t.fieldSources.surname), g = We(a?.givenNames, s?.givenNames ?? (n ? null : e.givenNames), c?.givenNames ?? (r ? null : t.givenNames), "givenNames", l) ?? Q(e.givenNames, t.givenNames, e.confidence, t.confidence, "givenNames", l, e.fieldSources.givenNames, t.fieldSources.givenNames), _ = a?.surnames && a.surnames.length > 0 && h === a.surname ? a.surnames : h ? h.split(/\s+/).filter(Boolean) : [], v = a?.givenNamesList && a.givenNamesList.length > 0 && g === a.givenNames ? a.givenNamesList : g ? g.split(/\s+/).filter(Boolean) : [], y = g || h ? [g, h].filter(Boolean).join(" ") : Q(e.fullName, t.fullName, e.confidence, t.confidence, "fullName", l, e.fieldSources.fullName, t.fieldSources.fullName);
	y && !l.fullName && (l.fullName = l.givenNames === "MRZ+VIZ" || l.surname === "MRZ+VIZ" ? "MRZ+VIZ" : l.givenNames ?? l.surname ?? "VIZ");
	let b = a?.documentNumber ? (l.documentNumber = e.documentNumber && t.documentNumber ? "MRZ+VIZ" : "MRZ", a.documentNumber) : Q(e.documentNumber, t.documentNumber, e.confidence, t.confidence, "documentNumber", l, e.fieldSources.documentNumber, t.fieldSources.documentNumber), x = Q(e.personalNumber, t.personalNumber, e.confidence, t.confidence, "personalNumber", l, e.fieldSources.personalNumber, t.fieldSources.personalNumber), S = a?.dateOfBirth ? (l.dateOfBirth = s?.dateOfBirth || c?.dateOfBirth ? "MRZ+VIZ" : "MRZ", a.dateOfBirth) : Q(e.dateOfBirth, t.dateOfBirth, e.confidence, t.confidence, "dateOfBirth", l, e.fieldSources.dateOfBirth, t.fieldSources.dateOfBirth), C = a?.dateOfExpiry ? (l.dateOfExpiry = s?.dateOfExpiry || c?.dateOfExpiry ? "MRZ+VIZ" : "MRZ", a.dateOfExpiry) : Q(e.dateOfExpiry, t.dateOfExpiry, e.confidence, t.confidence, "dateOfExpiry", l, e.fieldSources.dateOfExpiry, t.fieldSources.dateOfExpiry), w = Q(e.dateOfIssue, t.dateOfIssue, e.confidence, t.confidence, "dateOfIssue", l, e.fieldSources.dateOfIssue, t.fieldSources.dateOfIssue), T = "Unspecified";
	a?.sex && a.sex !== "Unspecified" ? (T = a.sex, l.sex = s?.sex || c?.sex ? "MRZ+VIZ" : "MRZ") : e.sex !== "Unspecified" && t.sex !== "Unspecified" ? (T = e.confidence >= t.confidence ? e.sex : t.sex, l.sex = "VIZ") : e.sex === "Unspecified" ? t.sex !== "Unspecified" && (T = t.sex, l.sex = t.fieldSources.sex ?? "VIZ") : (T = e.sex, l.sex = e.fieldSources.sex ?? "VIZ");
	let E = Q(e.placeOfBirth, t.placeOfBirth, e.confidence, t.confidence, "placeOfBirth", l, e.fieldSources.placeOfBirth, t.fieldSources.placeOfBirth), D = Q(e.address, t.address, e.confidence, t.confidence, "address", l, e.fieldSources.address, t.fieldSources.address), O = Q(e.parents, t.parents, e.confidence, t.confidence, "parents", l, e.fieldSources.parents, t.fieldSources.parents), k = Q(e.issuingAuthority, t.issuingAuthority, e.confidence, t.confidence, "issuingAuthority", l, e.fieldSources.issuingAuthority, t.fieldSources.issuingAuthority), A = Q(e.licenseClass, t.licenseClass, e.confidence, t.confidence, "licenseClass", l, e.fieldSources.licenseClass, t.fieldSources.licenseClass), j = Q(e.restrictions, t.restrictions, e.confidence, t.confidence, "restrictions", l, e.fieldSources.restrictions, t.fieldSources.restrictions), M = Q(e.endorsements, t.endorsements, e.confidence, t.confidence, "endorsements", l, e.fieldSources.endorsements, t.fieldSources.endorsements), N = Q(e.height, t.height, e.confidence, t.confidence, "height", l, e.fieldSources.height, t.fieldSources.height), P = Q(e.eyeColor, t.eyeColor, e.confidence, t.confidence, "eyeColor", l, e.fieldSources.eyeColor, t.fieldSources.eyeColor), F = Q(e.hairColor, t.hairColor, e.confidence, t.confidence, "hairColor", l, e.fieldSources.hairColor, t.fieldSources.hairColor), I = Re(S);
	I !== null && (l.age = "COMPUTED");
	let L = ze(C);
	L !== null && (l.isExpired = "COMPUTED");
	let R = {
		...e.unmappedFields,
		...t.unmappedFields
	}, z = [e.rawOcrText ? `--- FRONT SIDE ---\n${e.rawOcrText}` : "", t.rawOcrText ? `--- BACK SIDE ---\n${t.rawOcrText}` : ""].filter(Boolean).join("\n\n"), B = Math.round((e.confidence + t.confidence) / 2), V = e.processingTimeMs + t.processingTimeMs;
	return {
		documentType: Ge(e, t),
		documentFormat: a ? a.format : "VISUAL_ONLY",
		issuingCountry: p,
		issuingCountryName: se(p),
		documentNumber: b,
		personalNumber: x,
		surname: h,
		surnames: _,
		givenNames: g,
		givenNamesList: v,
		fullName: y,
		nationality: m,
		nationalityName: se(m) ?? m,
		dateOfBirth: S,
		age: I,
		sex: T,
		dateOfIssue: w,
		dateOfExpiry: C,
		isExpired: L,
		placeOfBirth: E,
		address: D,
		parents: O,
		issuingAuthority: k,
		licenseClass: A,
		restrictions: j,
		endorsements: M,
		height: N,
		eyeColor: P,
		hairColor: F,
		mrz: a,
		mrzModel: a === t.mrz ? t.mrzModel ?? e.mrzModel : e.mrzModel ?? t.mrzModel,
		unmappedFields: R,
		fieldSources: l,
		rawOcrText: z,
		rawMrzText: o,
		confidence: B,
		processingTimeMs: V,
		sourceDimensions: r ? t.sourceDimensions : e.sourceDimensions,
		orientation: r ? t.orientation : e.orientation,
		perspective: r ? t.perspective : e.perspective,
		quality: Ke(e.quality, t.quality),
		previews: r ? t.previews ?? e.previews : e.previews ?? t.previews,
		sides: {
			front: e,
			back: t
		},
		sideAssignment: i,
		conflicts: u,
		sidesConsistent: u.length === 0
	};
}
// src/scanner/perspective.ts
function Je(e) {
	return Math.max(0, Math.min(1, e));
}
function Ye(e, t) {
	return Math.hypot(e.x - t.x, e.y - t.y);
}
function Xe(e, t, n) {
	return (t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x);
}
function Ze(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = e[(n + 1) % e.length];
		t += r.x * i.y - i.x * r.y;
	}
	return Math.abs(t) / 2;
}
function Qe(e) {
	if (e.length !== 4) throw Error("orderQuadCorners requires exactly 4 points");
	let t = [...e].sort((e, t) => e.x + e.y - (t.x + t.y)), n = [...e].sort((e, t) => e.x - e.y - (t.x - t.y)), r = t[0], i = t[3], a = n[0], o = n[3];
	if ((/* @__PURE__ */ new Set([
		r,
		o,
		i,
		a
	])).size === 4) return {
		topLeft: r,
		topRight: o,
		bottomRight: i,
		bottomLeft: a
	};
	let s = e.reduce((e, t) => e + t.x, 0) / 4, c = e.reduce((e, t) => e + t.y, 0) / 4, l = [...e].sort((e, t) => Math.atan2(e.y - c, e.x - s) - Math.atan2(t.y - c, t.x - s)), u = l.reduce((e, t, n, r) => t.x + t.y < r[e].x + r[e].y ? n : e, 0);
	return {
		topLeft: l[u],
		topRight: l[(u + 1) % 4],
		bottomRight: l[(u + 2) % 4],
		bottomLeft: l[(u + 3) % 4]
	};
}
function $e(e) {
	if (e.length <= 3) return e;
	let t = [...e].sort((e, t) => e.x === t.x ? e.y - t.y : e.x - t.x), n = [];
	for (let e of t) {
		for (; n.length >= 2 && Xe(n[n.length - 2], n[n.length - 1], e) <= 0;) n.pop();
		n.push(e);
	}
	let r = [];
	for (let e = t.length - 1; e >= 0; e--) {
		let n = t[e];
		for (; r.length >= 2 && Xe(r[r.length - 2], r[r.length - 1], n) <= 0;) r.pop();
		r.push(n);
	}
	return n.pop(), r.pop(), n.concat(r);
}
function et(e) {
	if (e.length <= 4) return e;
	let t = [...e];
	for (; t.length > 4;) {
		let e = Infinity, n = 0, r = t.length;
		for (let i = 0; i < r; i++) {
			let a = t[(i - 1 + r) % r], o = t[i], s = t[(i + 1) % r], c = Math.abs(Xe(a, o, s)) * .5;
			c < e && (e = c, n = i);
		}
		t.splice(n, 1);
	}
	return t;
}
function tt(e, t, n) {
	if (e.length < 6) {
		let e = n.x - t.x, r = n.y - t.y, i = Math.hypot(e, r) || 1, a = -r / i, o = e / i;
		return {
			nx: a,
			ny: o,
			c: -(a * t.x + o * t.y)
		};
	}
	let r = 0, i = 0;
	for (let t of e) r += t.x, i += t.y;
	r /= e.length, i /= e.length;
	let a = 0, o = 0, s = 0;
	for (let t of e) {
		let e = t.x - r, n = t.y - i;
		a += e * e, o += e * n, s += n * n;
	}
	let c = .5 * (a + s - Math.sqrt(Math.max(0, (a - s) * (a - s) + 4 * o * o))), l = o, u = c - a;
	Math.hypot(l, u) < 1e-9 && (l = c - s, u = o);
	let d = Math.hypot(l, u) || 1;
	return l /= d, u /= d, {
		nx: l,
		ny: u,
		c: -(l * r + u * i)
	};
}
function nt(e, t) {
	let n = e.nx * t.ny - t.nx * e.ny;
	return Math.abs(n) < 1e-6 ? null : {
		x: (e.ny * t.c - t.ny * e.c) / n,
		y: (t.nx * e.c - e.nx * t.c) / n
	};
}
function rt(e, t, n) {
	let r = n.x - t.x, i = n.y - t.y, a = r * r + i * i;
	if (a < 1e-9) return {
		d: Ye(e, t),
		t: 0
	};
	let o = ((e.x - t.x) * r + (e.y - t.y) * i) / a, s = Math.max(0, Math.min(1, o)), c = t.x + s * r, l = t.y + s * i;
	return {
		d: Math.hypot(e.x - c, e.y - l),
		t: o
	};
}
function it(e, t, n) {
	let r = Qe(e), i = [
		r.topLeft,
		r.topRight,
		r.bottomRight,
		r.bottomLeft
	], a = [];
	for (let e = 0; e < 4; e++) {
		let r = i[e], o = i[(e + 1) % 4], s = [];
		for (let e of t) {
			let { d: t, t: i } = rt(e, r, o);
			t <= n && i >= .12 && i <= .88 && s.push(e);
		}
		a.push(tt(s, r, o));
	}
	let o = [];
	for (let e = 0; e < 4; e++) {
		let t = a[(e + 3) % 4], r = a[e], s = nt(t, r);
		if (!s || Ye(s, i[e]) > n * 4) return i;
		o.push(s);
	}
	return o;
}
function at(e) {
	let t = [
		e.topLeft,
		e.topRight,
		e.bottomRight,
		e.bottomLeft
	], n = [];
	for (let e = 0; e < 4; e++) {
		let r = t[(e + 3) % 4], i = t[e], a = t[(e + 1) % 4], o = r.x - i.x, s = r.y - i.y, c = a.x - i.x, l = a.y - i.y, u = Math.hypot(o, s) * Math.hypot(c, l);
		if (u < 1e-8) return [
			0,
			0,
			0,
			0
		];
		let d = Math.max(-1, Math.min(1, (o * c + s * l) / u));
		n.push(Math.acos(d) * 180 / Math.PI);
	}
	return n;
}
function ot(e, t, n, r) {
	let i = 0, a = Infinity, o = !0;
	for (let r = 0; r < 4; r++) {
		let s = n[r], c = n[(r + 1) % 4], l = (c.x - s.x) * (t - s.y) - (c.y - s.y) * (e - s.x);
		if (Math.abs(l) > 1e-5) {
			let e = l > 0 ? 1 : -1;
			i === 0 ? i = e : e !== i && (o = !1);
		}
		let u = rt({
			x: e,
			y: t
		}, s, c).d;
		u < a && (a = u);
	}
	return o || a <= r;
}
function st(e, t, n, r, i) {
	let a = t.x - e.x, o = t.y - e.y, s = Math.hypot(a, o);
	if (s < 12) return 0;
	let c = -o / s, l = a / s, u = Math.min(48, Math.max(18, Math.round(s * .4))), d = 0;
	for (let t = 0; t < u; t++) {
		let s = .08 + .84 * t / Math.max(1, u - 1), f = e.x + a * s, p = e.y + o * s, m = 0;
		for (let e = -3; e <= 3; e += 1) {
			let t = Math.round(f + c * e), a = Math.round(p + l * e);
			if (t >= 1 && t < r - 1 && a >= 1 && a < i - 1) {
				let e = n[a * r + t];
				e > m && (m = e);
			}
		}
		m >= 8.2 && d++;
	}
	return d / u;
}
function ct(e) {
	let t = e instanceof HTMLImageElement && e.naturalWidth || e.width, n = e instanceof HTMLImageElement && e.naturalHeight || e.height;
	if (t < 64 || n < 64) return null;
	let r = Math.min(1, 320 / Math.max(t, n)), i = Math.max(32, Math.round(t * r)), a = Math.max(32, Math.round(n * r)), o = document.createElement("canvas");
	o.width = i, o.height = a;
	let s = o.getContext("2d", { willReadFrequently: !0 });
	if (!s) return null;
	s.drawImage(e, 0, 0, i, a);
	let c = s.getImageData(0, 0, i, a).data, l = i * a, u = new Float32Array(l), d = new Float32Array(l), f = new Float32Array(l), p = new Float32Array(l);
	for (let e = 0; e < a; e++) for (let t = 0; t < i; t++) {
		let n = 0, r = 0, o = 0, s = 0;
		for (let l = -1; l <= 1; l++) {
			let u = e + l;
			if (!(u < 0 || u >= a)) for (let e = -1; e <= 1; e++) {
				let a = t + e;
				if (a < 0 || a >= i) continue;
				let l = (u * i + a) * 4;
				n += c[l], r += c[l + 1], o += c[l + 2], s++;
			}
		}
		let l = e * i + t, m = n / s, h = r / s, g = o / s;
		u[l] = m, d[l] = h, f[l] = g, p[l] = .299 * m + .587 * h + .114 * g;
	}
	let m = new Float32Array(l), h = new Float32Array(l), g = new Float32Array(l), _ = (e, t, n, r, i) => {
		let a = -e[t + i - 1] + e[t + i + 1] - 2 * e[n + i - 1] + 2 * e[n + i + 1] - e[r + i - 1] + e[r + i + 1], o = -e[t + i - 1] - 2 * e[t + i] - e[t + i + 1] + e[r + i - 1] + 2 * e[r + i] + e[r + i + 1];
		return Math.hypot(a, o) * .25;
	};
	for (let e = 1; e < a - 1; e++) {
		let t = (e - 1) * i, n = e * i, r = (e + 1) * i;
		for (let e = 1; e < i - 1; e++) {
			let i = n + e, a = _(p, t, n, r, e), o = _(u, t, n, r, e), s = _(d, t, n, r, e), l = _(f, t, n, r, e), v = Math.max(a, o, s, l), y = 0, b = (t + e - 1) * 4, x = (t + e) * 4, S = (t + e + 1) * 4, C = (n + e - 1) * 4, w = (n + e + 1) * 4, T = (r + e - 1) * 4, E = (r + e) * 4, D = (r + e + 1) * 4;
			for (let e = 0; e < 3; e++) {
				let t = -c[b + e] + c[S + e] - 2 * c[C + e] + 2 * c[w + e] - c[T + e] + c[D + e], n = -c[b + e] - 2 * c[x + e] - c[S + e] + c[T + e] + 2 * c[E + e] + c[D + e], r = Math.hypot(t, n) * .25;
				r > y && (y = r);
			}
			m[i] = a, h[i] = v, g[i] = Math.max(v, y * .72);
		}
	}
	let v = [], y = (e, t) => {
		v.push({
			r: u[e],
			g: d[e],
			b: f[e],
			grad: m[e],
			side: t
		});
	};
	for (let e = 2; e < i - 2; e += 2) y(2 * i + e, 0), y((a - 3) * i + e, 2);
	for (let e = 2; e < a - 2; e += 2) y(e * i + (i - 3), 1), y(e * i + 2, 3);
	let b = v.filter((e) => e.grad < 10.5);
	if (b.length < v.length * .45) return null;
	let x = b.map((e) => e.r).sort((e, t) => e - t), S = b.map((e) => e.g).sort((e, t) => e - t), C = b.map((e) => e.b).sort((e, t) => e - t), w = x[Math.floor(x.length / 2)], T = S[Math.floor(S.length / 2)], E = C[Math.floor(C.length / 2)], D = [
		0,
		0,
		0,
		0
	], O = [
		0,
		0,
		0,
		0
	], k = 0;
	for (let e of v) {
		D[e.side]++;
		let t = Math.max(Math.abs(e.r - w), Math.abs(e.g - T), Math.abs(e.b - E));
		e.grad < 12 && t < 44 && (O[e.side]++, k++);
	}
	let A = D.map((e, t) => e > 0 ? O[t] / e : 0), j = A.filter((e) => e >= .45).length, M = A.filter((e) => e >= .65).length, N = k / Math.max(1, v.length);
	if (j < 3 || M < 2 && N < .68) return null;
	let P = new Uint8Array(l);
	for (let e = 0; e < l; e++) g[e] >= 9.5 && (P[e] = 1);
	let F = new Uint8Array(P);
	for (let e = 1; e < a - 1; e++) {
		let t = (e - 1) * i, n = e * i, r = (e + 1) * i;
		for (let e = 1; e < i - 1; e++) {
			let i = n + e;
			F[i] || g[i] < 6.5 || P[t + e - 1] + P[t + e] + P[t + e + 1] + P[n + e - 1] + P[n + e + 1] + P[r + e - 1] + P[r + e] + P[r + e + 1] >= 2 && (F[i] = 1);
		}
	}
	let I = new Uint8Array(l), L = new Int32Array(l), R = 0, z = 0, B = (e) => Math.max(Math.abs(u[e] - w), Math.abs(d[e] - T), Math.abs(f[e] - E)), V = (e) => {
		I[e] || F[e] || g[e] < 10.5 && B(e) < 42 && (I[e] = 1, L[z++] = e);
	};
	for (let e = 0; e < i; e++) V(e), V((a - 1) * i + e);
	for (let e = 0; e < a; e++) V(e * i), V(e * i + (i - 1));
	if (z === 0) return null;
	for (; R < z;) {
		let e = L[R++], t = e % i, n = e / i | 0, r = u[e], o = d[e], s = f[e], c = [
			t > 0 ? e - 1 : -1,
			t < i - 1 ? e + 1 : -1,
			n > 0 ? e - i : -1,
			n < a - 1 ? e + i : -1
		];
		for (let e = 0; e < 4; e++) {
			let t = c[e];
			t < 0 || I[t] || F[t] || Math.max(Math.abs(u[t] - r), Math.abs(d[t] - o), Math.abs(f[t] - s)) > 14 || B(t) > 46 || (I[t] = 1, L[z++] = t);
		}
	}
	let H = new Uint8Array(l), U = new Int32Array(l), W = [];
	for (let e = 0; e < l; e++) {
		if (I[e] || H[e]) continue;
		let t = 0, n = 0;
		H[e] = 1, U[n++] = e;
		let r = [];
		for (; t < n;) {
			let e = U[t++];
			r.push(e);
			let o = e % i, s = e / i | 0;
			o > 0 && !I[e - 1] && !H[e - 1] && (H[e - 1] = 1, U[n++] = e - 1), o < i - 1 && !I[e + 1] && !H[e + 1] && (H[e + 1] = 1, U[n++] = e + 1), s > 0 && !I[e - i] && !H[e - i] && (H[e - i] = 1, U[n++] = e - i), s < a - 1 && !I[e + i] && !H[e + i] && (H[e + i] = 1, U[n++] = e + i);
		}
		r.length > W.length && (W = r);
	}
	let ee = W.length / l;
	if (ee < .14 || ee > .93) return null;
	let te = new Uint8Array(l);
	for (let e = 0; e < W.length; e++) te[W[e]] = 1;
	let ne = [];
	for (let e = 0; e < W.length; e++) {
		let t = W[e], n = t % i, r = t / i | 0;
		n !== 0 && n !== i - 1 && r !== 0 && r !== a - 1 && te[t - 1] && te[t + 1] && te[t - i] && te[t + i] || ne.push({
			x: n,
			y: r
		});
	}
	if (ne.length < 24) return null;
	let re = $e(ne);
	if (re.length < 4) return null;
	let G = Qe(it(et(re), ne, Math.max(4, Math.min(i, a) * .035)).map((e) => ({
		x: Je(e.x / i),
		y: Je(e.y / a)
	})));
	if (at(G).some((e) => e < 46 || e > 134)) return null;
	let K = Ze([
		G.topLeft,
		G.topRight,
		G.bottomRight,
		G.bottomLeft
	]);
	if (K < .14 || K > .93) return null;
	let ie = .028, ae = (e) => e.y <= ie, q = (e) => e.x >= .972, oe = (e) => e.y >= .972, se = (e) => e.x <= ie, ce = [
		ae(G.topLeft) && ae(G.topRight),
		q(G.topRight) && q(G.bottomRight),
		oe(G.bottomRight) && oe(G.bottomLeft),
		se(G.bottomLeft) && se(G.topLeft)
	], le = ce.filter(Boolean).length, ue = [
		G.topLeft,
		G.topRight,
		G.bottomRight,
		G.bottomLeft
	].filter((e) => e.x > .028 && e.x < .972 && e.y > .028 && e.y < .972).length;
	if (le >= 2 || ue < 2) return null;
	let de = [
		{
			x: G.topLeft.x * i,
			y: G.topLeft.y * a
		},
		{
			x: G.topRight.x * i,
			y: G.topRight.y * a
		},
		{
			x: G.bottomRight.x * i,
			y: G.bottomRight.y * a
		},
		{
			x: G.bottomLeft.x * i,
			y: G.bottomLeft.y * a
		}
	], J = [];
	for (let e = 0; e < 4; e++) {
		if (ce[e]) continue;
		let t = st(de[e], de[(e + 1) % 4], g, i, a);
		J.push(t);
	}
	if (J.length > 0) {
		let e = Math.min(...J), t = J.reduce((e, t) => e + t, 0) / J.length;
		if (e < .42 || t < .56) return null;
	}
	let fe = 3.5, pe = new Uint8Array(l), me = .299 * w + .587 * T + .114 * E, he = 0, ge = 0, _e = 0, ve = 0;
	for (let e = 1; e < a - 1; e++) {
		let t = e * i;
		for (let n = 1; n < i - 1; n++) {
			let r = t + n;
			if (ot(n, e, de, fe)) continue;
			he++;
			let o = h[r], s = B(r), c = me - p[r];
			if (o >= 14 && s >= 24 && ge++, c >= 38 && o >= 10 && _e++, !I[r] && !pe[r]) {
				let e = 0, t = 0;
				pe[r] = 1, U[t++] = r;
				let n = 0;
				for (; e < t;) {
					let r = U[e++];
					(h[r] >= 10 || B(r) >= 32) && n++;
					let o = r % i, s = r / i | 0, c = [
						o > 1 ? r - 1 : -1,
						o < i - 2 ? r + 1 : -1,
						s > 1 ? r - i : -1,
						s < a - 2 ? r + i : -1
					];
					for (let e = 0; e < 4; e++) {
						let n = c[e];
						n >= 0 && !I[n] && !pe[n] && !ot(n % i, n / i | 0, de, fe) && (pe[n] = 1, U[t++] = n);
					}
				}
				t >= 3 && n >= 3 && ve++;
			}
		}
	}
	if (he > 0) {
		let e = ge / he;
		if (ve >= 7 || _e >= Math.max(24, Math.round(l * .0025)) || e > .015 || ge > Math.max(48, Math.round(l * .0055))) return null;
	}
	let Y = Ye({
		x: G.topLeft.x * t,
		y: G.topLeft.y * n
	}, {
		x: G.topRight.x * t,
		y: G.topRight.y * n
	}), X = Ye({
		x: G.bottomLeft.x * t,
		y: G.bottomLeft.y * n
	}, {
		x: G.bottomRight.x * t,
		y: G.bottomRight.y * n
	}), ye = Ye({
		x: G.topLeft.x * t,
		y: G.topLeft.y * n
	}, {
		x: G.bottomLeft.x * t,
		y: G.bottomLeft.y * n
	}), be = Ye({
		x: G.topRight.x * t,
		y: G.topRight.y * n
	}, {
		x: G.bottomRight.x * t,
		y: G.bottomRight.y * n
	}), xe = Math.max(Y, X), Se = Math.max(ye, be), Ce = xe / Math.max(1, Se);
	if (Ce < .42 || Ce > 2.45) return null;
	let we = Math.atan2((G.topRight.y - G.topLeft.y) * n, (G.topRight.x - G.topLeft.x) * t), Te = Math.atan2((G.bottomRight.y - G.bottomLeft.y) * n, (G.bottomRight.x - G.bottomLeft.x) * t), Ee = Math.atan2((G.bottomLeft.y - G.topLeft.y) * n, (G.bottomLeft.x - G.topLeft.x) * t), De = Math.atan2((G.bottomRight.y - G.topRight.y) * n, (G.bottomRight.x - G.topRight.x) * t), Z = 180 / Math.PI, Oe = Math.max(Math.abs((we - Te) * Z), Math.abs((Ee - De) * Z)), ke = Math.max(Math.abs(Y - X) / Math.max(1, xe), Math.abs(ye - be) / Math.max(1, Se)), Ae = Math.max(Math.abs(we * Z), Math.abs(Te * Z));
	return !(Oe >= 1.8 || ke >= .04 || Ae >= 2.2) && !(K <= .88 && ue >= 3) ? null : {
		applied: !0,
		autoDetected: !0,
		corners: G,
		sourceQuadAreaRatio: Math.round(K * 1e3) / 1e3
	};
}
function lt(e, t) {
	let n = [], r = [];
	for (let i = 0; i < 4; i++) {
		let a = t[i].x, o = t[i].y, s = e[i].x, c = e[i].y;
		n.push([
			a,
			o,
			1,
			0,
			0,
			0,
			-s * a,
			-s * o
		]), r.push(s), n.push([
			0,
			0,
			0,
			a,
			o,
			1,
			-c * a,
			-c * o
		]), r.push(c);
	}
	for (let e = 0; e < 8; e++) {
		let t = e, i = Math.abs(n[e][e]);
		for (let r = e + 1; r < 8; r++) {
			let a = Math.abs(n[r][e]);
			a > i && (i = a, t = r);
		}
		t !== e && ([n[e], n[t]] = [n[t], n[e]], [r[e], r[t]] = [r[t], r[e]]);
		let a = n[e][e] || 1e-12;
		for (let t = e + 1; t < 8; t++) {
			let i = n[t][e] / a;
			if (i !== 0) {
				for (let r = e; r < 8; r++) n[t][r] -= i * n[e][r];
				r[t] -= i * r[e];
			}
		}
	}
	let i = /* @__PURE__ */ new Float64Array(9);
	for (let e = 7; e >= 0; e--) {
		let t = r[e];
		for (let r = e + 1; r < 8; r++) t -= n[e][r] * i[r];
		i[e] = t / (n[e][e] || 1e-12);
	}
	return i[8] = 1, i;
}
function ut(e, t) {
	let n = e instanceof HTMLImageElement && e.naturalWidth || e.width, r = e instanceof HTMLImageElement && e.naturalHeight || e.height, i = Math.min(1, 2400 / Math.max(1, n, r)), a = Math.max(1, Math.round(n * i)), o = Math.max(1, Math.round(r * i)), s = document.createElement("canvas");
	s.width = a, s.height = o;
	let c = s.getContext("2d", { willReadFrequently: !0 });
	if (!c) throw Error("2D canvas context unavailable");
	c.drawImage(e, 0, 0, a, o);
	let l = c.getImageData(0, 0, a, o).data, u = {
		x: t.topLeft.x * a,
		y: t.topLeft.y * o
	}, d = {
		x: t.topRight.x * a,
		y: t.topRight.y * o
	}, f = {
		x: t.bottomRight.x * a,
		y: t.bottomRight.y * o
	}, p = {
		x: t.bottomLeft.x * a,
		y: t.bottomLeft.y * o
	}, m = Ye(u, d), h = Ye(p, f), g = Ye(u, p), _ = Ye(d, f), v = Math.max(64, Math.round(Math.max(m, h))), y = Math.max(64, Math.round(Math.max(g, _))), b = 1;
	v < 1500 ? b = Math.min(2.6, 1750 / v) : v > 2100 && (b = 2100 / v);
	let x = Math.max(64, Math.round(v * b)), S = Math.max(64, Math.round(y * b)), C = lt([
		u,
		d,
		f,
		p
	], [
		{
			x: 0,
			y: 0
		},
		{
			x: x - 1,
			y: 0
		},
		{
			x: x - 1,
			y: S - 1
		},
		{
			x: 0,
			y: S - 1
		}
	]), w = document.createElement("canvas");
	w.width = x, w.height = S;
	let T = w.getContext("2d", { willReadFrequently: !0 });
	if (!T) throw Error("2D canvas context unavailable");
	let E = T.createImageData(x, S), D = E.data, O = C[0], k = C[1], A = C[2], j = C[3], M = C[4], N = C[5], P = C[6], F = C[7], I = C[8], L = a - 1, R = o - 1;
	for (let e = 0; e < S; e++) {
		let t = k * e + A, n = M * e + N, r = F * e + I, i = e * x * 4;
		for (let e = 0; e < x; e++) {
			let o = P * e + r, s = o === 0 ? 1 : 1 / o, c = (O * e + t) * s, u = (j * e + n) * s;
			c < 0 ? c = 0 : c > L && (c = L), u < 0 ? u = 0 : u > R && (u = R);
			let d = c | 0, f = u | 0, p = d < L ? d + 1 : L, m = f < R ? f + 1 : R, h = c - d, g = u - f, _ = (1 - h) * (1 - g), v = h * (1 - g), y = (1 - h) * g, b = h * g, x = (f * a + d) * 4, S = (f * a + p) * 4, C = (m * a + d) * 4, w = (m * a + p) * 4;
			D[i] = l[x] * _ + l[S] * v + l[C] * y + l[w] * b, D[i + 1] = l[x + 1] * _ + l[S + 1] * v + l[C + 1] * y + l[w + 1] * b, D[i + 2] = l[x + 2] * _ + l[S + 2] * v + l[C + 2] * y + l[w + 2] * b, D[i + 3] = 255, i += 4;
		}
	}
	return T.putImageData(E, 0, 0), w;
}
// src/scanner/qualityGate.ts
var dt = class extends Error {
	constructor(e) {
		super(`Image quality gate failed: ${e.guidance}`), this.name = "QualityGateError", this.report = e;
	}
}, ft = 32, pt = 24;
function mt(e) {
	return typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement;
}
function ht(e, t, n) {
	let r = /* @__PURE__ */ new Uint8Array(768), i = Math.floor(t * .1), a = Math.floor(n * .12), o = Math.max(1, Math.floor(t * .8)), s = Math.max(1, Math.floor(n * .76));
	for (let c = 0; c < pt; c++) {
		let l = Math.min(n - 1, a + Math.floor((c + .5) / pt * s));
		for (let n = 0; n < ft; n++) {
			let a = Math.min(t - 1, i + Math.floor((n + .5) / ft * o));
			r[c * ft + n] = e[l * t + a];
		}
	}
	return r;
}
function gt(e, t) {
	return e.length === 0 ? t ? "Crisp, glare-free frame ready" : "Image quality acceptable" : e.includes("no_document") ? "Position passport or ID card inside the frame" : e.includes("too_dark") ? "Too dark — move to brighter, even lighting" : e.includes("too_bright") ? "Overexposed — reduce direct light on document" : e.includes("glare_detected") ? "Glare hotspot detected — tilt card or avoid direct reflections" : e.includes("camera_moving") ? "Hold steady — stabilizing frame…" : e.includes("too_blurry") ? "Image looks blurry — hold steady or adjust distance to focus" : "Adjust framing and lighting";
}
function _t(e, t, n = {}, r) {
	let { minSharpness: i = 34, maxGlareRatio: a = .045, minBrightness: o = 48, maxBrightness: s = 242, requireDocument: c = !0, maxMotionDelta: l = 5.5 } = n, u = Math.max(1, e.width), d = Math.max(1, e.height), f = Math.min(1, 360 / Math.max(u, d)), p = Math.max(32, Math.round(u * f)), m = Math.max(32, Math.round(d * f)), h = f === 1 ? e : (() => {
		let t = document.createElement("canvas");
		t.width = p, t.height = m;
		let n = t.getContext("2d", { willReadFrequently: !0 });
		return n && (n.imageSmoothingEnabled = !0, n.imageSmoothingQuality = "medium", n.drawImage(e, 0, 0, p, m)), t;
	})(), g = h.getContext("2d", { willReadFrequently: !0 });
	if (!g) throw Error("2D canvas context unavailable for quality assessment");
	let _ = g.getImageData(0, 0, p, m).data, v = p * m, y = new Uint8ClampedArray(v);
	for (let e = 0, t = 0; e < _.length; e += 4, t++) y[t] = Math.round(.299 * _[e] + .587 * _[e + 1] + .114 * _[e + 2]);
	let b = ht(y, p, m), x = Math.max(1, Math.floor(p * .1)), S = Math.min(p - 2, Math.ceil(p * .9)), C = Math.max(1, Math.floor(m * .12)), w = Math.min(m - 2, Math.ceil(m * .88)), T = Math.max(8, S - x), E = Math.max(8, w - C), D = T * E, O = /* @__PURE__ */ new Uint32Array(256), k = 0, A = 0, j = 0, M = /* @__PURE__ */ new Float64Array(48), N = /* @__PURE__ */ new Float64Array(48), P = /* @__PURE__ */ new Float64Array(48), F = /* @__PURE__ */ new Uint32Array(48);
	for (let e = C; e < w; e++) {
		let t = Math.min(5, Math.floor((e - C) / E * 6)), n = e * p;
		for (let e = x; e < S; e++) {
			let r = n + e, i = y[r];
			k += i, O[i]++;
			let a = r * 4, o = _[a], s = _[a + 1], c = _[a + 2], l = Math.min(o, s, c);
			l >= 248 && Math.max(o, s, c) - l <= 10 && j++;
			let u = Math.abs(4 * i - y[r - 1] - y[r + 1] - y[r - p] - y[r + p]), d = (Math.abs(y[r + 1] - y[r - 1]) + Math.abs(y[r + p] - y[r - p])) * .5;
			d >= 16 && A++;
			let f = Math.min(7, Math.floor((e - x) / T * 8)), m = t * 8 + f;
			M[m] += u, N[m] += u * u, P[m] += d, F[m]++;
		}
	}
	let I = Math.round(k / Math.max(1, D)), L = 0, R = 128, z = 255, B = 0, V = !1, H = !1;
	for (let e = 0; e < 256; e++) if (B += O[e], !V && B >= D * .1 && (L = e, V = !0), !H && B >= D * .6 && (R = e, H = !0), B >= D * .95) {
		z = e;
		break;
	}
	let U = z - L, W = [];
	for (let e = 0; e < 48; e++) {
		let t = F[e];
		if (t < 8) continue;
		let n = M[e] / t, r = Math.max(0, N[e] / t - n * n), i = P[e] / t, a = Math.sqrt(r) * .72 + i * 1.15;
		W.push(a);
	}
	W.sort((e, t) => t - e);
	let ee = Math.max(1, Math.ceil(W.length * .25)), te = 0;
	for (let e = 0; e < ee; e++) te += W[e] ?? 0;
	let ne = te / ee, re = Math.max(0, Math.min(100, Math.round((ne - 2) / 30 * 100))), G = re >= i, K = j / Math.max(1, D), ie = R < 236 ? Math.round(K * 1e3) / 1e3 : Math.round(Math.max(0, K - .55) * 1e3) / 1e3, ae = R < 236 && K > a && K < .78, q = "ok";
	I < o ? q = "too_dark" : I > s && U < 70 && (q = "too_bright");
	let oe = null;
	if (r?.detectQuad !== !1) {
		let e = ct(h);
		e && e.sourceQuadAreaRatio >= .2 && (oe = e.corners);
	}
	let se = A / Math.max(1, D), ce = oe !== null || se >= .015 && U >= 40, le = 0, ue = !0, de = 100;
	if (t && t.length === b.length) {
		let e = 0;
		for (let n = 0; n < b.length; n++) e += Math.abs(b[n] - t[n]);
		le = Math.round(e / b.length * 10) / 10, ue = le <= l, de = Math.max(0, Math.min(100, Math.round(100 - le / (l * 2.5) * 100)));
	}
	let J = [];
	c && !ce && J.push("no_document"), q === "too_dark" ? J.push("too_dark") : q === "too_bright" && J.push("too_bright"), ae && J.push("glare_detected"), G || J.push("too_blurry"), ue || J.push("camera_moving");
	let fe = Math.max(0, Math.min(100, Math.round((1 - ie * 6) * 100))), pe = q === "ok" ? Math.max(40, Math.min(100, Math.round(100 - Math.abs(I - 148) * .4))) : 20, me = Math.max(0, Math.min(100, Math.round(re * .48 + fe * .22 + pe * .15 + de * .15))), he = J.length === 0, ge = gt(J, ce);
	return {
		report: {
			passed: he,
			overallScore: me,
			sharpnessScore: re,
			isSharp: G,
			glareRatio: ie,
			hasGlare: ae,
			meanBrightness: I,
			exposureStatus: q,
			documentDetected: ce,
			detectedCorners: oe,
			stabilityScore: de,
			isStable: ue,
			motionDelta: le,
			issues: J,
			guidance: ge
		},
		signature: b
	};
}
async function vt(e, t = {}) {
	if (e instanceof HTMLCanvasElement) return _t(e, null, t).report;
	let n;
	if (mt(e)) {
		let t = Math.max(1, e.videoWidth || e.clientWidth), r = Math.max(1, e.videoHeight || e.clientHeight), i = Math.min(1, 480 / Math.max(t, r));
		n = document.createElement("canvas"), n.width = Math.max(1, Math.round(t * i)), n.height = Math.max(1, Math.round(r * i));
		let a = n.getContext("2d", { willReadFrequently: !0 });
		if (!a) throw Error("2D canvas context unavailable");
		a.drawImage(e, 0, 0, n.width, n.height);
	} else {
		let t = await ce(e), r = Math.max(1, t.naturalWidth || t.width), i = Math.max(1, t.naturalHeight || t.height), a = Math.min(1, 480 / Math.max(r, i));
		n = document.createElement("canvas"), n.width = Math.max(1, Math.round(r * a)), n.height = Math.max(1, Math.round(i * a));
		let o = n.getContext("2d", { willReadFrequently: !0 });
		if (!o) throw Error("2D canvas context unavailable");
		o.drawImage(t, 0, 0, n.width, n.height);
	}
	return _t(n, null, t).report;
}
var yt = class {
	constructor(e, t = {}) {
		this.timerId = null, this.running = !1, this.capturing = !1, this.consecutivePassFrames = 0, this.previousSignature = null, this.latestReport = null, this.video = e, this.options = {
			sampleIntervalMs: 180,
			requiredStableFrames: 3,
			mimeType: "image/png",
			captureQuality: .94,
			stopOnCapture: !0,
			...t
		}, this.analysisCanvas = document.createElement("canvas");
	}
	isRunning() {
		return this.running;
	}
	getLatestReport() {
		return this.latestReport;
	}
	start() {
		this.running || (this.running = !0, this.capturing = !1, this.consecutivePassFrames = 0, this.previousSignature = null, this.scheduleNextTick(80));
	}
	stop() {
		this.running = !1, this.timerId !== null && (window.clearTimeout(this.timerId), this.timerId = null), this.consecutivePassFrames = 0, this.previousSignature = null;
	}
	updateOptions(e) {
		this.options = {
			...this.options,
			...e
		};
	}
	scheduleNextTick(e) {
		this.running && (this.timerId = window.setTimeout(() => {
			this.tick();
		}, e));
	}
	async tick() {
		if (!this.running) return;
		if (this.capturing) {
			this.scheduleNextTick(this.options.sampleIntervalMs);
			return;
		}
		let e = this.video.videoWidth, t = this.video.videoHeight;
		if (this.video.readyState < 2 || e <= 0 || t <= 0) this.scheduleNextTick(this.options.sampleIntervalMs);
		else {
			try {
				let n = Math.min(1, 360 / Math.max(e, t)), r = Math.max(32, Math.round(e * n)), i = Math.max(32, Math.round(t * n));
				(this.analysisCanvas.width !== r || this.analysisCanvas.height !== i) && (this.analysisCanvas.width = r, this.analysisCanvas.height = i);
				let a = this.analysisCanvas.getContext("2d", { willReadFrequently: !0 });
				if (!a) {
					this.scheduleNextTick(this.options.sampleIntervalMs);
					return;
				}
				a.drawImage(this.video, 0, 0, r, i);
				let { report: o, signature: s } = _t(this.analysisCanvas, this.previousSignature, this.options);
				this.previousSignature = s, this.latestReport = o, o.passed ? this.consecutivePassFrames++ : this.consecutivePassFrames = 0;
				let c = Math.max(1, this.options.requiredStableFrames), l = Math.min(1, this.consecutivePassFrames / c);
				if (this.options.onQualityUpdate?.(o, l), this.consecutivePassFrames >= c) {
					this.capturing = !0, this.consecutivePassFrames = 0;
					let e = await this.captureFullFrame();
					if (this.options.stopOnCapture && this.stop(), this.options.onAutoCapture?.(e, o), this.capturing = !1, !this.running) return;
				}
			} catch (e) {
				this.capturing = !1, this.options.onError?.(e instanceof Error ? e : /* @__PURE__ */ Error("Camera auto-capture frame check failed"));
			}
			this.running && this.scheduleNextTick(this.options.sampleIntervalMs);
		}
	}
	captureFullFrame() {
		return new Promise((e, t) => {
			let n = this.video.videoWidth, r = this.video.videoHeight;
			if (!n || !r) {
				t(/* @__PURE__ */ Error("Camera stream has no active video frame"));
				return;
			}
			let i = document.createElement("canvas");
			i.width = n, i.height = r;
			let a = i.getContext("2d");
			if (!a) {
				t(/* @__PURE__ */ Error("2D canvas context unavailable"));
				return;
			}
			a.drawImage(this.video, 0, 0, n, r);
			let o = this.options.mimeType, s = o === "image/jpeg" ? "jpg" : o === "image/webp" ? "webp" : "png";
			i.toBlob((n) => {
				n ? e(new File([n], `auto-capture-${Date.now()}.${s}`, { type: o })) : t(/* @__PURE__ */ Error("Failed to encode captured camera frame"));
			}, o, this.options.captureQuality);
		});
	}
};
function bt(e, t = {}) {
	let n = new yt(e, t);
	return n.start(), n;
}
// src/scanner/vizParser.ts
var xt = {
	JAN: "01",
	FEB: "02",
	MAR: "03",
	APR: "04",
	MAY: "05",
	JUN: "06",
	JUL: "07",
	AUG: "08",
	SEP: "09",
	SEPT: "09",
	OCT: "10",
	NOV: "11",
	DEC: "12",
	JANV: "01",
	FEV: "02",
	FEVR: "02",
	AVR: "04",
	MAI: "05",
	JUIN: "06",
	JUIL: "07",
	AOUT: "08",
	DECEMB: "12",
	MRZ: "03",
	OKT: "10",
	DEZ: "12",
	ENE: "01",
	ABR: "04",
	AGO: "08",
	DIC: "12"
};
function St(e) {
	if (!e) return null;
	let t = e.toUpperCase().replace(/\s+/g, " ").trim(), n = t.match(/\b((?:19|20)\d{2})[-./](\d{1,2})[-./](\d{1,2})\b/);
	if (n) {
		let [, e, t, r] = n;
		if (+t >= 1 && +t <= 12 && +r >= 1 && +r <= 31) return `${e}-${t.padStart(2, "0")}-${r.padStart(2, "0")}`;
	}
	if (n = t.match(/\b(\d{1,2})\s+([A-Z]{3,5})(?:\/[A-Z]{2,5})?\s+((?:19|20)\d{2})\b/), n) {
		let [, e, t, r] = n, i = xt[t];
		if (i && +e >= 1 && +e <= 31) return `${r}-${i}-${e.padStart(2, "0")}`;
	}
	if (n = t.match(/\b([A-Z]{3,5})\s+(\d{1,2}),?\s+((?:19|20)\d{2})\b/), n) {
		let [, e, t, r] = n, i = xt[e];
		if (i && +t >= 1 && +t <= 31) return `${r}-${i}-${t.padStart(2, "0")}`;
	}
	if (n = t.match(/\b(\d{1,2})(?:[-./]|\s+)(\d{1,2})(?:[-./]|\s+)((?:19|20)\d{2})\b/), n) {
		let e = parseInt(n[1], 10), t = parseInt(n[2], 10), r = n[3];
		if (e > 12 && t >= 1 && t <= 12 && e <= 31) return `${r}-${String(t).padStart(2, "0")}-${String(e).padStart(2, "0")}`;
		if (t > 12 && e >= 1 && e <= 12 && t <= 31) return `${r}-${String(e).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
		if (e >= 1 && e <= 31 && t >= 1 && t <= 12) return `${r}-${String(t).padStart(2, "0")}-${String(e).padStart(2, "0")}`;
	}
	if (n = t.match(/\b(\d{1,2})[-./](\d{1,2})[-./](\d{2})\b/), n) {
		let e = parseInt(n[1], 10), t = parseInt(n[2], 10), r = parseInt(n[3], 10);
		if (t >= 1 && t <= 12 && e >= 1 && e <= 31) return `${r <= 40 ? 2e3 + r : 1900 + r}-${String(t).padStart(2, "0")}-${String(e).padStart(2, "0")}`;
	}
	return null;
}
function Ct(e) {
	let t = [];
	for (let n of [
		/\b(?:19|20)\d{2}[-./]\d{1,2}[-./]\d{1,2}\b/g,
		/\b\d{1,2}\s+[A-Za-z]{3,5}(?:\/[A-Za-z]{2,5})?\s+(?:19|20)\d{2}\b/g,
		/\b[A-Za-z]{3,5}\s+\d{1,2},?\s+(?:19|20)\d{2}\b/g,
		/\b\d{1,2}(?:[-./]|\s+)\d{1,2}(?:[-./]|\s+)(?:19|20)\d{2}\b/g
	]) {
		let r = e.match(n);
		if (r) for (let e of r) {
			let n = St(e);
			n && !t.includes(n) && t.push(n);
		}
	}
	return t;
}
var wt = [
	{
		field: "surname",
		patterns: [
			/\b(?:primer\s*apellido|segundo\s*apellido|1er\.?\s*apellido|2[oº]\.?\s*apellido)\b/i,
			/\b(?:surname|sumarre|sumame|last\s*name|family\s*name|nom(?:\s*de\s*famille)?|familienname|nachname|apell?i?dos?|cognome|nazwisko|achternaam)\b/i,
			/^(?:1[.)]?\s*)?(?:surname|nom|name)\b/i
		]
	},
	{
		field: "givenNames",
		patterns: [/\b(?:given\s*names?|first\s*names?|forenames?|pr[eé]noms?|vornamen?|vorname|nombres?|nome|imiona|voornamen)\b/i, /^(?:2[.)]?\s*)?(?:given\s*names?|first\s*name)\b/i]
	},
	{
		field: "fullName",
		patterns: [/\b(?:full\s*name|holder(?:'s)?\s*name|cardholder|name\s*of\s*bearer)\b/i]
	},
	{
		field: "documentNumber",
		patterns: [/\b(?:passport\s*no\.?|pasaporte\s*n[°o]?|passeport\s*n[°o]?|pass-?nr\.?|document\s*(?:no\.?|number|id)|card\s*no\.?|id\s*number|dl\s*no\.?|licen[cs]e\s*(?:no\.?|number)|no\.?\s*du\s*passeport|reisepass\s*nr|numero\s*(?:del\s*)?documento)\b/i, /^(?:4d|5)[.)]\s*/i]
	},
	{
		field: "personalNumber",
		patterns: [/\b(?:personal\s*(?:no\.?|number|id)|national\s*(?:id|no\.?|number)|identity\s*no\.?|id\.?\s*no\.?|pesel|ssn|social\s*security|tax\s*id|cnp|dni|nif|nie|bsn|fiscal\s*code|codice\s*fiscale)\b/i]
	},
	{
		field: "nationality",
		patterns: [/\b(?:nationalit[yé]|naticnalt[yé]|staatsangeh[oö]rigkeit|nacionalidad|nazionalit[aà]|obywatelstwo|citizenship)\b/i]
	},
	{
		field: "issuingCountry",
		patterns: [/\b(?:issuing\s*(?:state|country)|country\s*code|state\s*of\s*issue|pays\s*[eé]metteur|c[oó]digo|cdigo|code\s*\/\s*code)\b/i]
	},
	{
		field: "dateOfBirth",
		patterns: [/\b(?:date\s*of\s*birth|birth\s*date|dob|born\s*on|date\s*de\s*naissance|geburtsdatum|geburtstag|fecha\s*de\s*nacimiento|data\s*di\s*nascita|data\s*urodzenia)\b/i, /^(?:3)[.)]\s*/i]
	},
	{
		field: "placeOfBirth",
		patterns: [/\b(?:place\s*of\s*b(?:ir|e)th|birth\s*place|birthplace|lieu\s*de\s*naissance|geburtsort|lugar\s*de\s*nacimiento|luogo\s*di\s*nascita|miejsce\s*urodzenia)\b/i]
	},
	{
		field: "parents",
		patterns: [/\b(?:h[iy]j?o\s*\/?\s*a?\s*de|hijos?\s*de|parents?|filiation|nom\s*des\s*parents|imiona\s*rodzic[oó]w)\b/i]
	},
	{
		field: "dateOfIssue",
		patterns: [/\b(?:date\s*of\s*issue|issue\s*date|issued(?:\s*on)?|iss|date\s*de\s*d[eé]livrance|ausstellungsdatum|fecha\s*de\s*expedici[oó]n|rilasciato\s*il|data\s*wydania|datum\s*[\/|]\s*[do]?[ao]te)\b/i, /^(?:4a)[.)]\s*/i]
	},
	{
		field: "dateOfExpiry",
		patterns: [/\b(?:date\s*of\s*expir(?:y|ation)|expir(?:y|es|ation)(?:\s*date)?|valid\s*(?:until|thru|to)|exp|date\s*d['’]expiration|g[uü]ltig\s*bis|fecha\s*de\s*caducidad|scadenza|data\s*wa[zż]no[sś]ci)\b/i, /^(?:4b)[.)]\s*/i]
	},
	{
		field: "sex",
		patterns: [/\b(?:sex|gender|sexe|geschlecht|sexo|sesso|p[lł]e[cć])\b/i]
	},
	{
		field: "issuingAuthority",
		patterns: [/\b(?:authorit(?:y|ies)|issuing\s*(?:authority|office|agency)|autorit[eéa]|beh[oö]rde|behdrde|autoridad|wydany\s*przez|organ\s*wydaj[aą]cy|equipo)\b/i, /^(?:4c|9)[.)]\s*/i]
	},
	{
		field: "address",
		patterns: [/\b(?:address|anschrift|residence|domicilio|domicile|adresse|wohnsitz|direcci[oó]n|indirizzo|adres)\b/i, /^(?:8)[.)]\s*/i]
	},
	{
		field: "licenseClass",
		patterns: [/\b(?:class|category|categories|cat[eé]gorie|klasse|categor[ií]a)\b/i, /^(?:9)[.)]\s*/i]
	},
	{
		field: "restrictions",
		patterns: [/\b(?:restrictions?|rest|conditions|auflagen)\b/i, /^(?:12)[.)]\s*/i]
	},
	{
		field: "endorsements",
		patterns: [/\b(?:endorsements?|end)\b/i]
	},
	{
		field: "height",
		patterns: [/\b(?:height|hgt|haigh|gr[oö][sß]e|grobe|taille|estatura|statura|wzrost)\b/i]
	},
	{
		field: "eyeColor",
		patterns: [/\b(?:eye\s*colou?r|colour\s*of\s*[es]yes|augenfarbe|avgenfarbe|avg[eo]n\w*|couleur\s*des\s*yeux|covl[eo]ur\s*des\s*ye\w*|yeux|augen|ojos|occhi)\b/i]
	},
	{
		field: "hairColor",
		patterns: [/\b(?:hair|hair\s*colou?r|cheveux|haare)\b/i]
	}
], Tt = [/\b(?:doktorgrad|doctoral\s*degr|degn?\s*ree|grade\s*de\s*docteur|ordens|rdens|oder\s*k[uü]nst|k[uü]nstlername|kinermamo|kinlenamo|kintlemamo|lername|no[em]\s+de\s+religion|rotgious|otgious|religious\s*name|stage\s*or\s*pen|nom\s*d['’]?artiste|pseudonyn|pseudonym|signature|unterschrift|firma\s*del\s*titular|holder['’]?s\s*signature)\b/i];
function Et(e, t) {
	let n = e.indexOf(":");
	if (n !== -1 && n < 40) return e.slice(n + 1).trim();
	let r = e;
	for (let e of t) {
		let t = new RegExp(e.source, e.flags.includes("g") ? e.flags : `${e.flags}g`);
		r = r.replace(t, "");
	}
	return r.replace(/^[\s/:|.\-–—]+/, "").replace(/^(?:[\/|][A-Za-zÀ-ÿ\s]+)+[:\-]?\s*/, "").trim();
}
function Dt(e, t) {
	if (e.includes(":")) return !1;
	if (/[\/|]/.test(e) && !/\d{1,2}\/\d{1,2}/.test(e)) return !0;
	let n = Et(e, t.patterns);
	return n.length <= 2 || (t.field === "height" || t.field === "dateOfIssue" || t.field === "dateOfBirth" || t.field === "dateOfExpiry") && !/\d/.test(n);
}
function Ot(e) {
	return Tt.some((t) => t.test(e)) ? !0 : wt.some((t) => t.patterns.some((n) => n.test(e) && Dt(e, t)));
}
function kt(e) {
	return Tt.some((t) => t.test(e)) ? !0 : wt.some((t) => t.patterns.some((t) => t.test(e)));
}
function At(e) {
	let t = e.replace(/\s+/g, "");
	return !!(/^[A-Z0-9<]{22,}$/.test(t) && (t.includes("<") || /\d{5,}/.test(t)));
}
function jt(e, t = !1) {
	let n = e.replace(/^[\s=•·|>~_-]+/g, "").replace(/\s+[*•·|>~]+$/g, "").replace(/~/g, "");
	return n = t ? n.replace(/([A-ZÄÖÜ]{2,}STRASSE)[-.\s]+\s*(\d)/gi, "$1 $2").replace(/([A-ZÄÖÜ]{3,})[-~]\s+(\d)/gi, "$1 $2").replace(/(\d)\.$/, "$1") : n.replace(/\s+\d$/g, ""), n.replace(/\s+/g, " ").trim();
}
function Mt(e) {
	let t = e.toUpperCase();
	return /\b(?:PASSPORT|PASSEPORT|PASAPORTE|REISEPASS|PASSAPORTO|PASZPORT)\b/.test(t) ? "passport" : /\b(?:DRIVER(?:'S)?\s*LICEN[CS]E|DRIVING\s*LICEN[CS]E|PERMIS\s*DE\s*CONDUIRE|F[UÜ]HRERSCHEIN|PRAWO\s*JAZDY)\b/.test(t) ? "driver_license" : /\b(?:RESIDENCE\s*PERMIT|TITRE\s*DE\s*S[EÉ]JOUR|AUFENTHALTSTITEL|KARTA\s*POBYTU)\b/.test(t) ? "residence_permit" : /\b(?:VISA|VISUM)\b/.test(t) ? "visa" : /\b(?:IDENTITY\s*CARD|ID\s*CARD|NATIONAL\s*ID|CARTE\s*NATIONALE|PERSONALAUSWEIS|ANSCHRIFT|AUGENFARBE|DOW[OÓ]D\s*OSOBISTY|CARTA\s*D'IDENTIT[AÀ]|DNI)\b/.test(t) ? "id_card" : null;
}
function Nt(e) {
	let t = e.trim().toUpperCase();
	return /^(?:M|MALE|HOMME|M[AÄ]NNLICH|MASCULINO|M[EĘ][ZŻ]CZYZNA)$/.test(t) ? "M" : /^(?:F|FEMALE|FEMME|WEIBLICH|FEMENINO|KOBIETA)$/.test(t) ? "F" : /^(?:X|NON[- ]?BINARY|OTHER|DIVERS)$/.test(t) ? "X" : t.startsWith("M/") || t === "M" ? "M" : t.startsWith("F/") || t === "F" ? "F" : null;
}
function Pt(e, t) {
	let n = Math.max(12, e.bbox.y1 - e.bbox.y0);
	if (t.bbox.y0 < e.bbox.y0 + n * .25) return !1;
	let r = e.bbox.x0 - 120, i = Math.max(e.bbox.x1 + 60, e.bbox.x0 + 360), a = (t.bbox.x0 + t.bbox.x1) / 2, o = Math.abs(t.bbox.x0 - e.bbox.x0) <= 130, s = t.bbox.x0 >= r && a <= i;
	return o || s;
}
function Ft(e) {
	return !(e.length < 2 || /[{}|\[\]<>~]/.test(e) || !/[A-ZÄÖÜÑ]{2,}/.test(e));
}
function It(e, t) {
	let n = (t ?? []).map((e) => ({
		text: e.text.replace(/\s+/g, " ").trim(),
		bbox: e.bbox
	})).filter((e) => e.text.length > 0 && !At(e.text)).sort((e, t) => e.bbox.y0 - t.bbox.y0 || e.bbox.x0 - t.bbox.x0), r = n.length > 0 ? n.map((e) => e.text) : e.split(/\r?\n/).map((e) => e.replace(/\s+/g, " ").trim()).filter((e) => e.length > 0 && !At(e)), i = {
		documentTypeHint: Mt(e),
		surname: null,
		surnames: [],
		givenNames: null,
		fullName: null,
		documentNumber: null,
		personalNumber: null,
		nationality: null,
		issuingCountry: null,
		dateOfBirth: null,
		dateOfIssue: null,
		dateOfExpiry: null,
		sex: null,
		placeOfBirth: null,
		address: null,
		parents: null,
		issuingAuthority: null,
		licenseClass: null,
		restrictions: null,
		endorsements: null,
		height: null,
		eyeColor: null,
		hairColor: null,
		detectedLines: r,
		unmappedKeyValues: {}
	}, a = n.length > 0;
	for (let e = 0; e < r.length; e++) {
		let t = r[e];
		if (Tt.some((e) => e.test(t))) continue;
		let o = a ? n[e] : null, s = t.match(/^([A-Za-z][A-Za-z0-9\s/().'-]{1,32}):\s*(.+)$/), c = !1;
		for (let s of wt) {
			for (let l of s.patterns) if (l.test(t)) {
				c = !0;
				let l = s.field === "sex" ? 1 : 2, u = [], d = null, f = null;
				if (o) for (let t = e + 1; t < n.length; t++) {
					let e = n[t];
					if (!Pt(o, e)) continue;
					if (kt(e.text)) break;
					if (e.text.length < l) continue;
					if (s.field === "placeOfBirth" && !Ft(e.text)) {
						if (u.length > 0) break;
						continue;
					}
					if (s.field === "surname") {
						if (/^(?:\[b\]|[»*])/i.test(e.text)) break;
						if (f !== null) {
							let t = Math.max(14, f.y1 - f.y0);
							if (e.bbox.y0 - f.y1 > t * 1.4) break;
						}
					}
					if (s.field === "address") {
						if (e.text.length < 3 && !/^\d+$/.test(e.text) || d !== null && Math.abs(e.bbox.x0 - d) > 85) continue;
						if (f !== null) {
							let t = Math.max(18, f.y1 - f.y0);
							if (e.bbox.y0 - f.y1 > t * 1.8) break;
						}
					}
					d === null && (d = e.bbox.x0), f = e.bbox, u.push(e.text);
					let r = s.field === "address" ? 4 : s.field === "placeOfBirth" || s.field === "surname" ? 2 : 1;
					if (u.length >= r) break;
				}
				let p = Dt(t, s) ? "" : Et(t, s.patterns), m = p, h = 0;
				if ((!m || m.length < l) && (u.length > 0 ? m = u[0] : !a && e + 1 < r.length && !Ot(r[e + 1]) && (m = r[e + 1], h = 1)), !m) continue;
				if (s.field === "dateOfBirth" || s.field === "dateOfIssue" || s.field === "dateOfExpiry") {
					let e = St(m);
					e && !i[s.field] && (i[s.field] = e);
				} else if (s.field === "sex") {
					let e = Nt(m);
					e && !i.sex && (i.sex = e);
				} else if (s.field === "address" || s.field === "placeOfBirth") {
					let t = s.field === "address", n = [];
					if (a && !p && u.length > 0) n = u.map((e) => jt(e, t)).filter((e) => e.length >= 2);
					else {
						n = [jt(m, t)];
						let i = s.field === "address" ? 3 : 2, a = e + h + 1;
						for (; n.length < i && a < r.length && !kt(r[a]);) {
							let e = jt(r[a], t);
							if (e.length >= 2 && !/^\d{1,2}$/.test(e)) {
								if (s.field === "placeOfBirth" && !Ft(e)) break;
								n.push(e);
							}
							a++;
						}
					}
					!i[s.field] && n.length > 0 && (i[s.field] = n.join(", "));
				} else if (s.field === "parents") i.parents ||= jt(m);
				else if (s.field === "height") {
					let e = jt(m);
					/\d/.test(e) && !i.height && (i.height = e);
				} else if (s.field === "surname") {
					let e = (a && !p && u.length > 0 ? u.map((e) => jt(e)).filter(Boolean) : [jt(m)].filter(Boolean)).join(" ");
					e && (i.surname ? /segundo\s*apellido|2[oº]\.?\s*apellido/i.test(t) && !i.surnames.includes(e) && (i.surnames = [...i.surnames, e], i.surname = i.surnames.join(" ")) : (i.surname = e, i.surnames = e.split(/\s+/).filter(Boolean)));
				} else i[s.field] || (i[s.field] = jt(m));
				break;
			}
			if (c) break;
		}
		if (!c && s) {
			let e = s[1].trim(), t = jt(s[2]);
			e && t && t.length <= 100 && (i.unmappedKeyValues[e] = t);
		}
	}
	let o = Ct(r.join("\n")).sort();
	if (o.length > 0) {
		let e = (/* @__PURE__ */ new Date()).getFullYear();
		if (!i.dateOfBirth) {
			let t = o.find((t) => parseInt(t.slice(0, 4), 10) <= e - 12);
			t && (i.dateOfBirth = t);
		}
		if (!i.dateOfExpiry) {
			let t = [...o].reverse().find((t) => parseInt(t.slice(0, 4), 10) >= e - 2);
			t && t !== i.dateOfBirth && (i.dateOfExpiry = t);
		}
		if (!i.dateOfIssue && o.length >= 2) {
			let t = o.filter((t) => t !== i.dateOfBirth && t !== i.dateOfExpiry && parseInt(t.slice(0, 4), 10) <= e);
			t.length > 0 && (i.dateOfIssue = t[0]);
		}
	}
	if (!i.documentNumber) for (let e of r) {
		let t = e.match(/\b(?:DL|ID|NO\.?|DOC)\s*[:#]?\s*([A-Z0-9-]{6,18})\b/i);
		if (t && /\d/.test(t[1])) {
			i.documentNumber = t[1].toUpperCase();
			break;
		}
	}
	if (!i.fullName && (i.givenNames || i.surname) && (i.fullName = [i.givenNames, i.surname].filter(Boolean).join(" ")), !i.height) {
		let t = e.match(/\b(\d['′]\s*-?\s*\d{1,2}["″]?|\d{3}\s*cm)\b/i);
		t && (i.height = t[1]);
	}
	return i;
}
// src/scanner/ocrEngine.ts
var Lt = "ocrb_int", Rt = "https://cdn.jsdelivr.net/gh/Shreeshrii/tessdata_ocrb@master";
function zt(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date(), i = r.getFullYear() - n.getFullYear(), a = r.getMonth() - n.getMonth();
	return (a < 0 || a === 0 && r.getDate() < n.getDate()) && i--, i >= 0 && i <= 130 ? i : null;
}
function Bt(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date();
	return r.setHours(0, 0, 0, 0), n < r;
}
function Vt(e, t) {
	if (e) {
		let n = e.documentCode.toUpperCase();
		if (n.startsWith("P")) return "passport";
		if (n.startsWith("V")) return "visa";
		if (n.startsWith("AC") || n.startsWith("AR") || t === "residence_permit") return "residence_permit";
		if (n.startsWith("I") || n.startsWith("A") || n.startsWith("C")) return "id_card";
	}
	return t ?? "unknown";
}
function $(e, t, n, r) {
	let i = e != null && String(e).trim() !== "", a = t != null && String(t).trim() !== "";
	return i && a ? (r[n] = "MRZ+VIZ", e) : i ? (r[n] = "MRZ", e) : a ? (r[n] = "VIZ", t) : null;
}
function Ht(e) {
	return e.toUpperCase().replace(/[ODQ]/g, "0").replace(/[ILT]/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/G/g, "6").replace(/B/g, "8");
}
function Ut(e, t, n) {
	if (e?.documentNumber && t) {
		let r = e.checkDigits.find((e) => e.field === "documentNumber"), i = e.documentNumber.trim().toUpperCase(), a = t.trim().toUpperCase();
		if (r && !r.valid && i.length === a.length && Ht(i) === Ht(a)) return n.documentNumber = "MRZ+VIZ", a;
	}
	return $(e?.documentNumber, t, "documentNumber", n);
}
function Wt(e) {
	if (!e) return [];
	let t = [];
	for (let n of e) for (let e of n.paragraphs) for (let n of e.lines) {
		let e = "";
		if (n.words && n.words.length > 0) for (let t = 0; t < n.words.length; t++) {
			let r = n.words[t], i = (r.text || "").trim();
			if (i) {
				if (t > 0 && e.length > 0) {
					let a = n.words[t - 1], o = (a.text || "").trim(), s = r.bbox.x0 - a.bbox.x1, c = ((a.bbox.x1 - a.bbox.x0) / Math.max(1, o.length) + (r.bbox.x1 - r.bbox.x0) / Math.max(1, i.length)) / 2;
					/^[A-ZÄÖÜÑ]{2,}$/.test(o) && /^[A-ZÄÖÜÑ]{2,}$/.test(i) && s < c * 1.02 ? e += i : e += " " + i;
				} else e += i;
			}
		}
		else e = n.text.trim();
		let r = e.replace(/\s+/g, " ").trim();
		r && t.push({
			text: r,
			bbox: {
				x0: n.bbox.x0,
				y0: n.bbox.y0,
				x1: n.bbox.x1,
				y1: n.bbox.y1
			}
		});
	}
	t.sort((e, t) => e.bbox.y0 - t.bbox.y0 || e.bbox.x0 - t.bbox.x0);
	let n = [];
	for (let e = 0; e < t.length; e++) {
		let r = t[e];
		if (e + 1 < t.length) {
			let i = t[e + 1], a = Math.max(12, r.bbox.y1 - r.bbox.y0), o = Math.abs(r.bbox.y0 - i.bbox.y0) <= a * .45, s = i.bbox.x0 - r.bbox.x1;
			if (o && s >= -4 && s <= a * 1 && /^\d{1,2}\.\d{1,2}\.?$/.test(r.text) && /^(?:19|20)\d{2}$/.test(i.text)) {
				n.push({
					text: `${r.text} ${i.text}`,
					bbox: {
						x0: Math.min(r.bbox.x0, i.bbox.x0),
						y0: Math.min(r.bbox.y0, i.bbox.y0),
						x1: Math.max(r.bbox.x1, i.bbox.x1),
						y1: Math.max(r.bbox.y1, i.bbox.y1)
					}
				}), e++;
				continue;
			}
		}
		n.push(r);
	}
	return n;
}
function Gt(e, t, n, r, i) {
	let a = Math.max(0, Math.floor(t)), o = Math.max(0, Math.floor(n)), s = Math.min(e.width - 1, Math.ceil(r)), c = Math.min(e.height - 1, Math.ceil(i)), l = s, u = c, d = a, f = o;
	for (let t = o; t <= c; t++) {
		let n = t * e.width;
		for (let r = a; r <= s; r++) e.data[n + r] < 165 && (r < l && (l = r), r > d && (d = r), t < u && (u = t), t > f && (f = t));
	}
	if (d <= l || f <= u) return {
		empty: !0,
		gw: 0,
		gh: 0,
		isChevron: !1,
		isThinBar: !1,
		isNine: !1,
		isZee: !1
	};
	let p = d - l + 1, m = f - u + 1, h = [
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		]
	], g = [
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		]
	];
	for (let t = u; t <= f; t++) {
		let n = Math.min(2, Math.floor((t - u) / m * 3)), r = t * e.width;
		for (let t = l; t <= d; t++) {
			let i = Math.min(2, Math.floor((t - l) / p * 3));
			g[n][i]++, e.data[r + t] < 165 && h[n][i]++;
		}
	}
	let _ = (e, t) => h[e][t] / Math.max(1, g[e][t]), v = p >= 10 && m >= 14 && _(0, 0) <= .24 && _(2, 0) <= .24 && _(1, 0) >= .38 && _(1, 2) <= .24 && _(0, 2) >= .28 && _(2, 2) >= .28, y = _(0, 1) >= .35 && _(1, 1) >= .5 && _(2, 1) >= .35, b = _(0, 2) >= .55 && _(1, 2) >= .65 && _(2, 2) >= .55 && _(1, 0) <= .15 && _(2, 0) <= .15;
	return {
		empty: !1,
		gw: p,
		gh: m,
		isChevron: v,
		isThinBar: p <= m * .48 && (y || b),
		isNine: p >= m * .54 && _(1, 1) <= .5 && _(0, 0) >= .4 && _(0, 2) >= .4 && _(1, 2) >= .45 && _(2, 0) <= .25 && _(2, 2) <= .25 && _(2, 1) >= .4,
		isZee: p >= m * .48 && _(0, 1) >= .38 && _(0, 2) >= .38 && _(1, 0) <= .28 && _(1, 2) <= .22 && _(1, 1) >= .3 && _(2, 0) >= .38 && _(2, 1) >= .3 && _(2, 2) >= .25
	};
}
function Kt(e, t, n, r, i) {
	let a = Math.max(0, Math.floor(t)), o = Math.min(e.width - 1, Math.ceil(r)), s = Math.max(0, Math.floor(n)), c = Math.min(e.height - 1, Math.ceil(i)), l = o, u = a;
	for (let t = a; t <= o; t++) {
		let n = 0;
		for (let r = s; r <= c && !(e.data[r * e.width + t] < 165 && (n++, n >= 2)); r++);
		n >= 2 && (t < l && (l = t), t > u && (u = t));
	}
	return u <= l ? {
		inkX0: t,
		inkX1: r
	} : {
		inkX0: l,
		inkX1: u
	};
}
function qt(e, t) {
	if (!e || e.length === 0) return {
		symbolRepairedText: "",
		gridRepairedText: ""
	};
	let n = [];
	for (let t of e) for (let e of t.paragraphs) for (let t of e.lines) {
		let e = t.words.flatMap((e) => e.symbols || []), r = t.text.replace(/\s+/g, "").toUpperCase();
		r.length >= 22 && e.length >= 20 && n.push({
			text: r,
			bbox: t.bbox,
			syms: e
		});
	}
	if (n.length === 0) return {
		symbolRepairedText: "",
		gridRepairedText: ""
	};
	let r = [];
	for (let e of n) {
		let n = e.syms.map((e) => e.bbox.x1 - e.bbox.x0).filter((e) => e > 12).sort((e, t) => e - t), i = n[Math.floor(n.length / 2)] || 34, a = "";
		for (let n = 0; n < e.syms.length; n++) {
			let r = e.syms[n], o = r.bbox.x1 - r.bbox.x0, s = Gt(t, r.bbox.x0, r.bbox.y0, r.bbox.x1, r.bbox.y1);
			if (n + 1 < e.syms.length) {
				let c = e.syms[n + 1], l = c.bbox.x1 - c.bbox.x0, u = c.bbox.x1 - r.bbox.x0;
				if (c.bbox.x0 <= r.bbox.x1 + 2 && u <= i * 1.75) {
					let o = Gt(t, c.bbox.x0, c.bbox.y0, c.bbox.x1, c.bbox.y1);
					if (s.isChevron || o.isChevron) {
						a += "<";
						let t = Math.max(r.bbox.x1, c.bbox.x1);
						for (n++; n + 1 < e.syms.length && e.syms[n + 1].bbox.x0 <= t + 2 && e.syms[n + 1].bbox.x1 - r.bbox.x0 <= i * 1.75;) t = Math.max(t, e.syms[n + 1].bbox.x1), n++;
						continue;
					}
				}
				if (u <= i * 1.45 && (o < i * .8 || l < i * .48) && Gt(t, r.bbox.x0, Math.min(r.bbox.y0, c.bbox.y0), c.bbox.x1, Math.max(r.bbox.y1, c.bbox.y1)).isChevron) {
					a += "<", n++;
					continue;
				}
			}
			s.isChevron ? a += "<" : a += r.text.toUpperCase();
		}
		r.push(a);
	}
	let i = [];
	if (n.length >= 2) {
		let e = n.length - Math.min(3, n.length), a = n.slice(e), o = r.slice(e), s = a.map((e) => e.bbox.x1 - e.bbox.x0), c = Math.max(...s), l = Math.min(...s);
		if (c > 0 && l / c >= .85) {
			let e = o[0] ?? "", n = a[0], r = c / Math.max(18, n.bbox.y1 - n.bbox.y0), s = 30;
			a.length === 3 && r < 35 ? s = 30 : /^[PV]/.test(e) && r >= 39 || r >= 40 ? s = 44 : r >= 33.5 && a.length === 2 ? s = 36 : a.length === 2 && /^[PV]/.test(e) ? s = r >= 38 ? 44 : 36 : a.length === 2 && r >= 38 && (s = 44);
			let l = s === 30 && a.length === 3 ? a : a.slice(-2), u = s === 30 && a.length === 3 ? o : o.slice(-2);
			s === 44 && u.length === 2 && u.every((e) => e.length === 45) && (s = 45);
			for (let e of l) {
				let n = e.syms.map((e) => e.bbox.x1 - e.bbox.x0).filter((e) => e > 12).sort((e, t) => e - t), r = n[Math.floor(n.length / 2)] || 30, { inkX0: a, inkX1: o } = Kt(t, e.bbox.x0, e.bbox.y0, e.bbox.x1, e.bbox.y1), c = a + r / 2, l = (o - r / 2 - c) / (s - 1), u = "";
				for (let n = 0; n < s; n++) {
					let i = c + n * l, a = i - l * .36, o = i + l * .36, s = Gt(t, a, e.bbox.y0, o, e.bbox.y1);
					if (s.empty || s.isChevron) {
						u += "<";
						continue;
					}
					let d = e.syms.filter((e) => {
						let t = (e.bbox.x0 + e.bbox.x1) / 2;
						return t >= i - l * .45 && t <= i + l * .45;
					});
					d.length === 0 && (d = e.syms.filter((e) => {
						let t = (e.bbox.x0 + e.bbox.x1) / 2;
						return t >= i - l * .62 && t <= i + l * .62;
					})), d.sort((e, t) => Math.abs((e.bbox.x0 + e.bbox.x1) / 2 - i) - Math.abs((t.bbox.x0 + t.bbox.x1) / 2 - i));
					let f = d[0];
					if (f) {
						let e = f.bbox.x1 - f.bbox.x0, n = f.text.toUpperCase();
						Gt(t, f.bbox.x0, f.bbox.y0, f.bbox.x1, f.bbox.y1).isChevron ? u += "<" : e > r * 1.45 && s.isThinBar || (n === "T" || n === "K" || n === "L") && s.isThinBar || n === "T" && s.gw <= s.gh * .48 ? u += "1" : n === "L" && s.isZee ? u += "Z" : (n === "I" || n === "1" || n === "L") && s.isNine ? u += "9" : u += n;
					} else s.isThinBar ? u += "1" : u += "<";
				}
				i.push(u);
			}
		}
	}
	return {
		symbolRepairedText: r.join("\n"),
		gridRepairedText: i.join("\n")
	};
}
function Jt(e) {
	let t = e.rawLines.join("").split("<").length - 1, n = /^[A-Z]{1,3}$/.test(e.issuingCountry);
	return e.validCount * 100 + (e.allCheckDigitsValid ? 50 : 0) + (n ? 20 : 0) + (e.dateOfBirth ? 15 : 0) + (e.dateOfExpiry ? 15 : 0) + (e.surname ? 10 : 0) + (e.givenNames ? 10 : 0) + Math.min(t, 60);
}
function Yt(e) {
	return [
		e.surname,
		e.givenNames,
		e.fullName,
		e.documentNumber,
		e.dateOfBirth,
		e.dateOfExpiry,
		e.dateOfIssue,
		e.address,
		e.nationality,
		e.issuingAuthority,
		e.placeOfBirth
	].filter((e) => e !== null && String(e).trim() !== "").length;
}
function Xt(e, t, n, r) {
	let i = 0;
	e && (i += e.validCount * 120, e.allCheckDigitsValid && (i += 200), /^[PVIAC]/.test(e.documentCode) && (i += 60), e.dateOfBirth && (i += 35), e.dateOfExpiry && (i += 35), e.surname && (i += 30), e.givenNames && (i += 25), e.documentNumber && (i += 25));
	let a = Yt(t);
	i += a * 28, t.documentTypeHint && (i += 25), i += n * .8;
	let o = (r.match(/[A-Za-z]{3,}/g) || []).length;
	return i += Math.min(o, 30) * 1.5, i;
}
function Zt(e) {
	let t = (e % 360 + 360) % 360;
	return Math.round(t * 10) / 10;
}
function Qt(e, t, n, r) {
	if (n) return (i) => {
		n({
			stage: i.stage,
			progress: Math.min(99, Math.round(e + i.progress / 100 * t)),
			message: r ? `${r}: ${i.message}` : i.message
		});
	};
}
var $t = class {
	constructor(e = {}) {
		this.worker = null, this.workerLang = null, this.workerConfigKey = null, this.mrzWorker = null, this.mrzWorkerConfigKey = null, this.mrzOcrbFailed = !1, this.activeStageCallback = null, this.activeStage = "initializing_ocr", this.defaultWorkerConfig = { ...e };
	}
	mergeWorkerConfig(e) {
		return {
			workerPath: e.workerPath ?? this.defaultWorkerConfig.workerPath,
			corePath: e.corePath ?? this.defaultWorkerConfig.corePath,
			langPath: e.langPath ?? this.defaultWorkerConfig.langPath,
			workerBlobURL: e.workerBlobURL ?? this.defaultWorkerConfig.workerBlobURL,
			mrzModel: e.mrzModel ?? this.defaultWorkerConfig.mrzModel ?? "ocrb",
			mrzLanguage: e.mrzLanguage ?? this.defaultWorkerConfig.mrzLanguage,
			mrzLangPath: e.mrzLangPath ?? this.defaultWorkerConfig.mrzLangPath,
			mrzGzip: e.mrzGzip ?? this.defaultWorkerConfig.mrzGzip
		};
	}
	createLoggerOption(e) {
		return (t) => {
			if (this.activeStageCallback && t.status === "recognizing text") {
				if (e === "full" && this.activeStage !== "recognizing_full" || e === "mrz" && this.activeStage !== "recognizing_mrz") return;
				let n = this.activeStage === "recognizing_full" ? 25 : 65, r = this.activeStage === "recognizing_full" ? 35 : 25, i = Math.round(n + (t.progress || 0) * r);
				this.activeStageCallback({
					stage: this.activeStage,
					progress: i,
					message: this.activeStage === "recognizing_full" ? "Reading document text & visual inspection zone…" : "Running dedicated OCR-B MRZ strip verification…"
				});
			}
		};
	}
	async ensureWorker(e, t, n) {
		this.activeStageCallback = n ?? null;
		let r = this.mergeWorkerConfig(t), i = JSON.stringify({
			workerPath: r.workerPath,
			corePath: r.corePath,
			langPath: r.langPath,
			workerBlobURL: r.workerBlobURL
		});
		if (this.worker && this.workerLang === e && this.workerConfigKey === i) return this.worker;
		this.worker &&= (await this.worker.terminate(), null), this.activeStage = "initializing_ocr", n?.({
			stage: "initializing_ocr",
			progress: 12,
			message: "Initializing client-side Tesseract OCR engine…"
		});
		let a = { logger: this.createLoggerOption("full") };
		r.workerPath && (a.workerPath = r.workerPath), r.corePath && (a.corePath = r.corePath), r.langPath && (a.langPath = r.langPath), r.workerBlobURL !== void 0 && (a.workerBlobURL = r.workerBlobURL);
		let o = await (0, q.createWorker)(e, 1, a, {
			load_system_dawg: "0",
			load_freq_dawg: "0"
		});
		return this.worker = o, this.workerLang = e, this.workerConfigKey = i, o;
	}
	async ensureMrzWorker(e, t, n) {
		this.activeStageCallback = n ?? null;
		let r = this.mergeWorkerConfig(t);
		if ((r.mrzModel ?? "ocrb") === "standard") return {
			worker: e,
			modelUsed: "standard"
		};
		let i = r.mrzLanguage ?? Lt, a = r.mrzLangPath ?? Rt, o = r.mrzGzip ?? !1, s = JSON.stringify({
			workerPath: r.workerPath,
			corePath: r.corePath,
			workerBlobURL: r.workerBlobURL,
			mrzLang: i,
			mrzLangPath: a,
			mrzGzip: o
		});
		if (this.mrzWorker && this.mrzWorkerConfigKey === s) return {
			worker: this.mrzWorker,
			modelUsed: "ocrb"
		};
		if (this.mrzOcrbFailed && this.mrzWorkerConfigKey === s) return {
			worker: e,
			modelUsed: "standard"
		};
		this.mrzWorker &&= (await this.mrzWorker.terminate(), null);
		try {
			this.activeStage = "initializing_ocr", n?.({
				stage: "initializing_ocr",
				progress: 14,
				message: "Loading specialized OCR-B MRZ recognition model…"
			});
			let e = {
				langPath: a,
				gzip: o,
				logger: this.createLoggerOption("mrz")
			};
			r.workerPath && (e.workerPath = r.workerPath), r.corePath && (e.corePath = r.corePath), r.workerBlobURL !== void 0 && (e.workerBlobURL = r.workerBlobURL);
			let t = await (0, q.createWorker)(i, 1, e, {
				load_system_dawg: "0",
				load_freq_dawg: "0"
			});
			return this.mrzWorker = t, this.mrzWorkerConfigKey = s, this.mrzOcrbFailed = !1, {
				worker: t,
				modelUsed: "ocrb"
			};
		} catch {
			return this.mrzWorkerConfigKey = s, this.mrzOcrbFailed = !0, {
				worker: e,
				modelUsed: "standard"
			};
		}
	}
	async runOrientationPass(e, t, n, r, i, a, o, s, c = !0) {
		let l = await pe(e, {
			preprocess: a,
			rotation: r,
			deskewDegrees: i
		});
		c && (this.activeStage = "recognizing_full", s?.({
			stage: "recognizing_full",
			progress: 25,
			message: "Reading document text & visual inspection zone…"
		})), await t.setParameters({
			tessedit_pageseg_mode: q.PSM.SPARSE_TEXT,
			tessedit_char_whitelist: ""
		});
		let u = a ? l.enhancedDataUrl : l.originalDataUrl, d = await t.recognize(u, {}, { blocks: !0 }), f = d.data.text || "", p = d.data.confidence || 0;
		if (f.trim().split(/\r?\n/).filter(Boolean).length < 2) {
			await t.setParameters({
				tessedit_pageseg_mode: q.PSM.AUTO,
				tessedit_char_whitelist: ""
			});
			let e = await t.recognize(u, {}, { blocks: !0 });
			(e.data.text || "").trim().length > f.trim().length && (d = e, f = e.data.text || "", p = e.data.confidence || 0);
		}
		let m = Wt(d.data.blocks), h = m.length > 0 ? m.map((e) => e.text).join("\n") : f, g = [], _ = Me(f);
		_ && g.push(_);
		let v = "", y = n.mrzModel ?? this.defaultWorkerConfig.mrzModel ?? "ocrb";
		if (o) {
			let e = await this.ensureMrzWorker(t, n, s), r = e.worker;
			y = e.modelUsed, c && (this.activeStage = "recognizing_mrz", s?.({
				stage: "recognizing_mrz",
				progress: 65,
				message: y === "ocrb" ? "Running dedicated OCR-B MRZ strip verification…" : "Running high-contrast MRZ strip verification…"
			})), await r.setParameters({
				tessedit_pageseg_mode: q.PSM.SINGLE_BLOCK,
				tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<"
			});
			let i = async (e, t) => {
				let n = await r.recognize(e, {}, { blocks: !0 }), i = (n.data.text || "").trim();
				i && !v && (v = i);
				let a = Me(i);
				a && g.push(a);
				let o = qt(n.data.blocks, t);
				if (o.symbolRepairedText) {
					let e = Me(o.symbolRepairedText);
					e && g.push(e);
				}
				if (o.gridRepairedText) {
					let e = Me(o.gridRepairedText);
					e && (g.push(e), v = o.gridRepairedText);
				}
			};
			await i(l.mrzCropDataUrl, l.mrzGrayscale), g.some((e) => e.allCheckDigitsValid) || (c && s?.({
				stage: "recognizing_mrz",
				progress: 80,
				message: "Isolating lower passport MRZ band…"
			}), await i(l.mrzTightCropDataUrl, l.mrzTightGrayscale));
		}
		let b = null;
		g.length > 0 && (g.sort((e, t) => Jt(t) - Jt(e)), b = g[0]);
		let x = It(h, m), S = Yt(x), C = Xt(b, x, p, h), w = b !== null && (b.allCheckDigitsValid || b.validCount >= 2 || b.validCount >= 1 && !!(b.surname || b.documentNumber) && p >= 48) || b === null && p >= 65 && S >= 4;
		return {
			coarse: r,
			preprocessed: l,
			cleanedFullText: h,
			vizLineBoxes: m,
			vizData: x,
			mrzData: b,
			mrzRawText: v,
			mrzModelUsed: y,
			confidence: p,
			probeScore: C,
			isConfidentUpright: w
		};
	}
	async runLightweightProbe(e, t, n, r, i) {
		let a = await pe(e, {
			preprocess: i,
			rotation: n,
			deskewDegrees: r
		});
		await t.setParameters({
			tessedit_pageseg_mode: q.PSM.SPARSE_TEXT,
			tessedit_char_whitelist: ""
		});
		let o = i ? a.enhancedDataUrl : a.originalDataUrl, s = await t.recognize(o, {}, { blocks: !0 }), c = s.data.text || "", l = s.data.confidence || 0, u = Wt(s.data.blocks), d = u.length > 0 ? u.map((e) => e.text).join("\n") : c, f = It(d, u);
		return Xt(Me(c), f, l, d);
	}
	async scan(e, t = {}) {
		let n = performance.now(), { language: r = "eng", preprocess: i = !0, enhanceMrzPass: a = !0, perspectiveCorrection: o = !0, corners: s, rotation: c = 0, deskewDegrees: l = 0, includeQualityReport: u = !0, enforceQualityGate: d = !1, qualityGateOptions: f, includePreviews: p = !0, workerPath: m, corePath: h, langPath: g, workerBlobURL: _, mrzModel: v, mrzLanguage: y, mrzLangPath: b, mrzGzip: x, onProgress: S } = t, C = {
			workerPath: m,
			corePath: h,
			langPath: g,
			workerBlobURL: _,
			mrzModel: v,
			mrzLanguage: y,
			mrzLangPath: b,
			mrzGzip: x
		}, w = t.autoRotate === void 0 ? c === 0 && l === 0 : t.autoRotate;
		S?.({
			stage: "preprocessing",
			progress: 4,
			message: o || s ? "Decoding document & checking 4-corner perspective…" : w ? "Decoding document & analyzing orientation…" : "Preprocessing image & isolating MRZ region…"
		});
		let T = await ce(e), E = T, D;
		if (s) {
			S?.({
				stage: "detecting_perspective",
				progress: 9,
				message: "Applying 4-corner perspective rectification…"
			});
			let e = Qe([
				s.topLeft,
				s.topRight,
				s.bottomRight,
				s.bottomLeft
			]);
			E = ut(T, e);
			let t = Math.abs(e.topLeft.x * e.topRight.y - e.topRight.x * e.topLeft.y + (e.topRight.x * e.bottomRight.y - e.bottomRight.x * e.topRight.y) + (e.bottomRight.x * e.bottomLeft.y - e.bottomLeft.x * e.bottomRight.y) + (e.bottomLeft.x * e.topLeft.y - e.topLeft.x * e.bottomLeft.y)) / 2;
			D = {
				applied: !0,
				autoDetected: !1,
				corners: e,
				sourceQuadAreaRatio: Math.round(t * 1e3) / 1e3
			};
		} else if (o) {
			S?.({
				stage: "detecting_perspective",
				progress: 9,
				message: "Detecting document borders for perspective correction…"
			});
			let e = ct(T);
			e ? (E = ut(T, e.corners), D = e) : D = {
				applied: !1,
				autoDetected: !0,
				corners: {
					topLeft: {
						x: 0,
						y: 0
					},
					topRight: {
						x: 1,
						y: 0
					},
					bottomRight: {
						x: 1,
						y: 1
					},
					bottomLeft: {
						x: 0,
						y: 1
					}
				},
				sourceQuadAreaRatio: 1
			};
		}
		let O;
		if ((u || d) && (d && S?.({
			stage: "quality_check",
			progress: 11,
			message: "Evaluating sharpness, glare & exposure quality gate…"
		}), O = await vt(E, f), d && !O.passed)) throw new dt(O);
		let k = await this.ensureWorker(r, C, S), A = l, j = [c];
		if (w) {
			S?.({
				stage: "detecting_orientation",
				progress: 16,
				message: "Detecting document rotation & skew angle…"
			});
			let e = le(E, 400), t = Le(e.data, e.width, e.height);
			A = t.deskewDegrees, j = t.rankedCoarseRotations;
		}
		let M = await this.runOrientationPass(E, k, C, j[0], A, i, a, S, !0);
		if (w && !M.isConfidentUpright) {
			let e = M.coarse, t = M.probeScore;
			for (let n = 1; n < j.length; n++) {
				let r = j[n];
				S?.({
					stage: "detecting_orientation",
					progress: 82 + n * 3,
					message: `Checking ${r}° orientation alignment…`
				});
				let a = await this.runLightweightProbe(E, k, r, A, i);
				if (a > t && (t = a, e = r, a >= 240)) break;
			}
			e !== M.coarse && (M = await this.runOrientationPass(E, k, C, e, A, i, a, S, !1));
		}
		S?.({
			stage: "parsing",
			progress: 92,
			message: "Extracting personal fields & verifying ICAO 9303 check digits…"
		});
		let { preprocessed: N, cleanedFullText: P, vizData: F, mrzData: I, mrzRawText: L, mrzModelUsed: R, confidence: z } = M, B = {}, V = $(I?.issuingCountry, F.issuingCountry, "issuingCountry", B), H = $(I?.nationality, F.nationality, "nationality", B), U = $(I?.surname, F.surname, "surname", B), W = I?.surnames && I.surnames.length > 0 ? I.surnames : F.surnames.length > 0 ? F.surnames : U ? U.split(/\s+/).filter(Boolean) : [], ee = $(I?.givenNames, F.givenNames, "givenNames", B), te = I?.givenNamesList && I.givenNamesList.length > 0 ? I.givenNamesList : ee ? ee.split(/\s+/).filter(Boolean) : [], ne = $(I && (I.givenNames || I.surname) ? [I.givenNames, I.surname].filter(Boolean).join(" ") : null, F.fullName, "fullName", B), re = Ut(I, F.documentNumber, B), G = $(I && (I.optionalData1 || I.optionalData2) ? [I.optionalData1, I.optionalData2].filter(Boolean).join(" ") : null, F.personalNumber, "personalNumber", B), K = $(I?.dateOfBirth, F.dateOfBirth, "dateOfBirth", B), ie = $(I?.dateOfExpiry, F.dateOfExpiry, "dateOfExpiry", B), ae = $(null, F.dateOfIssue, "dateOfIssue", B), q = I?.sex && I.sex !== "Unspecified" ? I.sex : F.sex ?? "Unspecified";
		I?.sex && I.sex !== "Unspecified" && F.sex ? B.sex = "MRZ+VIZ" : I?.sex && I.sex !== "Unspecified" ? B.sex = "MRZ" : F.sex && (B.sex = "VIZ");
		let oe = $(null, F.placeOfBirth, "placeOfBirth", B), ue = $(null, F.address, "address", B), de = $(null, F.parents, "parents", B), J = $(null, F.issuingAuthority, "issuingAuthority", B), fe = $(null, F.licenseClass, "licenseClass", B), pe = $(null, F.restrictions, "restrictions", B), me = $(null, F.endorsements, "endorsements", B), he = $(null, F.height, "height", B), ge = $(null, F.eyeColor, "eyeColor", B), _e = $(null, F.hairColor, "hairColor", B), ve = zt(K);
		ve !== null && (B.age = "COMPUTED");
		let Y = Bt(ie);
		Y !== null && (B.isExpired = "COMPUTED");
		let X = Vt(I, F.documentTypeHint), ye = se(V), be = se(H) ?? H, xe = Math.round(performance.now() - n), Se = {
			coarseDegrees: M.coarse,
			deskewDegrees: A,
			totalDegrees: Zt(M.coarse + A),
			autoDetected: w
		};
		return S?.({
			stage: "complete",
			progress: 100,
			message: "Scan complete"
		}), {
			documentType: X,
			documentFormat: I ? I.format : "VISUAL_ONLY",
			issuingCountry: V,
			issuingCountryName: ye,
			documentNumber: re,
			personalNumber: G,
			surname: U,
			surnames: W,
			givenNames: ee,
			givenNamesList: te,
			fullName: ne,
			nationality: H,
			nationalityName: be,
			dateOfBirth: K,
			age: ve,
			sex: q,
			dateOfIssue: ae,
			dateOfExpiry: ie,
			isExpired: Y,
			placeOfBirth: oe,
			address: ue,
			parents: de,
			issuingAuthority: J,
			licenseClass: fe,
			restrictions: pe,
			endorsements: me,
			height: he,
			eyeColor: ge,
			hairColor: _e,
			mrz: I,
			mrzModel: R,
			unmappedFields: F.unmappedKeyValues,
			fieldSources: B,
			rawOcrText: P.trim(),
			rawMrzText: L,
			confidence: Math.round(z),
			processingTimeMs: xe,
			sourceDimensions: {
				width: N.width,
				height: N.height
			},
			orientation: Se,
			perspective: D,
			quality: u ? O : void 0,
			previews: p ? {
				originalDataUrl: N.originalDataUrl,
				enhancedDataUrl: N.enhancedDataUrl,
				mrzCropDataUrl: N.mrzCropDataUrl
			} : void 0
		};
	}
	async scanPair(e, t, n = {}) {
		let { frontOptions: r, backOptions: i, onProgress: a, ...o } = n, s = await this.scan(e, {
			...o,
			...r,
			onProgress: Qt(0, 48, a, "Front")
		}), c = await this.scan(t, {
			...o,
			...i,
			onProgress: Qt(50, 46, a, "Back")
		});
		a?.({
			stage: "parsing",
			progress: 98,
			message: "Merging front & back fields and verifying consistency…"
		});
		let l = qe(s, c);
		return a?.({
			stage: "complete",
			progress: 100,
			message: "Two-sided scan complete"
		}), l;
	}
	async terminate() {
		this.worker && (await this.worker.terminate(), this.worker = null, this.workerLang = null, this.workerConfigKey = null), this.mrzWorker && (await this.mrzWorker.terminate(), this.mrzWorker = null, this.mrzWorkerConfigKey = null), this.mrzOcrbFailed = !1;
	}
};
async function en(e, t = {}) {
	let n = new $t({
		workerPath: t.workerPath,
		corePath: t.corePath,
		langPath: t.langPath,
		workerBlobURL: t.workerBlobURL,
		mrzModel: t.mrzModel,
		mrzLanguage: t.mrzLanguage,
		mrzLangPath: t.mrzLangPath,
		mrzGzip: t.mrzGzip
	});
	try {
		return await n.scan(e, t);
	} finally {
		await n.terminate();
	}
}
async function tn(e, t, n = {}) {
	let r = new $t({
		workerPath: n.workerPath,
		corePath: n.corePath,
		langPath: n.langPath,
		workerBlobURL: n.workerBlobURL,
		mrzModel: n.mrzModel,
		mrzLanguage: n.mrzLanguage,
		mrzLangPath: n.mrzLangPath,
		mrzGzip: n.mrzGzip
	});
	try {
		return await r.scanPair(e, t, n);
	} finally {
		await r.terminate();
	}
}
export { yt as CameraAutoCapture, $t as DocumentScanner, oe as ICAO_COUNTRY_CODES, dt as QualityGateError, u as SCANNER_VERSION, Le as analyzeDocumentOrientation, _t as assessCanvasQuality, vt as assessImageQuality, _e as computeCheckDigit, ct as detectDocumentQuad, ce as loadImageElement, qe as mergeDocumentSides, St as normalizeVisualDate, Qe as orderQuadCorners, Me as parseMrzFromText, It as parseVizText, pe as preprocessDocumentImage, se as resolveCountryName, le as sampleDownscaledGrayscale, en as scanDocumentImage, tn as scanDocumentPair, ut as warpDocumentPerspective, bt as watchCameraAutoCapture };

//# sourceMappingURL=docscan-ocr.v0.0.3.es.js.map