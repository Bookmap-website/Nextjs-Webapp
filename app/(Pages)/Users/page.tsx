/* la logique de connexion au mock data de l'api jsonplaceholder des users */

import RenderUsers from "@/public/components/renderUsers";
import Link from "next/dist/client/link";

export default async function UsersPage() {
  const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      /* cache: "no-store" => data that needs to be changed frequently */

      cache: "no-store",
      /*
        // revalidate: 10 => data that needs to be changed every 10 seconds 
        next: {
        revalidate: 10,
      } */
    });
    const data = await response.json();
    return data;
  };

  const userList = await getUsers();

  return (
    <>
      <Link href="/" className="navbar-item">
        Vers la page Home
      </Link>
      <h1 style={{ paddingTop: "25px" }}>Users List</h1>
      <RenderUsers users={userList} />
    </>
  );
}
