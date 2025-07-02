import styles from "./links.module.css";
import { ArrowRight } from "lucide-react";

const Links = () => {
  return (
    <section className={styles.Links}>
      <div className={styles.wrapperLinks}>
        <div className={styles.linksContent}>
          <h2>Insira aqui o seu link</h2>
        </div>
        <div className={styles.linksInput}>
          <input type="text" placeholder="Cole seu link aqui" id="" />
          <button><ArrowRight /></button>
        </div>
      </div>
    </section>
  );
};

export default Links;
