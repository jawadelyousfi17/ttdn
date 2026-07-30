import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class strings so later classes win over earlier ones. clsx
 * handles conditional objects/arrays at the call site; twMerge resolves the
 * conflicts (`px-2 px-4` collapses to `px-4`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
