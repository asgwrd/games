"use strict";
(globalThis.webpackChunkcrazygames_gameframe = globalThis.webpackChunkcrazygames_gameframe || []).push([
    [6551], {
        86551: (exports, modules, require) => {
            require.r(exports);
            require.d(exports, {
                default: () => UnityLoaderComponent
            });

            // Import dependencies
            const React = require(9950),
                { useGameContext: useGameContext } = require(5424),
                { getContainer: getContainer } = require(37731),
                LoadingSpinner = require(22063),
                UnityMessenger = require(23379),
                { GameContext: GameContext } = require(57429),
                { WindowMessenger: WindowMessenger } = require(64170),
                { LoadingContext: LoadingContext } = require(7967),
                { createUnityIframe: createUnityIframe, isWebGLSupported: isWebGLSupported } = require(52993),
                { FullscreenContext: FullscreenContext } = require(25596),
                { isMobile: isMobile } = require(14953),
                Analytics = require(60646),
                FullscreenWarning = require(77217),
                { showError: showError } = require(47638),
                { getUnityBuildUrl: getUnityBuildUrl } = require(46398),
                { defer: defer } = require(1652),
                { getUserInfo: getUserInfo } = require(41160),
                { jsx: jsx } = require(44414);

            // Constants
            const UNITY_READY_EVENT = new WindowMessenger("unity54ready");

            const UnityLoaderComponent = () => {
                // Context hooks
                const { isGameDisabled } = React.useContext(GameContext);
                const { isFullscreen, requestFullscreen } = React.useContext(FullscreenContext);
                const { onLoadFinished } = React.useContext(LoadingContext);
                
                // State management
                const [status, setStatus] = React.useState("loading");
                const loaderRef = React.useRef();
                const loadTrackerRef = React.useRef(null);
                
                // Initialize load tracker
                if (!loadTrackerRef.current) {
                    loadTrackerRef.current = new UnityMessenger();
                }

                // Effect: Manage Unity iframe lifecycle
                React.useEffect(() => {
                    if (isGameDisabled) {
                        if (loaderRef.current) {
                            loaderRef.current.remove();
                            loaderRef.current = null;
                        }
                        return;
                    }

                    const gameConfig = useGameContext();
                    const unityUrl = `${getUnityBuildUrl("unity54")}/${gameConfig.gameSlug}.html${window.location.search}`;
                    const unityIframe = createUnityIframe(unityUrl);
                    
                    loaderRef.current = unityIframe;
                    
                    // Focus game when mounted
                    defer(() => {
                        UNITY_READY_EVENT.sendMessage({ type: "focusGame" });
                    });

                    getContainer().appendChild(unityIframe);
                }, [isGameDisabled]);

                // Effect: Handle fullscreen changes
                React.useEffect(() => {
                    if (status === "loaded") {
                        const messageType = isFullscreen 
                            ? "unity54RequestFullScreen" 
                            : "unity54DisableFullScreen";
                        UNITY_READY_EVENT.sendMessage({ type: messageType });
                    }
                }, [isFullscreen, status]);

                // Effect: Initialize Unity configuration
                React.useEffect(() => {
                    const initializeUnity = async () => {
                        if (!(await isWebGLSupported())) {
                            showError("Unity WebGL is not available on this browser");
                            setStatus("error");
                            return;
                        }

                        const gameConfig = useGameContext();
                        const initializationData = {
                            gameLink: gameConfig.gameLink,
                            userInfo: getUserInfo()
                        };

                        UNITY_READY_EVENT.sendMessage({
                            type: "unity54config",
                            loaderOptions: gameConfig.loaderOptions,
                            oldSdkInitObject: initializationData
                        });

                        loadTrackerRef.current.trackLoadStarted();
                    };

                    initializeUnity();
                }, []);

                // Effect: Handle Unity messages
                React.useEffect(() => {
                    const handleUnityMessages = (event) => {
                        switch (event.data.type) {
                            case "loadFinished":
                                loadTrackerRef.current.trackLoadFinished();
                                const shouldForceFullscreen = 
                                    useGameContext().fullscreen === "REQUIRED" &&
                                    !isMobile() &&
                                    !isFullscreen;
                                
                                if (!shouldForceFullscreen) {
                                    setStatus("loaded");
                                    onLoadFinished();
                                } else {
                                    setStatus("fullscreen");
                                }
                                break;
                            
                            case "unityMemoryUsage":
                                Analytics.getInstance().sendEvent(event.data.usageData);
                                break;
                        }
                    };

                    window.addEventListener("message", handleUnityMessages);
                    return () => window.removeEventListener("message", handleUnityMessages);
                }, [onLoadFinished, isFullscreen]);

                // Handle fullscreen activation
                const handleFullscreenRequest = async () => {
                    await requestFullscreen();
                    setStatus("loaded");
                    onLoadFinished();
                };

                // Render state-dependent UI
                switch (status) {
                    case "loading":
                        return jsx(LoadingSpinner, { showProgress: false });
                    
                    case "error":
                        return jsx(FullscreenWarning, { warning: "unity-unavailable" });
                    
                    case "fullscreen":
                        return jsx(FullscreenWarning, { 
                            warning: "force-fullscreen",
                            close: handleFullscreenRequest
                        });
                    
                    default:
                        return null;
                }
            };
        },
        
        52993: (exports, modules) => {
            // WebGL support checks
            modules.d(exports, {
                MN: () => isWebGLSupported,
                UR: () => createUnityIframe,
                ap: () => isWebGL2Supported
            });

            const { isMobile: isMobile } = require(14953),
                { SANDBOX_PERMISSIONS: SANDBOX_PERMISSIONS } = require(48591);

            function isWebGL2Supported() {
                if (isMobile()) return false;
                try {
                    const canvas = document.createElement("canvas");
                    return !!window.WebGL2RenderingContext && !!canvas.getContext("webgl2");
                } catch {
                    return false;
                }
            }

            function isWebGLSupported() {
                if (isMobile()) return false;
                try {
                    const canvas = document.createElement("canvas");
                    return !!window.WebGLRenderingContext && (
                        !!canvas.getContext("webgl") || 
                        !!canvas.getContext("experimental-webgl")
                    );
                } catch {
                    return false;
                }
            }

            function createUnityIframe(src) {
                const iframe = document.createElement("iframe");
                iframe.src = src;
                iframe.style.border = "0";
                iframe.style.backgroundColor = "#fff";
                iframe.style.width = "10px";
                iframe.style.height = "10px";
                iframe.style.minWidth = "100%";
                iframe.style.minHeight = "100%";
                
                // Security settings
                iframe.setAttribute("allow", `
                    accelerometer; 
                    gyroscope; 
                    gamepad; 
                    autoplay; 
                    payment; 
                    fullscreen; 
                    microphone; 
                    clipboard-read; 
                    clipboard-write 'self' ${src}
                `);
                
                iframe.setAttribute("sandbox", "");
                iframe.sandbox.add(...SANDBOX_PERMISSIONS);
                
                return iframe;
            }
        },

        64170: (exports, modules) => {
            // Window message handler
            modules.d(exports, {
                A: () => WindowMessenger
            });

            const { createDeferred: createDeferred } = require(37731);

            class WindowMessenger {
                constructor(readyMessageType) {
                    this.readyMessageType = readyMessageType;
                    this.messageQueue = [];
                    this.pendingRequests = [];
                    this.sourceWindow = null;

                    window.addEventListener("message", this.handleIncomingMessages);
                }

                sendMessage(message) {
                    if (this.sourceWindow) {
                        this.sourceWindow.postMessage(message, "*");
                    } else {
                        this.messageQueue.push(message);
                    }
                }

                async receiveMessage(messageType) {
                    const deferred = createDeferred();
                    this.pendingRequests.push({
                        promise: deferred,
                        messageType
                    });
                    return deferred.promise;
                }

                handleIncomingMessages = (event) => {
                    if (event.data.type === this.readyMessageType) {
                        this.sourceWindow = event.source;
                        this.flushMessageQueue();
                    }

                    this.processPendingRequests(event);
                };

                flushMessageQueue() {
                    while (this.messageQueue.length > 0) {
                        const message = this.messageQueue.shift();
                        this.sourceWindow.postMessage(message, "*");
                    }
                }

                processPendingRequests(event) {
                    this.pendingRequests.forEach((request, index) => {
                        if (request.messageType === event.data.type) {
                            event.data.isSuccessful 
                                ? request.promise.resolve(event.data.result)
                                : request.promise.reject(
                                    new Error(`WindowMessenger:${event.data.type} failed`)
                                );
                            this.pendingRequests.splice(index, 1);
                        }
                    });
                }
            }
        },

        46398: (exports, modules) => {
            // URL builder for Unity builds
            modules.d(exports, {
                y: () => getUnityBuildUrl
            });

            const { DOMAINS: DOMAINS } = require(48591),
                { useGameContext: useGameContext } = require(5424);

            const isLocalDevelopment = window.location.href.includes("localIframeWorker=true");

            function getUnityBuildUrl(buildType) {
                const { gameSlug } = useGameContext();
                const baseUrl = isLocalDevelopment
                    ? "http://localhost:5014/local"
                    : `https://${gameSlug}.${DOMAINS.unity}`;

                return {
                    unity2020: `${baseUrl}/unity/unity2020`,
                    unity56: `${baseUrl}/unity/unity56`,
                    unity54: `${baseUrl}/unity/unity54`
                }[buildType];
            }
        }
    }
]);