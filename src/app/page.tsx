"use client"

import { useState } from "react"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Employee {
  id: number
  name: string
  position: string
  salary: number
}

export default function Component() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "Juan Pérez", position: "Desarrollador", salary: 50000 },
    { id: 2, name: "María García", position: "Diseñadora", salary: 45000 },
    { id: 3, name: "Carlos Rodríguez", position: "Gerente", salary: 60000 },
  ])

  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    name: "",
    position: "",
    salary: 0,
  })

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  const addEmployee = () => {
    setEmployees([...employees, { ...newEmployee, id: Date.now() }])
    setNewEmployee({ name: "", position: "", salary: 0 })
  }

  const updateEmployee = () => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? editingEmployee : emp
        )
      )
      setEditingEmployee(null)
    }
  }

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sistema de Planilla</h1>
      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Agregar Empleado
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Posición
                </Label>
                <Input
                  id="position"
                  value={newEmployee.position}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, position: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary" className="text-right">
                  Salario
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={newEmployee.salary}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      salary: Number(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addEmployee}>Agregar Empleado</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Posición</TableHead>
            <TableHead>Salario</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>${employee.salary.toLocaleString()}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="mr-2">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Empleado</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                          Nombre
                        </Label>
                        <Input
                          id="edit-name"
                          value={editingEmployee?.name || ""}
                          onChange={(e) =>
                            setEditingEmployee(
                              editingEmployee
                                ? {
                                    ...editingEmployee,
                                    name: e.target.value,
                                  }
                                : null
                            )
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-position" className="text-right">
                          Posición
                        </Label>
                        <Input
                          id="edit-position"
                          value={editingEmployee?.position || ""}
                          onChange={(e) =>
                            setEditingEmployee(
                              editingEmployee
                                ? {
                                    ...editingEmployee,
                                    position: e.target.value,
                                  }
                                : null
                            )
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-salary" className="text-right">
                          Salario
                        </Label>
                        <Input
                          id="edit-salary"
                          type="number"
                          value={editingEmployee?.salary || 0}
                          onChange={(e) =>
                            setEditingEmployee(
                              editingEmployee
                                ? {
                                    ...editingEmployee,
                                    salary: Number(e.target.value),
                                  }
                                : null
                            )
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={updateEmployee}>Actualizar Empleado</Button>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}