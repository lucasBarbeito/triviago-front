import styles from '../styles/ConfirmationModal.module.css';
import { useRouter } from 'next/navigation';

const ConfirmationModal = ({ onClose, quizId }) => {
    const router = useRouter();

    const handleStartQuiz = () => {
        console.log(quizId)
        router.push(`/quiz/${quizId}/solve`);
    };

    return (
        <div className={styles.box}>
            <div className={styles.componentBox}>
                <p className={styles.titleText}>Realizar quiz</p>
                <p className={styles.text}>
                    ¿Estás seguro que deseas realizar el quiz titulado “Titulo del quiz” creado por creador_del_quiz@mail.com?
                </p>
                <div className={styles.buttonBox}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={styles.confirmButton} onClick={handleStartQuiz}>
                        Comenzar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
