import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  MenuItem,
} from "@mui/material";
import API from "../api/axiosConfig";
import "../style/RuleDialog.css";

const RuleDialog = ({ open, setOpen, refresh }) => {
  const [rule, setRule] = useState({
    name: "",
    regexPattern: "",
    maskType: "",
    maskChar: "",
  });

  const handleSubmit = async () => {
    if (!rule.name || !rule.regexPattern || !rule.maskType || !rule.maskChar) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/rules", rule);

      setOpen(false);
      refresh();

      // reset form
      setRule({
        name: "",
        regexPattern: "",
        maskType: "",
        maskChar: "",
      });
    } catch (err) {
      alert("Error creating rule");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add Masking Rule</DialogTitle>

      <DialogContent className="dialog-content">
        {/* Rule Name */}
        <TextField
          label="Rule Name"
          fullWidth
          margin="dense"
          value={rule.name}
          onChange={(e) => setRule({ ...rule, name: e.target.value })}
        />

        {/* Regex Pattern */}
        <TextField
          label="Regex Pattern"
          fullWidth
          margin="dense"
          value={rule.regexPattern}
          onChange={(e) => setRule({ ...rule, regexPattern: e.target.value })}
          placeholder="e.g. \\d{10} for phone number"
        />

        <p style={{ fontSize: "12px", color: "gray" }}>
          Examples:
          <br />
          Email: ^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$
          <br />
          Phone: \\d{10}
        </p>

        {/* Mask Type Dropdown */}
        <TextField
          select
          label="Mask Type"
          fullWidth
          margin="dense"
          value={rule.maskType}
          onChange={(e) => setRule({ ...rule, maskType: e.target.value })}
        >
          <MenuItem value="FULL">FULL</MenuItem>
          <MenuItem value="PARTIAL">PARTIAL</MenuItem>
        </TextField>

        {/* Mask Character */}
        <TextField
          label="Mask Character"
          fullWidth
          margin="dense"
          value={rule.maskChar}
          onChange={(e) => setRule({ ...rule, maskChar: e.target.value })}
          placeholder="e.g. *"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RuleDialog;
