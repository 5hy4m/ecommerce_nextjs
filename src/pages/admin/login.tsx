import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export default function AdminLogin() {
    const { loginWithRedirect, isAuthenticated, user, logout, isLoading } =
        useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    if (isLoading) return <div>Loading...</div>;

    if (isAuthenticated) {
        return (
            <div>
                <h2>Welcome, {user?.name}!</h2>
                <button
                    onClick={() =>
                        logout({
                            logoutParams: { returnTo: window.location.origin },
                        })
                    }
                >
                    Logout
                </button>
            </div>
        );
    }

    return null;
}
