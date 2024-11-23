import React from "react";
import { usePathname, useRouter } from "next/navigation";

const TopNavBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Implement logout logic here
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {pathname === '/dashboard'
            ? 'Panel de Control'
            : pathname === '/employees'
            ? 'Gestión de Empleados'
            : pathname === '/payroll-cycles'
            ? 'Ciclos de Nómina'
            : pathname === '/deductions'
            ? 'Gestión de Deducciones'
            : pathname === '/hours-input'
            ? 'Registro de Horas'
            : pathname === '/payroll-reports'
            ? 'Informes de Nómina'
            : 'NóminaPro'}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default TopNavBar;
