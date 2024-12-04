import React, { useState } from "react";
import RegistrationModal from "./RegistrationModal";
import "../assets/styles/Aside.css";

const Aside = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <aside className="aside">
      <h2 className="aside-title">Навигация</h2>
      <ul className="aside-menu">
        <li>Главная</li>
        <li>О нас</li>
        <li>Контакты</li>
      </ul>
      <button className="registration-button" onClick={handleOpenModal}>
        Регистрация
      </button>
      {isModalOpen && <RegistrationModal onClose={handleCloseModal} />}
    </aside>
  );
};

export default Aside;
