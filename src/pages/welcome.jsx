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
                <h2 className="text-4xl font-bold text-center text-[#0c566e] mb-10" data-aos="fade-up">Features</h2>
                <div className="max-w-6xl mx-auto px-4 space-y-12">
                    {/* Feature 1 - Image on Right */}
                    <div className="p-8 rounded-lg bg-white shadow-md hover:shadow-xl transition flex flex-col md:flex-row items-center gap-8" data-aos="fade-in">
                        <div className="flex-1 w-70">
                            <h1 className="text-[#0c566e] font-bold text-[1.7rem] mb-4" data-aos="fade-up">Manage all your projects in one place</h1>
                            <p className="text-gray-600 leading-relaxed" data-aos="fade-up">
                                Keep your development projects organized with our intuitive project management system.
                                Create, edit, and track multiple projects simultaneously. Categorize by status, type,
                                and priority to maintain a clear overview of all your work. Never lose track of what
                                needs attention with our centralized dashboard that brings everything together.
                            </p>
                        </div>
                        <span className="bg-[#0c566e] h-34 text-[#0c566e] rounded">.</span>
                        <div className="relative flex-1 flex justify-center gap-4 h-64 md:h-80 w-full">
                            <img src="/managemt.jpg" alt="Project Management" className="w-45 h-50 rounded-lg absolute top-0 left-10" data-aos="zoom-in-up" />
                            <img src="/managemt1.jpg" alt="Project management" className="w-45 h-50 rounded-lg absolute bottom-0 right-10" data-aos="zoom-in-up" />
                        </div>
                    </div>

                    {/* Feature 2 - Image on Left */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition flex flex-col md:flex-row-reverse items-center gap-8" data-aos="fade-in">
                        <div className="flex-1">
                            <h1 className="text-[#0c566e] font-bold text-[1.7rem] mb-4" data-aos="fade-up">Track Deadlines Effortlessly</h1>
                            <p className="text-gray-600 leading-relaxed" data-aos="fade-up">
                                Never miss an important deadline again with our smart tracking system. Visualize all
                                your upcoming deadlines in an organized timeline view. Get clear indicators for overdue
                                tasks and upcoming milestones. Stay ahead of your schedule and deliver projects on time,
                                every time with automated reminders and priority sorting.
                            </p>
                        </div>
                        <span className="bg-[#0c566e] h-34 text-[#0c566e] rounded">.</span>
                        <div className="relative flex-1 flex justify-center gap-4 h-64 md:h-80 w-full">
                            <img src="/progress.jpg" alt="Project Management" className="w-50 h-50 rounded-lg absolute top-0 left-10" data-aos="zoom-in-up" />
                            <img src="/progress 1.jpg" alt="Project management" className="w-50 h-50 rounded-lg absolute bottom-0 right-10" data-aos="zoom-in-up" />
                        </div>
                    </div>

                    {/* Feature 3 - Image on Right */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition flex flex-col md:flex-row items-center gap-8" data-aos="fade-in">
                        <div className="flex-1">
                            <h1 className="text-[#0c566e] font-bold text-[1.7rem] mb-4" data-aos="fade-up">Boost Your Productivity</h1>
                            <p className="text-gray-600 leading-relaxed" data-aos="fade-up">
                                Optimize your workflow and maximize efficiency with our productivity-focused features.
                                Monitor your activity logs to understand how you spend your time. Get insights into
                                project completion rates and identify bottlenecks. Streamline your development process
                                with tools designed to help you focus on what matters most - building great software.
                            </p>
                        </div>
                        <span className="bg-[#0c566e] h-34 text-[#0c566e] rounded">.</span>
                        <div className="relative flex-1 flex justify-center gap-4 h-64 md:h-80 w-full">
                            <img src="/boost.jpg" alt="Project Management" className="w-50 h-50 rounded-lg absolute top-0 left-10" data-aos="zoom-in-up" />
                            <img src="/managemt1.jpg" alt="Project management" className="w-45 h-50 rounded-lg absolute bottom-0 right-10" data-aos="zoom-in-up" />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            {/* About Section */}
            <section id="about" className="py-20 min-h-screen flex items-center bg-gradient-to-br from-cyan-50 to-blue-50">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-[#0c566e] mb-12" data-aos="fade-in">About Dev Helper</h2>

                    <div className="space-y-8">
                        {/* Introduction overlapping Mission & Vision */}
                        <div className="relative">
                            {/* Mission & Vision Background Cards */}
                            <div className="grid md:grid-cols-2 gap-6 pt-32">
                                <div className="bg-white p-8 pt-24 rounded-lg shadow-md border-l-4 border-cyan-600">
                                    <h3 className="text-2xl font-bold text-[#0c566e] mb-4 flex items-center gap-2">
                                        Our Mission
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        To empower developers worldwide with a streamlined project management solution that
                                        enhances productivity without adding complexity. We believe great tools should fade
                                        into the background, letting your creativity and code take center stage.
                                    </p>
                                </div>

                                <div className="bg-white p-8 pt-24 rounded-lg shadow-md border-l-4 border-blue-600">
                                    <h3 className="text-2xl font-bold text-[#0c566e] mb-4 flex items-center gap-2">
                                        Our Vision
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        To become the go-to project management platform for developers of all levels - from
                                        students learning their first programming language to senior engineers managing
                                        enterprise-level projects. Simple by design, powerful by nature.
                                    </p>
                                </div>
                            </div>

                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-11/12 md:w-4/5 bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-xl z-10 border border-white/30">
                                <p className="text-[#0c566e] leading-relaxed mb-4 font-medium">
                                    Dev Helper was born from a simple yet powerful idea: developers deserve tools that
                                    understand their workflow. As developers ourselves, we've experienced the chaos of
                                    managing multiple projects, tracking endless deadlines, and switching between countless
                                    tools just to stay organized.
                                </p>
                                <p className="text-[#0c566e] leading-relaxed font-medium">
                                    We built Dev Helper to solve this problem - a single, intuitive platform where you can
                                    manage all your development projects without the complexity of traditional project
                                    management software.
                                </p>
                            </div>
                        </div>

                        {/* <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-[#0c566e] mb-6 text-center">What We Stand For</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <h4 className="text-xl font-bold text-[#0c566e] mb-2">Simplicity First</h4>
                                    <p className="text-gray-600">
                                        Clean, intuitive design that requires no learning curve. Get started in minutes,
                                        not hours.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <h4 className="text-xl font-bold text-[#0c566e] mb-2">Privacy Matters</h4>
                                    <p className="text-gray-600">
                                        Your projects are yours. We prioritize data security and never share your
                                        information.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <h4 className="text-xl font-bold text-[#0c566e] mb-2">Developer-Centric</h4>
                                    <p className="text-gray-600">
                                        Built by developers who understand the unique challenges of software development
                                        workflows.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 rounded-lg shadow-lg text-white">
                            <h3 className="text-2xl font-bold mb-6 text-center">Who Is Dev Helper For?</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold mb-2">Perfect for:</h4>
                                    <ul className="space-y-2">
                                        <li>• Solo developers managing personal projects</li>
                                        <li>• Freelancers juggling multiple clients</li>
                                        <li>• Coding bootcamp students tracking assignments</li>
                                        <li>• Small development teams needing coordination</li>
                                        <li>• Open-source contributors managing contributions</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Great if you need:</h4>
                                    <ul className="space-y-2">
                                        <li>• Clear visibility of all your projects</li>
                                        <li>• Deadline tracking that actually works</li>
                                        <li>• Activity logging for progress monitoring</li>
                                        <li>• A distraction-free management experience</li>
                                        <li>• Tools that respect your time and focus</li>
                                    </ul>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            <section id="contact" className="py-20 bg-gray-100 min-h-screen content-center">
                <h2 className="text-4xl font-bold text-center text-[#0c566e] mb-10">Contact Us</h2>
                <p className="text-center text-gray-600 px-4">
                    For support or inquiries, reach us at <a href="mailto:support@devhelper.com" className="text-cyan-600">support@devhelper.com</a>
                </p>
                
            </section>
        </div>
    )
}
