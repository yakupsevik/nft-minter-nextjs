/* ______________________________________________ */

//* Imports

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

/* ______________________________________________ */

export default function Home() {
  // Authenticate & isAuthenticated data from Moralis
  const { authenticate, isAuthenticated } = useMoralis();

  // Use Router
  const router = useRouter();

  useEffect(() => {
    // Go to the /dashboard path If Metamask connected
    if (isAuthenticated) {
      localStorage.setItem("metamask_status", "true");
      router.push("/dashboard");
    } else {
      localStorage.setItem("metamask_status", "false");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Head>
        <title>NFTMinter Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button
        onClick={authenticate}
      >
        Connect Using Metamask
      </button>
    </>
  );
}

/* ______________________________________________ */