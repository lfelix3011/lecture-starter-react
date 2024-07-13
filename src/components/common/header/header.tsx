import { Link } from "react-router-dom";
import styles from "./header.module.css";
import briefcaseImg from "../../../assets/images/briefcase.svg";
import userImg from "../../../assets/images/user.svg";
import { AppPath } from "../../../common/enums/enums";

type Props = {
  isAuthenticated: boolean;
};

const Header = ({ isAuthenticated }: Props): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link
          to={AppPath.ROOT}
          data-test-id="header-logo"
          className={styles.header__logo}
        >
          Travel App
        </Link>
        {isAuthenticated && (
          <nav data-test-id="header-nav" className={styles.header__nav}>
            <ul className={styles.navHeader__list}>
              <li className={styles.navHeader__item} title="Bookings">
                <Link
                  to={AppPath.BOOKINGS}
                  data-test-id="header-bookings-link"
                  className={styles.navHeader__inner}
                >
                  <span className="visually-hidden">Bookings</span>
                  <img src={briefcaseImg} alt="bookings" />
                </Link>
              </li>
              <li className={styles.navHeader__item} title="Profile">
                <div
                  data-test-id="header-profile-nav"
                  className={`${styles.navHeader__inner} ${styles.profileNav}`}
                  tabIndex={0}
                >
                  <span className="visually-hidden">Profile</span>
                  <img src={userImg} alt="profile" />
                  <ul
                    data-test-id="header-profile-nav-list"
                    className={styles.profileNav__list}
                  >
                    <li
                      data-test-id="header-profile-nav-username"
                      className={styles.profileNav__item}
                    >
                      John Doe
                    </li>
                    <li className={styles.profileNav__item}>
                      <Link
                        to={AppPath.SIGN_IN}
                        data-test-id="header-profile-nav-sign-out"
                        className={`${styles.profileNav__signOut} button`}
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export { Header };
