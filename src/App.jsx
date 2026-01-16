import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MovieDetailPage from "./pages/MovieDetailPage";
import HomePage from "./pages/HomePage";
import MasterLayoutWeb from "./master-layout-web/MasterLayoutWeb";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MasterLayoutWeb />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
