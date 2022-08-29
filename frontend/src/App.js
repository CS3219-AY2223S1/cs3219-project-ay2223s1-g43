import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./components/SignUp";

const sx = {
    container: {
        height: "100vh",
    }
}

function App() {
    return (
        <div className="App">
            <Container maxWidth="xl" sx={sx.container}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<LandingPage />}></Route>
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </Router>
            </Container>
        </div>
    );
}

export default App;
