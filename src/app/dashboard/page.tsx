'use client'

import { Card } from '@/components/ui/card'
import MainLayout from '@/components/layout/MainLayout'

export default function DashboardPage() {
    return (
        <MainLayout>
            <div className="container mx-auto py-10">
                <h1 className="text-4xl font-bold mb-8">Panel de Control</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="p-6">
                        <h3 className="font-semibold mb-2">Total de Empleados</h3>
                        <p className="text-3xl font-bold">150</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="font-semibold mb-2">Ciclos de Nómina Activos</h3>
                        <p className="text-3xl font-bold">2</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="font-semibold mb-2">Aprobaciones Pendientes</h3>
                        <p className="text-3xl font-bold">5</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="font-semibold mb-2">Nómina Total</h3>
                        <p className="text-3xl font-bold">$45,250</p>
                    </Card>
                </div>
            </div>
        </MainLayout>
    )
}

