import { useState } from "react"
import { supabase } from "../services/supabase"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      
      navigate("/dashboard")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c566e] via-[#0c566e]/85 to-[#0c566e]/90 animate-gradient-bg bg-[length:400%_400%]"></div>
      <form onSubmit={handleLogin} 
             className="relative z-10 max-w-md w-sm mx-4 space-y-4 bg-white p-8 rounded-lg shadow-xl">
      <div className="flex justify-center">
        <a href="/"><img src="/duck.svg" alt="Dev helper" className="w-24 h-24"/></a>
      </div>
      <h2 className="text-2xl font-bold text-center mb-4 text-[#0c566e]">Login</h2>
      <p className="text-center text-gray-600 mb-10">Welcome back! Please enter your details.</p>

      <div>
        <label className="block text-sm font-medium text-[#0c566e] mb-1">Email</label>
      <input
        type="email"
        placeholder="your.email@example.com"
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c566e]"
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0c566e] mb-1">Password</label>
        <input
        type="password"
        placeholder="Enter your password"
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c566e]"
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>

      <button
        disabled={loading}
        className="w-full bg-cyan-600 text-white py-2 rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center">
        Don't have an account? <a href="/signup" className="text-cyan-600">Sign Up</a>
      </p>
    </form>
    </div>
  )
}
