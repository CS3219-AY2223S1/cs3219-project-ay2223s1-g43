import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import LandingPage from "./components/LandingPage";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<LandingPage />}></Route>
                        {/* <Route path="/signup" element={<SignupPage/>}/> */}
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;
