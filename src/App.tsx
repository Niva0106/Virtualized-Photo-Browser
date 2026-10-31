import { useCallback, useEffect, useState } from "react";
import PhotoViewer from "./components/PhotoViewer";
import FolderPicker from "./components/FolderPicker";
import type { Photo } from "./types/photo";
import { isImageFile } from "./utils/fileHelpers";
import VirtualPhotoGrid from "./components/VirtualPhotoGrid";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        URL.revokeObjectURL(photo.url);
      });
    };
  }, [photos]);

  const handleFilesSelected = (files: FileList) => {
    const imageFiles = Array.from(files).filter(isImageFile);

    const photoList: Photo[] = imageFiles.map((file, index) => ({
      id: `${file.name}-${index}`,
      file: file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setPhotos(photoList);
  };
  const closeViewer = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const navigatePhoto = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div>
      <h1>Virtualized Photo Browser</h1>

      <FolderPicker onFilesSelected={handleFilesSelected} />

      <p>Total photos: {photos.length}</p>

      {photos.length === 0 && (
        <p>No photos found. Please select a folder containing images.</p>
      )}

      <VirtualPhotoGrid
        photos={photos}
        onPhotoClick={setSelectedIndex}
      />

      {selectedIndex !== null && (
        <PhotoViewer
          photos={photos}
          selectedIndex={selectedIndex}
          onClose={closeViewer}
          onNavigate={navigatePhoto}
        />
      )}
    </div>
  );
}

export default App;