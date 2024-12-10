import React, { useState } from "react";
import "../assets/styles/FormModal.css";


const FormModal = ({ show, onClose }) => {
    if (!show) return null;

    const [form, setForm] = useState({
        title: "",
        description: "",
        fields: [
            {
                id: 1,
                type: "text",
                label: "Ваше имя",
                placeholder: "Введите имя",
                required: true,
            },
            {
                id: 2,
                type: "email",
                label: "Ваша электронная почта",
                placeholder: "Введите свою электронную почту",
                required: true,
            },
        ],
    });

    const handleInputChange = (name, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleFieldChange = (id, name, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            fields: prevForm.fields.map((field) =>
                field.id === id ? { ...field, [name]: value } : field
            ),
        }));
    };

    const addField = () => {
        setForm((prevForm) => ({
            ...prevForm,
            fields: [
                ...prevForm.fields,
                {
                    id: prevForm.fields.length + 1,
                    type: "text",
                    label: "",
                    placeholder: "",
                    required: false,
                },
            ],
        }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Вы не авторизированы");
            return;
        }
    
        try {
            const response = await fetch("http://0.0.0.0:8000/api/v1/forms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });
    
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Форма успешно отправлена:", data);
            alert("Форма успешно отправлена!");
            onClose();
        } catch (error) {
            console.error("Ошибка отправки формы:", error);
            alert("Ошибка отправки формы");
        }
    };
    
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h2 className="modal-title">Создать опрос</h2>
                <form className="modal-form">
                    <div className="form-group">
                        <label>Заголовок:</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            placeholder="Введите заголовок"
                        />
                    </div>
                    <div className="form-group">
                        <label>Описание:</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Введите описание"
                        ></textarea>
                    </div>
                    <h3>Поля ввода:</h3>
                    {form.fields.map((field) => (
                        <div key={field.id} className="field-container">
                            <div className="form-group">
                                <label>Тип:</label>
                                <select
                                    value={field.type}
                                    onChange={(e) =>
                                        handleFieldChange(field.id, "type", e.target.value)
                                    }
                                >
                                    <option value="text">Text</option>
                                    <option value="email">Email</option>
                                    <option value="radio">Radio</option>
                                    <option value="checkbox">Checkbox</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Этикетка:</label>
                                <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) =>
                                        handleFieldChange(field.id, "label", e.target.value)
                                    }
                                    placeholder="Этикетка поля"
                                />
                            </div>
                            <div className="form-group">
                                <label>Заполнитель:</label>
                                <input
                                    type="text"
                                    value={field.placeholder}
                                    onChange={(e) =>
                                        handleFieldChange(field.id, "placeholder", e.target.value)
                                    }
                                    placeholder="Заполнитель поля"
                                />
                            </div>
                            <div className="form-group">
                                <label>Необходимость ввода:</label>
                                <input
                                    type="checkbox"
                                    checked={field.required}
                                    onChange={(e) =>
                                        handleFieldChange(field.id, "required", e.target.checked)
                                    }
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="add-field-button"
                        onClick={addField}
                    >
                        + Добавить поле
                    </button>
                    <button
                        type="button"
                        className="submit-button"
                        onClick={handleSubmit}
                    >
                        Создать
                    </button>
                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                    >
                        
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormModal;
