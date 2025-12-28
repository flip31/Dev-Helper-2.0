export default function ViewProject({ project, onClose, onEdit, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="font-bold text-2xl text-[#0c566e]">{project.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <span className={`text-xs text-white px-3 py-1 rounded-full ${
              project.status === "completed" ? "bg-green-600" :
              project.status === "active" ? "bg-blue-600" : "bg-yellow-600"
            }`}>
              {project.status}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#0c566e] mb-1">Description</h3>
            <p className="text-gray-700">{project.description || "No description provided"}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[#0c566e] mb-1">Type</h3>
              <p className="text-gray-700 capitalize">{project.type}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#0c566e] mb-1">Deadline</h3>
              <p className="text-gray-700">
                {project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline set"}
              </p>
            </div>
          </div>

          {project.type === "client" && project.clients && (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-sm font-semibold text-[#0c566e] mb-2">Client Information</h3>
    <p className="text-gray-700"><strong>Name:</strong> {project.clients.name}</p>
    {project.clients.email && (
      <p className="text-gray-700"><strong>Email:</strong> {project.clients.email}</p>
    )}
    {project.clients.phone && (
      <p className="text-gray-700"><strong>Phone:</strong> {project.clients.phone}</p>
    )}
  </div>
)}

          <div>
            <h3 className="text-sm font-semibold text-[#0c566e] mb-1">Created</h3>
            <p className="text-gray-700 text-sm">
              {new Date(project.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t">
          <button
            onClick={onEdit}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Project
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  )
}