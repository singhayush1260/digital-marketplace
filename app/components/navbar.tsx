import Link from "next/link";
import NavbarLinks from "./navbar-links";
import { Button } from "@/components/ui/button";
import MobileMenu from "./mobile-menu";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./user-nav";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 py-6 mx-auto">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold">
            Marshal<span className="text-primary">UI</span>{" "}
          </h1>
        </Link>
      </div>
      <NavbarLinks />
      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        {user ? (
          <UserNav
            name={user.given_name as string}
            email={user.email as string}
            userImage={
              user.picture ?? `https://avatar.vercel.sd/${user.given_name}`
            }
          />
        ) : (
          <div className="flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </div>
        )}

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
