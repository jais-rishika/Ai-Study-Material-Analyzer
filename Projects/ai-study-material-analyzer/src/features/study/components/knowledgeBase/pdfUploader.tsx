'use client';

import { useState } from "react";

export default function PdfUploader({ fileName }: { fileName: string | null }) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if(!selectedFile){
      alert("Sorry can't access any file");
      return;
    }

    if(selectedFile.type!=="application/pdf"){
      alert("Please select a PDF file");
      return;
    }
    console.log(selectedFile);
    setPdfFile(selectedFile);
  }

  function getSize(sizeInBytes: number) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    if (sizeInMB < 1) {
      return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    }
    return `${sizeInMB.toFixed(1)} MB`;
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        PDF document
      </label>

      <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-xl text-indigo-600">
          ↑
        </div>

        <span className="mt-3 text-sm font-medium text-slate-700">
          Upload a PDF
        </span>

        <span className="mt-1 text-xs text-slate-400">
          PDF files up to 20 MB
        </span>

        <input name="pdfFile" type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleFileChange} />
      </label>

      {/* Example selected file */}
      <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-red-100 text-xs font-bold text-red-600">
          PDF
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-700">
            {fileName || pdfFile?.name || "No file selected"}
          </p>
          <p className="text-xs text-slate-400">{pdfFile && getSize(pdfFile.size)}</p>
        </div>
      </div>
    </div>
  );
}