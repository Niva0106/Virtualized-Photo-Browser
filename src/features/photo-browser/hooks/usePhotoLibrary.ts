import { useEffect, useState } from "react";
import type { Photo } from "../../../types/photo";
import { isImageFile } from "../../../utils/fileHelpers";

export function usePhotoLibrary() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Clean up object URLs when photos change or the hook unmounts
  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        URL.revokeObjectURL(photo.url);
      });
    };
  }, [photos]);

  // Process selected files and create photo objects
  const handleFilesSelected = (files: FileList) => {
    const imageFiles = Array.from(files).filter(isImageFile);

    const photoList: Photo[] = imageFiles.map((file, index) => ({
      id: `${file.name}-${index}`,
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setPhotos(photoList);
  };

  return {
    photos,
    handleFilesSelected,
  };
}
