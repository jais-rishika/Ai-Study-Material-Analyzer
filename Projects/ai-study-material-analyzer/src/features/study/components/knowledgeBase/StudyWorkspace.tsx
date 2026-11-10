import { ReactNode } from "react";
import StudyTabs from "../studyContent/studyTabs";

export default function StudyWorkspace({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <StudyTabs />

      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
}