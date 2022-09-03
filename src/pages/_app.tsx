import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  /* eslint react/jsx-props-no-spreading: 0 */
  return <Component {...pageProps} />;
}

export default MyApp;
