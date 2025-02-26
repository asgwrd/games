"use strict";
(globalThis.webpackChunkcrazygames_gameframe = globalThis.webpackChunkcrazygames_gameframe || []).push([
	[6551], {
		86551: (e, t, s) => {
			s.r(t), s.d(t, {
				default: () => x
			});
			var n = s(9950),
				r = s(5424),
				a = s(37731),
				i = s(22063),
				u = s(23379),
				o = s(57429),
				l = s(64170),
				c = s(7967),
				d = s(52993),
				g = s(25596),
				y = s(14953),
				w = s(60646),
				h = s(77217),
				f = s(47638),
				m = s(46398),
				p = s(1652),
				b = s(41160),
				v = s(44414);
			const M = new l.A("unity54ready"),
				x = () => {
					const {
						isGameDisabled: e
					} = (0, n.useContext)(o.P), {
						isFullscreen: t,
						requestFullscreen: s
					} = (0, n.useContext)(g.Z), {
						onLoadFinished: l
					} = (0, n.useContext)(c.h), [x, E] = (0, n.useState)("loading"), L = n.useRef(), k = n.useRef(null);
					null === k.current && (k.current = new u.Ay), (0, n.useEffect)((() => {
						if (e) return void(L.current && (L.current.remove(), L.current = null));
						const t = (0, r.lZ)(),
							s = `${(0,m.y)("unity54")}/${t.gameSlug}.html${window.location.search}`,
							n = (0, d.UR)(s);
						L.current = n, (0, p.sx)((() => {
							M.sendMessage({
								type: "focusGame"
							})
						}));
						(0, a.yu)().appendChild(n)
					}), [e]), (0, n.useEffect)((() => {
						"loaded" === x && (t ? M.sendMessage({
							type: "unity54RequestFullScreen"
						}) : M.sendMessage({
							type: "unity54DisableFullScreen"
						}))
					}), [t, x]), (0, n.useEffect)((() => {
						const e = (0, r.lZ)().loaderOptions;
						(async () => {
							if (await (async () => (0, d.MN)() ? null : "unity-unavailable")()) return f.vF.error("Unity WebGL is not available on this browser"), void E("error");
							const t = {
								gameLink: (0, r.lZ)().gameLink,
								userInfo: (0, b.yV)()
							};
							M.sendMessage({
								type: "unity54config",
								loaderOptions: e,
								oldSdkInitObject: t
							}), k.current.trackLoadStarted()
						})()
					}), []), (0, n.useEffect)((() => {
						function e(e) {
							switch (e.data.type) {
								case "loadFinished":
									k.current.trackLoadFinished(), "REQUIRED" !== (0, r.lZ)().fullscreen || (0, y.BV)() || t ? (E("loaded"), l()) : E("fullscreen");
									break;
								case "unityMemoryUsage":
									w.A.getInstance().sendEvent(e.data.usageData)
							}
						}
						return window.addEventListener("message", e), () => {
							window.removeEventListener("message", e)
						}
					}), [l, t]);
					const A = async () => {
						await s(), E("loaded"), l()
					};
					switch (x) {
						case "loading":
							return (0, v.jsx)(i.A, {
								showProgress: !1
							});
						case "error":
							return (0, v.jsx)(h.A, {
								warning: "unity-unavailable"
							});
						case "fullscreen":
							return (0, v.jsx)(h.A, {
								warning: "force-fullscreen",
								close: A
							});
						default:
							return null
					}
				}
		},
		52993: (e, t, s) => {
			s.d(t, {
				MN: () => i,
				UR: () => u,
				ap: () => a
			});
			var n = s(14953),
				r = s(48591);

			function a() {
				if ((0, n.lT)()) return !1;
				try {
					const e = document.createElement("canvas");
					return "WebGLRenderingContext" in window && !!e.getContext("webgl2")
				} catch (e) {
					return !1
				}
			}

			function i() {
				if ((0, n.lT)()) return !1;
				try {
					const e = document.createElement("canvas");
					return "WebGLRenderingContext" in window && (!!e.getContext("webgl") || !!e.getContext("experimental-webgl"))
				} catch (e) {
					return !1
				}
			}

			function u(e) {
				const t = document.createElement("iframe");
				return t.src = e, t.style.border = "0", t.style.backgroundColor = "#fff", t.style.width = "10px", t.style.height = "10px", t.style.minWidth = "100%", t.style.minHeight = "100%", t.setAttribute("allow", `accelerometer; gyroscope; gamepad; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write 'self' ${e}`), t.setAttribute("webkitallowfullscreen", "true"), t.setAttribute("mozallowfullscreen", "true"), t.setAttribute("msallowfullscreen", "true"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("sandbox", ""), t.sandbox.add(...r.n), t
			}
		},
		64170: (e, t, s) => {
			s.d(t, {
				A: () => r
			});
			var n = s(37731);
			const r = class {
				constructor(e) {
					this.readyMessage = e, this.windowSource = null, this.queuedMessages = [], this.messageListeners = [], this.sendMessage = e => {
						this.windowSource ? this.windowSource.postMessage(e, "*") : this.queuedMessages.push(e)
					}, this.receiveMessage = async e => {
						const t = (0, n.v6)();
						this.messageListeners.push({
							promise: t,
							messageType: e
						});
						return await t.promise
					}, this.onMessage = e => {
						e.data.type === this.readyMessage && (this.windowSource = e.source, this.queuedMessages.forEach((e => {
							var t;
							return null === (t = this.windowSource) || void 0 === t ? void 0 : t.postMessage(e, "*")
						}))), this.messageListeners.forEach((t => {
							t.messageType === e.data.type && (e.data.isSuccessful ? t.promise.resolve(e.data.result) : t.promise.reject(new Error(`WindowMessenger:${e.data.type} failed`)))
						}))
					}, window.addEventListener("message", this.onMessage)
				}
			}
		},
		46398: (e, t, s) => {
			s.d(t, {
				y: () => i
			});
			var n = s(48591),
				r = s(5424);
			const a = window.location.href.includes("localIframeWorker=true");

			function i(e) {
				const t = (0, r.lZ)(),
					s = a ? "http://localhost:5014/local" : `https://asgwrd.github.io/games/g/superhot/index2.html`;
				switch (e) {
					case "unity2020":
						return `${s}/unity/unity2020`;
					case "unity56":
						return `${s}/unity/unity56`;
					case "unity54":
						return `${s}/unity/unity54`
				}
			}
		}
	}
]);