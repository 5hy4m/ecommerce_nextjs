import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin='anonymous'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;500&display=swap'
                    rel='stylesheet'
                />
                <link
                    rel='stylesheet'
                    href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
                    integrity='sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65'
                    crossOrigin='anonymous'
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
