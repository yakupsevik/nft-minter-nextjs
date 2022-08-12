/* ______________________________________________ */

//* Imports

import "../styles/globals.scss";
import { useEffect, useState } from "react";
import { MoralisProvider } from "react-moralis";
import { useRouter } from 'next/router'

/* ______________________________________________ */

function MyApp({ Component, pageProps }) {

  const [metamaskStatus, setMetamaskStatus] = useState("");
  const router = useRouter()

  useEffect(() => {
    setMetamaskStatus(localStorage.getItem("metamask_status"));
  }, [router])

  return (
    /* Moralis Provider */
    <MoralisProvider
      // Moralis Server URL
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      // Moralis APP ID
      appId={process.env.NEXT_PUBLIC_APP_ID}
    >

      <div className="metamask__status">
        <div className="content">
          <div className="logo"></div>
          <span>MetaMask</span>
          <div className="status_dot">
            <div className={metamaskStatus}></div>
          </div>
        </div>
      </div>

      <Component {...pageProps} />

      <footer>
        <span>
          Developed by Yakup Sevik
        </span>
      </footer>
    </MoralisProvider>
  );
}

/* ______________________________________________ */

export default MyApp;
