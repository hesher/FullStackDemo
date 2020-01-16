import './App.css';
import React, {useState, useEffect} from 'react';

import {ResponsiveLine} from '@nivo/line';

const refresh = onDone => {
  return fetch('/api/fit').then(async response => {
    if (response.ok) {
      const responseData = await response.json();
      onDone(responseData);
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  });
};
export default function App() {
  // const data = [
  //   {
  //     id: 'First',
  //     data: [
  //       {x: 1, y: 2},
  //       {x: 3, y: 4}
  //     ]
  //   }
  // ];

  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  useEffect(() => {
    refresh(setData);
  }, [file]);

  return (
    <span className="app-container">
      <span className="file-uploader">
        <input
          type="file"
          name="file"
          accept=".fit"
          onChange={event => {
            setFile(event.target.files[0]);
          }}
        />
        <button
          type="button"
          onClick={() => {
            if (file !== null) {
              const formData = new FormData();
              formData.append('file', file);
              fetch('/api/upload', {
                // Your POST endpoint
                method: 'POST',
                body: formData // This is your file object
              })
                // .then(response => response.json())
                .then(success => {
                  console.log(success); // Handle the success response object
                  refresh(setData);
                })
                .catch(
                  error => console.log(error) // Handle the error response object
                );
            } else {
              console.error('Tried to upload an empty file');
            }
          }}>
          Upload
        </button>
      </span>
      {data.length > 0 ? (
        <ResponsiveLine
          data={data}
          margin={{top: 50, right: 50, bottom: 50, left: 50}}
          gridXValues={[0, 20, 40, 60, 80, 100, 120]}
          gridYValues={[60, 80, 100, 120, 140, 160, 180]}
          // axisBottom={{
          //   tickValues: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
          //   tickSize: 100,
          //   tickPadding: 5,
          //   tickRotation: 0,
          //   // format: '.2f',
          //   // legend: 'price',
          //   // legendOffset: 36,
          //   legendPosition: 'middle'
          // }}
        />
      ) : null}
    </span>
  );
}
