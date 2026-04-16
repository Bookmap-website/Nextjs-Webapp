export const tokenStorage = {
  setToken(token: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem("token", token);
  },

  getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  removeToken() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
  },
};