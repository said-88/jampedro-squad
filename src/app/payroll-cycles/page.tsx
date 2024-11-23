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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PayrollCycle {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  type: 'Monthly' | 'Biweekly';
  status: 'Approved' | 'Pending';
}

export default function PayrollCyclesPage() {
  const [payrollCycles, setPayrollCycles] = useState<PayrollCycle[]>([
    {
      id: 1,
      name: 'Junio 2023',
      startDate: '2023-06-01',
      endDate: '2023-06-30',
      type: 'Monthly',
      status: 'Approved',
    },
    {
      id: 2,
      name: 'Julio 2023 Primera Quincena',
      startDate: '2023-07-01',
      endDate: '2023-07-15',
      type: 'Biweekly',
      status: 'Pending',
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<PayrollCycle, 'id' | 'status'>>();

  const onSubmit = (data: Omit<PayrollCycle, 'id' | 'status'>) => {
    setPayrollCycles([
      ...payrollCycles,
      { ...data, id: payrollCycles.length + 1, status: 'Pending' },
    ]);
    reset();
  };

  const handleDelete = (id: number) => {
    setPayrollCycles(payrollCycles.filter((cycle) => cycle.id !== id));
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ciclos de Nómina</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar ciclos de nómina..."
                className="max-w-sm"
              />
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Ciclo</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Fecha de Fin</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollCycles.map((cycle) => (
                <TableRow key={cycle.id}>
                  <TableCell>{cycle.name}</TableCell>
                  <TableCell>{cycle.startDate}</TableCell>
                  <TableCell>{cycle.endDate}</TableCell>
                  <TableCell>
                    {cycle.type === 'Monthly' ? 'Mensual' : 'Quincenal'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cycle.status === 'Approved' ? 'default' : 'secondary'
                      }
                    >
                      {cycle.status === 'Approved' ? 'Aprobado' : 'Pendiente'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="mr-2"
                      onClick={() => console.log('Configure', cycle.id)}
                    >
                      Configurar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(cycle.id)}
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
            <CardTitle>Agregar Nuevo Ciclo de Nómina</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Ciclo</Label>
                <Input id="name" {...register('name', { required: true })} />
                {errors.name && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha de Inicio</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...register('startDate', { required: true })}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha de Fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  {...register('endDate', { required: true })}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Mensual</SelectItem>
                    <SelectItem value="Biweekly">Quincenal</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Agregar Ciclo de Nómina
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
