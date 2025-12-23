// pages/Dashboard.jsx
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { supabase } from "../services/supabase"
import AddProject from "../components/addProject"


export default function Dashboard() {
  const [projects, setProjects] = useState([])
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

  const getGreetings = () => {
    const hour = new Date().getHours()
    if(hour>=5 && hour<12) return "Good Morning"
    if(hour>=12 && hour<17) return "Good Afternoon"
    if(hour>=17 && hour<22) return "Good Evening"
    return "Good Night"
  }

  const showDate = () => {
    const today = new Date()
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return today.toLocaleDateString("en-US", options)
  }

  return (
    <main className="flex-1 p-8 text-[#0c566e] overflow-y-auto">

    <div className="flex flex-row">
        <p>{showDate()}</p>
        <div>
            
        </div>
    </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{getGreetings()}</h1>
        <button
          onClick={() => setShowAddProject(true)}
          className="bg-cyan-600 text-white px-5 py-2 rounded-md hover:bg-cyan-700"
        >
          New Project
        </button>
      </div>

      {/* Add Project */}
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Projects" value={projects.length} />
        <StatCard
          title="Active"
          value={projects.filter(p => p.status === "active").length}
        />
        <StatCard
          title="Completed"
          value={projects.filter(p => p.status === "completed").length}
        />
      </div>

      {/* Project List */}
      {projects.length === 0 ? (
        <p className="text-gray-400">No projects yet. Create one</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white border border-[#e9e9e9] shadow-md p-5 rounded-lg">
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
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

      <p className="text-sm text-[#0c566e] line-clamp-3">
        {project.description || "No description"}
      </p>

      <div className="mt-3 text-xs text-gray-500 flex justify-between">
        <span>{project.type}</span>
        <span>{project.deadline || "No deadline"}</span>
      </div>
    </div>
  )
}