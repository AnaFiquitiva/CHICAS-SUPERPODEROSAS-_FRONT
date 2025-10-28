import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind CSS de forma segura, evitando duplicados o conflictos.
 * Ejemplo:
 *   cn("bg-red-500", condition && "text-white")
 */
// src/components/ui/utils.js
export function cn(...inputs) {
    return inputs.filter(Boolean).join(" ");
}
export const getNameFromEmail = (email) => {
    if (!email) return "Estudiante";
    const [localPart] = email.split("@");
    const [first, last] = localPart.split(".");
    if (!first || !last) return localPart;
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    const lastName = last.split("-")[0];
    return `${capitalize(first)} ${capitalize(lastName)}`;
};

