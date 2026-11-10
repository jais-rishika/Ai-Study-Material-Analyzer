
"use client";

import {
  useActionState,
  useEffect,
  useState,
  useTransition,
  startTransition,
} from "react";
import PdfUploader from "./pdfUploader";
import PageSelector from "./pageSelector";
import CreateButton from "./createButton";

import {
  generateStudyMaterial,
  clearStudySession,
} from "../../actions/generate-study-material";

export default function KnowledgeBase({
  fileName,
}: {
  fileName: string | null;
}) {
  const [formState, action, isPending] = useActionState(
    generateStudyMaterial,
    {
      ok: false,
      message: "",
    }
  );

  const [sessionMode, setSessionMode] = useState<
    "choice" | "continue" | "new"
  >(fileName ? "choice" : "new");

  const [isClearing, startClearTransition] = useTransition();
  const [uploaderKey, setUploaderKey] = useState(0);
  const [localMessage, setLocalMessage] = useState("");

  // After successful generation, show the current session.
  useEffect(() => {
    if (formState.ok) {
      setSessionMode("continue");
    }
  }, [formState.ok]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      action(formData);
    });
  };

  const handleNewSession = () => {
    startClearTransition(async () => {
      const result = await clearStudySession();

      if (result.ok) {
        setSessionMode("new");
        setUploaderKey((previous) => previous + 1);
        setLocalMessage("");
      } else {
        setLocalMessage(result.message);
      }
    });
  };

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

      {sessionMode === "choice" ? (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
            <p className="font-semibold text-slate-800">
              Previous study session found
            </p>

            <p className="mt-2 break-all text-sm text-slate-600">
              {fileName}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Would you like to continue with this PDF or start fresh?
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSessionMode("continue")}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Continue Previous Session
          </button>

          <button
            type="button"
            disabled={isClearing}
            onClick={handleNewSession}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {isClearing ? "Starting fresh..." : "Start New Session"}
          </button>

          {localMessage && (
            <p className="text-sm text-red-600">{localMessage}</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {sessionMode === "continue" && (
            <input
              type="hidden"
              name="useExistingPdf"
              value="on"
            />
          )}

          <PdfUploader
            key={uploaderKey}
            fileName={sessionMode === "continue" ? fileName : null}
          />

          <PageSelector />

          {(formState.message || localMessage) && (
            <p className="text-sm text-slate-600">
              {localMessage || formState.message}
            </p>
          )}

          <div className="border-t border-slate-100 pt-5">
            <CreateButton isPending={isPending} />
          </div>
        </form>
      )}
    </div>
  );
}
