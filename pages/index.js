import Head from "next/head";
import fetch from "node-fetch";
import TimeseriesGraph from "../src/components/TimeseriesGraph";

import css from "../src/styles/index.module.scss";

const Home = ({ global }) => (
  <div className="container">
    <Head>
      <title>COVID-19</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">COVID 19</h1>
      <section className={css.cardContainer}>
        <div className={css.card}>
          <h2 className={css.cardHeader}>Confirmed</h2>
          <h2 className={css.countNumber}>
            {Number(global.confirmed).toLocaleString()}
          </h2>
        </div>
        <div className={css.card}>
          <h2 className={css.cardHeader}>Deaths</h2>
          <h2 className={css.countNumber}>
            {Number(global.deaths).toLocaleString()}
          </h2>
        </div>
        <div className={css.card}>
          <h2 className={css.cardHeader}>Recovered</h2>
          <h2 className={css.countNumber}>
            {Number(global.recovered).toLocaleString()}
          </h2>
        </div>
      </section>

      <section className={css.card} style={{ padding: 0, margin: "2rem 0" }}>
        <TimeseriesGraph />
      </section>
    </main>

    <style jsx>{`
      .container {
        min-height: 100vh;
        max-width: 1000px;
        margin: auto;
        padding: 0 0.5rem;
      }

      main {
        padding: 5rem 0;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export async function getStaticProps() {
  const res = await fetch("https://covid-dashboard.now.sh/api/global");
  const data = await res.json();

  return { props: { global: data } };
}

export default Home;
