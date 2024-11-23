'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
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

interface Employee {
  id: number
  name: string
  salary: number
  totalHours: number
  overtimeHours: number
  totalDeductions: number
  totalPay: number
}

export default function PayrollReportsPage() {
  const [employees] = useState<Employee[]>([
    { 
      id: 1, 
      name: 'Juan Pérez', 
      salary: 5000, 
      totalHours: 160, 
      overtimeHours: 10, 
      totalDeductions: 500, 
      totalPay: 5250 
    },
    { 
      id: 2, 
      name: 'María García', 
      salary: 4500, 
      totalHours: 152, 
      overtimeHours: 0, 
      totalDeductions: 450, 
      totalPay: 4050 
    },
    { 
      id: 3, 
      name: 'Carlos Rodríguez', 
      salary: 5500, 
      totalHours: 168, 
      overtimeHours: 8, 
      totalDeductions: 550, 
      totalPay: 5610 
    },
  ])

  const handleGeneratePayslip = (employeeId: number) => {
    // Implementar lógica de generación de recibo de nómina aquí
    console.log(`Generando recibo de nómina para el empleado ${employeeId}`)
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Informe de Nómina</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select>
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder="Seleccione Ciclo de Nómina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junio-2023">Junio 2023</SelectItem>
                  <SelectItem value="julio-2023-1">Julio 2023 Primera Quincena</SelectItem>
                  <SelectItem value="julio-2023-2">Julio 2023 Segunda Quincena</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                Generar Informe
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Salario Base</TableHead>
                    <TableHead>Horas Totales</TableHead>
                    <TableHead>Horas Extras</TableHead>
                    <TableHead>Deducciones Totales</TableHead>
                    <TableHead>Pago Neto</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>${employee.salary.toFixed(2)}</TableCell>
                      <TableCell>{employee.totalHours}</TableCell>
                      <TableCell>{employee.overtimeHours}</TableCell>
                      <TableCell>${employee.totalDeductions.toFixed(2)}</TableCell>
                      <TableCell>${employee.totalPay.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => handleGeneratePayslip(employee.id)}
                        >
                          Generar Recibo
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Mostrando {employees.length} empleados
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium">
                  Pago Neto Total: ${employees.reduce((sum, emp) => sum + emp.totalPay, 0).toFixed(2)}
                </div>
                <Button>
                  Exportar Informe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

