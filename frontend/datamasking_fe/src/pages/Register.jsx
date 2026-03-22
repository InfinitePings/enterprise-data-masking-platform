import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Paper,
    Box
} from "@mui/material";
import "../style/Register.css";

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            navigate("/");
        } catch {
            alert("Error registering user");
        }
    };

    return (
        <div className="register-container">
            <Paper className="register-card">
                <Typography variant="h5" className="register-title">
                    Register
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />

                    <Box className="register-btn-box">
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            className="register-btn"
                        >
                            Register
                        </Button>
                    </Box>
                </form>
            </Paper>
        </div>
    );
};

export default Register;