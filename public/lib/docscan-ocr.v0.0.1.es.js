/* DocScan OCR v0.0.1 | Client-Side Browser Passport & ID Scanner */
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
}), u = "0.0.1", d = /* @__PURE__ */ a(((e, t) => {
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
})), ee = /* @__PURE__ */ a(((e, t) => {
	var n = (B(), c(y).default).version;
	t.exports = {
		...V(),
		workerPath: `https://cdn.jsdelivr.net/npm/tesseract.js@v${n}/dist/worker.min.js`
	};
})), te = /* @__PURE__ */ a(((e, t) => {
	t.exports = ({ workerPath: e, workerBlobURL: t }) => {
		let n;
		if (Blob && URL && t) {
			let t = new Blob([`importScripts("${e}");`], { type: "application/javascript" });
			n = new Worker(URL.createObjectURL(t));
		} else n = new Worker(e);
		return n;
	};
})), ne = /* @__PURE__ */ a(((e, t) => {
	t.exports = (e) => {
		e.terminate();
	};
})), re = /* @__PURE__ */ a(((e, t) => {
	t.exports = (e, t) => {
		e.onmessage = ({ data: e }) => {
			t(e);
		};
	};
})), ie = /* @__PURE__ */ a(((e, t) => {
	t.exports = async (e, t) => {
		e.postMessage(t);
	};
})), H = /* @__PURE__ */ a(((e, t) => {
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
})), ae = /* @__PURE__ */ a(((e, t) => {
	t.exports = {
		defaultOptions: ee(),
		spawnWorker: te(),
		terminateWorker: ne(),
		onMessage: re(),
		send: ie(),
		loadImage: H()
	};
})), oe = /* @__PURE__ */ a(((e, t) => {
	var n = _(), r = p(), { log: i } = m(), a = f(), o = v(), { defaultOptions: s, spawnWorker: c, terminateWorker: l, onMessage: u, loadImage: d, send: h } = ae(), g = 0;
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
		})), ee = async (e, t) => {
			if (w) throw Error("`worker.detect` requires Legacy model, which was not loaded.");
			return A(r({
				id: t,
				action: "detect",
				payload: { image: await d(e) }
			}));
		}, te = async () => (k !== null && (l(k), k = null), Promise.resolve());
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
		let ne = {
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
			detect: ee,
			terminate: te
		};
		return M().then(() => L(e)).then(() => R(e, t, p)).then(() => E(ne)).catch(() => {}), D;
	};
})), se = /* @__PURE__ */ a(((e, t) => {
	var n = oe();
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
})), ce = /* @__PURE__ */ a(((e, t) => {
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
})), le = /* @__PURE__ */ a(((e, t) => {
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
})), U = (/* @__PURE__ */ a(((e, t) => {
	d();
	var n = h(), r = oe(), i = se(), a = ce(), o = v(), s = le(), { setLogging: c } = m();
	t.exports = {
		languages: a,
		OEM: o,
		PSM: s,
		createScheduler: n,
		createWorker: r,
		setLogging: c,
		...i
	};
})))(), W = {
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
function ue(e) {
	if (!e) return null;
	let t = e.trim().replace(/<+$/g, "").toUpperCase();
	return t ? W[t] ? W[t] : t === "D" ? "Germany" : W[e.trim().toUpperCase()] ?? null : null;
}
// src/scanner/imagePreprocessor.ts
function de(e) {
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
function fe(e, t = 400) {
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
function pe(e, t, n) {
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
function me(e, t, n, r, i) {
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
function he(e) {
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
function ge(e, t, n, r, i, a) {
	let o = Math.round(t * .018), s = Math.max(1, t - o * 2), c = Math.round(n * r), l = Math.max(1, Math.round(n * i) - c), u = s < 1500 ? 1800 / s : 1.15, d = Math.round(s * u), f = Math.round(l * u), p = d + 64, m = f + 64, h = document.createElement("canvas");
	h.width = p, h.height = m;
	let g = h.getContext("2d", { willReadFrequently: !0 });
	if (!g) throw Error("2D canvas context unavailable");
	g.fillStyle = "#ffffff", g.fillRect(0, 0, p, m), g.imageSmoothingEnabled = !0, g.imageSmoothingQuality = "high", g.drawImage(e, o, c, s, l, 32, 32, d, f);
	let _ = me(g, p, m, 32, a);
	return {
		dataUrl: h.toDataURL("image/png"),
		grayscale: _
	};
}
async function _e(e, t = {}) {
	let { preprocess: n = !0, rotation: r = 0, deskewDegrees: i = 0 } = t, a = e instanceof HTMLCanvasElement ? e : await de(e), o = a instanceof HTMLImageElement && a.naturalWidth || a.width, s = a instanceof HTMLImageElement && a.naturalHeight || a.height, c = r + i, l = Math.abs(i) >= .1, u, d;
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
	m.drawImage(a, -h / 2, -g / 2, h, g), m.restore(), l && (p = he(p));
	let _ = p.width, v = p.height, y = p.toDataURL("image/png"), b = document.createElement("canvas");
	b.width = _, b.height = v;
	let x = b.getContext("2d", { willReadFrequently: !0 });
	if (!x) throw Error("2D canvas context unavailable");
	x.drawImage(p, 0, 0), n && pe(x, _, v);
	let S = b.toDataURL("image/png"), C = ge(p, _, v, .6, .982, n), w = ge(p, _, v, .7, .982, n);
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
var ve = [
	7,
	3,
	1
], ye = {
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
}, be = {
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
function G(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = ye[e[n]] ?? 0;
		t += r * ve[n % 3];
	}
	return String(t % 10);
}
function xe(e) {
	let t = e.toUpperCase();
	return /[A-Z0-9<]/.test(t) ? t : "<";
}
function K(e) {
	return e.replace(/O/g, "0").replace(/Q/g, "0").replace(/D/g, "0").replace(/I/g, "1").replace(/L/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/G/g, "6").replace(/B/g, "8");
}
function q(e) {
	return e.replace(/0/g, "O").replace(/1/g, "I").replace(/2/g, "Z").replace(/5/g, "S").replace(/6/g, "G").replace(/8/g, "B");
}
function Se(e, t) {
	let n = K(t);
	if (!/^\d$/.test(n) || G(e) === n) return e;
	let r = e.replace(/[ODQ]/g, "0");
	if (G(r) === n) return r;
	let i = (e) => e.replace(/[ODQ]/g, "0").replace(/[IL]/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/G/g, "6").replace(/B/g, "8"), a = e.match(/^([A-Z]{1,3})(.*)$/);
	if (a) {
		let e = a[1] + i(a[2]);
		if (G(e) === n) return e;
	}
	let o = i(e);
	if (G(o) === n) return o;
	let s = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let n = be[e[t]];
		n && s.push({
			idx: t,
			reps: n
		});
	}
	for (let t of s) for (let r of t.reps) {
		let i = e.slice(0, t.idx) + r + e.slice(t.idx + 1);
		if (G(i) === n) return i;
	}
	for (let t = 0; t < s.length; t++) for (let r = t + 1; r < s.length; r++) {
		let i = s[t], a = s[r];
		for (let t of i.reps) for (let r of a.reps) {
			let o = e.split("");
			o[i.idx] = t, o[a.idx] = r;
			let s = o.join("");
			if (G(s) === n) return s;
		}
	}
	return e;
}
function Ce(e, t) {
	let n = K(e);
	if (!/^\d{6}$/.test(n)) return null;
	let r = parseInt(n.slice(0, 2), 10), i = parseInt(n.slice(2, 4), 10), a = parseInt(n.slice(4, 6), 10);
	if (i < 1 || i > 12 || a < 1 || a > 31) return null;
	let o = (/* @__PURE__ */ new Date()).getFullYear(), s = o % 100, c = Math.floor(o / 100) * 100, l;
	return l = t === "birth" ? r > s ? c - 100 + r : c + r : r <= s + 50 ? c + r : c - 100 + r, `${l}-${String(i).padStart(2, "0")}-${String(a).padStart(2, "0")}`;
}
function we(e) {
	let t = e.replace(/<+$/g, ""), n = "";
	for (; t !== n;) n = t, t = t.replace(/(?:<+[KL]{2,}|<<[KL])$/g, "").replace(/<+$/g, "");
	return t;
}
function Te(e) {
	let t = we(e).split("<<"), n = t[0] ?? "", r = t.slice(1).join("<"), i = (e) => q(e).split(/<+/).map((e) => e.trim()).filter(Boolean), a = i(n), o = i(r);
	return {
		surname: a.join(" "),
		surnames: a,
		givenNames: o.join(" "),
		givenNamesList: o
	};
}
function Ee(e) {
	let t = e.toUpperCase();
	return t === "M" ? "M" : t === "F" ? "F" : t === "X" ? "X" : "Unspecified";
}
function De(e) {
	let t = e.trim();
	return !!(!t || /[a-z]{3,}/.test(t) && !t.includes("<") || /[/()]/.test(t) && !t.includes("<"));
}
function Oe(e) {
	return e.replace(/\s+/g, "").split("").map(xe).join("");
}
function ke(e) {
	if (e.length < 26 || !/^[A-Z0-9<]+$/.test(e) || e.startsWith("<")) return !1;
	let t = (e.match(/</g) || []).length, n = (e.match(/\d/g) || []).length;
	return t >= 2 || n >= 4 && e.length >= 28;
}
function J(e, t) {
	return e.length === t ? e : e.length > t ? e.slice(0, t) : e.padEnd(t, "<");
}
function Y(e, t, n, r) {
	let i = K(r), a = G(n);
	return {
		label: e,
		field: t,
		expected: a,
		actual: i,
		valid: i === a
	};
}
function Ae(e, t) {
	return t === "D" && e.startsWith("D") && e.length === 2 ? "D" : e;
}
function je(e, t, n = !1) {
	let r = J(e, 44), i = J(t, 44), a = q(r.slice(0, 2)).replace(/</g, ""), o = q(r.slice(2, 5)).replace(/</g, ""), { surname: s, surnames: c, givenNames: l, givenNamesList: u } = Te(r.slice(5, 44)), d = i.slice(9, 10), f = Se(i.slice(0, 9), d), p = q(i.slice(10, 13)).replace(/</g, "");
	o = Ae(o, p), !o && p && (o = p);
	let m = K(i.slice(13, 19)), h = i.slice(19, 20), g = Ee(i.slice(20, 21)), _ = K(i.slice(21, 27)), v = i.slice(27, 28), y = n ? i.slice(28, 44) : i.slice(28, 42), b = n ? "" : i.slice(42, 43), x = n ? "" : i.slice(43, 44), S = [
		Y("Document Number", "documentNumber", f, d),
		Y("Date of Birth", "dateOfBirth", m, h),
		Y("Date of Expiry", "dateOfExpiry", _, v)
	];
	if (!n) {
		y.replace(/</g, "").length > 0 && S.push(Y("Personal Number", "optionalData1", y, b));
		let e = f + d + m + h + _ + v + y + b;
		S.push(Y("Composite Check", "composite", e, x));
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
		dateOfBirth: Ce(m, "birth"),
		rawDateOfBirth: m,
		sex: g,
		dateOfExpiry: Ce(_, "expiry"),
		rawDateOfExpiry: _,
		optionalData1: y.replace(/</g, ""),
		optionalData2: "",
		checkDigits: S,
		allCheckDigitsValid: C === S.length,
		validCount: C,
		totalChecks: S.length
	};
}
function Me(e, t, n) {
	let r = J(e, 30), i = J(t, 30), a = J(n, 30), o = q(r.slice(0, 2)).replace(/</g, ""), s = q(r.slice(2, 5)).replace(/</g, ""), c = r.slice(14, 15), l = Se(r.slice(5, 14), c), u = r.slice(15, 30), d = K(i.slice(0, 6)), f = i.slice(6, 7), p = Ee(i.slice(7, 8)), m = K(i.slice(8, 14)), h = i.slice(14, 15), g = q(i.slice(15, 18)).replace(/</g, "");
	s = Ae(s, g), !s && g && (s = g);
	let _ = i.slice(18, 29), v = i.slice(29, 30), { surname: y, surnames: b, givenNames: x, givenNamesList: S } = Te(a), C = r.slice(0, 5) + l + c + u, w = d + f + i.slice(7, 8) + m + h + i.slice(15, 30), T = l + c + u + d + f + m + h + _, E = [
		Y("Document Number", "documentNumber", l, c),
		Y("Date of Birth", "dateOfBirth", d, f),
		Y("Date of Expiry", "dateOfExpiry", m, h),
		Y("Composite Check", "composite", T, v)
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
		dateOfBirth: Ce(d, "birth"),
		rawDateOfBirth: d,
		sex: p,
		dateOfExpiry: Ce(m, "expiry"),
		rawDateOfExpiry: m,
		optionalData1: u.replace(/</g, ""),
		optionalData2: _.replace(/</g, ""),
		checkDigits: E,
		allCheckDigitsValid: D === E.length,
		validCount: D,
		totalChecks: E.length
	};
}
function Ne(e, t, n = !1) {
	let r = J(e, 36), i = J(t, 36), a = q(r.slice(0, 2)).replace(/</g, ""), o = q(r.slice(2, 5)).replace(/</g, ""), { surname: s, surnames: c, givenNames: l, givenNamesList: u } = Te(r.slice(5, 36)), d = i.slice(9, 10), f = Se(i.slice(0, 9), d), p = q(i.slice(10, 13)).replace(/</g, "");
	o = Ae(o, p), !o && p && (o = p);
	let m = K(i.slice(13, 19)), h = i.slice(19, 20), g = Ee(i.slice(20, 21)), _ = K(i.slice(21, 27)), v = i.slice(27, 28), y = n ? i.slice(28, 36) : i.slice(28, 35), b = n ? "" : i.slice(35, 36), x = [
		Y("Document Number", "documentNumber", f, d),
		Y("Date of Birth", "dateOfBirth", m, h),
		Y("Date of Expiry", "dateOfExpiry", _, v)
	];
	if (!n) {
		let e = f + d + m + h + _ + v + y;
		x.push(Y("Composite Check", "composite", e, b));
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
		dateOfBirth: Ce(m, "birth"),
		rawDateOfBirth: m,
		sex: g,
		dateOfExpiry: Ce(_, "expiry"),
		rawDateOfExpiry: _,
		optionalData1: y.replace(/</g, ""),
		optionalData2: "",
		checkDigits: x,
		allCheckDigitsValid: S === x.length,
		validCount: S,
		totalChecks: x.length
	};
}
function Pe(e) {
	let t = e.split(/\r?\n/).filter((e) => !De(e)).map(Oe).filter(ke);
	if (t.length < 2) return null;
	let n = [];
	for (let e = 0; e <= t.length - 3; e++) {
		let r = t[e], i = t[e + 1], a = t[e + 2], o = (r.length + i.length + a.length) / 3;
		o >= 27 && o <= 35 && /^[IAC]/.test(r) && n.push(Me(r, i, a));
	}
	for (let e = 0; e <= t.length - 2; e++) {
		let r = t[e], i = t[e + 1], a = Math.max(r.length, i.length), o = Math.min(r.length, i.length);
		if (a >= 40 && o >= 38 && /^[PV]/.test(r)) {
			let e = r.startsWith("V");
			n.push(je(r, i, e));
		} else if (o >= 33 && a <= 39 && /^[PVIAC]/.test(r) && !/^[IAC]/.test(r)) {
			let e = r.startsWith("V");
			n.push(Ne(r, i, e));
		}
	}
	if (n.length === 0) {
		if (t.length >= 3 && t[t.length - 3].length <= 36 && /^[IAC]/.test(t[t.length - 3])) n.push(Me(t[t.length - 3], t[t.length - 2], t[t.length - 1]));
		else {
			let e = t[t.length - 2], r = t[t.length - 1];
			/^[PVIAC]/.test(e) && (Math.max(e.length, r.length) >= 39 ? n.push(je(e, r, e.startsWith("V"))) : n.push(Ne(e, r, e.startsWith("V"))));
		}
	}
	return n.length === 0 ? null : (n.sort((e, t) => {
		let n = e.validCount * 10 + (e.dateOfBirth ? 3 : 0) + (e.dateOfExpiry ? 3 : 0) + (e.surname ? 2 : 0) + (e.givenNames ? 2 : 0);
		return t.validCount * 10 + (t.dateOfBirth ? 3 : 0) + (t.dateOfExpiry ? 3 : 0) + (t.surname ? 2 : 0) + (t.givenNames ? 2 : 0) - n;
	}), n[0]);
}
// src/scanner/orientation.ts
function Fe(e, t, n) {
	let r = t + 1, i = new Float64Array(r * (n + 1));
	for (let a = 1; a <= n; a++) {
		let n = 0, o = (a - 1) * t, s = a * r, c = (a - 1) * r;
		for (let r = 1; r <= t; r++) n += e[o + r - 1], i[s + r] = i[c + r] + n;
	}
	return i;
}
function Ie(e, t, n) {
	let r = Fe(e, t, n), i = t + 1, a = Math.max(3, Math.round(Math.min(t, n) / 70)), o = Math.max(2, Math.floor(t * .025)), s = Math.max(2, Math.floor(n * .025)), c = t / 2, l = n / 2, u = [];
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
function Le(e, t, n, r) {
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
function Re(e, t, n, r) {
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
function ze(e, t, n) {
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
	let r = Ie(e, t, n);
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
		let { hScore: t, vScore: n } = Le(r, e, a, i);
		t > s && (s = t, o = e), n > l && (l = n, c = e);
	}
	let u = s >= l ? o : c, d = o, f = s, p = c, m = l;
	for (let e = -1.8; e <= 1.801; e += .2) {
		let t = u + e;
		if (t < -45 || t > 45) continue;
		let { hScore: n, vScore: o } = Le(r, t, a, i);
		n > f && (f = n, d = t), o > m && (m = o, p = t);
	}
	let h = Math.round(-(f >= m ? d : p) * 10) / 10;
	Math.abs(h) < .7 && (h = 0);
	let g = Math.max(f, m) / Math.max(1, Math.min(f, m)), _ = Re(r, h, t, n), v = _.top > _.bottom * 1.15 ? [180, 0] : [0, 180], y = _.left > _.right * 1.08 ? [270, 90] : [90, 270], b = f >= m ? [
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
function Be(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date(), i = r.getFullYear() - n.getFullYear(), a = r.getMonth() - n.getMonth();
	return (a < 0 || a === 0 && r.getDate() < n.getDate()) && i--, i >= 0 && i <= 130 ? i : null;
}
function Ve(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date();
	return r.setHours(0, 0, 0, 0), n < r;
}
function He(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function Ue(e) {
	return (e ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function We(e) {
	return /[^\u0000-\u007F]/.test(e);
}
function Ge(e) {
	return e ? (e.allCheckDigitsValid ? 100 : 0) + e.validCount * 18 + (e.surname ? 10 : 0) + (e.documentNumber ? 10 : 0) : -1;
}
function X(e, t, n, r, i, a, o, s) {
	let c = e?.trim() || null, l = t?.trim() || null;
	if (c && l) {
		if (a[i] = o?.includes("MRZ") || s?.includes("MRZ") ? "MRZ+VIZ" : "VIZ", He(c) === He(l)) {
			if (We(c) && !We(l)) return c;
			if (We(l) && !We(c)) return l;
		}
		return o === "MRZ" && s !== "MRZ" ? c : s === "MRZ" && o !== "MRZ" ? l : c.length !== l.length && Math.abs(c.length - l.length) >= 3 ? c.length > l.length ? c : l : n >= r ? c : l;
	}
	return c ? (a[i] = o ?? "VIZ", c) : l ? (a[i] = s ?? "VIZ", l) : null;
}
function Ke(e, t, n, r, i) {
	let a = e?.trim() || null, o = t?.trim() || null, s = n?.trim() || null, c = o && s ? o.length >= s.length ? o : s : o || s;
	if (a && c) {
		i[r] = "MRZ+VIZ";
		let e = He(a), t = He(c);
		return t === e && We(c) || t.length > e.length && e.length >= 8 && t.startsWith(e.slice(0, Math.min(8, e.length))) ? c : a;
	}
	return a ? (i[r] = "MRZ", a) : c ? (i[r] = "VIZ", c) : null;
}
function qe(e, t) {
	return e.documentType === "unknown" ? t.documentType === "unknown" ? "unknown" : t.documentType : e.documentType;
}
function Je(e, t) {
	let n = e.mrz !== null, r = t.mrz !== null, i = "front+back";
	n && r ? i = "both_mrz" : n && !r ? i = "swapped_detected" : !n && !r && (i = "visual_only");
	let a = Ge(t.mrz) >= Ge(e.mrz) ? t.mrz : e.mrz, o = Ge(t.mrz) >= Ge(e.mrz) ? t.rawMrzText || e.rawMrzText : e.rawMrzText || t.rawMrzText, s = n ? null : e, c = r ? null : t, l = {}, u = [], d = Ue(e.documentNumber), f = Ue(t.documentNumber);
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
		let n = He(e.surname), r = He(t.surname), i = new Set(n.split(" ").filter((e) => e.length >= 2)), o = r.split(" ").filter((e) => e.length >= 2).some((e) => i.has(e));
		n && r && !o && !n.includes(r) && !r.includes(n) && u.push({
			field: "surname",
			frontValue: e.surname,
			backValue: t.surname,
			resolution: a?.surname ? `Used MRZ surname (${a.surname})` : "Used higher-confidence side"
		});
	}
	let p = X(e.issuingCountry, t.issuingCountry, e.confidence, t.confidence, "issuingCountry", l, e.fieldSources.issuingCountry, t.fieldSources.issuingCountry), m = X(e.nationality, t.nationality, e.confidence, t.confidence, "nationality", l, e.fieldSources.nationality, t.fieldSources.nationality), h = Ke(a?.surname, s?.surname ?? (n ? null : e.surname), c?.surname ?? (r ? null : t.surname), "surname", l) ?? X(e.surname, t.surname, e.confidence, t.confidence, "surname", l, e.fieldSources.surname, t.fieldSources.surname), g = Ke(a?.givenNames, s?.givenNames ?? (n ? null : e.givenNames), c?.givenNames ?? (r ? null : t.givenNames), "givenNames", l) ?? X(e.givenNames, t.givenNames, e.confidence, t.confidence, "givenNames", l, e.fieldSources.givenNames, t.fieldSources.givenNames), _ = a?.surnames && a.surnames.length > 0 && h === a.surname ? a.surnames : h ? h.split(/\s+/).filter(Boolean) : [], v = a?.givenNamesList && a.givenNamesList.length > 0 && g === a.givenNames ? a.givenNamesList : g ? g.split(/\s+/).filter(Boolean) : [], y = g || h ? [g, h].filter(Boolean).join(" ") : X(e.fullName, t.fullName, e.confidence, t.confidence, "fullName", l, e.fieldSources.fullName, t.fieldSources.fullName);
	y && !l.fullName && (l.fullName = l.givenNames === "MRZ+VIZ" || l.surname === "MRZ+VIZ" ? "MRZ+VIZ" : l.givenNames ?? l.surname ?? "VIZ");
	let b = a?.documentNumber ? (l.documentNumber = e.documentNumber && t.documentNumber ? "MRZ+VIZ" : "MRZ", a.documentNumber) : X(e.documentNumber, t.documentNumber, e.confidence, t.confidence, "documentNumber", l, e.fieldSources.documentNumber, t.fieldSources.documentNumber), x = X(e.personalNumber, t.personalNumber, e.confidence, t.confidence, "personalNumber", l, e.fieldSources.personalNumber, t.fieldSources.personalNumber), S = a?.dateOfBirth ? (l.dateOfBirth = s?.dateOfBirth || c?.dateOfBirth ? "MRZ+VIZ" : "MRZ", a.dateOfBirth) : X(e.dateOfBirth, t.dateOfBirth, e.confidence, t.confidence, "dateOfBirth", l, e.fieldSources.dateOfBirth, t.fieldSources.dateOfBirth), C = a?.dateOfExpiry ? (l.dateOfExpiry = s?.dateOfExpiry || c?.dateOfExpiry ? "MRZ+VIZ" : "MRZ", a.dateOfExpiry) : X(e.dateOfExpiry, t.dateOfExpiry, e.confidence, t.confidence, "dateOfExpiry", l, e.fieldSources.dateOfExpiry, t.fieldSources.dateOfExpiry), w = X(e.dateOfIssue, t.dateOfIssue, e.confidence, t.confidence, "dateOfIssue", l, e.fieldSources.dateOfIssue, t.fieldSources.dateOfIssue), T = "Unspecified";
	a?.sex && a.sex !== "Unspecified" ? (T = a.sex, l.sex = s?.sex || c?.sex ? "MRZ+VIZ" : "MRZ") : e.sex !== "Unspecified" && t.sex !== "Unspecified" ? (T = e.confidence >= t.confidence ? e.sex : t.sex, l.sex = "VIZ") : e.sex === "Unspecified" ? t.sex !== "Unspecified" && (T = t.sex, l.sex = t.fieldSources.sex ?? "VIZ") : (T = e.sex, l.sex = e.fieldSources.sex ?? "VIZ");
	let E = X(e.placeOfBirth, t.placeOfBirth, e.confidence, t.confidence, "placeOfBirth", l, e.fieldSources.placeOfBirth, t.fieldSources.placeOfBirth), D = X(e.address, t.address, e.confidence, t.confidence, "address", l, e.fieldSources.address, t.fieldSources.address), O = X(e.parents, t.parents, e.confidence, t.confidence, "parents", l, e.fieldSources.parents, t.fieldSources.parents), k = X(e.issuingAuthority, t.issuingAuthority, e.confidence, t.confidence, "issuingAuthority", l, e.fieldSources.issuingAuthority, t.fieldSources.issuingAuthority), A = X(e.licenseClass, t.licenseClass, e.confidence, t.confidence, "licenseClass", l, e.fieldSources.licenseClass, t.fieldSources.licenseClass), j = X(e.restrictions, t.restrictions, e.confidence, t.confidence, "restrictions", l, e.fieldSources.restrictions, t.fieldSources.restrictions), M = X(e.endorsements, t.endorsements, e.confidence, t.confidence, "endorsements", l, e.fieldSources.endorsements, t.fieldSources.endorsements), N = X(e.height, t.height, e.confidence, t.confidence, "height", l, e.fieldSources.height, t.fieldSources.height), P = X(e.eyeColor, t.eyeColor, e.confidence, t.confidence, "eyeColor", l, e.fieldSources.eyeColor, t.fieldSources.eyeColor), F = X(e.hairColor, t.hairColor, e.confidence, t.confidence, "hairColor", l, e.fieldSources.hairColor, t.fieldSources.hairColor), I = Be(S);
	I !== null && (l.age = "COMPUTED");
	let L = Ve(C);
	L !== null && (l.isExpired = "COMPUTED");
	let R = {
		...e.unmappedFields,
		...t.unmappedFields
	}, z = [e.rawOcrText ? `--- FRONT SIDE ---\n${e.rawOcrText}` : "", t.rawOcrText ? `--- BACK SIDE ---\n${t.rawOcrText}` : ""].filter(Boolean).join("\n\n"), B = Math.round((e.confidence + t.confidence) / 2), V = e.processingTimeMs + t.processingTimeMs;
	return {
		documentType: qe(e, t),
		documentFormat: a ? a.format : "VISUAL_ONLY",
		issuingCountry: p,
		issuingCountryName: ue(p),
		documentNumber: b,
		personalNumber: x,
		surname: h,
		surnames: _,
		givenNames: g,
		givenNamesList: v,
		fullName: y,
		nationality: m,
		nationalityName: ue(m) ?? m,
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
		unmappedFields: R,
		fieldSources: l,
		rawOcrText: z,
		rawMrzText: o,
		confidence: B,
		processingTimeMs: V,
		sourceDimensions: r ? t.sourceDimensions : e.sourceDimensions,
		orientation: r ? t.orientation : e.orientation,
		perspective: r ? t.perspective : e.perspective,
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
function Ye(e) {
	return Math.max(0, Math.min(1, e));
}
function Z(e, t) {
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
		d: Z(e, t),
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
		if (!s || Z(s, i[e]) > n * 4) return i;
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
function ot(e) {
	let t = e instanceof HTMLImageElement && e.naturalWidth || e.width, n = e instanceof HTMLImageElement && e.naturalHeight || e.height;
	if (t < 64 || n < 64) return null;
	let r = Math.min(1, 320 / Math.max(t, n)), i = Math.max(32, Math.round(t * r)), a = Math.max(32, Math.round(n * r)), o = document.createElement("canvas");
	o.width = i, o.height = a;
	let s = o.getContext("2d", { willReadFrequently: !0 });
	if (!s) return null;
	s.drawImage(e, 0, 0, i, a);
	let c = s.getImageData(0, 0, i, a).data, l = i * a, u = new Float32Array(l);
	for (let e = 0, t = 0; e < c.length; e += 4, t++) u[t] = .299 * c[e] + .587 * c[e + 1] + .114 * c[e + 2];
	let d = new Float32Array(l);
	for (let e = 0; e < a; e++) for (let t = 0; t < i; t++) {
		let n = 0, r = 0;
		for (let o = -1; o <= 1; o++) {
			let s = e + o;
			if (!(s < 0 || s >= a)) for (let e = -1; e <= 1; e++) {
				let a = t + e;
				a < 0 || a >= i || (n += u[s * i + a], r++);
			}
		}
		d[e * i + t] = n / r;
	}
	let f = new Float32Array(l);
	for (let e = 1; e < a - 1; e++) for (let t = 1; t < i - 1; t++) {
		let n = e * i + t, r = -d[(e - 1) * i + (t - 1)] + d[(e - 1) * i + (t + 1)] - 2 * d[e * i + (t - 1)] + 2 * d[e * i + (t + 1)] - d[(e + 1) * i + (t - 1)] + d[(e + 1) * i + (t + 1)], a = -d[(e - 1) * i + (t - 1)] - 2 * d[(e - 1) * i + t] - d[(e - 1) * i + (t + 1)] + d[(e + 1) * i + (t - 1)] + 2 * d[(e + 1) * i + t] + d[(e + 1) * i + (t + 1)];
		f[n] = Math.hypot(r, a) * .25;
	}
	let p = [];
	for (let e = 2; e < i - 2; e += 2) {
		p.push({
			r: c[(2 * i + e) * 4],
			g: c[(2 * i + e) * 4 + 1],
			b: c[(2 * i + e) * 4 + 2],
			grad: f[2 * i + e],
			idx: 2 * i + e
		});
		let t = (a - 3) * i + e;
		p.push({
			r: c[t * 4],
			g: c[t * 4 + 1],
			b: c[t * 4 + 2],
			grad: f[t],
			idx: t
		});
	}
	for (let e = 2; e < a - 2; e += 2) {
		let t = e * i + 2;
		p.push({
			r: c[t * 4],
			g: c[t * 4 + 1],
			b: c[t * 4 + 2],
			grad: f[t],
			idx: t
		});
		let n = e * i + (i - 3);
		p.push({
			r: c[n * 4],
			g: c[n * 4 + 1],
			b: c[n * 4 + 2],
			grad: f[n],
			idx: n
		});
	}
	let m = p.filter((e) => e.grad < 10);
	if (m.length < p.length * .4) return null;
	let h = m.map((e) => e.r).sort((e, t) => e - t), g = m.map((e) => e.g).sort((e, t) => e - t), _ = m.map((e) => e.b).sort((e, t) => e - t), v = h[Math.floor(h.length / 2)], y = g[Math.floor(g.length / 2)], b = _[Math.floor(_.length / 2)], x = new Uint8Array(l), S = new Int32Array(l), C = 0, w = 0, T = (e) => {
		let t = e * 4;
		return Math.max(Math.abs(c[t] - v), Math.abs(c[t + 1] - y), Math.abs(c[t + 2] - b));
	}, E = (e) => {
		x[e] || f[e] < 12 && T(e) < 42 && (x[e] = 1, S[w++] = e);
	};
	for (let e = 0; e < i; e++) E(e), E((a - 1) * i + e);
	for (let e = 0; e < a; e++) E(e * i), E(e * i + (i - 1));
	if (w === 0) return null;
	for (; C < w;) {
		let e = S[C++], t = e % i, n = e / i | 0, r = e * 4, o = c[r], s = c[r + 1], l = c[r + 2], u = [
			t > 0 ? e - 1 : -1,
			t < i - 1 ? e + 1 : -1,
			n > 0 ? e - i : -1,
			n < a - 1 ? e + i : -1
		];
		for (let e = 0; e < 4; e++) {
			let t = u[e];
			if (t < 0 || x[t] || f[t] >= 13.5) continue;
			let n = t * 4;
			Math.max(Math.abs(c[n] - o), Math.abs(c[n + 1] - s), Math.abs(c[n + 2] - l)) > 18 || T(t) > 46 || (x[t] = 1, S[w++] = t);
		}
	}
	let D = new Uint8Array(l), O = new Int32Array(l), k = [];
	for (let e = 0; e < l; e++) {
		if (x[e] || D[e]) continue;
		let t = 0, n = 0;
		D[e] = 1, O[n++] = e;
		let r = [];
		for (; t < n;) {
			let e = O[t++];
			r.push(e);
			let o = e % i, s = e / i | 0;
			o > 0 && !x[e - 1] && !D[e - 1] && (D[e - 1] = 1, O[n++] = e - 1), o < i - 1 && !x[e + 1] && !D[e + 1] && (D[e + 1] = 1, O[n++] = e + 1), s > 0 && !x[e - i] && !D[e - i] && (D[e - i] = 1, O[n++] = e - i), s < a - 1 && !x[e + i] && !D[e + i] && (D[e + i] = 1, O[n++] = e + i);
		}
		r.length > k.length && (k = r);
	}
	let A = k.length / l;
	if (A < .14 || A > .94) return null;
	let j = new Uint8Array(l);
	for (let e = 0; e < k.length; e++) j[k[e]] = 1;
	let M = [];
	for (let e = 0; e < k.length; e++) {
		let t = k[e], n = t % i, r = t / i | 0;
		n !== 0 && n !== i - 1 && r !== 0 && r !== a - 1 && j[t - 1] && j[t + 1] && j[t - i] && j[t + i] || M.push({
			x: n,
			y: r
		});
	}
	if (M.length < 24) return null;
	let N = $e(M);
	if (N.length < 4) return null;
	let P = Qe(it(et(N), M, Math.max(4, Math.min(i, a) * .035)).map((e) => ({
		x: Ye(e.x / i),
		y: Ye(e.y / a)
	})));
	if (at(P).some((e) => e < 46 || e > 134)) return null;
	let F = Ze([
		P.topLeft,
		P.topRight,
		P.bottomRight,
		P.bottomLeft
	]);
	if (F < .14 || F > .95) return null;
	let I = Z({
		x: P.topLeft.x * t,
		y: P.topLeft.y * n
	}, {
		x: P.topRight.x * t,
		y: P.topRight.y * n
	}), L = Z({
		x: P.bottomLeft.x * t,
		y: P.bottomLeft.y * n
	}, {
		x: P.bottomRight.x * t,
		y: P.bottomRight.y * n
	}), R = Z({
		x: P.topLeft.x * t,
		y: P.topLeft.y * n
	}, {
		x: P.bottomLeft.x * t,
		y: P.bottomLeft.y * n
	}), z = Z({
		x: P.topRight.x * t,
		y: P.topRight.y * n
	}, {
		x: P.bottomRight.x * t,
		y: P.bottomRight.y * n
	}), B = Math.max(I, L), V = Math.max(R, z), ee = B / Math.max(1, V);
	if (ee < .42 || ee > 2.45) return null;
	let te = Math.atan2((P.topRight.y - P.topLeft.y) * n, (P.topRight.x - P.topLeft.x) * t), ne = Math.atan2((P.bottomRight.y - P.bottomLeft.y) * n, (P.bottomRight.x - P.bottomLeft.x) * t), re = Math.atan2((P.bottomLeft.y - P.topLeft.y) * n, (P.bottomLeft.x - P.topLeft.x) * t), ie = Math.atan2((P.bottomRight.y - P.topRight.y) * n, (P.bottomRight.x - P.topRight.x) * t), H = 180 / Math.PI, ae = Math.max(Math.abs((te - ne) * H), Math.abs((re - ie) * H)), oe = Math.max(Math.abs(I - L) / Math.max(1, B), Math.abs(R - z) / Math.max(1, V)), se = Math.max(Math.abs(te * H), Math.abs(ne * H)), ce = [
		P.topLeft,
		P.topRight,
		P.bottomRight,
		P.bottomLeft
	].filter((e) => e.x > .03 && e.x < .97 && e.y > .03 && e.y < .97).length;
	return !(ae >= 1.8 || oe >= .04 || se >= 2.2) && !(F <= .86 && ce >= 3) ? null : {
		applied: !0,
		autoDetected: !0,
		corners: P,
		sourceQuadAreaRatio: Math.round(F * 1e3) / 1e3
	};
}
function st(e, t) {
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
function ct(e, t) {
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
	}, m = Z(u, d), h = Z(p, f), g = Z(u, p), _ = Z(d, f), v = Math.max(64, Math.round(Math.max(m, h))), y = Math.max(64, Math.round(Math.max(g, _))), b = 1;
	v < 1500 ? b = Math.min(2.6, 1750 / v) : v > 2100 && (b = 2100 / v);
	let x = Math.max(64, Math.round(v * b)), S = Math.max(64, Math.round(y * b)), C = st([
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
// src/scanner/vizParser.ts
var lt = {
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
function ut(e) {
	if (!e) return null;
	let t = e.toUpperCase().replace(/\s+/g, " ").trim(), n = t.match(/\b((?:19|20)\d{2})[-./](\d{1,2})[-./](\d{1,2})\b/);
	if (n) {
		let [, e, t, r] = n;
		if (+t >= 1 && +t <= 12 && +r >= 1 && +r <= 31) return `${e}-${t.padStart(2, "0")}-${r.padStart(2, "0")}`;
	}
	if (n = t.match(/\b(\d{1,2})\s+([A-Z]{3,5})(?:\/[A-Z]{2,5})?\s+((?:19|20)\d{2})\b/), n) {
		let [, e, t, r] = n, i = lt[t];
		if (i && +e >= 1 && +e <= 31) return `${r}-${i}-${e.padStart(2, "0")}`;
	}
	if (n = t.match(/\b([A-Z]{3,5})\s+(\d{1,2}),?\s+((?:19|20)\d{2})\b/), n) {
		let [, e, t, r] = n, i = lt[e];
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
function dt(e) {
	let t = [];
	for (let n of [
		/\b(?:19|20)\d{2}[-./]\d{1,2}[-./]\d{1,2}\b/g,
		/\b\d{1,2}\s+[A-Za-z]{3,5}(?:\/[A-Za-z]{2,5})?\s+(?:19|20)\d{2}\b/g,
		/\b[A-Za-z]{3,5}\s+\d{1,2},?\s+(?:19|20)\d{2}\b/g,
		/\b\d{1,2}(?:[-./]|\s+)\d{1,2}(?:[-./]|\s+)(?:19|20)\d{2}\b/g
	]) {
		let r = e.match(n);
		if (r) for (let e of r) {
			let n = ut(e);
			n && !t.includes(n) && t.push(n);
		}
	}
	return t;
}
var ft = [
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
], pt = [/\b(?:doktorgrad|doctoral\s*degr|degn?\s*ree|grade\s*de\s*docteur|ordens|rdens|oder\s*k[uü]nst|k[uü]nstlername|kinermamo|kinlenamo|kintlemamo|lername|no[em]\s+de\s+religion|rotgious|otgious|religious\s*name|stage\s*or\s*pen|nom\s*d['’]?artiste|pseudonyn|pseudonym|signature|unterschrift|firma\s*del\s*titular|holder['’]?s\s*signature)\b/i];
function mt(e, t) {
	let n = e.indexOf(":");
	if (n !== -1 && n < 40) return e.slice(n + 1).trim();
	let r = e;
	for (let e of t) {
		let t = new RegExp(e.source, e.flags.includes("g") ? e.flags : `${e.flags}g`);
		r = r.replace(t, "");
	}
	return r.replace(/^[\s/:|.\-–—]+/, "").replace(/^(?:[\/|][A-Za-zÀ-ÿ\s]+)+[:\-]?\s*/, "").trim();
}
function ht(e, t) {
	if (e.includes(":")) return !1;
	if (/[\/|]/.test(e) && !/\d{1,2}\/\d{1,2}/.test(e)) return !0;
	let n = mt(e, t.patterns);
	return n.length <= 2 || (t.field === "height" || t.field === "dateOfIssue" || t.field === "dateOfBirth" || t.field === "dateOfExpiry") && !/\d/.test(n);
}
function gt(e) {
	return pt.some((t) => t.test(e)) ? !0 : ft.some((t) => t.patterns.some((n) => n.test(e) && ht(e, t)));
}
function _t(e) {
	return pt.some((t) => t.test(e)) ? !0 : ft.some((t) => t.patterns.some((t) => t.test(e)));
}
function vt(e) {
	let t = e.replace(/\s+/g, "");
	return !!(/^[A-Z0-9<]{22,}$/.test(t) && (t.includes("<") || /\d{5,}/.test(t)));
}
function Q(e, t = !1) {
	let n = e.replace(/^[\s=•·|>~_-]+/g, "").replace(/\s+[*•·|>~]+$/g, "").replace(/~/g, "");
	return n = t ? n.replace(/([A-ZÄÖÜ]{2,}STRASSE)[-.\s]+\s*(\d)/gi, "$1 $2").replace(/([A-ZÄÖÜ]{3,})[-~]\s+(\d)/gi, "$1 $2").replace(/(\d)\.$/, "$1") : n.replace(/\s+\d$/g, ""), n.replace(/\s+/g, " ").trim();
}
function yt(e) {
	let t = e.toUpperCase();
	return /\b(?:PASSPORT|PASSEPORT|PASAPORTE|REISEPASS|PASSAPORTO|PASZPORT)\b/.test(t) ? "passport" : /\b(?:DRIVER(?:'S)?\s*LICEN[CS]E|DRIVING\s*LICEN[CS]E|PERMIS\s*DE\s*CONDUIRE|F[UÜ]HRERSCHEIN|PRAWO\s*JAZDY)\b/.test(t) ? "driver_license" : /\b(?:RESIDENCE\s*PERMIT|TITRE\s*DE\s*S[EÉ]JOUR|AUFENTHALTSTITEL|KARTA\s*POBYTU)\b/.test(t) ? "residence_permit" : /\b(?:VISA|VISUM)\b/.test(t) ? "visa" : /\b(?:IDENTITY\s*CARD|ID\s*CARD|NATIONAL\s*ID|CARTE\s*NATIONALE|PERSONALAUSWEIS|ANSCHRIFT|AUGENFARBE|DOW[OÓ]D\s*OSOBISTY|CARTA\s*D'IDENTIT[AÀ]|DNI)\b/.test(t) ? "id_card" : null;
}
function bt(e) {
	let t = e.trim().toUpperCase();
	return /^(?:M|MALE|HOMME|M[AÄ]NNLICH|MASCULINO|M[EĘ][ZŻ]CZYZNA)$/.test(t) ? "M" : /^(?:F|FEMALE|FEMME|WEIBLICH|FEMENINO|KOBIETA)$/.test(t) ? "F" : /^(?:X|NON[- ]?BINARY|OTHER|DIVERS)$/.test(t) ? "X" : t.startsWith("M/") || t === "M" ? "M" : t.startsWith("F/") || t === "F" ? "F" : null;
}
function xt(e, t) {
	let n = Math.max(12, e.bbox.y1 - e.bbox.y0);
	if (t.bbox.y0 < e.bbox.y0 + n * .25) return !1;
	let r = e.bbox.x0 - 120, i = Math.max(e.bbox.x1 + 60, e.bbox.x0 + 360), a = (t.bbox.x0 + t.bbox.x1) / 2, o = Math.abs(t.bbox.x0 - e.bbox.x0) <= 130, s = t.bbox.x0 >= r && a <= i;
	return o || s;
}
function St(e) {
	return !(e.length < 2 || /[{}|\[\]<>~]/.test(e) || !/[A-ZÄÖÜÑ]{2,}/.test(e));
}
function Ct(e, t) {
	let n = (t ?? []).map((e) => ({
		text: e.text.replace(/\s+/g, " ").trim(),
		bbox: e.bbox
	})).filter((e) => e.text.length > 0 && !vt(e.text)).sort((e, t) => e.bbox.y0 - t.bbox.y0 || e.bbox.x0 - t.bbox.x0), r = n.length > 0 ? n.map((e) => e.text) : e.split(/\r?\n/).map((e) => e.replace(/\s+/g, " ").trim()).filter((e) => e.length > 0 && !vt(e)), i = {
		documentTypeHint: yt(e),
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
		if (pt.some((e) => e.test(t))) continue;
		let o = a ? n[e] : null, s = t.match(/^([A-Za-z][A-Za-z0-9\s/().'-]{1,32}):\s*(.+)$/), c = !1;
		for (let s of ft) {
			for (let l of s.patterns) if (l.test(t)) {
				c = !0;
				let l = s.field === "sex" ? 1 : 2, u = [], d = null, f = null;
				if (o) for (let t = e + 1; t < n.length; t++) {
					let e = n[t];
					if (!xt(o, e)) continue;
					if (_t(e.text)) break;
					if (e.text.length < l) continue;
					if (s.field === "placeOfBirth" && !St(e.text)) {
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
				let p = ht(t, s) ? "" : mt(t, s.patterns), m = p, h = 0;
				if ((!m || m.length < l) && (u.length > 0 ? m = u[0] : !a && e + 1 < r.length && !gt(r[e + 1]) && (m = r[e + 1], h = 1)), !m) continue;
				if (s.field === "dateOfBirth" || s.field === "dateOfIssue" || s.field === "dateOfExpiry") {
					let e = ut(m);
					e && !i[s.field] && (i[s.field] = e);
				} else if (s.field === "sex") {
					let e = bt(m);
					e && !i.sex && (i.sex = e);
				} else if (s.field === "address" || s.field === "placeOfBirth") {
					let t = s.field === "address", n = [];
					if (a && !p && u.length > 0) n = u.map((e) => Q(e, t)).filter((e) => e.length >= 2);
					else {
						n = [Q(m, t)];
						let i = s.field === "address" ? 3 : 2, a = e + h + 1;
						for (; n.length < i && a < r.length && !_t(r[a]);) {
							let e = Q(r[a], t);
							if (e.length >= 2 && !/^\d{1,2}$/.test(e)) {
								if (s.field === "placeOfBirth" && !St(e)) break;
								n.push(e);
							}
							a++;
						}
					}
					!i[s.field] && n.length > 0 && (i[s.field] = n.join(", "));
				} else if (s.field === "parents") i.parents ||= Q(m);
				else if (s.field === "height") {
					let e = Q(m);
					/\d/.test(e) && !i.height && (i.height = e);
				} else if (s.field === "surname") {
					let e = (a && !p && u.length > 0 ? u.map((e) => Q(e)).filter(Boolean) : [Q(m)].filter(Boolean)).join(" ");
					e && (i.surname ? /segundo\s*apellido|2[oº]\.?\s*apellido/i.test(t) && !i.surnames.includes(e) && (i.surnames = [...i.surnames, e], i.surname = i.surnames.join(" ")) : (i.surname = e, i.surnames = e.split(/\s+/).filter(Boolean)));
				} else i[s.field] || (i[s.field] = Q(m));
				break;
			}
			if (c) break;
		}
		if (!c && s) {
			let e = s[1].trim(), t = Q(s[2]);
			e && t && t.length <= 100 && (i.unmappedKeyValues[e] = t);
		}
	}
	let o = dt(r.join("\n")).sort();
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
function wt(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date(), i = r.getFullYear() - n.getFullYear(), a = r.getMonth() - n.getMonth();
	return (a < 0 || a === 0 && r.getDate() < n.getDate()) && i--, i >= 0 && i <= 130 ? i : null;
}
function Tt(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date();
	return r.setHours(0, 0, 0, 0), n < r;
}
function Et(e, t) {
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
function Dt(e) {
	return e.toUpperCase().replace(/[ODQ]/g, "0").replace(/[ILT]/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/G/g, "6").replace(/B/g, "8");
}
function Ot(e, t, n) {
	if (e?.documentNumber && t) {
		let r = e.checkDigits.find((e) => e.field === "documentNumber"), i = e.documentNumber.trim().toUpperCase(), a = t.trim().toUpperCase();
		if (r && !r.valid && i.length === a.length && Dt(i) === Dt(a)) return n.documentNumber = "MRZ+VIZ", a;
	}
	return $(e?.documentNumber, t, "documentNumber", n);
}
function kt(e) {
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
function At(e, t, n, r, i) {
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
function jt(e, t, n, r, i) {
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
function Mt(e, t) {
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
			let r = e.syms[n], o = r.bbox.x1 - r.bbox.x0, s = At(t, r.bbox.x0, r.bbox.y0, r.bbox.x1, r.bbox.y1);
			if (n + 1 < e.syms.length) {
				let c = e.syms[n + 1], l = c.bbox.x1 - c.bbox.x0, u = c.bbox.x1 - r.bbox.x0;
				if (c.bbox.x0 <= r.bbox.x1 + 2 && u <= i * 1.75) {
					let o = At(t, c.bbox.x0, c.bbox.y0, c.bbox.x1, c.bbox.y1);
					if (s.isChevron || o.isChevron) {
						a += "<";
						let t = Math.max(r.bbox.x1, c.bbox.x1);
						for (n++; n + 1 < e.syms.length && e.syms[n + 1].bbox.x0 <= t + 2 && e.syms[n + 1].bbox.x1 - r.bbox.x0 <= i * 1.75;) t = Math.max(t, e.syms[n + 1].bbox.x1), n++;
						continue;
					}
				}
				if (u <= i * 1.45 && (o < i * .8 || l < i * .48) && At(t, r.bbox.x0, Math.min(r.bbox.y0, c.bbox.y0), c.bbox.x1, Math.max(r.bbox.y1, c.bbox.y1)).isChevron) {
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
				let n = e.syms.map((e) => e.bbox.x1 - e.bbox.x0).filter((e) => e > 12).sort((e, t) => e - t), r = n[Math.floor(n.length / 2)] || 30, { inkX0: a, inkX1: o } = jt(t, e.bbox.x0, e.bbox.y0, e.bbox.x1, e.bbox.y1), c = a + r / 2, l = (o - r / 2 - c) / (s - 1), u = "";
				for (let n = 0; n < s; n++) {
					let i = c + n * l, a = i - l * .36, o = i + l * .36, s = At(t, a, e.bbox.y0, o, e.bbox.y1);
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
						At(t, f.bbox.x0, f.bbox.y0, f.bbox.x1, f.bbox.y1).isChevron ? u += "<" : e > r * 1.45 && s.isThinBar || (n === "T" || n === "K" || n === "L") && s.isThinBar || n === "T" && s.gw <= s.gh * .48 ? u += "1" : n === "L" && s.isZee ? u += "Z" : (n === "I" || n === "1" || n === "L") && s.isNine ? u += "9" : u += n;
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
function Nt(e) {
	let t = e.rawLines.join("").split("<").length - 1, n = /^[A-Z]{1,3}$/.test(e.issuingCountry);
	return e.validCount * 100 + (e.allCheckDigitsValid ? 50 : 0) + (n ? 20 : 0) + (e.dateOfBirth ? 15 : 0) + (e.dateOfExpiry ? 15 : 0) + (e.surname ? 10 : 0) + (e.givenNames ? 10 : 0) + Math.min(t, 60);
}
function Pt(e) {
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
function Ft(e, t, n, r) {
	let i = 0;
	e && (i += e.validCount * 120, e.allCheckDigitsValid && (i += 200), /^[PVIAC]/.test(e.documentCode) && (i += 60), e.dateOfBirth && (i += 35), e.dateOfExpiry && (i += 35), e.surname && (i += 30), e.givenNames && (i += 25), e.documentNumber && (i += 25));
	let a = Pt(t);
	i += a * 28, t.documentTypeHint && (i += 25), i += n * .8;
	let o = (r.match(/[A-Za-z]{3,}/g) || []).length;
	return i += Math.min(o, 30) * 1.5, i;
}
function It(e) {
	let t = (e % 360 + 360) % 360;
	return Math.round(t * 10) / 10;
}
function Lt(e, t, n, r) {
	if (n) return (i) => {
		n({
			stage: i.stage,
			progress: Math.min(99, Math.round(e + i.progress / 100 * t)),
			message: r ? `${r}: ${i.message}` : i.message
		});
	};
}
var Rt = class {
	constructor(e = {}) {
		this.worker = null, this.workerLang = null, this.workerConfigKey = null, this.activeStageCallback = null, this.activeStage = "initializing_ocr", this.defaultWorkerConfig = { ...e };
	}
	async ensureWorker(e, t, n) {
		this.activeStageCallback = n ?? null;
		let r = {
			workerPath: t.workerPath ?? this.defaultWorkerConfig.workerPath,
			corePath: t.corePath ?? this.defaultWorkerConfig.corePath,
			langPath: t.langPath ?? this.defaultWorkerConfig.langPath,
			workerBlobURL: t.workerBlobURL ?? this.defaultWorkerConfig.workerBlobURL
		}, i = JSON.stringify(r);
		if (this.worker && this.workerLang === e && this.workerConfigKey === i) return this.worker;
		this.worker &&= (await this.worker.terminate(), null), this.activeStage = "initializing_ocr", n?.({
			stage: "initializing_ocr",
			progress: 12,
			message: "Initializing client-side Tesseract OCR engine…"
		});
		let a = { logger: (e) => {
			if (this.activeStageCallback && e.status === "recognizing text") {
				let t = this.activeStage === "recognizing_full" ? 25 : 65, n = this.activeStage === "recognizing_full" ? 35 : 25, r = Math.round(t + (e.progress || 0) * n);
				this.activeStageCallback({
					stage: this.activeStage,
					progress: r,
					message: this.activeStage === "recognizing_full" ? "Reading document text & visual inspection zone…" : "Running high-contrast MRZ strip verification…"
				});
			}
		} };
		r.workerPath && (a.workerPath = r.workerPath), r.corePath && (a.corePath = r.corePath), r.langPath && (a.langPath = r.langPath), r.workerBlobURL !== void 0 && (a.workerBlobURL = r.workerBlobURL);
		let o = await (0, U.createWorker)(e, 1, a, {
			load_system_dawg: "0",
			load_freq_dawg: "0"
		});
		return this.worker = o, this.workerLang = e, this.workerConfigKey = i, o;
	}
	async runOrientationPass(e, t, n, r, i, a, o, s = !0) {
		let c = await _e(e, {
			preprocess: i,
			rotation: n,
			deskewDegrees: r
		});
		s && (this.activeStage = "recognizing_full", o?.({
			stage: "recognizing_full",
			progress: 25,
			message: "Reading document text & visual inspection zone…"
		})), await t.setParameters({
			tessedit_pageseg_mode: U.PSM.SPARSE_TEXT,
			tessedit_char_whitelist: ""
		});
		let l = i ? c.enhancedDataUrl : c.originalDataUrl, u = await t.recognize(l, {}, { blocks: !0 }), d = u.data.text || "", f = u.data.confidence || 0;
		if (d.trim().split(/\r?\n/).filter(Boolean).length < 2) {
			await t.setParameters({
				tessedit_pageseg_mode: U.PSM.AUTO,
				tessedit_char_whitelist: ""
			});
			let e = await t.recognize(l, {}, { blocks: !0 });
			(e.data.text || "").trim().length > d.trim().length && (u = e, d = e.data.text || "", f = e.data.confidence || 0);
		}
		let p = kt(u.data.blocks), m = p.length > 0 ? p.map((e) => e.text).join("\n") : d, h = [], g = Pe(d);
		g && h.push(g);
		let _ = "";
		if (a) {
			s && (this.activeStage = "recognizing_mrz", o?.({
				stage: "recognizing_mrz",
				progress: 65,
				message: "Running high-contrast MRZ strip verification…"
			})), await t.setParameters({
				tessedit_pageseg_mode: U.PSM.SINGLE_BLOCK,
				tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<"
			});
			let e = async (e, n) => {
				let r = await t.recognize(e, {}, { blocks: !0 }), i = (r.data.text || "").trim();
				i && !_ && (_ = i);
				let a = Pe(i);
				a && h.push(a);
				let o = Mt(r.data.blocks, n);
				if (o.symbolRepairedText) {
					let e = Pe(o.symbolRepairedText);
					e && h.push(e);
				}
				if (o.gridRepairedText) {
					let e = Pe(o.gridRepairedText);
					e && (h.push(e), _ = o.gridRepairedText);
				}
			};
			await e(c.mrzCropDataUrl, c.mrzGrayscale), h.some((e) => e.allCheckDigitsValid) || (s && o?.({
				stage: "recognizing_mrz",
				progress: 80,
				message: "Isolating lower passport MRZ band…"
			}), await e(c.mrzTightCropDataUrl, c.mrzTightGrayscale));
		}
		let v = null;
		h.length > 0 && (h.sort((e, t) => Nt(t) - Nt(e)), v = h[0]);
		let y = Ct(m, p), b = Pt(y), x = Ft(v, y, f, m), S = v !== null && (v.allCheckDigitsValid || v.validCount >= 2 || v.validCount >= 1 && !!(v.surname || v.documentNumber) && f >= 48) || v === null && f >= 65 && b >= 4;
		return {
			coarse: n,
			preprocessed: c,
			cleanedFullText: m,
			vizLineBoxes: p,
			vizData: y,
			mrzData: v,
			mrzRawText: _,
			confidence: f,
			probeScore: x,
			isConfidentUpright: S
		};
	}
	async runLightweightProbe(e, t, n, r, i) {
		let a = await _e(e, {
			preprocess: i,
			rotation: n,
			deskewDegrees: r
		});
		await t.setParameters({
			tessedit_pageseg_mode: U.PSM.SPARSE_TEXT,
			tessedit_char_whitelist: ""
		});
		let o = i ? a.enhancedDataUrl : a.originalDataUrl, s = await t.recognize(o, {}, { blocks: !0 }), c = s.data.text || "", l = s.data.confidence || 0, u = kt(s.data.blocks), d = u.length > 0 ? u.map((e) => e.text).join("\n") : c, f = Ct(d, u);
		return Ft(Pe(c), f, l, d);
	}
	async scan(e, t = {}) {
		let n = performance.now(), { language: r = "eng", preprocess: i = !0, enhanceMrzPass: a = !0, perspectiveCorrection: o = !0, corners: s, rotation: c = 0, deskewDegrees: l = 0, includePreviews: u = !0, workerPath: d, corePath: f, langPath: p, workerBlobURL: m, onProgress: h } = t, g = t.autoRotate === void 0 ? c === 0 && l === 0 : t.autoRotate;
		h?.({
			stage: "preprocessing",
			progress: 4,
			message: o || s ? "Decoding document & checking 4-corner perspective…" : g ? "Decoding document & analyzing orientation…" : "Preprocessing image & isolating MRZ region…"
		});
		let _ = await de(e), v = _, y;
		if (s) {
			h?.({
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
			v = ct(_, e);
			let t = Math.abs(e.topLeft.x * e.topRight.y - e.topRight.x * e.topLeft.y + (e.topRight.x * e.bottomRight.y - e.bottomRight.x * e.topRight.y) + (e.bottomRight.x * e.bottomLeft.y - e.bottomLeft.x * e.bottomRight.y) + (e.bottomLeft.x * e.topLeft.y - e.topLeft.x * e.bottomLeft.y)) / 2;
			y = {
				applied: !0,
				autoDetected: !1,
				corners: e,
				sourceQuadAreaRatio: Math.round(t * 1e3) / 1e3
			};
		} else if (o) {
			h?.({
				stage: "detecting_perspective",
				progress: 9,
				message: "Detecting document borders for perspective correction…"
			});
			let e = ot(_);
			e ? (v = ct(_, e.corners), y = e) : y = {
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
		let b = await this.ensureWorker(r, {
			workerPath: d,
			corePath: f,
			langPath: p,
			workerBlobURL: m
		}, h), x = l, S = [c];
		if (g) {
			h?.({
				stage: "detecting_orientation",
				progress: 16,
				message: "Detecting document rotation & skew angle…"
			});
			let e = fe(v, 400), t = ze(e.data, e.width, e.height);
			x = t.deskewDegrees, S = t.rankedCoarseRotations;
		}
		let C = await this.runOrientationPass(v, b, S[0], x, i, a, h, !0);
		if (g && !C.isConfidentUpright) {
			let e = C.coarse, t = C.probeScore;
			for (let n = 1; n < S.length; n++) {
				let r = S[n];
				h?.({
					stage: "detecting_orientation",
					progress: 82 + n * 3,
					message: `Checking ${r}° orientation alignment…`
				});
				let a = await this.runLightweightProbe(v, b, r, x, i);
				if (a > t && (t = a, e = r, a >= 240)) break;
			}
			e !== C.coarse && (C = await this.runOrientationPass(v, b, e, x, i, a, h, !1));
		}
		h?.({
			stage: "parsing",
			progress: 92,
			message: "Extracting personal fields & verifying ICAO 9303 check digits…"
		});
		let { preprocessed: w, cleanedFullText: T, vizData: E, mrzData: D, mrzRawText: O, confidence: k } = C, A = {}, j = $(D?.issuingCountry, E.issuingCountry, "issuingCountry", A), M = $(D?.nationality, E.nationality, "nationality", A), N = $(D?.surname, E.surname, "surname", A), P = D?.surnames && D.surnames.length > 0 ? D.surnames : E.surnames.length > 0 ? E.surnames : N ? N.split(/\s+/).filter(Boolean) : [], F = $(D?.givenNames, E.givenNames, "givenNames", A), I = D?.givenNamesList && D.givenNamesList.length > 0 ? D.givenNamesList : F ? F.split(/\s+/).filter(Boolean) : [], L = $(D && (D.givenNames || D.surname) ? [D.givenNames, D.surname].filter(Boolean).join(" ") : null, E.fullName, "fullName", A), R = Ot(D, E.documentNumber, A), z = $(D && (D.optionalData1 || D.optionalData2) ? [D.optionalData1, D.optionalData2].filter(Boolean).join(" ") : null, E.personalNumber, "personalNumber", A), B = $(D?.dateOfBirth, E.dateOfBirth, "dateOfBirth", A), V = $(D?.dateOfExpiry, E.dateOfExpiry, "dateOfExpiry", A), ee = $(null, E.dateOfIssue, "dateOfIssue", A), te = D?.sex && D.sex !== "Unspecified" ? D.sex : E.sex ?? "Unspecified";
		D?.sex && D.sex !== "Unspecified" && E.sex ? A.sex = "MRZ+VIZ" : D?.sex && D.sex !== "Unspecified" ? A.sex = "MRZ" : E.sex && (A.sex = "VIZ");
		let ne = $(null, E.placeOfBirth, "placeOfBirth", A), re = $(null, E.address, "address", A), ie = $(null, E.parents, "parents", A), H = $(null, E.issuingAuthority, "issuingAuthority", A), ae = $(null, E.licenseClass, "licenseClass", A), oe = $(null, E.restrictions, "restrictions", A), se = $(null, E.endorsements, "endorsements", A), ce = $(null, E.height, "height", A), le = $(null, E.eyeColor, "eyeColor", A), U = $(null, E.hairColor, "hairColor", A), W = wt(B);
		W !== null && (A.age = "COMPUTED");
		let pe = Tt(V);
		pe !== null && (A.isExpired = "COMPUTED");
		let me = Et(D, E.documentTypeHint), he = ue(j), ge = ue(M) ?? M, _e = Math.round(performance.now() - n), ve = {
			coarseDegrees: C.coarse,
			deskewDegrees: x,
			totalDegrees: It(C.coarse + x),
			autoDetected: g
		};
		return h?.({
			stage: "complete",
			progress: 100,
			message: "Scan complete"
		}), {
			documentType: me,
			documentFormat: D ? D.format : "VISUAL_ONLY",
			issuingCountry: j,
			issuingCountryName: he,
			documentNumber: R,
			personalNumber: z,
			surname: N,
			surnames: P,
			givenNames: F,
			givenNamesList: I,
			fullName: L,
			nationality: M,
			nationalityName: ge,
			dateOfBirth: B,
			age: W,
			sex: te,
			dateOfIssue: ee,
			dateOfExpiry: V,
			isExpired: pe,
			placeOfBirth: ne,
			address: re,
			parents: ie,
			issuingAuthority: H,
			licenseClass: ae,
			restrictions: oe,
			endorsements: se,
			height: ce,
			eyeColor: le,
			hairColor: U,
			mrz: D,
			unmappedFields: E.unmappedKeyValues,
			fieldSources: A,
			rawOcrText: T.trim(),
			rawMrzText: O,
			confidence: Math.round(k),
			processingTimeMs: _e,
			sourceDimensions: {
				width: w.width,
				height: w.height
			},
			orientation: ve,
			perspective: y,
			previews: u ? {
				originalDataUrl: w.originalDataUrl,
				enhancedDataUrl: w.enhancedDataUrl,
				mrzCropDataUrl: w.mrzCropDataUrl
			} : void 0
		};
	}
	async scanPair(e, t, n = {}) {
		let { frontOptions: r, backOptions: i, onProgress: a, ...o } = n, s = await this.scan(e, {
			...o,
			...r,
			onProgress: Lt(0, 48, a, "Front")
		}), c = await this.scan(t, {
			...o,
			...i,
			onProgress: Lt(50, 46, a, "Back")
		});
		a?.({
			stage: "parsing",
			progress: 98,
			message: "Merging front & back fields and verifying consistency…"
		});
		let l = Je(s, c);
		return a?.({
			stage: "complete",
			progress: 100,
			message: "Two-sided scan complete"
		}), l;
	}
	async terminate() {
		this.worker && (await this.worker.terminate(), this.worker = null, this.workerLang = null, this.workerConfigKey = null);
	}
};
async function zt(e, t = {}) {
	let n = new Rt({
		workerPath: t.workerPath,
		corePath: t.corePath,
		langPath: t.langPath,
		workerBlobURL: t.workerBlobURL
	});
	try {
		return await n.scan(e, t);
	} finally {
		await n.terminate();
	}
}
async function Bt(e, t, n = {}) {
	let r = new Rt({
		workerPath: n.workerPath,
		corePath: n.corePath,
		langPath: n.langPath,
		workerBlobURL: n.workerBlobURL
	});
	try {
		return await r.scanPair(e, t, n);
	} finally {
		await r.terminate();
	}
}
export { Rt as DocumentScanner, W as ICAO_COUNTRY_CODES, u as SCANNER_VERSION, ze as analyzeDocumentOrientation, G as computeCheckDigit, ot as detectDocumentQuad, de as loadImageElement, Je as mergeDocumentSides, ut as normalizeVisualDate, Qe as orderQuadCorners, Pe as parseMrzFromText, Ct as parseVizText, _e as preprocessDocumentImage, ue as resolveCountryName, fe as sampleDownscaledGrayscale, zt as scanDocumentImage, Bt as scanDocumentPair, ct as warpDocumentPerspective };

//# sourceMappingURL=docscan-ocr.v0.0.1.es.js.map