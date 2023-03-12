import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "../Pages/Login"
import Dashboard from "../Pages/Dashboard"
import Register from "../Pages/Register";

const loggedin = localStorage.getItem('@user');

const WebRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                {loggedin && <Route path="/" exact element={<Dashboard />} />}
                {!loggedin && <Route path="/" element={<Login loggedin={loggedin} />} />}
                {!loggedin && <Route path="/register" element={<Register loggedin={loggedin} />} />}
            </Routes>
        </BrowserRouter>
    );
};

export default WebRoute