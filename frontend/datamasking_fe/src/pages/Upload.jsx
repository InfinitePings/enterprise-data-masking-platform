import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Typography
} from "@mui/material";

const Upload = () => {

    const [file, setFile] = useState(null);
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        fetchDatasets();
    }, []);

    const fetchDatasets = async () => {
        try {
            // Prefer this API (user-specific)
            const res = await API.get("/datasets/my"); 
            setDatasets(res.data);
        } catch (err) {
            alert("Error fetching datasets");
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Select file");

        const formData = new FormData();
        formData.append("file", file);

        try {
            await API.post("/datasets/upload", formData);
            alert("File uploaded");

            fetchDatasets(); // refresh list
        } catch (err) {
            alert("Upload failed");
        }
    };

    const handleDownload = async (id) => {
        try {
            const res = await API.get(`/datasets/${id}/download`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "file.csv");
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            alert("Download failed");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "MASKED": return "green";
            case "FAILED": return "red";
            case "PROCESSING": return "orange";
            case "UPLOADED": return "blue";
            default: return "black";
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <Typography variant="h5">Upload Dataset</Typography>

            {/* Upload Section */}
            <div style={{ margin: "20px 0" }}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                <Button
                    variant="contained"
                    style={{ marginLeft: "10px" }}
                    onClick={handleUpload}
                >
                    Upload
                </Button>
            </div>

            {/* Dataset Table */}
            <Typography variant="h6">My Uploaded Files</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>File Name</b></TableCell>
                            <TableCell><b>Type</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell><b>Uploaded At</b></TableCell>
                            <TableCell><b>Masked At</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {datasets.map((d) => (
                            <TableRow key={d.id}>
                                <TableCell>{d.id}</TableCell>
                                <TableCell>{d.fileName}</TableCell>
                                <TableCell>{d.fileType}</TableCell>

                                <TableCell style={{ color: getStatusColor(d.status) }}>
                                    {d.status}
                                </TableCell>

                                <TableCell>
                                    {d.uploadedAt ? new Date(d.uploadedAt).toLocaleString() : "-"}
                                </TableCell>

                                <TableCell>
                                    {d.maskedAt ? new Date(d.maskedAt).toLocaleString() : "-"}
                                </TableCell>

                                <TableCell>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleDownload(d.id)}
                                    >
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    );
};

export default Upload;