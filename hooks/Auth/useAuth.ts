import { login, signup } from "@/services/auth.services";
import { tokenStorage } from "@/lib/token";
import { useRouter } from "next/navigation";
import { Auth_interface } from "./login_interface";


export function useAuth() {
  const router = useRouter();

  const handleLoginSubmit = async (e: React.SyntheticEvent, formData: Auth_interface) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        alert("Please fill in all fields");
        return;
      }

      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }

      const data = await login(formData.email, formData.password);

      tokenStorage.setToken(data.access_token);

      router.push("/");
    } catch (err) {
      alert("Login failed");
      router.push("/Login");
    }
  };

  const handleSignupSubmit = async (e: React.SyntheticEvent, formData: Auth_interface) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        alert("Please fill in all fields");
        return;
      }

      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }

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
