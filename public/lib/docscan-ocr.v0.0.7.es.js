/* DocScan OCR v0.0.7 | Client-Side Browser Passport & ID Scanner */
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
}), u = "0.0.7", d = /* @__PURE__ */ a(((e, t) => {
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
	default: () => ee,
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
}), b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, ee, z = i((() => {
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
	}, ee = {
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
})), te = /* @__PURE__ */ a(((e, t) => {
	t.exports = {
		workerBlobURL: !0,
		logger: () => {}
	};
})), B = /* @__PURE__ */ a(((e, t) => {
	var n = (z(), c(y).default).version;
	t.exports = {
		...te(),
		workerPath: `https://cdn.jsdelivr.net/npm/tesseract.js@v${n}/dist/worker.min.js`
	};
})), ne = /* @__PURE__ */ a(((e, t) => {
	t.exports = ({ workerPath: e, workerBlobURL: t }) => {
		let n;
		if (Blob && URL && t) {
			let t = new Blob([`importScripts("${e}");`], { type: "application/javascript" });
			n = new Worker(URL.createObjectURL(t));
		} else n = new Worker(e);
		return n;
	};
})), re = /* @__PURE__ */ a(((e, t) => {
	t.exports = (e) => {
		e.terminate();
	};
})), ie = /* @__PURE__ */ a(((e, t) => {
	t.exports = (e, t) => {
		e.onmessage = ({ data: e }) => {
			t(e);
		};
	};
})), ae = /* @__PURE__ */ a(((e, t) => {
	t.exports = async (e, t) => {
		e.postMessage(t);
	};
})), oe = /* @__PURE__ */ a(((e, t) => {
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
})), se = /* @__PURE__ */ a(((e, t) => {
	t.exports = {
		defaultOptions: B(),
		spawnWorker: ne(),
		terminateWorker: re(),
		onMessage: ie(),
		send: ae(),
		loadImage: oe()
	};
})), V = /* @__PURE__ */ a(((e, t) => {
	var n = _(), r = p(), { log: i } = m(), a = f(), o = v(), { defaultOptions: s, spawnWorker: c, terminateWorker: l, onMessage: u, loadImage: d, send: h } = se(), g = 0;
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
		})), ee = (e = "eng", t, n, r) => {
			if (w && [o.TESSERACT_ONLY, o.TESSERACT_LSTM_COMBINED].includes(t)) throw Error("Legacy model requested but code missing.");
			let i = t || S;
			S = i;
			let a = n || C;
			C = a;
			let s = (typeof e == "string" ? e.split("+") : e).filter((e) => !x.includes(e));
			return x.push(...s), s.length > 0 ? L(s, r).then(() => R(e, i, a, r)) : R(e, i, a, r);
		}, z = (e = {}, t) => A(r({
			id: t,
			action: "setParameters",
			payload: { params: e }
		})), te = async (e, t = {}, n = { text: !0 }, i) => A(r({
			id: i,
			action: "recognize",
			payload: {
				image: await d(e),
				options: t,
				output: n
			}
		})), B = async (e, t) => {
			if (w) throw Error("`worker.detect` requires Legacy model, which was not loaded.");
			return A(r({
				id: t,
				action: "detect",
				payload: { image: await d(e) }
			}));
		}, ne = async () => (k !== null && (l(k), k = null), Promise.resolve());
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
		let re = {
			id: m,
			worker: k,
			load: j,
			writeText: N,
			readText: P,
			removeFile: F,
			FS: I,
			reinitialize: ee,
			setParameters: z,
			recognize: te,
			detect: B,
			terminate: ne
		};
		return M().then(() => L(e)).then(() => R(e, t, p)).then(() => E(re)).catch(() => {}), D;
	};
})), ce = /* @__PURE__ */ a(((e, t) => {
	var n = V();
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
})), H = /* @__PURE__ */ a(((e, t) => {
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
})), U = /* @__PURE__ */ a(((e, t) => {
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
})), W = (/* @__PURE__ */ a(((e, t) => {
	d();
	var n = h(), r = V(), i = ce(), a = H(), o = v(), s = U(), { setLogging: c } = m();
	t.exports = {
		languages: a,
		OEM: o,
		PSM: s,
		createScheduler: n,
		createWorker: r,
		setLogging: c,
		...i
	};
})))(), le = {
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
	return t ? le[t] ? le[t] : t === "D" ? "Germany" : le[e.trim().toUpperCase()] ?? null : null;
}
// src/scanner/imagePreprocessor.ts
function de(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement ? {
		width: Math.max(1, e.naturalWidth || e.width),
		height: Math.max(1, e.naturalHeight || e.height)
	} : {
		width: Math.max(1, e.width),
		height: Math.max(1, e.height)
	};
}
function G(e) {
	return new Promise((t, n) => {
		if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement) {
			e.complete && e.naturalWidth > 0 ? t(e) : (e.onload = () => t(e), e.onerror = () => n(/* @__PURE__ */ Error("Failed to load HTMLImageElement")));
			return;
		}
		if (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) {
			let r = new Image();
			r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error("Failed to convert canvas to image")), r.src = e.toDataURL("image/png");
			return;
		}
		if (typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
			let r = document.createElement("canvas");
			r.width = Math.max(1, e.width), r.height = Math.max(1, e.height);
			let i = r.getContext("2d");
			if (!i) {
				n(/* @__PURE__ */ Error("2D canvas context unavailable"));
				return;
			}
			i.drawImage(e, 0, 0);
			let a = new Image();
			a.onload = () => t(a), a.onerror = () => n(/* @__PURE__ */ Error("Failed to convert ImageBitmap to image")), a.src = r.toDataURL("image/png");
			return;
		}
		let r = new Image();
		r.crossOrigin = "anonymous";
		let i = null;
		r.onload = () => {
			i && URL.revokeObjectURL(i), t(r);
		}, r.onerror = () => {
			i && URL.revokeObjectURL(i), n(/* @__PURE__ */ Error("Unable to decode image file for OCR preprocessing"));
		}, typeof e == "string" ? r.src = e : typeof Blob < "u" && e instanceof Blob ? (i = URL.createObjectURL(e), r.src = i) : n(/* @__PURE__ */ Error("Unsupported image input type"));
	});
}
async function fe(e, t = !0) {
	if (typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) return {
		surface: e,
		ownedBitmap: null
	};
	if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement) return {
		surface: await G(e),
		ownedBitmap: null
	};
	if (t && typeof Blob < "u" && e instanceof Blob && typeof createImageBitmap == "function") try {
		let t = await createImageBitmap(e);
		return {
			surface: t,
			ownedBitmap: t
		};
	} catch {}
	return {
		surface: await G(e),
		ownedBitmap: null
	};
}
function pe(e, t = 400) {
	let { width: n, height: r } = de(e), i = Math.min(1, t / Math.max(n, r)), a = Math.max(1, Math.round(n * i)), o = Math.max(1, Math.round(r * i)), s = document.createElement("canvas");
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
function K(e, t, n) {
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
	let { preprocess: n = !0, rotation: r = 0, deskewDegrees: i = 0 } = t, a = typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement, o = typeof ImageBitmap < "u" && e instanceof ImageBitmap, s = a || o ? e : await G(e), { width: c, height: l } = de(s), u = r + i, d = Math.abs(i) >= .1, f, p;
	if (d) {
		let e = u * Math.PI / 180, t = Math.abs(Math.cos(e)), n = Math.abs(Math.sin(e));
		f = Math.max(1, Math.round(c * t + l * n)), p = Math.max(1, Math.round(c * n + l * t));
	} else {
		let e = r === 90 || r === 270;
		f = e ? l : c, p = e ? c : l;
	}
	let m = 1;
	f < 1600 ? m = Math.min(3, 1800 / Math.max(1, f)) : f > 2200 && (m = 2200 / f);
	let h = document.createElement("canvas");
	h.width = Math.round(f * m), h.height = Math.round(p * m);
	let g = h.getContext("2d", { willReadFrequently: !0 });
	if (!g) throw Error("2D canvas context unavailable");
	g.fillStyle = "#ffffff", g.fillRect(0, 0, h.width, h.height), g.imageSmoothingEnabled = !0, g.imageSmoothingQuality = "high", g.save(), g.translate(h.width / 2, h.height / 2), g.rotate(u * Math.PI / 180);
	let _ = Math.round(c * m), v = Math.round(l * m);
	g.drawImage(s, -_ / 2, -v / 2, _, v), g.restore(), d && (h = he(h));
	let y = h.width, b = h.height, x = h.toDataURL("image/png"), S = document.createElement("canvas");
	S.width = y, S.height = b;
	let C = S.getContext("2d", { willReadFrequently: !0 });
	if (!C) throw Error("2D canvas context unavailable");
	C.drawImage(h, 0, 0), n && K(C, y, b);
	let w = S.toDataURL("image/png"), T = ge(h, y, b, .6, .982, n), E = ge(h, y, b, .7, .982, n);
	return {
		originalDataUrl: x,
		enhancedDataUrl: w,
		mrzCropDataUrl: T.dataUrl,
		mrzGrayscale: T.grayscale,
		mrzTightCropDataUrl: E.dataUrl,
		mrzTightGrayscale: E.grayscale,
		width: y,
		height: b
	};
}
// src/scanner/mediaExtractor.ts
var ve = 360, ye = /\b(?:signature|holder['’`]?s?\s*signature|unterschrift|firma(?:\s*del\s*titular)?|para[sš]as|podpis|assinatura|handtekening|allkiri|al[aá][ií]r[aá]s)\b/i;
function be(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement ? {
		width: e.naturalWidth || e.width,
		height: e.naturalHeight || e.height
	} : {
		width: e.width,
		height: e.height
	};
}
function xe(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => {
			let e = r.naturalWidth || r.width, i = r.naturalHeight || r.height, a = document.createElement("canvas");
			a.width = e, a.height = i;
			let o = a.getContext("2d");
			o ? (o.drawImage(r, 0, 0, e, i), t(a)) : n(/* @__PURE__ */ Error("Canvas 2D context unavailable"));
		}, r.onerror = () => n(/* @__PURE__ */ Error("Failed to decode document image for media extraction")), r.src = e;
	});
}
function Se(e) {
	if (typeof document > "u") return null;
	if (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) return e;
	let { width: t, height: n } = be(e);
	if (!t || !n) return null;
	let r = document.createElement("canvas");
	r.width = t, r.height = n;
	let i = r.getContext("2d");
	return i ? (i.drawImage(e, 0, 0, t, n), r) : null;
}
function Ce(e) {
	return Math.max(0, Math.min(1, e));
}
function we(e, t, n, r, i) {
	if (!e.length || t <= 0 || n <= 0) return [];
	let a = r / t, o = i / n;
	return e.filter((e) => e.text.trim().length > 0 && e.bbox.x1 > e.bbox.x0 && e.bbox.y1 > e.bbox.y0).map((e) => ({
		text: e.text,
		x0: Math.max(0, Math.floor(e.bbox.x0 * a)),
		y0: Math.max(0, Math.floor(e.bbox.y0 * o)),
		x1: Math.min(r - 1, Math.ceil(e.bbox.x1 * a)),
		y1: Math.min(i - 1, Math.ceil(e.bbox.y1 * o))
	}));
}
function Te(e, t, n) {
	let r = new Uint8Array(t * n);
	for (let i of e) {
		let e = i.x1 - i.x0, a = i.y1 - i.y0;
		if (i.text.replace(/[^A-Za-z0-9\u00C0-\u024F]/g, "").length <= 2 && e < t * .045 || e > t * .45 && a > n * .25) continue;
		let o = Math.max(0, i.x0 - 2), s = Math.max(0, i.y0 - 2), c = Math.min(t - 1, i.x1 + 2), l = Math.min(n - 1, i.y1 + 2);
		for (let e = s; e <= l; e++) {
			let n = e * t;
			for (let e = o; e <= c; e++) r[n + e] = 1;
		}
	}
	return r;
}
function Ee(e, t, n, r) {
	let i = r ? r.format === "TD1" ? .59 : .7 : .94;
	for (let r of e) {
		let e = r.text.replace(/\s+/g, "").toUpperCase(), a = r.y0 / n, o = (r.x1 - r.x0) / t;
		a >= .52 && o >= .42 && e.length >= 20 && e.includes("<") && (i = Math.min(i, Math.max(.5, a - .018)));
	}
	return i;
}
function De(e, t, n) {
	let r = [], i = [], a = [], o = Math.floor(t * .06), s = Math.ceil(t * .94), c = Math.floor(n * .08), l = Math.ceil(n * .88);
	for (let n = c; n < l; n += 3) for (let c = o; c < s; c += 3) {
		let o = (n * t + c) * 4, s = e[o], l = e[o + 1], u = e[o + 2];
		.299 * s + .587 * l + .114 * u >= 175 && (r.push(s), i.push(l), a.push(u));
	}
	if (r.length < 20) return {
		r: 242,
		g: 242,
		b: 242,
		luma: 242
	};
	r.sort((e, t) => e - t), i.sort((e, t) => e - t), a.sort((e, t) => e - t);
	let u = Math.floor(r.length * .65), d = r[u], f = i[u], p = a[u];
	return {
		r: d,
		g: f,
		b: p,
		luma: .299 * d + .587 * f + .114 * p
	};
}
function Oe(e, t, n, r, i, a, o, s, c, l) {
	let u = Math.max(0, Math.floor(a * t)), d = Math.min(t - 1, Math.ceil(o * t)), f = Math.max(0, Math.floor(s * n)), p = Math.min(n - 1, Math.ceil(c * n)), m = d - u + 1, h = p - f + 1;
	if (m < 28 || h < 36) return null;
	let g = new Uint8Array(m * h), _ = new Uint8Array(m * h);
	for (let n = 0; n < h; n++) {
		let a = f + n;
		for (let o = 0; o < m; o++) {
			let s = u + o, c = a * t + s;
			if (r[c]) continue;
			let l = c * 4, d = e[l], f = e[l + 1], p = e[l + 2], h = .299 * d + .587 * f + .114 * p, v = Math.abs(d - i.r) + Math.abs(f - i.g) + Math.abs(p - i.b), y = Math.max(d, f, p) - Math.min(d, f, p), b = Math.abs(h - i.luma);
			v > 64 || b > 24 || y > 26 ? (g[n * m + o] = 1, _[n * m + o] = 1) : (v > 36 || b > 14 || y > 16) && (_[n * m + o] = 1);
		}
	}
	let v = new Uint8Array(m * h);
	for (let e = 0; e < h; e++) for (let t = 0; t < m; t++) if (g[e * m + t]) for (let n = -2; n <= 2; n++) {
		let r = e + n;
		if (!(r < 0 || r >= h)) for (let e = -2; e <= 2; e++) {
			let n = t + e;
			n < 0 || n >= m || (v[r * m + n] = 1);
		}
	}
	let y = new Uint8Array(m * h), b = new Int32Array(m * h), x = null;
	for (let i = 0; i < h; i++) for (let a = 0; a < m; a++) {
		let o = i * m + a;
		if (!v[o] || y[o]) continue;
		let s = 0, c = 0;
		b[c++] = o, y[o] = 1;
		let S = a, C = a, w = i, T = i, E = 0;
		for (; s < c;) {
			let e = b[s++], t = e % m, n = (e - t) / m;
			g[e] && E++, t < S && (S = t), t > C && (C = t), n < w && (w = n), n > T && (T = n);
			let r = [
				t > 0 ? e - 1 : -1,
				t + 1 < m ? e + 1 : -1,
				n > 0 ? e - m : -1,
				n + 1 < h ? e + m : -1
			];
			for (let e of r) e >= 0 && v[e] && !y[e] && (y[e] = 1, b[c++] = e);
		}
		let D = S, O = C, k = w, A = T;
		for (let e = 0; e < 18; e++) {
			let e = !1;
			if (D > 0) {
				let t = 0;
				for (let e = k; e <= A; e++) _[e * m + (D - 1)] && t++;
				t >= Math.max(4, (A - k + 1) * .45) && (D--, e = !0);
			}
			if (O + 1 < m) {
				let t = 0;
				for (let e = k; e <= A; e++) _[e * m + (O + 1)] && t++;
				t >= Math.max(4, (A - k + 1) * .45) && (O++, e = !0);
			}
			if (k > 0) {
				let t = 0;
				for (let e = D; e <= O; e++) _[(k - 1) * m + e] && t++;
				t >= Math.max(4, (O - D + 1) * .45) && (k--, e = !0);
			}
			if (A + 1 < h) {
				let t = 0;
				for (let e = D; e <= O; e++) _[(A + 1) * m + e] && t++;
				t >= Math.max(4, (O - D + 1) * .45) && (A++, e = !0);
			}
			if (!e) break;
		}
		let j = O - D + 1, M = A - k + 1, N = j / t, P = M / n, F = j / Math.max(1, M);
		if (N < .095 || P < .16 || F < .48 || F > 1.2) continue;
		let I = j * M, L = E / Math.max(1, I);
		if (L < .24) continue;
		let R = 0, ee = 0, z = 0, te = 0, B = 0;
		for (let n = k; n <= A; n++) {
			let i = f + n, a = 0, o = !1, s = (n - k) % 2 == 0;
			s && B++;
			for (let n = D; n <= O; n++) {
				let c = u + n, l = i * t + c;
				r[l] && R++;
				let d = l * 4, f = .299 * e[d] + .587 * e[d + 1] + .114 * e[d + 2];
				if (ee += f, z += f * f, s) {
					let e = f < 120;
					n > D && e !== o && a++, o = e;
				}
			}
			s && a >= 14 && te++;
		}
		let ne = R / Math.max(1, I);
		if (ne > .22 || B > 0 && te / B > .32) continue;
		let re = ee / Math.max(1, I), ie = Math.max(0, z / Math.max(1, I) - re * re), ae = Math.sqrt(ie);
		if (ae < 11) continue;
		let oe = u + D, se = f + k, V = u + O, ce = f + A, H = Math.max(2, Math.round(j * .03)), U = Math.max(2, Math.round(M * .025)), W = Math.max(u, oe - H), le = Math.min(d, V + H), ue = Math.max(f, se - U), de = Math.min(p, ce + U);
		for (; ue < se;) {
			let e = !1;
			for (let n = W; n <= le; n++) if (r[ue * t + n]) {
				e = !0;
				break;
			}
			if (e) ue++;
			else break;
		}
		let G = le - W + 1, fe = de - ue + 1, pe = Math.abs(G / Math.max(1, fe) - .77) * 45, K = (I / (t * n) * 900 + ae * .8 + L * 40 - pe - ne * 120) * l;
		(!x || K > x.score) && (x = {
			bbox: {
				x: Ce(W / t),
				y: Ce(ue / n),
				width: Ce(G / t),
				height: Ce(fe / n)
			},
			score: K,
			method: "pixel_contour"
		});
	}
	return x;
}
function ke(e, t, n, r = {}) {
	if (t < 40 || n < 40 || e.length < t * n * 4) return null;
	let i = we(r.vizLineBoxes ?? [], r.docWidth ?? t, r.docHeight ?? n, t, n), a = Te(i, t, n), o = Ee(i, t, n, r.mrz), s = De(e, t, n), c = Math.min(.86, Math.max(.55, o - .015)), l = Oe(e, t, n, a, s, .015, .37, .07, c, 1.15), u = Oe(e, t, n, a, s, .63, .985, .07, c, .92), d = l ? u ? l.score >= u.score ? l : u : l : u;
	return d ? {
		bbox: d.bbox,
		method: d.method
	} : null;
}
function Ae(e, t, n, r, i, a, o, s, c, l, u) {
	let d = Math.max(1, Math.floor(a)), f = Math.max(1, Math.floor(o)), p = Math.min(t - 2, Math.ceil(s)), m = Math.min(n - 2, Math.ceil(c)), h = p - d + 1, g = m - f + 1;
	if (h < 18 || g < 8) return null;
	let _ = i ? Math.floor(i.x * t) - 3 : -1, v = i ? Math.floor(i.y * n) - 3 : -1, y = i ? Math.ceil((i.x + i.width) * t) + 3 : -1, b = i ? Math.ceil((i.y + i.height) * n) + 3 : -1, x = [];
	for (let n = f; n <= m; n++) for (let a = d; a <= p; a++) {
		if (r[n * t + a] || i && a >= _ && a <= y && n >= v && n <= b) continue;
		let o = (n * t + a) * 4;
		x.push(.299 * e[o] + .587 * e[o + 1] + .114 * e[o + 2]);
	}
	if (x.length < 30) return null;
	x.sort((e, t) => e - t);
	let S = x[Math.floor(x.length * .8)];
	if (S < 110) return null;
	let C = new Uint8Array(h * g);
	for (let n = 0; n < g; n++) {
		let a = f + n;
		for (let o = 0; o < h; o++) {
			let s = d + o;
			if (r[a * t + s] || i && s >= _ && s <= y && a >= v && a <= b) continue;
			let c = (a * t + s) * 4, u = e[c], f = e[c + 1], p = e[c + 2], m = .299 * u + .587 * f + .114 * p, g = Math.max(u, f, p) - Math.min(u, f, p);
			S - m >= l && (m < 140 || g < 42) && (C[n * h + o] = 1);
		}
	}
	let w = h, T = -1, E = g, D = -1, O = 0;
	for (let e = 0; e < g; e++) for (let t = 0; t < h; t++) {
		if (!C[e * h + t]) continue;
		let n = 0;
		for (let r = -1; r <= 1; r++) {
			let i = e + r;
			if (!(i < 0 || i >= g)) for (let e = -1; e <= 1; e++) {
				let a = t + e;
				a < 0 || a >= h || e === 0 && r === 0 || C[i * h + a] && n++;
			}
		}
		n !== 0 && (O++, t < w && (w = t), t > T && (T = t), e < E && (E = e), e > D && (D = e));
	}
	if (O < 16 || T <= w || D <= E) return null;
	let k = T - w + 1, A = D - E + 1, j = O / (k * A), M = k / A;
	if (k < t * .055 || A < 5 || M < u || j < .03 || j > .55) return null;
	let N = Math.max(4, Math.round(k * .06)), P = Math.max(3, Math.round(A * .14)), F = Math.max(d, d + w - N), I = Math.max(f, f + E - P), L = Math.min(p, d + T + N), R = Math.min(m, f + D + P);
	return {
		x: Ce(F / t),
		y: Ce(I / n),
		width: Ce((L - F + 1) / t),
		height: Ce((R - I + 1) / n)
	};
}
function je(e, t, n, r = {}) {
	if (t < 40 || n < 40 || e.length < t * n * 4) return null;
	let i = we(r.vizLineBoxes ?? [], r.docWidth ?? t, r.docHeight ?? n, t, n), a = Te(i, t, n), o = Ee(i, t, n, r.mrz), s = Math.min(n - 2, Math.floor((o - .015) * n)), c = i.filter((e) => ye.test(e.text));
	for (let i of c) {
		let o = i.y1 + 2, c = Math.min(s, i.y1 + Math.round(n * .165)), l = Math.max(0, i.x0 - Math.round(t * .03)), u = Math.min(t - 1, Math.max(i.x1 + Math.round(t * .12), i.x0 + Math.round(t * .38)));
		if (c - o >= 8) {
			let i = Ae(e, t, n, a, r.portraitRect ?? null, l, o, u, c, 38, 1.25);
			if (i) return {
				bbox: i,
				method: "viz_label"
			};
		}
		let d = i.x1 + 4, f = Math.min(t - 1, i.x1 + Math.round(t * .34)), p = Math.max(0, i.y0 - Math.round(n * .02)), m = Math.min(s, i.y1 + Math.round(n * .03));
		if (f - d >= 20 && m - p >= 8) {
			let i = Ae(e, t, n, a, r.portraitRect ?? null, d, p, f, m, 38, 1.25);
			if (i) return {
				bbox: i,
				method: "viz_label"
			};
		}
	}
	let l = Math.round(t * .32), u = Math.round(t * .78), d = Math.round(n * (r.mrz ? .53 : .64)), f = Math.min(Math.round(n * .88), s);
	if (f - d >= 12) {
		let i = Ae(e, t, n, a, r.portraitRect ?? null, l, d, u, f, 54, 1.85);
		if (i && i.height * n >= 7 && i.width >= .09) return {
			bbox: i,
			method: "layout_heuristic"
		};
	}
	return null;
}
function Me(e, t, n) {
	let r = e.width, i = e.height;
	if (!r || !i) return null;
	let a = Math.max(0, Math.round(t.x * r)), o = Math.max(0, Math.round(t.y * i)), s = Math.min(r - a, Math.max(4, Math.round(t.width * r))), c = Math.min(i - o, Math.max(4, Math.round(t.height * i)));
	if (s < 12 || c < 8) return null;
	let l = document.createElement("canvas");
	l.width = s, l.height = c;
	let u = l.getContext("2d");
	return u ? (u.imageSmoothingEnabled = !0, u.imageSmoothingQuality = "high", u.drawImage(e, a, o, s, c, 0, 0, s, c), {
		dataUrl: l.toDataURL("image/png"),
		bbox: t,
		width: s,
		height: c,
		detectionMethod: n
	}) : null;
}
function Ne(e) {
	if (typeof document > "u") return null;
	let t = e.width, n = e.height;
	if (!t || !n) return null;
	let r = Math.min(540, t), i = Math.max(1, Math.round(n * r / t)), a = document.createElement("canvas");
	a.width = r, a.height = i;
	let o = a.getContext("2d", { willReadFrequently: !0 });
	if (!o) return null;
	o.drawImage(e, 0, 0, r, i);
	let s = o.getImageData(0, 0, r, i).data, c = 0, l = Math.floor(r * .1), u = Math.ceil(r * .9), d = Math.floor(i * .12), f = Math.ceil(i * .84), p = Math.max(1, (u - l) * (f - d));
	for (let e = d; e < f; e++) for (let t = l; t < u; t++) {
		let n = (e * r + t) * 4, i = s[n], a = s[n + 1], o = s[n + 2];
		i >= 120 && i - Math.max(a, o) >= 52 && c++;
	}
	let m = c / p;
	if (m < .0035 || m > .22) return null;
	let h = document.createElement("canvas");
	h.width = r, h.height = i;
	let g = h.getContext("2d");
	if (!g) return null;
	let _ = g.createImageData(r, i);
	for (let e = 0; e < s.length; e += 4) {
		let t = s[e], n = s[e + 1], r = s[e + 2], i = t >= 115 && t - Math.max(n, r) >= 46 ? 0 : 255;
		_.data[e] = i, _.data[e + 1] = i, _.data[e + 2] = i, _.data[e + 3] = 255;
	}
	g.putImageData(_, 0, 0);
	let v = [];
	for (let e of [
		0,
		26,
		-26
	]) {
		let t = e * Math.PI / 180, n = Math.cos(t), a = Math.sin(t), o = new Int32Array(i + 40), s = r / 2, c = i / 2;
		for (let e = d; e < f; e += 2) for (let t = l; t < u; t += 2) if (_.data[(e * r + t) * 4] === 0) {
			let r = Math.round((t - s) * a + (e - c) * n + c + 20);
			r >= 0 && r < o.length && o[r]++;
		}
		let p = 0;
		for (let e = 0; e < o.length; e++) p += o[e] * o[e];
		v.push({
			angle: e,
			score: p
		});
	}
	v.sort((e, t) => t.score - e.score);
	let y = v[0]?.angle ?? 0;
	if (y === 0) return h;
	let b = y * Math.PI / 180, x = Math.abs(Math.cos(b)), S = Math.abs(Math.sin(b)), C = Math.ceil(r * x + i * S), w = Math.ceil(r * S + i * x), T = document.createElement("canvas");
	T.width = C, T.height = w;
	let E = T.getContext("2d");
	return E ? (E.fillStyle = "#FFFFFF", E.fillRect(0, 0, C, w), E.translate(C / 2, w / 2), E.rotate(b), E.drawImage(h, -r / 2, -i / 2), T) : h;
}
async function Pe(e, t = {}) {
	let { extractPortrait: n = !0, extractSignature: r = !0, checkColoredWatermark: i = !1 } = t;
	if (!n && !r && !i || typeof document > "u") return {
		portrait: null,
		signature: null,
		watermarkProbeCanvas: null
	};
	let a = null;
	if (a = typeof e == "string" ? await xe(e) : Se(e), !a || !a.width || !a.height) return {
		portrait: null,
		signature: null,
		watermarkProbeCanvas: null
	};
	let o = null, s = null;
	if (n || r) {
		let e = Math.min(ve, a.width), i = Math.max(1, Math.round(a.height * e / a.width)), c = document.createElement("canvas");
		c.width = e, c.height = i;
		let l = c.getContext("2d", { willReadFrequently: !0 });
		if (l) {
			l.drawImage(a, 0, 0, e, i);
			let c = l.getImageData(0, 0, e, i);
			if (n) {
				let n = ke(c.data, e, i, {
					mrz: t.mrz,
					barcode: t.barcode,
					vizLineBoxes: t.vizLineBoxes,
					docWidth: a.width,
					docHeight: a.height
				});
				n && (o = Me(a, n.bbox, n.method));
			}
			if (r) {
				let n = je(c.data, e, i, {
					mrz: t.mrz,
					vizLineBoxes: t.vizLineBoxes,
					docWidth: a.width,
					docHeight: a.height,
					portraitRect: o?.bbox ?? null
				});
				n && (s = Me(a, n.bbox, n.method));
			}
		}
	}
	let c = i ? Ne(a) : null;
	return {
		portrait: o,
		signature: s,
		watermarkProbeCanvas: c
	};
}
// src/scanner/mrzParser.ts
var Fe = [
	7,
	3,
	1
], Ie = {
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
}, Le = {
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
function Re(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = Ie[e[n]] ?? 0;
		t += r * Fe[n % 3];
	}
	return String(t % 10);
}
function ze(e) {
	let t = e.toUpperCase();
	return /[A-Z0-9<]/.test(t) ? t : "<";
}
function Be(e) {
	return e.replace(/O/g, "0").replace(/Q/g, "0").replace(/D/g, "0").replace(/I/g, "1").replace(/L/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/G/g, "6").replace(/B/g, "8");
}
function Ve(e) {
	return e.replace(/0/g, "O").replace(/1/g, "I").replace(/2/g, "Z").replace(/5/g, "S").replace(/6/g, "G").replace(/8/g, "B");
}
function He(e, t) {
	let n = Be(t);
	if (!/^\d$/.test(n) || Re(e) === n) return e;
	let r = e.replace(/[ODQ]/g, "0");
	if (Re(r) === n) return r;
	let i = (e) => e.replace(/[ODQ]/g, "0").replace(/[IL]/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/G/g, "6").replace(/B/g, "8"), a = e.match(/^([A-Z]{1,3})(.*)$/);
	if (a) {
		let e = a[1] + i(a[2]);
		if (Re(e) === n) return e;
	}
	let o = i(e);
	if (Re(o) === n) return o;
	let s = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let n = Le[e[t]];
		n && s.push({
			idx: t,
			reps: n
		});
	}
	for (let t of s) for (let r of t.reps) {
		let i = e.slice(0, t.idx) + r + e.slice(t.idx + 1);
		if (Re(i) === n) return i;
	}
	for (let t = 0; t < s.length; t++) for (let r = t + 1; r < s.length; r++) {
		let i = s[t], a = s[r];
		for (let t of i.reps) for (let r of a.reps) {
			let o = e.split("");
			o[i.idx] = t, o[a.idx] = r;
			let s = o.join("");
			if (Re(s) === n) return s;
		}
	}
	return e;
}
function Ue(e, t) {
	let n = Be(e);
	if (!/^\d{6}$/.test(n)) return null;
	let r = parseInt(n.slice(0, 2), 10), i = parseInt(n.slice(2, 4), 10), a = parseInt(n.slice(4, 6), 10);
	if (i < 1 || i > 12 || a < 1 || a > 31) return null;
	let o = (/* @__PURE__ */ new Date()).getFullYear(), s = o % 100, c = Math.floor(o / 100) * 100, l;
	return l = t === "birth" ? r > s ? c - 100 + r : c + r : r <= s + 50 ? c + r : c - 100 + r, `${l}-${String(i).padStart(2, "0")}-${String(a).padStart(2, "0")}`;
}
function We(e) {
	let t = e.replace(/<+$/g, ""), n = "";
	for (; t !== n;) n = t, t = t.replace(/(?:<+[KL]{2,}|<<[KL])$/g, "").replace(/<+$/g, "");
	return t;
}
function Ge(e) {
	let t = We(e).split("<<"), n = t[0] ?? "", r = t.slice(1).join("<"), i = (e) => Ve(e).split(/<+/).map((e) => e.trim()).filter(Boolean), a = i(n), o = i(r);
	return {
		surname: a.join(" "),
		surnames: a,
		givenNames: o.join(" "),
		givenNamesList: o
	};
}
function Ke(e) {
	let t = e.toUpperCase();
	return t === "M" ? "M" : t === "F" ? "F" : t === "X" ? "X" : "Unspecified";
}
function qe(e) {
	let t = e.trim();
	return !!(!t || /[a-z]{3,}/.test(t) && !t.includes("<") || /[/()]/.test(t) && !t.includes("<"));
}
function Je(e) {
	return e.replace(/\s+/g, "").split("").map(ze).join("");
}
function Ye(e) {
	if (e.length < 26 || !/^[A-Z0-9<]+$/.test(e) || e.startsWith("<")) return !1;
	let t = (e.match(/</g) || []).length, n = (e.match(/\d/g) || []).length;
	return t >= 2 || n >= 4 && e.length >= 28;
}
function Xe(e, t) {
	return e.length === t ? e : e.length > t ? e.slice(0, t) : e.padEnd(t, "<");
}
function Ze(e, t, n, r) {
	let i = Be(r), a = Re(n);
	return {
		label: e,
		field: t,
		expected: a,
		actual: i,
		valid: i === a
	};
}
function Qe(e, t) {
	return t === "D" && e.startsWith("D") && e.length === 2 ? "D" : e;
}
function $e(e, t, n = !1) {
	let r = Xe(e, 44), i = Xe(t, 44), a = Ve(r.slice(0, 2)).replace(/</g, ""), o = Ve(r.slice(2, 5)).replace(/</g, ""), { surname: s, surnames: c, givenNames: l, givenNamesList: u } = Ge(r.slice(5, 44)), d = i.slice(9, 10), f = He(i.slice(0, 9), d), p = Ve(i.slice(10, 13)).replace(/</g, "");
	o = Qe(o, p), !o && p && (o = p);
	let m = Be(i.slice(13, 19)), h = i.slice(19, 20), g = Ke(i.slice(20, 21)), _ = Be(i.slice(21, 27)), v = i.slice(27, 28), y = n ? i.slice(28, 44) : i.slice(28, 42), b = n ? "" : i.slice(42, 43), x = n ? "" : i.slice(43, 44), S = [
		Ze("Document Number", "documentNumber", f, d),
		Ze("Date of Birth", "dateOfBirth", m, h),
		Ze("Date of Expiry", "dateOfExpiry", _, v)
	];
	if (!n) {
		y.replace(/</g, "").length > 0 && S.push(Ze("Personal Number", "optionalData1", y, b));
		let e = f + d + m + h + _ + v + y + b;
		S.push(Ze("Composite Check", "composite", e, x));
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
		dateOfBirth: Ue(m, "birth"),
		rawDateOfBirth: m,
		sex: g,
		dateOfExpiry: Ue(_, "expiry"),
		rawDateOfExpiry: _,
		optionalData1: y.replace(/</g, ""),
		optionalData2: "",
		checkDigits: S,
		allCheckDigitsValid: C === S.length,
		validCount: C,
		totalChecks: S.length
	};
}
function et(e, t, n) {
	let r = Xe(e, 30), i = Xe(t, 30), a = Xe(n, 30), o = Ve(r.slice(0, 2)).replace(/</g, ""), s = Ve(r.slice(2, 5)).replace(/</g, ""), c = r.slice(14, 15), l = He(r.slice(5, 14), c), u = r.slice(15, 30), d = Be(i.slice(0, 6)), f = i.slice(6, 7), p = Ke(i.slice(7, 8)), m = Be(i.slice(8, 14)), h = i.slice(14, 15), g = Ve(i.slice(15, 18)).replace(/</g, "");
	s = Qe(s, g), !s && g && (s = g);
	let _ = i.slice(18, 29), v = i.slice(29, 30), { surname: y, surnames: b, givenNames: x, givenNamesList: S } = Ge(a), C = r.slice(0, 5) + l + c + u, w = d + f + i.slice(7, 8) + m + h + i.slice(15, 30), T = l + c + u + d + f + m + h + _, E = [
		Ze("Document Number", "documentNumber", l, c),
		Ze("Date of Birth", "dateOfBirth", d, f),
		Ze("Date of Expiry", "dateOfExpiry", m, h),
		Ze("Composite Check", "composite", T, v)
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
		dateOfBirth: Ue(d, "birth"),
		rawDateOfBirth: d,
		sex: p,
		dateOfExpiry: Ue(m, "expiry"),
		rawDateOfExpiry: m,
		optionalData1: u.replace(/</g, ""),
		optionalData2: _.replace(/</g, ""),
		checkDigits: E,
		allCheckDigitsValid: D === E.length,
		validCount: D,
		totalChecks: E.length
	};
}
function tt(e, t, n = !1) {
	let r = Xe(e, 36), i = Xe(t, 36), a = Ve(r.slice(0, 2)).replace(/</g, ""), o = Ve(r.slice(2, 5)).replace(/</g, ""), { surname: s, surnames: c, givenNames: l, givenNamesList: u } = Ge(r.slice(5, 36)), d = i.slice(9, 10), f = He(i.slice(0, 9), d), p = Ve(i.slice(10, 13)).replace(/</g, "");
	o = Qe(o, p), !o && p && (o = p);
	let m = Be(i.slice(13, 19)), h = i.slice(19, 20), g = Ke(i.slice(20, 21)), _ = Be(i.slice(21, 27)), v = i.slice(27, 28), y = n ? i.slice(28, 36) : i.slice(28, 35), b = n ? "" : i.slice(35, 36), x = [
		Ze("Document Number", "documentNumber", f, d),
		Ze("Date of Birth", "dateOfBirth", m, h),
		Ze("Date of Expiry", "dateOfExpiry", _, v)
	];
	if (!n) {
		let e = f + d + m + h + _ + v + y;
		x.push(Ze("Composite Check", "composite", e, b));
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
		dateOfBirth: Ue(m, "birth"),
		rawDateOfBirth: m,
		sex: g,
		dateOfExpiry: Ue(_, "expiry"),
		rawDateOfExpiry: _,
		optionalData1: y.replace(/</g, ""),
		optionalData2: "",
		checkDigits: x,
		allCheckDigitsValid: S === x.length,
		validCount: S,
		totalChecks: x.length
	};
}
function nt(e) {
	let t = e.split(/\r?\n/).filter((e) => !qe(e)).map(Je).filter(Ye);
	if (t.length < 2) return null;
	let n = [];
	for (let e = 0; e <= t.length - 3; e++) {
		let r = t[e], i = t[e + 1], a = t[e + 2], o = (r.length + i.length + a.length) / 3;
		o >= 27 && o <= 35 && /^[IAC]/.test(r) && n.push(et(r, i, a));
	}
	for (let e = 0; e <= t.length - 2; e++) {
		let r = t[e], i = t[e + 1], a = Math.max(r.length, i.length), o = Math.min(r.length, i.length);
		if (a >= 40 && o >= 38 && /^[PV]/.test(r)) {
			let e = r.startsWith("V");
			n.push($e(r, i, e));
		} else if (o >= 33 && a <= 39 && /^[PVIAC]/.test(r) && !/^[IAC]/.test(r)) {
			let e = r.startsWith("V");
			n.push(tt(r, i, e));
		}
	}
	if (n.length === 0) {
		if (t.length >= 3 && t[t.length - 3].length <= 36 && /^[IAC]/.test(t[t.length - 3])) n.push(et(t[t.length - 3], t[t.length - 2], t[t.length - 1]));
		else {
			let e = t[t.length - 2], r = t[t.length - 1];
			/^[PVIAC]/.test(e) && (Math.max(e.length, r.length) >= 39 ? n.push($e(e, r, e.startsWith("V"))) : n.push(tt(e, r, e.startsWith("V"))));
		}
	}
	return n.length === 0 ? null : (n.sort((e, t) => {
		let n = e.validCount * 10 + (e.dateOfBirth ? 3 : 0) + (e.dateOfExpiry ? 3 : 0) + (e.surname ? 2 : 0) + (e.givenNames ? 2 : 0);
		return t.validCount * 10 + (t.dateOfBirth ? 3 : 0) + (t.dateOfExpiry ? 3 : 0) + (t.surname ? 2 : 0) + (t.givenNames ? 2 : 0) - n;
	}), n[0]);
}
// src/scanner/orientation.ts
function rt(e, t, n) {
	let r = t + 1, i = new Float64Array(r * (n + 1));
	for (let a = 1; a <= n; a++) {
		let n = 0, o = (a - 1) * t, s = a * r, c = (a - 1) * r;
		for (let r = 1; r <= t; r++) n += e[o + r - 1], i[s + r] = i[c + r] + n;
	}
	return i;
}
function it(e, t, n) {
	let r = rt(e, t, n), i = t + 1, a = Math.max(3, Math.round(Math.min(t, n) / 70)), o = Math.max(2, Math.floor(t * .025)), s = Math.max(2, Math.floor(n * .025)), c = t / 2, l = n / 2, u = [];
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
function at(e, t, n, r) {
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
function ot(e, t, n, r) {
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
function st(e, t, n) {
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
	let r = it(e, t, n);
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
		let { hScore: t, vScore: n } = at(r, e, a, i);
		t > s && (s = t, o = e), n > l && (l = n, c = e);
	}
	let u = s >= l ? o : c, d = o, f = s, p = c, m = l;
	for (let e = -1.8; e <= 1.801; e += .2) {
		let t = u + e;
		if (t < -45 || t > 45) continue;
		let { hScore: n, vScore: o } = at(r, t, a, i);
		n > f && (f = n, d = t), o > m && (m = o, p = t);
	}
	let h = Math.round(-(f >= m ? d : p) * 10) / 10;
	Math.abs(h) < .7 && (h = 0);
	let g = Math.max(f, m) / Math.max(1, Math.min(f, m)), _ = ot(r, h, t, n), v = _.top > _.bottom * 1.15 ? [180, 0] : [0, 180], y = _.left > _.right * 1.08 ? [270, 90] : [90, 270], b = f >= m ? [
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
// src/scanner/specimenValidator.ts
function ct(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function lt(e) {
	return ct(e.replace(/[Ää]/g, "AE").replace(/[Öö]/g, "OE").replace(/[Üü]/g, "UE").replace(/ß/g, "SS").replace(/[Øø]/g, "OE").replace(/[Ææ]/g, "AE").replace(/[Åå]/g, "AA").replace(/[Łł]/g, "L").replace(/[Đđ]/g, "D"));
}
function ut(e) {
	return (e ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function dt(e) {
	return e.toUpperCase().replace(/[ODQ]/g, "0").replace(/[ILT]/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/G/g, "6").replace(/B/g, "8");
}
function ft(e, t) {
	let n = e.length, r = t.length;
	if (n === 0) return r;
	if (r === 0) return n;
	let i = Array.from({ length: r + 1 }, (e, t) => t);
	for (let a = 1; a <= n; a++) {
		let n = i[0];
		i[0] = a;
		for (let o = 1; o <= r; o++) {
			let r = i[o];
			e[a - 1] === t[o - 1] ? i[o] = n : i[o] = 1 + Math.min(n, i[o], i[o - 1]), n = r;
		}
	}
	return i[r];
}
function pt(e, t, n = !1) {
	let r = ct(e), i = ct(t), a = lt(t);
	if (!r || !i) return !0;
	for (let e of [i, a]) {
		if (r === e) return !0;
		let t = r.replace(/\s+/g, ""), i = e.replace(/\s+/g, "");
		if (t === i) return !0;
		if (n) {
			let e = Math.min(t.length, i.length);
			if (e >= 6 && (i.startsWith(t.slice(0, e)) || t.startsWith(i.slice(0, e)))) return !0;
		} else if (t.length >= 6 && i.length >= 6 && (i.includes(t) || t.includes(i))) return !0;
		let a = r.split(" ").filter((e) => e.length >= 2), o = e.split(" ").filter((e) => e.length >= 2);
		if (a.length > 0 && o.length > 0 && a.some((e) => o.some((t) => e === t || n && Math.min(e.length, t.length) >= 4 && (e.startsWith(t) || t.startsWith(e)) ? !0 : Math.max(e.length, t.length) >= 4 && ft(e, t) <= 1))) return !0;
	}
	return !1;
}
function mt(e, t) {
	if (!e || !t) return {
		performed: !1,
		matchedFields: [],
		discrepancies: [],
		consistent: !0
	};
	let n = [], r = [], i = ut(e.documentNumber), a = ut(t.documentNumber);
	i && a && (i === a ? n.push("documentNumber") : i.length === a.length && dt(i) === dt(a) ? r.push({
		field: "documentNumber",
		mrzValue: e.documentNumber,
		vizValue: t.documentNumber,
		severity: "warning"
	}) : r.push({
		field: "documentNumber",
		mrzValue: e.documentNumber,
		vizValue: t.documentNumber,
		severity: "critical"
	})), e.dateOfBirth && t.dateOfBirth && (e.dateOfBirth === t.dateOfBirth ? n.push("dateOfBirth") : r.push({
		field: "dateOfBirth",
		mrzValue: e.dateOfBirth,
		vizValue: t.dateOfBirth,
		severity: "critical"
	})), e.dateOfExpiry && t.dateOfExpiry && (e.dateOfExpiry === t.dateOfExpiry ? n.push("dateOfExpiry") : r.push({
		field: "dateOfExpiry",
		mrzValue: e.dateOfExpiry,
		vizValue: t.dateOfExpiry,
		severity: "critical"
	})), e.sex !== "Unspecified" && t.sex && (e.sex === t.sex ? n.push("sex") : r.push({
		field: "sex",
		mrzValue: e.sex,
		vizValue: t.sex,
		severity: "warning"
	})), e.surname && t.surname && (pt(e.surname, t.surname, !1) ? n.push("surname") : r.push({
		field: "surname",
		mrzValue: e.surname,
		vizValue: t.surname,
		severity: "critical"
	})), e.givenNames && t.givenNames && (pt(e.givenNames, t.givenNames, !0) ? n.push("givenNames") : r.push({
		field: "givenNames",
		mrzValue: e.givenNames,
		vizValue: t.givenNames,
		severity: "warning"
	}));
	let o = t.issuingCountry?.trim().toUpperCase();
	if (e.issuingCountry && o && /^[A-Z]{3}$/.test(o)) {
		let t = e.issuingCountry.trim().toUpperCase();
		t === o || t === "D" && o === "DEU" || t === "DEU" && o === "D" ? n.push("issuingCountry") : r.push({
			field: "issuingCountry",
			mrzValue: t,
			vizValue: o,
			severity: "warning"
		});
	}
	return {
		performed: !0,
		matchedFields: n,
		discrepancies: r,
		consistent: r.length === 0
	};
}
var ht = [
	{
		label: "SPECIMEN watermark",
		regex: /\bSPECIMEN\b|\bESPECIMEN\b|\bSPÉCIMEN\b/,
		weight: 95
	},
	{
		label: "SPECIMEN watermark (OCR fuzzy)",
		regex: /\b[S5]P[E3]C[IL1|]M[E3]N\b/,
		weight: 80
	},
	{
		label: "MUSTER watermark (DE)",
		regex: /\bMUSTER\b(?!\s*(?:STRASSE|STR\.?|WEG|PLATZ))/,
		weight: 92
	},
	{
		label: "MUSTERMANN specimen persona",
		regex: /\b(?:ERIKA|MAX)\s+MUSTERMANN\b|\bMUSTERMANN\b/,
		weight: 88
	},
	{
		label: "WZÓR watermark (PL)",
		regex: /\bWZOR\b|\bWZÓR\b/,
		weight: 90
	},
	{
		label: "VZOR watermark (CZ/SK)",
		regex: /\bVZOR\b/,
		weight: 90
	},
	{
		label: "MUESTRA watermark (ES)",
		regex: /\bMUESTRA\b|\bSIN VALOR\b/,
		weight: 88
	},
	{
		label: "ÉCHANTILLON watermark (FR)",
		regex: /\bECHANTILLON\b|\bÉCHANTILLON\b/,
		weight: 90
	},
	{
		label: "VOID watermark",
		regex: /\bVOID\b(?:\s+(?:DOCUMENT|ID|CARD|PASSPORT))?/,
		weight: 85
	},
	{
		label: "SAMPLE watermark",
		regex: /\bSAMPLE\b(?:\s+(?:DOCUMENT|ID|CARD|PASSPORT|ONLY))?/,
		weight: 82
	},
	{
		label: "FACSIMILE watermark",
		regex: /\bFACSIMILE\b/,
		weight: 88
	},
	{
		label: "MINTA / MALLI / CAMPIONE / VOORBEELD watermark",
		regex: /\b(?:MINTA|MALLI|CAMPIONE|VOORBEELD|PROBEDRUCK|ENTWURF)\b/,
		weight: 85
	},
	{
		label: "NOT VALID FOR TRAVEL notice",
		regex: /\bNOT\s+VALID\s+FOR\s+TRAVEL\b|\bTEST\s+DOCUMENT\b/,
		weight: 92
	}
];
function gt(e, t, n, r) {
	if (!e || !e.trim()) return;
	let i = e.toUpperCase(), a = ct(e);
	for (let e of ht) if (e.regex.test(i) || e.regex.test(a)) {
		let i = n.get(e.label) ?? 0;
		e.weight > i && n.set(e.label, e.weight), r.add(t);
	}
}
function _t(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [
		e.viz?.surname,
		e.viz?.givenNames,
		e.viz?.fullName,
		e.viz?.issuingAuthority,
		e.viz?.address,
		...e.viz?.detectedLines ?? [],
		...Object.entries(e.unmappedFields ?? {}).flat()
	].filter(Boolean).join("\n");
	gt(e.rawOcrText, "ocr_text", t, n), r && gt(r, "ocr_text", t, n), e.watermarkOcrText && gt(e.watermarkOcrText, "watermark_visual", t, n), e.rawMrzText && gt(e.rawMrzText.replace(/</g, " "), "mrz", t, n), e.mrz && ((e.mrz.issuingCountry.toUpperCase() === "UTO" || e.mrz.nationality.toUpperCase() === "UTO") && (t.set("ICAO Utopia (UTO) test country code", 96), n.add("mrz")), gt(`${e.mrz.surname} ${e.mrz.givenNames} ${e.mrz.rawLines.join(" ").replace(/</g, " ")}`, "mrz", t, n)), e.barcode && gt(e.barcode.aamva ? `${e.barcode.aamva.fullName ?? ""} ${e.barcode.aamva.address ?? ""} ${Object.values(e.barcode.aamva.fields).join(" ")}` : e.barcode.rawText, "barcode", t, n);
	let i = Array.from(t.keys()), a = i.reduce((e, n) => Math.max(e, t.get(n) ?? 0), 0), o = Math.min(8, Math.max(0, i.length - 1) * 4), s = i.length > 0 ? Math.min(99, a + o) : 0;
	return {
		isSpecimen: i.length > 0,
		confidence: s,
		matchedIndicators: i,
		sources: Array.from(n)
	};
}
function vt(e, t) {
	if (!e && !t) return;
	let n = Array.from(/* @__PURE__ */ new Set([...e?.matchedIndicators ?? [], ...t?.matchedIndicators ?? []])), r = Array.from(/* @__PURE__ */ new Set([...e?.sources ?? [], ...t?.sources ?? []]));
	return {
		isSpecimen: !!(e?.isSpecimen || t?.isSpecimen),
		confidence: Math.max(e?.confidence ?? 0, t?.confidence ?? 0),
		matchedIndicators: n,
		sources: r
	};
}
// src/scanner/pairMerger.ts
function yt(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date(), i = r.getFullYear() - n.getFullYear(), a = r.getMonth() - n.getMonth();
	return (a < 0 || a === 0 && r.getDate() < n.getDate()) && i--, i >= 0 && i <= 130 ? i : null;
}
function bt(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date();
	return r.setHours(0, 0, 0, 0), n < r;
}
function xt(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function St(e) {
	return (e ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function Ct(e) {
	return /[^\u0000-\u007F]/.test(e);
}
function wt(e) {
	return e ? (e.allCheckDigitsValid ? 100 : 0) + e.validCount * 18 + (e.surname ? 10 : 0) + (e.documentNumber ? 10 : 0) : -1;
}
function Tt(e) {
	return e ? e.aamva ? 100 + Object.keys(e.aamva.fields).length : 10 : -1;
}
function Et(e) {
	return e === "BARCODE" || e === "BARCODE+VIZ";
}
function Dt(e, t, n, r, i, a, o, s) {
	let c = e?.trim() || null, l = t?.trim() || null;
	if (c && l) {
		let e = o?.includes("MRZ") || s?.includes("MRZ"), t = Et(o) || Et(s);
		if (a[i] = e ? "MRZ+VIZ" : t ? "BARCODE+VIZ" : "VIZ", xt(c) === xt(l)) {
			if (Ct(c) && !Ct(l)) return c;
			if (Ct(l) && !Ct(c)) return l;
		}
		return o === "MRZ" && s !== "MRZ" ? c : s === "MRZ" && o !== "MRZ" ? l : Et(o) && !Et(s) ? c : Et(s) && !Et(o) ? l : c.length !== l.length && Math.abs(c.length - l.length) >= 3 ? c.length > l.length ? c : l : n >= r ? c : l;
	}
	return c ? (a[i] = o ?? "VIZ", c) : l ? (a[i] = s ?? "VIZ", l) : null;
}
function Ot(e, t, n, r, i, a) {
	let o = e?.trim() || null, s = t?.trim() || null, c = n?.trim() || null, l = r?.trim() || null, u = c && l ? c.length >= l.length ? c : l : c || l;
	if (o && u) {
		a[i] = "MRZ+VIZ";
		let e = xt(o), t = xt(u);
		return t === e && Ct(u) || t.length > e.length && e.length >= 8 && t.startsWith(e.slice(0, Math.min(8, e.length))) ? u : o;
	}
	return o ? (a[i] = "MRZ", o) : s ? (a[i] = u ? "BARCODE+VIZ" : "BARCODE", s) : u ? (a[i] = "VIZ", u) : null;
}
function kt(e, t) {
	return e.documentType === "unknown" ? t.documentType === "unknown" ? "unknown" : t.documentType : e.documentType;
}
function At(e, t) {
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
function jt(e, t) {
	if (!e?.performed && !t?.performed) return e ?? t;
	if (e?.performed && !t?.performed) return e;
	if (!e?.performed && t?.performed) return t;
	let n = Array.from(/* @__PURE__ */ new Set([...e?.matchedFields ?? [], ...t?.matchedFields ?? []])), r = [...e?.discrepancies ?? [], ...t?.discrepancies ?? []];
	return {
		performed: !0,
		matchedFields: n,
		discrepancies: r,
		consistent: r.length === 0
	};
}
function Mt(e, t) {
	let n = e.mrz !== null, r = t.mrz !== null, i = Tt(t.barcode) >= Tt(e.barcode) ? t.barcode : e.barcode, a = i?.aamva ?? null, o = "front+back";
	n && r ? o = "both_mrz" : n && !r ? o = "swapped_detected" : !n && !r && (o = i ? "barcode_back" : "visual_only");
	let s = wt(t.mrz) >= wt(e.mrz) ? t.mrz : e.mrz, c = wt(t.mrz) >= wt(e.mrz) ? t.rawMrzText || e.rawMrzText : e.rawMrzText || t.rawMrzText, l = n || e.barcode?.aamva ? null : e, u = r || t.barcode?.aamva ? null : t, d = {}, f = [], p = St(e.documentNumber), m = St(t.documentNumber);
	if (p && m && p !== m && !p.includes(m) && !m.includes(p) && f.push({
		field: "documentNumber",
		frontValue: e.documentNumber,
		backValue: t.documentNumber,
		resolution: t.mrz?.allCheckDigitsValid ? `Used back MRZ value (${t.documentNumber})` : e.mrz?.allCheckDigitsValid ? `Used front MRZ value (${e.documentNumber})` : a?.documentNumber ? `Used AAMVA PDF417 barcode (${a.documentNumber})` : "Used higher-confidence side"
	}), e.dateOfBirth && t.dateOfBirth && e.dateOfBirth !== t.dateOfBirth && f.push({
		field: "dateOfBirth",
		frontValue: e.dateOfBirth,
		backValue: t.dateOfBirth,
		resolution: s?.dateOfBirth ? `Used MRZ date of birth (${s.dateOfBirth})` : a?.dateOfBirth ? `Used AAMVA barcode DOB (${a.dateOfBirth})` : "Used higher-confidence side"
	}), e.dateOfExpiry && t.dateOfExpiry && e.dateOfExpiry !== t.dateOfExpiry && f.push({
		field: "dateOfExpiry",
		frontValue: e.dateOfExpiry,
		backValue: t.dateOfExpiry,
		resolution: s?.dateOfExpiry ? `Used MRZ date of expiry (${s.dateOfExpiry})` : a?.dateOfExpiry ? `Used AAMVA barcode expiry (${a.dateOfExpiry})` : "Used higher-confidence side"
	}), e.sex !== "Unspecified" && t.sex !== "Unspecified" && e.sex !== t.sex && f.push({
		field: "sex",
		frontValue: e.sex,
		backValue: t.sex,
		resolution: s?.sex && s.sex !== "Unspecified" ? `Used MRZ sex (${s.sex})` : a?.sex ? `Used AAMVA barcode sex (${a.sex})` : `Used front side (${e.sex})`
	}), e.surname && t.surname) {
		let n = xt(e.surname), r = xt(t.surname), i = new Set(n.split(" ").filter((e) => e.length >= 2)), o = r.split(" ").filter((e) => e.length >= 2).some((e) => i.has(e));
		n && r && !o && !n.includes(r) && !r.includes(n) && f.push({
			field: "surname",
			frontValue: e.surname,
			backValue: t.surname,
			resolution: s?.surname ? `Used MRZ surname (${s.surname})` : a?.surname ? `Used AAMVA barcode surname (${a.surname})` : "Used higher-confidence side"
		});
	}
	let h = Dt(e.issuingCountry, t.issuingCountry, e.confidence, t.confidence, "issuingCountry", d, e.fieldSources.issuingCountry, t.fieldSources.issuingCountry), g = Dt(e.nationality, t.nationality, e.confidence, t.confidence, "nationality", d, e.fieldSources.nationality, t.fieldSources.nationality), _ = Ot(s?.surname, a?.surname, l?.surname ?? (n ? null : e.surname), u?.surname ?? (r ? null : t.surname), "surname", d) ?? Dt(e.surname, t.surname, e.confidence, t.confidence, "surname", d, e.fieldSources.surname, t.fieldSources.surname), v = Ot(s?.givenNames, a?.givenNames, l?.givenNames ?? (n ? null : e.givenNames), u?.givenNames ?? (r ? null : t.givenNames), "givenNames", d) ?? Dt(e.givenNames, t.givenNames, e.confidence, t.confidence, "givenNames", d, e.fieldSources.givenNames, t.fieldSources.givenNames), y = s?.surnames && s.surnames.length > 0 && _ === s.surname ? s.surnames : a?.surnames && a.surnames.length > 0 && _ === a.surname ? a.surnames : _ ? _.split(/\s+/).filter(Boolean) : [], b = s?.givenNamesList && s.givenNamesList.length > 0 && v === s.givenNames ? s.givenNamesList : a?.givenNamesList && a.givenNamesList.length > 0 && v === a.givenNames ? a.givenNamesList : v ? v.split(/\s+/).filter(Boolean) : [], x = v || _ ? [v, _].filter(Boolean).join(" ") : Dt(e.fullName, t.fullName, e.confidence, t.confidence, "fullName", d, e.fieldSources.fullName, t.fieldSources.fullName);
	x && !d.fullName && (d.fullName = d.givenNames === "MRZ+VIZ" || d.surname === "MRZ+VIZ" ? "MRZ+VIZ" : d.givenNames === "BARCODE+VIZ" || d.surname === "BARCODE+VIZ" ? "BARCODE+VIZ" : d.givenNames ?? d.surname ?? "VIZ");
	let S = s?.documentNumber ? (d.documentNumber = e.documentNumber && t.documentNumber ? "MRZ+VIZ" : "MRZ", s.documentNumber) : a?.documentNumber ? (d.documentNumber = l?.documentNumber || u?.documentNumber ? "BARCODE+VIZ" : "BARCODE", a.documentNumber) : Dt(e.documentNumber, t.documentNumber, e.confidence, t.confidence, "documentNumber", d, e.fieldSources.documentNumber, t.fieldSources.documentNumber), C = Dt(e.personalNumber, t.personalNumber, e.confidence, t.confidence, "personalNumber", d, e.fieldSources.personalNumber, t.fieldSources.personalNumber), w = s?.dateOfBirth ? (d.dateOfBirth = l?.dateOfBirth || u?.dateOfBirth ? "MRZ+VIZ" : "MRZ", s.dateOfBirth) : a?.dateOfBirth ? (d.dateOfBirth = l?.dateOfBirth || u?.dateOfBirth ? "BARCODE+VIZ" : "BARCODE", a.dateOfBirth) : Dt(e.dateOfBirth, t.dateOfBirth, e.confidence, t.confidence, "dateOfBirth", d, e.fieldSources.dateOfBirth, t.fieldSources.dateOfBirth), T = s?.dateOfExpiry ? (d.dateOfExpiry = l?.dateOfExpiry || u?.dateOfExpiry ? "MRZ+VIZ" : "MRZ", s.dateOfExpiry) : a?.dateOfExpiry ? (d.dateOfExpiry = l?.dateOfExpiry || u?.dateOfExpiry ? "BARCODE+VIZ" : "BARCODE", a.dateOfExpiry) : Dt(e.dateOfExpiry, t.dateOfExpiry, e.confidence, t.confidence, "dateOfExpiry", d, e.fieldSources.dateOfExpiry, t.fieldSources.dateOfExpiry), E = a?.dateOfIssue ? (d.dateOfIssue = l?.dateOfIssue || u?.dateOfIssue ? "BARCODE+VIZ" : "BARCODE", a.dateOfIssue) : Dt(e.dateOfIssue, t.dateOfIssue, e.confidence, t.confidence, "dateOfIssue", d, e.fieldSources.dateOfIssue, t.fieldSources.dateOfIssue), D = "Unspecified";
	s?.sex && s.sex !== "Unspecified" ? (D = s.sex, d.sex = l?.sex || u?.sex ? "MRZ+VIZ" : "MRZ") : a?.sex ? (D = a.sex, d.sex = l?.sex || u?.sex ? "BARCODE+VIZ" : "BARCODE") : e.sex !== "Unspecified" && t.sex !== "Unspecified" ? (D = e.confidence >= t.confidence ? e.sex : t.sex, d.sex = "VIZ") : e.sex === "Unspecified" ? t.sex !== "Unspecified" && (D = t.sex, d.sex = t.fieldSources.sex ?? "VIZ") : (D = e.sex, d.sex = e.fieldSources.sex ?? "VIZ");
	let O = Dt(e.placeOfBirth, t.placeOfBirth, e.confidence, t.confidence, "placeOfBirth", d, e.fieldSources.placeOfBirth, t.fieldSources.placeOfBirth), k = Dt(e.address, t.address, e.confidence, t.confidence, "address", d, e.fieldSources.address, t.fieldSources.address), A = Dt(e.parents, t.parents, e.confidence, t.confidence, "parents", d, e.fieldSources.parents, t.fieldSources.parents), j = Dt(e.issuingAuthority, t.issuingAuthority, e.confidence, t.confidence, "issuingAuthority", d, e.fieldSources.issuingAuthority, t.fieldSources.issuingAuthority), M = Dt(e.licenseClass, t.licenseClass, e.confidence, t.confidence, "licenseClass", d, e.fieldSources.licenseClass, t.fieldSources.licenseClass), N = Dt(e.restrictions, t.restrictions, e.confidence, t.confidence, "restrictions", d, e.fieldSources.restrictions, t.fieldSources.restrictions), P = Dt(e.endorsements, t.endorsements, e.confidence, t.confidence, "endorsements", d, e.fieldSources.endorsements, t.fieldSources.endorsements), F = Dt(e.height, t.height, e.confidence, t.confidence, "height", d, e.fieldSources.height, t.fieldSources.height), I = Dt(e.eyeColor, t.eyeColor, e.confidence, t.confidence, "eyeColor", d, e.fieldSources.eyeColor, t.fieldSources.eyeColor), L = Dt(e.hairColor, t.hairColor, e.confidence, t.confidence, "hairColor", d, e.fieldSources.hairColor, t.fieldSources.hairColor), R = yt(w);
	R !== null && (d.age = "COMPUTED");
	let ee = bt(T);
	ee !== null && (d.isExpired = "COMPUTED");
	let z = {
		...e.unmappedFields,
		...t.unmappedFields
	}, te = [e.rawOcrText ? `--- FRONT SIDE ---\n${e.rawOcrText}` : "", t.rawOcrText ? `--- BACK SIDE ---\n${t.rawOcrText}` : ""].filter(Boolean).join("\n\n"), B = a ? Math.max(94, Math.round((e.confidence + t.confidence) / 2)) : Math.round((e.confidence + t.confidence) / 2), ne = e.processingTimeMs + t.processingTimeMs, re = r ? t : e, ie = re.vizLanguageMode ?? e.vizLanguageMode ?? t.vizLanguageMode, ae = re.vizLanguage ?? e.vizLanguage ?? t.vizLanguage, oe = o === "swapped_detected" ? t.portraitRegion ? t : e : e.portraitRegion ? e : t, se = e.signatureRegion ? e : t.signatureRegion ? t : oe;
	return {
		documentType: kt(e, t),
		documentFormat: s ? s.format : a ? "AAMVA_PDF417" : i ? "PDF417" : "VISUAL_ONLY",
		issuingCountry: h,
		issuingCountryName: ue(h),
		documentNumber: S,
		personalNumber: C,
		surname: _,
		surnames: y,
		givenNames: v,
		givenNamesList: b,
		fullName: x,
		nationality: g,
		nationalityName: ue(g) ?? g,
		dateOfBirth: w,
		age: R,
		sex: D,
		dateOfIssue: E,
		dateOfExpiry: T,
		isExpired: ee,
		placeOfBirth: O,
		address: k,
		parents: A,
		issuingAuthority: j,
		licenseClass: M,
		restrictions: N,
		endorsements: P,
		height: F,
		eyeColor: I,
		hairColor: L,
		mrz: s,
		barcode: i,
		portraitDataUrl: oe.portraitDataUrl ?? e.portraitDataUrl ?? t.portraitDataUrl ?? null,
		portraitRegion: oe.portraitRegion ?? null,
		signatureDataUrl: se.signatureDataUrl ?? e.signatureDataUrl ?? t.signatureDataUrl ?? null,
		signatureRegion: se.signatureRegion ?? null,
		specimen: vt(e.specimen, t.specimen),
		crossValidation: jt(e.crossValidation, t.crossValidation),
		mrzModel: s === t.mrz ? t.mrzModel ?? e.mrzModel : e.mrzModel ?? t.mrzModel,
		vizLanguageMode: ie,
		vizLanguage: ae,
		workerPreprocessed: e.workerPreprocessed || t.workerPreprocessed,
		unmappedFields: z,
		fieldSources: d,
		rawOcrText: te,
		rawMrzText: c,
		confidence: B,
		processingTimeMs: ne,
		sourceDimensions: r ? t.sourceDimensions : e.sourceDimensions,
		orientation: r ? t.orientation : e.orientation,
		perspective: r ? t.perspective : e.perspective,
		quality: At(e.quality, t.quality),
		previews: r ? t.previews ?? e.previews : e.previews ?? t.previews,
		sides: {
			front: e,
			back: t
		},
		sideAssignment: o,
		conflicts: f,
		sidesConsistent: f.length === 0
	};
}
// node_modules/ts-custom-error/dist/custom-error.mjs
function Nt(e, t) {
	var n = Object.setPrototypeOf;
	n ? n(e, t) : e.__proto__ = t;
}
function Pt(e, t) {
	t === void 0 && (t = e.constructor);
	var n = Error.captureStackTrace;
	n && n(e, t);
}
var Ft = function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
}(), It = function(e) {
	Ft(t, e);
	function t(t, n) {
		var r = this.constructor, i = e.call(this, t, n) || this;
		return Object.defineProperty(i, "name", {
			value: r.name,
			enumerable: !1,
			configurable: !0
		}), Nt(i, r.prototype), Pt(i), i;
	}
	return t;
}(Error), Lt = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), Rt = function(e) {
	Lt(t, e);
	function t(t) {
		t === void 0 && (t = void 0);
		var n = e.call(this, t) || this;
		return n.message = t, n;
	}
	return t.prototype.getKind = function() {
		return this.constructor.kind;
	}, t.kind = "Exception", t;
}(It), zt = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), q = function(e) {
	zt(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.kind = "IllegalArgumentException", t;
}(Rt), Bt = function() {
	function e(e) {
		if (this.binarizer = e, e === null) throw new q("Binarizer must be non-null.");
	}
	return e.prototype.getWidth = function() {
		return this.binarizer.getWidth();
	}, e.prototype.getHeight = function() {
		return this.binarizer.getHeight();
	}, e.prototype.getBlackRow = function(e, t) {
		return this.binarizer.getBlackRow(e, t);
	}, e.prototype.getBlackMatrix = function() {
		return (this.matrix === null || this.matrix === void 0) && (this.matrix = this.binarizer.getBlackMatrix()), this.matrix;
	}, e.prototype.isCropSupported = function() {
		return this.binarizer.getLuminanceSource().isCropSupported();
	}, e.prototype.crop = function(t, n, r, i) {
		var a = this.binarizer.getLuminanceSource().crop(t, n, r, i);
		return new e(this.binarizer.createBinarizer(a));
	}, e.prototype.isRotateSupported = function() {
		return this.binarizer.getLuminanceSource().isRotateSupported();
	}, e.prototype.rotateCounterClockwise = function() {
		var t = this.binarizer.getLuminanceSource().rotateCounterClockwise();
		return new e(this.binarizer.createBinarizer(t));
	}, e.prototype.rotateCounterClockwise45 = function() {
		var t = this.binarizer.getLuminanceSource().rotateCounterClockwise45();
		return new e(this.binarizer.createBinarizer(t));
	}, e.prototype.toString = function() {
		try {
			return this.getBlackMatrix().toString();
		} catch {
			return "";
		}
	}, e;
}(), Vt;
(function(e) {
	e[e.OTHER = 0] = "OTHER", e[e.PURE_BARCODE = 1] = "PURE_BARCODE", e[e.POSSIBLE_FORMATS = 2] = "POSSIBLE_FORMATS", e[e.TRY_HARDER = 3] = "TRY_HARDER", e[e.CHARACTER_SET = 4] = "CHARACTER_SET", e[e.ALLOWED_LENGTHS = 5] = "ALLOWED_LENGTHS", e[e.ASSUME_CODE_39_CHECK_DIGIT = 6] = "ASSUME_CODE_39_CHECK_DIGIT", e[e.ENABLE_CODE_39_EXTENDED_MODE = 7] = "ENABLE_CODE_39_EXTENDED_MODE", e[e.ASSUME_GS1 = 8] = "ASSUME_GS1", e[e.RETURN_CODABAR_START_END = 9] = "RETURN_CODABAR_START_END", e[e.NEED_RESULT_POINT_CALLBACK = 10] = "NEED_RESULT_POINT_CALLBACK", e[e.ALLOWED_EAN_EXTENSIONS = 11] = "ALLOWED_EAN_EXTENSIONS";
})(Vt ||= {});
var Ht = Vt, Ut = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), Wt = function(e) {
	Ut(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.getFormatInstance = function() {
		return new t();
	}, t.kind = "FormatException", t;
}(Rt), Gt = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, J;
(function(e) {
	e[e.Cp437 = 0] = "Cp437", e[e.ISO8859_1 = 1] = "ISO8859_1", e[e.ISO8859_2 = 2] = "ISO8859_2", e[e.ISO8859_3 = 3] = "ISO8859_3", e[e.ISO8859_4 = 4] = "ISO8859_4", e[e.ISO8859_5 = 5] = "ISO8859_5", e[e.ISO8859_6 = 6] = "ISO8859_6", e[e.ISO8859_7 = 7] = "ISO8859_7", e[e.ISO8859_8 = 8] = "ISO8859_8", e[e.ISO8859_9 = 9] = "ISO8859_9", e[e.ISO8859_10 = 10] = "ISO8859_10", e[e.ISO8859_11 = 11] = "ISO8859_11", e[e.ISO8859_13 = 12] = "ISO8859_13", e[e.ISO8859_14 = 13] = "ISO8859_14", e[e.ISO8859_15 = 14] = "ISO8859_15", e[e.ISO8859_16 = 15] = "ISO8859_16", e[e.SJIS = 16] = "SJIS", e[e.Cp1250 = 17] = "Cp1250", e[e.Cp1251 = 18] = "Cp1251", e[e.Cp1252 = 19] = "Cp1252", e[e.Cp1256 = 20] = "Cp1256", e[e.UnicodeBigUnmarked = 21] = "UnicodeBigUnmarked", e[e.UTF8 = 22] = "UTF8", e[e.ASCII = 23] = "ASCII", e[e.Big5 = 24] = "Big5", e[e.GB18030 = 25] = "GB18030", e[e.EUC_KR = 26] = "EUC_KR";
})(J ||= {});
var Kt = function() {
	function e(t, n, r) {
		var i, a, o = [...arguments].slice(3);
		this.valueIdentifier = t, this.name = r, this.values = typeof n == "number" ? Int32Array.from([n]) : n, this.otherEncodingNames = o, e.VALUE_IDENTIFIER_TO_ECI.set(t, this), e.NAME_TO_ECI.set(r, this);
		for (var s = this.values, c = 0, l = s.length; c !== l; c++) {
			var u = s[c];
			e.VALUES_TO_ECI.set(u, this);
		}
		try {
			for (var d = Gt(o), f = d.next(); !f.done; f = d.next()) {
				var p = f.value;
				e.NAME_TO_ECI.set(p, this);
			}
		} catch (e) {
			i = { error: e };
		} finally {
			try {
				f && !f.done && (a = d.return) && a.call(d);
			} finally {
				if (i) throw i.error;
			}
		}
	}
	return e.prototype.getValueIdentifier = function() {
		return this.valueIdentifier;
	}, e.prototype.getName = function() {
		return this.name;
	}, e.prototype.getValue = function() {
		return this.values[0];
	}, e.getCharacterSetECIByValue = function(t) {
		if (t < 0 || t >= 900) throw new Wt("incorect value");
		var n = e.VALUES_TO_ECI.get(t);
		if (n === void 0) throw new Wt("incorect value");
		return n;
	}, e.getCharacterSetECIByName = function(t) {
		var n = e.NAME_TO_ECI.get(t);
		if (n === void 0) throw new Wt("incorect value");
		return n;
	}, e.prototype.equals = function(t) {
		if (!(t instanceof e)) return !1;
		var n = t;
		return this.getName() === n.getName();
	}, e.VALUE_IDENTIFIER_TO_ECI = /* @__PURE__ */ new Map(), e.VALUES_TO_ECI = /* @__PURE__ */ new Map(), e.NAME_TO_ECI = /* @__PURE__ */ new Map(), e.Cp437 = new e(J.Cp437, Int32Array.from([0, 2]), "Cp437"), e.ISO8859_1 = new e(J.ISO8859_1, Int32Array.from([1, 3]), "ISO-8859-1", "ISO88591", "ISO8859_1"), e.ISO8859_2 = new e(J.ISO8859_2, 4, "ISO-8859-2", "ISO88592", "ISO8859_2"), e.ISO8859_3 = new e(J.ISO8859_3, 5, "ISO-8859-3", "ISO88593", "ISO8859_3"), e.ISO8859_4 = new e(J.ISO8859_4, 6, "ISO-8859-4", "ISO88594", "ISO8859_4"), e.ISO8859_5 = new e(J.ISO8859_5, 7, "ISO-8859-5", "ISO88595", "ISO8859_5"), e.ISO8859_6 = new e(J.ISO8859_6, 8, "ISO-8859-6", "ISO88596", "ISO8859_6"), e.ISO8859_7 = new e(J.ISO8859_7, 9, "ISO-8859-7", "ISO88597", "ISO8859_7"), e.ISO8859_8 = new e(J.ISO8859_8, 10, "ISO-8859-8", "ISO88598", "ISO8859_8"), e.ISO8859_9 = new e(J.ISO8859_9, 11, "ISO-8859-9", "ISO88599", "ISO8859_9"), e.ISO8859_10 = new e(J.ISO8859_10, 12, "ISO-8859-10", "ISO885910", "ISO8859_10"), e.ISO8859_11 = new e(J.ISO8859_11, 13, "ISO-8859-11", "ISO885911", "ISO8859_11"), e.ISO8859_13 = new e(J.ISO8859_13, 15, "ISO-8859-13", "ISO885913", "ISO8859_13"), e.ISO8859_14 = new e(J.ISO8859_14, 16, "ISO-8859-14", "ISO885914", "ISO8859_14"), e.ISO8859_15 = new e(J.ISO8859_15, 17, "ISO-8859-15", "ISO885915", "ISO8859_15"), e.ISO8859_16 = new e(J.ISO8859_16, 18, "ISO-8859-16", "ISO885916", "ISO8859_16"), e.SJIS = new e(J.SJIS, 20, "SJIS", "Shift_JIS"), e.Cp1250 = new e(J.Cp1250, 21, "Cp1250", "windows-1250"), e.Cp1251 = new e(J.Cp1251, 22, "Cp1251", "windows-1251"), e.Cp1252 = new e(J.Cp1252, 23, "Cp1252", "windows-1252"), e.Cp1256 = new e(J.Cp1256, 24, "Cp1256", "windows-1256"), e.UnicodeBigUnmarked = new e(J.UnicodeBigUnmarked, 25, "UnicodeBigUnmarked", "UTF-16BE", "UnicodeBig"), e.UTF8 = new e(J.UTF8, 26, "UTF8", "UTF-8"), e.ASCII = new e(J.ASCII, Int32Array.from([27, 170]), "ASCII", "US-ASCII"), e.Big5 = new e(J.Big5, 28, "Big5"), e.GB18030 = new e(J.GB18030, 29, "GB18030", "GB2312", "EUC_CN", "GBK"), e.EUC_KR = new e(J.EUC_KR, 30, "EUC_KR", "EUC-KR"), e;
}(), qt = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), Jt = function(e) {
	qt(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.kind = "UnsupportedOperationException", t;
}(Rt), Yt = function() {
	function e() {}
	return e.decode = function(e, t) {
		var n = this.encodingName(t);
		return this.customDecoder ? this.customDecoder(e, n) : typeof TextDecoder > "u" || this.shouldDecodeOnFallback(n) ? this.decodeFallback(e, n) : new TextDecoder(n).decode(e);
	}, e.shouldDecodeOnFallback = function(e) {
		return !1;
	}, e.encode = function(e, t) {
		var n = this.encodingName(t);
		return this.customEncoder ? this.customEncoder(e, n) : typeof TextEncoder > "u" ? this.encodeFallback(e) : new TextEncoder().encode(e);
	}, e.isBrowser = function() {
		return typeof window < "u" && {}.toString.call(window) === "[object Window]";
	}, e.encodingName = function(e) {
		return typeof e == "string" ? e : e.getName();
	}, e.encodingCharacterSet = function(e) {
		return e instanceof Kt ? e : Kt.getCharacterSetECIByName(e);
	}, e.decodeFallback = function(t, n) {
		var r = this.encodingCharacterSet(n);
		if (e.isDecodeFallbackSupported(r)) {
			for (var i = "", a = 0, o = t.length; a < o; a++) {
				var s = t[a].toString(16);
				s.length < 2 && (s = "0" + s), i += "%" + s;
			}
			return decodeURIComponent(i);
		}
		if (r.equals(Kt.UnicodeBigUnmarked)) return String.fromCharCode.apply(null, Array.from(new Uint16Array(t.buffer)));
		throw new Jt(`Encoding ${this.encodingName(n)} not supported by fallback.`);
	}, e.isDecodeFallbackSupported = function(e) {
		return e.equals(Kt.UTF8) || e.equals(Kt.ISO8859_1) || e.equals(Kt.ASCII);
	}, e.encodeFallback = function(e) {
		for (var t = btoa(unescape(encodeURIComponent(e))).split(""), n = [], r = 0; r < t.length; r++) n.push(t[r].charCodeAt(0));
		return new Uint8Array(n);
	}, e;
}(), Xt = function() {
	function e() {}
	return e.castAsNonUtf8Char = function(e, t) {
		t === void 0 && (t = null);
		var n = t ? t.getName() : this.ISO88591;
		return Yt.decode(new Uint8Array([e]), n);
	}, e.guessEncoding = function(t, n) {
		if (n != null && n.get(Ht.CHARACTER_SET) !== void 0) return n.get(Ht.CHARACTER_SET).toString();
		for (var r = t.length, i = !0, a = !0, o = !0, s = 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = t.length > 3 && t[0] === 239 && t[1] === 187 && t[2] === 191, y = 0; y < r && (i || a || o); y++) {
			var b = t[y] & 255;
			o && (s > 0 ? b & 128 ? s-- : o = !1 : b & 128 && (b & 64 ? (s++, b & 32 ? (s++, b & 16 ? (s++, b & 8 ? o = !1 : u++) : l++) : c++) : o = !1)), i && (b > 127 && b < 160 ? i = !1 : b > 159 && (b < 192 || b === 215 || b === 247) && _++), a && (d > 0 ? b < 64 || b === 127 || b > 252 ? a = !1 : d-- : b === 128 || b === 160 || b > 239 ? a = !1 : b > 160 && b < 224 ? (f++, m = 0, p++, p > h && (h = p)) : b > 127 ? (d++, p = 0, m++, m > g && (g = m)) : (p = 0, m = 0));
		}
		return o && s > 0 && (o = !1), a && d > 0 && (a = !1), o && (v || c + l + u > 0) ? e.UTF8 : a && (e.ASSUME_SHIFT_JIS || h >= 3 || g >= 3) ? e.SHIFT_JIS : i && a ? h === 2 && f === 2 || _ * 10 >= r ? e.SHIFT_JIS : e.ISO88591 : i ? e.ISO88591 : a ? e.SHIFT_JIS : o ? e.UTF8 : e.PLATFORM_DEFAULT_ENCODING;
	}, e.format = function(e) {
		var t = [...arguments].slice(1), n = -1;
		function r(e, r, i, a, o, s) {
			if (e === "%%") return "%";
			if (t[++n] !== void 0) {
				e = a ? parseInt(a.substr(1)) : void 0;
				var c = o ? parseInt(o.substr(1)) : void 0, l;
				switch (s) {
					case "s":
						l = t[n];
						break;
					case "c":
						l = t[n][0];
						break;
					case "f":
						l = parseFloat(t[n]).toFixed(e);
						break;
					case "p":
						l = parseFloat(t[n]).toPrecision(e);
						break;
					case "e":
						l = parseFloat(t[n]).toExponential(e);
						break;
					case "x":
						l = parseInt(t[n]).toString(c || 16);
						break;
					case "d": l = parseFloat(parseInt(t[n], c || 10).toPrecision(e)).toFixed(0);
				}
				l = typeof l == "object" ? JSON.stringify(l) : (+l).toString(c);
				for (var u = parseInt(i), d = i && i[0] + "" == "0" ? "0" : " "; l.length < u;) l = r === void 0 ? d + l : l + d;
				return l;
			}
		}
		return e.replace(/%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g, r);
	}, e.getBytes = function(e, t) {
		return Yt.encode(e, t);
	}, e.getCharCode = function(e, t) {
		return t === void 0 && (t = 0), e.charCodeAt(t);
	}, e.getCharAt = function(e) {
		return String.fromCharCode(e);
	}, e.SHIFT_JIS = Kt.SJIS.getName(), e.GB2312 = "GB2312", e.ISO88591 = Kt.ISO8859_1.getName(), e.EUC_JP = "EUC_JP", e.UTF8 = Kt.UTF8.getName(), e.PLATFORM_DEFAULT_ENCODING = e.UTF8, e.ASSUME_SHIFT_JIS = !1, e;
}(), Zt = function() {
	function e(e) {
		e === void 0 && (e = ""), this.value = e;
	}
	return e.prototype.enableDecoding = function(e) {
		return this.encoding = e, this;
	}, e.prototype.append = function(e) {
		return typeof e == "string" ? this.value += e.toString() : this.encoding ? this.value += Xt.castAsNonUtf8Char(e, this.encoding) : this.value += String.fromCharCode(e), this;
	}, e.prototype.appendChars = function(e, t, n) {
		for (var r = t; t < t + n; r++) this.append(e[r]);
		return this;
	}, e.prototype.length = function() {
		return this.value.length;
	}, e.prototype.charAt = function(e) {
		return this.value.charAt(e);
	}, e.prototype.deleteCharAt = function(e) {
		this.value = this.value.substr(0, e) + this.value.substring(e + 1);
	}, e.prototype.setCharAt = function(e, t) {
		this.value = this.value.substr(0, e) + t + this.value.substr(e + 1);
	}, e.prototype.substring = function(e, t) {
		return this.value.substring(e, t);
	}, e.prototype.setLengthToZero = function() {
		this.value = "";
	}, e.prototype.toString = function() {
		return this.value;
	}, e.prototype.insert = function(e, t) {
		this.value = this.value.substring(0, e) + t + this.value.substring(e);
	}, e;
}(), Qt = function() {
	function e(e, t) {
		this.width = e, this.height = t;
	}
	return e.prototype.getWidth = function() {
		return this.width;
	}, e.prototype.getHeight = function() {
		return this.height;
	}, e.prototype.isCropSupported = function() {
		return !1;
	}, e.prototype.crop = function(e, t, n, r) {
		throw new Jt("This luminance source does not support cropping.");
	}, e.prototype.isRotateSupported = function() {
		return !1;
	}, e.prototype.rotateCounterClockwise = function() {
		throw new Jt("This luminance source does not support rotation by 90 degrees.");
	}, e.prototype.rotateCounterClockwise45 = function() {
		throw new Jt("This luminance source does not support rotation by 45 degrees.");
	}, e.prototype.toString = function() {
		for (var e = new Uint8ClampedArray(this.width), t = new Zt(), n = 0; n < this.height; n++) {
			for (var r = this.getRow(n, e), i = 0; i < this.width; i++) {
				var a = r[i] & 255, o = void 0;
				o = a < 64 ? "#" : a < 128 ? "+" : a < 192 ? "." : " ", t.append(o);
			}
			t.append("\n");
		}
		return t.toString();
	}, e;
}(), $t = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), en = function(e) {
	$t(t, e);
	function t(t) {
		var n = e.call(this, t.getWidth(), t.getHeight()) || this;
		return n.delegate = t, n;
	}
	return t.prototype.getRow = function(e, t) {
		for (var n = this.delegate.getRow(e, t), r = this.getWidth(), i = 0; i < r; i++) n[i] = 255 - (n[i] & 255);
		return n;
	}, t.prototype.getMatrix = function() {
		for (var e = this.delegate.getMatrix(), t = this.getWidth() * this.getHeight(), n = new Uint8ClampedArray(t), r = 0; r < t; r++) n[r] = 255 - (e[r] & 255);
		return n;
	}, t.prototype.isCropSupported = function() {
		return this.delegate.isCropSupported();
	}, t.prototype.crop = function(e, n, r, i) {
		return new t(this.delegate.crop(e, n, r, i));
	}, t.prototype.isRotateSupported = function() {
		return this.delegate.isRotateSupported();
	}, t.prototype.invert = function() {
		return this.delegate;
	}, t.prototype.rotateCounterClockwise = function() {
		return new t(this.delegate.rotateCounterClockwise());
	}, t.prototype.rotateCounterClockwise45 = function() {
		return new t(this.delegate.rotateCounterClockwise45());
	}, t;
}(Qt), tn = function() {
	function e() {}
	return e.arraycopy = function(e, t, n, r, i) {
		if (e === n && t < r) for (r += i - 1, t += i - 1; i--;) n[r--] = e[t--];
		else for (; i--;) n[r++] = e[t++];
	}, e.currentTimeMillis = function() {
		return Date.now();
	}, e;
}(), nn = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), rn = function(e) {
	nn(t, e);
	function t(t, n, r, i, a, o, s) {
		var c = e.call(this, n, r) || this;
		if (c.dataWidth = i, c.dataHeight = a, c.left = o, c.top = s, t.BYTES_PER_ELEMENT === 4) {
			for (var l = n * r, u = new Uint8ClampedArray(l), d = 0; d < l; d++) {
				var f = t[d], p = f >> 16 & 255, m = f >> 7 & 510, h = f & 255;
				u[d] = (p + m + h) / 4 & 255;
			}
			c.luminances = u;
		} else c.luminances = t;
		if (i === void 0 && (c.dataWidth = n), a === void 0 && (c.dataHeight = r), o === void 0 && (c.left = 0), s === void 0 && (c.top = 0), c.left + n > c.dataWidth || c.top + r > c.dataHeight) throw new q("Crop rectangle does not fit within image data.");
		return c;
	}
	return t.prototype.getRow = function(e, t) {
		if (e < 0 || e >= this.getHeight()) throw new q("Requested row is outside the image: " + e);
		var n = this.getWidth();
		(t == null || t.length < n) && (t = new Uint8ClampedArray(n));
		var r = (e + this.top) * this.dataWidth + this.left;
		return tn.arraycopy(this.luminances, r, t, 0, n), t;
	}, t.prototype.getMatrix = function() {
		var e = this.getWidth(), t = this.getHeight();
		if (e === this.dataWidth && t === this.dataHeight) return this.luminances;
		var n = e * t, r = new Uint8ClampedArray(n), i = this.top * this.dataWidth + this.left;
		if (e === this.dataWidth) return tn.arraycopy(this.luminances, i, r, 0, n), r;
		for (var a = 0; a < t; a++) {
			var o = a * e;
			tn.arraycopy(this.luminances, i, r, o, e), i += this.dataWidth;
		}
		return r;
	}, t.prototype.isCropSupported = function() {
		return !0;
	}, t.prototype.crop = function(e, n, r, i) {
		return new t(this.luminances, r, i, this.dataWidth, this.dataHeight, this.left + e, this.top + n);
	}, t.prototype.invert = function() {
		return new en(this);
	}, t;
}(Qt), an = function() {
	function e(e) {
		this.source = e;
	}
	return e.prototype.getLuminanceSource = function() {
		return this.source;
	}, e.prototype.getWidth = function() {
		return this.source.getWidth();
	}, e.prototype.getHeight = function() {
		return this.source.getHeight();
	}, e;
}(), on = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), sn = function(e) {
	on(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.kind = "IndexOutOfBoundsException", t;
}(Rt), cn = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), ln = function(e) {
	cn(t, e);
	function t(t, n) {
		t === void 0 && (t = void 0), n === void 0 && (n = void 0);
		var r = e.call(this, n) || this;
		return r.index = t, r.message = n, r;
	}
	return t.kind = "ArrayIndexOutOfBoundsException", t;
}(sn), un = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, dn = function() {
	function e() {}
	return e.fill = function(e, t) {
		for (var n = 0, r = e.length; n < r; n++) e[n] = t;
	}, e.fillWithin = function(t, n, r, i) {
		e.rangeCheck(t.length, n, r);
		for (var a = n; a < r; a++) t[a] = i;
	}, e.rangeCheck = function(e, t, n) {
		if (t > n) throw new q("fromIndex(" + t + ") > toIndex(" + n + ")");
		if (t < 0) throw new ln(t);
		if (n > e) throw new ln(n);
	}, e.asList = function() {
		return [...arguments];
	}, e.create = function(e, t, n) {
		return Array.from({ length: e }).map(function(e) {
			return Array.from({ length: t }).fill(n);
		});
	}, e.createInt32Array = function(e, t, n) {
		return Array.from({ length: e }).map(function(e) {
			return Int32Array.from({ length: t }).fill(n);
		});
	}, e.equals = function(e, t) {
		if (!e || !t || !e.length || !t.length || e.length !== t.length) return !1;
		for (var n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
		return !0;
	}, e.hashCode = function(e) {
		var t, n;
		if (e === null) return 0;
		var r = 1;
		try {
			for (var i = un(e), a = i.next(); !a.done; a = i.next()) {
				var o = a.value;
				r = 31 * r + o;
			}
		} catch (e) {
			t = { error: e };
		} finally {
			try {
				a && !a.done && (n = i.return) && n.call(i);
			} finally {
				if (t) throw t.error;
			}
		}
		return r;
	}, e.fillUint8Array = function(e, t) {
		for (var n = 0; n !== e.length; n++) e[n] = t;
	}, e.copyOf = function(e, t) {
		return e.slice(0, t);
	}, e.copyOfUint8Array = function(e, t) {
		if (e.length <= t) {
			var n = new Uint8Array(t);
			return n.set(e), n;
		}
		return e.slice(0, t);
	}, e.copyOfRange = function(e, t, n) {
		var r = n - t, i = new Int32Array(r);
		return tn.arraycopy(e, t, i, 0, r), i;
	}, e.binarySearch = function(t, n, r) {
		r === void 0 && (r = e.numberComparator);
		for (var i = 0, a = t.length - 1; i <= a;) {
			var o = a + i >> 1, s = r(n, t[o]);
			if (s > 0) i = o + 1;
			else if (s < 0) a = o - 1;
			else return o;
		}
		return -i - 1;
	}, e.numberComparator = function(e, t) {
		return e - t;
	}, e;
}(), fn = function() {
	function e() {}
	return e.numberOfTrailingZeros = function(e) {
		var t;
		if (e === 0) return 32;
		var n = 31;
		return t = e << 16, t !== 0 && (n -= 16, e = t), t = e << 8, t !== 0 && (n -= 8, e = t), t = e << 4, t !== 0 && (n -= 4, e = t), t = e << 2, t !== 0 && (n -= 2, e = t), n - (e << 1 >>> 31);
	}, e.numberOfLeadingZeros = function(e) {
		if (e === 0) return 32;
		var t = 1;
		return e >>> 16 || (t += 16, e <<= 16), e >>> 24 || (t += 8, e <<= 8), e >>> 28 || (t += 4, e <<= 4), e >>> 30 || (t += 2, e <<= 2), t -= e >>> 31, t;
	}, e.toHexString = function(e) {
		return e.toString(16);
	}, e.toBinaryString = function(e) {
		return String(parseInt(String(e), 2));
	}, e.bitCount = function(e) {
		return e -= e >>> 1 & 1431655765, e = (e & 858993459) + (e >>> 2 & 858993459), e = e + (e >>> 4) & 252645135, e += e >>> 8, e += e >>> 16, e & 63;
	}, e.truncDivision = function(e, t) {
		return Math.trunc(e / t);
	}, e.parseInt = function(e, t) {
		return t === void 0 && (t = void 0), parseInt(e, t);
	}, e.MIN_VALUE_32_BITS = -2147483648, e.MAX_VALUE = 2 ** 53 - 1, e;
}(), pn = function() {
	function e(t, n) {
		t === void 0 ? (this.size = 0, this.bits = /* @__PURE__ */ new Int32Array(1)) : (this.size = t, this.bits = n ?? e.makeArray(t));
	}
	return e.prototype.getSize = function() {
		return this.size;
	}, e.prototype.getSizeInBytes = function() {
		return Math.floor((this.size + 7) / 8);
	}, e.prototype.ensureCapacity = function(t) {
		if (t > this.bits.length * 32) {
			var n = e.makeArray(t);
			tn.arraycopy(this.bits, 0, n, 0, this.bits.length), this.bits = n;
		}
	}, e.prototype.get = function(e) {
		return !!(this.bits[Math.floor(e / 32)] & 1 << (e & 31));
	}, e.prototype.set = function(e) {
		this.bits[Math.floor(e / 32)] |= 1 << (e & 31);
	}, e.prototype.flip = function(e) {
		this.bits[Math.floor(e / 32)] ^= 1 << (e & 31);
	}, e.prototype.getNextSet = function(e) {
		var t = this.size;
		if (e >= t) return t;
		var n = this.bits, r = Math.floor(e / 32), i = n[r];
		i &= ~((1 << (e & 31)) - 1);
		for (var a = n.length; i === 0;) {
			if (++r === a) return t;
			i = n[r];
		}
		var o = r * 32 + fn.numberOfTrailingZeros(i);
		return o > t ? t : o;
	}, e.prototype.getNextUnset = function(e) {
		var t = this.size;
		if (e >= t) return t;
		var n = this.bits, r = Math.floor(e / 32), i = ~n[r];
		i &= ~((1 << (e & 31)) - 1);
		for (var a = n.length; i === 0;) {
			if (++r === a) return t;
			i = ~n[r];
		}
		var o = r * 32 + fn.numberOfTrailingZeros(i);
		return o > t ? t : o;
	}, e.prototype.setBulk = function(e, t) {
		this.bits[Math.floor(e / 32)] = t;
	}, e.prototype.setRange = function(e, t) {
		if (t < e || e < 0 || t > this.size) throw new q();
		if (t !== e) {
			t--;
			for (var n = Math.floor(e / 32), r = Math.floor(t / 32), i = this.bits, a = n; a <= r; a++) {
				var o = a > n ? 0 : e & 31, s = (2 << (a < r ? 31 : t & 31)) - (1 << o);
				i[a] |= s;
			}
		}
	}, e.prototype.clear = function() {
		for (var e = this.bits.length, t = this.bits, n = 0; n < e; n++) t[n] = 0;
	}, e.prototype.isRange = function(e, t, n) {
		if (t < e || e < 0 || t > this.size) throw new q();
		if (t === e) return !0;
		t--;
		for (var r = Math.floor(e / 32), i = Math.floor(t / 32), a = this.bits, o = r; o <= i; o++) {
			var s = o > r ? 0 : e & 31, c = (2 << (o < i ? 31 : t & 31)) - (1 << s) | 0;
			if ((a[o] & c) !== (n ? c : 0)) return !1;
		}
		return !0;
	}, e.prototype.appendBit = function(e) {
		this.ensureCapacity(this.size + 1), e && (this.bits[Math.floor(this.size / 32)] |= 1 << (this.size & 31)), this.size++;
	}, e.prototype.appendBits = function(e, t) {
		if (t < 0 || t > 32) throw new q("Num bits must be between 0 and 32");
		this.ensureCapacity(this.size + t);
		for (var n = t; n > 0; n--) this.appendBit((e >> n - 1 & 1) == 1);
	}, e.prototype.appendBitArray = function(e) {
		var t = e.size;
		this.ensureCapacity(this.size + t);
		for (var n = 0; n < t; n++) this.appendBit(e.get(n));
	}, e.prototype.xor = function(e) {
		if (this.size !== e.size) throw new q("Sizes don't match");
		for (var t = this.bits, n = 0, r = t.length; n < r; n++) t[n] ^= e.bits[n];
	}, e.prototype.toBytes = function(e, t, n, r) {
		for (var i = 0; i < r; i++) {
			for (var a = 0, o = 0; o < 8; o++) this.get(e) && (a |= 1 << 7 - o), e++;
			t[n + i] = a;
		}
	}, e.prototype.getBitArray = function() {
		return this.bits;
	}, e.prototype.reverse = function() {
		for (var e = new Int32Array(this.bits.length), t = Math.floor((this.size - 1) / 32), n = t + 1, r = this.bits, i = 0; i < n; i++) {
			var a = r[i];
			a = a >> 1 & 1431655765 | (a & 1431655765) << 1, a = a >> 2 & 858993459 | (a & 858993459) << 2, a = a >> 4 & 252645135 | (a & 252645135) << 4, a = a >> 8 & 16711935 | (a & 16711935) << 8, a = a >> 16 & 65535 | (a & 65535) << 16, e[t - i] = a;
		}
		if (this.size !== n * 32) {
			for (var o = n * 32 - this.size, s = e[0] >>> o, i = 1; i < n; i++) {
				var c = e[i];
				s |= c << 32 - o, e[i - 1] = s, s = c >>> o;
			}
			e[n - 1] = s;
		}
		this.bits = e;
	}, e.makeArray = function(e) {
		return new Int32Array(Math.floor((e + 31) / 32));
	}, e.prototype.equals = function(t) {
		if (!(t instanceof e)) return !1;
		var n = t;
		return this.size === n.size && dn.equals(this.bits, n.bits);
	}, e.prototype.hashCode = function() {
		return 31 * this.size + dn.hashCode(this.bits);
	}, e.prototype.toString = function() {
		for (var e = "", t = 0, n = this.size; t < n; t++) t & 7 || (e += " "), e += this.get(t) ? "X" : ".";
		return e;
	}, e.prototype.clone = function() {
		return new e(this.size, this.bits.slice());
	}, e.prototype.toArray = function() {
		for (var e = [], t = 0, n = this.size; t < n; t++) e.push(this.get(t));
		return e;
	}, e;
}(), mn = function() {
	function e(e, t, n, r) {
		if (this.width = e, this.height = t, this.rowSize = n, this.bits = r, t ??= e, this.height = t, e < 1 || t < 1) throw new q("Both dimensions must be greater than 0");
		n ??= e + 31 >> 5, this.rowSize = n, r ?? (this.bits = new Int32Array(this.rowSize * this.height));
	}
	return e.parseFromBooleanArray = function(t) {
		for (var n = t.length, r = t[0].length, i = new e(r, n), a = 0; a < n; a++) for (var o = t[a], s = 0; s < r; s++) o[s] && i.set(s, a);
		return i;
	}, e.parseFromString = function(t, n, r) {
		if (t === null) throw new q("stringRepresentation cannot be null");
		for (var i = Array(t.length), a = 0, o = 0, s = -1, c = 0, l = 0; l < t.length;) if (t.charAt(l) === "\n" || t.charAt(l) === "\r") {
			if (a > o) {
				if (s === -1) s = a - o;
				else if (a - o !== s) throw new q("row lengths do not match");
				o = a, c++;
			}
			l++;
		} else if (t.substring(l, l + n.length) === n) l += n.length, i[a] = !0, a++;
		else if (t.substring(l, l + r.length) === r) l += r.length, i[a] = !1, a++;
		else throw new q("illegal character encountered: " + t.substring(l));
		if (a > o) {
			if (s === -1) s = a - o;
			else if (a - o !== s) throw new q("row lengths do not match");
			c++;
		}
		for (var u = new e(s, c), d = 0; d < a; d++) i[d] && u.set(Math.floor(d % s), Math.floor(d / s));
		return u;
	}, e.prototype.get = function(e, t) {
		var n = t * this.rowSize + (e >> 5);
		return !!(this.bits[n] >>> (e & 31) & 1);
	}, e.prototype.set = function(e, t) {
		var n = t * this.rowSize + (e >> 5);
		this.bits[n] |= 1 << (e & 31);
	}, e.prototype.unset = function(e, t) {
		var n = t * this.rowSize + (e >> 5);
		this.bits[n] &= ~(1 << (e & 31));
	}, e.prototype.flip = function(e, t) {
		var n = t * this.rowSize + (e >> 5);
		this.bits[n] ^= 1 << (e & 31);
	}, e.prototype.xor = function(e) {
		if (this.width !== e.getWidth() || this.height !== e.getHeight() || this.rowSize !== e.getRowSize()) throw new q("input matrix dimensions do not match");
		for (var t = new pn((this.width >> 5) + 1), n = this.rowSize, r = this.bits, i = 0, a = this.height; i < a; i++) for (var o = i * n, s = e.getRow(i, t).getBitArray(), c = 0; c < n; c++) r[o + c] ^= s[c];
	}, e.prototype.clear = function() {
		this.bits.fill(0);
	}, e.prototype.setRegion = function(e, t, n, r) {
		if (t < 0 || e < 0) throw new q("Left and top must be nonnegative");
		if (r < 1 || n < 1) throw new q("Height and width must be at least 1");
		var i = e + n, a = t + r;
		if (a > this.height || i > this.width) throw new q("The region must fit inside the matrix");
		for (var o = this.rowSize, s = this.bits, c = t; c < a; c++) for (var l = c * o, u = e; u < i; u++) s[l + (u >> 5)] |= 1 << (u & 31);
	}, e.prototype.getRow = function(e, t) {
		t == null || t.getSize() < this.width ? t = new pn(this.width) : t.clear();
		for (var n = this.rowSize, r = this.bits, i = e * n, a = 0; a < n; a++) t.setBulk(a * 32, r[i + a]);
		return t;
	}, e.prototype.setRow = function(e, t) {
		tn.arraycopy(t.getBitArray(), 0, this.bits, e * this.rowSize, this.rowSize);
	}, e.prototype.rotate180 = function() {
		for (var e = this.getWidth(), t = this.getHeight(), n = new pn(e), r = new pn(e), i = 0, a = Math.floor((t + 1) / 2); i < a; i++) n = this.getRow(i, n), r = this.getRow(t - 1 - i, r), n.reverse(), r.reverse(), this.setRow(i, r), this.setRow(t - 1 - i, n);
	}, e.prototype.getEnclosingRectangle = function() {
		for (var e = this.width, t = this.height, n = this.rowSize, r = this.bits, i = e, a = t, o = -1, s = -1, c = 0; c < t; c++) for (var l = 0; l < n; l++) {
			var u = r[c * n + l];
			if (u !== 0) {
				if (c < a && (a = c), c > s && (s = c), l * 32 < i) {
					for (var d = 0; !(u << 31 - d);) d++;
					l * 32 + d < i && (i = l * 32 + d);
				}
				if (l * 32 + 31 > o) {
					for (var d = 31; !(u >>> d);) d--;
					l * 32 + d > o && (o = l * 32 + d);
				}
			}
		}
		return o < i || s < a ? null : Int32Array.from([
			i,
			a,
			o - i + 1,
			s - a + 1
		]);
	}, e.prototype.getTopLeftOnBit = function() {
		for (var e = this.rowSize, t = this.bits, n = 0; n < t.length && t[n] === 0;) n++;
		if (n === t.length) return null;
		for (var r = n / e, i = n % e * 32, a = t[n], o = 0; !(a << 31 - o);) o++;
		return i += o, Int32Array.from([i, r]);
	}, e.prototype.getBottomRightOnBit = function() {
		for (var e = this.rowSize, t = this.bits, n = t.length - 1; n >= 0 && t[n] === 0;) n--;
		if (n < 0) return null;
		for (var r = Math.floor(n / e), i = Math.floor(n % e) * 32, a = t[n], o = 31; !(a >>> o);) o--;
		return i += o, Int32Array.from([i, r]);
	}, e.prototype.getWidth = function() {
		return this.width;
	}, e.prototype.getHeight = function() {
		return this.height;
	}, e.prototype.getRowSize = function() {
		return this.rowSize;
	}, e.prototype.equals = function(t) {
		if (!(t instanceof e)) return !1;
		var n = t;
		return this.width === n.width && this.height === n.height && this.rowSize === n.rowSize && dn.equals(this.bits, n.bits);
	}, e.prototype.hashCode = function() {
		var e = this.width;
		return e = 31 * e + this.width, e = 31 * e + this.height, e = 31 * e + this.rowSize, e = 31 * e + dn.hashCode(this.bits), e;
	}, e.prototype.toString = function(e, t, n) {
		return e === void 0 && (e = "X "), t === void 0 && (t = "  "), n === void 0 && (n = "\n"), this.buildToString(e, t, n);
	}, e.prototype.buildToString = function(e, t, n) {
		for (var r = new Zt(), i = 0, a = this.height; i < a; i++) {
			for (var o = 0, s = this.width; o < s; o++) r.append(this.get(o, i) ? e : t);
			r.append(n);
		}
		return r.toString();
	}, e.prototype.clone = function() {
		return new e(this.width, this.height, this.rowSize, this.bits.slice());
	}, e;
}(), hn = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), gn = function(e) {
	hn(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.getNotFoundInstance = function() {
		return new t();
	}, t.kind = "NotFoundException", t;
}(Rt), _n = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), vn = function(e) {
	_n(t, e);
	function t(n) {
		var r = e.call(this, n) || this;
		return r.luminances = t.EMPTY, r.buckets = new Int32Array(t.LUMINANCE_BUCKETS), r;
	}
	return t.prototype.getBlackRow = function(e, n) {
		var r = this.getLuminanceSource(), i = r.getWidth();
		n == null || n.getSize() < i ? n = new pn(i) : n.clear(), this.initArrays(i);
		for (var a = r.getRow(e, this.luminances), o = this.buckets, s = 0; s < i; s++) o[(a[s] & 255) >> t.LUMINANCE_SHIFT]++;
		var c = t.estimateBlackPoint(o);
		if (i < 3) for (var s = 0; s < i; s++) (a[s] & 255) < c && n.set(s);
		else for (var l = a[0] & 255, u = a[1] & 255, s = 1; s < i - 1; s++) {
			var d = a[s + 1] & 255;
			(u * 4 - l - d) / 2 < c && n.set(s), l = u, u = d;
		}
		return n;
	}, t.prototype.getBlackMatrix = function() {
		var e = this.getLuminanceSource(), n = e.getWidth(), r = e.getHeight(), i = new mn(n, r);
		this.initArrays(n);
		for (var a = this.buckets, o = 1; o < 5; o++) for (var s = Math.floor(r * o / 5), c = e.getRow(s, this.luminances), l = Math.floor(n * 4 / 5), u = Math.floor(n / 5); u < l; u++) {
			var d = c[u] & 255;
			a[d >> t.LUMINANCE_SHIFT]++;
		}
		for (var f = t.estimateBlackPoint(a), p = e.getMatrix(), o = 0; o < r; o++) for (var m = o * n, u = 0; u < n; u++) {
			var d = p[m + u] & 255;
			d < f && i.set(u, o);
		}
		return i;
	}, t.prototype.createBinarizer = function(e) {
		return new t(e);
	}, t.prototype.initArrays = function(e) {
		this.luminances.length < e && (this.luminances = new Uint8ClampedArray(e)), this.buckets.fill(0);
	}, t.estimateBlackPoint = function(e) {
		for (var n = e.length, r = 0, i = 0, a = 0, o = 0; o < n; o++) e[o] > a && (i = o, a = e[o]), e[o] > r && (r = e[o]);
		for (var s = 0, c = 0, o = 0; o < n; o++) {
			var l = o - i, u = e[o] * l * l;
			u > c && (s = o, c = u);
		}
		if (i > s) {
			var d = i;
			i = s, s = d;
		}
		if (s - i <= n / 16) throw new gn();
		for (var f = s - 1, p = -1, o = s - 1; o > i; o--) {
			var m = o - i, u = m * m * (s - o) * (r - e[o]);
			u > p && (f = o, p = u);
		}
		return f << t.LUMINANCE_SHIFT;
	}, t.LUMINANCE_BITS = 5, t.LUMINANCE_SHIFT = 8 - t.LUMINANCE_BITS, t.LUMINANCE_BUCKETS = 1 << t.LUMINANCE_BITS, t.EMPTY = Uint8ClampedArray.from([0]), t;
}(an), yn = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), bn = function(e) {
	yn(t, e);
	function t(t) {
		var n = e.call(this, t) || this;
		return n.matrix = null, n;
	}
	return t.prototype.getBlackMatrix = function() {
		if (this.matrix !== null) return this.matrix;
		var n = this.getLuminanceSource(), r = n.getWidth(), i = n.getHeight();
		if (r >= t.MINIMUM_DIMENSION && i >= t.MINIMUM_DIMENSION) {
			var a = n.getMatrix(), o = r >> t.BLOCK_SIZE_POWER;
			(r & t.BLOCK_SIZE_MASK) !== 0 && o++;
			var s = i >> t.BLOCK_SIZE_POWER;
			(i & t.BLOCK_SIZE_MASK) !== 0 && s++;
			var c = t.calculateBlackPoints(a, o, s, r, i), l = new mn(r, i);
			t.calculateThresholdForBlock(a, o, s, r, i, c, l), this.matrix = l;
		} else this.matrix = e.prototype.getBlackMatrix.call(this);
		return this.matrix;
	}, t.prototype.createBinarizer = function(e) {
		return new t(e);
	}, t.calculateThresholdForBlock = function(e, n, r, i, a, o, s) {
		for (var c = a - t.BLOCK_SIZE, l = i - t.BLOCK_SIZE, u = 0; u < r; u++) {
			var d = u << t.BLOCK_SIZE_POWER;
			d > c && (d = c);
			for (var f = t.cap(u, 2, r - 3), p = 0; p < n; p++) {
				var m = p << t.BLOCK_SIZE_POWER;
				m > l && (m = l);
				for (var h = t.cap(p, 2, n - 3), g = 0, _ = -2; _ <= 2; _++) {
					var v = o[f + _];
					g += v[h - 2] + v[h - 1] + v[h] + v[h + 1] + v[h + 2];
				}
				var y = g / 25;
				t.thresholdBlock(e, m, d, y, i, s);
			}
		}
	}, t.cap = function(e, t, n) {
		return e < t ? t : e > n ? n : e;
	}, t.thresholdBlock = function(e, n, r, i, a, o) {
		for (var s = 0, c = r * a + n; s < t.BLOCK_SIZE; s++, c += a) for (var l = 0; l < t.BLOCK_SIZE; l++) (e[c + l] & 255) <= i && o.set(n + l, r + s);
	}, t.calculateBlackPoints = function(e, n, r, i, a) {
		for (var o = a - t.BLOCK_SIZE, s = i - t.BLOCK_SIZE, c = Array(r), l = 0; l < r; l++) {
			c[l] = new Int32Array(n);
			var u = l << t.BLOCK_SIZE_POWER;
			u > o && (u = o);
			for (var d = 0; d < n; d++) {
				var f = d << t.BLOCK_SIZE_POWER;
				f > s && (f = s);
				for (var p = 0, m = 255, h = 0, g = 0, _ = u * i + f; g < t.BLOCK_SIZE; g++, _ += i) {
					for (var v = 0; v < t.BLOCK_SIZE; v++) {
						var y = e[_ + v] & 255;
						p += y, y < m && (m = y), y > h && (h = y);
					}
					if (h - m > t.MIN_DYNAMIC_RANGE) for (g++, _ += i; g < t.BLOCK_SIZE; g++, _ += i) for (var v = 0; v < t.BLOCK_SIZE; v++) p += e[_ + v] & 255;
				}
				var b = p >> t.BLOCK_SIZE_POWER * 2;
				if (h - m <= t.MIN_DYNAMIC_RANGE && (b = m / 2, l > 0 && d > 0)) {
					var x = (c[l - 1][d] + 2 * c[l][d - 1] + c[l - 1][d - 1]) / 4;
					m < x && (b = x);
				}
				c[l][d] = b;
			}
		}
		return c;
	}, t.BLOCK_SIZE_POWER = 3, t.BLOCK_SIZE = 1 << t.BLOCK_SIZE_POWER, t.BLOCK_SIZE_MASK = t.BLOCK_SIZE - 1, t.MINIMUM_DIMENSION = t.BLOCK_SIZE * 5, t.MIN_DYNAMIC_RANGE = 24, t;
}(vn), xn;
(function(e) {
	e[e.AZTEC = 0] = "AZTEC", e[e.CODABAR = 1] = "CODABAR", e[e.CODE_39 = 2] = "CODE_39", e[e.CODE_93 = 3] = "CODE_93", e[e.CODE_128 = 4] = "CODE_128", e[e.DATA_MATRIX = 5] = "DATA_MATRIX", e[e.EAN_8 = 6] = "EAN_8", e[e.EAN_13 = 7] = "EAN_13", e[e.ITF = 8] = "ITF", e[e.MAXICODE = 9] = "MAXICODE", e[e.PDF_417 = 10] = "PDF_417", e[e.QR_CODE = 11] = "QR_CODE", e[e.RSS_14 = 12] = "RSS_14", e[e.RSS_EXPANDED = 13] = "RSS_EXPANDED", e[e.UPC_A = 14] = "UPC_A", e[e.UPC_E = 15] = "UPC_E", e[e.UPC_EAN_EXTENSION = 16] = "UPC_EAN_EXTENSION", e[e.MICRO_QR_CODE = 17] = "MICRO_QR_CODE";
})(xn ||= {});
var Sn = xn, Cn = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), wn = function(e) {
	Cn(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.getChecksumInstance = function() {
		return new t();
	}, t.kind = "ChecksumException", t;
}(Rt), Tn = function() {
	function e(e, t, n, r, i, a) {
		n === void 0 && (n = t == null ? 0 : 8 * t.length), a === void 0 && (a = tn.currentTimeMillis()), this.text = e, this.rawBytes = t, this.numBits = n, this.resultPoints = r, this.format = i, this.timestamp = a, this.text = e, this.rawBytes = t, this.numBits = n ?? (t == null ? 0 : 8 * t.length), this.resultPoints = r, this.format = i, this.resultMetadata = null, this.timestamp = a ?? tn.currentTimeMillis();
	}
	return e.prototype.getText = function() {
		return this.text;
	}, e.prototype.getRawBytes = function() {
		return this.rawBytes;
	}, e.prototype.getNumBits = function() {
		return this.numBits;
	}, e.prototype.getResultPoints = function() {
		return this.resultPoints;
	}, e.prototype.getBarcodeFormat = function() {
		return this.format;
	}, e.prototype.getResultMetadata = function() {
		return this.resultMetadata;
	}, e.prototype.putMetadata = function(e, t) {
		this.resultMetadata === null && (this.resultMetadata = /* @__PURE__ */ new Map()), this.resultMetadata.set(e, t);
	}, e.prototype.putAllMetadata = function(e) {
		e !== null && (this.resultMetadata = this.resultMetadata === null ? e : new Map(e));
	}, e.prototype.addResultPoints = function(e) {
		var t = this.resultPoints;
		if (t === null) this.resultPoints = e;
		else if (e !== null && e.length > 0) {
			var n = Array(t.length + e.length);
			tn.arraycopy(t, 0, n, 0, t.length), tn.arraycopy(e, 0, n, t.length, e.length), this.resultPoints = n;
		}
	}, e.prototype.getTimestamp = function() {
		return this.timestamp;
	}, e.prototype.toString = function() {
		return this.text;
	}, e;
}(), En = function() {
	function e() {}
	return e.round = function(e) {
		return isNaN(e) ? 0 : e <= -(2 ** 53 - 1) ? -(2 ** 53 - 1) : e >= 2 ** 53 - 1 ? 2 ** 53 - 1 : e + (e < 0 ? -.5 : .5) | 0;
	}, e.distance = function(e, t, n, r) {
		var i = e - n, a = t - r;
		return Math.sqrt(i * i + a * a);
	}, e.sum = function(e) {
		for (var t = 0, n = 0, r = e.length; n !== r; n++) {
			var i = e[n];
			t += i;
		}
		return t;
	}, e;
}(), Dn = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Y = function() {
	function e() {}
	return e.prototype.PDF417Common = function() {}, e.getBitCountSum = function(e) {
		return En.sum(e);
	}, e.toIntArray = function(t) {
		var n, r;
		if (t == null || !t.length) return e.EMPTY_INT_ARRAY;
		var i = new Int32Array(t.length), a = 0;
		try {
			for (var o = Dn(t), s = o.next(); !s.done; s = o.next()) {
				var c = s.value;
				i[a++] = c;
			}
		} catch (e) {
			n = { error: e };
		} finally {
			try {
				s && !s.done && (r = o.return) && r.call(o);
			} finally {
				if (n) throw n.error;
			}
		}
		return i;
	}, e.getCodeword = function(t) {
		var n = dn.binarySearch(e.SYMBOL_TABLE, t & 262143);
		return n < 0 ? -1 : (e.CODEWORD_TABLE[n] - 1) % e.NUMBER_OF_CODEWORDS;
	}, e.NUMBER_OF_CODEWORDS = 929, e.MAX_CODEWORDS_IN_BARCODE = e.NUMBER_OF_CODEWORDS - 1, e.MIN_ROWS_IN_BARCODE = 3, e.MAX_ROWS_IN_BARCODE = 90, e.MODULES_IN_CODEWORD = 17, e.MODULES_IN_STOP_PATTERN = 18, e.BARS_IN_MODULE = 8, e.EMPTY_INT_ARRAY = new Int32Array([]), e.SYMBOL_TABLE = Int32Array.from([
		66142,
		66170,
		66206,
		66236,
		66290,
		66292,
		66350,
		66382,
		66396,
		66454,
		66470,
		66476,
		66594,
		66600,
		66614,
		66626,
		66628,
		66632,
		66640,
		66654,
		66662,
		66668,
		66682,
		66690,
		66718,
		66720,
		66748,
		66758,
		66776,
		66798,
		66802,
		66804,
		66820,
		66824,
		66832,
		66846,
		66848,
		66876,
		66880,
		66936,
		66950,
		66956,
		66968,
		66992,
		67006,
		67022,
		67036,
		67042,
		67044,
		67048,
		67062,
		67118,
		67150,
		67164,
		67214,
		67228,
		67256,
		67294,
		67322,
		67350,
		67366,
		67372,
		67398,
		67404,
		67416,
		67438,
		67474,
		67476,
		67490,
		67492,
		67496,
		67510,
		67618,
		67624,
		67650,
		67656,
		67664,
		67678,
		67686,
		67692,
		67706,
		67714,
		67716,
		67728,
		67742,
		67744,
		67772,
		67782,
		67788,
		67800,
		67822,
		67826,
		67828,
		67842,
		67848,
		67870,
		67872,
		67900,
		67904,
		67960,
		67974,
		67992,
		68016,
		68030,
		68046,
		68060,
		68066,
		68068,
		68072,
		68086,
		68104,
		68112,
		68126,
		68128,
		68156,
		68160,
		68216,
		68336,
		68358,
		68364,
		68376,
		68400,
		68414,
		68448,
		68476,
		68494,
		68508,
		68536,
		68546,
		68548,
		68552,
		68560,
		68574,
		68582,
		68588,
		68654,
		68686,
		68700,
		68706,
		68708,
		68712,
		68726,
		68750,
		68764,
		68792,
		68802,
		68804,
		68808,
		68816,
		68830,
		68838,
		68844,
		68858,
		68878,
		68892,
		68920,
		68976,
		68990,
		68994,
		68996,
		69e3,
		69008,
		69022,
		69024,
		69052,
		69062,
		69068,
		69080,
		69102,
		69106,
		69108,
		69142,
		69158,
		69164,
		69190,
		69208,
		69230,
		69254,
		69260,
		69272,
		69296,
		69310,
		69326,
		69340,
		69386,
		69394,
		69396,
		69410,
		69416,
		69430,
		69442,
		69444,
		69448,
		69456,
		69470,
		69478,
		69484,
		69554,
		69556,
		69666,
		69672,
		69698,
		69704,
		69712,
		69726,
		69754,
		69762,
		69764,
		69776,
		69790,
		69792,
		69820,
		69830,
		69836,
		69848,
		69870,
		69874,
		69876,
		69890,
		69918,
		69920,
		69948,
		69952,
		70008,
		70022,
		70040,
		70064,
		70078,
		70094,
		70108,
		70114,
		70116,
		70120,
		70134,
		70152,
		70174,
		70176,
		70264,
		70384,
		70412,
		70448,
		70462,
		70496,
		70524,
		70542,
		70556,
		70584,
		70594,
		70600,
		70608,
		70622,
		70630,
		70636,
		70664,
		70672,
		70686,
		70688,
		70716,
		70720,
		70776,
		70896,
		71136,
		71180,
		71192,
		71216,
		71230,
		71264,
		71292,
		71360,
		71416,
		71452,
		71480,
		71536,
		71550,
		71554,
		71556,
		71560,
		71568,
		71582,
		71584,
		71612,
		71622,
		71628,
		71640,
		71662,
		71726,
		71732,
		71758,
		71772,
		71778,
		71780,
		71784,
		71798,
		71822,
		71836,
		71864,
		71874,
		71880,
		71888,
		71902,
		71910,
		71916,
		71930,
		71950,
		71964,
		71992,
		72048,
		72062,
		72066,
		72068,
		72080,
		72094,
		72096,
		72124,
		72134,
		72140,
		72152,
		72174,
		72178,
		72180,
		72206,
		72220,
		72248,
		72304,
		72318,
		72416,
		72444,
		72456,
		72464,
		72478,
		72480,
		72508,
		72512,
		72568,
		72588,
		72600,
		72624,
		72638,
		72654,
		72668,
		72674,
		72676,
		72680,
		72694,
		72726,
		72742,
		72748,
		72774,
		72780,
		72792,
		72814,
		72838,
		72856,
		72880,
		72894,
		72910,
		72924,
		72930,
		72932,
		72936,
		72950,
		72966,
		72972,
		72984,
		73008,
		73022,
		73056,
		73084,
		73102,
		73116,
		73144,
		73156,
		73160,
		73168,
		73182,
		73190,
		73196,
		73210,
		73226,
		73234,
		73236,
		73250,
		73252,
		73256,
		73270,
		73282,
		73284,
		73296,
		73310,
		73318,
		73324,
		73346,
		73348,
		73352,
		73360,
		73374,
		73376,
		73404,
		73414,
		73420,
		73432,
		73454,
		73498,
		73518,
		73522,
		73524,
		73550,
		73564,
		73570,
		73572,
		73576,
		73590,
		73800,
		73822,
		73858,
		73860,
		73872,
		73886,
		73888,
		73916,
		73944,
		73970,
		73972,
		73992,
		74014,
		74016,
		74044,
		74048,
		74104,
		74118,
		74136,
		74160,
		74174,
		74210,
		74212,
		74216,
		74230,
		74244,
		74256,
		74270,
		74272,
		74360,
		74480,
		74502,
		74508,
		74544,
		74558,
		74592,
		74620,
		74638,
		74652,
		74680,
		74690,
		74696,
		74704,
		74726,
		74732,
		74782,
		74784,
		74812,
		74992,
		75232,
		75288,
		75326,
		75360,
		75388,
		75456,
		75512,
		75576,
		75632,
		75646,
		75650,
		75652,
		75664,
		75678,
		75680,
		75708,
		75718,
		75724,
		75736,
		75758,
		75808,
		75836,
		75840,
		75896,
		76016,
		76256,
		76736,
		76824,
		76848,
		76862,
		76896,
		76924,
		76992,
		77048,
		77296,
		77340,
		77368,
		77424,
		77438,
		77536,
		77564,
		77572,
		77576,
		77584,
		77600,
		77628,
		77632,
		77688,
		77702,
		77708,
		77720,
		77744,
		77758,
		77774,
		77788,
		77870,
		77902,
		77916,
		77922,
		77928,
		77966,
		77980,
		78008,
		78018,
		78024,
		78032,
		78046,
		78060,
		78074,
		78094,
		78136,
		78192,
		78206,
		78210,
		78212,
		78224,
		78238,
		78240,
		78268,
		78278,
		78284,
		78296,
		78322,
		78324,
		78350,
		78364,
		78448,
		78462,
		78560,
		78588,
		78600,
		78622,
		78624,
		78652,
		78656,
		78712,
		78726,
		78744,
		78768,
		78782,
		78798,
		78812,
		78818,
		78820,
		78824,
		78838,
		78862,
		78876,
		78904,
		78960,
		78974,
		79072,
		79100,
		79296,
		79352,
		79368,
		79376,
		79390,
		79392,
		79420,
		79424,
		79480,
		79600,
		79628,
		79640,
		79664,
		79678,
		79712,
		79740,
		79772,
		79800,
		79810,
		79812,
		79816,
		79824,
		79838,
		79846,
		79852,
		79894,
		79910,
		79916,
		79942,
		79948,
		79960,
		79982,
		79988,
		80006,
		80024,
		80048,
		80062,
		80078,
		80092,
		80098,
		80100,
		80104,
		80134,
		80140,
		80176,
		80190,
		80224,
		80252,
		80270,
		80284,
		80312,
		80328,
		80336,
		80350,
		80358,
		80364,
		80378,
		80390,
		80396,
		80408,
		80432,
		80446,
		80480,
		80508,
		80576,
		80632,
		80654,
		80668,
		80696,
		80752,
		80766,
		80776,
		80784,
		80798,
		80800,
		80828,
		80844,
		80856,
		80878,
		80882,
		80884,
		80914,
		80916,
		80930,
		80932,
		80936,
		80950,
		80962,
		80968,
		80976,
		80990,
		80998,
		81004,
		81026,
		81028,
		81040,
		81054,
		81056,
		81084,
		81094,
		81100,
		81112,
		81134,
		81154,
		81156,
		81160,
		81168,
		81182,
		81184,
		81212,
		81216,
		81272,
		81286,
		81292,
		81304,
		81328,
		81342,
		81358,
		81372,
		81380,
		81384,
		81398,
		81434,
		81454,
		81458,
		81460,
		81486,
		81500,
		81506,
		81508,
		81512,
		81526,
		81550,
		81564,
		81592,
		81602,
		81604,
		81608,
		81616,
		81630,
		81638,
		81644,
		81702,
		81708,
		81722,
		81734,
		81740,
		81752,
		81774,
		81778,
		81780,
		82050,
		82078,
		82080,
		82108,
		82180,
		82184,
		82192,
		82206,
		82208,
		82236,
		82240,
		82296,
		82316,
		82328,
		82352,
		82366,
		82402,
		82404,
		82408,
		82440,
		82448,
		82462,
		82464,
		82492,
		82496,
		82552,
		82672,
		82694,
		82700,
		82712,
		82736,
		82750,
		82784,
		82812,
		82830,
		82882,
		82884,
		82888,
		82896,
		82918,
		82924,
		82952,
		82960,
		82974,
		82976,
		83004,
		83008,
		83064,
		83184,
		83424,
		83468,
		83480,
		83504,
		83518,
		83552,
		83580,
		83648,
		83704,
		83740,
		83768,
		83824,
		83838,
		83842,
		83844,
		83848,
		83856,
		83872,
		83900,
		83910,
		83916,
		83928,
		83950,
		83984,
		84e3,
		84028,
		84032,
		84088,
		84208,
		84448,
		84928,
		85040,
		85054,
		85088,
		85116,
		85184,
		85240,
		85488,
		85560,
		85616,
		85630,
		85728,
		85756,
		85764,
		85768,
		85776,
		85790,
		85792,
		85820,
		85824,
		85880,
		85894,
		85900,
		85912,
		85936,
		85966,
		85980,
		86048,
		86080,
		86136,
		86256,
		86496,
		86976,
		88160,
		88188,
		88256,
		88312,
		88560,
		89056,
		89200,
		89214,
		89312,
		89340,
		89536,
		89592,
		89608,
		89616,
		89632,
		89664,
		89720,
		89840,
		89868,
		89880,
		89904,
		89952,
		89980,
		89998,
		90012,
		90040,
		90190,
		90204,
		90254,
		90268,
		90296,
		90306,
		90308,
		90312,
		90334,
		90382,
		90396,
		90424,
		90480,
		90494,
		90500,
		90504,
		90512,
		90526,
		90528,
		90556,
		90566,
		90572,
		90584,
		90610,
		90612,
		90638,
		90652,
		90680,
		90736,
		90750,
		90848,
		90876,
		90884,
		90888,
		90896,
		90910,
		90912,
		90940,
		90944,
		91e3,
		91014,
		91020,
		91032,
		91056,
		91070,
		91086,
		91100,
		91106,
		91108,
		91112,
		91126,
		91150,
		91164,
		91192,
		91248,
		91262,
		91360,
		91388,
		91584,
		91640,
		91664,
		91678,
		91680,
		91708,
		91712,
		91768,
		91888,
		91928,
		91952,
		91966,
		92e3,
		92028,
		92046,
		92060,
		92088,
		92098,
		92100,
		92104,
		92112,
		92126,
		92134,
		92140,
		92188,
		92216,
		92272,
		92384,
		92412,
		92608,
		92664,
		93168,
		93200,
		93214,
		93216,
		93244,
		93248,
		93304,
		93424,
		93664,
		93720,
		93744,
		93758,
		93792,
		93820,
		93888,
		93944,
		93980,
		94008,
		94064,
		94078,
		94084,
		94088,
		94096,
		94110,
		94112,
		94140,
		94150,
		94156,
		94168,
		94246,
		94252,
		94278,
		94284,
		94296,
		94318,
		94342,
		94348,
		94360,
		94384,
		94398,
		94414,
		94428,
		94440,
		94470,
		94476,
		94488,
		94512,
		94526,
		94560,
		94588,
		94606,
		94620,
		94648,
		94658,
		94660,
		94664,
		94672,
		94686,
		94694,
		94700,
		94714,
		94726,
		94732,
		94744,
		94768,
		94782,
		94816,
		94844,
		94912,
		94968,
		94990,
		95004,
		95032,
		95088,
		95102,
		95112,
		95120,
		95134,
		95136,
		95164,
		95180,
		95192,
		95214,
		95218,
		95220,
		95244,
		95256,
		95280,
		95294,
		95328,
		95356,
		95424,
		95480,
		95728,
		95758,
		95772,
		95800,
		95856,
		95870,
		95968,
		95996,
		96008,
		96016,
		96030,
		96032,
		96060,
		96064,
		96120,
		96152,
		96176,
		96190,
		96220,
		96226,
		96228,
		96232,
		96290,
		96292,
		96296,
		96310,
		96322,
		96324,
		96328,
		96336,
		96350,
		96358,
		96364,
		96386,
		96388,
		96392,
		96400,
		96414,
		96416,
		96444,
		96454,
		96460,
		96472,
		96494,
		96498,
		96500,
		96514,
		96516,
		96520,
		96528,
		96542,
		96544,
		96572,
		96576,
		96632,
		96646,
		96652,
		96664,
		96688,
		96702,
		96718,
		96732,
		96738,
		96740,
		96744,
		96758,
		96772,
		96776,
		96784,
		96798,
		96800,
		96828,
		96832,
		96888,
		97008,
		97030,
		97036,
		97048,
		97072,
		97086,
		97120,
		97148,
		97166,
		97180,
		97208,
		97220,
		97224,
		97232,
		97246,
		97254,
		97260,
		97326,
		97330,
		97332,
		97358,
		97372,
		97378,
		97380,
		97384,
		97398,
		97422,
		97436,
		97464,
		97474,
		97476,
		97480,
		97488,
		97502,
		97510,
		97516,
		97550,
		97564,
		97592,
		97648,
		97666,
		97668,
		97672,
		97680,
		97694,
		97696,
		97724,
		97734,
		97740,
		97752,
		97774,
		97830,
		97836,
		97850,
		97862,
		97868,
		97880,
		97902,
		97906,
		97908,
		97926,
		97932,
		97944,
		97968,
		97998,
		98012,
		98018,
		98020,
		98024,
		98038,
		98618,
		98674,
		98676,
		98838,
		98854,
		98874,
		98892,
		98904,
		98926,
		98930,
		98932,
		98968,
		99006,
		99042,
		99044,
		99048,
		99062,
		99166,
		99194,
		99246,
		99286,
		99350,
		99366,
		99372,
		99386,
		99398,
		99416,
		99438,
		99442,
		99444,
		99462,
		99504,
		99518,
		99534,
		99548,
		99554,
		99556,
		99560,
		99574,
		99590,
		99596,
		99608,
		99632,
		99646,
		99680,
		99708,
		99726,
		99740,
		99768,
		99778,
		99780,
		99784,
		99792,
		99806,
		99814,
		99820,
		99834,
		99858,
		99860,
		99874,
		99880,
		99894,
		99906,
		99920,
		99934,
		99962,
		99970,
		99972,
		99976,
		99984,
		99998,
		1e5,
		100028,
		100038,
		100044,
		100056,
		100078,
		100082,
		100084,
		100142,
		100174,
		100188,
		100246,
		100262,
		100268,
		100306,
		100308,
		100390,
		100396,
		100410,
		100422,
		100428,
		100440,
		100462,
		100466,
		100468,
		100486,
		100504,
		100528,
		100542,
		100558,
		100572,
		100578,
		100580,
		100584,
		100598,
		100620,
		100656,
		100670,
		100704,
		100732,
		100750,
		100792,
		100802,
		100808,
		100816,
		100830,
		100838,
		100844,
		100858,
		100888,
		100912,
		100926,
		100960,
		100988,
		101056,
		101112,
		101148,
		101176,
		101232,
		101246,
		101250,
		101252,
		101256,
		101264,
		101278,
		101280,
		101308,
		101318,
		101324,
		101336,
		101358,
		101362,
		101364,
		101410,
		101412,
		101416,
		101430,
		101442,
		101448,
		101456,
		101470,
		101478,
		101498,
		101506,
		101508,
		101520,
		101534,
		101536,
		101564,
		101580,
		101618,
		101620,
		101636,
		101640,
		101648,
		101662,
		101664,
		101692,
		101696,
		101752,
		101766,
		101784,
		101838,
		101858,
		101860,
		101864,
		101934,
		101938,
		101940,
		101966,
		101980,
		101986,
		101988,
		101992,
		102030,
		102044,
		102072,
		102082,
		102084,
		102088,
		102096,
		102138,
		102166,
		102182,
		102188,
		102214,
		102220,
		102232,
		102254,
		102282,
		102290,
		102292,
		102306,
		102308,
		102312,
		102326,
		102444,
		102458,
		102470,
		102476,
		102488,
		102514,
		102516,
		102534,
		102552,
		102576,
		102590,
		102606,
		102620,
		102626,
		102632,
		102646,
		102662,
		102668,
		102704,
		102718,
		102752,
		102780,
		102798,
		102812,
		102840,
		102850,
		102856,
		102864,
		102878,
		102886,
		102892,
		102906,
		102936,
		102974,
		103008,
		103036,
		103104,
		103160,
		103224,
		103280,
		103294,
		103298,
		103300,
		103312,
		103326,
		103328,
		103356,
		103366,
		103372,
		103384,
		103406,
		103410,
		103412,
		103472,
		103486,
		103520,
		103548,
		103616,
		103672,
		103920,
		103992,
		104048,
		104062,
		104160,
		104188,
		104194,
		104196,
		104200,
		104208,
		104224,
		104252,
		104256,
		104312,
		104326,
		104332,
		104344,
		104368,
		104382,
		104398,
		104412,
		104418,
		104420,
		104424,
		104482,
		104484,
		104514,
		104520,
		104528,
		104542,
		104550,
		104570,
		104578,
		104580,
		104592,
		104606,
		104608,
		104636,
		104652,
		104690,
		104692,
		104706,
		104712,
		104734,
		104736,
		104764,
		104768,
		104824,
		104838,
		104856,
		104910,
		104930,
		104932,
		104936,
		104968,
		104976,
		104990,
		104992,
		105020,
		105024,
		105080,
		105200,
		105240,
		105278,
		105312,
		105372,
		105410,
		105412,
		105416,
		105424,
		105446,
		105518,
		105524,
		105550,
		105564,
		105570,
		105572,
		105576,
		105614,
		105628,
		105656,
		105666,
		105672,
		105680,
		105702,
		105722,
		105742,
		105756,
		105784,
		105840,
		105854,
		105858,
		105860,
		105864,
		105872,
		105888,
		105932,
		105970,
		105972,
		106006,
		106022,
		106028,
		106054,
		106060,
		106072,
		106100,
		106118,
		106124,
		106136,
		106160,
		106174,
		106190,
		106210,
		106212,
		106216,
		106250,
		106258,
		106260,
		106274,
		106276,
		106280,
		106306,
		106308,
		106312,
		106320,
		106334,
		106348,
		106394,
		106414,
		106418,
		106420,
		106566,
		106572,
		106610,
		106612,
		106630,
		106636,
		106648,
		106672,
		106686,
		106722,
		106724,
		106728,
		106742,
		106758,
		106764,
		106776,
		106800,
		106814,
		106848,
		106876,
		106894,
		106908,
		106936,
		106946,
		106948,
		106952,
		106960,
		106974,
		106982,
		106988,
		107032,
		107056,
		107070,
		107104,
		107132,
		107200,
		107256,
		107292,
		107320,
		107376,
		107390,
		107394,
		107396,
		107400,
		107408,
		107422,
		107424,
		107452,
		107462,
		107468,
		107480,
		107502,
		107506,
		107508,
		107544,
		107568,
		107582,
		107616,
		107644,
		107712,
		107768,
		108016,
		108060,
		108088,
		108144,
		108158,
		108256,
		108284,
		108290,
		108292,
		108296,
		108304,
		108318,
		108320,
		108348,
		108352,
		108408,
		108422,
		108428,
		108440,
		108464,
		108478,
		108494,
		108508,
		108514,
		108516,
		108520,
		108592,
		108640,
		108668,
		108736,
		108792,
		109040,
		109536,
		109680,
		109694,
		109792,
		109820,
		110016,
		110072,
		110084,
		110088,
		110096,
		110112,
		110140,
		110144,
		110200,
		110320,
		110342,
		110348,
		110360,
		110384,
		110398,
		110432,
		110460,
		110478,
		110492,
		110520,
		110532,
		110536,
		110544,
		110558,
		110658,
		110686,
		110714,
		110722,
		110724,
		110728,
		110736,
		110750,
		110752,
		110780,
		110796,
		110834,
		110836,
		110850,
		110852,
		110856,
		110864,
		110878,
		110880,
		110908,
		110912,
		110968,
		110982,
		111e3,
		111054,
		111074,
		111076,
		111080,
		111108,
		111112,
		111120,
		111134,
		111136,
		111164,
		111168,
		111224,
		111344,
		111372,
		111422,
		111456,
		111516,
		111554,
		111556,
		111560,
		111568,
		111590,
		111632,
		111646,
		111648,
		111676,
		111680,
		111736,
		111856,
		112096,
		112152,
		112224,
		112252,
		112320,
		112440,
		112514,
		112516,
		112520,
		112528,
		112542,
		112544,
		112588,
		112686,
		112718,
		112732,
		112782,
		112796,
		112824,
		112834,
		112836,
		112840,
		112848,
		112870,
		112890,
		112910,
		112924,
		112952,
		113008,
		113022,
		113026,
		113028,
		113032,
		113040,
		113054,
		113056,
		113100,
		113138,
		113140,
		113166,
		113180,
		113208,
		113264,
		113278,
		113376,
		113404,
		113416,
		113424,
		113440,
		113468,
		113472,
		113560,
		113614,
		113634,
		113636,
		113640,
		113686,
		113702,
		113708,
		113734,
		113740,
		113752,
		113778,
		113780,
		113798,
		113804,
		113816,
		113840,
		113854,
		113870,
		113890,
		113892,
		113896,
		113926,
		113932,
		113944,
		113968,
		113982,
		114016,
		114044,
		114076,
		114114,
		114116,
		114120,
		114128,
		114150,
		114170,
		114194,
		114196,
		114210,
		114212,
		114216,
		114242,
		114244,
		114248,
		114256,
		114270,
		114278,
		114306,
		114308,
		114312,
		114320,
		114334,
		114336,
		114364,
		114380,
		114420,
		114458,
		114478,
		114482,
		114484,
		114510,
		114524,
		114530,
		114532,
		114536,
		114842,
		114866,
		114868,
		114970,
		114994,
		114996,
		115042,
		115044,
		115048,
		115062,
		115130,
		115226,
		115250,
		115252,
		115278,
		115292,
		115298,
		115300,
		115304,
		115318,
		115342,
		115394,
		115396,
		115400,
		115408,
		115422,
		115430,
		115436,
		115450,
		115478,
		115494,
		115514,
		115526,
		115532,
		115570,
		115572,
		115738,
		115758,
		115762,
		115764,
		115790,
		115804,
		115810,
		115812,
		115816,
		115830,
		115854,
		115868,
		115896,
		115906,
		115912,
		115920,
		115934,
		115942,
		115948,
		115962,
		115996,
		116024,
		116080,
		116094,
		116098,
		116100,
		116104,
		116112,
		116126,
		116128,
		116156,
		116166,
		116172,
		116184,
		116206,
		116210,
		116212,
		116246,
		116262,
		116268,
		116282,
		116294,
		116300,
		116312,
		116334,
		116338,
		116340,
		116358,
		116364,
		116376,
		116400,
		116414,
		116430,
		116444,
		116450,
		116452,
		116456,
		116498,
		116500,
		116514,
		116520,
		116534,
		116546,
		116548,
		116552,
		116560,
		116574,
		116582,
		116588,
		116602,
		116654,
		116694,
		116714,
		116762,
		116782,
		116786,
		116788,
		116814,
		116828,
		116834,
		116836,
		116840,
		116854,
		116878,
		116892,
		116920,
		116930,
		116936,
		116944,
		116958,
		116966,
		116972,
		116986,
		117006,
		117048,
		117104,
		117118,
		117122,
		117124,
		117136,
		117150,
		117152,
		117180,
		117190,
		117196,
		117208,
		117230,
		117234,
		117236,
		117304,
		117360,
		117374,
		117472,
		117500,
		117506,
		117508,
		117512,
		117520,
		117536,
		117564,
		117568,
		117624,
		117638,
		117644,
		117656,
		117680,
		117694,
		117710,
		117724,
		117730,
		117732,
		117736,
		117750,
		117782,
		117798,
		117804,
		117818,
		117830,
		117848,
		117874,
		117876,
		117894,
		117936,
		117950,
		117966,
		117986,
		117988,
		117992,
		118022,
		118028,
		118040,
		118064,
		118078,
		118112,
		118140,
		118172,
		118210,
		118212,
		118216,
		118224,
		118238,
		118246,
		118266,
		118306,
		118312,
		118338,
		118352,
		118366,
		118374,
		118394,
		118402,
		118404,
		118408,
		118416,
		118430,
		118432,
		118460,
		118476,
		118514,
		118516,
		118574,
		118578,
		118580,
		118606,
		118620,
		118626,
		118628,
		118632,
		118678,
		118694,
		118700,
		118730,
		118738,
		118740,
		118830,
		118834,
		118836,
		118862,
		118876,
		118882,
		118884,
		118888,
		118902,
		118926,
		118940,
		118968,
		118978,
		118980,
		118984,
		118992,
		119006,
		119014,
		119020,
		119034,
		119068,
		119096,
		119152,
		119166,
		119170,
		119172,
		119176,
		119184,
		119198,
		119200,
		119228,
		119238,
		119244,
		119256,
		119278,
		119282,
		119284,
		119324,
		119352,
		119408,
		119422,
		119520,
		119548,
		119554,
		119556,
		119560,
		119568,
		119582,
		119584,
		119612,
		119616,
		119672,
		119686,
		119692,
		119704,
		119728,
		119742,
		119758,
		119772,
		119778,
		119780,
		119784,
		119798,
		119920,
		119934,
		120032,
		120060,
		120256,
		120312,
		120324,
		120328,
		120336,
		120352,
		120384,
		120440,
		120560,
		120582,
		120588,
		120600,
		120624,
		120638,
		120672,
		120700,
		120718,
		120732,
		120760,
		120770,
		120772,
		120776,
		120784,
		120798,
		120806,
		120812,
		120870,
		120876,
		120890,
		120902,
		120908,
		120920,
		120946,
		120948,
		120966,
		120972,
		120984,
		121008,
		121022,
		121038,
		121058,
		121060,
		121064,
		121078,
		121100,
		121112,
		121136,
		121150,
		121184,
		121212,
		121244,
		121282,
		121284,
		121288,
		121296,
		121318,
		121338,
		121356,
		121368,
		121392,
		121406,
		121440,
		121468,
		121536,
		121592,
		121656,
		121730,
		121732,
		121736,
		121744,
		121758,
		121760,
		121804,
		121842,
		121844,
		121890,
		121922,
		121924,
		121928,
		121936,
		121950,
		121958,
		121978,
		121986,
		121988,
		121992,
		122e3,
		122014,
		122016,
		122044,
		122060,
		122098,
		122100,
		122116,
		122120,
		122128,
		122142,
		122144,
		122172,
		122176,
		122232,
		122246,
		122264,
		122318,
		122338,
		122340,
		122344,
		122414,
		122418,
		122420,
		122446,
		122460,
		122466,
		122468,
		122472,
		122510,
		122524,
		122552,
		122562,
		122564,
		122568,
		122576,
		122598,
		122618,
		122646,
		122662,
		122668,
		122694,
		122700,
		122712,
		122738,
		122740,
		122762,
		122770,
		122772,
		122786,
		122788,
		122792,
		123018,
		123026,
		123028,
		123042,
		123044,
		123048,
		123062,
		123098,
		123146,
		123154,
		123156,
		123170,
		123172,
		123176,
		123190,
		123202,
		123204,
		123208,
		123216,
		123238,
		123244,
		123258,
		123290,
		123314,
		123316,
		123402,
		123410,
		123412,
		123426,
		123428,
		123432,
		123446,
		123458,
		123464,
		123472,
		123486,
		123494,
		123500,
		123514,
		123522,
		123524,
		123528,
		123536,
		123552,
		123580,
		123590,
		123596,
		123608,
		123630,
		123634,
		123636,
		123674,
		123698,
		123700,
		123740,
		123746,
		123748,
		123752,
		123834,
		123914,
		123922,
		123924,
		123938,
		123944,
		123958,
		123970,
		123976,
		123984,
		123998,
		124006,
		124012,
		124026,
		124034,
		124036,
		124048,
		124062,
		124064,
		124092,
		124102,
		124108,
		124120,
		124142,
		124146,
		124148,
		124162,
		124164,
		124168,
		124176,
		124190,
		124192,
		124220,
		124224,
		124280,
		124294,
		124300,
		124312,
		124336,
		124350,
		124366,
		124380,
		124386,
		124388,
		124392,
		124406,
		124442,
		124462,
		124466,
		124468,
		124494,
		124508,
		124514,
		124520,
		124558,
		124572,
		124600,
		124610,
		124612,
		124616,
		124624,
		124646,
		124666,
		124694,
		124710,
		124716,
		124730,
		124742,
		124748,
		124760,
		124786,
		124788,
		124818,
		124820,
		124834,
		124836,
		124840,
		124854,
		124946,
		124948,
		124962,
		124964,
		124968,
		124982,
		124994,
		124996,
		125e3,
		125008,
		125022,
		125030,
		125036,
		125050,
		125058,
		125060,
		125064,
		125072,
		125086,
		125088,
		125116,
		125126,
		125132,
		125144,
		125166,
		125170,
		125172,
		125186,
		125188,
		125192,
		125200,
		125216,
		125244,
		125248,
		125304,
		125318,
		125324,
		125336,
		125360,
		125374,
		125390,
		125404,
		125410,
		125412,
		125416,
		125430,
		125444,
		125448,
		125456,
		125472,
		125504,
		125560,
		125680,
		125702,
		125708,
		125720,
		125744,
		125758,
		125792,
		125820,
		125838,
		125852,
		125880,
		125890,
		125892,
		125896,
		125904,
		125918,
		125926,
		125932,
		125978,
		125998,
		126002,
		126004,
		126030,
		126044,
		126050,
		126052,
		126056,
		126094,
		126108,
		126136,
		126146,
		126148,
		126152,
		126160,
		126182,
		126202,
		126222,
		126236,
		126264,
		126320,
		126334,
		126338,
		126340,
		126344,
		126352,
		126366,
		126368,
		126412,
		126450,
		126452,
		126486,
		126502,
		126508,
		126522,
		126534,
		126540,
		126552,
		126574,
		126578,
		126580,
		126598,
		126604,
		126616,
		126640,
		126654,
		126670,
		126684,
		126690,
		126692,
		126696,
		126738,
		126754,
		126756,
		126760,
		126774,
		126786,
		126788,
		126792,
		126800,
		126814,
		126822,
		126828,
		126842,
		126894,
		126898,
		126900,
		126934,
		127126,
		127142,
		127148,
		127162,
		127178,
		127186,
		127188,
		127254,
		127270,
		127276,
		127290,
		127302,
		127308,
		127320,
		127342,
		127346,
		127348,
		127370,
		127378,
		127380,
		127394,
		127396,
		127400,
		127450,
		127510,
		127526,
		127532,
		127546,
		127558,
		127576,
		127598,
		127602,
		127604,
		127622,
		127628,
		127640,
		127664,
		127678,
		127694,
		127708,
		127714,
		127716,
		127720,
		127734,
		127754,
		127762,
		127764,
		127778,
		127784,
		127810,
		127812,
		127816,
		127824,
		127838,
		127846,
		127866,
		127898,
		127918,
		127922,
		127924,
		128022,
		128038,
		128044,
		128058,
		128070,
		128076,
		128088,
		128110,
		128114,
		128116,
		128134,
		128140,
		128152,
		128176,
		128190,
		128206,
		128220,
		128226,
		128228,
		128232,
		128246,
		128262,
		128268,
		128280,
		128304,
		128318,
		128352,
		128380,
		128398,
		128412,
		128440,
		128450,
		128452,
		128456,
		128464,
		128478,
		128486,
		128492,
		128506,
		128522,
		128530,
		128532,
		128546,
		128548,
		128552,
		128566,
		128578,
		128580,
		128584,
		128592,
		128606,
		128614,
		128634,
		128642,
		128644,
		128648,
		128656,
		128670,
		128672,
		128700,
		128716,
		128754,
		128756,
		128794,
		128814,
		128818,
		128820,
		128846,
		128860,
		128866,
		128868,
		128872,
		128886,
		128918,
		128934,
		128940,
		128954,
		128978,
		128980,
		129178,
		129198,
		129202,
		129204,
		129238,
		129258,
		129306,
		129326,
		129330,
		129332,
		129358,
		129372,
		129378,
		129380,
		129384,
		129398,
		129430,
		129446,
		129452,
		129466,
		129482,
		129490,
		129492,
		129562,
		129582,
		129586,
		129588,
		129614,
		129628,
		129634,
		129636,
		129640,
		129654,
		129678,
		129692,
		129720,
		129730,
		129732,
		129736,
		129744,
		129758,
		129766,
		129772,
		129814,
		129830,
		129836,
		129850,
		129862,
		129868,
		129880,
		129902,
		129906,
		129908,
		129930,
		129938,
		129940,
		129954,
		129956,
		129960,
		129974,
		130010
	]), e.CODEWORD_TABLE = Int32Array.from([
		2627,
		1819,
		2622,
		2621,
		1813,
		1812,
		2729,
		2724,
		2723,
		2779,
		2774,
		2773,
		902,
		896,
		908,
		868,
		865,
		861,
		859,
		2511,
		873,
		871,
		1780,
		835,
		2493,
		825,
		2491,
		842,
		837,
		844,
		1764,
		1762,
		811,
		810,
		809,
		2483,
		807,
		2482,
		806,
		2480,
		815,
		814,
		813,
		812,
		2484,
		817,
		816,
		1745,
		1744,
		1742,
		1746,
		2655,
		2637,
		2635,
		2626,
		2625,
		2623,
		2628,
		1820,
		2752,
		2739,
		2737,
		2728,
		2727,
		2725,
		2730,
		2785,
		2783,
		2778,
		2777,
		2775,
		2780,
		787,
		781,
		747,
		739,
		736,
		2413,
		754,
		752,
		1719,
		692,
		689,
		681,
		2371,
		678,
		2369,
		700,
		697,
		694,
		703,
		1688,
		1686,
		642,
		638,
		2343,
		631,
		2341,
		627,
		2338,
		651,
		646,
		643,
		2345,
		654,
		652,
		1652,
		1650,
		1647,
		1654,
		601,
		599,
		2322,
		596,
		2321,
		594,
		2319,
		2317,
		611,
		610,
		608,
		606,
		2324,
		603,
		2323,
		615,
		614,
		612,
		1617,
		1616,
		1614,
		1612,
		616,
		1619,
		1618,
		2575,
		2538,
		2536,
		905,
		901,
		898,
		909,
		2509,
		2507,
		2504,
		870,
		867,
		864,
		860,
		2512,
		875,
		872,
		1781,
		2490,
		2489,
		2487,
		2485,
		1748,
		836,
		834,
		832,
		830,
		2494,
		827,
		2492,
		843,
		841,
		839,
		845,
		1765,
		1763,
		2701,
		2676,
		2674,
		2653,
		2648,
		2656,
		2634,
		2633,
		2631,
		2629,
		1821,
		2638,
		2636,
		2770,
		2763,
		2761,
		2750,
		2745,
		2753,
		2736,
		2735,
		2733,
		2731,
		1848,
		2740,
		2738,
		2786,
		2784,
		591,
		588,
		576,
		569,
		566,
		2296,
		1590,
		537,
		534,
		526,
		2276,
		522,
		2274,
		545,
		542,
		539,
		548,
		1572,
		1570,
		481,
		2245,
		466,
		2242,
		462,
		2239,
		492,
		485,
		482,
		2249,
		496,
		494,
		1534,
		1531,
		1528,
		1538,
		413,
		2196,
		406,
		2191,
		2188,
		425,
		419,
		2202,
		415,
		2199,
		432,
		430,
		427,
		1472,
		1467,
		1464,
		433,
		1476,
		1474,
		368,
		367,
		2160,
		365,
		2159,
		362,
		2157,
		2155,
		2152,
		378,
		377,
		375,
		2166,
		372,
		2165,
		369,
		2162,
		383,
		381,
		379,
		2168,
		1419,
		1418,
		1416,
		1414,
		385,
		1411,
		384,
		1423,
		1422,
		1420,
		1424,
		2461,
		802,
		2441,
		2439,
		790,
		786,
		783,
		794,
		2409,
		2406,
		2403,
		750,
		742,
		738,
		2414,
		756,
		753,
		1720,
		2367,
		2365,
		2362,
		2359,
		1663,
		693,
		691,
		684,
		2373,
		680,
		2370,
		702,
		699,
		696,
		704,
		1690,
		1687,
		2337,
		2336,
		2334,
		2332,
		1624,
		2329,
		1622,
		640,
		637,
		2344,
		634,
		2342,
		630,
		2340,
		650,
		648,
		645,
		2346,
		655,
		653,
		1653,
		1651,
		1649,
		1655,
		2612,
		2597,
		2595,
		2571,
		2568,
		2565,
		2576,
		2534,
		2529,
		2526,
		1787,
		2540,
		2537,
		907,
		904,
		900,
		910,
		2503,
		2502,
		2500,
		2498,
		1768,
		2495,
		1767,
		2510,
		2508,
		2506,
		869,
		866,
		863,
		2513,
		876,
		874,
		1782,
		2720,
		2713,
		2711,
		2697,
		2694,
		2691,
		2702,
		2672,
		2670,
		2664,
		1828,
		2678,
		2675,
		2647,
		2646,
		2644,
		2642,
		1823,
		2639,
		1822,
		2654,
		2652,
		2650,
		2657,
		2771,
		1855,
		2765,
		2762,
		1850,
		1849,
		2751,
		2749,
		2747,
		2754,
		353,
		2148,
		344,
		342,
		336,
		2142,
		332,
		2140,
		345,
		1375,
		1373,
		306,
		2130,
		299,
		2128,
		295,
		2125,
		319,
		314,
		311,
		2132,
		1354,
		1352,
		1349,
		1356,
		262,
		257,
		2101,
		253,
		2096,
		2093,
		274,
		273,
		267,
		2107,
		263,
		2104,
		280,
		278,
		275,
		1316,
		1311,
		1308,
		1320,
		1318,
		2052,
		202,
		2050,
		2044,
		2040,
		219,
		2063,
		212,
		2060,
		208,
		2055,
		224,
		221,
		2066,
		1260,
		1258,
		1252,
		231,
		1248,
		229,
		1266,
		1264,
		1261,
		1268,
		155,
		1998,
		153,
		1996,
		1994,
		1991,
		1988,
		165,
		164,
		2007,
		162,
		2006,
		159,
		2003,
		2e3,
		172,
		171,
		169,
		2012,
		166,
		2010,
		1186,
		1184,
		1182,
		1179,
		175,
		1176,
		173,
		1192,
		1191,
		1189,
		1187,
		176,
		1194,
		1193,
		2313,
		2307,
		2305,
		592,
		589,
		2294,
		2292,
		2289,
		578,
		572,
		568,
		2297,
		580,
		1591,
		2272,
		2267,
		2264,
		1547,
		538,
		536,
		529,
		2278,
		525,
		2275,
		547,
		544,
		541,
		1574,
		1571,
		2237,
		2235,
		2229,
		1493,
		2225,
		1489,
		478,
		2247,
		470,
		2244,
		465,
		2241,
		493,
		488,
		484,
		2250,
		498,
		495,
		1536,
		1533,
		1530,
		1539,
		2187,
		2186,
		2184,
		2182,
		1432,
		2179,
		1430,
		2176,
		1427,
		414,
		412,
		2197,
		409,
		2195,
		405,
		2193,
		2190,
		426,
		424,
		421,
		2203,
		418,
		2201,
		431,
		429,
		1473,
		1471,
		1469,
		1466,
		434,
		1477,
		1475,
		2478,
		2472,
		2470,
		2459,
		2457,
		2454,
		2462,
		803,
		2437,
		2432,
		2429,
		1726,
		2443,
		2440,
		792,
		789,
		785,
		2401,
		2399,
		2393,
		1702,
		2389,
		1699,
		2411,
		2408,
		2405,
		745,
		741,
		2415,
		758,
		755,
		1721,
		2358,
		2357,
		2355,
		2353,
		1661,
		2350,
		1660,
		2347,
		1657,
		2368,
		2366,
		2364,
		2361,
		1666,
		690,
		687,
		2374,
		683,
		2372,
		701,
		698,
		705,
		1691,
		1689,
		2619,
		2617,
		2610,
		2608,
		2605,
		2613,
		2593,
		2588,
		2585,
		1803,
		2599,
		2596,
		2563,
		2561,
		2555,
		1797,
		2551,
		1795,
		2573,
		2570,
		2567,
		2577,
		2525,
		2524,
		2522,
		2520,
		1786,
		2517,
		1785,
		2514,
		1783,
		2535,
		2533,
		2531,
		2528,
		1788,
		2541,
		2539,
		906,
		903,
		911,
		2721,
		1844,
		2715,
		2712,
		1838,
		1836,
		2699,
		2696,
		2693,
		2703,
		1827,
		1826,
		1824,
		2673,
		2671,
		2669,
		2666,
		1829,
		2679,
		2677,
		1858,
		1857,
		2772,
		1854,
		1853,
		1851,
		1856,
		2766,
		2764,
		143,
		1987,
		139,
		1986,
		135,
		133,
		131,
		1984,
		128,
		1983,
		125,
		1981,
		138,
		137,
		136,
		1985,
		1133,
		1132,
		1130,
		112,
		110,
		1974,
		107,
		1973,
		104,
		1971,
		1969,
		122,
		121,
		119,
		117,
		1977,
		114,
		1976,
		124,
		1115,
		1114,
		1112,
		1110,
		1117,
		1116,
		84,
		83,
		1953,
		81,
		1952,
		78,
		1950,
		1948,
		1945,
		94,
		93,
		91,
		1959,
		88,
		1958,
		85,
		1955,
		99,
		97,
		95,
		1961,
		1086,
		1085,
		1083,
		1081,
		1078,
		100,
		1090,
		1089,
		1087,
		1091,
		49,
		47,
		1917,
		44,
		1915,
		1913,
		1910,
		1907,
		59,
		1926,
		56,
		1925,
		53,
		1922,
		1919,
		66,
		64,
		1931,
		61,
		1929,
		1042,
		1040,
		1038,
		71,
		1035,
		70,
		1032,
		68,
		1048,
		1047,
		1045,
		1043,
		1050,
		1049,
		12,
		10,
		1869,
		1867,
		1864,
		1861,
		21,
		1880,
		19,
		1877,
		1874,
		1871,
		28,
		1888,
		25,
		1886,
		22,
		1883,
		982,
		980,
		977,
		974,
		32,
		30,
		991,
		989,
		987,
		984,
		34,
		995,
		994,
		992,
		2151,
		2150,
		2147,
		2146,
		2144,
		356,
		355,
		354,
		2149,
		2139,
		2138,
		2136,
		2134,
		1359,
		343,
		341,
		338,
		2143,
		335,
		2141,
		348,
		347,
		346,
		1376,
		1374,
		2124,
		2123,
		2121,
		2119,
		1326,
		2116,
		1324,
		310,
		308,
		305,
		2131,
		302,
		2129,
		298,
		2127,
		320,
		318,
		316,
		313,
		2133,
		322,
		321,
		1355,
		1353,
		1351,
		1357,
		2092,
		2091,
		2089,
		2087,
		1276,
		2084,
		1274,
		2081,
		1271,
		259,
		2102,
		256,
		2100,
		252,
		2098,
		2095,
		272,
		269,
		2108,
		266,
		2106,
		281,
		279,
		277,
		1317,
		1315,
		1313,
		1310,
		282,
		1321,
		1319,
		2039,
		2037,
		2035,
		2032,
		1203,
		2029,
		1200,
		1197,
		207,
		2053,
		205,
		2051,
		201,
		2049,
		2046,
		2043,
		220,
		218,
		2064,
		215,
		2062,
		211,
		2059,
		228,
		226,
		223,
		2069,
		1259,
		1257,
		1254,
		232,
		1251,
		230,
		1267,
		1265,
		1263,
		2316,
		2315,
		2312,
		2311,
		2309,
		2314,
		2304,
		2303,
		2301,
		2299,
		1593,
		2308,
		2306,
		590,
		2288,
		2287,
		2285,
		2283,
		1578,
		2280,
		1577,
		2295,
		2293,
		2291,
		579,
		577,
		574,
		571,
		2298,
		582,
		581,
		1592,
		2263,
		2262,
		2260,
		2258,
		1545,
		2255,
		1544,
		2252,
		1541,
		2273,
		2271,
		2269,
		2266,
		1550,
		535,
		532,
		2279,
		528,
		2277,
		546,
		543,
		549,
		1575,
		1573,
		2224,
		2222,
		2220,
		1486,
		2217,
		1485,
		2214,
		1482,
		1479,
		2238,
		2236,
		2234,
		2231,
		1496,
		2228,
		1492,
		480,
		477,
		2248,
		473,
		2246,
		469,
		2243,
		490,
		487,
		2251,
		497,
		1537,
		1535,
		1532,
		2477,
		2476,
		2474,
		2479,
		2469,
		2468,
		2466,
		2464,
		1730,
		2473,
		2471,
		2453,
		2452,
		2450,
		2448,
		1729,
		2445,
		1728,
		2460,
		2458,
		2456,
		2463,
		805,
		804,
		2428,
		2427,
		2425,
		2423,
		1725,
		2420,
		1724,
		2417,
		1722,
		2438,
		2436,
		2434,
		2431,
		1727,
		2444,
		2442,
		793,
		791,
		788,
		795,
		2388,
		2386,
		2384,
		1697,
		2381,
		1696,
		2378,
		1694,
		1692,
		2402,
		2400,
		2398,
		2395,
		1703,
		2392,
		1701,
		2412,
		2410,
		2407,
		751,
		748,
		744,
		2416,
		759,
		757,
		1807,
		2620,
		2618,
		1806,
		1805,
		2611,
		2609,
		2607,
		2614,
		1802,
		1801,
		1799,
		2594,
		2592,
		2590,
		2587,
		1804,
		2600,
		2598,
		1794,
		1793,
		1791,
		1789,
		2564,
		2562,
		2560,
		2557,
		1798,
		2554,
		1796,
		2574,
		2572,
		2569,
		2578,
		1847,
		1846,
		2722,
		1843,
		1842,
		1840,
		1845,
		2716,
		2714,
		1835,
		1834,
		1832,
		1830,
		1839,
		1837,
		2700,
		2698,
		2695,
		2704,
		1817,
		1811,
		1810,
		897,
		862,
		1777,
		829,
		826,
		838,
		1760,
		1758,
		808,
		2481,
		1741,
		1740,
		1738,
		1743,
		2624,
		1818,
		2726,
		2776,
		782,
		740,
		737,
		1715,
		686,
		679,
		695,
		1682,
		1680,
		639,
		628,
		2339,
		647,
		644,
		1645,
		1643,
		1640,
		1648,
		602,
		600,
		597,
		595,
		2320,
		593,
		2318,
		609,
		607,
		604,
		1611,
		1610,
		1608,
		1606,
		613,
		1615,
		1613,
		2328,
		926,
		924,
		892,
		886,
		899,
		857,
		850,
		2505,
		1778,
		824,
		823,
		821,
		819,
		2488,
		818,
		2486,
		833,
		831,
		828,
		840,
		1761,
		1759,
		2649,
		2632,
		2630,
		2746,
		2734,
		2732,
		2782,
		2781,
		570,
		567,
		1587,
		531,
		527,
		523,
		540,
		1566,
		1564,
		476,
		467,
		463,
		2240,
		486,
		483,
		1524,
		1521,
		1518,
		1529,
		411,
		403,
		2192,
		399,
		2189,
		423,
		416,
		1462,
		1457,
		1454,
		428,
		1468,
		1465,
		2210,
		366,
		363,
		2158,
		360,
		2156,
		357,
		2153,
		376,
		373,
		370,
		2163,
		1410,
		1409,
		1407,
		1405,
		382,
		1402,
		380,
		1417,
		1415,
		1412,
		1421,
		2175,
		2174,
		777,
		774,
		771,
		784,
		732,
		725,
		722,
		2404,
		743,
		1716,
		676,
		674,
		668,
		2363,
		665,
		2360,
		685,
		1684,
		1681,
		626,
		624,
		622,
		2335,
		620,
		2333,
		617,
		2330,
		641,
		635,
		649,
		1646,
		1644,
		1642,
		2566,
		928,
		925,
		2530,
		2527,
		894,
		891,
		888,
		2501,
		2499,
		2496,
		858,
		856,
		854,
		851,
		1779,
		2692,
		2668,
		2665,
		2645,
		2643,
		2640,
		2651,
		2768,
		2759,
		2757,
		2744,
		2743,
		2741,
		2748,
		352,
		1382,
		340,
		337,
		333,
		1371,
		1369,
		307,
		300,
		296,
		2126,
		315,
		312,
		1347,
		1342,
		1350,
		261,
		258,
		250,
		2097,
		246,
		2094,
		271,
		268,
		264,
		1306,
		1301,
		1298,
		276,
		1312,
		1309,
		2115,
		203,
		2048,
		195,
		2045,
		191,
		2041,
		213,
		209,
		2056,
		1246,
		1244,
		1238,
		225,
		1234,
		222,
		1256,
		1253,
		1249,
		1262,
		2080,
		2079,
		154,
		1997,
		150,
		1995,
		147,
		1992,
		1989,
		163,
		160,
		2004,
		156,
		2001,
		1175,
		1174,
		1172,
		1170,
		1167,
		170,
		1164,
		167,
		1185,
		1183,
		1180,
		1177,
		174,
		1190,
		1188,
		2025,
		2024,
		2022,
		587,
		586,
		564,
		559,
		556,
		2290,
		573,
		1588,
		520,
		518,
		512,
		2268,
		508,
		2265,
		530,
		1568,
		1565,
		461,
		457,
		2233,
		450,
		2230,
		446,
		2226,
		479,
		471,
		489,
		1526,
		1523,
		1520,
		397,
		395,
		2185,
		392,
		2183,
		389,
		2180,
		2177,
		410,
		2194,
		402,
		422,
		1463,
		1461,
		1459,
		1456,
		1470,
		2455,
		799,
		2433,
		2430,
		779,
		776,
		773,
		2397,
		2394,
		2390,
		734,
		728,
		724,
		746,
		1717,
		2356,
		2354,
		2351,
		2348,
		1658,
		677,
		675,
		673,
		670,
		667,
		688,
		1685,
		1683,
		2606,
		2589,
		2586,
		2559,
		2556,
		2552,
		927,
		2523,
		2521,
		2518,
		2515,
		1784,
		2532,
		895,
		893,
		890,
		2718,
		2709,
		2707,
		2689,
		2687,
		2684,
		2663,
		2662,
		2660,
		2658,
		1825,
		2667,
		2769,
		1852,
		2760,
		2758,
		142,
		141,
		1139,
		1138,
		134,
		132,
		129,
		126,
		1982,
		1129,
		1128,
		1126,
		1131,
		113,
		111,
		108,
		105,
		1972,
		101,
		1970,
		120,
		118,
		115,
		1109,
		1108,
		1106,
		1104,
		123,
		1113,
		1111,
		82,
		79,
		1951,
		75,
		1949,
		72,
		1946,
		92,
		89,
		86,
		1956,
		1077,
		1076,
		1074,
		1072,
		98,
		1069,
		96,
		1084,
		1082,
		1079,
		1088,
		1968,
		1967,
		48,
		45,
		1916,
		42,
		1914,
		39,
		1911,
		1908,
		60,
		57,
		54,
		1923,
		50,
		1920,
		1031,
		1030,
		1028,
		1026,
		67,
		1023,
		65,
		1020,
		62,
		1041,
		1039,
		1036,
		1033,
		69,
		1046,
		1044,
		1944,
		1943,
		1941,
		11,
		9,
		1868,
		7,
		1865,
		1862,
		1859,
		20,
		1878,
		16,
		1875,
		13,
		1872,
		970,
		968,
		966,
		963,
		29,
		960,
		26,
		23,
		983,
		981,
		978,
		975,
		33,
		971,
		31,
		990,
		988,
		985,
		1906,
		1904,
		1902,
		993,
		351,
		2145,
		1383,
		331,
		330,
		328,
		326,
		2137,
		323,
		2135,
		339,
		1372,
		1370,
		294,
		293,
		291,
		289,
		2122,
		286,
		2120,
		283,
		2117,
		309,
		303,
		317,
		1348,
		1346,
		1344,
		245,
		244,
		242,
		2090,
		239,
		2088,
		236,
		2085,
		2082,
		260,
		2099,
		249,
		270,
		1307,
		1305,
		1303,
		1300,
		1314,
		189,
		2038,
		186,
		2036,
		183,
		2033,
		2030,
		2026,
		206,
		198,
		2047,
		194,
		216,
		1247,
		1245,
		1243,
		1240,
		227,
		1237,
		1255,
		2310,
		2302,
		2300,
		2286,
		2284,
		2281,
		565,
		563,
		561,
		558,
		575,
		1589,
		2261,
		2259,
		2256,
		2253,
		1542,
		521,
		519,
		517,
		514,
		2270,
		511,
		533,
		1569,
		1567,
		2223,
		2221,
		2218,
		2215,
		1483,
		2211,
		1480,
		459,
		456,
		453,
		2232,
		449,
		474,
		491,
		1527,
		1525,
		1522,
		2475,
		2467,
		2465,
		2451,
		2449,
		2446,
		801,
		800,
		2426,
		2424,
		2421,
		2418,
		1723,
		2435,
		780,
		778,
		775,
		2387,
		2385,
		2382,
		2379,
		1695,
		2375,
		1693,
		2396,
		735,
		733,
		730,
		727,
		749,
		1718,
		2616,
		2615,
		2604,
		2603,
		2601,
		2584,
		2583,
		2581,
		2579,
		1800,
		2591,
		2550,
		2549,
		2547,
		2545,
		1792,
		2542,
		1790,
		2558,
		929,
		2719,
		1841,
		2710,
		2708,
		1833,
		1831,
		2690,
		2688,
		2686,
		1815,
		1809,
		1808,
		1774,
		1756,
		1754,
		1737,
		1736,
		1734,
		1739,
		1816,
		1711,
		1676,
		1674,
		633,
		629,
		1638,
		1636,
		1633,
		1641,
		598,
		1605,
		1604,
		1602,
		1600,
		605,
		1609,
		1607,
		2327,
		887,
		853,
		1775,
		822,
		820,
		1757,
		1755,
		1584,
		524,
		1560,
		1558,
		468,
		464,
		1514,
		1511,
		1508,
		1519,
		408,
		404,
		400,
		1452,
		1447,
		1444,
		417,
		1458,
		1455,
		2208,
		364,
		361,
		358,
		2154,
		1401,
		1400,
		1398,
		1396,
		374,
		1393,
		371,
		1408,
		1406,
		1403,
		1413,
		2173,
		2172,
		772,
		726,
		723,
		1712,
		672,
		669,
		666,
		682,
		1678,
		1675,
		625,
		623,
		621,
		618,
		2331,
		636,
		632,
		1639,
		1637,
		1635,
		920,
		918,
		884,
		880,
		889,
		849,
		848,
		847,
		846,
		2497,
		855,
		852,
		1776,
		2641,
		2742,
		2787,
		1380,
		334,
		1367,
		1365,
		301,
		297,
		1340,
		1338,
		1335,
		1343,
		255,
		251,
		247,
		1296,
		1291,
		1288,
		265,
		1302,
		1299,
		2113,
		204,
		196,
		192,
		2042,
		1232,
		1230,
		1224,
		214,
		1220,
		210,
		1242,
		1239,
		1235,
		1250,
		2077,
		2075,
		151,
		148,
		1993,
		144,
		1990,
		1163,
		1162,
		1160,
		1158,
		1155,
		161,
		1152,
		157,
		1173,
		1171,
		1168,
		1165,
		168,
		1181,
		1178,
		2021,
		2020,
		2018,
		2023,
		585,
		560,
		557,
		1585,
		516,
		509,
		1562,
		1559,
		458,
		447,
		2227,
		472,
		1516,
		1513,
		1510,
		398,
		396,
		393,
		390,
		2181,
		386,
		2178,
		407,
		1453,
		1451,
		1449,
		1446,
		420,
		1460,
		2209,
		769,
		764,
		720,
		712,
		2391,
		729,
		1713,
		664,
		663,
		661,
		659,
		2352,
		656,
		2349,
		671,
		1679,
		1677,
		2553,
		922,
		919,
		2519,
		2516,
		885,
		883,
		881,
		2685,
		2661,
		2659,
		2767,
		2756,
		2755,
		140,
		1137,
		1136,
		130,
		127,
		1125,
		1124,
		1122,
		1127,
		109,
		106,
		102,
		1103,
		1102,
		1100,
		1098,
		116,
		1107,
		1105,
		1980,
		80,
		76,
		73,
		1947,
		1068,
		1067,
		1065,
		1063,
		90,
		1060,
		87,
		1075,
		1073,
		1070,
		1080,
		1966,
		1965,
		46,
		43,
		40,
		1912,
		36,
		1909,
		1019,
		1018,
		1016,
		1014,
		58,
		1011,
		55,
		1008,
		51,
		1029,
		1027,
		1024,
		1021,
		63,
		1037,
		1034,
		1940,
		1939,
		1937,
		1942,
		8,
		1866,
		4,
		1863,
		1,
		1860,
		956,
		954,
		952,
		949,
		946,
		17,
		14,
		969,
		967,
		964,
		961,
		27,
		957,
		24,
		979,
		976,
		972,
		1901,
		1900,
		1898,
		1896,
		986,
		1905,
		1903,
		350,
		349,
		1381,
		329,
		327,
		324,
		1368,
		1366,
		292,
		290,
		287,
		284,
		2118,
		304,
		1341,
		1339,
		1337,
		1345,
		243,
		240,
		237,
		2086,
		233,
		2083,
		254,
		1297,
		1295,
		1293,
		1290,
		1304,
		2114,
		190,
		187,
		184,
		2034,
		180,
		2031,
		177,
		2027,
		199,
		1233,
		1231,
		1229,
		1226,
		217,
		1223,
		1241,
		2078,
		2076,
		584,
		555,
		554,
		552,
		550,
		2282,
		562,
		1586,
		507,
		506,
		504,
		502,
		2257,
		499,
		2254,
		515,
		1563,
		1561,
		445,
		443,
		441,
		2219,
		438,
		2216,
		435,
		2212,
		460,
		454,
		475,
		1517,
		1515,
		1512,
		2447,
		798,
		797,
		2422,
		2419,
		770,
		768,
		766,
		2383,
		2380,
		2376,
		721,
		719,
		717,
		714,
		731,
		1714,
		2602,
		2582,
		2580,
		2548,
		2546,
		2543,
		923,
		921,
		2717,
		2706,
		2705,
		2683,
		2682,
		2680,
		1771,
		1752,
		1750,
		1733,
		1732,
		1731,
		1735,
		1814,
		1707,
		1670,
		1668,
		1631,
		1629,
		1626,
		1634,
		1599,
		1598,
		1596,
		1594,
		1603,
		1601,
		2326,
		1772,
		1753,
		1751,
		1581,
		1554,
		1552,
		1504,
		1501,
		1498,
		1509,
		1442,
		1437,
		1434,
		401,
		1448,
		1445,
		2206,
		1392,
		1391,
		1389,
		1387,
		1384,
		359,
		1399,
		1397,
		1394,
		1404,
		2171,
		2170,
		1708,
		1672,
		1669,
		619,
		1632,
		1630,
		1628,
		1773,
		1378,
		1363,
		1361,
		1333,
		1328,
		1336,
		1286,
		1281,
		1278,
		248,
		1292,
		1289,
		2111,
		1218,
		1216,
		1210,
		197,
		1206,
		193,
		1228,
		1225,
		1221,
		1236,
		2073,
		2071,
		1151,
		1150,
		1148,
		1146,
		152,
		1143,
		149,
		1140,
		145,
		1161,
		1159,
		1156,
		1153,
		158,
		1169,
		1166,
		2017,
		2016,
		2014,
		2019,
		1582,
		510,
		1556,
		1553,
		452,
		448,
		1506,
		1500,
		394,
		391,
		387,
		1443,
		1441,
		1439,
		1436,
		1450,
		2207,
		765,
		716,
		713,
		1709,
		662,
		660,
		657,
		1673,
		1671,
		916,
		914,
		879,
		878,
		877,
		882,
		1135,
		1134,
		1121,
		1120,
		1118,
		1123,
		1097,
		1096,
		1094,
		1092,
		103,
		1101,
		1099,
		1979,
		1059,
		1058,
		1056,
		1054,
		77,
		1051,
		74,
		1066,
		1064,
		1061,
		1071,
		1964,
		1963,
		1007,
		1006,
		1004,
		1002,
		999,
		41,
		996,
		37,
		1017,
		1015,
		1012,
		1009,
		52,
		1025,
		1022,
		1936,
		1935,
		1933,
		1938,
		942,
		940,
		938,
		935,
		932,
		5,
		2,
		955,
		953,
		950,
		947,
		18,
		943,
		15,
		965,
		962,
		958,
		1895,
		1894,
		1892,
		1890,
		973,
		1899,
		1897,
		1379,
		325,
		1364,
		1362,
		288,
		285,
		1334,
		1332,
		1330,
		241,
		238,
		234,
		1287,
		1285,
		1283,
		1280,
		1294,
		2112,
		188,
		185,
		181,
		178,
		2028,
		1219,
		1217,
		1215,
		1212,
		200,
		1209,
		1227,
		2074,
		2072,
		583,
		553,
		551,
		1583,
		505,
		503,
		500,
		513,
		1557,
		1555,
		444,
		442,
		439,
		436,
		2213,
		455,
		451,
		1507,
		1505,
		1502,
		796,
		763,
		762,
		760,
		767,
		711,
		710,
		708,
		706,
		2377,
		718,
		715,
		1710,
		2544,
		917,
		915,
		2681,
		1627,
		1597,
		1595,
		2325,
		1769,
		1749,
		1747,
		1499,
		1438,
		1435,
		2204,
		1390,
		1388,
		1385,
		1395,
		2169,
		2167,
		1704,
		1665,
		1662,
		1625,
		1623,
		1620,
		1770,
		1329,
		1282,
		1279,
		2109,
		1214,
		1207,
		1222,
		2068,
		2065,
		1149,
		1147,
		1144,
		1141,
		146,
		1157,
		1154,
		2013,
		2011,
		2008,
		2015,
		1579,
		1549,
		1546,
		1495,
		1487,
		1433,
		1431,
		1428,
		1425,
		388,
		1440,
		2205,
		1705,
		658,
		1667,
		1664,
		1119,
		1095,
		1093,
		1978,
		1057,
		1055,
		1052,
		1062,
		1962,
		1960,
		1005,
		1003,
		1e3,
		997,
		38,
		1013,
		1010,
		1932,
		1930,
		1927,
		1934,
		941,
		939,
		936,
		933,
		6,
		930,
		3,
		951,
		948,
		944,
		1889,
		1887,
		1884,
		1881,
		959,
		1893,
		1891,
		35,
		1377,
		1360,
		1358,
		1327,
		1325,
		1322,
		1331,
		1277,
		1275,
		1272,
		1269,
		235,
		1284,
		2110,
		1205,
		1204,
		1201,
		1198,
		182,
		1195,
		179,
		1213,
		2070,
		2067,
		1580,
		501,
		1551,
		1548,
		440,
		437,
		1497,
		1494,
		1490,
		1503,
		761,
		709,
		707,
		1706,
		913,
		912,
		2198,
		1386,
		2164,
		2161,
		1621,
		1766,
		2103,
		1208,
		2058,
		2054,
		1145,
		1142,
		2005,
		2002,
		1999,
		2009,
		1488,
		1429,
		1426,
		2200,
		1698,
		1659,
		1656,
		1975,
		1053,
		1957,
		1954,
		1001,
		998,
		1924,
		1921,
		1918,
		1928,
		937,
		934,
		931,
		1879,
		1876,
		1873,
		1870,
		945,
		1885,
		1882,
		1323,
		1273,
		1270,
		2105,
		1202,
		1199,
		1196,
		1211,
		2061,
		2057,
		1576,
		1543,
		1540,
		1484,
		1481,
		1478,
		1491,
		1700
	]), e;
}(), On;
(function(e) {
	e[e.OTHER = 0] = "OTHER", e[e.ORIENTATION = 1] = "ORIENTATION", e[e.BYTE_SEGMENTS = 2] = "BYTE_SEGMENTS", e[e.ERROR_CORRECTION_LEVEL = 3] = "ERROR_CORRECTION_LEVEL", e[e.ISSUE_NUMBER = 4] = "ISSUE_NUMBER", e[e.SUGGESTED_PRICE = 5] = "SUGGESTED_PRICE", e[e.POSSIBLE_COUNTRY = 6] = "POSSIBLE_COUNTRY", e[e.UPC_EAN_EXTENSION = 7] = "UPC_EAN_EXTENSION", e[e.PDF417_EXTRA_METADATA = 8] = "PDF417_EXTRA_METADATA", e[e.STRUCTURED_APPEND_SEQUENCE = 9] = "STRUCTURED_APPEND_SEQUENCE", e[e.STRUCTURED_APPEND_PARITY = 10] = "STRUCTURED_APPEND_PARITY", e[e.ERRORS_CORRECTED = 11] = "ERRORS_CORRECTED";
})(On ||= {});
var kn = On, An = function() {
	function e() {}
	return e.floatToIntBits = function(e) {
		return e;
	}, e.MAX_VALUE = 2 ** 53 - 1, e;
}(), jn = function() {
	function e(e, t) {
		this.x = e, this.y = t;
	}
	return e.prototype.getX = function() {
		return this.x;
	}, e.prototype.getY = function() {
		return this.y;
	}, e.prototype.equals = function(t) {
		if (t instanceof e) {
			var n = t;
			return this.x === n.x && this.y === n.y;
		}
		return !1;
	}, e.prototype.hashCode = function() {
		return 31 * An.floatToIntBits(this.x) + An.floatToIntBits(this.y);
	}, e.prototype.toString = function() {
		return "(" + this.x + "," + this.y + ")";
	}, e.orderBestPatterns = function(e) {
		var t = this.distance(e[0], e[1]), n = this.distance(e[1], e[2]), r = this.distance(e[0], e[2]), i, a, o;
		if (n >= t && n >= r ? (a = e[0], i = e[1], o = e[2]) : r >= n && r >= t ? (a = e[1], i = e[0], o = e[2]) : (a = e[2], i = e[0], o = e[1]), this.crossProductZ(i, a, o) < 0) {
			var s = i;
			i = o, o = s;
		}
		e[0] = i, e[1] = a, e[2] = o;
	}, e.distance = function(e, t) {
		return En.distance(e.x, e.y, t.x, t.y);
	}, e.crossProductZ = function(e, t, n) {
		var r = t.x, i = t.y;
		return (n.x - r) * (e.y - i) - (n.y - i) * (e.x - r);
	}, e;
}(), Mn = function() {
	function e(e, t) {
		this.bits = e, this.points = t;
	}
	return e.prototype.getBits = function() {
		return this.bits;
	}, e.prototype.getPoints = function() {
		return this.points;
	}, e;
}(), Nn = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Pn = function() {
	function e() {}
	return e.detectMultiple = function(t, n, r) {
		var i = t.getBlackMatrix(), a = e.detect(r, i);
		return a.length || (i = i.clone(), i.rotate180(), a = e.detect(r, i)), new Mn(i, a);
	}, e.detect = function(t, n) {
		for (var r, i, a = [], o = 0, s = 0, c = !1; o < n.getHeight();) {
			var l = e.findVertices(n, o, s);
			if (l[0] == null && l[3] == null) {
				if (!c) break;
				c = !1, s = 0;
				try {
					for (var u = (r = void 0, Nn(a)), d = u.next(); !d.done; d = u.next()) {
						var f = d.value;
						f[1] != null && (o = Math.trunc(Math.max(o, f[1].getY()))), f[3] != null && (o = Math.max(o, Math.trunc(f[3].getY())));
					}
				} catch (e) {
					r = { error: e };
				} finally {
					try {
						d && !d.done && (i = u.return) && i.call(u);
					} finally {
						if (r) throw r.error;
					}
				}
				o += e.ROW_STEP;
			} else {
				if (c = !0, a.push(l), !t) break;
				l[2] == null ? (s = Math.trunc(l[4].getX()), o = Math.trunc(l[4].getY())) : (s = Math.trunc(l[2].getX()), o = Math.trunc(l[2].getY()));
			}
		}
		return a;
	}, e.findVertices = function(t, n, r) {
		var i = t.getHeight(), a = t.getWidth(), o = Array(8);
		return e.copyToResult(o, e.findRowsWithPattern(t, i, a, n, r, e.START_PATTERN), e.INDEXES_START_PATTERN), o[4] != null && (r = Math.trunc(o[4].getX()), n = Math.trunc(o[4].getY())), e.copyToResult(o, e.findRowsWithPattern(t, i, a, n, r, e.STOP_PATTERN), e.INDEXES_STOP_PATTERN), o;
	}, e.copyToResult = function(e, t, n) {
		for (var r = 0; r < n.length; r++) e[n[r]] = t[r];
	}, e.findRowsWithPattern = function(t, n, r, i, a, o) {
		for (var s = [
			,
			,
			,
			,
		], c = !1, l = new Int32Array(o.length); i < n; i += e.ROW_STEP) {
			var u = e.findGuardPattern(t, a, i, r, !1, o, l);
			if (u != null) {
				for (; i > 0;) {
					var d = e.findGuardPattern(t, a, --i, r, !1, o, l);
					if (d != null) u = d;
					else {
						i++;
						break;
					}
				}
				s[0] = new jn(u[0], i), s[1] = new jn(u[1], i), c = !0;
				break;
			}
		}
		var f = i + 1;
		if (c) {
			for (var p = 0, d = Int32Array.from([Math.trunc(s[0].getX()), Math.trunc(s[1].getX())]); f < n; f++) {
				var u = e.findGuardPattern(t, d[0], f, r, !1, o, l);
				if (u != null && Math.abs(d[0] - u[0]) < e.MAX_PATTERN_DRIFT && Math.abs(d[1] - u[1]) < e.MAX_PATTERN_DRIFT) d = u, p = 0;
				else if (p > e.SKIPPED_ROW_COUNT_MAX) break;
				else p++;
			}
			f -= p + 1, s[2] = new jn(d[0], f), s[3] = new jn(d[1], f);
		}
		return f - i < e.BARCODE_MIN_HEIGHT && dn.fill(s, null), s;
	}, e.findGuardPattern = function(t, n, r, i, a, o, s) {
		dn.fillWithin(s, 0, s.length, 0);
		for (var c = n, l = 0; t.get(c, r) && c > 0 && l++ < e.MAX_PIXEL_DRIFT;) c--;
		for (var u = c, d = 0, f = o.length, p = a; u < i; u++) if (t.get(u, r) !== p) s[d]++;
		else {
			if (d === f - 1) {
				if (e.patternMatchVariance(s, o, e.MAX_INDIVIDUAL_VARIANCE) < e.MAX_AVG_VARIANCE) return new Int32Array([c, u]);
				c += s[0] + s[1], tn.arraycopy(s, 2, s, 0, d - 1), s[d - 1] = 0, s[d] = 0, d--;
			} else d++;
			s[d] = 1, p = !p;
		}
		return d === f - 1 && e.patternMatchVariance(s, o, e.MAX_INDIVIDUAL_VARIANCE) < e.MAX_AVG_VARIANCE ? new Int32Array([c, u - 1]) : null;
	}, e.patternMatchVariance = function(e, t, n) {
		for (var r = e.length, i = 0, a = 0, o = 0; o < r; o++) i += e[o], a += t[o];
		if (i < a) return Infinity;
		var s = i / a;
		n *= s;
		for (var c = 0, l = 0; l < r; l++) {
			var u = e[l], d = t[l] * s, f = u > d ? u - d : d - u;
			if (f > n) return Infinity;
			c += f;
		}
		return c / i;
	}, e.INDEXES_START_PATTERN = Int32Array.from([
		0,
		4,
		1,
		5
	]), e.INDEXES_STOP_PATTERN = Int32Array.from([
		6,
		2,
		7,
		3
	]), e.MAX_AVG_VARIANCE = .42, e.MAX_INDIVIDUAL_VARIANCE = .8, e.START_PATTERN = Int32Array.from([
		8,
		1,
		1,
		1,
		1,
		1,
		1,
		3
	]), e.STOP_PATTERN = Int32Array.from([
		7,
		1,
		1,
		3,
		1,
		1,
		1,
		2,
		1
	]), e.MAX_PIXEL_DRIFT = 3, e.MAX_PATTERN_DRIFT = 5, e.SKIPPED_ROW_COUNT_MAX = 25, e.ROW_STEP = 5, e.BARCODE_MIN_HEIGHT = 10, e;
}(), Fn = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, In = function() {
	function e(e, t) {
		if (t.length === 0) throw new q();
		this.field = e;
		var n = t.length;
		if (n > 1 && t[0] === 0) {
			for (var r = 1; r < n && t[r] === 0;) r++;
			r === n ? this.coefficients = new Int32Array([0]) : (this.coefficients = new Int32Array(n - r), tn.arraycopy(t, r, this.coefficients, 0, this.coefficients.length));
		} else this.coefficients = t;
	}
	return e.prototype.getCoefficients = function() {
		return this.coefficients;
	}, e.prototype.getDegree = function() {
		return this.coefficients.length - 1;
	}, e.prototype.isZero = function() {
		return this.coefficients[0] === 0;
	}, e.prototype.getCoefficient = function(e) {
		return this.coefficients[this.coefficients.length - 1 - e];
	}, e.prototype.evaluateAt = function(e) {
		var t, n;
		if (e === 0) return this.getCoefficient(0);
		if (e === 1) {
			var r = 0;
			try {
				for (var i = Fn(this.coefficients), a = i.next(); !a.done; a = i.next()) {
					var o = a.value;
					r = this.field.add(r, o);
				}
			} catch (e) {
				t = { error: e };
			} finally {
				try {
					a && !a.done && (n = i.return) && n.call(i);
				} finally {
					if (t) throw t.error;
				}
			}
			return r;
		}
		for (var s = this.coefficients[0], c = this.coefficients.length, l = 1; l < c; l++) s = this.field.add(this.field.multiply(e, s), this.coefficients[l]);
		return s;
	}, e.prototype.add = function(t) {
		if (!this.field.equals(t.field)) throw new q("ModulusPolys do not have same ModulusGF field");
		if (this.isZero()) return t;
		if (t.isZero()) return this;
		var n = this.coefficients, r = t.coefficients;
		if (n.length > r.length) {
			var i = n;
			n = r, r = i;
		}
		var a = new Int32Array(r.length), o = r.length - n.length;
		tn.arraycopy(r, 0, a, 0, o);
		for (var s = o; s < r.length; s++) a[s] = this.field.add(n[s - o], r[s]);
		return new e(this.field, a);
	}, e.prototype.subtract = function(e) {
		if (!this.field.equals(e.field)) throw new q("ModulusPolys do not have same ModulusGF field");
		return e.isZero() ? this : this.add(e.negative());
	}, e.prototype.multiply = function(t) {
		return t instanceof e ? this.multiplyOther(t) : this.multiplyScalar(t);
	}, e.prototype.multiplyOther = function(t) {
		if (!this.field.equals(t.field)) throw new q("ModulusPolys do not have same ModulusGF field");
		if (this.isZero() || t.isZero()) return new e(this.field, new Int32Array([0]));
		for (var n = this.coefficients, r = n.length, i = t.coefficients, a = i.length, o = new Int32Array(r + a - 1), s = 0; s < r; s++) for (var c = n[s], l = 0; l < a; l++) o[s + l] = this.field.add(o[s + l], this.field.multiply(c, i[l]));
		return new e(this.field, o);
	}, e.prototype.negative = function() {
		for (var t = this.coefficients.length, n = new Int32Array(t), r = 0; r < t; r++) n[r] = this.field.subtract(0, this.coefficients[r]);
		return new e(this.field, n);
	}, e.prototype.multiplyScalar = function(t) {
		if (t === 0) return new e(this.field, new Int32Array([0]));
		if (t === 1) return this;
		for (var n = this.coefficients.length, r = new Int32Array(n), i = 0; i < n; i++) r[i] = this.field.multiply(this.coefficients[i], t);
		return new e(this.field, r);
	}, e.prototype.multiplyByMonomial = function(t, n) {
		if (t < 0) throw new q();
		if (n === 0) return new e(this.field, new Int32Array([0]));
		for (var r = this.coefficients.length, i = new Int32Array(r + t), a = 0; a < r; a++) i[a] = this.field.multiply(this.coefficients[a], n);
		return new e(this.field, i);
	}, e.prototype.toString = function() {
		for (var e = new Zt(), t = this.getDegree(); t >= 0; t--) {
			var n = this.getCoefficient(t);
			n !== 0 && (n < 0 ? (e.append(" - "), n = -n) : e.length() > 0 && e.append(" + "), (t === 0 || n !== 1) && e.append(n), t !== 0 && (t === 1 ? e.append("x") : (e.append("x^"), e.append(t))));
		}
		return e.toString();
	}, e;
}(), Ln = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), Rn = function(e) {
	Ln(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.kind = "ArithmeticException", t;
}(Rt), zn = function() {
	function e() {}
	return e.prototype.add = function(e, t) {
		return (e + t) % this.modulus;
	}, e.prototype.subtract = function(e, t) {
		return (this.modulus + e - t) % this.modulus;
	}, e.prototype.exp = function(e) {
		return this.expTable[e];
	}, e.prototype.log = function(e) {
		if (e === 0) throw new q();
		return this.logTable[e];
	}, e.prototype.inverse = function(e) {
		if (e === 0) throw new Rn();
		return this.expTable[this.modulus - this.logTable[e] - 1];
	}, e.prototype.multiply = function(e, t) {
		return e === 0 || t === 0 ? 0 : this.expTable[(this.logTable[e] + this.logTable[t]) % (this.modulus - 1)];
	}, e.prototype.getSize = function() {
		return this.modulus;
	}, e.prototype.equals = function(e) {
		return e === this;
	}, e;
}(), Bn = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), Vn = function(e) {
	Bn(t, e);
	function t(t, n) {
		var r = e.call(this) || this;
		r.modulus = t, r.expTable = new Int32Array(t), r.logTable = new Int32Array(t);
		for (var i = 1, a = 0; a < t; a++) r.expTable[a] = i, i = i * n % t;
		for (var a = 0; a < t - 1; a++) r.logTable[r.expTable[a]] = a;
		return r.zero = new In(r, new Int32Array([0])), r.one = new In(r, new Int32Array([1])), r;
	}
	return t.prototype.getZero = function() {
		return this.zero;
	}, t.prototype.getOne = function() {
		return this.one;
	}, t.prototype.buildMonomial = function(e, t) {
		if (e < 0) throw new q();
		if (t === 0) return this.zero;
		var n = new Int32Array(e + 1);
		return n[0] = t, new In(this, n);
	}, t.PDF417_GF = new t(Y.NUMBER_OF_CODEWORDS, 3), t;
}(zn), Hn = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Un = function() {
	function e() {
		this.field = Vn.PDF417_GF;
	}
	return e.prototype.decode = function(e, t, n) {
		for (var r, i, a = new In(this.field, e), o = new Int32Array(t), s = !1, c = t; c > 0; c--) {
			var l = a.evaluateAt(this.field.exp(c));
			o[t - c] = l, l !== 0 && (s = !0);
		}
		if (!s) return 0;
		var u = this.field.getOne();
		if (n != null) try {
			for (var d = Hn(n), f = d.next(); !f.done; f = d.next()) {
				var p = f.value, m = this.field.exp(e.length - 1 - p), h = new In(this.field, new Int32Array([this.field.subtract(0, m), 1]));
				u = u.multiply(h);
			}
		} catch (e) {
			r = { error: e };
		} finally {
			try {
				f && !f.done && (i = d.return) && i.call(d);
			} finally {
				if (r) throw r.error;
			}
		}
		for (var g = new In(this.field, o), _ = this.runEuclideanAlgorithm(this.field.buildMonomial(t, 1), g, t), v = _[0], y = _[1], b = this.findErrorLocations(v), x = this.findErrorMagnitudes(y, v, b), c = 0; c < b.length; c++) {
			var S = e.length - 1 - this.field.log(b[c]);
			if (S < 0) throw wn.getChecksumInstance();
			e[S] = this.field.subtract(e[S], x[c]);
		}
		return b.length;
	}, e.prototype.runEuclideanAlgorithm = function(e, t, n) {
		if (e.getDegree() < t.getDegree()) {
			var r = e;
			e = t, t = r;
		}
		for (var i = e, a = t, o = this.field.getZero(), s = this.field.getOne(); a.getDegree() >= Math.round(n / 2);) {
			var c = i, l = o;
			if (i = a, o = s, i.isZero()) throw wn.getChecksumInstance();
			a = c;
			for (var u = this.field.getZero(), d = i.getCoefficient(i.getDegree()), f = this.field.inverse(d); a.getDegree() >= i.getDegree() && !a.isZero();) {
				var p = a.getDegree() - i.getDegree(), m = this.field.multiply(a.getCoefficient(a.getDegree()), f);
				u = u.add(this.field.buildMonomial(p, m)), a = a.subtract(i.multiplyByMonomial(p, m));
			}
			s = u.multiply(o).subtract(l).negative();
		}
		var h = s.getCoefficient(0);
		if (h === 0) throw wn.getChecksumInstance();
		var g = this.field.inverse(h);
		return [s.multiply(g), a.multiply(g)];
	}, e.prototype.findErrorLocations = function(e) {
		for (var t = e.getDegree(), n = new Int32Array(t), r = 0, i = 1; i < this.field.getSize() && r < t; i++) e.evaluateAt(i) === 0 && (n[r] = this.field.inverse(i), r++);
		if (r !== t) throw wn.getChecksumInstance();
		return n;
	}, e.prototype.findErrorMagnitudes = function(e, t, n) {
		for (var r = t.getDegree(), i = new Int32Array(r), a = 1; a <= r; a++) i[r - a] = this.field.multiply(a, t.getCoefficient(a));
		for (var o = new In(this.field, i), s = n.length, c = new Int32Array(s), a = 0; a < s; a++) {
			var l = this.field.inverse(n[a]), u = this.field.subtract(0, e.evaluateAt(l)), d = this.field.inverse(o.evaluateAt(l));
			c[a] = this.field.multiply(u, d);
		}
		return c;
	}, e;
}(), Wn = function() {
	function e(t, n, r, i, a) {
		t instanceof e ? this.constructor_2(t) : this.constructor_1(t, n, r, i, a);
	}
	return e.prototype.constructor_1 = function(e, t, n, r, i) {
		var a = t == null || n == null, o = r == null || i == null;
		if (a && o) throw new gn();
		a ? (t = new jn(0, r.getY()), n = new jn(0, i.getY())) : o && (r = new jn(e.getWidth() - 1, t.getY()), i = new jn(e.getWidth() - 1, n.getY())), this.image = e, this.topLeft = t, this.bottomLeft = n, this.topRight = r, this.bottomRight = i, this.minX = Math.trunc(Math.min(t.getX(), n.getX())), this.maxX = Math.trunc(Math.max(r.getX(), i.getX())), this.minY = Math.trunc(Math.min(t.getY(), r.getY())), this.maxY = Math.trunc(Math.max(n.getY(), i.getY()));
	}, e.prototype.constructor_2 = function(e) {
		this.image = e.image, this.topLeft = e.getTopLeft(), this.bottomLeft = e.getBottomLeft(), this.topRight = e.getTopRight(), this.bottomRight = e.getBottomRight(), this.minX = e.getMinX(), this.maxX = e.getMaxX(), this.minY = e.getMinY(), this.maxY = e.getMaxY();
	}, e.merge = function(t, n) {
		return t == null ? n : n == null ? t : new e(t.image, t.topLeft, t.bottomLeft, n.topRight, n.bottomRight);
	}, e.prototype.addMissingRows = function(t, n, r) {
		var i = this.topLeft, a = this.bottomLeft, o = this.topRight, s = this.bottomRight;
		if (t > 0) {
			var c = r ? this.topLeft : this.topRight, l = Math.trunc(c.getY() - t);
			l < 0 && (l = 0);
			var u = new jn(c.getX(), l);
			r ? i = u : o = u;
		}
		if (n > 0) {
			var d = r ? this.bottomLeft : this.bottomRight, f = Math.trunc(d.getY() + n);
			f >= this.image.getHeight() && (f = this.image.getHeight() - 1);
			var p = new jn(d.getX(), f);
			r ? a = p : s = p;
		}
		return new e(this.image, i, a, o, s);
	}, e.prototype.getMinX = function() {
		return this.minX;
	}, e.prototype.getMaxX = function() {
		return this.maxX;
	}, e.prototype.getMinY = function() {
		return this.minY;
	}, e.prototype.getMaxY = function() {
		return this.maxY;
	}, e.prototype.getTopLeft = function() {
		return this.topLeft;
	}, e.prototype.getTopRight = function() {
		return this.topRight;
	}, e.prototype.getBottomLeft = function() {
		return this.bottomLeft;
	}, e.prototype.getBottomRight = function() {
		return this.bottomRight;
	}, e;
}(), Gn = function() {
	function e(e, t, n, r) {
		this.columnCount = e, this.errorCorrectionLevel = r, this.rowCountUpperPart = t, this.rowCountLowerPart = n, this.rowCount = t + n;
	}
	return e.prototype.getColumnCount = function() {
		return this.columnCount;
	}, e.prototype.getErrorCorrectionLevel = function() {
		return this.errorCorrectionLevel;
	}, e.prototype.getRowCount = function() {
		return this.rowCount;
	}, e.prototype.getRowCountUpperPart = function() {
		return this.rowCountUpperPart;
	}, e.prototype.getRowCountLowerPart = function() {
		return this.rowCountLowerPart;
	}, e;
}(), Kn = function() {
	function e() {
		this.buffer = "";
	}
	return e.form = function(e, t) {
		var n = -1;
		function r(e, r, i, a, o, s) {
			if (e === "%%") return "%";
			if (t[++n] !== void 0) {
				e = a ? parseInt(a.substr(1)) : void 0;
				var c = o ? parseInt(o.substr(1)) : void 0, l;
				switch (s) {
					case "s":
						l = t[n];
						break;
					case "c":
						l = t[n][0];
						break;
					case "f":
						l = parseFloat(t[n]).toFixed(e);
						break;
					case "p":
						l = parseFloat(t[n]).toPrecision(e);
						break;
					case "e":
						l = parseFloat(t[n]).toExponential(e);
						break;
					case "x":
						l = parseInt(t[n]).toString(c || 16);
						break;
					case "d": l = parseFloat(parseInt(t[n], c || 10).toPrecision(e)).toFixed(0);
				}
				l = typeof l == "object" ? JSON.stringify(l) : (+l).toString(c);
				for (var u = parseInt(i), d = i && i[0] + "" == "0" ? "0" : " "; l.length < u;) l = r === void 0 ? d + l : l + d;
				return l;
			}
		}
		return e.replace(/%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g, r);
	}, e.prototype.format = function(t) {
		var n = [...arguments].slice(1);
		this.buffer += e.form(t, n);
	}, e.prototype.toString = function() {
		return this.buffer;
	}, e;
}(), qn = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Jn = function() {
	function e(e) {
		this.boundingBox = new Wn(e), this.codewords = Array(e.getMaxY() - e.getMinY() + 1);
	}
	return e.prototype.getCodewordNearby = function(t) {
		var n = this.getCodeword(t);
		if (n != null) return n;
		for (var r = 1; r < e.MAX_NEARBY_DISTANCE; r++) {
			var i = this.imageRowToCodewordIndex(t) - r;
			if (i >= 0 && (n = this.codewords[i], n != null) || (i = this.imageRowToCodewordIndex(t) + r, i < this.codewords.length && (n = this.codewords[i], n != null))) return n;
		}
		return null;
	}, e.prototype.imageRowToCodewordIndex = function(e) {
		return e - this.boundingBox.getMinY();
	}, e.prototype.setCodeword = function(e, t) {
		this.codewords[this.imageRowToCodewordIndex(e)] = t;
	}, e.prototype.getCodeword = function(e) {
		return this.codewords[this.imageRowToCodewordIndex(e)];
	}, e.prototype.getBoundingBox = function() {
		return this.boundingBox;
	}, e.prototype.getCodewords = function() {
		return this.codewords;
	}, e.prototype.toString = function() {
		var e, t, n = new Kn(), r = 0;
		try {
			for (var i = qn(this.codewords), a = i.next(); !a.done; a = i.next()) {
				var o = a.value;
				o == null ? n.format("%3d:    |   %n", r++) : n.format("%3d: %3d|%3d%n", r++, o.getRowNumber(), o.getValue());
			}
		} catch (t) {
			e = { error: t };
		} finally {
			try {
				a && !a.done && (t = i.return) && t.call(i);
			} finally {
				if (e) throw e.error;
			}
		}
		return n.toString();
	}, e.MAX_NEARBY_DISTANCE = 5, e;
}(), Yn = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Xn = function(e, t) {
	var n = typeof Symbol == "function" && e[Symbol.iterator];
	if (!n) return e;
	var r = n.call(e), i, a = [], o;
	try {
		for (; (t === void 0 || t-- > 0) && !(i = r.next()).done;) a.push(i.value);
	} catch (e) {
		o = { error: e };
	} finally {
		try {
			i && !i.done && (n = r.return) && n.call(r);
		} finally {
			if (o) throw o.error;
		}
	}
	return a;
}, Zn = function() {
	function e() {
		this.values = /* @__PURE__ */ new Map();
	}
	return e.prototype.setValue = function(e) {
		e = Math.trunc(e);
		var t = this.values.get(e);
		t ??= 0, t++, this.values.set(e, t);
	}, e.prototype.getValue = function() {
		var e, t, n = -1, r = [], i = function(e, t) {
			var i = {
				getKey: function() {
					return e;
				},
				getValue: function() {
					return t;
				}
			};
			i.getValue() > n ? (n = i.getValue(), r = [], r.push(i.getKey())) : i.getValue() === n && r.push(i.getKey());
		};
		try {
			for (var a = Yn(this.values.entries()), o = a.next(); !o.done; o = a.next()) {
				var s = Xn(o.value, 2), c = s[0], l = s[1];
				i(c, l);
			}
		} catch (t) {
			e = { error: t };
		} finally {
			try {
				o && !o.done && (t = a.return) && t.call(a);
			} finally {
				if (e) throw e.error;
			}
		}
		return Y.toIntArray(r);
	}, e.prototype.getConfidence = function(e) {
		return this.values.get(e);
	}, e;
}(), Qn = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), $n = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, er = function(e) {
	Qn(t, e);
	function t(t, n) {
		var r = e.call(this, t) || this;
		return r._isLeft = n, r;
	}
	return t.prototype.setRowNumbers = function() {
		var e, t;
		try {
			for (var n = $n(this.getCodewords()), r = n.next(); !r.done; r = n.next()) r.value?.setRowNumberAsRowIndicatorColumn();
		} catch (t) {
			e = { error: t };
		} finally {
			try {
				r && !r.done && (t = n.return) && t.call(n);
			} finally {
				if (e) throw e.error;
			}
		}
	}, t.prototype.adjustCompleteIndicatorColumnRowNumbers = function(e) {
		var t = this.getCodewords();
		this.setRowNumbers(), this.removeIncorrectCodewords(t, e);
		for (var n = this.getBoundingBox(), r = this._isLeft ? n.getTopLeft() : n.getTopRight(), i = this._isLeft ? n.getBottomLeft() : n.getBottomRight(), a = this.imageRowToCodewordIndex(Math.trunc(r.getY())), o = this.imageRowToCodewordIndex(Math.trunc(i.getY())), s = -1, c = 1, l = 0, u = a; u < o; u++) if (t[u] != null) {
			var d = t[u], f = d.getRowNumber() - s;
			if (f === 0) l++;
			else if (f === 1) c = Math.max(c, l), l = 1, s = d.getRowNumber();
			else if (f < 0 || d.getRowNumber() >= e.getRowCount() || f > u) t[u] = null;
			else {
				var p = void 0;
				p = c > 2 ? (c - 2) * f : f;
				for (var m = p >= u, h = 1; h <= p && !m; h++) m = t[u - h] != null;
				m ? t[u] = null : (s = d.getRowNumber(), l = 1);
			}
		}
	}, t.prototype.getRowHeights = function() {
		var e, t, n = this.getBarcodeMetadata();
		if (n == null) return null;
		this.adjustIncompleteIndicatorColumnRowNumbers(n);
		var r = new Int32Array(n.getRowCount());
		try {
			for (var i = $n(this.getCodewords()), a = i.next(); !a.done; a = i.next()) {
				var o = a.value;
				if (o != null) {
					var s = o.getRowNumber();
					if (s >= r.length) continue;
					r[s]++;
				}
			}
		} catch (t) {
			e = { error: t };
		} finally {
			try {
				a && !a.done && (t = i.return) && t.call(i);
			} finally {
				if (e) throw e.error;
			}
		}
		return r;
	}, t.prototype.adjustIncompleteIndicatorColumnRowNumbers = function(e) {
		for (var t = this.getBoundingBox(), n = this._isLeft ? t.getTopLeft() : t.getTopRight(), r = this._isLeft ? t.getBottomLeft() : t.getBottomRight(), i = this.imageRowToCodewordIndex(Math.trunc(n.getY())), a = this.imageRowToCodewordIndex(Math.trunc(r.getY())), o = this.getCodewords(), s = -1, c = 1, l = 0, u = i; u < a; u++) if (o[u] != null) {
			var d = o[u];
			d.setRowNumberAsRowIndicatorColumn();
			var f = d.getRowNumber() - s;
			f === 0 ? l++ : f === 1 ? (c = Math.max(c, l), l = 1, s = d.getRowNumber()) : d.getRowNumber() >= e.getRowCount() ? o[u] = null : (s = d.getRowNumber(), l = 1);
		}
	}, t.prototype.getBarcodeMetadata = function() {
		var e, t, n = this.getCodewords(), r = new Zn(), i = new Zn(), a = new Zn(), o = new Zn();
		try {
			for (var s = $n(n), c = s.next(); !c.done; c = s.next()) {
				var l = c.value;
				if (l != null) {
					l.setRowNumberAsRowIndicatorColumn();
					var u = l.getValue() % 30, d = l.getRowNumber();
					switch (this._isLeft || (d += 2), d % 3) {
						case 0:
							i.setValue(u * 3 + 1);
							break;
						case 1:
							o.setValue(u / 3), a.setValue(u % 3);
							break;
						case 2: r.setValue(u + 1);
					}
				}
			}
		} catch (t) {
			e = { error: t };
		} finally {
			try {
				c && !c.done && (t = s.return) && t.call(s);
			} finally {
				if (e) throw e.error;
			}
		}
		if (r.getValue().length === 0 || i.getValue().length === 0 || a.getValue().length === 0 || o.getValue().length === 0 || r.getValue()[0] < 1 || i.getValue()[0] + a.getValue()[0] < Y.MIN_ROWS_IN_BARCODE || i.getValue()[0] + a.getValue()[0] > Y.MAX_ROWS_IN_BARCODE) return null;
		var f = new Gn(r.getValue()[0], i.getValue()[0], a.getValue()[0], o.getValue()[0]);
		return this.removeIncorrectCodewords(n, f), f;
	}, t.prototype.removeIncorrectCodewords = function(e, t) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			if (e[n] != null) {
				var i = r.getValue() % 30, a = r.getRowNumber();
				if (a > t.getRowCount()) e[n] = null;
				else switch (this._isLeft || (a += 2), a % 3) {
					case 0:
						i * 3 + 1 !== t.getRowCountUpperPart() && (e[n] = null);
						break;
					case 1:
						(Math.trunc(i / 3) !== t.getErrorCorrectionLevel() || i % 3 !== t.getRowCountLowerPart()) && (e[n] = null);
						break;
					case 2: i + 1 !== t.getColumnCount() && (e[n] = null);
				}
			}
		}
	}, t.prototype.isLeft = function() {
		return this._isLeft;
	}, t.prototype.toString = function() {
		return "IsLeft: " + this._isLeft + "\n" + e.prototype.toString.call(this);
	}, t;
}(Jn), tr = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, nr = function() {
	function e(e, t) {
		this.ADJUST_ROW_NUMBER_SKIP = 2, this.barcodeMetadata = e, this.barcodeColumnCount = e.getColumnCount(), this.boundingBox = t, this.detectionResultColumns = Array(this.barcodeColumnCount + 2);
	}
	return e.prototype.getDetectionResultColumns = function() {
		this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[0]), this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[this.barcodeColumnCount + 1]);
		var e = Y.MAX_CODEWORDS_IN_BARCODE, t;
		do
			t = e, e = this.adjustRowNumbersAndGetCount();
		while (e > 0 && e < t);
		return this.detectionResultColumns;
	}, e.prototype.adjustIndicatorColumnRowNumbers = function(e) {
		e?.adjustCompleteIndicatorColumnRowNumbers(this.barcodeMetadata);
	}, e.prototype.adjustRowNumbersAndGetCount = function() {
		var e = this.adjustRowNumbersByRow();
		if (e === 0) return 0;
		for (var t = 1; t < this.barcodeColumnCount + 1; t++) for (var n = this.detectionResultColumns[t].getCodewords(), r = 0; r < n.length; r++) n[r] != null && (n[r].hasValidRowNumber() || this.adjustRowNumbers(t, r, n));
		return e;
	}, e.prototype.adjustRowNumbersByRow = function() {
		return this.adjustRowNumbersFromBothRI(), this.adjustRowNumbersFromLRI() + this.adjustRowNumbersFromRRI();
	}, e.prototype.adjustRowNumbersFromBothRI = function() {
		if (this.detectionResultColumns[0] != null && this.detectionResultColumns[this.barcodeColumnCount + 1] != null) {
			for (var e = this.detectionResultColumns[0].getCodewords(), t = this.detectionResultColumns[this.barcodeColumnCount + 1].getCodewords(), n = 0; n < e.length; n++) if (e[n] != null && t[n] != null && e[n].getRowNumber() === t[n].getRowNumber()) for (var r = 1; r <= this.barcodeColumnCount; r++) {
				var i = this.detectionResultColumns[r].getCodewords()[n];
				i != null && (i.setRowNumber(e[n].getRowNumber()), i.hasValidRowNumber() || (this.detectionResultColumns[r].getCodewords()[n] = null));
			}
		}
	}, e.prototype.adjustRowNumbersFromRRI = function() {
		if (this.detectionResultColumns[this.barcodeColumnCount + 1] == null) return 0;
		for (var t = 0, n = this.detectionResultColumns[this.barcodeColumnCount + 1].getCodewords(), r = 0; r < n.length; r++) if (n[r] != null) for (var i = n[r].getRowNumber(), a = 0, o = this.barcodeColumnCount + 1; o > 0 && a < this.ADJUST_ROW_NUMBER_SKIP; o--) {
			var s = this.detectionResultColumns[o].getCodewords()[r];
			s != null && (a = e.adjustRowNumberIfValid(i, a, s), s.hasValidRowNumber() || t++);
		}
		return t;
	}, e.prototype.adjustRowNumbersFromLRI = function() {
		if (this.detectionResultColumns[0] == null) return 0;
		for (var t = 0, n = this.detectionResultColumns[0].getCodewords(), r = 0; r < n.length; r++) if (n[r] != null) for (var i = n[r].getRowNumber(), a = 0, o = 1; o < this.barcodeColumnCount + 1 && a < this.ADJUST_ROW_NUMBER_SKIP; o++) {
			var s = this.detectionResultColumns[o].getCodewords()[r];
			s != null && (a = e.adjustRowNumberIfValid(i, a, s), s.hasValidRowNumber() || t++);
		}
		return t;
	}, e.adjustRowNumberIfValid = function(e, t, n) {
		return n == null || n.hasValidRowNumber() || (n.isValidRowNumber(e) ? (n.setRowNumber(e), t = 0) : ++t), t;
	}, e.prototype.adjustRowNumbers = function(t, n, r) {
		var i, a;
		if (this.detectionResultColumns[t - 1] != null) {
			var o = r[n], s = this.detectionResultColumns[t - 1].getCodewords(), c = s;
			this.detectionResultColumns[t + 1] != null && (c = this.detectionResultColumns[t + 1].getCodewords());
			var l = Array(14);
			l[2] = s[n], l[3] = c[n], n > 0 && (l[0] = r[n - 1], l[4] = s[n - 1], l[5] = c[n - 1]), n > 1 && (l[8] = r[n - 2], l[10] = s[n - 2], l[11] = c[n - 2]), n < r.length - 1 && (l[1] = r[n + 1], l[6] = s[n + 1], l[7] = c[n + 1]), n < r.length - 2 && (l[9] = r[n + 2], l[12] = s[n + 2], l[13] = c[n + 2]);
			try {
				for (var u = tr(l), d = u.next(); !d.done; d = u.next()) {
					var f = d.value;
					if (e.adjustRowNumber(o, f)) return;
				}
			} catch (e) {
				i = { error: e };
			} finally {
				try {
					d && !d.done && (a = u.return) && a.call(u);
				} finally {
					if (i) throw i.error;
				}
			}
		}
	}, e.adjustRowNumber = function(e, t) {
		return t == null ? !1 : t.hasValidRowNumber() && t.getBucket() === e.getBucket() ? (e.setRowNumber(t.getRowNumber()), !0) : !1;
	}, e.prototype.getBarcodeColumnCount = function() {
		return this.barcodeColumnCount;
	}, e.prototype.getBarcodeRowCount = function() {
		return this.barcodeMetadata.getRowCount();
	}, e.prototype.getBarcodeECLevel = function() {
		return this.barcodeMetadata.getErrorCorrectionLevel();
	}, e.prototype.setBoundingBox = function(e) {
		this.boundingBox = e;
	}, e.prototype.getBoundingBox = function() {
		return this.boundingBox;
	}, e.prototype.setDetectionResultColumn = function(e, t) {
		this.detectionResultColumns[e] = t;
	}, e.prototype.getDetectionResultColumn = function(e) {
		return this.detectionResultColumns[e];
	}, e.prototype.toString = function() {
		var e = this.detectionResultColumns[0];
		e ??= this.detectionResultColumns[this.barcodeColumnCount + 1];
		for (var t = new Kn(), n = 0; n < e.getCodewords().length; n++) {
			t.format("CW %3d:", n);
			for (var r = 0; r < this.barcodeColumnCount + 2; r++) if (this.detectionResultColumns[r] == null) t.format("    |   ");
			else {
				var i = this.detectionResultColumns[r].getCodewords()[n];
				i == null ? t.format("    |   ") : t.format(" %3d|%3d", i.getRowNumber(), i.getValue());
			}
			t.format("%n");
		}
		return t.toString();
	}, e;
}(), rr = function() {
	function e(t, n, r, i) {
		this.rowNumber = e.BARCODE_ROW_UNKNOWN, this.startX = Math.trunc(t), this.endX = Math.trunc(n), this.bucket = Math.trunc(r), this.value = Math.trunc(i);
	}
	return e.prototype.hasValidRowNumber = function() {
		return this.isValidRowNumber(this.rowNumber);
	}, e.prototype.isValidRowNumber = function(t) {
		return t !== e.BARCODE_ROW_UNKNOWN && this.bucket === t % 3 * 3;
	}, e.prototype.setRowNumberAsRowIndicatorColumn = function() {
		this.rowNumber = Math.trunc(Math.trunc(this.value / 30) * 3 + Math.trunc(this.bucket / 3));
	}, e.prototype.getWidth = function() {
		return this.endX - this.startX;
	}, e.prototype.getStartX = function() {
		return this.startX;
	}, e.prototype.getEndX = function() {
		return this.endX;
	}, e.prototype.getBucket = function() {
		return this.bucket;
	}, e.prototype.getValue = function() {
		return this.value;
	}, e.prototype.getRowNumber = function() {
		return this.rowNumber;
	}, e.prototype.setRowNumber = function(e) {
		this.rowNumber = e;
	}, e.prototype.toString = function() {
		return this.rowNumber + "|" + this.value;
	}, e.BARCODE_ROW_UNKNOWN = -1, e;
}(), ir = function() {
	function e() {}
	return e.initialize = function() {
		for (var t = 0; t < Y.SYMBOL_TABLE.length; t++) for (var n = Y.SYMBOL_TABLE[t], r = n & 1, i = 0; i < Y.BARS_IN_MODULE; i++) {
			for (var a = 0; (n & 1) === r;) a += 1, n >>= 1;
			r = n & 1, e.RATIOS_TABLE[t] || (e.RATIOS_TABLE[t] = Array(Y.BARS_IN_MODULE)), e.RATIOS_TABLE[t][Y.BARS_IN_MODULE - i - 1] = Math.fround(a / Y.MODULES_IN_CODEWORD);
		}
		this.bSymbolTableReady = !0;
	}, e.getDecodedValue = function(t) {
		var n = e.getDecodedCodewordValue(e.sampleBitCounts(t));
		return n === -1 ? e.getClosestDecodedValue(t) : n;
	}, e.sampleBitCounts = function(e) {
		for (var t = En.sum(e), n = new Int32Array(Y.BARS_IN_MODULE), r = 0, i = 0, a = 0; a < Y.MODULES_IN_CODEWORD; a++) {
			var o = t / (2 * Y.MODULES_IN_CODEWORD) + a * t / Y.MODULES_IN_CODEWORD;
			i + e[r] <= o && (i += e[r], r++), n[r]++;
		}
		return n;
	}, e.getDecodedCodewordValue = function(t) {
		var n = e.getBitValue(t);
		return Y.getCodeword(n) === -1 ? -1 : n;
	}, e.getBitValue = function(e) {
		for (var t = 0, n = 0; n < e.length; n++) for (var r = 0; r < e[n]; r++) t = t << 1 | n % 2 == 0;
		return Math.trunc(t);
	}, e.getClosestDecodedValue = function(t) {
		var n = En.sum(t), r = Array(Y.BARS_IN_MODULE);
		if (n > 1) for (var i = 0; i < r.length; i++) r[i] = Math.fround(t[i] / n);
		var a = An.MAX_VALUE, o = -1;
		this.bSymbolTableReady || e.initialize();
		for (var s = 0; s < e.RATIOS_TABLE.length; s++) {
			for (var c = 0, l = e.RATIOS_TABLE[s], u = 0; u < Y.BARS_IN_MODULE; u++) {
				var d = Math.fround(l[u] - r[u]);
				if (c += Math.fround(d * d), c >= a) break;
			}
			c < a && (a = c, o = Y.SYMBOL_TABLE[s]);
		}
		return o;
	}, e.bSymbolTableReady = !1, e.RATIOS_TABLE = Array(Y.SYMBOL_TABLE.length).map(function(e) {
		return e = Array(Y.BARS_IN_MODULE);
	}), e;
}(), ar = function() {
	function e(e, t, n, r, i, a) {
		i === void 0 && (i = -1), a === void 0 && (a = -1), this.rawBytes = e, this.text = t, this.byteSegments = n, this.ecLevel = r, this.structuredAppendSequenceNumber = i, this.structuredAppendParity = a, this.numBits = e == null ? 0 : 8 * e.length;
	}
	return e.prototype.getRawBytes = function() {
		return this.rawBytes;
	}, e.prototype.getNumBits = function() {
		return this.numBits;
	}, e.prototype.setNumBits = function(e) {
		this.numBits = e;
	}, e.prototype.getText = function() {
		return this.text;
	}, e.prototype.getByteSegments = function() {
		return this.byteSegments;
	}, e.prototype.getECLevel = function() {
		return this.ecLevel;
	}, e.prototype.getErrorsCorrected = function() {
		return this.errorsCorrected;
	}, e.prototype.setErrorsCorrected = function(e) {
		this.errorsCorrected = e;
	}, e.prototype.getErasures = function() {
		return this.erasures;
	}, e.prototype.setErasures = function(e) {
		this.erasures = e;
	}, e.prototype.getOther = function() {
		return this.other;
	}, e.prototype.setOther = function(e) {
		this.other = e;
	}, e.prototype.hasStructuredAppend = function() {
		return this.structuredAppendParity >= 0 && this.structuredAppendSequenceNumber >= 0;
	}, e.prototype.getStructuredAppendParity = function() {
		return this.structuredAppendParity;
	}, e.prototype.getStructuredAppendSequenceNumber = function() {
		return this.structuredAppendSequenceNumber;
	}, e;
}(), or = function() {
	function e() {
		this.segmentCount = -1, this.fileSize = -1, this.timestamp = -1, this.checksum = -1;
	}
	return e.prototype.getSegmentIndex = function() {
		return this.segmentIndex;
	}, e.prototype.setSegmentIndex = function(e) {
		this.segmentIndex = e;
	}, e.prototype.getFileId = function() {
		return this.fileId;
	}, e.prototype.setFileId = function(e) {
		this.fileId = e;
	}, e.prototype.getOptionalData = function() {
		return this.optionalData;
	}, e.prototype.setOptionalData = function(e) {
		this.optionalData = e;
	}, e.prototype.isLastSegment = function() {
		return this.lastSegment;
	}, e.prototype.setLastSegment = function(e) {
		this.lastSegment = e;
	}, e.prototype.getSegmentCount = function() {
		return this.segmentCount;
	}, e.prototype.setSegmentCount = function(e) {
		this.segmentCount = e;
	}, e.prototype.getSender = function() {
		return this.sender || null;
	}, e.prototype.setSender = function(e) {
		this.sender = e;
	}, e.prototype.getAddressee = function() {
		return this.addressee || null;
	}, e.prototype.setAddressee = function(e) {
		this.addressee = e;
	}, e.prototype.getFileName = function() {
		return this.fileName;
	}, e.prototype.setFileName = function(e) {
		this.fileName = e;
	}, e.prototype.getFileSize = function() {
		return this.fileSize;
	}, e.prototype.setFileSize = function(e) {
		this.fileSize = e;
	}, e.prototype.getChecksum = function() {
		return this.checksum;
	}, e.prototype.setChecksum = function(e) {
		this.checksum = e;
	}, e.prototype.getTimestamp = function() {
		return this.timestamp;
	}, e.prototype.setTimestamp = function(e) {
		this.timestamp = e;
	}, e;
}(), sr = function() {
	function e() {}
	return e.parseLong = function(e, t) {
		return t === void 0 && (t = void 0), parseInt(e, t);
	}, e;
}(), cr = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), lr = function(e) {
	cr(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.kind = "NullPointerException", t;
}(Rt), ur = function() {
	function e() {}
	return e.prototype.writeBytes = function(e) {
		this.writeBytesOffset(e, 0, e.length);
	}, e.prototype.writeBytesOffset = function(e, t, n) {
		if (e == null) throw new lr();
		if (t < 0 || t > e.length || n < 0 || t + n > e.length || t + n < 0) throw new sn();
		if (n !== 0) for (var r = 0; r < n; r++) this.write(e[t + r]);
	}, e.prototype.flush = function() {}, e.prototype.close = function() {}, e;
}(), dr = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), fr = function(e) {
	dr(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t;
}(Rt), pr = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		if (typeof n != "function" && n !== null) throw TypeError("Class extends value " + String(n) + " is not a constructor or null");
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), mr = function(e) {
	pr(t, e);
	function t(t) {
		t === void 0 && (t = 32);
		var n = e.call(this) || this;
		if (n.count = 0, t < 0) throw new q("Negative initial size: " + t);
		return n.buf = new Uint8Array(t), n;
	}
	return t.prototype.ensureCapacity = function(e) {
		e - this.buf.length > 0 && this.grow(e);
	}, t.prototype.grow = function(e) {
		var t = this.buf.length << 1;
		if (t - e < 0 && (t = e), t < 0) {
			if (e < 0) throw new fr();
			t = fn.MAX_VALUE;
		}
		this.buf = dn.copyOfUint8Array(this.buf, t);
	}, t.prototype.write = function(e) {
		this.ensureCapacity(this.count + 1), this.buf[this.count] = e, this.count += 1;
	}, t.prototype.writeBytesOffset = function(e, t, n) {
		if (t < 0 || t > e.length || n < 0 || t + n - e.length > 0) throw new sn();
		this.ensureCapacity(this.count + n), tn.arraycopy(e, t, this.buf, this.count, n), this.count += n;
	}, t.prototype.writeTo = function(e) {
		e.writeBytesOffset(this.buf, 0, this.count);
	}, t.prototype.reset = function() {
		this.count = 0;
	}, t.prototype.toByteArray = function() {
		return dn.copyOfUint8Array(this.buf, this.count);
	}, t.prototype.size = function() {
		return this.count;
	}, t.prototype.toString = function(e) {
		return e ? typeof e == "string" ? this.toString_string(e) : this.toString_number(e) : this.toString_void();
	}, t.prototype.toString_void = function() {
		return new String(this.buf).toString();
	}, t.prototype.toString_string = function(e) {
		return new String(this.buf).toString();
	}, t.prototype.toString_number = function(e) {
		return new String(this.buf).toString();
	}, t.prototype.close = function() {}, t;
}(ur), X;
(function(e) {
	e[e.ALPHA = 0] = "ALPHA", e[e.LOWER = 1] = "LOWER", e[e.MIXED = 2] = "MIXED", e[e.PUNCT = 3] = "PUNCT", e[e.ALPHA_SHIFT = 4] = "ALPHA_SHIFT", e[e.PUNCT_SHIFT = 5] = "PUNCT_SHIFT";
})(X ||= {});
function hr() {
	if (typeof window < "u") return window.BigInt || null;
	if (typeof globalThis < "u") return globalThis.BigInt || null;
	if (typeof self < "u") return self.BigInt || null;
	throw Error("Can't search globals for BigInt!");
}
var gr;
function _r(e) {
	if (gr === void 0 && (gr = hr()), gr === null) throw Error("BigInt is not supported!");
	return gr(e);
}
function vr() {
	var e = [];
	e[0] = _r(1);
	var t = _r(900);
	e[1] = t;
	for (var n = 2; n < 16; n++) e[n] = e[n - 1] * t;
	return e;
}
var yr = function() {
	function e() {}
	return e.decode = function(t, n) {
		var r = new Zt(""), i = Kt.ISO8859_1;
		r.enableDecoding(i);
		for (var a = 1, o = t[a++], s = new or(); a < t[0];) {
			switch (o) {
				case e.TEXT_COMPACTION_MODE_LATCH:
					a = e.textCompaction(t, a, r);
					break;
				case e.BYTE_COMPACTION_MODE_LATCH:
				case e.BYTE_COMPACTION_MODE_LATCH_6:
					a = e.byteCompaction(o, t, i, a, r);
					break;
				case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
					r.append(t[a++]);
					break;
				case e.NUMERIC_COMPACTION_MODE_LATCH:
					a = e.numericCompaction(t, a, r);
					break;
				case e.ECI_CHARSET:
					Kt.getCharacterSetECIByValue(t[a++]);
					break;
				case e.ECI_GENERAL_PURPOSE:
					a += 2;
					break;
				case e.ECI_USER_DEFINED:
					a++;
					break;
				case e.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
					a = e.decodeMacroBlock(t, a, s);
					break;
				case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
				case e.MACRO_PDF417_TERMINATOR: throw new Wt();
				default: a--, a = e.textCompaction(t, a, r);
			}
			if (a < t.length) o = t[a++];
			else throw Wt.getFormatInstance();
		}
		if (r.length() === 0) throw Wt.getFormatInstance();
		var c = new ar(null, r.toString(), null, n);
		return c.setOther(s), c;
	}, e.decodeMacroBlock = function(t, n, r) {
		if (n + e.NUMBER_OF_SEQUENCE_CODEWORDS > t[0]) throw Wt.getFormatInstance();
		for (var i = new Int32Array(e.NUMBER_OF_SEQUENCE_CODEWORDS), a = 0; a < e.NUMBER_OF_SEQUENCE_CODEWORDS; a++, n++) i[a] = t[n];
		r.setSegmentIndex(fn.parseInt(e.decodeBase900toBase10(i, e.NUMBER_OF_SEQUENCE_CODEWORDS)));
		var o = new Zt();
		n = e.textCompaction(t, n, o), r.setFileId(o.toString());
		var s = -1;
		for (t[n] === e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD && (s = n + 1); n < t[0];) switch (t[n]) {
			case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
				switch (n++, t[n]) {
					case e.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME:
						var c = new Zt();
						n = e.textCompaction(t, n + 1, c), r.setFileName(c.toString());
						break;
					case e.MACRO_PDF417_OPTIONAL_FIELD_SENDER:
						var l = new Zt();
						n = e.textCompaction(t, n + 1, l), r.setSender(l.toString());
						break;
					case e.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE:
						var u = new Zt();
						n = e.textCompaction(t, n + 1, u), r.setAddressee(u.toString());
						break;
					case e.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT:
						var d = new Zt();
						n = e.numericCompaction(t, n + 1, d), r.setSegmentCount(fn.parseInt(d.toString()));
						break;
					case e.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP:
						var f = new Zt();
						n = e.numericCompaction(t, n + 1, f), r.setTimestamp(sr.parseLong(f.toString()));
						break;
					case e.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM:
						var p = new Zt();
						n = e.numericCompaction(t, n + 1, p), r.setChecksum(fn.parseInt(p.toString()));
						break;
					case e.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE:
						var m = new Zt();
						n = e.numericCompaction(t, n + 1, m), r.setFileSize(sr.parseLong(m.toString()));
						break;
					default: throw Wt.getFormatInstance();
				}
				break;
			case e.MACRO_PDF417_TERMINATOR:
				n++, r.setLastSegment(!0);
				break;
			default: throw Wt.getFormatInstance();
		}
		if (s !== -1) {
			var h = n - s;
			r.isLastSegment() && h--, r.setOptionalData(dn.copyOfRange(t, s, s + h));
		}
		return n;
	}, e.textCompaction = function(t, n, r) {
		for (var i = new Int32Array((t[0] - n) * 2), a = new Int32Array((t[0] - n) * 2), o = 0, s = !1; n < t[0] && !s;) {
			var c = t[n++];
			if (c < e.TEXT_COMPACTION_MODE_LATCH) i[o] = c / 30, i[o + 1] = c % 30, o += 2;
			else switch (c) {
				case e.TEXT_COMPACTION_MODE_LATCH:
					i[o++] = e.TEXT_COMPACTION_MODE_LATCH;
					break;
				case e.BYTE_COMPACTION_MODE_LATCH:
				case e.BYTE_COMPACTION_MODE_LATCH_6:
				case e.NUMERIC_COMPACTION_MODE_LATCH:
				case e.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
				case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
				case e.MACRO_PDF417_TERMINATOR:
					n--, s = !0;
					break;
				case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE: i[o] = e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE, c = t[n++], a[o] = c, o++;
			}
		}
		return e.decodeTextCompaction(i, a, o, r), n;
	}, e.decodeTextCompaction = function(t, n, r, i) {
		for (var a = X.ALPHA, o = X.ALPHA, s = 0; s < r;) {
			var c = t[s], l = "";
			switch (a) {
				case X.ALPHA:
					if (c < 26) l = String.fromCharCode(65 + c);
					else switch (c) {
						case 26:
							l = " ";
							break;
						case e.LL:
							a = X.LOWER;
							break;
						case e.ML:
							a = X.MIXED;
							break;
						case e.PS:
							o = a, a = X.PUNCT_SHIFT;
							break;
						case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
							i.append(n[s]);
							break;
						case e.TEXT_COMPACTION_MODE_LATCH: a = X.ALPHA;
					}
					break;
				case X.LOWER:
					if (c < 26) l = String.fromCharCode(97 + c);
					else switch (c) {
						case 26:
							l = " ";
							break;
						case e.AS:
							o = a, a = X.ALPHA_SHIFT;
							break;
						case e.ML:
							a = X.MIXED;
							break;
						case e.PS:
							o = a, a = X.PUNCT_SHIFT;
							break;
						case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
							i.append(n[s]);
							break;
						case e.TEXT_COMPACTION_MODE_LATCH: a = X.ALPHA;
					}
					break;
				case X.MIXED:
					if (c < e.PL) l = e.MIXED_CHARS[c];
					else switch (c) {
						case e.PL:
							a = X.PUNCT;
							break;
						case 26:
							l = " ";
							break;
						case e.LL:
							a = X.LOWER;
							break;
						case e.AL:
							a = X.ALPHA;
							break;
						case e.PS:
							o = a, a = X.PUNCT_SHIFT;
							break;
						case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
							i.append(n[s]);
							break;
						case e.TEXT_COMPACTION_MODE_LATCH: a = X.ALPHA;
					}
					break;
				case X.PUNCT:
					if (c < e.PAL) l = e.PUNCT_CHARS[c];
					else switch (c) {
						case e.PAL:
							a = X.ALPHA;
							break;
						case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
							i.append(n[s]);
							break;
						case e.TEXT_COMPACTION_MODE_LATCH: a = X.ALPHA;
					}
					break;
				case X.ALPHA_SHIFT:
					if (a = o, c < 26) l = String.fromCharCode(65 + c);
					else switch (c) {
						case 26:
							l = " ";
							break;
						case e.TEXT_COMPACTION_MODE_LATCH: a = X.ALPHA;
					}
					break;
				case X.PUNCT_SHIFT: if (a = o, c < e.PAL) l = e.PUNCT_CHARS[c];
				else switch (c) {
					case e.PAL:
						a = X.ALPHA;
						break;
					case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
						i.append(n[s]);
						break;
					case e.TEXT_COMPACTION_MODE_LATCH: a = X.ALPHA;
				}
			}
			l !== "" && i.append(l), s++;
		}
	}, e.byteCompaction = function(t, n, r, i, a) {
		var o = new mr(), s = 0, c = 0, l = !1;
		switch (t) {
			case e.BYTE_COMPACTION_MODE_LATCH:
				for (var u = /* @__PURE__ */ new Int32Array(6), d = n[i++]; i < n[0] && !l;) switch (u[s++] = d, c = 900 * c + d, d = n[i++], d) {
					case e.TEXT_COMPACTION_MODE_LATCH:
					case e.BYTE_COMPACTION_MODE_LATCH:
					case e.NUMERIC_COMPACTION_MODE_LATCH:
					case e.BYTE_COMPACTION_MODE_LATCH_6:
					case e.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
					case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
					case e.MACRO_PDF417_TERMINATOR:
						i--, l = !0;
						break;
					default: if (s % 5 == 0 && s > 0) {
						for (var f = 0; f < 6; ++f) o.write(Number(_r(c) >> _r(8 * (5 - f))));
						c = 0, s = 0;
					}
				}
				i === n[0] && d < e.TEXT_COMPACTION_MODE_LATCH && (u[s++] = d);
				for (var p = 0; p < s; p++) o.write(u[p]);
				break;
			case e.BYTE_COMPACTION_MODE_LATCH_6: for (; i < n[0] && !l;) {
				var m = n[i++];
				if (m < e.TEXT_COMPACTION_MODE_LATCH) s++, c = 900 * c + m;
				else switch (m) {
					case e.TEXT_COMPACTION_MODE_LATCH:
					case e.BYTE_COMPACTION_MODE_LATCH:
					case e.NUMERIC_COMPACTION_MODE_LATCH:
					case e.BYTE_COMPACTION_MODE_LATCH_6:
					case e.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
					case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
					case e.MACRO_PDF417_TERMINATOR: i--, l = !0;
				}
				if (s % 5 == 0 && s > 0) {
					for (var f = 0; f < 6; ++f) o.write(Number(_r(c) >> _r(8 * (5 - f))));
					c = 0, s = 0;
				}
			}
		}
		return a.append(Yt.decode(o.toByteArray(), r)), i;
	}, e.numericCompaction = function(t, n, r) {
		for (var i = 0, a = !1, o = new Int32Array(e.MAX_NUMERIC_CODEWORDS); n < t[0] && !a;) {
			var s = t[n++];
			if (n === t[0] && (a = !0), s < e.TEXT_COMPACTION_MODE_LATCH) o[i] = s, i++;
			else switch (s) {
				case e.TEXT_COMPACTION_MODE_LATCH:
				case e.BYTE_COMPACTION_MODE_LATCH:
				case e.BYTE_COMPACTION_MODE_LATCH_6:
				case e.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
				case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
				case e.MACRO_PDF417_TERMINATOR: n--, a = !0;
			}
			(i % e.MAX_NUMERIC_CODEWORDS === 0 || s === e.NUMERIC_COMPACTION_MODE_LATCH || a) && i > 0 && (r.append(e.decodeBase900toBase10(o, i)), i = 0);
		}
		return n;
	}, e.decodeBase900toBase10 = function(t, n) {
		for (var r = _r(0), i = 0; i < n; i++) r += e.EXP900[n - i - 1] * _r(t[i]);
		var a = r.toString();
		if (a.charAt(0) !== "1") throw new Wt();
		return a.substring(1);
	}, e.TEXT_COMPACTION_MODE_LATCH = 900, e.BYTE_COMPACTION_MODE_LATCH = 901, e.NUMERIC_COMPACTION_MODE_LATCH = 902, e.BYTE_COMPACTION_MODE_LATCH_6 = 924, e.ECI_USER_DEFINED = 925, e.ECI_GENERAL_PURPOSE = 926, e.ECI_CHARSET = 927, e.BEGIN_MACRO_PDF417_CONTROL_BLOCK = 928, e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD = 923, e.MACRO_PDF417_TERMINATOR = 922, e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE = 913, e.MAX_NUMERIC_CODEWORDS = 15, e.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME = 0, e.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT = 1, e.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP = 2, e.MACRO_PDF417_OPTIONAL_FIELD_SENDER = 3, e.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE = 4, e.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE = 5, e.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM = 6, e.PL = 25, e.LL = 27, e.AS = 27, e.ML = 28, e.AL = 28, e.PS = 29, e.PAL = 29, e.PUNCT_CHARS = ";<>@[\\]_`~!\r	,:\n-.$/\"|*()?{}'", e.MIXED_CHARS = "0123456789&\r	,:#-.$/+%*=^", e.EXP900 = hr() ? vr() : [], e.NUMBER_OF_SEQUENCE_CODEWORDS = 2, e;
}(), br = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, xr = function() {
	function e() {}
	return e.decode = function(t, n, r, i, a, o, s) {
		for (var c = new Wn(t, n, r, i, a), l = null, u = null, d, f = !0;; f = !1) {
			if (n != null && (l = e.getRowIndicatorColumn(t, c, n, !0, o, s)), i != null && (u = e.getRowIndicatorColumn(t, c, i, !1, o, s)), d = e.merge(l, u), d == null) throw gn.getNotFoundInstance();
			var p = d.getBoundingBox();
			if (f && p != null && (p.getMinY() < c.getMinY() || p.getMaxY() > c.getMaxY())) c = p;
			else break;
		}
		d.setBoundingBox(c);
		var m = d.getBarcodeColumnCount() + 1;
		d.setDetectionResultColumn(0, l), d.setDetectionResultColumn(m, u);
		for (var h = l != null, g = 1; g <= m; g++) {
			var _ = h ? g : m - g;
			if (d.getDetectionResultColumn(_) === void 0) {
				var v = void 0;
				v = _ === 0 || _ === m ? new er(c, _ === 0) : new Jn(c), d.setDetectionResultColumn(_, v);
				for (var y = -1, b = y, x = c.getMinY(); x <= c.getMaxY(); x++) {
					if (y = e.getStartColumn(d, _, x, h), y < 0 || y > c.getMaxX()) {
						if (b === -1) continue;
						y = b;
					}
					var S = e.detectCodeword(t, c.getMinX(), c.getMaxX(), h, y, x, o, s);
					S != null && (v.setCodeword(x, S), b = y, o = Math.min(o, S.getWidth()), s = Math.max(s, S.getWidth()));
				}
			}
		}
		return e.createDecoderResult(d);
	}, e.merge = function(t, n) {
		if (t == null && n == null) return null;
		var r = e.getBarcodeMetadata(t, n);
		return r == null ? null : new nr(r, Wn.merge(e.adjustBoundingBox(t), e.adjustBoundingBox(n)));
	}, e.adjustBoundingBox = function(t) {
		var n, r;
		if (t == null) return null;
		var i = t.getRowHeights();
		if (i == null) return null;
		var a = e.getMax(i), o = 0;
		try {
			for (var s = br(i), c = s.next(); !c.done; c = s.next()) {
				var l = c.value;
				if (o += a - l, l > 0) break;
			}
		} catch (e) {
			n = { error: e };
		} finally {
			try {
				c && !c.done && (r = s.return) && r.call(s);
			} finally {
				if (n) throw n.error;
			}
		}
		for (var u = t.getCodewords(), d = 0; o > 0 && u[d] == null; d++) o--;
		for (var f = 0, d = i.length - 1; d >= 0 && (f += a - i[d], !(i[d] > 0)); d--);
		for (var d = u.length - 1; f > 0 && u[d] == null; d--) f--;
		return t.getBoundingBox().addMissingRows(o, f, t.isLeft());
	}, e.getMax = function(e) {
		var t, n, r = -1;
		try {
			for (var i = br(e), a = i.next(); !a.done; a = i.next()) {
				var o = a.value;
				r = Math.max(r, o);
			}
		} catch (e) {
			t = { error: e };
		} finally {
			try {
				a && !a.done && (n = i.return) && n.call(i);
			} finally {
				if (t) throw t.error;
			}
		}
		return r;
	}, e.getBarcodeMetadata = function(e, t) {
		var n;
		if (e == null || (n = e.getBarcodeMetadata()) == null) return t == null ? null : t.getBarcodeMetadata();
		var r;
		return t == null || (r = t.getBarcodeMetadata()) == null ? n : n.getColumnCount() !== r.getColumnCount() && n.getErrorCorrectionLevel() !== r.getErrorCorrectionLevel() && n.getRowCount() !== r.getRowCount() ? null : n;
	}, e.getRowIndicatorColumn = function(t, n, r, i, a, o) {
		for (var s = new er(n, i), c = 0; c < 2; c++) for (var l = c === 0 ? 1 : -1, u = Math.trunc(Math.trunc(r.getX())), d = Math.trunc(Math.trunc(r.getY())); d <= n.getMaxY() && d >= n.getMinY(); d += l) {
			var f = e.detectCodeword(t, 0, t.getWidth(), i, u, d, a, o);
			f != null && (s.setCodeword(d, f), u = i ? f.getStartX() : f.getEndX());
		}
		return s;
	}, e.adjustCodewordCount = function(t, n) {
		var r = n[0][1], i = r.getValue(), a = t.getBarcodeColumnCount() * t.getBarcodeRowCount() - e.getNumberOfECCodeWords(t.getBarcodeECLevel());
		if (i.length === 0) {
			if (a < 1 || a > Y.MAX_CODEWORDS_IN_BARCODE) throw gn.getNotFoundInstance();
			r.setValue(a);
		} else i[0] !== a && r.setValue(a);
	}, e.createDecoderResult = function(t) {
		var n = e.createBarcodeMatrix(t);
		e.adjustCodewordCount(t, n);
		for (var r = [], i = new Int32Array(t.getBarcodeRowCount() * t.getBarcodeColumnCount()), a = [], o = [], s = 0; s < t.getBarcodeRowCount(); s++) for (var c = 0; c < t.getBarcodeColumnCount(); c++) {
			var l = n[s][c + 1].getValue(), u = s * t.getBarcodeColumnCount() + c;
			l.length === 0 ? r.push(u) : l.length === 1 ? i[u] = l[0] : (o.push(u), a.push(l));
		}
		for (var d = Array(a.length), f = 0; f < d.length; f++) d[f] = a[f];
		return e.createDecoderResultFromAmbiguousValues(t.getBarcodeECLevel(), i, Y.toIntArray(r), Y.toIntArray(o), d);
	}, e.createDecoderResultFromAmbiguousValues = function(t, n, r, i, a) {
		for (var o = new Int32Array(i.length), s = 100; s-- > 0;) {
			for (var c = 0; c < o.length; c++) n[i[c]] = a[c][o[c]];
			try {
				return e.decodeCodewords(n, t, r);
			} catch (e) {
				if (!(e instanceof wn)) throw e;
			}
			if (o.length === 0) throw wn.getChecksumInstance();
			for (var c = 0; c < o.length; c++) if (o[c] < a[c].length - 1) {
				o[c]++;
				break;
			} else if (o[c] = 0, c === o.length - 1) throw wn.getChecksumInstance();
		}
		throw wn.getChecksumInstance();
	}, e.createBarcodeMatrix = function(e) {
		for (var t, n, r, i, a = Array.from({ length: e.getBarcodeRowCount() }, function() {
			return Array(e.getBarcodeColumnCount() + 2);
		}), o = 0; o < a.length; o++) for (var s = 0; s < a[o].length; s++) a[o][s] = new Zn();
		var c = 0;
		try {
			for (var l = br(e.getDetectionResultColumns()), u = l.next(); !u.done; u = l.next()) {
				var d = u.value;
				if (d != null) try {
					for (var f = (r = void 0, br(d.getCodewords())), p = f.next(); !p.done; p = f.next()) {
						var m = p.value;
						if (m != null) {
							var h = m.getRowNumber();
							if (h >= 0) {
								if (h >= a.length) continue;
								a[h][c].setValue(m.getValue());
							}
						}
					}
				} catch (e) {
					r = { error: e };
				} finally {
					try {
						p && !p.done && (i = f.return) && i.call(f);
					} finally {
						if (r) throw r.error;
					}
				}
				c++;
			}
		} catch (e) {
			t = { error: e };
		} finally {
			try {
				u && !u.done && (n = l.return) && n.call(l);
			} finally {
				if (t) throw t.error;
			}
		}
		return a;
	}, e.isValidBarcodeColumn = function(e, t) {
		return t >= 0 && t <= e.getBarcodeColumnCount() + 1;
	}, e.getStartColumn = function(t, n, r, i) {
		var a, o, s = i ? 1 : -1, c = null;
		if (e.isValidBarcodeColumn(t, n - s) && (c = t.getDetectionResultColumn(n - s).getCodeword(r)), c != null) return i ? c.getEndX() : c.getStartX();
		if (c = t.getDetectionResultColumn(n).getCodewordNearby(r), c != null) return i ? c.getStartX() : c.getEndX();
		if (e.isValidBarcodeColumn(t, n - s) && (c = t.getDetectionResultColumn(n - s).getCodewordNearby(r)), c != null) return i ? c.getEndX() : c.getStartX();
		for (var l = 0; e.isValidBarcodeColumn(t, n - s);) {
			n -= s;
			try {
				for (var u = (a = void 0, br(t.getDetectionResultColumn(n).getCodewords())), d = u.next(); !d.done; d = u.next()) {
					var f = d.value;
					if (f != null) return (i ? f.getEndX() : f.getStartX()) + s * l * (f.getEndX() - f.getStartX());
				}
			} catch (e) {
				a = { error: e };
			} finally {
				try {
					d && !d.done && (o = u.return) && o.call(u);
				} finally {
					if (a) throw a.error;
				}
			}
			l++;
		}
		return i ? t.getBoundingBox().getMinX() : t.getBoundingBox().getMaxX();
	}, e.detectCodeword = function(t, n, r, i, a, o, s, c) {
		a = e.adjustCodewordStartColumn(t, n, r, i, a, o);
		var l = e.getModuleBitCount(t, n, r, i, a, o);
		if (l == null) return null;
		var u, d = En.sum(l);
		if (i) u = a + d;
		else {
			for (var f = 0; f < l.length / 2; f++) {
				var p = l[f];
				l[f] = l[l.length - 1 - f], l[l.length - 1 - f] = p;
			}
			u = a, a = u - d;
		}
		if (!e.checkCodewordSkew(d, s, c)) return null;
		var m = ir.getDecodedValue(l), h = Y.getCodeword(m);
		return h === -1 ? null : new rr(a, u, e.getCodewordBucketNumber(m), h);
	}, e.getModuleBitCount = function(e, t, n, r, i, a) {
		for (var o = i, s = /* @__PURE__ */ new Int32Array(8), c = 0, l = r ? 1 : -1, u = r; (r ? o < n : o >= t) && c < s.length;) e.get(o, a) === u ? (s[c]++, o += l) : (c++, u = !u);
		return c === s.length || o === (r ? n : t) && c === s.length - 1 ? s : null;
	}, e.getNumberOfECCodeWords = function(e) {
		return 2 << e;
	}, e.adjustCodewordStartColumn = function(t, n, r, i, a, o) {
		for (var s = a, c = i ? -1 : 1, l = 0; l < 2; l++) {
			for (; (i ? s >= n : s < r) && i === t.get(s, o);) {
				if (Math.abs(a - s) > e.CODEWORD_SKEW_SIZE) return a;
				s += c;
			}
			c = -c, i = !i;
		}
		return s;
	}, e.checkCodewordSkew = function(t, n, r) {
		return n - e.CODEWORD_SKEW_SIZE <= t && t <= r + e.CODEWORD_SKEW_SIZE;
	}, e.decodeCodewords = function(t, n, r) {
		if (t.length === 0) throw Wt.getFormatInstance();
		var i = 1 << n + 1, a = e.correctErrors(t, r, i);
		e.verifyCodewordCount(t, i);
		var o = yr.decode(t, "" + n);
		return o.setErrorsCorrected(a), o.setErasures(r.length), o;
	}, e.correctErrors = function(t, n, r) {
		if (n != null && n.length > r / 2 + e.MAX_ERRORS || r < 0 || r > e.MAX_EC_CODEWORDS) throw wn.getChecksumInstance();
		return e.errorCorrection.decode(t, r, n);
	}, e.verifyCodewordCount = function(e, t) {
		if (e.length < 4) throw Wt.getFormatInstance();
		var n = e[0];
		if (n > e.length) throw Wt.getFormatInstance();
		if (n === 0) {
			if (t < e.length) e[0] = e.length - t;
			else throw Wt.getFormatInstance();
		}
	}, e.getBitCountForCodeword = function(e) {
		for (var t = /* @__PURE__ */ new Int32Array(8), n = 0, r = t.length - 1; !((e & 1) !== n && (n = e & 1, r--, r < 0));) t[r]++, e >>= 1;
		return t;
	}, e.getCodewordBucketNumber = function(e) {
		return e instanceof Int32Array ? this.getCodewordBucketNumber_Int32Array(e) : this.getCodewordBucketNumber_number(e);
	}, e.getCodewordBucketNumber_number = function(t) {
		return e.getCodewordBucketNumber(e.getBitCountForCodeword(t));
	}, e.getCodewordBucketNumber_Int32Array = function(e) {
		return (e[0] - e[2] + e[4] - e[6] + 9) % 9;
	}, e.toString = function(e) {
		for (var t = new Kn(), n = 0; n < e.length; n++) {
			t.format("Row %2d: ", n);
			for (var r = 0; r < e[n].length; r++) {
				var i = e[n][r];
				i.getValue().length === 0 ? t.format("        ", null) : t.format("%4d(%2d)", i.getValue()[0], i.getConfidence(i.getValue()[0]));
			}
			t.format("%n");
		}
		return t.toString();
	}, e.CODEWORD_SKEW_SIZE = 2, e.MAX_ERRORS = 3, e.MAX_EC_CODEWORDS = 512, e.errorCorrection = new Un(), e;
}(), Sr = function(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Cr = function() {
	function e() {}
	return e.prototype.decode = function(t, n) {
		n === void 0 && (n = null);
		var r = e.decode(t, n, !1);
		if (r == null || r.length === 0 || r[0] == null) throw gn.getNotFoundInstance();
		return r[0];
	}, e.prototype.decodeMultiple = function(t, n) {
		n === void 0 && (n = null);
		try {
			return e.decode(t, n, !0);
		} catch (e) {
			throw e instanceof Wt || e instanceof wn ? gn.getNotFoundInstance() : e;
		}
	}, e.decode = function(t, n, r) {
		var i, a, o = [], s = Pn.detectMultiple(t, n, r);
		try {
			for (var c = Sr(s.getPoints()), l = c.next(); !l.done; l = c.next()) {
				var u = l.value, d = xr.decode(s.getBits(), u[4], u[5], u[6], u[7], e.getMinCodewordWidth(u), e.getMaxCodewordWidth(u)), f = new Tn(d.getText(), d.getRawBytes(), void 0, u, Sn.PDF_417);
				f.putMetadata(kn.ERROR_CORRECTION_LEVEL, d.getECLevel());
				var p = d.getOther();
				p != null && f.putMetadata(kn.PDF417_EXTRA_METADATA, p), o.push(f);
			}
		} catch (e) {
			i = { error: e };
		} finally {
			try {
				l && !l.done && (a = c.return) && a.call(c);
			} finally {
				if (i) throw i.error;
			}
		}
		return o.map(function(e) {
			return e;
		});
	}, e.getMaxWidth = function(e, t) {
		return e == null || t == null ? 0 : Math.trunc(Math.abs(e.getX() - t.getX()));
	}, e.getMinWidth = function(e, t) {
		return e == null || t == null ? fn.MAX_VALUE : Math.trunc(Math.abs(e.getX() - t.getX()));
	}, e.getMaxCodewordWidth = function(t) {
		return Math.floor(Math.max(Math.max(e.getMaxWidth(t[0], t[4]), e.getMaxWidth(t[6], t[2]) * Y.MODULES_IN_CODEWORD / Y.MODULES_IN_STOP_PATTERN), Math.max(e.getMaxWidth(t[1], t[5]), e.getMaxWidth(t[7], t[3]) * Y.MODULES_IN_CODEWORD / Y.MODULES_IN_STOP_PATTERN)));
	}, e.getMinCodewordWidth = function(t) {
		return Math.floor(Math.min(Math.min(e.getMinWidth(t[0], t[4]), e.getMinWidth(t[6], t[2]) * Y.MODULES_IN_CODEWORD / Y.MODULES_IN_STOP_PATTERN), Math.min(e.getMinWidth(t[1], t[5]), e.getMinWidth(t[7], t[3]) * Y.MODULES_IN_CODEWORD / Y.MODULES_IN_STOP_PATTERN)));
	}, e.prototype.reset = function() {}, e;
}(), wr = {
	636033: {
		country: "USA",
		code: "AL",
		name: "Alabama"
	},
	636059: {
		country: "USA",
		code: "AK",
		name: "Alaska"
	},
	636026: {
		country: "USA",
		code: "AZ",
		name: "Arizona"
	},
	636021: {
		country: "USA",
		code: "AR",
		name: "Arkansas"
	},
	636014: {
		country: "USA",
		code: "CA",
		name: "California"
	},
	636020: {
		country: "USA",
		code: "CO",
		name: "Colorado"
	},
	636006: {
		country: "USA",
		code: "CT",
		name: "Connecticut"
	},
	636011: {
		country: "USA",
		code: "DE",
		name: "Delaware"
	},
	636043: {
		country: "USA",
		code: "DC",
		name: "District of Columbia"
	},
	636010: {
		country: "USA",
		code: "FL",
		name: "Florida"
	},
	636055: {
		country: "USA",
		code: "GA",
		name: "Georgia"
	},
	636047: {
		country: "USA",
		code: "HI",
		name: "Hawaii"
	},
	636050: {
		country: "USA",
		code: "ID",
		name: "Idaho"
	},
	636035: {
		country: "USA",
		code: "IL",
		name: "Illinois"
	},
	636037: {
		country: "USA",
		code: "IN",
		name: "Indiana"
	},
	636018: {
		country: "USA",
		code: "IA",
		name: "Iowa"
	},
	636022: {
		country: "USA",
		code: "KS",
		name: "Kansas"
	},
	636046: {
		country: "USA",
		code: "KY",
		name: "Kentucky"
	},
	636007: {
		country: "USA",
		code: "LA",
		name: "Louisiana"
	},
	636041: {
		country: "USA",
		code: "ME",
		name: "Maine"
	},
	636003: {
		country: "USA",
		code: "MD",
		name: "Maryland"
	},
	636002: {
		country: "USA",
		code: "MA",
		name: "Massachusetts"
	},
	636032: {
		country: "USA",
		code: "MI",
		name: "Michigan"
	},
	636038: {
		country: "USA",
		code: "MN",
		name: "Minnesota"
	},
	636051: {
		country: "USA",
		code: "MS",
		name: "Mississippi"
	},
	636030: {
		country: "USA",
		code: "MO",
		name: "Missouri"
	},
	636008: {
		country: "USA",
		code: "MT",
		name: "Montana"
	},
	636054: {
		country: "USA",
		code: "NE",
		name: "Nebraska"
	},
	636049: {
		country: "USA",
		code: "NV",
		name: "Nevada"
	},
	636039: {
		country: "USA",
		code: "NH",
		name: "New Hampshire"
	},
	636036: {
		country: "USA",
		code: "NJ",
		name: "New Jersey"
	},
	636009: {
		country: "USA",
		code: "NM",
		name: "New Mexico"
	},
	636001: {
		country: "USA",
		code: "NY",
		name: "New York"
	},
	636004: {
		country: "USA",
		code: "NC",
		name: "North Carolina"
	},
	636034: {
		country: "USA",
		code: "ND",
		name: "North Dakota"
	},
	636023: {
		country: "USA",
		code: "OH",
		name: "Ohio"
	},
	636058: {
		country: "USA",
		code: "OK",
		name: "Oklahoma"
	},
	636029: {
		country: "USA",
		code: "OR",
		name: "Oregon"
	},
	636025: {
		country: "USA",
		code: "PA",
		name: "Pennsylvania"
	},
	636052: {
		country: "USA",
		code: "RI",
		name: "Rhode Island"
	},
	636005: {
		country: "USA",
		code: "SC",
		name: "South Carolina"
	},
	636042: {
		country: "USA",
		code: "SD",
		name: "South Dakota"
	},
	636053: {
		country: "USA",
		code: "TN",
		name: "Tennessee"
	},
	636015: {
		country: "USA",
		code: "TX",
		name: "Texas"
	},
	636040: {
		country: "USA",
		code: "UT",
		name: "Utah"
	},
	636024: {
		country: "USA",
		code: "VT",
		name: "Vermont"
	},
	636e3: {
		country: "USA",
		code: "VA",
		name: "Virginia"
	},
	636045: {
		country: "USA",
		code: "WA",
		name: "Washington"
	},
	636061: {
		country: "USA",
		code: "WV",
		name: "West Virginia"
	},
	636031: {
		country: "USA",
		code: "WI",
		name: "Wisconsin"
	},
	636060: {
		country: "USA",
		code: "WY",
		name: "Wyoming"
	},
	604426: {
		country: "USA",
		code: "PR",
		name: "Puerto Rico"
	},
	604429: {
		country: "USA",
		code: "VI",
		name: "U.S. Virgin Islands"
	},
	636019: {
		country: "USA",
		code: "GU",
		name: "Guam"
	},
	636012: {
		country: "CAN",
		code: "ON",
		name: "Ontario"
	},
	636028: {
		country: "CAN",
		code: "BC",
		name: "British Columbia"
	},
	604432: {
		country: "CAN",
		code: "AB",
		name: "Alberta"
	},
	636044: {
		country: "CAN",
		code: "SK",
		name: "Saskatchewan"
	},
	636048: {
		country: "CAN",
		code: "MB",
		name: "Manitoba"
	},
	636016: {
		country: "CAN",
		code: "QC",
		name: "Quebec"
	},
	636017: {
		country: "CAN",
		code: "NB",
		name: "New Brunswick"
	},
	636056: {
		country: "CAN",
		code: "NL",
		name: "Newfoundland and Labrador"
	},
	636065: {
		country: "CAN",
		code: "NS",
		name: "Nova Scotia"
	},
	604430: {
		country: "CAN",
		code: "PE",
		name: "Prince Edward Island"
	},
	604431: {
		country: "CAN",
		code: "YT",
		name: "Yukon"
	},
	604434: {
		country: "CAN",
		code: "NT",
		name: "Northwest Territories"
	}
}, Tr = /* @__PURE__ */ new Set(/* @__PURE__ */ "DAA.DAB.DAC.DAD.DAE.DAF.DAG.DAH.DAI.DAJ.DAK.DAL.DAM.DAN.DAO.DAP.DAQ.DAR.DAS.DAT.DAU.DAV.DAW.DAX.DAY.DAZ.DBA.DBB.DBC.DBD.DBE.DBF.DBG.DBH.DBI.DBJ.DBK.DBL.DBM.DBN.DBO.DBP.DBQ.DBR.DBS.DCA.DCB.DCC.DCD.DCE.DCF.DCG.DCH.DCI.DCJ.DCK.DCL.DCM.DCN.DCO.DCP.DCQ.DCR.DCS.DCT.DCU.DDA.DDB.DDC.DDD.DDE.DDF.DDG.DDH.DDI.DDJ.DDK.DDL".split("."));
function Er(e, t, n) {
	if (e < 1900 || e > 2120 || t < 1 || t > 12 || n < 1 || n > 31) return !1;
	let r = new Date(Date.UTC(e, t - 1, n));
	return r.getUTCFullYear() === e && r.getUTCMonth() === t - 1 && r.getUTCDate() === n;
}
function Dr(e, t, n) {
	return `${String(e).padStart(4, "0")}-${String(t).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Or(e, t) {
	if (!e) return null;
	let n = e.trim(), r = n.replace(/\D/g, "");
	if (r.length === 8) {
		let e = Number(r.slice(0, 4)), n = Er(e, Number(r.slice(4, 6)), Number(r.slice(6, 8))), i = Er(Number(r.slice(4, 8)), Number(r.slice(0, 2)), Number(r.slice(2, 4)));
		if (t === "CAN") {
			if (n) return Dr(e, Number(r.slice(4, 6)), Number(r.slice(6, 8)));
			if (i) return Dr(Number(r.slice(4, 8)), Number(r.slice(0, 2)), Number(r.slice(2, 4)));
		} else {
			if (i && !(e >= 1900 && e <= 2099 && !i)) return Dr(Number(r.slice(4, 8)), Number(r.slice(0, 2)), Number(r.slice(2, 4)));
			if (n) return Dr(e, Number(r.slice(4, 6)), Number(r.slice(6, 8)));
		}
	}
	let i = n.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
	if (i) {
		let e = Number(i[1]), t = Number(i[2]), n = Number(i[3]);
		if (Er(e, t, n)) return Dr(e, t, n);
	}
	let a = n.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
	if (a) {
		let e = Number(a[1]), t = Number(a[2]), n = Number(a[3]);
		if (Er(n, e, t)) return Dr(n, e, t);
	}
	return null;
}
function kr(e, t) {
	if (!e) return null;
	let n = e.trim().replace(/\s+/g, "");
	if (!n) return null;
	if (t !== "CAN" && /^\d{9}$/.test(n)) {
		let e = n.slice(0, 5), t = n.slice(5);
		return t === "0000" ? e : `${e}-${t}`;
	}
	return t === "CAN" && /^[A-Z]\d[A-Z]\d[A-Z]\d$/i.test(n) ? `${n.slice(0, 3).toUpperCase()} ${n.slice(3).toUpperCase()}` : e.trim();
}
function Ar(e) {
	if (!e) return null;
	let t = e.trim(), n = t.match(/^(\d{2,3})\s*in$/i);
	if (n) {
		let e = Number(n[1]);
		if (e > 24 && e < 110) return `${Math.floor(e / 12)}'${e % 12}" (${Math.round(e * 2.54)} cm)`;
	}
	let r = t.match(/^(\d{2,3})\s*cm$/i);
	if (r) return `${r[1]} cm`;
	if (/^\d{3}$/.test(t)) {
		let e = Number(t[0]), n = Number(t.slice(1));
		if (e >= 3 && e <= 8 && n < 12) return `${e}'${n}"`;
	}
	return t || null;
}
function Z(e) {
	if (!e) return null;
	let t = e.trim().replace(/\s+/g, " ");
	return !t || t === "NONE" || t === "N/A" || /^<+$/.test(t) ? t === "NONE" ? "NONE" : null : t;
}
function jr(e) {
	if (!e || typeof e != "string") return null;
	let t = /(?:^|[\r\n\x1e])(?:@\s*[\r\n\x1e]*)?(?:ANSI|AAMVA)\s*\d{6}/i.test(e), n = (e.match(/(?:^|[\r\n\x1e])(?:DL|ID)?(?:DCS|DAC|DAQ|DBB|DBA|DAA)[A-Z0-9]/g) || []).length;
	if (!t && n < 2) return null;
	let r = null, i = null, a = null, o = null, s = e.match(/(?:ANSI|AAMVA)\s*(\d{6})(\d{2})(\d{2})(\d{2})?([A-Z]{2})?/i);
	s && (r = s[1] || null, i = s[2] || null, a = s[3] || null, s[5] && (o = s[5].toUpperCase()));
	let c = e.match(/(?:ANSI|AAMVA)\s*\d{10}(?:\d{2})?([A-Z]{2})\d{8}/i);
	c && (o = c[1].toUpperCase());
	let l = e.split(/[\r\n\x1e\x1d]+/).map((e) => e.trim()).filter(Boolean), u = {};
	for (let e = 0; e < l.length; e++) {
		let t = l[e];
		if (/^(?:DL|ID|EN)D[A-Z]{2}/.test(t) && (o ||= t.slice(0, 2), t = t.slice(2)), /^(?:@|ANSI|AAMVA)/.test(t)) {
			let e = t.match(/(?:DL|ID)(D[A-Z]{2}.*)$/);
			if (e) o ||= t.slice(e.index, e.index + 2), t = e[1];
			else continue;
		}
		let n = t.slice(0, 3).toUpperCase(), r = t.slice(3).trim();
		/^D[A-Z]{2}$/.test(n) && (Tr.has(n) || r.length > 0) && !(n in u) && r !== "" && (u[n] = r);
	}
	if (Object.keys(u).length < 2) return null;
	let d = r ? wr[r] : void 0, f = u.DCG?.toUpperCase() || null, p = f && f.length === 3 ? f : d?.country ?? (f === "US" ? "USA" : f === "CA" ? "CAN" : null), m = u.DAJ?.trim().toUpperCase() || d?.code || null, h = d?.name ?? m, g = Z(u.DCS) ?? Z(u.DAB), _ = Z(u.DAC), v = Z(u.DAD), y = Z(u.DCU), b = [_, v].filter(Boolean).join(" ").trim() || Z(u.DCT);
	if ((!g || !b) && u.DAA) {
		let e = u.DAA.trim();
		if (e.includes(",")) {
			let t = e.split(",").map((e) => e.trim()).filter(Boolean);
			t.length >= 2 && (g ??= t[0], _ ??= t[1], v ??= t.slice(2).join(" ") || null, b ??= [_, v].filter(Boolean).join(" ").trim() || null);
		} else {
			let t = e.split(/\s+/).filter(Boolean);
			t.length >= 2 && (g ??= t[t.length - 1], b ??= t.slice(0, -1).join(" "), _ ??= t[0], t.length > 2 && (v ??= t.slice(1, -1).join(" ")));
		}
	}
	if (b && !_) {
		let e = b.split(/\s+/).filter(Boolean);
		_ = e[0] ?? null, e.length > 1 && (v = e.slice(1).join(" "));
	}
	let x = [
		b,
		g,
		y
	].filter(Boolean).join(" ").trim() || Z(u.DAA) || null, S = g ? g.split(/\s+/).filter(Boolean) : [], C = b ? b.split(/\s+/).filter(Boolean) : [], w = Z(u.DAQ), T = Z(u.DCF), E = Z(u.DCK), D = Or(u.DBB, p), O = Or(u.DBA, p), k = Or(u.DBD, p), A = null, j = u.DBC?.trim().toUpperCase();
	j === "1" || j === "M" ? A = "M" : j === "2" || j === "F" ? A = "F" : (j === "9" || j === "X") && (A = "X");
	let M = [Z(u.DAG) ?? Z(u.DAL), Z(u.DAH)].filter(Boolean).join(", ") || null, N = Z(u.DAI), P = kr(u.DAK, p), F = [M, [N, [m, P].filter(Boolean).join(" ").trim()].filter(Boolean).join(", ")].filter(Boolean).join(", ") || null, I = Z(u.DCA) ?? Z(u.DAR), L = Z(u.DCB) ?? Z(u.DAS), R = Z(u.DCD) ?? Z(u.DAT), ee = Ar(u.DAU), z = null;
	u.DAW ? z = `${u.DAW.trim()} lbs` : u.DAX && (z = `${u.DAX.trim()} kg`);
	let te = Z(u.DAY), B = Z(u.DAZ), ne = u.DDK === "1" || u.DDK === "Y" ? !0 : u.DDK === "0" || u.DDK === "N" ? !1 : null, re = u.DDL === "1" || u.DDL === "Y" ? !0 : u.DDL === "0" || u.DDL === "N" ? !1 : null, ie = Z(u.DDA);
	return {
		iin: r,
		version: i,
		jurisdictionVersion: a,
		subfileType: o,
		jurisdictionName: h,
		issuingCountry: p,
		surname: g,
		surnames: S,
		firstName: _,
		middleName: v,
		givenNames: b,
		givenNamesList: C,
		nameSuffix: y,
		fullName: x,
		documentNumber: w,
		documentDiscriminator: T,
		inventoryControlNumber: E,
		dateOfBirth: D,
		dateOfIssue: k,
		dateOfExpiry: O,
		sex: A,
		streetAddress: M,
		city: N,
		state: m,
		postalCode: P,
		address: F,
		licenseClass: I,
		restrictions: L,
		endorsements: R,
		height: ee,
		weight: z,
		eyeColor: te,
		hairColor: B,
		organDonor: ne,
		veteran: re,
		realIdCompliance: ie,
		fields: u
	};
}
// src/scanner/preprocessWorker.ts
var Mr = class e extends Error {
	constructor(t = "Document scan was cancelled") {
		super(t), this.name = "AbortError", this.code = "SCAN_ABORTED", Object.setPrototypeOf(this, e.prototype);
	}
};
function Nr(e) {
	return e instanceof Mr || e instanceof Error && e.name === "AbortError";
}
function Q(e) {
	if (e?.aborted) throw new Mr(typeof e.reason == "string" && e.reason ? e.reason : "Document scan was cancelled");
}
async function $(e, t, n) {
	return Q(t), t ? new Promise((r, i) => {
		let a = !1, o = () => {
			if (!a) {
				a = !0;
				try {
					n?.();
				} catch {}
				i(new Mr(typeof t.reason == "string" && t.reason ? t.reason : "Document scan was cancelled"));
			}
		};
		t.addEventListener("abort", o, { once: !0 }), e.then((e) => {
			a || (a = !0, t.removeEventListener("abort", o), r(e));
		}, (e) => {
			a || (a = !0, t.removeEventListener("abort", o), i(e));
		});
	}) : e;
}
function Pr() {
	return typeof Worker < "u" && typeof Blob < "u" && typeof URL < "u" && typeof URL.createObjectURL == "function" && typeof OffscreenCanvas < "u" && typeof createImageBitmap == "function";
}
var Fr = "\n'use strict';\n\nasync function canvasToDataUrl(canvas) {\n  if (typeof canvas.convertToBlob !== 'function') {\n    throw new Error('OffscreenCanvas.convertToBlob is not supported');\n  }\n  const blob = await canvas.convertToBlob({ type: 'image/png' });\n  if (typeof FileReaderSync !== 'undefined') {\n    return new FileReaderSync().readAsDataURL(blob);\n  }\n  return await new Promise((resolve, reject) => {\n    const reader = new FileReader();\n    reader.onload = () => resolve(String(reader.result));\n    reader.onerror = () => reject(new Error('Failed to encode PNG blob in worker'));\n    reader.readAsDataURL(blob);\n  });\n}\n\nfunction dist(a, b) {\n  return Math.hypot(a.x - b.x, a.y - b.y);\n}\n\nfunction solveHomography(srcPts, dstPts) {\n  const A = [];\n  const b = [];\n  for (let i = 0; i < 4; i++) {\n    const u = dstPts[i].x;\n    const v = dstPts[i].y;\n    const x = srcPts[i].x;\n    const y = srcPts[i].y;\n    A.push([u, v, 1, 0, 0, 0, -x * u, -x * v]);\n    b.push(x);\n    A.push([0, 0, 0, u, v, 1, -y * u, -y * v]);\n    b.push(y);\n  }\n  const n = 8;\n  for (let col = 0; col < n; col++) {\n    let pivotRow = col;\n    let maxVal = Math.abs(A[col][col]);\n    for (let row = col + 1; row < n; row++) {\n      const val = Math.abs(A[row][col]);\n      if (val > maxVal) {\n        maxVal = val;\n        pivotRow = row;\n      }\n    }\n    if (pivotRow !== col) {\n      const tmpRow = A[col]; A[col] = A[pivotRow]; A[pivotRow] = tmpRow;\n      const tmpB = b[col]; b[col] = b[pivotRow]; b[pivotRow] = tmpB;\n    }\n    const pivot = A[col][col] || 1e-12;\n    for (let row = col + 1; row < n; row++) {\n      const factor = A[row][col] / pivot;\n      if (factor === 0) continue;\n      for (let k = col; k < n; k++) {\n        A[row][k] -= factor * A[col][k];\n      }\n      b[row] -= factor * b[col];\n    }\n  }\n  const h = new Float64Array(9);\n  for (let row = n - 1; row >= 0; row--) {\n    let sum = b[row];\n    for (let k = row + 1; k < n; k++) {\n      sum -= A[row][k] * h[k];\n    }\n    h[row] = sum / (A[row][row] || 1e-12);\n  }\n  h[8] = 1;\n  return h;\n}\n\nfunction handleWarpPerspective(bitmap, corners) {\n  const natW = Math.max(1, bitmap.width);\n  const natH = Math.max(1, bitmap.height);\n  const srcScale = Math.min(1, 2400 / Math.max(1, natW, natH));\n  const sw = Math.max(1, Math.round(natW * srcScale));\n  const sh = Math.max(1, Math.round(natH * srcScale));\n\n  const srcCanvas = new OffscreenCanvas(sw, sh);\n  const sCtx = srcCanvas.getContext('2d', { willReadFrequently: true });\n  if (!sCtx) throw new Error('OffscreenCanvas 2D context unavailable');\n  sCtx.drawImage(bitmap, 0, 0, sw, sh);\n  const srcData = sCtx.getImageData(0, 0, sw, sh).data;\n\n  const tl = { x: corners.topLeft.x * sw, y: corners.topLeft.y * sh };\n  const tr = { x: corners.topRight.x * sw, y: corners.topRight.y * sh };\n  const br = { x: corners.bottomRight.x * sw, y: corners.bottomRight.y * sh };\n  const bl = { x: corners.bottomLeft.x * sw, y: corners.bottomLeft.y * sh };\n\n  const widthTop = dist(tl, tr);\n  const widthBot = dist(bl, br);\n  const heightLeft = dist(tl, bl);\n  const heightRight = dist(tr, br);\n\n  const rawOutW = Math.max(64, Math.round(Math.max(widthTop, widthBot)));\n  const rawOutH = Math.max(64, Math.round(Math.max(heightLeft, heightRight)));\n\n  let outScale = 1;\n  if (rawOutW < 1500) {\n    outScale = Math.min(2.6, 1750 / rawOutW);\n  } else if (rawOutW > 2100) {\n    outScale = 2100 / rawOutW;\n  }\n\n  const outW = Math.max(64, Math.round(rawOutW * outScale));\n  const outH = Math.max(64, Math.round(rawOutH * outScale));\n\n  const H = solveHomography(\n    [tl, tr, br, bl],\n    [\n      { x: 0, y: 0 },\n      { x: outW - 1, y: 0 },\n      { x: outW - 1, y: outH - 1 },\n      { x: 0, y: outH - 1 },\n    ]\n  );\n\n  const outCanvas = new OffscreenCanvas(outW, outH);\n  const oCtx = outCanvas.getContext('2d', { willReadFrequently: true });\n  if (!oCtx) throw new Error('OffscreenCanvas 2D context unavailable');\n\n  const outImg = oCtx.createImageData(outW, outH);\n  const dst = outImg.data;\n  const h0 = H[0], h1 = H[1], h2 = H[2];\n  const h3 = H[3], h4 = H[4], h5 = H[5];\n  const h6 = H[6], h7 = H[7], h8 = H[8];\n  const maxX = sw - 1;\n  const maxY = sh - 1;\n\n  for (let v = 0; v < outH; v++) {\n    const rowBaseX = h1 * v + h2;\n    const rowBaseY = h4 * v + h5;\n    const rowBaseW = h7 * v + h8;\n    let dstOff = v * outW * 4;\n\n    for (let u = 0; u < outW; u++) {\n      const denom = h6 * u + rowBaseW;\n      const invW = denom !== 0 ? 1 / denom : 1;\n      let sx = (h0 * u + rowBaseX) * invW;\n      let sy = (h3 * u + rowBaseY) * invW;\n\n      if (sx < 0) sx = 0;\n      else if (sx > maxX) sx = maxX;\n      if (sy < 0) sy = 0;\n      else if (sy > maxY) sy = maxY;\n\n      const x0 = sx | 0;\n      const y0 = sy | 0;\n      const x1 = x0 < maxX ? x0 + 1 : maxX;\n      const y1 = y0 < maxY ? y0 + 1 : maxY;\n      const fx = sx - x0;\n      const fy = sy - y0;\n      const w00 = (1 - fx) * (1 - fy);\n      const w10 = fx * (1 - fy);\n      const w01 = (1 - fx) * fy;\n      const w11 = fx * fy;\n\n      const i00 = (y0 * sw + x0) * 4;\n      const i10 = (y0 * sw + x1) * 4;\n      const i01 = (y1 * sw + x0) * 4;\n      const i11 = (y1 * sw + x1) * 4;\n\n      dst[dstOff] = srcData[i00] * w00 + srcData[i10] * w10 + srcData[i01] * w01 + srcData[i11] * w11;\n      dst[dstOff + 1] = srcData[i00 + 1] * w00 + srcData[i10 + 1] * w10 + srcData[i01 + 1] * w01 + srcData[i11 + 1] * w11;\n      dst[dstOff + 2] = srcData[i00 + 2] * w00 + srcData[i10 + 2] * w10 + srcData[i01 + 2] * w01 + srcData[i11 + 2] * w11;\n      dst[dstOff + 3] = 255;\n      dstOff += 4;\n    }\n  }\n\n  oCtx.putImageData(outImg, 0, 0);\n  const outBitmap = outCanvas.transferToImageBitmap();\n  return outBitmap;\n}\n\nfunction handleSampleGrayscale(bitmap, maxDim) {\n  const srcW = Math.max(1, bitmap.width);\n  const srcH = Math.max(1, bitmap.height);\n  const scale = Math.min(1, maxDim / Math.max(srcW, srcH));\n  const width = Math.max(1, Math.round(srcW * scale));\n  const height = Math.max(1, Math.round(srcH * scale));\n\n  const canvas = new OffscreenCanvas(width, height);\n  const ctx = canvas.getContext('2d', { willReadFrequently: true });\n  if (!ctx) throw new Error('OffscreenCanvas 2D context unavailable');\n\n  ctx.fillStyle = '#ffffff';\n  ctx.fillRect(0, 0, width, height);\n  ctx.imageSmoothingEnabled = true;\n  ctx.imageSmoothingQuality = 'medium';\n  ctx.drawImage(bitmap, 0, 0, width, height);\n\n  const rgba = ctx.getImageData(0, 0, width, height).data;\n  const gray = new Uint8ClampedArray(width * height);\n  for (let i = 0, p = 0; i < rgba.length; i += 4, p++) {\n    gray[p] = Math.round(0.299 * rgba[i] + 0.587 * rgba[i + 1] + 0.114 * rgba[i + 2]);\n  }\n  return { gray, width, height };\n}\n\nfunction applyContrastGrayscale(ctx, width, height) {\n  const imageData = ctx.getImageData(0, 0, width, height);\n  const data = imageData.data;\n  const histogram = new Uint32Array(256);\n\n  const marginX = Math.floor(width * 0.02);\n  const marginY = Math.floor(height * 0.02);\n  let samplePixels = 0;\n\n  for (let y = 0; y < height; y++) {\n    for (let x = 0; x < width; x++) {\n      const i = (y * width + x) * 4;\n      const lum = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);\n      data[i] = lum;\n      data[i + 1] = lum;\n      data[i + 2] = lum;\n      if (x >= marginX && x < width - marginX && y >= marginY && y < height - marginY) {\n        histogram[lum]++;\n        samplePixels++;\n      }\n    }\n  }\n\n  let low = 0;\n  let high = 255;\n  let cum = 0;\n  const lowTarget = samplePixels * 0.006;\n  const highTarget = samplePixels * 0.96;\n\n  for (let v = 0; v < 256; v++) {\n    cum += histogram[v];\n    if (cum >= lowTarget) {\n      low = v;\n      break;\n    }\n  }\n  cum = 0;\n  for (let v = 255; v >= 0; v--) {\n    cum += histogram[v];\n    if (samplePixels - cum <= highTarget) {\n      high = v;\n      break;\n    }\n  }\n\n  low = Math.min(36, Math.max(12, low));\n  high = Math.min(246, Math.max(225, high));\n\n  const range = Math.max(1, high - low);\n  for (let i = 0; i < data.length; i += 4) {\n    const stretched = Math.max(0, Math.min(255, ((data[i] - low) * 255) / range));\n    data[i] = stretched;\n    data[i + 1] = stretched;\n    data[i + 2] = stretched;\n  }\n  ctx.putImageData(imageData, 0, 0);\n}\n\nfunction applyRowFlatFieldMrzNormalization(ctx, width, height, borderPad, enhance) {\n  const imageData = ctx.getImageData(0, 0, width, height);\n  const data = imageData.data;\n  const totalPixels = width * height;\n  const gray = new Uint8ClampedArray(totalPixels);\n\n  for (let i = 0, p = 0; i < data.length; i += 4, p++) {\n    gray[p] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);\n  }\n  if (!enhance) {\n    return { data: gray, width, height };\n  }\n\n  const xStart = Math.max(borderPad, Math.floor(width * 0.03));\n  const xEnd = Math.min(width - borderPad, Math.ceil(width * 0.97));\n  const yStart = borderPad;\n  const yEnd = height - borderPad;\n\n  const normBuf = new Uint8ClampedArray(totalPixels);\n  normBuf.fill(255);\n  const allSamples = [];\n\n  for (let y = yStart; y < yEnd; y++) {\n    const rowOffset = y * width;\n    const rowVals = [];\n    for (let x = xStart; x < xEnd; x += 2) {\n      rowVals.push(gray[rowOffset + x]);\n    }\n    if (rowVals.length === 0) continue;\n    rowVals.sort((a, b) => a - b);\n\n    const rowBg = rowVals[Math.floor(rowVals.length * 0.88)] || 255;\n    const rowLow = rowVals[Math.floor(rowVals.length * 0.02)] ?? 0;\n    const rowRange = rowBg - rowLow;\n    if (rowRange < 18) continue;\n\n    const denom = Math.max(40, rowBg);\n    for (let x = borderPad; x < width - borderPad; x++) {\n      const normalized = Math.max(0, Math.min(255, Math.round((gray[rowOffset + x] / denom) * 255)));\n      normBuf[rowOffset + x] = normalized;\n      if ((x & 3) === 0) allSamples.push(normalized);\n    }\n  }\n\n  allSamples.sort((a, b) => a - b);\n  const p1_5 = allSamples[Math.floor(allSamples.length * 0.015)] ?? 20;\n  const p88 = allSamples[Math.floor(allSamples.length * 0.88)] ?? 245;\n\n  const blackPoint = Math.min(125, Math.max(15, p1_5 + 15));\n  const whitePoint = Math.min(248, Math.max(215, p88));\n  const span = Math.max(1, whitePoint - blackPoint);\n\n  for (let i = 0, p = 0; i < data.length; i += 4, p++) {\n    const v = normBuf[p];\n    let out;\n    if (v <= blackPoint) out = 0;\n    else if (v >= whitePoint) out = 255;\n    else out = Math.round(((v - blackPoint) / span) * 255);\n    gray[p] = out;\n    data[i] = out;\n    data[i + 1] = out;\n    data[i + 2] = out;\n  }\n\n  ctx.putImageData(imageData, 0, 0);\n  return { data: gray, width, height };\n}\n\nfunction trimWhiteRotationMargins(canvas) {\n  const w = canvas.width;\n  const h = canvas.height;\n  const ctx = canvas.getContext('2d', { willReadFrequently: true });\n  if (!ctx) return canvas;\n\n  const data = ctx.getImageData(0, 0, w, h).data;\n  const isContentPixel = (idx) => data[idx] < 248 || data[idx + 1] < 248 || data[idx + 2] < 248;\n\n  const rowHasContent = (y) => {\n    let hits = 0;\n    const minHits = Math.max(3, Math.floor(w * 0.01));\n    const step = Math.max(1, Math.floor(w / 160));\n    const rowOff = y * w;\n    for (let x = 0; x < w; x += step) {\n      if (isContentPixel((rowOff + x) * 4)) {\n        hits++;\n        if (hits >= minHits) return true;\n      }\n    }\n    return false;\n  };\n\n  const colHasContent = (x, yTop, yBot) => {\n    let hits = 0;\n    const minHits = Math.max(3, Math.floor((yBot - yTop) * 0.01));\n    const step = Math.max(1, Math.floor((yBot - yTop) / 160));\n    for (let y = yTop; y <= yBot; y += step) {\n      if (isContentPixel((y * w + x) * 4)) {\n        hits++;\n        if (hits >= minHits) return true;\n      }\n    }\n    return false;\n  };\n\n  let top = 0;\n  while (top < h - 10 && !rowHasContent(top)) top++;\n  let bottom = h - 1;\n  while (bottom > top + 10 && !rowHasContent(bottom)) bottom--;\n  let left = 0;\n  while (left < w - 10 && !colHasContent(left, top, bottom)) left++;\n  let right = w - 1;\n  while (right > left + 10 && !colHasContent(right, top, bottom)) right--;\n\n  const pad = 8;\n  top = Math.max(0, top - pad);\n  left = Math.max(0, left - pad);\n  bottom = Math.min(h - 1, bottom + pad);\n  right = Math.min(w - 1, right + pad);\n\n  const cropW = right - left + 1;\n  const cropH = bottom - top + 1;\n  if (cropW < w * 0.35 || cropH < h * 0.35 || (cropW >= w - 16 && cropH >= h - 16)) {\n    return canvas;\n  }\n\n  const trimmed = new OffscreenCanvas(cropW, cropH);\n  const tCtx = trimmed.getContext('2d', { willReadFrequently: true });\n  if (!tCtx) return canvas;\n  tCtx.drawImage(canvas, left, top, cropW, cropH, 0, 0, cropW, cropH);\n  return trimmed;\n}\n\nasync function buildMrzStrip(origCanvas, targetW, targetH, topRatio, bottomRatio, enhance) {\n  const srcX = Math.round(targetW * 0.018);\n  const srcW = Math.max(1, targetW - srcX * 2);\n  const srcY = Math.round(targetH * topRatio);\n  const srcH = Math.max(1, Math.round(targetH * bottomRatio) - srcY);\n\n  const borderPad = 32;\n  const scaleFactor = srcW < 1500 ? 1800 / srcW : 1.15;\n  const innerW = Math.round(srcW * scaleFactor);\n  const innerH = Math.round(srcH * scaleFactor);\n  const outW = innerW + borderPad * 2;\n  const outH = innerH + borderPad * 2;\n\n  const mrzCanvas = new OffscreenCanvas(outW, outH);\n  const mrzCtx = mrzCanvas.getContext('2d', { willReadFrequently: true });\n  if (!mrzCtx) throw new Error('OffscreenCanvas 2D context unavailable');\n\n  mrzCtx.fillStyle = '#ffffff';\n  mrzCtx.fillRect(0, 0, outW, outH);\n  mrzCtx.imageSmoothingEnabled = true;\n  mrzCtx.imageSmoothingQuality = 'high';\n  mrzCtx.drawImage(origCanvas, srcX, srcY, srcW, srcH, borderPad, borderPad, innerW, innerH);\n\n  const grayscale = applyRowFlatFieldMrzNormalization(mrzCtx, outW, outH, borderPad, enhance);\n  const dataUrl = await canvasToDataUrl(mrzCanvas);\n  return { dataUrl, grayscale };\n}\n\nasync function handlePreprocessDocument(bitmap, opts) {\n  const preprocess = opts.preprocess !== false;\n  const rotation = opts.rotation || 0;\n  const deskewDegrees = opts.deskewDegrees || 0;\n  const srcW = Math.max(1, bitmap.width);\n  const srcH = Math.max(1, bitmap.height);\n\n  const totalDeg = rotation + deskewDegrees;\n  const hasFineSkew = Math.abs(deskewDegrees) >= 0.1;\n\n  let rotatedW;\n  let rotatedH;\n  if (!hasFineSkew) {\n    const swapped = rotation === 90 || rotation === 270;\n    rotatedW = swapped ? srcH : srcW;\n    rotatedH = swapped ? srcW : srcH;\n  } else {\n    const rad = (totalDeg * Math.PI) / 180;\n    const absCos = Math.abs(Math.cos(rad));\n    const absSin = Math.abs(Math.sin(rad));\n    rotatedW = Math.max(1, Math.round(srcW * absCos + srcH * absSin));\n    rotatedH = Math.max(1, Math.round(srcW * absSin + srcH * absCos));\n  }\n\n  let scale = 1;\n  if (rotatedW < 1600) {\n    scale = Math.min(3.0, 1800 / Math.max(1, rotatedW));\n  } else if (rotatedW > 2200) {\n    scale = 2200 / rotatedW;\n  }\n\n  let origCanvas = new OffscreenCanvas(Math.round(rotatedW * scale), Math.round(rotatedH * scale));\n  const origCtx = origCanvas.getContext('2d', { willReadFrequently: true });\n  if (!origCtx) throw new Error('OffscreenCanvas 2D context unavailable');\n\n  origCtx.fillStyle = '#ffffff';\n  origCtx.fillRect(0, 0, origCanvas.width, origCanvas.height);\n  origCtx.imageSmoothingEnabled = true;\n  origCtx.imageSmoothingQuality = 'high';\n  origCtx.save();\n  origCtx.translate(origCanvas.width / 2, origCanvas.height / 2);\n  origCtx.rotate((totalDeg * Math.PI) / 180);\n  const drawW = Math.round(srcW * scale);\n  const drawH = Math.round(srcH * scale);\n  origCtx.drawImage(bitmap, -drawW / 2, -drawH / 2, drawW, drawH);\n  origCtx.restore();\n\n  if (hasFineSkew) {\n    origCanvas = trimWhiteRotationMargins(origCanvas);\n  }\n\n  const targetW = origCanvas.width;\n  const targetH = origCanvas.height;\n  const originalDataUrl = await canvasToDataUrl(origCanvas);\n\n  const enhCanvas = new OffscreenCanvas(targetW, targetH);\n  const enhCtx = enhCanvas.getContext('2d', { willReadFrequently: true });\n  if (!enhCtx) throw new Error('OffscreenCanvas 2D context unavailable');\n  enhCtx.drawImage(origCanvas, 0, 0);\n  if (preprocess) {\n    applyContrastGrayscale(enhCtx, targetW, targetH);\n  }\n  const enhancedDataUrl = await canvasToDataUrl(enhCanvas);\n\n  const [broadStrip, tightStrip] = await Promise.all([\n    buildMrzStrip(origCanvas, targetW, targetH, 0.60, 0.982, preprocess),\n    buildMrzStrip(origCanvas, targetW, targetH, 0.70, 0.982, preprocess),\n  ]);\n\n  return {\n    originalDataUrl,\n    enhancedDataUrl,\n    mrzCropDataUrl: broadStrip.dataUrl,\n    mrzGrayscale: {\n      buffer: broadStrip.grayscale.data.buffer,\n      width: broadStrip.grayscale.width,\n      height: broadStrip.grayscale.height,\n    },\n    mrzTightCropDataUrl: tightStrip.dataUrl,\n    mrzTightGrayscale: {\n      buffer: tightStrip.grayscale.data.buffer,\n      width: tightStrip.grayscale.width,\n      height: tightStrip.grayscale.height,\n    },\n    width: targetW,\n    height: targetH,\n  };\n}\n\nself.onmessage = async (event) => {\n  const msg = event.data;\n  const id = msg.id;\n  try {\n    if (msg.type === 'warp') {\n      const outBitmap = handleWarpPerspective(msg.bitmap, msg.corners);\n      try { msg.bitmap.close(); } catch {}\n      self.postMessage({ id, ok: true, result: { bitmap: outBitmap } }, [outBitmap]);\n      return;\n    }\n\n    if (msg.type === 'sampleGrayscale') {\n      const res = handleSampleGrayscale(msg.bitmap, msg.maxDim || 400);\n      try { msg.bitmap.close(); } catch {}\n      const buf = res.gray.buffer;\n      self.postMessage(\n        { id, ok: true, result: { buffer: buf, width: res.width, height: res.height } },\n        [buf]\n      );\n      return;\n    }\n\n    if (msg.type === 'preprocess') {\n      const res = await handlePreprocessDocument(msg.bitmap, msg.options || {});\n      try { msg.bitmap.close(); } catch {}\n      self.postMessage(\n        { id, ok: true, result: res },\n        [res.mrzGrayscale.buffer, res.mrzTightGrayscale.buffer]\n      );\n      return;\n    }\n\n    throw new Error('Unknown preprocessing worker task type: ' + String(msg.type));\n  } catch (err) {\n    try { if (msg.bitmap && typeof msg.bitmap.close === 'function') msg.bitmap.close(); } catch {}\n    self.postMessage({\n      id,\n      ok: false,\n      error: err instanceof Error ? err.message : String(err),\n    });\n  }\n};\n", Ir = class {
	constructor() {
		this.worker = null, this.workerUrl = null, this.nextJobId = 1, this.pending = /* @__PURE__ */ new Map(), this.permanentlyUnavailable = !1;
	}
	isAvailable() {
		return !this.permanentlyUnavailable && Pr();
	}
	ensureWorker() {
		if (this.permanentlyUnavailable || !Pr()) return null;
		if (this.worker) return this.worker;
		try {
			let e = new Blob([Fr], { type: "application/javascript" }), t = URL.createObjectURL(e), n = new Worker(t);
			return n.onmessage = (e) => {
				let { id: t, ok: n, result: r, error: i } = e.data, a = this.pending.get(t);
				a && (this.pending.delete(t), n ? a.resolve(r) : a.reject(Error(i || "OffscreenCanvas preprocessing worker failed")));
			}, n.onerror = () => {
				this.permanentlyUnavailable = !0;
				let e = /* @__PURE__ */ Error("Preprocessing Web Worker failed to initialize");
				for (let t of this.pending.values()) t.reject(e);
				this.pending.clear(), this.destroyWorkerInstance();
			}, this.workerUrl = t, this.worker = n, n;
		} catch {
			return this.permanentlyUnavailable = !0, this.destroyWorkerInstance(), null;
		}
	}
	destroyWorkerInstance() {
		if (this.worker) {
			try {
				this.worker.terminate();
			} catch {}
			this.worker = null;
		}
		if (this.workerUrl) {
			try {
				URL.revokeObjectURL(this.workerUrl);
			} catch {}
			this.workerUrl = null;
		}
	}
	abortActiveWorker() {
		for (let e of this.pending.values()) e.reject(new Mr());
		this.pending.clear(), this.destroyWorkerInstance();
	}
	runJob(e, t, n) {
		Q(n);
		let r = this.ensureWorker();
		if (!r) return Promise.reject(/* @__PURE__ */ Error("WORKER_UNAVAILABLE"));
		let i = this.nextJobId++;
		return $(new Promise((n, a) => {
			this.pending.set(i, {
				resolve: n,
				reject: a
			});
			try {
				r.postMessage({
					...e,
					id: i
				}, t);
			} catch (e) {
				this.pending.delete(i), a(e);
			}
		}), n, () => {
			this.abortActiveWorker();
		});
	}
	async warpPerspective(e, t, n) {
		if (!this.isAvailable()) return null;
		let r = null;
		try {
			r = await $(createImageBitmap(e), n), Q(n);
			let i = await this.runJob({
				type: "warp",
				bitmap: r,
				corners: t
			}, [r], n);
			return r = null, i.bitmap;
		} catch (e) {
			if (r) try {
				r.close();
			} catch {}
			if (Nr(e)) throw e;
			return this.permanentlyUnavailable = !0, this.destroyWorkerInstance(), null;
		}
	}
	async sampleDownscaledGrayscale(e, t = 400, n) {
		if (!this.isAvailable()) return null;
		let r = null;
		try {
			r = await $(createImageBitmap(e), n), Q(n);
			let i = await this.runJob({
				type: "sampleGrayscale",
				bitmap: r,
				maxDim: t
			}, [r], n);
			return r = null, {
				data: new Uint8ClampedArray(i.buffer),
				width: i.width,
				height: i.height
			};
		} catch (e) {
			if (r) try {
				r.close();
			} catch {}
			if (Nr(e)) throw e;
			return this.permanentlyUnavailable = !0, this.destroyWorkerInstance(), null;
		}
	}
	async preprocessDocument(e, t, n) {
		if (!this.isAvailable()) return null;
		let r = null;
		try {
			r = await $(createImageBitmap(e), n), Q(n);
			let i = await this.runJob({
				type: "preprocess",
				bitmap: r,
				options: t
			}, [r], n);
			return r = null, {
				originalDataUrl: i.originalDataUrl,
				enhancedDataUrl: i.enhancedDataUrl,
				mrzCropDataUrl: i.mrzCropDataUrl,
				mrzGrayscale: {
					data: new Uint8ClampedArray(i.mrzGrayscale.buffer),
					width: i.mrzGrayscale.width,
					height: i.mrzGrayscale.height
				},
				mrzTightCropDataUrl: i.mrzTightCropDataUrl,
				mrzTightGrayscale: {
					data: new Uint8ClampedArray(i.mrzTightGrayscale.buffer),
					width: i.mrzTightGrayscale.width,
					height: i.mrzTightGrayscale.height
				},
				width: i.width,
				height: i.height
			};
		} catch (e) {
			if (r) try {
				r.close();
			} catch {}
			if (Nr(e)) throw e;
			return this.permanentlyUnavailable = !0, this.destroyWorkerInstance(), null;
		}
	}
	terminate() {
		for (let e of this.pending.values()) e.reject(new Mr("Preprocessing worker terminated"));
		this.pending.clear(), this.destroyWorkerInstance();
	}
}, Lr = null;
async function Rr() {
	if (Lr !== null) return Lr;
	let e = globalThis.BarcodeDetector;
	if (!e) return Lr = !1, !1;
	try {
		Lr = typeof e.getSupportedFormats != "function" || (await e.getSupportedFormats()).includes("pdf417");
	} catch {
		Lr = !1;
	}
	return Lr;
}
function zr(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement ? {
		width: Math.max(1, e.naturalWidth || e.width),
		height: Math.max(1, e.naturalHeight || e.height)
	} : {
		width: Math.max(1, e.width),
		height: Math.max(1, e.height)
	};
}
function Br(e, t, n = 0) {
	let { width: r, height: i } = zr(e), a = Math.min(1, t / Math.max(r, i)), o = Math.max(1, Math.round(r * a)), s = Math.max(1, Math.round(i * a)), c = n === 90 || n === 270, l = document.createElement("canvas");
	l.width = c ? s : o, l.height = c ? o : s;
	let u = l.getContext("2d", { willReadFrequently: !0 });
	if (!u) throw Error("2D canvas context unavailable");
	return u.fillStyle = "#ffffff", u.fillRect(0, 0, l.width, l.height), u.imageSmoothingEnabled = !0, u.imageSmoothingQuality = "high", u.save(), u.translate(l.width / 2, l.height / 2), u.rotate(n * Math.PI / 180), u.drawImage(e, -o / 2, -s / 2, o, s), u.restore(), l;
}
function Vr(e, t, n = !1) {
	let r = e.width, i = e.height, a = t ? Math.max(0, Math.floor(t.x * r)) : 0, o = t ? Math.max(0, Math.floor(t.y * i)) : 0, s = t ? Math.min(r - a, Math.max(32, Math.floor(t.w * r))) : r, c = t ? Math.min(i - o, Math.max(32, Math.floor(t.h * i))) : i, l = e.getContext("2d", { willReadFrequently: !0 });
	if (!l) throw Error("2D canvas context unavailable");
	let u = l.getImageData(a, o, s, c).data, d = s * c, f = new Uint8ClampedArray(d), p = 255, m = 0;
	for (let e = 0, t = 0; e < u.length; e += 4, t++) {
		let n = Math.round(.299 * u[e] + .587 * u[e + 1] + .114 * u[e + 2]);
		f[t] = n, n < p && (p = n), n > m && (m = n);
	}
	if (n && m - p >= 24) {
		let e = m - p;
		for (let t = 0; t < d; t++) f[t] = Math.round((f[t] - p) / e * 255);
	}
	return {
		luminances: f,
		width: s,
		height: c
	};
}
function Hr(e, t, n) {
	if (t < 40 || n < 20) return null;
	let r = new Cr(), i = /* @__PURE__ */ new Map();
	i.set(Ht.TRY_HARDER, !0);
	let a = new rn(e, t, n);
	try {
		let e = new Bt(new bn(a)), t = r.decode(e, i)?.getText();
		if (t) return t;
	} catch {} finally {
		r.reset();
	}
	try {
		let e = new Bt(new vn(a)), t = r.decode(e, i)?.getText();
		if (t) return t;
	} catch {} finally {
		r.reset();
	}
	return null;
}
async function Ur(e, t, n) {
	if (Q(n), !await Rr()) return null;
	let r = globalThis.BarcodeDetector;
	if (!r) return null;
	try {
		let i = new r({ formats: ["pdf417"] });
		Q(n);
		let a = await i.detect(e);
		for (let e of a) if (e.rawValue && e.rawValue.trim().length > 0) return e.rawValue;
		for (let r of t) {
			if (r === 0) continue;
			Q(n);
			let t = Br(e, 1800, r), a = await i.detect(t);
			for (let e of a) if (e.rawValue && e.rawValue.trim().length > 0) return e.rawValue;
		}
	} catch (e) {
		if (e instanceof Error && e.name === "AbortError") throw e;
	}
	return null;
}
async function Wr(e, t = {}) {
	let { coarseRotation: n = 0, preferNative: r = !0, signal: i } = t;
	Q(i);
	let a = [n, ...[
		0,
		90,
		180,
		270
	].filter((e) => e !== n)];
	if (r) {
		let t = await Ur(e, a, i);
		if (t) return {
			format: "PDF417",
			rawText: t,
			detector: "native",
			aamva: jr(t)
		};
	}
	let o = [
		void 0,
		{
			x: 0,
			y: 0,
			w: 1,
			h: .56
		},
		{
			x: 0,
			y: .44,
			w: 1,
			h: .56
		},
		{
			x: 0,
			y: .22,
			w: 1,
			h: .56
		}
	], s = /* @__PURE__ */ new Map();
	for (let t of a) {
		Q(i);
		let n = Br(e, 1600, t);
		s.set(t, n);
		let r = Vr(n, void 0, !1), a = Hr(r.luminances, r.width, r.height);
		if (a) return {
			format: "PDF417",
			rawText: a,
			detector: "zxing",
			aamva: jr(a)
		};
		let o = Vr(n, void 0, !0), c = Hr(o.luminances, o.width, o.height);
		if (c) return {
			format: "PDF417",
			rawText: c,
			detector: "zxing",
			aamva: jr(c)
		};
	}
	for (let e of a.slice(0, 2)) {
		Q(i);
		let t = s.get(e);
		if (t) for (let e of o.slice(1)) {
			Q(i);
			let n = Vr(t, e, !0), r = Hr(n.luminances, n.width, n.height);
			if (r) return {
				format: "PDF417",
				rawText: r,
				detector: "zxing",
				aamva: jr(r)
			};
		}
	}
	return null;
}
// src/scanner/perspective.ts
function Gr(e) {
	return Math.max(0, Math.min(1, e));
}
function Kr(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement ? {
		width: Math.max(1, e.naturalWidth || e.width),
		height: Math.max(1, e.naturalHeight || e.height)
	} : {
		width: Math.max(1, e.width),
		height: Math.max(1, e.height)
	};
}
function qr(e, t) {
	return Math.hypot(e.x - t.x, e.y - t.y);
}
function Jr(e, t, n) {
	return (t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x);
}
function Yr(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = e[(n + 1) % e.length];
		t += r.x * i.y - i.x * r.y;
	}
	return Math.abs(t) / 2;
}
function Xr(e) {
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
function Zr(e) {
	if (e.length <= 3) return e;
	let t = [...e].sort((e, t) => e.x === t.x ? e.y - t.y : e.x - t.x), n = [];
	for (let e of t) {
		for (; n.length >= 2 && Jr(n[n.length - 2], n[n.length - 1], e) <= 0;) n.pop();
		n.push(e);
	}
	let r = [];
	for (let e = t.length - 1; e >= 0; e--) {
		let n = t[e];
		for (; r.length >= 2 && Jr(r[r.length - 2], r[r.length - 1], n) <= 0;) r.pop();
		r.push(n);
	}
	return n.pop(), r.pop(), n.concat(r);
}
function Qr(e) {
	if (e.length <= 4) return e;
	let t = [...e];
	for (; t.length > 4;) {
		let e = Infinity, n = 0, r = t.length;
		for (let i = 0; i < r; i++) {
			let a = t[(i - 1 + r) % r], o = t[i], s = t[(i + 1) % r], c = Math.abs(Jr(a, o, s)) * .5;
			c < e && (e = c, n = i);
		}
		t.splice(n, 1);
	}
	return t;
}
function $r(e, t, n) {
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
function ei(e, t) {
	let n = e.nx * t.ny - t.nx * e.ny;
	return Math.abs(n) < 1e-6 ? null : {
		x: (e.ny * t.c - t.ny * e.c) / n,
		y: (t.nx * e.c - e.nx * t.c) / n
	};
}
function ti(e, t, n) {
	let r = n.x - t.x, i = n.y - t.y, a = r * r + i * i;
	if (a < 1e-9) return {
		d: qr(e, t),
		t: 0
	};
	let o = ((e.x - t.x) * r + (e.y - t.y) * i) / a, s = Math.max(0, Math.min(1, o)), c = t.x + s * r, l = t.y + s * i;
	return {
		d: Math.hypot(e.x - c, e.y - l),
		t: o
	};
}
function ni(e, t, n) {
	let r = Xr(e), i = [
		r.topLeft,
		r.topRight,
		r.bottomRight,
		r.bottomLeft
	], a = [];
	for (let e = 0; e < 4; e++) {
		let r = i[e], o = i[(e + 1) % 4], s = [];
		for (let e of t) {
			let { d: t, t: i } = ti(e, r, o);
			t <= n && i >= .12 && i <= .88 && s.push(e);
		}
		a.push($r(s, r, o));
	}
	let o = [];
	for (let e = 0; e < 4; e++) {
		let t = a[(e + 3) % 4], r = a[e], s = ei(t, r);
		if (!s || qr(s, i[e]) > n * 4) return i;
		o.push(s);
	}
	return o;
}
function ri(e) {
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
function ii(e, t, n) {
	let r = 0, i = Infinity, a = !0;
	for (let o = 0; o < 4; o++) {
		let s = n[o], c = n[(o + 1) % 4], l = (c.x - s.x) * (t - s.y) - (c.y - s.y) * (e - s.x);
		if (Math.abs(l) > 1e-5) {
			let e = l > 0 ? 1 : -1;
			r === 0 ? r = e : e !== r && (a = !1);
		}
		let u = ti({
			x: e,
			y: t
		}, s, c).d;
		u < i && (i = u);
	}
	return {
		inside: a,
		dist: a ? 0 : i
	};
}
function ai(e, t, n, r, i) {
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
function oi(e) {
	let { width: t, height: n } = Kr(e);
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
	let b = v.filter((e) => e.grad < 13);
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
		e.grad < 14 && t < 56 && (O[e.side]++, k++);
	}
	let A = D.map((e, t) => e > 0 ? O[t] / e : 0), j = A.filter((e) => e >= .45).length, M = A.filter((e) => e >= .62).length, N = k / Math.max(1, v.length);
	if (j < 3 || M < 2 && N < .66) return null;
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
	let I = new Uint8Array(l), L = new Int32Array(l), R = 0, ee = 0, z = (e) => Math.max(Math.abs(u[e] - w), Math.abs(d[e] - T), Math.abs(f[e] - E)), te = (e) => {
		I[e] || F[e] || g[e] < 11.5 && z(e) < 52 && (I[e] = 1, L[ee++] = e);
	};
	for (let e = 0; e < i; e++) te(e), te((a - 1) * i + e);
	for (let e = 0; e < a; e++) te(e * i), te(e * i + (i - 1));
	if (ee === 0) return null;
	for (; R < ee;) {
		let e = L[R++], t = e % i, n = e / i | 0, r = u[e], o = d[e], s = f[e], c = [
			t > 0 ? e - 1 : -1,
			t < i - 1 ? e + 1 : -1,
			n > 0 ? e - i : -1,
			n < a - 1 ? e + i : -1
		];
		for (let e = 0; e < 4; e++) {
			let t = c[e];
			t < 0 || I[t] || F[t] || Math.max(Math.abs(u[t] - r), Math.abs(d[t] - o), Math.abs(f[t] - s)) > 14 || z(t) > 60 || (I[t] = 1, L[ee++] = t);
		}
	}
	let B = new Uint8Array(l), ne = new Int32Array(l), re = [];
	for (let e = 0; e < l; e++) {
		if (I[e] || B[e]) continue;
		let t = 0, n = 0;
		B[e] = 1, ne[n++] = e;
		let r = [];
		for (; t < n;) {
			let e = ne[t++];
			r.push(e);
			let o = e % i, s = e / i | 0;
			o > 0 && !I[e - 1] && !B[e - 1] && (B[e - 1] = 1, ne[n++] = e - 1), o < i - 1 && !I[e + 1] && !B[e + 1] && (B[e + 1] = 1, ne[n++] = e + 1), s > 0 && !I[e - i] && !B[e - i] && (B[e - i] = 1, ne[n++] = e - i), s < a - 1 && !I[e + i] && !B[e + i] && (B[e + i] = 1, ne[n++] = e + i);
		}
		r.length > re.length && (re = r);
	}
	let ie = re.length / l;
	if (ie < .06 || ie > .93) return null;
	let ae = new Uint8Array(l);
	for (let e = 0; e < re.length; e++) ae[re[e]] = 1;
	let oe = [];
	for (let e = 0; e < re.length; e++) {
		let t = re[e], n = t % i, r = t / i | 0;
		n !== 0 && n !== i - 1 && r !== 0 && r !== a - 1 && ae[t - 1] && ae[t + 1] && ae[t - i] && ae[t + i] || oe.push({
			x: n,
			y: r
		});
	}
	if (oe.length < 24) return null;
	let se = Zr(oe);
	if (se.length < 4) return null;
	let V = Xr(ni(Qr(se), oe, Math.max(4, Math.min(i, a) * .035)).map((e) => ({
		x: Gr(e.x / i),
		y: Gr(e.y / a)
	})));
	if (ri(V).some((e) => e < 46 || e > 134)) return null;
	let ce = Yr([
		V.topLeft,
		V.topRight,
		V.bottomRight,
		V.bottomLeft
	]);
	if (ce < .06 || ce > .93) return null;
	let H = .028, U = (e) => e.y <= H, W = (e) => e.x >= .972, le = (e) => e.y >= .972, ue = (e) => e.x <= H, de = [
		U(V.topLeft) && U(V.topRight),
		W(V.topRight) && W(V.bottomRight),
		le(V.bottomRight) && le(V.bottomLeft),
		ue(V.bottomLeft) && ue(V.topLeft)
	], G = de.filter(Boolean).length, fe = [
		V.topLeft,
		V.topRight,
		V.bottomRight,
		V.bottomLeft
	].filter((e) => e.x > .028 && e.x < .972 && e.y > .028 && e.y < .972).length;
	if (G >= 2 || fe < 2) return null;
	let pe = [
		{
			x: V.topLeft.x * i,
			y: V.topLeft.y * a
		},
		{
			x: V.topRight.x * i,
			y: V.topRight.y * a
		},
		{
			x: V.bottomRight.x * i,
			y: V.bottomRight.y * a
		},
		{
			x: V.bottomLeft.x * i,
			y: V.bottomLeft.y * a
		}
	], K = [];
	for (let e = 0; e < 4; e++) {
		if (de[e]) continue;
		let t = ai(pe[e], pe[(e + 1) % 4], g, i, a);
		K.push(t);
	}
	let me = K.length > 0 ? Math.min(...K) : 0, he = K.length > 0 ? K.reduce((e, t) => e + t, 0) / K.length : 0;
	if (K.length > 0 && (me < .42 || he < .56)) return null;
	let ge = fe === 4 && G === 0 && ce < .72 && me >= .46 && he >= .6, _e = 3.5, ve = ge ? 22 : Infinity, ye = new Uint8Array(l), be = .299 * w + .587 * T + .114 * E, xe = 0, Se = 0, Ce = 0, we = 0;
	for (let e = 1; e < a - 1; e++) {
		let t = e * i;
		for (let n = 1; n < i - 1; n++) {
			let r = t + n, o = ii(n, e, pe);
			if (o.inside || o.dist <= _e || o.dist > ve) continue;
			xe++;
			let s = h[r], c = z(r), l = be - p[r];
			if (s >= 14 && c >= 24 && Se++, l >= 38 && s >= 10 && Ce++, !I[r] && !ye[r]) {
				let e = 0, t = 0;
				ye[r] = 1, ne[t++] = r;
				let n = 0;
				for (; e < t;) {
					let r = ne[e++];
					(h[r] >= 10 || z(r) >= 32) && n++;
					let o = r % i, s = r / i | 0, c = [
						o > 1 ? r - 1 : -1,
						o < i - 2 ? r + 1 : -1,
						s > 1 ? r - i : -1,
						s < a - 2 ? r + i : -1
					];
					for (let e = 0; e < 4; e++) {
						let n = c[e];
						if (n < 0 || I[n] || ye[n]) continue;
						let r = ii(n % i, n / i | 0, pe);
						!r.inside && r.dist > _e && r.dist <= ve && (ye[n] = 1, ne[t++] = n);
					}
				}
				t >= 3 && n >= 3 && we++;
			}
		}
	}
	if (xe > 0) {
		let e = Se / xe;
		if (ge) {
			if (we >= 8 || Ce >= Math.max(28, Math.round(l * .0028)) || e > .025) return null;
		} else if (we >= 7 || Ce >= Math.max(24, Math.round(l * .0025)) || e > .015 || Se > Math.max(48, Math.round(l * .0055))) return null;
	}
	let Te = qr({
		x: V.topLeft.x * t,
		y: V.topLeft.y * n
	}, {
		x: V.topRight.x * t,
		y: V.topRight.y * n
	}), Ee = qr({
		x: V.bottomLeft.x * t,
		y: V.bottomLeft.y * n
	}, {
		x: V.bottomRight.x * t,
		y: V.bottomRight.y * n
	}), De = qr({
		x: V.topLeft.x * t,
		y: V.topLeft.y * n
	}, {
		x: V.bottomLeft.x * t,
		y: V.bottomLeft.y * n
	}), Oe = qr({
		x: V.topRight.x * t,
		y: V.topRight.y * n
	}, {
		x: V.bottomRight.x * t,
		y: V.bottomRight.y * n
	}), ke = Math.max(Te, Ee), Ae = Math.max(De, Oe), je = ke / Math.max(1, Ae);
	if (je < .42 || je > 2.45) return null;
	let Me = Math.atan2((V.topRight.y - V.topLeft.y) * n, (V.topRight.x - V.topLeft.x) * t), Ne = Math.atan2((V.bottomRight.y - V.bottomLeft.y) * n, (V.bottomRight.x - V.bottomLeft.x) * t), Pe = Math.atan2((V.bottomLeft.y - V.topLeft.y) * n, (V.bottomLeft.x - V.topLeft.x) * t), Fe = Math.atan2((V.bottomRight.y - V.topRight.y) * n, (V.bottomRight.x - V.topRight.x) * t), Ie = 180 / Math.PI, Le = Math.max(Math.abs((Me - Ne) * Ie), Math.abs((Pe - Fe) * Ie)), Re = Math.max(Math.abs(Te - Ee) / Math.max(1, ke), Math.abs(De - Oe) / Math.max(1, Ae)), ze = Math.max(Math.abs(Me * Ie), Math.abs(Ne * Ie));
	return !(Le >= 1.8 || Re >= .04 || ze >= 2.2) && !(ce <= .88 && fe >= 3) ? null : {
		applied: !0,
		autoDetected: !0,
		corners: V,
		sourceQuadAreaRatio: Math.round(ce * 1e3) / 1e3
	};
}
function si(e, t) {
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
function ci(e, t) {
	let { width: n, height: r } = Kr(e), i = Math.min(1, 2400 / Math.max(1, n, r)), a = Math.max(1, Math.round(n * i)), o = Math.max(1, Math.round(r * i)), s = document.createElement("canvas");
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
	}, m = qr(u, d), h = qr(p, f), g = qr(u, p), _ = qr(d, f), v = Math.max(64, Math.round(Math.max(m, h))), y = Math.max(64, Math.round(Math.max(g, _))), b = 1;
	v < 1500 ? b = Math.min(2.6, 1750 / v) : v > 2100 && (b = 2100 / v);
	let x = Math.max(64, Math.round(v * b)), S = Math.max(64, Math.round(y * b)), C = si([
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
var li = class extends Error {
	constructor(e) {
		super(`Image quality gate failed: ${e.guidance}`), this.name = "QualityGateError", this.report = e;
	}
}, ui = 32, di = 24;
function fi(e) {
	return typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement;
}
function pi(e) {
	let t = Math.max(0, Math.min(.95, e.x)), n = Math.max(0, Math.min(.95, e.y));
	return {
		x: t,
		y: n,
		width: Math.max(.05, Math.min(1 - t, e.width)),
		height: Math.max(.05, Math.min(1 - n, e.height))
	};
}
function mi(e, t = .03) {
	let n = e.videoWidth, r = e.videoHeight, i = e.clientWidth, a = e.clientHeight;
	if (!n || !r || !i || !a) return null;
	let o = n / r, s = i / a;
	if (Math.abs(o - s) / Math.max(o, s) < .04) return null;
	let c = 1, l = 1;
	return o < s ? l = Math.min(1, o / s * (1 + t * 2)) : c = Math.min(1, s / o * (1 + t * 2)), pi({
		x: (1 - c) * .5,
		y: (1 - l) * .5,
		width: c,
		height: l
	});
}
function hi(e, t, n) {
	let r = /* @__PURE__ */ new Uint8Array(768), i = Math.floor(t * .1), a = Math.floor(n * .12), o = Math.max(1, Math.floor(t * .8)), s = Math.max(1, Math.floor(n * .76));
	for (let c = 0; c < di; c++) {
		let l = Math.min(n - 1, a + Math.floor((c + .5) / di * s));
		for (let n = 0; n < ui; n++) {
			let a = Math.min(t - 1, i + Math.floor((n + .5) / ui * o));
			r[c * ui + n] = e[l * t + a];
		}
	}
	return r;
}
function gi(e, t) {
	return e.length === 0 ? t ? "Crisp, glare-free frame ready" : "Image quality acceptable" : e.includes("no_document") ? "Position passport or ID card inside the frame" : e.includes("too_dark") ? "Too dark — move to brighter, even lighting" : e.includes("too_bright") ? "Overexposed — reduce direct light on document" : e.includes("glare_detected") ? "Glare hotspot detected — tilt card or avoid direct reflections" : e.includes("camera_moving") ? "Hold steady — stabilizing frame…" : e.includes("too_blurry") ? "Image looks blurry — hold steady or move slightly back to focus" : "Adjust framing and lighting";
}
function _i(e, t, n = {}, r) {
	let { minSharpness: i = 26, maxGlareRatio: a = .045, minBrightness: o = 45, maxBrightness: s = 244, requireDocument: c = !0, maxMotionDelta: l = 7.5 } = n, u = Math.max(1, e.width), d = Math.max(1, e.height), f = Math.min(1, 480 / Math.max(u, d)), p = Math.max(32, Math.round(u * f)), m = Math.max(32, Math.round(d * f)), h = f === 1 ? e : (() => {
		let t = document.createElement("canvas");
		t.width = p, t.height = m;
		let n = t.getContext("2d", { willReadFrequently: !0 });
		return n && (n.imageSmoothingEnabled = !0, n.imageSmoothingQuality = "medium", n.drawImage(e, 0, 0, p, m)), t;
	})(), g = h.getContext("2d", { willReadFrequently: !0 });
	if (!g) throw Error("2D canvas context unavailable for quality assessment");
	let _ = g.getImageData(0, 0, p, m).data, v = p * m, y = new Uint8ClampedArray(v);
	for (let e = 0, t = 0; e < _.length; e += 4, t++) y[t] = Math.round(.299 * _[e] + .587 * _[e + 1] + .114 * _[e + 2]);
	let b = hi(y, p, m), x = Math.max(1, Math.floor(p * .1)), S = Math.min(p - 2, Math.ceil(p * .9)), C = Math.max(1, Math.floor(m * .12)), w = Math.min(m - 2, Math.ceil(m * .88)), T = Math.max(8, S - x), E = Math.max(8, w - C), D = T * E, O = /* @__PURE__ */ new Uint32Array(256), k = 0, A = 0, j = 0, M = /* @__PURE__ */ new Float64Array(48), N = /* @__PURE__ */ new Float64Array(48), P = /* @__PURE__ */ new Float64Array(48), F = /* @__PURE__ */ new Uint32Array(48);
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
	let I = Math.round(k / Math.max(1, D)), L = 0, R = 128, ee = 255, z = 0, te = !1, B = !1;
	for (let e = 0; e < 256; e++) if (z += O[e], !te && z >= D * .1 && (L = e, te = !0), !B && z >= D * .6 && (R = e, B = !0), z >= D * .95) {
		ee = e;
		break;
	}
	let ne = ee - L, re = [];
	for (let e = 0; e < 48; e++) {
		let t = F[e];
		if (t < 8) continue;
		let n = M[e] / t, r = Math.max(0, N[e] / t - n * n), i = P[e] / t, a = Math.sqrt(r) * .72 + i * 1.15;
		re.push(a);
	}
	re.sort((e, t) => t - e);
	let ie = Math.max(1, Math.ceil(re.length * .25)), ae = 0;
	for (let e = 0; e < ie; e++) ae += re[e] ?? 0;
	let oe = ae / ie, se = Math.max(0, Math.min(100, Math.round((oe - 2) / 28 * 100))), V = se >= i, ce = j / Math.max(1, D), H = R < 236 ? Math.round(ce * 1e3) / 1e3 : Math.round(Math.max(0, ce - .55) * 1e3) / 1e3, U = R < 236 && ce > a && ce < .78, W = "ok";
	I < o ? W = "too_dark" : I > s && ne < 70 && (W = "too_bright");
	let le = null;
	if (r?.detectQuad !== !1) {
		let e = oi(h);
		e && e.sourceQuadAreaRatio >= .1 && (le = e.corners);
	}
	let ue = A / Math.max(1, D), de = le !== null || ue >= .011 && ne >= 32, G = 0, fe = !0, pe = 100;
	if (t && t.length === b.length) {
		let e = 0;
		for (let n = 0; n < b.length; n++) e += Math.abs(b[n] - t[n]);
		G = Math.round(e / b.length * 10) / 10, fe = G <= l, pe = Math.max(0, Math.min(100, Math.round(100 - G / (l * 2.5) * 100)));
	}
	let K = [];
	c && !de && K.push("no_document"), W === "too_dark" ? K.push("too_dark") : W === "too_bright" && K.push("too_bright"), U && K.push("glare_detected"), V || K.push("too_blurry"), fe || K.push("camera_moving");
	let me = Math.max(0, Math.min(100, Math.round((1 - H * 6) * 100))), he = W === "ok" ? Math.max(40, Math.min(100, Math.round(100 - Math.abs(I - 148) * .4))) : 20, ge = Math.max(0, Math.min(100, Math.round(se * .48 + me * .22 + he * .15 + pe * .15))), _e = K.length === 0, ve = gi(K, de);
	return {
		report: {
			passed: _e,
			overallScore: ge,
			sharpnessScore: se,
			isSharp: V,
			glareRatio: H,
			hasGlare: U,
			meanBrightness: I,
			exposureStatus: W,
			documentDetected: de,
			detectedCorners: le,
			stabilityScore: pe,
			isStable: fe,
			motionDelta: G,
			issues: K,
			guidance: ve
		},
		signature: b
	};
}
async function vi(e, t = {}) {
	if (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) return _i(e, null, t).report;
	let n;
	if (fi(e)) {
		let t = mi(e), r = Math.max(1, e.videoWidth || e.clientWidth), i = Math.max(1, e.videoHeight || e.clientHeight), a = t ? Math.round(t.x * r) : 0, o = t ? Math.round(t.y * i) : 0, s = t ? Math.max(1, Math.round(t.width * r)) : r, c = t ? Math.max(1, Math.round(t.height * i)) : i, l = Math.min(1, 480 / Math.max(s, c));
		n = document.createElement("canvas"), n.width = Math.max(1, Math.round(s * l)), n.height = Math.max(1, Math.round(c * l));
		let u = n.getContext("2d", { willReadFrequently: !0 });
		if (!u) throw Error("2D canvas context unavailable");
		u.drawImage(e, a, o, s, c, 0, 0, n.width, n.height);
	} else {
		let t = typeof ImageBitmap < "u" && e instanceof ImageBitmap ? e : await G(e), { width: r, height: i } = de(t), a = Math.min(1, 480 / Math.max(r, i));
		n = document.createElement("canvas"), n.width = Math.max(1, Math.round(r * a)), n.height = Math.max(1, Math.round(i * a));
		let o = n.getContext("2d", { willReadFrequently: !0 });
		if (!o) throw Error("2D canvas context unavailable");
		o.drawImage(t, 0, 0, n.width, n.height);
	}
	return _i(n, null, t).report;
}
var yi = class {
	constructor(e, t = {}) {
		this.timerId = null, this.running = !1, this.capturing = !1, this.consecutivePassFrames = 0, this.previousSignature = null, this.latestReport = null, this.video = e, this.options = {
			sampleIntervalMs: 170,
			requiredStableFrames: 2,
			minSharpness: 22,
			maxMotionDelta: 8.5,
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
	resolveSourceCrop(e, t) {
		let n = typeof this.options.captureRegion == "function" ? this.options.captureRegion() : this.options.captureRegion ?? null;
		if (!n) return {
			sx: 0,
			sy: 0,
			sw: e,
			sh: t
		};
		let r = pi(n), i = Math.max(0, Math.round(r.x * e)), a = Math.max(0, Math.round(r.y * t));
		return {
			sx: i,
			sy: a,
			sw: Math.min(e - i, Math.max(16, Math.round(r.width * e))),
			sh: Math.min(t - a, Math.max(16, Math.round(r.height * t)))
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
				let { sx: n, sy: r, sw: i, sh: a } = this.resolveSourceCrop(e, t), o = Math.min(1, 480 / Math.max(i, a)), s = Math.max(32, Math.round(i * o)), c = Math.max(32, Math.round(a * o));
				(this.analysisCanvas.width !== s || this.analysisCanvas.height !== c) && (this.analysisCanvas.width = s, this.analysisCanvas.height = c);
				let l = this.analysisCanvas.getContext("2d", { willReadFrequently: !0 });
				if (!l) {
					this.scheduleNextTick(this.options.sampleIntervalMs);
					return;
				}
				l.drawImage(this.video, n, r, i, a, 0, 0, s, c);
				let { report: u, signature: d } = _i(this.analysisCanvas, this.previousSignature, this.options);
				this.previousSignature = d, this.latestReport = u, u.passed ? this.consecutivePassFrames++ : this.consecutivePassFrames = u.issues.length === 1 && u.issues[0] === "camera_moving" ? Math.max(0, this.consecutivePassFrames - 1) : 0;
				let f = Math.max(1, this.options.requiredStableFrames), p = Math.min(1, this.consecutivePassFrames / f);
				if (this.options.onQualityUpdate?.(u, p), this.consecutivePassFrames >= f) {
					this.capturing = !0, this.consecutivePassFrames = 0;
					let e = await this.captureFullFrame();
					if (this.options.stopOnCapture && this.stop(), this.options.onAutoCapture?.(e, u), this.capturing = !1, !this.running) return;
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
			let { sx: i, sy: a, sw: o, sh: s } = this.resolveSourceCrop(n, r), c = document.createElement("canvas");
			c.width = o, c.height = s;
			let l = c.getContext("2d");
			if (!l) {
				t(/* @__PURE__ */ Error("2D canvas context unavailable"));
				return;
			}
			l.drawImage(this.video, i, a, o, s, 0, 0, o, s);
			let u = this.options.mimeType, d = u === "image/jpeg" ? "jpg" : u === "image/webp" ? "webp" : "png";
			c.toBlob((n) => {
				n ? e(new File([n], `auto-capture-${Date.now()}.${d}`, { type: u })) : t(/* @__PURE__ */ Error("Failed to encode captured camera frame"));
			}, u, this.options.captureQuality);
		});
	}
};
function bi(e, t = {}) {
	let n = new yi(e, t);
	return n.start(), n;
}
// src/scanner/vizLanguages.ts
var xi = "eng+deu+spa+fra", Si = /* @__PURE__ */ new Set([
	"USA",
	"GBR",
	"GBD",
	"GBN",
	"GBO",
	"GBP",
	"GBS",
	"CAN",
	"AUS",
	"NZL",
	"IRL",
	"IND",
	"SGP",
	"MLT",
	"ZAF",
	"JAM",
	"BHS",
	"BRB",
	"TTO",
	"BLZ",
	"GUY",
	"GIB"
]), Ci = {
	D: "deu",
	DEU: "deu",
	AUT: "deu",
	LIE: "deu",
	CHE: "deu+fra",
	ESP: "spa",
	MEX: "spa",
	ARG: "spa",
	COL: "spa",
	CHL: "spa",
	PER: "spa",
	VEN: "spa",
	ECU: "spa",
	GTM: "spa",
	CUB: "spa",
	DOM: "spa",
	HND: "spa",
	PRY: "spa",
	SLV: "spa",
	NIC: "spa",
	CRI: "spa",
	PAN: "spa",
	URY: "spa",
	BOL: "spa",
	FRA: "fra",
	MCO: "fra",
	LUX: "fra+deu",
	BEL: "fra+nld",
	MAR: "fra",
	TUN: "fra",
	DZA: "fra",
	SEN: "fra",
	CIV: "fra",
	CMR: "fra",
	ITA: "ita",
	SMR: "ita",
	VAT: "ita",
	PRT: "por",
	BRA: "por",
	AGO: "por",
	MOZ: "por",
	CPV: "por",
	NLD: "nld",
	SUR: "nld",
	POL: "pol",
	CZE: "ces",
	SVK: "slk",
	LTU: "lit",
	LVA: "lav",
	EST: "est",
	HUN: "hun",
	ROU: "ron",
	MDA: "ron",
	HRV: "hrv",
	BIH: "hrv",
	SVN: "slv",
	SWE: "swe",
	NOR: "nor",
	DNK: "dan",
	FIN: "fin",
	ISL: "isl",
	TUR: "tur"
}, wi = [
	{
		countryCode: "DEU",
		pattern: /\b(?:BUNDESREPUBLIK\s+DEUTSCHLAND|PERSONALAUSWEIS|REISEPASS|FAHRERLAUBNIS|F[UÜ]HRERSCHEIN|STAATSANGEH[OÖ]RIGKEIT|GEBURTSORT|ANSCHRIFT|AUGENFARBE|FAMILIENNAME|BEH[OÖ]RDE)\b/i
	},
	{
		countryCode: "AUT",
		pattern: /\b(?:REPUBLIK\s+[OÖ]STERREICH|OSTERREICHISCHER)\b/i
	},
	{
		countryCode: "CHE",
		pattern: /\b(?:SCHWEIZERISCHE\s+EIDGENOSSENSCHAFT|CONF[EÉ]D[EÉ]RATION\s+SUISSE)\b/i
	},
	{
		countryCode: "ESP",
		pattern: /\b(?:REINO\s+DE\s+ESPA[NÑ]A|ESPA[NÑ]OLA|DOCUMENTO\s+NACIONAL\s+DE\s+IDENTIDAD|PRIMER\s+APELLIDO|SEGUNDO\s+APELLIDO|FECHA\s+DE\s+CADUCIDAD|LUGAR\s+DE\s+NACIMIENTO|PASAPORTE)\b/i
	},
	{
		countryCode: "FRA",
		pattern: /\b(?:R[EÉ]PUBLIQUE\s+FRAN[CÇ]AISE|CARTE\s+NATIONALE\s+D['’]IDENTIT[EÉ]|PASSEPORT\s+FRAN[CÇ]AIS|PERMIS\s+DE\s+CONDUIRE|DATE\s+DE\s+D[EÉ]LIVRANCE|LIEU\s+DE\s+NAISSANCE)\b/i
	},
	{
		countryCode: "ITA",
		pattern: /\b(?:REPUBBLICA\s+ITALIANA|CARTA\s+D['’]IDENTIT[AÀ]|PASSAPORTO|LUOGO\s+DI\s+NASCITA|DATA\s+DI\s+NASCITA|COGNOME)\b/i
	},
	{
		countryCode: "PRT",
		pattern: /\b(?:REP[UÚ]BLICA\s+PORTUGUESA|CART[AÃ]O\s+DE\s+CIDAD[AÃ]O|PASSAPORTE\s+PORTUGU[EÊ]S|NACIONALIDADE|DATA\s+DE\s+VALIDADE)\b/i
	},
	{
		countryCode: "NLD",
		pattern: /\b(?:KONINKRIJK\s+DER\s+NEDERLANDEN|NEDERLANDSE\s+IDENTITEITSKAART|RIJBEWIJS|GESLACHTSNAAM|VOORNAMEN)\b/i
	},
	{
		countryCode: "POL",
		pattern: /\b(?:RZECZPOSPOLITA\s+POLSKA|DOW[OÓ]D\s+OSOBISTY|PASZPORT|PRAWO\s+JAZDY|IMIONA\s+RODZIC[OÓ]W)\b/i
	},
	{
		countryCode: "CZE",
		pattern: /\b(?:[CČ]ESK[AÁ]\s+REPUBLIKA|OB[CČ]ANSK[YÝ]\s+PR[UŮ]KAZ|CESTOVN[IÍ]\s+PAS|P[RŘ][IÍ]JMEN[IÍ])\b/i
	},
	{
		countryCode: "SVK",
		pattern: /\b(?:SLOVENSK[AÁ]\s+REPUBLIKA|OB[CČ]IANSKY\s+PREUKAZ)\b/i
	},
	{
		countryCode: "LTU",
		pattern: /\b(?:LIETUVOS\s+RESPUBLIKA|ASMENS\s+TAPATYB[EĖ]S|PILIETYB[EĖ]|PAVARD[EĖ]|GALIOJA\s+IKI)\b/i
	},
	{
		countryCode: "HUN",
		pattern: /\b(?:MAGYARORSZ[AÁ]G|SZEM[EÉ]LYI\s+AZONOS[IÍ]T[OÓ])\b/i
	},
	{
		countryCode: "ROU",
		pattern: /\b(?:ROM[AÂ]NIA|CARTE\s+DE\s+IDENTITATE|PA[SȘ]APORT)\b/i
	},
	{
		countryCode: "SWE",
		pattern: /\b(?:SVERIGE|NATIONELLT\s+IDENTITETSKORT|K[OÖ]RKORT)\b/i
	},
	{
		countryCode: "NOR",
		pattern: /\b(?:KONGERIKET\s+NORGE|F[OØ]RERKORT)\b/i
	},
	{
		countryCode: "DNK",
		pattern: /\b(?:KONGERIGET\s+DANMARK|K[OØ]REKORT)\b/i
	},
	{
		countryCode: "FIN",
		pattern: /\b(?:SUOMI\s+FINLAND|HENKIL[OÖ]KORTTI|AJOKORTTI)\b/i
	},
	{
		countryCode: "TUR",
		pattern: /\b(?:T[UÜ]RK[Iİ]YE\s+CUMHUR[Iİ]YET[Iİ]|K[Iİ]ML[Iİ]K\s+KARTI)\b/i
	}
];
function Ti(e) {
	return e && e.trim().replace(/<+$/g, "").toUpperCase() || null;
}
function Ei(e, t) {
	let n = e.split("+").map((e) => e.trim()).filter(Boolean), r = t.split("+").map((e) => e.trim()).filter(Boolean);
	if (r.length === 0) return null;
	let i = r.filter((e) => !n.includes(e));
	return i.length === 0 ? null : [...n, ...i].join("+");
}
function Di(e) {
	if (!e) return {
		countryCode: null,
		nativeLang: null
	};
	for (let t of wi) if (t.pattern.test(e)) return {
		countryCode: t.countryCode,
		nativeLang: Ci[t.countryCode] ?? null
	};
	return {
		countryCode: null,
		nativeLang: null
	};
}
function Oi(e) {
	let t = e.baseLanguage?.trim() || "eng", n = {};
	if (e.customMap) for (let [t, r] of Object.entries(e.customMap)) {
		let e = Ti(t);
		e && r.trim() && (n[e] = r.trim());
	}
	let r = [Ti(e.issuingCountry), Ti(e.nationality)].filter((e) => !!e);
	for (let e of r) {
		if (n[e]) return Ei(t, n[e]);
		if (Si.has(e)) return null;
		if (Ci[e]) return Ei(t, Ci[e]);
	}
	if (e.rawText) {
		let r = Di(e.rawText);
		if (r.countryCode && n[r.countryCode]) return Ei(t, n[r.countryCode]);
		if (r.nativeLang) return Ei(t, r.nativeLang);
	}
	return null;
}
function ki(e) {
	let t = e.vizLanguages?.trim(), n = e.language?.trim() || "eng";
	return t ? {
		primaryLanguage: t,
		effectiveMode: e.vizLanguageMode ?? "standard",
		allowAutoFollowUp: !1
	} : e.vizLanguageMode === "standard" ? {
		primaryLanguage: n,
		effectiveMode: "standard",
		allowAutoFollowUp: !1
	} : e.vizLanguageMode === "multilingual" ? {
		primaryLanguage: xi,
		effectiveMode: "multilingual",
		allowAutoFollowUp: !1
	} : n !== "eng" && e.vizLanguageMode !== "auto" ? {
		primaryLanguage: n,
		effectiveMode: "standard",
		allowAutoFollowUp: !1
	} : {
		primaryLanguage: n,
		effectiveMode: "auto",
		allowAutoFollowUp: !0
	};
}
// src/scanner/vizParser.ts
var Ai = {
	JAN: "01",
	JANV: "01",
	ENE: "01",
	STY: "01",
	LED: "01",
	SAU: "01",
	FEB: "02",
	FEV: "02",
	FEVR: "02",
	LUT: "02",
	UNO: "02",
	VAS: "02",
	MAR: "03",
	MRZ: "03",
	BRE: "03",
	BŘE: "03",
	KOV: "03",
	APR: "04",
	AVR: "04",
	ABR: "04",
	KWI: "04",
	DUB: "04",
	BAL: "04",
	MAY: "05",
	MAI: "05",
	KVE: "05",
	KVĚ: "05",
	GEG: "05",
	JUN: "06",
	JUIN: "06",
	CRV: "06",
	ČRV: "06",
	BIR: "06",
	JUL: "07",
	JUIL: "07",
	LIP: "07",
	ČVC: "07",
	AUG: "08",
	AOUT: "08",
	AGO: "08",
	SIE: "08",
	SRP: "08",
	RGP: "08",
	SEP: "09",
	SEPT: "09",
	SET: "09",
	WRZ: "09",
	ZAR: "09",
	ZÁŘ: "09",
	RGS: "09",
	OCT: "10",
	OKT: "10",
	OUT: "10",
	PAZ: "10",
	PAŹ: "10",
	RIJ: "10",
	ŘÍJ: "10",
	NOV: "11",
	LIS: "11",
	LAP: "11",
	DEC: "12",
	DECEMB: "12",
	DEZ: "12",
	DIC: "12",
	PRO: "12",
	GRU: "12"
};
function ji(e) {
	if (!e) return null;
	let t = e.toUpperCase().replace(/\s+/g, " ").trim(), n = t.match(/\b((?:19|20)\d{2})[-./](\d{1,2})[-./](\d{1,2})\b/);
	if (n) {
		let [, e, t, r] = n;
		if (+t >= 1 && +t <= 12 && +r >= 1 && +r <= 31) return `${e}-${t.padStart(2, "0")}-${r.padStart(2, "0")}`;
	}
	if (n = t.match(/\b(\d{1,2})\s+([A-Z\u00C0-\u024F]{3,6})(?:\/[A-Z\u00C0-\u024F]{2,6})?\s+((?:19|20)\d{2})\b/), n) {
		let [, e, t, r] = n, i = Ai[t];
		if (i && +e >= 1 && +e <= 31) return `${r}-${i}-${e.padStart(2, "0")}`;
	}
	if (n = t.match(/\b([A-Z\u00C0-\u024F]{3,6})\s+(\d{1,2}),?\s+((?:19|20)\d{2})\b/), n) {
		let [, e, t, r] = n, i = Ai[e];
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
function Mi(e) {
	let t = [];
	for (let n of [
		/\b(?:19|20)\d{2}[-./]\d{1,2}[-./]\d{1,2}\b/g,
		/\b\d{1,2}\s+[A-Za-z\u00C0-\u024F]{3,6}(?:\/[A-Za-z\u00C0-\u024F]{2,6})?\s+(?:19|20)\d{2}\b/g,
		/\b[A-Za-z\u00C0-\u024F]{3,6}\s+\d{1,2},?\s+(?:19|20)\d{2}\b/g,
		/\b\d{1,2}(?:[-./]|\s+)\d{1,2}(?:[-./]|\s+)(?:19|20)\d{2}\b/g
	]) {
		let r = e.match(n);
		if (r) for (let e of r) {
			let n = ji(e);
			n && !t.includes(n) && t.push(n);
		}
	}
	return t;
}
var Ni = [
	{
		field: "surname",
		patterns: [
			/\b(?:primer\s*apellido|segundo\s*apellido|1er\.?\s*apellido|2[oº]\.?\s*apellido)\b/i,
			/\b(?:surname|sumarre|sumame|last\s*name|family\s*name|nom(?:\s*de\s*famille)?|familienname|nachname|apell?i?dos?|cognome|nazwisko|achternaam|geslachtsnaam|pavard[eė]|p[rř][ií]jmen[ií]|vezet[eé]kn[eé]v|efternamn|etternavn)\b/i,
			/^(?:1[.)]?\s*)?(?:surname|nom|name)\b/i
		]
	},
	{
		field: "givenNames",
		patterns: [/\b(?:given\s*names?|first\s*names?|forenames?|pr[eé]noms?|vornamen?|vorname|nombres?|nome(?:\s*pr[oó]prio)?|imiona|voornamen|vardai|jm[eé]n[ao]?|ut[oó]n[eé]v|f[oö]rnamn|fornavn)\b/i, /^(?:2[.)]?\s*)?(?:given\s*names?|first\s*name)\b/i]
	},
	{
		field: "fullName",
		patterns: [/\b(?:full\s*name|holder(?:'s)?\s*name|cardholder|name\s*of\s*bearer)\b/i]
	},
	{
		field: "documentNumber",
		patterns: [/\b(?:passport\s*no\.?|pasaporte\s*n[°o]?|passeport\s*n[°o]?|pass-?nr\.?|document\s*(?:no\.?|number|id)|card\s*no\.?|id\s*number|dl\s*no\.?|licen[cs]e\s*(?:no\.?|number)|no\.?\s*du\s*passeport|reisepass\s*nr|n[uú]mero\s*(?:del\s*)?documento|paso\s*nr|č[ií]slo\s*pasu)\b/i, /^(?:4d|5)[.)]\s*/i]
	},
	{
		field: "personalNumber",
		patterns: [/\b(?:personal\s*(?:no\.?|number|id)|national\s*(?:id|no\.?|number)|identity\s*no\.?|id\.?\s*no\.?|pesel|ssn|social\s*security|tax\s*id|cnp|dni|nif|nie|bsn|fiscal\s*code|codice\s*fiscale|asmens\s*kodas|rodn[eé]\s*[cč][ií]slo|osobn[ií]\s*[cč][ií]slo)\b/i]
	},
	{
		field: "nationality",
		patterns: [/\b(?:nationalit[yé]|naticnalt[yé]|staatsangeh[oö]rigkeit|nacionalidad|nacionalidade|nazionalit[aà]|obywatelstwo|citizenship|pilietyb[eė]|st[aá]tn[ií]\s*p[rř][ií]slu[sš]nost|nationaliteit)\b/i]
	},
	{
		field: "issuingCountry",
		patterns: [/\b(?:issuing\s*(?:state|country)|country\s*code|state\s*of\s*issue|pays\s*[eé]metteur|c[oó]digo|cdigo|code\s*\/\s*code|valstyb[eė]s\s*kodas|k[oó]d\s*st[aá]tu)\b/i]
	},
	{
		field: "dateOfBirth",
		patterns: [/\b(?:date\s*of\s*birth|birth\s*date|dob|born\s*on|date\s*de\s*naissance|geburtsdatum|geburtstag|fecha\s*de\s*nacimiento|data\s*de\s*nascimento|data\s*di\s*nascita|data\s*urodzenia|geboortedatum|gimimo\s*data|datum\s*narozen[ií])\b/i, /^(?:3)[.)]\s*/i]
	},
	{
		field: "placeOfBirth",
		patterns: [/\b(?:place\s*of\s*b(?:ir|e)th|birth\s*place|birthplace|lieu\s*de\s*naissance|geburtsort|lugar\s*de\s*nacimiento|naturalidade|luogo\s*di\s*nascita|miejsce\s*urodzenia|geboorteplaats|gimimo\s*vieta|m[ií]sto\s*narozen[ií])\b/i]
	},
	{
		field: "parents",
		patterns: [/\b(?:h[iy]j?o\s*\/?\s*a?\s*de|hijos?\s*de|parents?|filiation|nom\s*des\s*parents|imiona\s*rodzic[oó]w)\b/i]
	},
	{
		field: "dateOfIssue",
		patterns: [/\b(?:date\s*of\s*issue|issue\s*date|issued(?:\s*on)?|iss|date\s*de\s*d[eé]livrance|ausstellungsdatum|fecha\s*de\s*expedici[oó]n|data\s*de\s*emiss[aã]o|rilasciato\s*il|data\s*wydania|datum\s*[\/|]\s*[do]?[ao]te|i[sš]davimo\s*data|datum\s*vyd[aá]n[ií]|afgiftedatum)\b/i, /^(?:4a)[.)]\s*/i]
	},
	{
		field: "dateOfExpiry",
		patterns: [/\b(?:date\s*of\s*expir(?:y|ation)|expir(?:y|es|ation)(?:\s*date)?|valid\s*(?:until|thru|to)|exp|date\s*d['’]expiration|g[uü]ltig\s*bis|fecha\s*de\s*caducidad|data\s*de\s*validade|scadenza|data\s*wa[zż]no[sś]ci|galioja\s*iki|platnost\s*do|geldig\s*tot)\b/i, /^(?:4b)[.)]\s*/i]
	},
	{
		field: "sex",
		patterns: [/\b(?:sex|gender|sexe|geschlecht|sexo|sesso|p[lł]e[cć]|lytis|pohlav[ií]|geslacht)\b/i]
	},
	{
		field: "issuingAuthority",
		patterns: [/\b(?:authorit(?:y|ies)|issuing\s*(?:authority|office|agency)|autorit[eéa]|beh[oö]rde|behdrde|autoridad|autoridade|wydany\s*przez|organ\s*wydaj[aą]cy|equipo|i[sš]dav[eė]|vydal)\b/i, /^(?:4c|9)[.)]\s*/i]
	},
	{
		field: "address",
		patterns: [/\b(?:address|anschrift|residence|domicilio|domicile|adresse|wohnsitz|direcci[oó]n|morada|indirizzo|adres|adresa)\b/i, /^(?:8)[.)]\s*/i]
	},
	{
		field: "licenseClass",
		patterns: [/\b(?:class|category|categories|cat[eé]gorie|klasse|categor[ií]a|kategorie|kategorija)\b/i, /^(?:9)[.)]\s*/i]
	},
	{
		field: "restrictions",
		patterns: [/\b(?:restrictions?|rest|conditions|auflagen|omezen[ií])\b/i, /^(?:12)[.)]\s*/i]
	},
	{
		field: "endorsements",
		patterns: [/\b(?:endorsements?|end)\b/i]
	},
	{
		field: "height",
		patterns: [/\b(?:height|hgt|haigh|gr[oö][sß]e|grobe|taille|estatura|altura|statura|wzrost|[uū]gis|v[yý][sš]ka|lengte)\b/i]
	},
	{
		field: "eyeColor",
		patterns: [/\b(?:eye\s*colou?r|colour\s*of\s*[es]yes|augenfarbe|avgenfarbe|avg[eo]n\w*|couleur\s*des\s*yeux|covl[eo]ur\s*des\s*ye\w*|yeux|augen|ojos|occhi|barva\s*o[cč][ií])\b/i]
	},
	{
		field: "hairColor",
		patterns: [/\b(?:hair|hair\s*colou?r|cheveux|haare)\b/i]
	}
], Pi = [/\b(?:doktorgrad|doctoral\s*degr|degn?\s*ree|grade\s*de\s*docteur|ordens|rdens|oder\s*k[uü]nst|k[uü]nstlername|kinermamo|kinlenamo|kintlemamo|lername|no[em]\s+de\s+religion|rotgious|otgious|religious\s*name|stage\s*or\s*pen|nom\s*d['’]?artiste|pseudonyn|pseudonym|signature|unterschrift|firma\s*del\s*titular|holder['’]?s\s*signature|para[sš]as|podpis)\b/i];
function Fi(e, t) {
	let n = e.indexOf(":");
	if (n !== -1 && n < 40) return e.slice(n + 1).trim();
	let r = e;
	for (let e of t) {
		let t = new RegExp(e.source, e.flags.includes("g") ? e.flags : `${e.flags}g`);
		r = r.replace(t, "");
	}
	return r.replace(/^[\s/:|.\-–—]+/, "").replace(/^(?:[\/|][A-Za-z\u00C0-\u024F\s]+)+[:\-]?\s*/, "").trim();
}
function Ii(e, t) {
	if (e.includes(":")) return !1;
	if (/[\/|]/.test(e) && !/\d{1,2}\/\d{1,2}/.test(e)) return !0;
	let n = Fi(e, t.patterns);
	return n.length <= 2 || (t.field === "height" || t.field === "dateOfIssue" || t.field === "dateOfBirth" || t.field === "dateOfExpiry") && !/\d/.test(n);
}
function Li(e) {
	return Pi.some((t) => t.test(e)) ? !0 : Ni.some((t) => t.patterns.some((n) => n.test(e) && Ii(e, t)));
}
function Ri(e) {
	return Pi.some((t) => t.test(e)) ? !0 : Ni.some((t) => t.patterns.some((t) => t.test(e)));
}
function zi(e) {
	let t = e.replace(/\s+/g, "");
	return !!(/^[A-Z0-9<]{22,}$/.test(t) && (t.includes("<") || /\d{5,}/.test(t)));
}
function Bi(e, t = !1) {
	let n = e.replace(/^[\s=•·|>~_-]+/g, "").replace(/\s+[*•·|>~]+$/g, "").replace(/~/g, "");
	return n = t ? n.replace(/([A-Z\u00C0-\u024F]{2,}STRASSE)[-.\s]+\s*(\d)/gi, "$1 $2").replace(/([A-Z\u00C0-\u024F]{3,})[-~]\s+(\d)/gi, "$1 $2").replace(/(\d)\.$/, "$1") : n.replace(/\s+\d$/g, ""), n.replace(/\s+/g, " ").trim();
}
function Vi(e) {
	let t = e.toUpperCase();
	return /\b(?:PASSPORT|PASSEPORT|PASAPORTE|REISEPASS|PASSAPORTO|PASZPORT|PASAS|CESTOVN[IÍ]\s*PAS)\b/.test(t) ? "passport" : /\b(?:DRIVER(?:'S)?\s*LICEN[CS]E|DRIVING\s*LICEN[CS]E|PERMIS\s*DE\s*CONDUIRE|F[UÜ]HRERSCHEIN|PRAWO\s*JAZDY|RIJBEWIJS|CARN[EÉ]\s*DE\s*CONDUCIR)\b/.test(t) ? "driver_license" : /\b(?:RESIDENCE\s*PERMIT|TITRE\s*DE\s*S[EÉ]JOUR|AUFENTHALTSTITEL|KARTA\s*POBYTU)\b/.test(t) ? "residence_permit" : /\b(?:VISA|VISUM)\b/.test(t) ? "visa" : /\b(?:IDENTITY\s*CARD|ID\s*CARD|NATIONAL\s*ID|CARTE\s*NATIONALE|PERSONALAUSWEIS|ANSCHRIFT|AUGENFARBE|DOW[OÓ]D\s*OSOBISTY|CARTA\s*D'IDENTIT[AÀ]|DNI|ASMENS\s*TAPATYB[EĖ]S|OB[CČ]ANSK[YÝ]\s*PR[UŮ]KAZ|IDENTITEITSKAART|CART[AÃ]O\s*DE\s*CIDAD[AÃ]O)\b/.test(t) ? "id_card" : null;
}
function Hi(e) {
	let t = e.trim().toUpperCase();
	return /^(?:M|MALE|HOMME|M[AÄ]NNLICH|MASCULINO|M[EĘ][ZŻ]CZYZNA|MU[ZŽ]|VYR\.?)$/.test(t) ? "M" : /^(?:F|FEMALE|FEMME|WEIBLICH|FEMENINO|KOBIETA|[ZŽ]ENA|MOT\.?|V)$/.test(t) ? "F" : /^(?:X|NON[- ]?BINARY|OTHER|DIVERS)$/.test(t) ? "X" : t.startsWith("M/") || t === "M" ? "M" : t.startsWith("F/") || t === "F" ? "F" : null;
}
function Ui(e, t) {
	let n = Math.max(12, e.bbox.y1 - e.bbox.y0);
	if (t.bbox.y0 < e.bbox.y0 + n * .25) return !1;
	let r = e.bbox.x0 - 120, i = Math.max(e.bbox.x1 + 60, e.bbox.x0 + 360), a = (t.bbox.x0 + t.bbox.x1) / 2, o = Math.abs(t.bbox.x0 - e.bbox.x0) <= 130, s = t.bbox.x0 >= r && a <= i;
	return o || s;
}
function Wi(e) {
	return !(e.length < 2 || /[{}|\[\]<>~]/.test(e) || !/[A-Z\u00C0-\u024F]{2,}/.test(e));
}
function Gi(e, t) {
	let n = (t ?? []).map((e) => ({
		text: e.text.replace(/\s+/g, " ").trim(),
		bbox: e.bbox
	})).filter((e) => e.text.length > 0 && !zi(e.text)).sort((e, t) => e.bbox.y0 - t.bbox.y0 || e.bbox.x0 - t.bbox.x0), r = n.length > 0 ? n.map((e) => e.text) : e.split(/\r?\n/).map((e) => e.replace(/\s+/g, " ").trim()).filter((e) => e.length > 0 && !zi(e)), i = {
		documentTypeHint: Vi(e),
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
		if (Pi.some((e) => e.test(t))) continue;
		let o = a ? n[e] : null, s = t.match(/^([A-Za-z\u00C0-\u024F][A-Za-z0-9\u00C0-\u024F\s/().'-]{1,32}):\s*(.+)$/), c = !1;
		for (let s of Ni) {
			for (let l of s.patterns) if (l.test(t)) {
				c = !0;
				let l = s.field === "sex" ? 1 : 2, u = [], d = null, f = null;
				if (o) for (let t = e + 1; t < n.length; t++) {
					let e = n[t];
					if (!Ui(o, e)) continue;
					if (Ri(e.text)) break;
					if (e.text.length < l) continue;
					if (s.field === "placeOfBirth" && !Wi(e.text)) {
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
				let p = Ii(t, s) ? "" : Fi(t, s.patterns), m = p, h = 0;
				if ((!m || m.length < l) && (u.length > 0 ? m = u[0] : !a && e + 1 < r.length && !Li(r[e + 1]) && (m = r[e + 1], h = 1)), !m) continue;
				if (s.field === "dateOfBirth" || s.field === "dateOfIssue" || s.field === "dateOfExpiry") {
					let e = ji(m);
					e && !i[s.field] && (i[s.field] = e);
				} else if (s.field === "sex") {
					let e = Hi(m);
					e && !i.sex && (i.sex = e);
				} else if (s.field === "address" || s.field === "placeOfBirth") {
					let t = s.field === "address", n = [];
					if (a && !p && u.length > 0) n = u.map((e) => Bi(e, t)).filter((e) => e.length >= 2);
					else {
						n = [Bi(m, t)];
						let i = s.field === "address" ? 3 : 2, a = e + h + 1;
						for (; n.length < i && a < r.length && !Ri(r[a]);) {
							let e = Bi(r[a], t);
							if (e.length >= 2 && !/^\d{1,2}$/.test(e)) {
								if (s.field === "placeOfBirth" && !Wi(e)) break;
								n.push(e);
							}
							a++;
						}
					}
					!i[s.field] && n.length > 0 && (i[s.field] = n.join(", "));
				} else if (s.field === "parents") i.parents ||= Bi(m);
				else if (s.field === "height") {
					let e = Bi(m);
					/\d/.test(e) && !i.height && (i.height = e);
				} else if (s.field === "surname") {
					let e = (a && !p && u.length > 0 ? u.map((e) => Bi(e)).filter(Boolean) : [Bi(m)].filter(Boolean)).join(" ");
					e && (i.surname ? /segundo\s*apellido|2[oº]\.?\s*apellido/i.test(t) && !i.surnames.includes(e) && (i.surnames = [...i.surnames, e], i.surname = i.surnames.join(" ")) : (i.surname = e, i.surnames = e.split(/\s+/).filter(Boolean)));
				} else i[s.field] || (i[s.field] = Bi(m));
				break;
			}
			if (c) break;
		}
		if (!c && s) {
			let e = s[1].trim(), t = Bi(s[2]);
			e && t && t.length <= 100 && (i.unmappedKeyValues[e] = t);
		}
	}
	let o = Mi(r.join("\n")).sort();
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
var Ki = "ocrb_int", qi = "https://cdn.jsdelivr.net/gh/Shreeshrii/tessdata_ocrb@master";
function Ji(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date(), i = r.getFullYear() - n.getFullYear(), a = r.getMonth() - n.getMonth();
	return (a < 0 || a === 0 && r.getDate() < n.getDate()) && i--, i >= 0 && i <= 130 ? i : null;
}
function Yi(e) {
	if (!e) return null;
	let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!t) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
	if (Number.isNaN(n.getTime())) return null;
	let r = /* @__PURE__ */ new Date();
	return r.setHours(0, 0, 0, 0), n < r;
}
function Xi(e, t, n) {
	if (e) {
		let t = e.documentCode.toUpperCase();
		if (t.startsWith("P")) return "passport";
		if (t.startsWith("V")) return "visa";
		if (t.startsWith("AC") || t.startsWith("AR") || n === "residence_permit") return "residence_permit";
		if (t.startsWith("I") || t.startsWith("A") || t.startsWith("C")) return "id_card";
	}
	if (t?.aamva) {
		if (t.aamva.subfileType === "ID") return "id_card";
		if (t.aamva.subfileType === "DL" || t.aamva.licenseClass) return "driver_license";
	}
	return n ?? "unknown";
}
function Zi(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function Qi(e) {
	return Zi(e.replace(/[Ää]/g, "AE").replace(/[Öö]/g, "OE").replace(/[Üü]/g, "UE").replace(/ß/g, "SS").replace(/[Øø]/g, "OE").replace(/[Ææ]/g, "AE").replace(/[Åå]/g, "AA").replace(/[Łł]/g, "L").replace(/[Đđ]/g, "D"));
}
function $i(e) {
	return /[^\u0000-\u007F]/.test(e);
}
function ea(e, t, n, r, i) {
	let a = e != null && String(e).trim() !== "", o = i != null && String(i).trim() !== "", s = t != null && String(t).trim() !== "";
	return a ? (r[n] = s ? "MRZ+VIZ" : "MRZ", e) : o ? (r[n] = s ? "BARCODE+VIZ" : "BARCODE", i) : s ? (r[n] = "VIZ", t) : null;
}
function ta(e, t, n, r, i) {
	let a = e?.trim() || null, o = t?.trim() || null, s = n?.trim() || null;
	if (a && s) {
		i[r] = "MRZ+VIZ";
		let e = Zi(a), t = Zi(s), n = Qi(s);
		return $i(s) && (t === e || n === e) || t.length > e.length && e.length >= 8 && t.startsWith(e.slice(0, 8)) ? s : a;
	}
	return a ? (i[r] = "MRZ", a) : o ? (i[r] = s ? "BARCODE+VIZ" : "BARCODE", o) : s ? (i[r] = "VIZ", s) : null;
}
function na(e, t, n, r) {
	let i = e?.trim() || null, a = t?.trim() || null;
	if (!i) return a;
	if (!a) return i;
	if (Zi(i) === Zi(a)) {
		if ($i(a) && !$i(i)) return a;
		if ($i(i) && !$i(a)) return i;
	}
	return $i(a) && !$i(i) && r >= n - 5 || r >= n + 4 && a.length >= Math.max(2, i.length - 1) || r >= n - 2 && a.length > i.length + 2 || r > n ? a : i;
}
function ra(e, t, n, r) {
	let i = na(e.surname, n.surname, t, r), a = i === n.surname && n.surnames.length > 0 ? n.surnames : e.surnames.length > 0 ? e.surnames : i ? i.split(/\s+/).filter(Boolean) : [];
	return {
		documentTypeHint: e.documentTypeHint ?? n.documentTypeHint,
		surname: i,
		surnames: a,
		givenNames: na(e.givenNames, n.givenNames, t, r),
		fullName: na(e.fullName, n.fullName, t, r),
		documentNumber: e.documentNumber ?? n.documentNumber,
		personalNumber: e.personalNumber ?? n.personalNumber,
		nationality: na(e.nationality, n.nationality, t, r),
		issuingCountry: na(e.issuingCountry, n.issuingCountry, t, r),
		dateOfBirth: e.dateOfBirth ?? n.dateOfBirth,
		dateOfIssue: e.dateOfIssue ?? n.dateOfIssue,
		dateOfExpiry: e.dateOfExpiry ?? n.dateOfExpiry,
		sex: e.sex ?? n.sex,
		placeOfBirth: na(e.placeOfBirth, n.placeOfBirth, t, r),
		address: na(e.address, n.address, t, r),
		parents: na(e.parents, n.parents, t, r),
		issuingAuthority: na(e.issuingAuthority, n.issuingAuthority, t, r),
		licenseClass: e.licenseClass ?? n.licenseClass,
		restrictions: na(e.restrictions, n.restrictions, t, r),
		endorsements: na(e.endorsements, n.endorsements, t, r),
		height: e.height ?? n.height,
		eyeColor: na(e.eyeColor, n.eyeColor, t, r),
		hairColor: na(e.hairColor, n.hairColor, t, r),
		detectedLines: r >= t && n.detectedLines.length > 0 ? n.detectedLines : e.detectedLines,
		unmappedKeyValues: {
			...e.unmappedKeyValues,
			...n.unmappedKeyValues
		}
	};
}
function ia(e) {
	return e.toUpperCase().replace(/[ODQ]/g, "0").replace(/[ILT]/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/G/g, "6").replace(/B/g, "8");
}
function aa(e, t, n, r) {
	if (e?.documentNumber && n) {
		let t = e.checkDigits.find((e) => e.field === "documentNumber"), i = e.documentNumber.trim().toUpperCase(), a = n.trim().toUpperCase();
		if (t && !t.valid && i.length === a.length && ia(i) === ia(a)) return r.documentNumber = "MRZ+VIZ", a;
	}
	return ea(e?.documentNumber, n, "documentNumber", r, t);
}
function oa(e) {
	if (!e) return [];
	let t = [];
	for (let n of e) for (let e of n.paragraphs) for (let n of e.lines) {
		let e = "";
		if (n.words && n.words.length > 0) for (let t = 0; t < n.words.length; t++) {
			let r = n.words[t], i = (r.text || "").trim();
			if (i) {
				if (t > 0 && e.length > 0) {
					let a = n.words[t - 1], o = (a.text || "").trim(), s = r.bbox.x0 - a.bbox.x1, c = ((a.bbox.x1 - a.bbox.x0) / Math.max(1, o.length) + (r.bbox.x1 - r.bbox.x0) / Math.max(1, i.length)) / 2;
					/^[A-Z\u00C0-\u024F]{2,}$/.test(o) && /^[A-Z\u00C0-\u024F]{2,}$/.test(i) && s < c * 1.02 ? e += i : e += " " + i;
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
function sa(e, t, n, r, i) {
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
function ca(e, t, n, r, i) {
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
function la(e, t) {
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
			let r = e.syms[n], o = r.bbox.x1 - r.bbox.x0, s = sa(t, r.bbox.x0, r.bbox.y0, r.bbox.x1, r.bbox.y1);
			if (n + 1 < e.syms.length) {
				let c = e.syms[n + 1], l = c.bbox.x1 - c.bbox.x0, u = c.bbox.x1 - r.bbox.x0;
				if (c.bbox.x0 <= r.bbox.x1 + 2 && u <= i * 1.75) {
					let o = sa(t, c.bbox.x0, c.bbox.y0, c.bbox.x1, c.bbox.y1);
					if (s.isChevron || o.isChevron) {
						a += "<";
						let t = Math.max(r.bbox.x1, c.bbox.x1);
						for (n++; n + 1 < e.syms.length && e.syms[n + 1].bbox.x0 <= t + 2 && e.syms[n + 1].bbox.x1 - r.bbox.x0 <= i * 1.75;) t = Math.max(t, e.syms[n + 1].bbox.x1), n++;
						continue;
					}
				}
				if (u <= i * 1.45 && (o < i * .8 || l < i * .48) && sa(t, r.bbox.x0, Math.min(r.bbox.y0, c.bbox.y0), c.bbox.x1, Math.max(r.bbox.y1, c.bbox.y1)).isChevron) {
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
				let n = e.syms.map((e) => e.bbox.x1 - e.bbox.x0).filter((e) => e > 12).sort((e, t) => e - t), r = n[Math.floor(n.length / 2)] || 30, { inkX0: a, inkX1: o } = ca(t, e.bbox.x0, e.bbox.y0, e.bbox.x1, e.bbox.y1), c = a + r / 2, l = (o - r / 2 - c) / (s - 1), u = "";
				for (let n = 0; n < s; n++) {
					let i = c + n * l, a = i - l * .36, o = i + l * .36, s = sa(t, a, e.bbox.y0, o, e.bbox.y1);
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
						sa(t, f.bbox.x0, f.bbox.y0, f.bbox.x1, f.bbox.y1).isChevron ? u += "<" : e > r * 1.45 && s.isThinBar || (n === "T" || n === "K" || n === "L") && s.isThinBar || n === "T" && s.gw <= s.gh * .48 ? u += "1" : n === "L" && s.isZee ? u += "Z" : (n === "I" || n === "1" || n === "L") && s.isNine ? u += "9" : u += n;
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
function ua(e) {
	let t = e.rawLines.join("").split("<").length - 1, n = /^[A-Z]{1,3}$/.test(e.issuingCountry);
	return e.validCount * 100 + (e.allCheckDigitsValid ? 50 : 0) + (n ? 20 : 0) + (e.dateOfBirth ? 15 : 0) + (e.dateOfExpiry ? 15 : 0) + (e.surname ? 10 : 0) + (e.givenNames ? 10 : 0) + Math.min(t, 60);
}
function da(e) {
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
function fa(e, t, n, r) {
	let i = 0;
	e && (i += e.validCount * 120, e.allCheckDigitsValid && (i += 200), /^[PVIAC]/.test(e.documentCode) && (i += 60), e.dateOfBirth && (i += 35), e.dateOfExpiry && (i += 35), e.surname && (i += 30), e.givenNames && (i += 25), e.documentNumber && (i += 25));
	let a = da(t);
	i += a * 28, t.documentTypeHint && (i += 25), i += n * .8;
	let o = (r.match(/[A-Za-z\u00C0-\u024F]{3,}/g) || []).length;
	return i += Math.min(o, 30) * 1.5, i;
}
function pa(e) {
	let t = (e % 360 + 360) % 360;
	return Math.round(t * 10) / 10;
}
function ma(e, t, n, r) {
	if (n) return (i) => {
		n({
			stage: i.stage,
			progress: Math.min(99, Math.round(e + i.progress / 100 * t)),
			message: r ? `${r}: ${i.message}` : i.message
		});
	};
}
var ha = class {
	constructor(e = {}) {
		this.worker = null, this.workerLang = null, this.workerConfigKey = null, this.vizNativeWorker = null, this.vizNativeLang = null, this.vizNativeConfigKey = null, this.vizNativeFailedLangs = /* @__PURE__ */ new Set(), this.mrzWorker = null, this.mrzWorkerConfigKey = null, this.mrzOcrbFailed = !1, this.preprocessWorker = new Ir(), this.activeStageCallback = null, this.activeStage = "initializing_ocr", this.defaultWorkerConfig = { ...e };
	}
	mergeWorkerConfig(e) {
		return {
			workerPath: e.workerPath ?? this.defaultWorkerConfig.workerPath,
			corePath: e.corePath ?? this.defaultWorkerConfig.corePath,
			langPath: e.langPath ?? this.defaultWorkerConfig.langPath,
			workerBlobURL: e.workerBlobURL ?? this.defaultWorkerConfig.workerBlobURL,
			useWorkerPreprocessing: e.useWorkerPreprocessing ?? this.defaultWorkerConfig.useWorkerPreprocessing ?? !0,
			mrzModel: e.mrzModel ?? this.defaultWorkerConfig.mrzModel ?? "ocrb",
			mrzLanguage: e.mrzLanguage ?? this.defaultWorkerConfig.mrzLanguage,
			mrzLangPath: e.mrzLangPath ?? this.defaultWorkerConfig.mrzLangPath,
			mrzGzip: e.mrzGzip ?? this.defaultWorkerConfig.mrzGzip,
			vizLanguageMode: e.vizLanguageMode ?? this.defaultWorkerConfig.vizLanguageMode,
			vizLanguages: e.vizLanguages ?? this.defaultWorkerConfig.vizLanguages,
			vizLanguageMap: e.vizLanguageMap ?? this.defaultWorkerConfig.vizLanguageMap
		};
	}
	abortInFlightWorkers() {
		if (this.preprocessWorker.abortActiveWorker(), this.worker) {
			let e = this.worker;
			this.worker = null, this.workerLang = null, this.workerConfigKey = null, e.terminate().catch(() => {});
		}
		if (this.vizNativeWorker) {
			let e = this.vizNativeWorker;
			this.vizNativeWorker = null, this.vizNativeLang = null, this.vizNativeConfigKey = null, e.terminate().catch(() => {});
		}
		if (this.mrzWorker) {
			let e = this.mrzWorker;
			this.mrzWorker = null, this.mrzWorkerConfigKey = null, e.terminate().catch(() => {});
		}
	}
	createLoggerOption(e) {
		return (t) => {
			if (this.activeStageCallback && t.status === "recognizing text") {
				if (e === "full" && this.activeStage !== "recognizing_full" || e === "native" && this.activeStage !== "recognizing_viz_native" || e === "mrz" && this.activeStage !== "recognizing_mrz") return;
				let n = this.activeStage === "recognizing_full" ? 25 : this.activeStage === "recognizing_viz_native" ? 82 : 65, r = this.activeStage === "recognizing_full" ? 35 : this.activeStage === "recognizing_viz_native" ? 10 : 25, i = Math.round(n + (t.progress || 0) * r);
				this.activeStageCallback({
					stage: this.activeStage,
					progress: i,
					message: this.activeStage === "recognizing_full" ? "Reading document text & visual inspection zone…" : this.activeStage === "recognizing_viz_native" ? "Refining native-script diacritics & labels…" : "Running dedicated OCR-B MRZ strip verification…"
				});
			}
		};
	}
	async ensureWorker(e, t, n, r) {
		Q(r), this.activeStageCallback = n ?? null;
		let i = this.mergeWorkerConfig(t), a = JSON.stringify({
			workerPath: i.workerPath,
			corePath: i.corePath,
			langPath: i.langPath,
			workerBlobURL: i.workerBlobURL
		});
		if (this.worker && this.workerLang === e && this.workerConfigKey === a) return this.worker;
		if (this.worker) {
			let e = this.worker;
			this.worker = null, this.workerLang = null, this.workerConfigKey = null, await $(e.terminate(), r, () => this.abortInFlightWorkers());
		}
		Q(r), this.activeStage = "initializing_ocr", n?.({
			stage: "initializing_ocr",
			progress: 14,
			message: "Initializing client-side Tesseract OCR engine…"
		});
		let o = { logger: this.createLoggerOption("full") };
		i.workerPath && (o.workerPath = i.workerPath), i.corePath && (o.corePath = i.corePath), i.langPath && (o.langPath = i.langPath), i.workerBlobURL !== void 0 && (o.workerBlobURL = i.workerBlobURL);
		let s = await $((0, W.createWorker)(e, 1, o, {
			load_system_dawg: "0",
			load_freq_dawg: "0"
		}).then((e) => (r?.aborted && e.terminate().catch(() => {}), e)), r, () => this.abortInFlightWorkers());
		return Q(r), this.worker = s, this.workerLang = e, this.workerConfigKey = a, s;
	}
	async ensureNativeVizWorker(e, t, n, r) {
		Q(r), this.activeStageCallback = n ?? null;
		let i = this.mergeWorkerConfig(t), a = JSON.stringify({
			workerPath: i.workerPath,
			corePath: i.corePath,
			langPath: i.langPath,
			workerBlobURL: i.workerBlobURL
		});
		if (this.vizNativeFailedLangs.has(`${e}:${a}`)) return null;
		if (this.vizNativeWorker && this.vizNativeLang === e && this.vizNativeConfigKey === a) return this.vizNativeWorker;
		if (this.vizNativeWorker) {
			let e = this.vizNativeWorker;
			this.vizNativeWorker = null, this.vizNativeLang = null, this.vizNativeConfigKey = null, await $(e.terminate(), r, () => this.abortInFlightWorkers());
		}
		try {
			Q(r), this.activeStage = "recognizing_viz_native", n?.({
				stage: "recognizing_viz_native",
				progress: 82,
				message: `Loading native VIZ language pack (${e})…`
			});
			let t = { logger: this.createLoggerOption("native") };
			i.workerPath && (t.workerPath = i.workerPath), i.corePath && (t.corePath = i.corePath), i.langPath && (t.langPath = i.langPath), i.workerBlobURL !== void 0 && (t.workerBlobURL = i.workerBlobURL);
			let o = await $((0, W.createWorker)(e, 1, t, {
				load_system_dawg: "0",
				load_freq_dawg: "0"
			}).then((e) => (r?.aborted && e.terminate().catch(() => {}), e)), r, () => this.abortInFlightWorkers());
			return Q(r), this.vizNativeWorker = o, this.vizNativeLang = e, this.vizNativeConfigKey = a, o;
		} catch (t) {
			if (Nr(t)) throw t;
			return this.vizNativeFailedLangs.add(`${e}:${a}`), null;
		}
	}
	async ensureMrzWorker(e, t, n, r) {
		Q(r), this.activeStageCallback = n ?? null;
		let i = this.mergeWorkerConfig(t);
		if ((i.mrzModel ?? "ocrb") === "standard") return {
			worker: e,
			modelUsed: "standard"
		};
		let a = i.mrzLanguage ?? Ki, o = i.mrzLangPath ?? qi, s = i.mrzGzip ?? !1, c = JSON.stringify({
			workerPath: i.workerPath,
			corePath: i.corePath,
			workerBlobURL: i.workerBlobURL,
			mrzLang: a,
			mrzLangPath: o,
			mrzGzip: s
		});
		if (this.mrzWorker && this.mrzWorkerConfigKey === c) return {
			worker: this.mrzWorker,
			modelUsed: "ocrb"
		};
		if (this.mrzOcrbFailed && this.mrzWorkerConfigKey === c) return {
			worker: e,
			modelUsed: "standard"
		};
		if (this.mrzWorker) {
			let e = this.mrzWorker;
			this.mrzWorker = null, this.mrzWorkerConfigKey = null, await $(e.terminate(), r, () => this.abortInFlightWorkers());
		}
		try {
			Q(r), this.activeStage = "initializing_ocr", n?.({
				stage: "initializing_ocr",
				progress: 16,
				message: "Loading specialized OCR-B MRZ recognition model…"
			});
			let e = {
				langPath: o,
				gzip: s,
				logger: this.createLoggerOption("mrz")
			};
			i.workerPath && (e.workerPath = i.workerPath), i.corePath && (e.corePath = i.corePath), i.workerBlobURL !== void 0 && (e.workerBlobURL = i.workerBlobURL);
			let t = await $((0, W.createWorker)(a, 1, e, {
				load_system_dawg: "0",
				load_freq_dawg: "0"
			}).then((e) => (r?.aborted && e.terminate().catch(() => {}), e)), r, () => this.abortInFlightWorkers());
			return Q(r), this.mrzWorker = t, this.mrzWorkerConfigKey = c, this.mrzOcrbFailed = !1, {
				worker: t,
				modelUsed: "ocrb"
			};
		} catch (t) {
			if (Nr(t)) throw t;
			return this.mrzWorkerConfigKey = c, this.mrzOcrbFailed = !0, {
				worker: e,
				modelUsed: "standard"
			};
		}
	}
	async preprocessWithWorkerOrFallback(e, t, n, r) {
		if (Q(r), n && this.preprocessWorker.isAvailable()) {
			let n = await this.preprocessWorker.preprocessDocument(e, t, r);
			if (n) return {
				preprocessed: n,
				viaWorker: !0
			};
		}
		return Q(r), {
			preprocessed: await $(_e(e, t), r),
			viaWorker: !1
		};
	}
	async runOrientationPass(e, t, n, r, i, a, o, s, c, l = !0, u) {
		Q(u);
		let { preprocessed: d, viaWorker: f } = await this.preprocessWithWorkerOrFallback(e, {
			preprocess: a,
			rotation: r,
			deskewDegrees: i
		}, s, u);
		Q(u), l && (this.activeStage = "recognizing_full", c?.({
			stage: "recognizing_full",
			progress: 25,
			message: "Reading document text & visual inspection zone…"
		})), await $(t.setParameters({
			tessedit_pageseg_mode: W.PSM.SPARSE_TEXT,
			tessedit_char_whitelist: ""
		}), u, () => this.abortInFlightWorkers());
		let p = a ? d.enhancedDataUrl : d.originalDataUrl, m = await $(t.recognize(p, {}, { blocks: !0 }), u, () => this.abortInFlightWorkers()), h = m.data.text || "", g = m.data.confidence || 0;
		if (h.trim().split(/\r?\n/).filter(Boolean).length < 2) {
			Q(u), await $(t.setParameters({
				tessedit_pageseg_mode: W.PSM.AUTO,
				tessedit_char_whitelist: ""
			}), u, () => this.abortInFlightWorkers());
			let e = await $(t.recognize(p, {}, { blocks: !0 }), u, () => this.abortInFlightWorkers());
			(e.data.text || "").trim().length > h.trim().length && (m = e, h = e.data.text || "", g = e.data.confidence || 0);
		}
		let _ = oa(m.data.blocks), v = _.length > 0 ? _.map((e) => e.text).join("\n") : h, y = [], b = nt(h);
		b && y.push(b);
		let x = "", S = n.mrzModel ?? this.defaultWorkerConfig.mrzModel ?? "ocrb";
		if (o) {
			Q(u);
			let e = await this.ensureMrzWorker(t, n, c, u), r = e.worker;
			S = e.modelUsed, l && (this.activeStage = "recognizing_mrz", c?.({
				stage: "recognizing_mrz",
				progress: 65,
				message: S === "ocrb" ? "Running dedicated OCR-B MRZ strip verification…" : "Running high-contrast MRZ strip verification…"
			})), await $(r.setParameters({
				tessedit_pageseg_mode: W.PSM.SINGLE_BLOCK,
				tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<"
			}), u, () => this.abortInFlightWorkers());
			let i = async (e, t) => {
				Q(u);
				let n = await $(r.recognize(e, {}, { blocks: !0 }), u, () => this.abortInFlightWorkers()), i = (n.data.text || "").trim();
				i && !x && (x = i);
				let a = nt(i);
				a && y.push(a);
				let o = la(n.data.blocks, t);
				if (o.symbolRepairedText) {
					let e = nt(o.symbolRepairedText);
					e && y.push(e);
				}
				if (o.gridRepairedText) {
					let e = nt(o.gridRepairedText);
					e && (y.push(e), x = o.gridRepairedText);
				}
			};
			await i(d.mrzCropDataUrl, d.mrzGrayscale), y.some((e) => e.allCheckDigitsValid) || (l && c?.({
				stage: "recognizing_mrz",
				progress: 80,
				message: "Isolating lower passport MRZ band…"
			}), await i(d.mrzTightCropDataUrl, d.mrzTightGrayscale));
		}
		let C = null;
		y.length > 0 && (y.sort((e, t) => ua(t) - ua(e)), C = y[0]);
		let w = Gi(v, _), T = da(w), E = fa(C, w, g, v), D = C !== null && (C.allCheckDigitsValid || C.validCount >= 2 || C.validCount >= 1 && !!(C.surname || C.documentNumber) && g >= 48) || C === null && g >= 65 && T >= 4;
		return {
			coarse: r,
			preprocessed: d,
			usedWorkerPreprocess: f,
			cleanedFullText: v,
			vizLineBoxes: _,
			vizData: w,
			mrzData: C,
			mrzRawText: x,
			mrzModelUsed: S,
			confidence: g,
			probeScore: E,
			isConfidentUpright: D
		};
	}
	async runLightweightProbe(e, t, n, r, i, a, o) {
		Q(o);
		let { preprocessed: s, viaWorker: c } = await this.preprocessWithWorkerOrFallback(e, {
			preprocess: i,
			rotation: n,
			deskewDegrees: r
		}, a, o);
		await $(t.setParameters({
			tessedit_pageseg_mode: W.PSM.SPARSE_TEXT,
			tessedit_char_whitelist: ""
		}), o, () => this.abortInFlightWorkers());
		let l = i ? s.enhancedDataUrl : s.originalDataUrl, u = await $(t.recognize(l, {}, { blocks: !0 }), o, () => this.abortInFlightWorkers()), d = u.data.text || "", f = u.data.confidence || 0, p = oa(u.data.blocks), m = p.length > 0 ? p.map((e) => e.text).join("\n") : d, h = Gi(m, p);
		return {
			score: fa(nt(d), h, f, m),
			viaWorker: c
		};
	}
	async scan(e, t = {}) {
		let n = performance.now(), { language: r = "eng", preprocess: i = !0, enhanceMrzPass: a = !0, enableBarcodePass: o = !0, extractPortrait: s = !0, extractSignature: c = !0, detectSpecimen: l = !0, perspectiveCorrection: u = !0, corners: d, rotation: f = 0, deskewDegrees: p = 0, includeQualityReport: m = !0, enforceQualityGate: h = !1, qualityGateOptions: g, includePreviews: _ = !0, signal: v, workerPath: y, corePath: b, langPath: x, workerBlobURL: S, useWorkerPreprocessing: C, mrzModel: w, mrzLanguage: T, mrzLangPath: E, mrzGzip: D, vizLanguageMode: O, vizLanguages: k, vizLanguageMap: A, onProgress: j } = t;
		Q(v);
		let M = this.mergeWorkerConfig({
			workerPath: y,
			corePath: b,
			langPath: x,
			workerBlobURL: S,
			useWorkerPreprocessing: C,
			mrzModel: w,
			mrzLanguage: T,
			mrzLangPath: E,
			mrzGzip: D,
			vizLanguageMode: O,
			vizLanguages: k,
			vizLanguageMap: A
		}), N = M.useWorkerPreprocessing !== !1 && this.preprocessWorker.isAvailable(), P = ki({
			language: r,
			vizLanguageMode: M.vizLanguageMode,
			vizLanguages: M.vizLanguages
		}), F = t.autoRotate === void 0 ? f === 0 && p === 0 : t.autoRotate;
		j?.({
			stage: "preprocessing",
			progress: 4,
			message: u || d ? "Decoding document & checking 4-corner perspective…" : F ? "Decoding document & analyzing orientation…" : "Preprocessing image & isolating MRZ region…"
		});
		let I = null, L = null, R = !1;
		try {
			let t = await $(fe(e, N), v), r = t.surface;
			I = t.ownedBitmap, Q(v);
			let y = r, b;
			if (d) {
				j?.({
					stage: "detecting_perspective",
					progress: 8,
					message: "Applying 4-corner perspective rectification…"
				});
				let e = Xr([
					d.topLeft,
					d.topRight,
					d.bottomRight,
					d.bottomLeft
				]);
				if (N) {
					let t = await this.preprocessWorker.warpPerspective(r, e, v);
					t ? (L = t, y = t, R = !0) : y = ci(r, e);
				} else y = ci(r, e);
				let t = Math.abs(e.topLeft.x * e.topRight.y - e.topRight.x * e.topLeft.y + (e.topRight.x * e.bottomRight.y - e.bottomRight.x * e.topRight.y) + (e.bottomRight.x * e.bottomLeft.y - e.bottomLeft.x * e.bottomRight.y) + (e.bottomLeft.x * e.topLeft.y - e.topLeft.x * e.bottomLeft.y)) / 2;
				b = {
					applied: !0,
					autoDetected: !1,
					corners: e,
					sourceQuadAreaRatio: Math.round(t * 1e3) / 1e3
				};
			} else if (u) {
				j?.({
					stage: "detecting_perspective",
					progress: 8,
					message: "Detecting document borders for perspective correction…"
				});
				let e = oi(r);
				if (Q(v), e) {
					if (N) {
						let t = await this.preprocessWorker.warpPerspective(r, e.corners, v);
						t ? (L = t, y = t, R = !0) : y = ci(r, e.corners);
					} else y = ci(r, e.corners);
					b = e;
				} else b = {
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
			Q(v);
			let x;
			if ((m || h) && (h && j?.({
				stage: "quality_check",
				progress: 10,
				message: "Evaluating sharpness, glare & exposure quality gate…"
			}), x = await $(vi(y, g), v), Q(v), h && !x.passed)) throw new li(x);
			let S = p, C = [f];
			if (F) {
				Q(v), j?.({
					stage: "detecting_orientation",
					progress: 12,
					message: "Detecting document rotation & skew angle…"
				});
				let e = null;
				N && (e = await this.preprocessWorker.sampleDownscaledGrayscale(y, 400, v), e && (R = !0)), e ||= pe(y, 400), Q(v);
				let t = st(e.data, e.width, e.height);
				S = t.deskewDegrees, C = t.rankedCoarseRotations;
			}
			let w = null;
			o && (Q(v), j?.({
				stage: "detecting_barcode",
				progress: 14,
				message: "Scanning for 2D PDF417 / AAMVA barcode…"
			}), w = await Wr(y, {
				coarseRotation: C[0],
				signal: v
			})), Q(v);
			let T = await this.ensureWorker(P.primaryLanguage, M, j, v), E = await this.runOrientationPass(y, T, M, C[0], S, i, a, N, j, !0, v);
			if (E.usedWorkerPreprocess && (R = !0), F && !E.isConfidentUpright && !w?.aamva) {
				let e = E.coarse, t = E.probeScore;
				for (let n = 1; n < C.length; n++) {
					Q(v);
					let r = C[n];
					j?.({
						stage: "detecting_orientation",
						progress: 75 + n * 2,
						message: `Checking ${r}° orientation alignment…`
					});
					let a = await this.runLightweightProbe(y, T, r, S, i, N, v);
					if (a.viaWorker && (R = !0), a.score > t && (t = a.score, e = r, a.score >= 240)) break;
				}
				e !== E.coarse && (Q(v), E = await this.runOrientationPass(y, T, M, e, S, i, a, N, j, !1, v), E.usedWorkerPreprocess && (R = !0));
			}
			Q(v);
			let { preprocessed: D, mrzData: O, mrzRawText: k, mrzModelUsed: A } = E, ee = E.cleanedFullText, z = E.vizData, te = E.vizLineBoxes, B = E.confidence, ne = P.primaryLanguage, re = P.effectiveMode;
			if (P.allowAutoFollowUp) {
				let e = Oi({
					issuingCountry: O?.issuingCountry ?? w?.aamva?.issuingCountry ?? z.issuingCountry,
					nationality: O?.nationality ?? z.nationality,
					rawText: ee,
					customMap: M.vizLanguageMap,
					baseLanguage: P.primaryLanguage
				});
				if (e) {
					let t = await this.ensureNativeVizWorker(e, M, j, v);
					if (t) try {
						Q(v), this.activeStage = "recognizing_viz_native", j?.({
							stage: "recognizing_viz_native",
							progress: 85,
							message: `Running native-script VIZ pass (${e})…`
						}), await $(t.setParameters({
							tessedit_pageseg_mode: W.PSM.SPARSE_TEXT,
							tessedit_char_whitelist: ""
						}), v, () => this.abortInFlightWorkers());
						let n = i ? D.enhancedDataUrl : D.originalDataUrl, r = await $(t.recognize(n, {}, { blocks: !0 }), v, () => this.abortInFlightWorkers()), a = r.data.text || "", o = r.data.confidence || 0;
						if (a.trim().split(/\r?\n/).filter(Boolean).length < 2) {
							Q(v), await $(t.setParameters({
								tessedit_pageseg_mode: W.PSM.AUTO,
								tessedit_char_whitelist: ""
							}), v, () => this.abortInFlightWorkers());
							let e = await $(t.recognize(n, {}, { blocks: !0 }), v, () => this.abortInFlightWorkers());
							(e.data.text || "").trim().length > a.trim().length && (r = e, a = e.data.text || "", o = e.data.confidence || 0);
						}
						let s = oa(r.data.blocks), c = s.length > 0 ? s.map((e) => e.text).join("\n") : a, l = Gi(c, s);
						z = ra(z, B, l, o), (o >= B - 2 || da(l) >= da(E.vizData)) && (ee = c || ee, s.length > 0 && (te = s)), B = Math.max(B, o), ne = e;
					} catch (e) {
						if (Nr(e)) throw e;
					}
				}
			}
			Q(v), j?.({
				stage: "parsing",
				progress: 94,
				message: "Cropping portrait & signature, validating MRZ/VIZ & watermarks…"
			});
			let ie = Xi(O, w, z.documentTypeHint), ae = mt(O, z), oe = null, se = null, V = null;
			if (s || c || l) {
				let e = await $(Pe(D.originalDataUrl, {
					documentType: ie,
					mrz: O,
					barcode: w,
					vizLineBoxes: te,
					extractPortrait: s,
					extractSignature: c,
					checkColoredWatermark: l
				}), v);
				oe = e.portrait, se = e.signature, V = e.watermarkProbeCanvas ?? null;
			}
			Q(v);
			let ce;
			if (l && (ce = _t({
				rawOcrText: ee,
				rawMrzText: k,
				mrz: O,
				viz: z,
				barcode: w,
				unmappedFields: z.unmappedKeyValues
			}), !ce.isSpecimen && V)) try {
				Q(v), await $(T.setParameters({
					tessedit_pageseg_mode: W.PSM.SPARSE_TEXT,
					tessedit_char_whitelist: ""
				}), v, () => this.abortInFlightWorkers());
				let e = (await $(T.recognize(V), v, () => this.abortInFlightWorkers())).data.text || "";
				e.trim() && (ce = _t({
					rawOcrText: ee,
					rawMrzText: k,
					mrz: O,
					viz: z,
					barcode: w,
					unmappedFields: z.unmappedKeyValues,
					watermarkOcrText: e
				}));
			} catch (e) {
				if (Nr(e)) throw e;
			}
			let H = w?.aamva ?? null, U = {}, le = ea(O?.issuingCountry, z.issuingCountry, "issuingCountry", U, H?.issuingCountry), de = ea(O?.nationality, z.nationality, "nationality", U), G = ta(O?.surname, H?.surname, z.surname, "surname", U), K = G && O?.surname && G !== O.surname ? G.split(/\s+/).filter(Boolean) : O?.surnames && O.surnames.length > 0 ? O.surnames : H?.surnames && H.surnames.length > 0 ? H.surnames : z.surnames.length > 0 ? z.surnames : G ? G.split(/\s+/).filter(Boolean) : [], me = ta(O?.givenNames, H?.givenNames, z.givenNames, "givenNames", U), he = me && O?.givenNames && me !== O.givenNames ? me.split(/\s+/).filter(Boolean) : O?.givenNamesList && O.givenNamesList.length > 0 ? O.givenNamesList : H?.givenNamesList && H.givenNamesList.length > 0 ? H.givenNamesList : me ? me.split(/\s+/).filter(Boolean) : [], ge = me || G ? [me, G].filter(Boolean).join(" ") : ea(null, z.fullName, "fullName", U, H?.fullName);
			ge && !U.fullName && (U.fullName = U.givenNames === "MRZ+VIZ" || U.surname === "MRZ+VIZ" ? "MRZ+VIZ" : U.givenNames === "BARCODE+VIZ" || U.surname === "BARCODE+VIZ" ? "BARCODE+VIZ" : U.givenNames ?? U.surname ?? "VIZ");
			let _e = aa(O, H?.documentNumber, z.documentNumber, U), ve = ea(O && (O.optionalData1 || O.optionalData2) ? [O.optionalData1, O.optionalData2].filter(Boolean).join(" ") : null, z.personalNumber, "personalNumber", U, H?.documentDiscriminator), ye = ea(O?.dateOfBirth, z.dateOfBirth, "dateOfBirth", U, H?.dateOfBirth), be = ea(O?.dateOfExpiry, z.dateOfExpiry, "dateOfExpiry", U, H?.dateOfExpiry), xe = ea(null, z.dateOfIssue, "dateOfIssue", U, H?.dateOfIssue), Se = O?.sex && O.sex !== "Unspecified" ? O.sex : H?.sex ?? z.sex ?? "Unspecified";
			O?.sex && O.sex !== "Unspecified" && z.sex ? U.sex = "MRZ+VIZ" : O?.sex && O.sex !== "Unspecified" ? U.sex = "MRZ" : H?.sex ? U.sex = z.sex ? "BARCODE+VIZ" : "BARCODE" : z.sex && (U.sex = "VIZ");
			let Ce = ea(null, z.placeOfBirth, "placeOfBirth", U), we = ea(null, z.address, "address", U, H?.address), Te = ea(null, z.parents, "parents", U), Ee = ea(null, z.issuingAuthority, "issuingAuthority", U, H?.jurisdictionName ? `${H.jurisdictionName} DMV / Licensing` : null), De = ea(null, z.licenseClass, "licenseClass", U, H?.licenseClass), Oe = ea(null, z.restrictions, "restrictions", U, H?.restrictions), ke = ea(null, z.endorsements, "endorsements", U, H?.endorsements), Ae = ea(null, z.height, "height", U, H?.height), je = ea(null, z.eyeColor, "eyeColor", U, H?.eyeColor), Me = ea(null, z.hairColor, "hairColor", U, H?.hairColor), Ne = Ji(ye);
			Ne !== null && (U.age = "COMPUTED");
			let Fe = Yi(be);
			Fe !== null && (U.isExpired = "COMPUTED");
			let Ie = ue(le), Le = ue(de) ?? de, Re = Math.round(performance.now() - n), ze = {
				coarseDegrees: E.coarse,
				deskewDegrees: S,
				totalDegrees: pa(E.coarse + S),
				autoDetected: F
			}, Be = H ? Math.max(Math.round(B), 94) : Math.round(B);
			return j?.({
				stage: "complete",
				progress: 100,
				message: "Scan complete"
			}), {
				documentType: ie,
				documentFormat: O ? O.format : H ? "AAMVA_PDF417" : w ? "PDF417" : "VISUAL_ONLY",
				issuingCountry: le,
				issuingCountryName: Ie,
				documentNumber: _e,
				personalNumber: ve,
				surname: G,
				surnames: K,
				givenNames: me,
				givenNamesList: he,
				fullName: ge,
				nationality: de,
				nationalityName: Le,
				dateOfBirth: ye,
				age: Ne,
				sex: Se,
				dateOfIssue: xe,
				dateOfExpiry: be,
				isExpired: Fe,
				placeOfBirth: Ce,
				address: we,
				parents: Te,
				issuingAuthority: Ee,
				licenseClass: De,
				restrictions: Oe,
				endorsements: ke,
				height: Ae,
				eyeColor: je,
				hairColor: Me,
				mrz: O,
				barcode: w,
				portraitDataUrl: s ? oe?.dataUrl ?? null : void 0,
				portraitRegion: s ? oe : void 0,
				signatureDataUrl: c ? se?.dataUrl ?? null : void 0,
				signatureRegion: c ? se : void 0,
				specimen: l ? ce : void 0,
				crossValidation: ae,
				mrzModel: A,
				vizLanguageMode: re,
				vizLanguage: ne,
				workerPreprocessed: R,
				unmappedFields: z.unmappedKeyValues,
				fieldSources: U,
				rawOcrText: ee.trim(),
				rawMrzText: k,
				confidence: Be,
				processingTimeMs: Re,
				sourceDimensions: {
					width: D.width,
					height: D.height
				},
				orientation: ze,
				perspective: b,
				quality: m ? x : void 0,
				previews: _ ? {
					originalDataUrl: D.originalDataUrl,
					enhancedDataUrl: D.enhancedDataUrl,
					mrzCropDataUrl: D.mrzCropDataUrl
				} : void 0
			};
		} finally {
			if (L && L !== I) try {
				L.close();
			} catch {}
			if (I) try {
				I.close();
			} catch {}
		}
	}
	async scanPair(e, t, n = {}) {
		let { frontOptions: r, backOptions: i, onProgress: a, signal: o, ...s } = n;
		Q(o);
		let c = await this.scan(e, {
			...s,
			...r,
			signal: r?.signal ?? o,
			onProgress: ma(0, 48, a, "Front")
		});
		Q(o);
		let l = await this.scan(t, {
			...s,
			...i,
			signal: i?.signal ?? o,
			onProgress: ma(50, 46, a, "Back")
		});
		Q(o), a?.({
			stage: "parsing",
			progress: 98,
			message: "Merging front & back fields and verifying consistency…"
		});
		let u = Mt(c, l);
		return a?.({
			stage: "complete",
			progress: 100,
			message: "Two-sided scan complete"
		}), u;
	}
	async terminate() {
		this.preprocessWorker.terminate(), this.worker && (await this.worker.terminate(), this.worker = null, this.workerLang = null, this.workerConfigKey = null), this.vizNativeWorker && (await this.vizNativeWorker.terminate(), this.vizNativeWorker = null, this.vizNativeLang = null, this.vizNativeConfigKey = null), this.vizNativeFailedLangs.clear(), this.mrzWorker && (await this.mrzWorker.terminate(), this.mrzWorker = null, this.mrzWorkerConfigKey = null), this.mrzOcrbFailed = !1;
	}
};
async function ga(e, t = {}) {
	let n = new ha({
		workerPath: t.workerPath,
		corePath: t.corePath,
		langPath: t.langPath,
		workerBlobURL: t.workerBlobURL,
		useWorkerPreprocessing: t.useWorkerPreprocessing,
		mrzModel: t.mrzModel,
		mrzLanguage: t.mrzLanguage,
		mrzLangPath: t.mrzLangPath,
		mrzGzip: t.mrzGzip,
		vizLanguageMode: t.vizLanguageMode,
		vizLanguages: t.vizLanguages,
		vizLanguageMap: t.vizLanguageMap
	});
	try {
		return await n.scan(e, t);
	} finally {
		await n.terminate();
	}
}
async function _a(e, t, n = {}) {
	let r = new ha({
		workerPath: n.workerPath,
		corePath: n.corePath,
		langPath: n.langPath,
		workerBlobURL: n.workerBlobURL,
		useWorkerPreprocessing: n.useWorkerPreprocessing,
		mrzModel: n.mrzModel,
		mrzLanguage: n.mrzLanguage,
		mrzLangPath: n.mrzLangPath,
		mrzGzip: n.mrzGzip,
		vizLanguageMode: n.vizLanguageMode,
		vizLanguages: n.vizLanguages,
		vizLanguageMap: n.vizLanguageMap
	});
	try {
		return await r.scanPair(e, t, n);
	} finally {
		await r.terminate();
	}
}
export { wr as AAMVA_IIN_DIRECTORY, yi as CameraAutoCapture, Ci as DEFAULT_COUNTRY_VIZ_LANGUAGES, xi as DEFAULT_MULTILINGUAL_VIZ_LANGUAGES, ha as DocumentScanner, Si as ENGLISH_PRIMARY_COUNTRY_CODES, le as ICAO_COUNTRY_CODES, li as QualityGateError, u as SCANNER_VERSION, Mr as ScanAbortedError, st as analyzeDocumentOrientation, _i as assessCanvasQuality, vi as assessImageQuality, Ne as buildColoredWatermarkOcrCanvas, Re as computeCheckDigit, mi as computeVisibleVideoCrop, mt as crossValidateMrzAndViz, oi as detectDocumentQuad, Wr as detectPdf417Barcode, ke as detectPortraitBoundsFromRgba, je as detectSignatureBoundsFromRgba, _t as detectSpecimenWatermark, Pe as extractPortraitAndSignature, Di as inferNativeVizLanguageFromText, Nr as isScanAbortedError, G as loadImageElement, fe as loadImageSurface, Mt as mergeDocumentSides, vt as mergeSpecimenResults, Or as normalizeAamvaDate, ji as normalizeVisualDate, Xr as orderQuadCorners, jr as parseAamvaPayload, nt as parseMrzFromText, Gi as parseVizText, _e as preprocessDocumentImage, ue as resolveCountryName, Oi as resolveNativeVizLanguage, ki as resolveVizPassStrategy, pe as sampleDownscaledGrayscale, ga as scanDocumentImage, _a as scanDocumentPair, Pr as supportsWorkerPreprocessing, Q as throwIfScanAborted, ci as warpDocumentPerspective, bi as watchCameraAutoCapture };

//# sourceMappingURL=docscan-ocr.v0.0.7.es.js.map