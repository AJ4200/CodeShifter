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
      </Head>
      <main className="flex flex-col items-center justify-between p-24">
        {loading ? (
          <div className="spinner"/>
        ) : (
          <ConvertPage />
        )}
      </main>
    </>
  );
}
