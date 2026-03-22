import React, { useState } from "react";
import UploadSection from "../components/UploadSection";
import RuleSelector from "../components/RuleSelector";
import PreviewTable from "../components/PreviewTable";
import API from "../api/axiosConfig";

import {
    Container,
    Typography,
    Button,
    Paper,
    Box,
    Divider
} from "@mui/material";

import "../style/Dashboard.css";

const Dashboard = () => {
    const [datasetId, setDatasetId] = useState(null);
    const [rules, setRules] = useState([]);
    const [previewData, setPreviewData] = useState([]);

    const handleApplyMasking = async () => {
        try {
            await API.post(`/mask/apply?datasetId=${datasetId}`, rules);

            const previewRes = await API.get(`/mask/preview/${datasetId}`);
            setPreviewData(previewRes.data);
        } catch (err) {
            alert("Error applying masking");
        }
    };

    return (
        <Container className="dashboard-container">

            <Typography variant="h4" className="dashboard-title">
                Data Masking Dashboard
            </Typography>

            {/* Upload Section */}
            <Paper className="section-card">
                <Typography variant="h6" className="section-title">
                    Upload Dataset
                </Typography>
                <Divider />
                <Box className="section-content">
                    <UploadSection setDatasetId={setDatasetId} />
                </Box>
            </Paper>

            {/* Rules Section */}
            {datasetId && (
                <Paper className="section-card">
                    <Typography variant="h6" className="section-title">
                        Select Masking Rules
                    </Typography>
                    <Divider />
                    <Box className="section-content">
                        <RuleSelector setRules={setRules} />

                        <Button
                            variant="contained"
                            className="apply-btn"
                            onClick={handleApplyMasking}
                        >
                            Apply Masking
                        </Button>
                    </Box>
                </Paper>
            )}

            {/* Preview Section */}
            {previewData.length > 0 && (
                <Paper className="section-card">
                    <Typography variant="h6" className="section-title">
                        Preview Masked Data
                    </Typography>
                    <Divider />
                    <Box className="section-content">
                        <PreviewTable
                            data={previewData}
                            datasetId={datasetId}
                        />
                    </Box>
                </Paper>
            )}
        </Container>
    );
};

export default Dashboard;