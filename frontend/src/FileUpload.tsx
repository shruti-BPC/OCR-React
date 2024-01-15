import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ text: string; category: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
        setLoading(true); // Set loading to true when upload starts
        const formData = new FormData();
        formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5000/api/categorize', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON from the response
        setResult(data);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false); // Set loading to false when upload is complete
      }
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {loading && <p>Loading...</p>}
      {result && (
        <div>
          <h3>Categorized Result</h3>
          <ul>
            <b>Category: {`${result.category}`}</b><br></br>
            <b>Text:</b> {`${result.text} `}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
