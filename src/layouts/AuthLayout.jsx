import SignupBanner from "@/components/Banner";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <SignupBanner />
      {/* Center card on screen */}
      <div className="bg-muted flex min-h-svh items-center justify-center p-6 md:p-10">
        <Outlet />
      </div>
    </>
  );
}
export default AuthLayout;
