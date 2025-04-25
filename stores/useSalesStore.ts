import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export type Sale = {
    id: string
    name: string
    value: number
    date: string
}

type SalesStore = {
    sales: Sale[]
    addSale: (sale: Omit<Sale, 'id'>) => void
    updateSale: (id: string, updatedSale: Partial<Sale>) => void
    deleteSale: (id: string) => void
}

export const useSalesStore = create<SalesStore>((set) => ({
    sales: [
        {
            name: "Venda 1",
            value: 100,
            id: "1",
            date: "01/01/2025",
        },
        {
            name: "Venda 2",
            value: 200,
            id: "2",
            date: "01/10/2024",
        },
        {
            name: "Venda 3",
            value: 300,
            id: "3",
            date: "07/02/2025",
        },
        {
            name: "Venda 4",
            value: 400,
            id: "4",
            date: "24/03/2025",
        },
    ],
    addSale: (sale) =>
        set((state) => ({
            sales: [...state.sales, { ...sale, id: uuidv4() }],
        })),
    updateSale: (id, updatedSale) =>
        set((state) => ({
            sales: state.sales.map((sale) =>
                sale.id === id ? { ...sale, ...updatedSale } : sale
            ),
        })),
    deleteSale: (id) =>
        set((state) => ({
            sales: state.sales.filter((sale) => sale.id !== id),
        }))
}))
