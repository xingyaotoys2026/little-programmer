import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Lesson from "@/pages/Lesson";
import Practice from "@/pages/Practice";
import Header from "@/components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </Router>
  );
}
