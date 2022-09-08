import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";

const AuthenticatedApp = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default AuthenticatedApp;