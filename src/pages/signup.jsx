import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!supabaseError) {
      alert("Account created successfully");
      navigate("/login");
    } else {
    
      if (supabaseError.message?.includes("already registered") || 
          supabaseError.message?.includes("User already registered") ||
          supabaseError.code === "user_already_exists") {
        setError("This email is already registered. Please try logging in.");
      } else {
        setError("Error signing up: " + supabaseError.message);
      }
      console.error("Error signing up:", supabaseError);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c566e] via-[#0c566e]/85 to-[#0c566e]/90 animate-gradient-bg bg-[length:400%_400%]"></div>
      
      {/* Signup Form */}
      <form onSubmit={handleSignup} className="relative z-10 max-w-md w-sm mx-4 space-y-4 bg-white p-8 rounded-lg shadow-xl">
        <div className="flex justify-center">
        <a href="/"><img src="/duck.svg" alt="Dev helper" className="w-24 h-24"/></a>
      </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0c566e]">Create Account</h2>
          <p className="text-gray-600 mt-2">Join Dev Helper today</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#0c566e] mb-1">Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c566e]"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0c566e] mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c566e]"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0c566e] mb-1">Confirm Password</label>
          <input 
            type="password"
            placeholder="Confirm your password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c566e]"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button 
          disabled={loading} 
          className="w-full bg-[#0c566e] text-white py-3 rounded-lg font-semibold hover:bg-[#094455] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-[#0c566e] font-semibold hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}