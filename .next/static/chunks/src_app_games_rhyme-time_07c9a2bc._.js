(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/games/rhyme-time/GameCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
function GameCard(param) {
    let { text, isSelected, onClick } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        onClick: onClick,
        whileTap: {
            scale: 0.95
        },
        animate: {
            scale: isSelected ? 1.05 : 1,
            backgroundColor: isSelected ? "#ec4899" : "#ffffff",
            color: isSelected ? "#ffffff" : "#1f2937"
        },
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 12
        },
        //   className={`rounded-2xl shadow-md border-2 ${
        //     isSelected ? "border-pink-500" : "border-gray-300"
        //   } px-6 py-4 font-semibold text-lg hover:shadow-lg transition-all`}
        className: "rounded-2xl shadow-md border-2 px-6 py-4 font-semibold text-lg hover:shadow-lg transition-all ".concat(isSelected ? "border-pink-500 bg-pink-500 text-white animate-pulse" : "border-gray-300 bg-white text-gray-800"),
        children: text
    }, void 0, false, {
        fileName: "[project]/src/app/games/rhyme-time/GameCard.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = GameCard;
var _c;
__turbopack_context__.k.register(_c, "GameCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/games/rhyme-time/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RhymeTimePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$games$2f$rhyme$2d$time$2f$GameCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/games/rhyme-time/GameCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function RhymeTimePage() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [round, setRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showResult, setShowResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // סימולציה של fetch (אפשר להחליף בקריאה אמיתית ל־API שלך)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RhymeTimePage.useEffect": ()=>{
            const mock = [
                {
                    word: "cat",
                    options: [
                        "hat",
                        "hot",
                        "cut",
                        "bat"
                    ],
                    correctIndices: [
                        0,
                        3
                    ]
                },
                {
                    word: "sun",
                    options: [
                        "run",
                        "soon",
                        "fun",
                        "rain"
                    ],
                    correctIndices: [
                        0,
                        2
                    ]
                },
                {
                    word: "ball",
                    options: [
                        "call",
                        "bell",
                        "fall",
                        "mall"
                    ],
                    correctIndices: [
                        0,
                        2,
                        3
                    ]
                }
            ];
            setData(mock[Math.floor(Math.random() * mock.length)]);
        }
    }["RhymeTimePage.useEffect"], [
        round
    ]);
    const toggleSelect = (index)=>{
        setSelected((prev)=>prev.includes(index) ? prev.filter((i)=>i !== index) : [
                ...prev,
                index
            ]);
    };
    const handleSubmit = ()=>{
        if (!data) return;
        const correct = data.correctIndices;
        const correctChosen = selected.filter((i)=>correct.includes(i)).length;
        const partial = Math.round(correctChosen / correct.length * 100);
        setScore((prev)=>prev + partial);
        setShowResult(true);
    };
    const handleNext = ()=>{
        setSelected([]);
        setShowResult(false);
        setRound((r)=>r + 1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            className: "bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center border border-purple-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-extrabold text-indigo-700 mb-4",
                    children: "🎵 Rhyme Time"
                }, void 0, false, {
                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg text-gray-700 mb-6",
                    children: "בחרי את כל המילים שמתחרזות עם:"
                }, void 0, false, {
                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        scale: [
                            1,
                            1.1,
                            1
                        ]
                    },
                    transition: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    },
                    className: "text-3xl font-bold text-purple-600 mb-8",
                    children: data === null || data === void 0 ? void 0 : data.word
                }, void 0, false, {
                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4 mb-8",
                    children: data === null || data === void 0 ? void 0 : data.options.map((option, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$games$2f$rhyme$2d$time$2f$GameCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            text: option,
                            isSelected: selected.includes(i),
                            onClick: ()=>toggleSelect(i)
                        }, i, false, {
                            fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                !showResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                    onClick: handleSubmit,
                    whileTap: {
                        scale: 0.95
                    },
                    className: "px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all",
                    children: "בדקי תשובות"
                }, void 0, false, {
                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.9
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-bold text-green-600",
                                children: [
                                    "🎯 ניקוד בסבב זה: +",
                                    score,
                                    " נקודות!"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleNext,
                                className: "mt-4 px-6 py-3 bg-white border border-purple-400 rounded-xl hover:bg-purple-100 transition-all font-medium",
                                children: "➡️ לסבב הבא"
                            }, void 0, false, {
                                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this)
                        ]
                    }, "result", true, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                    lineNumber: 90,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "block mt-10 text-indigo-700 hover:underline text-sm font-semibold",
                    children: "⬅️ חזרה למסך הראשי"
                }, void 0, false, {
                    fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/games/rhyme-time/page.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
} // "use client";
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
_s(RhymeTimePage, "yVXc0EmNSJ1Jq3DngDiSKN+LFrs=");
_c = RhymeTimePage;
var _c;
__turbopack_context__.k.register(_c, "RhymeTimePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_games_rhyme-time_07c9a2bc._.js.map