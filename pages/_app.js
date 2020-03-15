import { initGA, logPageView } from "../src/components/googleAnalytics";
import "../src/styles/global.scss";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
