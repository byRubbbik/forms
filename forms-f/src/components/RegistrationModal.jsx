import React, { useState } from "react";
import "../assets/styles/RegistrationModal.css";


const RegistrationModal = ({show, onClose }) => {
  if (!show) return null;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Вы не авторизованы.");
      }
  
      const response = await fetch("http://0.0.0.0:8000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail) {
          throw new Error(errorData.detail);
        } else {
          throw new Error("Ошибка регистрации");
        }
      }

      const data = await response.json();
      setSuccess("Пользователь успешно зарегистрирован!");
      setFormData({ username: "", email: "", password: "" });
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Регистрация</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
