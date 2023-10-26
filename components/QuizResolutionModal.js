import styles from '../styles/QuizResolutionModal.module.css';
import { useRouter } from 'next/navigation';

const QuizResolutionModal = ({ handleClose, quizId }) => {
    const router = useRouter();

    const handleSendResolution = () => {
        router.push(`/quiz/${quizId}/result`);
    };

    return (
        <div className={styles.box}>
            <div className={styles.componentBox}>
                <p className={styles.titleText}>Enviar resolucion</p>
                <p className={styles.text}>¿Estás seguro que deseas enviar tu resolución del quiz?</p>
                <div className={styles.buttonBox}>
                    <button className={styles.cancelButton} onClick={handleClose}>
                        Cancelar
                    </button>
                    <button className={styles.confirmButton} onClick={handleSendResolution}>
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizResolutionModal;
