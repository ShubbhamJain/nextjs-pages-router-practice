import Head from "next/head";
import type { AppProps } from "next/app";

import "@/styles/globals.css";

import Layout from "@/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>UpVote Me</title>
        <meta
          name="description"
          content="UpVote Me is a app for upvoting and commenting."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
