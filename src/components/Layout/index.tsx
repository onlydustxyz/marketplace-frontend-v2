import { Outlet } from "react-router-dom";
import Logo from "src/components/Logo";

export default function Layout() {
  return (
    <div>
      <div className="flex justify-center mt-10">
        <Logo />
      </div>
      <Outlet />
    </div>
  );
}
