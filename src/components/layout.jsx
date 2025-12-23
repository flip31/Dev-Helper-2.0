// components/Layout.jsx
import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar"

export default function Layout() {
  const [showAddProject, setShowAddProject] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#e9e9e9]">
      <Sidebar onCreate={() => setShowAddProject(true)} />
      <Outlet context={{ showAddProject, setShowAddProject }} />
    </div>
  )
}