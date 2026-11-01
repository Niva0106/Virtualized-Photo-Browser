import { useEffect } from "react";

interface UsePhotoNavigationProps {
  selectedIndex: number;
  photosLength: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

export function usePhotoNavigation({
  selectedIndex,
  photosLength,
  onNavigate,
  onClose,
}: UsePhotoNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        onNavigate((selectedIndex + 1) % photosLength);
      }

      if (event.key === "ArrowLeft") {
        onNavigate((selectedIndex - 1 + photosLength) % photosLength);
      }

      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, photosLength, onNavigate, onClose]);
}
