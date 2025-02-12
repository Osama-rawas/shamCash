"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const NavLinks = () => {
  const t = useTranslations();
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;
  const activeStyle = "text-primary font-semibold ";
  const aNav = [
    { id: crypto.randomUUID(), title: t("navlinks.home"), Path: "/" },
    { id: crypto.randomUUID(), title: t("navlinks.faqs"), Path: "/faq" },
    { id: crypto.randomUUID(), title: t("navlinks.terms"), Path: "/terms" },
    {
      id: crypto.randomUUID(),
      title: t("navlinks.contact-us"),
      Path: "#footer",
    },
    // { id: crypto.randomUUID(), title: "ادخال", Path: "/form" },
  ];
  return (
    <div className="md:flex items-center gap-8 hidden ">
      {aNav.map((link) => (
        <Link
          href={link.Path}
          className={`${isActive(link.Path) ? activeStyle : ""}} text-lg`}
          key={link.id}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
