import ProductCard from "./product-card/ProductCard";
import styles from "./style.module.css";
import image1 from "../../public/images/prod1.png";
import image2 from "../../public/images/prod2.png";
import image3 from "../../public/images/prod3.png";
import image4 from "../../public/images/prod4.png";
import image5 from "../../public/images/prod5.png";
import image6 from "../../public/images/prod6.png";
import image7 from "../../public/images/prod7.png";
import image8 from "../../public/images/prod8.png";
import image9 from "../../public/images/prod9.png";
import image10 from "../../public/images/prod10.png";

const product = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Our Products</h1>

      <div className={styles.portfolio_list}>
        {product.map((image, index) => (
          <ProductCard key={index} data={image} />
        ))}
      </div>
      <div className={styles.footer}>
        <p>
          visit our{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/dukes_n_earls?igsh=MTNnYnFyOTVvOTd1ag=="
          >
            INSTAGRAM
          </a>{" "}
          page so we can bring your dream style(s) to reality
        </p>
      </div>
    </div>
  );
}
