import { Button } from "@/components/ui/button"
import { Sale, useSalesStore } from "@/stores/useSalesStore"
import { useState } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function EditSaleModal({
    initialSale,
    onClose,
}: {
    initialSale: Sale,
    onClose: () => void
}) {

    const updateSale = useSalesStore((state) => state.updateSale)
    const [sale, setSale] = useState(initialSale)

    const handleSave = () => {
        updateSale(sale.id, { name: sale.name, value: sale.value })
        toast.success("Venda atualizada com sucesso!")
        onClose()
    }

    return (
        <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="bg-background p-6 rounded shadow-md text-center space-y-4 w-full max-w-sm">
                <h2 className="text-lg font-bold">Editar Venda</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={sale.name}
                        onChange={(e) => setSale({ ...sale, name: e.target.value })}
                        className="border p-2 w-full"
                        placeholder="Nome da venda"
                    />
                    <div className="flex items-center rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <span className="text-muted-foreground mr-2">R$</span>
                        <input
                            type="number"
                            value={sale.value}
                            onChange={(e) =>
                                setSale({ ...sale, value: Number(e.target.value) })
                            }
                            className="border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Valor da venda"
                        />
                    </div>

                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <Button
                        onClick={onClose}
                        className="px-4 py-2 border rounded text-gray-600 hover:bg-green-100"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white border rounded hover:bg-blue-600"
                    >
                        Salvar
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}