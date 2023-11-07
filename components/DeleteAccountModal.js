'use client';
import styles from '../styles/DeleteAccountModal.module.css';
import { useRouter } from 'next/navigation';

const DeleteAccountModal = ({ onClose, handleDeleteAccount }) => {
    const router = useRouter();

    const handleDeleteClick = () => {
        handleDeleteAccount();
        router.push(`/signin`);
    };

    return (
        <div className={styles.box}>
            <div className={styles.componentBox}>
                <p className={styles.titleText}>Eliminar cuenta</p>
                <p className={styles.text}>¿Estás seguro que deseas eliminar tu cuenta?</p>
                <div className={styles.buttonBox}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={styles.confirmButton} onClick={handleDeleteClick}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
