import type { NextPage } from "next";
import Head from "next/head";

import { useDqx9mbrpz1jhx } from "@/hooks/useDqx9mbrpz1jhx";

// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

const Home: NextPage = () => {
  const { isLoading, items } = useDqx9mbrpz1jhx();

  const first = items[0];
  const listItem = first ? (
    first.urls.map((item) => <li key={item}>{item}</li>)
  ) : (
    <li>no item</li>
  );

  return (
    <div>
      <Head>
        <title>seio.club</title>
        <meta name="description" content="seio.club - 聖櫻学園情報サイト - " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="navbar bg-base-100">
          <div className="flex-none">
            <button className="btn-ghost btn-square btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <a className="btn-ghost btn text-xl normal-case">seio.club</a>
          </div>
          <div className="flex-none">
            <button className="btn-ghost btn-square btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello seio.club</h1>
              <p className="py-6">ようこそ seio.club へ</p>
              <button className="btn-primary btn">開始前</button>
              <p>{isLoading ? "Loading" : "OK"}</p>
              <ul>{listItem}</ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer bg-neutral p-10 text-neutral-content">
        <div>
          <span className="footer-title">Services</span>
          <a className="link-hover link">Branding</a>
          <a className="link-hover link">Design</a>
          <a className="link-hover link">Marketing</a>
          <a className="link-hover link">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link-hover link">About us</a>
          <a className="link-hover link">Contact</a>
          <a className="link-hover link">Jobs</a>
          <a className="link-hover link">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link-hover link">Terms of use</a>
          <a className="link-hover link">Privacy policy</a>
          <a className="link-hover link">Cookie policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
