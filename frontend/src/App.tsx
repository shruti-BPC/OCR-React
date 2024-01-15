import React, { useEffect, useState } from 'react';
import FileUpload from './FileUpload';

const App = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/get_data');
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  return (
    <div>
      <h1>Data from Backend</h1>
      {/* <ul>
        {data.map((item: any, index) => (
          <li key={index}>{`${item.text} - ${item.category}`}</li>
        ))}
      </ul> */}
      <FileUpload/>
    </div>
  );
};

export default App;
