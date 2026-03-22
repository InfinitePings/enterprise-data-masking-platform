import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import RuleDialog from "./RuleDialog";
import { Checkbox, Button, Typography, Paper } from "@mui/material";
import "../style/RuleSelector.css";

const RuleSelector = ({ setRules }) => {
    const [allRules, setAllRules] = useState([]);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchRules();
    }, []);

    const fetchRules = async () => {
        const res = await API.get("/rules");
        setAllRules(res.data);
    };

    const handleSelect = (id) => {
        const updated = selected.includes(id)
            ? selected.filter((r) => r !== id)
            : [...selected, id];

        setSelected(updated);
        setRules(updated);
    };

    return (
        <Paper className="rule-card">
            <Typography variant="h6">Masking Rules</Typography>

            {allRules.map((rule) => (
                <div key={rule.id} className="rule-item">
                    <Checkbox
                        checked={selected.includes(rule.id)}
                        onChange={() => handleSelect(rule.id)}
                    />
                    <span>{rule.name}</span>
                </div>
            ))}

            <Button
                variant="outlined"
                className="add-rule-btn"
                onClick={() => setOpen(true)}
            >
                Add Rule
            </Button>

            <RuleDialog open={open} setOpen={setOpen} refresh={fetchRules} />
        </Paper>
    );
};

export default RuleSelector;