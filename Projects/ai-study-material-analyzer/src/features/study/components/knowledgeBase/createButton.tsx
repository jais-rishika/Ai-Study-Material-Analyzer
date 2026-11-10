
interface CreateButtonProps{
    isPending: boolean
}

export default function CreateButton({isPending}: CreateButtonProps) {
  return (
    <button
      type="submit"
      className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
    >
      {isPending?"Loading... ": ""} Create study material
    </button>
  );
}