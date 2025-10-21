module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/hooks/useGameState.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGameState",
    ()=>useGameState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const useGameState = ()=>{
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("welcome");
    const nextStage = ()=>{
        setStage((prev)=>prev === "welcome" ? "help" : prev === "help" ? "play" : prev === "play" ? "results" : "welcome");
    };
    const reset = ()=>setStage("welcome");
    return {
        stage,
        nextStage,
        reset
    };
};
}),
"[project]/src/components/common/GameLayout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function GameLayout({ stage, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "wait",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 15
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: -15
            },
            transition: {
                duration: 0.4
            },
            className: "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6",
            children: children
        }, stage, false, {
            fileName: "[project]/src/components/common/GameLayout.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/common/GameLayout.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
} // "use client";
 // import { ReactNode } from "react";
 // import { motion } from "framer-motion";
 // export default function GameLayout({ title, children }: { title: string; children: ReactNode }) {
 //   return (
 //     <motion.section
 //       initial={{ opacity: 0 }}
 //       animate={{ opacity: 1 }}
 //       className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 mx-auto max-w-3xl mt-10 border border-gray-200"
 //     >
 //       <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">{title}</h1>
 //       {children}
 //     </motion.section>
 //   );
 // }
}),
"[project]/src/store/gameStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGameStore",
    ()=>useGameStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
const useGameStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        playerName: "",
        score: 0,
        time: 0,
        setPlayerName: (name)=>set({
                playerName: name
            }),
        setScore: (score)=>set({
                score
            }),
        setTime: (time)=>set({
                time
            }),
        resetGame: ()=>set({
                playerName: "",
                score: 0,
                time: 0
            })
    }));
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGameState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useGameState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$GameLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/GameLayout.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/gameStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function RhymeTimePage() {
    const { stage, nextStage, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGameState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGameState"])();
    const { playerName, setPlayerName, score, setScore } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGameStore"])();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch("/api/v1/games/rhyme-time/data").then((res)=>res.json()).then((res)=>setData(res.data[0]));
    }, []);
    const handleSelect = (index)=>{
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
        setScore(score + partial);
        setFeedback(`🎯 קיבלת ${partial} נקודות!`);
        nextStage();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$GameLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        stage: stage,
        children: [
            stage === "welcome" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-indigo-600 mb-6",
                        children: "🎵 Rhyme Time"
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "הכניסי שם משתמש",
                        value: playerName,
                        onChange: (e)=>setPlayerName(e.target.value),
                        className: "border rounded-xl px-4 py-2 text-center mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: nextStage,
                        className: "px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md hover:opacity-90",
                        children: "המשיכי ➡️"
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this),
            stage === "help" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-semibold text-purple-600 mb-3",
                        children: "🎯 הוראות"
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-6 text-gray-700",
                        children: [
                            "בחרי את כל המילים שמתחרזות עם המילה שמוצגת.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            "חלק מהמילים עשויות להיות נכונות — כדאי לבדוק היטב!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: nextStage,
                        className: "px-6 py-3 bg-indigo-500 text-white rounded-xl",
                        children: "הבנתי! ✨"
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this),
            stage === "play" && data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-4",
                        children: [
                            "איזו מילה מתחרזת עם",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-purple-600",
                                children: data.word
                            }, void 0, false, {
                                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            "?"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 mb-8",
                        children: data.options.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
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
                                lineNumber: 90,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        className: "px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:opacity-90",
                        children: "בדקי תשובה ✅"
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this),
            stage === "results" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-green-600 mb-3",
                        children: "🎉 כל הכבוד!"
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg mb-4",
                        children: feedback
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "text-indigo-700 font-semibold underline hover:text-purple-600",
                        children: "חזרה למסך הראשי 🏠"
                    }, void 0, false, {
                        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/games/rhyme-time/page.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/games/rhyme-time/page.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
} // "use client";
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

//# sourceMappingURL=%5Broot-of-the-server%5D__67a90735._.js.map