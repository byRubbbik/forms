import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/AuthForm.css";
import logo from "../assets/images/logo.png";

const AuthForm = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const validateForm = (data) => {
        const errors = {};
        if (!data.username) {
            errors.username = "Email обязателен";
        };
        if (!data.password) {
            errors.password = "Пароль обязателен";
        } else if (data.password.length < 6) {
            errors.password = "Пароль должен быть не менее 6 символов";
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
            const response = await fetch("http://0.0.0.0:8000/api/v1/users/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                setSuccessMessage("Вход выполнен успешно!");
                console.log("Успешный вход:", result);


                localStorage.setItem("token", result.access_token);
                navigate("/dashboard");
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
                            type="text"
                            name="username"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Имя пользователя"
                        />
                        {errors.username && <span>{errors.username}</span>}

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Пароль"
                        />
                        {errors.password && <span>{errors.password}</span>}

                        <a href="#">Забыли пароль?</a>

                        <button className="btn" type="submit">Вход</button>
                        {errors.api && <p className="error">{errors.api}</p>}
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
