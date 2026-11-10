import getStudyMaterial from "../../lib/getStudyMaterial";
import AddToNotesButton from "./addToNotesButton";

export default async function Summary() {
  const studyMaterial = await getStudyMaterial();

  if (!studyMaterial) {
    return <p>No Summary Available</p>;
  }

  const { heading, summary } = studyMaterial;

  return (
    <div>
      <p className="text-sm font-medium text-indigo-600">Summary</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight">{heading}</h1>
      <p className="mt-4 text-sm text-slate-700">{summary.overview}</p>

      <div className="mt-6 space-y-6">
        {summary.sections.map((s) => (
          <section
            id={`section-${s.id}`}
            key={s.id}
            className="rounded-xl border border-slate-200 p-4 scroll-mt-24"
          >
            <h2 className="font-semibold text-slate-900">{s.heading}</h2>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {s.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>

            <details className="mt-3 group">
              <summary className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {s.explanation.heading}
              </summary>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {s.explanation.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </details>
          </section>
        ))}
      </div>

      <h2 className="mt-8 font-semibold">Key takeaways</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
        {summary.keyTakeaways.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
            <AddToNotesButton/>

    </div>
  );
}