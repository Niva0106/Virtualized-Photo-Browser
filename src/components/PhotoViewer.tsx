import { useEffect } from "react";
import type { Photo } from "../types/photo";

interface PhotoViewerProps {
  photos: Photo[];
  selectedIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function PhotoViewer({
  photos,
  selectedIndex,
  onClose,
  onNavigate,
}: PhotoViewerProps) {
  const photo = photos[selectedIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        onNavigate((selectedIndex + 1) % photos.length);
      }

      if (event.key === "ArrowLeft") {
        onNavigate(
          (selectedIndex - 1 + photos.length) % photos.length
        );
      }

      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, photos.length, onNavigate, onClose]);

  if (!photo) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.9)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <button onClick={onClose}>Close</button>

      <img
        src={photo.url}
        alt={photo.name}
        style={{
          maxWidth: "80%",
          maxHeight: "70vh",
          objectFit: "contain",
        }}
      />

      <p>{photo.name}</p>
      <p>Size: {(photo.size / 1024).toFixed(2)} KB</p>

      <div>
        <button
          onClick={() =>
            onNavigate((selectedIndex - 1 + photos.length) % photos.length)
          }
        >
          Previous
        </button>

        <button
          onClick={() =>
            onNavigate((selectedIndex + 1) % photos.length)
          }
        >
          Next
        </button>
      </div>

      <p>{selectedIndex + 1} / {photos.length}</p>
    </div>
  );
}

export default PhotoViewer;