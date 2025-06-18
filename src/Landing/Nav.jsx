import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ReceiptIndianRupee } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const routes = [
  { to: "/#home", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#reviews", label: "Reviews" },
  { to: "/#pricing", label: "Pricing" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="group size-8 md:hidden"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </PopoverTrigger>

            {/* Mobile nav */}
            <PopoverContent align="start" className="w-40 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col gap-0">
                  {routes.map((r) => (
                    <NavigationMenuItem key={r.to} className="w-full">
                      <NavigationMenuLink asChild>
                        <HashLink
                          smooth
                          to={r.to}
                          className="block w-full rounded-md px-3 py-2 hover:bg-accent"
                        >
                          {r.label}
                        </HashLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          <HashLink smooth to="/#home" className="flex items-center gap-2">
            <ReceiptIndianRupee className="text-primary" size={24} />
            <span className="text-lg font-semibold">ReceiptPro</span>
          </HashLink>

          {/* Desktop nav */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-4">
              {routes.map((r) => (
                <NavigationMenuItem key={r.to}>
                  <NavigationMenuLink asChild>
                    <HashLink
                      smooth
                      to={r.to}
                      className="text-muted-foreground hover:text-primary font-medium"
                    >
                      {r.label}
                    </HashLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
