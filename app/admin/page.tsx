import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import AdminPanelWithLogout from "./AdminPanelWithLogout";

const SESSION_COOKIE = "admin_session";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  console.log("Verificando sessão:", session);

  // Verifica se a sessão existe e tem valor válido
  if (!session || session.value !== "active") {
    console.log("Sessão inválida, redirecionando para login");
    return <LoginForm />;
  }

  console.log("Sessão válida, mostrando painel admin");
  return <AdminPanelWithLogout />;
}
