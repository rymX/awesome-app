import React, { useState, useEffect } from "react";
import axios from 'axios'
import './App.css';


function App() {

  const [apis, setapis] = useState([]);

const fetchApis = async ()=>{
  const result = await axios(
    'https://api.publicapis.org/entries',
  );
  console.log(result.data.entries[0])
  setapis(result);
}

  useEffect(() => {
    fetchApis();   
  }, []);
  return (
    <div className="App">
      <h1>hello world</h1>
    </div>
  );
}

export default App;
