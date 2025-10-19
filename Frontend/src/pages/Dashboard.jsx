import React, { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import DocumentList from "../components/DocumentList";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Button,
  Snackbar,
} from "@mui/material";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await API.get("/documents");
      setDocuments(res.data);
    } catch (err) {
      toast.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/documents/${id}`);
      toast.success("Document deleted successfully");
      fetchDocuments();
    } catch (err) {
      toast.error("Failed to delete document");
    }
  };

  const handleSelect = (doc) => {
    navigate(`/chat/${doc._id}`);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />

      <Typography variant="h3" align="center" gutterBottom>
        AI-Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Upload Section */}
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ padding: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Upload Document
              </Typography>
              <UploadForm
                onUpload={() => {
                  setSnackbarMessage("File uploaded successfully");
                  setOpenSnackbar(true);
                  fetchDocuments();
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Document List Section */}
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ padding: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Your Documents
              </Typography>

              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                  <CircularProgress />
                </Box>
              ) : (
                <DocumentList
                  documents={documents}
                  onDelete={handleDelete}
                  onSelect={handleSelect}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
