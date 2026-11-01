import { useCallback, useState } from "react";
import PhotoViewer from "./features/photo-browser/components/PhotoViewer";
import FolderPicker from "./features/photo-browser/components/FolderPicker";
import VirtualPhotoGrid from "./features/photo-browser/components/VirtualPhotoGrid";
import { usePhotoLibrary } from "./features/photo-browser/hooks/usePhotoLibrary";

function App() {
  const { photos, handleFilesSelected } = usePhotoLibrary();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeViewer = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const navigatePhoto = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div>
      <h1>Virtualized Photo Browser</h1>

      <FolderPicker
        onFilesSelected={(files) => {
          setSelectedIndex(null);
          handleFilesSelected(files);
        }}
      />

      <p>Total photos: {photos.length}</p>

      {photos.length === 0 && (
        <p>No photos found. Please select a folder containing images.</p>
      )}

      <VirtualPhotoGrid photos={photos} onPhotoClick={setSelectedIndex} />

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
