import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { Navbar } from "../../components/navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hideNavbarRoutes = ["/Login", "/Register"];
  const hideNavbar = hideNavbarRoutes.includes(router.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}