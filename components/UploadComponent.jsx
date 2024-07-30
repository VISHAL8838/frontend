import React from 'react';
import { Button } from './Button';
import { CloudUploadIcon } from './CloudUploadIcon';
import { FileIcon } from './FileIcon';
import { XIcon } from './XIcon';

export default function UploadComponent() {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-background rounded-lg border-2 border-dashed border-muted-foreground p-8 flex flex-col items-center justify-center space-y-4 transition-colors duration-200 hover:border-primary hover:bg-muted relative">
        <CloudUploadIcon className="w-10 h-10 text-muted-foreground" />
        <div className="text-center space-y-1">
          <h3 className="text-lg font-medium">Upload a file</h3>
          <p className="text-muted-foreground">Drag and drop a file here or click to select a file from your device.</p>
        </div>
        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      </div>
      <div className="bg-background rounded-lg border border-input p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileIcon className="w-6 h-6 text-muted-foreground" />
          <span className="text-sm font-medium">example.jpg</span>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <XIcon className="w-4 h-4" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
      <Button className="w-full">Select File</Button>
    </div>
  );
}
