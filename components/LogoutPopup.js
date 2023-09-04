import React from 'react';
import styles from '../styles/LogoutPopup.css';

const LogoutPopup = ({ onClose }) => {
    return (
        <div className={styles.logoutPopup} >
            <div className="popup-content">
                <p>Sesión cerrada exitosamente</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default LogoutPopup;
