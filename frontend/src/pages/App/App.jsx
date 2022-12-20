import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}
