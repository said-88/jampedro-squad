'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Deduction {
  id: number
  name: string
  amount: number
  frequency: 'Monthly' | 'Biweekly'
}

export default function DeductionsPage() {
  const [deductions, setDeductions] = useState<Deduction[]>([
    { 
      id: 1, 
      name: 'Impuesto sobre la Renta', 
      amount: 500, 
      frequency: 'Monthly' 
    },
    { 
      id: 2, 
      name: 'Seguro Médico', 
      amount: 100, 
      frequency: 'Biweekly' 
    },
  ])

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Deduction, 'id'>>()

  const onSubmit = (data: Omit<Deduction, 'id'>) => {
    setDeductions([...deductions, { ...data, id: deductions.length + 1 }])
    reset()
  }

  const handleDelete = (id: number) => {
    setDeductions(deductions.filter(deduction => deduction.id !== id))
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Gestión de Deducciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar deducciones..."
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
                <TableHead>Monto</TableHead>
                <TableHead>Frecuencia</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deductions.map((deduction) => (
                <TableRow key={deduction.id}>
                  <TableCell>{deduction.name}</TableCell>
                  <TableCell>${deduction.amount.toFixed(2)}</TableCell>
                  <TableCell>{deduction.frequency === 'Monthly' ? 'Mensual' : 'Quincenal'}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="mr-2"
                      onClick={() => console.log('Edit', deduction.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(deduction.id)}
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
            <CardTitle>Agregar Nueva Deducción</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Deducción</Label>
                <Input
                  id="name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">Este campo es requerido</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Monto</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  {...register("amount", { 
                    required: true,
                    min: 0,
                    valueAsNumber: true
                  })}
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">Por favor ingrese un monto válido</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frecuencia</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Mensual</SelectItem>
                    <SelectItem value="Biweekly">Quincenal</SelectItem>
                  </SelectContent>
                </Select>
                {errors.frequency && (
                  <p className="text-sm text-red-500">Este campo es requerido</p>
                )}
              </div>

              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Agregar Deducción
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

