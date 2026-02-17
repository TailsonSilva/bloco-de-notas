
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TaskProvider } from "@/context/TaskContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bloco de Notas CLT - Produtividade",
  description: "Organize suas tarefas e aumente sua produtividade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} animate-gradient-xy`}>
        <TaskProvider>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
