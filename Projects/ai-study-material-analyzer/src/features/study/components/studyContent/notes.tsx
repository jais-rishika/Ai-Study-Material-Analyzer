"use client";

import { useEffect, useState } from "react";

const NOTES_KEY = "study-notes-content";

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    if (typeof window === "undefined") return ""; // SSR guard

    const savedNotes = sessionStorage.getItem(NOTES_KEY) ?? "";
    const incoming = sessionStorage.getItem("selected-note");
    if (incoming) {
      sessionStorage.removeItem("selected-note");
      const merged = savedNotes ? `${savedNotes}\n\n${incoming}` : incoming;
      sessionStorage.setItem(NOTES_KEY, merged); // persist immediately
      return merged;
    }
    return savedNotes;
  });

  useEffect(() => {
    sessionStorage.setItem(NOTES_KEY, notes);
  }, [notes]);

  const handleDownload = () => {
    const blob = new Blob([notes], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `study-notes-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-indigo-600">Notes</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Your personal notes
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Write your own notes or copy useful information from the study
            material.
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          onClick={handleDownload}
        >
          Download notes
        </button>
      </div>

      <div className="mt-8">
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
          placeholder="Start writing your notes..."
          className="min-h-[500px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
        />

        <div className="mt-3 flex justify-between text-xs text-slate-400">
          <span>Markdown supported</span>
          <span>Last saved — never</span>
        </div>
      </div>
    </div>
  );
}
