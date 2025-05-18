import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalProvider } from '@/providers/Global/Provider';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return (
        <GlobalProvider>
            <Component key={router.asPath} {...pageProps} />
        </GlobalProvider>
    );
}
