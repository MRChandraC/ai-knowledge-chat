import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@mui/material";

export default function DocumentList({ documents, onDelete, onSelect }) {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      onDelete(id);
    }
  };

  if (documents.length === 0) {
    return <p className="text-gray-500 mt-4 text-center">No documents uploaded yet.</p>;
  }

  return (
    <div className="mt-4 space-y-2">
      <Toaster position="top-right" />
      {documents.map((doc) => (
        <div
          key={doc._id}
          className="flex justify-between items-center p-3 border rounded shadow-sm hover:shadow-md transition cursor-pointer bg-white"
        >
          {/* Tooltip added here */}
          <Tooltip title="Click here to ask questions" arrow>
            <span
              onClick={() => onSelect(doc)}
              className="text-gray-800 font-medium truncate max-w-xs hover:text-blue-600"
            >
              {doc.filename}
            </span>
          </Tooltip>
          
          <button
            onClick={() => handleDelete(doc._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
