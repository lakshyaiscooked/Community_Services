import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "accent" | "onDark";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white hover:bg-navy-hover",
  secondary: "border border-navy text-navy hover:bg-navy hover:text-white",
  accent: "bg-brass-light text-ink hover:bg-brass",
  onDark: "border border-white/70 text-white hover:bg-white/10",
};

/** Use on <button> elements too: className={buttonClasses("primary")} */
export function buttonClasses(variant: ButtonVariant = "primary", size: "md" | "sm" = "md"): string {
  const sizing = size === "sm" ? "px-4 py-2 text-sm" : "px-5 py-3 text-base";
  return `inline-flex items-center justify-center rounded-md font-semibold transition-colors text-center min-h-11 ${sizing} ${variants[variant]}`;
}

export function ButtonLink({
  href, variant = "primary", size = "md", className = "", children,
}: { href: string; variant?: ButtonVariant; size?: "md" | "sm"; className?: string; children: ReactNode }) {
  return (
    <Link href={href} className={`${buttonClasses(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}
