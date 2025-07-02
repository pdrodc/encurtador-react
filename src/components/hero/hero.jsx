import styles from "./hero.module.css";
import ImgHero from "../../assets/original-1cfb3574d3dba7aee693382.jpg";

const Hero = () => {
  return (
    <section className={styles.Hero}>
      <div className={styles.wrapperHero}>
        <div className={styles.heroContent}>
          <h1>Encurte seus links com facilidade aqui na EncurtaLinks.</h1>
          <p>
            Crie links curtos e compartilhe com facilidade, e dê mais
            visibilidade ao seu site.
          </p>
          <a href="">Comece aqui</a>
        </div>
        <div className={styles.heroImg}>
          <img src={ImgHero} alt="" />
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
