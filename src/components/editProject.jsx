import { useState } from "react"
import { supabase } from "../services/supabase"

export default function EditProject({ project, onClose, onUpdated }) {
  const [title, setTitle] = useState(project.title)
  const [description, setDescription] = useState(project.description || "")
  const [status, setStatus] = useState(project.status)
  const [deadline, setDeadline] = useState(project.deadline || "")
  const [type, setType] = useState(project.type)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from("projects")
        .update({
          title,
          description,
          status,
          deadline: deadline || null,
          type,
        })
        .eq("id", project.id)
        .select(`
          *,
          clients (
            id,
            name,
            email,
            phone
          )
        `)
        .single()

      if (error) throw error

      // Call the callback function to update the parent
      onUpdated(data)
    } catch (err) {
      console.error("Error updating project:", err)
      alert("Error updating project: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl text-[#0c566e]">Edit Project</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0c566e] mb-1">Title</label>
          <input
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0c566e]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0c566e] mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0c566e]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0c566e] mb-1">Deadline</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0c566e]"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0c566e] mb-1">Status</label>
          <select
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0c566e]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="planned">Planned</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0c566e] mb-1">Type</label>
          <select
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0c566e]"
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled
          >
            <option value="personal">Personal</option>
            <option value="client">Client</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Type cannot be changed after creation</p>
        </div>

        {project.clients && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm font-semibold text-[#0c566e]">Client: {project.clients.name}</p>
            {project.clients.email && <p className="text-xs text-gray-600">{project.clients.email}</p>}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-[#0c566e] text-white px-6 py-2 rounded hover:bg-[#094455] transition disabled:opacity-50"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}