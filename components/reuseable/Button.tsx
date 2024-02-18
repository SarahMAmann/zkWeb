import { cn } from "@/utils/cn";
import Link from "next/link";

export default function Button({
    children,
    variant = "primary",
    border = false,
    icon = false,
    asLink,
    href = "#",
    className,
    onClick,
    ...props
}: Readonly<{
    children?: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    border?: true | false;
    className?: string,
    icon?: true | false,
    asLink?: true | false,
    href?: string,
    onClick?: any
}>) {
    const isBorder = border ? "border border-border" : "border-none";
    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/70",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        ghost: "hover:bg-secondary hover:text-accent-foreground",
    };
    const stylB = "h-10 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const isIcon = icon ? "min-h-10 min-w-10 w-12 h-10 rounded-md px-0 flex items-center justify-center" : "";
    return (
        <>
            <button {...props} className={cn(stylB,variants[variant], isBorder, isIcon, className, asLink && "hidden")}>{children}</button>
            {asLink && (
                <Link {...props} href={href} className={cn(stylB,variants[variant], isBorder, isIcon, className)}>{children}</Link>
            )}
        </>
    )
}