"use client";
import { usePathname } from "next/navigation";
import { NavButton } from "./nav-button";

const routes = [
  {
    href: "/",
    label: "Dashboard",
  },
  {
    href: "/shared",
    label: "Shared",
  },
  //   {
  //     href: "/profile",
  //     label: "Profile",
  //   },
];

export const Navigation = () => {
  const pathName = usePathname();
  return (
    <nav className="flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          href={route.href}
          label={route.label}
          isActive={pathName === route.href}
        />
      ))}
    </nav>
  );
};
