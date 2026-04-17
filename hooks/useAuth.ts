import { login, signup } from "@/services/auth.services";
import { tokenStorage } from "@/lib/token";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  const handleLoginSubmit = async (e: any, formData: any) => {
    e.preventDefault();

    try {
      const data = await login(formData.email, formData.password);

      tokenStorage.setToken(data.access_token);

      router.push("/");
    } catch (err) {
      alert("Login failed");
      router.push("/Login");
    }
  };

  const handleSignupSubmit = async (e: any, formData: any) => {
    e.preventDefault();

    try {
      const data = await signup(formData.email, formData.password);

      tokenStorage.setToken(data.access_token);

      router.push("/");
    } catch (err) {
      alert("Signup failed");
      router.push("/Register");
    }
  };

  const handleLogoutSubmit = () => {
    tokenStorage.removeToken();
    router.push("/Login");
  };

  return { handleLoginSubmit, handleSignupSubmit, handleLogoutSubmit };
}
