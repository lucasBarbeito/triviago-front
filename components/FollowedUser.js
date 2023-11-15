import styles from '@/styles/FollowedUser.module.css';

const FollowedUser = ({email, name, lastname, id}) => {
    const profileUrl = `/user/${id}/profile`;

    return (
        <div className={styles.boxComponent}>
            {/*/!*<a href={profileUrl}>*!///DESCOMENTAR ESTOS COMENTARIOS PARA QUE FUNCIONE EL LINK*/}
                <p className={styles.emailText}>{email}</p>
                <p className={styles.fullnameText}>{name} {lastname} {lastname}</p>
            {/*</a>*/}
        </div>
    )
}
export default FollowedUser;