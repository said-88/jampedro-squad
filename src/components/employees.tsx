import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/layout/MainLayout';

interface Employee {
  id: number;
  name: string;
  code: string;
  age: number;
  address: string;
  personalEmail: string;
  workEmail: string;
  paymentMethod: string;
  salaryType: string;
}

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Doe', code: 'EMP001', age: 30, address: '123 Main St', personalEmail: 'john@personal.com', workEmail: 'john@work.com', paymentMethod: 'Bank', salaryType: 'Monthly' },
    { id: 2, name: 'Jane Smith', code: 'EMP002', age: 28, address: '456 Elm St', personalEmail: 'jane@personal.com', workEmail: 'jane@work.com', paymentMethod: 'International Transfer', salaryType: 'Hourly' },
  ]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Employee>();

  const onSubmit = (data: Employee) => {
    setEmployees([...employees, { ...data, id: employees.length + 1 }]);
    reset();
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Employee Management</h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-col mb-4">
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Search by name or employee code"
                />

                <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0114 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Personal Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Work Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Salary Type
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{employee.name}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{employee.code}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{employee.age}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{employee.address}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{employee.personalEmail}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{employee.workEmail}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{employee.paymentMethod}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{employee.salaryType}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                        <button onClick={() => handleDelete(employee.id)} className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Add New Employee</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Name</label>
              <input {...register("name", { required: true })} id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring dark:border-slate-800" />
              {errors.name && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="code">Employee Code</label>
              <input {...register("code", { required: true })} id="code" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring dark:border-slate-800" />
              {errors.code && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="age">Age</label>
              <input {...register("age", { required: true, min: 18, max: 100 })} id="age" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring dark:border-slate-800" />
              {errors.age && <span className="text-red-500">Age must be between 18 and 100</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="address">Address</label>
              <input {...register("address", { required: true })} id="address" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              {errors.address && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="personalEmail">Personal Email</label>
              <input {...register("personalEmail", { required: true, pattern: /^\S+@\S+$/i })} id="personalEmail" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring dark:border-slate-800" />
              {errors.personalEmail && <span className="text-red-500">Please enter a valid email</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="workEmail">Work Email</label>
              <input {...register("workEmail", { required: true, pattern: /^\S+@\S+$/i })} id="workEmail" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring dark:border-slate-800" />
              {errors.workEmail && <span className="text-red-500">Please enter a valid email</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="paymentMethod">Payment Method</label>
              <select {...register("paymentMethod", { required: true })} id="paymentMethod" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring dark:border-slate-800">
                <option value="">Select Payment Method</option>
                <option value="Bank">Bank</option>
                <option value="International Transfer">International Transfer</option>
              </select>
              {errors.paymentMethod && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="salaryType">Salary Type</label>
              <select {...register("salaryType", { required: true })} id="salaryType" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring dark:border-slate-800">
                <option value="">Select Salary Type</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
              </select>
              {errors.salaryType && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeManagement;

