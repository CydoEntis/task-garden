import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../features/auth/LoginForm";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
