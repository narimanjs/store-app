import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/config";
import styles from "./ProductDetail.module.scss";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      const data: Product = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productDetail}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className={styles.details}>
        <h2>{product.title}</h2>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p>
      </div>
      <button
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    </div>
  );
};

export default ProductDetail;
