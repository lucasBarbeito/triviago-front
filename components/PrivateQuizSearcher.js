import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/PrivateQuizSearcher.module.css';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import { useRequestService } from '@/service/request.service';

const PrivateQuizSearcher = () => {
    const [invitationCode, setInvitationCode] = useState('');
    const service = useRequestService();
    const router = useRouter();

    const handleSearch = async () => {
        if (invitationCode.trim() !== '') {
            try {
                const quizData = await service.findByInvitationCode(invitationCode);

                // If the quiz is found, redirect to the quiz details page
                if (quizData) {
                    router.push(`/quiz/${quizData.id}/details`);
                } else {
                    console.log('Quiz not found');
                }
            } catch (error) {
                console.log('Error searching for the quiz:', error);
            }
        }
    };

    return (
        <div className={styles.privateQuizSearcherContainer}>
            <p className={styles.privateQuizSearcherTitle}>Código de invitación</p>
            <div className={styles.privateQuizSearcherSearchContainer}>
                <Form.Control
                    type="search"
                    className={styles.privateQuizSearcherSearchInput}
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                />
                <Image
                    src="/assets/images/Search.png"
                    className={styles.privateQuizSearcherSearchButton}
                    width={33}
                    height={33}
                    onClick={handleSearch}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
            </div>
        </div>
    );
};

export default PrivateQuizSearcher;
