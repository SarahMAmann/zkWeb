import { cn } from "@/utils/cn";

export default function Input({
    type = "text",
    className = "",
    ...props
}){

    return (
        <input
            type={type}
            className={cn("w-full accent-primary rounded-md border border-secondary-hover bg-secondary text-foreground text-sm px-4 flex items-center h-10 outline-none transition focus:ring-2 focus:ring-primary/80", className)}
            {...props}
        />
    )
}