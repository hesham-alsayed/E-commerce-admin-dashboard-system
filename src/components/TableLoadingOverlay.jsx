import LoaderSpinnerButton from "./LoaderSpinnerButton";

export function TableLoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-xl">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        <LoaderSpinnerButton />
      </div>
    </div>
  );
}
