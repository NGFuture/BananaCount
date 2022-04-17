import "../scss/style.scss";
import MainLayout from "../components/layouts/MainLayout";
import Head from "next/head";

export default function MyApp(props) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Banana Count </title>
                <meta
                    name="description"
                    content="This app helps to keep track of items"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/logo.png"
                />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>


            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </>
    );
}
