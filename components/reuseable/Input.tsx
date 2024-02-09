import { cn } from "@/utils/cn";

export default function Input({
    type = "text",
    className = "",
    ...props
}){

    return (
        <input
            type={type}
            className={cn("w-full accent-primary rounded-md border border-btn-background-hover bg-btn-background text-foreground text-sm px-4 flex items-center h-10 outline-none transition focus:ring-2 focus:ring-primary/80", className)}
            {...props}
        />
    )
}