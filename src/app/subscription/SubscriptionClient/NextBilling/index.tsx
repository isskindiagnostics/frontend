import { CardFlag } from "isskinui";

import * as styles from "./index.css";

const NextBilling = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <div>
          <p className={styles.smallText}>Próximo pagamento</p>
          <p className={styles.textHighlight}>23 de junho</p>
        </div>

        <div>
          <p className={styles.smallText}>Total à pagar</p>
          <p className={styles.textHighlight}>R$49,99</p>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <CardFlag flag="visa" className={styles.cardFlag} />
        <div className={styles.cardDetails}>
          <p className={styles.smallText}>Juliana de Assis Pereira</p>
          <div className={styles.circleContainer}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={styles.circleGroup}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={styles.circle}></div>
                ))}
              </div>
            ))}
            <p className={styles.smallText}>1234</p>
          </div>
          <p className={styles.smallText}>Expira em 06/28</p>
        </div>
      </div>
    </div>
  );
};

export default NextBilling;
