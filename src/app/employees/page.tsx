'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'John Doe',
      code: 'EMP001',
      age: 30,
      address: '123 Main St',
      personalEmail: 'john@personal.com',
      workEmail: 'john@work.com',
      paymentMethod: 'Banco',
      salaryType: 'Mensual',
    },
    {
      id: 2,
      name: 'Jane Smith',
      code: 'EMP002',
      age: 28,
      address: '456 Elm St',
      personalEmail: 'jane@personal.com',
      workEmail: 'jane@work.com',
      paymentMethod: 'Transferencia Internacional',
      salaryType: 'Por Hora',
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Employee, 'id'>>();

  const onSubmit = (data: Omit<Employee, 'id'>) => {
    setEmployees([...employees, { ...data, id: employees.length + 1 }]);
    reset();
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Gestión de Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar empleados..."
                className="max-w-sm"
              />
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Correo Personal</TableHead>
                <TableHead>Correo Laboral</TableHead>
                <TableHead>Método de Pago</TableHead>
                <TableHead>Tipo de Salario</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.code}</TableCell>
                  <TableCell>{employee.age}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell>{employee.personalEmail}</TableCell>
                  <TableCell>{employee.workEmail}</TableCell>
                  <TableCell>{employee.paymentMethod}</TableCell>
                  <TableCell>{employee.salaryType}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="mr-2"
                      onClick={() => console.log('Edit', employee.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Agregar Nuevo Empleado</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" {...register('name', { required: true })} />
                {errors.name && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Código de Empleado</Label>
                <Input id="code" {...register('code', { required: true })} />
                {errors.code && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  type="number"
                  {...register('age', { required: true, min: 18, max: 100 })}
                />
                {errors.age && (
                  <p className="text-sm text-red-500">
                    La edad debe estar entre 18 y 100 años
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  {...register('address', { required: true })}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="personalEmail">Correo Personal</Label>
                <Input
                  id="personalEmail"
                  type="email"
                  {...register('personalEmail', {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.personalEmail && (
                  <p className="text-sm text-red-500">
                    Por favor ingrese un correo válido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="workEmail">Correo Laboral</Label>
                <Input
                  id="workEmail"
                  type="email"
                  {...register('workEmail', {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.workEmail && (
                  <p className="text-sm text-red-500">
                    Por favor ingrese un correo válido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Método de Pago</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar método de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Banco">Banco</SelectItem>
                    <SelectItem value="Transferencia Internacional">
                      Transferencia Internacional
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.paymentMethod && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryType">Tipo de Salario</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de salario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mensual">Mensual</SelectItem>
                    <SelectItem value="Por Hora">Por Hora</SelectItem>
                  </SelectContent>
                </Select>
                {errors.salaryType && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Agregar Empleado
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
