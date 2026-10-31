import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Photo } from "../types/photo";

interface VirtualPhotoGridProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

function VirtualPhotoGrid({ photos, onPhotoClick }: VirtualPhotoGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const columns = 4;
  const rowCount = Math.ceil(photos.length / columns);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 180,
    overscan: 2,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: "600px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns;

          const rowPhotos = photos.slice(
            startIndex,
            startIndex + columns
          );

          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: "10px",
              }}
            >
              {rowPhotos.map((photo) => (
                <img
                key={photo.id}
                src={photo.url}
                alt={photo.name}
                onClick={() => onPhotoClick(startIndex + rowPhotos.indexOf(photo))}
                style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    cursor: "pointer",
                }}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualPhotoGrid;