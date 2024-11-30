import React from "react";
import decode from "jwt-decode";

import AdminDashboard from "../AdminDashboard/AdminDashboard";
import UserDashboard from "../UserDashboard/UserDashboard";



const Dashboard = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <h1>Нет доступа. Выполните вход.</h1>;
    }

    let decodedToken;
    try {
        decodedToken = decode(token); // Декодирование токена
    } catch (error) {
        console.error("Ошибка декодирования токена:", error);
        return <h1>Токен некорректен. Выполните вход заново.</h1>;
    }

    console.log(decodedToken);  // Логируем, чтобы посмотреть структуру токена

    const role = decodedToken.role;  // Достаем роль из токена

    return (
        <div>
            {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
        </div>
    );
};

export default Dashboard;

// import React, { useState } from "react";
// import { decode } from "jwt-decode"; 
// import AdminDashboard from "../AdminDashboard/AdminDashboard";
// import UserDashboard from "../UserDashboard/UserDashboard";

// const Dashboard = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         return <h1>Нет доступа. Выполните вход.</h1>;
//     }

//     const decodedToken = decode(token);
//     const role = decodedToken.role;

//     return (
//         <div>
//             {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
//         </div>
//     );
// };

// export default Dashboard;
