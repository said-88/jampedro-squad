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

interface HoursInputForm {
  employeeId: string
  normalHours: number
  overtimeHours: number
  date: string
}

export default function HoursInputPage() {
  const [submittedHours, setSubmittedHours] = useState<HoursInputForm[]>([])

  const { register, handleSubmit, formState: { errors }, reset } = useForm<HoursInputForm>()

  const onSubmit = (data: HoursInputForm) => {
    setSubmittedHours([...submittedHours, data])
    reset()
  }

  // Mock employee data
  const employees = [
    { id: '1', name: 'Juan Pérez' },
    { id: '2', name: 'María García' },
    { id: '3', name: 'Carlos Rodríguez' },
  ]

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Registro de Horas</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Empleado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar empleado" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.employeeId && (
                  <p className="text-sm text-red-500">Por favor seleccione un empleado</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  {...register("date", { required: true })}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">Este campo es requerido</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="normalHours">Horas Normales</Label>
                <Input
                  id="normalHours"
                  type="number"
                  step="0.5"
                  {...register("normalHours", {
                    required: true,
                    min: 0,
                    max: 24,
                    valueAsNumber: true
                  })}
                />
                {errors.normalHours && (
                  <p className="text-sm text-red-500">Por favor ingrese horas válidas (0-24)</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeHours">Horas Extras</Label>
                <Input
                  id="overtimeHours"
                  type="number"
                  step="0.5"
                  {...register("overtimeHours", {
                    required: true,
                    min: 0,
                    max: 24,
                    valueAsNumber: true
                  })}
                />
                {errors.overtimeHours && (
                  <p className="text-sm text-red-500">Por favor ingrese horas válidas (0-24)</p>
                )}
              </div>

              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Registrar Horas
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {submittedHours.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Horas Registradas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empleado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Horas Normales</TableHead>
                      <TableHead>Horas Extras</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submittedHours.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {employees.find(e => e.id === entry.employeeId)?.name}
                        </TableCell>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>{entry.normalHours}</TableCell>
                        <TableCell>{entry.overtimeHours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}

