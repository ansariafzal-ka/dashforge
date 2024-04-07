import React from "react";
import axios from "axios";

const Dataset = () => {
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
        },
        {
          withCredentials: true,
        }
      );

      console.log("File uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" id="fileInput" />
          <button type="submit">Upload</button>
        </form>
      </div>
    </section>
  );
};

export default Dataset;
