import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  Calculator, 
  FileBarChart, 
  Clock, 
  FileText, 
  Receipt,
  LucideIcon
} from 'lucide-react';

const DashboardCard: React.FC<{ 
  title: string; 
  description: string; 
  link: string; 
  Icon: LucideIcon 
}> = ({ title, description, link, Icon }) => (
  <Link href={link} className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-400" viewBox="0 0 24 24" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="mt-1 text-sm text-gray-900">{description}</dd>
          </dl>
        </div>
      </div>
    </div>
  </Link>
);

const Dashboard: React.FC = () => {
  const isAdmin = true; // This should be determined by user role

  const adminCards = [
    { title: 'Employee Management', description: 'Manage employee information', link: '/employees', Icon: Users },
    { title: 'Payroll Cycles', description: 'Manage payroll cycles', link: '/payroll-cycles', Icon: Calendar },
    { title: 'Deductions Management', description: 'Manage deductions', link: '/deductions', Icon: Calculator },
    { title: 'Generate Payroll Reports', description: 'Generate and view reports', link: '/payroll-reports', Icon: FileBarChart },
  ];

  const userCards = [
    { title: 'Hours Input', description: 'Input your work hours', link: '/hours-input', Icon: Clock },
    { title: 'View Payroll Details', description: 'View your payroll information', link: '/payroll-details', Icon: FileText },
    { title: 'Generate Payslips', description: 'Generate and view your payslips', link: '/payslips', Icon: Receipt },
  ];

  return (
    <MainLayout>
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-gray-400" viewBox="0 0 24 24" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">100</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-gray-400" viewBox="0 0 24 24" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Payroll Cycles</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">2</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          Quick Actions
        </h2>

        <div className="mt-2 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isAdmin
              ? adminCards.map((card, index) => (
                  <DashboardCard key={index} {...card} />
                ))
              : userCards.map((card, index) => (
                  <DashboardCard key={index} {...card} />
                ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

