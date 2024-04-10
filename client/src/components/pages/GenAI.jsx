import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Loader from "../utils/Loader";

const GenAI = () => {
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(
    localStorage.getItem("datasetId") ? localStorage.getItem("datasetId") : ""
  );

  const fetchAIResponse = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/v1/dataset/gen-ai-response/${id}`,

        {
          prompt: prompt,
        }
      );

      console.log(id);

      if (response.status === 200) {
        setIsLoading(false);
        setData(response);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-5 w-full rounded">
      <div className="p-5">
        <form onSubmit={fetchAIResponse} className="flex items-center mb-4">
          <input
            type="text"
            placeholder="enter your question for the given dataset"
            className="outline-none px-3 py-2 border w-full rounded-s-md"
            name="prompt"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className="text-white font-medium bg-violet-600 border border-violet-600 h-full px-4 py-2 rounded-e-md"
          >
            Send
          </button>
        </form>
        {isLoading ? (
          <div className="w-full flex flex-col gap-y-2 justify-center items-center h-[300px]">
            <Loader />
            <p className="text-gray-600">Getting response</p>
          </div>
        ) : (
          <div className="markdown h-[450px] overflow-auto rounded border custom">
            {data && (
              <ReactMarkdown className="bg-white p-5 rounded text-gray-600">
                {data.data.response}
              </ReactMarkdown>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default GenAI;
