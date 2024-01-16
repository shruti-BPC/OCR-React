import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File | null>(null);
  const [result, setResult] = useState<{ text: string; category: string }[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (files) {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', files);
        formData.append('fileType', files.type);
      try {
        const response = await fetch('http://localhost:5000/api/categorize', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setResult([data]); // Make it an array
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!files}>
        Upload
      </button>
      {loading && <p>Loading...</p>}
      {result && (
        <div>
          <h3>Categorized Result</h3>
          <ul>
            {result.map((item, index) => (
              <li key={index}>
                <b>Category:</b> {item.category} <br />
                <b>Text:</b> {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
