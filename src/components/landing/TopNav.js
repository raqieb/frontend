import styles from './styles/TopNav.module.css';
import { Link } from 'react-router-dom';
import {
  Separator,
  Logo,
  UserMenu
} from '../common';
import { useAuth } from '../../hooks/common';


export const TopNav = () => {
  const { username, isLoading, handleLogout } = useAuth();

  return (
      <header className={styles.header}>
        <section className={styles.headerSection}>
          <Logo
            imagePath='/logo192name.png'
          />
          <nav className={styles.nav}>
            <Link to='/support' className={styles.navLink}>
              Support
            </Link>
            <Link to='/download' className={styles.navLink}>
              Download
            </Link>
            <Separator />
            {
              isLoading
                ?<h1> Loading ... </h1>
                :<>
                  {
                    username
                      ?<UserMenu
                        username={username}
                        handleLogout={handleLogout}
                      />
                      :<Link
                        to='/auth/login'
                        className={styles.navLink}
                      >
                        Log in
                      </Link>
                  }
                  <Link
                    to={username? '/dashboard': '/auth/signup'}
                    className={`${styles.navLink} ${styles.callToAction}`}
                  >
                    {username? 'Dashboard': 'Get Started'}
                  </Link>
                </>
            }
          </nav>
        </section>
      </header>
 
  );
}
