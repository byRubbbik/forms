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
                label: "Your Name",
                placeholder: "Enter your name",
                required: true,
            },
            {
                id: 2,
                type: "email",
                label: "Your Email",
                placeholder: "Enter your email",
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

    const handleSubmit = () => {
        console.log("Form JSON:", form);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h2 className="modal-title">Create Survey</h2>
                <form className="modal-form">
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            placeholder="Enter survey title"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Enter survey description"
                        ></textarea>
                    </div>
                    <h3>Fields:</h3>
                    {form.fields.map((field) => (
                        <div key={field.id} className="field-container">
                            <div className="form-group">
                                <label>Type:</label>
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
                                <label>Label:</label>
                                <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) =>
                                        handleFieldChange(field.id, "label", e.target.value)
                                    }
                                    placeholder="Field label"
                                />
                            </div>
                            <div className="form-group">
                                <label>Placeholder:</label>
                                <input
                                    type="text"
                                    value={field.placeholder}
                                    onChange={(e) =>
                                        handleFieldChange(field.id, "placeholder", e.target.value)
                                    }
                                    placeholder="Field placeholder"
                                />
                            </div>
                            <div className="form-group">
                                <label>Required:</label>
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
                        + Add Field
                    </button>
                    <button
                        type="button"
                        className="submit-button"
                        onClick={handleSubmit}
                    >
                        Submit
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
