import AdminPanel from "@/components/AdminPanel";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            🛠️ Administração - Alice Doces
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Gerencie seus doces, preços e disponibilidade
          </p>
        </div>
      </div>

      <AdminPanel />
    </div>
  );
}
