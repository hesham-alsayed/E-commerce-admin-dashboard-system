import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get("mode") || "login";

  const handleNavigate = (type) => {
    setSearchParams({ mode: type });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        {mode === "login" ? (
          <LoginForm onSignUpClick={() => handleNavigate("signup")} />
        ) : (
          <SignupForm onLoginClick={() => handleNavigate("login")} />
        )}
      </div>
    </main>
  );
}