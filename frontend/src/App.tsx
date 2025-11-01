import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeUpdated from "./pages/HomeUpdated";
import AlgorithmPage from "./pages/AlgorithmPage";
import LessonPage from "./pages/LessonPage";
import GamifiedLessonPage from "./pages/GamifiedLessonPage";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Use updated home page with all categories */}
        <Route path="/" element={<HomeUpdated />} />
        <Route path="/algorithm/:id" element={<AlgorithmPage />} />
        {/* Use gamified lesson page by default */}
        <Route path="/lesson/:id" element={<GamifiedLessonPage />} />
        {/* Keep old lesson page for comparison */}
        <Route path="/lesson-classic/:id" element={<LessonPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
