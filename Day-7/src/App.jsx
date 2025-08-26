import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, RotateCcw, Type } from "lucide-react";

// Mini Task: Counter + Live Text Preview
// - Demonstrates useState and controlled inputs
// - Drop this component into your React app and render it
// - TailwindCSS recommended for styling (classes used below)

export default function MiniTask() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl grid gap-6 md:grid-cols-2">
        {/* Counter Card */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="bg-white rounded-2xl shadow p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Counter
          </h2>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={decrement}
              className="px-4 py-2 rounded-2xl shadow-sm border hover:shadow transition active:scale-95 inline-flex items-center gap-2"
              aria-label="Decrease"
            >
              <Minus className="w-4 h-4" />
              Dec
            </button>

            <motion.div
              key={count}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-bold tabular-nums select-none"
              aria-live="polite"
            >
              {count}
            </motion.div>

            <button
              onClick={increment}
              className="px-4 py-2 rounded-2xl shadow-sm border hover:shadow transition active:scale-95 inline-flex items-center gap-2"
              aria-label="Increase"
            >
              <Plus className="w-4 h-4" />
              Inc
            </button>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={reset}
              className="px-3 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 active:scale-95 inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={() => setCount((c) => c + 5)}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95"
            >
              +5
            </button>
            <button
              onClick={() => setCount((c) => Math.max(0, c - 5))}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95"
            >
              -5
            </button>
          </div>
        </motion.section>

        {/* Live Text Preview Card */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.05 }}
          className="bg-white rounded-2xl shadow p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Type className="w-5 h-5" /> Live Text Preview
          </h2>

          <label className="block text-sm font-medium mb-2" htmlFor="liveText">
            Type something
          </label>
          <input
            id="liveText"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Hello, React!"
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
          />

          <div className="mt-4 text-sm text-gray-600">Length: {text.length}</div>

          <div className="mt-4 p-4 rounded-xl border bg-gray-50">
            <span className="text-xs uppercase tracking-wide text-gray-500">Preview</span>
            <p className="mt-2 break-words leading-relaxed">{text || "(start typing...)"}</p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setText("")}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95"
            >
              Clear
            </button>
            <button
              onClick={() => setText((t) => t.trim())}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95"
            >
              Trim
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
