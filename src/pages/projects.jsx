import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { supabase } from "../services/supabase"
import AddProject from "../components/addProject"
import EditProject from "../components/editProject"
import ViewProject from "../components/viewProject"

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState("all")
  const [editingProject, setEditingProject] = useState(null)
  const [viewingProject, setViewingProject] = useState(null)
  const { showAddProject, setShowAddProject } = useOutletContext()

  const fetchProjects = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return

    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        clients (
          id,
          name,
          email,
          phone
        )
      `)
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

  const handleProjectUpdated = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    )
    setEditingProject(null)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    const { error } = await supabase.from("projects").delete().eq("id", id)
    
    if (!error) {
      setProjects(projects.filter((p) => p.id !== id))
      setViewingProject(null)
    } else {
      alert("Error deleting project: " + error.message)
    }
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
          className="bg-[#0c566e] text-white px-5 py-2 rounded-md hover:bg-[#094455] transition"
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
        {["all", "planned", "active", "completed"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md capitalize ${
              filter === status
                ? "bg-[#0c566e] text-white"
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
            <ProjectCard 
              key={project.id} 
              project={project}
              onView={() => setViewingProject(project)}
              onEdit={() => setEditingProject(project)}
              onDelete={() => handleDelete(project.id)}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProject && (
        <EditProject
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onUpdated={handleProjectUpdated}
        />
      )}

      {viewingProject && (
        <ViewProject
          project={viewingProject}
          onClose={() => setViewingProject(null)}
          onEdit={() => {
            setEditingProject(viewingProject)
            setViewingProject(null)
          }}
          onDelete={() => handleDelete(viewingProject.id)}
        />
      )}
    </main>
  )
}

function ProjectCard({ project, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-xl transition flex flex-col">
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

      <p className="text-sm text-[#0c566e] line-clamp-3 mb-auto">
        {project.description || "No description"}
      </p>

      {/* Type and Deadline - Above buttons */}
      <div className="mt-4 text-xs text-gray-500 flex justify-between mb-3 border-t pt-3">
        <span className="font-medium capitalize">{project.type}</span>
        <span>{project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline"}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onView}
          className="flex-1 text-[#0c566e] shadow-sm shadow-[#0c566e]/30 py-1 rounded hover:bg-[#0c566e] hover:text-white transition text-sm"
        >
          View
        </button>
        <button
          onClick={onEdit}
          className="flex-1 text-blue-600 shadow-sm shadow-blue-600/30 py-1 rounded hover:bg-blue-600 hover:text-white transition text-sm"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 text-red-600 shadow-sm shadow-red-600/30 py-1 rounded hover:bg-red-600 hover:text-white transition text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}