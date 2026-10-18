import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AuthLoyout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
