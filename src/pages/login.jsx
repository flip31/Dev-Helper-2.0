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
    <form onSubmit={handleLogin} 
    className="max-w-md mx-auto mt-40 space-y-4 h-80 w-90 bg-gradient-to-br from-cyan-50 to-blue-100 px-3 rounded">
      <h2 className="text-2xl font-bold text-center mb-17">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

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
  )
}
