import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Store</h1>
      </div>
      {/* <div className={styles.search}>
        <input
          type='text'
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
          placeholder='Введите для поиска...'
        />
      </div> */}
    </header>
  );
};

export default Header;
