import paths from "@/features/study/paths";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6">
        <header className="flex items-center justify-between py-6">
          <Link href={paths.home()} className="text-xl font-bold tracking-tight">
            Study<span className="text-indigo-400">AI</span>
          </Link>
          <Link
            href={paths.plannerHome()}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Open Planner
          </Link>
        </header>

        <section className="flex flex-1 items-center py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300">
              AI-powered study workspace
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              Turn your study material into a{" "}
              <span className="text-indigo-400">study plan.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Upload your study material, choose what you want to learn, and
              let AI create summaries, concepts, quizzes, and personal notes
              for you.
            </p>

            <div className="mt-10">
              <Link
                href={paths.plannerHome()}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
              >
                Start studying
                <span>→</span>
              </Link>
            </div>

            <div className="mt-16 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ["01", "Summarize", "Understand the important parts quickly."],
                ["02", "Learn", "Break material into clear concepts."],
                ["03", "Practice", "Test yourself with generated quizzes."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
                >
                  <span className="text-xs font-medium text-indigo-400">
                    {number}
                  </span>
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}