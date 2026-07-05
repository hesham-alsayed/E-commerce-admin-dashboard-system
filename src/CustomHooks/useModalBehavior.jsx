import { useEffect, useCallback, useRef } from "react";

export function useModalBehavior(isOpen, onClose) {
  const overlayRef = useRef(null);

  // Lock/unlock scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // Handle clicks on overlay to close modal
  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === overlayRef.current && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  return { overlayRef, handleOverlayClick };
}