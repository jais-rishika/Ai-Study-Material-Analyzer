import Link from "next/link";

type ConceptCardProps = {
  number: number;
  title: string;
  description: string;
  sectionId: string;
};

export default function ConceptCard({
  number,
  title,
  description,
  sectionId,
}: ConceptCardProps) {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-slate-200 p-5 transition hover:border-indigo-200 hover:bg-indigo-50/30">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600">
        {String(number).padStart(2, "0")}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>

      <Link
        href={`/planner#section-${sectionId}`}
        className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-white hover:text-indigo-600"
      >
        Go to Summary →
      </Link>
    </div>
  );
}