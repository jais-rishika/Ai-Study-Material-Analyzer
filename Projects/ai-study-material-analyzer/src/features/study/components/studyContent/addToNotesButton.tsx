"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToNotesButton() {
  const [selection, setSelection] = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const path=usePathname();
  console.log(path);

  useEffect(() => {
    const handleSelection = () => {
      if(path!=="/planner"){
        return;
      }
      const selectedText = window.getSelection()?.toString().trim();

      if (!selectedText) {
        setSelection("");
        return;
      }

      const range = window.getSelection()?.getRangeAt(0);
      if (!range) return;

      const rect = range.getBoundingClientRect();

      setSelection(selectedText);

      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    };
    
    document.addEventListener("mouseup", handleSelection);
    
    return () => {
      document.removeEventListener("mouseup", handleSelection);
    };
  }, [path]);

  const addToNotes = () => {
    if (!selection) return;

    sessionStorage.setItem("selected-note", selection);
    // setPosition({ top: -100, left: -100 });
    setSelection("");
    window.getSelection()?.removeAllRanges()
    // window.location.href = "/planner/notes";
  };

  if (!selection) return null;

  return (
    <button
      onMouseDown={(e) => e.preventDefault()} //get proper explanation
      onClick={addToNotes}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 1000,
      }}
      className="rounded-md bg-black px-3 py-2 text-sm text-white shadow-md"
    >
      Add to Notes
    </button>
  );
}