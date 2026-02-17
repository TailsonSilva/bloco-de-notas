
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { SplashScreen } from "@/components/SplashScreen";
import { StatsOverview } from "@/components/StatsOverview";
import { TaskInput } from "@/components/TaskInput";
import { TaskList } from "@/components/TaskList";
import { useTasks } from "@/context/TaskContext";
import { useNotification } from "@/hooks/useNotification";

export default function Home() {
    const { tasks } = useTasks();
    const [showSplash, setShowSplash] = useState(true);

    // Initialize notification system
    useNotification(tasks);

    if (showSplash) {
        return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }

    return (
        <main className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Background decoration elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="animate-fadeInUp relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
                <Header />
            </div>

            <div className="flex-grow w-full max-w-7xl mx-auto px-4 py-6 md:px-8 relative z-10">
                <div className="animate-fadeInUp delay-100">
                    <StatsOverview />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8 animate-fadeInUp delay-200">
                        <section className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                Nova Tarefa
                            </h2>
                            <TaskInput />
                        </section>

                        <section className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                Suas Tarefas
                            </h2>
                            <TaskList />
                        </section>
                    </div>

                    <div className="lg:col-span-1 animate-fadeInUp delay-300 space-y-6">
                        {/* Sidebar / Extra Content */}
                        <div className="bg-gradient-to-br from-blue-600/90 to-indigo-700/90 backdrop-blur-md rounded-3xl p-8 text-white shadow-2xl border border-white/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 relative z-10">
                                💡 Dica de Produtividade
                            </h3>
                            <p className="text-blue-50 text-sm leading-relaxed relative z-10 font-medium opacity-90">
                                &quot;Concentre-se em completar as tarefas mais difíceis logo no início do dia. Isso cria um impulso positivo para o resto do seu turno.&quot;
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl">
                            <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                                📊 Status do Turno
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-gray-300">Início</span>
                                    <span className="font-mono font-bold text-white bg-white/10 px-2 py-1 rounded">08:00</span>
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-gray-300">Término</span>
                                    <span className="font-mono font-bold text-white bg-white/10 px-2 py-1 rounded">17:00</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="flex items-center gap-3 text-green-400 text-sm font-bold bg-green-500/10 p-3 rounded-xl border border-green-500/20 justify-center">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    Em andamento
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="w-full text-center py-8 text-sm text-gray-500 animate-fadeInUp delay-300 relative z-10">
                <p>&copy; {new Date().getFullYear()} Bloco de Notas CLT. <span className="text-gray-400">Design Premium Glassmorphism.</span></p>
            </footer>
        </main>
    );
}
