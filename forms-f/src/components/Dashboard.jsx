import React, { useState } from "react";
import decode from "jwt-decode";

import "../assets/styles/Dashboard.css";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";


const Dashboard = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <h1>Нет доступа. Выполните вход.</h1>;
    }

    let decodedToken;
    try {
        decodedToken = decode(token);
    } catch (error) {
        console.error("Ошибка декодирования токена:", error);
        return <h1>Токен некорректен. Выполните вход заново.</h1>;
    }

    return (
        <>
            <div className="wrapper">
                <div className="main">
                    {decodedToken.role === "Admin" ? <AdminDashboard /> : <UserDashboard />}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
