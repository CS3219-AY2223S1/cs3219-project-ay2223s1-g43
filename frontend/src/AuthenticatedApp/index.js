import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LearningPathwayPage from "./LearningPathwayPage";
import MatchingPage from "./MatchingPage";
import RoomPage from "./RoomPage";

const AuthenticatedApp = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/matching/:difficulty" element={<MatchingPage />} />
        <Route exact path="/room-page" element={<RoomPage />} />
        <Route exact path="/learning-pathway" element={<LearningPathwayPage />} />
      </Routes>
    </Router>
  )
}

export default AuthenticatedApp;