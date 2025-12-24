// pages/Welcome.jsx
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

export default function Welcome() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate("/dashboard")
      }
      setLoading(false)
    }
    checkUser()
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e9e9e9] flex items-center justify-center">
        <p className="text-[#0c566e]">Loading...</p>
      </div>
    )
  }

  // Smooth scroll to section
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-opacity-80 backdrop-blur-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/duck.svg" alt="Dev Helper" className="w-10 h-10" />
          <p className="font-bold text-[#0c566e]">Dev Helper</p>
        </div>
        <ul className="flex gap-8">
          <li className="text-[#0c566e] cursor-pointer hover:scale-110 transition duration-300" onClick={() => scrollToSection("home")}>Home</li>
          <li className="text-[#0c566e] cursor-pointer hover:scale-110 transition duration-300" onClick={() => scrollToSection("features")}>Features</li>
          <li className="text-[#0c566e] cursor-pointer hover:scale-110 transition duration-300" onClick={() => scrollToSection("about")}>About</li>
          <li className="text-[#0c566e] cursor-pointer hover:scale-110 transition duration-300" onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>
        <div className="flex gap-2">
          <button onClick={() => navigate("/login")} className="text-[#0c566e]">Sign In</button>
          <button onClick={() => navigate("/signup")} className="text-[#0c566e] font-semibold shadow border border-gray-300 rounded px-4 py-1">Sign Up</button>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center" data-aos="fade-up">
        <img src="/duck.svg" alt="Dev Helper" className="w-20 h-20 mb-6" data-aos="fade-up" />
        <h1 className="text-5xl font-bold text-[#0c566e] mb-4" data-aos="fade-up">Create, Manage and Track</h1>
        <p className="text-xl text-gray-600 mb-8" data-aos="fade-up">
          Organize your development projects, track deadlines, and boost your productivity
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            data-aos="fade-right"
            className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition shadow-lg"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            data-aos="fade-left"
            className="bg-white text-[#0c566e] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg border border-gray-200"
          >
            Sign In
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100 min-h-screen" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center text-[#0c566e] mb-10">Features</h2>
        <div className="grid gap-6 px-4">
            <div className=" p-6 rounded-lg shadow-md h-70" data-aos="fade-in">
              <h3 className="text-lg font-semibold text-[#0c566e] mb-2">Project Management</h3>
              <p className="text-gray-600 text-sm">Easily manage all your projects in one place.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition text-center" data-aos="fade-in">
              <div className="text-5xl mb-3">⏰</div>
              <h3 className="text-lg font-semibold text-[#0c566e] mb-2">Track Deadlines</h3>
              <p className="text-gray-600 text-sm">Never miss deadlines with our smart tracking.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition text-center" data-aos="fade-in">
              <div className="text-5xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold text-[#0c566e] mb-2">Boost Productivity</h3>
              <p className="text-gray-600 text-sm">Optimize your workflow and stay productive.</p>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 min-h-screen">
        <h2 className="text-4xl font-bold text-center text-[#0c566e] mb-10">About Dev Helper</h2>
        <p className="max-w-3xl mx-auto text-center text-gray-600 px-4">
          Dev Helper is designed to simplify project management for developers. Track, create, and manage your projects efficiently while keeping your team on the same page.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100 min-h-screen">
        <h2 className="text-4xl font-bold text-center text-[#0c566e] mb-10">Contact Us</h2>
        <p className="text-center text-gray-600 px-4">
          For support or inquiries, reach us at <a href="mailto:support@devhelper.com" className="text-cyan-600">support@devhelper.com</a>
        </p>
      </section>
    </div>
  )
}
