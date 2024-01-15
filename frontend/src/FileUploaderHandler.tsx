import axios from 'axios';
import React from 'react';

function FileUploadHandler() {
  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    
    // Create FormData object
    const formData = new FormData();
    formData.append('file', file);
  
    // Send the file to the server
    axios.post('/api/upload', formData)
      .then((response) => {
        // File upload successful
        console.log(response.data);
      })
      .catch((error) => {
        // File upload failed
        console.error(error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default FileUploadHandler;