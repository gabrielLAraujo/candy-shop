"use client";

import AdminPanel from "@/components/AdminPanel";
import { FiLogOut } from "react-icons/fi";

export default function AdminPanelWithLogout() {
  async function logout() {
    console.log("Iniciando logout...");

    try {
      // Chama a API de logout para remover o cookie
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      console.log("Logout realizado com sucesso, redirecionando...");

      // Redireciona para a página de login
      window.location.href = "/admin";
    } catch (error) {
      console.error("Erro no logout:", error);
      // Fallback: remove cookie manualmente e redireciona
      document.cookie =
        "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/admin";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-0 md:p-0">
        <div className="flex items-center justify-between px-8 pt-8 pb-2 border-b">
          <h2 className="text-3xl font-bold text-gray-900 text-center w-full">
            Painel Administrativo
          </h2>
          <button
            onClick={logout}
            title="Sair"
            className="absolute top-6 right-8 flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold text-base px-3 py-2 rounded-lg transition-colors hover:bg-red-50"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="hidden md:inline">Sair</span>
          </button>
        </div>
        <div className="p-8">
          <AdminPanel />
        </div>
      </div>
    </div>
  );
}
