import { useEffect } from "react";

export function InputSelectionFix() {
  useEffect(() => {
    const handleMouseDown = (e) => {
      const el = e.target;

      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        // 🔥 يمنع browser من عمل select all عند focus
        if (document.activeElement !== el) {
          window.getSelection()?.removeAllRanges?.();
        }
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return null;
}
