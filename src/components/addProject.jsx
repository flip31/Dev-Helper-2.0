import { useState } from "react"
import { supabase } from "../services/supabase"

export default function AddProject({ onProjectAdded }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [status, setStatus] = useState("planned")
  const [type, setType] = useState("personal")
  const [loading, setLoading] = useState(false)

  const [clientName, setClientName] = useState("")
  const [clientNumber, setClientNumber] = useState("")
  const [clientEmail, setClientEmail] = useState("")

  const validStatus = ["planned", "active", "completed"]
  const validType = ["personal", "client"]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) throw sessionError
      if (!session?.user) throw new Error("You must be logged in")

      const user = session.user

      const projectStatus = validStatus.includes(status) ? status : "planned"
      const projectType = validType.includes(type) ? type : "personal"

      let clientId = null

      if (projectType === "client") {
        if (!clientName.trim()) {
          throw new Error("Client name is required")
        }

        const { data: client, error: clientError } = await supabase
          .from("clients")
          .insert({
            user_id: user.id,
            name: clientName.trim(),
            email: clientEmail.trim() || null,
            phone: clientNumber.trim() || null,
          })
          .select()
          .single()

        if (clientError) throw clientError

        clientId = client.id
      }

      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
          title: title.trim() || "Untitled Project",
          description: description.trim() || null,
          deadline: deadline || null,
          status: projectStatus,
          type: projectType,
          client_id: clientId,
        })
        .select()
        .single()

      if (projectError) throw projectError

      setTitle("")
      setDescription("")
      setDeadline("")
      setStatus("planned")
      setType("personal")
      setClientName("")
      setClientNumber("")
      setClientEmail("")

      onProjectAdded(project)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Add New Project</h2>

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

      <select
        className="w-full border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {validStatus.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

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

      {type === "client" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Client Name"
            className="w-full border p-2 rounded"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Client Phone"
            className="w-full border p-2 rounded"
            value={clientNumber}
            onChange={(e) => setClientNumber(e.target.value)}
          />

          <input
            type="email"
            placeholder="Client Email"
            className="w-full border p-2 rounded"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-cyan-600 text-white py-2 rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  )
}
