import styles from './header.module.css'

const Header = () => {
    return (
        <header className={styles.Header}>
            <div className={styles.wrapperHeader}>
                <div className={styles.logo}>EncurtaLinks</div>
                <nav className={styles.navHeader}>
                    <ul className={styles.ulMenu}>
                        <li className={styles.navLi}><a href="#encurtar">Comece aqui</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header