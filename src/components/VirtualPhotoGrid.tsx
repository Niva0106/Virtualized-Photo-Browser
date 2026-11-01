
import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Photo } from "../types/photo";

interface VirtualPhotoGridProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

function VirtualPhotoGrid({
  photos,
  onPhotoClick,
}: VirtualPhotoGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  // Adjust the number of columns based on screen width
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 600) {
        setColumns(2);
      } else if (window.innerWidth < 900) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    updateColumns();

    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  // Calculate the total number of rows
  const rowCount = Math.ceil(photos.length / columns);

  // Configure virtualization
  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 180,
    overscan: 2,
  });

  const virtualRows = virtualizer.getVirtualItems();

  // Count the number of photo elements currently rendered
  const renderedPhotoCount = virtualRows.reduce(
    (count, row) =>
      count + Math.min(columns, photos.length - row.index * columns),
    0
  );

  return (
    <>
      <p>
        Currently rendered: {renderedPhotoCount} / {photos.length}
      </p>

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
          {virtualRows.map((virtualRow) => {
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
                {rowPhotos.map((photo, index) => (
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt={photo.name}
                    onClick={() => onPhotoClick(startIndex + index)}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
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
    </>
  );
}

export default VirtualPhotoGrid;
