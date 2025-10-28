import * as React from "react";
import { cn } from "./utils";

export function Card({ className, ...props }) {
    return (
        <div
            data-slot="card"
            className={cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border", className)}
            {...props}
        />
    );
}

export function CardHeader({ className, ...props }) {
    return (
        <div
            data-slot="card-header"
            className={cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6", className)}
            {...props}
        />
    );
}

export function CardContent({ className, ...props }) {
    return (
        <div data-slot="card-content" className={cn("px-6 [&:last-child]:pb-6", className)} {...props} />
    );
}
