import getStudyMaterial from "../../lib/getStudyMaterial";
import ConceptCard from "./coceptCard";
  const {concepts} = await getStudyMaterial() || {id:"1", title: "Concepts", description: "No concept available."};

export default function ConceptList() {
  return (
    <div>
      <div>
        <p className="text-sm font-medium text-indigo-600">Concepts</p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Concepts to learn
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {concepts?.length || ""} important concepts were identified from your study material.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {concepts && concepts.map((c, i) => (
          <ConceptCard
            key={c.id}
            number={i + 1}
            title={c.title}
            description={c.description}
            sectionId={c.sectionId}
          />
        ))}
      </div>
    </div>
  );
}