import styles from "./Header.module.scss";

const Header = () => {
  // Функция для перезагрузки страницы
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
