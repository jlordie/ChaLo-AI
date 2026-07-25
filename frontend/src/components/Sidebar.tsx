'use client'

import { FiHome, FiMessageSquare, FiCode, FiImage, FiSettings, FiLogOut, FiTrendingUp, FiBook } from 'react-icons/fi'
import Link from 'next/link'

const menuItems = [
  { icon: FiHome, label: 'Dashboard', href: '/dashboard' },
  { icon: FiMessageSquare, label: 'Chat', href: '/chat' },
  { icon: FiCode, label: 'Code Gen', href: '/code-gen' },
  { icon: FiImage, label: 'Creative', href: '/creative' },
  { icon: FiTrendingUp, label: 'Analytics', href: '/analytics' },
  { icon: FiBook, label: 'Learning', href: '/learning' },
]

export default function Sidebar({ isOpen, user }: { isOpen: boolean; user: any }) {
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    window.location.href = '/auth/login'
  }

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-dark-800 border-r border-gray-700 h-screen transition-all duration-300 flex flex-col overflow-hidden`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-gray-700">
        <div className="text-2xl font-bold text-primary-400">C</div>
        {isOpen && <span className="ml-2 font-bold text-white">halo AI</span>}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-900 transition-colors text-gray-400 hover:text-white group"
            title={item.label}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-700 p-4 space-y-2">
        {isOpen && user && (
          <div className="px-2 py-2 truncate text-sm">
            <div className="font-semibold text-gray-300 truncate">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-gray-500 truncate">{user.email}</div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-400 group"
          title="Logout"
        >
          <FiLogOut size={20} className="flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
