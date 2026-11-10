'use client';
import Link from "next/link";
import {useState} from "react";
import { usePathname } from "next/navigation";
import AddToNotesButton from "./addToNotesButton";

const tabs = [
  { name: "Summary", href: "/planner" },
  { name: "Concepts", href: "/planner/concepts" },
  { name: "Quiz", href: "/planner/quiz" },
  { name: "Notes", href: "/planner/notes" },
];

export default function StudyTabs() {
  const pathname = usePathname();
  return (
    <nav className="flex overflow-x-auto border-b border-slate-200 px-6 justify-between">
      <div className="flex overflow-x-auto border-b border-slate-200 px-6">
        {tabs.map((tab) => {
          const isActive= pathname===tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm font-medium transition ${
                isActive
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.name}
          </Link>
          )
        })}
      </div>
    </nav>
  );
}