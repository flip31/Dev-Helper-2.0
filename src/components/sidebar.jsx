import { Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  FolderIcon,
  CalendarDaysIcon,
  ClockIcon,
  Cog6ToothIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"

export default function Sidebar({ onCreate }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 px-5 py-4 text-[#0c566e] flex flex-col bg-white h-screen">
      <h1 className="font-bold text-lg flex items-center gap-2">
        <img src="/duck.svg" alt="Dev Helper" className="w-8 h-8" />
        Dev Helper
      </h1>

      <button
        onClick={onCreate}
        className="mt-6 flex items-center justify-center gap-2 border border-[#e9e9e9] py-2 rounded-md font-medium shadow-md hover:scale-[1.02] transition"
      >
        <PlusIcon className="w-5 h-5" />
        Create Project
      </button>

      <nav className="mt-8">
        <p className="text-gray-400 mb-3 text-xs">GENERAL</p>
        <ul className="space-y-3 text-sm">
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-3 hover:text-[#0c566e] ${
                isActive("/dashboard") ? "font-bold text-cyan-600" : ""
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={`flex items-center gap-3 hover:text-[#0c566e] ${
                isActive("/projects") ? "font-bold text-cyan-600" : ""
              }`}
            >
              <FolderIcon className="w-5 h-5" />
              Projects
            </Link>
          </li>
          <li>
            <Link 
              to="/deadlines" 
              className={`flex items-center gap-3 hover:text-[#0c566e] ${
                isActive("/deadlines") ? "font-bold text-cyan-600" : ""
              }`}
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Deadlines
            </Link>
          </li>
          <li>
            <Link 
              to="/activity" 
              className={`flex items-center gap-3 hover:text-[#0c566e] ${
                isActive("/activity") ? "font-bold text-cyan-600" : ""
              }`}
            >
              <ClockIcon className="w-5 h-5" />
              Activity Log
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`flex items-center gap-3 hover:text-[#0c566e] ${
                isActive("/settings") ? "font-bold text-cyan-600" : ""
              }`}
            >
              <Cog6ToothIcon className="w-5 h-5" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto text-xs text-gray-500">© Dev Helper</div>
    </aside>
  )
}