import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { Button, Typography, Paper, Box } from "@mui/material";
import "../style/UploadSection.css";

const UploadSection = ({ setDatasetId }) => {
  const [file, setFile] = useState(null);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const res = await API.get("/datasets/my");
      setDatasets(res.data);
    } catch (err) {
      console.error("Failed to fetch datasets");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await API.post("/datasets/upload", formData);
      setDatasetId(res.data.id);
      fetchDatasets();
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className="upload-card">
      <Typography variant="h6">Upload CSV</Typography>

      <Box className="upload-box">
        {/* Hidden file input */}
        <input
          type="file"
          id="file-upload"
          className="file-input"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Custom styled button */}
        <label htmlFor="file-upload">
          <Button variant="outlined" component="span" className="choose-btn">
            Choose File
          </Button>
        </label>

        {/* Show selected file name */}
        {file && <span className="file-name">{file.name}</span>}

        <Button
          variant="contained"
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </Box>

      <Typography className="dataset-title">Your Uploaded Datasets</Typography>

      {datasets.length === 0 ? (
        <p>No datasets found</p>
      ) : (
        <ul className="dataset-list">
          {datasets.map((ds) => (
            <li key={ds.id}>
              <span>{ds.fileName}</span>
              <Button size="small" onClick={() => setDatasetId(ds.id)}>
                Use
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Paper>
  );
};

export default UploadSection;
