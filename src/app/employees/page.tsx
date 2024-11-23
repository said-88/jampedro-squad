'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

interface Employee {
  id: number;
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

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'John',
      lastName: 'Doe',
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
      name: 'Jane',
      lastName: 'Smith',
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
    control,
    formState: { errors },
    reset,
  } = useForm<Omit<Employee, 'id'>>();

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.lastName} ${employee.code}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data: Omit<Employee, 'id'>) => {
    setLoading(true);
    try {
      const { data: newEmployee, error } = await supabase
        .from('employees')
        .insert([
          {
            name: data.name,
            last_name: data.lastName,
            code: data.code,
            age: data.age,
            address: data.address,
            personal_email: data.personalEmail,
            work_email: data.workEmail,
            payment_method: data.paymentMethod,
            salary_type: data.salaryType,
          },
        ])
        .select()
        .single();

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudo agregar el empleado. ' + error.message,
        });
        return;
      }

      setEmployees([
        ...employees,
        {
          id: newEmployee.id,
          name: newEmployee.name,
          lastName: newEmployee.last_name,
          code: newEmployee.code,
          age: newEmployee.age,
          address: newEmployee.address,
          personalEmail: newEmployee.personal_email,
          workEmail: newEmployee.work_email,
          paymentMethod: newEmployee.payment_method,
          salaryType: newEmployee.salary_type,
        },
      ]);

      toast({
        title: 'Éxito',
        description: 'Empleado agregado correctamente',
      });

      reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Ocurrió un error inesperado ${(error as Error).message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10 space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Gestión de Empleados</CardTitle>
            <div className="w-72">
              <Input
                type="text"
                placeholder="Buscar empleados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </CardHeader>
        </Card>

        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre Completo</TableHead>
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
              {filteredEmployees.map((employee) => (
                <TableRow key={`${employee.id}-${employee.code}`}><TableCell className="font-medium">{`${employee.name} ${employee.lastName}`}</TableCell><TableCell>{employee.code}</TableCell><TableCell>{employee.age}</TableCell><TableCell>{employee.address}</TableCell><TableCell>{employee.personalEmail}</TableCell><TableCell>{employee.workEmail}</TableCell><TableCell>{employee.paymentMethod}</TableCell><TableCell>{employee.salaryType}</TableCell><TableCell className="flex gap-2"><Button variant="ghost" className="hover:bg-slate-100" onClick={() => console.log('Edit', employee.id)}>Editar</Button><Button variant="destructive" onClick={() => setDeleteId(employee.id)}>Eliminar</Button></TableCell></TableRow>
              ))}
              {filteredEmployees.length === 0 && (
                <TableRow><TableCell colSpan={9} className="text-center py-10 text-muted-foreground">No se encontraron empleados</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Card>
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
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  {...register('lastName', { required: true })}
                />
                {errors.lastName && (
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
                <Controller
                  control={control}
                  name="paymentMethod"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar método de pago" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Banco">Banco</SelectItem>
                        <SelectItem value="Transferencia Internacional">
                          Transferencia Internacional
                        </SelectItem>
                        <SelectItem value="Plataforma Internacional">
                          Plataforma Internacional
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.paymentMethod && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryType">Tipo de Salario</Label>
                <Controller
                  control={control}
                  name="salaryType"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo de salario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mensual">Mensual</SelectItem>
                        <SelectItem value="Por Hora">Por Hora</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.salaryType && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Agregando...' : 'Agregar Empleado'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente
                al empleado.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete(deleteId!);
                  setDeleteId(null);
                }}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}
