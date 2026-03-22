import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "../style/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <AppBar position="static" className="navbar">
            <Toolbar className="toolbar">
                
                {/* Left Side - App Name */}
                <Typography variant="h6" className="logo">
                    Data Masking Platform
                </Typography>

                {/* Right Side - Menu */}
                <div className="menu">
                    {!token ? (
                        <>
                            {location.pathname === "/" && (
                                <Button className="nav-btn" component={Link} to="/register">
                                    Register
                                </Button>
                            )}

                            {location.pathname === "/register" && (
                                <Button className="nav-btn" component={Link} to="/">
                                    Login
                                </Button>
                            )}
                        </>
                    ) : (
                        <>
                            <Button className="nav-btn" component={Link} to="/dashboard">
                                Dashboard
                            </Button>

                            <Button className="nav-btn" component={Link} to="/upload">
                                Upload Data
                            </Button>

                            <Button className="nav-btn" component={Link} to="/audit">
                                Audit Logs
                            </Button>

                            <Button className="nav-btn logout-btn" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;