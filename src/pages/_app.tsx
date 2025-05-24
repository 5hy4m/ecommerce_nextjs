import '@/styles/globals.css';
import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';
import { GlobalProvider } from '@/providers/Global/Provider';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
            authorizationParams={{
                redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
            }}
        >
            <GlobalProvider>
                <Component key={router.asPath} {...pageProps} />
            </GlobalProvider>
        </Auth0Provider>
    );
}
