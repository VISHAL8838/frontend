/**
 * v0 by Vercel.
 * @see https://v0.dev/t/m5Xa95VVvZk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-background rounded-lg border-2 border-dashed border-muted-foreground p-8 flex flex-col items-center justify-center space-y-4 transition-colors duration-200 hover:border-primary hover:bg-muted">
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
  )
}

function CloudUploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  )
}


function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}