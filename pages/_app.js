import "../node_modules/bootstrap/scss/bootstrap.scss";
import "../scss/style.scss";
import MainLayout from "../components/layouts/MainLayout";
import Head from "next/head";
import { MainProvider } from "../components/context/MainContext";

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

            <MainProvider>
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            </MainProvider>
        </>
    );
}
