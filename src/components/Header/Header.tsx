import styles from "./Header.module.scss";

const Header = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1
          onClick={reloadPage}
          style={{ cursor: "pointer" }}
        >
          Store
        </h1>
      </div>
    </header>
  );
};

export default Header;
