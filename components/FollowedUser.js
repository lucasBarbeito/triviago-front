import styles from '@/styles/FollowedUser.module.css';

const FollowedUser = ({ email, name, lastname }) => {
    return (
        <div className={styles.boxComponent}>
            <p className={styles.emailText}>{email}</p>
            <p className={styles.fullnameText}>{name} {lastname} {lastname}</p>
        </div>
    )
}
export default FollowedUser;