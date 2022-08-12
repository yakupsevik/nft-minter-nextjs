/* ______________________________________________ */

//* Imports

import { useEffect } from "react";
import { MoralisProvider } from "react-moralis";
import "../styles/globals.scss";

/* ______________________________________________ */

function MyApp({ Component, pageProps }) {

  const metamaskStatus = async () => {
    console.log(localStorage.getItem("metamask_status"))
    return localStorage.getItem("metamask_status");
  }

  return (
    /* Moralis Provider */
    <MoralisProvider
      // Moralis Server URL
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      // Moralis APP ID
      appId={process.env.NEXT_PUBLIC_APP_ID}
    >

      <Component {...pageProps} />

      <div className="metamask__status">
        <div className="content">
          <div className="logo"></div>
          <span>MetaMask</span>
          <div className="status_dot">
            <div className={metamaskStatus}></div>
          </div>
        </div>
      </div>
    </MoralisProvider>
  );
}

/* ______________________________________________ */

export default MyApp;
