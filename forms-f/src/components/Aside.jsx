import React, { useState } from "react";
import RegistrationModal from "./RegistrationModal";
import FormModal from "./FormModal";
import decode from "jwt-decode";
import "../assets/styles/Aside.css";


const Aside = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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

  const { role } = decodedToken;

  return (
    <aside className="aside">
      <h2 className="aside-title">Навигация</h2>
      <ul className="aside-menu">
        <li>Главная</li>
        <li>О нас</li>
        <li>Контакты</li>
      </ul>
      <button className="registration-button" onClick={handleOpenModal}>
        {role === "User" ? "Создать форму" : "Создание пользователя"}
      </button>
      {isModalOpen && (
        role === "User" ? (
          <FormModal show={isModalOpen} onClose={handleCloseModal} />
        ) : (
          <RegistrationModal show={isModalOpen} onClose={handleCloseModal} />
        )
      )}
    </aside>
  );
};

export default Aside;
