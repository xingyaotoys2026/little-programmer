import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import VideoPage from "@/pages/VideoPage";
import RecordPage from "@/pages/RecordPage";
import EditorPage from "@/pages/EditorPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}
