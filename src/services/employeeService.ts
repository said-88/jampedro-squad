import { supabase } from '@/lib/supabaseClient';

export interface EmployeeData {
  name: string;
  lastName: string;
  code: string;
  age: number;
  address: string;
  personalEmail: string;
  workEmail: string;
  paymentMethod: string;
  salaryType: string;
}

export const createEmployee = async (employeeData: EmployeeData) => {
  const { data, error } = await supabase
    .from('employees')
    .insert([
      {
        name: employeeData.name,
        last_name: employeeData.lastName,
        code: employeeData.code,
        age: employeeData.age,
        address: employeeData.address,
        personal_email: employeeData.personalEmail,
        work_email: employeeData.workEmail,
        payment_method: employeeData.paymentMethod,
        salary_type: employeeData.salaryType,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    name: data.name,
    lastName: data.last_name,
    code: data.code,
    age: data.age,
    address: data.address,
    personalEmail: data.personal_email,
    workEmail: data.work_email,
    paymentMethod: data.payment_method,
    salaryType: data.salary_type,
  };
};

export const deleteEmployee = async (id: number) => {
  const { data, error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === '23503') {
      throw new Error('No se puede eliminar el empleado porque tiene registros asociados');
    }
    throw new Error(error.message);
  }

  return data;
};

export const getEmployees = async () => {
  const { data, error } = await supabase
    .from('employees')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data.map(emp => ({
    id: emp.id,
    name: emp.name,
    lastName: emp.last_name,
    code: emp.code,
    age: emp.age,
    address: emp.address,
    personalEmail: emp.personal_email,
    workEmail: emp.work_email,
    paymentMethod: emp.payment_method,
    salaryType: emp.salary_type,
  }));
};

export const updateEmployee = async (id: number, employeeData: EmployeeData) => {
  const { data, error } = await supabase
    .from('employees')
    .update({
      name: employeeData.name,
      last_name: employeeData.lastName,
      code: employeeData.code,
      age: employeeData.age,
      address: employeeData.address,
      personal_email: employeeData.personalEmail,
      work_email: employeeData.workEmail,
      payment_method: employeeData.paymentMethod,
      salary_type: employeeData.salaryType,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    name: data.name,
    lastName: data.last_name,
    code: data.code,
    age: data.age,
    address: data.address,
    personalEmail: data.personal_email,
    workEmail: data.work_email,
    paymentMethod: data.payment_method,
    salaryType: data.salary_type,
  };
};