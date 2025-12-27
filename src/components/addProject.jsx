import { useState } from "react"
import { supabase } from "../services/supabase"


export default function AddProject({ onProjectAdded }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [status, setStatus] = useState("planned") // <-- default lowercase
  const [type, setType] = useState("personal")   // default type
  const [loading, setLoading] = useState(false)
  const [clientName, setClientName] = useState("")
  const [clientNumber, setClientNumber] = useState("")
  const [clientEmail, setClientEmail] = useState("")

  const validStatus = ["planned", "active", "completed"]
  const validType = ["personal", "client"]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) {
      alert(sessionError.message)
      setLoading(false)
      return
    }

    const user = session?.user
    if (!user) {
      alert("You must be logged in")
      setLoading(false)
      return
    }

    // Validate status and type
    const projectStatus = validStatus.includes(status) ? status : "planned"
    const projectType = validType.includes(type) ? type : "personal"

    const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      type,
      clientName: type === "client" ? clientName : null,
      clientNumber: type === "client" ? clientNumber : null,
      clientEmail: type === "client" ? clientEmail : null
    })
  }

    // Insert project
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          user_id: user.id,
          title: title.trim() || "Untitled Project",
          description: description.trim() || null,
          deadline: deadline || null,
          status: projectStatus,
          type: projectType,
        },
      ])
      .select()

    if (error) {
      alert("Error adding project: " + error.message)
    } else {
      // Clear form
      setTitle("")
      setDescription("")
      setDeadline("")
      setStatus("planned")
      setType("personal")
      onProjectAdded(data[0])
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

      <input
        type="text"
        placeholder="Project Title"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Project Description"
        className="w-full border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        className="w-full border p-2 rounded"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      {/* Status dropdown */}
      <select
        className="w-full border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {validStatus.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)} {/* Display capitalized */}
          </option>
        ))}
      </select>

      {/* Type dropdown */}
      <select
        className="w-full border p-2 rounded"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {validType.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>

      {
        type === "client" && (
          <div className="space-y-3">
            <div>
              <label htmlFor="clientName">Client Name:</label>
              <input
                type="text"
                id="clientName"
                placeholder="Client Name"
                className="w-full border p-2 rounded"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="clientNumber">Client Number:</label>
              <input
                type="tel"
                id="clientNumber"
                placeholder="Client Number"
                className="w-full border p-2 rounded"
                value={clientNumber}
                onChange={(e) => setClientNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="clientEmail">Client Email:</label>
              <input
                type="email"
                id="clientEmail"
                placeholder="Client Email"
                className="w-full border p-2 rounded"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>
          </div>
        )
      }

      {}

      <button
        type="submit"
        className="w-full bg-cyan-600 py-2 rounded text-white"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  )
}
