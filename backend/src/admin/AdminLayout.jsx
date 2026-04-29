import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <main style={{ marginLeft: "240px", padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
