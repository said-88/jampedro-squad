'use client';

import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { createEmployee, deleteEmployee, getEmployees, updateEmployee, EmployeeData } from '@/services/employeeService';

interface Employee extends EmployeeData {
  id: number;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm<Omit<Employee, 'id'>>();

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.lastName} ${employee.code}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: `Error al cargar empleados: ${(error as Error).message}`,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployees();
  });

  useEffect(() => {
    if (editingEmployee) {
      setValue('name', editingEmployee.name);
      setValue('lastName', editingEmployee.lastName);
      setValue('code', editingEmployee.code);
      setValue('age', editingEmployee.age);
      setValue('address', editingEmployee.address);
      setValue('personalEmail', editingEmployee.personalEmail);
      setValue('workEmail', editingEmployee.workEmail);
      setValue('paymentMethod', editingEmployee.paymentMethod);
      setValue('salaryType', editingEmployee.salaryType);
    }
  }, [editingEmployee, setValue]);

  const onSubmit = async (data: EmployeeData) => {
    setLoading(true);
    try {
      if (editingEmployee) {
        const updatedEmployee = await updateEmployee(editingEmployee.id, data);
        setEmployees(employees.map(emp => 
          emp.id === editingEmployee.id ? updatedEmployee : emp
        ));
        toast({
          title: 'Éxito',
          description: 'Empleado actualizado correctamente',
        });
        setEditingEmployee(null);
      } else {
        const newEmployee = await createEmployee(data);
        setEmployees([...employees, newEmployee]);
        
        toast({
          title: 'Éxito',
          description: 'Empleado agregado correctamente',
        });
      }
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

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((emp) => emp.id !== id));
      toast({
        title: 'Éxito',
        description: 'Empleado eliminado correctamente',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `${(error as Error).message}`,
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10">
                    Cargando empleados...
                  </TableCell>
                </TableRow>
              ) : filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <TableRow key={`${employee.id}-${employee.code}`}><TableCell className="font-medium">{`${employee.name} ${employee.lastName}`}</TableCell><TableCell>{employee.code}</TableCell><TableCell>{employee.age}</TableCell><TableCell>{employee.address}</TableCell><TableCell>{employee.personalEmail}</TableCell><TableCell>{employee.workEmail}</TableCell><TableCell>{employee.paymentMethod}</TableCell><TableCell>{employee.salaryType}</TableCell><TableCell className="flex gap-2"><Button variant="ghost" className="hover:bg-slate-100" onClick={() => setEditingEmployee(employee)}>Editar</Button><Button variant="destructive" onClick={() => setDeleteId(employee.id)}>Eliminar</Button></TableCell></TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    No se encontraron empleados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {editingEmployee ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}
            </CardTitle>
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

              <div className="col-span-2 flex justify-end gap-4">
                {editingEmployee && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingEmployee(null);
                      reset();
                    }}
                  >
                    Cancelar
                  </Button>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading 
                    ? (editingEmployee ? 'Actualizando...' : 'Agregando...') 
                    : (editingEmployee ? 'Actualizar Empleado' : 'Agregar Empleado')}
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
                onClick={() => handleDelete(deleteId!)}
                disabled={isDeleting}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}