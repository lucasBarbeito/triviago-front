import React from 'react';
import './LogoutPopup.css';

const LogoutPopup = ({ onClose }) => {
    return (
        <div className="logout-popup">
            <div className="popup-content">
                <p>Sesión cerrada exitosamente</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default LogoutPopup;
