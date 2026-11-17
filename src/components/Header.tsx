"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { ButtonLink } from "./Button";
import { Wordmark } from "./Wordmark";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);          // close menu after navigating
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-sm font-medium hover:text-navy ${isActive(item.href) ? "text-navy underline decoration-brass decoration-2 underline-offset-8" : "text-muted"}`}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/enquiry" size="sm">Send Enquiry</ButtonLink>
        </nav>
        <button
          ref={menuButton}
          type="button"
          className="inline-flex min-h-11 items-center rounded-md border border-navy px-4 text-sm font-semibold text-navy xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Main (mobile)" className="border-t border-line bg-ivory xl:hidden">
          <ul className="container-page flex flex-col py-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block border-b border-line py-3 text-base font-medium ${isActive(item.href) ? "text-navy" : "text-ink"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4"><ButtonLink href="/enquiry" className="w-full">Send Enquiry</ButtonLink></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
