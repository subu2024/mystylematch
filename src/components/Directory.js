
import React, { useState, useEffect } from "react";
import './Directory.scss'
import data from "../data.json"

const Directory = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);


  return (
    <div>
      <h2>Directory</h2>
     

      {items.map((item) => (
        <div key={item.id}>
          <h3><a href={item.url}>{item.title}</a></h3>
          {item.description}<br/>
          pros: {item.pros}<br/>
          cons: {item.cons}<br/>
        </div>
      ))}


    </div>
  );
}

export default Directory;