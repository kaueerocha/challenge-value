'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { useSalesStore } from "@/stores/useSalesStore"
import { useState } from "react"
import { Edit, Plus, Trash } from "lucide-react"
import { Sale } from "@/stores/useSalesStore"
import EditSaleModal from "./components/EditSaleModal"
import ConfirmDeleteSaleModal from "./components/ConfirmDeleteSaleModal"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ListPage() {

    const router = useRouter()
    const sales = useSalesStore((state) => state.sales)
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
    const [editSale, setEditSale] = useState<Sale | null>(null)

    const handleCreateButton = () => {
        router.push("/list/create")
    }

    // Delete Sale
    const handleDeleteClick = (id: string) => {
        setConfirmDeleteId(id)
    }

    // Edit Sale
    const handleEditClick = (sale: Sale) => {
        setEditSale(sale);
    }

    return (
        <div className="h-full pb-20 gap-8 sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
            <motion.div className="flex w-full gap-[32px] items-center sm:items-start flex-col" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex w-full justify-between items-start flex-col sm:flex-row gap-4">

                    <div>
                        <h1 className="text-2xl font-bold">Vendas</h1>
                        <p className="text-muted-foreground">Gerencie suas vendas e acompanhe seu desempenho</p>
                    </div>
                    <Button onClick={handleCreateButton} className="bg-blue-500 sm:w-auto w-full">
                        <Plus className="mr-2 h-4 w-4" /> Nova Venda
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead className="w-70">Data</TableHead>
                            <TableHead className="w-70">Nome</TableHead>
                            <TableHead className="w-70 text-right">Valor</TableHead>
                            <TableHead className="w-70 text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...sales]
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            .map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell>{sale.date}</TableCell>
                                    <TableCell>{sale.name}</TableCell>
                                    <TableCell className="text-right">R${sale.value}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEditClick(sale)}
                                                className="bg-white-500 hover:bg-blue-400 text-foreground rounded-full p-2 flex items-center justify-center transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(sale.id)}
                                                className="bg-white-500 hover:bg-red-600 text-foreground rounded-full p-2 flex items-center justify-center transition-colors"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableCaption className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                        {sales.length} vendas registradas
                    </TableCaption>
                </Table>

                {sales.length === 0 && (
                    <div className="flex items-center justify-center w-full h-full">
                        <p> Nenhuma venda registrada </p>
                    </div>
                )}

                {confirmDeleteId && (
                    <ConfirmDeleteSaleModal
                        saleId={confirmDeleteId}
                        onClose={() => setConfirmDeleteId(null)}
                    />
                )}

                {editSale && (
                    <EditSaleModal
                        initialSale={editSale}
                        onClose={() => setEditSale(null)}
                    />
                )}
            </motion.div>
        </div>
    );
}
