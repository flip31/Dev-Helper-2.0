// pages/Deadlines.jsx
import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"

export default function Deadlines() {
  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", session.user.id)
      .not("deadline", "is", null)
      .order("deadline", { ascending: true })

    if (!error) setProjects(data || [])
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date()
  }

  return (
    <main className="flex-1 p-8 text-[#0c566e] overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <CalendarDaysIcon className="w-8 h-8" />
        Upcoming Deadlines
      </h1>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-400">No deadlines set</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map(project => (
            <div
              key={project.id}
              className={`bg-white p-5 rounded-lg shadow flex justify-between items-center ${
                isOverdue(project.deadline) ? "border-l-4 border-red-500" : ""
              }`}
            >
              <div>
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <p className="text-sm text-gray-600">{project.type}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${isOverdue(project.deadline) ? "text-red-600" : "text-cyan-600"}`}>
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  {isOverdue(project.deadline) ? "Overdue" : "Upcoming"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}