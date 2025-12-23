import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { supabase } from "../services/supabase"
import AddProject from "../components/addProject"

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState("all")
  const { showAddProject, setShowAddProject } = useOutletContext()

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

  const handleProjectAdded = (newProject) => {
    setProjects([newProject, ...projects])
    setShowAddProject(false)
  }

  const filteredProjects = projects.filter(p => {
    if (filter === "all") return true
    return p.status === filter
  })

  return (
    <main className="flex-1 p-8 text-[#0c566e] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <button
          onClick={() => setShowAddProject(true)}
          className="bg-cyan-600 text-white px-5 py-2 rounded-md hover:bg-cyan-700"
        >
          New Project
        </button>
      </div>

      {showAddProject && (
        <div className="mb-10 bg-white p-6 rounded-lg shadow">
          <AddProject onProjectAdded={handleProjectAdded} />
          <button
            onClick={() => setShowAddProject(false)}
            className="mt-4 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="flex gap-3 mb-6">
        {["all", "active", "completed", "planning"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md capitalize ${
              filter === status
                ? "bg-cyan-600 text-white"
                : "bg-white text-[#0c566e] hover:bg-gray-100"
            }`}
          >
            {status} ({projects.filter(p => status === "all" || p.status === status).length})
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-400">No projects found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-xl transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{project.title}</h2>
        <span
          className={`text-xs text-white px-2 py-1 rounded-full ${
            project.status === "completed"
              ? "bg-green-600"
              : project.status === "active"
              ? "bg-blue-600"
              : "bg-yellow-600"
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-sm text-[#0c566e] line-clamp-3 mb-3">
        {project.description || "No description"}
      </p>

      <div className="mt-3 text-xs text-gray-500 flex justify-between">
        <span className="font-medium">{project.type}</span>
        <span>{project.deadline || "No deadline"}</span>
      </div>
    </div>
  )
}