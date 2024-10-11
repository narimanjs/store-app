import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { API_BASE_URL } from "../../utils/config";
import { useFilterContext } from "../../context/FilterContext";
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const productsPerPage = 4;

  const {
    searchQuery,
    selectedCategory,
    sortOrder,
    currentPage,
    setSearchQuery,
    setSelectedCategory,
    setSortOrder,
    setCurrentPage,
  } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(API_BASE_URL);
      const data: Product[] = await response.json();
      setProducts(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSort = (order: string) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
        {isLoading ? (
          <p>Loading products...</p>
        ) : currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p className={styles.noProducts}>Ничего не найдено</p>
        )}
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
