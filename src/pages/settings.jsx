// pages/Settings.jsx
import { useState, useEffect } from "react"
import { supabase } from "../services/supabase"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export default function Settings() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) setUser(session.user)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/Login"
  }

  return (
    <main className="flex-1 p-8 text-[#0c566e] overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Cog6ToothIcon className="w-8 h-8" />
        Settings
      </h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="font-medium">{user?.email || "Loading..."}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">User ID</label>
            <p className="font-mono text-sm">{user?.id || "Loading..."}</p>
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}