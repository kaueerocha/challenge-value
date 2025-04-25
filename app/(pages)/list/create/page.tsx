'use client';

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSalesStore } from "@/stores/useSalesStore"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from 'sonner'
import { motion } from "framer-motion"

const CreateSaleSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Nome deve ter pelo menos 2 caracteres.",
        })
        .max(50),
    value: z
        .string()
        .transform((val) => {
            const parsed = Number.parseFloat(val)
            return isNaN(parsed) ? 0 : parsed
        })
        .refine((val) => !isNaN(val) && val >= 0 && val <= 1000000, {
            message: "Valor deve ser um número entre 0 e 1,000,000.",
        }),
})

type CreateSaleFormType = {
    name: string
    value: string
}

type CreateSaleSchemaType = z.infer<typeof CreateSaleSchema>

export default function CreatePage() {
    const router = useRouter()
    const addSale = useSalesStore((state) => state.addSale)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<CreateSaleFormType>({
        resolver: zodResolver(CreateSaleSchema) as any,
        defaultValues: {
            name: "",
            value: "",
        },
    })

    function onSubmit(data: any) {
        const values = data as unknown as CreateSaleSchemaType

        setIsLoading(true)
        const toastId = toast.loading("Registrando...", { id: "loading" })
        // Simulando uma requisição de 2 segundos
        setTimeout(() => {
            addSale({
                name: values.name,
                value: values.value,
                date: new Date().toLocaleDateString("pt-BR"),
            });
            toast.success("Venda registrada com sucesso!", { id: toastId })
            setIsLoading(false)
            router.back();
        }, 2000)
    }

    const handleArrowBack = () => {
        router.back()
    }

    return (
        // <div className="h-full p-8 pb-20 sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
        <motion.div className="h-full p-8 pb-20 sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <main className="flex w-full flex-col gap-8 items-center">

                <div className="flex justify-start w-full h-full">
                    <Button variant="ghost" onClick={handleArrowBack} className="flex items-center gap-2 text-muted-foreground mb-4">
                        <ArrowLeft className="w-4 h-4" /> Voltar
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-blue-600 text-center">Nova Venda</h1>

                    <p className="text-muted-foreground mb-2 text-center">
                        Preencha os campos abaixo para registrar uma nova venda no sistema.
                    </p>
                </div>

                <div className="flex justify-center w-full h-full align-center">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control as any}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome da venda" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control as any}
                                name="value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                                <span className="text-muted-foreground mr-2">R$</span>
                                                <Input className="border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0" type="number" placeholder="0" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center">
                                <Button className="flex w-full" type="submit">Criar</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </main>
            {isLoading && (
                <div className="flex items-center justify-center w-full h-full mt-4">
                    <Loader className="w-6 h-6 animate-spin text-blue-500" />
                </div>
            )}
        </motion.div>
    );
}
