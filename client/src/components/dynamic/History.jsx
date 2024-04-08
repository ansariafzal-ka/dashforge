import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const History = () => {
  const [data, setData] = useState([]);

  const fetchDatasets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/dataset/",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setData(response.data);
        console.log(response);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  return (
    <section>
      <div>
        {data &&
          data.map((item, key) => (
            <div key={key}>
              <h1>{item.filename}</h1>
            </div>
          ))}
      </div>
    </section>
  );
};

export default History;
