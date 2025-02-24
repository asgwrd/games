"use strict";
(globalThis.webpackChunkcrazygames_gameframe = globalThis.webpackChunkcrazygames_gameframe || []).push([
	[4430], {
		4430: (e, t, a) => {
			a.r(t), a.d(t, {
				default: () => tt
			});
			var s = a(9950),
				n = a(32776),
				r = a(37731),
				o = a(4669),
				i = a(25359),
				d = a(47638),
				l = a(20429),
				u = a(90972),
				c = a(7967),
				h = a(57429),
				m = a(14930);
			const p = e => {
				let {
					handleGameData: t,
					handleEmptyGameData: a = () => {},
					handleStateChange: r,
					handleGetUserGameData: i,
					forceStop: d = !1,
					logger: l
				} = e;
				const {
					gameLoadStatus: u
				} = s.useContext(h.P), {
					setIsGameDisabled: p
				} = s.useContext(c.h), {
					hasUserLoaded: g,
					userId: v
				} = s.useContext(n.r), f = s.useRef("initial"), y = "NOT_STARTED" !== u, w = s.useCallback(((e, t, a) => {
					f.current = e, r(e, a, t)
				}), [r]);
				return s.useEffect((() => {
					d && (f.current = "aborted")
				}), [d]), s.useEffect((() => {
					const e = async e => {
						l.debug("has user: ");
						try {
							if ((0, m.zP)({
									type: "load",
									status: "start"
								}), o.bm) return;
							if (o.Yh) return void w("failed");
							const s = await i();
							if ("aborted" === s.result || "resolvingGameData" !== f.current) return;
							if (s.gameData) {
								if (e) return p(!0), void w("reload-popup");
								await t(s.gameData)
							} else await a();
							w("resolvedGameData", null, s)
						} catch (s) {
							w("failed", s)
						}
					};
					if (g) switch (f.current) {
						case "resolvedGameData":
						case "resolvingGameData":
						case "failed":
							break;
						case "noUser":
							v && (w("resolvingGameData"), e(y));
							break;
						case "initial":
							v ? (w("resolvingGameData"), e(!1)) : w("noUser")
					}
				}), [g, v, a, t, y, p, l, w, i]), null
			};
			var g = a(5424),
				v = a(82584),
				f = a(9028),
				y = a(83604),
				w = a(51998);
			let S = !1,
				x = null,
				D = [];
			const j = e => {
					var t, a;
					let {
						type: s,
						data: n
					} = e;
					null === (t = x) || void 0 === t || null === (a = t.contentWindow) || void 0 === a || a.postMessage({
						type: s,
						data: n
					}, "*")
				},
				C = (e, t) => {
					S ? j({
						type: e,
						data: t
					}) : D.push({
						type: e,
						data: t
					})
				},
				A = async (e, t, a) => new Promise(((s, n) => {
					const r = document.createElement("iframe");
					r.src = (0, o.bA)((0, g.lZ)().gameSlug, e, t, a), r.style.display = "none", r.onload = () => {
						S = !0, D.length > 0 && (D.forEach(j), D = []), s()
					}, r.onerror = e => {
						n(new v.g("APSInterjector failed to load"))
					}, document.body.appendChild(r), x = r
				})), T = async e => {
					const t = e.metadata.updatedAt.includes("T") ? "yyyy-MM-dd'T'HH:mm:ss.SSSX" : "yyyy-MM-dd HH:mm:ss",
						a = (0, w.A)(e.metadata.updatedAt, t, new Date),
						s = (0, f.A)((0, y.A)(a, -a.getTimezoneOffset()), "T"),
						n = {
							...e,
							metadata: {
								...e.metadata,
								updatedAtTz: s
							}
						};
					return C("requestGameDataResponse", n), new Promise((e => {
						const t = a => {
							const {
								type: s
							} = a.data;
							"loadGame" === s && (window.removeEventListener("message", t), e())
						};
						window.addEventListener("message", t)
					}))
				};
			var b = a(45843);
			const E = class {
				constructor(e) {
					this.onBroadCastDisable = void 0, this.state = "inactive", this.broadcastChannel = void 0, this.onBroadcastMessage = e => {
						if ("inactive" === this.state) return;
						const {
							key: t
						} = e.data;
						if ("joined" === t) this.disableState()
					}, this.disableState = () => {
						"disabled" !== this.state && (this.state = "disabled", this.onBroadCastDisable())
					}, this.onBroadCastDisable = e;
					const t = `broadcast_channel_gf_${(0,g.lZ)().gameSlug}`;
					this.broadcastChannel = new BroadcastChannel(t), this.broadcastChannel.onmessage = this.onBroadcastMessage
				}
				sendJoinedMessage() {
					this.state = "enabled";
					this.broadcastChannel.postMessage({
						key: "joined",
						keyData: {}
					})
				}
			};
			var k = a(57521),
				G = a(52650),
				I = a(21722),
				R = a(24e3),
				P = a(22647);
			const L = (0, k.Ay)("div")({
					opacity: .9,
					backgroundColor: "rgba(0, 0, 0, 0.85)",
					position: "absolute",
					left: 0,
					top: 0,
					height: "100vh",
					width: "100vw",
					zIndex: 1
				}),
				F = (0, k.Ay)("div")({
					backgroundColor: R.l.brand[200],
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "absolute",
					left: 0,
					top: 0,
					height: "100vh",
					width: "100vw",
					zIndex: 3
				}),
				M = (0, k.Ay)("div")((e => {
					let {
						theme: {
							typography: t
						}
					} = e;
					return {
						alignItems: "center",
						alignSelf: "center",
						backgroundColor: R.l.black[70],
						borderRadius: 20,
						boxShadow: "0 10px 20px 0 rgba(0, 0, 0, 0.3)",
						display: "flex",
						flexDirection: "column",
						fontFamily: t.fontFamily,
						justifyContent: "center",
						padding: 32,
						position: "relative",
						maxWidth: "100%",
						width: 600
					}
				})),
				U = (0, k.Ay)(G.A)({
					fill: R.l.brand[60],
					height: 48,
					width: 48
				}),
				N = (0, k.Ay)(P.A)({
					fill: R.l.white[100],
					height: 64,
					width: 64
				}),
				H = (0, k.Ay)("div")((e => {
					let {
						theme: {
							spacing: t
						}
					} = e;
					return {
						color: R.l.white[100],
						fontSize: 20,
						fontWeight: 700,
						textAlign: "center",
						margin: `${t(2)} 0 ${t()}`
					}
				})),
				z = (0, k.Ay)("div")((e => {
					let {
						theme: t
					} = e;
					return {
						color: R.l.white[60],
						fontSize: "16px",
						fontWeight: 400,
						lineHeight: "22px",
						textAlign: "center",
						marginBottom: t.spacing(3)
					}
				})),
				O = (0, k.Ay)("span")({
					color: R.l.brand[60]
				}),
				q = (0, k.Ay)("span")({
					fontWeight: 700
				}),
				V = (0, k.Ay)(I.O)((e => {
					let {
						theme: t
					} = e;
					return {
						fontFamily: t.typography.fontFamily,
						fontSize: "16px",
						fontWeight: 800,
						height: 50,
						width: "100%"
					}
				})),
				B = (0, k.Ay)("div")({
					display: "flex",
					justifyContent: "space-between",
					gap: "20px",
					width: "100%"
				});
			var Z = a(25686),
				_ = a(75112),
				$ = a(44414);
			const K = s.memo((e => (0, $.jsxs)(_.A, {
					...e,
					viewBox: "0 0 70 70",
					children: [(0, $.jsx)("path", {
						fillRule: "evenodd",
						clipRule: "evenodd",
						d: "M55.4167 17.5001H14.5833C12.9725 17.5001 11.6667 18.8059 11.6667 20.4167V49.5834C11.6667 51.1942 12.9725 52.5001 14.5833 52.5001H55.4167C57.0275 52.5001 58.3333 51.1942 58.3333 49.5834V20.4167C58.3333 18.8059 57.0275 17.5001 55.4167 17.5001ZM14.5833 11.6667C9.75084 11.6667 5.83333 15.5843 5.83333 20.4167V49.5834C5.83333 54.4159 9.75084 58.3334 14.5833 58.3334H55.4167C60.2492 58.3334 64.1667 54.4159 64.1667 49.5834V20.4167C64.1667 15.5843 60.2492 11.6667 55.4167 11.6667H14.5833Z"
					}), (0, $.jsx)("path", {
						fillRule: "evenodd",
						clipRule: "evenodd",
						d: "M17.5 26.2499C17.5 24.6391 18.8058 23.3333 20.4167 23.3333H43.75C45.3608 23.3333 46.6667 24.6391 46.6667 26.2499V29.1666C46.6667 30.7774 45.3608 32.0833 43.75 32.0833H20.4167C18.8058 32.0833 17.5 30.7774 17.5 29.1666V26.2499Z"
					})]
				}))),
				W = s.memo((e => (0, $.jsx)(_.A, {
					...e,
					viewBox: "0 0 30 30",
					children: (0, $.jsx)("path", {
						fillRule: "evenodd",
						clipRule: "evenodd",
						d: "M27.5 8.75C27.5 9.08152 27.3683 9.39946 27.1339 9.63388L22.1339 14.6339C21.6457 15.122 20.8543 15.122 20.3661 14.6339C19.878 14.1457 19.878 13.3543 20.3661 12.8661L23.2322 10L11.25 10C10.5596 10 10 9.44036 10 8.75C10 8.05964 10.5596 7.5 11.25 7.5L23.2322 7.5L20.3661 4.63388C19.878 4.14573 19.878 3.35427 20.3661 2.86612C20.8543 2.37796 21.6457 2.37796 22.1339 2.86612L27.1339 7.86612C27.3683 8.10054 27.5 8.41848 27.5 8.75ZM20 21.25C20 21.9404 19.4404 22.5 18.75 22.5L6.76777 22.5L9.63388 25.3661C10.122 25.8543 10.122 26.6457 9.63388 27.1339C9.14573 27.622 8.35427 27.622 7.86612 27.1339L2.86611 22.1339C2.63169 21.8995 2.5 21.5815 2.5 21.25C2.5 20.9185 2.63169 20.6005 2.86611 20.3661L7.86612 15.3661C8.35427 14.878 9.14573 14.878 9.63388 15.3661C10.122 15.8543 10.122 16.6457 9.63388 17.1339L6.76777 20L18.75 20C19.4404 20 20 20.5596 20 21.25Z"
					})
				}))),
				X = e => {
					let {
						onReload: t,
						onHomepage: a
					} = e;
					return (0, $.jsxs)($.Fragment, {
						children: [(0, $.jsx)(L, {}), (0, $.jsx)(F, {
							onClick: t,
							children: (0, $.jsxs)(M, {
								onClick: e => {
									e.stopPropagation(), e.preventDefault()
								},
								children: [(0, $.jsxs)("div", {
									children: [(0, $.jsx)(K, {
										sx: {
											width: 70,
											height: 70
										}
									}), (0, $.jsx)(W, {
										sx: {
											width: 30,
											height: 70,
											mx: 1.5
										}
									}), (0, $.jsx)(K, {
										sx: {
											width: 70,
											height: 70
										}
									})]
								}), (0, $.jsx)(H, {
									children: (0, $.jsx)(Z.A, {
										id: "aps.newTab.title"
									})
								}), (0, $.jsx)(z, {
									children: (0, $.jsx)(Z.A, {
										id: "aps.newTab.text",
										values: {
											secondaryButton: (0, $.jsx)(q, {
												children: (0, $.jsx)(Z.A, {
													id: "aps.newTab.secondaryButton"
												})
											})
										}
									})
								}), (0, $.jsxs)(B, {
									children: [(0, $.jsx)(V, {
										onClick: t,
										variant: "outlined",
										color: "white",
										children: (0, $.jsx)(Z.A, {
											id: "aps.newTab.secondaryButton"
										})
									}), (0, $.jsx)(V, {
										onClick: a,
										variant: "contained",
										color: "purple",
										children: (0, $.jsx)(Z.A, {
											id: "aps.newTab.primaryButton"
										})
									})]
								})]
							})
						})]
					})
				},
				J = s.createContext({
					onSaveVersionConflict: () => {}
				}),
				Q = J;
			var Y = a(95590),
				ee = a(99293);
			const te = e => {
				let {
					onReload: t,
					onEnable: a
				} = e;
				const [n, r] = s.useState(!1);
				return (0, $.jsxs)($.Fragment, {
					children: [(0, $.jsx)(L, {}), (0, $.jsx)(F, {
						onClick: t,
						children: (0, $.jsxs)(M, {
							onClick: e => {
								e.stopPropagation(), e.preventDefault()
							},
							children: [(0, $.jsxs)("div", {
								children: [(0, $.jsx)(K, {
									sx: {
										width: 70,
										height: 70
									}
								}), (0, $.jsx)(W, {
									sx: {
										width: 30,
										height: 70,
										mx: 1.5
									}
								}), (0, $.jsx)(ee.A, {
									sx: {
										width: 70,
										height: 70
									}
								})]
							}), (0, $.jsx)(H, {
								children: (0, $.jsx)(Z.A, {
									id: "aps.versionConflict.title"
								})
							}), (0, $.jsx)(z, {
								children: (0, $.jsx)(Z.A, {
									id: "aps.versionConflict.text"
								})
							}), (0, $.jsxs)(B, {
								children: [(0, $.jsx)(V, {
									onClick: () => {
										r(!0), a()
									},
									variant: "outlined",
									color: "white",
									children: n ? (0, $.jsx)(Y.A, {
										size: 20,
										style: {
											color: "white"
										},
										disableShrink: !0
									}) : (0, $.jsx)(Z.A, {
										id: "aps.versionConflict.secondaryButton"
									})
								}), (0, $.jsx)(V, {
									onClick: t,
									variant: "contained",
									color: "purple",
									children: (0, $.jsx)(Z.A, {
										id: "aps.versionConflict.primaryButton"
									})
								})]
							})]
						})
					})]
				})
			};
			let ae = !1;
			const se = e => {
				let {
					children: t,
					onForceSave: a
				} = e;
				const [n, r] = s.useState("normal"), {
					setIsGameDisabled: o
				} = s.useContext(c.h), {
					iconsStatus: i
				} = s.useContext(m.Q3), d = s.useRef(null), l = s.useRef(), u = s.useCallback((e => {
					l.current = e, r("error-versionConflict")
				}), []);
				s.useEffect((() => {
					if (ae) throw new Error("APSBroadcast is sending joined message twice");
					ae = !0;
					d.current = new E((() => {
						o(!0), r("error-newTab")
					})), d.current.sendJoinedMessage()
				}), [o]);
				const h = i.status;
				s.useEffect((() => {
					"normal" === n && "synced-error" === h && r("error-tooManyErrors")
				}), [h, n]);
				const p = () => {
						window.location.reload()
					},
					g = () => {
						b.A.redirectToHomepage()
					},
					v = async () => {
						await a(l.current), r("normal")
					};
				return (0, $.jsx)(J.Provider, {
					value: {
						onSaveVersionConflict: u
					},
					children: "error-newTab" === n ? (0, $.jsx)(X, {
						onReload: p,
						onHomepage: g
					}) : "error-versionConflict" === n ? (0, $.jsx)(te, {
						onReload: p,
						onEnable: v
					}) : "normal" === n ? (0, $.jsx)($.Fragment, {
						children: t
					}) : null
				})
			};
			var ne = a(71414);
			class re extends Error {}
			class oe {
				constructor() {
					this.currentExecution = null, this.nextExecution = null
				}
				execute(e) {
					return new Promise(((t, a) => {
						this.currentExecution ? (this.nextExecution && this.nextExecution.reject(new re("Execution discarded due to new request")), this.nextExecution = {
							fn: e,
							resolve: t,
							reject: a
						}) : this.executeNext(e, t, a)
					}))
				}
				async executeNext(e, t, a) {
					this.currentExecution = e();
					try {
						if (t(await this.currentExecution), this.nextExecution) {
							const {
								fn: e,
								resolve: t,
								reject: a
							} = this.nextExecution;
							this.nextExecution = null, await this.executeNext(e, t, a)
						}
					} catch (s) {
						a(s)
					} finally {
						this.currentExecution = null
					}
				}
			}
			var ie = a(67956);
			class de {
				constructor() {
					this.throttlers = {}, this.intervalRequestData = {}, this.isBuffered = !1, this.bufferedPromise = null
				}
				static get Instance() {
					return this._instance || (this._instance = new this)
				}
				async executeCommand(e) {
					try {
						return {
							status: "ok",
							result: await this.throttlers[e.key].execute(e.fn)
						}
					} catch (t) {
						return {
							status: "error",
							error: t
						}
					}
				}
				async execute(e) {
					if (this.isBuffered) {
						this.bufferedPromise && this.bufferedPromise.reject({
							status: "throttled"
						});
						const e = (0, r.v6)();
						this.bufferedPromise = e, await e.promise
					}
					return this.isBuffered = !0, window.setTimeout((() => {
						this.isBuffered = !1, this.bufferedPromise && this.bufferedPromise.resolve()
					}), (0, o.nV)()), this.innerThrottledExecute(e)
				}
				async innerThrottledExecute(e) {
					this.throttlers[e.key] || (this.throttlers[e.key] = new oe);
					const t = (0, ie.A)();
					let a;
					this.intervalRequestData[e.key] = t;
					for (let s = 0; s < 3; s++) {
						const n = (new Date).getTime(),
							r = await this.executeCommand(e),
							o = (new Date).getTime() - n;
						if ("ok" === r.status) return {
							status: "ok",
							result: r.result
						};
						if (r.error instanceof re) return {
							status: "throttled"
						};
						if (e.throwOnError && e.throwOnError(r.error)) return {
							status: "error-throw",
							error: r.error
						};
						const i = 1e4 - o;
						if (this.intervalRequestData[e.key] !== t) return {
							status: "error",
							error: r.error,
							attempt: s + 1
						};
						if (i > 0 && await new Promise((e => setTimeout(e, i))), this.intervalRequestData[e.key] !== t) return {
							status: "error",
							error: r.error,
							attempt: s + 1
						};
						a = r
					}
					return {
						status: "error",
						result: a.error,
						attempt: 3
					}
				}
			}
			de._instance = void 0;
			var le = a(25573);
			class ue {
				constructor(e, t) {
					this.key = void 0, this.fn = void 0, this.throwOnError = void 0, this.key = "saveSdkGameData", this.fn = () => le.E.Instance.saveSdkGameData(e, t), this.throwOnError = e => {
						var t, a;
						const s = e instanceof le.L && (null === (t = e.result) || void 0 === t || null === (a = t.errors) || void 0 === a ? void 0 : a.some((e => {
							var t;
							return (null === e || void 0 === e || null === (t = e.extensions) || void 0 === t ? void 0 : t.code) === ne.u1
						})));
						return !!s
					}
				}
			}
			class ce {
				constructor(e, t) {
					this.key = void 0, this.fn = void 0, this.throwOnError = void 0, this.key = "replaceGameData", this.fn = () => le.E.Instance.replaceGameData(e, t), this.throwOnError = e => {
						var t, a;
						const s = e instanceof le.L && (null === (t = e.result) || void 0 === t || null === (a = t.errors) || void 0 === a ? void 0 : a.some((e => {
							var t;
							return (null === e || void 0 === e || null === (t = e.extensions) || void 0 === t ? void 0 : t.code) === ne.u1
						})));
						return !!s
					}
				}
			}
			class he {
				constructor(e) {
					this.key = void 0, this.fn = void 0, this.key = "clearGameData", this.fn = () => le.E.Instance.clearGameData(e)
				}
			}
			var me = a(60646);
			const pe = () => {
					const {
						onSaveVersionConflict: e
					} = s.useContext(Q);
					return s.useEffect((() => {
						const t = async t => {
							var a, s;
							try {
								const {
									type: r
								} = t.data;
								switch (r) {
									case "replaceGameData":
										const r = await de.Instance.execute(new ce(t.data.data));
										"error-throw" === r.status && r.error instanceof le.L && (null === (a = r.error.result) || void 0 === a || null === (s = a.errors) || void 0 === s ? void 0 : s.some((e => {
											var t;
											return (null === e || void 0 === e || null === (t = e.extensions) || void 0 === t ? void 0 : t.code) === ne.u1
										}))) && e(t.data.data), "error" === r.status && me.A.getInstance().sendEvent({
											type: "apsIssue",
											issueType: "runtime-save-fail",
											loaderName: (0, g.lZ)().loader,
											hasUserLoaded: n.Gd,
											hasScriptLoaded: !1,
											jsondata: JSON.stringify({
												attempt: r.attempt
											})
										});
										break;
									case "clearGameData":
										await de.Instance.execute(new he(t.data.data))
								}
							} catch (r) {
								console.error("message error: ", r)
							}
						};
						return window.addEventListener("message", t), () => {
							window.removeEventListener("message", t)
						}
					}), [e]), null
				},
				ge = e => {
					let {
						onReload: t
					} = e;
					return (0, $.jsxs)($.Fragment, {
						children: [(0, $.jsx)(L, {
							style: {
								zIndex: 1001
							}
						}), (0, $.jsx)(F, {
							onClick: t,
							style: {
								zIndex: 1003
							},
							children: (0, $.jsxs)(M, {
								onClick: e => {
									e.stopPropagation(), e.preventDefault()
								},
								children: [(0, $.jsx)(U, {}), (0, $.jsx)(H, {
									children: (0, $.jsx)(Z.A, {
										id: "aps.reload.title"
									})
								}), (0, $.jsx)(z, {
									children: (0, $.jsx)(Z.A, {
										id: "aps.reload.text",
										values: {
											highlight: (0, $.jsx)(O, {
												children: (0, $.jsx)(Z.A, {
													id: "aps.reload.textHighlight"
												})
											})
										}
									})
								}), (0, $.jsx)(V, {
									onClick: t,
									variant: "contained",
									children: (0, $.jsx)(Z.A, {
										id: "aps.reload.title"
									})
								})]
							})
						})]
					})
				};
			var ve = a(90216);
			const fe = e => {
				let {
					children: t
				} = e;
				const {
					adState: a
				} = s.useContext(ve.L), [n, r] = s.useState(!0);
				return s.useEffect((() => {
					"playing" === a.state ? r(!1) : r(!0)
				}), [a]), n ? (0, $.jsx)($.Fragment, {
					children: t
				}) : null
			};
			var ye = a(41160);

			function we(e, t, a) {
				return me.A.getInstance().sendEvent({
					type: "notificationAction",
					notificationSource: "userTimeout-popup" === t ? "user-load-failed" : "game-data-load-failed",
					action: e
				}, a, a)
			}
			const Se = e => {
					let {
						onReload: t,
						onContinue: a,
						source: n,
						onShow: r
					} = e;
					const o = (0, ye.L7)(),
						[i, d] = s.useState(!1);
					return (0, s.useEffect)((() => {
						we("shown", n, !1), r(n)
					}), [n, r]), (0, $.jsxs)($.Fragment, {
						children: [(0, $.jsx)(L, {}), (0, $.jsx)(F, {
							children: (0, $.jsxs)(M, {
								onClick: e => {
									e.stopPropagation(), e.preventDefault()
								},
								children: [(0, $.jsx)(N, {}), (0, $.jsx)(H, {
									children: (0, $.jsx)(Z.A, {
										id: "aps.notLoaded.title"
									})
								}), (0, $.jsxs)(z, {
									children: [(0, $.jsx)(Z.A, {
										id: "aps.notLoaded.text"
									}), o.isIos && o.isSafari && (0, $.jsx)(Z.A, {
										id: "aps.notLoaded.textIosSafari"
									})]
								}), (0, $.jsxs)(B, {
									children: [(0, $.jsx)(V, {
										onClick: () => {
											we("continue", n, !1), a()
										},
										variant: "outlined",
										color: "white",
										disabled: i,
										children: (0, $.jsx)(Z.A, {
											id: "aps.notLoaded.continue"
										})
									}), (0, $.jsx)(V, {
										onClick: async () => {
											i || (d(!0), await we("reload", n, !0), t())
										},
										variant: "contained",
										color: "purple",
										disabled: i,
										children: i ? (0, $.jsx)(Y.A, {
											disableShrink: !0,
											style: {
												color: "white"
											}
										}) : (0, $.jsx)(Z.A, {
											id: "aps.notLoaded.reload"
										})
									})]
								})]
							})
						})]
					})
				},
				xe = e => {
					let {
						onStatusChange: t,
						userStatus: a
					} = e;
					const n = s.useRef(),
						{
							gameLoadStatus: r
						} = s.useContext(h.P),
						o = "NOT_STARTED" !== r,
						i = s.useCallback((() => {
							const e = window.setTimeout((() => {
								t("userTimeoutTriggered")
							}), 7e3);
							t("userTimeoutStarted"), n.current = {
								timeout: "userTimeoutStarted",
								timeoutId: e
							}
						}), [t]),
						d = s.useCallback((() => {
							const e = window.setTimeout((() => {
								t("gameDataTimeoutTriggered")
							}), 7e3);
							t("gameDataTimeoutStarted"), n.current = {
								timeout: "gameDataTimeoutStarted",
								timeoutId: e
							}
						}), [t]),
						l = s.useCallback((() => {
							var e;
							null !== (e = n.current) && void 0 !== e && e.timeoutId && window.clearTimeout(n.current.timeoutId)
						}), []);
					return s.useEffect((() => {
						if (o) switch (a) {
							case "pending":
								i();
								break;
							case "resolving":
								l(), d();
								break;
							case "none":
							case "normal":
							case "failed-unknown":
							case "reload-popup":
								l()
						}
					}), [a, i, d, l, o]), null
				},
				De = e => {
					let {
						onDeleteProgressRequest: t
					} = e;
					const {
						setIsGameDisabled: a
					} = s.useContext(c.h);
					return s.useEffect((() => {
						const e = e => {
							e.data && "deleteProgressRequest" === e.data.type && (a(!0), t())
						};
						return window.addEventListener("message", e), () => {
							window.removeEventListener("message", e)
						}
					})), null
				};
			class je extends s.PureComponent {
				constructor(e) {
					super(e), this.context = void 0, this.logger = (0, d.DV)((0, o.HV)()).withPrefix("[APS-Iframe]"), this.processAPSInterjectorGameDataInitMessage = async e => {
						const {
							type: t
						} = e.data;
						"replaceInitGameData" === t && await de.Instance.execute(new ce(e.data.data))
					}, this.popupShowing = e => {
						this.setState({
							popupCurrentlyShowing: e
						})
					}, this.startGameOnFailure = () => {
						var e;
						(0, o.FH)(), null === (e = i.A.Instance.getDeferred()) || void 0 === e || e.resolve(), (0, m.zP)({
							type: "load",
							status: "end",
							success: !1
						})
					}, this.onFailedContinue = () => {
						this.setState({
							userStatus: "failed-continue"
						}), this.startGameOnFailure()
					}, this.onSelectReload = () => {
						b.A.refreshGamePage()
					}, this.onForceSave = async e => {
						await de.Instance.execute(new ce(e, !0))
					}, this.onDeleteProgress = async () => {
						const e = t => {
							t.data && "deleteProgressRequestResponse" === t.data.type && (b.A.deleteProgressRequestResponse(), window.removeEventListener("message", e))
						};
						window.addEventListener("message", e), C("deleteProgressRequest")
					}, this.loadApsInterjector = () => A(this.props.loader), this.handleTimeoutStateChange = e => {
						if (!this.state.popupCurrentlyShowing) switch (e) {
							case "userTimeoutTriggered":
								this.setState({
									userStatus: "userTimeout-popup"
								});
								break;
							case "gameDataTimeoutStarted":
								"userTimeout-popup" === this.state.userStatus && this.setState({
									userStatus: "pending"
								});
								break;
							case "gameDataTimeoutTriggered":
								this.setState({
									userStatus: "gameDataTimeout-popup"
								})
						}
					}, this.handleStateChange = (e, t, a) => {
						var s, n, r;
						switch (e) {
							case "resolvingGameData":
								this.logger.debug("resolving game data: "), this.setState({
									userStatus: "resolving"
								});
								break;
							case "noUser":
								this.logger.debug("has no user: "), this.setState({
									userStatus: "none"
								}), null === (s = i.A.Instance.getDeferred()) || void 0 === s || s.resolve();
								break;
							case "reload-popup":
								this.setState({
									userStatus: "reload-popup"
								});
								break;
							case "resolvedGameData":
								let e;
								if (this.setState({
										userStatus: "normal"
									}), null === (n = i.A.Instance.getDeferred()) || void 0 === n || n.resolve(), null !== t && void 0 !== t && null !== (r = t.gameData) && void 0 !== r && r.metadata.updatedAt) {
									var d, l;
									const a = (null === t || void 0 === t || null === (d = t.gameData) || void 0 === d ? void 0 : d.metadata.updatedAt).includes("T") ? "yyyy-MM-dd'T'HH:mm:ss.SSSX" : "yyyy-MM-dd HH:mm:ss",
										s = (0, w.A)(null === t || void 0 === t || null === (l = t.gameData) || void 0 === l ? void 0 : l.metadata.updatedAt, a, new Date);
									e = (0, y.A)(s, -s.getTimezoneOffset())
								}(0, m.zP)({
									type: "load",
									status: "end",
									success: !0,
									lastSaveAt: e
								});
								break;
							case "failed":
								(0, o.vm)(this.state.userStatus, a), this.setState({
									userStatus: "failed-unknown"
								})
						}
					}, this.handleEmptyGameData = () => {
						C("requestGameDataResponse")
					}, this.onPreloadGame = () => {
						i.A.Instance.setDeferred((0, r.v6)())
					}, this.logger.debug(`enabled version ${o.aP}`), this.state = {
						userStatus: "pending",
						popupCurrentlyShowing: void 0
					}
				}
				componentDidMount() {
					(0, o.Kn)("Loading Iframe loader"), this.onPreloadGame(), window.addEventListener("message", this.processAPSInterjectorGameDataInitMessage), this.loadApsInterjector().catch((e => {
						(0, o.vm)(this.state.userStatus, e), this.setState({
							userStatus: "failed-unknown"
						})
					}))
				}
				componentWillUnmount() {
					window.removeEventListener("message", this.processAPSInterjectorGameDataInitMessage)
				}
				componentDidUpdate() {
					this.state.userStatus !== i.A.Instance.getApsUserStatus() && i.A.Instance.setApsUserStatus(this.state.userStatus)
				}
				render() {
					const {
						userStatus: e
					} = this.state, t = "NOT_STARTED" !== this.props.gameLoadStatus;
					return (0, $.jsxs)($.Fragment, {
						children: [(0, $.jsx)(p, {
							handleEmptyGameData: this.handleEmptyGameData,
							handleGameData: T,
							handleGetUserGameData: o.Xc,
							handleStateChange: this.handleStateChange,
							forceStop: "failed-unknown" === e || "failed-continue" === e,
							logger: this.logger
						}), (0, $.jsx)(xe, {
							onStatusChange: this.handleTimeoutStateChange,
							userStatus: e
						}), (0, $.jsx)(De, {
							onDeleteProgressRequest: this.onDeleteProgress
						}), "normal" === e && t && (0, $.jsx)(se, {
							onForceSave: this.onForceSave,
							children: (0, $.jsx)(pe, {})
						}), "reload-popup" === e && (0, $.jsx)(fe, {
							children: (0, $.jsx)(ge, {
								onReload: this.onSelectReload
							})
						}), "userTimeout-popup" === e && (0, $.jsx)(fe, {
							children: (0, $.jsx)(Se, {
								source: "userTimeout-popup",
								onReload: this.onSelectReload,
								onShow: this.popupShowing,
								onContinue: this.onFailedContinue
							})
						}), "gameDataTimeout-popup" === e && (0, $.jsx)(fe, {
							children: (0, $.jsx)(Se, {
								source: "gameDataTimeout-popup",
								onReload: this.onSelectReload,
								onShow: this.popupShowing,
								onContinue: this.onFailedContinue
							})
						}), "failed-unknown" === e && (0, $.jsx)(fe, {
							children: (0, $.jsx)(Se, {
								source: "gameDataFailure-popup",
								onReload: this.onSelectReload,
								onShow: this.popupShowing,
								onContinue: this.onFailedContinue
							})
						})]
					})
				}
			}
			je.contextType = n.r;
			const Ce = (0, l.p)((0, l.v)((0, u.$9)(je)));
			var Ae = a(55124),
				Te = a(48894),
				be = a(48331);
			const Ee = new(a(64170).A)("unityApsReady");
			let ke;
			const Ge = () => {
					const {
						apsSyncTimerMs: e
					} = (0, g.lZ)();
					return e || 3e4
				},
				Ie = async (e, t) => {
					try {
						const a = JSON.parse(e.data);
						await Me(a), ke = t
					} catch (a) {
						throw new Te.m("setAPIDataToIDB", a)
					}
				}, Re = async (e, t, a) => {
					if (!e) return null;
					const {
						data: s,
						updatedAtTz: n
					} = e;
					if (!s || !(!t || n !== ke)) return null;
					ke = n;
					const r = be.A.getGameTimeInSec();
					(e => {
						const {
							gameSlug: t
						} = (0, g.lZ)();
						Ae.U.Instance.setItem(`_czy_${t}_pt`, `${e}`)
					})(r);
					return await de.Instance.execute(new ce({
						store: s,
						version: (0, ie.A)(),
						updatedAtTz: n,
						playedTime: r
					}, a))
				}, Pe = async (e, t) => {
					const a = (0, w.A)(e.metadata.updatedAt, "yyyy-MM-dd HH:mm:ss", new Date),
						s = parseInt((0, f.A)((0, y.A)(a, -a.getTimezoneOffset()), "T"));
					let n;
					try {
						n = await Fe()
					} catch (r) {
						null === t || void 0 === t || t.debug("Existing data err: ", r)
					}
					if (!n) return null === t || void 0 === t || t.debug("no local"), void await Ie(e, s);
					if (n === s) return null === t || void 0 === t || t.debug("same"), void(ke = n);
					if (n > s && n - s < Ge()) {
						null === t || void 0 === t || t.debug("choosing LS", n, s);
						const e = await Le();
						await Re(e, !1)
					} else null === t || void 0 === t || t.debug("choosing API"), await Ie(e, s)
				}, Le = async () => Ue(), Fe = async () => Ne(), Me = async e => He(e), Ue = async () => {
					Ee.sendMessage({
						type: "getExistingIndexedData"
					});
					return await Ee.receiveMessage("getExistingIndexedDataResult")
				}, Ne = async () => {
					Ee.sendMessage({
						type: "getUpdatedAtTz"
					});
					return await Ee.receiveMessage("getUpdatedAtTzResult")
				}, He = async e => {
					Ee.sendMessage({
						type: "installUnityGameData",
						gameData: e
					});
					return await Ee.receiveMessage("installUnityGameDataResult")
				}, ze = async () => {
					Ee.sendMessage({
						type: "deleteProgressRequest"
					});
					return await Ee.receiveMessage("deleteProgressRequestResponse")
				}, Oe = () => {
					const {
						onSaveVersionConflict: e
					} = s.useContext(Q);
					return s.useEffect((() => {
						const t = window.setInterval((async () => {
							try {
								var t, a;
								const s = await Le(),
									r = await Re(s, !0);
								if (!r) return;
								"error-throw" === r.status && r.error instanceof le.L && null !== (t = r.error.result) && void 0 !== t && null !== (a = t.errors) && void 0 !== a && a.some((e => {
									var t;
									return (null === e || void 0 === e || null === (t = e.extensions) || void 0 === t ? void 0 : t.code) === ne.u1
								})) && e(s), "error" === r.status && me.A.getInstance().sendEvent({
									type: "apsIssue",
									issueType: "runtime-save-fail",
									loaderName: (0, g.lZ)().loader,
									hasUserLoaded: n.Gd,
									hasScriptLoaded: !1,
									jsondata: JSON.stringify({
										attempt: r.attempt
									})
								})
							} catch (s) {
								console.error("[UPGFConnector] syncUnityData err: ", s)
							}
						}), Ge());
						return () => {
							window.clearInterval(t)
						}
					}), [e]), s.useEffect((() => (i.A.Instance.setCachedSyncUnityData((async () => {
						var t, a;
						const s = await Le(),
							r = await Re(s, !0);
						r && ("error-throw" === r.status && r.error instanceof le.L && null !== (t = r.error.result) && void 0 !== t && null !== (a = t.errors) && void 0 !== a && a.some((e => {
							var t;
							return (null === e || void 0 === e || null === (t = e.extensions) || void 0 === t ? void 0 : t.code) === ne.u1
						})) && e(s), "error" === r.status && me.A.getInstance().sendEvent({
							type: "apsIssue",
							issueType: "runtime-save-fail",
							loaderName: (0, g.lZ)().loader,
							hasUserLoaded: n.Gd,
							hasScriptLoaded: !1,
							jsondata: JSON.stringify({
								attempt: r.attempt
							})
						}))
					})), () => {
						i.A.Instance.setCachedSyncUnityData(null)
					})), [e]), null
				}, qe = e => {
					let {
						logger: t
					} = e;
					const {
						onSaveVersionConflict: a
					} = s.useContext(Q);
					return s.useEffect((() => {
						const e = async e => {
							try {
								const {
									type: s
								} = e.data;
								if ("syncUnityGameData" === s) t.debug("syncUnityGameData requested"), (async () => {
									var e, t;
									const s = await Le(),
										n = await Re(s, !0);
									n && "error-throw" === n.status && n.error instanceof le.L && null !== (e = n.error.result) && void 0 !== e && null !== (t = e.errors) && void 0 !== t && t.some((e => {
										var t;
										return (null === e || void 0 === e || null === (t = e.extensions) || void 0 === t ? void 0 : t.code) === ne.u1
									})) && a(s)
								})()
							} catch (s) {
								t.err(new Error("message err: "), s)
							}
						};
						return window.addEventListener("message", e), () => {
							window.removeEventListener("message", e)
						}
					}), [t, a]), null
				}, Ve = e => {
					let {
						logger: t
					} = e;
					return (0, $.jsxs)($.Fragment, {
						children: [(0, $.jsx)(Oe, {}), (0, $.jsx)(qe, {
							logger: t
						})]
					})
				};
			var Be = a(46398),
				Ze = a(72677);
			class _e extends s.PureComponent {
				constructor(e) {
					super(e), this.context = void 0, this.logger = (0, d.DV)((0, o.HV)()).withPrefix("[APS-Unity]"), this.popupShowing = e => {
						this.setState({
							popupCurrentlyShowing: e
						})
					}, this.onDeleteProgressRequest = async () => {
						await (async () => ze())(), b.A.deleteProgressRequestResponse()
					}, this.startGameOnFailure = () => {
						var e;
						(0, o.FH)(), null === (e = i.A.Instance.getDeferred()) || void 0 === e || e.resolve(), (0, m.zP)({
							type: "load",
							status: "end",
							success: !1
						})
					}, this.onFailedContinue = () => {
						this.setState({
							userStatus: "failed-continue"
						}), this.startGameOnFailure()
					}, this.handleTimeoutStateChange = e => {
						if (!this.state.popupCurrentlyShowing) switch (e) {
							case "userTimeoutTriggered":
								this.setState({
									userStatus: "userTimeout-popup"
								});
								break;
							case "gameDataTimeoutStarted":
								"userTimeout-popup" === this.state.userStatus && this.setState({
									userStatus: "pending"
								});
								break;
							case "gameDataTimeoutTriggered":
								this.setState({
									userStatus: "gameDataTimeout-popup"
								})
						}
					}, this.onSelectReload = () => {
						b.A.refreshGamePage()
					}, this.onForceSave = async e => {
						await Re(e, !1, !0)
					}, this.handleStateChange = (e, t, a) => {
						var s, n, r;
						switch (e) {
							case "resolvingGameData":
								this.logger.debug("resolving game data: "), this.setState({
									userStatus: "resolving"
								});
								break;
							case "noUser":
								this.setState({
									userStatus: "none"
								}), this.logger.debug("has no user: "), null === (s = i.A.Instance.getDeferred()) || void 0 === s || s.resolve();
								break;
							case "reload-popup":
								this.setState({
									userStatus: "reload-popup"
								});
								break;
							case "resolvedGameData":
								let e;
								if (null === (n = i.A.Instance.getDeferred()) || void 0 === n || n.resolve(), this.setState({
										userStatus: "normal"
									}), null !== t && void 0 !== t && null !== (r = t.gameData) && void 0 !== r && r.metadata.updatedAt) {
									var d, l;
									const a = (null === t || void 0 === t || null === (d = t.gameData) || void 0 === d ? void 0 : d.metadata.updatedAt).includes("T") ? "yyyy-MM-dd'T'HH:mm:ss.SSSX" : "yyyy-MM-dd HH:mm:ss",
										s = (0, w.A)(null === t || void 0 === t || null === (l = t.gameData) || void 0 === l ? void 0 : l.metadata.updatedAt, a, new Date);
									e = (0, y.A)(s, -s.getTimezoneOffset())
								}(0, m.zP)({
									type: "load",
									status: "end",
									success: !0,
									lastSaveAt: e
								});
								break;
							case "failed":
								(0, o.vm)(this.state.userStatus, a), this.setState({
									userStatus: "failed-unknown"
								})
						}
					}, this.handleEmptyGameData = async () => {
						const e = await Le();
						await Re(e, !1)
					}, this.onPreloadGame = () => {
						i.A.Instance.setDeferred((0, r.v6)())
					}, this.loadApsInterjector = () => {
						const e = (0, Ze.z)(),
							t = (0, g.lZ)().loaderOptions,
							a = t.unitySaveFileNames ? t.unitySaveFileNames[0] : void 0;
						if ("unity56" === e) return A("unity", (0, Be.y)("unity56"), a);
						if ("unity2020" === e) return A("unity", (0, Be.y)("unity2020"), a);
						throw new Error("Not supported unity version")
					}, this.logger.debug("enabled"), this.state = {
						userStatus: "pending",
						popupCurrentlyShowing: void 0
					}
				}
				componentDidMount() {
					(0, o.Kn)("Loading Unity loader"), this.onPreloadGame(), this.loadApsInterjector().catch((e => {
						(0, o.vm)(this.state.userStatus, e), this.setState({
							userStatus: "failed-unknown"
						})
					}))
				}
				componentDidUpdate() {
					this.state.userStatus !== i.A.Instance.getApsUserStatus() && i.A.Instance.setApsUserStatus(this.state.userStatus)
				}
				render() {
					const {
						userStatus: e
					} = this.state, t = "NOT_STARTED" !== this.props.gameLoadStatus;
					return (0, $.jsxs)($.Fragment, {
						children: [(0, $.jsx)(p, {
							handleEmptyGameData: this.handleEmptyGameData,
							handleGameData: Pe,
							handleGetUserGameData: o.Xc,
							handleStateChange: this.handleStateChange,
							forceStop: "failed-unknown" === e || "failed-continue" === e,
							logger: this.logger
						}), (0, $.jsx)(xe, {
							onStatusChange: this.handleTimeoutStateChange,
							userStatus: e
						}), (0, $.jsx)(De, {
							onDeleteProgressRequest: this.onDeleteProgressRequest
						}), "normal" === e && t && (0, $.jsx)(se, {
							onForceSave: this.onForceSave,
							children: (0, $.jsx)(Ve, {
								logger: this.logger
							})
						}), "reload-popup" === e && (0, $.jsx)(fe, {
							children: (0, $.jsx)(ge, {
								onReload: this.onSelectReload
							})
						}), "userTimeout-popup" === e && (0, $.jsx)(fe, {
							children: (0, $.jsx)(Se, {
								source: "userTimeout-popup",
								onReload: this.onSelectReload,
								onShow: this.popupShowing,
								onContinue: this.onFailedContinue
							})
						}), "gameDataTimeout-popup" === e && (0, $.jsx)(fe, {
							children: (0, $.jsx)(Se, {
								source: "gameDataTimeout-popup",
								onReload: this.onSelectReload,
								onShow: this.popupShowing,
								onContinue: this.onFailedContinue
							})
						}), "failed-unknown" === e && (0, $.jsx)(fe, {
							children: (0, $.jsx)(Se, {
								source: "gameDataFailure-popup",
								onReload: this.onSelectReload,
								onShow: this.popupShowing,
								onContinue: this.onFailedContinue
							})
						})]
					})
				}
			}
			_e.contextType = n.r;
			const $e = (0, l.p)((0, l.v)((0, u.$9)(_e))),
				Ke = () => {
					const {
						onSaveVersionConflict: e
					} = s.useContext(Q);
					return s.useEffect((() => {
						const t = t => {
							var a;
							try {
								const {
									type: s
								} = t.data;
								if ("saveSdkGameData" === s)(async t => {
									var a, s, r, o;
									const i = await de.Instance.execute(new ue(t));
									switch (i.status) {
										case "ok":
										case "throttled":
											break;
										case "error-throw":
										case "error":
											i.error instanceof le.L && null !== (a = i.error.result) && void 0 !== a && null !== (s = a.errors) && void 0 !== s && s.some((e => {
												var t;
												return (null === e || void 0 === e || null === (t = e.extensions) || void 0 === t ? void 0 : t.code) === ne.u1
											})) && e(t), "error" === i.status && me.A.getInstance().sendEvent({
												type: "apsIssue",
												issueType: "runtime-save-fail",
												loaderName: (0, g.lZ)().loader,
												hasUserLoaded: n.Gd,
												hasScriptLoaded: !1,
												jsondata: JSON.stringify({
													attempt: i.attempt
												})
											}), b.A.sendSDKError({
												errorName: "gf-save-fail",
												module: "data",
												specificValues: {
													error: i.error,
													message: null === (r = i.error) || void 0 === r ? void 0 : r.message,
													name: null === (o = i.error) || void 0 === o ? void 0 : o.name
												}
											})
									}
								})(null === (a = t.data) || void 0 === a ? void 0 : a.data)
							} catch (s) {
								console.error(s)
							}
						};
						return window.addEventListener("message", t), () => {
							window.removeEventListener("message", t)
						}
					}), [e]), null
				},
				We = e => {
					let {
						onError: t,
						loader: a,
						unityRawIDBId: n,
						customSaveFileName: r
					} = e;
					return s.useEffect((() => {
						A(a, n, r).catch((e => {
							t(e)
						}))
					}), []), null
				};
			var Xe = a(67624),
				Je = a(94856);
			const Qe = (0, d.DV)((0, o.HV)()).withPrefix("[APS-SDKPS]");

			function Ye() {
				const e = (0, g.lZ)().loader;
				return g.V7.includes(e) && (0, o.m0)() ? "iframe" : "ruffle" === e && (0, o.qX)() ? "ruffle" : g.el.includes(e) && (0, o.jl)() ? "unity" : null
			}
			const et = () => {
					const {
						gameLoadStatus: e
					} = s.useContext(h.P), [t, a] = s.useState(!1), [n, l] = s.useState("pending"), [u, c] = s.useState(), v = s.useRef({
						status: "loading"
					}), f = s.useRef([]), y = s.useRef(), w = "NOT_STARTED" !== e;
					i.A.Instance.getDeferred() || i.A.Instance.setDeferred((0, r.v6)()), s.useEffect((() => {
						i.A.Instance.setApsUserStatus(n)
					}), [n]), s.useEffect((() => {
						const e = e => {
							try {
								const {
									type: t
								} = e.data;
								if ("requestSdkGameDataNew" === t) f.current.push(e.source), C()
							} catch (t) {
								Qe.error("Failed to handle requestSdkGameDataNew", t)
							}
						};
						return window.addEventListener("message", e), () => {
							window.removeEventListener("message", e)
						}
					}), []);
					const S = e => {
							var t, a;
							switch (e) {
								case "resolvedGameData":
								case "noUser":
									null === (t = y.current) || void 0 === t || t.resolve();
									break;
								case "failed":
									null === (a = y.current) || void 0 === a || a.reject(new Error("apsLoad-failed"))
							}
						},
						x = s.useCallback((() => {
							var e;
							null === (e = y.current) || void 0 === e || e.reject(new Error("apsLoad-failed"))
						}), []);
					const D = () => {
							const e = (0, Ze.z)();
							if ("unity56" === e) return (0, Be.y)("unity56");
							if ("unity2020" === e) return (0, Be.y)("unity2020");
							throw new Error("Not supported unity version")
						},
						j = () => {
							b.A.refreshGamePage()
						},
						C = () => {
							v.current && 0 !== f.current.length && (f.current.forEach((e => {
								"loaded" !== v.current.status && "failed" !== v.current.status || (e.postMessage({
									type: "sdkGameDataResponseNew",
									data: v.current
								}, "*"), Qe.debug("Sending game data to SDK", v.current))
							})), f.current = [])
						},
						A = e => e instanceof Error && "forceApsGameDataFail" === e.message ? (b.A.sendSDKError({
							errorName: "gf-preload-url-fail",
							module: "data",
							specificValues: {
								error: e,
								message: e.message,
								name: e.name
							}
						}), void Qe.error("Failed to load SDKPS data URL", e)) : e instanceof Xe.M ? (b.A.sendSDKError({
							errorName: "gf-preload-url-fail",
							module: "data",
							specificValues: {
								error: e,
								message: e.message,
								name: e.name,
								timeoutMs: o.Nl
							}
						}), void Qe.error("Failed to load SDKPS data URL", e)) : e instanceof le.L ? (b.A.sendSDKError({
							errorName: "gf-preload-url-fail",
							module: "data",
							specificValues: {
								error: e,
								message: e.message,
								name: e.name
							}
						}), void Qe.error("Failed to load SDKPS data URL", e)) : void(e instanceof Error && ("fetch-fail" === e.message || "TimeoutError" === e.name) && (b.A.sendSDKError({
							errorName: "gf-preload-data-fail",
							module: "data",
							specificValues: {
								error: e,
								message: e.message,
								name: e.name,
								timeoutMs: "TimeoutError" === e.name ? o.Nl : void 0
							}
						}), Qe.error("Failed to load SDKPS data JSON", e))),
						E = s.useCallback((e => {
							if (!u) switch (e) {
								case "userTimeoutTriggered":
									l("userTimeout-popup");
									break;
								case "gameDataTimeoutStarted":
									"userTimeout-popup" === n && l("pending");
									break;
								case "gameDataTimeoutTriggered":
									l("gameDataTimeout-popup")
							}
						}), [n, u]),
						k = s.useCallback((e => {
							c(e)
						}), []),
						G = () => {
							l("failed-continue"), (() => {
								var e;
								v.current.status = "failed", C(), null === (e = i.A.Instance.getDeferred()) || void 0 === e || e.resolve(), (0, m.zP)({
									type: "load",
									status: "end",
									success: !1
								})
							})()
						};
					return (0, $.jsxs)($.Fragment, {
						children: [(0, $.jsx)(xe, {
							onStatusChange: E,
							userStatus: n
						}), (0, $.jsx)(p, {
							handleGetUserGameData: o.aA,
							handleEmptyGameData: async () => {
								Ye() && (a(!0), y.current = (0, r.v6)(), await y.current.promise), v.current = {
									hasData: !1,
									status: "loaded"
								}, C()
							},
							handleGameData: async e => {
								v.current = {
									data: e.data,
									hasData: !0,
									status: "loaded"
								}, C()
							},
							handleStateChange: (e, t, a) => {
								var s, n, r;
								switch (e) {
									case "resolvingGameData":
										d.vF.debug("resolving game data: "), l("resolving");
										break;
									case "noUser":
										d.vF.debug("has no user: "), l("none"), null === (s = i.A.Instance.getDeferred()) || void 0 === s || s.resolve();
										break;
									case "reload-popup":
										l("reload-popup");
										break;
									case "resolvedGameData":
										let e;
										if (d.vF.debug("game data resolved: "), l("normal"), null === (n = i.A.Instance.getDeferred()) || void 0 === n || n.resolve(), null !== t && void 0 !== t && null !== (r = t.gameData) && void 0 !== r && r.metadata.updatedAt && 0 !== Object.keys((null === t || void 0 === t ? void 0 : t.gameData).data).length) {
											var o;
											e = (0, Je.A)(null === t || void 0 === t || null === (o = t.gameData) || void 0 === o ? void 0 : o.metadata.updatedAt)
										}(0, m.zP)({
											type: "load",
											status: "end",
											success: !0,
											lastSaveAt: e
										});
										break;
									case "failed":
										A(a), l("failed-unknown")
								}
							},
							forceStop: "failed-unknown" === n || "failed-continue" === n,
							logger: d.vF
						}), (0, $.jsx)(De, {
							onDeleteProgressRequest: async () => {
								await new ue({
									jsonData: "{}"
								}, !0).fn(), b.A.deleteProgressRequestResponse()
							}
						}), t && function() {
							switch (Ye()) {
								case "iframe":
									return (0, $.jsxs)($.Fragment, {
										children: [(0, $.jsx)(p, {
											handleGetUserGameData: o.Xc,
											handleGameData: T,
											handleStateChange: S,
											logger: d.vF
										}), (0, $.jsx)(We, {
											onError: x,
											loader: "iframe"
										})]
									});
								case "ruffle":
									return (0, $.jsxs)($.Fragment, {
										children: [(0, $.jsx)(p, {
											handleGetUserGameData: o.Xc,
											handleGameData: T,
											handleStateChange: S,
											logger: d.vF
										}), (0, $.jsx)(We, {
											onError: x,
											loader: "ruffle"
										})]
									});
								case "unity":
									const e = D(),
										t = (0, g.lZ)().loaderOptions,
										a = t.unitySaveFileNames ? t.unitySaveFileNames[0] : void 0;
									return (0, $.jsxs)($.Fragment, {
										children: [(0, $.jsx)(p, {
											handleGetUserGameData: o.Xc,
											handleGameData: Pe,
											handleStateChange: S,
											logger: d.vF
										}), (0, $.jsx)(We, {
											onError: x,
											loader: "unity",
											unityRawIDBId: e,
											customSaveFileName: a
										})]
									});
								default:
									return null
							}
						}(), "normal" === n && w && (0, $.jsx)(se, {
							onForceSave: async e => {
								await de.Instance.execute(new ue(e, !0))
							},
							children: (0, $.jsx)(Ke, {})
						}), "reload-popup" === n && (0, $.jsx)(fe, {
							children: (0, $.jsx)(ge, {
								onReload: j
							})
						}), "userTimeout-popup" === n && (0, $.jsx)(fe, {
							children: (0, $.jsx)(Se, {
								source: "userTimeout-popup",
								onReload: j,
								onShow: k,
								onContinue: G
							})
						}), "gameDataTimeout-popup" === n && (0, $.jsx)(fe, {
							children: (0, $.jsx)(Se, {
								source: "gameDataTimeout-popup",
								onReload: j,
								onShow: k,
								onContinue: G
							})
						}), "failed-unknown" === n && (0, $.jsx)(fe, {
							children: (0, $.jsx)(Se, {
								source: "gameDataFailure-popup",
								onReload: j,
								onShow: k,
								onContinue: G
							})
						})]
					})
				},
				tt = () => {
					const {
						progressSyncHandler: e
					} = s.useContext(m.Q3);
					switch (e) {
						case "none":
							return null;
						case "sdkps":
							return (0, $.jsx)(et, {});
						case "aps-iframe":
							return (0, $.jsx)(Ce, {
								loader: "iframe"
							});
						case "aps-ruffle":
							return (0, $.jsx)(Ce, {
								loader: "ruffle"
							});
						case "aps-unity":
							return (0, $.jsx)($e, {});
						default:
							throw new Error(`Unhandled APS handler ${e}`)
					}
				}
		},
		64170: (e, t, a) => {
			a.d(t, {
				A: () => n
			});
			var s = a(37731);
			const n = class {
				constructor(e) {
					this.readyMessage = e, this.windowSource = null, this.queuedMessages = [], this.messageListeners = [], this.sendMessage = e => {
						this.windowSource ? this.windowSource.postMessage(e, "*") : this.queuedMessages.push(e)
					}, this.receiveMessage = async e => {
						const t = (0, s.v6)();
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
		46398: (e, t, a) => {
			a.d(t, {
				y: () => o
			});
			var s = a(48591),
				n = a(5424);
			const r = window.location.href.includes("localIframeWorker=true");

			function o(e) {
				const t = (0, n.lZ)(),
					a = r ? "http://localhost:5014/local" : `https://${t.gameSlug}.${s.y}`;
				switch (e) {
					case "unity2020":
						return `${a}/unity/unity2020`;
					case "unity56":
						return `${a}/unity/unity56`;
					case "unity54":
						return `${a}/unity/unity54`
				}
			}
		}
	}
]);