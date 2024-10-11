import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`}>
        <div className={styles.imageContainer}>
          <img
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className={styles.details}>
          <h3>{product.title}</h3>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
