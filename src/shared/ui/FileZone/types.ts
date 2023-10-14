export interface FileZoneProps {
  children?: React.ReactNode;
  onDrop?: (files: FileList) => void;
  onPick?: (files: FileList | null) => void;
  accept?: string;
}

export interface FileZoneRef {
  click: () => void;
}
