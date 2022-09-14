import { Container } from "@mui/material";
import AuthenticatedApp from "./AuthenticatedApp";
import {
    AuthContext,
    useAuthContextProvider,
} from "./hooks/auth/useAuthContext";
import UnauthenticatedApp from "./UnauthenticatedApp";
const sx = {
    container: {
        height: "100vh",
    }
}

function App() {
    const authContextValue = useAuthContextProvider();
    const { isLoggedIn } = authContextValue;

    return (
        <AuthContext.Provider value={authContextValue}>
            <div className="App">
                <Container maxWidth="xl" sx={sx.container}>
                    {isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
                </Container>
            </div>
        </AuthContext.Provider>

    );
}

export default App;
