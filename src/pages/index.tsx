import { useState, useEffect } from "react";
import ConvertPage from "./Home";
import Head from "next/head";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const connectedTimer = setTimeout(() => {
        setConnected(true);
      }, 5000);

      return () => clearTimeout(connectedTimer);
    }
  }, [loading]);

  return (
    <>
      <Head>
        <title>CodeShifter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex flex-col items-center justify-between p-24">
        {loading ? (
          <div className="spinner">
            <p className="fixed p-1 font-semibold bg-gray-200/30 top-40 rounded-md">OpenAI API Connecting...</p>
          </div>
        ) : connected ? (
          <ConvertPage />
        ) : (
          <div className="spinner">
            <p className="fixed p-1 font-semibold bg-gray-200/30 top-40 rounded-md">Connected...</p>
          </div>
        )}
      </main>
    </>
  );
}
