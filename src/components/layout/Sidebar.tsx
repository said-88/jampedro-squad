import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Users, 
  Calendar, 
  Calculator, 
  Clock, 
  FileBarChart 
} from 'lucide-react'

const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const isAdmin = true // This should be determined by user role

  const navItems = [
    { name: 'Panel de Control', path: '/dashboard', icon: Home },
    { name: 'Gestión de Empleados', path: '/employees', icon: Users, adminOnly: true },
    { name: 'Ciclos de Nómina', path: '/payroll-cycles', icon: Calendar, adminOnly: true },
    { name: 'Gestión de Deducciones', path: '/deductions', icon: Calculator, adminOnly: true },
    { name: 'Registro de Horas', path: '/hours-input', icon: Clock },
    { name: 'Informes de Nómina', path: '/payroll-reports', icon: FileBarChart, adminOnly: true },
  ]

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <Link href="/dashboard" className="text-white flex items-center space-x-2 px-4">
        <Home className="w-8 h-8" />
        <span className="text-2xl font-extrabold">HonduPay</span>
      </Link>

      <nav>
        {navItems.map((item, index) => (
          (isAdmin || !item.adminOnly) && (
            <Link key={index} href={item.path} className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${pathname === item.path ? 'bg-gray-700 text-white' : 'text-gray-400'}`}>
              <div className="flex items-center">
                <item.icon className="w-6 h-6 mr-3" />
                {item.name}
              </div>
            </Link>
          )
        ))}
      </nav>
    </div>
  )
}

export default Sidebar

