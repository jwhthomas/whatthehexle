import Head from 'next/head';
import Link from 'next/link';

export default function ComingSoon() {
  return (
    <div>
      <Head>
        <title>What The Hexle?</title>
      </Head>

      <div className="flex items-center h-screen text-white bg-black" id="hero">
        <div className="block w-screen text-center">
            <h1 className="text-7xl">This page is coming soon</h1>
            <Link href="/">
                <button className="mt-10 transition duration-300 ease-in-out bg-white rounded hover:scale-105">
                    <p className="p-4 text-black">Go Home</p>
                </button>
            </Link>
        </div>
      </div>
    </div>
  )
}