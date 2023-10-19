import { Metadata } from "next";
import UserAuthForm from "./components/user-auth-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="grid h-screen place-items-center">
      <UserAuthForm />
    </div>
  );
}
