'use client';
import PdfUploader from "./pdfUploader";
import PageSelector from "./pageSelector";
import CreateButton from "./createButton";
import { generateStudyMaterial}  from "../../actions/generate-study-material";
import { startTransition } from "react";
import { useActionState } from "react";

export default function KnowledgeBase({ fileName }: { fileName: string | null }) {
  const [formState,action,isPending]=useActionState(generateStudyMaterial,{
    ok: false,
    message: "",
  });

  const handleSubmit= async(event: React.SubmitEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData=new FormData(event.currentTarget);
    startTransition(()=>{
      action(formData);
    });
    
  }

  return (
    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Knowledge Base
        </p>

        <h2 className="mt-2 text-lg font-semibold">Study material</h2>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          Choose the material and pages you want AI to study.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <PdfUploader fileName={fileName}/>

        <PageSelector />

        {!isPending && formState.message}

        <div className="border-t border-slate-100 pt-5">
          <CreateButton isPending={isPending}/>
        </div>
      </form>

    </div>
  );
}