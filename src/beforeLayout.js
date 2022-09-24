// import { useState, useEffect } from "react";
// import axios from 'axios';
// import { Card } from 'antd';
// const { Meta } = Card;

// export default function App()  {

//   const [apis, setApis] = useState([]);

// const fetchApis = async ()=>{
//   const apis = await axios(
//     'https://api.publicapis.org/entries',
//   );
//   setApis(apis);
// }

//   useEffect(() => {
//     fetchApis();
//   }, []);
// if (apis.data) {
//    return (
//     <div className="App">
//       <h1>test</h1>
//       <h2>{apis.data.entries[0]['API']}</h2>

//     </div>
//   )
// }
// else return (<div><h1>not yet</h1></div>)
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import "./App.css";

const App = () => {
  const [apis, setApis] = useState([]);

  const fetchApis = async () => {
    const apis = await axios("https://api.publicapis.org/entries");
    setApis(apis);
  };

  useEffect(() => {
    fetchApis();
  }, []);

  if (apis.data) {
    return (
      <div className="App">
        <h1>{apis.data.entries[0]["API"]}</h1>
      </div>
    );
  } else return( <div className="App">spinner</div>);
};

export default App;
