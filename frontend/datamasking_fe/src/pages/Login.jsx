import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Paper,
    Box
} from "@mui/material";
import "../style/Login.css";

const Login = () => {
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
            const res = await loginUser(form);
            localStorage.setItem("token", res.data);
            navigate("/dashboard");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <Paper className="login-card">
                <Typography variant="h5" className="login-title">
                    Login
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

                    <Box className="login-btn-box">
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            className="login-btn"
                        >
                            Login
                        </Button>
                    </Box>
                </form>
            </Paper>
        </div>
    );
};

export default Login;