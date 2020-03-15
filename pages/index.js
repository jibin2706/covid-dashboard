import Head from "next/head";
import fetch from "node-fetch";

const Home = ({ global }) => (
  <div className="container">
    <Head>
      <title>COVID-19</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">COVID 19</h1>
      <div className="card">
        Confirmed
        {global.confirmed}
      </div>
      <div className="card">
        Deaths
        {global.deaths}
      </div>
      <div className="card">
        Recovered
        {global.recovered}
      </div>
    </main>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
