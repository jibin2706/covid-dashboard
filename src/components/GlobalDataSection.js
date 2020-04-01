import { useCountUp } from "react-countup";
import css from "../styles/index.module.scss";

function GlobalDataSection({ confirmed, deaths, recovered }) {
  const { countUp: confirmedCount } = useCountUp({
    end: confirmed,
    duration: 1,
  });
  const { countUp: deathCount } = useCountUp({
    end: deaths,
    duration: 1,
  });
  const { countUp: recoveredCount } = useCountUp({
    end: recovered,
    duration: 1,
  });

  return (
    <>
      <h2 className={css.subtitle}>Global Data</h2>
      <section className={css.cardContainer}>
        <div className={css.card} style={{ color: "#ffc107" }}>
          <h2 className={css.cardHeader}>Confirmed</h2>
          <h2 className={css.countNumber}>{Number(confirmedCount).toLocaleString()}</h2>
          <h3 className={css.cardFooter}>{confirmed - recovered} Active</h3>
        </div>
        <div className={css.card} style={{ color: "#fb7a88" }}>
          <h2 className={css.cardHeader}>Deaths</h2>
          <h2 className={css.countNumber}>{Number(deathCount).toLocaleString()}</h2>
          <h3 className={css.cardFooter}>{Math.floor((deaths / confirmed) * 100)}% Fatality Rate</h3>
        </div>
        <div className={css.card} style={{ color: "#82ca9d" }}>
          <h2 className={css.cardHeader}>Recovered</h2>
          <h2 className={css.countNumber}>{Number(recoveredCount).toLocaleString()}</h2>
          <h3 className={css.cardFooter}>{Math.floor((recovered / confirmed) * 100)}% Recovery Rate</h3>
        </div>
      </section>
    </>
  );
}

export default GlobalDataSection;
