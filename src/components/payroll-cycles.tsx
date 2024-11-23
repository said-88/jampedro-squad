import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/layout/MainLayout';

interface PayrollCycle {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  type: 'Monthly' | 'Biweekly';
  status: 'Approved' | 'Pending';
}

const PayrollCycles: React.FC = () => {
  const [payrollCycles, setPayrollCycles] = useState<PayrollCycle[]>([
    { id: 1, name: 'June 2023', startDate: '2023-06-01', endDate: '2023-06-30', type: 'Monthly', status: 'Approved' },
    { id: 2, name: 'July 2023 First Half', startDate: '2023-07-01', endDate: '2023-07-15', type: 'Biweekly', status: 'Pending' },
  ]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<PayrollCycle, 'id' | 'status'>>();

  const onSubmit = (data: Omit<PayrollCycle, 'id' | 'status'>) => {
    setPayrollCycles([...payrollCycles, { ...data, id: payrollCycles.length + 1, status: 'Pending' }]);
    reset();
  };

  const handleDelete = (id: number) => {
    setPayrollCycles(payrollCycles.filter(cycle => cycle.id !== id));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Payroll Cycles</h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-col mb-4">
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Search payroll cycles"
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
                      Cycle Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payrollCycles.map((cycle) => (
                    <tr key={cycle.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{cycle.name}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{cycle.startDate}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{cycle.endDate}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{cycle.type}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className={`relative inline-block px-3 py-1 font-semibold ${cycle.status === 'Approved' ? 'text-green-900' : 'text-orange-900'} leading-tight`}>
                          <span aria-hidden className={`absolute inset-0 ${cycle.status === 'Approved' ? 'bg-green-200' : 'bg-orange-200'} opacity-50 rounded-full`}></span>
                          <span className="relative">{cycle.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">Configure</button>
                        <button onClick={() => handleDelete(cycle.id)} className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Add New Payroll Cycle</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Cycle Name</label>
              <input {...register("name", { required: true })} id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring dark:border-slate-800" />
              {errors.name && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="startDate">Start Date</label>
              <input {...register("startDate", { required: true })} id="startDate" type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              {errors.startDate && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="endDate">End Date</label>
              <input {...register("endDate", { required: true })} id="endDate" type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring dark:border-slate-800" />
              {errors.endDate && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="type">Type</label>
              <select {...register("type", { required: true })} id="type" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                <option value="">Select Type</option>
                <option value="Monthly">Monthly</option>
                <option value="Biweekly">Biweekly</option>
              </select>
              {errors.type && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="flex justify-end mt-6 col-span-2">
              <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default PayrollCycles;

