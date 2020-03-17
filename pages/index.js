import Head from "next/head";
import fetch from "node-fetch";
import TimeseriesGraph from "../src/components/TimeseriesGraph";
import { useCountUp } from "react-countup";

import css from "../src/styles/index.module.scss";

const Home = ({ global, countries }) => {
  const [country, setCountry] = React.useState("India");
  const [countryData, setCountryData] = React.useState({
    isLoading: true,
    data: {
      confirmed: null,
      deaths: null,
      recovered: null
    }
  });
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch(`https://covid19.mathdro.id/api/countries/${country}/confirmed`)
      .then(response => response.json())
      .then(data => {
        try {
          const { confirmed, deaths, recovered } = data[0];
          setCountryData({
            isLoading: false,
            data: { confirmed, deaths, recovered }
          });
        } catch {
          setError(`Sorry, can't find data for ${country}`);
        }
      });
  }, [country]);

  const getCountryData = event => {
    setCountryData({ ...countryData, isLoading: true });
    setCountry(event.target.value);
    setError("");
  };

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

        <h2 className={css.subtitle}>Global Data</h2>
        <section className={css.cardContainer}>
          <div className={css.card} style={{ color: "#ffc107" }}>
            <h2 className={css.cardHeader}>Confirmed</h2>
            <h2 className={css.countNumber}>
              {Number(confirmedCount).toLocaleString()}
            </h2>
          </div>
          <div className={css.card} style={{ color: "#dc3545" }}>
            <h2 className={css.cardHeader}>Deaths</h2>
            <h2 className={css.countNumber}>
              {Number(deathCount).toLocaleString()}
            </h2>
          </div>
          <div className={css.card} style={{ color: "#82ca9d" }}>
            <h2 className={css.cardHeader}>Recovered</h2>
            <h2 className={css.countNumber}>
              {Number(recoveredCount).toLocaleString()}
            </h2>
          </div>
        </section>

        <h2 className={css.subtitle} style={{ marginTop: "2rem" }}>
          Country Data
        </h2>
        <select
          className={css.input}
          placeholder="select country"
          onChange={getCountryData}
          value={country}
        >
          {Object.keys(countries).map(country => (
            <option value={country}>{country}</option>
          ))}
        </select>
        {countryData.isLoading && !error ? (
          <div className={css.loadingSection}>
            <div class="lds-dual-ring"></div>
          </div>
        ) : (
          <section
            className={`${css.cardContainer} ${css.countryCardContainer}`}
            style={{ marginTop: "1rem" }}
          >
            <div className={css.card} style={{ color: "#ffc107" }}>
              <h2 className={css.cardHeader}>Confirmed</h2>
              <h2 className={css.countNumber}>
                {Number(countryData.data.confirmed).toLocaleString()}
              </h2>
            </div>
            <div className={css.card} style={{ color: "#dc3545" }}>
              <h2 className={css.cardHeader}>Deaths</h2>
              <h2 className={css.countNumber}>
                {Number(countryData.data.deaths).toLocaleString()}
              </h2>
            </div>
            <div className={css.card} style={{ color: "#82ca9d" }}>
              <h2 className={css.cardHeader}>Recovered</h2>
              <h2 className={css.countNumber}>
                {Number(countryData.data.recovered).toLocaleString()}
              </h2>
            </div>
          </section>
        )}

        {error && (
          <div className={css.loadingSection}>
            <h3>{error}</h3>
          </div>
        )}

        <h2 className={css.subtitle} style={{ marginTop: "2rem" }}>
          Global Outbreak Graph
        </h2>
        <section
          className={css.card}
          style={{
            padding: 0,
            width: "100%",
            height: "400px"
          }}
        >
          <TimeseriesGraph />
        </section>
      </main>

      <footer className={css.footer}>
        Data taken from{" "}
        <a
          className={css.link}
          href="https://github.com/CSSEGISandData/COVID-19"
        >
          transformating data
        </a>{" "}
        from Johns Hopkins CSSE &{" "}
        <a
          className={css.link}
          href="https://github.com/mathdroid/covid-19-api"
        >
          covid-19-api
        </a>
      </footer>
    </div>
  );
};

export async function getStaticProps() {
  const global = await fetch("https://covid-dashboard.now.sh/api/global");
  const globalData = await global.json();

  const countries = await fetch("https://covid19.mathdro.id/api/countries");
  const countriesData = await countries.json();

  return { props: { global: globalData, countries: countriesData.countries } };
}

export default Home;
