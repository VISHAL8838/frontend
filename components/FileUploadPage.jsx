import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, LinearProgress, Typography, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PdfIcon from '@mui/icons-material/PictureAsPdf'; // Assuming these are your SVG icons
import WordIcon from '@mui/icons-material/Description';
import ExcelIcon from '@mui/icons-material/InsertDriveFile';
import JsonIcon from '@mui/icons-material/InsertDriveFile';

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [fileProgress, setFileProgress] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [boxSize, setBoxSize] = useState('300px'); // Default box size
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    handleNewFiles(selectedFiles);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleNewFiles(droppedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleNewFiles = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Initialize progress for each new file
    const initialProgress = {};
    newFiles.forEach((file) => {
      initialProgress[file.name] = 0;
    });
    setFileProgress((prevProgress) => ({ ...prevProgress, ...initialProgress }));

    // Resize the box after files are added
    setBoxSize('150px'); // Adjust size as needed
    startFileUploadProgress(newFiles);
  };

  const startFileUploadProgress = (filesToUpload) => {
    filesToUpload.forEach((file) => {
      // Simulate file upload and progress for each file
      const uploadInterval = setInterval(() => {
        setFileProgress((prevProgress) => {
          const newProgress = { ...prevProgress };
          if (newProgress[file.name] >= 100) {
            clearInterval(uploadInterval);
            return newProgress;
          }
          newProgress[file.name] = Math.min(newProgress[file.name] + 10, 100);
          return newProgress;
        });
      }, 200);
    });
  };

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
    setFileProgress((prevProgress) => {
      const { [fileName]: _, ...rest } = prevProgress;
      return rest;
    });
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    setLoading(true);

    files.forEach((file, index) => {
      // Simulate file upload and progress for each file
      const uploadInterval = setInterval(() => {
        setFileProgress((prevProgress) => {
          const newProgress = { ...prevProgress };
          if (newProgress[file.name] >= 100) {
            clearInterval(uploadInterval);
            if (index === files.length - 1) {
              setLoading(false);
              navigate('/converted');
            }
            return newProgress;
          }
          newProgress[file.name] = Math.min(newProgress[file.name] + 10, 100);
          return newProgress;
        });
      }, 200);
    });
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <PdfIcon />;
      case 'doc':
      case 'docx':
        return <WordIcon />;
      case 'xls':
      case 'xlsx':
        return <ExcelIcon />;
      case 'json':
        return <JsonIcon />;
      default:
        return <IconButton />;
    }
  };

  return (
    <Box 
      sx={{ 
        width: '500px', 
        margin: 'auto', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        textAlign: 'center' 
      }}
    >
      <Typography variant="h6" gutterBottom>
        Please verify your identity. Select relevant documents to complete your KYC.
      </Typography>
      <label htmlFor="file-upload" style={{ display: 'block' }}>
        <Box
          sx={{
            width: '450px',
            height: boxSize,
            margin: 'auto',
            padding: '20px',
            border: `2px dashed ${isDragOver ? '#00f' : '#ccc'}`,
            borderRadius: '8px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: isDragOver ? '#f0f8ff' : 'transparent',
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <div
            style={{
              width: '50px',
              height: '50px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-muted-foreground"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
          </div>
          <Typography variant="body1">Upload a file</Typography>
          <Typography variant="body2" color="textSecondary">
            Drag and drop a file here or click to select a file from your device.
          </Typography>
        </Box>
      </label>
      <List sx={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
        {files.map((file) => (
          <ListItem key={file.name} sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {getFileIcon(file.name)}
                <ListItemText 
                  primary={file.name} 
                  sx={{ marginLeft: '10px', flexGrow: 1 }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                {(file.size / 1024).toFixed(2)} KB
              </Typography>
            </Box>
            <Box sx={{ width: '100%', marginTop: '5px', marginBottom: '5px' }}>
              <LinearProgress
                variant="determinate"
                value={fileProgress[file.name]}
                sx={{ width: '100%', height: '10px' }} // Adjust the height if needed
              />
            </Box>
            <IconButton onClick={() => handleRemoveFile(file.name)} color="error" sx={{ marginTop: '5px' }}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        style={{ marginTop: '20px', marginBottom: '20px' }}
        onClick={handleUpload}
        disabled={loading}
      >
        Upload
      </Button>
    </Box>
  );
};

export default FileUploadPage;
