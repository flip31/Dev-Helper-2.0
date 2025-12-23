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
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">Create Account</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input 
        type="password"
        placeholder="Confirm password"
        className="w-full border p-2"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button disabled={loading} className="w-full bg-cyan-600 text-white py-2">
        {loading ? "Creating..." : "Sign Up"}
      </button>

      <p className="text-center">
        Already have an account? <a href="/login" className="text-cyan-600">Login</a>
      </p>
    </form>
  );
}