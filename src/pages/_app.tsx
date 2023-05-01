import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalProvider } from '@/providers/Global/Provider';
import { IKContext } from 'imagekitio-react';
import { useRouter } from 'next/router';

const IMAGEKITIO_HOSTNAME = process.env.NEXT_PUBLIC_IMAGEKITIO_HOSTNAME;

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return (
        <GlobalProvider>
            <IKContext
                urlEndpoint={`https://ik.imagekit.io/${IMAGEKITIO_HOSTNAME}`}
            >
                <Component key={router.asPath} {...pageProps} />
            </IKContext>
        </GlobalProvider>
    );
}
