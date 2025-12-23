import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from "./components/layout"
import Dashboard from "./pages/dashboard"
import Projects from "./pages/projects"
import Deadlines from "./pages/deadlines"
import Activity from "./pages/activityLog"
import Settings from "./pages/settings"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Welcome from "./pages/welcome"

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="deadlines" element={<Deadlines />} />
          <Route path="activity" element={<Activity />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App