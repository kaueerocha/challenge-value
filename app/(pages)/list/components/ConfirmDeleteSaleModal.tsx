'use client'

import { useState } from "react"
import { toast } from "sonner"
import { useSalesStore } from "@/stores/useSalesStore"
import { motion } from "framer-motion"

export default function ConfirmDeleteSaleModal({
    saleId,
    onClose,
}: {
    saleId: string
    onClose: () => void
}) {
    const deleteSale = useSalesStore((state) => state.deleteSale)
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirmDelete = () => {
        setIsLoading(true)
        toast.loading("Deletando...", { id: "loading" })

        setTimeout(() => {
            deleteSale(saleId)
            toast.success("Venda deletada com sucesso!", { id: "loading" })
            setIsLoading(false)
            onClose()
        }, 1000)
    }

    return (
        <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm text-foreground flex items-center justify-center z-50" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="bg-background p-6 rounded shadow-md text-center space-y-4">
                <p className="text-lg">Tem certeza que deseja excluir essa venda?</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 border rounded text-gray-600 hover:bg-green-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-500 text-white border rounded hover:bg-red-600"
                    >
                        {isLoading ? "Excluindo..." : "Excluir"}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
