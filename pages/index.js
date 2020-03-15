import Head from "next/head";
import fetch from "node-fetch";
import TimeseriesGraph from "../src/components/TimeseriesGraph";
import { useCountUp } from "react-countup";

import css from "../src/styles/index.module.scss";

const Home = ({ global }) => {
  const { countUp: confirmedCount } = useCountUp({
    end: global.confirmed,
    duration: 1
  });
  const { countUp: deathCount } = useCountUp({
    end: global.deaths,
    duration: 1
  });
  const { countUp: recoveredCount } = useCountUp({
    end: global.recovered,
    duration: 1
  });

  return (
    <div className={css.container}>
      <Head>
        <title>COVID-19</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={css.title}>COVID-19 </h1>
        <section className={css.cardContainer}>
          <div className={css.card}>
            <h2 className={css.cardHeader}>Confirmed</h2>
            <h2 className={css.countNumber}>
              {Number(confirmedCount).toLocaleString()}
            </h2>
          </div>
          <div className={css.card}>
            <h2 className={css.cardHeader}>Deaths</h2>
            <h2 className={css.countNumber}>
              {Number(deathCount).toLocaleString()}
            </h2>
          </div>
          <div className={css.card}>
            <h2 className={css.cardHeader}>Recovered</h2>
            <h2 className={css.countNumber}>
              {Number(recoveredCount).toLocaleString()}
            </h2>
          </div>
        </section>

        {/* <section className={css.card} style={{ padding: 0, margin: "2rem 0" }}>
          <TimeseriesGraph />
        </section> */}
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://covid-dashboard.now.sh/api/global");
  const data = await res.json();

  return { props: { global: data } };
}

export default Home;
