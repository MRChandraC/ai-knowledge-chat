import React, { useState } from "react";
import API from "../api/axios";
import toast, { Toaster } from "react-hot-toast";


export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");

    const allowedTypes = ["application/pdf", "text/plain"];
    if (!allowedTypes.includes(file.type)) {
      return toast.error("Only PDF and TXT files are allowed");
    }

    const formData = new FormData();
    formData.append("file", file); // must match backend field

    try {
      setLoading(true);
      await API.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("File uploaded successfully");
      setFile(null);
      onUpload();
    } catch (err) {
      toast.error(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-3 border p-4 rounded shadow bg-white"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded px-2 py-1 w-full md:w-auto"
        />
        {file && <span className="text-gray-700 truncate max-w-xs">{file.name}</span>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          disabled={loading || !file}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
