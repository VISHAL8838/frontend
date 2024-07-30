import React, { useState } from 'react';
import { Button, Typography, Checkbox, FormControlLabel, List, ListItem, Table, TableBody, TableRow, TableCell } from '@mui/material';

const ConvertedPage = () => {
  const [selectedFormats, setSelectedFormats] = useState([]);

  const handleFormatChange = (event) => {
    const format = event.target.name;
    setSelectedFormats((prevFormats) =>
      prevFormats.includes(format)
        ? prevFormats.filter((f) => f !== format)
        : [...prevFormats, format]
    );
  };

  const handleDownload = () => {
    if (selectedFormats.length === 0) {
      alert('Please select at least one conversion format.');
      return;
    }

    const formData = new FormData();
    formData.append('formats', JSON.stringify(selectedFormats));

    fetch('/api/convert', {  // Replace '/api/convert' with your server endpoint
      method: 'POST',
      body: formData,
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // Set the file name dynamically based on selected formats
      let fileExtension = selectedFormats[0].split(' ')[0].toLowerCase();
      const fileName = `converted-file.${fileExtension}`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', border: '1px solid #ddd' }}>
      <Table style={{ width: '500px', margin: '0 auto', border: '1px solid #ddd', padding: '20px', borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
        <thead>
          <TableRow>
            <TableCell colSpan={2} style={{ borderBottom: '2px solid #4caf50', textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Select Conversion Formats
              </Typography>
            </TableCell>
          </TableRow>
        </thead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} style={{ textAlign: 'center' }}>
              <List style={{ display: 'inline-block', textAlign: 'left' }}>
                <ListItem>
                  <FormControlLabel
                    control={<Checkbox name="pdf" onChange={handleFormatChange} />}
                    label="PDF (.pdf)"
                  />
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={<Checkbox name="docx" onChange={handleFormatChange} />}
                    label="Word (.docx)"
                  />
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={<Checkbox name="xlsx" onChange={handleFormatChange} />}
                    label="Excel (.xlsx)"
                  />
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={<Checkbox name="json" onChange={handleFormatChange} />}
                    label="JSON (.json)"
                  />
                </ListItem>
              </List>
            </TableCell>
          </TableRow>
        </TableBody>
        <tfoot>
          <TableRow>
            <TableCell colSpan={2} style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownload}
                style={{ marginTop: '20px', backgroundColor: '#4caf50', color: '#ffffff' }}
              >
                Download Selected Formats
              </Button>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  );
};

export default ConvertedPage;
