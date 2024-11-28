import React, { useState } from "react";
import axios from "axios";

import "./AuthForm.css";
import logo from "./images/logo.png";

const AuthForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    
    const validateForm = (data) => {
        const errors = {};
        if (!data.email) {
            errors.email = "Email обязателен";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Некорректный email";
        }
        if (!data.password) {
            errors.password = "Пароль обязателен";
        } else if (data.password.length < 8) {
            errors.password = "Пароль должен быть не менее 8 символов";
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
           setErrors(formErrors);
           return;
        }
    
        try {
        const response = await fetch("", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
    
        if (response.ok) {
            const result = await response.json();
            setSuccessMessage("Вход выполнен успешно!");
            console.log("Успешный вход:", result);
        } else {
            const result = await response.json();
            setErrors({ api: result.message || "Ошибка входа" });
        }
        } catch (error) {
            setErrors({ api: "Ошибка сети: " + error.message });
        }
      };
    
      return (
        <>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Авторизация</h1>
                        <span>или используйте свой аккаунт</span>

                        <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email" />
                        {errors.email && <span>{errors.email}</span>}

                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        />
                        {errors.password && <span>{errors.password}</span>}
                        
                        <a href="#">Забыли пароль?</a>

                        <button className="btn" type="submit">Вход</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                    <img src={logo} alt="Logo" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthForm;
