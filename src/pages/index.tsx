import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import ConvertPage from './translator';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000); // set loading to false after 4 seconds
  }, []);

  return (
    <><Head>
<title>CodeShifter</title>
    </Head><main className="flex min-h-screen flex-col items-center justify-between p-24">
        {loading ? (

          <div className="spinner"></div>
        ) : (
          <ConvertPage />
        )}
      </main></>
  );
}
