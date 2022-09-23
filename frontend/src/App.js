import { Container } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import AuthenticatedApp from "./AuthenticatedApp";
import LoadingPage from "./components/LoadingPage";
import useAuth from "./hooks/auth/useAuth";
import {
    AuthContext,
    useAuthContext,
    useAuthContextProvider,
} from "./hooks/auth/useAuthContext";
import UnauthenticatedApp from "./UnauthenticatedApp";

const sx = {
    container: {
        height: "100vh",
    }
}

function App() {
    const { isLoggedIn } = useAuthContext();
    const { authenticate } = useAuth();
    const [isLoaded, setLoaded] = useState(false);
    const useEffectCalled = useRef(false);

    useLayoutEffect(() => {
        // Prevent useEffect from being called more than once
        if (useEffectCalled.current) return;

        authenticate().finally(() => {
            useEffectCalled.current = true
            setLoaded(true)
        })
    }, [])

    return (
        <div className="App">
            <Container maxWidth="xl" sx={sx.container}>
                {isLoaded
                    ? (isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />)
                    : <LoadingPage />}
            </Container>
        </div>
    )
}

function AppWrapper() {
    const authContextValue = useAuthContextProvider();
    return (
        <AuthContext.Provider value={authContextValue}>
            <App />
        </AuthContext.Provider>
    );
}

export default AppWrapper;
