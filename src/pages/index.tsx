import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import ConvertPage from "./Home";
import Head from "next/head";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000); // set loading to false after 4 seconds
  }, []);

  return (
    <>
      <Head>
        <title>CodeShifter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {loading ? (
          <div className="spinner">
            <p className="note">
              NOTE:This tool only converts syntax for now. Logic conversion is
              still under development
            </p>
          </div>
        ) : (
          <p>Server under maintenance</p>
        )}
      </main>
    </>
  );
}
