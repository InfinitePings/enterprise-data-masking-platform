import React from "react";
import API from "../api/axiosConfig";
import { Button, Typography, Paper } from "@mui/material";
import "../style/PreviewTable.css";

const PreviewTable = ({ data, datasetId }) => {

    const handleDownload = async () => {
        const res = await API.get(`/mask/download/${datasetId}`, {
            responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "masked.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <Paper className="preview-card">
            <Typography variant="h6">Preview</Typography>

            <div className="table-container">
                <table>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {row.map((cell, j) => (
                                    <td key={j}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Button
                variant="contained"
                className="download-btn"
                onClick={handleDownload}
            >
                Download CSV
            </Button>
        </Paper>
    );
};

export default PreviewTable;