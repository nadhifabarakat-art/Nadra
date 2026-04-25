import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const isAdmin = localStorage.getItem("isAdmin");

      if (isAdmin) {
        setLoading(false);
        return;
      }   

      const adminKey = prompt("Enter Admin Key");

      try {
        const res = await fetch("http://localhost:3000/admin-access", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ adminKey }),
        });

        const data = await res.json();

        if (data.access) {
          localStorage.setItem("isAdmin", "true");
          setLoading(false);
        } else {
          window.location.href = "/";
        }
      } catch (err) {
        window.location.href = "/";
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Checking access...</h2>;
  }

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
