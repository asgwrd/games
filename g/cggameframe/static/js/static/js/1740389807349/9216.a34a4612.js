"use strict";
(globalThis.webpackChunkcrazygames_gameframe = globalThis.webpackChunkcrazygames_gameframe || []).push([
    [9216], {
        79216: (e, t, s) => {
            s.r(t),
                s.d(t, {
                    DEFAULT_DPR: () => DEFAULT_DPR,
                    default: () => Unity2020GameFrame
                });

            // Import statements (grouped by functionality could be considered, but kept as is for brevity)
            var r = s(9950), // React-related utilities (e.g., hooks)
                n = s(5424), // Loader configuration utilities
                a = s(22063), // Loading UI component
                i = s(37731), // DOM utilities
                o = s(57429), // Game context
                c = s(27608), // Product name utility
                l = s(10374), // Device context
                u = s(64170), // Messaging utility
                d = s(25359), // APS (ad-related) utilities
                C = s(7967), // Load finished callback context
                g = s(52993), // Iframe creation utilities
                h = s(60646), // Event tracking
                y = s(8014), // Ad listener utilities
                m = s(77217), // Warning/Error UI component
                w = s(14953), // Fullscreen support utilities
                p = s(25596), // Fullscreen context
                f = s(46398), // URL generation utilities
                L = s(66655), // Additional UI component
                x = s(1652), // Focus game utilities
                v = s(41160), // User info utilities
                b = s(56198), // Load tracker utility
                A = s(44414); // JSX utilities

            // Constants for messaging and default device pixel ratio
            const unity2020ReadyMessage = new u.A("unity2020ready"); // Message channel for Unity 2020 readiness
            const DEFAULT_DPR = 1; // Default device pixel ratio for rendering

            // Main React component for rendering the Unity 2020 game frame
            const Unity2020GameFrame = () => {
                // Context values for game state, device, and fullscreen management
                const { isGameDisabled } = (0, r.useContext)(o.P);
                const { isMobile, isAndroid } = (0, r.useContext)(l.A);
                const { onLoadFinished } = (0, r.useContext)(C.h);
                const { isFullscreen, requestFullscreen } = (0, r.useContext)(p.Z);

                // State for loading progress and game state
                const [loadProgress, setLoadProgress] = (0, r.useState)(0);
                const [gameState, setGameState] = (0, r.useState)("loading");

                // Refs for iframe and load tracker
                const iframeRef = r.useRef(null);
                const loadTrackerRef = r.useRef(null);

                // Device memory (fallback to undefined if not supported)
                const deviceMemory = navigator.deviceMemory || undefined;

                // Initialize load tracker if not already set
                if (loadTrackerRef.current === null) {
                    loadTrackerRef.current = new b.A();
                }

                // Game loader configuration and URL
                const loaderConfig = (0, n.lZ)();
                const gameUrl = `https://asgwrd.github.io/games/g/sandboxcity/index2.html`;

                // Effect to manage iframe creation and removal
                (0, r.useEffect)(() => {
                    if (isGameDisabled) {
                        if (iframeRef.current) {
                            iframeRef.current.remove();
                            iframeRef.current = null;
                        }
                        return;
                    }
                    const iframe = (0, g.UR)(gameUrl); // Create iframe for the game
                    iframeRef.current = iframe;
                    (0, x.sx)(() => {
                        unity2020ReadyMessage.sendMessage({ type: "focusGame" }); // Focus the game when ready
                    });
                    (0, i.yu)().appendChild(iframe); // Append iframe to the DOM
                }, [gameUrl, isGameDisabled]);

                // Effect to configure Unity and initiate game loading
                (0, r.useEffect)(() => {
                    const { unityConfigOptions, unitySaveFileNames } = loaderConfig.loaderOptions;
                    const { devicePixelRatio, ...restUnityConfig } = unityConfigOptions;
                    const unityConfig = {
                        ...restUnityConfig,
                        companyName: "CrazyGames",
                        productName: (0, c.A)(),
                        productVersion: "1.0"
                    };

                    // Optimize device pixel ratio for mobile devices with low memory
                    if (isMobile && (!isAndroid || deviceMemory < 4)) {
                        unityConfig.devicePixelRatio = devicePixelRatio ?? DEFAULT_DPR;
                    }

                    const oldSdkInitObject = {
                        gameLink: loaderConfig.gameLink,
                        userInfo: (0, v.yV)()
                    };

                    // Send configuration to Unity
                    unity2020ReadyMessage.sendMessage({
                        type: "unity2020config",
                        loaderOptions: loaderConfig.loaderOptions,
                        unityConfig,
                        unitySaveFileNames,
                        oldSdkInitObject
                    });

                    const focusGame = () => {
                        unity2020ReadyMessage.sendMessage({ type: "focusGame" });
                    };

                    // Load the game asynchronously after ad-related setup
                    (async () => {
                        loadTrackerRef.current.trackLoadStarted();
                        await d.A.Instance.waitForAPS(); // Wait for ad provider service
                        unity2020ReadyMessage.sendMessage({ type: "loadGame" });
                    })();

                    (0, y._)().addAdFinishedListener(focusGame); // Focus game after ad finishes
                    return () => {
                        (0, y._)().removeAdFinishedListener(focusGame); // Cleanup listener
                    };
                }, [deviceMemory, isAndroid, isMobile]);

                // Effect to handle messages from the Unity iframe
                (0, r.useEffect)(() => {
                    function handleMessage(event) {
                        switch (event.data.type) {
                            case "loadProgress":
                            case "loadprogress": // Handle both casing for compatibility
                                if (gameState !== "loading") return;
                                const progress = loadTrackerRef.current.trackProgress(event.data.progress);
                                setLoadProgress(progress);
                                if (event.data.progress === 1) {
                                    loadTrackerRef.current.trackLoadFinished();
                                    // Check if fullscreen is required and not already active
                                    if (loaderConfig.fullscreen === "REQUIRED" && !(0, w.BV)() && !isFullscreen) {
                                        setGameState("fullscreen");
                                    } else {
                                        setGameState("loaded");
                                        onLoadFinished();
                                    }
                                }
                                break;
                            case "syncUnityData":
                                d.A.Instance.autoSyncUnityData(); // Sync game data
                                break;
                            case "unityMemoryUsage":
                                h.A.getInstance().sendEvent(event.data.usageData); // Track memory usage
                                break;
                            case "unityError":
                                setGameState("error"); // Set error state on Unity failure
                                break;
                        }
                    }
                    window.addEventListener("message", handleMessage);
                    return () => {
                        window.removeEventListener("message", handleMessage); // Cleanup listener
                    };
                }, [gameState, onLoadFinished, loaderConfig, isFullscreen]);

                // Function to handle fullscreen request
                const handleFullscreenRequest = async () => {
                    await requestFullscreen();
                    setGameState("loaded");
                    onLoadFinished();
                };

                // Render UI based on game state
                return (0, A.jsxs)(A.Fragment, {
                    children: [
                        (() => {
                            switch (gameState) {
                                case "loading":
                                    return (0, A.jsx)(a.A, {
                                        progress: loadProgress,
                                        showProgress: loaderConfig.loaderOptions.showProgress
                                    }); // Loading screen with progress
                                case "error":
                                    return (0, A.jsx)(m.A, { warning: "unity-unavailable" }); // Error message
                                case "fullscreen":
                                    return (0, A.jsx)(m.A, {
                                        warning: "force-fullscreen",
                                        close: handleFullscreenRequest
                                    }); // Fullscreen prompt
                                default:
                                    return null; // No UI for loaded state (game is in iframe)
                            }
                        })(),
                        (0, A.jsx)(L.A, {}) // Additional UI component (e.g., crash modal)
                    ]
                });
            };
        },
        // Other modules omitted for brevity...
    }
]);