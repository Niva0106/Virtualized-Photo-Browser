import React from "react";

interface FolderInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  webkitdirectory?: string;
  directory?: string;
}

interface FolderPickerProps {
  onFilesSelected: (files: FileList) => void;
}

function FolderPicker({ onFilesSelected }: FolderPickerProps) {
  return (
    <div>
      <h2>Select a folder</h2>

      <input
        {...({ webkitdirectory: "", directory: "" } as FolderInputProps)}
        type="file"
        multiple
        onChange={(event) => {
          if (event.target.files) {
            onFilesSelected(event.target.files);
          }
        }}
      />
    </div>
  );
}

export default FolderPicker;
