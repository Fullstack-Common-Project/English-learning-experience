module.exports = [
"[project]/src/components/common/Timer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Timer",
    ()=>Timer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function Timer({ isActive = true, onStop, position = "top-right" }) {
    const [seconds, setSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isActive) return;
        const interval = setInterval(()=>{
            setSeconds((prev)=>prev + 1);
        }, 1000);
        return ()=>{
            clearInterval(interval);
            if (onStop) onStop(seconds);
        };
    }, [
        isActive
    ]);
    // ✅ מיקום דינמי בהתאם לפרופס
    const positionClasses = {
        "top-right": "top-4 right-6",
        "top-left": "top-4 left-6",
        "bottom-right": "bottom-4 right-6",
        "bottom-left": "bottom-4 left-6"
    }[position];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: -10
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: -10
            },
            transition: {
                duration: 0.3
            },
            className: `fixed ${positionClasses} z-50 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-indigo-200`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-indigo-700 font-semibold text-sm flex items-center gap-1",
                children: [
                    "⏱️ ",
                    seconds,
                    "s"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/common/Timer.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        }, "timer", false, {
            fileName: "[project]/src/components/common/Timer.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/common/Timer.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/games/rhyme-time/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RhymeTimePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$howler$2f$dist$2f$howler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/howler/dist/howler.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Timer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Timer.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function RhymeTimePage() {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [round, setRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showFloat, setShowFloat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showFinal, setShowFinal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch("/api/v1/games/rhyme-time/data").then((res)=>res.json()).then((res)=>setData(res.data[0]));
    }, [
        round
    ]);
    const playSound = (points)=>{
        let soundFile = "/sounds/neutral.mp3";
        if (points < 20) soundFile = "/sounds/bad.mp3";
        else if (points < 50) soundFile = "/sounds/ok.mp3";
        else if (points < 80) soundFile = "/sounds/good.mp3";
        else soundFile = "/sounds/excellent.mp3";
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$howler$2f$dist$2f$howler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Howl"]({
            src: [
                soundFile
            ],
            volume: 0.7
        }).play();
    };
    const handleSelect = (i)=>{
        setSelected((prev)=>prev.includes(i) ? prev.filter((x)=>x !== i) : [
                ...prev,
                i
            ]);
    };
    const handleSubmit = ()=>{
        const correct = data.correctIndices;
        const correctChosen = selected.filter((i)=>correct.includes(i)).length;
        const partial = Math.round(correctChosen / correct.length * 100);
        setScore((s)=>s + partial);
        setShowFloat(partial);
        playSound(partial);
        setTimeout(()=>{
            setShowFloat(null);
            if (round >= 3) setShowFinal(true);
            else {
                setSelected([]);
                setRound((r)=>r + 1);
            }
        }, 1500);
    };
    //   return (
    //     <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center">
    //       <Timer />
    //       {/* ... שאר תוכן המשחק שלך ... */}
    //     </div>
    //   );
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Timer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timer"], {}, void 0, false, {
                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex flex-col items-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "text-indigo-700 font-semibold hover:underline",
                                children: "⬅️ חזרה לדף הבית"
                            }, void 0, false, {
                                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                lineNumber: 72,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-indigo-800 font-bold",
                                children: [
                                    "ניקוד: ",
                                    score
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                lineNumber: 75,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 71,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        className: "bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center",
                        children: !showFinal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-purple-700 mb-6",
                                    children: [
                                        "איזו מילה מתחרזת עם ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: data?.word
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                            lineNumber: 86,
                                            columnNumber: 35
                                        }, this),
                                        "?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4 mb-8",
                                    children: data?.options.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                            onClick: ()=>handleSelect(i),
                                            whileTap: {
                                                scale: 0.9
                                            },
                                            animate: {
                                                backgroundColor: selected.includes(i) ? "#ec4899" : "#ffffff",
                                                color: selected.includes(i) ? "#fff" : "#000"
                                            },
                                            className: `rounded-xl border-2 px-6 py-3 font-semibold transition-all ${selected.includes(i) ? "border-pink-500 shadow-lg" : "border-gray-300"}`,
                                            children: opt
                                        }, i, false, {
                                            fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSubmit,
                                    className: "px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md hover:opacity-90",
                                    children: "בדקי תשובה ✅"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl text-green-600 font-bold mb-4",
                                    children: "🎉 כל הכבוד!"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-gray-700 mb-6",
                                    children: [
                                        "סיימת את כל הסבבים! הניקוד הסופי שלך:",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-purple-600 font-extrabold",
                                            children: score
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "text-indigo-700 hover:underline font-semibold",
                                    children: "חזרה למסך הראשי 🏠"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 78,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showFloat !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 30
                            },
                            animate: {
                                opacity: 1,
                                y: -50
                            },
                            exit: {
                                opacity: 0,
                                y: -100
                            },
                            transition: {
                                duration: 1
                            },
                            className: "absolute text-4xl font-bold text-green-500",
                            children: [
                                "+",
                                showFloat
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 143,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                lineNumber: 70,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
} // "use client";
 // import { useState, useEffect } from "react";
 // import { motion } from "framer-motion";
 // import { useGameState } from "@/hooks/useGameState";
 // import GameLayout from "@/components/common/GameLayout";
 // import { useGameStore } from "@/store/gameStore";
 // import Link from "next/link";
 // export default function RhymeTimePage() {
 //   const { stage, nextStage, reset } = useGameState();
 //   const { playerName, setPlayerName, score, setScore } = useGameStore();
 //   const [data, setData] = useState<any>(null);
 //   const [selected, setSelected] = useState<number[]>([]);
 //   const [feedback, setFeedback] = useState("");
 //   useEffect(() => {
 //     fetch("/api/v1/games/rhyme-time/data")
 //       .then((res) => res.json())
 //       .then((res) => setData(res.data[0]));
 //   }, []);
 //   const handleSelect = (index: number) => {
 //     setSelected((prev) =>
 //       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
 //     );
 //   };
 //   const handleSubmit = () => {
 //     if (!data) return;
 //     const correct = data.correctIndices;
 //     const correctChosen = selected.filter((i) => correct.includes(i)).length;
 //     const partial = Math.round((correctChosen / correct.length) * 100);
 //     setScore(score + partial);
 //     setFeedback(`🎯 קיבלת ${partial} נקודות!`);
 //     nextStage();
 //   };
 //   return (
 //     <GameLayout stage={stage}>
 //       {stage === "welcome" && (
 //         <div className="text-center">
 //           <h1 className="text-4xl font-bold text-indigo-600 mb-6">
 //             🎵 Rhyme Time
 //           </h1>
 //           <input
 //             type="text"
 //             placeholder="הכניסי שם משתמש"
 //             value={playerName}
 //             onChange={(e) => setPlayerName(e.target.value)}
 //             className="border rounded-xl px-4 py-2 text-center mb-4"
 //           />
 //           <button
 //             onClick={nextStage}
 //             className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md hover:opacity-90"
 //           >
 //             המשיכי ➡️
 //           </button>
 //         </div>
 //       )}
 //       {stage === "help" && (
 //         <div className="text-center max-w-md">
 //           <h2 className="text-2xl font-semibold text-purple-600 mb-3">
 //             🎯 הוראות
 //           </h2>
 //           <p className="mb-6 text-gray-700">
 //             בחרי את כל המילים שמתחרזות עם המילה שמוצגת.
 //             <br />
 //             חלק מהמילים עשויות להיות נכונות — כדאי לבדוק היטב!
 //           </p>
 //           <button
 //             onClick={nextStage}
 //             className="px-6 py-3 bg-indigo-500 text-white rounded-xl"
 //           >
 //             הבנתי! ✨
 //           </button>
 //         </div>
 //       )}
 //       {stage === "play" && data && (
 //         <div className="text-center">
 //           <h2 className="text-2xl font-bold mb-4">
 //             איזו מילה מתחרזת עם{" "}
 //             <span className="text-purple-600">{data.word}</span>?
 //           </h2>
 //           <div className="grid grid-cols-2 gap-4 mb-8">
 //             {data.options.map((opt: string, i: number) => (
 //               <motion.button
 //                 key={i}
 //                 onClick={() => handleSelect(i)}
 //                 whileTap={{ scale: 0.9 }}
 //                 animate={{
 //                   backgroundColor: selected.includes(i)
 //                     ? "#ec4899"
 //                     : "#ffffff",
 //                   color: selected.includes(i) ? "#fff" : "#000",
 //                 }}
 //                 className={`rounded-xl border-2 px-6 py-3 font-semibold transition-all ${
 //                   selected.includes(i)
 //                     ? "border-pink-500 shadow-lg"
 //                     : "border-gray-300"
 //                 }`}
 //               >
 //                 {opt}
 //               </motion.button>
 //             ))}
 //           </div>
 //           <button
 //             onClick={handleSubmit}
 //             className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:opacity-90"
 //           >
 //             בדקי תשובה ✅
 //           </button>
 //         </div>
 //       )}
 //       {stage === "results" && (
 //         <div className="text-center">
 //           <h2 className="text-3xl font-bold text-green-600 mb-3">
 //             🎉 כל הכבוד!
 //           </h2>
 //           <p className="text-lg mb-4">{feedback}</p>
 //           <Link
 //             href="/"
 //             className="text-indigo-700 font-semibold underline hover:text-purple-600"
 //           >
 //             חזרה למסך הראשי 🏠
 //           </Link>
 //         </div>
 //       )}
 //     </GameLayout>
 //   );
 // }
 // "use client";
 // import { useState, useEffect } from "react";
 // import { motion, AnimatePresence } from "framer-motion";
 // import Link from "next/link";
 // import GameCard from "./GameCard";
 // interface GameData {
 //   word: string;
 //   options: string[];
 //   correctIndices: number[];
 // }
 // export default function RhymeTimePage() {
 //   const [data, setData] = useState<GameData | null>(null);
 //   const [selected, setSelected] = useState<number[]>([]);
 //   const [score, setScore] = useState(0);
 //   const [round, setRound] = useState(1);
 //   const [showResult, setShowResult] = useState(false);
 //   // סימולציה של fetch (אפשר להחליף בקריאה אמיתית ל־API שלך)
 //   useEffect(() => {
 //     const mock: GameData[] = [
 //       { word: "cat", options: ["hat", "hot", "cut", "bat"], correctIndices: [0, 3] },
 //       { word: "sun", options: ["run", "soon", "fun", "rain"], correctIndices: [0, 2] },
 //       { word: "ball", options: ["call", "bell", "fall", "mall"], correctIndices: [0, 2, 3] },
 //     ];
 //     setData(mock[Math.floor(Math.random() * mock.length)]);
 //   }, [round]);
 //   const toggleSelect = (index: number) => {
 //     setSelected((prev) =>
 //       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
 //     );
 //   };
 //   const handleSubmit = () => {
 //     if (!data) return;
 //     const correct = data.correctIndices;
 //     const correctChosen = selected.filter((i) => correct.includes(i)).length;
 //     const partial = Math.round((correctChosen / correct.length) * 100);
 //     setScore((prev) => prev + partial);
 //     setShowResult(true);
 //   };
 //   const handleNext = () => {
 //     setSelected([]);
 //     setShowResult(false);
 //     setRound((r) => r + 1);
 //   };
 //   return (
 //     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-8">
 //       <motion.div
 //         initial={{ opacity: 0, y: 20 }}
 //         animate={{ opacity: 1, y: 0 }}
 //         className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center border border-purple-200"
 //       >
 //         <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">🎵 Rhyme Time</h1>
 //         <p className="text-lg text-gray-700 mb-6">בחרי את כל המילים שמתחרזות עם:</p>
 //         <motion.div
 //           animate={{ scale: [1, 1.1, 1] }}
 //           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
 //           className="text-3xl font-bold text-purple-600 mb-8"
 //         >
 //           {data?.word}
 //         </motion.div>
 //         <div className="grid grid-cols-2 gap-4 mb-8">
 //           {data?.options.map((option, i) => (
 //             <GameCard
 //               key={i}
 //               text={option}
 //               isSelected={selected.includes(i)}
 //               onClick={() => toggleSelect(i)}
 //             />
 //           ))}
 //         </div>
 //         {!showResult ? (
 //           <motion.button
 //             onClick={handleSubmit}
 //             whileTap={{ scale: 0.95 }}
 //             className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all"
 //           >
 //             בדקי תשובות
 //           </motion.button>
 //         ) : (
 //           <AnimatePresence>
 //             <motion.div
 //               key="result"
 //               initial={{ opacity: 0, scale: 0.9 }}
 //               animate={{ opacity: 1, scale: 1 }}
 //               exit={{ opacity: 0 }}
 //               className="mt-6"
 //             >
 //               <p className="text-xl font-bold text-green-600">
 //                 🎯 ניקוד בסבב זה: +{score} נקודות!
 //               </p>
 //               <button
 //                 onClick={handleNext}
 //                 className="mt-4 px-6 py-3 bg-white border border-purple-400 rounded-xl hover:bg-purple-100 transition-all font-medium"
 //               >
 //                 ➡️ לסבב הבא
 //               </button>
 //             </motion.div>
 //           </AnimatePresence>
 //         )}
 //         <Link
 //           href="/"
 //           className="block mt-10 text-indigo-700 hover:underline text-sm font-semibold"
 //         >
 //           ⬅️ חזרה למסך הראשי
 //         </Link>
 //       </motion.div>
 //     </div>
 //   );
 // }
 // "use client";
 // import { useState } from "react";
 // import Link from "next/link";
 // import { motion } from "framer-motion";
 // export default function RhymeTimeGame() {
 //   const [selected, setSelected] = useState<number[]>([]);
 //   const [score, setScore] = useState(0);
 //   const options = ["hat", "dog", "bat", "cup"];
 //   const correct = [0, 2];
 //   const handleSelect = (i: number) => {
 //     setSelected((prev) =>
 //       prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
 //     );
 //   };
 //   const handleSubmit = () => {
 //     const correctCount = selected.filter((i) => correct.includes(i)).length;
 //     setScore(correctCount * 50);
 //   };
 //   return (
 //     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 flex flex-col items-center justify-center p-8">
 //       <motion.div
 //         initial={{ opacity: 0, y: 20 }}
 //         animate={{ opacity: 1, y: 0 }}
 //         className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center"
 //       >
 //         <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">🎵 Rhyme Time</h1>
 //         <p className="text-xl mb-6 text-gray-800">איזו מילה מתחרזת עם <b>cat</b>?</p>
 //         <div className="flex flex-wrap justify-center gap-4 mb-6">
 //           {options.map((opt, i) => (
 //             <button
 //               key={i}
 //               onClick={() => handleSelect(i)}
 //               className={`px-6 py-3 rounded-full text-lg font-semibold border-2 transition-all ${
 //                 selected.includes(i)
 //                   ? "bg-pink-500 text-white border-pink-600 shadow-lg"
 //                   : "bg-white border-gray-300 hover:bg-pink-100"
 //               }`}
 //             >
 //               {opt}
 //             </button>
 //           ))}
 //         </div>
 //         <button
 //           onClick={handleSubmit}
 //           className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
 //         >
 //           ✨ בדקי תשובות
 //         </button>
 //         {score > 0 && (
 //           <motion.div
 //             initial={{ opacity: 0 }}
 //             animate={{ opacity: 1 }}
 //             className="mt-6 text-xl text-green-600 font-bold"
 //           >
 //             ניקוד: {score} נקודות 🎉
 //           </motion.div>
 //         )}
 //         <Link href="/" className="inline-block mt-8 text-indigo-600 hover:underline">
 //           ⬅️ חזרה למסך הראשי
 //         </Link>
 //       </motion.div>
 //     </div>
 //   );
 // }
}),
];

//# sourceMappingURL=src_83886070._.js.map