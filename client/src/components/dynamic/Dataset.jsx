import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../utils/Table";
import Button from "../utils/Button";

const Dataset = () => {
  const [isUploaded, setisUploaded] = useState(
    localStorage.getItem("datasetId") ? true : false
  );
  const [data, setData] = useState("");
  const [id, setId] = useState(
    localStorage.getItem("datasetId") ? localStorage.getItem("datasetId") : ""
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", event.target.elements.fileInput.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/dataset",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        localStorage.setItem("datasetId", response.data.id);
        setId(response.data.id);
        setisUploaded(true);
        event.target.reset();
      }

      console.log("File uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/dataset/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setData(response.data[0].dataset);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (id.length > 0) {
      fetchData(id);
    }
  }, [id]);

  return (
    <section>
      <div className="flex justify-center items-center bg-white border-b p-5">
        <form onSubmit={handleSubmit}>
          <input type="file" id="fileInput" className="w-[220px]" />
          <Button type={"submit"} title="upload" />
        </form>
      </div>

      <div className="p-4 max-h-[500px] max-w-[1099px] overflow-auto">
        <h1 className="text-gray-500 font-medium mb-2">Dataset</h1>
        <Table data={data} />
      </div>
    </section>
  );
};

export default Dataset;
