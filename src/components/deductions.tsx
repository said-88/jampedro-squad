import MainLayout from '../components/layout/MainLayout';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

interface Deduction {
  id: number;
  name: string;
  amount: number;
  frequency: 'Monthly' | 'Biweekly';
}

const DeductionsManagement: React.FC = () => {
  const [deductions, setDeductions] = useState<Deduction[]>([
    { id: 1, name: 'Income Tax', amount: 500, frequency: 'Monthly' },
    { id: 2, name: 'Health Insurance', amount: 100, frequency: 'Biweekly' },
  ]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Deduction, 'id'>>();

  const onSubmit = (data: Omit<Deduction, 'id'>) => {
    setDeductions([...deductions, { ...data, id: deductions.length + 1 }]);
    reset();
  };

  const handleDelete = (id: number) => {
    setDeductions(deductions.filter(deduction => deduction.id !== id));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Deductions Management</h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-col mb-4">
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Search deductions"
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
                      Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Frequency
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deductions.map((deduction) => (
                    <tr key={deduction.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{deduction.name}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">${deduction.amount}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{deduction.frequency}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                        <button onClick={() => handleDelete(deduction.id)} className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Add New Deduction</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Deduction Name</label>
              <input {...register("name", { required: true })} id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              {errors.name && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="amount">Amount</label>
              <input {...register("amount", { required: true, min: 0 })} id="amount" type="number" step="0.01" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              {errors.amount && <span className="text-red-500">Please enter a valid amount</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="frequency">Frequency</label>
              <select {...register("frequency", { required: true })} id="frequency" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                <option value="">Select Frequency</option>
                <option value="Monthly">Monthly</option>
                <option value="Biweekly">Biweekly</option>
              </select>
              {errors.frequency && <span className="text-red-500">This field is required</span>}
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

export default DeductionsManagement;

