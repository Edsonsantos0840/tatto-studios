"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <main className="min-h-screen w-full gradientePrincipal flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="gradienteCard max-w-3xl w-full rounded-3xl shadow-2xl p-8 md:p-12 text-center backdrop-blur-xl"
            >
                {/* Código de erro */}
                <h1 className="font-display text-[6rem] md:text-[8rem] leading-none text-white drop-shadow-lg">
                    404
                </h1>

                {/* Título */}
                <h2 className="mt-4 text-2xl md:text-3xl font-semibold font-display text-white">
                    Página não encontrada
                </h2>

                {/* Descrição */}
                <p className="mt-4 text-base md:text-lg text-gray-200 font-sans max-w-xl mx-auto leading-relaxed">
                    O conteúdo que você está procurando não existe, foi removido ou
                    está temporariamente indisponível. Verifique o endereço ou volte
                    para a página inicial.
                </p>

                {/* Divider */}
                <div className="my-8 h-px w-full bg-white/20" />

                {/* Botões */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg transition hover:scale-105 hover:bg-white"
                    >
                        <Home size={18} />
                        Página inicial
                    </Link>

                    <button
                        onClick={() => history.back()}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:scale-105"
                    >
                        <ArrowLeft size={18} />
                        Voltar
                    </button>
                </div>

                {/* Footer */}
                <p className="mt-10 text-sm text-gray-300 font-sans">
                    © {new Date().getFullYear()} • Todos os direitos reservados
                </p>
            </motion.div>
        </main>
    );
}
