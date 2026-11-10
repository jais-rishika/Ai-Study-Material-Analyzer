import { ReactNode } from "react";
import KnowledgeBase from "@/features/study/components/knowledgeBase/knowledgeBase";
import StudyWorkspace from "@/features/study/components/knowledgeBase/StudyWorkspace";
import getStudyMaterial from "@/features/study/lib/getStudyMaterial";
import { access, readFile } from "fs/promises";
import path from "path";
export default async function PlannerLayout({
  children,
}: {
  children: ReactNode;
}) {
  //gets paths
  const sourceFilePath = path.join(process.cwd(), "data", "source.pdf");
  const studyMaterialFilePath = path.join(
    process.cwd(),
    "data",
    "study-material.json",
  );

  let sourcePDFName: string | null = null;

  //check if both file exists
  const fileExists = await Promise.all([
    access(sourceFilePath)
      .then(() => true)
      .catch(() => false),
    access(studyMaterialFilePath)
      .then(() => true)
      .catch(() => false),
  ]).then(([sourceExists, studyMaterialExists]) => {
    return {
      source: sourceExists,
      studyMaterialFile: studyMaterialExists,
    };
  });

  if (fileExists.source && fileExists.studyMaterialFile) {
    sourcePDFName =
      (await readFile(studyMaterialFilePath, "utf-8")
        .then((data) => {
          // console.log(data, data.source.filename);
          return JSON.parse(data).source?.filename || "";
        })
        .catch(() => "")) || null;
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-1500px items-center px-6">
          <div className="text-xl font-bold tracking-tight">
            Study<span className="text-indigo-600">AI</span>
          </div>

          <div className="ml-6 h-6 w-px bg-slate-200" />

          <span className="ml-6 text-sm text-slate-500">Study Workspace</span>
        </div>
      </header>

      <div className="mx-auto grid max-w-1500px grid-cols-300px_1fr gap-6 p-6">
        <aside>
          <KnowledgeBase fileName={sourcePDFName} />
        </aside>

        <section className="min-w-0">
          <StudyWorkspace>{children}</StudyWorkspace>
        </section>
      </div>
    </main>
  );
}
