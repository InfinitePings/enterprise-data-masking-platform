import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TextField,
    Button
} from "@mui/material";

const Audit = () => {

    const [logs, setLogs] = useState([]);
    const [datasetId, setDatasetId] = useState("");

    useEffect(() => {
        fetchAllLogs();
    }, []);

    const fetchAllLogs = async () => {
        try {
            const res = await API.get("/audit");
            setLogs(res.data);
        } catch (err) {
            alert("Error fetching logs");
        }
    };

    const fetchByDataset = async () => {
        if (!datasetId) return;

        try {
            const res = await API.get(`/audit/${datasetId}`);
            setLogs(res.data);
        } catch (err) {
            alert("Dataset not found");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
                Audit Logs
            </Typography>

            {/* Filter Section */}
            <div style={{ marginBottom: "20px" }}>
                <TextField
                    label="Dataset ID"
                    value={datasetId}
                    onChange={(e) => setDatasetId(e.target.value)}
                    size="small"
                />

                <Button
                    variant="contained"
                    style={{ marginLeft: "10px" }}
                    onClick={fetchByDataset}
                >
                    Filter
                </Button>

                <Button
                    variant="outlined"
                    style={{ marginLeft: "10px" }}
                    onClick={fetchAllLogs}
                >
                    Reset
                </Button>
            </div>

            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>Dataset ID</b></TableCell>
                            
                            <TableCell><b>Action</b></TableCell>
                            <TableCell><b>Timestamp</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>{log.id}</TableCell>
                                <TableCell>{log.datasetId}</TableCell>
                                
                                <TableCell>{log.action}</TableCell>
                                <TableCell>{log.timestamp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Audit;