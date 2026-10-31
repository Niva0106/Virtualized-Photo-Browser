import { useState } from "react";
import FolderPicker from "./components/FolderPicker";
import type{ Photo } from "./types/photo.ts";
import { isImageFile } from "./utils/fileHelpers";
import VirtualPhotoGrid from "./components/VirtualPhotoGrid";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

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

  return (
    <div>
      <h1>Virtualized Photo Browser</h1>

      <FolderPicker onFilesSelected={handleFilesSelected} />

      <p>Total photos: {photos.length}</p>

      <VirtualPhotoGrid photos={photos} />
    </div>
  );
}

export default App;