import React from 'react'
import Head from "next/head";
import { showCountryEmoji } from "../src/utils";

import GlobalDataSection from "../src/components/GlobalDataSection";

// import dynamic from "next/dynamic";
// const TimeseriesGraphClient = dynamic(import("../src/components/TimeseriesGraph"));

import css from "../src/styles/index.module.scss";

const Home = ({ global, countries, allCountries }) => {
  const [country, setCountry] = React.useState("India");
  const [countryData, setCountryData] = React.useState({
    isLoading: true,
    data: {
      confirmed: null,
      deaths: null,
      recovered: null,
    },
  });
  const [listData, setListData] = React.useState(allCountries);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch(`https://covid19.mathdro.id/api/countries/${country}`)
      .then((response) => response.json())
      .then((data) => {
        try {
          const { confirmed, deaths, recovered } = data;

          setCountryData({
            isLoading: false,
            data: {
              confirmed: confirmed.value,
              deaths: deaths.value,
              recovered: recovered.value,
            },
          });
        } catch {
          setError(`Sorry, can't find data for ${country}`);
        }
      });
  }, [country]);

  const getCountryData = (event) => {
    setCountryData({ ...countryData, isLoading: true });
    setCountry(event.target.value);
    setError("");
  };

  const sortCountryList = (e) => {
    const value = e.target.value;
    let result = [];

    if (value === "confirmed") {
      result = listData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    } else if (value === "recovered") {
      result = listData.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
    } else if (value === "deaths") {
      result = listData.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
    } else {
      result = allCountries;
    }

    // HACK: Adding empty array to trigger re-render
    setListData([...result, []]);
  };

  return (
    <div className={css.container}>
      <Head>
        <title>COVID-19 Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#222222" />
        <meta name="description" content="COVID-19 dashboard with stats about global and each country outbreak" />
        <meta name="application-name" content="COVID-19" />

        <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
        <link rel="manifest" href="/static/manifest.json" />
      </Head>

      <main>
        <h1 className={css.title}>COVID-19 </h1>

        <GlobalDataSection confirmed={global.confirmed} deaths={global.deaths} recovered={global.recovered} />

        <h2 className={css.subtitle} style={{ marginTop: "2rem" }}>
          <label htmlFor="country-select">Country Data</label>
        </h2>

        <select
          id="country-select"
          className={css.input}
          placeholder="select country"
          onChange={getCountryData}
          value={country}>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.emoji} {country.name}
            </option>
          ))}
        </select>
        {countryData.isLoading && !error ? (
          <div className={css.loadingSection}>
            <div className="lds-dual-ring"></div>
          </div>
        ) : (
          <section className={`${css.cardContainer} ${css.countryCardContainer}`} style={{ marginTop: "1rem" }}>
            <div className={css.card} style={{ color: "#ffc107" }}>
              <h2 className={css.cardHeader}>Confirmed</h2>
              <h2 className={css.countNumber}>{Number(countryData.data.confirmed).toLocaleString()}</h2>
              {/* <h3 className={css.cardFooter}>
                {Number(countryData.data.confirmed) - Number(countryData.data.recovered)} Active Cases
              </h3> */}
            </div>
            <div className={css.card} style={{ color: "#fb7a88" }}>
              <h2 className={css.cardHeader}>Deaths</h2>
              <h2 className={css.countNumber}>{Number(countryData.data.deaths).toLocaleString()}</h2>
              {/* <h3 className={css.cardFooter}>
                {Math.floor((Number(countryData.data.deaths) / Number(countryData.data.confirmed)) * 100)}% Fatality
              </h3> */}
            </div>
            <div className={css.card} style={{ color: "#82ca9d" }}>
              <h2 className={css.cardHeader}>Recovered</h2>
              <h2 className={css.countNumber}>{Number(countryData.data.recovered).toLocaleString()}</h2>
              {/* <h3 className={css.cardFooter}>
                {Math.floor((Number(countryData.data.recovered) / Number(countryData.data.confirmed)) * 100)}% Recovery
                Rate
              </h3> */}
            </div>
          </section>
        )}

        {error && (
          <div className={css.loadingSection}>
            <h3>{error}</h3>
          </div>
        )}

        <section className={css.card} style={{ padding: 0, marginTop: "4rem" }}>
          <div className={css.filterSection}>
            <label>
              Filter countries
              <input onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} value={searchTerm} />
            </label>
            <label>
              Sort By
              <select onChange={sortCountryList}>
                <option></option>
                <option value="confirmed">Confirmed</option>
                <option value="recovered">Recovered</option>
                <option value="deaths">Deaths</option>
              </select>
            </label>
          </div>
          <div className={`${css.countryList} ${css.countryListHeader}`}>
            <span>Country</span>
            <span>Confirmed</span>
            <span>Deaths</span>
            <span>Recovered</span>
          </div>
          {listData.map((country) => {
            if (country.Country && country.TotalConfirmed > 0 && country.Country.toLowerCase().includes(searchTerm))
              return (
                <div className={css.countryList} key={country.Country}>
                  <span>{country.Country}</span>
                  <span>
                    <span className={css.dot} style={{ background: "#ffc107" }} /> {country.TotalConfirmed}
                  </span>
                  <span>
                    <span className={css.dot} style={{ background: "#fb7a88" }} /> {country.TotalDeaths}
                  </span>
                  <span>
                    <span className={css.dot} style={{ background: "#82ca9d" }} /> {country.TotalRecovered}
                  </span>
                </div>
              );
          })}
        </section>

        {/* <h2 className={css.subtitle} style={{ marginTop: "2rem" }}>
          Global Outbreak Graph
        </h2>
        <section
          className={css.card}
          style={{
            padding: 0,
            width: "100%",
            height: "400px",
          }}>
          <TimeseriesGraphClient />
        </section> */}
      </main>

      <footer className={css.footer}>
        Data taken from&nbsp;
        <a className={css.link} href="https://github.com/CSSEGISandData/COVID-19">
          transformating data
        </a>
        &nbsp; from Johns Hopkins CSSE &&nbsp;
        <a className={css.link} href="https://github.com/mathdroid/covid-19-api">
          covid-19-api
        </a>
        <br />
        <p>
          Developed by &nbsp;
          <a className={css.link} href="https://jibin.tech">
            Jibin Thomas
          </a>
        </p>
      </footer>
    </div>
  );
};

export async function getStaticProps() {
  const global = await fetch("https://covid-dashboard.now.sh/api/global");
  const globalData = await global.json();

  const countries = await fetch("https://covid19.mathdro.id/api/countries");
  let countriesData = await countries.json();
  countriesData = countriesData.countries.map((country) => {
    return { ...country, emoji: showCountryEmoji(country.iso2) };
  });

  const listData = await fetch("https://api.covid19api.com/summary");
  const listDataResult = await listData.json();

  return { props: { global: globalData, countries: countriesData, allCountries: listDataResult.Countries } };
}

export default Home;
