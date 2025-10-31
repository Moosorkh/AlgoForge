import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AlgorithmPage from "./pages/AlgorithmPage";
import LessonPage from "./pages/LessonPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/algorithm/:id" element={<AlgorithmPage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
