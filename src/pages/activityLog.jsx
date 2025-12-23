// pages/Activity.jsx
import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"
import { ClockIcon } from "@heroicons/react/24/outline"

export default function Activity() {
  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })

    if (!error) setProjects(data || [])
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <main className="flex-1 p-8 text-[#0c566e] overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <ClockIcon className="w-8 h-8" />
        Activity Log
      </h1>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-400">No activity yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} className="bg-white p-5 rounded-lg shadow">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Created on {new Date(project.created_at).toLocaleString()}
                  </p>
                  <span className="text-xs text-gray-500 mt-2 inline-block">
                    Status: {project.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}