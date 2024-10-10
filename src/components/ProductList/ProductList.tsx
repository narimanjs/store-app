import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductList.module.scss";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

const categories = [
  "all",
  "men's clothing",
  "jewelery",
  "electronics",
  "women's clothing",
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  // Фильтрация по названию
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Фильтрация по категории
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  // Сортировка по цене
  const handleSort = (order: string) => {
    setSortOrder(order);
  };

  // Фильтрация, сортировка и поиск
  const filteredProducts = products
    .filter(
      product =>
        selectedCategory === "all" || product.category === selectedCategory
    )
    .filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  // Пагинация
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Общее количество страниц
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <input
          type='text'
          placeholder='Search by name...'
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
        />

        <select
          onChange={e => handleSort(e.target.value)}
          value={sortOrder}
        >
          <option value='asc'>Sort by price: Low to High</option>
          <option value='desc'>Sort by price: High to Low</option>
        </select>

        <select
          onChange={e => handleCategoryFilter(e.target.value)}
          value={selectedCategory}
        >
          {categories.map(category => (
            <option
              key={category}
              value={category}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {currentProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? styles.active : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
