
import { useState } from "react";
import type { Photo } from "../../../types/photo";
import { usePhotoNavigation } from "../hooks/usePhotoNavigation";

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

  const [dimensions, setDimensions] = useState<{
    photoId: string;
    width: number;
    height: number;
  } | null>(null);

  // Handle keyboard navigation
  usePhotoNavigation({
    selectedIndex,
    photosLength: photos.length,
    onNavigate,
    onClose,
  });

  if (!photo) return null;

  const currentDimensions =
    dimensions?.photoId === photo.id ? dimensions : null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.9)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <button onClick={onClose}>Close</button>

      <img
        src={photo.url}
        alt={photo.name}
        onLoad={(event) => {
          setDimensions({
            photoId: photo.id,
            width: event.currentTarget.naturalWidth,
            height: event.currentTarget.naturalHeight,
          });
        }}
        style={{
          maxWidth: "80%",
          maxHeight: "70vh",
          objectFit: "contain",
        }}
      />

      <p>{photo.name}</p>

      <p>Size: {(photo.size / 1024).toFixed(2)} KB</p>

      {currentDimensions && (
        <p>
          Dimensions: {currentDimensions.width} ×{" "}
          {currentDimensions.height} px
        </p>
      )}

      <div>
        <button
          onClick={() =>
            onNavigate(
              (selectedIndex - 1 + photos.length) % photos.length
            )
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

      <p>
        {selectedIndex + 1} / {photos.length}
      </p>
    </div>
  );
}

export default PhotoViewer;
