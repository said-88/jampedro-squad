import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/layout/MainLayout';

interface HoursInputForm {
  employeeId: string;
  normalHours: number;
  overtimeHours: number;
}

const HoursInput: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<HoursInputForm>();
  const [submittedHours, setSubmittedHours] = useState<HoursInputForm[]>([]);

  const onSubmit = (data: HoursInputForm) => {
    setSubmittedHours([...submittedHours, data]);
    reset();
  };

  // Mock employee data
  const employees = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Bob Johnson' },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Hours Input</h2>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  id="employeeId"
                  {...register("employeeId", { required: true })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select an employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
                {errors.employeeId && <span className="text-red-500 text-xs">This field is required</span>}
              </div>

              <div>
                <label htmlFor="normalHours" className="block text-sm font-medium text-gray-700">
                  Normal Hours
                </label>
                <input
                  type="number"
                  id="normalHours"
                  {...register("normalHours", { required: true, min: 0 })}
                  className="mt-1 block w-full border border-slate-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:border-slate-800"
                />
                {errors.normalHours && <span className="text-red-500 text-xs">Please enter a valid number of hours</span>}
              </div>

              <div>
                <label htmlFor="overtimeHours" className="block text-sm font-medium text-gray-700">
                  Overtime Hours
                </label>
                <input
                  type="number"
                  id="overtimeHours"
                  {...register("overtimeHours", { required: true, min: 0 })}
                  className="mt-1 block w-full border border-slate-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:border-slate-800"
                />
                {errors.overtimeHours && <span className="text-red-500 text-xs">Please enter a valid number of hours</span>}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-slate-200 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-slate-800"
                >
                  Submit Hours
                </button>
              </div>
            </form>
          </div>

          {submittedHours.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Submitted Hours</h3>
              <div className="mt-4 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Employee
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Normal Hours
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Overtime Hours
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {submittedHours.map((entry, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{employees.find(e => e.id === entry.employeeId)?.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{entry.normalHours}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{entry.overtimeHours}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default HoursInput;

