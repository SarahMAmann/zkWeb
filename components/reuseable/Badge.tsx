import { cn } from "@/utils/cn";

export default function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={cn("inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-accent-foreground", className)}>
            {children}
        </span>
    )
}