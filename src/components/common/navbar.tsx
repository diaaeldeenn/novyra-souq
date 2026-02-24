"use client";
import Link from "next/link";
import { Menu, User, Moon, Sun, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { counterProductContext } from "@/context/countProducts";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Brands", href: "/brands" },
  { name: "Categories", href: "/categories" },
];

export default function Navbar() {
  const { numOfCartItems, handleCart } = useContext(counterProductContext);
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  //To Fix Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      handleCart();
    }
  }, [session]);

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  if (!mounted) {
    return null;
  }

  return (
    <header className="w-full border-b bg-card/80 backdrop-blur-md fixed z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-2xl bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          Novyra Souq
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-base font-semibold transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
                pathname === link.href
                  ? "text-primary after:w-full"
                  : "text-muted-foreground hover:text-primary after:w-0 hover:after:w-full"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="cursor-pointer size-5 text-muted-foreground hover:text-foreground transition-colors" />
            ) : (
              <Sun className="cursor-pointer size-5 text-muted-foreground hover:text-foreground transition-colors" />
            )}
          </button>

          <Link
            href="/cart"
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors relative"
          >
            <ShoppingCart className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="absolute -top-1 -right-1 bg-primary dark:bg-[#795a00] text-primary-foreground dark:text-[#ffbf00] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {numOfCartItems}
            </span>
          </Link>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-accent/10 transition-colors">
                <User className="cursor-pointer size-5 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 shadow-lg">
              <DropdownMenuGroup className="font-semibold">
                <DropdownMenuItem className="cursor-default focus:bg-transparent">
                  <p className="text-primary font-bold text-sm">
                    {session?.user ? session?.user?.name : "Welcome Visitor"}
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {!session?.user ? (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href={"/login"} className="flex items-center gap-2">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link
                        href={"/register"}
                        className="flex items-center gap-2"
                      >
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={"/profile"}>Profile</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              {session?.user && (
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer font-semibold"
                >
                  <Link href={"/allorders"}>Your Orders</Link>
                </DropdownMenuItem>
              )}
              {session?.user && (
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer font-semibold"
                >
                  <Link href={"/wishlist"}>Your Wishlist</Link>
                </DropdownMenuItem>
              )}
              {session?.user && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-destructive font-semibold hover:bg-destructive/10"
                  >
                    Log Out
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-semibold hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-accent/10"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
